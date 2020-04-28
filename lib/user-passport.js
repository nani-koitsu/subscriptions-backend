const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");
const keys = require('../config').SECRET_KEY;


const jwtOpts = {};
jwtOpts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOpts.secretOrKey = keys;

const userJWTLogin = new JwtStrategy(jwtOpts, async (payload, done) => {
  const userEmail = payload.email;

  try {
    if (userEmail) {
      const user = await User.findOne({ email: userEmail });

      if (!user || user === null) {
        return done(null, false);
      }
      return done(null, user);
    }
  } catch (error) {
    return done(error, false);
  }
});

module.exports = userJWTLogin;
