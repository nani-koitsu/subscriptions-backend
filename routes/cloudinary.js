const express = require("express");
const router = express.Router();
const cloudinaryController = require("../controllers/cloudinaryController");

/*
      CLOUDINARY ROUTER
  @ desc: Fetch all images from cloudinary collection
*/

router.get("/", cloudinaryController.fetchAllImages);

module.exports = router;
