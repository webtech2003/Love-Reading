function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }
  
  function ensureRole(role) {
    return (req, res, next) => {
      if (req.isAuthenticated() && req.user.role === role) {
        return next();
      }
      res.redirect('/');
    };
  }
  
  module.exports = { ensureAuthenticated, ensureRole };
  