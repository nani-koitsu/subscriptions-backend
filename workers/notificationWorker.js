const twilioController = require('../controllers/twilioController');

const notificationWorkerFactory = function () {
    return {
        run: function () {
            twilioController.twilioSendMsg()
        },
    };
};

module.exports = notificationWorkerFactory();
