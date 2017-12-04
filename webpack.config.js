const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
  context: path.resolve(__dirname, 'app'),
  entry: {
    index: './javascripts/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js'
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
          // filename: 'css/[name].[ext]'
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: [nodeModulesPath],
        use: {
          loader: 'file-loader',
          options: {
            name: 'images/[name].[hash].[ext]',
          }
        },
      },
      {
        test: /\.html$/,
        exclude: [nodeModulesPath],
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name].[ext]' }
          },
          'extract-loader',
          {
            loader: 'html-loader',
            options: { minimize: true }
          },
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new CleanWebpackPlugin(['build']),
    // new HtmlWebpackPlugin({
    //   title: 'Output Management'
    // })
  ]
}