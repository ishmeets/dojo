/**
* Listings.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  adapter  : 'postgres',
  tableName: 'listing',

  attributes: {

    address: {
      type     : 'STRING',
      maxLength: 255,
      required : true
    },

    city: {
      type     : 'STRING',
      maxLength: 255,
      required : true
    },

    state: {
      type     : 'STRING',
      maxLength: 255,
      required : true
    },

    zip_code: {
      type     : 'STRING',
      maxLength: 10,
      required : true
    },

    mls_number: {
      type     : 'STRING',
      maxLength: 15,
      required : true
    },

    agent_user_id: {
      type : 'INTEGER',
      maxLength: 10,
      required: true,
      foreignKey: true,
      references: 'user',
      on: 'id'
    },

    agent_bre_number: {
      type     : 'STRING',
      maxLength: 20,
      required : true
    },

    agent_first_name: {
      type     : 'STRING',
      maxLength: 255
    },

    agent_middle_name: {
      type     : 'STRING',
      maxLength: 255
    },

    agent_last_name: {
      type     : 'STRING',
      maxLength: 255
    },

    primary_image_url: {
      type     : 'STRING',
      maxLength: 255,
      required : true
    },

    price: {
      type: 'FLOAT'
    },

    status: {
      type: 'STRING',
      enum: ['active', 'closed']
    }
  }
};

