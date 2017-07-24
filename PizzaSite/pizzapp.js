require('dotenv').config();
const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser    = require('body-parser');
const path          = require("path");
const helpers = require("./lib/helpers");
const bcrypt        = require('bcrypt');
const PORT          = process.env.PORT;
const SALT_ROUNDS   = 10;

const APIModule     = require(__dirname + '/api/api.module');
const routes        = require(__dirname + '/components/app.routes');

const pizzapp = express();
pizzapp.use(bodyParser.json());
pizzapp.use(bodyParser.urlencoded({
    extended: true
}));
var hbs = exphbs.create({
	defaultLayout: "main",
	layoutDir: __dirname + "/views/layouts",
	partialDir: __dirname + "/views/partials",
  helpers: helpers,
});

pizzapp.use("/static",express.static(__dirname + "/public"));
pizzapp.use('/vendors', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
pizzapp.engine('handlebars', hbs.engine);
pizzapp.set('view engine', 'handlebars');

APIModule(pizzapp);

pizzapp.get('/', function (req, res) {
    res.redirect('/pizza');
});

pizzapp.use('/', routes);

pizzapp.listen(5884);
