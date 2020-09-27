const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
    styles: './src/styles.scss'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'ReactKanban',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.ts$/, exclude: /node_modules/, use: 'ts-loader' },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
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
      '@services': path.resolve(__dirname, 'src/services/'),
      '@components': path.resolve(__dirname, 'src/components/')
    },
    extensions: ['.ts', '.js', '.json', '.scss']
  }
}
