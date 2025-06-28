/** @type {import('jest').Config} */
const config = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  collectCoverageFrom: ['**/src/**/*.js'],
  preset: '@shelf/jest-mongodb',
  watchPathIgnorePatterns: [
    'globalConfig.json',
    '/node_modules/',
    '/coverage/',
    '.git',
    '.vscode'
  ]
}

module.exports = config
