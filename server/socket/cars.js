var Car = require('../models/car').Car;

module.exports = (socket) => {

	socket.on('get_all_cars', (data) => {

		if (data && data.id) {

			if (Array.isArray(data.id)) {

				Car.find({'_id': {$in: data.id}})
					.then((cars) => {
						socket.emit('get_all_cars', cars);
					})
					.catch((err) => {
						console.log(err)
					})

			} else {

				Car.find({'_id': data.id})
					.then((cars) => {
						socket.emit('get_all_cars', cars);
					})
					.catch((err) => {
						console.log(err)
					})

			}
		} else {

			Car.find({})
				.then((cars) => {
					socket.emit('get_all_cars', cars);
				})
				.catch((err) => {
					console.log(err)
				})

		}


	});

};