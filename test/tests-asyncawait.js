
if (typeof exports != "undefined") {
  var driver = require("./driver.js");
  var test = driver.test, testFail = driver.testFail, testAssert = driver.testAssert, misMatch = driver.misMatch;
  var acorn = require("..");
}

//-----------------------------------------------------------------------------
// Async Function Declarations

// async == false
test("function foo() { }", {
    "type": "Program",
    "start": 0,
    "end": 18,
    "body": [
        {
            "type": "FunctionDeclaration",
            "start": 0,
            "end": 18,
            "id": {
                "type": "Identifier",
                "start": 9,
                "end": 12,
                "name": "foo"
            },
            "generator": false,
            "expression": false,
            "async": false,
            "params": [],
            "body": {
                "type": "BlockStatement",
                "start": 15,
                "end": 18,
                "body": []
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})

// async == true
test("async function foo() { }", {
    "type": "Program",
    "start": 0,
    "end": 24,
    "body": [
        {
            "type": "FunctionDeclaration",
            "start": 0,
            "end": 24,
            "id": {
                "type": "Identifier",
                "start": 15,
                "end": 18,
                "name": "foo"
            },
            "generator": false,
            "expression": false,
            "async": true,
            "params": [],
            "body": {
                "type": "BlockStatement",
                "start": 21,
                "end": 24,
                "body": []
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})

// a reference and a normal function declaration if there is a linebreak between 'async' and 'function'.
test("async\nfunction foo() { }", {
    "type": "Program",
    "start": 0,
    "end": 24,
    "body": [
        {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 5,
            "expression": {
                "type": "Identifier",
                "start": 0,
                "end": 5,
                "name": "async"
            }
        },
        {
            "type": "FunctionDeclaration",
            "start": 6,
            "end": 24,
            "id": {
                "type": "Identifier",
                "start": 15,
                "end": 18,
                "name": "foo"
            },
            "generator": false,
            "expression": false,
            "async": false,
            "params": [],
            "body": {
                "type": "BlockStatement",
                "start": 21,
                "end": 24,
                "body": []
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})

// export
test("export async function foo() { }", {
    "type": "Program",
    "start": 0,
    "end": 31,
    "body": [
        {
            "type": "ExportNamedDeclaration",
            "start": 0,
            "end": 31,
            "declaration": {
                "type": "FunctionDeclaration",
                "start": 7,
                "end": 31,
                "id": {
                    "type": "Identifier",
                    "start": 22,
                    "end": 25,
                    "name": "foo"
                },
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "start": 28,
                    "end": 31,
                    "body": []
                }
            },
            "specifiers": [],
            "source": null
        }
    ],
    "sourceType": "module"
}, {ecmaVersion: 8, sourceType: "module"})

// export default
test("export default async function() { }", {
    "type": "Program",
    "start": 0,
    "end": 35,
    "body": [
        {
            "type": "ExportDefaultDeclaration",
            "start": 0,
            "end": 35,
            "declaration": {
                "type": "FunctionExpression",
                "start": 15,
                "end": 35,
                "id": null,
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "start": 32,
                    "end": 35,
                    "body": []
                }
            }
        }
    ],
    "sourceType": "module"
}, {ecmaVersion: 8, sourceType: "module"})

// cannot combine with generators
testFail("async function* foo() { }", "Unexpected token (1:14)", {ecmaVersion: 8})

// 'await' is valid as function names.
test("async function await() { }", {
    "type": "Program",
    "start": 0,
    "end": 26,
    "body": [
        {
            "type": "FunctionDeclaration",
            "start": 0,
            "end": 26,
            "id": {
                "type": "Identifier",
                "start": 15,
                "end": 20,
                "name": "await"
            },
            "generator": false,
            "expression": false,
            "async": true,
            "params": [],
            "body": {
                "type": "BlockStatement",
                "start": 23,
                "end": 26,
                "body": []
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})

// cannot use 'await' inside async functions.
testFail("async function wrap() {\nasync function await() { }\n}", "Can not use 'await' as identifier inside an async function (2:15)", {ecmaVersion: 8})
testFail("async function foo(await) { }", "Can not use 'await' as identifier inside an async function (1:19)", {ecmaVersion: 8})
testFail("async function foo() { return {await} }", "Can not use 'await' as identifier inside an async function (1:31)", {ecmaVersion: 8})

//-----------------------------------------------------------------------------
// Async Function Expressions

// async == false
test("(function foo() { })", {
    "type": "Program",
    "start": 0,
    "end": 20,
    "body": [
        {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 20,
            "expression": {
                "type": "FunctionExpression",
                "start": 1,
                "end": 19,
                "id": {
                    "type": "Identifier",
                    "start": 10,
                    "end": 13,
                    "name": "foo"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "start": 16,
                    "end": 19,
                    "body": []
                }
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})

// async == true
test("(async function foo() { })", {
    "type": "Program",
    "start": 0,
    "end": 26,
    "body": [
        {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 26,
            "expression": {
                "type": "FunctionExpression",
                "start": 1,
                "end": 25,
                "id": {
                    "type": "Identifier",
                    "start": 16,
                    "end": 19,
                    "name": "foo"
                },
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "start": 22,
                    "end": 25,
                    "body": []
                }
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})

// cannot insert a linebreak to between 'async' and 'function'.
testFail("(async\nfunction foo() { })", "Unexpected token (2:0)", {ecmaVersion: 8})

// cannot combine with generators.
testFail("(async function* foo() { })", "Unexpected token (1:15)", {ecmaVersion: 8})

// export default
test("export default (async function() { })", {
    "type": "Program",
    "start": 0,
    "end": 37,
    "body": [
        {
            "type": "ExportDefaultDeclaration",
            "start": 0,
            "end": 37,
            "declaration": {
                "type": "FunctionExpression",
                "start": 16,
                "end": 36,
                "id": null,
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "start": 33,
                    "end": 36,
                    "body": []
                }
            }
        }
    ],
    "sourceType": "module"
}, {ecmaVersion: 8, sourceType: "module"})

// cannot use 'await' inside async functions.
testFail("(async function await() { })", "Can not use 'await' as identifier inside an async function (1:16)", {ecmaVersion: 8})
testFail("(async function foo(await) { })", "Can not use 'await' as identifier inside an async function (1:20)", {ecmaVersion: 8})
testFail("(async function foo() { return {await} })", "Can not use 'await' as identifier inside an async function (1:32)", {ecmaVersion: 8})
