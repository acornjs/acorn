
if (typeof exports !== "undefined") {
  var driver = require("./driver.js");
  var test = driver.test, testFail = driver.testFail;
}

//------------------------------------------------------------------------------
// Spread Properties
//------------------------------------------------------------------------------

test("({...obj})", {
  "type": "Program",
  "start": 0,
  "end": 10,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 10,
      "expression": {
        "type": "ObjectExpression",
        "start": 1,
        "end": 9,
        "properties": [
          {
            "type": "SpreadElement",
            "start": 2,
            "end": 8,
            "argument": {
              "type": "Identifier",
              "start": 5,
              "end": 8,
              "name": "obj"
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 9 })
test("({...obj1,})", {
  "type": "Program",
  "start": 0,
  "end": 12,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 12,
      "expression": {
        "type": "ObjectExpression",
        "start": 1,
        "end": 11,
        "properties": [
          {
            "type": "SpreadElement",
            "start": 2,
            "end": 9,
            "argument": {
              "type": "Identifier",
              "start": 5,
              "end": 9,
              "name": "obj1"
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 9 })
test("({...obj1,...obj2})", {
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
            "type": "SpreadElement",
            "start": 2,
            "end": 9,
            "argument": {
              "type": "Identifier",
              "start": 5,
              "end": 9,
              "name": "obj1"
            }
          },
          {
            "type": "SpreadElement",
            "start": 10,
            "end": 17,
            "argument": {
              "type": "Identifier",
              "start": 13,
              "end": 17,
              "name": "obj2"
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 9 })
test("({a,...obj1,b:1,...obj2,c:2})", {
  "type": "Program",
  "start": 0,
  "end": 29,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 29,
      "expression": {
        "type": "ObjectExpression",
        "start": 1,
        "end": 28,
        "properties": [
          {
            "type": "Property",
            "start": 2,
            "end": 3,
            "method": false,
            "shorthand": true,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 2,
              "end": 3,
              "name": "a"
            },
            "kind": "init",
            "value": {
              "type": "Identifier",
              "start": 2,
              "end": 3,
              "name": "a"
            }
          },
          {
            "type": "SpreadElement",
            "start": 4,
            "end": 11,
            "argument": {
              "type": "Identifier",
              "start": 7,
              "end": 11,
              "name": "obj1"
            }
          },
          {
            "type": "Property",
            "start": 12,
            "end": 15,
            "method": false,
            "shorthand": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 12,
              "end": 13,
              "name": "b"
            },
            "value": {
              "type": "Literal",
              "start": 14,
              "end": 15,
              "value": 1,
              "raw": "1"
            },
            "kind": "init"
          },
          {
            "type": "SpreadElement",
            "start": 16,
            "end": 23,
            "argument": {
              "type": "Identifier",
              "start": 19,
              "end": 23,
              "name": "obj2"
            }
          },
          {
            "type": "Property",
            "start": 24,
            "end": 27,
            "method": false,
            "shorthand": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 24,
              "end": 25,
              "name": "c"
            },
            "value": {
              "type": "Literal",
              "start": 26,
              "end": 27,
              "value": 2,
              "raw": "2"
            },
            "kind": "init"
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 9 })
test("({...(obj)})", {
  "type": "Program",
  "start": 0,
  "end": 12,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 12,
      "expression": {
        "type": "ObjectExpression",
        "start": 1,
        "end": 11,
        "properties": [
          {
            "type": "SpreadElement",
            "start": 2,
            "end": 10,
            "argument": {
              "type": "Identifier",
              "start": 6,
              "end": 9,
              "name": "obj"
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 9 })
test("({...a,b,c})", {
  "type": "Program",
  "start": 0,
  "end": 12,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 12,
      "expression": {
        "type": "ObjectExpression",
        "start": 1,
        "end": 11,
        "properties": [
          {
            "type": "SpreadElement",
            "start": 2,
            "end": 6,
            "argument": {
              "type": "Identifier",
              "start": 5,
              "end": 6,
              "name": "a"
            }
          },
          {
            "type": "Property",
            "start": 7,
            "end": 8,
            "method": false,
            "shorthand": true,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 7,
              "end": 8,
              "name": "b"
            },
            "kind": "init",
            "value": {
              "type": "Identifier",
              "start": 7,
              "end": 8,
              "name": "b"
            }
          },
          {
            "type": "Property",
            "start": 9,
            "end": 10,
            "method": false,
            "shorthand": true,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 9,
              "end": 10,
              "name": "c"
            },
            "kind": "init",
            "value": {
              "type": "Identifier",
              "start": 9,
              "end": 10,
              "name": "c"
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 9 })
test("({...(a,b),c})", {
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
            "type": "SpreadElement",
            "start": 2,
            "end": 10,
            "argument": {
              "type": "SequenceExpression",
              "start": 6,
              "end": 9,
              "expressions": [
                {
                  "type": "Identifier",
                  "start": 6,
                  "end": 7,
                  "name": "a"
                },
                {
                  "type": "Identifier",
                  "start": 8,
                  "end": 9,
                  "name": "b"
                }
              ]
            }
          },
          {
            "type": "Property",
            "start": 11,
            "end": 12,
            "method": false,
            "shorthand": true,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 11,
              "end": 12,
              "name": "c"
            },
            "kind": "init",
            "value": {
              "type": "Identifier",
              "start": 11,
              "end": 12,
              "name": "c"
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 9 })

testFail("({...})", "Unexpected token (1:5)", { ecmaVersion: 9 })
testFail("({...obj})", "Unexpected token (1:2)", { ecmaVersion: 8 })

//------------------------------------------------------------------------------
// Rest Properties
//------------------------------------------------------------------------------

test("({...obj} = foo)", {
  "type": "Program",
  "start": 0,
  "end": 16,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 16,
      "expression": {
        "type": "AssignmentExpression",
        "start": 1,
        "end": 15,
        "operator": "=",
        "left": {
          "type": "ObjectPattern",
          "start": 1,
          "end": 9,
          "properties": [
            {
              "type": "RestElement",
              "start": 2,
              "end": 8,
              "argument": {
                "type": "Identifier",
                "start": 5,
                "end": 8,
                "name": "obj"
              }
            }
          ]
        },
        "right": {
          "type": "Identifier",
          "start": 12,
          "end": 15,
          "name": "foo"
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 9 })
test("({a,...obj} = foo)", {
  "type": "Program",
  "start": 0,
  "end": 18,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 18,
      "expression": {
        "type": "AssignmentExpression",
        "start": 1,
        "end": 17,
        "operator": "=",
        "left": {
          "type": "ObjectPattern",
          "start": 1,
          "end": 11,
          "properties": [
            {
              "type": "Property",
              "start": 2,
              "end": 3,
              "method": false,
              "shorthand": true,
              "computed": false,
              "key": {
                "type": "Identifier",
                "start": 2,
                "end": 3,
                "name": "a"
              },
              "kind": "init",
              "value": {
                "type": "Identifier",
                "start": 2,
                "end": 3,
                "name": "a"
              }
            },
            {
              "type": "RestElement",
              "start": 4,
              "end": 10,
              "argument": {
                "type": "Identifier",
                "start": 7,
                "end": 10,
                "name": "obj"
              }
            }
          ]
        },
        "right": {
          "type": "Identifier",
          "start": 14,
          "end": 17,
          "name": "foo"
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 9 })
test("({a:b,...obj} = foo)", {
  "type": "Program",
  "start": 0,
  "end": 20,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 20,
      "expression": {
        "type": "AssignmentExpression",
        "start": 1,
        "end": 19,
        "operator": "=",
        "left": {
          "type": "ObjectPattern",
          "start": 1,
          "end": 13,
          "properties": [
            {
              "type": "Property",
              "start": 2,
              "end": 5,
              "method": false,
              "shorthand": false,
              "computed": false,
              "key": {
                "type": "Identifier",
                "start": 2,
                "end": 3,
                "name": "a"
              },
              "value": {
                "type": "Identifier",
                "start": 4,
                "end": 5,
                "name": "b"
              },
              "kind": "init"
            },
            {
              "type": "RestElement",
              "start": 6,
              "end": 12,
              "argument": {
                "type": "Identifier",
                "start": 9,
                "end": 12,
                "name": "obj"
              }
            }
          ]
        },
        "right": {
          "type": "Identifier",
          "start": 16,
          "end": 19,
          "name": "foo"
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 9 })
test("({...obj}) => {}", {
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
        "expression": false,
        "async": false,
        "params": [
          {
            "type": "ObjectPattern",
            "start": 1,
            "end": 9,
            "properties": [
              {
                "type": "RestElement",
                "start": 2,
                "end": 8,
                "argument": {
                  "type": "Identifier",
                  "start": 5,
                  "end": 8,
                  "name": "obj"
                }
              }
            ]
          }
        ],
        "body": {
          "type": "BlockStatement",
          "start": 14,
          "end": 16,
          "body": []
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 9 })
test("({...obj} = {}) => {}", {
  "type": "Program",
  "start": 0,
  "end": 21,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 21,
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 0,
        "end": 21,
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [
          {
            "type": "AssignmentPattern",
            "start": 1,
            "end": 14,
            "left": {
              "type": "ObjectPattern",
              "start": 1,
              "end": 9,
              "properties": [
                {
                  "type": "RestElement",
                  "start": 2,
                  "end": 8,
                  "argument": {
                    "type": "Identifier",
                    "start": 5,
                    "end": 8,
                    "name": "obj"
                  }
                }
              ]
            },
            "right": {
              "type": "ObjectExpression",
              "start": 12,
              "end": 14,
              "properties": []
            }
          }
        ],
        "body": {
          "type": "BlockStatement",
          "start": 19,
          "end": 21,
          "body": []
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 9 })
test("({a,...obj}) => {}", {
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
        "expression": false,
        "async": false,
        "params": [
          {
            "type": "ObjectPattern",
            "start": 1,
            "end": 11,
            "properties": [
              {
                "type": "Property",
                "start": 2,
                "end": 3,
                "method": false,
                "shorthand": true,
                "computed": false,
                "key": {
                  "type": "Identifier",
                  "start": 2,
                  "end": 3,
                  "name": "a"
                },
                "kind": "init",
                "value": {
                  "type": "Identifier",
                  "start": 2,
                  "end": 3,
                  "name": "a"
                }
              },
              {
                "type": "RestElement",
                "start": 4,
                "end": 10,
                "argument": {
                  "type": "Identifier",
                  "start": 7,
                  "end": 10,
                  "name": "obj"
                }
              }
            ]
          }
        ],
        "body": {
          "type": "BlockStatement",
          "start": 16,
          "end": 18,
          "body": []
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 9 })
test("({a:b,...obj}) => {}", {
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
        "expression": false,
        "async": false,
        "params": [
          {
            "type": "ObjectPattern",
            "start": 1,
            "end": 13,
            "properties": [
              {
                "type": "Property",
                "start": 2,
                "end": 5,
                "method": false,
                "shorthand": false,
                "computed": false,
                "key": {
                  "type": "Identifier",
                  "start": 2,
                  "end": 3,
                  "name": "a"
                },
                "value": {
                  "type": "Identifier",
                  "start": 4,
                  "end": 5,
                  "name": "b"
                },
                "kind": "init"
              },
              {
                "type": "RestElement",
                "start": 6,
                "end": 12,
                "argument": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 12,
                  "name": "obj"
                }
              }
            ]
          }
        ],
        "body": {
          "type": "BlockStatement",
          "start": 18,
          "end": 20,
          "body": []
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 9 })

test("({...(obj)} = foo)", {
  type: "Program",
  start: 0,
  end: 18,
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 18
    }
  },
  body: [
    {
      type: "ExpressionStatement",
      start: 0,
      end: 18,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 18
        }
      },
      expression: {
        type: "AssignmentExpression",
        start: 1,
        end: 17,
        loc: {
          start: {
            line: 1,
            column: 1
          },
          end: {
            line: 1,
            column: 17
          }
        },
        operator: "=",
        left: {
          type: "ObjectPattern",
          start: 1,
          end: 11,
          loc: {
            start: {
              line: 1,
              column: 1
            },
            end: {
              line: 1,
              column: 11
            }
          },
          properties: [
            {
              type: "RestElement",
              start: 2,
              end: 10,
              loc: {
                start: {
                  line: 1,
                  column: 2
                },
                end: {
                  line: 1,
                  column: 10
                }
              },
              argument: {
                type: "Identifier",
                start: 6,
                end: 9,
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 9
                  }
                },
                name: "obj"
              }
            }
          ]
        },
        right: {
          type: "Identifier",
          start: 14,
          end: 17,
          loc: {
            start: {
              line: 1,
              column: 14
            },
            end: {
              line: 1,
              column: 17
            }
          },
          name: "foo"
        }
      }
    }
  ],
}, { ecmaVersion: 9, locations: true })

testFail("let {...obj1,} = foo", "Comma is not permitted after the rest element (1:12)", { ecmaVersion: 9 })
testFail("let {...obj1,a} = foo", "Comma is not permitted after the rest element (1:12)", { ecmaVersion: 9 })
testFail("let {...obj1,...obj2} = foo", "Comma is not permitted after the rest element (1:12)", { ecmaVersion: 9 })
testFail("let {...(obj)} = foo", "Unexpected token (1:8)", { ecmaVersion: 9 })
testFail("let {...(a,b)} = foo", "Unexpected token (1:8)", { ecmaVersion: 9 })
testFail("let {...{a,b}} = foo", "Unexpected token (1:8)", { ecmaVersion: 9 })
testFail("let {...[a,b]} = foo", "Unexpected token (1:8)", { ecmaVersion: 9 })
testFail("({...obj1,} = foo)", "Comma is not permitted after the rest element (1:9)", { ecmaVersion: 9 })
testFail("({...obj1,a} = foo)", "Comma is not permitted after the rest element (1:9)", { ecmaVersion: 9 })
testFail("({...obj1,...obj2} = foo)", "Comma is not permitted after the rest element (1:9)", { ecmaVersion: 9 })
testFail("({...(a,b)} = foo)", "Assigning to rvalue (1:5)", { ecmaVersion: 9 })
testFail("({...{a,b}} = foo)", "Unexpected token (1:5)", { ecmaVersion: 9 })
testFail("({...[a,b]} = foo)", "Unexpected token (1:5)", { ecmaVersion: 9 })
testFail("({...obj} = foo)", "Unexpected token (1:2)", { ecmaVersion: 8 })
testFail("({...(obj)}) => {}", "Parenthesized pattern (1:5)", { ecmaVersion: 9 })
testFail("({...(a,b)}) => {}", "Parenthesized pattern (1:5)", { ecmaVersion: 9 })
testFail("({...{a,b}}) => {}", "Unexpected token (1:5)", { ecmaVersion: 9 })
testFail("({...[a,b]}) => {}", "Unexpected token (1:5)", { ecmaVersion: 9 })
testFail("({...obj}) => {}", "Unexpected token (1:2)", { ecmaVersion: 8 })

//------------------------------------------------------------------------------
// From https://github.com/adrianheine/acorn5-object-spread/tree/49839ac662fe34e1b4ad56767115f54747db2e7c/test
//------------------------------------------------------------------------------

test("let z = {...x}", {
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 0,
      "end": 14,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 4,
          "end": 14,
          "id": {
            "type": "Identifier",
            "start": 4,
            "end": 5,
            "name": "z"
          },
          "init": {
            "type": "ObjectExpression",
            "start": 8,
            "end": 14,
            "properties": [
              {
                "type": "SpreadElement",
                "start": 9,
                "end": 13,
                "argument": {
                  "type": "Identifier",
                  "start": 12,
                  "end": 13,
                  "name": "x"
                }
              }
            ]
          }
        }
      ],
      "kind": "let"
    }
  ],
  "start": 0,
  "end": 14,
  "sourceType": "script"
}, { "ecmaVersion": 9 })
test("z = {x, ...y}", {
  "type": "Program",
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 13,
      "expression": {
        "type": "AssignmentExpression",
        "start": 0,
        "end": 13,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 0,
          "end": 1,
          "name": "z"
        },
        "right": {
          "type": "ObjectExpression",
          "start": 4,
          "end": 13,
          "properties": [
            {
              "type": "Property",
              "start": 5,
              "end": 6,
              "method": false,
              "shorthand": true,
              "computed": false,
              "key": {
                "type": "Identifier",
                "start": 5,
                "end": 6,
                "name": "x"
              },
              "value": {
                "type": "Identifier",
                "start": 5,
                "end": 6,
                "name": "x"
              },
              "kind": "init"
            },
            {
              "type": "SpreadElement",
              "start": 8,
              "end": 12,
              "argument": {
                "type": "Identifier",
                "start": 11,
                "end": 12,
                "name": "y"
              }
            }
          ]
        }
      }
    }
  ],
  "start": 0,
  "end": 13,
  "sourceType": "script"
}, { "ecmaVersion": 9 })
test("({x, ...y, a, ...b, c})", {
  "type": "Program",
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 23,
      "expression": {
        "type": "ObjectExpression",
        "start": 1,
        "end": 22,
        "properties": [
          {
            "type": "Property",
            "start": 2,
            "end": 3,
            "method": false,
            "shorthand": true,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 2,
              "end": 3,
              "name": "x"
            },
            "value": {
              "type": "Identifier",
              "start": 2,
              "end": 3,
              "name": "x"
            },
            "kind": "init"
          },
          {
            "type": "SpreadElement",
            "start": 5,
            "end": 9,
            "argument": {
              "type": "Identifier",
              "start": 8,
              "end": 9,
              "name": "y"
            }
          },
          {
            "type": "Property",
            "start": 11,
            "end": 12,
            "method": false,
            "shorthand": true,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 11,
              "end": 12,
              "name": "a"
            },
            "value": {
              "type": "Identifier",
              "start": 11,
              "end": 12,
              "name": "a"
            },
            "kind": "init"
          },
          {
            "type": "SpreadElement",
            "start": 14,
            "end": 18,
            "argument": {
              "type": "Identifier",
              "start": 17,
              "end": 18,
              "name": "b"
            }
          },
          {
            "type": "Property",
            "start": 20,
            "end": 21,
            "method": false,
            "shorthand": true,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 20,
              "end": 21,
              "name": "c"
            },
            "value": {
              "type": "Identifier",
              "start": 20,
              "end": 21,
              "name": "c"
            },
            "kind": "init"
          }
        ]
      }
    }
  ],
  "start": 0,
  "end": 23,
  "sourceType": "script"
}, { "ecmaVersion": 9 })
test("var someObject = { someKey: { ...mapGetters([ 'some_val_1', 'some_val_2' ]) } }", {
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 0,
      "end": 79,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 4,
          "end": 79,
          "id": {
            "type": "Identifier",
            "start": 4,
            "end": 14,
            "name": "someObject"
          },
          "init": {
            "type": "ObjectExpression",
            "start": 17,
            "end": 79,
            "properties": [
              {
                "type": "Property",
                "start": 19,
                "end": 77,
                "method": false,
                "shorthand": false,
                "computed": false,
                "key": {
                  "type": "Identifier",
                  "start": 19,
                  "end": 26,
                  "name": "someKey"
                },
                "value": {
                  "type": "ObjectExpression",
                  "start": 28,
                  "end": 77,
                  "properties": [
                    {
                      "type": "SpreadElement",
                      "start": 30,
                      "end": 75,
                      "argument": {
                        "type": "CallExpression",
                        "start": 33,
                        "end": 75,
                        "callee": {
                          "type": "Identifier",
                          "start": 33,
                          "end": 43,
                          "name": "mapGetters"
                        },
                        "arguments": [
                          {
                            "type": "ArrayExpression",
                            "start": 44,
                            "end": 74,
                            "elements": [
                              {
                                "type": "Literal",
                                "start": 46,
                                "end": 58,
                                "value": "some_val_1",
                                "raw": "'some_val_1'"
                              },
                              {
                                "type": "Literal",
                                "start": 60,
                                "end": 72,
                                "value": "some_val_2",
                                "raw": "'some_val_2'"
                              }
                            ]
                          }
                        ]
                      }
                    }
                  ]
                },
                "kind": "init"
              }
            ]
          }
        }
      ],
      "kind": "var"
    }
  ],
  "start": 0,
  "end": 79,
  "sourceType": "script"
}, { "ecmaVersion": 9 })
test("let {x, ...y} = v", {
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 0,
      "end": 17,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 4,
          "end": 17,
          "id": {
            "type": "ObjectPattern",
            "start": 4,
            "end": 13,
            "properties": [
              {
                "type": "Property",
                "start": 5,
                "end": 6,
                "method": false,
                "shorthand": true,
                "computed": false,
                "key": {
                  "type": "Identifier",
                  "start": 5,
                  "end": 6,
                  "name": "x"
                },
                "kind": "init",
                "value": {
                  "type": "Identifier",
                  "start": 5,
                  "end": 6,
                  "name": "x"
                }
              },
              {
                "type": "RestElement",
                "start": 8,
                "end": 12,
                "argument": {
                  "type": "Identifier",
                  "start": 11,
                  "end": 12,
                  "name": "y"
                }
              }
            ]
          },
          "init": {
            "type": "Identifier",
            "start": 16,
            "end": 17,
            "name": "v"
          }
        }
      ],
      "kind": "let"
    }
  ],
  "start": 0,
  "end": 17,
  "sourceType": "script"
}, { "ecmaVersion": 9 })
test("(function({x, ...y}) {})", {
  "type": "Program",
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 24,
      "expression": {
        "type": "FunctionExpression",
        "start": 1,
        "end": 23,
        "id": null,
        "generator": false,
        "expression": false,
        "params": [
          {
            "type": "ObjectPattern",
            "start": 10,
            "end": 19,
            "properties": [
              {
                "type": "Property",
                "start": 11,
                "end": 12,
                "method": false,
                "shorthand": true,
                "computed": false,
                "key": {
                  "type": "Identifier",
                  "start": 11,
                  "end": 12,
                  "name": "x"
                },
                "kind": "init",
                "value": {
                  "type": "Identifier",
                  "start": 11,
                  "end": 12,
                  "name": "x"
                }
              },
              {
                "type": "RestElement",
                "start": 14,
                "end": 18,
                "argument": {
                  "type": "Identifier",
                  "start": 17,
                  "end": 18,
                  "name": "y"
                }
              }
            ]
          }
        ],
        "body": {
          "type": "BlockStatement",
          "start": 21,
          "end": 23,
          "body": []
        }
      }
    }
  ],
  "start": 0,
  "end": 24,
  "sourceType": "script"
}, { "ecmaVersion": 9 })
test("const fn = ({text = \"default\", ...props}) => text + props.children", {
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 0,
      "end": 66,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 6,
          "end": 66,
          "id": {
            "type": "Identifier",
            "start": 6,
            "end": 8,
            "name": "fn"
          },
          "init": {
            "type": "ArrowFunctionExpression",
            "start": 11,
            "end": 66,
            "id": null,
            "generator": false,
            "expression": true,
            "params": [
              {
                "type": "ObjectPattern",
                "start": 12,
                "end": 40,
                "properties": [
                  {
                    "type": "Property",
                    "start": 13,
                    "end": 29,
                    "method": false,
                    "shorthand": true,
                    "computed": false,
                    "key": {
                      "type": "Identifier",
                      "start": 13,
                      "end": 17,
                      "name": "text"
                    },
                    "kind": "init",
                    "value": {
                      "type": "AssignmentPattern",
                      "start": 13,
                      "end": 29,
                      "left": {
                        "type": "Identifier",
                        "start": 13,
                        "end": 17,
                        "name": "text"
                      },
                      "right": {
                        "type": "Literal",
                        "start": 20,
                        "end": 29,
                        "value": "default",
                        "raw": "\"default\""
                      }
                    }
                  },
                  {
                    "type": "RestElement",
                    "start": 31,
                    "end": 39,
                    "argument": {
                      "type": "Identifier",
                      "start": 34,
                      "end": 39,
                      "name": "props"
                    }
                  }
                ]
              }
            ],
            "body": {
              "type": "BinaryExpression",
              "start": 45,
              "end": 66,
              "left": {
                "type": "Identifier",
                "start": 45,
                "end": 49,
                "name": "text"
              },
              "operator": "+",
              "right": {
                "type": "MemberExpression",
                "start": 52,
                "end": 66,
                "object": {
                  "type": "Identifier",
                  "start": 52,
                  "end": 57,
                  "name": "props"
                },
                "property": {
                  "type": "Identifier",
                  "start": 58,
                  "end": 66,
                  "name": "children"
                },
                "computed": false
              }
            }
          }
        }
      ],
      "kind": "const"
    }
  ],
  "start": 0,
  "end": 66,
  "sourceType": "script"
}, { "ecmaVersion": 9 })

testFail("({get x() {}}) => {}", "Object pattern can't contain getter or setter (1:6)", { ecmaVersion: 9 })
testFail("let {...x, ...y} = {}", "Comma is not permitted after the rest element (1:9)", { ecmaVersion: 9 })
testFail("({...x,}) => z", "Comma is not permitted after the rest element (1:6)", { ecmaVersion: 9 })
testFail("export const { foo, ...bar } = baz;\nexport const bar = 1;\n", "Identifier 'bar' has already been declared (2:13)", {
  ecmaVersion: 9,
  sourceType: "module"
})
testFail("function ({...x,}) { z }", "Unexpected token (1:9)", { ecmaVersion: 9 })
testFail("let {...{x, y}} = {}", "Unexpected token (1:8)", { ecmaVersion: 9 })
testFail("let {...{...{x, y}}} = {}", "Unexpected token (1:8)", { ecmaVersion: 9 })
testFail("0, {...rest, b} = {}", "Comma is not permitted after the rest element (1:11)", { ecmaVersion: 9 })
testFail("(([a, ...b = 0]) => {})", "Rest elements cannot have a default value (1:9)", { ecmaVersion: 9 })
testFail("(({a, ...b = 0}) => {})", "Rest elements cannot have a default value (1:9)", { ecmaVersion: 9 })
