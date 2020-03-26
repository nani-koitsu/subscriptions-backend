const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const SubscriptionSchema = new Schema({
  subscription: { type: String, trim: true, required: true, default: "" },
  amount: { type: Number, require: true, default: 0 },
  dueDate: { type: Date, default: "" },
  image: { type: String, default: "" },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  timestamp: {
    type: String,
    default: moment.format("dddd, MMMM Do YYYY, h:mm:ss a")
  }
});

module.exports = mongoose.model("Subscription", SubscriptionSchema);
