const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

// css and js are both automatically minified/uglified when running webpack -p
module.exports = {
  context: path.resolve(__dirname, 'app'),
  entry: {
    index: './javascripts/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    publicPath: '/clioandcalliope/',
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
            loader: 'url-loader',
            options: {
              // default fallback is file-loader
              limit: 8000,
              name: 'images/[name].[hash].[ext]',
            }
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
      },
      {
        test: /\.ico$/,
        exclude: [nodeModulesPath],
        use: [
          { loader: 'file-loader', options: { name: '[name].[ext]' } },
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new CleanWebpackPlugin(['build']),
  ]
}