var express = require('express');
var router = express.Router();
const jwtAuthz = require('express-jwt-authz');
const { checkJwt } = require('../helpers/auth.js');
const entriesController = require('../controllers/entriesController.js');

// router.get('/dailyentry', checkJwt, entriesController.getDailyEntry);
router.get('/dailyentry', checkJwt, jwtAuthz(['athlete']), entriesController.getDailyEntry);

module.exports = router;
