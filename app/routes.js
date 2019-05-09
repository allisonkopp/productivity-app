const Note = require('./models/note');
const StickyNote = require('./models/sticky-note');
const List = require('./models/list');
const Reminder = require('./models/reminder');
// const unirest = require('unirest');
// const unirestWrapper = unirest();

module.exports = function(app, passport) {
  // normal routes ===============================================================

  app.get('/', function(req, res) {
    res.render('index');
  });

  // PROFILE SECTION =========================

  /*
  app.get('/profile', isLoggedIn, (req, res) => {
    app.locals.user = req.session.userId;
    List.find({ author: req.session.userId })
      .then(listItems => {
        res.render('profile', { listItems });
      })
      .catch(err => console.log(err));
  });
  */

  app.get('/profile', isLoggedIn, (req, res) => {
    app.locals.user = req.session.userId;
    StickyNote.find({ author: req.session.userId })
      .then(items => {
        res.render('profile', { items });
      })
      .catch(err => console.log(err));
  });

  /*
  app.get('/profile', isLoggedIn, (req, res) => {
    unirestWrapper
      .get('https://timshim-quotes-v1.p.rapidapi.com/quotes')
      .header('X-RapidAPI-Host', 'timshim-quotes-v1.p.rapidapi.com')
      .header('X-RapidAPI-Key', '77da8cb0damsh191667c813a24fdp182959jsnd89e6092fe54')
      .end(function(result) {
        console.log(result.status, result.headers, result.body);
      });
  });
  */

  /*
  app.get('/getList', isLoggedIn, async (req, res) => {
    const allListItems = List.find({ author: req.session.userId });
    const parsedStickies = await allStickies.exec((err, stickies) => {
      if (err) return;
      return (stickiesArray = stickies.map(n => n._doc));
    });
    res.send(parsedStickies);
  });
  */

  app.get('/deleteSticky/:id', isLoggedIn, async (req, res) => {
    StickyNote.findByIdAndDelete(req.params.id, (err, sticky) => {
      sticky.remove();
    });
  });

  app.get('/account', isLoggedIn, (req, res) => {
    res.render('account', {
      user: req.user
    });
  });

  app.get('/note', isLoggedIn, async (req, res) => {
    res.render('notes/note', {
      user: req.user
    });
  });

  app.get('/newNote', isLoggedIn, async (req, res) => {
    res.render('notes/note', {
      user: req.user
    });
  });

  app.get('/reminder', isLoggedIn, (req, res) => {
    res.render('reminder');
  });

  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
    req.logout();
    app.locals.user = null;
    res.redirect('/');
  });

  app.get('/login', function(req, res) {
    res.render('login', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post(
    '/login',
    passport.authenticate('local-login', {
      successRedirect: '/profile', // redirect to the secure profile section
      failureRedirect: '/login', // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    })
  );

  app.get('/signup', function(req, res) {
    res.render('signup', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/profile', // redirect to the secure profile section
      failureRedirect: '/signup', // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    })
  );

  // facebook -------------------------------

  // send to facebook to do the authentication
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));

  // handle the callback after facebook has authenticated the user
  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/profile',
      failureRedirect: '/'
    })
  );

  // twitter --------------------------------

  // send to twitter to do the authentication
  app.get('/auth/twitter', passport.authenticate('twitter', { scope: 'email' }));

  // handle the callback after twitter has authenticated the user
  app.get(
    '/auth/twitter/callback',
    passport.authenticate('twitter', {
      successRedirect: '/profile',
      failureRedirect: '/'
    })
  );

  // google ---------------------------------

  // send to google to do the authentication
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  // the callback after google has authenticated the user
  app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/profile',
      failureRedirect: '/'
    })
  );

  app.get('/connect/local', function(req, res) {
    res.render('connect-local', { message: req.flash('loginMessage') });
  });
  app.post(
    '/connect/local',
    passport.authenticate('local-signup', {
      successRedirect: '/profile', // redirect to the secure profile section
      failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    })
  );

  // facebook -------------------------------

  // send to facebook to do the authentication
  app.get('/connect/facebook', passport.authorize('facebook', { scope: ['public_profile', 'email'] }));

  // handle the callback after facebook has authorized the user
  app.get(
    '/connect/facebook/callback',
    passport.authorize('facebook', {
      successRedirect: '/profile',
      failureRedirect: '/'
    })
  );

  // twitter --------------------------------

  // send to twitter to do the authentication
  app.get('/connect/twitter', passport.authorize('twitter', { scope: 'email' }));

  // handle the callback after twitter has authorized the user
  app.get(
    '/connect/twitter/callback',
    passport.authorize('twitter', {
      successRedirect: '/profile',
      failureRedirect: '/'
    })
  );

  // google ---------------------------------

  // send to google to do the authentication
  app.get('/connect/google', passport.authorize('google', { scope: ['profile', 'email'] }));

  // the callback after google has authorized the user
  app.get(
    '/connect/google/callback',
    passport.authorize('google', {
      successRedirect: '/profile',
      failureRedirect: '/'
    })
  );

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function(req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });

  // facebook -------------------------------
  app.get('/unlink/facebook', isLoggedIn, function(req, res) {
    var user = req.user;
    user.facebook.token = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });

  // twitter --------------------------------
  app.get('/unlink/twitter', isLoggedIn, function(req, res) {
    var user = req.user;
    user.twitter.token = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });

  // google ---------------------------------
  app.get('/unlink/google', isLoggedIn, function(req, res) {
    var user = req.user;
    user.google.token = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });

  app.get('/hello', (req, res) => {
    res.send('hello world');
  });
};

// route middleware to ensure user is logged in
// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated()) return next();
//   res.redirect('/');
// }

let loggedIn = false;
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    loggedIn = true;
    return next();
  }
  res.redirect('/');
};
