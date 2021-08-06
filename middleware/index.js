const jwksRsa = require('jwks-rsa');
const jwt = require('express-jwt');

const logger = (req, res, next) => {
console.log('Logging route:', 
req.path, 
new Date().toISOString())
// reminder to self: remember to call next otherwise the API will get hung up on the middleware!!!
next()
}

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  // Validate the audience and the issuer.
  audience: process.env.AUTH0_IDENTITY,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

module.exports = {
  logger,
  checkJwt
}