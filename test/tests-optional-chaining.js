
if (typeof exports !== "undefined") {
  var driver = require("./driver.js");
  var test = driver.test, testFail = driver.testFail;
}

// Simple
test("obj?.foo", {
  "type": "Program",
  "start": 0,
  "end": 8,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 8,
      "expression": {
        "type": "ChainExpression",
        "start": 0,
        "end": 8,
        "expression": {
          "type": "MemberExpression",
          "start": 0,
          "end": 8,
          "object": {
            "type": "Identifier",
            "start": 0,
            "end": 3,
            "name": "obj"
          },
          "property": {
            "type": "Identifier",
            "start": 5,
            "end": 8,
            "name": "foo"
          },
          "computed": false,
          "optional": true
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })
test("obj?.[foo]", {
  "type": "Program",
  "start": 0,
  "end": 10,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 10,
      "expression": {
        "type": "ChainExpression",
        "start": 0,
        "end": 10,
        "expression": {
          "type": "MemberExpression",
          "start": 0,
          "end": 10,
          "object": {
            "type": "Identifier",
            "start": 0,
            "end": 3,
            "name": "obj"
          },
          "property": {
            "type": "Identifier",
            "start": 6,
            "end": 9,
            "name": "foo"
          },
          "computed": true,
          "optional": true
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })
test("obj?.()", {
  "type": "Program",
  "start": 0,
  "end": 7,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 7,
      "expression": {
        "type": "ChainExpression",
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
            "name": "obj"
          },
          "arguments": [],
          "optional": true
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })

// Simple with spacing
test("obj ?. foo", {
  "type": "Program",
  "start": 0,
  "end": 10,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 10,
      "expression": {
        "type": "ChainExpression",
        "start": 0,
        "end": 10,
        "expression": {
          "type": "MemberExpression",
          "start": 0,
          "end": 10,
          "object": {
            "type": "Identifier",
            "start": 0,
            "end": 3,
            "name": "obj"
          },
          "property": {
            "type": "Identifier",
            "start": 7,
            "end": 10,
            "name": "foo"
          },
          "computed": false,
          "optional": true
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })
test("obj ?. [foo]", {
  "type": "Program",
  "start": 0,
  "end": 12,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 12,
      "expression": {
        "type": "ChainExpression",
        "start": 0,
        "end": 12,
        "expression": {
          "type": "MemberExpression",
          "start": 0,
          "end": 12,
          "object": {
            "type": "Identifier",
            "start": 0,
            "end": 3,
            "name": "obj"
          },
          "property": {
            "type": "Identifier",
            "start": 8,
            "end": 11,
            "name": "foo"
          },
          "computed": true,
          "optional": true
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })
test("obj ?. ()", {
  "type": "Program",
  "start": 0,
  "end": 9,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 9,
      "expression": {
        "type": "ChainExpression",
        "start": 0,
        "end": 9,
        "expression": {
          "type": "CallExpression",
          "start": 0,
          "end": 9,
          "callee": {
            "type": "Identifier",
            "start": 0,
            "end": 3,
            "name": "obj"
          },
          "arguments": [],
          "optional": true
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })

// Existing valid syntax
test("obj?.0:.1", {
  "type": "Program",
  "start": 0,
  "end": 9,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 9,
      "expression": {
        "type": "ConditionalExpression",
        "start": 0,
        "end": 9,
        "test": {
          "type": "Identifier",
          "start": 0,
          "end": 3,
          "name": "obj"
        },
        "consequent": {
          "type": "Literal",
          "start": 4,
          "end": 6,
          "value": 0,
          "raw": ".0"
        },
        "alternate": {
          "type": "Literal",
          "start": 7,
          "end": 9,
          "value": 0.1,
          "raw": ".1"
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })

// Chaining
test("obj?.aaa?.bbb", {
  "type": "Program",
  "start": 0,
  "end": 13,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 13,
      "expression": {
        "type": "ChainExpression",
        "start": 0,
        "end": 13,
        "expression": {
          "type": "MemberExpression",
          "start": 0,
          "end": 13,
          "object": {
            "type": "MemberExpression",
            "start": 0,
            "end": 8,
            "object": {
              "type": "Identifier",
              "start": 0,
              "end": 3,
              "name": "obj"
            },
            "property": {
              "type": "Identifier",
              "start": 5,
              "end": 8,
              "name": "aaa"
            },
            "computed": false,
            "optional": true
          },
          "property": {
            "type": "Identifier",
            "start": 10,
            "end": 13,
            "name": "bbb"
          },
          "computed": false,
          "optional": true
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })
test("obj?.aaa.bbb", {
  "type": "Program",
  "start": 0,
  "end": 12,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 12,
      "expression": {
        "type": "ChainExpression",
        "start": 0,
        "end": 12,
        "expression": {
          "type": "MemberExpression",
          "start": 0,
          "end": 12,
          "object": {
            "type": "MemberExpression",
            "start": 0,
            "end": 8,
            "object": {
              "type": "Identifier",
              "start": 0,
              "end": 3,
              "name": "obj"
            },
            "property": {
              "type": "Identifier",
              "start": 5,
              "end": 8,
              "name": "aaa"
            },
            "computed": false,
            "optional": true
          },
          "property": {
            "type": "Identifier",
            "start": 9,
            "end": 12,
            "name": "bbb"
          },
          "computed": false,
          "optional": false
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })
test("(obj?.aaa)?.bbb", {
  "type": "Program",
  "start": 0,
  "end": 15,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 15,
      "expression": {
        "type": "ChainExpression",
        "start": 0,
        "end": 15,
        "expression": {
          "type": "MemberExpression",
          "start": 0,
          "end": 15,
          "object": {
            "type": "ChainExpression",
            "start": 1,
            "end": 9,
            "expression": {
              "type": "MemberExpression",
              "start": 1,
              "end": 9,
              "object": {
                "type": "Identifier",
                "start": 1,
                "end": 4,
                "name": "obj"
              },
              "property": {
                "type": "Identifier",
                "start": 6,
                "end": 9,
                "name": "aaa"
              },
              "computed": false,
              "optional": true
            }
          },
          "property": {
            "type": "Identifier",
            "start": 12,
            "end": 15,
            "name": "bbb"
          },
          "computed": false,
          "optional": true
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })
test("(obj?.aaa).bbb", {
  "type": "Program",
  "start": 0,
  "end": 14,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 14,
      "expression": {
        "type": "MemberExpression",
        "start": 0,
        "end": 14,
        "object": {
          "type": "ChainExpression",
          "start": 1,
          "end": 9,
          "expression": {
            "type": "MemberExpression",
            "start": 1,
            "end": 9,
            "object": {
              "type": "Identifier",
              "start": 1,
              "end": 4,
              "name": "obj"
            },
            "property": {
              "type": "Identifier",
              "start": 6,
              "end": 9,
              "name": "aaa"
            },
            "computed": false,
            "optional": true
          }
        },
        "property": {
          "type": "Identifier",
          "start": 11,
          "end": 14,
          "name": "bbb"
        },
        "computed": false,
        "optional": false
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })
test("(obj?.aaa.bbb).ccc", {
  "type": "Program",
  "start": 0,
  "end": 18,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 18,
      "expression": {
        "type": "MemberExpression",
        "start": 0,
        "end": 18,
        "object": {
          "type": "ChainExpression",
          "start": 1,
          "end": 13,
          "expression": {
            "type": "MemberExpression",
            "start": 1,
            "end": 13,
            "object": {
              "type": "MemberExpression",
              "start": 1,
              "end": 9,
              "object": {
                "type": "Identifier",
                "start": 1,
                "end": 4,
                "name": "obj"
              },
              "property": {
                "type": "Identifier",
                "start": 6,
                "end": 9,
                "name": "aaa"
              },
              "computed": false,
              "optional": true
            },
            "property": {
              "type": "Identifier",
              "start": 10,
              "end": 13,
              "name": "bbb"
            },
            "computed": false,
            "optional": false
          }
        },
        "property": {
          "type": "Identifier",
          "start": 15,
          "end": 18,
          "name": "ccc"
        },
        "computed": false,
        "optional": false
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })

test("func?.()?.bbb", {
  "type": "Program",
  "start": 0,
  "end": 13,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 13,
      "expression": {
        "type": "ChainExpression",
        "start": 0,
        "end": 13,
        "expression": {
          "type": "MemberExpression",
          "start": 0,
          "end": 13,
          "object": {
            "type": "CallExpression",
            "start": 0,
            "end": 8,
            "callee": {
              "type": "Identifier",
              "start": 0,
              "end": 4,
              "name": "func"
            },
            "arguments": [],
            "optional": true
          },
          "property": {
            "type": "Identifier",
            "start": 10,
            "end": 13,
            "name": "bbb"
          },
          "computed": false,
          "optional": true
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })
test("func?.().bbb", {
  "type": "Program",
  "start": 0,
  "end": 12,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 12,
      "expression": {
        "type": "ChainExpression",
        "start": 0,
        "end": 12,
        "expression": {
          "type": "MemberExpression",
          "start": 0,
          "end": 12,
          "object": {
            "type": "CallExpression",
            "start": 0,
            "end": 8,
            "callee": {
              "type": "Identifier",
              "start": 0,
              "end": 4,
              "name": "func"
            },
            "arguments": [],
            "optional": true
          },
          "property": {
            "type": "Identifier",
            "start": 9,
            "end": 12,
            "name": "bbb"
          },
          "computed": false,
          "optional": false
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })
test("(func?.())?.bbb", {
  "type": "Program",
  "start": 0,
  "end": 15,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 15,
      "expression": {
        "type": "ChainExpression",
        "start": 0,
        "end": 15,
        "expression": {
          "type": "MemberExpression",
          "start": 0,
          "end": 15,
          "object": {
            "type": "ChainExpression",
            "start": 1,
            "end": 9,
            "expression": {
              "type": "CallExpression",
              "start": 1,
              "end": 9,
              "callee": {
                "type": "Identifier",
                "start": 1,
                "end": 5,
                "name": "func"
              },
              "arguments": [],
              "optional": true
            }
          },
          "property": {
            "type": "Identifier",
            "start": 12,
            "end": 15,
            "name": "bbb"
          },
          "computed": false,
          "optional": true
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })
test("(func?.()).bbb", {
  "type": "Program",
  "start": 0,
  "end": 14,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 14,
      "expression": {
        "type": "MemberExpression",
        "start": 0,
        "end": 14,
        "object": {
          "type": "ChainExpression",
          "start": 1,
          "end": 9,
          "expression": {
            "type": "CallExpression",
            "start": 1,
            "end": 9,
            "callee": {
              "type": "Identifier",
              "start": 1,
              "end": 5,
              "name": "func"
            },
            "arguments": [],
            "optional": true
          }
        },
        "property": {
          "type": "Identifier",
          "start": 11,
          "end": 14,
          "name": "bbb"
        },
        "computed": false,
        "optional": false
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })

test("obj?.aaa?.()", {
  "type": "Program",
  "start": 0,
  "end": 12,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 12,
      "expression": {
        "type": "ChainExpression",
        "start": 0,
        "end": 12,
        "expression": {
          "type": "CallExpression",
          "start": 0,
          "end": 12,
          "callee": {
            "type": "MemberExpression",
            "start": 0,
            "end": 8,
            "object": {
              "type": "Identifier",
              "start": 0,
              "end": 3,
              "name": "obj"
            },
            "property": {
              "type": "Identifier",
              "start": 5,
              "end": 8,
              "name": "aaa"
            },
            "computed": false,
            "optional": true
          },
          "arguments": [],
          "optional": true
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })
test("obj?.aaa()", {
  "type": "Program",
  "start": 0,
  "end": 10,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 10,
      "expression": {
        "type": "ChainExpression",
        "start": 0,
        "end": 10,
        "expression": {
          "type": "CallExpression",
          "start": 0,
          "end": 10,
          "callee": {
            "type": "MemberExpression",
            "start": 0,
            "end": 8,
            "object": {
              "type": "Identifier",
              "start": 0,
              "end": 3,
              "name": "obj"
            },
            "property": {
              "type": "Identifier",
              "start": 5,
              "end": 8,
              "name": "aaa"
            },
            "computed": false,
            "optional": true
          },
          "arguments": [],
          "optional": false
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })
test("(obj?.aaa)?.()", {
  "type": "Program",
  "start": 0,
  "end": 14,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 14,
      "expression": {
        "type": "ChainExpression",
        "start": 0,
        "end": 14,
        "expression": {
          "type": "CallExpression",
          "start": 0,
          "end": 14,
          "callee": {
            "type": "ChainExpression",
            "start": 1,
            "end": 9,
            "expression": {
              "type": "MemberExpression",
              "start": 1,
              "end": 9,
              "object": {
                "type": "Identifier",
                "start": 1,
                "end": 4,
                "name": "obj"
              },
              "property": {
                "type": "Identifier",
                "start": 6,
                "end": 9,
                "name": "aaa"
              },
              "computed": false,
              "optional": true
            }
          },
          "arguments": [],
          "optional": true
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })
test("(obj?.aaa)()", {
  "type": "Program",
  "start": 0,
  "end": 12,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 12,
      "expression": {
        "type": "CallExpression",
        "start": 0,
        "end": 12,
        "callee": {
          "type": "ChainExpression",
          "start": 1,
          "end": 9,
          "expression": {
            "type": "MemberExpression",
            "start": 1,
            "end": 9,
            "object": {
              "type": "Identifier",
              "start": 1,
              "end": 4,
              "name": "obj"
            },
            "property": {
              "type": "Identifier",
              "start": 6,
              "end": 9,
              "name": "aaa"
            },
            "computed": false,
            "optional": true
          }
        },
        "arguments": [],
        "optional": false
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })

test("delete obj?.foo", {
  "type": "Program",
  "start": 0,
  "end": 15,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 15,
      "expression": {
        "type": "UnaryExpression",
        "start": 0,
        "end": 15,
        "operator": "delete",
        "prefix": true,
        "argument": {
          "type": "ChainExpression",
          "start": 7,
          "end": 15,
          "expression": {
            "type": "MemberExpression",
            "start": 7,
            "end": 15,
            "object": {
              "type": "Identifier",
              "start": 7,
              "end": 10,
              "name": "obj"
            },
            "property": {
              "type": "Identifier",
              "start": 12,
              "end": 15,
              "name": "foo"
            },
            "computed": false,
            "optional": true
          }
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })

// OK if paranthesized.
test("new (obj?.foo)()", {
  "type": "Program",
  "start": 0,
  "end": 16,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 16,
      "expression": {
        "type": "NewExpression",
        "start": 0,
        "end": 16,
        "callee": {
          "type": "ChainExpression",
          "start": 5,
          "end": 13,
          "expression": {
            "type": "MemberExpression",
            "start": 5,
            "end": 13,
            "object": {
              "type": "Identifier",
              "start": 5,
              "end": 8,
              "name": "obj"
            },
            "property": {
              "type": "Identifier",
              "start": 10,
              "end": 13,
              "name": "foo"
            },
            "computed": false,
            "optional": true
          }
        },
        "arguments": []
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })
test("(obj?.foo)`template`", {
  "type": "Program",
  "start": 0,
  "end": 20,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 20,
      "expression": {
        "type": "TaggedTemplateExpression",
        "start": 0,
        "end": 20,
        "tag": {
          "type": "ChainExpression",
          "start": 1,
          "end": 9,
          "expression": {
            "type": "MemberExpression",
            "start": 1,
            "end": 9,
            "object": {
              "type": "Identifier",
              "start": 1,
              "end": 4,
              "name": "obj"
            },
            "property": {
              "type": "Identifier",
              "start": 6,
              "end": 9,
              "name": "foo"
            },
            "computed": false,
            "optional": true
          }
        },
        "quasi": {
          "type": "TemplateLiteral",
          "start": 10,
          "end": 20,
          "expressions": [],
          "quasis": [
            {
              "type": "TemplateElement",
              "start": 11,
              "end": 19,
              "value": {
                "raw": "template",
                "cooked": "template"
              },
              "tail": true
            }
          ]
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })
test("(obj?.foo).bar = 0", {
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
        "start": 0,
        "end": 18,
        "operator": "=",
        "left": {
          "type": "MemberExpression",
          "start": 0,
          "end": 14,
          "object": {
            "type": "ChainExpression",
            "start": 1,
            "end": 9,
            "expression": {
              "type": "MemberExpression",
              "start": 1,
              "end": 9,
              "object": {
                "type": "Identifier",
                "start": 1,
                "end": 4,
                "name": "obj"
              },
              "property": {
                "type": "Identifier",
                "start": 6,
                "end": 9,
                "name": "foo"
              },
              "computed": false,
              "optional": true
            }
          },
          "property": {
            "type": "Identifier",
            "start": 11,
            "end": 14,
            "name": "bar"
          },
          "computed": false,
          "optional": false
        },
        "right": {
          "type": "Literal",
          "start": 17,
          "end": 18,
          "value": 0,
          "raw": "0"
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })
test("(obj?.foo).bar++", {
  "type": "Program",
  "start": 0,
  "end": 16,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 16,
      "expression": {
        "type": "UpdateExpression",
        "start": 0,
        "end": 16,
        "operator": "++",
        "prefix": false,
        "argument": {
          "type": "MemberExpression",
          "start": 0,
          "end": 14,
          "object": {
            "type": "ChainExpression",
            "start": 1,
            "end": 9,
            "expression": {
              "type": "MemberExpression",
              "start": 1,
              "end": 9,
              "object": {
                "type": "Identifier",
                "start": 1,
                "end": 4,
                "name": "obj"
              },
              "property": {
                "type": "Identifier",
                "start": 6,
                "end": 9,
                "name": "foo"
              },
              "computed": false,
              "optional": true
            }
          },
          "property": {
            "type": "Identifier",
            "start": 11,
            "end": 14,
            "name": "bar"
          },
          "computed": false,
          "optional": false
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })
test("for ((obj?.foo).bar of []);", {
  "type": "Program",
  "start": 0,
  "end": 27,
  "body": [
    {
      "type": "ForOfStatement",
      "start": 0,
      "end": 27,
      "await": false,
      "left": {
        "type": "MemberExpression",
        "start": 5,
        "end": 19,
        "object": {
          "type": "ChainExpression",
          "start": 6,
          "end": 14,
          "expression": {
            "type": "MemberExpression",
            "start": 6,
            "end": 14,
            "object": {
              "type": "Identifier",
              "start": 6,
              "end": 9,
              "name": "obj"
            },
            "property": {
              "type": "Identifier",
              "start": 11,
              "end": 14,
              "name": "foo"
            },
            "computed": false,
            "optional": true
          }
        },
        "property": {
          "type": "Identifier",
          "start": 16,
          "end": 19,
          "name": "bar"
        },
        "computed": false,
        "optional": false
      },
      "right": {
        "type": "ArrayExpression",
        "start": 23,
        "end": 25,
        "elements": []
      },
      "body": {
        "type": "EmptyStatement",
        "start": 26,
        "end": 27
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })

// With ParenthesizedExpression
test("(obj?.aaa).bbb", {
  "type": "Program",
  "start": 0,
  "end": 14,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 14,
      "expression": {
        "type": "MemberExpression",
        "start": 0,
        "end": 14,
        "object": {
          "type": "ParenthesizedExpression",
          "start": 0,
          "end": 10,
          "expression": {
            "type": "ChainExpression",
            "start": 1,
            "end": 9,
            "expression": {
              "type": "MemberExpression",
              "start": 1,
              "end": 9,
              "object": {
                "type": "Identifier",
                "start": 1,
                "end": 4,
                "name": "obj"
              },
              "property": {
                "type": "Identifier",
                "start": 6,
                "end": 9,
                "name": "aaa"
              },
              "computed": false,
              "optional": true
            }
          }
        },
        "property": {
          "type": "Identifier",
          "start": 11,
          "end": 14,
          "name": "bbb"
        },
        "computed": false,
        "optional": false
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11, preserveParens: true })

// No ChainExpression if `callee|object` doesn't contain `?.` even if it's parenthesized.
test("(obj.foo.bar)?.buz", {
  "type": "Program",
  "start": 0,
  "end": 18,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 18,
      "expression": {
        "type": "ChainExpression",
        "start": 0,
        "end": 18,
        "expression": {
          "type": "MemberExpression",
          "start": 0,
          "end": 18,
          "object": {
            "type": "MemberExpression",
            "start": 1,
            "end": 12,
            "object": {
              "type": "MemberExpression",
              "start": 1,
              "end": 8,
              "object": {
                "type": "Identifier",
                "start": 1,
                "end": 4,
                "name": "obj"
              },
              "property": {
                "type": "Identifier",
                "start": 5,
                "end": 8,
                "name": "foo"
              },
              "computed": false,
              "optional": false
            },
            "property": {
              "type": "Identifier",
              "start": 9,
              "end": 12,
              "name": "bar"
            },
            "computed": false,
            "optional": false
          },
          "property": {
            "type": "Identifier",
            "start": 15,
            "end": 18,
            "name": "buz"
          },
          "computed": false,
          "optional": true
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })
test("(obj.foo())?.buz", {
  "type": "Program",
  "start": 0,
  "end": 16,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 16,
      "expression": {
        "type": "ChainExpression",
        "start": 0,
        "end": 16,
        "expression": {
          "type": "MemberExpression",
          "start": 0,
          "end": 16,
          "object": {
            "type": "CallExpression",
            "start": 1,
            "end": 10,
            "callee": {
              "type": "MemberExpression",
              "start": 1,
              "end": 8,
              "object": {
                "type": "Identifier",
                "start": 1,
                "end": 4,
                "name": "obj"
              },
              "property": {
                "type": "Identifier",
                "start": 5,
                "end": 8,
                "name": "foo"
              },
              "computed": false,
              "optional": false
            },
            "arguments": [],
            "optional": false
          },
          "property": {
            "type": "Identifier",
            "start": 13,
            "end": 16,
            "name": "buz"
          },
          "computed": false,
          "optional": true
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })

// With an old ecmaVersion.
testFail("obj?.foo", "Unexpected token (1:4)", { ecmaVersion: 10 })
testFail("obj?.[foo]", "Unexpected token (1:4)", { ecmaVersion: 10 })
testFail("obj?.()", "Unexpected token (1:4)", { ecmaVersion: 10 })

// Syntax errors.
testFail("obj?.0", "Unexpected token (1:6)", { ecmaVersion: 11 })
testFail("async?.() => {}", "Unexpected token (1:10)", { ecmaVersion: 11 })
testFail("new obj?.()", "Optional chaining cannot appear in the callee of new expressions (1:7)", { ecmaVersion: 11 })
testFail("new obj?.foo()", "Optional chaining cannot appear in the callee of new expressions (1:7)", { ecmaVersion: 11 })
testFail("obj?.foo\n`template`", "Optional chaining cannot appear in the tag of tagged template expressions (2:0)", { ecmaVersion: 11 })
testFail("obj?.foo = 0", "Optional chaining cannot appear in left-hand side (1:0)", { ecmaVersion: 11 })
testFail("obj?.foo.bar = 0", "Optional chaining cannot appear in left-hand side (1:0)", { ecmaVersion: 11 })
testFail("obj?.().foo = 0", "Optional chaining cannot appear in left-hand side (1:0)", { ecmaVersion: 11 })
testFail("obj?.foo++", "Optional chaining cannot appear in left-hand side (1:0)", { ecmaVersion: 11 })
testFail("obj?.foo--", "Optional chaining cannot appear in left-hand side (1:0)", { ecmaVersion: 11 })
testFail("++obj?.foo", "Optional chaining cannot appear in left-hand side (1:2)", { ecmaVersion: 11 })
testFail("--obj?.foo", "Optional chaining cannot appear in left-hand side (1:2)", { ecmaVersion: 11 })
testFail("obj?.foo.bar++", "Optional chaining cannot appear in left-hand side (1:0)", { ecmaVersion: 11 })
testFail("for (obj?.foo in {});", "Optional chaining cannot appear in left-hand side (1:5)", { ecmaVersion: 11 })
testFail("for (obj?.foo.bar in {});", "Optional chaining cannot appear in left-hand side (1:5)", { ecmaVersion: 11 })
testFail("for (obj?.foo of []);", "Optional chaining cannot appear in left-hand side (1:5)", { ecmaVersion: 11 })
testFail("for (obj?.foo.bar of []);", "Optional chaining cannot appear in left-hand side (1:5)", { ecmaVersion: 11 })
