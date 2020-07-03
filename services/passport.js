const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
//we don't require the whole file here because in a testing enviroment we would call to create a user collection many times and mongoose will get confused
const User = mongoose.model('users');
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
      new User({ googleId: profile.id }).save();
    }
  )
);
