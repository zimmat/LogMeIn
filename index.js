var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var loggedIn = false;
var session = require('express-session');
var bodyParser = require('body-parser');
var flash = require('connect-flash');

//
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.post('/', function(req, res) {

});

//form middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get("/", function(req, res){
    res.redirect("/home");
});

app.get("/home", function(req, res){
    res.render("home");
});

app.get("/login", function(req, res){
    res.render("login", {});
});

app.listen(3000)
