const GoogleStrategy = require("passport-google-oauth20");
const passport = require("passport");
const User = require("../../models/User");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      clientID: process.env.GOOGLE_CLIENT_ID,
      callbackURL: "/auth/google/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => done(null, profile));
    }
  )
);
//  const user = profile._json;
//  console.log("GIMMMMMMEEEEEE", user);
//  new User({
//    firstName: user.given_name,
//    lastName: user.family_name,
//    googleID: user.sub,
//    email: user.email,
//    picture: user.picture,
//    googleVerified: user.email_verified,
//    locale: user.locale
//  });
