const router = require("express").Router();
const passport = require("passport");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// callback route for google to redirect
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.send("hello");
});
// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/login",
//     session: false
//   }),
//   function(req, res) {
//     res.redirect("/");
//   }
// );
module.exports = router;
