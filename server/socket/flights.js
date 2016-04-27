var Flight = require('../models/flight');
var methods = require('../socket');
var convertToMongoParams = methods.convertToMongoParams;
var handleNotEnoughResults = methods.handleNotEnoughResults;
var respondWithId = methods.respondWithId;
var logError = methods.logError;

var path = 'get_flights';
var sort = {departTime: 1, companyName: 1};

module.exports = function(io) {
/*    Flight.schema.post('save', function(next) {
        console.log(this);
        io.emit('update_flights', this);
        //next();
    });*/

    return function(socket) {
        //Flight.model.updateAsync({_id: "57163eecc23fcb16df594cc7"}, {companyName: 'asdasdasd'}).then();
        socket.on(path, function (req) {
            var params = convertToMongoParams(req);
            var sort = params.sort || sort;
            Flight.model.find(params.query, params.fields).sort(sort).execAsync()
                .then(handleNotEnoughResults(Flight.model, req, sort))
                .then(respondWithId(socket, path, req))
                .catch(logError);
        });
    };
};