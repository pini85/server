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
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    // after passport has authenticated us and we are logged in we pass the request to this callback function which will redirct us
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  //we go to this url when we want to logout. Passport will then kill the cookie.
  app.get('/api/logout', (req, res) => {
    req.logout();
    //we then redirect them to the root of our app
    res.redirect('/');
  });

  //when a user goes to this route we will give the current user to the response.
  // remember we already have the cookie and passport pulls out the id from there and deserializes the id and mongoose created an model instance of it and passport adds to req object as req.user
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
