var mongoose = require('../lib/mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
	brand: {
		type: String,
		required: true
	},
	carType: {
		type: String
	},
	image: {
		type: String
	},
	maxPassengers: {
		type: Number
	},
	model: {
		type: String
	},
	price: {
		type: Number
	},
	transmission: {
		type: String
	},
	city: {
		type: Schema.ObjectId,
		//type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
	//cityName: {
	//	type: mongoose.Schema.Types.ObjectId,
	//	ref: 'User'
	//}
});

exports.Car = mongoose.model('Car', schema);