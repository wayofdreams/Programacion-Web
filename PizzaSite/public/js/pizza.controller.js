(function() {
    'use strict';

    document.addEventListener("DOMContentLoaded", function(event) {

        var pizzaGrid = document.getElementById('pizza-grid');
        Ajax.get('api/offers', {}, function(offers) {
            if (!offers.error) {
                for (var idx in offers) {
                    buildOffer(pizzaGrid, offers[idx]);
                }
            }
        });

        function buildOffer(container, offer) {
            var card = document.createElement('div');
            var thumbnail = document.createElement('div');
            var btnOrder = document.createElement('button');
            var caption = document.createElement('div');
            var form = document.createElement('form');

            form.setAttribute('method', 'POST');
            form.setAttribute('action', 'orderconfirmation');

            card.className = "col-sm-6 col-md-4";
            thumbnail.className = 'thumbnail';
            caption.className = 'caption';

            btnOrder.innerHTML = "Order Now";
            btnOrder.className = "btn btn-warning";
            btnOrder.onclick = onOrderNowClick;

            thumbnail.innerHTML = '<img src="' + offer.imageUrl + '">';
            caption.innerHTML += '<h3>' + offer.pizza.title + '</h3>';
            caption.innerHTML += '<p>' + offer.description + '</p>';
            caption.appendChild(btnOrder);
            thumbnail.appendChild(caption);
            card.appendChild(thumbnail);
            card.appendChild(form);
            container.appendChild(card);

            function onOrderNowClick() {
              var order = {
                  size: offer.pizza.size,
                  crust: offer.pizza.ingredients.crust,
                  sauce: offer.pizza.ingredients.sauce,
                  cheese: offer.pizza.ingredients.cheese,
                  toppings: offer.pizza.ingredients.toppings,
                  price: offer.price,
              };

              for(var key in order) {
                if(order.hasOwnProperty(key)) {
                  var field = document.createElement('input');
                  field.setAttribute('type', 'hidden');
                  field.setAttribute('name', key);
                  field.setAttribute('value', order[key]);
                  form.appendChild(field);
                }
              }

              form.submit();
            }
        }

    });
})();
