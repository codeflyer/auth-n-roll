'use strict'

module.exports = {
  collectCoverageFrom: ['src/**/*.js', 'src/**/*.jsx'],
  coveragePathIgnorePatterns: ['node_modules'],
  coverageReporters: ['text', 'html'],
  testMatch: ['**/*.test.js', '**/*.test.jsx'],
  transformIgnorePatterns: [
    'node_modules/(?!(auth-n-roll))'
  ]
//  moduleNameMapper: {
//    "auth-n-roll": "<rootDir>/../auth-n-roll"
//  }
}
