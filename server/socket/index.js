module.exports = function (io) {
	io.on('connection', function (socket) {
		require('./cities')(socket);
		require('./cars')(socket);
		require('./hotels')(socket);
		require('./flight')(socket);
	});
};

