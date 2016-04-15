import 'isomorphic-fetch';
import {setCars} from '../actions/car';
import {setCities} from '../actions/city';
import {setFlights} from '../actions/flight';
import {setHotels} from '../actions/hotel';

const linkToJson = 'http://beta.json-generator.com/api/json/get/V1N4803Tg';

export default function loadMocks(store) {
    return fetch(linkToJson)
        .then(response => {
            if (response.status >= 400) {
                throw new Error('Bad response from server');
            }
            return response.json();
        })
        .then(mocks => {
            let {cities, flights, hotels, cars} = mocks;
            for (let i = 0; i < cities.length; i++) {
                let city = cities[i];
                for (let j = 0; j < flights.length; j++) {
                    let flight = flights[j];
                    if (flight.fromCity == city._id) {
                        flight.fromCity = {
                            _id: city._id,
                            name: city.name,
                            timezone: city.timezone
                        };
                    }
                    if (flight.toCity == city._id) {
                        flight.toCity = {
                            _id: city._id,
                            name: city.name,
                            timezone: city.timezone
                        };
                    }
                }
                for (let j = 0; j < hotels.length; j++) {
                    let hotel = hotels[j];
                    if (hotel.city == city._id) {
                        hotel.city = {
                            _id: city._id,
                            name: city.name
                        };
                    }
                }
                for (let j = 0; j < cars.length; j++) {
                    let car = cars[j];
                    if (car.city == city._id) {
                        car.city = {
                            _id: city._id,
                            name: city.name
                        };
                    }
                }
            }
            return mocks;
        })
        .then(mocks => {
            store.dispatch(setCars(mocks.cars));
            store.dispatch(setCities(mocks.cities));
            store.dispatch(setFlights(mocks.flights));
            store.dispatch(setHotels(mocks.hotels));
        });
}

const mocks = {

    cities: [
        {
            "_id": "56f3e8a1373e84f9dc234780",
            "name": "Kyiv",
            "bounds": {"south": 50.213273, "west": 30.239440100000024, "north": 50.590798, "east": 30.825941000000057},
            "timezone": "+0200"
        },
        {
            "_id": "56f3e8a172a967f8f2d00e31",
            "name": "London",
            "bounds": {"south": 51.38494009999999, "west": -0.351468299999965, "north": 51.6723432, "east": 0.14827100000002247},
            "timezone": "+0000"
        },
        {
            "_id": "56f3e8a13268e77a5c38a225",
            "name": "New York",
            "bounds": {"south": 40.4960439, "west": -74.2557349, "north": 40.91525559999999, "east": -73.7002721},
            "timezone": "-0400"
        },
        {
            "_id": "56f3e8a1cf164ee2dbc85372",
            "name": "Toronto",
            "bounds": {"south": 43.5810245, "west": -79.63921900000003, "north": 43.8554579, "east": -79.116897},
            "timezone": "-0400"
        },
        {
            "_id": "56f3e8a12e711621a7db29a2",
            "name": "Sydney",
            "bounds": {"south": -34.1692489, "west": 150.50222899999994, "north": -33.4245981, "east": 151.34263609999994},
            "timezone": "+1100"
        },
        {
            "_id": "56f3e8a11973fb60f402e64e",
            "name": "Madrid",
            "bounds": {"south": 40.3120639, "west": -3.834161799999947, "north": 40.5638447, "east": -3.52491150000003},
            "timezone": "+0100"
        },
        {
            "_id": "56f3e8a19bd6937df3cfe793",
            "name": "Paris",
            "bounds": {"south": 48.815573, "west": 2.22519299999999, "north": 48.9021449, "east": 2.4699207999999544},
            "timezone": "+0100"
        }
    ],

    flights: [
        {
            'repeat:100': {
                _id: '{{objectId()}}',
                fromCity: function (tags, parent, index) {
                    return parent.cities[Math.floor(index / 14.4)]._id;
                },
                toCity: function (tags, parent, index) {
                    var cityIndex = Math.floor(index / 14.4);
                    var range = tags.range(0, parent.cities.length, 1);
                    range.splice(cityIndex, 1);
                    return parent.cities[tags.random.apply(tags, range)]._id;
                },
                companyName: '{{company()}}',
                available: '{{integer(10, 100)}}',
                price: '{{integer(15, 200) * 10}}',
                departTime: '{{date().toTimeString().slice(0, 5)}}',
                duration: '{{integer(2, 12)}}:{{random("00", "30")}}'
            }
        }
    ],

    hotels: [
        {
            'repeat:100': {
                _id: '{{objectId()}}',
                city: function (tags, parent, index) {
                    return parent.cities[Math.floor(index / 14.4)]._id;
                },
                name: '{{company()}} {{company()}}',
                popularity: '{{integer(6, 10)}}',
                images: function(tags) {
                    var arrLength = tags.integer(5, 7);
                    var arr = [];
                    for (var i = 0; i < arrLength; i++)
                        arr.push('http://placeimg.com/128/128/arch?' + tags.floating());
                    return arr;
                },
                stars: '{{integer(3, 5)}}',
                latitude: function (tags, parent, index) {
                    var bounds = parent.cities[Math.floor(index / 14.4)].bounds;
                    return tags.floating(bounds.south, bounds.north);
                },
                longitude: function (tags, parent, index) {
                    var bounds = parent.cities[Math.floor(index / 14.4)].bounds;
                    return tags.floating(bounds.west, bounds.east);
                },
                address: '{{integer(100, 999)}} {{street()}}',
                description: function (tags) {
                    var desc = tags.lorem(3, 'sentences');
                    return desc.slice(0, 99);
                },
                price: '{{Math.max(50, Math.abs(Math.round(this.gauss(0, 0.1) * 100) * 10))}}'
            }
        }
    ],

    cars: [
        {
            'repeat:100': {
                _id: '{{objectId()}}',
                city: function (tags, parent, index) {
                    return parent.cities[Math.floor(index / 14.4)]._id;
                },
                brand: '{{random("Chevrolet", "Cadillac", "Buick", "Ford", "Chrysler", "Dodge", "Jeep", "Toyota", "Lexus", "Suzuki", "Mazda", "Honda", "Audi")}}',
                model: '{{lorem(1, "words")}}',
                image: 'http://loremflickr.com/200/200/car?{{floating()}}',
                carType: '{{random("Two-seaters", "Minicompact", "Subcompact", "Compact", "Mid-size", "Large")}}',
                price: '{{Math.max(50, Math.abs(Math.round(this.gauss(0, 0.1) * 100) * 10))}}',
                transmission: '{{random("manual", "automatic")}}',
                maxPassengers: function (tags) {
                    return this.carType == 'Two-seaters' ? 2 : tags.integer(4, 10);
                }
            }
        }
    ]

};