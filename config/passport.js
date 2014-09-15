var passport      = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

module.exports = {

  http: {
    customMiddleware: function(app){
      app.use(passport.initialize());
      app.use(passport.session());
    }
  }

};