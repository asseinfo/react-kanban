module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**', '!src/index.js'],
  coverageDirectory: 'coverage',
  testMatch: ['<rootDir>/src/**/*.spec.js'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testRunner: 'jest-circus/runner',
  moduleNameMapper: {
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '\\.s?css$': 'identity-obj-proxy',
  },
}
