var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('dotenv').config({ path: 'variables.env' });
//Auth middleware from Auth0 guide
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const jwtAuthz = require('express-jwt-authz');
var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');

var User = require('./models/User');

var app = express();
app.use(cors());

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
	throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
}

const checkJwt = jwt({
	// Dynamically provide a signing key
	// based on the kid in the header and
	// the signing keys provided by the JWKS endpoint.
	secret: jwks.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: 'https://clean-eating.auth0.com/.well-known/jwks.json'
	}),

	// Validate the audience and the issuer.
	audience: 'https://cleaneatingapi.karlmorand.com',
	issuer: 'https://clean-eating.auth0.com/',
	algorithms: ['RS256']
});
// var jwtCheck = jwt({
// 	secret: jwks.expressJwtSecret({
// 		cache: true,
// 		rateLimit: true,
// 		jwksRequestsPerMinute: 5,
// 		jwksUri: 'https://clean-eating.auth0.com/.well-known/jwks.json'
// 	}),
// 	audience: 'https://cleaneatingapi.karlmorand.com',
// 	issuer: 'https://clean-eating.auth0.com/',
// 	algorithms: ['RS256']
// });

// QUESTION: Not sure if I want this to be in use everywhere (I think so, since nothing is completely public)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/private', checkJwt, jwtAuthz(['athlete']), function(req, res) {
	console.log('Got a request!!');
	console.log(req.user);
	console.log('Req headers: ', req.headers);
	console.log('VARS: ', process.env.AUTH0_AUDIENCE, process.env.AUTH0_DOMAIN);
	res.send('In private route 💩');
}); // app.use('/', index); // app.use('/users', users); // app.use('/api', api); // catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
