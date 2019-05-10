const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const cors = require('cors');
const noteRoutes = require('./app/router/note');
const stickyNoteRoutes = require('./app/router/sticky-notes');
const listRoutes = require('./app/router/list');
const reminderRoutes = require('./app/router/reminders');
const quoteRoutes = require('./app/router/quotes');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const hbs = require('hbs');
require('dotenv').config();
require('./config/passport')(passport); // pass passport for configuration

mongoose.connect(process.env.DB); // connect to our database

hbs.registerHelper('json', context => JSON.stringify(context));
hbs.registerPartials(__dirname + '/views/partials');

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
// required for passport
app.use(
  session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret CHANGE THIS
    resave: true,
    saveUninitialized: true
  })
);
app.use(
  cors({
    allowedHeaders: ['sessionId', 'Content-Type'],
    exposedHeaders: ['sessionId'],
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false
  })
);

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(express.static('public'));
app.use('/note', noteRoutes);
app.use('/sticky', stickyNoteRoutes);
app.use('/list', listRoutes);
app.use('/reminder', reminderRoutes);
app.use('/quotes', quoteRoutes);

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

module.exports = app;
