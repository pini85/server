const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

//passport use this new strategy
passport.use(
  //create a new instance of google strategy
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      //google will redirect the user to this url which we will fetch the token code from
      callbackURL: '/auth/google/callback',
    },
    //the 2nd argument is the profile from the user we got form google
    (accessToken, refreshToken, profile, done) => {
      console.log('wazaaaaaaa', profile);
    }
  )
);
