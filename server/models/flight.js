var mongoose = require('../lib/mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
	companyName: {
		type: String,
		required: true
	},
	departTime: {
		type: String
	},
	duration: {
		type: String
	},
	available: {
		type: Number
	},
	price: {
		type: Number
	},
	fromCity: {
		type: Schema.Types.Mixed
	},
	toCity: {
		type: Schema.Types.Mixed
	}
});

exports.Flight = mongoose.model('Flight', schema);