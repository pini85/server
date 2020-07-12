- Passport.js and authentication flow

-1.create a new passport strategy (passport.js)
-inside we will define a url that google will give us the code token.

-2.when they go to our specific route we will start the authentication process (auth/google) (authRoutes.js)

-3.when google will redirect us to that url, google will give us the code and passport send it back to google to verify that indeed it is the same user (auth/google/callback)(authRoutes.js)

-4.Google will then return us the user. We retrieve the user information from the 2nd argument in new passport strategy (passport.js)

-5.We configured to send a cookie to the browser. We wired up a route when the user goes to that url we will get the cookie from passport(authRoutes.js) (see cookie flow for more details)

-6. When passport finishes its thing (we are logged in now),we take the request to the next argument and say redirect to /surveys (authRoutes.js)

-7. We set up a route to logout (authRoutes.js)

- MongoDb and Mongoose

--Mongoose interacts with MongoDb by a model class (collection) and instance of the model (records)--

1.wire up mongodb with mongoose with the url we get from mongo atlas (index.js)

authentication flow:

\*Mongoose with authentication
1.once we get the profile from google (2nd argument new passport strategy), we see if the user already exsists, if not save it to the database.(new User)

2.When we returned the cookie, passport will deserialize it and mongoose will check for the user with the cookie.(findById)(passport.js)

- Cookies

-1.We install the dependencies that express can handle cookies

-2.We configure express to use cookies with middlewares app.use (index.js)

-we extract that cookie and assign it to req.session. One of the properties inside req.session is passport and inside the passport is the user.id which passport will take to serialize and deserialze(passport.js)

3.We tell passport to use cookies (index.js)
-so now passport will send the user.id to the cookie and serialize it (passport.js)
-when the user talks to our server again we will deserialize the cookie header, mongoose will find that specific user and passport will send it as res.user (see passport flow 5.)
-these are middlewares that will do some logic before going to the route handlers as res.user

- Proxy on client
  We created a proxy to deal with relative paths in our client side. We have an url /auth/google it would of gone to localhost 3000 so we created a proxy saying go to localhost5000/auth/google. But in production the create react app disappears and it is not relevant to us anymore.
  So anytime we go to our express server through create react app it will go through a proxy.
  Under the hood when localhost3000 sends the req the proxy takes a hold of the req and localhost3000 req is pending. Proxy takes a COPY of that req sends it to our express app which in turn says redirects us to /auth/google/callback. We then take that req and give it to our localhost3000 because it is a relevant path it transforms to localhost3000/auth/google/callback. Our localhost3000 see's that we need to redirect to google, user then authorizes us, then google directs us to /auth/google/callback/code=123.
  that req goes to our localhost3000, the proxy takes it, localhost3000 req is pending,proxy takes a copy gives it to localhost5000, our express says go to "/". proxy then gives that to our localhost3000 pending request.
  We could also set it up that we don't need a proxy. But there would be two problems. Cookies from localhost3000 wont go be default to localhost5000.
  Also when we request data from localhost5000 API from localhost 3000 we have the CORS problem.

- React in Production with Express
  Express flow:
  We have a problem in production that we wired routes with React Router. In production there is no create react app to tell the server that I created the routes.
  So what happens is we make an http request to a specific route.(/surveys) Express will try to handle it but it will say it doesn't have that kind of route.
  So what we need to do is when there is a route that express doesn't know we want to give our index.html back to the client. So when we respond with that file. They will look inside the index.html. It sees it needs to load our bundle js file. It will again ask for express for it. But this time it is a very specific file (/client/build/static/js/main.js) Express doesn't know about this file. so we need to tell express to give that file.Then there is the logic of the react router.(index.js)

  Heroku flow:

We are not commiting to git our build. So we need to tell heroku to do it. The flow is like this:
Push to Heroku > Heroku installs server dep > Heroku runs "heroku-postbuild" > inside that script we tell heroku to install client dev > then tell heroku to run npm run build(package.json):

"heroku-postbuild"
we tell heroku to do this before you run it in the server

heroku config:set NPM_CONFIG_PRODUCTON=false
by default it is equal to true to install production dependencies only.

npm install --prefix client
we tell it to look at the client folder and install the dev dependencies

&& npm run build --prefix client
we tell it to run npm build in the client folder

- surveys flow
  ffsdf
