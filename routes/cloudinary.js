const express = require("express");
const router = express.Router();
const cloudinaryController = require("../controllers/cloudinaryController");

/*
   @ route    GET /cloudinary
   @ desc     Fetch available images from cloudinary collection.
   @ access   Private
*/

router.get("/", cloudinaryController.fetchAllImages);

module.exports = router;
