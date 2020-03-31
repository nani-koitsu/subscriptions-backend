const router = require("express").Router();
const passport = require("passport");
const userController = require("../controllers/userController");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get(
  "/google",
  passport.authenticate(
    "google",
    { scope: ["profile", "email"] },
    userController.googleUserLogin
  )
);

// callback route for google to redirect
router.get(
  "/google/redirect",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
  (req, res) => {
    console.log(res);
    res.send("hello");
  }
);
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