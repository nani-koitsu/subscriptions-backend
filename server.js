const http = require("http");
const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const path = require('path');
const { CLIENT_HOST, SERVER_HOST } = require('./config');
const scheduler = require('./scheduler');

/*
  MongoDB connection
*/
require('./utils/mongo/mongoDB')
/*
User Passport
*/
app.use(passport.initialize());
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));
passport.use("jwt", require('./lib/user-passport'));


/*
Server Configuration
*/

app.disable("x-powered-by");
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

/*
Routes
*/

app.use("/api/auth", require("./routes/google"));
app.use("/api/users", require("./routes/users"));
app.use("/api/twilio", require("./routes/twilio"));
app.use("/api/cloudinary", require("./routes/cloudinary"));
app.use("/api/subscription", require("./routes/subscription"));


/*
Serve Static files in production
*/

// app.use(express.static(path.join(__dirname, 'public')));


/*
App Server
*/

// console.log(require('./config').GOOGLE_CALLBACK_URL)
// console.log(require('./config').GOOGLE_CALLBACK_URL)


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`
===================================
Listening on port: ${PORT}
Environment: ${process.env.NODE_ENV}
Server Host: ${SERVER_HOST}
Client Host: ${CLIENT_HOST}
==================================
`));

/*
  Twilio Server
*/

http.createServer(app).listen(1337, () => {
  console.log("Twilio Server listening on port 1337");
});

// scheduler.start();

module.exports = app;
