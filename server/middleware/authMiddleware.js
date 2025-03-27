const { auth } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
    audience: 'http://localhost:5000',
    issuerBaseURL: `dev-zkw25fcb4mi7wrdl.us.auth0.com`,
    tokenSigningAlg: 'RS256',
});

module.exports = checkJwt;