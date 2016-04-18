var City = require('../models/city');
var convertToMongoParams = require('../socket').convertToMongoParams;

module.exports = function(socket) {
    socket.on('get_cities', function (data) {
        var params = convertToMongoParams(data);
        City.findAsync(params.query, params.fields)
            .then(cities => socket.emit('get_cities', cities))
            .catch(err => console.log(err));
    });
};