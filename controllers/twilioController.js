const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER } = require('../config')
const accountSid = TWILIO_ACCOUNT_SID;
const authToken = TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const Appointment = require('../models/Appointment');
const User = require('../models/User');

module.exports = {
  twilioSendMsg: async (req, res) => {
    try {
      await client.messages
        .create({
          body: "💦",
          from: TWILIO_PHONE_NUMBER,
          to: "+19136090226"
        })
        .then(message => console.log(message));
      res.status(200).send("notification has been sent");
    } catch (error) {
      console.log(error);
      res.status(500).send("notification failed to deliver");
    }
  },
  createAppointment: async (req, res) => {
    console.log(req.body.daysPrior)
    try {
      let foundUser = await User.findById(req.body.submittedBy);
      let newAppointment = new Appointment({
        name: req.body.subscriptionName,
        phone: foundUser.contactNumber,
        time: new Date(req.body.reminderDate * 1000),
        submittedBy: req.body.submittedBy,
        subscriptionId: req.body._id,
        daysPrior: req.body.daysPrior
      });
      let savedAppointment = await newAppointment.save();
      await foundUser.appointments.push(savedAppointment);
      await foundUser.save();
      res.status(200).json(savedAppointment)
    } catch(error) {
      res.status(500).json(error)
    } 
  }
};
