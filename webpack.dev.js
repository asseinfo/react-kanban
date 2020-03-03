const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: './assets/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { modules: 'global' } }, 'sass-loader']
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin(), new HtmlWebpackPlugin({ template: './assets/index.html' })],
  resolve: {
    alias: {
      '@services': path.resolve(__dirname, 'src/services/')
    }
  },
  devtool: 'inline-source-map',
  devServer: {
    watchOptions: {
      ignored: /node_modules/
    }
  }
}
