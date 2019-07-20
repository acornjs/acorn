'use strict';

// Which Unicode version should be used?
let pkg = require('../package.json')
let dependencies = Object.keys(pkg.devDependencies)
let unicodeVersion = dependencies.find((name) => /^unicode-\d/.test(name))

let start = require(unicodeVersion + '/Binary_Property/ID_Start/code-points.js').filter(ch => ch > 0x7f)
let last = -1
let cont = [0x200c, 0x200d].concat(require(unicodeVersion + '/Binary_Property/ID_Continue/code-points.js')
    .filter(ch => ch > 0x7f && search(start, ch, last + 1) === -1))

function search(arr, ch, starting) {
  for (let i = starting; arr[i] <= ch && i < arr.length; last = i++)
    if (arr[i] === ch) return i
  return -1
}

function esc(code) {
  let hex = code.toString(16)
  return hex.length <= 2 ? "\\x" + hex.padStart(2, "0") : "\\u" + hex.padStart(4, "0")
}

function generate(chars) {
  let astral = [], re = ""
  for (let i = 0, at = 0x10000; i < chars.length; i++) {
    let from = chars[i], to = from
    while (i < chars.length - 1 && chars[i + 1] === to + 1) {i++; to++}
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

let startData = generate(start), contData = generate(cont)

let code = [
  `    let nonASCIIidentifierStartChars = "${startData.nonASCII}"`,
  `    let nonASCIIidentifierChars = "${contData.nonASCII}"`,
  `    const astralIdentifierStartCodes = ${JSON.stringify(startData.astral)}`,
  `    const astralIdentifierCodes = ${JSON.stringify(contData.astral)}`
]

if (process.argv.length != 3) {
  console.log(code.join("\n"))
} else {
  let {readFile} = require('fs')
  readFile(process.argv[2], "utf8", function(err, data) {
    if (err) throw err
    for (let line of code)
      data = data.replace(new RegExp(/.* = /.exec(line)[0] + ".*"), line)
    process.stdout.write(data)
  })
}
