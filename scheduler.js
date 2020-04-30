const CronJob = require('cron').CronJob;
const notificationsWorker = require('./workers/notificationWorker');
const moment = require('moment');

const schedulerFactory = function () {
    return {
        start: function () {
            new CronJob('*/30 * * * *', function () {
                console.log('Running Send Notifications Worker for ' +
                    moment().format());
                notificationsWorker.run();
            }, null, true, '');
        },
    };
};

module.exports = schedulerFactory();

