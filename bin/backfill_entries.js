#!/usr/bin/env node

var mongoose = require("mongoose");
const User = require("../models/User.js");
const DailyEntry = require("../models/DailyEntry.js");
const Gym = require("../models/Gym.js");
require("dotenv").config({ path: "variables.env" });
var eachDay = require("date-fns/each_day");
var moment = require("moment-timezone");
const MomentRange = require("moment-range");
const Range = MomentRange.extendMoment(moment);
var mongoDBURI = process.env.DATABASE;
//TESTING DB:
// var mongoDBURI =
//   "mongodb://karlmorand:MontgomeryInn@ds239047.mlab.com:39047/clean-eating";

process.on("unhandledRejection", error => {
  console.log("Unhandled rejection: ", error);
});

let addedEntries = 0;
let names = [];

var options = {
  keepAlive: 300000,
  connectTimeoutMS: 30000
};
mongoose.connect(mongoDBURI, options);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

const closeDbConnection = () => {
  mongoose.connection.close(function() {
    console.log("Mongoose connection disconnected");
  });
};

mongoose.connection.once("open", async function() {
  console.log("Connected to mongo at: ", mongoDBURI);
  const updatedUsers = await getUsersToUpdate();
  console.log("Finished updating user entries");
  console.log(`Created ${addedEntries} new entries for...`);
  console.log(names);

  closeDbConnection();
});

const getUsersToUpdate = async () => {
  try {
    const users = await User.find({})
      .populate("gym")
      .exec();

    const updatedUsers = await Promise.all(
      users.map(user => updateUserEntries(user))
    );
    return new Promise((resolve, reject) => {
      resolve(updatedUsers);
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const updateUserEntries = async user => {
  try {
    //find the user's missing dates
    const missingDates = await findMissingDates(user._id);
    console.log("MISSING DAYS: ", missingDates);

    // create a new entry for each date.
    const newEntries = await Promise.all(
      missingDates.map(date => createNewEntry(user, date))
    );
    console.log("NEW ENTRIES: ", newEntries.length);
    return new Promise((resolve, reject) => {
      resolve(newEntries);
    });
  } catch (error) {
    console.log("ERROR in updateUserEntries: ", error);
    throw new Error(error);
  }
};

const findMissingDates = async userId => {
  //Does this need to return a promise to make sure the await when it's called works
  try {
    const challengeDates = Range.range(new Date(2018, 1, 26), Date.now());
    const days = Array.from(challengeDates.by("day"));
    // const missingDates = [];

    const missingDates = await Promise.all(
      days.map(day => lookForExistingEntry(userId, day))
    );
    return missingDates.filter(date => date !== null);
  } catch (error) {
    console.log("ERROR findMissingDates: ", error);
    throw new Error(error);
  }
};

const lookForExistingEntry = async (userId, day) => {
  // search for an entry, if it doesn't exist resolve the day, if it does resolve null
  try {
    let dayStart = moment
      .tz(day, "America/New_York")
      .startOf("day")
      .toISOString();
    let dayEnd = moment
      .tz(day, "America/New_York")
      .endOf("day")
      .toISOString();
    const entry = await DailyEntry.findOne({
      owner: userId,
      date: {
        $gte: dayStart,
        $lte: dayEnd
      }
    });

    return new Promise((resolve, reject) => {
      if (!entry) {
        resolve(day);
      } else {
        resolve(null);
      }
    });
  } catch (error) {
    throw new Error(error);
  }
};

const createNewEntry = (user, date) => {
  return new Promise((resolve, reject) => {
    if (!user.onboardingComplete) {
      console.log("New user - not creating entry: ", user.name, date);
      resolve("New user - can't create entries till onboarding complete");
    }
    const newEntry = new DailyEntry({
      authId: user.authId,
      owner: user._id,
      entryQuestions: user.gym.currentQuestions,
      gym: user.gym._id,
      date: date
    });

    newEntry
      .save()
      .then(savedEntry => {
        console.log("Created entry for: ", user.name, date);
        addedEntries += 1;
        if (!names.includes(user.name)) {
          names.push(user.name);
        }
        resolve(savedEntry);
      })
      .catch(error => {
        reject(error);
      });
  });
};
