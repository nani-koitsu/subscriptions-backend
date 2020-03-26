const User = require("../models/User");
const Subscription = require("../models/Subscription");

module.exports = {
  addSubscription: async (req, res) => {
    try {
      let foundUser = await User.findById(id);
      let newSubscription = await new Subscription({
        subscriptionName: req.body.subscriptionName,
        subscriptionType: req.body.subscriptionType,
        price: req.body.price,
        subscriptionType: req.body.subscriptionType,
        dueDate: req.body.dueDate,
        createdBy: req.body.user.id
      });
      let savedSubscription = await newSubscription.save();
      await foundUser.subscriptions.push(savedSubscription);
      await foundUser.save();
      res.status(200).json(savedNewTalk);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getSubscriptionByID: async (req, res) => {
    const id = req.params.id;
    try {
      let selectedSubscription = await Subscription.findById({ _id: id });
      res.status(200).json(selectedSubscription);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  deleteByID: async (req, res) => {
    const id = req.params.id;
    try {
      let deletedByID = await Subscription.findByIdAndRemove(id);
      res.status(200).json(deletedByID);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getAllUserSubscriptions: async (req, res) => {
    const id = req.params.id;
    try {
      let allUserSubscriptions = await User.findByID({ _id: id })
        .populate("subscriptions")
        .exec();
      res.status(200).json(allUserSubscriptions.subscriptions);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
};
