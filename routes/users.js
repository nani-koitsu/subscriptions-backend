const express = require("express");
const router = express.Router();
const passport = require('passport')
require('../lib/google-passport')
const userController = require("../controllers/userController");

/*
  GET made to localhost:3001/users/authenticate to get to permissions screen.
*/

router.get(
  "/authenticate",
  passport.authenticate("google")
  // userController.googleUserSignin
);

/*
  callback route for google
  to redirect to localhost:3000/dashboard
*/


router.get(
  "/google-auth/redirect",
  passport.authenticate("google"),
  // usercontroller
  (req, res) => {
    console.log(res.json());
    res.send('fucking made it');
  }
);

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);

module.exports = router;
