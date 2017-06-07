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

app.get('/about', function (req, res) {
    res.render('about');
});

app.listen(3000);