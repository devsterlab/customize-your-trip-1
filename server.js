var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require(`./webpack.config${process.argv[2] == '-p' && '.prod' || ''}`);
var ip = require('./getIP');
config.entry[0] = config.entry[0].replace('localhost', ip);

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    proxy: {
        "/api": "http://192.168.1.48:8081"
    },
    stats: { colors: true }
}).listen(8080, ip, function (err, result) {
        if (err) {
            console.log(err);
        }

        console.log(`Listening at ${ip}:8080`);
    });