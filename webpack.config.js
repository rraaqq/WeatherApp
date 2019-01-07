const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  watch: true,
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMaps: true,
                minimize: false,
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => [
                  new require('autoprefixer')(),
                ]
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('style.css'),
  ]
}