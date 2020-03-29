const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
const now = moment();
const UserSchema = new Schema({
  email: { type: String, unique: true, required: true, default: "" },
  firstName: { type: String, unique: true, default: "" },
  lastName: { type: String, unique: true, default: "" },
  password: { type: String, default: "", required: true },
  googleID: { type: String, unique: true, default: "" },
  subscriptions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Subscription", default: "" }
  ],
  timestamp: {
    type: String,
    default: now.format("dddd, MMMM Do YYYY, h:mm:ss a")
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
