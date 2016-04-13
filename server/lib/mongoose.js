var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var config = require('../config');

mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));

module.exports = mongoose;