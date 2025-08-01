const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    clean: true,
  },
  mode: 'development',
  devServer: {
    static: './dist',
    port: 3000,
    open: true,
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:5050',
      },
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // .js and .jsx
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/, // optional, for future styling
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // so we can omit extensions in imports
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        REACT_APP_USE_MOCK_SERVER: JSON.stringify(process.env.REACT_APP_USE_MOCK_SERVER),
      }
    }),
  ],
};
