module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**', '!src/index.js'],
  coverageDirectory: 'coverage',
  roots: ["<rootDir>/src"],
  "transform": {
    "^.+\\.(t|j)sx?$": "ts-jest"
  },
  testMatch: ['<rootDir>/src/**/*.spec.js'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: {
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '\\.s?css$': 'identity-obj-proxy'
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
}
