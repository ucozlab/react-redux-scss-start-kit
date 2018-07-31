// var webpack = require('webpack');
var path = require("path");
// var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src/js/index.js'),
  output: {
    path: __dirname + "/public/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: [/\.js$/, /\.es6$/],
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react', 'es2015'],
              plugins: ["transform-class-properties", "transform-object-rest-spread", "transform-es2015-arrow-functions"]
            }
          },
          {
            loader: "eslint-loader",
          }
        ]
      }
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: './public/index.html'
    // })
  ],
  devServer: {
    // inline: true,
    open: true,
    port: 7000,
    contentBase: path.resolve(__dirname, 'public'),
    historyApiFallback: true
  }
};