var Flight = require('../models/flight');
var convertToMongoParams = require('../socket').convertToMongoParams;

module.exports = function(socket) {
    socket.on('get_flights', function (data) {
        var params = convertToMongoParams(data);
        Flight.findAsync(params.query, params.fields)
            .then(flights => socket.emit('get_flights', flights))
            .catch(err => console.log(err));
    });
};