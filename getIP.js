'use strict';

var os = require('os');
var interfaces = os.networkInterfaces();

var ip = (function () {
    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                return address.address;
            }
        }
    }
})();

module.exports = ip;