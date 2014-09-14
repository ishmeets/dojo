/**
 * Listings.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  adapter  : 'postgres',
  tableName: 'offer',

  attributes: {

    buyer_user_id: {
      type      : 'integer',
      maxLength : 10,
      foreignKey: true,
      references: 'user',
      on        : 'id'
    },

    buyer_email_address: {
      type     : 'string',
      maxLength: 255,
      required : true
    },

    buyer_first_name: {
      type     : 'string',
      maxLength: 255,
      required : true
    },

    buyer_middle_name: {
      type     : 'string',
      maxLength: 255,
      required : true
    },

    buyer_last_name: {
      type     : 'string',
      maxLength: 255,
      required : true
    },

    listing_id: {
      type      : 'integer',
      maxLength : 10,
      required  : true,
      foreignKey: true,
      references: 'listing',
      on        : 'id'
    },

    offer_price: {
      type    : 'float',
      required: true
    },

    earnest_money: {
      type    : 'float',
      required: true
    },

    down_payment: {
      type     : 'string',
      maxLength: 255
    },

    financing: {
      type     : 'string',
      maxLength: 255,
      required : true
    },

    home_inspection_contingency: {
      type     : 'integer',
      maxLength: 10,
      required : true
    },

    loan_contingency: {
      type     : 'integer',
      maxLength: 10,
      required : true
    },

    appraisal_contingency: {
      type     : 'integer',
      maxLength: 10,
      required : true
    },

    close_of_escrow: {
      type     : 'integer',
      maxLength: 10,
      required : true
    },

    offer_file_url: {
      type     : 'string',
      maxLength: 255,
      required : true
    },

    status: {
      type: 'string',
      enum: ['pending', 'accepted', 'denied']
    }
  }
};