var Hotel = require('../models/hotel');
var convertToMongoParams = require('../socket').convertToMongoParams;

module.exports = function(socket) {
    socket.on('get_hotels', function (data) {
        var params = convertToMongoParams(data);
        Hotel.findAsync(params.query, params.fields)
            .then(hotels => socket.emit('get_hotels', hotels))
            .catch(err => console.log(err));
    });
};