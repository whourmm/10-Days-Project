export default {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"]
  }
};
