const HtmlWebpackPlugin = require('html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

const path = require('path');
const fs = require('fs');

module.exports = {
  entry: {
    application: './public/js/application.js',
    // chat: './public/js/chat.js'
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      title: 'MyJobs'
    }),
    new MiniCssExtractPlugin({}),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, '/public/js/sw.js')
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'public/dist/static'),
    publicPath: '/static/',
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        // Для включения в css файлов шрифтов и картинок
        test: /\.(jp?g|png|woff|woff2|eot|ttf|svg)$/,
        use: [
          'url-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      },
      {
        test: /\.pug/,
        use: 'pug-loader',
      },
    ],
  },
  performance: { hints: false },
};

fs.rename('public/dist/static/index.html', 'public/dist/index.html', _ => {});
