
if (typeof exports != "undefined") {
  var driver = require("./driver.js");
  var test = driver.test, testFail = driver.testFail, testAssert = driver.testAssert, misMatch = driver.misMatch;
  var acorn = require("..");
}

//-----------------------------------------------------------------------------
// Async Function Declarations

// async == false
test("function foo() { }", {ecmaVersion: 8})

// async == true
test("async function foo() { }", {ecmaVersion: 8})

// a reference and a normal function declaration if there is a linebreak between 'async' and 'function'.
test("async\nfunction foo() { }", {ecmaVersion: 8})

// export
test("export async function foo() { }", {ecmaVersion: 8, sourceType: "module"})

// export default
test(
    "export default async function() { }",
    {ecmaVersion: 8, sourceType: "module"}
)

// cannot combine with generators
testFail("async function* foo() { }", {ecmaVersion: 8})

// 'await' is valid as function names.
test("async function await() { }", {ecmaVersion: 8})

// cannot use 'await' inside async functions.
testFail("async function wrap() {\nasync function await() { }\n}", {ecmaVersion: 8})
testFail("async function foo(await) { }", {ecmaVersion: 8})
testFail("async function foo() { return {await} }", {ecmaVersion: 8})

//-----------------------------------------------------------------------------
// Async Function Expressions

// async == false
test("(function foo() { })", {ecmaVersion: 8})

// async == true
test("(async function foo() { })", {ecmaVersion: 8})

// cannot insert a linebreak to between 'async' and 'function'.
testFail("(async\nfunction foo() { })", {ecmaVersion: 8})

// cannot combine with generators.
testFail("(async function* foo() { })", {ecmaVersion: 8})

// export default
test(
    "export default (async function() { })",
    {ecmaVersion: 8, sourceType: "module"}
)

// cannot use 'await' inside async functions.
testFail("(async function await() { })", {ecmaVersion: 8})
testFail("(async function foo(await) { })", {ecmaVersion: 8})
testFail("(async function foo() { return {await} })", {ecmaVersion: 8})

//-----------------------------------------------------------------------------
// Async Arrow Function Expressions

// async == false
test("a => a", {ecmaVersion: 8})
test("(a) => a", {ecmaVersion: 8})

// async == true
test("async a => a", {ecmaVersion: 8})
test("async () => a", {ecmaVersion: 8})
test("async (a, b) => a", {ecmaVersion: 8})

// OK even if it's an invalid syntax in the case `=>` didn't exist.
test("async ({a = b}) => a", {ecmaVersion: 8})

// syntax error if `=>` didn't exist.
testFail("async ({a = b})", {ecmaVersion: 8})

// AssignmentPattern/AssignmentExpression
test("async ({a: b = c}) => a", {ecmaVersion: 8})
test("async ({a: b = c})", {ecmaVersion: 8})

// a reference and a normal arrow function if there is a linebreak between 'async' and the 1st parameter.
test("async\na => a", {ecmaVersion: 8})

// 'async()' call expression and invalid '=>' token.
testFail("async\n() => a", {ecmaVersion: 8})

// cannot insert a linebreak before '=>'.
testFail("async a\n=> a", {ecmaVersion: 8})
testFail("async ()\n=> a", {ecmaVersion: 8})

// a call expression with 'await' reference.
test("async (await)", {ecmaVersion: 8})

// cannot use 'await' inside async functions.
testFail("async await => 1", {ecmaVersion: 8})
testFail("async (await) => 1", {ecmaVersion: 8})
testFail("async ({await}) => 1", {ecmaVersion: 8})
testFail("async ({a: await}) => 1", {ecmaVersion: 8})
testFail("async ([await]) => 1", {ecmaVersion: 8})

// can use 'yield' identifier outside generators.
test("async yield => 1", {ecmaVersion: 8})

//-----------------------------------------------------------------------------
// Async Methods (object)

// async == false
test("({foo() { }})", {ecmaVersion: 8})

// async == true
test("({async foo() { }})", {ecmaVersion: 8})

// OK with 'async' as a method name
test("({async() { }})", {ecmaVersion: 8})

// invalid syntax if there is a linebreak after 'async'.
testFail("({async\nfoo() { }})", {ecmaVersion: 8})

// cannot combine with getters/setters/generators.
testFail("({async get foo() { }})", {ecmaVersion: 8})
testFail("({async set foo(value) { }})", {ecmaVersion: 8})
testFail("({async* foo() { }})", {ecmaVersion: 8})

// 'await' is valid as function names.
test("({async await() { }})", {ecmaVersion: 8})

// cannot use 'await' inside async functions.
test("async function wrap() {\n({async await() { }})\n}", {ecmaVersion: 8})
testFail("({async foo() { var await }})", {ecmaVersion: 8})
testFail("({async foo(await) { }})", {ecmaVersion: 8})
testFail("({async foo() { return {await} }})", {ecmaVersion: 8})

// invalid syntax 'async foo: 1'
testFail("({async foo: 1})", {ecmaVersion: 8})

//-----------------------------------------------------------------------------
// Async Methods (class)

// async == false
test("class A {foo() { }}", {ecmaVersion: 8})

// async == true
test("class A {async foo() { }}", {ecmaVersion: 8})
test("class A {static async foo() { }}", {ecmaVersion: 8})

// OK 'async' as a method name.
test("class A {async() { }}", {ecmaVersion: 8})
test("class A {static async() { }}", {ecmaVersion: 8})
test("class A {*async() { }}", {ecmaVersion: 8})
test("class A {static* async() { }}", {ecmaVersion: 8})

// invalid syntax if there is a linebreak after 'async'.
testFail("class A {async\nfoo() { }}", {ecmaVersion: 8})
testFail("class A {static async\nfoo() { }}", {ecmaVersion: 8})

// cannot combine with constructors/getters/setters/generators.
testFail("class A {async constructor() { }}", {ecmaVersion: 8})
testFail("class A {async get foo() { }}", {ecmaVersion: 8})
testFail("class A {async set foo(value) { }}", {ecmaVersion: 8})
testFail("class A {async* foo() { }}", {ecmaVersion: 8})
testFail("class A {static async get foo() { }}", {ecmaVersion: 8})
testFail("class A {static async set foo(value) { }}", {ecmaVersion: 8})
testFail("class A {static async* foo() { }}", {ecmaVersion: 8})

// 'await' is valid as function names.
test("class A {async await() { }}", {ecmaVersion: 8})
test("class A {static async await() { }}", {ecmaVersion: 8})

// cannot use 'await' inside async functions.
test(
    "async function wrap() {\nclass A {async await() { }}\n}",
    {ecmaVersion: 8}
)
testFail("class A {async foo() { var await }}", {ecmaVersion: 8})
testFail("class A {async foo(await) { }}", {ecmaVersion: 8})
testFail("class A {async foo() { return {await} }}", {ecmaVersion: 8})
//-----------------------------------------------------------------------------
// Await Expressions

// 'await' is an identifier in scripts.
test("await", {ecmaVersion: 8})

// 'await' is a keyword in modules.
testFail("await", {ecmaVersion: 8, sourceType: "module"})

// Await expressions is invalid outside of async functions.
testFail("await a", {ecmaVersion: 8})
testFail("await a", {ecmaVersion: 8, sourceType: "module"})

// Await expressions in async functions.
test("async function foo(a, b) { await a }", {ecmaVersion: 8})
test("(async function foo(a) { await a })", {ecmaVersion: 8})
test("(async (a) => await a)", {ecmaVersion: 8})
test("({async foo(a) { await a }})", {ecmaVersion: 8})
test("(class {async foo(a) { await a }})", {ecmaVersion: 8})

// Await expressions are an unary expression.
test("async function foo(a, b) { await a + await b }", {ecmaVersion: 8})

// 'await + 1' is a binary expression outside of async functions.
test("function foo() { await + 1 }", {ecmaVersion: 8})

// 'await + 1' is an await expression in async functions.
test("async function foo() { await + 1 }", {ecmaVersion: 8})

// Await expressions need one argument.
testFail("async function foo() { await }", {ecmaVersion: 8})
testFail("(async function foo() { await })", {ecmaVersion: 8})
testFail("async () => await", {ecmaVersion: 8})
testFail("({async foo() { await }})", {ecmaVersion: 8})
testFail("(class {async foo() { await }})", {ecmaVersion: 8})

// Forbid await expressions in default parameters:
testFail("async function foo(a = await b) {}", {ecmaVersion: 8})
testFail("(async function foo(a = await b) {})", {ecmaVersion: 8})
testFail("async (a = await b) => {}", {ecmaVersion: 8})
testFail(
    "async function wrapper() {\nasync (a = await b) => {}\n}",
    {ecmaVersion: 8}
)
testFail("({async foo(a = await b) {}})", {ecmaVersion: 8})
testFail("(class {async foo(a = await b) {}})", {ecmaVersion: 8})
testFail("async function foo(a = class extends (await b) {}) {}", {ecmaVersion: 8})

// Allow await expressions inside functions in default parameters:
test(
    "async function foo(a = async function foo() { await b }) {}",
    {ecmaVersion: 8}
)
test("async function foo(a = async () => await b) {}", {ecmaVersion: 8})
test("async function foo(a = {async bar() { await b }}) {}", {ecmaVersion: 8})
test(
    "async function foo(a = class {async bar() { await b }}) {}",
    {ecmaVersion: 8}
)

// Distinguish ParenthesizedExpression or ArrowFunctionExpression
test("async function wrap() {\n(a = await b)\n}", {ecmaVersion: 8})
testFail("async function wrap() {\n(a = await b) => a\n}", {ecmaVersion: 8})

test("async function wrap() {\n({a = await b} = obj)\n}", {ecmaVersion: 8})
testFail("async function wrap() {\n({a = await b} = obj) => a\n}", {ecmaVersion: 8})

test("function* wrap() {\nasync(a = yield b)\n}", {ecmaVersion: 8})
testFail("function* wrap() {\nasync(a = yield b) => a\n}", {ecmaVersion: 8})

// https://github.com/ternjs/acorn/issues/464
test(
    "f = ({ w = counter(), x = counter(), y = counter(), z = counter() } = { w: null, x: 0, y: false, z: '' }) => {}",
    {ecmaVersion: 8}
)

test("({ async: true })", {ecmaVersion: 8});

// Tests for B.3.4 FunctionDeclarations in IfStatement Statement Clauses
test("if (x) async function f() {}", {ecmaVersion: 8})

testFail("(async)(a) => 12", {ecmaVersion: 8})

testFail("f = async ((x)) => x", {ecmaVersion: 8})
