var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server);
var path = require('path');
var config = require('./config');
var createDB = require('./createDB');

var baseUrl = process.env.BASE_NAME || '';

if (process.env.NODE_ENV != 'production') createDB().then(startServer);
else startServer();

function startServer() {
    app.use(baseUrl + '/dist', function(req, res, next) {
        return express.static(path.join(__dirname, '../dist'))(req, res, next);
    });

    if (baseUrl !== '') {
        app.use(baseUrl, function (req, res) {
            return res.sendFile(path.join(__dirname, '../dist/index.html'));
        });
    }
    else {
        app.use('/', function (req, res) {
            return res.sendFile(path.join(__dirname, '../dist/index.html'));
        });
    }

    require('./socket')(io);

    var port = config.get('port'),
        url = config.get('url');

    server.listen(port, url, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(`Listening at ${url}:${port}`);
    });
}