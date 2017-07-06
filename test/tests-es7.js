// Tests for ECMAScript 7 syntax changes

if (typeof exports != "undefined") {
  var test = require("./driver.js").test;
  var testFail = require("./driver.js").testFail;
}

test("x **= 42", {
  ecmaVersion: 7,
  locations: true
});

testFail("x **= 42", { ecmaVersion: 6 });

test("x ** y", {
  ecmaVersion: 7,
  locations: true
});

testFail("x ** y", { ecmaVersion: 6 });

// ** has highest precedence
test("3 ** 5 * 1", {
  ecmaVersion: 7,
});

test("3 % 5 ** 1", {
  ecmaVersion: 7,
});

// Disallowed unary ops
testFail("delete o.p ** 2;", { ecmaVersion: 7 });
testFail("void 2 ** 2;", { ecmaVersion: 7 });
testFail("typeof 2 ** 2;", { ecmaVersion: 7 });
testFail("~3 ** 2;", { ecmaVersion: 7 });
testFail("!1 ** 2;", { ecmaVersion: 7 });
testFail("-2** 2;", { ecmaVersion: 7 });
testFail("+2** 2;", { ecmaVersion: 7 });

// make sure base operand check doesn't affect other operators
test("-a * 5", { ecmaVersion: 6 })


test("(-5) ** y", {
  ecmaVersion: 7
});

test("++a ** 2", {ecmaVersion: 7})

test("a-- ** 2", {ecmaVersion: 7})

testFail("function foo(a=2) { 'use strict'; }", { ecmaVersion: 7 })
testFail("(a=2) => { 'use strict'; }", { ecmaVersion: 7 })
testFail("function foo({a}) { 'use strict'; }", { ecmaVersion: 7 })
testFail("({a}) => { 'use strict'; }", { ecmaVersion: 7 })
test("function foo(a) { 'use strict'; }", { ecmaVersion: 7 });

// Tests for B.3.4 FunctionDeclarations in IfStatement Statement Clauses
test("if (x) function f() {}", { ecmaVersion: 7 })

test(
  "if (x) function f() { return 23; } else function f() { return 42; }",
  { ecmaVersion: 7 }
)

testFail("'use strict'; if(x) function f() {}", { ecmaVersion: 7 })

testFail("'use strict'; function y(x = 1) { 'use strict' }", {ecmaVersion: 7})
