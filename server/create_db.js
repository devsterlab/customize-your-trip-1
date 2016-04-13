var mongoose = require('./lib/mongoose');
var async = require('async');

var cities;
var cars;
var flights;
var hotels;

mongoose.set('debug', true);

async.series([
	open,
	dropDatabase,
	getAllData,
	requireModels,
	createUsers,
	createCities,
	createCars,
	createFlights,
	createHotels
], function (err) {
	mongoose.disconnect();
	process.exit(err ? 255 : 0);
});

function open(callback) {
	console.log();
	mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
	var db = mongoose.connection.db;
	db.dropDatabase(callback);
}

function getAllData(callback) {
	var getMocks = require('./models/mocks_data');

	getMocks(function (data) {
		cities = data.cities;
		cars = data.cars;
		flights = data.flights;
		hotels = data.hotels;

		callback()
	});
}

function requireModels(callback) {
	require('./models/user');
	require('./models/city');
	require('./models/car');
	require('./models/flight');
	require('./models/hotel');

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
	async.each(cities, function (cityData, callback) {
		var city = new mongoose.models.City(cityData);
		city.save(callback)
	}, callback);
}

function createCars(callback) {
	async.each(cars, function (carData, callback) {
		var city = getCitiesById(carData.city);

		carData.city = {
			_id: city._id,
			name: city.name,
			timezone: city.timezone
		};

		var car = new mongoose.models.Car(carData);
		car.save(callback)
	}, callback);

}

function createFlights(callback) {
	async.each(flights, function (flightData, callback) {

		var fromCity = getCitiesById(flightData.fromCity);
		var toCity = getCitiesById(flightData.toCity);

		flightData.fromCity = {
			_id: fromCity._id,
			name: fromCity.name,
			timezone: fromCity.timezone
		};

		flightData.toCity = {
			_id: toCity._id,
			name: toCity.name,
			timezone: toCity.timezone
		};

		var flight = new mongoose.models.Flight(flightData);
		flight.save(callback)
	}, callback);

}

function createHotels(callback) {
	async.each(hotels, function (hotelData, callback) {

		var city = getCitiesById(hotelData.city);

		hotelData.city = {
			_id: city._id,
			name: city.name,
			timezone: city.timezone
		};

		var hotel = new mongoose.models.Hotel(hotelData);
		hotel.save(callback)
	}, callback);

}

function getCitiesById(cityId) {
	for (var i = 0, len = cities.length; i < len; i++) {
		if (cities[i]._id === cityId) {
			return cities[i]
		}
	}
}
