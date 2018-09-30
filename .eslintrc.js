module.exports = {
  parser: 'babel-eslint',
  extends: ['standard', 'standard-jsx', 'standard-react', 'prettier/react', 'prettier/standard'],
  rules: {
    'no-console': [1],
    'max-len': [0, { code: 120, comments: 120, ignoreTrailingComments: true }],
    curly: 0,
    'no-throw-literal': 0,
    'react/prop-types': 0,
    'space-before-function-paren': 0,
    'import/order': ['error', { 'newlines-between': 'always' }],
    'import/no-namespace': ['error'],
    'prefer-const': ['error'],
    'prefer-template': ['error']
  },
  globals: {
    describe: true,
    test: true,
    it: true,
    xit: true,
    jest: true,
    jsdom: true,
    expect: true,
    beforeEach: true,
    afterEach: true,
    beforeAll: true,
    afterAll: true,
    sessionStorage: true,
    __DEV__: true
  }
}
