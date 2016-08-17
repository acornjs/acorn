
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

//-----------------------------------------------------------------------------
// Async Arrow Function Expressions

// async == false
test("a => a", {
    "type": "Program",
    "start": 0,
    "end": 6,
    "body": [
        {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 6,
            "expression": {
                "type": "ArrowFunctionExpression",
                "start": 0,
                "end": 6,
                "id": null,
                "generator": false,
                "expression": true,
                "async": false,
                "params": [
                    {
                        "type": "Identifier",
                        "start": 0,
                        "end": 1,
                        "name": "a"
                    }
                ],
                "body": {
                    "type": "Identifier",
                    "start": 5,
                    "end": 6,
                    "name": "a"
                }
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})
test("(a) => a", {
    "type": "Program",
    "start": 0,
    "end": 8,
    "body": [
        {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 8,
            "expression": {
                "type": "ArrowFunctionExpression",
                "start": 0,
                "end": 8,
                "id": null,
                "generator": false,
                "expression": true,
                "async": false,
                "params": [
                    {
                        "type": "Identifier",
                        "start": 1,
                        "end": 2,
                        "name": "a"
                    }
                ],
                "body": {
                    "type": "Identifier",
                    "start": 7,
                    "end": 8,
                    "name": "a"
                }
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})

// async == true
test("async a => a", {
    "type": "Program",
    "start": 0,
    "end": 12,
    "body": [
        {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 12,
            "expression": {
                "type": "ArrowFunctionExpression",
                "start": 0,
                "end": 12,
                "id": null,
                "generator": false,
                "expression": true,
                "async": true,
                "params": [
                    {
                        "type": "Identifier",
                        "start": 6,
                        "end": 7,
                        "name": "a"
                    }
                ],
                "body": {
                    "type": "Identifier",
                    "start": 11,
                    "end": 12,
                    "name": "a"
                }
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})
test("async () => a", {
    "type": "Program",
    "start": 0,
    "end": 13,
    "body": [
        {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 13,
            "expression": {
                "type": "ArrowFunctionExpression",
                "start": 0,
                "end": 13,
                "id": null,
                "generator": false,
                "expression": true,
                "async": true,
                "params": [],
                "body": {
                    "type": "Identifier",
                    "start": 12,
                    "end": 13,
                    "name": "a"
                }
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})
test("async (a, b) => a", {
    "type": "Program",
    "start": 0,
    "end": 17,
    "body": [
        {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 17,
            "expression": {
                "type": "ArrowFunctionExpression",
                "start": 0,
                "end": 17,
                "id": null,
                "generator": false,
                "expression": true,
                "async": true,
                "params": [
                    {
                        "type": "Identifier",
                        "start": 7,
                        "end": 8,
                        "name": "a"
                    },
                    {
                        "type": "Identifier",
                        "start": 10,
                        "end": 11,
                        "name": "b"
                    }
                ],
                "body": {
                    "type": "Identifier",
                    "start": 16,
                    "end": 17,
                    "name": "a"
                }
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})

// OK even if it's an invalid syntax in the case `=>` didn't exist.
test("async ({a = b}) => a", {
    "type": "Program",
    "start": 0,
    "end": 20,
    "body": [
        {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 20,
            "expression": {
                "type": "ArrowFunctionExpression",
                "start": 0,
                "end": 20,
                "id": null,
                "generator": false,
                "expression": true,
                "async": true,
                "params": [
                    {
                        "type": "ObjectPattern",
                        "start": 7,
                        "end": 14,
                        "properties": [
                            {
                                "type": "Property",
                                "start": 8,
                                "end": 13,
                                "method": false,
                                "shorthand": true,
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "start": 8,
                                    "end": 9,
                                    "name": "a"
                                },
                                "kind": "init",
                                "value": {
                                    "type": "AssignmentPattern",
                                    "start": 8,
                                    "end": 13,
                                    "left": {
                                        "type": "Identifier",
                                        "start": 8,
                                        "end": 9,
                                        "name": "a"
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "start": 12,
                                        "end": 13,
                                        "name": "b"
                                    }
                                }
                            }
                        ]
                    }
                ],
                "body": {
                    "type": "Identifier",
                    "start": 19,
                    "end": 20,
                    "name": "a"
                }
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})

// syntax error if `=>` didn't exist.
testFail("async ({a = b})", "Shorthand property assignments are valid only in destructuring patterns (1:10)", {ecmaVersion: 8})

// AssignmentPattern/AssignmentExpression
test("async ({a: b = c}) => a", {
    "type": "Program",
    "start": 0,
    "end": 23,
    "body": [
        {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 23,
            "expression": {
                "type": "ArrowFunctionExpression",
                "start": 0,
                "end": 23,
                "id": null,
                "generator": false,
                "expression": true,
                "async": true,
                "params": [
                    {
                        "type": "ObjectPattern",
                        "start": 7,
                        "end": 17,
                        "properties": [
                            {
                                "type": "Property",
                                "start": 8,
                                "end": 16,
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "start": 8,
                                    "end": 9,
                                    "name": "a"
                                },
                                "value": {
                                    "type": "AssignmentPattern",
                                    "start": 11,
                                    "end": 16,
                                    "left": {
                                        "type": "Identifier",
                                        "start": 11,
                                        "end": 12,
                                        "name": "b"
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "start": 15,
                                        "end": 16,
                                        "name": "c"
                                    }
                                },
                                "kind": "init"
                            }
                        ]
                    }
                ],
                "body": {
                    "type": "Identifier",
                    "start": 22,
                    "end": 23,
                    "name": "a"
                }
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})
test("async ({a: b = c})", {
    "type": "Program",
    "start": 0,
    "end": 18,
    "body": [
        {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 18,
            "expression": {
                "type": "CallExpression",
                "start": 0,
                "end": 18,
                "callee": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 5,
                    "name": "async"
                },
                "arguments": [
                    {
                        "type": "ObjectExpression",
                        "start": 7,
                        "end": 17,
                        "properties": [
                            {
                                "type": "Property",
                                "start": 8,
                                "end": 16,
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "start": 8,
                                    "end": 9,
                                    "name": "a"
                                },
                                "value": {
                                    "type": "AssignmentExpression",
                                    "start": 11,
                                    "end": 16,
                                    "operator": "=",
                                    "left": {
                                        "type": "Identifier",
                                        "start": 11,
                                        "end": 12,
                                        "name": "b"
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "start": 15,
                                        "end": 16,
                                        "name": "c"
                                    }
                                },
                                "kind": "init"
                            }
                        ]
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})

// a reference and a normal arrow function if there is a linebreak between 'async' and the 1st parameter.
test("async\na => a", {
    "type": "Program",
    "start": 0,
    "end": 12,
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
            "type": "ExpressionStatement",
            "start": 6,
            "end": 12,
            "expression": {
                "type": "ArrowFunctionExpression",
                "start": 6,
                "end": 12,
                "id": null,
                "generator": false,
                "expression": true,
                "async": false,
                "params": [
                    {
                        "type": "Identifier",
                        "start": 6,
                        "end": 7,
                        "name": "a"
                    }
                ],
                "body": {
                    "type": "Identifier",
                    "start": 11,
                    "end": 12,
                    "name": "a"
                }
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})

// 'async()' call expression and invalid '=>' token.
testFail("async\n() => a", "Unexpected token (2:3)", {ecmaVersion: 8})

// cannot insert a linebreak before '=>'.
testFail("async a\n=> a", "Unexpected token (2:0)", {ecmaVersion: 8})
testFail("async ()\n=> a", "Unexpected token (2:0)", {ecmaVersion: 8})

// a call expression with 'await' reference.
test("async (await)", {
    "type": "Program",
    "start": 0,
    "end": 13,
    "body": [
        {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 13,
            "expression": {
                "type": "CallExpression",
                "start": 0,
                "end": 13,
                "callee": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 5,
                    "name": "async"
                },
                "arguments": [
                    {
                        "type": "Identifier",
                        "start": 7,
                        "end": 12,
                        "name": "await"
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})

// cannot use 'await' inside async functions.
testFail("async await => 1", "Can not use 'await' as identifier inside an async function (1:6)", {ecmaVersion: 8})
testFail("async (await) => 1", "Can not use 'await' as identifier inside an async function (1:7)", {ecmaVersion: 8})
testFail("async ({await}) => 1", "Can not use 'await' as identifier inside an async function (1:8)", {ecmaVersion: 8})
testFail("async ({a: await}) => 1", "Can not use 'await' as identifier inside an async function (1:11)", {ecmaVersion: 8})
testFail("async ([await]) => 1", "Can not use 'await' as identifier inside an async function (1:8)", {ecmaVersion: 8})

// can use 'yield' identifier outside generators.
test("async yield => 1", {
    "type": "Program",
    "start": 0,
    "end": 16,
    "body": [
        {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 16,
            "expression": {
                "type": "ArrowFunctionExpression",
                "start": 0,
                "end": 16,
                "id": null,
                "generator": false,
                "expression": true,
                "async": true,
                "params": [
                    {
                        "type": "Identifier",
                        "start": 6,
                        "end": 11,
                        "name": "yield"
                    }
                ],
                "body": {
                    "type": "Literal",
                    "start": 15,
                    "end": 16,
                    "value": 1,
                    "raw": "1"
                }
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})
