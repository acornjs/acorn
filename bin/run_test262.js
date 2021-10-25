const fs = require("fs")
const path = require("path")
const run = require("test262-parser-runner")
const parse = require("../acorn").parse

const unsupportedFeatures = [
  "arbitrary-module-namespace-names",
  "import-assertions"
];

run(
  (content, {sourceType}) => parse(content, {sourceType, ecmaVersion: 13, allowHashBang: true, allowAwaitOutsideFunction: sourceType === "module"}),
  {
    testsDirectory: path.dirname(require.resolve("test262/package.json")),
    skip: test => (test.attrs.features && unsupportedFeatures.some(f => test.attrs.features.includes(f))),
    whitelist: fs.readFileSync("./bin/test262.whitelist", "utf8")
      .split("\n")
      .filter(Boolean)
      .map(filename => path.sep !== "/" ? filename.split("/").join(path.sep) : filename)
  }
)
