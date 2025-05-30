if (typeof exports !== "undefined") {
  var test = require("./driver.js").test
  var testFail = require("./driver.js").testFail
}

// =============================================================================
// NORMAL CASES - Basic functionality and standard usage patterns
// =============================================================================

// --- Basic using declarations ---

// Basic using declaration
test("{ using x = resource; }", {
  "type": "Program",
  "start": 0,
  "end": 23,
  "body": [{
    "type": "BlockStatement",
    "start": 0,
    "end": 23,
    "body": [{
      "type": "VariableDeclaration",
      "start": 2,
      "end": 21,
      "declarations": [{
        "type": "VariableDeclarator",
        "start": 8,
        "end": 20,
        "id": {
          "type": "Identifier",
          "start": 8,
          "end": 9,
          "name": "x"
        },
        "init": {
          "type": "Identifier",
          "start": 12,
          "end": 20,
          "name": "resource"
        }
      }],
      "kind": "using"
    }]
  }],
  "sourceType": "script"
}, {"ecmaVersion": 17});

// Multiple variable declarations
test("{ using a = resource1, b = resource2; }", {
  "type": "Program",
  "start": 0,
  "end": 39,
  "body": [{
    "type": "BlockStatement",
    "start": 0,
    "end": 39,
    "body": [{
      "type": "VariableDeclaration",
      "start": 2,
      "end": 37,
      "declarations": [{
        "type": "VariableDeclarator",
        "start": 8,
        "end": 21,
        "id": {
          "type": "Identifier",
          "start": 8,
          "end": 9,
          "name": "a"
        },
        "init": {
          "type": "Identifier",
          "start": 12,
          "end": 21,
          "name": "resource1"
        }
      }, {
        "type": "VariableDeclarator",
        "start": 23,
        "end": 36,
        "id": {
          "type": "Identifier",
          "start": 23,
          "end": 24,
          "name": "b"
        },
        "init": {
          "type": "Identifier",
          "start": 27,
          "end": 36,
          "name": "resource2"
        }
      }],
      "kind": "using"
    }]
  }],
  "sourceType": "script"
}, {"ecmaVersion": 17});

// Using with array syntax - this should be parsed as member expression assignment using[a, b] = arr
test("{ using [a, b] = arr; }", {
  type: "Program",
  start: 0,
  end: 23,
  body: [{
    type: "BlockStatement",
    start: 0,
    end: 23,
    body: [{
      type: "ExpressionStatement",
      start: 2,
      end: 21,
      expression: {
        type: "AssignmentExpression",
        start: 2,
        end: 20,
        operator: "=",
        left: {
          type: "MemberExpression",
          start: 2,
          end: 14,
          object: {
            type: "Identifier",
            start: 2,
            end: 7,
            name: "using"
          },
          computed: true,
          property: {
            type: "SequenceExpression",
            start: 9,
            end: 13,
            expressions: [
              {
                type: "Identifier",
                start: 9,
                end: 10,
                name: "a"
              },
              {
                type: "Identifier",
                start: 12,
                end: 13,
                name: "b"
              }
            ]
          }
        },
        right: {
          type: "Identifier",
          start: 17,
          end: 20,
          name: "arr"
        }
      }
    }]
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// Top-level using declaration
test("using x = resource;", {
  type: "Program",
  start: 0,
  end: 19,
  body: [{
    type: "VariableDeclaration",
    start: 0,
    end: 19,
    declarations: [{
      type: "VariableDeclarator",
      start: 6,
      end: 18,
      id: {
        type: "Identifier",
        start: 6,
        end: 7,
        name: "x"
      },
      init: {
        type: "Identifier",
        start: 10,
        end: 18,
        name: "resource"
      }
    }],
    kind: "using"
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// --- Await using declarations ---

// Await using declaration tests
test("async function test() { await using x = resource; }", {
  type: "Program",
  start: 0,
  end: 51,
  body: [{
    type: "FunctionDeclaration",
    start: 0,
    end: 51,
    id: {
      type: "Identifier",
      start: 15,
      end: 19,
      name: "test"
    },
    params: [],
    body: {
      type: "BlockStatement",
      start: 22,
      end: 51,
      body: [{
        type: "VariableDeclaration",
        start: 24,
        end: 49,
        declarations: [{
          type: "VariableDeclarator",
          start: 36,
          end: 48,
          id: {
            type: "Identifier",
            start: 36,
            end: 37,
            name: "x"
          },
          init: {
            type: "Identifier",
            start: 40,
            end: 48,
            name: "resource"
          }
        }],
        kind: "await using"
      }]
    },
    generator: false,
    async: true
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// Await using with multiple declarations
test("async function test() { await using a = resource1, b = resource2; }", {
  type: "Program",
  start: 0,
  end: 67,
  body: [{
    type: "FunctionDeclaration",
    start: 0,
    end: 67,
    id: {
      type: "Identifier",
      start: 15,
      end: 19,
      name: "test"
    },
    params: [],
    body: {
      type: "BlockStatement",
      start: 22,
      end: 67,
      body: [{
        type: "VariableDeclaration",
        start: 24,
        end: 65,
        declarations: [{
          type: "VariableDeclarator",
          start: 36,
          end: 49,
          id: {
            type: "Identifier",
            start: 36,
            end: 37,
            name: "a"
          },
          init: {
            type: "Identifier",
            start: 40,
            end: 49,
            name: "resource1"
          }
        }, {
          type: "VariableDeclarator",
          start: 51,
          end: 64,
          id: {
            type: "Identifier",
            start: 51,
            end: 52,
            name: "b"
          },
          init: {
            type: "Identifier",
            start: 55,
            end: 64,
            name: "resource2"
          }
        }],
        kind: "await using"
      }]
    },
    generator: false,
    async: true
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// Await using outside async context - but in block statement should work
test("{ await using x = resource; }", {
  type: "Program",
  start: 0,
  end: 29,
  body: [{
    type: "BlockStatement",
    start: 0,
    end: 29,
    body: [{
      type: "VariableDeclaration",
      start: 2,
      end: 27,
      declarations: [{
        type: "VariableDeclarator",
        start: 14,
        end: 26,
        id: {
          type: "Identifier",
          start: 14,
          end: 15,
          name: "x"
        },
        init: {
          type: "Identifier",
          start: 18,
          end: 26,
          name: "resource"
        }
      }],
      kind: "await using"
    }]
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// Top-level await using - should work in module context
test("await using x = resource;", {
  type: "Program",
  start: 0,
  end: 25,
  body: [{
    type: "VariableDeclaration",
    start: 0,
    end: 25,
    declarations: [{
      type: "VariableDeclarator",
      start: 12,
      end: 24,
      id: {
        type: "Identifier",
        start: 12,
        end: 13,
        name: "x"
      },
      init: {
        type: "Identifier",
        start: 16,
        end: 24,
        name: "resource"
      }
    }],
    kind: "await using"
  }],
  sourceType: "module"
}, {"ecmaVersion": 17, "sourceType": "module"});

// --- Using in different contexts ---

// Using in function
test("function test() { using x = resource; }", {
  type: "Program",
  start: 0,
  end: 39,
  body: [{
    type: "FunctionDeclaration",
    start: 0,
    end: 39,
    id: {
      type: "Identifier",
      start: 9,
      end: 13,
      name: "test"
    },
    params: [],
    body: {
      type: "BlockStatement",
      start: 16,
      end: 39,
      body: [{
        type: "VariableDeclaration",
        start: 18,
        end: 37,
        declarations: [{
          type: "VariableDeclarator",
          start: 24,
          end: 36,
          id: {
            type: "Identifier",
            start: 24,
            end: 25,
            name: "x"
          },
          init: {
            type: "Identifier",
            start: 28,
            end: 36,
            name: "resource"
          }
        }],
        kind: "using"
      }]
    },
    generator: false,
    async: false
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// Using in generator function
test("function* generator() { using x = resource; yield x; }", {
  type: "Program",
  start: 0,
  end: 54,
  body: [{
    type: "FunctionDeclaration",
    start: 0,
    end: 54,
    id: {
      type: "Identifier",
      start: 10,
      end: 19,
      name: "generator"
    },
    params: [],
    body: {
      type: "BlockStatement",
      start: 22,
      end: 54,
      body: [{
        type: "VariableDeclaration",
        start: 24,
        end: 43,
        declarations: [{
          type: "VariableDeclarator",
          start: 30,
          end: 42,
          id: {
            type: "Identifier",
            start: 30,
            end: 31,
            name: "x"
          },
          init: {
            type: "Identifier",
            start: 34,
            end: 42,
            name: "resource"
          }
        }],
        kind: "using"
      }, {
        type: "ExpressionStatement",
        start: 44,
        end: 52,
        expression: {
          type: "YieldExpression",
          start: 44,
          end: 51,
          argument: {
            type: "Identifier",
            start: 50,
            end: 51,
            name: "x"
          },
          delegate: false
        }
      }]
    },
    generator: true,
    async: false
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// Using in async generator function 
test("async function* asyncGenerator() { await using x = resource; yield x; }", {
  type: "Program",
  start: 0,
  end: 71,
  body: [{
    type: "FunctionDeclaration",
    start: 0,
    end: 71,
    id: {
      type: "Identifier",
      start: 16,
      end: 30,
      name: "asyncGenerator"
    },
    params: [],
    body: {
      type: "BlockStatement",
      start: 33,
      end: 71,
      body: [{
        type: "VariableDeclaration",
        start: 35,
        end: 60,
        declarations: [{
          type: "VariableDeclarator",
          start: 47,
          end: 59,
          id: {
            type: "Identifier",
            start: 47,
            end: 48,
            name: "x"
          },
          init: {
            type: "Identifier",
            start: 51,
            end: 59,
            name: "resource"
          }
        }],
        kind: "await using"
      }, {
        type: "ExpressionStatement",
        start: 61,
        end: 69,
        expression: {
          type: "YieldExpression",
          start: 61,
          end: 68,
          argument: {
            type: "Identifier",
            start: 67,
            end: 68,
            name: "x"
          },
          delegate: false
        }
      }]
    },
    generator: true,
    async: true
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// Using in try/catch/finally blocks
test("try { using x = resource; } catch (e) { }", {
  type: "Program",
  start: 0,
  end: 41,
  body: [{
    type: "TryStatement",
    start: 0,
    end: 41,
    block: {
      type: "BlockStatement",
      start: 4,
      end: 27,
      body: [{
        type: "VariableDeclaration",
        start: 6,
        end: 25,
        declarations: [{
          type: "VariableDeclarator",
          start: 12,
          end: 24,
          id: {
            type: "Identifier",
            start: 12,
            end: 13,
            name: "x"
          },
          init: {
            type: "Identifier",
            start: 16,
            end: 24,
            name: "resource"
          }
        }],
        kind: "using"
      }]
    },
    handler: {
      type: "CatchClause",
      start: 28,
      end: 41,
      param: {
        type: "Identifier",
        start: 35,
        end: 36,
        name: "e"
      },
      body: {
        type: "BlockStatement",
        start: 38,
        end: 41,
        body: []
      }
    },
    finalizer: null
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// Using with Symbol.dispose
test("{ using resource = { [Symbol.dispose]() {} }; }", {
  type: "Program",
  start: 0,
  end: 47,
  body: [{
    type: "BlockStatement",
    start: 0,
    end: 47,
    body: [{
      type: "VariableDeclaration",
      start: 2,
      end: 45,
      declarations: [{
        type: "VariableDeclarator",
        start: 8,
        end: 44,
        id: {
          type: "Identifier",
          start: 8,
          end: 16,
          name: "resource"
        },
        init: {
          type: "ObjectExpression",
          start: 19,
          end: 44,
          properties: [{
            type: "Property",
            start: 21,
            end: 42,
            key: {
              type: "MemberExpression",
              start: 22,
              end: 36,
              object: {
                type: "Identifier",
                start: 22,
                end: 28,
                name: "Symbol"
              },
              property: {
                type: "Identifier",
                start: 29,
                end: 36,
                name: "dispose"
              },
              computed: false
            },
            value: {
              type: "FunctionExpression",
              start: 37,
              end: 42,
              id: null,
              params: [],
              body: {
                type: "BlockStatement",
                start: 40,
                end: 42,
                body: []
              },
              generator: false,
              async: false
            },
            kind: "init",
            method: true,
            computed: true
          }]
        }
      }],
      kind: "using"
    }]
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// DisposableStack usage
test("{ using stack = new DisposableStack(); }", {
  type: "Program",
  start: 0,
  end: 40,
  body: [{
    type: "BlockStatement",
    start: 0,
    end: 40,
    body: [{
      type: "VariableDeclaration",
      start: 2,
      end: 38,
      declarations: [{
        type: "VariableDeclarator",
        start: 8,
        end: 37,
        id: {
          type: "Identifier",
          start: 8,
          end: 13,
          name: "stack"
        },
        init: {
          type: "NewExpression",
          start: 16,
          end: 37,
          callee: {
            type: "Identifier",
            start: 20,
            end: 35,
            name: "DisposableStack"
          },
          arguments: []
        }
      }],
      kind: "using"
    }]
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// AsyncDisposableStack usage
test("async function test() { await using stack = new AsyncDisposableStack(); }", {
  type: "Program",
  start: 0,
  end: 73,
  body: [{
    type: "FunctionDeclaration",
    start: 0,
    end: 73,
    id: {
      type: "Identifier",
      start: 15,
      end: 19,
      name: "test"
    },
    params: [],
    body: {
      type: "BlockStatement",
      start: 22,
      end: 73,
      body: [{
        type: "VariableDeclaration",
        start: 24,
        end: 71,
        declarations: [{
          type: "VariableDeclarator",
          start: 36,
          end: 70,
          id: {
            type: "Identifier",
            start: 36,
            end: 41,
            name: "stack"
          },
          init: {
            type: "NewExpression",
            start: 44,
            end: 70,
            callee: {
              type: "Identifier",
              start: 48,
              end: 68,
              name: "AsyncDisposableStack"
            },
            arguments: []
          }
        }],
        kind: "await using"
      }]
    },
    generator: false,
    async: true
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// --- Using in loops ---

// For loop with using
test("for (using x = resource; i < 10; i++) {}", {
  type: "Program",
  start: 0,
  end: 40,
  body: [{
    type: "ForStatement",
    start: 0,
    end: 40,
    init: {
      type: "VariableDeclaration",
      start: 5,
      end: 23,
      declarations: [{
        type: "VariableDeclarator",
        start: 11,
        end: 23,
        id: {
          type: "Identifier",
          start: 11,
          end: 12,
          name: "x"
        },
        init: {
          type: "Identifier",
          start: 15,
          end: 23,
          name: "resource"
        }
      }],
      kind: "using"
    },
    test: {
      type: "BinaryExpression",
      start: 25,
      end: 31,
      left: {
        type: "Identifier",
        start: 25,
        end: 26,
        name: "i"
      },
      operator: "<",
      right: {
        type: "Literal",
        start: 29,
        end: 31,
        value: 10
      }
    },
    update: {
      type: "UpdateExpression",
      start: 33,
      end: 36,
      operator: "++",
      prefix: false,
      argument: {
        type: "Identifier",
        start: 33,
        end: 34,
        name: "i"
      }
    },
    body: {
      type: "BlockStatement",
      start: 38,
      end: 40,
      body: []
    }
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// For-of loop with using
test("for (using x of resources) {}", {
  type: "Program",
  start: 0,
  end: 29,
  body: [{
    type: "ForOfStatement",
    start: 0,
    end: 29,
    left: {
      type: "VariableDeclaration",
      start: 5,
      end: 12,
      declarations: [{
        type: "VariableDeclarator",
        start: 11,
        end: 12,
        id: {
          type: "Identifier",
          start: 11,
          end: 12,
          name: "x"
        },
        init: null
      }],
      kind: "using"
    },
    right: {
      type: "Identifier",
      start: 16,
      end: 25,
      name: "resources"
    },
    body: {
      type: "BlockStatement",
      start: 27,
      end: 29,
      body: []
    }
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// For-in loop with using
test("for (using x in obj) {}", {
  type: "Program",
  start: 0,
  end: 23,
  body: [{
    type: "ForInStatement",
    start: 0,
    end: 23,
    left: {
      type: "VariableDeclaration",
      start: 5,
      end: 12,
      declarations: [{
        type: "VariableDeclarator",
        start: 11,
        end: 12,
        id: {
          type: "Identifier",
          start: 11,
          end: 12,
          name: "x"
        },
        init: null
      }],
      kind: "using"
    },
    right: {
      type: "Identifier",
      start: 16,
      end: 19,
      name: "obj"
    },
    body: {
      type: "BlockStatement",
      start: 21,
      end: 23,
      body: []
    }
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// Await using in for-of loop
test("async function test() { for (await using x of resources) {} }", {
  type: "Program",
  start: 0,
  end: 61,
  body: [{
    type: "FunctionDeclaration",
    start: 0,
    end: 61,
    id: {
      type: "Identifier",
      start: 15,
      end: 19,
      name: "test"
    },
    params: [],
    body: {
      type: "BlockStatement",
      start: 22,
      end: 61,
      body: [{
        type: "ForOfStatement",
        start: 24,
        end: 59,
        left: {
          type: "VariableDeclaration",
          start: 29,
          end: 42,
          declarations: [{
            type: "VariableDeclarator",
            start: 41,
            end: 42,
            id: {
              type: "Identifier",
              start: 41,
              end: 42,
              name: "x"
            },
            init: null
          }],
          kind: "await using"
        },
        right: {
          type: "Identifier",
          start: 46,
          end: 55,
          name: "resources"
        },
        body: {
          type: "BlockStatement",
          start: 57,
          end: 59,
          body: []
        }
      }]
    },
    generator: false,
    async: true
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// --- Using in special contexts ---

// Using in switch case block
test("switch (x) { case 1: { using y = resource; } }", {
  type: "Program",
  start: 0,
  end: 46,
  body: [{
    type: "SwitchStatement",
    start: 0,
    end: 46,
    discriminant: {
      type: "Identifier",
      start: 8,
      end: 9,
      name: "x"
    },
    cases: [{
      type: "SwitchCase",
      start: 13,
      end: 44,
      test: {
        type: "Literal",
        start: 18,
        end: 19,
        value: 1
      },
      consequent: [{
        type: "BlockStatement",
        start: 21,
        end: 44,
        body: [{
          type: "VariableDeclaration",
          start: 23,
          end: 42,
          declarations: [{
            type: "VariableDeclarator",
            start: 29,
            end: 41,
            id: {
              type: "Identifier",
              start: 29,
              end: 30,
              name: "y"
            },
            init: {
              type: "Identifier",
              start: 33,
              end: 41,
              name: "resource"
            }
          }],
          kind: "using"
        }]
      }]
    }]
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// Using in class static block
test("class C { static { using x = resource; } }", {
  type: "Program",
  start: 0,
  end: 42,
  body: [{
    type: "ClassDeclaration",
    start: 0,
    end: 42,
    id: {
      type: "Identifier",
      start: 6,
      end: 7,
      name: "C"
    },
    superClass: null,
    body: {
      type: "ClassBody",
      start: 8,
      end: 42,
      body: [{
        type: "StaticBlock",
        start: 10,
        end: 40,
        body: [{
          type: "VariableDeclaration",
          start: 19,
          end: 38,
          declarations: [{
            type: "VariableDeclarator",
            start: 25,
            end: 37,
            id: {
              type: "Identifier",
              start: 25,
              end: 26,
              name: "x"
            },
            init: {
              type: "Identifier",
              start: 29,
              end: 37,
              name: "resource"
            }
          }],
          kind: "using"
        }]
      }]
    }
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// =============================================================================
// ERROR CASES - Expected failures and invalid syntax
// =============================================================================

// Basic missing initializer
testFail("{ using x; }", "Missing initializer in using declaration (1:9)", {"ecmaVersion": 17});
testFail("{ using x = 5, y; }", "Missing initializer in using declaration (1:16)", {"ecmaVersion": 17});

// Await using missing initializer
testFail("async function test() { await using x; }", "Missing initializer in await using declaration (1:37)", {"ecmaVersion": 17});

// Using with object destructuring is not supported
testFail("{ using {x} = obj; }", "Unexpected token (1:8)", {"ecmaVersion": 17});

// Complex object destructuring with renaming is not supported
testFail("{ using {x: y, z} = obj; }", "Unexpected token (1:8)", {"ecmaVersion": 17});

// Export using declarations - should fail as they are not allowed
testFail("export using x = resource;", "Unexpected token (1:7)", {"ecmaVersion": 17, "sourceType": "module"});
testFail("export await using x = resource;", "Unexpected token (1:7)", {"ecmaVersion": 17, "sourceType": "module"});

// Using with wrong ecmaVersion - should fail with Unexpected token
testFail("{ using x = resource; }", "Unexpected token (1:8)", {"ecmaVersion": 16});

// Top-level await using in script mode should fail  
testFail("await using x = resource;", "Unexpected token (1:6)", {"ecmaVersion": 17, "sourceType": "script"});

// Using in for-in with initializer (should fail)
testFail("for (using x = resource in obj) {}", "for-in loop variable declaration may not have an initializer (1:5)", {"ecmaVersion": 17});

// Using in for-of with initializer (should fail)
testFail("for (using x = resource of arr) {}", "for-of loop variable declaration may not have an initializer (1:5)", {"ecmaVersion": 17});

// "let" is not allowed as variable name in using declaration
testFail("{ using let = resource; }", "let is disallowed as a lexically bound name (1:8)", {"ecmaVersion": 17});

// Duplicate variable names in using declaration
testFail("{ using x = resource1, x = resource2; }", "Identifier 'x' has already been declared (1:23)", {"ecmaVersion": 17});

// Reserved words and strict mode restrictions
testFail("{ using super = resource; }", "Unexpected keyword 'super' (1:8)", {"ecmaVersion": 17});
testFail("{ using this = resource; }", "Unexpected keyword 'this' (1:8)", {"ecmaVersion": 17});
testFail("'use strict'; { using arguments = resource; }", "Binding arguments in strict mode (1:22)", {"ecmaVersion": 17});
testFail("'use strict'; { using eval = resource; }", "Binding eval in strict mode (1:22)", {"ecmaVersion": 17});

// Context-sensitive keyword restrictions
testFail("function* gen() { using yield = resource; }", "Cannot use 'yield' as identifier inside a generator (1:24)", {"ecmaVersion": 17});
testFail("async function test() { using await = resource; }", "Cannot use 'await' as identifier inside an async function (1:30)", {"ecmaVersion": 17});

// Rest elements are not allowed in await using declarations
testFail("async function test() { await using [first, ...rest] = arr; }", "Unexpected token (1:36)", {"ecmaVersion": 17});

// Strict mode restrictions with await using
testFail("'use strict'; async function test() { await using arguments = resource; }", "Binding arguments in strict mode (1:50)", {"ecmaVersion": 17});
testFail("'use strict'; async function test() { await using eval = resource; }", "Binding eval in strict mode (1:50)", {"ecmaVersion": 17});

// Duplicate variable names in await using declaration
testFail("async function test() { await using x = resource1, x = resource2; }", "Identifier 'x' has already been declared (1:51)", {"ecmaVersion": 17});

// Valid destructuring with default values in using - should be an error
testFail("{ using {x = 5} = obj; }", "Unexpected token (1:8)", {"ecmaVersion": 17});

// Using with object destructuring and computed property names - should be an error
testFail("{ using {[key]: value} = obj; }", "Unexpected token (1:8)", {"ecmaVersion": 17});

// 'let' is not allowed as variable name in await using declaration
testFail("async function test() { await using let = resource; }", "let is disallowed as a lexically bound name (1:36)", {"ecmaVersion": 17});
testFail("async function test() { await using x = resource1, let = resource2; }", "let is disallowed as a lexically bound name (1:51)", {"ecmaVersion": 17});

// Using declaration inside expression (should not be allowed)
testFail("(using x = resource)", "Unexpected token (1:7)", {"ecmaVersion": 17});

// Using with invalid identifier characters
testFail("{ using \\u0030x = resource; }", "Invalid Unicode escape (1:8)", {"ecmaVersion": 17});