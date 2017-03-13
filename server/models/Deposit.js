"use strict";

const mongoose = require('mongoose');
const sequence = require('mongoose-sequence');

const DepositSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  amount: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

DepositSchema.plugin(sequence, {id: 'deposit', inc_field: 'id'});

module.exports = mongoose.model('Deposit', DepositSchema);
