const path = require( 'path' );
const webpack = require( 'webpack' );
const HTMLWebpackPlugin = require( 'html-webpack-plugin' );
const uglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );

const PATHS = {
    src: `${__dirname}/src/`,
    dist: `${__dirname}/dist`
};
const libraryName = 'pagination';

module.exports = {
    // mode: 'development',
    mode: 'production',
    entry: `${PATHS.src}index.js`,
    output: {
        library: libraryName,
        libraryTarget: 'umd',
        libraryExport: 'default',
        path: path.resolve( __dirname, 'dist' ),
        filename: `${libraryName}.js`
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [ 'babel-loader' ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new uglifyJsPlugin(),
        new HTMLWebpackPlugin( {
            template: path.resolve( __dirname, 'index.html' )
        } ),
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin( {
            patterns: [
                {from: `${PATHS.src}demo.js`, to: `${PATHS.dist}`}
            ]
        } )
    ]
};