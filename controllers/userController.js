const authHelper = require("../utils/authHelper");
const url = require("url");
require("dotenv").config();

module.exports = {
  signup: async (req, res) => {
    try {
      let newUser = await authHelper.createUser(req.body);
      let hashedPassword = await authHelper.hashPassword(newUser.password);
      newUser.password = hashedPassword;
      let savedUser = await newUser.save();
      console.log(savedUser);

      res.status(200).json({
        user: savedUser,
        message: "User Successfully created! Please Login",
      });
    } catch (error) {
      let errorMessage = await authHelper.errorHandler(error);

      res.status(500).json({
        message: errorMessage,
      });
    }
  },
  signin: async (req, res) => {
    try {
      let foundUser = await authHelper.findOneUser(req.body.email);
      if (foundUser === 404) {
        throw "User not found, please sign up";
      }
      let comparedPassword = await authHelper.comparePassword(
        req.body.password,
        foundUser.password
      );
      if (comparedPassword === 409) {
        throw "Check your email and password";
      }
      let jwtToken = await authHelper.createJwtToken(foundUser);
      res.status(200).json({
        token: jwtToken,
      });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  },

  googleSignin: async (req, res) => {
    try {
      await authHelper.createGoogleUser;
      let jwtToken = await authHelper.createGoogleUserJwtToken(req.user);
      res.redirect(
        url.format({
          pathname: "http://localhost:3000/auth/google/redirect",
          query: {
            token: jwtToken,
          },
        })
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    }
  },
};
