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
      type     : 'INTEGER',
      maxLength: 10,
      required: true,
      foreignKey: true,
      references: 'user',
      on: 'id'
    },

    buyer_first_name: {
      type     : 'STRING',
      maxLength: 255,
      required : true
    },

    buyer_middle_name: {
      type     : 'STRING',
      maxLength: 255,
      required : true
    },

    buyer_last_name: {
      type     : 'STRING',
      maxLength: 255,
      required : true
    },

    listing_id: {
      type : 'INTEGER',
      maxLength: 10,
      required: true,
      foreignKey: true,
      references: 'listing',
      on: 'id'
    },

    offer_price: {
      type    : 'FLOAT',
      required: true
    },

    earnest_money: {
      type    : 'FLOAT',
      required: true
    },

    down_payment: {
      type     : 'STRING',
      maxLength: 255
    },

    financing: {
      type     : 'STRING',
      maxLength: 255,
      required : true
    },

    home_inspection_contingency: {
      type     : 'INTEGER',
      maxLength: 10
    },

    loan_contingency: {
      type     : 'INTEGER',
      maxLength: 10
    },

    appraisal_contingency: {
      type     : 'INTEGER',
      maxLength: 10
    },

    close_of_escrow: {
      type     : 'INTEGER',
      maxLength: 10
    },

    offer_file_url: {
      type     : 'STRING',
      maxLength: 255,
      required : true
    },

    status: {
      type: 'string',
      enum: ['pending', 'accepted', 'denied']
    }
  }
};