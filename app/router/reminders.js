const express = require('express');
const router = express.Router();
const Reminder = require('../models/reminder');
const momentTimeZone = require('moment-timezone');
const moment = require('moment');

const getTimeZones = function() {
  return momentTimeZone.tz.names();
};

// router.get('/', function(req, res, next) {
//   Reminder.find().then(_ => reminders => {
//     res.render('reminder', { reminders });
//   });
// });

/*
router.get('/create', (req, res, next) => {
  res.render('reminders/create', {
    timeZones: getTimeZones(),
    appointment: new Appointment({
      name: 'Alli',
      phoneNumber: '555',
      notification: 'This is a test',
      timeZone: 'EST',
      time: '10:45AM'
    })
  });
});
*/

router.get('/create', function(req, res, next) {
  res.render('appointments/create', {
    timeZones: getTimeZones(),
    appointment: new Appointment({
      name: '',
      phoneNumber: '',
      notification: '',
      timeZone: '',
      time: ''
    })
  });
});

router.post('/', function(req, res, next) {
  const content = req.body.content;
  const phoneNumber = req.body.phoneNumber;
  const notification = req.body.notification;
  const timeZone = req.body.timeZone;
  const time = moment(req.body.time, 'MM-DD-YYYY hh:mma');

  const reminder = new Reminder({
    content: content,
    phoneNumber: phoneNumber,
    notification: notification,
    timeZone: timeZone,
    time: time
  });
  reminder.save().then(_ => {
    res.redirect('reminders');
  });
});

//change this route
router.get('/:id/edit', function(req, res, next) {
  const id = req.params.id;
  Reminder.findOne({ _id: id }).then(reminder => {
    res.render('reminders/edit', {
      timeZones: getTimeZones(),
      reminder: reminder
    });
  });
});

router.post('/:id/edit', function(req, res, next) {
  const id = req.params.id;
  const content = req.body.content;
  const phoneNumber = req.body.phoneNumber;
  const notification = req.body.notification;
  const timeZone = req.body.timeZone;
  const time = moment(req.body.time, 'MM-DD-YYYY hh:mma');

  Reminder.findOne({ _id: id }).then(function(appointment) {
    reminder.content = content;
    reminder.phoneNumber = phoneNumber;
    reminder.notification = notification;
    reminder.timeZone = timeZone;
    reminder.time = time;

    reminder.save().then(_ => {
      res.redirect('/reminder');
    });
  });
});

router.post('/:id/delete', function(req, res, next) {
  const id = req.params.id;

  Reminder.remove({ _id: id }).then(_ => {
    res.redirect('/reminder');
  });
});

module.exports = router;
