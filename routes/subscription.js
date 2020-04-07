const express = require("express");
const router = express.Router();
const passport = require("passport");
const subscriptionController = require("../controllers/subscriptionController");

router.get(
  "/get-all-user-subscriptions/:id",
  subscriptionController.getAllUserSubscriptions
);
router.get(
  "/get-subscription-id/:id",
  subscriptionController.getSubscriptionByID
);
router.delete("/delete-by-id/:id", subscriptionController.deleteByID);

router.post("/create-subscription", subscriptionController.addSubscription);

router.put('/edit-user-sub/:id', subscriptionController.editUserSubscription)

module.exports = router;
