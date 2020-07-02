//common js module
const express = require('express');
//we have nothing to return so we dont hold it in a variable
require('./services/passport');
//the express server
const app = express();
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

//instructs express to tell node that it wants to listen for imcoming traffic on port 5000 or production server
const PORT = process.env.PORT || 5000;
app.listen(PORT);
