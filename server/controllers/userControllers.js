const express = require("express");
const Teams = require("../models/TeamsSchema");
const User = require("../models/UserSchema");
const Ideas = require("../models/IdeasSchema")
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const uploadImage = require("../utils/uploadImage");
const logger = require("../logger/index");
const { sanitizeUser } = require("../utils/sanitizeData");
const { DeleteFiles } = require("../utils/deleteFiles");

const getProfile = asyncHandler(async (req, res, next) => {
  const data = await User.find({ _id: req.params.id }).select("-Password");

  if (data) {
    res.status(200).json({
      data: data,
    });
  } else {
    res.status(404).json({
      message: "User not found !",
    });
  }
});

const setProfilePic = asyncHandler(async (req, res, next) => {
  console.log(req.files);
  var urlOfImage;
  if (req.files != undefined || req.files.length != 0) {
    try {
      urlOfImage = await uploadImage(req.files[0]);
      logger.info(urlOfImage);
    } catch (err) {
      return res.status(500).json({
        message: "Error while uploading files and images !",
      });
    }
  } else {
    return res.status(404).json({
      message: "you have to set an image",
    });
  }
  const data = await User.findByIdAndUpdate(
    { _id: req.userId },
    { Image: urlOfImage },
    { new: true },
  ).select("-Password");

  res.status(200).json({
    message: "Image updated successfully !",
    data: sanitizeUser(data),
  });

  DeleteFiles();
});

const setBackgroundPic = asyncHandler(async (req, res, next) => {
  console.log(req.files);
  var urlOfImage;
  if (req.files != undefined) {
    try {
      urlOfImage = await uploadImage(req.files[0]);
      logger.info(urlOfImage);
    } catch (err) {
      return res.status(500).json({
        message: "Error while uploading files and images !",
      });
    }
  } else {
    return res.status(404).json({
      message: "you have to set an image",
    });
  }
  const data = await User.findByIdAndUpdate(
    { _id: req.userId },
    { BackgroundImage: urlOfImage },
    { new: true },
  ).select("-Password");

  res.status(200).json({
    message: "Image updated successfully !",
    data: sanitizeUser(data),
  });

  DeleteFiles();
});

const updateProfile = asyncHandler(async (req, res, next) => {
  const { name , bio, about } = req.body;

  
  
    const data = await User.findByIdAndUpdate({_id : req.userId} , {Name: name , Bio : bio , About : about} , {new : true}).select("-Password");
    res.status(200).json({ message: "Data updated successfully." , data : data});
  
});

const deleteUser = asyncHandler( async(req,res,next) => {
  const data = await User.findById(req.userId)

  if(data.Teams.length > 0)
  {
    return res.status(403).json({
      message : "You must leave the teams you have joined before deleting your account."
    })
  }
  else
  {
    await User.findByIdAndDelete(req.userId)
    return res.status(200).json({
      message : "Account deleted successfully !"
    })
  }
  
}
)

const allPostsForUser = asyncHandler( async(req,res,next) => {
  try
  {
  const userData = await User.findById(req.userId)
  // console.log(userData)
  var ideas = []
  for(let i = 0 ; i < userData.Teams.length ; i++)
  {
    // console.log(userData.Teams[i])
    var teamIdeas = await Ideas.find({Team: userData.Teams[i]}).populate("WrittenBy").populate({
      path: "Team",
      populate:{
        path: "TeamLeader",
        model: "User"
      }
    })
    // console.log(teamIdeas)
    ideas.push(...teamIdeas)
  }
  ideas.sort((a, b) => {
    const dateA = new Date(a.updatedAt);
    const dateB = new Date(b.updatedAt);
  
    // Compare the dates in descending order (latest first)
    return dateB - dateA;
  });
  const total = ideas.length
  var newData = []
  if(req.query.page != 0)
  {
    newData = ideas.slice(req.query.page*10 , req.query.page*10 + 10 )
  }else
  {
    newData = ideas.slice(0, 10 )
  }

  if(newData.length < 10)
  {
    return res.status(200).json({
      data : newData ,
      message : "last spark",
      totalSparks : total
    })
  }

  return res.status(200).json({
    data : newData ,
    totalSparks : total
  })
  
  }
  catch(err)
  {
    console.log(err)
    return res.status(404).json({
      message : err
    })
  }
}
)

module.exports = { getProfile, setProfilePic, setBackgroundPic, updateProfile ,deleteUser , allPostsForUser};
