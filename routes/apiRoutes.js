var express = require('express');
var router = express.Router();
const jwtAuthz = require('express-jwt-authz');
const { checkJwt } = require('../helpers/auth.js');
const entriesController = require('../controllers/entriesController.js');
const usersController = require('../controllers/usersController.js');

router.get('/dailyentry/:authId', checkJwt, jwtAuthz(['athlete']), entriesController.getDailyEntry);

router.post('/usersetup/:authId', checkJwt, jwtAuthz(['athlete']), usersController.userSetup);

router.post('/dailyentry/:entryId', checkJwt, jwtAuthz(['athlete']), entriesController.updateDailyEntryScore);

module.exports = router;
