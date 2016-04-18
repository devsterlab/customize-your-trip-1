var Car = require('../models/car');
var convertToMongoParams = require('../socket').convertToMongoParams;

module.exports = function(socket) {
    socket.on('get_cars', function (data) {
        var params = convertToMongoParams(data);
        Car.findAsync(params.query, params.fields)
            .then(cars => socket.emit('get_cars', cars))
            .catch(err => console.log(err));
    });
};