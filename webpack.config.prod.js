var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

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
            HISTORY_TYPE: "'createHistory'",
            SERVER_URL: `'${process.env.SERVER_URL || 'localhost:8082'}'`,
            BASE_NAME: `'${process.env.BASE_NAME || '/portfolio/customize-your-trip/'}'`
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
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.prod.html',
            inject: false
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