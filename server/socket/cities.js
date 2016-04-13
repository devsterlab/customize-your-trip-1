var City = require('../models/city').City;

module.exports = (socket) => {

	socket.on('get_all_cities', (data) => {

		if (data && data.id) {

			if (Array.isArray(data.id)) {

				City.findAsync({'_id': {$in: data.id}})
					.then((cities) => {
						socket.emit('get_all_cities', cities);
					})
					.catch((err) => {
						console.log(err)
					})
			} else {

				City.findAsync({'_id': data.id})
					.then((cities) => {
						socket.emit('get_all_cities', cities);
					})
					.catch((err) => {
						console.log(err)
					})
			}

		} else {

			City.findAsync({})
				.then((cities) => {
					socket.emit('get_all_cities', cities);
				})
				.catch((err) => {
					console.log(err)
				})
		}


	});

};