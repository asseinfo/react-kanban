module.exports = {
  testEnvironment: 'jest-environment-jsdom-fourteen',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**',
    '!src/index.js'
  ],
  coverageDirectory: 'coverage',
  testMatch: ['<rootDir>/src/**/*.spec.js'],
  setupFilesAfterEnv: [
    'react-testing-library/cleanup-after-each',
    'jest-dom/extend-expect'
  ],
  moduleNameMapper: {
    '^@services/(.*)$': '<rootDir>/src/services/$1'
  }
}
