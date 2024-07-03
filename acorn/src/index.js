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

import {Parser} from "./state.js"
import "./parseutil.js"
import "./statement.js"
import "./lval.js"
import "./expression.js"
import "./location.js"
import "./scope.js"

import {defaultOptions} from "./options.js"
import {Position, SourceLocation, getLineInfo} from "./locutil.js"
import {Node} from "./node.js"
import {TokenType, types as tokTypes, keywords as keywordTypes} from "./tokentype.js"
import {TokContext, types as tokContexts} from "./tokencontext.js"
import {isIdentifierChar, isIdentifierStart} from "./identifier.js"
import {Token} from "./tokenize.js"
import {isNewLine, lineBreak, lineBreakG, nonASCIIwhitespace} from "./whitespace.js"

export const version = "8.12.1"
export {
  Parser,
  defaultOptions,
  Position,
  SourceLocation,
  getLineInfo,
  Node,
  TokenType,
  tokTypes,
  keywordTypes,
  TokContext,
  tokContexts,
  isIdentifierChar,
  isIdentifierStart,
  Token,
  isNewLine,
  lineBreak,
  lineBreakG,
  nonASCIIwhitespace
}

Parser.acorn = {
  Parser,
  version,
  defaultOptions,
  Position,
  SourceLocation,
  getLineInfo,
  Node,
  TokenType,
  tokTypes,
  keywordTypes,
  TokContext,
  tokContexts,
  isIdentifierChar,
  isIdentifierStart,
  Token,
  isNewLine,
  lineBreak,
  lineBreakG,
  nonASCIIwhitespace
}

// The main exported interface (under `self.acorn` when in the
// browser) is a `parse` function that takes a code string and returns
// an abstract syntax tree as specified by the [ESTree spec][estree].
//
// [estree]: https://github.com/estree/estree

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
