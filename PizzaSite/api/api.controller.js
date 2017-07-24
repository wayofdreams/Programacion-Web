const DBHelper = require('../lib/db-helper')();
const Pizza = require('../models/pizza.model');
const bcrypt = require('bcrypt');
const UserController = require('./user.api.controller')();

module.exports = function APIController() {

    function _handleDbHelperResponse(res, err, data) {
        if (err) {
            res.json({
                message: 'Ups, Something happened!',
                error: err
            });
        } else {
            res.json(data);
        }
    }

    function getCrusts(req, res) {
        DBHelper.getCrusts(function(err, data) {
            _handleDbHelperResponse(res, err, data);
        });
    }

    function getToppings(req, res) {
        DBHelper.getToppings(function(err, data) {
            _handleDbHelperResponse(res, err, data);
        });
    }

    function getSauces(req, res) {
        DBHelper.getSauces(function(err, data) {
            _handleDbHelperResponse(res, err, data);
        });
    }

    function getCheeses(req, res) {
        DBHelper.getCheeses(function(err, data) {
            _handleDbHelperResponse(res, err, data);
        });
    }

    //TODO: Add Order with UserId
    function addOrder(req, res) {
        var auth = req.get('Authorization');
        if (UserController.isUserAuthenticated(auth)) {
            var order = {};
            var ingredients = {
                crust: req.body.crust,
                toppings: req.body.toppings.split(','),
                sauce: req.body.sauce,
                cheese: req.body.cheese
            };
            order.pizza = new Pizza(req.body.size, ingredients);
            order.price = parseFloat(req.body.price);
            order.email = UserController.getUserEmail(auth);
            order.status = 'active';
            order.cancelable = true;
            order.created = new Date();

            DBHelper.addOrder(order, function(err, result) {
                if (result.insertedCount === 1) {
                    var data = {
                        success: 'success',
                        message: 'order was successfully added!'
                    };
                    _handleDbHelperResponse(res, err, data);
                }
            });
        } else {
            res.json({
                failed: 'failed',
                errorMessage: 'User was not authenticated'
            });
        }
    }

    //TODO: Prevent users from deleting orders from orders
    function cancelOrder(req, res) {
      var orderId = req.params.id;
      DBHelper.cancelOrder(orderId, function(err, data) {
          _handleDbHelperResponse(res, err, data);
      });
    }

    // TODO: get Orders by user id
    function getOrders(req, res) {
        var auth = req.get('Authorization');
        var email = UserController.getUserEmail(auth);
        var query = {};

        if(email) {
          query.email = email;
        }

        DBHelper.getOrders(query, function(err, data) {
            _handleDbHelperResponse(res, err, data);
        });
    }

    function getOffers(req, res) {
        DBHelper.getOffers(function(err, data) {
            _handleDbHelperResponse(res, err, data);
        });
    }

    return {
        getCrusts: getCrusts,
        getToppings: getToppings,
        getSauces: getSauces,
        getCheeses: getCheeses,
        addOrder: addOrder,
        getOrders: getOrders,
        getOffers: getOffers,
        cancelOrder: cancelOrder
    };
};
