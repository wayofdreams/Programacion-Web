var express = require('express');

var exphbs  = require('express-handlebars');

var app = express();
var helpers = require("./lib/helpers");

var hbs = exphbs.create({
	defaultLayout: "main",
	layoutDir: __dirname + "/views/layouts",
	partialDir: __dirname + "/views/partials",
    helpers: helpers,
});

app.use("/static",express.static(__dirname + "/public"));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/ingredients', function (req, res) {
    res.json(ingredients);
});

app.get('/pizza', function (req, res) {
    res.render('pizza');
});

app.get('/deals', function (req, res) {
    res.render('deals');
});

app.get('/reorder', function (req, res) {
    res.render('reorder');
});

app.get('/neworder', function (req, res) {
    res.render('neworder');
});

var ingredients = {
	"ingredients": [
		{
			"quantity": "1",
			"name": " beef roast",
			"type": "Meat"
		},
		{
			"quantity": "1 package",
			"name": "brown gravy mix",
			"type": "Baking"
		},
		{
			"quantity": "1 package",
			"name": "dried Italian salad dressing mix",
			"type": "Condiments"
		},
		{
			"quantity": "1 package",
			"name": "dry ranch dressing mix",
			"type": "Condiments"
		},
		{
				"quantity": "1/2 cup",
				"name": "water",
				"type": "Drinks"
		}
	]
};

app.get('/domtree', function (req, res) {
    res.render('treetest');
});

app.get('/tabletest', function (req, res) {
    res.render('tabletest');
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.listen(5884);
