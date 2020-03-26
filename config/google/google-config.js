const GoogleStrategy = require("passport-google-oauth20");
const passport = require("passport");
require("dotenv").config();
const User = require("../../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      clientID: process.env.GOOGLE_CLIENT_ID,
      callbackURL: "/auth/google/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      const user = profile._json;
      console.log("GIMMMMMMEEEEEE", user);
      new User({
        firstName: user.given_name,
        lastName: user.family_name,
        googleID: user.sub,
        email: user.email,
        googleVerified: user.email_verified,
        locale: user.locale
      })
        .save()
        .then(newUser => {
          console.log("new user created :", newUser);
        });
      // console.log("accessToken", accessToken);
      // console.log("refreshToken", refreshToken);
      // console.log("profile", profile);
      // console.log("User", user);
    }
  )
);
