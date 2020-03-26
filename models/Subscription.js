const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
const now = moment();
const SubscriptionSchema = new Schema({
  subscriptionType: { type: String, trim: true },
  subscriptionName: { type: String, trim: true, default: "" },
  price: { type: Number, require: true, default: 0 },
  startDate: { type: Date, default: "" },
  submittedBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  timestamp: {
    type: String,
    default: now.format("dddd, MMMM Do YYYY, h:mm:ss a")
  }
});

module.exports = mongoose.model("Subscription", SubscriptionSchema);
