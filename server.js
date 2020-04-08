const http = require("http");
const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

/* MongoDB connection */
require("./config/mongo/mongoDB");

/* User Passport */
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));
passport.use("jwt", require('./lib/user-passport'));

/* Server Configuration */
app.use(passport.initialize());
app.disable("x-powered-by");
app.use(cors({ origin: "http://localhost:3000", credentials: false }));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

/* Routes */
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/twilio", require("./routes/twilio"));
app.use("/cloudinary", require("./routes/cloudinary"));
app.use("/subscription", require("./routes/subscription"));

/* App Server */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

/* Twilio Server for incoming messages */
http.createServer(app).listen(1337, () => {
  console.log("Express server listening on port 1337");
});

module.exports = app;
