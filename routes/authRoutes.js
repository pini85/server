const passport = require('passport');
//we wrap this in a function so we can export this and get the app from express
module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );
  //passport is going to take the code that is in the end of the callback and send it back to google and then in return we get their profile from the 2nd argument of the passport config
  app.get('/auth/google/callback', passport.authenticate('google'));
};
