var mongoose = require("mongoose");
var User = mongoose.model("User");
var DailyEntry = mongoose.model("DailyEntry");
var Gym = mongoose.model("Gym");
var moment = require("moment-timezone");

User.find({}).exec((err, users) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`***** Found ${users.length} users *****`);
  }
});
