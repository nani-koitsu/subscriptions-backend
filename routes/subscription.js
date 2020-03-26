const express = require("express");
const router = express.Router();
const passport = require("passport");
const subscriptionController = require("../controllers/subscriptionController");

router.get(
  "/get-all-subscriptions",
  subscriptionController.getAllUserSubscriptions
);
router.post("/create-talk", passport.authenticate("jwt", { session: false }));
router.get(
  "/get-subscription-id/:id",
  passport.authenticate("jwt", { session: false }),
  subscriptionController.getSubscriptionByID
);
router.get(
  "/get-all-usersubscriptions/:id",
  passport.authenticate("jwt", { session: false })
);
router.delete(
  "/delete-by-id/:id",
  passport.authenticate("jwt", { session: false }),
  subscriptionController.deleteByID
);
