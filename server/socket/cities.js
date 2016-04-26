var City = require('../models/city');
var methods = require('../socket');
var convertToMongoParams = methods.convertToMongoParams;
var handleNotEnoughResults = methods.handleNotEnoughResults;
var respondWithId = methods.respondWithId;
var logError = methods.logError;

var path = 'get_cities';
var sort = {name: 1, timezone: 1};

module.exports = function(io) {
    return function (socket) {
        socket.on(path, function (req) {
            var params = convertToMongoParams(req);
            var sort = params.sort || sort;
            City.model.find(params.query, params.fields).sort(sort).execAsync()
                .then(handleNotEnoughResults(City.model, req, sort))
                .then(respondWithId(socket, path, req))
                .catch(logError);
        });
    };
};