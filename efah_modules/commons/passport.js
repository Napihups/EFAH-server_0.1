var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var configs = require('../../configs/properties');
const authDAO = require('../UserAuthModule/DAO_Auth');
const LDAP = require('../LDAP/ldap');


/**
 * Check for token Auth 
 */
module.exports = function(passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromBodyField();
    opts.secretOrKey  = configs.JWT.secret;
    opts.tokenBodyField = 'jwt_token';

    console.log('efef');
    passport.use(new JwtStrategy(opts, (userFromToken, done) => {
        console.log("kjdefie fef");
        console.log(userFromToken);
        let userInfo = userFromToken;
        // LDAP.checkTokenValid()
        authDAO.getUserById(userInfo.USER_ID).then(result => {done(null, result)}).catch(err => {
            done(err, null);
        });
    }))
}