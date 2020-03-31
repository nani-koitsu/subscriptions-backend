const twilio = require("twilio");
require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

module.exports = {
  twilioSendMsg: async (req, res) => {
    try {
      await client.messages
        .create({
          body: ".....you could be my postman, I could be your route 💦.",
          from: process.env.TWILIO_PHONE_NUMBER,
          to: "+19176261808"
        })
        .then(message => console.log(message));
      res.status(200).send("notification has been sent");
    } catch (error) {
      console.log(error);
    }
  }
};
