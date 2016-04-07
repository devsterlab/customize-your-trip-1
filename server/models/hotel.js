var mongoose = require('../lib/mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
	name: {
		type: String,
		required: true
	},
	address: {
		type: String
	},
	description: {
		type: String
	},
	popularity: {
		type: Number
	},
	price: {
		type: Number
	},
	stars: {
		type: Number
	},
	latitude: {
		type: Number
	},
	longitude: {
		type: Number
	},
	images: {
		type: Array
	},
	city: {
		type: Schema.ObjectId
		//type: mongoose.Schema.Types.ObjectId,
		//ref: 'User'
	}
	//cityName: {
	//	type: mongoose.Schema.Types.ObjectId,
	//	ref: 'User'
	//}
});

exports.Hotel = mongoose.model('Hotel', schema);