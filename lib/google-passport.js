const GoogleStrategy = require("passport-google-oauth20");
const passport = require("passport");
require("dotenv").config();
const userController = require('../controllers/userController')



/*
  GET
    made to localhost:3001/users/authenticate
    to get redirect to Google permissions screen.
*/

passport.use(
  new GoogleStrategy(
    {
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      clientID: process.env.GOOGLE_CLIENT_ID,
      callbackURL: "/users/google-auth/redirect",
      scope: ["profile", "email"],
      failureRedirect: "http://localhost:3001"
    },
    (accessToken, refreshToken, profile, done) => {
      const user = profile._json;
      // console.log('Google Profile', user);
      // console.log('Google Access Token', accessToken)
      process.nextTick(() => done(null, user));
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