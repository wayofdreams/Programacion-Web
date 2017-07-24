document.addEventListener("DOMContentLoaded", function(event) {
  var httpRequest;
  var ingredients = [];

  makeIngredientsRequest();

  function makeIngredientsRequest() {
      httpRequest = new XMLHttpRequest();

      if (!httpRequest) {
          alert('Giving up :( Cannot create an XMLHTTP instance');
          return false;
      }

      httpRequest.onreadystatechange = loadIngredients;
      httpRequest.open('GET', '/api/ingredients');
      httpRequest.send();
  }

  function loadIngredients(){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            // console.log(httpRequest.responseText);
            ingredients = JSON.parse(httpRequest.responseText);
            // console.log(ingredients);
            addToDOM(ingredients, 'ingredient-list');
        } else {
            console.log('There was a problem with the request.');
        }
    }
  }

  function addToDOM(items, container){
    domList = document.getElementById(container);

    for(item in items) {
      var name = items[item].name;
      console.log(name);
      var domItem = document.createElement('li');
      domItem.innerHTML = '<span>' + name + '</span>';
      domList.appendChild(domItem);
    }
  }
});
