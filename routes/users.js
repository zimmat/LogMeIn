exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('SELECT * from encryption', [], function(err, results) {
        	if (err) return next(err);
    		res.render( 'users', {
					no_users : results.length === 0,
					users : results
    		});
      	});
	});
};

exports.showAdd = function(req, res){
	res.render('add_user');
}
exports.add = function(req, res, next) {
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    var data = {
      username: req.body.username,
      password: req.body.password
    };
    connection.query('insert into encryption set ?', data, function(err, results) {
      if (err) return next(err);
      res.redirect('/users');
    });
  });
};
