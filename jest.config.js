module.exports = {
  testEnvironment: 'jest-environment-jsdom-fourteen',
  collectCoverage: true,
  collectCoverageFrom: ['src/**'],
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: [
    'react-testing-library/cleanup-after-each',
    'jest-dom/extend-expect'
  ]
}
