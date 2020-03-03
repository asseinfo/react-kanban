const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'ReactKanban',
    libraryTarget: 'umd'
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
  plugins: [new MiniCssExtractPlugin()],
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    'react-is': 'react-is'
  },
  resolve: {
    alias: {
      '@services': path.resolve(__dirname, 'src/services/')
    }
  }
}
