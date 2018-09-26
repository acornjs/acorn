// Acorn is a tiny, fast JavaScript parser written in JavaScript.
//
// Acorn was written by Marijn Haverbeke, Ingvar Stepanyan, and
// various contributors and released under an MIT license.
//
// Git repositories for Acorn are available at
//
//     http://marijnhaverbeke.nl/git/acorn
//     https://github.com/acornjs/acorn.git
//
// Please use the [github bug tracker][ghbt] to report issues.
//
// [ghbt]: https://github.com/acornjs/acorn/issues
//
// [walk]: util/walk.js

import {Parser} from "./state"
import "./parseutil"
import "./statement"
import "./lval"
import "./expression"
import "./location"
import "./scope"

export {Parser} from "./state"
export {defaultOptions} from "./options"
export {Position, SourceLocation, getLineInfo} from "./locutil"
export {Node} from "./node"
export {TokenType, types as tokTypes, keywords as keywordTypes} from "./tokentype"
export {TokContext, types as tokContexts} from "./tokencontext"
export {isIdentifierChar, isIdentifierStart} from "./identifier"
export {Token} from "./tokenize"
export {isNewLine, lineBreak, lineBreakG, nonASCIIwhitespace} from "./whitespace"

export const version = "6.0.2"

// The main exported interface (under `self.acorn` when in the
// browser) is a `parse` function that takes a code string and
// returns an abstract syntax tree as specified by [Mozilla parser
// API][api].
//
// [api]: https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API

export function parse(input, options) {
  return Parser.parse(input, options)
}

// This function tries to parse a single expression at a given
// offset in a string. Useful for parsing mixed-language formats
// that embed JavaScript expressions.

export function parseExpressionAt(input, pos, options) {
  return Parser.parseExpressionAt(input, pos, options)
}

// Acorn is organized as a tokenizer and a recursive-descent parser.
// The `tokenizer` export provides an interface to the tokenizer.

export function tokenizer(input, options) {
  return Parser.tokenizer(input, options)
}
