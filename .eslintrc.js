module.exports = {
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  ignorePatterns: [
    '!node_modules/',
    'node_modules/*',
    '!node_modules/mylibrary/',
    'src/assets/lib/*',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  plugins: ['prettier'],
  noInlineConfig: true,
};
