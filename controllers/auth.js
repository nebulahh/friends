const User = require('../models/users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.getSignup = (req, res) => {
  res.render('sign_up', {
    title: 'Create Account',
  });
};

exports.postSignup = (req, res, next) => {
  body('username')
    .trim()
    .isLength({ min: 1 })
    .isEmail()
    .custom((value) => {
      return User.findUserByEmail(value).then((user) => {
        if (user) {
          return Promise.reject('E-mail already in use');
        }
      });
    })
    .escape()
    .withMessage('Wrong email or something'),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .escape()
      .withMessage('Password must be at least 5 characters'),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    };

  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    // if err, do something
    // otherwise, store hashedPassword in DB
    if (err) {
      console.error(err);
    }
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: hashedPassword,
      admin: false,
    }).save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/feed');
    });
  });
};

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect('/clubhouse/feed');
  }
  res.render('log_in', { title: 'Log in' });
};

exports.postLogin = passport.authenticate('local', {
  successRedirect: '/clubhouse/feed',
  failureRedirect: '/clubhouse/login',
});
