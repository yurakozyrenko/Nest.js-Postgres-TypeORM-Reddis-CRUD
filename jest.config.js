module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '.spec.ts$',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.ts', '!**/node_modules/**', '!**/test/**'],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
  };