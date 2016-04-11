var Flight = require('../models/flight').Flight;

module.exports = (socket) => {

	socket.on('get_all_flights', (data) => {

		if (data && data.id) {

			if (Array.isArray(data.id)) {

				Flight.find({'_id': {$in: data.id}})
					.then((flights) => {
						socket.emit('get_all_flights', flights);
					})
					.catch((err) => {
						console.log(err)
					})

			} else {

				Flight.find({'_id': data.id})
					.then((flights) => {
						socket.emit('get_all_flights', flights);
					})
					.catch((err) => {
						console.log(err)
					})

			}
		} else {

			Flight.find({})
				.then((flights) => {
					socket.emit('get_all_flights', flights);
				})
				.catch((err) => {
					console.log(err)
				})

		}

	});

};