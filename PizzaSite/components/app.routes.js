const express = require('express');
const router = express.Router();
const DBHelper = require('../lib/db-helper')();
const LoginComponent = require('./login.component')();

router.route('/pizza').get(function(req, res) {
  res.render('pizza');
});

router.route('/makepizza').get(function(req, res) {
  res.render('make-pizza');
});

router.route('/deals').get(function(req, res) {
  res.render('deals');
});

router.route('/reorder').get(function(req, res) {
  res.render('reorder');
});

router.route('/orderconfirmation').post(function(req, res) {
  var TOPPING_PRICE = 2;
  var MAX_FREE_TOPPINGS = 2;
  var BASE_PRICE = 10;

  var order = {};
  var price = BASE_PRICE;

  order.size = req.body.size;
  order.crust = req.body.crust;
  order.toppings = req.body.toppings.split(',');
  order.sauce = req.body.sauce;
  order.cheese = req.body.cheese;

  if(order.toppings.length > MAX_FREE_TOPPINGS) {
    var x = order.toppings.length - MAX_FREE_TOPPINGS;
    price += TOPPING_PRICE * x;
  }

  order.price = price;

  res.render('order-confirmation', {
    order: order
  });
});

router.route('/ordercreated').get(function(req, res) {
  res.render('order-created', [
    'order was created successfully'
  ]);
});

router.route('/login').get(LoginComponent.login);
router.route('/signup').get(LoginComponent.signup);
router.route('/authenticate').post(LoginComponent.authenticate);

module.exports = router;
