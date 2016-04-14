var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: [
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new CleanPlugin(['./dist']),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
            HISTORY_TYPE: process.env.OPENED ? "'browserHistory'" : "'hashHistory'",
            SERVER_URL: `'${process.env.SERVER_URL || 'localhost'}'`
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
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