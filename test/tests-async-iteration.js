if (typeof exports !== "undefined") {
  var test = require("./driver.js").test
  var testFail = require("./driver.js").testFail
}

//------------------------------------------------------------------------------
// for-await-of
//------------------------------------------------------------------------------

test("async function f() { for await (x of xs); }", {
  "type": "Program",
  "start": 0,
  "end": 43,
  "body": [
    {
      "type": "FunctionDeclaration",
      "start": 0,
      "end": 43,
      "id": {
        "type": "Identifier",
        "start": 15,
        "end": 16,
        "name": "f"
      },
      "generator": false,
      "expression": false,
      "async": true,
      "params": [],
      "body": {
        "type": "BlockStatement",
        "start": 19,
        "end": 43,
        "body": [
          {
            "type": "ForOfStatement",
            "start": 21,
            "end": 41,
            "await": true,
            "left": {
              "type": "Identifier",
              "start": 32,
              "end": 33,
              "name": "x"
            },
            "right": {
              "type": "Identifier",
              "start": 37,
              "end": 39,
              "name": "xs"
            },
            "body": {
              "type": "EmptyStatement",
              "start": 40,
              "end": 41
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 9 })
test("async function f() { for await (var x of xs); }", {
  "type": "Program",
  "start": 0,
  "end": 47,
  "body": [
    {
      "type": "FunctionDeclaration",
      "start": 0,
      "end": 47,
      "id": {
        "type": "Identifier",
        "start": 15,
        "end": 16,
        "name": "f"
      },
      "generator": false,
      "expression": false,
      "async": true,
      "params": [],
      "body": {
        "type": "BlockStatement",
        "start": 19,
        "end": 47,
        "body": [
          {
            "type": "ForOfStatement",
            "start": 21,
            "end": 45,
            "await": true,
            "left": {
              "type": "VariableDeclaration",
              "start": 32,
              "end": 37,
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 36,
                  "end": 37,
                  "id": {
                    "type": "Identifier",
                    "start": 36,
                    "end": 37,
                    "name": "x"
                  },
                  "init": null
                }
              ],
              "kind": "var"
            },
            "right": {
              "type": "Identifier",
              "start": 41,
              "end": 43,
              "name": "xs"
            },
            "body": {
              "type": "EmptyStatement",
              "start": 44,
              "end": 45
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 9 })
test("async function f() { for await (let x of xs); }", {
  "type": "Program",
  "start": 0,
  "end": 47,
  "body": [
    {
      "type": "FunctionDeclaration",
      "start": 0,
      "end": 47,
      "id": {
        "type": "Identifier",
        "start": 15,
        "end": 16,
        "name": "f"
      },
      "generator": false,
      "expression": false,
      "async": true,
      "params": [],
      "body": {
        "type": "BlockStatement",
        "start": 19,
        "end": 47,
        "body": [
          {
            "type": "ForOfStatement",
            "start": 21,
            "end": 45,
            "await": true,
            "left": {
              "type": "VariableDeclaration",
              "start": 32,
              "end": 37,
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 36,
                  "end": 37,
                  "id": {
                    "type": "Identifier",
                    "start": 36,
                    "end": 37,
                    "name": "x"
                  },
                  "init": null
                }
              ],
              "kind": "let"
            },
            "right": {
              "type": "Identifier",
              "start": 41,
              "end": 43,
              "name": "xs"
            },
            "body": {
              "type": "EmptyStatement",
              "start": 44,
              "end": 45
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 9 })
test("async function f() { for\nawait (x of xs); }", {
  "type": "Program",
  "start": 0,
  "end": 43,
  "body": [
    {
      "type": "FunctionDeclaration",
      "start": 0,
      "end": 43,
      "id": {
        "type": "Identifier",
        "start": 15,
        "end": 16,
        "name": "f"
      },
      "generator": false,
      "expression": false,
      "async": true,
      "params": [],
      "body": {
        "type": "BlockStatement",
        "start": 19,
        "end": 43,
        "body": [
          {
            "type": "ForOfStatement",
            "start": 21,
            "end": 41,
            "await": true,
            "left": {
              "type": "Identifier",
              "start": 32,
              "end": 33,
              "name": "x"
            },
            "right": {
              "type": "Identifier",
              "start": 37,
              "end": 39,
              "name": "xs"
            },
            "body": {
              "type": "EmptyStatement",
              "start": 40,
              "end": 41
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 9 })
test("f = async function() { for await (x of xs); }", {
  "type": "Program",
  "start": 0,
  "end": 45,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 45,
      "expression": {
        "type": "AssignmentExpression",
        "start": 0,
        "end": 45,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 0,
          "end": 1,
          "name": "f"
        },
        "right": {
          "type": "FunctionExpression",
          "start": 4,
          "end": 45,
          "id": null,
          "generator": false,
          "expression": false,
          "async": true,
          "params": [],
          "body": {
            "type": "BlockStatement",
            "start": 21,
            "end": 45,
            "body": [
              {
                "type": "ForOfStatement",
                "start": 23,
                "end": 43,
                "await": true,
                "left": {
                  "type": "Identifier",
                  "start": 34,
                  "end": 35,
                  "name": "x"
                },
                "right": {
                  "type": "Identifier",
                  "start": 39,
                  "end": 41,
                  "name": "xs"
                },
                "body": {
                  "type": "EmptyStatement",
                  "start": 42,
                  "end": 43
                }
              }
            ]
          }
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 9 })
test("f = async() => { for await (x of xs); }", {
  "type": "Program",
  "start": 0,
  "end": 39,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 39,
      "expression": {
        "type": "AssignmentExpression",
        "start": 0,
        "end": 39,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 0,
          "end": 1,
          "name": "f"
        },
        "right": {
          "type": "ArrowFunctionExpression",
          "start": 4,
          "end": 39,
          "id": null,
          "generator": false,
          "expression": false,
          "async": true,
          "params": [],
          "body": {
            "type": "BlockStatement",
            "start": 15,
            "end": 39,
            "body": [
              {
                "type": "ForOfStatement",
                "start": 17,
                "end": 37,
                "await": true,
                "left": {
                  "type": "Identifier",
                  "start": 28,
                  "end": 29,
                  "name": "x"
                },
                "right": {
                  "type": "Identifier",
                  "start": 33,
                  "end": 35,
                  "name": "xs"
                },
                "body": {
                  "type": "EmptyStatement",
                  "start": 36,
                  "end": 37
                }
              }
            ]
          }
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 9 })
test("obj = { async f() { for await (x of xs); } }", {
  "type": "Program",
  "start": 0,
  "end": 44,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 44,
      "expression": {
        "type": "AssignmentExpression",
        "start": 0,
        "end": 44,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 0,
          "end": 3,
          "name": "obj"
        },
        "right": {
          "type": "ObjectExpression",
          "start": 6,
          "end": 44,
          "properties": [
            {
              "type": "Property",
              "start": 8,
              "end": 42,
              "method": true,
              "shorthand": false,
              "computed": false,
              "key": {
                "type": "Identifier",
                "start": 14,
                "end": 15,
                "name": "f"
              },
              "kind": "init",
              "value": {
                "type": "FunctionExpression",
                "start": 15,
                "end": 42,
                "id": null,
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 18,
                  "end": 42,
                  "body": [
                    {
                      "type": "ForOfStatement",
                      "start": 20,
                      "end": 40,
                      "await": true,
                      "left": {
                        "type": "Identifier",
                        "start": 31,
                        "end": 32,
                        "name": "x"
                      },
                      "right": {
                        "type": "Identifier",
                        "start": 36,
                        "end": 38,
                        "name": "xs"
                      },
                      "body": {
                        "type": "EmptyStatement",
                        "start": 39,
                        "end": 40
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
}, { ecmaVersion: 9 })
test("class A { async f() { for await (x of xs); } }", {
  "type": "Program",
  "start": 0,
  "end": 46,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 46,
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
        "end": 46,
        "body": [
          {
            "type": "MethodDefinition",
            "start": 10,
            "end": 44,
            "kind": "method",
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 16,
              "end": 17,
              "name": "f"
            },
            "value": {
              "type": "FunctionExpression",
              "start": 17,
              "end": 44,
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 20,
                "end": 44,
                "body": [
                  {
                    "type": "ForOfStatement",
                    "start": 22,
                    "end": 42,
                    "await": true,
                    "left": {
                      "type": "Identifier",
                      "start": 33,
                      "end": 34,
                      "name": "x"
                    },
                    "right": {
                      "type": "Identifier",
                      "start": 38,
                      "end": 40,
                      "name": "xs"
                    },
                    "body": {
                      "type": "EmptyStatement",
                      "start": 41,
                      "end": 42
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
}, { ecmaVersion: 9 })

// ForOfStatement has `await:false` in `ecmaVersion:9`
test("for (x of xs);", {
  "type": "Program",
  "start": 0,
  "end": 14,
  "body": [
    {
      "type": "ForOfStatement",
      "start": 0,
      "end": 14,
      "await": false,
      "left": {
        "type": "Identifier",
        "start": 5,
        "end": 6,
        "name": "x"
      },
      "right": {
        "type": "Identifier",
        "start": 10,
        "end": 12,
        "name": "xs"
      },
      "body": {
        "type": "EmptyStatement",
        "start": 13,
        "end": 14
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 9 })

// ForInStatement doesn't have `await:false` in `ecmaVersion:9`
test("for (x in xs);", {
  "type": "Program",
  "start": 0,
  "end": 14,
  "body": [
    {
      "type": "ForInStatement",
      "start": 0,
      "end": 14,
      "await": undefined,
      "left": {
        "type": "Identifier",
        "start": 5,
        "end": 6,
        "name": "x"
      },
      "right": {
        "type": "Identifier",
        "start": 10,
        "end": 12,
        "name": "xs"
      },
      "body": {
        "type": "EmptyStatement",
        "start": 13,
        "end": 14
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 9 })

// ForOfStatement doesn't have `await:false` in `ecmaVersion:8`
test("for (x of xs);", {
  "type": "Program",
  "start": 0,
  "end": 14,
  "body": [
    {
      "type": "ForOfStatement",
      "start": 0,
      "end": 14,
      "await": undefined,
      "left": {
        "type": "Identifier",
        "start": 5,
        "end": 6,
        "name": "x"
      },
      "right": {
        "type": "Identifier",
        "start": 10,
        "end": 12,
        "name": "xs"
      },
      "body": {
        "type": "EmptyStatement",
        "start": 13,
        "end": 14
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 8 })

testFail("for await (x of xs);", "Unexpected token (1:4)", { ecmaVersion: 9 })
testFail("function f() { for await (x of xs); }", "Unexpected token (1:19)", { ecmaVersion: 9 })
testFail("f = function() { for await (x of xs); }", "Unexpected token (1:21)", { ecmaVersion: 9 })
testFail("f = () => { for await (x of xs); }", "Unexpected token (1:16)", { ecmaVersion: 9 })
testFail("async function f() { () => { for await (x of xs); } }", "Unexpected token (1:33)", { ecmaVersion: 9 })
testFail("async function f() { for await (x in xs); }", "Unexpected token (1:25)", { ecmaVersion: 9 })
testFail("async function f() { for await (;;); }", "Unexpected token (1:25)", { ecmaVersion: 9 })
testFail("async function f() { for await (x;;); }", "Unexpected token (1:25)", { ecmaVersion: 9 })
testFail("async function f() { for await (let x = 0;;); }", "Unexpected token (1:25)", { ecmaVersion: 9 })
testFail("async function f() { for await (x of xs); }", "Unexpected token (1:25)", { ecmaVersion: 8 })

//------------------------------------------------------------------------------
// FunctionDeclaration#await
//------------------------------------------------------------------------------

test("async function* f() { await a; yield b; }", {
  "type": "Program",
  "start": 0,
  "end": 41,
  "body": [
    {
      "type": "FunctionDeclaration",
      "start": 0,
      "end": 41,
      "id": {
        "type": "Identifier",
        "start": 16,
        "end": 17,
        "name": "f"
      },
      "generator": true,
      "expression": false,
      "async": true,
      "params": [],
      "body": {
        "type": "BlockStatement",
        "start": 20,
        "end": 41,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 22,
            "end": 30,
            "expression": {
              "type": "AwaitExpression",
              "start": 22,
              "end": 29,
              "argument": {
                "type": "Identifier",
                "start": 28,
                "end": 29,
                "name": "a"
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 31,
            "end": 39,
            "expression": {
              "type": "YieldExpression",
              "start": 31,
              "end": 38,
              "delegate": false,
              "argument": {
                "type": "Identifier",
                "start": 37,
                "end": 38,
                "name": "b"
              }
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 9 })

testFail("async function* f() { () => await a; }", "Unexpected token (1:34)", { ecmaVersion: 9 })
testFail("async function* f() { () => yield a; }", "Unexpected token (1:34)", { ecmaVersion: 9 })

testFail("async function* f() { await a; yield b; }", "Unexpected token (1:14)", { ecmaVersion: 8 })

//------------------------------------------------------------------------------
// FunctionExpression#await
//------------------------------------------------------------------------------

test("f = async function*() { await a; yield b; }", {
  "type": "Program",
  "start": 0,
  "end": 43,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 43,
      "expression": {
        "type": "AssignmentExpression",
        "start": 0,
        "end": 43,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 0,
          "end": 1,
          "name": "f"
        },
        "right": {
          "type": "FunctionExpression",
          "start": 4,
          "end": 43,
          "id": null,
          "generator": true,
          "expression": false,
          "async": true,
          "params": [],
          "body": {
            "type": "BlockStatement",
            "start": 22,
            "end": 43,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 24,
                "end": 32,
                "expression": {
                  "type": "AwaitExpression",
                  "start": 24,
                  "end": 31,
                  "argument": {
                    "type": "Identifier",
                    "start": 30,
                    "end": 31,
                    "name": "a"
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 33,
                "end": 41,
                "expression": {
                  "type": "YieldExpression",
                  "start": 33,
                  "end": 40,
                  "delegate": false,
                  "argument": {
                    "type": "Identifier",
                    "start": 39,
                    "end": 40,
                    "name": "b"
                  }
                }
              }
            ]
          }
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 9 })
test("obj = { async* f() { await a; yield b; } }", {
  "type": "Program",
  "start": 0,
  "end": 42,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 42,
      "expression": {
        "type": "AssignmentExpression",
        "start": 0,
        "end": 42,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 0,
          "end": 3,
          "name": "obj"
        },
        "right": {
          "type": "ObjectExpression",
          "start": 6,
          "end": 42,
          "properties": [
            {
              "type": "Property",
              "start": 8,
              "end": 40,
              "method": true,
              "shorthand": false,
              "computed": false,
              "key": {
                "type": "Identifier",
                "start": 15,
                "end": 16,
                "name": "f"
              },
              "kind": "init",
              "value": {
                "type": "FunctionExpression",
                "start": 16,
                "end": 40,
                "id": null,
                "generator": true,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 19,
                  "end": 40,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 21,
                      "end": 29,
                      "expression": {
                        "type": "AwaitExpression",
                        "start": 21,
                        "end": 28,
                        "argument": {
                          "type": "Identifier",
                          "start": 27,
                          "end": 28,
                          "name": "a"
                        }
                      }
                    },
                    {
                      "type": "ExpressionStatement",
                      "start": 30,
                      "end": 38,
                      "expression": {
                        "type": "YieldExpression",
                        "start": 30,
                        "end": 37,
                        "delegate": false,
                        "argument": {
                          "type": "Identifier",
                          "start": 36,
                          "end": 37,
                          "name": "b"
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
}, { ecmaVersion: 9 })
test("class A { async* f() { await a; yield b; } }", {
  "type": "Program",
  "start": 0,
  "end": 44,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 44,
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
        "end": 44,
        "body": [
          {
            "type": "MethodDefinition",
            "start": 10,
            "end": 42,
            "kind": "method",
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 17,
              "end": 18,
              "name": "f"
            },
            "value": {
              "type": "FunctionExpression",
              "start": 18,
              "end": 42,
              "id": null,
              "generator": true,
              "expression": false,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 21,
                "end": 42,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 23,
                    "end": 31,
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
                  },
                  {
                    "type": "ExpressionStatement",
                    "start": 32,
                    "end": 40,
                    "expression": {
                      "type": "YieldExpression",
                      "start": 32,
                      "end": 39,
                      "delegate": false,
                      "argument": {
                        "type": "Identifier",
                        "start": 38,
                        "end": 39,
                        "name": "b"
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
}, { ecmaVersion: 9 })
test("class A { static async* f() { await a; yield b; } }", {
  "type": "Program",
  "start": 0,
  "end": 51,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 51,
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
        "end": 51,
        "body": [
          {
            "type": "MethodDefinition",
            "start": 10,
            "end": 49,
            "kind": "method",
            "static": true,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 24,
              "end": 25,
              "name": "f"
            },
            "value": {
              "type": "FunctionExpression",
              "start": 25,
              "end": 49,
              "id": null,
              "generator": true,
              "expression": false,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 28,
                "end": 49,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 30,
                    "end": 38,
                    "expression": {
                      "type": "AwaitExpression",
                      "start": 30,
                      "end": 37,
                      "argument": {
                        "type": "Identifier",
                        "start": 36,
                        "end": 37,
                        "name": "a"
                      }
                    }
                  },
                  {
                    "type": "ExpressionStatement",
                    "start": 39,
                    "end": 47,
                    "expression": {
                      "type": "YieldExpression",
                      "start": 39,
                      "end": 46,
                      "delegate": false,
                      "argument": {
                        "type": "Identifier",
                        "start": 45,
                        "end": 46,
                        "name": "b"
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
}, { ecmaVersion: 9 })

testFail("f = async function*() { () => await a; }", "Unexpected token (1:36)", { ecmaVersion: 9 })
testFail("f = async function*() { () => yield a; }", "Unexpected token (1:36)", { ecmaVersion: 9 })
testFail("obj = { async\n* f() {} }", "Unexpected token (2:0)", { ecmaVersion: 9 })
testFail("obj = { *async f() {}", "Unexpected token (1:15)", { ecmaVersion: 9 })
testFail("obj = { *async* f() {}", "Unexpected token (1:14)", { ecmaVersion: 9 })
testFail("obj = { async* f() { () => await a; } }", "Unexpected token (1:33)", { ecmaVersion: 9 })
testFail("obj = { async* f() { () => yield a; } }", "Unexpected token (1:33)", { ecmaVersion: 9 })
testFail("class A { async\n* f() {} }", "Unexpected token (2:0)", { ecmaVersion: 9 })
testFail("class A { *async f() {} }", "Unexpected token (1:17)", { ecmaVersion: 9 })
testFail("class A { *async* f() {} }", "Unexpected token (1:16)", { ecmaVersion: 9 })
testFail("class A { async* f() { () => await a; } }", "Unexpected token (1:35)", { ecmaVersion: 9 })
testFail("class A { async* f() { () => yield a; } }", "The keyword 'yield' is reserved (1:29)", { ecmaVersion: 9 })

testFail("f = async function*() { await a; yield b; }", "Unexpected token (1:18)", { ecmaVersion: 8 })
testFail("obj = { async* f() { await a; yield b; } }", "Unexpected token (1:13)", { ecmaVersion: 8 })
testFail("class A { async* f() { await a; yield b; } }", "Unexpected token (1:15)", { ecmaVersion: 8 })

//------------------------------------------------------------------------------
// From https://github.com/acornjs/acorn-async-iteration/blob/fc72be2928ed0ffd46041f8c19052a9a282602ea/test/test.js
//------------------------------------------------------------------------------

// Commented this test out because this should throw syntax error.
// for-await-of statements can be only in async functions.
//
// test("for await (const line of readLines(filePath)) {\n  console.log(line);\n}", {
//   "type": "Program",
//   "start": 0,
//   "end": 70,
//   "body": [
//     {
//       "type": "ForOfStatement",
//       "start": 0,
//       "end": 70,
//       "await": true,
//       "left": {
//         "type": "VariableDeclaration",
//         "start": 11,
//         "end": 21,
//         "declarations": [
//           {
//             "type": "VariableDeclarator",
//             "start": 17,
//             "end": 21,
//             "id": {
//               "type": "Identifier",
//               "start": 17,
//               "end": 21,
//               "name": "line"
//             },
//             "init": null
//           }
//         ],
//         "kind": "const"
//       },
//       "right": {
//         "type": "CallExpression",
//         "start": 25,
//         "end": 44,
//         "callee": {
//           "type": "Identifier",
//           "start": 25,
//           "end": 34,
//           "name": "readLines"
//         },
//         "arguments": [
//           {
//             "type": "Identifier",
//             "start": 35,
//             "end": 43,
//             "name": "filePath"
//           }
//         ]
//       },
//       "body": {
//         "type": "BlockStatement",
//         "start": 46,
//         "end": 70,
//         "body": [
//           {
//             "type": "ExpressionStatement",
//             "start": 50,
//             "end": 68,
//             "expression": {
//               "type": "CallExpression",
//               "start": 50,
//               "end": 67,
//               "callee": {
//                 "type": "MemberExpression",
//                 "start": 50,
//                 "end": 61,
//                 "object": {
//                   "type": "Identifier",
//                   "start": 50,
//                   "end": 57,
//                   "name": "console"
//                 },
//                 "property": {
//                   "type": "Identifier",
//                   "start": 58,
//                   "end": 61,
//                   "name": "log"
//                 },
//                 "computed": false
//               },
//               "arguments": [
//                 {
//                   "type": "Identifier",
//                   "start": 62,
//                   "end": 66,
//                   "name": "line"
//                 }
//               ]
//             }
//           }
//         ]
//       }
//     }
//   ],
//   "sourceType": "script"
// }, { "ecmaVersion": 9 })
test("async function* x() {}", {}, { "ecmaVersion": 9 })
test("ref = async function*() {}", {}, { "ecmaVersion": 9 })
test("(async function*() {})", {}, { "ecmaVersion": 9 })
test("var gen = { async *method() {} }", {
  "type": "Program",
  "start": 0,
  "end": 32,
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 0,
      "end": 32,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 4,
          "end": 32,
          "id": {
            "type": "Identifier",
            "start": 4,
            "end": 7,
            "name": "gen"
          },
          "init": {
            "type": "ObjectExpression",
            "start": 10,
            "end": 32,
            "properties": [
              {
                "type": "Property",
                "start": 12,
                "end": 30,
                "method": true,
                "shorthand": false,
                "computed": false,
                "key": {
                  "type": "Identifier",
                  "start": 19,
                  "end": 25,
                  "name": "method"
                },
                "kind": "init",
                "value": {
                  "type": "FunctionExpression",
                  "start": 25,
                  "end": 30,
                  "id": null,
                  "generator": true,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "body": [],
                    "end": 30,
                    "start": 28,
                    "type": "BlockStatement"
                  }
                }
              }
            ]
          }
        }
      ],
      "kind": "var"
    }
  ],
  "sourceType": "script"
}, { "ecmaVersion": 9 })
test("export default async function*() {}", {
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
        "id": null,
        "generator": true,
        "expression": false,
        "async": true,
        "params": [],
        "body": {
          "body": [],
          "end": 35,
          "start": 33,
          "type": "BlockStatement"
        }
      }
    }
  ],
  "sourceType": "module"
}, { "ecmaVersion": 9, "sourceType": "module" })
test("var C = class { async *method() {} }", {}, { "ecmaVersion": 9 })

// Commented the tests of direct `super()` calls out because this is not unique matter in async iteration syntax.
// Class's constructor is the only place which allows `super()`.
// See also: https://github.com/acornjs/acorn/issues/448
//
// test("var C = class { static async *method() {} }", {}, { "ecmaVersion": 9 })
// testFail("async function* x() { super(); }", "", { "ecmaVersion": 9 })
// testFail("ref = async function*() { super(); }", "", { "ecmaVersion": 9 })
// testFail("(async function*() { super(); })", "", { "ecmaVersion": 9 })
// testFail("var gen = { async *method() { super(); } }", "", { "ecmaVersion": 9 })
// testFail("export default async function*() { super(); }", "", { "ecmaVersion": 9, "sourceType": "module" })
// testFail("var C = class { async *method() { super(); } }", "", { "ecmaVersion": 9 })
// testFail("var C = class { static async *method() { super(); } }", "", { "ecmaVersion": 9 })
// test("async function* x() { var x = () => { super(); } }", {}, { "ecmaVersion": 9 })
// test("ref = async function*() { var x = () => { super(); } }", {}, { "ecmaVersion": 9 })
// test("(async function*() { var x = () => { super(); } })", {}, { "ecmaVersion": 9 })
// test("var gen = { async *method() { var x = () => { super(); } } }", {
//   "type": "Program",
//   "start": 0,
//   "end": 60,
//   "body": [
//     {
//       "type": "VariableDeclaration",
//       "start": 0,
//       "end": 60,
//       "declarations": [
//         {
//           "type": "VariableDeclarator",
//           "start": 4,
//           "end": 60,
//           "id": {
//             "type": "Identifier",
//             "start": 4,
//             "end": 7,
//             "name": "gen"
//           },
//           "init": {
//             "type": "ObjectExpression",
//             "start": 10,
//             "end": 60,
//             "properties": [
//               {
//                 "type": "Property",
//                 "start": 12,
//                 "end": 58,
//                 "method": true,
//                 "shorthand": false,
//                 "computed": false,
//                 "key": {
//                   "type": "Identifier",
//                   "start": 19,
//                   "end": 25,
//                   "name": "method"
//                 },
//                 "kind": "init",
//                 "value": {
//                   "type": "FunctionExpression",
//                   "start": 25,
//                   "end": 58,
//                   "id": null,
//                   "generator": true,
//                   "expression": false,
//                   "async": true,
//                   "params": [],
//                   "body": {
//                     "end": 58,
//                     "start": 28,
//                     "type": "BlockStatement",
//                     "body": [
//                       {
//                         "type": "VariableDeclaration",
//                         "start": 30,
//                         "end": 56,
//                         "kind": "var",
//                         "declarations": [
//                           {
//                             "type": "VariableDeclarator",
//                             "start": 34,
//                             "end": 56,
//                             "id": {
//                               "type": "Identifier",
//                               "start": 34,
//                               "end": 35,
//                               "name": "x"
//                             },
//                             "init": {
//                               "type": "ArrowFunctionExpression",
//                               "start": 38,
//                               "end": 56,
//                               "id": null,
//                               "generator": false,
//                               "expression": false,
//                               "async": false,
//                               "params": [],
//                               "body": {
//                                 "type": "BlockStatement",
//                                 "start": 44,
//                                 "end": 56,
//                                 "body": [
//                                   {
//                                     "type": "ExpressionStatement",
//                                     "start": 46,
//                                     "end": 54,
//                                     "expression": {
//                                       "type": "CallExpression",
//                                       "start": 46,
//                                       "end": 53,
//                                       "callee": {
//                                         "type": "Super",
//                                         "start": 46,
//                                         "end": 51
//                                       },
//                                       "arguments": []
//                                     }
//                                   }
//                                 ]
//                               }
//                             }
//                           }
//                         ]
//                       }
//                     ]
//                   }
//                 }
//               }
//             ]
//           }
//         }
//       ],
//       "kind": "var"
//     }
//   ],
//   "sourceType": "script"
// }, { "ecmaVersion": 9 })
// test("export default async function*() { var x = () => { super(); } }", {
//   "type": "Program",
//   "start": 0,
//   "end": 63,
//   "body": [
//     {
//       "type": "ExportDefaultDeclaration",
//       "start": 0,
//       "end": 63,
//       "declaration": {
//         "type": "FunctionDeclaration",
//         "start": 15,
//         "end": 63,
//         "id": null,
//         "generator": true,
//         "expression": false,
//         "async": true,
//         "params": [],
//         "body": {
//           "end": 63,
//           "start": 33,
//           "type": "BlockStatement",
//           "body": [
//             {
//               "type": "VariableDeclaration",
//               "start": 35,
//               "end": 61,
//               "kind": "var",
//               "declarations": [
//                 {
//                   "type": "VariableDeclarator",
//                   "start": 39,
//                   "end": 61,
//                   "id": {
//                     "type": "Identifier",
//                     "start": 39,
//                     "end": 40,
//                     "name": "x"
//                   },
//                   "init": {
//                     "type": "ArrowFunctionExpression",
//                     "start": 43,
//                     "end": 61,
//                     "id": null,
//                     "generator": false,
//                     "expression": false,
//                     "async": false,
//                     "params": [],
//                     "body": {
//                       "type": "BlockStatement",
//                       "start": 49,
//                       "end": 61,
//                       "body": [
//                         {
//                           "type": "ExpressionStatement",
//                           "start": 51,
//                           "end": 59,
//                           "expression": {
//                             "type": "CallExpression",
//                             "start": 51,
//                             "end": 58,
//                             "callee": {
//                               "type": "Super",
//                               "start": 51,
//                               "end": 56
//                             },
//                             "arguments": []
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 }
//               ]
//             }
//           ]
//         }
//       }
//     }
//   ],
//   "sourceType": "module"
// }, { "ecmaVersion": 9, "sourceType": "module" })
// test("var C = class { async *method() { var x = () => { super(); } } }", {}, { "ecmaVersion": 9 })
// test("var C = class { static async *method() { var x = () => { super(); } } }", {}, { "ecmaVersion": 9 })
// test("async function* x() { var x = function () { super(); } }", {}, { "ecmaVersion": 9 })
// test("ref = async function*() { var x = function () { super(); } }", {}, { "ecmaVersion": 9 })
// test("(async function*() { var x = function () { super(); } })", {}, { "ecmaVersion": 9 })
// test("var gen = { async *method() { var x = function () { super(); } } }", {
//   "type": "Program",
//   "start": 0,
//   "end": 66,
//   "body": [
//     {
//       "type": "VariableDeclaration",
//       "start": 0,
//       "end": 66,
//       "declarations": [
//         {
//           "type": "VariableDeclarator",
//           "start": 4,
//           "end": 66,
//           "id": {
//             "type": "Identifier",
//             "start": 4,
//             "end": 7,
//             "name": "gen"
//           },
//           "init": {
//             "type": "ObjectExpression",
//             "start": 10,
//             "end": 66,
//             "properties": [
//               {
//                 "type": "Property",
//                 "start": 12,
//                 "end": 64,
//                 "method": true,
//                 "shorthand": false,
//                 "computed": false,
//                 "key": {
//                   "type": "Identifier",
//                   "start": 19,
//                   "end": 25,
//                   "name": "method"
//                 },
//                 "kind": "init",
//                 "value": {
//                   "type": "FunctionExpression",
//                   "start": 25,
//                   "end": 64,
//                   "id": null,
//                   "generator": true,
//                   "expression": false,
//                   "async": true,
//                   "params": [],
//                   "body": {
//                     "end": 64,
//                     "start": 28,
//                     "type": "BlockStatement",
//                     "body": [
//                       {
//                         "type": "VariableDeclaration",
//                         "start": 30,
//                         "end": 62,
//                         "kind": "var",
//                         "declarations": [
//                           {
//                             "type": "VariableDeclarator",
//                             "start": 34,
//                             "end": 62,
//                             "id": {
//                               "type": "Identifier",
//                               "start": 34,
//                               "end": 35,
//                               "name": "x"
//                             },
//                             "init": {
//                               "type": "FunctionExpression",
//                               "start": 38,
//                               "end": 62,
//                               "id": null,
//                               "generator": false,
//                               "expression": false,
//                               "async": false,
//                               "params": [],
//                               "body": {
//                                 "type": "BlockStatement",
//                                 "start": 50,
//                                 "end": 62,
//                                 "body": [
//                                   {
//                                     "type": "ExpressionStatement",
//                                     "start": 52,
//                                     "end": 60,
//                                     "expression": {
//                                       "type": "CallExpression",
//                                       "start": 52,
//                                       "end": 59,
//                                       "callee": {
//                                         "type": "Super",
//                                         "start": 52,
//                                         "end": 57
//                                       },
//                                       "arguments": []
//                                     }
//                                   }
//                                 ]
//                               }
//                             }
//                           }
//                         ]
//                       }
//                     ]
//                   }
//                 }
//               }
//             ]
//           }
//         }
//       ],
//       "kind": "var"
//     }
//   ],
//   "sourceType": "script"
// }, { "ecmaVersion": 9 })
// test("export default async function*() { var x = function () { super(); } }", {
//   "type": "Program",
//   "start": 0,
//   "end": 69,
//   "body": [
//     {
//       "type": "ExportDefaultDeclaration",
//       "start": 0,
//       "end": 69,
//       "declaration": {
//         "type": "FunctionDeclaration",
//         "start": 15,
//         "end": 69,
//         "id": null,
//         "generator": true,
//         "expression": false,
//         "async": true,
//         "params": [],
//         "body": {
//           "end": 69,
//           "start": 33,
//           "type": "BlockStatement",
//           "body": [
//             {
//               "type": "VariableDeclaration",
//               "start": 35,
//               "end": 67,
//               "kind": "var",
//               "declarations": [
//                 {
//                   "type": "VariableDeclarator",
//                   "start": 39,
//                   "end": 67,
//                   "id": {
//                     "type": "Identifier",
//                     "start": 39,
//                     "end": 40,
//                     "name": "x"
//                   },
//                   "init": {
//                     "type": "FunctionExpression",
//                     "start": 43,
//                     "end": 67,
//                     "id": null,
//                     "generator": false,
//                     "expression": false,
//                     "async": false,
//                     "params": [],
//                     "body": {
//                       "type": "BlockStatement",
//                       "start": 55,
//                       "end": 67,
//                       "body": [
//                         {
//                           "type": "ExpressionStatement",
//                           "start": 57,
//                           "end": 65,
//                           "expression": {
//                             "type": "CallExpression",
//                             "start": 57,
//                             "end": 64,
//                             "callee": {
//                               "type": "Super",
//                               "start": 57,
//                               "end": 62
//                             },
//                             "arguments": []
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 }
//               ]
//             }
//           ]
//         }
//       }
//     }
//   ],
//   "sourceType": "module"
// }, { "ecmaVersion": 9, "sourceType": "module" })
// test("var C = class { async *method() { var x = function () { super(); } } }", {}, { "ecmaVersion": 9 })
// test("var C = class { static async *method() { var x = function () { super(); } } }", {}, { "ecmaVersion": 9 })
// test("async function* x() { var x = { y: function () { super(); } } }", {}, { "ecmaVersion": 9 })
// test("ref = async function*() { var x = { y: function () { super(); } } }", {}, { "ecmaVersion": 9 })
// test("(async function*() { var x = { y: function () { super(); } } })", {}, { "ecmaVersion": 9 })
// test("var gen = { async *method() { var x = { y: function () { super(); } } } }", {
//   "type": "Program",
//   "start": 0,
//   "end": 73,
//   "body": [
//     {
//       "type": "VariableDeclaration",
//       "start": 0,
//       "end": 73,
//       "declarations": [
//         {
//           "type": "VariableDeclarator",
//           "start": 4,
//           "end": 73,
//           "id": {
//             "type": "Identifier",
//             "start": 4,
//             "end": 7,
//             "name": "gen"
//           },
//           "init": {
//             "type": "ObjectExpression",
//             "start": 10,
//             "end": 73,
//             "properties": [
//               {
//                 "type": "Property",
//                 "start": 12,
//                 "end": 71,
//                 "method": true,
//                 "shorthand": false,
//                 "computed": false,
//                 "key": {
//                   "type": "Identifier",
//                   "start": 19,
//                   "end": 25,
//                   "name": "method"
//                 },
//                 "kind": "init",
//                 "value": {
//                   "type": "FunctionExpression",
//                   "start": 25,
//                   "end": 71,
//                   "id": null,
//                   "generator": true,
//                   "expression": false,
//                   "async": true,
//                   "params": [],
//                   "body": {
//                     "type": "BlockStatement",
//                     "start": 28,
//                     "end": 71,
//                     "body": [
//                       {
//                         "type": "VariableDeclaration",
//                         "start": 30,
//                         "end": 69,
//                         "declarations": [
//                           {
//                             "type": "VariableDeclarator",
//                             "start": 34,
//                             "end": 69,
//                             "id": {
//                               "type": "Identifier",
//                               "start": 34,
//                               "end": 35,
//                               "name": "x"
//                             },
//                             "init": {
//                               "type": "ObjectExpression",
//                               "start": 38,
//                               "end": 69,
//                               "properties": [
//                                 {
//                                   "type": "Property",
//                                   "start": 40,
//                                   "end": 67,
//                                   "method": false,
//                                   "shorthand": false,
//                                   "computed": false,
//                                   "key": {
//                                     "type": "Identifier",
//                                     "start": 40,
//                                     "end": 41,
//                                     "name": "y"
//                                   },
//                                   "value": {
//                                     "type": "FunctionExpression",
//                                     "start": 43,
//                                     "end": 67,
//                                     "id": null,
//                                     "generator": false,
//                                     "expression": false,
//                                     "async": false,
//                                     "params": [],
//                                     "body": {
//                                       "type": "BlockStatement",
//                                       "start": 55,
//                                       "end": 67,
//                                       "body": [
//                                         {
//                                           "type": "ExpressionStatement",
//                                           "start": 57,
//                                           "end": 65,
//                                           "expression": {
//                                             "type": "CallExpression",
//                                             "start": 57,
//                                             "end": 64,
//                                             "callee": {
//                                               "type": "Super",
//                                               "start": 57,
//                                               "end": 62
//                                             },
//                                             "arguments": []
//                                           }
//                                         }
//                                       ]
//                                     }
//                                   },
//                                   "kind": "init"
//                                 }
//                               ]
//                             }
//                           }
//                         ],
//                         "kind": "var"
//                       }
//                     ]
//                   }
//                 }
//               }
//             ]
//           }
//         }
//       ],
//       "kind": "var"
//     }
//   ],
//   "sourceType": "script"
// }, { "ecmaVersion": 9 })
// test("export default async function*() { var x = { y: function () { super(); } } }", {
//   "type": "Program",
//   "start": 0,
//   "end": 76,
//   "body": [
//     {
//       "type": "ExportDefaultDeclaration",
//       "start": 0,
//       "end": 76,
//       "declaration": {
//         "type": "FunctionDeclaration",
//         "start": 15,
//         "end": 76,
//         "id": null,
//         "generator": true,
//         "expression": false,
//         "async": true,
//         "params": [],
//         "body": {
//           "type": "BlockStatement",
//           "start": 33,
//           "end": 76,
//           "body": [
//             {
//               "type": "VariableDeclaration",
//               "start": 35,
//               "end": 74,
//               "declarations": [
//                 {
//                   "type": "VariableDeclarator",
//                   "start": 39,
//                   "end": 74,
//                   "id": {
//                     "type": "Identifier",
//                     "start": 39,
//                     "end": 40,
//                     "name": "x"
//                   },
//                   "init": {
//                     "type": "ObjectExpression",
//                     "start": 43,
//                     "end": 74,
//                     "properties": [
//                       {
//                         "type": "Property",
//                         "start": 45,
//                         "end": 72,
//                         "method": false,
//                         "shorthand": false,
//                         "computed": false,
//                         "key": {
//                           "type": "Identifier",
//                           "start": 45,
//                           "end": 46,
//                           "name": "y"
//                         },
//                         "value": {
//                           "type": "FunctionExpression",
//                           "start": 48,
//                           "end": 72,
//                           "id": null,
//                           "generator": false,
//                           "expression": false,
//                           "async": false,
//                           "params": [],
//                           "body": {
//                             "type": "BlockStatement",
//                             "start": 60,
//                             "end": 72,
//                             "body": [
//                               {
//                                 "type": "ExpressionStatement",
//                                 "start": 62,
//                                 "end": 70,
//                                 "expression": {
//                                   "type": "CallExpression",
//                                   "start": 62,
//                                   "end": 69,
//                                   "callee": {
//                                     "type": "Super",
//                                     "start": 62,
//                                     "end": 67
//                                   },
//                                   "arguments": []
//                                 }
//                               }
//                             ]
//                           }
//                         },
//                         "kind": "init"
//                       }
//                     ]
//                   }
//                 }
//               ],
//               "kind": "var"
//             }
//           ]
//         }
//       }
//     }
//   ],
//   "sourceType": "module"
// }, { "ecmaVersion": 9, "sourceType": "module" })
// test("var C = class { async *method() { var x = { y: function () { super(); } } } }", {}, { "ecmaVersion": 9 })
// test("var C = class { static async *method() { var x = { y: function () { super(); } } } }", {}, { "ecmaVersion": 9 })

test("({ async *method(){} })", {}, { "ecmaVersion": 9 })

testFail("({ \\u0061sync *method(){} })", "Unexpected token (1:14)", { "ecmaVersion": 9 })
testFail("void \\u0061sync function* f(){};", "Unexpected token (1:16)", { "ecmaVersion": 9 })
testFail("for ( ; false; ) async function* g() {}", "Unexpected token (1:17)", { "ecmaVersion": 9 })

test("({async() { }})", {}, { "ecmaVersion": 9 })
test("({async = 0} = {})", {}, { "ecmaVersion": 9 })
test("({async, foo})", {}, { "ecmaVersion": 9 })
test("({async})", {}, { "ecmaVersion": 9 })
test("({async: true})", {}, { "ecmaVersion": 9 })

testFail("({async\n    foo() { }})", "Unexpected token (2:4)", { "ecmaVersion": 9 })

// #1031
test("async () => { for await (async of []); }", {}, {ecmaVersion: 9})
test("for (async of => {}; i < 10; ++i) {}", {}, {ecmaVersion: 9})
testFail("for (async of [1]) {}", "Unexpected token (1:14)", {ecmaVersion: 9})

testFail("async () => { for (async\nof []); }", "Unexpected token (2:0)", {ecmaVersion: 9})
testFail("async () => { for (async of\n[]); }", "Unexpected token (2:0)", {ecmaVersion: 9})
test("for ((async) of [7]);", {}, {ecmaVersion: 9})
