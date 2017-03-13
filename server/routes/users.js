"use strict";

const express = require('express');
const mongoose = require('mongoose');
const async = require('async');
const User = require('../models/User.js');
const Meal = require('../models/Meal.js');
const Deposit = require('../models/Deposit.js');

const router = express.Router();

function reduce(arr, key, values) {

  if ('string' === (typeof values)) {
    values = [values];
  }

  return arr.reduce(function (result, item) {
    let obj = {};

    for (let i = 0; i < values.length; i++) {
      obj[values[i]] = item[values[i]];
    }

    result[item[key]] = obj;
    return result;
  }, {});
}

/* POST /users. */
router.post('/', function (req, res, next) {
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    let user = post.toObject();
    user.credit = 0;
    res.json(user);
  });
});

/* GET /users. */
router.get('/', function (req, res, next) {
    User
      .find()
      .then(function(){
        res.json(users);
      });
});

module.exports = router;
