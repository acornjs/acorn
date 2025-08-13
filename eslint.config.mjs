import js from "@eslint/js";
import { importX } from "eslint-plugin-import-x";
import globals from "globals";

export default [
  { ignores: ["**/dist", "test"] },
  js.configs.recommended,
  importX.flatConfigs.recommended,
  {
    files: ["**/*.{js,mjs}"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      eqeqeq: ["error", "always", { null: "ignore" }],
      "no-case-declarations": "off",
      "no-cond-assign": "off",
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-empty": "off",
      "no-fallthrough": "off",
      "no-var": "error",
      "no-constant-condition": "off",
      "prefer-const": "off",
    },
  },
  {
    files: [
      "acorn/src/bin/*.js",
      "bin/generate-identifier-regex.js",
      "bin/generate-unicode-script-values.js",
    ],
    rules: {
      "no-console": "off",
    },
  },
];
