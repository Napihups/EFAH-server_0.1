const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const LocalStrategy = require('passport-local').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');


passport.serializeUser((user, done) => {
    console.log("Serialized user invoked ");
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    console.log('Deserialized user invoked ');
    User.findById(id).then(user => {
        done(null, user);
    })
})


const passportConfig = {
    callbackURL : '/auth/google/redirect', // ensure full path without hostname
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}

passport.use(
    new GoogleStrategy(
        passportConfig,
        (accessToken, refreshToken, profile, done) => {
           // check if user already exist in DB 
           User.findOne({googleId : profile.id}).then(currentUser => {
                if(currentUser) {
                    // user already exist <code> 
                    console.log('User already exist in our DB ' + currentUser)
                    done(null, currentUser);
                } else {
                    // if not, create as new user 
                    let newUser = new User({
                        username : profile.displayName,
                        googleId: profile.id
                    }); 
                    newUser.save().then(resp => {
                        console.log("New user created : " + resp)
                        console.log("Test " + resp.id);
                        done(null, newUser);
                    })
                    .catch(err => {
                        console.log("Error saving new User to DB " + err);
                    })
                }
           })
        }
    )
)


// passport.use(new LocalStrategy(
//     function(username, password, done) {
//         console.log("Test Local strategy");
//       User.findOne({ username: username }, function(err, user) {
//         if (err) { return done(err); }
//         if (!user) {
//           return done(null, false, { message: 'Incorrect username.' });
//         }
//         if (!user.validPassword(password)) {
//           return done(null, false, { message: 'Incorrect password.' });
//         }
//         return done(null, user);
//       });
//     }
//   ));