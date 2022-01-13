
if (typeof exports !== "undefined") {
  var driver = require("./driver.js");
  var test = driver.test;
}

//------------------------------------------------------------------------
// No directives
//------------------------------------------------------------------------

test("foo", {
  "type": "Program",
  "start": 0,
  "end": 3,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 3,
      "expression": {
        "type": "Identifier",
        "start": 0,
        "end": 3,
        "name": "foo"
      },
      "directive": undefined // check this property does not exist.
    }
  ]
}, { ecmaVersion: 6 })

test("function wrap() { foo }", {
  "type": "Program",
  "start": 0,
  "end": 23,
  "body": [
    {
      "type": "FunctionDeclaration",
      "start": 0,
      "end": 23,
      "id": {
        "type": "Identifier",
        "start": 9,
        "end": 13,
        "name": "wrap"
      },
      "generator": false,
      "expression": false,
      "params": [],
      "body": {
        "type": "BlockStatement",
        "start": 16,
        "end": 23,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 18,
            "end": 21,
            "expression": {
              "type": "Identifier",
              "start": 18,
              "end": 21,
              "name": "foo"
            },
            "directive": undefined // check this property does not exist.
          }
        ]
      }
    }
  ]
}, { ecmaVersion: 6 })

test("!function wrap() { foo }", {
  "type": "Program",
  "start": 0,
  "end": 24,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 24,
      "expression": {
        "type": "UnaryExpression",
        "start": 0,
        "end": 24,
        "operator": "!",
        "prefix": true,
        "argument": {
          "type": "FunctionExpression",
          "start": 1,
          "end": 24,
          "id": {
            "type": "Identifier",
            "start": 10,
            "end": 14,
            "name": "wrap"
          },
          "generator": false,
          "expression": false,
          "params": [],
          "body": {
            "type": "BlockStatement",
            "start": 17,
            "end": 24,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 19,
                "end": 22,
                "expression": {
                  "type": "Identifier",
                  "start": 19,
                  "end": 22,
                  "name": "foo"
                },
                "directive": undefined // check this property does not exist.
              }
            ]
          }
        }
      },
      "directive": undefined // check this property does not exist.
    }
  ]
}, { ecmaVersion: 6 })

test("() => { foo }", {
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
        "expression": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 6,
          "end": 13,
          "body": [
            {
              "type": "ExpressionStatement",
              "start": 8,
              "end": 11,
              "expression": {
                "type": "Identifier",
                "start": 8,
                "end": 11,
                "name": "foo"
              },
              "directive": undefined // check this property does not exist.
            }
          ]
        }
      },
      "directive": undefined // check this property does not exist.
    }
  ]
}, { ecmaVersion: 6 })

test("100", {
  "type": "Program",
  "start": 0,
  "end": 3,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 3,
      "expression": {
        "type": "Literal",
        "start": 0,
        "end": 3,
        "value": 100,
        "raw": "100"
      },
      "directive": undefined // check this property does not exist.
    }
  ]
}, { ecmaVersion: 6 })

test("\"use strict\" + 1", {
  "type": "Program",
  "start": 0,
  "end": 16,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 16,
      "expression": {
        "type": "BinaryExpression",
        "start": 0,
        "end": 16,
        "left": {
          "type": "Literal",
          "start": 0,
          "end": 12,
          "value": "use strict",
          "raw": "\"use strict\""
        },
        "operator": "+",
        "right": {
          "type": "Literal",
          "start": 15,
          "end": 16,
          "value": 1,
          "raw": "1"
        }
      },
      "directive": undefined // check this property does not exist.
    }
  ]
}, { ecmaVersion: 6 })

test("; 'use strict'; with ({}) {}", {
  type: "Program",
  body: [
    { type: "EmptyStatement" },
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: "use strict",
        raw: "'use strict'"
      },
      directive: undefined // check this property does not exist.
    },
    {
      type: "WithStatement",
      object: {
        type: "ObjectExpression",
        properties: []
      },
      body: {
        type: "BlockStatement",
        body: []
      }
    }
  ]
}, { ecmaVersion: 6 })

//------------------------------------------------------------------------
// One directive
//------------------------------------------------------------------------

test("\"use strict\"\n foo", {
  "type": "Program",
  "start": 0,
  "end": 17,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 12,
      "expression": {
        "type": "Literal",
        "start": 0,
        "end": 12,
        "value": "use strict",
        "raw": "\"use strict\""
      },
      "directive": "use strict"
    },
    {
      "type": "ExpressionStatement",
      "start": 14,
      "end": 17,
      "expression": {
        "type": "Identifier",
        "start": 14,
        "end": 17,
        "name": "foo"
      },
      "directive": undefined // check this property does not exist.
    }
  ]
}, { ecmaVersion: 6 })

test("'use strict'; foo", {
  "type": "Program",
  "start": 0,
  "end": 17,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 13,
      "expression": {
        "type": "Literal",
        "start": 0,
        "end": 12,
        "value": "use strict",
        "raw": "'use strict'"
      },
      "directive": "use strict"
    },
    {
      "type": "ExpressionStatement",
      "start": 14,
      "end": 17,
      "expression": {
        "type": "Identifier",
        "start": 14,
        "end": 17,
        "name": "foo"
      },
      "directive": undefined // check this property does not exist.
    }
  ]
}, { ecmaVersion: 6 })

test("function wrap() { \"use strict\"\n foo }", {
  "type": "Program",
  "start": 0,
  "end": 37,
  "body": [
    {
      "type": "FunctionDeclaration",
      "start": 0,
      "end": 37,
      "id": {
        "type": "Identifier",
        "start": 9,
        "end": 13,
        "name": "wrap"
      },
      "generator": false,
      "expression": false,
      "params": [],
      "body": {
        "type": "BlockStatement",
        "start": 16,
        "end": 37,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 18,
            "end": 30,
            "expression": {
              "type": "Literal",
              "start": 18,
              "end": 30,
              "value": "use strict",
              "raw": "\"use strict\""
            },
            "directive": "use strict"
          },
          {
            "type": "ExpressionStatement",
            "start": 32,
            "end": 35,
            "expression": {
              "type": "Identifier",
              "start": 32,
              "end": 35,
              "name": "foo"
            },
            "directive": undefined // check this property does not exist.
          }
        ]
      }
    }
  ]
}, { ecmaVersion: 6 })

test("!function wrap() { \"use strict\"\n foo }", {
  "type": "Program",
  "start": 0,
  "end": 38,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 38,
      "expression": {
        "type": "UnaryExpression",
        "start": 0,
        "end": 38,
        "operator": "!",
        "prefix": true,
        "argument": {
          "type": "FunctionExpression",
          "start": 1,
          "end": 38,
          "id": {
            "type": "Identifier",
            "start": 10,
            "end": 14,
            "name": "wrap"
          },
          "generator": false,
          "expression": false,
          "params": [],
          "body": {
            "type": "BlockStatement",
            "start": 17,
            "end": 38,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 19,
                "end": 31,
                "expression": {
                  "type": "Literal",
                  "start": 19,
                  "end": 31,
                  "value": "use strict",
                  "raw": "\"use strict\""
                },
                "directive": "use strict"
              },
              {
                "type": "ExpressionStatement",
                "start": 33,
                "end": 36,
                "expression": {
                  "type": "Identifier",
                  "start": 33,
                  "end": 36,
                  "name": "foo"
                },
                "directive": undefined // check this property does not exist.
              }
            ]
          }
        }
      },
      "directive": undefined // check this property does not exist.
    }
  ]
}, { ecmaVersion: 6 })

test("() => { \"use strict\"\n foo }", {
  "type": "Program",
  "start": 0,
  "end": 27,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 27,
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 0,
        "end": 27,
        "id": null,
        "generator": false,
        "expression": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 6,
          "end": 27,
          "body": [
            {
              "type": "ExpressionStatement",
              "start": 8,
              "end": 20,
              "expression": {
                "type": "Literal",
                "start": 8,
                "end": 20,
                "value": "use strict",
                "raw": "\"use strict\""
              },
              "directive": "use strict"
            },
            {
              "type": "ExpressionStatement",
              "start": 22,
              "end": 25,
              "expression": {
                "type": "Identifier",
                "start": 22,
                "end": 25,
                "name": "foo"
              },
              "directive": undefined // check this property does not exist.
            }
          ]
        }
      },
      "directive": undefined // check this property does not exist.
    }
  ]
}, { ecmaVersion: 6 })

test("() => \"use strict\"", {
  "type": "Program",
  "start": 0,
  "end": 18,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 18,
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 0,
        "end": 18,
        "id": null,
        "generator": false,
        "expression": true,
        "params": [],
        "body": {
          "type": "Literal",
          "start": 6,
          "end": 18,
          "value": "use strict",
          "raw": "\"use strict\""
        }
      },
      "directive": undefined // check this property does not exist.
    }
  ]
}, {ecmaVersion: 6})

test("({ wrap() { \"use strict\"; foo } })", {
  "type": "Program",
  "start": 0,
  "end": 34,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 34,
      "expression": {
        "type": "ObjectExpression",
        "start": 1,
        "end": 33,
        "properties": [
          {
            "type": "Property",
            "start": 3,
            "end": 31,
            "method": true,
            "shorthand": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 3,
              "end": 7,
              "name": "wrap"
            },
            "kind": "init",
            "value": {
              "type": "FunctionExpression",
              "start": 7,
              "end": 31,
              "id": null,
              "generator": false,
              "expression": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 10,
                "end": 31,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 12,
                    "end": 25,
                    "expression": {
                      "type": "Literal",
                      "start": 12,
                      "end": 24,
                      "value": "use strict",
                      "raw": "\"use strict\""
                    },
                    "directive": "use strict"
                  },
                  {
                    "type": "ExpressionStatement",
                    "start": 26,
                    "end": 29,
                    "expression": {
                      "type": "Identifier",
                      "start": 26,
                      "end": 29,
                      "name": "foo"
                    },
                    "directive": undefined // check this property does not exist.
                  }
                ]
              }
            }
          }
        ]
      },
      "directive": undefined // check this property does not exist.
    }
  ]
}, { ecmaVersion: 6 })

test("(class { wrap() { \"use strict\"; foo } })", {
  "type": "Program",
  "start": 0,
  "end": 40,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 40,
      "expression": {
        "type": "ClassExpression",
        "start": 1,
        "end": 39,
        "id": null,
        "superClass": null,
        "body": {
          "type": "ClassBody",
          "start": 7,
          "end": 39,
          "body": [
            {
              "type": "MethodDefinition",
              "start": 9,
              "end": 37,
              "computed": false,
              "key": {
                "type": "Identifier",
                "start": 9,
                "end": 13,
                "name": "wrap"
              },
              "static": false,
              "kind": "method",
              "value": {
                "type": "FunctionExpression",
                "start": 13,
                "end": 37,
                "id": null,
                "generator": false,
                "expression": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 16,
                  "end": 37,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 18,
                      "end": 31,
                      "expression": {
                        "type": "Literal",
                        "start": 18,
                        "end": 30,
                        "value": "use strict",
                        "raw": "\"use strict\""
                      },
                      "directive": "use strict"
                    },
                    {
                      "type": "ExpressionStatement",
                      "start": 32,
                      "end": 35,
                      "expression": {
                        "type": "Identifier",
                        "start": 32,
                        "end": 35,
                        "name": "foo"
                      },
                      "directive": undefined // check this property does not exist.
                    }
                  ]
                }
              }
            }
          ]
        }
      },
      "directive": undefined // check this property does not exist.
    }
  ]
}, { ecmaVersion: 6 })

// Should not decode escape sequence.
test("\"\\u0075se strict\"", {
  "type": "Program",
  "start": 0,
  "end": 17,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 17,
      "expression": {
        "type": "Literal",
        "start": 0,
        "end": 17,
        "value": "use strict",
        "raw": "\"\\u0075se strict\""
      },
      "directive": "\\u0075se strict"
    }
  ]
}, { ecmaVersion: 6 })

//------------------------------------------------------------------------
// Two or more directives.
//------------------------------------------------------------------------

test("\"use asm\"; \"use strict\"; foo", {
  "type": "Program",
  "start": 0,
  "end": 28,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 10,
      "expression": {
        "type": "Literal",
        "start": 0,
        "end": 9,
        "value": "use asm",
        "raw": "\"use asm\""
      },
      "directive": "use asm"
    },
    {
      "type": "ExpressionStatement",
      "start": 11,
      "end": 24,
      "expression": {
        "type": "Literal",
        "start": 11,
        "end": 23,
        "value": "use strict",
        "raw": "\"use strict\""
      },
      "directive": "use strict"
    },
    {
      "type": "ExpressionStatement",
      "start": 25,
      "end": 28,
      "expression": {
        "type": "Identifier",
        "start": 25,
        "end": 28,
        "name": "foo"
      },
      "directive": undefined // check this property does not exist.
    }
  ]
}, { ecmaVersion: 6 })

test("function wrap() { \"use asm\"; \"use strict\"; foo }", {
  "type": "Program",
  "start": 0,
  "end": 48,
  "body": [
    {
      "type": "FunctionDeclaration",
      "start": 0,
      "end": 48,
      "id": {
        "type": "Identifier",
        "start": 9,
        "end": 13,
        "name": "wrap"
      },
      "generator": false,
      "expression": false,
      "params": [],
      "body": {
        "type": "BlockStatement",
        "start": 16,
        "end": 48,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 18,
            "end": 28,
            "expression": {
              "type": "Literal",
              "start": 18,
              "end": 27,
              "value": "use asm",
              "raw": "\"use asm\""
            },
            "directive": "use asm"
          },
          {
            "type": "ExpressionStatement",
            "start": 29,
            "end": 42,
            "expression": {
              "type": "Literal",
              "start": 29,
              "end": 41,
              "value": "use strict",
              "raw": "\"use strict\""
            },
            "directive": "use strict"
          },
          {
            "type": "ExpressionStatement",
            "start": 43,
            "end": 46,
            "expression": {
              "type": "Identifier",
              "start": 43,
              "end": 46,
              "name": "foo"
            },
            "directive": undefined // check this property does not exist.
          }
        ]
      }
    }
  ]
}, { ecmaVersion: 6 })

//------------------------------------------------------------------------
// One string after other expressions.
//------------------------------------------------------------------------

test("\"use strict\"; foo; \"use asm\"", {
  "type": "Program",
  "start": 0,
  "end": 28,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 13,
      "expression": {
        "type": "Literal",
        "start": 0,
        "end": 12,
        "value": "use strict",
        "raw": "\"use strict\""
      },
      "directive": "use strict"
    },
    {
      "type": "ExpressionStatement",
      "start": 14,
      "end": 18,
      "expression": {
        "type": "Identifier",
        "start": 14,
        "end": 17,
        "name": "foo"
      },
      "directive": undefined // check this property does not exist.
    },
    {
      "type": "ExpressionStatement",
      "start": 19,
      "end": 28,
      "expression": {
        "type": "Literal",
        "start": 19,
        "end": 28,
        "value": "use asm",
        "raw": "\"use asm\""
      },
      "directive": undefined // check this property does not exist.
    }
  ]
}, { ecmaVersion: 6 })

test("function wrap() { \"use asm\"; foo; \"use strict\" }", {
  "type": "Program",
  "start": 0,
  "end": 48,
  "body": [
    {
      "type": "FunctionDeclaration",
      "start": 0,
      "end": 48,
      "id": {
        "type": "Identifier",
        "start": 9,
        "end": 13,
        "name": "wrap"
      },
      "generator": false,
      "expression": false,
      "params": [],
      "body": {
        "type": "BlockStatement",
        "start": 16,
        "end": 48,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 18,
            "end": 28,
            "expression": {
              "type": "Literal",
              "start": 18,
              "end": 27,
              "value": "use asm",
              "raw": "\"use asm\""
            },
            "directive": "use asm"
          },
          {
            "type": "ExpressionStatement",
            "start": 29,
            "end": 33,
            "expression": {
              "type": "Identifier",
              "start": 29,
              "end": 32,
              "name": "foo"
            },
            "directive": undefined // check this property does not exist.
          },
          {
            "type": "ExpressionStatement",
            "start": 34,
            "end": 46,
            "expression": {
              "type": "Literal",
              "start": 34,
              "end": 46,
              "value": "use strict",
              "raw": "\"use strict\""
            },
            "directive": undefined // check this property does not exist.
          }
        ]
      }
    }
  ]
}, { ecmaVersion: 6 })

//------------------------------------------------------------------------
// One string in a block.
//------------------------------------------------------------------------

test("{ \"use strict\"; }", {
  "type": "Program",
  "start": 0,
  "end": 17,
  "body": [
    {
      "type": "BlockStatement",
      "start": 0,
      "end": 17,
      "body": [
        {
          "type": "ExpressionStatement",
          "start": 2,
          "end": 15,
          "expression": {
            "type": "Literal",
            "start": 2,
            "end": 14,
            "value": "use strict",
            "raw": "\"use strict\""
          },
          "directive": undefined // check this property does not exist.
        }
      ]
    }
  ]
}, { ecmaVersion: 6 })

test("function wrap() { { \"use strict\" } foo }", {
  "type": "Program",
  "start": 0,
  "end": 40,
  "body": [
    {
      "type": "FunctionDeclaration",
      "start": 0,
      "end": 40,
      "id": {
        "type": "Identifier",
        "start": 9,
        "end": 13,
        "name": "wrap"
      },
      "generator": false,
      "expression": false,
      "params": [],
      "body": {
        "type": "BlockStatement",
        "start": 16,
        "end": 40,
        "body": [
          {
            "type": "BlockStatement",
            "start": 18,
            "end": 34,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 20,
                "end": 32,
                "expression": {
                  "type": "Literal",
                  "start": 20,
                  "end": 32,
                  "value": "use strict",
                  "raw": "\"use strict\""
                },
                "directive": undefined // check this property does not exist.
              }
            ]
          },
          {
            "type": "ExpressionStatement",
            "start": 35,
            "end": 38,
            "expression": {
              "type": "Identifier",
              "start": 35,
              "end": 38,
              "name": "foo"
            },
            "directive": undefined // check this property does not exist.
          }
        ]
      }
    }
  ]
}, { ecmaVersion: 6 })

//------------------------------------------------------------------------
// One string with parentheses.
//------------------------------------------------------------------------

test("(\"use strict\"); foo", {
  "type": "Program",
  "start": 0,
  "end": 19,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 15,
      "expression": {
        "type": "Literal",
        "start": 1,
        "end": 13,
        "value": "use strict",
        "raw": "\"use strict\""
      },
      "directive": undefined // check this property does not exist.
    },
    {
      "type": "ExpressionStatement",
      "start": 16,
      "end": 19,
      "expression": {
        "type": "Identifier",
        "start": 16,
        "end": 19,
        "name": "foo"
      },
      "directive": undefined // check this property does not exist.
    }
  ]
}, { ecmaVersion: 6 })

test("function wrap() { (\"use strict\"); foo }", {
  "type": "Program",
  "start": 0,
  "end": 39,
  "body": [
    {
      "type": "FunctionDeclaration",
      "start": 0,
      "end": 39,
      "id": {
        "type": "Identifier",
        "start": 9,
        "end": 13,
        "name": "wrap"
      },
      "generator": false,
      "expression": false,
      "params": [],
      "body": {
        "type": "BlockStatement",
        "start": 16,
        "end": 39,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 18,
            "end": 33,
            "expression": {
              "type": "Literal",
              "start": 19,
              "end": 31,
              "value": "use strict",
              "raw": "\"use strict\""
            },
            "directive": undefined // check this property does not exist.
          },
          {
            "type": "ExpressionStatement",
            "start": 34,
            "end": 37,
            "expression": {
              "type": "Identifier",
              "start": 34,
              "end": 37,
              "name": "foo"
            },
            "directive": undefined // check this property does not exist.
          }
        ]
      }
    }
  ]
}, { ecmaVersion: 6 })

//------------------------------------------------------------------------
// Complex cases such as the function in a default parameter.
//------------------------------------------------------------------------

test("function a() { \"use strict\" } \"use strict\"; foo", {
  "type": "Program",
  "start": 0,
  "end": 47,
  "body": [
    {
      "type": "FunctionDeclaration",
      "start": 0,
      "end": 29,
      "id": {
        "type": "Identifier",
        "start": 9,
        "end": 10,
        "name": "a"
      },
      "generator": false,
      "expression": false,
      "params": [],
      "body": {
        "type": "BlockStatement",
        "start": 13,
        "end": 29,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 15,
            "end": 27,
            "expression": {
              "type": "Literal",
              "start": 15,
              "end": 27,
              "value": "use strict",
              "raw": "\"use strict\""
            },
            "directive": "use strict"
          }
        ]
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 30,
      "end": 43,
      "expression": {
        "type": "Literal",
        "start": 30,
        "end": 42,
        "value": "use strict",
        "raw": "\"use strict\""
      },
      "directive": undefined // check this property does not exist.
    },
    {
      "type": "ExpressionStatement",
      "start": 44,
      "end": 47,
      "expression": {
        "type": "Identifier",
        "start": 44,
        "end": 47,
        "name": "foo"
      },
      "directive": undefined // check this property does not exist.
    }
  ]
}, { ecmaVersion: 6 })

test("function a(a = function() { \"use strict\"; foo }) { \"use strict\" }", {
  "type": "Program",
  "start": 0,
  "end": 65,
  "body": [
    {
      "type": "FunctionDeclaration",
      "start": 0,
      "end": 65,
      "id": {
        "type": "Identifier",
        "start": 9,
        "end": 10,
        "name": "a"
      },
      "generator": false,
      "expression": false,
      "params": [
        {
          "type": "AssignmentPattern",
          "start": 11,
          "end": 47,
          "left": {
            "type": "Identifier",
            "start": 11,
            "end": 12,
            "name": "a"
          },
          "right": {
            "type": "FunctionExpression",
            "start": 15,
            "end": 47,
            "id": null,
            "generator": false,
            "expression": false,
            "params": [],
            "body": {
              "type": "BlockStatement",
              "start": 26,
              "end": 47,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 28,
                  "end": 41,
                  "expression": {
                    "type": "Literal",
                    "start": 28,
                    "end": 40,
                    "value": "use strict",
                    "raw": "\"use strict\""
                  },
                  "directive": "use strict"
                },
                {
                  "type": "ExpressionStatement",
                  "start": 42,
                  "end": 45,
                  "expression": {
                    "type": "Identifier",
                    "start": 42,
                    "end": 45,
                    "name": "foo"
                  },
                  "directive": undefined // check this property does not exist.
                }
              ]
            }
          }
        }
      ],
      "body": {
        "type": "BlockStatement",
        "start": 49,
        "end": 65,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 51,
            "end": 63,
            "expression": {
              "type": "Literal",
              "start": 51,
              "end": 63,
              "value": "use strict",
              "raw": "\"use strict\""
            },
            "directive": "use strict"
          }
        ]
      }
    }
  ]
}, { ecmaVersion: 6 })

test("(a = () => { \"use strict\"; foo }) => { \"use strict\" }", {
  "type": "Program",
  "start": 0,
  "end": 53,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 53,
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 0,
        "end": 53,
        "id": null,
        "generator": false,
        "expression": false,
        "params": [
          {
            "type": "AssignmentPattern",
            "start": 1,
            "end": 32,
            "left": {
              "type": "Identifier",
              "start": 1,
              "end": 2,
              "name": "a"
            },
            "right": {
              "type": "ArrowFunctionExpression",
              "start": 5,
              "end": 32,
              "id": null,
              "generator": false,
              "expression": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 11,
                "end": 32,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 13,
                    "end": 26,
                    "expression": {
                      "type": "Literal",
                      "start": 13,
                      "end": 25,
                      "value": "use strict",
                      "raw": "\"use strict\""
                    },
                    "directive": "use strict"
                  },
                  {
                    "type": "ExpressionStatement",
                    "start": 27,
                    "end": 30,
                    "expression": {
                      "type": "Identifier",
                      "start": 27,
                      "end": 30,
                      "name": "foo"
                    },
                    "directive": undefined // check this property does not exist.
                  }
                ]
              }
            }
          }
        ],
        "body": {
          "type": "BlockStatement",
          "start": 37,
          "end": 53,
          "body": [
            {
              "type": "ExpressionStatement",
              "start": 39,
              "end": 51,
              "expression": {
                "type": "Literal",
                "start": 39,
                "end": 51,
                "value": "use strict",
                "raw": "\"use strict\""
              },
              "directive": "use strict"
            }
          ]
        }
      },
      "directive": undefined // check this property does not exist.
    }
  ]
}, { ecmaVersion: 6 })
