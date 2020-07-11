const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripSecretKey);
const requireLogin = require('../middlewares/requireLogin');
module.exports = (app) => {
  //2nd argument is saying when we get a request from the url here is a function that you need to run. We don't invoke it because we don't want to invoke it when we start our server. Only when they they get an upcoming request.
  //We can put any amount of middlewares inside app. The only requirement is that there will be one function that processes the request.
  app.post('/api/stripe', requireLogin, async (req, res) => {
    //in the frontend the client accepts the charge, it then sends it to strip and strip sends us back a token (id) to confirm it. We confirm it here in source
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '%$ for 5 credits',
      source: req.body.id,
    });
    //remember passport gives use the user under req.user
    req.user.credits += 5;
    //we need to save it in the mongo database
    const user = await req.user.save();

    //by convention we store the updated user to a variable. We could of used also req.user. But it could be since then the user has changed. So to be sure we get the latest.
    res.send(user);
  });
};
