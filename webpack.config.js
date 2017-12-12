const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const environment = process.env.NODE_ENV || 'development'
// Define different configurations by environment
const config = require(path.join(__dirname, 'config', environment))
const merge = require('webpack-merge')
const parts = require("./webpack.parts");

// CSS, JS, and HTML are automatically minified/uglified when running webpack -p

const commonConfig = merge([{
  context: path.resolve(__dirname, 'app'),
  entry: {
    index: './javascripts/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    publicPath: config.publicPath,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: true } },
            // config in postcss.config.js and browserslist in package.json
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'resolve-url-loader', options: { keepQuery: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        })
      },
      // Images - inline if less than 8K, load files, optimize them
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: [nodeModulesPath],
        use: [
          {
            loader: 'url-loader', // default fallback is file-loader
            options: { limit: 8000, name: 'images/[name].[hash].[ext]', }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              optipng: { optimizationLevel: 3 },
              pngquant: { enabled: false },
            }
          },
        ],
      },
      {
        test: /\.html$/,
        exclude: [nodeModulesPath],
        use: [
          { loader: 'file-loader', options: { name: '[name].[ext]' } },
          'extract-loader',
          { loader: 'html-loader', options: { minimize: true } },
        ]
      },
      {
        test: /\.ico$/,
        exclude: [nodeModulesPath],
        use: [{ loader: 'file-loader', options: { name: '[name].[ext]' } }]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new CleanWebpackPlugin(['build']),
    // This makes it possible for us to safely use env vars on our code
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    })
  ]
}])

const developmentConfig = merge([
  parts.devServer({ host: process.env.HOST, port: process.env.PORT }),
  parts.devtool,
])

module.exports = env => {
  if (env === "development") {
    console.log('Using development configuration!')
    return merge(commonConfig, developmentConfig)
  }

  // Production and Staging
  console.log('Using production/staging configuration!')
  return merge(commonConfig)
}
