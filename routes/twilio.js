const router = require("express").Router();
const twilioController = require("../controllers/twilioController");

// number is hardcoded here
router.get("/sms", twilioController.twilioSendMsg);

router.post('/create-appointment', twilioController.createAppointment)

module.exports = router;
