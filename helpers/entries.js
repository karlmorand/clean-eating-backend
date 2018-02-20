// check the user's past week, see how many workout points they have, if it's already 5 then they can't get a new workout point.

//look at the daily entry that is sent in
const mongoose = require("mongoose");
var moment = require("moment-timezone");
const DailyEntry = mongoose.model("DailyEntry");

module.exports.checkReachedMaxWeeklyPoints = async dailyEntry => {
  const now = moment.tz("America/New_York").toISOString();
  const weekStart = moment
    .tz("America/New_York")
    .day(0)
    .startOf("day")
    .toISOString();
  console.log("DAYS: ", weekStart, now);

  //get all of the user's entries from the past week

  const entries = await DailyEntry.find({
    owner: dailyEntry.owner,
    date: {
      $gte: weekStart,
      $lte: now
    }
  }).exec();

  const updatedQuestions = dailyEntry.entryQuestions.map(question => {
    if (question.maxWeeklyPoints > 0) {
      //logic for looping over weekly entries, calculating running total, and deciding if it should be enabled
      let weeklyTotal = 0;
      entries.forEach(entry => {
        let currentQuestion = entry.entryQuestions.find(
          entryQ => entryQ.questionTitle === question.questionTitle
        );
        weeklyTotal += currentQuestion.currentValue;
      });
      if (weeklyTotal >= question.maxWeeklyPoints) {
        question.disabled = true;
      }
      return question;
    } else {
      return question;
    }
  });

  return new Promise((resolve, reject) => {
    if (entries) {
      resolve(updatedQuestions);
    } else {
      reject(Error("Couldn't check max weekly points for entry"));
    }
  });
};
