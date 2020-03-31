const router = require("express").Router();
const twilioController = require("../controllers/twilioController");

// number is hardcoded here
router.get("/sms", twilioController.twilioSendMsg);

module.exports = router;
