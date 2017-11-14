const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'app'),
  entry: './javascripts/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  }
}