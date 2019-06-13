exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    // Display only errors to reduce the amount of output.
    stats: "errors-only",
    historyApiFallback: true,
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    open: true,
    overlay: {
      errors: true,
      warnings: true,
    },
  },
});

exports.devtool = {
  devtool: 'inline-source-map',
};
