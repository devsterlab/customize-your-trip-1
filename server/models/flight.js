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
		type: Schema.ObjectId
		//type: mongoose.Schema.Types.ObjectId,
		//ref: 'User'
	},
	toCity: {
		type: Schema.ObjectId
		//type: mongoose.Schema.Types.ObjectId,
		//ref: 'User'
	}
	//fromCity: {
	//	type: mongoose.Schema.Types.ObjectId,
	//	ref: 'User'
	//}
	//toCity: {
	//	type: mongoose.Schema.Types.ObjectId,
	//	ref: 'User'
	//}
});

exports.Flight = mongoose.model('Flight', schema);