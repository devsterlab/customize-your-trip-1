var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

var config = require('./config');

server.listen(config.get('port'), 'localhost', function (err, result) {
	if (err) {
		console.log(err);
	}

	console.log('Listening at localhost:' + config.get('port'));
});

app.use(express.static(path.join(__dirname, '../')));

io.on('connection', function (socket) {
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
		console.log(data);
	});

	var City = require('./models/city').City;

	City.find({}, function (err, cities) {
		if (err) throw err;
		socket.emit('cities', cities);;
	})

});