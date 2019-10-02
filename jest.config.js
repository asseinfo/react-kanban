module.exports = {
  testEnvironment: 'jest-environment-jsdom-fifteen',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**',
    '!src/index.js',
    '!src/**/*.js.snap'
  ],
  coverageDirectory: 'coverage',
  testMatch: ['<rootDir>/src/**/*.spec.js'],
  setupFilesAfterEnv: [
    '@testing-library/react/cleanup-after-each',
    '@testing-library/jest-dom/extend-expect'
  ],
  moduleNameMapper: {
    '^@services/(.*)$': '<rootDir>/src/services/$1'
  }
}
