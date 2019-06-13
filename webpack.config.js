const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const staticPath = path.resolve(__dirname, 'app/static/');
const environment = process.env.NODE_ENV || 'development'
// Define different configurations by environment
const config = require(path.join(__dirname, 'config', environment))
const merge = require('webpack-merge')
const parts = require("./webpack.parts");

// CSS, JS, and HTML are automatically minified/uglified when running build and deploy scripts

const commonConfig = merge([{
  context: path.resolve(__dirname, 'app'),
  entry: {
    index: './javascripts/index.js',
    base: './javascripts/base.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    publicPath: config.publicPath,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader-srcset',
          options: {
            attrs: ['img:src', 'img:srcset', 'source:srcset', ':data-src', ':data-srcset']
          }
        }
      },
      {
        test: /\.m?js$/,
        exclude: [/node_modules/],
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          // config in postcss.config.js and browserslist in package.json
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'resolve-url-loader', options: { keepQuery: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|webp)$/,
        include: [staticPath],
        exclude: [nodeModulesPath],
        use: [
          {
            loader: 'file-loader',
            options: { name: 'static/[name].[ext]' }
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|webp)$/,
        exclude: [nodeModulesPath, staticPath],
        use: [
          {
            loader: 'file-loader',
            options: { name: 'images/[name].[hash].[ext]', }
          },
        ],
      },
      {
        test: /\.ico$/,
        exclude: [nodeModulesPath],
        use: [{ loader: 'file-loader', options: { name: '[name].[ext]' } }]
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "file-loader",
          options: {
            // Limit at 50k. Above that it emits separate files
            limit: 50000,

            // Output below fonts directory
            name: "./fonts/[name].[ext]",
          }
        },
      },
    ]
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'static',
      logLevel: 'warn'
    }),
    new HtmlWebpackPlugin({
      // inject: false,
      chunks: ['index'],
      filename: 'index.html',
      template: 'index.html',
    }),
    new HtmlWebpackPlugin({
      // inject: false,
      chunks: ['base'],
      filename: 'about.html',
      template: 'about.html',
    }),
    new HtmlWebpackPlugin({
      // inject: false,
      chunks: ['base'],
      filename: 'contact.html',
      template: 'contact.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new CompressionPlugin(),
  ],
  devtool: process.env.NODE_ENV === 'production' ? 'none' : 'source-map',
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
