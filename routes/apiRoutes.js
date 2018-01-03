var express = require('express');
var router = express.Router();
const jwtAuthz = require('express-jwt-authz');
const { checkJwt } = require('../helpers/auth.js');

router.get('/private', checkJwt, jwtAuthz(['athlete']), function(req, res) {
	console.log('Got a request!!');
	console.log(req.user);
	console.log('Req headers: ', req.headers);
	console.log('VARS: ', process.env.AUTH0_AUDIENCE, process.env.AUTH0_DOMAIN);
	res.send('In private route 💩');
});
module.exports = router;
