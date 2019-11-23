const path = require('path');

module.exports = {
  entry: {
    application: './public/js/application.js',
    chat: './public/js/chat.js'
  },
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: [".ts", ".js"]
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
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.pug/,
        use: 'pug-loader',
      },
    ],
  },
  performance: { hints: false },
};
