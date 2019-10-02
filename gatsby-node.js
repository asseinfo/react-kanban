const path = require('path')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@services': path.resolve(__dirname, '../src/services')
      }
    }
  })
}
