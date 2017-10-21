const path = require('path');
const webpack = require('webpack');

const config = {
  entry: {
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
      'axios',
      'prop-types',
      'lodash.debounce',
      'lodash.pickby',
    ],
    app: ['./lib/renderers/dom.js'],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'lib'),
      path.resolve(__dirname, 'node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env', 'stage-2'],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
  ],
};

module.exports = config;
