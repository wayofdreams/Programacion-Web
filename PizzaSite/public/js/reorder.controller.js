(function() {
    'use strict';
    var email = localStorage.getItem('email');
    if (!email) {
        window.location.assign('login');
    }

    document.addEventListener("DOMContentLoaded", function(event) {
        var self = this;
        // TODO: Remove this
        console.log("Re-Order Controller loaded!");

        var table = document.getElementById('reorder-table');
        var form  = document.getElementById('reorder-form');
        var orders = [];

        Ajax.get('/api/orders', {
            email: email
        }, function(orders) {
            if (!orders.error) {
                self.orders = orders;
                for (var idx in orders) {
                    addOrderToTable(table, orders[idx]);
                }
            }
        });

        function addOrderToTable(container, order) {
            var row = document.createElement('tr');
            var title = '<td>' + order.pizza.title + '</td>';
            var price = '<td>$' + order.price.toFixed(2) + '</td>';
            var status = '<td class="text-capitalize">' + order.status + '</td>';
            var btnOrder = document.createElement('button');
            var btnCancel = document.createElement('button');
            var td = document.createElement('td');

            btnOrder.innerHTML    = 'Order again';
            btnOrder.className    = 'btn btn-warning';
            btnOrder.onclick      = onOrderNowClick;

            btnCancel.innerHTML   = 'Cancel';
            btnCancel.className   = 'btn btn-danger';
            btnCancel.onclick     = onCancelOrder;

            td.appendChild(btnOrder);
            if(order.status === 'active' && order.cancelable === true) {
              td.appendChild(btnCancel);
            }

            row.innerHTML += title + price + status;
            row.appendChild(td);
            container.appendChild(row);

            function onOrderNowClick() {
                var postOrder = {
                    size: order.pizza.size,
                    crust: order.pizza.ingredients.crust,
                    sauce: order.pizza.ingredients.sauce,
                    cheese: order.pizza.ingredients.cheese,
                    toppings: order.pizza.ingredients.toppings,
                    price: order.price,
                };

                form.reset();
                form.setAttribute('method', 'POST');
                form.setAttribute('action', '/orderconfirmation');

                for(var key in postOrder) {
                  if(postOrder.hasOwnProperty(key)) {
                    var field = document.createElement('input');
                    field.setAttribute('type', 'hidden');
                    field.setAttribute('name', key);
                    field.setAttribute('value', postOrder[key]);
                    form.appendChild(field);
                  }
                }

                form.submit();
            }

            function onCancelOrder() {
              var orderId = order._id;
              Ajax.delete('/api/orders/' + orderId, function(response) {
                if(response.error) {
                  // TODO: handle onCancelOrder error
                } else {
                  location.reload();
                }
              });
            }
        }
    });
})();
