//The flow of express is when we get a request to the server we put it through middlewares and then send it to our route handlers.
module.exports = (req, res, next) => {
  if (!req.user) {
    //if we do not have a user (for example going to /api/stripe) we will immedeatly return a status 401 that you must be logged in
    return res.status(401).send({ error: 'You must be logged in' });
  }
  //if there is a user then continue to the next middleware
  next();
};
