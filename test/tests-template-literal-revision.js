if (typeof exports != "undefined") {
  var test = require("./driver.js").test
  var testFail = require("./driver.js").testFail
}

test("`foo`", {ecmaVersion: 9})

test("`foo\\u25a0`", {ecmaVersion: 9})

test("`foo${bar}\\u25a0`", {ecmaVersion: 9})

test("foo`\\u25a0`", {ecmaVersion: 9})

test("foo`foo${bar}\\u25a0`", {ecmaVersion: 9})

testFail("`\\unicode`", {ecmaVersion: 9})
testFail("`\\u`", {ecmaVersion: 9})
testFail("`\\u{`", {ecmaVersion: 9})
testFail("`\\u{abcdx`", {ecmaVersion: 9})
testFail("`\\u{abcdx}`", {ecmaVersion: 9})
testFail("`\\xylophone`", {ecmaVersion: 9})

testFail("foo`\\unicode`", {ecmaVersion: 8})
testFail("foo`\\xylophone`", {ecmaVersion: 8})

testFail("foo`\\unicode", {ecmaVersion: 9})
testFail("foo`\\unicode\\`", {ecmaVersion: 9})

test("foo`\\unicode`", {ecmaVersion: 9})

test("foo`foo${bar}\\unicode`", {ecmaVersion: 9})

test("foo`\\u`", {ecmaVersion: 9})

test("foo`\\u{`", {ecmaVersion: 9})

test("foo`\\u{abcdx`", {ecmaVersion: 9})

test("foo`\\u{abcdx}`", {ecmaVersion: 9})

test("foo`\\unicode\\\\`", {ecmaVersion: 9})
