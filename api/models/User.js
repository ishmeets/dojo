'use strict';

// --------------------------------------
// Loading Modules
// --------------------------------------

var bcrypt = require('bcrypt');

// --------------------------------------
// Modules Export
// --------------------------------------

module.exports = {
  attributes: {
    email          : {
      type    : 'string',
      max     : 255,
      unique  : true,
      required: true
    },
    password       : {
      type    : 'string',
      required: true
    },
    user_type      : {
      type    : 'string',
      enum    : ['realtor', 'user'],
      required: true
    },
    first_name     : {
      type    : 'string',
      max     : 255,
      required: true
    },
    middle: {
      type    : 'string',
      max     : 255,
      required: true
    },
    last_name      : {
      type    : 'string',
      max     : 255,
      required: true
    },
    activated      : {
      type      : 'boolean',
      defaultsTo: false
    },
    activationToken: {
      type: 'string'
    },

    is_realtor: {
      type: 'boolean',
      required: true
    },

    primary_phone: {
      type: 'string',
      max     : 255,
      required: true
    },

    company_name: {
      type: 'string',
      max     : 255
    },

    bre_number: {
      type: 'string',
      max     : 255
    },

    /**
     * Strips the password out of the json
     * object before its returned from waterline.
     * @return {object} the model results in object form
     */
    toJSON: function() {
      // this gives you an object with the current values
      var obj = this.toObject();
      delete obj.password;

      delete obj.activationToken;
      delete obj.activated;
      // return the new object without password
      return obj;
    }
  },

  beforeCreate: function(values, next) {
    var salt = bcrypt.genSaltSync(10);

    // bcrypt the password
    bcrypt.hash(values.password, salt, function(err, hash) {
      if(err) {
        return next(err);
      }
      else {
        values.password = hash;
        values.activated = false; //make sure nobody is creating a user with activate set to true, this is probably just for paranoia sake
        values.activationToken = crypto.token(new Date().getTime() + values.email);
      }
      next();
    });
  },

  login: function(username, password) {

  }
};