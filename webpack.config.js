const path = require( 'path' );
const webpack = require( 'webpack' );
const HTMLWebpackPlugin = require( 'html-webpack-plugin' );
const uglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const sass = require( 'node-sass' );

const PATHS = {
    src: `${__dirname}/src/`,
    dist: `${__dirname}/dist`,
    demo: `${__dirname}/demo`
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
                { from: `${PATHS.src}lib/`, to: `${PATHS.demo}`, info: () => ({ minimized: true }) },
                {
                    from: `${PATHS.src}scss/`, to: `${PATHS.demo}/pagination.css`, transform( content, path ) {
                        const result = sass.renderSync( {
                            file: path,
                            outputStyle: 'compressed'
                        } );

                        return result.css.toString();
                    }
                }
            ]
        } )
    ]
};