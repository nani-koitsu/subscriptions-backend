const User = require("../models/User");
const Subscription = require("../models/Subscription");

module.exports = {
  addSubscription: async (req, res) => {
    let date = req.body.startDate;
    let convertedDate = parseInt((new Date(date).getTime() / 1000).toFixed(0));

    try {
      let foundUser = await User.findById(req.body.submittedBy);
      let newSubscription = await new Subscription({
        subscriptionType: req.body.subscriptionType,
        subscriptionName: req.body.subscriptionName,
        price: req.body.price,
        picture: req.body.picture,
        startDate: convertedDate,
        submittedBy: req.body.submittedBy,
      });
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
    let date = req.body.startDate;
    let convertedDate = parseInt((new Date(date).getTime() / 1000).toFixed(0));

    try {
      let updatedSubscription = await Subscription.findByIdAndUpdate(req.body.subID,
        {
          subscriptionType: req.body.subscriptionType,
          price: req.body.price,
          startDate: convertedDate
        }, { new: true })

      // console.log('Line 72 Updated Subscription', updatedSubscription)
      res.status(200).json(updatedSubscription)

    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
};
