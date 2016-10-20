var bcrypt = require('bcrypt');

exports.login = function(req,res,next){
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
              };
              console.log(req.session.user);
              res.redirect("/home");
            }
            if (dbUser.username === input.name && dbUser.password !== input.password) {
              req.flash("warning", "wrong password");
              return res.redirect('/login');
            }
      });
    });
