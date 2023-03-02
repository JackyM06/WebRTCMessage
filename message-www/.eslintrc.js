module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    // 使用vue3的eslint规则
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  globals: {
    __DEV__: 'readonly',
    __RUNTIME__: 'readonly',
  },
  rules: {
    'vue/mustache-interpolation-spacing': [ 'error', 'always' ],
    '@typescript-eslint/naming-convention': [ 'warn', {
      selector: 'interface',
      format: [ 'PascalCase' ],
      custom: {
        regex: '^I[A-Z]',
        match: true,
      },
    } ],
    '@typescript-eslint/no-unused-expressions': [ 'error', {
      allowShortCircuit: true,
    } ],
    '@typescript-eslint/no-unused-vars': [ 'warn', {
      vars: 'all',
      args: 'after-used',
      ignoreRestSiblings: false,
      varsIgnorePattern: '^_',
      argsIgnorePattern: '^_',
    } ],
    'no-unused-expressions': 'off',
    'no-console': [ 'error', { allow: [ 'warn', 'error' ] } ],
    'no-debugger': 'error',
    'no-undefined': 'off',
    'no-unused-vars': 'off',
    'array-bracket-spacing': [ 'warn', 'always', { objectsInArrays: false } ],
  },
  overrides: [
    {
      files: [ '*.ts' ],
      rules: {
        'no-dupe-class-members': 'off',
      },
    },
    {
      files: [ '*.vue' ],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
      },
    },
  ],
  ignorePatterns: [ 'src/assets/fonts' ],
};
