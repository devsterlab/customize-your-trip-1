var mongoose = require('./lib/mongoose');
var async = require('async');

mongoose.set('debug', true);

async.series([
	open,
	dropDatabase,
	requireModels,
	createUsers,
	createCities
], function (err) {
	mongoose.disconnect();
	process.exit(err ? 255 : 0);
});

function open(callback) {
	mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
	var db = mongoose.connection.db;
	db.dropDatabase(callback);
}

function requireModels(callback) {
	require('models/user');
	require('models/city');

	async.each(Object.keys(mongoose.models), function (modelName, callback) {
		mongoose.models[modelName].ensureIndexes(callback)
	}, callback)
}

function createUsers(callback) {

	var users = [
		{name: 'Bobby', password: '1234'},
		{name: 'Sam', password: '1111'},
		{name: 'Frank', password: '4321'}
	];

	async.each(users, function (userData, callback) {
		var user = new mongoose.models.User(userData);
		user.save(callback)
	}, callback);
}

function createCities(callback) {
	var cities = [
		{
			"name": "Kyiv",
			"bounds": {"south": 50.213273, "west": 30.239440100000024, "north": 50.590798, "east": 30.825941000000057},
			"timezone": 2
		},
		{
			"name": "London",
			"bounds": {
				"south": 51.38494009999999,
				"west": -0.351468299999965,
				"north": 51.6723432,
				"east": 0.14827100000002247
			},
			"timezone": 0
		},
		{
			"name": "New York",
			"bounds": {"south": 40.4960439, "west": -74.2557349, "north": 40.91525559999999, "east": -73.7002721},
			"timezone": -4
		},
		{
			"name": "Toronto",
			"bounds": {"south": 43.5810245, "west": -79.63921900000003, "north": 43.8554579, "east": -79.116897},
			"timezone": -4
		},
		{
			"name": "Sydney",
			"bounds": {"south": -34.1692489, "west": 150.50222899999994, "north": -33.4245981, "east": 151.34263609999994},
			"timezone": 11
		},
		{
			"name": "Madrid",
			"bounds": {"south": 40.3120639, "west": -3.834161799999947, "north": 40.5638447, "east": -3.52491150000003},
			"timezone": 1
		},
		{
			"name": "Paris",
			"bounds": {"south": 48.815573, "west": 2.22519299999999, "north": 48.9021449, "east": 2.4699207999999544},
			"timezone": 1
		}
	];

	async.each(cities, function (cityData, callback) {
		var city = new mongoose.models.City(cityData);
		city.save(callback)
	}, callback);
}
