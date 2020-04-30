const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER } = require('../config')
const accountSid = TWILIO_ACCOUNT_SID;
const authToken = TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const moment = require('moment');

module.exports = {
  twilioSendMsg: async () => {
    let searchDate = moment.utc().format();
    
    try {
      let appointmentArray = await Appointment.find({time: searchDate});
      
      if(appointmentArray.length > 0) {
        appointmentArray.forEach(async (appointment) => {
          let foundUser = await User.findById({_id: appointment.submittedBy})

          await client.messages.create({
            body: `Hey ${foundUser.firstName}! Your subscription for ${appointment.name} is due in ${appointment.daysPrior} days.`,
            from: TWILIO_PHONE_NUMBER,
            to: `+1${appointment.phone}`
          })
        })
      }
    } catch (error) {
      console.log(error);
    }
  },
  createAppointment: async (req, res) => {
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

//dueDate - may 1st
//appointment sends april 30th

//dueDate - june 1st
//apointment sends may 31st





