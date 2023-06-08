module.exports = {
  extends: ["next/core-web-vitals", "eslint-config-prettier", 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  "rules": {
    "no-unused-vars": [0, { "args": "after-used", "argsIgnorePattern": "^_" }]
  }
};