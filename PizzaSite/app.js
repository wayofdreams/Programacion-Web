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

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
var hbs = exphbs.create({
	defaultLayout: "main",
	layoutDir: __dirname + "/views/layouts",
	partialDir: __dirname + "/views/partials",
  helpers: helpers,
});

app.use("/static",express.static(__dirname + "/public"));
app.use('/vendors', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

APIModule(app);

app.get('/', function (req, res) {
    res.redirect('/pizza');
});

app.use('/', routes);

app.listen(5884);
