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

      console.log('signup line 17', savedUser);

      res.status(200).json({
        user: savedUser,
        message: "Get to hacking! Please Login",
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
  /*
    Reminder Google Users do not share
    the same validations as Users
  */
  googleAuthentication: async (req, res) => {
    try {

      let googleUser =
        await authHelper.findOneUser(req.user.email);

      if (googleUser === 404) {

        let newUser =
          await authHelper.createUser(req.user)

        let savedNewGoogleUser =
          await newUser.save()

        let googleJwtToken =
          await authHelper.createGoogleJwtToken(savedNewGoogleUser)

        res.status(200).json({
          token: googleJwtToken,
          message: `Welcome to Hack Subscripitons, Thank you ${req.user.email} for subscribing!`
        })

      } else {
        let googleJwtToken =
          await authHelper.createGoogleJwtToken(googleUser)

        console.log(googleJwtToken)
        res.status(200).json({
          token: googleJwtToken,
          message: `Welcome Back ${req.user.email}`
        })
      }

    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    }
  },
};
