
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

//-----------------------------------------------------------------------------
// Async Methods (object)

// async == false
test("({foo() { }})", {
    "type": "Program",
    "start": 0,
    "end": 13,
    "body": [
        {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 13,
            "expression": {
                "type": "ObjectExpression",
                "start": 1,
                "end": 12,
                "properties": [
                    {
                        "type": "Property",
                        "start": 2,
                        "end": 11,
                        "method": true,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 2,
                            "end": 5,
                            "name": "foo"
                        },
                        "kind": "init",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 5,
                            "end": 11,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 8,
                                "end": 11,
                                "body": []
                            }
                        }
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})

// async == true
test("({async foo() { }})", {
    "type": "Program",
    "start": 0,
    "end": 19,
    "body": [
        {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 19,
            "expression": {
                "type": "ObjectExpression",
                "start": 1,
                "end": 18,
                "properties": [
                    {
                        "type": "Property",
                        "start": 2,
                        "end": 17,
                        "method": true,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 8,
                            "end": 11,
                            "name": "foo"
                        },
                        "kind": "init",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 11,
                            "end": 17,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 14,
                                "end": 17,
                                "body": []
                            }
                        }
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})

// OK with 'async' as a method name
test("({async() { }})", {
    "type": "Program",
    "start": 0,
    "end": 15,
    "body": [
        {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 15,
            "expression": {
                "type": "ObjectExpression",
                "start": 1,
                "end": 14,
                "properties": [
                    {
                        "type": "Property",
                        "start": 2,
                        "end": 13,
                        "method": true,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 2,
                            "end": 7,
                            "name": "async"
                        },
                        "kind": "init",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 7,
                            "end": 13,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 10,
                                "end": 13,
                                "body": []
                            }
                        }
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})

// invalid syntax if there is a linebreak after 'async'.
testFail("({async\nfoo() { }})", "Unexpected token (2:0)", {ecmaVersion: 8})

// cannot combine with getters/setters/generators.
testFail("({async get foo() { }})", "Unexpected token (1:12)", {ecmaVersion: 8})
testFail("({async set foo(value) { }})", "Unexpected token (1:12)", {ecmaVersion: 8})
testFail("({async* foo() { }})", "Unexpected token (1:7)", {ecmaVersion: 8})

// 'await' is valid as function names.
test("({async await() { }})", {
    "type": "Program",
    "start": 0,
    "end": 21,
    "body": [
        {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 21,
            "expression": {
                "type": "ObjectExpression",
                "start": 1,
                "end": 20,
                "properties": [
                    {
                        "type": "Property",
                        "start": 2,
                        "end": 19,
                        "method": true,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 8,
                            "end": 13,
                            "name": "await"
                        },
                        "kind": "init",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 13,
                            "end": 19,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 16,
                                "end": 19,
                                "body": []
                            }
                        }
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})

// cannot use 'await' inside async functions.
testFail("async function wrap() {\n({async await() { }})\n}", "Can not use 'await' as identifier inside an async function (2:8)", {ecmaVersion: 8})
testFail("({async foo() { var await }})", "Can not use 'await' as identifier inside an async function (1:20)", {ecmaVersion: 8})
testFail("({async foo(await) { }})", "Can not use 'await' as identifier inside an async function (1:12)", {ecmaVersion: 8})
testFail("({async foo() { return {await} }})", "Can not use 'await' as identifier inside an async function (1:24)", {ecmaVersion: 8})

//-----------------------------------------------------------------------------
// Async Methods (class)

// async == false
test("class A {foo() { }}", {
    "type": "Program",
    "start": 0,
    "end": 19,
    "body": [
        {
            "type": "ClassDeclaration",
            "start": 0,
            "end": 19,
            "id": {
                "type": "Identifier",
                "start": 6,
                "end": 7,
                "name": "A"
            },
            "superClass": null,
            "body": {
                "type": "ClassBody",
                "start": 8,
                "end": 19,
                "body": [
                    {
                        "type": "MethodDefinition",
                        "start": 9,
                        "end": 18,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 9,
                            "end": 12,
                            "name": "foo"
                        },
                        "static": false,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 12,
                            "end": 18,
                            "id": null,
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
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})

// async == true
test("class A {async foo() { }}", {
    "type": "Program",
    "start": 0,
    "end": 25,
    "body": [
        {
            "type": "ClassDeclaration",
            "start": 0,
            "end": 25,
            "id": {
                "type": "Identifier",
                "start": 6,
                "end": 7,
                "name": "A"
            },
            "superClass": null,
            "body": {
                "type": "ClassBody",
                "start": 8,
                "end": 25,
                "body": [
                    {
                        "type": "MethodDefinition",
                        "start": 9,
                        "end": 24,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 15,
                            "end": 18,
                            "name": "foo"
                        },
                        "static": false,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 18,
                            "end": 24,
                            "id": null,
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
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})
test("class A {static async foo() { }}", {
    "type": "Program",
    "start": 0,
    "end": 32,
    "body": [
        {
            "type": "ClassDeclaration",
            "start": 0,
            "end": 32,
            "id": {
                "type": "Identifier",
                "start": 6,
                "end": 7,
                "name": "A"
            },
            "superClass": null,
            "body": {
                "type": "ClassBody",
                "start": 8,
                "end": 32,
                "body": [
                    {
                        "type": "MethodDefinition",
                        "start": 9,
                        "end": 31,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 22,
                            "end": 25,
                            "name": "foo"
                        },
                        "static": true,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 25,
                            "end": 31,
                            "id": null,
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
                        }
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})

// OK 'async' as a method name.
test("class A {async() { }}", {
    "type": "Program",
    "start": 0,
    "end": 21,
    "body": [
        {
            "type": "ClassDeclaration",
            "start": 0,
            "end": 21,
            "id": {
                "type": "Identifier",
                "start": 6,
                "end": 7,
                "name": "A"
            },
            "superClass": null,
            "body": {
                "type": "ClassBody",
                "start": 8,
                "end": 21,
                "body": [
                    {
                        "type": "MethodDefinition",
                        "start": 9,
                        "end": 20,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 9,
                            "end": 14,
                            "name": "async"
                        },
                        "static": false,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 14,
                            "end": 20,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 17,
                                "end": 20,
                                "body": []
                            }
                        }
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})
test("class A {static async() { }}", {
    "type": "Program",
    "start": 0,
    "end": 28,
    "body": [
        {
            "type": "ClassDeclaration",
            "start": 0,
            "end": 28,
            "id": {
                "type": "Identifier",
                "start": 6,
                "end": 7,
                "name": "A"
            },
            "superClass": null,
            "body": {
                "type": "ClassBody",
                "start": 8,
                "end": 28,
                "body": [
                    {
                        "type": "MethodDefinition",
                        "start": 9,
                        "end": 27,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 16,
                            "end": 21,
                            "name": "async"
                        },
                        "static": true,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 21,
                            "end": 27,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 24,
                                "end": 27,
                                "body": []
                            }
                        }
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})
test("class A {*async() { }}", {
    "type": "Program",
    "start": 0,
    "end": 22,
    "body": [
        {
            "type": "ClassDeclaration",
            "start": 0,
            "end": 22,
            "id": {
                "type": "Identifier",
                "start": 6,
                "end": 7,
                "name": "A"
            },
            "superClass": null,
            "body": {
                "type": "ClassBody",
                "start": 8,
                "end": 22,
                "body": [
                    {
                        "type": "MethodDefinition",
                        "start": 9,
                        "end": 21,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 10,
                            "end": 15,
                            "name": "async"
                        },
                        "static": false,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 15,
                            "end": 21,
                            "id": null,
                            "generator": true,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 18,
                                "end": 21,
                                "body": []
                            }
                        }
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})
test("class A {static* async() { }}", {
    "type": "Program",
    "start": 0,
    "end": 29,
    "body": [
        {
            "type": "ClassDeclaration",
            "start": 0,
            "end": 29,
            "id": {
                "type": "Identifier",
                "start": 6,
                "end": 7,
                "name": "A"
            },
            "superClass": null,
            "body": {
                "type": "ClassBody",
                "start": 8,
                "end": 29,
                "body": [
                    {
                        "type": "MethodDefinition",
                        "start": 9,
                        "end": 28,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 17,
                            "end": 22,
                            "name": "async"
                        },
                        "static": true,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 22,
                            "end": 28,
                            "id": null,
                            "generator": true,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 25,
                                "end": 28,
                                "body": []
                            }
                        }
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})

// invalid syntax if there is a linebreak after 'async'.
testFail("class A {async\nfoo() { }}", "Unexpected token (2:0)", {ecmaVersion: 8})
testFail("class A {static async\nfoo() { }}", "Unexpected token (2:0)", {ecmaVersion: 8})

// cannot combine with constructors/getters/setters/generators.
testFail("class A {async constructor() { }}", "Constructor can't be an async method (1:15)", {ecmaVersion: 8})
testFail("class A {async get foo() { }}", "Unexpected token (1:19)", {ecmaVersion: 8})
testFail("class A {async set foo(value) { }}", "Unexpected token (1:19)", {ecmaVersion: 8})
testFail("class A {async* foo() { }}", "Unexpected token (1:14)", {ecmaVersion: 8})
testFail("class A {static async get foo() { }}", "Unexpected token (1:26)", {ecmaVersion: 8})
testFail("class A {static async set foo(value) { }}", "Unexpected token (1:26)", {ecmaVersion: 8})
testFail("class A {static async* foo() { }}", "Unexpected token (1:21)", {ecmaVersion: 8})

// 'await' is valid as function names.
test("class A {async await() { }}", {
    "type": "Program",
    "start": 0,
    "end": 27,
    "body": [
        {
            "type": "ClassDeclaration",
            "start": 0,
            "end": 27,
            "id": {
                "type": "Identifier",
                "start": 6,
                "end": 7,
                "name": "A"
            },
            "superClass": null,
            "body": {
                "type": "ClassBody",
                "start": 8,
                "end": 27,
                "body": [
                    {
                        "type": "MethodDefinition",
                        "start": 9,
                        "end": 26,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 15,
                            "end": 20,
                            "name": "await"
                        },
                        "static": false,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 20,
                            "end": 26,
                            "id": null,
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
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})
test("class A {static async await() { }}", {
    "type": "Program",
    "start": 0,
    "end": 34,
    "body": [
        {
            "type": "ClassDeclaration",
            "start": 0,
            "end": 34,
            "id": {
                "type": "Identifier",
                "start": 6,
                "end": 7,
                "name": "A"
            },
            "superClass": null,
            "body": {
                "type": "ClassBody",
                "start": 8,
                "end": 34,
                "body": [
                    {
                        "type": "MethodDefinition",
                        "start": 9,
                        "end": 33,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 22,
                            "end": 27,
                            "name": "await"
                        },
                        "static": true,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 27,
                            "end": 33,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "start": 30,
                                "end": 33,
                                "body": []
                            }
                        }
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})

// cannot use 'await' inside async functions.
testFail("async function wrap() {\nclass A {async await() { }}\n}", "Can not use 'await' as identifier inside an async function (2:15)", {ecmaVersion: 8})
testFail("class A {async foo() { var await }}", "Can not use 'await' as identifier inside an async function (1:27)", {ecmaVersion: 8})
testFail("class A {async foo(await) { }}", "Can not use 'await' as identifier inside an async function (1:19)", {ecmaVersion: 8})
testFail("class A {async foo() { return {await} }}", "Can not use 'await' as identifier inside an async function (1:31)", {ecmaVersion: 8})
//-----------------------------------------------------------------------------
// Await Expressions

// 'await' is an identifier in scripts.
test("await", {
    "type": "Program",
    "start": 0,
    "end": 5,
    "body": [
        {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 5,
            "expression": {
                "type": "Identifier",
                "start": 0,
                "end": 5,
                "name": "await"
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})

// 'await' is a keyword in modules.
testFail("await", "Unexpected token (1:0)", {ecmaVersion: 8, sourceType: "module"})

// Await expressions is invalid outside of async functions.
testFail("await a", "Unexpected token (1:6)", {ecmaVersion: 8})
testFail("await a", "Unexpected token (1:0)", {ecmaVersion: 8, sourceType: "module"})

// Await expressions in async functions.
test("async function foo(a, b) { await a }", {
    "type": "Program",
    "start": 0,
    "end": 36,
    "body": [
        {
            "type": "FunctionDeclaration",
            "start": 0,
            "end": 36,
            "id": {
                "type": "Identifier",
                "start": 15,
                "end": 18,
                "name": "foo"
            },
            "generator": false,
            "expression": false,
            "async": true,
            "params": [
                {
                    "type": "Identifier",
                    "start": 19,
                    "end": 20,
                    "name": "a"
                },
                {
                    "type": "Identifier",
                    "start": 22,
                    "end": 23,
                    "name": "b"
                }
            ],
            "body": {
                "type": "BlockStatement",
                "start": 25,
                "end": 36,
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "start": 27,
                        "end": 34,
                        "expression": {
                            "type": "AwaitExpression",
                            "start": 27,
                            "end": 34,
                            "argument": {
                                "type": "Identifier",
                                "start": 33,
                                "end": 34,
                                "name": "a"
                            }
                        }
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})
test("(async function foo(a) { await a })", {
    "type": "Program",
    "start": 0,
    "end": 35,
    "body": [
        {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 35,
            "expression": {
                "type": "FunctionExpression",
                "start": 1,
                "end": 34,
                "id": {
                    "type": "Identifier",
                    "start": 16,
                    "end": 19,
                    "name": "foo"
                },
                "generator": false,
                "expression": false,
                "async": true,
                "params": [
                    {
                        "type": "Identifier",
                        "start": 20,
                        "end": 21,
                        "name": "a"
                    }
                ],
                "body": {
                    "type": "BlockStatement",
                    "start": 23,
                    "end": 34,
                    "body": [
                        {
                            "type": "ExpressionStatement",
                            "start": 25,
                            "end": 32,
                            "expression": {
                                "type": "AwaitExpression",
                                "start": 25,
                                "end": 32,
                                "argument": {
                                    "type": "Identifier",
                                    "start": 31,
                                    "end": 32,
                                    "name": "a"
                                }
                            }
                        }
                    ]
                }
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})
test("(async (a) => await a)", {
    "type": "Program",
    "start": 0,
    "end": 22,
    "body": [
        {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 22,
            "expression": {
                "type": "ArrowFunctionExpression",
                "start": 1,
                "end": 21,
                "id": null,
                "generator": false,
                "expression": true,
                "async": true,
                "params": [
                    {
                        "type": "Identifier",
                        "start": 8,
                        "end": 9,
                        "name": "a"
                    }
                ],
                "body": {
                    "type": "AwaitExpression",
                    "start": 14,
                    "end": 21,
                    "argument": {
                        "type": "Identifier",
                        "start": 20,
                        "end": 21,
                        "name": "a"
                    }
                }
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})
test("({async foo(a) { await a }})", {
    "type": "Program",
    "start": 0,
    "end": 28,
    "body": [
        {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 28,
            "expression": {
                "type": "ObjectExpression",
                "start": 1,
                "end": 27,
                "properties": [
                    {
                        "type": "Property",
                        "start": 2,
                        "end": 26,
                        "method": true,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "start": 8,
                            "end": 11,
                            "name": "foo"
                        },
                        "kind": "init",
                        "value": {
                            "type": "FunctionExpression",
                            "start": 11,
                            "end": 26,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [
                                {
                                    "type": "Identifier",
                                    "start": 12,
                                    "end": 13,
                                    "name": "a"
                                }
                            ],
                            "body": {
                                "type": "BlockStatement",
                                "start": 15,
                                "end": 26,
                                "body": [
                                    {
                                        "type": "ExpressionStatement",
                                        "start": 17,
                                        "end": 24,
                                        "expression": {
                                            "type": "AwaitExpression",
                                            "start": 17,
                                            "end": 24,
                                            "argument": {
                                                "type": "Identifier",
                                                "start": 23,
                                                "end": 24,
                                                "name": "a"
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})
test("(class {async foo(a) { await a }})", {
    "type": "Program",
    "start": 0,
    "end": 34,
    "body": [
        {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 34,
            "expression": {
                "type": "ClassExpression",
                "start": 1,
                "end": 33,
                "id": null,
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "start": 7,
                    "end": 33,
                    "body": [
                        {
                            "type": "MethodDefinition",
                            "start": 8,
                            "end": 32,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 14,
                                "end": 17,
                                "name": "foo"
                            },
                            "static": false,
                            "kind": "method",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 17,
                                "end": 32,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": true,
                                "params": [
                                    {
                                        "type": "Identifier",
                                        "start": 18,
                                        "end": 19,
                                        "name": "a"
                                    }
                                ],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 21,
                                    "end": 32,
                                    "body": [
                                        {
                                            "type": "ExpressionStatement",
                                            "start": 23,
                                            "end": 30,
                                            "expression": {
                                                "type": "AwaitExpression",
                                                "start": 23,
                                                "end": 30,
                                                "argument": {
                                                    "type": "Identifier",
                                                    "start": 29,
                                                    "end": 30,
                                                    "name": "a"
                                                }
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                }
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})

// Await expressions are an unary expression.
test("async function foo(a, b) { await a + await b }", {
    "type": "Program",
    "start": 0,
    "end": 46,
    "body": [
        {
            "type": "FunctionDeclaration",
            "start": 0,
            "end": 46,
            "id": {
                "type": "Identifier",
                "start": 15,
                "end": 18,
                "name": "foo"
            },
            "generator": false,
            "expression": false,
            "async": true,
            "params": [
                {
                    "type": "Identifier",
                    "start": 19,
                    "end": 20,
                    "name": "a"
                },
                {
                    "type": "Identifier",
                    "start": 22,
                    "end": 23,
                    "name": "b"
                }
            ],
            "body": {
                "type": "BlockStatement",
                "start": 25,
                "end": 46,
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "start": 27,
                        "end": 44,
                        "expression": {
                            "type": "BinaryExpression",
                            "start": 27,
                            "end": 44,
                            "left": {
                                "type": "AwaitExpression",
                                "start": 27,
                                "end": 34,
                                "argument": {
                                    "type": "Identifier",
                                    "start": 33,
                                    "end": 34,
                                    "name": "a"
                                }
                            },
                            "operator": "+",
                            "right": {
                                "type": "AwaitExpression",
                                "start": 37,
                                "end": 44,
                                "argument": {
                                    "type": "Identifier",
                                    "start": 43,
                                    "end": 44,
                                    "name": "b"
                                }
                            }
                        }
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})

// 'await + 1' is a binary expression outside of async functions.
test("function foo() { await + 1 }", {
    "type": "Program",
    "start": 0,
    "end": 28,
    "body": [
        {
            "type": "FunctionDeclaration",
            "start": 0,
            "end": 28,
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
                "end": 28,
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "start": 17,
                        "end": 26,
                        "expression": {
                            "type": "BinaryExpression",
                            "start": 17,
                            "end": 26,
                            "left": {
                                "type": "Identifier",
                                "start": 17,
                                "end": 22,
                                "name": "await"
                            },
                            "operator": "+",
                            "right": {
                                "type": "Literal",
                                "start": 25,
                                "end": 26,
                                "value": 1,
                                "raw": "1"
                            }
                        }
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})

// 'await + 1' is an await expression in async functions.
test("async function foo() { await + 1 }", {
    "type": "Program",
    "start": 0,
    "end": 34,
    "body": [
        {
            "type": "FunctionDeclaration",
            "start": 0,
            "end": 34,
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
                "end": 34,
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "start": 23,
                        "end": 32,
                        "expression": {
                            "type": "AwaitExpression",
                            "start": 23,
                            "end": 32,
                            "argument": {
                                "type": "UnaryExpression",
                                "start": 29,
                                "end": 32,
                                "operator": "+",
                                "prefix": true,
                                "argument": {
                                    "type": "Literal",
                                    "start": 31,
                                    "end": 32,
                                    "value": 1,
                                    "raw": "1"
                                }
                            }
                        }
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})

// Await expressions need one argument.
testFail("async function foo() { await }", "Unexpected token (1:29)", {ecmaVersion: 8})
testFail("(async function foo() { await })", "Unexpected token (1:30)", {ecmaVersion: 8})
testFail("async () => await", "Unexpected token (1:17)", {ecmaVersion: 8})
testFail("({async foo() { await }})", "Unexpected token (1:22)", {ecmaVersion: 8})
testFail("(class {async foo() { await }})", "Unexpected token (1:28)", {ecmaVersion: 8})

// cannot use await expressions in default values
testFail("async function foo(a = +await a) { }", "Await expression cannot be a default value (1:24)", {ecmaVersion: 8})
testFail("(async function foo(a = +await a) { })", "Await expression cannot be a default value (1:25)", {ecmaVersion: 8})
testFail("(async (a = +await a) => 1)", "Unexpected token (1:19)", {ecmaVersion: 8})
testFail("async function wrap() {\n(async (a = +await a) => 1)\n}", "Await expression cannot be a default value (2:13)", {ecmaVersion: 8})
testFail("({async foo(a = +await a) { }})", "Await expression cannot be a default value (1:17)", {ecmaVersion: 8})
testFail("(class {async foo(a = +await a) { }})", "Await expression cannot be a default value (1:23)", {ecmaVersion: 8})

// cannot use await expressions in default values (a complex case)
// this can be used in the body of async functions.
test("async function foo() { return class extends (await load()) {} }", {
    "type": "Program",
    "start": 0,
    "end": 63,
    "body": [
        {
            "type": "FunctionDeclaration",
            "start": 0,
            "end": 63,
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
                "end": 63,
                "body": [
                    {
                        "type": "ReturnStatement",
                        "start": 23,
                        "end": 61,
                        "argument": {
                            "type": "ClassExpression",
                            "start": 30,
                            "end": 61,
                            "id": null,
                            "superClass": {
                                "type": "AwaitExpression",
                                "start": 45,
                                "end": 57,
                                "argument": {
                                    "type": "CallExpression",
                                    "start": 51,
                                    "end": 57,
                                    "callee": {
                                        "type": "Identifier",
                                        "start": 51,
                                        "end": 55,
                                        "name": "load"
                                    },
                                    "arguments": []
                                }
                            },
                            "body": {
                                "type": "ClassBody",
                                "start": 59,
                                "end": 61,
                                "body": []
                            }
                        }
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}, {ecmaVersion: 8})
testFail("async function foo(a = class extends (await load()) {}) { }", "Await expression cannot be a default value (1:38)", {ecmaVersion: 8})

// cannot use yield expressions in the default value of async arrow functions.
testFail("function* foo() {\nasync (a = +(yield)) => a\n}", "Yield expression cannot be a default value (2:13)", {ecmaVersion: 8})
