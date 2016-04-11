var mongoose = require('./lib/mongoose');
var async = require('async');

var cities = require('models/mocks_data/cities.json').cities;
var cars = require('models/mocks_data/cars.json').cars;
var flights = require('models/mocks_data/flights.json').flights;
var hotels = require('models/mocks_data/hotels.json').hotels;

mongoose.set('debug', true);

async.series([
	open,
	dropDatabase,
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

function requireModels(callback) {
	require('models/user');
	require('models/city');
	require('models/car');
	require('models/flight');
	require('models/hotel');

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

	mongoose.models.City.find({}, function (err, cities) {

		for (var i = 0, len = cars.length; i < len; i++) {
			var randomCitiesIndex = Math.floor(Math.random() * (cities.length));
			cars[i].city = {
				_id: cities[randomCitiesIndex].id,
				name: cities[randomCitiesIndex].name,
				timezone: cities[randomCitiesIndex].timezone
			};
		}

		async.each(cars, function (carData, callback) {
			var car = new mongoose.models.Car(carData);
			car.save(callback)
		}, callback);
	});

}

function createFlights(callback) {

	mongoose.models.City.find({}, function (err, cities) {

		for (var i = 0, len = flights.length; i < len; i++) {
			var randomFromCities = Math.floor(Math.random() * (cities.length));
			flights[i].fromCity = {
				_id: cities[randomFromCities].id,
				name: cities[randomFromCities].name,
				timezone: cities[randomFromCities].timezone
			};

			var randomToCities = Math.floor(Math.random() * (cities.length));

			if(randomToCities === randomFromCities){
				flights[i].toCity = {
					_id: cities[randomToCities === 0 ? randomToCities + 1 : randomToCities - 1].id,
					name: cities[randomToCities === 0 ? randomToCities + 1 : randomToCities - 1].name,
					timezone: cities[randomToCities === 0 ? randomToCities + 1 : randomToCities - 1].timezone
				};
			} else {
				flights[i].toCity = {
					_id: cities[randomToCities].id,
					name: cities[randomToCities].name,
					timezone: cities[randomToCities].timezone
				};
			}
		}

		async.each(flights, function (flightData, callback) {
			var flight = new mongoose.models.Flight(flightData);
			flight.save(callback)
		}, callback);
	});

}

function createHotels(callback) {

	mongoose.models.City.find({}, function (err, cities) {

		for (var i = 0, len = hotels.length; i < len; i++) {
			var randomCitiesIndex = Math.floor(Math.random() * (cities.length));
			hotels[i].city = {
				_id: cities[randomCitiesIndex].id,
				name: cities[randomCitiesIndex].name,
				timezone: cities[randomCitiesIndex].timezone
			};
		}

		async.each(hotels, function (hotelData, callback) {
			var hotel = new mongoose.models.Hotel(hotelData);
			hotel.save(callback)
		}, callback);
	});


}
