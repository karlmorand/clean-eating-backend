const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

module.exports.checkJwt = jwt({
	// Dynamically provide a signing key
	// based on the kid in the header and
	// the signing keys provided by the JWKS endpoint.
	secret: jwks.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: 'https://clean-eating.auth0.com/.well-known/jwks.json'
	}),
	audience: `${process.env.AUTH0_AUDIENCE}`,
	issuer: `${process.env.AUTH0_DOMAIN}`,
	algorithms: ['RS256']
});
