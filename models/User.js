const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const UserSchema = new Schema({
  email: { type: String, unique: true, default: "" },
  password: { type: String, default: "" },
  googleID: String,
  subscriptions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" }
  ],
  timestamp: {
    type: String,
    default: moment.format("dddd, MMMM Do YYYY, h:mm:ss a")
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
