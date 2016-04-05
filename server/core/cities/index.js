var City = require('../../models/city').City;

module.exports = function (app) {

	app.get('/cities', function (req, res, next) {
		City.find({}, function (err, cities) {
			if (err) return next(err);
			res.json(cities)
		})
	});

};