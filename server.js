var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require(`./webpack.config${process.argv[2] == '-p' && '.prod' || ''}`);

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    proxy: {
        "/api": "http://192.168.1.48:8081"
    },
    stats: { colors: true }
}).listen(8080, '192.168.1.33', function (err, result) {
        if (err) {
            console.log(err);
        }

        console.log('Listening at 192.168.1.33:8080');
    });