const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
const now = moment();
const SubscriptionSchema = new Schema({
  subscriptionType: { type: String, trim: true, default: "" },
  subscriptionName: { type: String, trim: true, default: "" },
  price: { type: String, required: true, default: "" },
  picture: { type: String, trim: true, default: "" },
  startDate: { type: String, default: "" },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  timestamp: {
    type: String,
    default: now.format("dddd, MMMM Do YYYY, h:mm:ss a"),
  },
});

module.exports = mongoose.model("Subscription", SubscriptionSchema);
