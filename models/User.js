const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
const now = moment();
const UserSchema = new Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    default: "",
  },
  password: {
    type: String,
    trim: true,
    default: ""
  },
  lastName: {
    type: String,
    trim: true,
    default: ""
  },
  firstName: {
    type: String,
    trim: true,
    default: ""
  },
  profilePic: {
    type: String,
    trim: true,
    default: ""
  },
  contactNumber: {
    type: Number,
    default: ''
  },
  googleID: {
    type: String,
    required: true,
    default: ''

  },
  googleVerified: {
    type: Boolean,
    default: false
  },
  textNotifyOn: {
    type: Boolean,
    default: false
  },

  subscriptions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Subscription", default: "" },
  ],
  timestamp: {
    type: String,
    default: now.format("dddd, MMMM Do YYYY, h:mm:ss a"),
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
