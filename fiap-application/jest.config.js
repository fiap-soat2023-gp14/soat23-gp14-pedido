module.exports = {
  clearMocks: true,
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
  testRegex: ".*\\/.*spec\\.ts$",
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  coverageDirectory: '../coverage',
  coverageReporters: ['lcov'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/core/application/dto/**',
    '!src/**/*.module.ts',
    '!src/**/*.spec.ts',
    '!src/core/domain/entities/**',
    '!src/infrastructure/migration/**',
    '!src/main.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 30,
      lines: 30,
      statements: 30,
    },
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1'
  },
  reporters: ['default',  ['jest-sonar', {
    outputDirectory: '../coverage',
    outputName: 'test-report.xml',
    reportedFilePath: 'relative'
  }]],
}