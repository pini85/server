- Passport.js and authentication flow

  1.create a new passport strategy (passport.js)
  -inside we will define a url that google will give us the code token.
  2.when they go to our specific route we will start the authentication process (authRoutes.js)
  3.when google will redirect us to that url, google will give us the code and passport send it back to google to verify that indeed it is the same user (authRoutes.js)
  4.Google will then return us the user. We retrieve the user information from the 2nd argument in new passport strategy (passport.js)
  5.We configured to send a cookie to the browser. We wired up a route when the user goes to that url we will get the cookie from passport(authRoutes.js) (see cookie flow for more details)

  6. We set up a route to logout (authRoutes.js)

* MongoDb and Mongoose

\*Mongoose interacts with MongoDb by a model class (collection) and instance of the model (records)

1.wire up mongodb with mongoose with the url we get from mongo atlas (index.js)

authentication flow:

1.once we get the profile from google (2nd argument new passport strategy), we see if the user already exsists, if not save it to the database.
2.When we returned the cookie passport will deserialize it and mongoose will check for the user with the cookie.(passport.js)

- Cookies

  1.We install the dependencies that express can handle cookies
  2.We configure express to use cookies (index.js)

  - we extract that cookie and assign it to req.session. One of the properties inside req.session is passport and inside the passport is the user.id which passport will take to serialize and deserialze
    3.We tell passport to use cookies (index.js)
    -so now passport will send the user.id to the cookie and serialize it (passport.js)
    -when the user talks to our server again we will deserialize the cookie header, mongoose will find that specific user and passport will send it as res.user (see passport flow 5.)
    -these are middlewares that will do some logic before going to the route handlers as res.user
