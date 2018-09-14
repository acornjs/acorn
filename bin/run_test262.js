const fs = require("fs")
const path = require("path")
const run = require("test262-parser-runner")
const parse = require("../acorn").parse

const unsupportedFeatures = [
  "BigInt",
  "class-fields-private",
  "class-fields-public",
  "class-methods-private",
  "class-static-fields-private",
  "class-static-fields-public",
  "class-static-methods-private",
  "export-star-as-namespace-from-module",
  "numeric-separator-literal"
];

run(
  (content, {sourceType}) => parse(content, {sourceType, ecmaVersion: 10}),
  {
    testsDirectory: path.dirname(require.resolve("test262/package.json")),
    skip: test => (test.attrs.features && unsupportedFeatures.some(f => test.attrs.features.includes(f))),
    whitelist: fs.readFileSync("./bin/test262.whitelist", "utf8").split("\n").filter(v => v)
  }
)
