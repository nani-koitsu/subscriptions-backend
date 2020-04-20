const express = require("express");
const router = express.Router();
require('../lib/google-passport')
const userController = require("../controllers/userController");

/*
   @ route    POST users/signup
   @ desc     Create a user through application.
   @ access   Public
*/
router.post("/signup", userController.signup);
/*
   @ route    POST users/signup
   @ desc     Create a user through application.
   @ access   Public
*/
router.post("/signin", userController.signin);

module.exports = router;
