const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//we don't require the whole file here because in a testing enviroment we would call to create a user collection many times and mongoose will get confused
const User = mongoose.model('users');

//when a user logins in we need to provide a unique id for them so when they request something we can identify them. We take the user model instance from mongoose, We take their id from the mongo database. We won't take the google id because they could of authenticate with a different strategy. Passport will stuff this user.id into a cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//when a user talks to our server again in the future we need to deserialize that user.id from that cookie. we are going to take that id and create a mongoose model instance. We will search our database for that particular id.
passport.deserializeUser((userId, done) => {
  User.findById(userId).then((user) => {
    done(null, user);
  });
});

//passport use this new strategy
passport.use(
  //create a new instance of google strategy
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      //google will redirect the user to this url which we will fetch the token code from
      callbackURL: '/auth/google/callback',
      //when we run in production our browser sends a request heroku passes it to a proxy then to the right heroku server. Our callback url in google is with https but Passport doesn't trust proxies so they type it as wwww. then that will give us an error because the callback is not the same as we described in our google api. proxy true says even if it goes to a proxy its okay.
      proxy: true,
    },

    //the 2nd argument is the profile from the user we got fr0m google
    async (accessToken, refreshToken, profile, done) => {
      //everytime we do a crud operation in our database it is asychnrounous
      //findOne is finding one record in our collection
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        //done tells passport that the authentication flow is finished. first argument is an error and 2nd is the user itself
        return done(null, existingUser);
      }
      //this creates a mongo model instance
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
