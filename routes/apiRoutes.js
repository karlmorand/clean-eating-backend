var express = require("express");
var router = express.Router();
const jwtAuthz = require("express-jwt-authz");
const { checkJwt } = require("../helpers/auth.js");
const entriesController = require("../controllers/entriesController.js");
const usersController = require("../controllers/usersController.js");
const gymsController = require("../controllers/gymsController.js");

router.get(
  "/dailyentry/existing/:entryId",
  checkJwt,
  entriesController.getExistingEntry
);
//Get today's daily entry if one exists, if not create one and return it
// TODO: Update this to get a daily entry based on a date passed
router.get("/dailyentry/:id/:date", checkJwt, entriesController.getDailyEntry);

router.post("/user/:id/setup", checkJwt, usersController.userSetup);
router.get("/user/:id/history", checkJwt, usersController.getHistory);
//Update a daily entry based on the id of the entry
router.post(
  "/dailyentry/:entryId",
  checkJwt,
  entriesController.updateDailyEntryScore
);

router.get("/user/:id", checkJwt, usersController.getUserProfile);
router.get("/team/:gymId", checkJwt, gymsController.getTeams);
router.post("/user/:id", checkJwt, usersController.updateUserChallengeLevel);
router.post("/team/:userId", checkJwt, usersController.updateUserTeam);

router.get("/leaderboard/:gymId", checkJwt, gymsController.getLeaderboard);

module.exports = router;
