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
  if (arg[0] != "-" && !infile) infile = arg
  else if (arg == "--" && !infile && i + 2 == process.argv.length) infile = process.argv[++i]
  else if (arg == "--ecma3") options.ecmaVersion = 3
  else if (arg == "--ecma5") options.ecmaVersion = 5
  else if (arg == "--ecma6") options.ecmaVersion = 6
  else if (arg == "--ecma7") options.ecmaVersion = 7
  else if (arg == "--locations") options.locations = true
  else if (arg == "--allow-hash-bang") options.allowHashBang = true
  else if (arg == "--silent") silent = true
  else if (arg == "--compact") compact = true
  else if (arg == "--help") help(0)
  else if (arg == "--tokenize") tokenize = true
  else if (arg == "--module") options.sourceType = 'module'
  else help(1)
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
