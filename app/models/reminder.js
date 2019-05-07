const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const moment = require('moment');
// const cfg = require('./config');
// const Twilio = require('twilio');

const ReminderSchema = new Schema({
  content: String,
  phoneNumber: String,
  notification: Number,
  timeZone: String,
  time: { type: Date, index: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

ReminderSchema.methods.addAuthor = function(authorId) {
  this.author = authorId;
  return this.save();
};

ReminderSchema.methods.requiresNotification = function(date) {
  return (
    Math.round(
      moment
        .duration(
          moment(this.time)
            .tz(this.timeZone)
            .utc()
            .diff(moment(date).utc())
        )
        .asMinutes()
    ) === this.notification
  );
};

// ReminderSchema.statics.sendNotifications = function(callback) {
//   const searchDate = new Date();
//   Reminder.find().then(function(reminders) {
//     reminders = reminders.filter(function(reminder) {
//       return reminder.requiresNotification(searchDate);
//     });
//     if (reminders.length > 0) {
//       sendNotifications(reminders);
//     }
//   });
// };

// function sendNotifications(reminders) {
//   const client = new Twilio(cfg.twilioAccountSid, cfg.twilioAuthToken);
//   reminders.forEach(function(reminder) {
//     // Create options to send the message
//     const options = {
//       to: `+ ${reminder.phoneNumber}`,
//       from: cfg.twilioPhoneNumber,
//       /* eslint-disable max-len */
//       content: `Don't forget!`
//       /* eslint-enable max-len */
//     };

//     // Send the message!
//     client.messages.create(options, function(err, response) {
//       if (err) {
//         // Just log it for now
//         console.error(err);
//       } else {
//         // Log the last few digits of a phone number
//         let masked = reminder.phoneNumber.substr(0, reminder.phoneNumber.length - 5);
//         masked += '*****';
//         console.log(`Message sent to ${masked}`);
//       }
//     });
//   });

//   if (callback) {
//     callback.call();
//   }
// }

const Reminder = mongoose.model('Reminder', ReminderSchema);
module.exports = Reminder;
