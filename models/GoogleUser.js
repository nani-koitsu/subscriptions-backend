const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const googleUserSchema = new Schema({
  username: String,
  googleID: String,
  subs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subs" }]
});

const GoogleUser = mongoose.model("GoogleUser", googleUserSchema);

module.exports = GoogleUser;
