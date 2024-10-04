const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, '../dist/sender');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    provider: path.resolve(__dirname, 'provider.ts'),
    sender: path.resolve(__dirname, 'sender.ts'),
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
      title: 'Sender Provider',
      template: path.resolve(__dirname, 'provider.html'),
      filename: 'provider.html',
      chunks: ['provider'],
    }),
    new HtmlWebpackPlugin({
      title: 'Sender',
      template: path.resolve(__dirname, 'sender.html'),
      filename: 'sender.html',
      chunks: ['sender'],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'sender.json'),
          to: BUILD_DIR,
          toType: 'dir',
          force: true,
        },
      ],
    }),
  ],
  devServer: {
    port: 4200,
    allowedHosts: 'all',
    liveReload: false,
    hot: false,
    devMiddleware: {
      writeToDisk: true,
    },
    static: [
      {
        directory: BUILD_DIR,
        publicPath: '/sender',
        watch: false,
      },
    ],
  },
};
