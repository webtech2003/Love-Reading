const passport = require('passport');
const User = require('../models/User');

exports.register = (req, res) => {
  res.render('register');
};

exports.postRegister = (req, res) => {
  const { username, email, password, role } = req.body;
  const newUser = new User({ username, email, role });
  User.register(newUser, password, (err, user) => {
    if (err) {
      return res.render('register', { error: err.message });
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/');
    });
  });
};


exports.login = (req, res) => {
  res.render('login');
};

exports.postLogin = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
});

exports.logout = (req, res) => {
  req.logout(err => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
