

db.users.insert({
  email: "admin@example.com",
  username: 'admin',
  password: 'admin',
  role: 'admin'
  });

  db.users.insert({
    email: "test@example.com",
    username: 'test',
    password: 'test',
    role: 'guest'
    });

db.pizzas.insert([
  {title: 'Large mozzarella, pepperoni and pineapple pizza with thin crust', size: 'Large', ingredients: {crust: 'Thin', sauce:'Bechamel', cheese: 'Mozzarella', toppings: ['Pepperoni', 'Pineapple']}},
  {title: 'Large ricotta, pepperoni and mushrooms pizza with flatbread crust', size: 'Large', ingredients: {crust: 'Flatbread', sauce:'Pesto', cheese: 'Ricotta', toppings: ['Pepperoni', 'Mushrooms']}},
  {title: 'Large buffao mozzarella, pepperoni and bacon pizza with thin crust', size: 'Large', ingredients: {crust: 'Thin', sauce:'Bechamel', cheese: 'Buffalo mozzarella', toppings: ['Pepperoni', 'Bacon']}}
])

db.offers.insert([
  {
    pizza: {title: 'Large mozzarella, pepperoni and pineapple pizza with thin crust', size: 'Large', ingredients: {crust: 'Thin', sauce:'Bechamel', cheese: 'Mozzarella', toppings: ['Pepperoni', 'Pineapple']}},
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    price: 10.00,
    imageUrl: 'http://lorempizza.com/242/200'
  },
  {
    pizza:   {title: 'Large ricotta, pepperoni and mushrooms pizza with flatbread crust', size: 'Large', ingredients: {crust: 'Flatbread', sauce:'Pesto', cheese: 'Ricotta', toppings: ['Pepperoni', 'Mushrooms']}},
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    price: 10.00,
    imageUrl: 'http://lorempizza.com/242/200'
  },
  {
    pizza:   {title: 'Large buffao mozzarella, pepperoni and bacon pizza with thin crust', size: 'Large', ingredients: {crust: 'Thin', sauce:'Bechamel', cheese: 'Buffalo mozzarella', toppings: ['Pepperoni', 'Bacon']}},
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    price: 10.00,
    imageUrl: 'http://lorempizza.com/242/200'
  },
])
