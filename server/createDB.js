var mongoose = require('./lib/mongoose');
var UserModel = require('./models/user');
var CityModel = require('./models/city');
var CarModel = require('./models/car');
var FlightModel = require('./models/flight');
var HotelModel = require('./models/hotel');
var loadMocks = require('./loadMocks');

module.exports = function() {
    return new Promise(function (resolve, reject) {
        mongoose.connection.on('open', function() {
            mongoose.set('debug', true);
            mongoose.connection.db.dropDatabase(function () {
                createUsers()
                    .then(loadMocks)
                    .then(mocks => Promise.all([
                        createCities(mocks.cities),
                        createFlights(mocks.flights, mocks.cities),
                        createHotels(mocks.hotels, mocks.cities),
                        createCars(mocks.cars, mocks.cities)
                    ]))
                    .then(() => {
                        mongoose.set('debug', false);
                        resolve();
                    })
                    .catch(err => reject(err));
            });
        });
    });
};

function createUsers() {
    var users = [
        {name: 'Bobby', password: '1234'},
        {name: 'Sam', password: '1111'},
        {name: 'Frank', password: '4321'}
    ];
    return UserModel.createAsync(users);
}

function createCities(cities) {
    return CityModel.createAsync(cities);
}

function getCityById(cities, id) {
    for (var i = 0, len = cities.length; i < len; i++) {
        if (cities[i]._id === id) {
            return cities[i];
        }
    }
}

function createFlights(flights, cities) {
    for (var i = 0; i < flights.length; i++) {
        var fromCity = getCityById(cities, flights[i].fromCity);
        var toCity = getCityById(cities, flights[i].toCity);

        flights[i].fromCity = {
            _id: fromCity._id,
            name: fromCity.name,
            timezone: fromCity.timezone
        };

        flights[i].toCity = {
            _id: toCity._id,
            name: toCity.name,
            timezone: toCity.timezone
        };
    }
    return FlightModel.createAsync(flights);
}

function createHotels(hotels, cities) {
    for (var i = 0; i < hotels.length; i++) {
        var city = getCityById(cities, hotels[i].city);

        hotels[i].city = {
            _id: city._id,
            name: city.name,
            timezone: city.timezone
        };
    }
    return HotelModel.createAsync(hotels);
}

function createCars(cars, cities) {
    for (var i = 0; i < cars.length; i++) {
        var city = getCityById(cities, cars[i].city);
        cars[i].city = {
            _id: city._id,
            name: city.name,
            timezone: city.timezone
        };
    }
    return CarModel.createAsync(cars);
}
