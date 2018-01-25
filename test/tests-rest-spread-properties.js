
if (typeof exports != "undefined") {
  var driver = require("./driver.js");
  var test = driver.test, testFail = driver.testFail, testAssert = driver.testAssert, misMatch = driver.misMatch;
  var acorn = require("..");
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

testFail("({...obj1,} = foo)", "Comma is not permitted after the rest element (1:9)", { ecmaVersion: 9 })
testFail("({...obj1,a} = foo)", "Comma is not permitted after the rest element (1:9)", { ecmaVersion: 9 })
testFail("({...obj1,...obj2} = foo)", "Comma is not permitted after the rest element (1:9)", { ecmaVersion: 9 })
testFail("({...(obj)} = foo)", "Parenthesized pattern (1:5)", { ecmaVersion: 9 })
testFail("({...(a,b)} = foo)", "Parenthesized pattern (1:5)", { ecmaVersion: 9 })
testFail("({...obj} = foo)", "Unexpected token (1:2)", { ecmaVersion: 8 })
testFail("({...(obj)}) => {}", "Parenthesized pattern (1:5)", { ecmaVersion: 9 })
testFail("({...(a,b)}) => {}", "Parenthesized pattern (1:5)", { ecmaVersion: 9 })
testFail("({...obj}) => {}", "Unexpected token (1:2)", { ecmaVersion: 8 })
