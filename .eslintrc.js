module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['standard', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "semi": [2, "always"],
    "comma-dangle": ["error", "always-multiline"],
  },
};
