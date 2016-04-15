var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            HISTORY_TYPE: process.env.OPENED ? "'browserHistory'" : "'hashHistory'",
            SERVER_URL: `'${process.env.SERVER_URL || 'localhost:8081'}'`
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Perf: "react-addons-perf",
            "window.Perf": "react-addons-perf"
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js?$/,
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel']
            },
            {
                test: /(\.css|\.scss)$/,
                loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
            },
            {
                test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    }
};