module.exports = function (io) {
	io.on('connection', function (socket) {
		require('./cities')(socket);
		require('./cars')(socket);
		require('./hotels')(socket);
		require('./flight')(socket);
	});
};

module.exports.convertToMongoParams = function(data) {
    var res = { query: {} };
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
    }
    return res;
};