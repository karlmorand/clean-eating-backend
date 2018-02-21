const mongoose = require("mongoose");
const User = mongoose.model("User");
const Gym = mongoose.model("Gym");
const DailyEntry = mongoose.model("DailyEntry");
const Team = mongoose.model("Team");

exports.userSetup = (req, res) => {
  console.log("USER SETUP: ", req.body);
  // TODO: Hardcoding CF513 as the gym for now since it's the only one, eventually will have to pass in the id of the gym the user selected during the onboarding
  // TODO: Make async to be cleaner than these nested callbacks
  Gym.findOne({}).exec((err, gym) => {
    if (err) {
      console.log(err);
      return err;
    }
    User.findOneAndUpdate(
      { _id: req.params.id },
      {
        gym: gym._id,
        onboardingComplete: true,
        challengeLevel: req.body.data.challengeLevel
      },
      { new: true }
    )
      .populate({
        path: "gym"
      })
      .exec((err, user) => {
        if (err) {
          console.log(err);
          return err;
        }
        // TODO: Add user to a gym's list of members
        res.send(user);
      });
  });
};

exports.updateUserChallengeLevel = (req, res) => {
  console.log("HERE: ", req.body.challengeFoodLevel);

  User.findOneAndUpdate(
    { _id: req.params.id },
    {
      challengeFoodLevel: req.body.challengeFoodLevel
    },
    { new: true }
  ).exec((err, updatedUser) => {
    if (err) {
      console.log(err);
      return err;
    } else {
      console.log(updatedUser);
      res.send(updatedUser);
    }
  });
};

exports.updateUserTeam = (req, res) => {
  console.log("UPDATE TEAM: ", req.body);

  User.findOneAndUpdate(
    { _id: req.params.userId },
    { team: req.body.team },
    { new: true }
  )
    .populate({
      path: "team",
      populate: { path: "leader", select: "name" }
    })
    .populate({
      path: "gym"
    })
    .exec((err, updatedUser) => {
      if (err) {
        console.log(err);
      } else {
        res.send(updatedUser);
      }
    });
};

exports.getUserProfile = (req, res) => {
  console.log("SEARCHING FOR USER: ", req.params);
  User.findOne({ authId: req.params.id })
    .populate({
      path: "team",
      populate: { path: "leader", select: "name" }
    })
    .populate({
      path: "gym"
    })
    .exec((err, user) => {
      if (err) {
        console.log(err);
        return err;
      }
      console.log("SENDING USER: ", user);
      res.send(user);
    });
};

exports.getHistory = (req, res) => {
  console.log("GET USER HISTORY");
  DailyEntry.find({ owner: req.params.id }).exec((err, entries) => {
    if (err) {
      console.log("ERROR GETTING HISTORY: ", err);
      return err;
    }
    res.send(entries);
  });
};
