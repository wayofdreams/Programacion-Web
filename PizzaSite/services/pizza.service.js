require('dotenv').config();
const DbHelper = require('../lib/db-helper')();
const Mailer    = require('./mailer.service')();

const INTERVAL_DELAY = 1000;
const MINUTES_TO_SECONDS_CONSTANT = 60;
const TIME_BEFORE_CANCEL = 2 * MINUTES_TO_SECONDS_CONSTANT;
const TIME_BEFORE_DELIVERED_MIN = 3 * MINUTES_TO_SECONDS_CONSTANT;
const TIME_BEFORE_DELIVERED_MAX = 5 * MINUTES_TO_SECONDS_CONSTANT;

function reviewOrders(err, orders) {
  if(err) {
    return false;
  } else {
    for(var idx in orders) {
      var order = orders[idx];
      var deltaTime = getCurrentTimeSeconds() -  toSeconds(new Date(order.created));
      if(order.cancelable && (deltaTime > TIME_BEFORE_CANCEL)) {
        makeOrderNotCancelable(order, function(err, result) {
          if(err) {
            console.log(err);
          }
        });
      }

      var timeBeforeDelivered = computeTimeBeforeDelivered();
      if((order.cancelable === false) && (deltaTime >= timeBeforeDelivered)) {
        deliverOrder(order, function(err, result) {
          if(err) {
            console.log(err);
          } else {
            // send mail
            Mailer.sendDeliveredMail(order);
          }
        });
      }
    }
  }
}

function deliverOrder(order, callback) {
  var newOrder = {
    _id: order._id,
    status: 'delivered'
  };
  DbHelper.updateOrder(newOrder, callback);
}

function makeOrderNotCancelable(order, callback) {
  var newOrder = {
    _id: order._id,
    cancelable: false
  };
  DbHelper.updateOrder(newOrder, callback);
}

function getCurrentTimeSeconds() {
  var time = new Date().getTime() / 1000;
  return time;
}

function toSeconds(date) {
  return date.getTime() / 1000;
}

function computeTimeBeforeDelivered() {
    var time = getRandomInt(TIME_BEFORE_DELIVERED_MIN, TIME_BEFORE_DELIVERED_MAX);
    return time;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function PizzaService() {
  DbHelper.getOrders({status: 'active'}, reviewOrders);
}

// PizzaService();
console.log('Pizza Service started to run: ', new Date());
setInterval(PizzaService, INTERVAL_DELAY);
