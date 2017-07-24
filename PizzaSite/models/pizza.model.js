function Pizza(size, ingredients) {
  this.size = size;
  this.ingredients = ingredients;

  this.title = buildTitle(size, ingredients);

  function buildTitle(size, ingredients) {
    return  size + ' ' + ingredients.cheese + ', ' + ingredients.toppings + ' pizza with ' + ingredients.crust + ' crust';
  }
}

module.exports = Pizza;
