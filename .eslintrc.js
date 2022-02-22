module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
  },
  extends: ['airbnb', 'airbnb/hooks'],
  rules: {
    // general
    'no-restricted-exports': 'off',
    'object-curly-newline': ['error', {
      ObjectExpression: { minProperties: 6, multiline: true, consistent: true },
      ObjectPattern: { minProperties: 6, multiline: true, consistent: true },
      ImportDeclaration: { minProperties: 6, multiline: true, consistent: true },
      ExportDeclaration: { minProperties: 6, multiline: true, consistent: true },
    }],

    // import
    'import/prefer-default-export': 'off',

    // react
    'react/jsx-filename-extension': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',

    // a11y
    'jsx-a11y/media-has-caption': 'off',
  },
};
