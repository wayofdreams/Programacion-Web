(function() {
    'use strict';

    document.addEventListener("DOMContentLoaded", function(event) {
        var size = document.getElementById('order-size');
        var crust = document.getElementById('order-crust');
        var sauce = document.getElementById('order-sauce');
        var cheese = document.getElementById('order-cheese');
        var toppings = document.getElementById('order-toppings');
        var price = document.getElementById('order-price');

        var btnConfirm = document.getElementById('btn-confirm');
        var btnCancel = document.getElementById('btn-cancel');

        btnConfirm.onclick = confirmOrder;
        btnCancel.onclick = cancelOrder;

        function Pizza(size, ingredients) {
            this.size = size;
            this.ingredients = ingredients;
            this.title = buildTitle(size, ingredients);
            return this;

            function buildTitle(size, ingredients) {
                return size + ' ' + ingredients.cheese + ', ' + toppings[0] + 'pizza with ' + ingredients.crust + 'crust';
            }
        }

        function confirmOrder() {
            var ingredients = {
                crust: crust.innerHTML,
                sauce: sauce.innerHTML,
                cheese: cheese.innerHTML,
                toppings: toppings.innerHTML
            };

            var order = {
                size: size.innerHTML,
                crust: ingredients.crust,
                sauce: ingredients.sauce,
                cheese: ingredients.cheese,
                toppings: ingredients.toppings,
                price: (price.innerHTML)
            };

            Ajax.post('api/orders', order, function(res) {
              if(res.success) {
                window.location.assign('ordercreated');
              } else {
                window.location.assign('login');
              }
            });
        }

        function cancelOrder() {
            console.log('cancel order');
            location.assign('pizza');
        }

    });
})();
