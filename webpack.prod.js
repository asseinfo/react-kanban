const path = require('path')

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
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }]
  },
  externals: {
    'styled-components': 'styled-components',
    react: 'react'
  },
  resolve: {
    alias: {
      '@services': path.resolve(__dirname, 'src/services/')
    }
  }
}
