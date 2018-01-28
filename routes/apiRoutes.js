var express = require('express');
var router = express.Router();
const jwtAuthz = require('express-jwt-authz');
const { checkJwt } = require('../helpers/auth.js');
const entriesController = require('../controllers/entriesController.js');
const usersController = require('../controllers/usersController.js');
const gymsController = require('../controllers/gymsController.js');

//Get today's daily entry if one exists, if not create one and return it
// TODO: Update this to get a daily entry based on a date passed
router.get('/dailyentry/:id/:date', checkJwt, jwtAuthz(['athlete']), entriesController.getDailyEntry);

router.post('/user/:id/setup', checkJwt, jwtAuthz(['athlete']), usersController.userSetup);
router.get('/user/:id/history', checkJwt, usersController.getHistory);
//Update a daily entry based on the id of the entry
router.post('/dailyentry/:entryId', checkJwt, jwtAuthz(['athlete']), entriesController.updateDailyEntryScore);

router.get('/user/:id', checkJwt, usersController.getUserProfile);

router.post('/user/:id', checkJwt, usersController.updateUserChallengeLevel);

router.get('/leaderboard/:gymId', checkJwt, gymsController.getLeaderboard);

module.exports = router;
