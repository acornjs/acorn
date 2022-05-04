"use strict"

module.exports = {
  extends: [
    "eslint:recommended",
    "standard",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  globals: {
    BigInt: false,
    Packages: false
  },
  overrides: [
    {
      files: ["acorn/src/bin/*.js", "bin/generate-identifier-regex.js"],
      rules: {
        "no-console": "off"
      }
    },
    {
      files: ["acorn/src/**/*.ts"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      rules: {
        "import/no-unresolved": "off",
        "no-useless-constructor": "off",
        "@typescript-eslint/no-useless-constructor": "error"
      }
    }
  ],
  plugins: ["eslint-plugin-import"],
  rules: {
    curly: "off",
    eqeqeq: ["error", "always", {null: "ignore"}],
    indent: [
      "error",
      2,
      {
        SwitchCase: 0,
        VariableDeclarator: 2,
        CallExpression: {arguments: "off"}
      }
    ],
    "new-parens": "off",
    "no-case-declarations": "off",
    "no-cond-assign": "off",
    "no-console": ["error", {allow: ["warn", "error"]}],
    "no-fallthrough": "off",
    "no-labels": "off",
    "no-mixed-operators": "off",
    "no-return-assign": "off",
    "no-unused-labels": "error",
    "no-var": "error",
    "object-curly-spacing": ["error", "never"],
    "one-var": "off",
    "prefer-const": "off",
    quotes: ["error", "double"],
    "semi-spacing": "off",
    "space-before-function-paren": ["error", "never"]
  }
}
