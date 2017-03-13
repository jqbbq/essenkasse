"use strict";

const mongoose = require('mongoose');
const sequence = require('mongoose-sequence');

const MealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  pricePerUser: {
    type: Number,
    required: true
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

MealSchema.plugin(sequence, {id: 'meal', inc_field: 'id'});

module.exports = mongoose.model('Meal', MealSchema);
