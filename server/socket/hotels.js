var Hotel = require('../models/hotel');
var methods = require('../socket');
var convertToMongoParams = methods.convertToMongoParams;
var handleNotEnoughResults = methods.handleNotEnoughResults;
var respondWithId = methods.respondWithId;
var logError = methods.logError;

var path = 'get_hotels';
var sort = {popularity: -1, name: 1};

module.exports = function(socket) {
    socket.on(path, function (req) {
        var params = convertToMongoParams(req);
        var sort = params.sort || sort;
        Hotel.find(params.query, params.fields).sort(sort).execAsync()
            .then(handleNotEnoughResults(Hotel, req, sort))
            .then(respondWithId(socket, path, req))
            .catch(logError);
    });
};