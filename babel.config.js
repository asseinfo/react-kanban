module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        exclude: ['transform-regenerator']
      }
    ]
  ],
  env: {
    // only include babel istanbul plugin when Cypress runs
    // because Jest preset already includes it, and you will
    // get duplicate plugin error
    cypress: {
      plugins: ['istanbul']
    },
    production: {
      plugins: ['react-remove-properties']
    }
  }
}
