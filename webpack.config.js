const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractCSS = new ExtractTextPlugin('[name]-bundle.css')

const buildEnv = require('./webpack-scripts/environment.js')

const provideVariables = {
    'env': JSON.stringify(buildEnv.getEnvironment()),
    'envList': JSON.stringify(buildEnv.constants),
    'dl': JSON.stringify(1501534800000),
    'dlVal': JSON.stringify('days')
}

const config = {
    context: path.resolve(__dirname, "teamwork-app"),
    entry: {
        'teamwork-app': './index.js',
        'teamwork-app-vendors': [
            "react",
            "react-dom",
            "react-router",
            "react-router-redux",
            "react-redux",
            "react-cookie",
            "react-bootstrap/lib/",
            "react-bootstrap-typeahead",
            "react-day-picker",
            "react-loader",
            "redux",
            "redux-thunk",
            "redux-logger",
            "redux-notifications",
            "redux-form",
            "history/lib/createHashHistory",
            "moment",
            "dateformat"
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react'],
                        plugins: [
                            require('babel-plugin-transform-object-rest-spread'),
                            require('babel-polyfill')
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: extractCSS.extract(['css-loader'])
            },
            {
                test: /\.png$|\.jpg$/,
                loader: "file-loader?name=img/[name].[ext]"
            },
            {
                test: /\.png$/,
                loader: 'url-loader',
                options: { limit: 100000 },
            },
            {
                test: /\.woff2?$|\.woff$|\.ttf$|\.eot$|\.oet$|\.svg$/,
                loader: 'file-loader?name=fonts/[name].[ext]',
            }
        ]
    },
    plugins: [
        extractCSS,
        new webpack.DefinePlugin(provideVariables),
        // new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'teamwork-app-vendors',
            minChunks: ({ resource }) => /node_modules/.test(resource),
        }),
    ],
    resolve: {
        alias: {
            actions: path.resolve(__dirname, 'teamwork-app', 'actions'),
            components: path.resolve(__dirname, 'teamwork-app', 'components'),
            containers: path.resolve(__dirname, 'teamwork-app', 'containers'),
            pages: path.resolve(__dirname, 'teamwork-app', 'pages'),
            headers: path.resolve(__dirname, 'teamwork-app', 'headers'),
            middlewares: path.resolve(__dirname, 'teamwork-app', 'middlewares'),
            reducers: path.resolve(__dirname, 'teamwork-app', 'reducers'),
            constants: path.resolve(__dirname, 'teamwork-app', 'constants'),
            endpoints: path.resolve(__dirname, 'teamwork-app', 'endpoints'),
            services: path.resolve(__dirname, 'teamwork-app', 'services'),
            helpers: path.resolve(__dirname, 'teamwork-app', 'helpers'),
            styles: path.resolve(__dirname, 'teamwork-app', 'styles'),
            sass: path.resolve(__dirname, 'teamwork-app', 'sass'),
            handlers: path.resolve(__dirname, 'teamwork-app', 'handlers'),
            styles: path.resolve(__dirname, 'teamwork-app', 'styles'),
            fonts: path.resolve(__dirname, 'teamwork-app', 'fonts')
        },
    }
}

if (buildEnv.getEnvironment() === buildEnv.constants.PROD_ENV) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        output: {
            comments: false
        },
        compress: {
            warnings: false
        },
    }))
}

console.log('-------------------------------------------------------------------------------')
console.log('TEAMWORK Frontend application build')
console.log('')
console.log('Build environment: ', buildEnv.getEnvironment())
console.log('-------------------------------------------------------------------------------')

module.exports = config
