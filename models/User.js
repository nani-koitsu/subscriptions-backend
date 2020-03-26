const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
const now = moment();
const UserSchema = new Schema({
  email: { type: String, unique: true, required: true, default: "" },
  password: { type: String, default: "" },
  subscriptions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" }
  ],
  timestamp: {
    type: String,
    default: now.format("dddd, MMMM Do YYYY, h:mm:ss a")
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
