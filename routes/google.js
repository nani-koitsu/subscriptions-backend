const express = require("express");
const router = express.Router();
const passport = require('passport')
// const userController = require("../controllers/userController");
require('../lib/google-passport')

router.get("/auth/google",
  passport.authenticate("google",
    {
      scope: ["profile", "email"]
    }
  ));

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: '/', session: false }),
  (req, res) => {
    console.log('REQ USER', req.user)
    let token = req.user;
    res.redirect('http://localhost:3000?token=' + token)
  }

);
// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: '/', session: false }),
//   (req, res) => {
//     console.log('REQ USER', req.user)
//     let token = req.user.token;
//     res.redirect('http://localhost:3000?token=' + token)
//   }

// );
module.exports = router;
