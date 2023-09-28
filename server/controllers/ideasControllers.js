const Ideas = require("../models/IdeasSchema");
const User = require('../models/UserSchema')
const Teams = require('../models/TeamsSchema')
const uploadImage = require("../utils/uploadImage");
const logger = require("../logger/index");
const asyncHandler = require("express-async-handler");
const { DeleteFiles } = require("../utils/deleteFiles");
const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");



const postIdeas = asyncHandler(async (req, res, next) => {
  const { idea, description, team } = req.body;
  const teamData = await Teams.findById(team)
  if(!teamData.Members.includes(req.userId))
  {
    return res.status(404).json({
      message : "You are not authorized"
    })
  }
//  console.log(req.files.files);
//  console.log(idea);
  if (!idea) {
    return res.status(400).json({
      message: "Please fill Brainwave",
    });
  }
  //use mac to secure data form idor
  if(req.files && req.files['files'] && req.files['files'].length > 10)
  {
    return res.status(400).json({ message: 'Too many files uploaded.' });
  }

  var arrayOfUrls = [] ;
  if (req.files && req.files['files'] && req.files.files.length > 0) {
    try {
      arrayOfUrls = await uploadImage.uploadMultipleImages(req.files.files);
      logger.info(arrayOfUrls);
    } catch (err) {
      return res.status(500).json({
        message: "Error while uploading files and images !",
      });
    }
    //console.log("here to delete")
    //console.log(arrayOfUrls)
    var imagesArray = [];
    var filesArray = [];
    var audiosArray = [];
    for (let i = 0; i < arrayOfUrls.length; i++) {
      if (arrayOfUrls[i].type == "files") {
        filesArray.push(arrayOfUrls[i].url);
      } else if(arrayOfUrls[i].type == "images"){
        imagesArray.push(arrayOfUrls[i].url);
      } else if(arrayOfUrls[i].type == "audio"){
        audiosArray.push(arrayOfUrls[i].url);
      }
    }
      
  }
  var audio = "";
//  console.log(req.files.record)
  if(req.files && req.files.record && req.files.record.length > 0)
  {
    try {
//console.log(req.files.record)
      urlOfImage = await uploadImage(req.files.record[0], "record");
    } catch (err) {
      return res.status(500).json({
        message: "Error while uploading files and images !",
      });
    }
      audio = urlOfImage
  }
  
  const newIdea = new Ideas({
    Idea: idea,
    Description: description,
    Images: imagesArray,
    Files: filesArray,
    Audios: audiosArray,
    Record: audio,
    Team: team,
    WrittenBy: req.userId,
  });
//  console.log(newIdea)
  await newIdea
    .save()
    .then((result) => {
      res.status(200).json({
        message: "Idea Added Successfully",
        data : result ,
      });
      
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
    
    DeleteFiles();
  // try {
  //   // Read the contents of the folder
  //   const folderPath = path.join(__dirname, "../uploads");
  //   const files = await fs.readdir(folderPath);

  //   // Loop through each file and delete it
  //   for (const file of files) {
  //     const filePath = path.join(folderPath, file);
  //     await fs.unlink(filePath);
  //   }

  //   res.status(200).json({ message: "All files deleted successfully" });
  // } catch (error) {
  //   res
  //     .status(500)
  //     .json({ message: "An error occurred while deleting the files" });
  // }
});

const displayIdeas = asyncHandler(async(req, res, next) => {
  const teamId = req.params.id;
  // protect users onlly in the team
  const userData = await User.findById(req.userId)

  if(!userData.Teams.includes(teamId))
  {
    return res.status(403).json({
      message : "you are not authorized"
    })
  }

  Ideas.find({ Team: teamId }).populate("WrittenBy").populate({
    path: "Team",
    populate:{
      path: "TeamLeader",
      model: "User"
    }
  }).sort({createdAt: -1}).limit(req.query.limit).skip(req.query.page*5)
    .then((result) => {
      if(result.length < 5)
      {
        return res.status(200).json({
          data: result,
          message : "last spark"
        });
      }else
      {
        return res.status(200).json({
          data: result,
        });
      }
      
    })
    .catch((err) => {
      return res.status(404).json({
        message: err,
      });
    });
});

const deleteIdea = asyncHandler(async (req, res, next) => {
  const data = await Ideas.findOne({ _id: req.params.id });
  const teamData = await Teams.findById(data.Team)
  if (data && (data.WrittenBy == req.userId || req.userId == teamData.TeamLeader) ) {
    await Ideas.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Data deleted successfully." });
  } else {
    return res.status(403).json({ error: "Access denied or data not found." });
  }
});

const updateIdea = asyncHandler(async (req, res, next) => {
  const { idea, description } = req.body;

  const data = await Ideas.findOne({ _id: req.params.id }).populate("WrittenBy") ;
//  console.log(data)
  if (data && data.WrittenBy._id == req.userId) {
    data.Idea = idea;
    data.Description = description;
    await data.save();
    return res.status(200).json({ message: "Data updated successfully." });
  } else {
    return res.status(403).json({ error: "Access denied or data not found." });
  }
});


module.exports = { displayIdeas, postIdeas, deleteIdea, updateIdea };
