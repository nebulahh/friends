const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const User = require('../models/users');
const bcrypt = require('bcryptjs');

module.exports = function (passport) {
  // passport.use(
  //   new LocalStrategy((username, password, done) => {
  //     User.findOne({ username: username }, (err, user) => {
  //       if (err) {
  //         return done(err);
  //       }
  //       if (!user) {
  //         return done(null, false, {
  //           message: 'Incorrect username.',
  //         });
  //       }
  //       bcrypt.compare(password, user.password, (err, res) => {
  //         if (res) {
  //           return done(null, user);
  //         } else {
  //           return done(null, false, { message: 'Incorrect password' });
  //         }
  //       });
  //       return done(null, user);
  //     });
  //   })
  // );

  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect username' });
        }
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            // passwords match! log user in
            return done(null, user);
          } else {
            // passwords do not match!
            return done(null, false, { message: 'Incorrect password' });
          }
        });
      });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
