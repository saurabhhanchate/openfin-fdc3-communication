const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, '../dist/receiver');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    provider: path.resolve(__dirname, 'provider.ts'),
    receiver: path.resolve(__dirname, 'receiver.ts'),
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: BUILD_DIR,
    clean: true,
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Receiver Provider',
      template: path.resolve(__dirname, 'provider.html'),
      filename: 'provider.html',
      chunks: ['provider'],
    }),
    new HtmlWebpackPlugin({
      title: 'Receiver',
      template: path.resolve(__dirname, 'receiver.html'),
      filename: 'receiver.html',
      chunks: ['receiver'],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'receiver.json'),
          to: BUILD_DIR,
          toType: 'dir',
          force: true,
        },
      ],
    }),
  ],
  devServer: {
    port: 3000,
    allowedHosts: 'all',
    liveReload: false,
    hot: false,
    devMiddleware: {
      writeToDisk: true,
    },
    static: [
      {
        directory: BUILD_DIR,
        publicPath: '/receiver',
        watch: false,
      },
    ],
  },
};
