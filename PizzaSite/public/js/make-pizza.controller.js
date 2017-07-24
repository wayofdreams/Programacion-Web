(function() {
    'use strict';

    document.addEventListener("DOMContentLoaded", function(event) {
        function MakePizzaController() {
            var self = this;
            var finalPrice = 10.00;
            var TOPPING_PRICE = 2;
            var MAX_FREE_TOPPINGS = 2;

            var toppings = [];
            var pizzaCrustsSelect = document.getElementById('pizza-crust');
            var pizzaSaucesSelect = document.getElementById('pizza-sauce');
            var pizzaCheesesSelect = document.getElementById('pizza-cheese');
            var pizzaToppingsSelect = document.getElementById('pizza-topping');
            var makePizzaForm = document.getElementById('make-pizza-form');
            var toppingContainer = document.getElementById('topping-container');
            var finalPriceSpan = document.getElementById('final-price');

            makePizzaForm.onsubmit = onsubmitOrder;
            pizzaToppingsSelect.onchange = onToppingSelect;

            getIngredients('crust');
            getIngredients('cheese');
            getIngredients('sauce');
            getIngredients('topping');

            function getIngredients(type) {
                var url = "/api";
                switch (type) {
                    case 'crust':
                        url += "/crusts";
                        break;
                    case 'topping':
                        url += "/toppings";
                        break;
                    case 'sauce':
                        url += "/sauces";
                        break;
                    case 'cheese':
                        url += "/cheeses";
                        break;
                }

                Ajax.get(url, '', function(response) {
                    var ingredients = response;
                    switch (type) {
                        case 'crust':
                            fillIngredients(pizzaCrustsSelect, ingredients);
                            break;
                        case 'topping':
                            fillIngredients(pizzaToppingsSelect, ingredients);
                            addToppingTag(toppingContainer, ingredients[0]["name"]);
                            addToppingTag(toppingContainer, ingredients[1]["name"]);
                            break;
                        case 'sauce':
                            fillIngredients(pizzaSaucesSelect, ingredients);
                            break;
                        case 'cheese':
                            fillIngredients(pizzaCheesesSelect, ingredients);
                            break;
                    }
                });
            }

            function fillIngredients(container, ingredients) {
                for (var i = 0; i < ingredients.length; i++) {
                    addNewOption(container, ingredients[i]["name"]);
                }
            }

            function addNewOption(container, value) {
              var option = document.createElement('option');
              option.innerHTML = value;
              option.setAttribute('value', value);
              option.setAttribute('id', value);
              container.appendChild(option);
            }

            function addToppingTag(container, value) {
              document.getElementById(value).remove();
              var span = document.createElement('span');
              span.className = 'label label-info topping';
              span.innerHTML = '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span> ' + value;
              container.appendChild(span);
              toppings.push(value);

              if(toppings.length > MAX_FREE_TOPPINGS) {
                finalPrice += TOPPING_PRICE;
                finalPriceSpan.innerHTML = finalPrice.toFixed(2);
              }

              //on x click
              span.onclick = function() {
                addNewOption(pizzaToppingsSelect, value);
                toppings.splice(toppings.indexOf(value), 1);

                if(toppings.length >= MAX_FREE_TOPPINGS) {
                  finalPrice -= TOPPING_PRICE;
                  finalPriceSpan.innerHTML = finalPrice.toFixed(2);
                }

                span.remove();
              };
            }

            function onsubmitOrder(evt) {
                var toppingField = document.getElementById('toppings');
                toppingField.setAttribute('value', toppings.join());
                return true;
                // evt.preventDefault();
            }

            function onToppingSelect(evt) {
              var topping = evt.target.value;
              addToppingTag(toppingContainer, topping);
            }
        }
        MakePizzaController();
    });
})();
