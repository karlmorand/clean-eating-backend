const mongoose = require("mongoose");
const User = mongoose.model("User");
const DailyEntry = mongoose.model("DailyEntry");
const Gym = mongoose.model("Gym");
var moment = require("moment-timezone");

exports.getLeaderboard = (req, res) => {
  let leaderboardResults = [];
  let weeklyLeaderboard = [];
  let teamResults = [];
  const weekStart = moment
    .tz("America/New_York")
    .startOf("week")
    .toISOString();
  DailyEntry.find({ gym: req.params.gymId })
    .populate("owner", "name picture")
    .exec((err, dailyEntries) => {
      if (err) {
        console.log(err);
        return err;
      }
      //Overall results logic...loop over dailyEntries, add each value to a running list of each person, return [{_id:String, name:String, total: Number}]
      dailyEntries.forEach(entry => {
        let existingEntry = leaderboardResults.find(leaderboard => {
          return leaderboard.id === entry.owner.id;
        });
        if (existingEntry) {
          existingEntry.total += entry.entryTotal;
        } else {
          leaderboardResults.push({
            id: entry.owner.id,
            total: entry.entryTotal,
            name: entry.owner.name,
            picture: entry.owner.picture
          });
        }
        // Weekly results logic
        let existingWeeklyEntry = weeklyLeaderboard.find(leaderboard => {
          return leaderboard.id === entry.owner.id;
        });
        if (existingWeeklyEntry) {
          existingWeeklyEntry.total += entry.entryTotal;
        } else if (moment(entry.date).isAfter(weekStart)) {
          weeklyLeaderboard.push({
            id: entry.owner.id,
            total: entry.entryTotal,
            name: entry.owner.name,
            picture: entry.owner.picture
          });
        }
      });
      res.send({
        overallLeaderboard: leaderboardResults,
        weeklyLeaderboard: weeklyLeaderboard
      });
    });
};
