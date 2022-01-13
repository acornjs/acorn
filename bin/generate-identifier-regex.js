"use strict"

const fs = require("fs")
const path = require("path")
const pkg = require("../package.json")
const dependencies = Object.keys(pkg.devDependencies)
const unicodeVersion = dependencies.find((name) => /^@unicode\/unicode-\d/.test(name))

const start = require(unicodeVersion + "/Binary_Property/ID_Start/code-points.js").filter(ch => ch > 0x7f)
let last = -1
const cont = [0x200c, 0x200d].concat(require(unicodeVersion + "/Binary_Property/ID_Continue/code-points.js")
  .filter(ch => ch > 0x7f && search(start, ch, last + 1) === -1))

function search(arr, ch, starting) {
  for (let i = starting; arr[i] <= ch && i < arr.length; last = i++)
    if (arr[i] === ch) return i
  return -1
}

function esc(code) {
  const hex = code.toString(16)
  return hex.length <= 2 ? "\\x" + hex.padStart(2, "0") : "\\u" + hex.padStart(4, "0")
}

function generate(chars) {
  const astral = []
  let re = ""
  for (let i = 0, at = 0x10000; i < chars.length; i++) {
    let from = chars[i], to = from
    while (i < chars.length - 1 && chars[i + 1] === to + 1) { i++; to++ }
    if (to <= 0xffff) {
      if (from === to) re += esc(from)
      else if (from + 1 === to) re += esc(from) + esc(to)
      else re += esc(from) + "-" + esc(to)
    } else {
      astral.push(from - at, to - from)
      at = to
    }
  }
  return {nonASCII: re, astral: astral}
}

const startData = generate(start), contData = generate(cont)

const astralIdentifierStartCodes = "export default " + JSON.stringify(startData.astral).split(",").join(", ")
const astralIdentifierCodes = "export default " + JSON.stringify(contData.astral).split(",").join(", ")
const nonASCIIidentifierStartChars = "export default \"" + startData.nonASCII + "\""
const nonASCIIidentifierChars = "export default \"" + contData.nonASCII + "\""

const comment = "// This file was generated. Do not modify manually!"

function writeGeneratedFile(filename, content) {
  fs.writeFileSync(path.resolve("./acorn/src/generated", filename + ".js"), comment + "\n" + content + "\n", "utf8")
}

writeGeneratedFile("astralIdentifierStartCodes", astralIdentifierStartCodes)
writeGeneratedFile("astralIdentifierCodes", astralIdentifierCodes)
writeGeneratedFile("nonASCIIidentifierStartChars", nonASCIIidentifierStartChars)
writeGeneratedFile("nonASCIIidentifierChars", nonASCIIidentifierChars)

console.log("Done. The generated files must be committed.")
