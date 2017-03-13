"use strict";

const express = require('express');
const mongoose = require('mongoose');
const Deposit = require('../models/Deposit.js');

const router = express.Router();

/* POST /deposits */
router.post('/', function (req, res, next) {
  Deposit.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /deposits */
router.get('/', function (req, res, next) {
  Deposit
    .find()
    .exec(function (err, todos) {
      if (err) return next(err);
      res.json(todos);
    });
});

/* GET /deposits/user/:user */
router.get('/user/:user', function (req, res, next) {
  Deposit
    .find({
      user: req.params.user
    })
    .exec(function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});

/* PUT /deposits/:id */
router.put('/:id', function (req, res, next) {
  Deposit.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


/* DELETE /deposits/:id */
router.delete('/:id', function (req, res, next) {
  Deposit.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /deposits/last */
router.get('/last', function (req, res, next) {
  Deposit
    .aggregate([{
      $sort: {
        date: -1
      }
    }, {
      $group: {
        _id: '$user',
        amount: {
          $first: "$amount"
        },
        last: {
          $first: "$date"
        }
      }
    }])
    .exec(function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});

router.get('/last/:user', function (req, res, next) {
  Deposit
    .find({
      user: req.params.user
    })
    .sort({
      date: -1
    })
    .limit(1)
    .exec(function (err, post) {
      if (err) return next(err);
      res.json({
        last: post[0].date,
        amount: post[0].amount,
        _id: post[0].user
      });
    });
});

module.exports = router;
