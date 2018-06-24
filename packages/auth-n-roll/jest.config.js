'use strict'

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js', 'src/**/*.jsx'],
  coveragePathIgnorePatterns: ['node_modules', 'src/index.js'],
  coverageReporters: ['text', 'html'],
  testMatch: ['**/*.test.js', '**/*.test.jsx'],
  setupTestFrameworkScriptFile: './test/config.js'
}
