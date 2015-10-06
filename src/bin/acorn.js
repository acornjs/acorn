#!/usr/bin/env node

import {basename} from "path"
import {readFileSync as read} from "fs"
import * as acorn from "../dist/acorn.js"

let infile, parsed, tokens, silent = false, compact = false, tokenize = false
const options = {}

function help(status) {
  const print = (status == 0) ? console.log : console.error
  print("usage: " + basename(process.argv[1]) + " [--ecma3|--ecma5|--ecma6]")
  print("        [--tokenize] [--locations] [---allow-hash-bang] [--compact] [--silent] [--module] [--help] [--] infile")
  process.exit(status)
}

for (let i = 2; i < process.argv.length; ++i) {
  const arg = process.argv[i]
  switch (arg) {
  case "--ecma3":           options.ecmaVersion   = 3;        break
  case "--ecma5":           options.ecmaVersion   = 5;        break
  case "--ecma6":           options.ecmaVersion   = 6;        break
  case "--ecma7":           options.ecmaVersion   = 7;        break
  case "--locations":       options.locations     = true;     break
  case "--allow-hash-bang": options.allowHashBang = true;     break
  case "--module":          options.sourceType    = "module"; break
  case "--silent":          silent   = true;                  break
  case "--compact":         compact  = true;                  break
  case "--tokenize":        tokenize = true;                  break
  case "--help":            help(0);                          break
  case "--":
    if (!infile && i + 2 == process.argv.length) infile = process.argv[++i]
    break
  default:
    if (arg[0] !== "-" && !infile) infile = arg
    else help(1)
  }
}

try {
  const code = read(infile, "utf8")

  if (!tokenize)
    parsed = acorn.parse(code, options)
  else {
    const tokenizer = acorn.tokenizer(code, options)
    tokens = []
    while (true) {
      const token = tokenizer.getToken()
      tokens.push(token)
      if (token.type == acorn.tokTypes.eof)
        break
    }
  }
} catch(e) {
  console.log(e.message)
  process.exit(1)
}

if (!silent)
  console.log(JSON.stringify(tokenize ? tokens : parsed, null, compact ? null : 2))
