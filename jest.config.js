module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**', '!src/index.js'],
  coverageDirectory: 'coverage',
  testMatch: ['<rootDir>/src/**/*.spec.js'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: {
    '^@services/(.*)$': '<rootDir>/src/services/$1'
  }
}
