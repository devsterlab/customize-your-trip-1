var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var serverConfig = require('./server/config');
var port = serverConfig.get('port');
var ip = require('./getIP');

process.env.OPENED = true;
process.env.SERVER_URL = process.env.SERVER_URL
  || process.argv.find(arg => arg == '-w') && `http://95.67.59.110:8088`
  || `${process.env.HOST || ip}:${process.env.PORT || port}`;

var config = require(`./webpack.config${process.argv.find(arg => arg == '-p') && '.prod' || ''}`);
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