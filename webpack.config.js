const path = require('path');

module.exports = {
  entry: './public/js/application.js',
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'application.js',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
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
