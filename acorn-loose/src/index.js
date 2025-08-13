// Acorn: Loose parser
//
// This module provides an alternative parser that exposes that same
// interface as the main module's `parse` function, but will try to
// parse anything as JavaScript, repairing syntax error the best it
// can. There are circumstances in which it will raise an error and
// give up, but they are very rare. The resulting AST will be a mostly
// valid JavaScript AST (as per the [ESTree spec][estree], except
// that:
//
// - Return outside functions is allowed
//
// - Label consistency (no conflicts, break only to existing labels)
//   is not enforced.
//
// - Bogus Identifier nodes with a name of `"✖"` are inserted whenever
//   the parser got too confused to return anything meaningful.
//
// [estree]: https://github.com/estree/estree
//
// The expected use for this is to *first* try `acorn.parse`, and only
// if that fails switch to the loose parser. The loose parser might
// parse badly indented code incorrectly, so **don't** use it as your
// default parser.
//
// Quite a lot of acorn.js is duplicated here. The alternative was to
// add a *lot* of extra cruft to that file, making it less readable
// and slower. Copying and editing the code allowed me to make
// invasive changes and simplifications without creating a complicated
// tangle.

import { defaultOptions } from "acorn";
import { LooseParser } from "./state.js";
import "./tokenize.js";
import "./statement.js";
import "./expression.js";

export { LooseParser } from "./state.js";
export { isDummy } from "./parseutil.js";

defaultOptions.tabSize = 4;

export function parse(input, options) {
  return LooseParser.parse(input, options);
}
