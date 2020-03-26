const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true, default: "" },
  password: { type: String, default: "" },
  googleID: String,
  subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subs" }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
