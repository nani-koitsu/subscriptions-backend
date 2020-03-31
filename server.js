const http = require("http");
const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const MessagingResponse = require("twilio").twiml.MessagingResponse;

require("./config/mongo/mongoDB");
require("./config/google/google-config");
require("dotenv").config();

app.use(passport.initialize());

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

const userJWTstrategy = require("./lib/Passport");

app.use(passport.initialize());
passport.use("jwt", userJWTstrategy);
app.disable("x-powered-by");
app.use(cors({ origin: "http://localhost:3000", credentials: false }));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/subscription", require("./routes/subscription"));
app.use("/twilio", require("./routes/twilio"));
app.use(twilioNotifications.notifyOnError);

app.post("/sms", (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message("The Robots are coming! Head for the hills!");

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
http.createServer(app).listen(1337, () => {
  console.log("Express server listening on port 1337");
});

module.exports = app;
