if (typeof exports !== "undefined") {
  var driver = require("./driver.js");
  var test = driver.test, testFail = driver.testFail;
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
}, {ecmaVersion: 13, loose: false})
// loose parser requires indentation.
test("class C { aaa\n bbb }", {
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
}, {ecmaVersion: 13, loose: true})

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
}, {ecmaVersion: 13, loose: false})
// loose parser requires indentation.
test("class C { async\n get(){} }", {
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
            "start": 17,
            "end": 24,
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 17,
              "end": 20,
              "name": "get"
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
}, {ecmaVersion: 13, loose: true})

// ASI; star after get/set
test("class C { get\n *foo(){} }", {
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
            "end": 13,
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
              "type": "Identifier",
              "start": 16,
              "end": 19,
              "name": "foo"
            },
            "kind": "method",
            "value": {
              "type": "FunctionExpression",
              "start": 19,
              "end": 23,
              "id": null,
              "expression": false,
              "generator": true,
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
test("class C { set\n *foo(){} }", {
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
            "end": 13,
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 10,
              "end": 13,
              "name": "set"
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
              "type": "Identifier",
              "start": 16,
              "end": 19,
              "name": "foo"
            },
            "kind": "method",
            "value": {
              "type": "FunctionExpression",
              "start": 19,
              "end": 23,
              "id": null,
              "expression": false,
              "generator": true,
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

// `await` is reference
test("async function f() { class C { aaa = await } }", {
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
        "end": 16,
        "name": "f"
      },
      "params": [],
      "generator": false,
      "expression": false,
      "async": true,
      "body": {
        "type": "BlockStatement",
        "start": 19,
        "end": 46,
        "body": [
          {
            "type": "ClassDeclaration",
            "start": 21,
            "end": 44,
            "id": {
              "type": "Identifier",
              "start": 27,
              "end": 28,
              "name": "C"
            },
            "superClass": null,
            "body": {
              "type": "ClassBody",
              "start": 29,
              "end": 44,
              "body": [
                {
                  "type": "PropertyDefinition",
                  "start": 31,
                  "end": 42,
                  "static": false,
                  "computed": false,
                  "key": {
                    "type": "Identifier",
                    "start": 31,
                    "end": 34,
                    "name": "aaa"
                  },
                  "value": {
                    "type": "Identifier",
                    "start": 37,
                    "end": 42,
                    "name": "await"
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})
testFail("async function f() { class C { aaa = await } }", "Cannot use keyword 'await' outside an async function (1:37)", {ecmaVersion: 13, sourceType: "module"})

// `yield` is keyword in strict mode
testFail("function* f() { class C { aaa = yield } }", "The keyword 'yield' is reserved (1:32)", {ecmaVersion: 13})

// new.target
test("class C { a = new.target }", {
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
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 10,
              "end": 11,
              "name": "a"
            },
            "value": {
              "type": "MetaProperty",
              "start": 14,
              "end": 24,
              "meta": {
                "type": "Identifier",
                "start": 14,
                "end": 17,
                "name": "new"
              },
              "property": {
                "type": "Identifier",
                "start": 18,
                "end": 24,
                "name": "target"
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
}, {ecmaVersion: 13, loose: false})
// loose parser requires indentation.
test("class C { #aaa\n #bbb }", {
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
}, {ecmaVersion: 13, loose: true})

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

// Surrogate pair in private identifier
test("class C { #𩸽 }", {
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
              "type": "PrivateIdentifier",
              "start": 10,
              "end": 13,
              "name": "𩸽"
            },
            "value": null
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13})

// old ecma version
testFail("class C { #aaa }", "Unexpected character '#' (1:10)", {ecmaVersion: 12})

// Unexpected character
testFail("class C { # aaa }", "Unexpected character ' ' (1:11)", {ecmaVersion: 13})
testFail("class C { #+aaa }", "Unexpected character '+' (1:11)", {ecmaVersion: 13})
testFail("class C { #👍 }", "Unexpected character '👍' (1:11)", {ecmaVersion: 13})

// #constructor
testFail("class C { #constructor }", "Classes can't have an element named '#constructor' (1:10)", {ecmaVersion: 13})
testFail("class C { static #constructor }", "Classes can't have an element named '#constructor' (1:17)", {ecmaVersion: 13})

// duplicate
test("class C { a; #a }", {}, {ecmaVersion: 13})
test("class C { #a; a }", {}, {ecmaVersion: 13})
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
}, {ecmaVersion: 13, loose: false})
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
}, {ecmaVersion: 13, loose: false})
// loose parser requires indentation.
test("class C { static\n async\n #aaa(){} }", {
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
            "end": 23,
            "static": true,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 18,
              "end": 23,
              "name": "async"
            },
            "value": null
          },
          {
            "type": "MethodDefinition",
            "start": 25,
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
              "params": [],
              "generator": false,
              "expression": false,
              "async": false,
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
}, {ecmaVersion: 13, loose: true})
test("class C { static\n async\n *\n #aaa(){} }", {
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
            "end": 23,
            "static": true,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 18,
              "end": 23,
              "name": "async"
            },
            "value": null
          },
          {
            "type": "MethodDefinition",
            "start": 25,
            "end": 36,
            "static": false,
            "computed": false,
            "key": {
              "type": "PrivateIdentifier",
              "start": 28,
              "end": 32,
              "name": "aaa"
            },
            "kind": "method",
            "value": {
              "type": "FunctionExpression",
              "start": 32,
              "end": 36,
              "id": null,
              "params": [],
              "generator": true,
              "expression": false,
              "async": false,
              "body": {
                "type": "BlockStatement",
                "start": 34,
                "end": 36,
                "body": []
              }
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}, {ecmaVersion: 13, loose: true})

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

// delete
test("class C { #aaa; f() { delete this.#aaa.foo } }", {}, {ecmaVersion: 13})
test("class C { #aaa; f() { delete this.#aaa?.foo } }", {}, {ecmaVersion: 13})
testFail("class C { #aaa; f() { delete this.#aaa } }", "Private fields can not be deleted (1:22)", {ecmaVersion: 13})
testFail("class C { #aaa; f() { delete obj?.#aaa } }", "Private fields can not be deleted (1:22)", {ecmaVersion: 13})
testFail("class C { #aaa; f() { delete obj?.p.#aaa } }", "Private fields can not be deleted (1:22)", {ecmaVersion: 13})

// unexpected token
testFail("const obj = #aaa", "Unexpected token (1:12)", {ecmaVersion: 13})
testFail("const obj = { #aaa }", "Unexpected token (1:14)", {ecmaVersion: 13})
testFail("class C { #aaa; f() { #aaa } }", "Unexpected token (1:27)", {ecmaVersion: 13})
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
test("class C { static delete() {} }", {}, {ecmaVersion: 13})

// Class static block
test(`class C {
  static x
  static y
  static {
    try {
      const obj = doSomethingWith(this.x)
      this.y = obj.y
      this.z = obj.z
    }
    catch {
      this.y = 0
      this.z = 0
    }
  }
}`, {
  type: "Program",
  start: 0,
  end: 200,
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 15,
      column: 1
    }
  },
  body: [
    {
      type: "ClassDeclaration",
      start: 0,
      end: 200,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 15,
          column: 1
        }
      },
      id: {
        type: "Identifier",
        start: 6,
        end: 7,
        loc: {
          start: {
            line: 1,
            column: 6
          },
          end: {
            line: 1,
            column: 7
          }
        },
        name: "C"
      },
      superClass: null,
      body: {
        type: "ClassBody",
        start: 8,
        end: 200,
        loc: {
          start: {
            line: 1,
            column: 8
          },
          end: {
            line: 15,
            column: 1
          }
        },
        body: [
          {
            type: "PropertyDefinition",
            start: 12,
            end: 20,
            loc: {
              start: {
                line: 2,
                column: 2
              },
              end: {
                line: 2,
                column: 10
              }
            },
            static: true,
            computed: false,
            key: {
              type: "Identifier",
              start: 19,
              end: 20,
              loc: {
                start: {
                  line: 2,
                  column: 9
                },
                end: {
                  line: 2,
                  column: 10
                }
              },
              name: "x"
            },
            value: null
          },
          {
            type: "PropertyDefinition",
            start: 23,
            end: 31,
            loc: {
              start: {
                line: 3,
                column: 2
              },
              end: {
                line: 3,
                column: 10
              }
            },
            static: true,
            computed: false,
            key: {
              type: "Identifier",
              start: 30,
              end: 31,
              loc: {
                start: {
                  line: 3,
                  column: 9
                },
                end: {
                  line: 3,
                  column: 10
                }
              },
              name: "y"
            },
            value: null
          },
          {
            type: "StaticBlock",
            start: 34,
            end: 198,
            loc: {
              start: {
                line: 4,
                column: 2
              },
              end: {
                line: 14,
                column: 3
              }
            },
            body: [
              {
                type: "TryStatement",
                start: 47,
                end: 194,
                loc: {
                  start: {
                    line: 5,
                    column: 4
                  },
                  end: {
                    line: 13,
                    column: 5
                  }
                },
                block: {
                  type: "BlockStatement",
                  start: 51,
                  end: 142,
                  loc: {
                    start: {
                      line: 5,
                      column: 8
                    },
                    end: {
                      line: 9,
                      column: 5
                    }
                  },
                  body: [
                    {
                      type: "VariableDeclaration",
                      start: 59,
                      end: 94,
                      loc: {
                        start: {
                          line: 6,
                          column: 6
                        },
                        end: {
                          line: 6,
                          column: 41
                        }
                      },
                      declarations: [
                        {
                          type: "VariableDeclarator",
                          start: 65,
                          end: 94,
                          loc: {
                            start: {
                              line: 6,
                              column: 12
                            },
                            end: {
                              line: 6,
                              column: 41
                            }
                          },
                          id: {
                            type: "Identifier",
                            start: 65,
                            end: 68,
                            loc: {
                              start: {
                                line: 6,
                                column: 12
                              },
                              end: {
                                line: 6,
                                column: 15
                              }
                            },
                            name: "obj"
                          },
                          init: {
                            type: "CallExpression",
                            start: 71,
                            end: 94,
                            loc: {
                              start: {
                                line: 6,
                                column: 18
                              },
                              end: {
                                line: 6,
                                column: 41
                              }
                            },
                            callee: {
                              type: "Identifier",
                              start: 71,
                              end: 86,
                              loc: {
                                start: {
                                  line: 6,
                                  column: 18
                                },
                                end: {
                                  line: 6,
                                  column: 33
                                }
                              },
                              name: "doSomethingWith"
                            },
                            arguments: [
                              {
                                type: "MemberExpression",
                                start: 87,
                                end: 93,
                                loc: {
                                  start: {
                                    line: 6,
                                    column: 34
                                  },
                                  end: {
                                    line: 6,
                                    column: 40
                                  }
                                },
                                object: {
                                  type: "ThisExpression",
                                  start: 87,
                                  end: 91,
                                  loc: {
                                    start: {
                                      line: 6,
                                      column: 34
                                    },
                                    end: {
                                      line: 6,
                                      column: 38
                                    }
                                  }
                                },
                                property: {
                                  type: "Identifier",
                                  start: 92,
                                  end: 93,
                                  loc: {
                                    start: {
                                      line: 6,
                                      column: 39
                                    },
                                    end: {
                                      line: 6,
                                      column: 40
                                    }
                                  },
                                  name: "x"
                                },
                                computed: false,
                                optional: false
                              }
                            ],
                            optional: false
                          }
                        }
                      ],
                      kind: "const"
                    },
                    {
                      type: "ExpressionStatement",
                      start: 101,
                      end: 115,
                      loc: {
                        start: {
                          line: 7,
                          column: 6
                        },
                        end: {
                          line: 7,
                          column: 20
                        }
                      },
                      expression: {
                        type: "AssignmentExpression",
                        start: 101,
                        end: 115,
                        loc: {
                          start: {
                            line: 7,
                            column: 6
                          },
                          end: {
                            line: 7,
                            column: 20
                          }
                        },
                        operator: "=",
                        left: {
                          type: "MemberExpression",
                          start: 101,
                          end: 107,
                          loc: {
                            start: {
                              line: 7,
                              column: 6
                            },
                            end: {
                              line: 7,
                              column: 12
                            }
                          },
                          object: {
                            type: "ThisExpression",
                            start: 101,
                            end: 105,
                            loc: {
                              start: {
                                line: 7,
                                column: 6
                              },
                              end: {
                                line: 7,
                                column: 10
                              }
                            }
                          },
                          property: {
                            type: "Identifier",
                            start: 106,
                            end: 107,
                            loc: {
                              start: {
                                line: 7,
                                column: 11
                              },
                              end: {
                                line: 7,
                                column: 12
                              }
                            },
                            name: "y"
                          },
                          computed: false,
                          optional: false
                        },
                        right: {
                          type: "MemberExpression",
                          start: 110,
                          end: 115,
                          loc: {
                            start: {
                              line: 7,
                              column: 15
                            },
                            end: {
                              line: 7,
                              column: 20
                            }
                          },
                          object: {
                            type: "Identifier",
                            start: 110,
                            end: 113,
                            loc: {
                              start: {
                                line: 7,
                                column: 15
                              },
                              end: {
                                line: 7,
                                column: 18
                              }
                            },
                            name: "obj"
                          },
                          property: {
                            type: "Identifier",
                            start: 114,
                            end: 115,
                            loc: {
                              start: {
                                line: 7,
                                column: 19
                              },
                              end: {
                                line: 7,
                                column: 20
                              }
                            },
                            name: "y"
                          },
                          computed: false,
                          optional: false
                        }
                      }
                    },
                    {
                      type: "ExpressionStatement",
                      start: 122,
                      end: 136,
                      loc: {
                        start: {
                          line: 8,
                          column: 6
                        },
                        end: {
                          line: 8,
                          column: 20
                        }
                      },
                      expression: {
                        type: "AssignmentExpression",
                        start: 122,
                        end: 136,
                        loc: {
                          start: {
                            line: 8,
                            column: 6
                          },
                          end: {
                            line: 8,
                            column: 20
                          }
                        },
                        operator: "=",
                        left: {
                          type: "MemberExpression",
                          start: 122,
                          end: 128,
                          loc: {
                            start: {
                              line: 8,
                              column: 6
                            },
                            end: {
                              line: 8,
                              column: 12
                            }
                          },
                          object: {
                            type: "ThisExpression",
                            start: 122,
                            end: 126,
                            loc: {
                              start: {
                                line: 8,
                                column: 6
                              },
                              end: {
                                line: 8,
                                column: 10
                              }
                            }
                          },
                          property: {
                            type: "Identifier",
                            start: 127,
                            end: 128,
                            loc: {
                              start: {
                                line: 8,
                                column: 11
                              },
                              end: {
                                line: 8,
                                column: 12
                              }
                            },
                            name: "z"
                          },
                          computed: false,
                          optional: false
                        },
                        right: {
                          type: "MemberExpression",
                          start: 131,
                          end: 136,
                          loc: {
                            start: {
                              line: 8,
                              column: 15
                            },
                            end: {
                              line: 8,
                              column: 20
                            }
                          },
                          object: {
                            type: "Identifier",
                            start: 131,
                            end: 134,
                            loc: {
                              start: {
                                line: 8,
                                column: 15
                              },
                              end: {
                                line: 8,
                                column: 18
                              }
                            },
                            name: "obj"
                          },
                          property: {
                            type: "Identifier",
                            start: 135,
                            end: 136,
                            loc: {
                              start: {
                                line: 8,
                                column: 19
                              },
                              end: {
                                line: 8,
                                column: 20
                              }
                            },
                            name: "z"
                          },
                          computed: false,
                          optional: false
                        }
                      }
                    }
                  ]
                },
                handler: {
                  type: "CatchClause",
                  start: 147,
                  end: 194,
                  loc: {
                    start: {
                      line: 10,
                      column: 4
                    },
                    end: {
                      line: 13,
                      column: 5
                    }
                  },
                  param: null,
                  body: {
                    type: "BlockStatement",
                    start: 153,
                    end: 194,
                    loc: {
                      start: {
                        line: 10,
                        column: 10
                      },
                      end: {
                        line: 13,
                        column: 5
                      }
                    },
                    body: [
                      {
                        type: "ExpressionStatement",
                        start: 161,
                        end: 171,
                        loc: {
                          start: {
                            line: 11,
                            column: 6
                          },
                          end: {
                            line: 11,
                            column: 16
                          }
                        },
                        expression: {
                          type: "AssignmentExpression",
                          start: 161,
                          end: 171,
                          loc: {
                            start: {
                              line: 11,
                              column: 6
                            },
                            end: {
                              line: 11,
                              column: 16
                            }
                          },
                          operator: "=",
                          left: {
                            type: "MemberExpression",
                            start: 161,
                            end: 167,
                            loc: {
                              start: {
                                line: 11,
                                column: 6
                              },
                              end: {
                                line: 11,
                                column: 12
                              }
                            },
                            object: {
                              type: "ThisExpression",
                              start: 161,
                              end: 165,
                              loc: {
                                start: {
                                  line: 11,
                                  column: 6
                                },
                                end: {
                                  line: 11,
                                  column: 10
                                }
                              }
                            },
                            property: {
                              type: "Identifier",
                              start: 166,
                              end: 167,
                              loc: {
                                start: {
                                  line: 11,
                                  column: 11
                                },
                                end: {
                                  line: 11,
                                  column: 12
                                }
                              },
                              name: "y"
                            },
                            computed: false,
                            optional: false
                          },
                          right: {
                            type: "Literal",
                            start: 170,
                            end: 171,
                            loc: {
                              start: {
                                line: 11,
                                column: 15
                              },
                              end: {
                                line: 11,
                                column: 16
                              }
                            },
                            value: 0,
                            raw: "0"
                          }
                        }
                      },
                      {
                        type: "ExpressionStatement",
                        start: 178,
                        end: 188,
                        loc: {
                          start: {
                            line: 12,
                            column: 6
                          },
                          end: {
                            line: 12,
                            column: 16
                          }
                        },
                        expression: {
                          type: "AssignmentExpression",
                          start: 178,
                          end: 188,
                          loc: {
                            start: {
                              line: 12,
                              column: 6
                            },
                            end: {
                              line: 12,
                              column: 16
                            }
                          },
                          operator: "=",
                          left: {
                            type: "MemberExpression",
                            start: 178,
                            end: 184,
                            loc: {
                              start: {
                                line: 12,
                                column: 6
                              },
                              end: {
                                line: 12,
                                column: 12
                              }
                            },
                            object: {
                              type: "ThisExpression",
                              start: 178,
                              end: 182,
                              loc: {
                                start: {
                                  line: 12,
                                  column: 6
                                },
                                end: {
                                  line: 12,
                                  column: 10
                                }
                              }
                            },
                            property: {
                              type: "Identifier",
                              start: 183,
                              end: 184,
                              loc: {
                                start: {
                                  line: 12,
                                  column: 11
                                },
                                end: {
                                  line: 12,
                                  column: 12
                                }
                              },
                              name: "z"
                            },
                            computed: false,
                            optional: false
                          },
                          right: {
                            type: "Literal",
                            start: 187,
                            end: 188,
                            loc: {
                              start: {
                                line: 12,
                                column: 15
                              },
                              end: {
                                line: 12,
                                column: 16
                              }
                            },
                            value: 0,
                            raw: "0"
                          }
                        }
                      }
                    ]
                  }
                },
                finalizer: null
              }
            ]
          }
        ]
      }
    }
  ]
},  {ecmaVersion: 13, locations: true})

test(`class C {
  static y
  static #z
  static {
    const obj = {}
    this.y = obj.y
    this.#z = obj.z
  }
}`, {
  type: "Program",
  start: 0,
  end: 107,
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 9,
      column: 1
    }
  },
  body: [
    {
      type: "ClassDeclaration",
      start: 0,
      end: 107,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 9,
          column: 1
        }
      },
      id: {
        type: "Identifier",
        start: 6,
        end: 7,
        loc: {
          start: {
            line: 1,
            column: 6
          },
          end: {
            line: 1,
            column: 7
          }
        },
        name: "C"
      },
      superClass: null,
      body: {
        type: "ClassBody",
        start: 8,
        end: 107,
        loc: {
          start: {
            line: 1,
            column: 8
          },
          end: {
            line: 9,
            column: 1
          }
        },
        body: [
          {
            type: "PropertyDefinition",
            start: 12,
            end: 20,
            loc: {
              start: {
                line: 2,
                column: 2
              },
              end: {
                line: 2,
                column: 10
              }
            },
            static: true,
            computed: false,
            key: {
              type: "Identifier",
              start: 19,
              end: 20,
              loc: {
                start: {
                  line: 2,
                  column: 9
                },
                end: {
                  line: 2,
                  column: 10
                }
              },
              name: "y"
            },
            value: null
          },
          {
            type: "PropertyDefinition",
            start: 23,
            end: 32,
            loc: {
              start: {
                line: 3,
                column: 2
              },
              end: {
                line: 3,
                column: 11
              }
            },
            static: true,
            computed: false,
            key: {
              type: "PrivateIdentifier",
              start: 30,
              end: 32,
              loc: {
                start: {
                  line: 3,
                  column: 9
                },
                end: {
                  line: 3,
                  column: 11
                }
              },
              name: "z"
            },
            value: null
          },
          {
            type: "StaticBlock",
            start: 35,
            end: 105,
            loc: {
              start: {
                line: 4,
                column: 2
              },
              end: {
                line: 8,
                column: 3
              }
            },
            body: [
              {
                type: "VariableDeclaration",
                start: 48,
                end: 62,
                loc: {
                  start: {
                    line: 5,
                    column: 4
                  },
                  end: {
                    line: 5,
                    column: 18
                  }
                },
                declarations: [
                  {
                    type: "VariableDeclarator",
                    start: 54,
                    end: 62,
                    loc: {
                      start: {
                        line: 5,
                        column: 10
                      },
                      end: {
                        line: 5,
                        column: 18
                      }
                    },
                    id: {
                      type: "Identifier",
                      start: 54,
                      end: 57,
                      loc: {
                        start: {
                          line: 5,
                          column: 10
                        },
                        end: {
                          line: 5,
                          column: 13
                        }
                      },
                      name: "obj"
                    },
                    init: {
                      type: "ObjectExpression",
                      start: 60,
                      end: 62,
                      loc: {
                        start: {
                          line: 5,
                          column: 16
                        },
                        end: {
                          line: 5,
                          column: 18
                        }
                      },
                      properties: []
                    }
                  }
                ],
                kind: "const"
              },
              {
                type: "ExpressionStatement",
                start: 67,
                end: 81,
                loc: {
                  start: {
                    line: 6,
                    column: 4
                  },
                  end: {
                    line: 6,
                    column: 18
                  }
                },
                expression: {
                  type: "AssignmentExpression",
                  start: 67,
                  end: 81,
                  loc: {
                    start: {
                      line: 6,
                      column: 4
                    },
                    end: {
                      line: 6,
                      column: 18
                    }
                  },
                  operator: "=",
                  left: {
                    type: "MemberExpression",
                    start: 67,
                    end: 73,
                    loc: {
                      start: {
                        line: 6,
                        column: 4
                      },
                      end: {
                        line: 6,
                        column: 10
                      }
                    },
                    object: {
                      type: "ThisExpression",
                      start: 67,
                      end: 71,
                      loc: {
                        start: {
                          line: 6,
                          column: 4
                        },
                        end: {
                          line: 6,
                          column: 8
                        }
                      }
                    },
                    property: {
                      type: "Identifier",
                      start: 72,
                      end: 73,
                      loc: {
                        start: {
                          line: 6,
                          column: 9
                        },
                        end: {
                          line: 6,
                          column: 10
                        }
                      },
                      name: "y"
                    },
                    computed: false,
                    optional: false
                  },
                  right: {
                    type: "MemberExpression",
                    start: 76,
                    end: 81,
                    loc: {
                      start: {
                        line: 6,
                        column: 13
                      },
                      end: {
                        line: 6,
                        column: 18
                      }
                    },
                    object: {
                      type: "Identifier",
                      start: 76,
                      end: 79,
                      loc: {
                        start: {
                          line: 6,
                          column: 13
                        },
                        end: {
                          line: 6,
                          column: 16
                        }
                      },
                      name: "obj"
                    },
                    property: {
                      type: "Identifier",
                      start: 80,
                      end: 81,
                      loc: {
                        start: {
                          line: 6,
                          column: 17
                        },
                        end: {
                          line: 6,
                          column: 18
                        }
                      },
                      name: "y"
                    },
                    computed: false,
                    optional: false
                  }
                }
              },
              {
                type: "ExpressionStatement",
                start: 86,
                end: 101,
                loc: {
                  start: {
                    line: 7,
                    column: 4
                  },
                  end: {
                    line: 7,
                    column: 19
                  }
                },
                expression: {
                  type: "AssignmentExpression",
                  start: 86,
                  end: 101,
                  loc: {
                    start: {
                      line: 7,
                      column: 4
                    },
                    end: {
                      line: 7,
                      column: 19
                    }
                  },
                  operator: "=",
                  left: {
                    type: "MemberExpression",
                    start: 86,
                    end: 93,
                    loc: {
                      start: {
                        line: 7,
                        column: 4
                      },
                      end: {
                        line: 7,
                        column: 11
                      }
                    },
                    object: {
                      type: "ThisExpression",
                      start: 86,
                      end: 90,
                      loc: {
                        start: {
                          line: 7,
                          column: 4
                        },
                        end: {
                          line: 7,
                          column: 8
                        }
                      }
                    },
                    property: {
                      type: "PrivateIdentifier",
                      start: 91,
                      end: 93,
                      loc: {
                        start: {
                          line: 7,
                          column: 9
                        },
                        end: {
                          line: 7,
                          column: 11
                        }
                      },
                      name: "z"
                    },
                    computed: false,
                    optional: false
                  },
                  right: {
                    type: "MemberExpression",
                    start: 96,
                    end: 101,
                    loc: {
                      start: {
                        line: 7,
                        column: 14
                      },
                      end: {
                        line: 7,
                        column: 19
                      }
                    },
                    object: {
                      type: "Identifier",
                      start: 96,
                      end: 99,
                      loc: {
                        start: {
                          line: 7,
                          column: 14
                        },
                        end: {
                          line: 7,
                          column: 17
                        }
                      },
                      name: "obj"
                    },
                    property: {
                      type: "Identifier",
                      start: 100,
                      end: 101,
                      loc: {
                        start: {
                          line: 7,
                          column: 18
                        },
                        end: {
                          line: 7,
                          column: 19
                        }
                      },
                      name: "z"
                    },
                    computed: false,
                    optional: false
                  }
                }
              }
            ]
          }
        ]
      }
    }
  ],
}, {ecmaVersion: 13, locations: true})

test(`let zRead
class C {
  static #z
  static {
    zRead = () => this.#z
  }
}`, {
  type: "Program",
  start: 0,
  end: 74,
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 7,
      column: 1
    }
  },
  body: [
    {
      type: "VariableDeclaration",
      start: 0,
      end: 9,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 9
        }
      },
      declarations: [
        {
          type: "VariableDeclarator",
          start: 4,
          end: 9,
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 9
            }
          },
          id: {
            type: "Identifier",
            start: 4,
            end: 9,
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 9
              }
            },
            name: "zRead"
          },
          init: null
        }
      ],
      kind: "let"
    },
    {
      type: "ClassDeclaration",
      start: 10,
      end: 74,
      loc: {
        start: {
          line: 2,
          column: 0
        },
        end: {
          line: 7,
          column: 1
        }
      },
      id: {
        type: "Identifier",
        start: 16,
        end: 17,
        loc: {
          start: {
            line: 2,
            column: 6
          },
          end: {
            line: 2,
            column: 7
          }
        },
        name: "C"
      },
      superClass: null,
      body: {
        type: "ClassBody",
        start: 18,
        end: 74,
        loc: {
          start: {
            line: 2,
            column: 8
          },
          end: {
            line: 7,
            column: 1
          }
        },
        body: [
          {
            type: "PropertyDefinition",
            start: 22,
            end: 31,
            loc: {
              start: {
                line: 3,
                column: 2
              },
              end: {
                line: 3,
                column: 11
              }
            },
            static: true,
            computed: false,
            key: {
              type: "PrivateIdentifier",
              start: 29,
              end: 31,
              loc: {
                start: {
                  line: 3,
                  column: 9
                },
                end: {
                  line: 3,
                  column: 11
                }
              },
              name: "z"
            },
            value: null
          },
          {
            type: "StaticBlock",
            start: 34,
            end: 72,
            loc: {
              start: {
                line: 4,
                column: 2
              },
              end: {
                line: 6,
                column: 3
              }
            },
            body: [
              {
                type: "ExpressionStatement",
                start: 47,
                end: 68,
                loc: {
                  start: {
                    line: 5,
                    column: 4
                  },
                  end: {
                    line: 5,
                    column: 25
                  }
                },
                expression: {
                  type: "AssignmentExpression",
                  start: 47,
                  end: 68,
                  loc: {
                    start: {
                      line: 5,
                      column: 4
                    },
                    end: {
                      line: 5,
                      column: 25
                    }
                  },
                  operator: "=",
                  left: {
                    type: "Identifier",
                    start: 47,
                    end: 52,
                    loc: {
                      start: {
                        line: 5,
                        column: 4
                      },
                      end: {
                        line: 5,
                        column: 9
                      }
                    },
                    name: "zRead"
                  },
                  right: {
                    type: "ArrowFunctionExpression",
                    start: 55,
                    end: 68,
                    loc: {
                      start: {
                        line: 5,
                        column: 12
                      },
                      end: {
                        line: 5,
                        column: 25
                      }
                    },
                    id: null,
                    expression: true,
                    generator: false,
                    async: false,
                    params: [],
                    body: {
                      type: "MemberExpression",
                      start: 61,
                      end: 68,
                      loc: {
                        start: {
                          line: 5,
                          column: 18
                        },
                        end: {
                          line: 5,
                          column: 25
                        }
                      },
                      object: {
                        type: "ThisExpression",
                        start: 61,
                        end: 65,
                        loc: {
                          start: {
                            line: 5,
                            column: 18
                          },
                          end: {
                            line: 5,
                            column: 22
                          }
                        }
                      },
                      property: {
                        type: "PrivateIdentifier",
                        start: 66,
                        end: 68,
                        loc: {
                          start: {
                            line: 5,
                            column: 23
                          },
                          end: {
                            line: 5,
                            column: 25
                          }
                        },
                        name: "z"
                      },
                      computed: false,
                      optional: false
                    }
                  }
                }
              }
            ]
          }
        ]
      }
    }
  ]
}, {ecmaVersion: 13, locations: true})

test(`let zRead
class C {
  static #z
  static {
    zRead = (obj) => obj.#z
  }
}
zRead(new C())`, {
  type: "Program",
  start: 0,
  end: 91,
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 8,
      column: 14
    }
  },
  body: [
    {
      type: "VariableDeclaration",
      start: 0,
      end: 9,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 9
        }
      },
      declarations: [
        {
          type: "VariableDeclarator",
          start: 4,
          end: 9,
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 9
            }
          },
          id: {
            type: "Identifier",
            start: 4,
            end: 9,
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 9
              }
            },
            name: "zRead"
          },
          init: null
        }
      ],
      kind: "let"
    },
    {
      type: "ClassDeclaration",
      start: 10,
      end: 76,
      loc: {
        start: {
          line: 2,
          column: 0
        },
        end: {
          line: 7,
          column: 1
        }
      },
      id: {
        type: "Identifier",
        start: 16,
        end: 17,
        loc: {
          start: {
            line: 2,
            column: 6
          },
          end: {
            line: 2,
            column: 7
          }
        },
        name: "C"
      },
      superClass: null,
      body: {
        type: "ClassBody",
        start: 18,
        end: 76,
        loc: {
          start: {
            line: 2,
            column: 8
          },
          end: {
            line: 7,
            column: 1
          }
        },
        body: [
          {
            type: "PropertyDefinition",
            start: 22,
            end: 31,
            loc: {
              start: {
                line: 3,
                column: 2
              },
              end: {
                line: 3,
                column: 11
              }
            },
            static: true,
            computed: false,
            key: {
              type: "PrivateIdentifier",
              start: 29,
              end: 31,
              loc: {
                start: {
                  line: 3,
                  column: 9
                },
                end: {
                  line: 3,
                  column: 11
                }
              },
              name: "z"
            },
            value: null
          },
          {
            type: "StaticBlock",
            start: 34,
            end: 74,
            loc: {
              start: {
                line: 4,
                column: 2
              },
              end: {
                line: 6,
                column: 3
              }
            },
            body: [
              {
                type: "ExpressionStatement",
                start: 47,
                end: 70,
                loc: {
                  start: {
                    line: 5,
                    column: 4
                  },
                  end: {
                    line: 5,
                    column: 27
                  }
                },
                expression: {
                  type: "AssignmentExpression",
                  start: 47,
                  end: 70,
                  loc: {
                    start: {
                      line: 5,
                      column: 4
                    },
                    end: {
                      line: 5,
                      column: 27
                    }
                  },
                  operator: "=",
                  left: {
                    type: "Identifier",
                    start: 47,
                    end: 52,
                    loc: {
                      start: {
                        line: 5,
                        column: 4
                      },
                      end: {
                        line: 5,
                        column: 9
                      }
                    },
                    name: "zRead"
                  },
                  right: {
                    type: "ArrowFunctionExpression",
                    start: 55,
                    end: 70,
                    loc: {
                      start: {
                        line: 5,
                        column: 12
                      },
                      end: {
                        line: 5,
                        column: 27
                      }
                    },
                    id: null,
                    expression: true,
                    generator: false,
                    async: false,
                    params: [
                      {
                        type: "Identifier",
                        start: 56,
                        end: 59,
                        loc: {
                          start: {
                            line: 5,
                            column: 13
                          },
                          end: {
                            line: 5,
                            column: 16
                          }
                        },
                        name: "obj"
                      }
                    ],
                    body: {
                      type: "MemberExpression",
                      start: 64,
                      end: 70,
                      loc: {
                        start: {
                          line: 5,
                          column: 21
                        },
                        end: {
                          line: 5,
                          column: 27
                        }
                      },
                      object: {
                        type: "Identifier",
                        start: 64,
                        end: 67,
                        loc: {
                          start: {
                            line: 5,
                            column: 21
                          },
                          end: {
                            line: 5,
                            column: 24
                          }
                        },
                        name: "obj"
                      },
                      property: {
                        type: "PrivateIdentifier",
                        start: 68,
                        end: 70,
                        loc: {
                          start: {
                            line: 5,
                            column: 25
                          },
                          end: {
                            line: 5,
                            column: 27
                          }
                        },
                        name: "z"
                      },
                      computed: false,
                      optional: false
                    }
                  }
                }
              }
            ]
          }
        ]
      }
    },
    {
      type: "ExpressionStatement",
      start: 77,
      end: 91,
      loc: {
        start: {
          line: 8,
          column: 0
        },
        end: {
          line: 8,
          column: 14
        }
      },
      expression: {
        type: "CallExpression",
        start: 77,
        end: 91,
        loc: {
          start: {
            line: 8,
            column: 0
          },
          end: {
            line: 8,
            column: 14
          }
        },
        callee: {
          type: "Identifier",
          start: 77,
          end: 82,
          loc: {
            start: {
              line: 8,
              column: 0
            },
            end: {
              line: 8,
              column: 5
            }
          },
          name: "zRead"
        },
        arguments: [
          {
            type: "NewExpression",
            start: 83,
            end: 90,
            loc: {
              start: {
                line: 8,
                column: 6
              },
              end: {
                line: 8,
                column: 13
              }
            },
            callee: {
              type: "Identifier",
              start: 87,
              end: 88,
              loc: {
                start: {
                  line: 8,
                  column: 10
                },
                end: {
                  line: 8,
                  column: 11
                }
              },
              name: "C"
            },
            arguments: []
          }
        ],
        optional: false
      }
    }
  ]
},  {ecmaVersion: 13, locations: true})

testFail(`class C {
  static #z
  static {
    this.#y = {}
  }
}`, "Private field '#y' must be declared in an enclosing class (4:9)", {ecmaVersion: 13})

testFail(`let zRead
class C {
  static #z
  static {
    zRead = () => this.#y
  }
}` ,"Private field '#y' must be declared in an enclosing class (5:23)", {ecmaVersion: 13})

// Class fields private in

test(`class C {
  #brand;

  #method() {}

  get #getter() {}

  static isC(obj) {
    return #brand in obj && #method in obj && #getter in obj;
  }
}`, {
  type: "Program",
  start: 0,
  end: 144,
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 11,
      column: 1
    }
  },
  body: [
    {
      type: "ClassDeclaration",
      start: 0,
      end: 144,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 11,
          column: 1
        }
      },
      id: {
        type: "Identifier",
        start: 6,
        end: 7,
        loc: {
          start: {
            line: 1,
            column: 6
          },
          end: {
            line: 1,
            column: 7
          }
        },
        name: "C"
      },
      superClass: null,
      body: {
        type: "ClassBody",
        start: 8,
        end: 144,
        loc: {
          start: {
            line: 1,
            column: 8
          },
          end: {
            line: 11,
            column: 1
          }
        },
        body: [
          {
            type: "PropertyDefinition",
            start: 12,
            end: 19,
            loc: {
              start: {
                line: 2,
                column: 2
              },
              end: {
                line: 2,
                column: 9
              }
            },
            static: false,
            computed: false,
            key: {
              type: "PrivateIdentifier",
              start: 12,
              end: 18,
              loc: {
                start: {
                  line: 2,
                  column: 2
                },
                end: {
                  line: 2,
                  column: 8
                }
              },
              name: "brand"
            },
            value: null
          },
          {
            type: "MethodDefinition",
            start: 23,
            end: 35,
            loc: {
              start: {
                line: 4,
                column: 2
              },
              end: {
                line: 4,
                column: 14
              }
            },
            static: false,
            computed: false,
            key: {
              type: "PrivateIdentifier",
              start: 23,
              end: 30,
              loc: {
                start: {
                  line: 4,
                  column: 2
                },
                end: {
                  line: 4,
                  column: 9
                }
              },
              name: "method"
            },
            kind: "method",
            value: {
              type: "FunctionExpression",
              start: 30,
              end: 35,
              loc: {
                start: {
                  line: 4,
                  column: 9
                },
                end: {
                  line: 4,
                  column: 14
                }
              },
              id: null,
              expression: false,
              generator: false,
              async: false,
              params: [],
              body: {
                type: "BlockStatement",
                start: 33,
                end: 35,
                loc: {
                  start: {
                    line: 4,
                    column: 12
                  },
                  end: {
                    line: 4,
                    column: 14
                  }
                },
                body: []
              }
            }
          },
          {
            type: "MethodDefinition",
            start: 39,
            end: 55,
            loc: {
              start: {
                line: 6,
                column: 2
              },
              end: {
                line: 6,
                column: 18
              }
            },
            static: false,
            computed: false,
            key: {
              type: "PrivateIdentifier",
              start: 43,
              end: 50,
              loc: {
                start: {
                  line: 6,
                  column: 6
                },
                end: {
                  line: 6,
                  column: 13
                }
              },
              name: "getter"
            },
            kind: "get",
            value: {
              type: "FunctionExpression",
              start: 50,
              end: 55,
              loc: {
                start: {
                  line: 6,
                  column: 13
                },
                end: {
                  line: 6,
                  column: 18
                }
              },
              id: null,
              expression: false,
              generator: false,
              async: false,
              params: [],
              body: {
                type: "BlockStatement",
                start: 53,
                end: 55,
                loc: {
                  start: {
                    line: 6,
                    column: 16
                  },
                  end: {
                    line: 6,
                    column: 18
                  }
                },
                body: []
              }
            }
          },
          {
            type: "MethodDefinition",
            start: 59,
            end: 142,
            loc: {
              start: {
                line: 8,
                column: 2
              },
              end: {
                line: 10,
                column: 3
              }
            },
            static: true,
            computed: false,
            key: {
              type: "Identifier",
              start: 66,
              end: 69,
              loc: {
                start: {
                  line: 8,
                  column: 9
                },
                end: {
                  line: 8,
                  column: 12
                }
              },
              name: "isC"
            },
            kind: "method",
            value: {
              type: "FunctionExpression",
              start: 69,
              end: 142,
              loc: {
                start: {
                  line: 8,
                  column: 12
                },
                end: {
                  line: 10,
                  column: 3
                }
              },
              id: null,
              expression: false,
              generator: false,
              async: false,
              params: [
                {
                  type: "Identifier",
                  start: 70,
                  end: 73,
                  loc: {
                    start: {
                      line: 8,
                      column: 13
                    },
                    end: {
                      line: 8,
                      column: 16
                    }
                  },
                  name: "obj"
                }
              ],
              body: {
                type: "BlockStatement",
                start: 75,
                end: 142,
                loc: {
                  start: {
                    line: 8,
                    column: 18
                  },
                  end: {
                    line: 10,
                    column: 3
                  }
                },
                body: [
                  {
                    type: "ReturnStatement",
                    start: 81,
                    end: 138,
                    loc: {
                      start: {
                        line: 9,
                        column: 4
                      },
                      end: {
                        line: 9,
                        column: 61
                      }
                    },
                    argument: {
                      type: "LogicalExpression",
                      start: 88,
                      end: 137,
                      loc: {
                        start: {
                          line: 9,
                          column: 11
                        },
                        end: {
                          line: 9,
                          column: 60
                        }
                      },
                      left: {
                        type: "LogicalExpression",
                        start: 88,
                        end: 119,
                        loc: {
                          start: {
                            line: 9,
                            column: 11
                          },
                          end: {
                            line: 9,
                            column: 42
                          }
                        },
                        left: {
                          type: "BinaryExpression",
                          start: 88,
                          end: 101,
                          loc: {
                            start: {
                              line: 9,
                              column: 11
                            },
                            end: {
                              line: 9,
                              column: 24
                            }
                          },
                          left: {
                            type: "PrivateIdentifier",
                            start: 88,
                            end: 94,
                            loc: {
                              start: {
                                line: 9,
                                column: 11
                              },
                              end: {
                                line: 9,
                                column: 17
                              }
                            },
                            name: "brand"
                          },
                          operator: "in",
                          right: {
                            type: "Identifier",
                            start: 98,
                            end: 101,
                            loc: {
                              start: {
                                line: 9,
                                column: 21
                              },
                              end: {
                                line: 9,
                                column: 24
                              }
                            },
                            name: "obj"
                          }
                        },
                        operator: "&&",
                        right: {
                          type: "BinaryExpression",
                          start: 105,
                          end: 119,
                          loc: {
                            start: {
                              line: 9,
                              column: 28
                            },
                            end: {
                              line: 9,
                              column: 42
                            }
                          },
                          left: {
                            type: "PrivateIdentifier",
                            start: 105,
                            end: 112,
                            loc: {
                              start: {
                                line: 9,
                                column: 28
                              },
                              end: {
                                line: 9,
                                column: 35
                              }
                            },
                            name: "method"
                          },
                          operator: "in",
                          right: {
                            type: "Identifier",
                            start: 116,
                            end: 119,
                            loc: {
                              start: {
                                line: 9,
                                column: 39
                              },
                              end: {
                                line: 9,
                                column: 42
                              }
                            },
                            name: "obj"
                          }
                        }
                      },
                      operator: "&&",
                      right: {
                        type: "BinaryExpression",
                        start: 123,
                        end: 137,
                        loc: {
                          start: {
                            line: 9,
                            column: 46
                          },
                          end: {
                            line: 9,
                            column: 60
                          }
                        },
                        left: {
                          type: "PrivateIdentifier",
                          start: 123,
                          end: 130,
                          loc: {
                            start: {
                              line: 9,
                              column: 46
                            },
                            end: {
                              line: 9,
                              column: 53
                            }
                          },
                          name: "getter"
                        },
                        operator: "in",
                        right: {
                          type: "Identifier",
                          start: 134,
                          end: 137,
                          loc: {
                            start: {
                              line: 9,
                              column: 57
                            },
                            end: {
                              line: 9,
                              column: 60
                            }
                          },
                          name: "obj"
                        }
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
  ]
},{ ecmaVersion: 13, locations: true })

testFail(`class C {
  #brand;

  static isC(obj) {
    return #brand > obj;
  }
}`, 'Unexpected token (5:18)', { ecmaVersion: 13 })

testFail(`class C {
  #brand;

  static isC(obj) {
    return obj >>> #brand in obj;
  }
}`, 'Private identifier can only be left side of binary expression (5:19)', { ecmaVersion: 13 })

testFail(`class C {
  #brand;

  static isC(obj) {
    return #brand in #brand in obj;
  }
}`, 'Private identifier can only be left side of binary expression (5:21)', { ecmaVersion: 13 })
