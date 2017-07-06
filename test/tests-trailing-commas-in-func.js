
if (typeof exports != "undefined") {
  var driver = require("./driver.js");
  var test = driver.test, testFail = driver.testFail, testAssert = driver.testAssert, misMatch = driver.misMatch;
  var acorn = require("..");
}

//------------------------------------------------------------------------------
// allow

test("function foo(a,) { }", {ecmaVersion: 8})

test("(function(a,) { })", {ecmaVersion: 8})

test("(a,) => a", {ecmaVersion: 8})

test("async (a,) => a", {ecmaVersion: 8})

test("({foo(a,) {}})", {ecmaVersion: 8})

test("class A {foo(a,) {}}", {ecmaVersion: 8})

test("class A {static foo(a,) {}}", {ecmaVersion: 8})

test("(class {foo(a,) {}})", {ecmaVersion: 8})

test("(class {static foo(a,) {}})", {ecmaVersion: 8})

test(
  "export default function foo(a,) { }",
  {ecmaVersion: 8, sourceType: "module"}
)

test(
  "export default (function foo(a,) { })",
  {ecmaVersion: 8, sourceType: "module"}
)

test("export function foo(a,) { }", {ecmaVersion: 8, sourceType: "module"})

test("foo(a,)", {ecmaVersion: 8})

test("new foo(a,)", {ecmaVersion: 8})

test("foo(...a,)", {ecmaVersion: 8})

test("new foo(...a,)", {ecmaVersion: 8})

//------------------------------------------------------------------------------
// disallow in {ecmaVersion: 7}

testFail("function foo(a,) { }", {ecmaVersion: 7})
testFail("(function(a,) { })", {ecmaVersion: 7})
testFail("(a,) => a", {ecmaVersion: 7})
testFail("async (a,) => a", {ecmaVersion: 7})
testFail("({foo(a,) {}})", {ecmaVersion: 7})
testFail("class A {foo(a,) {}}", {ecmaVersion: 7})
testFail("class A {static foo(a,) {}}", {ecmaVersion: 7})
testFail("(class {foo(a,) {}})", {ecmaVersion: 7})
testFail("(class {static foo(a,) {}})", {ecmaVersion: 7})
testFail(
  "export default function foo(a,) { }",
  {ecmaVersion: 7, sourceType: "module"}
)
testFail(
  "export default (function foo(a,) { })",
  {ecmaVersion: 7, sourceType: "module"}
)
testFail("export function foo(a,) { }", {ecmaVersion: 7, sourceType: "module"})
testFail("foo(a,)", {ecmaVersion: 7})
testFail("new foo(a,)", {ecmaVersion: 7})

//------------------------------------------------------------------------------
// disallow after rest parameters

testFail("function foo(...a,) { }", {ecmaVersion: 8})
testFail("(function(...a,) { })", {ecmaVersion: 8})
testFail("(...a,) => a", {ecmaVersion: 8})
testFail("async (...a,) => a", {ecmaVersion: 8})
testFail("({foo(...a,) {}})", {ecmaVersion: 8})
testFail("class A {foo(...a,) {}}", {ecmaVersion: 8})
testFail("class A {static foo(...a,) {}}", {ecmaVersion: 8})
testFail("(class {foo(...a,) {}})", {ecmaVersion: 8})
testFail("(class {static foo(...a,) {}})", {ecmaVersion: 8})
testFail(
  "export default function foo(...a,) { }",
  {ecmaVersion: 8, sourceType: "module"}
)
testFail(
  "export default (function foo(...a,) { })",
  {ecmaVersion: 8, sourceType: "module"}
)
testFail("export function foo(...a,) { }", {ecmaVersion: 8, sourceType: "module"})

//------------------------------------------------------------------------------
// disallow empty

testFail("function foo(,) { }", {ecmaVersion: 8})
testFail("(function(,) { })", {ecmaVersion: 8})
testFail("(,) => a", {ecmaVersion: 8})
testFail("async (,) => a", {ecmaVersion: 8})
testFail("({foo(,) {}})", {ecmaVersion: 8})
testFail("class A {foo(,) {}}", {ecmaVersion: 8})
testFail("class A {static foo(,) {}}", {ecmaVersion: 8})
testFail("(class {foo(,) {}})", {ecmaVersion: 8})
testFail("(class {static foo(,) {}})", {ecmaVersion: 8})
testFail(
  "export default function foo(,) { }",
  {ecmaVersion: 8, sourceType: "module"}
)
testFail(
  "export default (function foo(,) { })",
  {ecmaVersion: 8, sourceType: "module"}
)
testFail("export function foo(,) { }", {ecmaVersion: 8, sourceType: "module"})

//------------------------------------------------------------------------------
// disallow in parens without arrow

testFail("(a,)", {ecmaVersion: 7})
testFail("(a,)", {ecmaVersion: 8})

