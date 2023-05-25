const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  devServer: {
    static: './dist', // location of static assets
    port: 9000, //port to serve on
    server: 'http', // http, https, etc.
    hot: true, // hot module loading
    open: true, // open the page in browser
    client: {
      overlay: true, // error overlay on webpage
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'To-Do List',
      template: 'src/index.html'
    }),
    new MiniCssExtractPlugin({}),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader, // output the css file as main.css
          'css-loader'
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
  },
};