"use strict";

const express = require('express');
const mongoose = require('mongoose');
const async = require('async');
const Meal = require('../models/Meal.js');
const Deposit = require('../models/Deposit.js');

const router = express.Router();

/* POST /meals */
router.post('/', function (req, res, next) {

  let sum = 0;
  let parallel = {};

  Object
    .keys(req.body.payers)
    .forEach(function (payer) {
      let amount = parseFloat(req.body.payers[payer]);
      sum += amount;

      parallel[payer] = function (callback) {
        Deposit.create({
          user: payer,
          amount: amount,
          date: req.body.date
        }, callback);
      };
    });

  parallel.meal = function (callback) {
    Meal.create({
      name: req.body.name,
      date: req.body.date,
      users: req.body.participants,
      price: sum,
      pricePerUser: sum / req.body.participants.length
    }, callback);
  };

  async
    .parallel(parallel, function (err, result) {
      if (err) return next(err);
      res.json(result.meal);
    });

});

/* GET /meals */
router.get('/', function (req, res, next) {
  Meal
    .find()
    .exec(function (err, meals) {
      if (err) return next(err);
      res.json(meals);
    });
});

/* GET /meals/:id */
router.get('/:id', function (req, res, next) {
  Meal.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /meals/user/:user */
router.get('/user/:user', function (req, res, next) {
  Meal
    .find({
      users: req.params.user
    })
    .exec(function (err, meals) {
      if (err) return next(err);
      res.json(meals);
    });
});

/* GET /meals/last/:count */
router.get('/last/:count', function (req, res, next) {
  Meal
    .find()
    .sort({
      date: -1
    })
    .limit(parseInt(req.params.count, 10))
    .exec(function (err, meals) {
      if (err) return next(err);
      res.json(meals);
    });
});

/* PUT /meals/:id */
router.put('/:id', function (req, res, next) {
  Meal.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /meals/:id */
router.delete('/:id', function (req, res, next) {
  Meal.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
