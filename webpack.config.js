const path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'deploy/dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ],
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './src/game/resources/map', to: 'resources/map' },
            { from: './src/index.html', to: '' },
        ]),
    ]
};