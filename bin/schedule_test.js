const mongoose = require("mongoose");
const User = mongoose.model("User");
const DailyEntry = mongoose.model("DailyEntry");
const Gym = mongoose.model("Gym");
var moment = require("moment-timezone");

User.find({}).exec((err, users) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`***** Found ${users.length} users *****`);
  }
});
