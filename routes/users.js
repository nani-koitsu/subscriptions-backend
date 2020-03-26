const express = require("express");
const router = express.Router();

const userController = require('../controllers/userController');

/* GET home page. */
router.get("/", function(req, res, next) {
    res.send('hello')
});

router.post('/signup', userController.signup);

router.post('/signin', userController.signin);

module.exports = router;