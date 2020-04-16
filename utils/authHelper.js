const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function hashPassword(password) {
  let genSalt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, genSalt);
  return hashedPassword;
}

async function createUser(user) {
  let newUser = await new User({
    id: user._id,
    email: user.email,
    password: user.password,
    contactNumber: user.contactNumber,
    firstName: user.given_name,
    lastName: user.family_name,
    subscriptions: user.subscriptions,
    picture: user.picture,
    googleID: user.sub,
    googleVerified: user.email_verified,
    locale: user.locale,
  });

  return newUser;
}

async function errorHandler(error) {
  let errorMessage = null;
  if (error.errmsg.includes("email_1")) {
    errorMessage = "Email Already Exist";
  }
  return errorMessage;
}

async function findOneUser(email) {
  try {
    let foundUser = await User.findOne({ email });
    if (!foundUser) {
      return 404;
    }
    return foundUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function createJwtToken(user) {
  let payload = {
    id: user._id,
    email: user.email,
  };

  let jwtToken = await jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: 3600,
  });
  return jwtToken
}

async function comparePassword(incomingPassword, userPassword) {
  console.log(incomingPassword, userPassword);
  try {
    let comparedPassword = await bcrypt.compare(incomingPassword, userPassword);
    console.log(comparedPassword);
    if (comparedPassword) {
      return comparedPassword;
    } else {
      throw 409;
    }
  } catch (error) {
    return error;
  }
}


async function createGoogleJwtToken(user) {
  let payload = {
    googleID: user.sub,
    id: user._id,
    email: user.email
  };

  let googleJwtToken = await jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: 3600,
  });
  res.redirect(
    url.format({
      pathname: "http://localhost:3000/auth/google/redirect",
      query: { token: googleJwtToken }
    })
  )
  return googleJwtToken

}

module.exports = {
  hashPassword,
  createUser,
  errorHandler,
  findOneUser,
  createJwtToken,
  comparePassword,
  createGoogleJwtToken,
};
