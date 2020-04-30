const express = require("express");
const router = express.Router();
const passport = require('passport')
require('dotenv').config()



require('../lib/google-passport')
router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] }
  ));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: '/', session: false }),
  (req, res) => {
    console.log('Google JWT', req.user)
    let jwtToken = req.user;
    res.redirect(`/google/?token=${jwtToken}`)
  }
);

/*

 baseURL: process.env.NODE_ENV === 'development' ? '/api' : '',
 res.redirect(req.baseUrl + '/dee');

 */
module.exports = router;
