var Flight = require('../models/flight');
var methods = require('../socket');
var convertToMongoParams = methods.convertToMongoParams;
var handleNotEnoughResults = methods.handleNotEnoughResults;
var respondWithId = methods.respondWithId;
var logError = methods.logError;

var path = 'get_flights';
var sort = {departTime: 1, companyName: 1};

module.exports = function(socket) {
    socket.on(path, function (req) {
        var params = convertToMongoParams(req);
        var sort = params.sort || sort;
        Flight.find(params.query, params.fields).sort(sort).execAsync()
            .then(handleNotEnoughResults(Flight, req, sort))
            .then(respondWithId(socket, path, req))
            .catch(logError);
    });
};