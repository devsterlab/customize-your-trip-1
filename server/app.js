var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config');

var app = express();

app.use(express.static(path.join(__dirname, '../')));

http.createServer(app).listen(config.get('port'), 'localhost', function (err, result) {
	if (err) {
		console.log(err);
	}

	console.log('Listening at localhost:' + config.get('port'));
});
