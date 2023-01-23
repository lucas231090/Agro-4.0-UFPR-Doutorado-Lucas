module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "prettier"],

  plugins: ["prettier"],

  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "prettier/prettier": "error",
    "class-methods-use-this": "off",
    "no-param-reassing": "off",
    camelcase: "off",
    no_underscore_dangle: "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
  },
};
