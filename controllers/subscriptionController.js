const User = require("../models/User");
const Subscription = require("../models/Subscription");
const Appointment = require('../models/Appointment');
const subHelper = require('../utils/subHelper');

module.exports = {
  addSubscription: async (req, res) => {
    try {
      let foundUser = await User.findById(req.body.submittedBy);
      let newSubscription = subHelper.createSubscription(req.body)
      let savedSubscription = await newSubscription.save();
      // console.log("saved sub", savedSubscription);

      await foundUser.subscriptions.push(savedSubscription);
      await foundUser.save();
      res.status(200).json(savedSubscription);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getSubscriptionByID: async (req, res) => {
    const id = req.params.id;
    try {
      let selectedSubscription = await Subscription.findById({
        submittedBy: id,
      });
      res.status(200).json(selectedSubscription);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  deleteByID: async (req, res) => {
    try {
      let foundUser = await User.findById(req.body.submittedBy);
      let foundAppointment = await Appointment.findOne({subscriptionId: req.body.subID});
      
      let deletedApp = await Appointment.findByIdAndRemove(foundAppointment._id)
      let deletedSub = await Subscription.findByIdAndRemove(req.body.subID);

      let newSubArray = await foundUser.subscriptions.filter(item => {
        return req.body.subID !== item._id.toString()
      })
      
      foundUser.subscriptions = newSubArray;

      let newAppArray = await foundUser.appointments.filter(item => {
        return foundAppointment._id.toString() !== item._id.toString()
      })

      foundUser.appointments = newAppArray;
      
      await foundUser.save()

      res.status(200).json({
        deletedSub: deletedSub,
        deletedApp: deletedApp
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getAllUserSubscriptions: async (req, res) => {
    const id = req.params.id;
    try {
      let allUserSubscriptions = await User.findById({ _id: id })
        .populate("subscriptions")
        .exec();
      // console.log(allUserSubscriptions.subscriptions);
      res.status(200).json(allUserSubscriptions.subscriptions);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  editUserSubscription: async (req, res) => {
    try {
      let updatedSubscription = await subHelper.editSubscription(req.body)
      // console.log('Line 72 Updated Subscription', updatedSubscription)
      res.status(200).json(updatedSubscription)

    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
};
