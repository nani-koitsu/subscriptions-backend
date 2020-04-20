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
      // console.log('Google Profile', profile)
      // console.log('Google's Access Token', accessToken)

      /*

        1. callbackURL will return an accessToken from Google API
        2. the access token gets deserialized in server.js
        3. deserialized decodes the access token which returns user profile
        4. create an object and extract from { profile }
        5. handle asyncrhonous functions before returning done & results
                i.e. mongo, jwt, error handling, etc....

      */

      let userData = {
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        googleVerified: profile.emails[0].verified,
        googleId: profile.id,
        profilePicture: profile.photos[0].value,
      }

      // console.log('USER DATA  line 37', userData)

      let jwtToken;
      let foundUser;

      try {

        foundUser =
          await authHelper.findOneUser(userData.email)

        if (foundUser === 404) {
          let newUser =
            await authHelper.createGoogleUser(userData)

          let savedUser =
            await newUser.save()


          jwtToken =
            await authHelper.createGoogleJwtToken(savedUser)

          // console.log('SAVED GOOGLE USER Line 58', savedUser)

        } else {

          jwtToken =
            await authHelper.createGoogleJwtToken(foundUser)

          // console.log(' GOOGLE JWT TOKEN Line 65', jwtToken)

        }

        return done(null, jwtToken)

      } catch (e) {
        return done(e, userData);
      }
    }
  )
);
