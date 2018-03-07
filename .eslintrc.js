'use strict'

// Put this file to the directory where your browser code is located. This could be the root
// directory, or a subdirectory if your project consists of both node.js and browser code.

module.exports = {
  parser: 'babel-eslint',
  extends: [
    '@strv/javascript/environments/react/v15',
    '@strv/javascript/environments/react/optional',
    '@strv/javascript/coding-styles/recommended',
    'prettier',
  ],
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  plugins: ['react'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    shallow: true,
    mount: true,
    render: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './internals/webpack/webpack.prod.babel.js',
      },
    },
  },
  rules: {
    'valid-jsdoc': 0,
    'new-cap': 0,
    'import/no-named-as-default': 0,
    'react/sort-prop-types': 0,
    'import/no-anonymous-default-export': 0,
    'id-length': 0,
    'react/prefer-stateless-function': 0,
    'react/require-default-props': 0,
    'no-inline-comments': 0,
    'no-undefined': 0,
    'import/no-useless-path-segments': 0,
    'import/no-self-import': 0,
    camelcase: 0,
  },
}
