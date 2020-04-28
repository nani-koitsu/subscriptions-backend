const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER } = require('../config')
const accountSid = TWILIO_ACCOUNT_SID;
const authToken = TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

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
  }
};
