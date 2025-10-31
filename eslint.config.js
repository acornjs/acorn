import js from "@eslint/js"
import neostandard from "neostandard"
import importPlugin from "eslint-plugin-import"

export default [
  {
    ignores: [
      "**/dist/**",
      "**/test/**",
      "**/local/**"
    ]
  },
  js.configs.recommended,
  ...neostandard(),
  importPlugin.flatConfigs.recommended,
  {
    languageOptions: {
      globals: {
        BigInt: false,
        Packages: false
      }
    }
  },
  {
    rules: {
      "@stylistic/indent": [
        "error",
        2,
        {
          SwitchCase: 0,
          VariableDeclarator: 2,
          CallExpression: {arguments: "off"}
        }
      ],
      "@stylistic/new-parens": "off",
      "@stylistic/no-mixed-operators": "off",
      "@stylistic/object-curly-spacing": ["error", "never"],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi-spacing": "off",
      "@stylistic/space-before-function-paren": ["error", "never"],
      "no-unreachable-loop": "off",
      "no-empty": "off",
      curly: "off",
      eqeqeq: ["error", "always", {null: "ignore"}],
      "new-parens": "off",
      "no-case-declarations": "off",
      "no-cond-assign": "off",
      "no-console": ["error", {allow: ["warn", "error"]}],
      "no-fallthrough": "off",
      "no-labels": "off",
      "no-return-assign": "off",
      "no-unused-labels": "error",
      "no-var": "error",
      "object-shorthand": "off",
      "one-var": "off",
      "prefer-const": "off"
    }
  },
  {
    files: [
      "acorn/src/bin/*.js",
      "bin/generate-identifier-regex.js",
      "bin/generate-unicode-script-values.js",
      "bin/run_test262.js"
    ],
    languageOptions: {
      ecmaVersion: 2025
    },
    rules: {
      "no-console": "off"
    }
  }
]
