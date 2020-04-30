const Subscription = require('../models/Subscription');

function createSubscription(sub) {
    //deconstruct obj into the various methods
    let { startDate, subscriptionName, subscriptionType, price, picture, daysPrior, submittedBy } = sub
    //calls dateConverter function and awaits its completion
    let convertedDates = dateConverter(startDate, daysPrior);

    let newSubscription = new Subscription({
        subscriptionType: subscriptionType,
        subscriptionName: subscriptionName,
        price: price,
        picture: picture,
        startDate: convertedDates.dueDate,
        submittedBy: submittedBy,
        daysPrior: daysPrior,
        reminderDate: convertedDates.notifyBy
    });
    
    return newSubscription
}

async function editSubscription(sub) {
    let { startDate, price, subscriptionType, subID, daysPrior } = sub
    let convertedDates = dateConverter(startDate, daysPrior);
    let updatedSubscription = await Subscription.findByIdAndUpdate(subID,
        {
            subscriptionType: subscriptionType,
            price: price,
            startDate: convertedDates.dueDate,
            daysPrior: daysPrior,
            reminderDate: convertedDates.notifyBy
        }, { new: true })

    return updatedSubscription
}


function dateConverter(startDate, daysPrior) {
    //creates a unix code from the exact point in time the sub was made
    let dueDate = parseInt((new Date(startDate).getTime() / 1000).toFixed(0))
    //takes the startDate and slices the first 10 indexes and converts it
    //into a unix number in seconds
    let dueDatePartial = parseInt((new Date(startDate.slice(0, 10)).getTime() / 1000).toFixed(0));
    //calls timeDifference function
    let timeDiff = timeDifference();
    let daysPriorUnix = '';
    //switch case that takes in the value of daysPrior and sets the
    //value of daysPriorUnix to a unix number equivalent to the users set
    //number of days prior to startDate they want text to be sent
    switch(daysPrior) {
        case "1":
            daysPriorUnix = 43200
        break;
        case "2":
            daysPriorUnix = 129600
        break;
        case "3":
            daysPriorUnix = 216000
        break;
        case "4":
            daysPriorUnix = 302400
        break;
        case "5":
            daysPriorUnix = 388800
        break;
        default:
        break;
    }
    //subtracts the two unix codes to get the unix code for date
    //for the message to be sent in unix
    let notifyBy = dueDatePartial - daysPriorUnix;
    //looks at the value of timeDiff and determines whether or not the
    //difference should be added or subtracts to accommodate for timezone
    if(timeDiff < 0) {
        notifyBy = notifyBy - timeDiff
    } else if(timeDiff > 0) {
        notifyBy = notifyBy + timeDiff
    }
    return {
        dueDate: dueDate,
        notifyBy: notifyBy
    }
}

function timeDifference() {
    //finds the hour in UTC time
    let utcTime = new Date().getUTCHours();
    //finds the hour of the local machines time
    let localTime = new Date().getHours();
    //finds the day of the month for UTC (1-31)
    let utcDate = new Date().getUTCDate();
    //finds the day of the month for local (1-31)
    let localDate = new Date().getDate();
    //compares the numerical values of the dates and based on whether
    //which number is bigger will convert the hours so when subtracted
    //will equal the proper time difference.
    if(utcDate > localDate) {
        utcTime = utcTime + 12;
        localTime = localTime - 12;
    } else if(localDate > utcDate) {
        utcTime = utcTime - 12;
        localTime = localTime + 12;
    }
    //subtracts the two previous values to calculate time difference
    let timeDiff = (utcTime - localTime) * 3600;
    
    return timeDiff
}

module.exports = {
    createSubscription,
    editSubscription
}