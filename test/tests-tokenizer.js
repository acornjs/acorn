// Tests for the standalone tokenizer (acorn.tokenizer()), which decides
// regexp-vs-division from the token context state machine rather than from
// the parser's grammar state, so it is exercised separately here.

if (typeof exports !== "object") throw new Error("This file must be run in Node")

var acorn = require("../acorn")
var driver = require("./driver.js")

function tokenTypes(code, options) {
  var types = [], tokenizer = acorn.tokenizer(code, Object.assign({ecmaVersion: 2022}, options)), token
  do {
    token = tokenizer.getToken()
    types.push(token.type.label)
  } while (token.type !== acorn.tokTypes.eof)
  return types
}

function tokenizesRegexp(code, options) {
  try {
    return tokenTypes(code, options).indexOf("regexp") > -1
  } catch (e) {
    return false
  }
}

var opts = {ecmaVersion: 2022}

// A slash right after a name is division; the tokenizer must not read it as a regexp.
driver.testAssert("function f() { a / b }", function() {
  return tokenizesRegexp("function f() { a / b }") ? "expected division, not a regexp" : null
}, opts)

// A regexp is allowed after yield in a generator and after await in an async
// function; the tokenizer must recognize both.
driver.testAssert("function* f() { yield /a*/ }", function() {
  return tokenizesRegexp("function* f() { yield /a*/ }") ? null : "expected a regexp after yield"
}, opts)
driver.testAssert("async function f() { await /a*/ }", function() {
  return tokenizesRegexp("async function f() { await /a*/ }") ? null : "expected a regexp after await"
}, opts)
driver.testAssert("async function* f() { await /a*/ }", function() {
  return tokenizesRegexp("async function* f() { await /a*/ }") ? null : "expected a regexp after await"
}, opts)

// The async marking is read off the `function` keyword, whose updateContext
// handler is shared with `class`, and async functions are ES2017. Neither an
// async class nor an older ecmaVersion may put the tokenizer in an async context.
driver.testAssert("async function f() { await /a*/ }", function() {
  if (tokenizesRegexp("async class C { m() { await /a*/ } }")) return "expected division inside an async class"
  if (tokenizesRegexp("async function f() { await /a*/ }", {ecmaVersion: 7})) return "expected division below ES2017"
  if (!tokenizesRegexp("async function f() { await /a*/ }", {ecmaVersion: 8})) return "expected a regexp after await in ES2017"
  return null
}, opts)
