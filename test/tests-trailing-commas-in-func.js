
if (typeof exports !== "undefined") {
  var driver = require("./driver.js");
  var test = driver.test, testFail = driver.testFail;
}

//------------------------------------------------------------------------------
// allow

test("function foo(a,) { }", {
  "type": "Program",
  "start": 0,
  "end": 20,
  "body": [
    {
      "type": "FunctionDeclaration",
      "start": 0,
      "end": 20,
      "id": {
        "type": "Identifier",
        "start": 9,
        "end": 12,
        "name": "foo"
      },
      "params": [
        {
          "type": "Identifier",
          "start": 13,
          "end": 14,
          "name": "a"
        }
      ],
      "generator": false,
      "expression": false,
      "async": false,
      "body": {
        "type": "BlockStatement",
        "start": 17,
        "end": 20,
        "body": []
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 8})

test("(function(a,) { })", {
  "type": "Program",
  "start": 0,
  "end": 18,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 18,
      "expression": {
        "type": "FunctionExpression",
        "start": 1,
        "end": 17,
        "id": null,
        "params": [
          {
            "type": "Identifier",
            "start": 10,
            "end": 11,
            "name": "a"
          }
        ],
        "generator": false,
        "expression": false,
        "async": false,
        "body": {
          "type": "BlockStatement",
          "start": 14,
          "end": 17,
          "body": []
        }
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 8})

test("(a,) => a", {
  "type": "Program",
  "start": 0,
  "end": 9,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 9,
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 0,
        "end": 9,
        "id": null,
        "params": [
          {
            "type": "Identifier",
            "start": 1,
            "end": 2,
            "name": "a"
          }
        ],
        "generator": false,
        "expression": true,
        "async": false,
        "body": {
          "type": "Identifier",
          "start": 8,
          "end": 9,
          "name": "a"
        }
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 8})

test("async (a,) => a", {
  "type": "Program",
  "start": 0,
  "end": 15,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 15,
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 0,
        "end": 15,
        "id": null,
        "params": [
          {
            "type": "Identifier",
            "start": 7,
            "end": 8,
            "name": "a"
          }
        ],
        "generator": false,
        "expression": true,
        "async": true,
        "body": {
          "type": "Identifier",
          "start": 14,
          "end": 15,
          "name": "a"
        }
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 8})

test("({foo(a,) {}})", {
  "type": "Program",
  "start": 0,
  "end": 14,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 14,
      "expression": {
        "type": "ObjectExpression",
        "start": 1,
        "end": 13,
        "properties": [
          {
            "type": "Property",
            "start": 2,
            "end": 12,
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
              "end": 12,
              "id": null,
              "params": [
                {
                  "type": "Identifier",
                  "start": 6,
                  "end": 7,
                  "name": "a"
                }
              ],
              "generator": false,
              "expression": false,
              "async": false,
              "body": {
                "type": "BlockStatement",
                "start": 10,
                "end": 12,
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

test("class A {foo(a,) {}}", {
  "type": "Program",
  "start": 0,
  "end": 20,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 20,
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
        "end": 20,
        "body": [
          {
            "type": "MethodDefinition",
            "start": 9,
            "end": 19,
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 9,
              "end": 12,
              "name": "foo"
            },
            "kind": "method",
            "value": {
              "type": "FunctionExpression",
              "start": 12,
              "end": 19,
              "id": null,
              "params": [
                {
                  "type": "Identifier",
                  "start": 13,
                  "end": 14,
                  "name": "a"
                }
              ],
              "generator": false,
              "expression": false,
              "async": false,
              "body": {
                "type": "BlockStatement",
                "start": 17,
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

test("class A {static foo(a,) {}}", {
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
            "static": true,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 16,
              "end": 19,
              "name": "foo"
            },
            "kind": "method",
            "value": {
              "type": "FunctionExpression",
              "start": 19,
              "end": 26,
              "id": null,
              "params": [
                {
                  "type": "Identifier",
                  "start": 20,
                  "end": 21,
                  "name": "a"
                }
              ],
              "generator": false,
              "expression": false,
              "async": false,
              "body": {
                "type": "BlockStatement",
                "start": 24,
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

test("(class {foo(a,) {}})", {
  "type": "Program",
  "start": 0,
  "end": 20,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 20,
      "expression": {
        "type": "ClassExpression",
        "start": 1,
        "end": 19,
        "id": null,
        "superClass": null,
        "body": {
          "type": "ClassBody",
          "start": 7,
          "end": 19,
          "body": [
            {
              "type": "MethodDefinition",
              "start": 8,
              "end": 18,
              "static": false,
              "computed": false,
              "key": {
                "type": "Identifier",
                "start": 8,
                "end": 11,
                "name": "foo"
              },
              "kind": "method",
              "value": {
                "type": "FunctionExpression",
                "start": 11,
                "end": 18,
                "id": null,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 12,
                    "end": 13,
                    "name": "a"
                  }
                ],
                "generator": false,
                "expression": false,
                "async": false,
                "body": {
                  "type": "BlockStatement",
                  "start": 16,
                  "end": 18,
                  "body": []
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

test("(class {static foo(a,) {}})", {
  "type": "Program",
  "start": 0,
  "end": 27,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 27,
      "expression": {
        "type": "ClassExpression",
        "start": 1,
        "end": 26,
        "id": null,
        "superClass": null,
        "body": {
          "type": "ClassBody",
          "start": 7,
          "end": 26,
          "body": [
            {
              "type": "MethodDefinition",
              "start": 8,
              "end": 25,
              "static": true,
              "computed": false,
              "key": {
                "type": "Identifier",
                "start": 15,
                "end": 18,
                "name": "foo"
              },
              "kind": "method",
              "value": {
                "type": "FunctionExpression",
                "start": 18,
                "end": 25,
                "id": null,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 19,
                    "end": 20,
                    "name": "a"
                  }
                ],
                "generator": false,
                "expression": false,
                "async": false,
                "body": {
                  "type": "BlockStatement",
                  "start": 23,
                  "end": 25,
                  "body": []
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

test("export default function foo(a,) { }", {
  "type": "Program",
  "start": 0,
  "end": 35,
  "body": [
    {
      "type": "ExportDefaultDeclaration",
      "start": 0,
      "end": 35,
      "declaration": {
        "type": "FunctionDeclaration",
        "start": 15,
        "end": 35,
        "id": {
          "type": "Identifier",
          "start": 24,
          "end": 27,
          "name": "foo"
        },
        "params": [
          {
            "type": "Identifier",
            "start": 28,
            "end": 29,
            "name": "a"
          }
        ],
        "generator": false,
        "expression": false,
        "async": false,
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

test("export default (function foo(a,) { })", {
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
        "id": {
          "type": "Identifier",
          "start": 25,
          "end": 28,
          "name": "foo"
        },
        "params": [
          {
            "type": "Identifier",
            "start": 29,
            "end": 30,
            "name": "a"
          }
        ],
        "generator": false,
        "expression": false,
        "async": false,
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

test("export function foo(a,) { }", {
  "type": "Program",
  "start": 0,
  "end": 27,
  "body": [
    {
      "type": "ExportNamedDeclaration",
      "start": 0,
      "end": 27,
      "declaration": {
        "type": "FunctionDeclaration",
        "start": 7,
        "end": 27,
        "id": {
          "type": "Identifier",
          "start": 16,
          "end": 19,
          "name": "foo"
        },
        "params": [
          {
            "type": "Identifier",
            "start": 20,
            "end": 21,
            "name": "a"
          }
        ],
        "generator": false,
        "expression": false,
        "async": false,
        "body": {
          "type": "BlockStatement",
          "start": 24,
          "end": 27,
          "body": []
        }
      },
      "specifiers": [],
      "source": null
    }
  ],
  "sourceType": "module"
}, {ecmaVersion: 8, sourceType: "module"})

test("foo(a,)", {
  "type": "Program",
  "start": 0,
  "end": 7,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 7,
      "expression": {
        "type": "CallExpression",
        "start": 0,
        "end": 7,
        "callee": {
          "type": "Identifier",
          "start": 0,
          "end": 3,
          "name": "foo"
        },
        "arguments": [
          {
            "type": "Identifier",
            "start": 4,
            "end": 5,
            "name": "a"
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 8})

test("new foo(a,)", {
  "type": "Program",
  "start": 0,
  "end": 11,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 11,
      "expression": {
        "type": "NewExpression",
        "start": 0,
        "end": 11,
        "callee": {
          "type": "Identifier",
          "start": 4,
          "end": 7,
          "name": "foo"
        },
        "arguments": [
          {
            "type": "Identifier",
            "start": 8,
            "end": 9,
            "name": "a"
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 8})

test("foo(...a,)", {
  "type": "Program",
  "start": 0,
  "end": 10,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 10,
      "expression": {
        "type": "CallExpression",
        "start": 0,
        "end": 10,
        "callee": {
          "type": "Identifier",
          "start": 0,
          "end": 3,
          "name": "foo"
        },
        "arguments": [
          {
            "type": "SpreadElement",
            "start": 4,
            "end": 8,
            "argument": {
              "type": "Identifier",
              "start": 7,
              "end": 8,
              "name": "a"
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 8})

test("new foo(...a,)", {
  "type": "Program",
  "start": 0,
  "end": 14,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 14,
      "expression": {
        "type": "NewExpression",
        "start": 0,
        "end": 14,
        "callee": {
          "type": "Identifier",
          "start": 4,
          "end": 7,
          "name": "foo"
        },
        "arguments": [
          {
            "type": "SpreadElement",
            "start": 8,
            "end": 12,
            "argument": {
              "type": "Identifier",
              "start": 11,
              "end": 12,
              "name": "a"
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 8})

//------------------------------------------------------------------------------
// disallow in {ecmaVersion: 7}

testFail("function foo(a,) { }", "Unexpected token (1:15)", {ecmaVersion: 7})
testFail("(function(a,) { })", "Unexpected token (1:12)", {ecmaVersion: 7})
testFail("(a,) => a", "Unexpected token (1:3)", {ecmaVersion: 7})
testFail("async (a,) => a", "Unexpected token (1:9)", {ecmaVersion: 7})
testFail("({foo(a,) {}})", "Unexpected token (1:8)", {ecmaVersion: 7})
testFail("class A {foo(a,) {}}", "Unexpected token (1:15)", {ecmaVersion: 7})
testFail("class A {static foo(a,) {}}", "Unexpected token (1:22)", {ecmaVersion: 7})
testFail("(class {foo(a,) {}})", "Unexpected token (1:14)", {ecmaVersion: 7})
testFail("(class {static foo(a,) {}})", "Unexpected token (1:21)", {ecmaVersion: 7})
testFail("export default function foo(a,) { }", "Unexpected token (1:30)", {ecmaVersion: 7, sourceType: "module"})
testFail("export default (function foo(a,) { })", "Unexpected token (1:31)", {ecmaVersion: 7, sourceType: "module"})
testFail("export function foo(a,) { }", "Unexpected token (1:22)", {ecmaVersion: 7, sourceType: "module"})
testFail("foo(a,)", "Unexpected token (1:6)", {ecmaVersion: 7})
testFail("new foo(a,)", "Unexpected token (1:10)", {ecmaVersion: 7})

//------------------------------------------------------------------------------
// disallow after rest parameters

testFail("function foo(...a,) { }", "Comma is not permitted after the rest element (1:17)", {ecmaVersion: 8})
testFail("(function(...a,) { })", "Comma is not permitted after the rest element (1:14)", {ecmaVersion: 8})
testFail("(...a,) => a", "Comma is not permitted after the rest element (1:5)", {ecmaVersion: 8})
testFail("async (...a,) => a", "Comma is not permitted after the rest element (1:11)", {ecmaVersion: 8})
testFail("({foo(...a,) {}})", "Comma is not permitted after the rest element (1:10)", {ecmaVersion: 8})
testFail("class A {foo(...a,) {}}", "Comma is not permitted after the rest element (1:17)", {ecmaVersion: 8})
testFail("class A {static foo(...a,) {}}", "Comma is not permitted after the rest element (1:24)", {ecmaVersion: 8})
testFail("(class {foo(...a,) {}})", "Comma is not permitted after the rest element (1:16)", {ecmaVersion: 8})
testFail("(class {static foo(...a,) {}})", "Comma is not permitted after the rest element (1:23)", {ecmaVersion: 8})
testFail("export default function foo(...a,) { }", "Comma is not permitted after the rest element (1:32)", {ecmaVersion: 8, sourceType: "module"})
testFail("export default (function foo(...a,) { })", "Comma is not permitted after the rest element (1:33)", {ecmaVersion: 8, sourceType: "module"})
testFail("export function foo(...a,) { }", "Comma is not permitted after the rest element (1:24)", {ecmaVersion: 8, sourceType: "module"})

//------------------------------------------------------------------------------
// disallow empty

testFail("function foo(,) { }", "Unexpected token (1:13)", {ecmaVersion: 8})
testFail("(function(,) { })", "Unexpected token (1:10)", {ecmaVersion: 8})
testFail("(,) => a", "Unexpected token (1:1)", {ecmaVersion: 8})
testFail("async (,) => a", "Unexpected token (1:7)", {ecmaVersion: 8})
testFail("({foo(,) {}})", "Unexpected token (1:6)", {ecmaVersion: 8})
testFail("class A {foo(,) {}}", "Unexpected token (1:13)", {ecmaVersion: 8})
testFail("class A {static foo(,) {}}", "Unexpected token (1:20)", {ecmaVersion: 8})
testFail("(class {foo(,) {}})", "Unexpected token (1:12)", {ecmaVersion: 8})
testFail("(class {static foo(,) {}})", "Unexpected token (1:19)", {ecmaVersion: 8})
testFail("export default function foo(,) { }", "Unexpected token (1:28)", {ecmaVersion: 8, sourceType: "module"})
testFail("export default (function foo(,) { })", "Unexpected token (1:29)", {ecmaVersion: 8, sourceType: "module"})
testFail("export function foo(,) { }", "Unexpected token (1:20)", {ecmaVersion: 8, sourceType: "module"})

//------------------------------------------------------------------------------
// disallow in parens without arrow

testFail("(a,)", "Unexpected token (1:3)", {ecmaVersion: 7})
testFail("(a,)", "Unexpected token (1:3)", {ecmaVersion: 8})

