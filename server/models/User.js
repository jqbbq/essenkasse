"use strict";

const mongoose = require('mongoose');
const sequence = require('mongoose-sequence');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  }
});

UserSchema.plugin(sequence, {id: 'user', inc_field: 'id'});

module.exports = mongoose.model('User', UserSchema);
