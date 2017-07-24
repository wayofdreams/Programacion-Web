const express = require('express');
const router = express.Router();
const APIController = require('./api.controller')();
const UserController = require('./user.api.controller')();

router.route('/crusts').get(APIController.getCrusts);
router.route('/toppings').get(APIController.getToppings);
router.route('/sauces').get(APIController.getSauces);
router.route('/cheeses').get(APIController.getCheeses);


router.route('/authenticate').post(UserController.authenticate);
router.route('/signup').post(UserController.signUp);
router.route('/users').get(UserController.getUsers);

router.route('/orders')
    .get(APIController.getOrders)
    .post(APIController.addOrder);

router.route('/orders/:id')
    .delete(APIController.cancelOrder);

router.route('/offers').get(APIController.getOffers);
module.exports = router;
