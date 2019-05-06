const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path');
const noteRoutes = require('./app/router/notes');
const stickyNoteRoutes = require('./app/router/sticky-notes');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const hbs = require('hbs');

var configDB = require('./config/database.js');

const Note = require('./app/models/note');
const StickyNote = require('./app/models/sticky-note');

mongoose.connect(configDB.url); // connect to our database

//example
hbs.registerHelper('capitalize', context => {
  return context.toUpperCase();
});

hbs.registerHelper('json', context => {
  return JSON.stringify(context);
});

hbs.registerHelper('find', context => {
  return context;
});

require('./config/passport')(passport); // pass passport for configuration

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
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(express.static('public'));
app.use('/note', noteRoutes);
app.use('/sticky-note', stickyNoteRoutes);

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

module.exports = app;

// export default Quill;

// module.exports = quotes;
