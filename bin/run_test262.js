const fs = require("fs")
const path = require("path")
const run = require("test262-parser-runner")
const parse = require("../acorn").parse

function loadList(filename) {
  return fs.readFileSync(filename, "utf8")
    .split("\n")
    .filter(Boolean)
}

run(
  (content, {sourceType}) => parse(content, {sourceType, ecmaVersion: "latest"}),
  {
    testsDirectory: path.dirname(require.resolve("test262/package.json")),
    skip: test => test.attrs.features &&
      loadList("./bin/test262.unsupported-features").some(f => test.attrs.features.includes(f)),
    whitelist: loadList("./bin/test262.whitelist")
      .map(filename => path.sep === "/" ? filename : filename.split("/").join(path.sep))
  }
)
