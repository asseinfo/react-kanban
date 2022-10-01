import { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: ['src/**'],
  coverageDirectory: 'coverage',
  testMatch: ['<rootDir>/**/*.spec.{ts.tsx}'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testRunner: 'jest-circus/runner',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '\\.s?css$': 'identity-obj-proxy',
  },
}

export default config
