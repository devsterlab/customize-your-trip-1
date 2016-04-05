var User = require('../../models/user').User;

module.exports = function (app) {

	app.get('/users', function (req, res, next) {
		User.find({}, function (err, users) {
			if (err) return next(err);
			res.json(users)
		})
	});

	app.get('/user/:id', function (req, res, next) {
		User.findById(req.params.id, function (err, user) {
			res.json(user)
		})
	});

};