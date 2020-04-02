const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const cloudinaryController = require("../controllers/cloudinaryController");

/* GET home page. */
// router.get("/", function(req, res, next) {
//   res.send("hello");
// });

router.get("/", cloudinaryController.fetchAllImages);
router.post("/signup", userController.signup);
router.post("/signin", userController.signin);

module.exports = router;
