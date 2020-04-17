const GoogleStrategy = require("passport-google-oauth20");
const passport = require("passport");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      clientID: process.env.GOOGLE_CLIENT_ID,
      callbackURL: "http://localhost:3000/users/google-auth/redirect",
      scope: ["profile", "email"],
      failureRedirect: "http://localhost:3000/google-auth/failure",

    },
    (accessToken, refreshToken, profile, done) => {
      const user = profile._json;

      process.nextTick(() => done(null, user));
    }
  )
);
