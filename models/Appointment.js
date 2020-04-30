const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    name: { type: String, default: "" },
    phone: { type: String, default: "" },
    time: { type: Date, index: true },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription"},
    daysPrior: { type: String, default: "" }
})

module.exports = mongoose.model("Appointment", AppointmentSchema);