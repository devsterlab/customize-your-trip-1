var Hotel = require('../models/hotel');

module.exports = function (socket) {

	socket.on('get_all_hotels', function (data) {

		if (data && data.id) {

			if (Array.isArray(data.id)) {

				Hotel.find({'_id': {$in: data.id}})
					.then(function (hotels) {
						socket.emit('get_all_hotels', hotels);
					})
					.catch(function (err) {
						console.log(err)
					})

			} else {

				Hotel.find({'_id': data.id})
					.then(function (hotels) {
						socket.emit('get_all_hotels', hotels);
					})
					.catch(function (err) {
						console.log(err)
					})

			}
		} else {

			Hotel.find({})
				.then(function (hotels) {
					socket.emit('get_all_hotels', hotels);
				})
				.catch(function (err) {
					console.log(err)
				})

		}

	});

};