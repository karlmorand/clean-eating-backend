// check the user's past week, see how many workout points they have, if it's already 5 then they can't get a new workout point.

//look at the daily entry that is sent in
const mongoose = require("mongoose");
var moment = require("moment-timezone");
const DailyEntry = mongoose.model("DailyEntry");

module.exports.checkReachedMaxWeeklyPoints = dailyEntry => {
  const now = moment.tz("America/New_York").toISOString();
  const weekStart = moment
    .tz("America/New_York")
    .day(0)
    .startOf("day")
    .toISOString();
  console.log("DAYS: ", today, weekStart);

  //get all of the user's entries from the past week

  const entries = DailyEntry.find({
    owner: dailyEntry.owner,
    date: {
      $gte: weekStart,
      $lte: now
    }
  }).exec((err, entries) => {
    if (err) {
      console.log("ERROR finding entries in checkReachedMaxWeeklyPoints");
      return new Error("Can't find entries to checkReachedMaxWeeklyPoints");
    }
    // TODO: Definetly need to setup a better way to handle this
    //loop over the entries, key can be question title, use similar logic to the leadeboard in terms of looping overobejcts and createing new array
    entries.forEach(entry => {});
  });
};
