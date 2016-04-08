'use strict';

var os = require('os');
var ifaces = os.networkInterfaces();
var ip = '';

Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            return;
        }

        ip = iface.address;
    });
});

module.exports = ip;