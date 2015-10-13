
module.exports = {
  entry: './index.js',
  output: {
    path: __dirname + '/web/build/',
    filename: 'app.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
};
