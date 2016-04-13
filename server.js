var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var serverConfig = require('./server/config');

var port = serverConfig.get('port'),
    url = serverConfig.get('url');

process.env.OPENED = true;
process.env.SERVER_URL = process.argv.find(arg => arg == '-w') && `192.168.1.48:${port}` || `${url}:${port}`;

var config = require(`./webpack.config${process.argv.find(arg => arg == '-p') && '.prod' || ''}`);
var ip = require('./getIP');
config.entry[0] = config.entry[0].replace('localhost', ip);

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    proxy: {
        '/api': process.env.SERVER_URL
    },
    stats: { colors: true }
}).listen(8080, ip, function (err, result) {
        if (err) {
            console.log(err);
        }

        console.log(`Listening at ${ip}:8080`);
    });