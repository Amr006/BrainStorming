const Teams = require("../models/TeamsSchema");
const User = require("../models/UserSchema");
const Ideas = require("../models/IdeasSchema");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const uploadImage = require("../utils/uploadImage");
const logger = require("../logger/index");
const { DeleteFiles } = require("../utils/deleteFiles");

const imageUrlArray = [
  "https://res.cloudinary.com/dz7nwcejb/image/upload/v1693770866/teamImages/cfdhdw5258fvmcsevfvv.jpg",
  "https://res.cloudinary.com/dz7nwcejb/image/upload/v1693770891/teamImages/xuydumywevndbjthcg7t.jpg",
  "https://res.cloudinary.com/dz7nwcejb/image/upload/v1693770876/teamImages/tjpjidp9mkf5zq141lgg.jpg",
  "https://res.cloudinary.com/dz7nwcejb/image/upload/v1693770883/teamImages/f1twplpi1pjv8ootu03t.jpg",
  "https://res.cloudinary.com/dz7nwcejb/image/upload/v1693770861/teamImages/s3ceyg5l7vcxghyghnzh.png",
  "https://res.cloudinary.com/dz7nwcejb/image/upload/v1693770886/teamImages/yrjvivcu00uhbge2prry.jpg",
  "https://res.cloudinary.com/dz7nwcejb/image/upload/v1693770896/teamImages/dldkkbwzyldrs2ed7gem.jpg",
  "https://res.cloudinary.com/dz7nwcejb/image/upload/v1693770863/teamImages/zjmedcrpsfstc2ury9fk.jpg",
  "https://res.cloudinary.com/dz7nwcejb/image/upload/v1693770859/teamImages/qjmbnjp0ayfn0le3xc7e.jpg",
  "https://res.cloudinary.com/dz7nwcejb/image/upload/v1693770860/teamImages/ymlgcgxqf3bjgwxra5ov.jpg",
  "https://res.cloudinary.com/dz7nwcejb/image/upload/v1693770902/teamImages/gbemhxcid6zxum900mnk.jpg",
  "https://res.cloudinary.com/dz7nwcejb/image/upload/v1693770880/teamImages/gcikiqqcg8vweg6mgrl1.jpg",
];

const createTeam = asyncHandler(async (req, res, next) => {
  const { name, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const check = await Teams.findOne({ Name: name });
  if (check) {
    return res.status(402).json({
      message: "This Name Already Used",
    });
  }

  const randomNumber = Math.floor(Math.random() * 12);
  var filePath = imageUrlArray[randomNumber];
  const newTeam = new Teams({
    Name: name,
    Password: hash,
    TeamLeader: req.userId,
    Image: filePath,
    Members: [req.userId],
  });

  newTeam
    .save()
    .then(async (result) => {
      await User.findByIdAndUpdate(req.userId, {
        $push: { Teams: result._id },
      });
      return res.status(200).json({
        message: "Team created successfully",
      });
    })
    .catch((err) => {
      return res.status(404).json({
        message: err,
      });
    });
});

const displayTeams = asyncHandler((req, res, next) => {
  Teams.find()
    .select("-Password")
    .populate("TeamLeader")
    .sort({ createdAt: -1 })
    .then((result) => {
      return res.status(200).json({
        data: result,
      });
    })
    .catch((err) => {
      return res.status(404).json({
        message: err,
      });
    });
});

const joinTeam = asyncHandler(async (req, res, next) => {
  const { password, teamId } = req.body;

  const data = await Teams.findOne({ _id: teamId });

  if (data.Members.includes(req.userId)) {
    res.status(404).json({
      message: "Already joind the team",
    });
  } else {
    bcrypt.compare(password, data.Password, async (err, result) => {
      if (err) {
        res.status(403).json({
          error: err,
        });
      }
      if (result) {
        data.Members.push(req.userId);
        await data.save();
        await User.findByIdAndUpdate(
          { _id: req.userId },
          { $push: { Teams: teamId } }
        );
        res.status(200).json({
          message: "Joined team successfully !",
        });
      } else {
        res.status(403).json({
          message: "Password is incorrect",
        });
      }
    });
  }
});

const EnterTeam = asyncHandler(async (req, res, next) => {
  const teamId = req.params.id;

  const data = await Teams.findOne({ _id: teamId });
  if (data.Members.includes(req.userId)) {
    res.status(200).json({
      message: "Entered team successfully",
    });
  } else {
    res.status(403).json({
      message: "FLAG{THE_EAZY_FLAG}",
    });
  }
});

const setTeamImage = asyncHandler(async (req, res, next) => {
  console.log(req.files);
  var data = await Teams.findOne({ _id: req.params.id }).populate("TeamLeader");
  if (data.TeamLeader._id == req.userId) {
    var urlOfImage;
    if (req.files != undefined) {
      try {
        urlOfImage = await uploadImage(req.files[0]);
        data.Image = urlOfImage;
        data.save();
        logger.info(data);
      } catch (err) {
        return res.status(500).json({
          message: "Error while uploading image !",
        });
      }
    } else {
      return res.status(404).json({
        message: "you have to set an image",
      });
    }

    res.status(200).json({
      message: "Image updated successfully !",
      data: data,
    });
    DeleteFiles();
  } else {
    res.status(403).json({
      message: "you are not authorized",
    });
  }
});

const getTeamInfo = asyncHandler(async (req, res, next) => {
  try {
    const data = await Teams.findOne({ _id: req.params.id })
      .populate([
        { path: "Members", select: "-Password" },
        { path: "TeamLeader", select: "-Password" },
      ])
      .select("-Password");
    return res.status(200).json({
      data: data,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Error while getting team information",
    });
  }
});

// const deleteTeam = asyncHandler(async(req,res,next) => {

//   const data = await Teams.findById(req.params.id).populate({path:"TeamLeader",select:"-Password"})
//   if(req.userEmail === data.TeamLeader.Email)
//   {
//     await Teams.findByIdAndDelete(req.params.id)
//     await Ideas.deleteMany({Team : req.params.id})
//     return res.status(200).json({
//       message: "Team deleted successfully !",
//     });
//   }else
//   {
//     return res.status(403).json({
//       message: "you are not authorized",
//     });
//   }

// }
// )

const leaveTeam = asyncHandler(async (req, res, next) => {
  const teamId = req.params.id;
  const teamData = await Teams.findById(teamId);
  const userData = await User.findById(req.userId);

  if (teamData.Members.includes(req.userId)) {
    if (teamData.Members.length == 1) {
      await Teams.findByIdAndDelete(req.params.id);
      await Ideas.deleteMany({ Team: req.params.id });
      return res.status(200).json({
        message: "left successfully !",
      });
    }
    if (req.userId == teamData.TeamLeader && teamData.Members[1]) {
      teamData.TeamLeader = teamData.Members[1];
    }

    teamData.Members = teamData.Members.filter((e) => e != req.userId);
    userData.Teams = userData.Teams.filter((e) => e != req.params.id);
    try {
      await userData.save();
      await teamData.save();
    } catch (err) {
      res.status(404).json({
        message: "error while leaving the team !",
      });
    }

    return res.status(200).json({
      message: "left successfully !",
    });
  } else {
    return res.status(404).json({
      message: "you are not in the team",
    });
  }
});

const searchTeam = asyncHandler(async (req, res) => {
  const { search } = req.query;
  console.log(search);
  try {
    //const data2 = await Teams.find()
  //  console.log(data2)
    const data = await Teams.aggregate([
      {
        $search: {
          index: "searchTeam",
          text: {
            query: search,
            path: {
              wildcard: "*"
            }
          }
        }
      }
    ])
  //  console.log(data)
    
    // const searchRegex = new RegExp(search , "i")

    // const newdata = data2.filter((item) => {
    //   return searchRegex.test(item.Name)
    // }
    // )

    return res.status(200).json({
      data: data
    });
  } catch (err) {
    return res.status(404).json({
      message: "Error while searching"
    });
  }
});

module.exports = {
  createTeam,
  displayTeams,
  joinTeam,
  EnterTeam,
  setTeamImage,
  getTeamInfo,
  leaveTeam,
  searchTeam,
};
