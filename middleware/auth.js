module.exports = {
  ensureAuth: function (req, res, next) {
    //next passes along to next piece of middleware in the sequence/route
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/feed');
    }
  },
};
