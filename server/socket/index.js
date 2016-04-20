module.exports = function (io) {
    io.on('connection', function (socket) {
        require('./cities')(socket);
        require('./cars')(socket);
        require('./hotels')(socket);
        require('./flights')(socket);
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
                res.query[fieldName] = new RegExp(data.search[fieldName], 'im')
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