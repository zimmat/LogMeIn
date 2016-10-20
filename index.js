var express = require('express'),
  exphbs = require('express-handlebars'),
  mysql = require('mysql'),
  myConnection = require('express-myconnection'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  flash = require('express-flash'),
middleware = require('./middlewares/middleware'),
bcrypt = require('bcrypt'),
register = require('./routes/register'),
users = require('./routes/users');





var app = express();

var dbOptions = {
  host: 'localhost',
  user: 'root',
  password: 'coder123',
  database: 'nelisa'
};

var rolesMap = {
  "Nelisa": "admin",
  "Zee": "Viewer"
};

//setup template handlebars as the template engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 60000 * 30 // expire after 30 minutes
  }
}));
app.use(function(req, res, next) {
  res.locals.currentUser = req.session.user_id;
  next();
});


app.use(express.static(__dirname + '/public'));
app.use(flash());

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
  }))
  // parse application/json
app.use(bodyParser.json())

app.get("/register", function(req, res, next) {
  res.render("register");
});

app.get("/login", function(req, res) {
  res.render("login", {
    showNavBar: false
  });
});
app.get("/", function(req, res) {
  res.redirect("/home");
});
var checkUser = function(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect("/login");
};
app.post("/login", function(req, res) {
  var password = req.body.password;
  var user1 = [];
  if (req.body.username) {
    var user = {
        name: req.body.username,
        password: req.body.password,
      }
      // console.log(user.password);
    user1.push(user);
    req.getConnection(function(err, connection) {
      connection.query('SELECT * FROM encryption', [], function(err, database) {
        if (err) return next(err);

        bcrypt.compare(password, user.password, function(err, res) {
              req.session.user = {
                name: req.body.username,
                password:req.body.password
              };
              console.log(req.session.user);


            });
res.redirect("/home");
      });
    });
  } else {
    req.flash("warning", "all fields required");
    return res.redirect('/login');
  }
});
app.get("/home", checkUser, function(req, res) {
  res.render("home")
});

app.get("/logout", function(req, res) {
  delete req.session.user;
  res.redirect("/login");
})

app.get('/users', users.show);
app.get('/users/add', users.showAdd);
app.post('/users/add', users.add);

app.get('/register',register.showRegister);
app.post('/register/add',register.add);

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', {
    error: err
  });
}

app.listen(3300)
