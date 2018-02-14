const mongoose = require("mongoose");
const User = mongoose.model("User");
const DailyEntry = mongoose.model("DailyEntry");
const Gym = mongoose.model("Gym");
var moment = require("moment-timezone");
const Team = mongoose.model("Team");

exports.getLeaderboard = (req, res) => {
  let leaderboardResults = [];
  let weeklyLeaderboard = [];
  let teamLeaderboard = [];
  const weekStart = moment
    .tz("America/New_York")
    .startOf("week")
    .toISOString();
  DailyEntry.find({ gym: req.params.gymId })
    .populate({ path: "owner", select: "name picture team" })
    .populate({
      path: "owner",
      populate: { path: "team", select: "name" }
    })
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
        // Team leaderboard logic
        let existingTeamEntry = teamLeaderboard.find(team => {
          return entry.owner.team && team.id === entry.owner.team._id;
        });
        if (existingTeamEntry) {
          existingTeamEntry.total += entry.entryTotal;
        } else if (entry.owner.team) {
          //make sure user is part of a team before pushing the entry anywhere
          teamLeaderboard.push({
            id: entry.owner.team._id,
            total: entry.entryTotal,
            name: entry.owner.team.name
          });
        }
      });
      res.send({
        overallLeaderboard: leaderboardResults,
        weeklyLeaderboard: weeklyLeaderboard,
        teamLeaderboard: teamLeaderboard
      });
    });
};

exports.getTeams = (req, res) => {
  Team.find({ gym: req.params.gymId }).exec((err, teams) => {
    if (err) {
      console.log(err);
      return new Error("Error finding the gym's teams");
    } else {
      res.send({ teams });
    }
  });
};
