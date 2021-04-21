if (typeof exports != "undefined") {
  var driver = require("./driver.js");
  var test = driver.test, testFail = driver.testFail, testAssert = driver.testAssert, misMatch = driver.misMatch;
}

//------------------------------------------------------------------------------
// Public Class Field
//------------------------------------------------------------------------------

test("class C { aaa }", {
  "type": "Program",
  "start": 0,
  "end": 15,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 15,
      "id": {
        "type": "Identifier",
        "start": 6,
        "end": 7,
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 15,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 13,
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 10,
              "end": 13,
              "name": "aaa"
            },
            "value": null
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { aaa; }", {
  "type": "Program",
  "start": 0,
  "end": 16,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 16,
      "id": {
        "type": "Identifier",
        "start": 6,
        "end": 7,
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 16,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 14,
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 10,
              "end": 13,
              "name": "aaa"
            },
            "value": null
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { \\u0041 }", {
  "type": "Program",
  "start": 0,
  "end": 18,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 18,
      "id": {
        "type": "Identifier",
        "start": 6,
        "end": 7,
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 18,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 16,
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 10,
              "end": 16,
              "name": "A"
            },
            "value": null
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { '0' }", {
  "type": "Program",
  "start": 0,
  "end": 15,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 15,
      "id": {
        "type": "Identifier",
        "start": 6,
        "end": 7,
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 15,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 13,
            "static": false,
            "computed": false,
            "key": {
              "type": "Literal",
              "start": 10,
              "end": 13,
              "value": "0",
              "raw": "'0'"
            },
            "value": null
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { 1e2 }", {
  "type": "Program",
  "start": 0,
  "end": 15,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 15,
      "id": {
        "type": "Identifier",
        "start": 6,
        "end": 7,
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 15,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 13,
            "static": false,
            "computed": false,
            "key": {
              "type": "Literal",
              "start": 10,
              "end": 13,
              "value": 100,
              "raw": "1e2"
            },
            "value": null
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { [0] }", {
  "type": "Program",
  "start": 0,
  "end": 15,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 15,
      "id": {
        "type": "Identifier",
        "start": 6,
        "end": 7,
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 15,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 13,
            "static": false,
            "computed": true,
            "key": {
              "type": "Literal",
              "start": 11,
              "end": 12,
              "value": 0,
              "raw": "0"
            },
            "value": null
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { aaa = bbb }", {
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
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 21,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 19,
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 10,
              "end": 13,
              "name": "aaa"
            },
            "value": {
              "type": "Identifier",
              "start": 16,
              "end": 19,
              "name": "bbb"
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { aaa = bbb; }", {
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
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 22,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 20,
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 10,
              "end": 13,
              "name": "aaa"
            },
            "value": {
              "type": "Identifier",
              "start": 16,
              "end": 19,
              "name": "bbb"
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { aaa; bbb }", {
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
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 20,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 14,
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 10,
              "end": 13,
              "name": "aaa"
            },
            "value": null
          },
          {
            "type": "PropertyDefinition",
            "start": 15,
            "end": 18,
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 15,
              "end": 18,
              "name": "bbb"
            },
            "value": null
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { aaa\nbbb }", {
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
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 19,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 13,
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 10,
              "end": 13,
              "name": "aaa"
            },
            "value": null
          },
          {
            "type": "PropertyDefinition",
            "start": 14,
            "end": 17,
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 14,
              "end": 17,
              "name": "bbb"
            },
            "value": null
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { aaa=()=>0 }", {
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
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 21,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 19,
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 10,
              "end": 13,
              "name": "aaa"
            },
            "value": {
              "type": "ArrowFunctionExpression",
              "start": 14,
              "end": 19,
              "id": null,
              "expression": true,
              "generator": false,
              "async": false,
              "params": [],
              "body": {
                "type": "Literal",
                "start": 18,
                "end": 19,
                "value": 0,
                "raw": "0"
              }
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { static aaa }", {
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
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 22,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 20,
            "static": true,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 17,
              "end": 20,
              "name": "aaa"
            },
            "value": null
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { static \\u0041 }", {
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
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 25,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 23,
            "static": true,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 17,
              "end": 23,
              "name": "A"
            },
            "value": null
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { static '0' }", {
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
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 22,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 20,
            "static": true,
            "computed": false,
            "key": {
              "type": "Literal",
              "start": 17,
              "end": 20,
              "value": "0",
              "raw": "'0'"
            },
            "value": null
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { static 1e2 }", {
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
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 22,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 20,
            "static": true,
            "computed": false,
            "key": {
              "type": "Literal",
              "start": 17,
              "end": 20,
              "value": 100,
              "raw": "1e2"
            },
            "value": null
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { static [0] }", {
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
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 22,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 20,
            "static": true,
            "computed": true,
            "key": {
              "type": "Literal",
              "start": 18,
              "end": 19,
              "value": 0,
              "raw": "0"
            },
            "value": null
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { static aaa = bbb }", {
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
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 28,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 26,
            "static": true,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 17,
              "end": 20,
              "name": "aaa"
            },
            "value": {
              "type": "Identifier",
              "start": 23,
              "end": 26,
              "name": "bbb"
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

// dupe ok
test("class C { aaa; aaa }", {
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
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 20,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 14,
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 10,
              "end": 13,
              "name": "aaa"
            },
            "value": null
          },
          {
            "type": "PropertyDefinition",
            "start": 15,
            "end": 18,
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 15,
              "end": 18,
              "name": "aaa"
            },
            "value": null
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

// ASI hazard
test("class C { aaa=0\n['bbb'] }", {
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
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 25,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 23,
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 10,
              "end": 13,
              "name": "aaa"
            },
            "value": {
              "type": "MemberExpression",
              "start": 14,
              "end": 23,
              "object": {
                "type": "Literal",
                "start": 14,
                "end": 15,
                "value": 0,
                "raw": "0"
              },
              "property": {
                "type": "Literal",
                "start": 17,
                "end": 22,
                "value": "bbb",
                "raw": "'bbb'"
              },
              "computed": true,
              "optional": false
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

// get, set, static, async
test("class C { get; set; static; async }", {
  "type": "Program",
  "start": 0,
  "end": 35,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 35,
      "id": {
        "type": "Identifier",
        "start": 6,
        "end": 7,
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 35,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 14,
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 10,
              "end": 13,
              "name": "get"
            },
            "value": null
          },
          {
            "type": "PropertyDefinition",
            "start": 15,
            "end": 19,
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 15,
              "end": 18,
              "name": "set"
            },
            "value": null
          },
          {
            "type": "PropertyDefinition",
            "start": 20,
            "end": 27,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 20,
              "end": 26,
              "name": "static"
            },
            "static": false,
            "value": null
          },
          {
            "type": "PropertyDefinition",
            "start": 28,
            "end": 33,
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 28,
              "end": 33,
              "name": "async"
            },
            "value": null
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { static\nget\nfoo(){} }", {
  "type": "Program",
  "start": 0,
  "end": 30,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 30,
      "id": {
        "type": "Identifier",
        "start": 6,
        "end": 7,
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 30,
        "body": [
          {
            "type": "MethodDefinition",
            "start": 10,
            "end": 28,
            "static": true,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 21,
              "end": 24,
              "name": "foo"
            },
            "kind": "get",
            "value": {
              "type": "FunctionExpression",
              "start": 24,
              "end": 28,
              "id": null,
              "expression": false,
              "generator": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 26,
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
}, {ecmaVersion: 13})

// ASI
test("class C { async\nget(){} }", {
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
          "name": "C"
        },
        "superClass": null,
        "body": {
          "type": "ClassBody",
          "start": 8,
          "end": 25,
          "body": [
            {
              "type": "PropertyDefinition",
              "start": 10,
              "end": 15,
              "static": false,
              "computed": false,
              "key": {
                "type": "Identifier",
                "start": 10,
                "end": 15,
                "name": "async"
              },
              "value": null
            },
            {
              "type": "MethodDefinition",
              "start": 16,
              "end": 23,
              "static": false,
              "computed": false,
              "key": {
                "type": "Identifier",
                "start": 16,
                "end": 19,
                "name": "get"
              },
              "kind": "method",
              "value": {
                "type": "FunctionExpression",
                "start": 19,
                "end": 23,
                "id": null,
                "expression": false,
                "generator": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 21,
                  "end": 23,
                  "body": []
                }
              }
            }
          ]
        }
      }
    ],
    "sourceType": "script"
  }, {ecmaVersion: 13})

// old ecma version
testFail("class C { aaa }", "Unexpected token (1:14)", {ecmaVersion: 12})

// super
test("class C { aaa = super.bbb }", {}, {ecmaVersion: 13})
test("class C { aaa = () => super.bbb }", {}, {ecmaVersion: 13})
test("class C { aaa = () => () => super.bbb }", {}, {ecmaVersion: 13})
testFail("class C { [super.bbb] = 0 }", "'super' keyword outside a method (1:11)", {ecmaVersion: 13})

// unexpected token
testFail("class C { aaa, bbb }", "Unexpected token (1:13)", {ecmaVersion: 13})
testFail("class C { get aaa }", "Unexpected token (1:18)", {ecmaVersion: 13})
testFail("class C { set aaa }", "Unexpected token (1:18)", {ecmaVersion: 13})
testFail("class C { *aaa }", "Unexpected token (1:15)", {ecmaVersion: 13})
testFail("class C { async aaa }", "Unexpected token (1:20)", {ecmaVersion: 13})
testFail("class C { async*aaa }", "Unexpected token (1:20)", {ecmaVersion: 13})
testFail("class C { aaa bbb }", "Unexpected token (1:14)", {ecmaVersion: 13})
testFail("class C { aaa = 0, 1 }", "Unexpected token (1:17)", {ecmaVersion: 13})

// constructor
testFail("class C { constructor }", "Classes can't have a field named 'constructor' (1:10)", {ecmaVersion: 13})
testFail("class C { static constructor }", "Classes can't have a field named 'constructor' (1:17)", {ecmaVersion: 13})

// prototype
test("class C { prototype }", {}, {ecmaVersion: 13})
testFail("class C { static prototype }", "Classes can't have a static field named 'prototype' (1:17)", {ecmaVersion: 13})

// arguments in initializer
test("class C { aaa = { arguments: 1 } }", {}, {ecmaVersion: 13})
test("class C { aaa = function(){ arguments } }", {}, {ecmaVersion: 13})
test("class C { [arguments] = 0 }", {}, {ecmaVersion: 13})
testFail("class C { aaa = arguments }", "Cannot use 'arguments' in class field initializer (1:16)", {ecmaVersion: 13})
testFail("class C { aaa = { arguments } }", "Cannot use 'arguments' in class field initializer (1:18)", {ecmaVersion: 13})

//------------------------------------------------------------------------------
// Private Class Field
//------------------------------------------------------------------------------

test("class C { #aaa }", {
  "type": "Program",
  "start": 0,
  "end": 16,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 16,
      "id": {
        "type": "Identifier",
        "start": 6,
        "end": 7,
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 16,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 14,
            "static": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 10,
              "end": 14,
              "name": "aaa"
            },
            "value": null
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { #\\u0041 }", {
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
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 19,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 17,
            "static": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 10,
              "end": 17,
              "name": "A"
            },
            "value": null
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { static #aaa }", {
  "type": "Program",
  "start": 0,
  "end": 23,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 23,
      "id": {
        "type": "Identifier",
        "start": 6,
        "end": 7,
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 23,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 21,
            "static": true,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 17,
              "end": 21,
              "name": "aaa"
            },
            "value": null
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { static\n#\\u0041 }", {
  "type": "Program",
  "start": 0,
  "end": 26,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 26,
      "id": {
        "type": "Identifier",
        "start": 6,
        "end": 7,
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 26,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 24,
            "static": true,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 17,
              "end": 24,
              "name": "A"
            },
            "value": null
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { #aaa; }", {
  "type": "Program",
  "start": 0,
  "end": 17,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 17,
      "id": {
        "type": "Identifier",
        "start": 6,
        "end": 7,
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 17,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 15,
            "static": false,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 10,
              "end": 14,
              "name": "aaa"
            },
            "value": null
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { #aaa; #bbb }",  {
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
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 22,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 15,
            "static": false,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 10,
              "end": 14,
              "name": "aaa"
            },
            "value": null
          },
          {
            "type": "PropertyDefinition",
            "start": 16,
            "end": 20,
            "static": false,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 16,
              "end": 20,
              "name": "bbb"
            },
            "value": null
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { #aaa\n#bbb }", {
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
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 21,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 14,
            "static": false,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 10,
              "end": 14,
              "name": "aaa"
            },
            "value": null
          },
          {
            "type": "PropertyDefinition",
            "start": 15,
            "end": 19,
            "static": false,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 15,
              "end": 19,
              "name": "bbb"
            },
            "value": null
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { #aaa = 0 }", {
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
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 20,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 18,
            "static": false,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 10,
              "end": 14,
              "name": "aaa"
            },
            "value": {
              "type": "Literal",
              "start": 17,
              "end": 18,
              "value": 0,
              "raw": "0"
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

// #constructor
testFail("class C { #constructor }", "Classes can't have an element named '#constructor' (1:10)", {ecmaVersion: 13})
testFail("class C { static #constructor }", "Classes can't have an element named '#constructor' (1:17)", {ecmaVersion: 13})

// duplicate
testFail("class C { #a; #a }", "Identifier '#a' has already been declared (1:14)", {ecmaVersion: 13})
testFail("class C { #a; static #a }", "Identifier '#a' has already been declared (1:21)", {ecmaVersion: 13})
testFail("class C { static #a; #a }", "Identifier '#a' has already been declared (1:21)", {ecmaVersion: 13})

//------------------------------------------------------------------------------
// Private Class Method
//------------------------------------------------------------------------------

test("class C { #aaa(){} }", {  
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
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 20,
        "body": [
          {
            "type": "MethodDefinition",
            "start": 10,
            "end": 18,
            "static": false,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 10,
              "end": 14,
              "name": "aaa"
            },
            "kind": "method",
            "value": {
              "type": "FunctionExpression",
              "start": 14,
              "end": 18,
              "id": null,
              "expression": false,
              "generator": false,
              "async": false,
              "params": [],
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
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { *#aaa(){} }", {
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
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 21,
        "body": [
          {
            "type": "MethodDefinition",
            "start": 10,
            "end": 19,
            "static": false,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 11,
              "end": 15,
              "name": "aaa"
            },
            "kind": "method",
            "value": {
              "type": "FunctionExpression",
              "start": 15,
              "end": 19,
              "id": null,
              "expression": false,
              "generator": true,
              "async": false,
              "params": [],
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
}, {ecmaVersion: 13})

test("class C { async#aaa(){} }", {
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
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 25,
        "body": [
          {
            "type": "MethodDefinition",
            "start": 10,
            "end": 23,
            "static": false,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 15,
              "end": 19,
              "name": "aaa"
            },
            "kind": "method",
            "value": {
              "type": "FunctionExpression",
              "start": 19,
              "end": 23,
              "id": null,
              "expression": false,
              "generator": false,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 21,
                "end": 23,
                "body": []
              }
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { async*#aaa(){} }",  {
  "type": "Program",
  "start": 0,
  "end": 26,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 26,
      "id": {
        "type": "Identifier",
        "start": 6,
        "end": 7,
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 26,
        "body": [
          {
            "type": "MethodDefinition",
            "start": 10,
            "end": 24,
            "static": false,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 16,
              "end": 20,
              "name": "aaa"
            },
            "kind": "method",
            "value": {
              "type": "FunctionExpression",
              "start": 20,
              "end": 24,
              "id": null,
              "expression": false,
              "generator": true,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 22,
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
}, {ecmaVersion: 13})

test("class C { static#aaa(){} }", {
  "type": "Program",
  "start": 0,
  "end": 26,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 26,
      "id": {
        "type": "Identifier",
        "start": 6,
        "end": 7,
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 26,
        "body": [
          {
            "type": "MethodDefinition",
            "start": 10,
            "end": 24,
            "static": true,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 16,
              "end": 20,
              "name": "aaa"
            },
            "kind": "method",
            "value": {
              "type": "FunctionExpression",
              "start": 20,
              "end": 24,
              "id": null,
              "expression": false,
              "generator": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 22,
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
}, {ecmaVersion: 13})

test("class C { static*#aaa(){} }", {
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
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 27,
        "body": [
          {
            "type": "MethodDefinition",
            "start": 10,
            "end": 25,
            "static": true,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 17,
              "end": 21,
              "name": "aaa"
            },
            "kind": "method",
            "value": {
              "type": "FunctionExpression",
              "start": 21,
              "end": 25,
              "id": null,
              "expression": false,
              "generator": true,
              "async": false,
              "params": [],
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
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { static async#aaa(){} }", {
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
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 32,
        "body": [
          {
            "type": "MethodDefinition",
            "start": 10,
            "end": 30,
            "static": true,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 22,
              "end": 26,
              "name": "aaa"
            },
            "kind": "method",
            "value": {
              "type": "FunctionExpression",
              "start": 26,
              "end": 30,
              "id": null,
              "expression": false,
              "generator": false,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 28,
                "end": 30,
                "body": []
              }
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { static async*#aaa(){} }", {
  "type": "Program",
  "start": 0,
  "end": 33,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 33,
      "id": {
        "type": "Identifier",
        "start": 6,
        "end": 7,
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 33,
        "body": [
          {
            "type": "MethodDefinition",
            "start": 10,
            "end": 31,
            "static": true,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 23,
              "end": 27,
              "name": "aaa"
            },
            "kind": "method",
            "value": {
              "type": "FunctionExpression",
              "start": 27,
              "end": 31,
              "id": null,
              "expression": false,
              "generator": true,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 29,
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
}, {ecmaVersion: 13})

// no ASI
test("class C { static\n*\n#aaa(){} }", {
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
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 29,
        "body": [
          {
            "type": "MethodDefinition",
            "start": 10,
            "end": 27,
            "static": true,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 19,
              "end": 23,
              "name": "aaa"
            },
            "kind": "method",
            "value": {
              "type": "FunctionExpression",
              "start": 23,
              "end": 27,
              "id": null,
              "expression": false,
              "generator": true,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 25,
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
}, {ecmaVersion: 13})
test("class C { static\nasync#aaa(){} }", {
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
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 32,
        "body": [
          {
            "type": "MethodDefinition",
            "start": 10,
            "end": 30,
            "static": true,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 22,
              "end": 26,
              "name": "aaa"
            },
            "kind": "method",
            "value": {
              "type": "FunctionExpression",
              "start": 26,
              "end": 30,
              "id": null,
              "expression": false,
              "generator": false,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 28,
                "end": 30,
                "body": []
              }
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})
test("class C { static\nasync*\n#aaa(){} }", {
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
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 34,
        "body": [
          {
            "type": "MethodDefinition",
            "start": 10,
            "end": 32,
            "static": true,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 24,
              "end": 28,
              "name": "aaa"
            },
            "kind": "method",
            "value": {
              "type": "FunctionExpression",
              "start": 28,
              "end": 32,
              "id": null,
              "expression": false,
              "generator": true,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 30,
                "end": 32,
                "body": []
              }
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

// ASI
test("class C { static\nasync\n#aaa(){} }", {
  "type": "Program",
  "start": 0,
  "end": 33,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 33,
      "id": {
        "type": "Identifier",
        "start": 6,
        "end": 7,
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 33,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 22,
            "static": true,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 17,
              "end": 22,
              "name": "async"
            },
            "value": null
          },
          {
            "type": "MethodDefinition",
            "start": 23,
            "end": 31,
            "static": false,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 23,
              "end": 27,
              "name": "aaa"
            },
            "kind": "method",
            "value": {
              "type": "FunctionExpression",
              "start": 27,
              "end": 31,
              "id": null,
              "expression": false,
              "generator": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 29,
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
}, {ecmaVersion: 13})
test("class C { static\nasync\n*\n#aaa(){} }", {
  "type": "Program",
  "start": 0,
  "end": 35,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 35,
      "id": {
        "type": "Identifier",
        "start": 6,
        "end": 7,
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 35,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 22,
            "static": true,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 17,
              "end": 22,
              "name": "async"
            },
            "value": null
          },
          {
            "type": "MethodDefinition",
            "start": 23,
            "end": 33,
            "static": false,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 25,
              "end": 29,
              "name": "aaa"
            },
            "kind": "method",
            "value": {
              "type": "FunctionExpression",
              "start": 29,
              "end": 33,
              "id": null,
              "expression": false,
              "generator": true,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 31,
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
}, {ecmaVersion: 13})

// duplicate
testFail("class C { #a(){} #a }", "Identifier '#a' has already been declared (1:17)", {ecmaVersion: 13})
testFail("class C { #a; #a(){} }", "Identifier '#a' has already been declared (1:14)", {ecmaVersion: 13})
testFail("class C { #a(){} #a(){} }", "Identifier '#a' has already been declared (1:17)", {ecmaVersion: 13})
testFail("class C { #a(){} static #a(){} }", "Identifier '#a' has already been declared (1:24)", {ecmaVersion: 13})
testFail("class C { static #a(){} #a(){} }", "Identifier '#a' has already been declared (1:24)", {ecmaVersion: 13})

//------------------------------------------------------------------------------
// Private Class Getter/Setter
//------------------------------------------------------------------------------

test("class C { get #aaa(){} }", {
  "type": "Program",
  "start": 0,
  "end": 24,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 24,
      "id": {
        "type": "Identifier",
        "start": 6,
        "end": 7,
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 24,
        "body": [
          {
            "type": "MethodDefinition",
            "start": 10,
            "end": 22,
            "static": false,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 14,
              "end": 18,
              "name": "aaa"
            },
            "kind": "get",
            "value": {
              "type": "FunctionExpression",
              "start": 18,
              "end": 22,
              "id": null,
              "expression": false,
              "generator": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 20,
                "end": 22,
                "body": []
              }
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { set #aaa(x){} }", {
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
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 25,
        "body": [
          {
            "type": "MethodDefinition",
            "start": 10,
            "end": 23,
            "static": false,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 14,
              "end": 18,
              "name": "aaa"
            },
            "kind": "set",
            "value": {
              "type": "FunctionExpression",
              "start": 18,
              "end": 23,
              "id": null,
              "expression": false,
              "generator": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 19,
                  "end": 20,
                  "name": "x"
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
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { static get #aaa(){} }", {
  "type": "Program",
  "start": 0,
  "end": 31,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 31,
      "id": {
        "type": "Identifier",
        "start": 6,
        "end": 7,
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 31,
        "body": [
          {
            "type": "MethodDefinition",
            "start": 10,
            "end": 29,
            "static": true,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 21,
              "end": 25,
              "name": "aaa"
            },
            "kind": "get",
            "value": {
              "type": "FunctionExpression",
              "start": 25,
              "end": 29,
              "id": null,
              "expression": false,
              "generator": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 27,
                "end": 29,
                "body": []
              }
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

test("class C { static set #aaa(x){} }", {
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
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 32,
        "body": [
          {
            "type": "MethodDefinition",
            "start": 10,
            "end": 30,
            "static": true,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 21,
              "end": 25,
              "name": "aaa"
            },
            "kind": "set",
            "value": {
              "type": "FunctionExpression",
              "start": 25,
              "end": 30,
              "id": null,
              "expression": false,
              "generator": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 26,
                  "end": 27,
                  "name": "x"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 28,
                "end": 30,
                "body": []
              }
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

// no ASI
test("class C { static\nget\n#aaa(){} }", {
  "type": "Program",
  "start": 0,
  "end": 31,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 31,
      "id": {
        "type": "Identifier",
        "start": 6,
        "end": 7,
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 31,
        "body": [
          {
            "type": "MethodDefinition",
            "start": 10,
            "end": 29,
            "static": true,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 21,
              "end": 25,
              "name": "aaa"
            },
            "kind": "get",
            "value": {
              "type": "FunctionExpression",
              "start": 25,
              "end": 29,
              "id": null,
              "expression": false,
              "generator": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 27,
                "end": 29,
                "body": []
              }
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

// semi
test("class C { get; #aaa(){} }", {
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
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 25,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 14,
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 10,
              "end": 13,
              "name": "get"
            },
            "value": null
          },
          {
            "type": "MethodDefinition",
            "start": 15,
            "end": 23,
            "static": false,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 15,
              "end": 19,
              "name": "aaa"
            },
            "kind": "method",
            "value": {
              "type": "FunctionExpression",
              "start": 19,
              "end": 23,
              "id": null,
              "expression": false,
              "generator": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 21,
                "end": 23,
                "body": []
              }
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

// duplicate
test("class C { get #a(){} set #a(x){} }", {}, {ecmaVersion: 13})
test("class C { static get #a(){} static set #a(x){} }", {}, {ecmaVersion: 13})
testFail("class C { get #a(){} static set #a(x){} }", "Identifier '#a' has already been declared (1:32)", {ecmaVersion: 13})
testFail("class C { set #a(x){} static get #a(){} }", "Identifier '#a' has already been declared (1:33)", {ecmaVersion: 13})
testFail("class C { static get #a(){} set #a(x){} }", "Identifier '#a' has already been declared (1:32)", {ecmaVersion: 13})
testFail("class C { static set #a(x){} get #a(){} }", "Identifier '#a' has already been declared (1:33)", {ecmaVersion: 13})
testFail("class C { #a; get #a(){} }", "Identifier '#a' has already been declared (1:18)", {ecmaVersion: 13})
testFail("class C { #a; set #a(x){} }", "Identifier '#a' has already been declared (1:18)", {ecmaVersion: 13})
testFail("class C { #a(){}; get #a(){} }", "Identifier '#a' has already been declared (1:22)", {ecmaVersion: 13})
testFail("class C { #a(){}; set #a(x){} }", "Identifier '#a' has already been declared (1:22)", {ecmaVersion: 13})
testFail("class C { get #a(){} #a }", "Identifier '#a' has already been declared (1:21)", {ecmaVersion: 13})
testFail("class C { set #a(x){} #a }", "Identifier '#a' has already been declared (1:22)", {ecmaVersion: 13})
testFail("class C { get #a(){} #a(){} }", "Identifier '#a' has already been declared (1:21)", {ecmaVersion: 13})
testFail("class C { set #a(x){} #a(){} }", "Identifier '#a' has already been declared (1:22)", {ecmaVersion: 13})

//------------------------------------------------------------------------------
// Private Member Access
//------------------------------------------------------------------------------

test("class C { #aaa; f() { this.#aaa } }", {
  "type": "Program",
  "start": 0,
  "end": 35,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 35,
      "id": {
        "type": "Identifier",
        "start": 6,
        "end": 7,
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 35,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 15,
            "static": false,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 10,
              "end": 14,
              "name": "aaa"
            },
            "value": null
          },
          {
            "type": "MethodDefinition",
            "start": 16,
            "end": 33,
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 16,
              "end": 17,
              "name": "f"
            },
            "kind": "method",
            "value": {
              "type": "FunctionExpression",
              "start": 17,
              "end": 33,
              "id": null,
              "expression": false,
              "generator": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 20,
                "end": 33,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 22,
                    "end": 31,
                    "expression": {
                      "type": "MemberExpression",
                      "start": 22,
                      "end": 31,
                      "object": {
                        "type": "ThisExpression",
                        "start": 22,
                        "end": 26
                      },
                      "property": {
                        "type": "PrivateIdentifier",
                        "start": 27,
                        "end": 31,
                        "name": "aaa"
                      },
                      "computed": false,
                      "optional": false
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
}, {ecmaVersion: 13})

test("class C { #aaa; f(obj) { obj.#aaa } }", {    
  "type": "Program",
  "start": 0,
  "end": 37,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 37,
      "id": {
        "type": "Identifier",
        "start": 6,
        "end": 7,
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 37,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 15,
            "static": false,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 10,
              "end": 14,
              "name": "aaa"
            },
            "value": null
          },
          {
            "type": "MethodDefinition",
            "start": 16,
            "end": 35,
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 16,
              "end": 17,
              "name": "f"
            },
            "kind": "method",
            "value": {
              "type": "FunctionExpression",
              "start": 17,
              "end": 35,
              "id": null,
              "expression": false,
              "generator": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 18,
                  "end": 21,
                  "name": "obj"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 23,
                "end": 35,
                "body": [
                  {
                    "type": "ExpressionStatement",  
                    "start": 25,
                    "end": 33,
                    "expression": {
                      "type": "MemberExpression",   
                      "start": 25,
                      "end": 33,
                      "object": {
                        "type": "Identifier",       
                        "start": 25,
                        "end": 28,
                        "name": "obj"
                      },
                      "property": {
                        "type": "PrivateIdentifier",
                        "start": 29,
                        "end": 33,
                        "name": "aaa"
                      },
                      "computed": false,
                      "optional": false
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
}, {ecmaVersion: 13})

test("class C { #aaa; f(obj) { obj?.#aaa } }", {
  "type": "Program",
  "start": 0,
  "end": 38,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 38,
      "id": {
        "type": "Identifier",
        "start": 6,
        "end": 7,
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 38,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 15,
            "static": false,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 10,
              "end": 14,
              "name": "aaa"
            },
            "value": null
          },
          {
            "type": "MethodDefinition",
            "start": 16,
            "end": 36,
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 16,
              "end": 17,
              "name": "f"
            },
            "kind": "method",
            "value": {
              "type": "FunctionExpression",
              "start": 17,
              "end": 36,
              "id": null,
              "expression": false,
              "generator": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 18,
                  "end": 21,
                  "name": "obj"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 23,
                "end": 36,
                "body": [
                  {
                    "type": "ExpressionStatement",  
                    "start": 25,
                    "end": 34,
                    "expression": {
                      "type": "ChainExpression",    
                      "start": 25,
                      "end": 34,
                      "expression": {
                        "type": "MemberExpression", 
                        "start": 25,
                        "end": 34,
                        "object": {
                          "type": "Identifier",     
                          "start": 25,
                          "end": 28,
                          "name": "obj"
                        },
                        "property": {
                          "type": "PrivateIdentifier",
                          "start": 30,
                          "end": 34,
                          "name": "aaa"
                        },
                        "computed": false,
                        "optional": true
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
}, {ecmaVersion: 13})

test("class C { #aaa; f(f) { f()?.#aaa } }", {     
  "type": "Program",
  "start": 0,
  "end": 36,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 36,
      "id": {
        "type": "Identifier",
        "start": 6,
        "end": 7,
        "name": "C"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 36,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 10,
            "end": 15,
            "static": false,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 10,
              "end": 14,
              "name": "aaa"
            },
            "value": null
          },
          {
            "type": "MethodDefinition",
            "start": 16,
            "end": 34,
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 16,
              "end": 17,
              "name": "f"
            },
            "kind": "method",
            "value": {
              "type": "FunctionExpression",
              "start": 17,
              "end": 34,
              "id": null,
              "expression": false,
              "generator": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 18,
                  "end": 19,
                  "name": "f"
                }
              ],
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
                      "type": "ChainExpression",    
                      "start": 23,
                      "end": 32,
                      "expression": {
                        "type": "MemberExpression", 
                        "start": 23,
                        "end": 32,
                        "object": {
                          "type": "CallExpression", 
                          "start": 23,
                          "end": 26,
                          "callee": {
                            "type": "Identifier",   
                            "start": 23,
                            "end": 24,
                            "name": "f"
                          },
                          "arguments": [],
                          "optional": false
                        },
                        "property": {
                          "type": "PrivateIdentifier",
                          "start": 28,
                          "end": 32,
                          "name": "aaa"
                        },
                        "computed": false,
                        "optional": true
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
}, {ecmaVersion: 13})

// super
testFail("class C extends Base { f() { return super.#aaa } }", "Unexpected token (1:42)", {ecmaVersion: 13})

// unexpected token
testFail("const obj = #aaa", "Unexpected token (1:12)", {ecmaVersion: 13})
testFail("const obj = { #aaa }", "Unexpected token (1:14)", {ecmaVersion: 13})
testFail("class C { #aaa; f() { #aaa } }", "Unexpected token (1:22)", {ecmaVersion: 13})
testFail("class C { #aaa; f() { return { #aaa: 1 } } }", "Unexpected token (1:31)", {ecmaVersion: 13})

// existence check
test("class C { #a; a = this.#a; }", {}, {ecmaVersion: 13})
test("class C { a = this.#a; #a; }", {}, {ecmaVersion: 13})
test("class C { #a; [this.#a]; }", {}, {ecmaVersion: 13})
test("class C { [this.#a]; #a; }", {}, {ecmaVersion: 13})
test("class C { #a; f(){ this.#a } }", {}, {ecmaVersion: 13})
test("class C { f(){ this.#a } #a; }", {}, {ecmaVersion: 13})
testFail("class C { #a; a = this.#b; }", "Private field '#b' must be declared in an enclosing class (1:23)", {ecmaVersion: 13})
testFail("class C { a = this.#b; #a; }", "Private field '#b' must be declared in an enclosing class (1:19)", {ecmaVersion: 13})
testFail("class C { #a; [this.#b]; }", "Private field '#b' must be declared in an enclosing class (1:20)", {ecmaVersion: 13})
testFail("class C { [this.#b]; #a; }", "Private field '#b' must be declared in an enclosing class (1:16)", {ecmaVersion: 13})
testFail("class C { #a; f(){ this.#b } }", "Private field '#b' must be declared in an enclosing class (1:24)", {ecmaVersion: 13})
testFail("class C { f(){ this.#b } #a; }", "Private field '#b' must be declared in an enclosing class (1:20)", {ecmaVersion: 13})
testFail("obj.#aaa", "Private field '#aaa' must be declared in an enclosing class (1:4)", {ecmaVersion: 13})
testFail("function F() { obj.#aaa }", "Private field '#aaa' must be declared in an enclosing class (1:19)", {ecmaVersion: 13})
// existence check -- inner classes can use the private elements of the outer classes.
test("class Outer { #outer; Inner = class { #inner; f(obj) { obj.#outer + this.#inner } }; }", {}, {ecmaVersion: 13})
test("class Outer { Inner = class { f(obj) { obj.#outer + this.#inner } #inner; }; #outer; }", {}, {ecmaVersion: 13})
testFail("class Outer { Inner = class { f(obj) { obj.#nonexist } #inner; }; #outer; }", "Private field '#nonexist' must be declared in an enclosing class (1:43)", {ecmaVersion: 13})
