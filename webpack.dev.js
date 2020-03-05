const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './assets/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }]
  },
  plugins: [new HtmlWebpackPlugin({ template: './assets/index.html' })],
  resolve: {
    alias: {
      '@services': path.resolve(__dirname, 'src/services/'),
      '@components': path.resolve(__dirname, 'src/components/')
    }
  },
  devtool: 'inline-source-map',
  devServer: {
    watchOptions: {
      ignored: /node_modules/
    }
  }
}
