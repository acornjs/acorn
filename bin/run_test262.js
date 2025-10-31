import fs from "fs"
import path from "path"
import run from "test262-parser-runner"
import {parse} from "../acorn/src/index.js"

function loadList(filename) {
  return fs.readFileSync(filename, "utf8")
    .split("\n")
    .filter(Boolean)
}

run(
  (content, {sourceType}) => parse(content, {sourceType, ecmaVersion: "latest", preserveParens: true}),
  {
    testsDirectory: path.dirname(new URL(import.meta.resolve("test262/package.json")).pathname),
    skip: test => test.attrs.features &&
      loadList("./bin/test262.unsupported-features").some(f => test.attrs.features.includes(f)),
    whitelist: loadList("./bin/test262.whitelist")
      .map(filename => path.sep === "/" ? filename : filename.split("/").join(path.sep))
  }
)
