//common js module
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//we installed a libary so express understands how to process cookies
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
//we have nothing to return so we don't hold it in a variable
require('./models/User');
require('./services/passport');
//connecting mongoose to our express
mongoose.connect(keys.mongoURI);
//the express server
const app = express();

//we use app.use when using middlewares for node these are all invoked when we get an incoming request before going to our route handlers

//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.(we use this to get the id from strip in billingRoutes.js)
app.use(bodyParser.json());

//we are configuring cookies n to express
app.use(
  cookieSession({
    //how long should the cookie last? 30 days 30days*24hours*60minutes*60seconds*1000milliseconds
    maxAge: 30 * 24 * 60 * 60 * 1000,
    //we use a key to encrypt our cookie. By default whenever we send out the token in the cookie it will be encypted.
    //provided an array because it will randomly select a different key if we had more than 1.
    keys: [keys.cookieKey],
  })
);
//we tell passport to use cookies
app.use(passport.initialize());
app.use(passport.session());
/*
app.get is creating a brand new router handler with the get method
"/" whenever you are in this route
req object reperesnting the incoming request. Data on how is making the request and some associated data with it.
res representing the data that is going to to respond to the incoming request
res.send tells express we immideatly want to close this request and send that data back.
*/
// app.get('/', (req, res) => {
//   res.send({ hi: 'there!' });
// });
//the require is returning a function and we immediately invoke it with app as an argument
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

//instructs express to tell node that it wants to listen for imcoming traffic on port 5000 or production server that we get from heroku as an envirment variable
const PORT = process.env.PORT || 5000;
app.listen(PORT);
