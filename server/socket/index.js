module.exports = function (io) {
    var cities = require('./cities')(io);
    var flights = require('./flights')(io);
    var hotels = require('./hotels')(io);
    var cars = require('./cars')(io);

    io.on('connection', function (socket) {
        cities(socket);
        flights(socket);
        hotels(socket);
        cars(socket);
    });
};

module.exports.convertToMongoParams = function (req) {
    var res = {query: {}};
    var data = req && req.data;
    if (data) {
        if (data.id) {
            res.query._id = Array.isArray(data.id) ? {$in: data.id} : data.id;
        }
        if (data.search) {
            for (var fieldName in data.search) {
                if (typeof data.search[fieldName] === "string") {
                    res.query[fieldName] = new RegExp(data.search[fieldName], 'im');
                }
                else res.query[fieldName] = data.search[fieldName];
            }
        }
        if (data.fields) res.fields = data.fields;
        if (data.sort) res.sort = data.sort;
    }
    return res;
};

module.exports.handleNotEnoughResults = function (Model, req, sort) {
    return function (docs) {
        if (req && req.data && req.data.notEnough && (docs.length < 10)) {
            var limit = 10 - docs.length;
            return Model.find({_id: {$nin: docs.map(doc => doc._id)}}, req.data.fields)
                .sort(sort).limit(limit).execAsync()
                .then(newDocs => docs.concat(newDocs));
        }
        return docs;
    };
};

module.exports.respondWithId = function(socket, path, req) {
    return function (data) {
        socket.emit(path, {sockId: req && req.sockId, data});
    };
};

module.exports.logError = function(err) {
    console.error(err && err.stack || err);
};