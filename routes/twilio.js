const router = require("express").Router();
const twilioController = require("../controllers/twilioController");

router.post('/create-appointment', twilioController.createAppointment)

module.exports = router;
