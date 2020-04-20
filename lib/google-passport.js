const GoogleStrategy = require("passport-google-oauth20");
const passport = require("passport");
const authHelper = require('../utils/authHelper')
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      clientID: process.env.GOOGLE_CLIENT_ID,
      callbackURL: "http://localhost:3001/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log(profile)
      let userData = {
        token: accessToken,
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        googleVerified: profile.emails[0].verified,
        googleId: profile.id,
        profilePicture: profile.photos[0].value,
      }
      console.log('GOOGLE User Data from PASSPORT', userData)

      let jwtToken;

      try {

        let foundUser =
          await authHelper.findOneUser(userData.email)

        if (foundUser === 404) {
          let newUser =
            await authHelper.createGoogleUser(userData)

          let savedUser =
            await newUser.save()


          jwtToken =
            await authHelper.createGoogleJwtToken(savedUser)
          console.log('SAVED GOOGLE USER', savedUser)

        } else {

          jwtToken =
            await authHelper.createGoogleJwtToken(userData)

          console.log('LINE 50 GOOGLE JWT TOKEN', jwtToken)
        }

        return done(null, jwtToken)

      } catch (e) {
        return done(e, userData);
      }
    }
  )
);
