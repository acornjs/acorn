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
  sourceType: "module"
}, {"ecmaVersion": 17, "sourceType": "module"});

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

// BoundNames contains "let"
testFail("{ using let = resource; }", "let is disallowed as a lexically bound name (1:8)", {"ecmaVersion": 17});
// BoundNames contains duplicate entries
testFail("let await using x = resource;", "Unexpected token (1:10)", {"ecmaVersion": 17});
// let using is not allowed
testFail("let using x = resource;", "Unexpected token (1:10)", {"ecmaVersion": 17});
// top level using is not allowed
testFail("using x = resource;", "Using declaration cannot appear in the top level when source type is `script` (1:0)", {"ecmaVersion": 17, "sourceType": "script"});

// BoundNames contains "let"  
testFail("async function test() { await using let = resource; }", "let is disallowed as a lexically bound name (1:36)", {"ecmaVersion": 17});
// BoundNames contains duplicate entries
testFail("async function test() { await using x = resource1, x = resource2; }", "Identifier 'x' has already been declared (1:51)", {"ecmaVersion": 17});
// top level await using is not allowed
testFail("await using x = resource;", "Using declaration cannot appear in the top level when source type is `script` (1:0)", {"ecmaVersion": 17, "sourceType": "script"});

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

// =============================================================================
// EDGE CASES - Unusual but valid scenarios and boundary conditions
// =============================================================================

// --- ECMAScript version compatibility ---

// ES16: using should be treated as regular identifier (assignment)
test("using = 5;", {
  type: "Program",
  start: 0,
  end: 10,
  body: [{
    type: "ExpressionStatement",
    start: 0,
    end: 10,
    expression: {
      type: "AssignmentExpression",
      start: 0,
      end: 9,
      operator: "=",
      left: {
        type: "Identifier",
        start: 0,
        end: 5,
        name: "using"
      },
      right: {
        type: "Literal",
        start: 8,
        end: 9,
        value: 5
      }
    }
  }],
  sourceType: "script"
}, {"ecmaVersion": 16});

// ES17: using should be treated as regular identifier (assignment)
test("using = 5;", {
  type: "Program",
  start: 0,
  end: 10,
  body: [{
    type: "ExpressionStatement",
    start: 0,
    end: 10,
    expression: {
      type: "AssignmentExpression",
      start: 0,
      end: 9,
      operator: "=",
      left: {
        type: "Identifier",
        start: 0,
        end: 5,
        name: "using"
      },
      right: {
        type: "Literal",
        start: 8,
        end: 9,
        value: 5
      }
    }
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// ES16: using should be treated as regular identifier (method call)
test("using.dispose();", {
  type: "Program",
  start: 0,
  end: 16,
  body: [{
    type: "ExpressionStatement",
    start: 0,
    end: 16,
    expression: {
      type: "CallExpression",
      start: 0,
      end: 15,
      callee: {
        type: "MemberExpression",
        start: 0,
        end: 13,
        object: {
          type: "Identifier",
          start: 0,
          end: 5,
          name: "using"
        },
        property: {
          type: "Identifier",
          start: 6,
          end: 13,
          name: "dispose"
        },
        computed: false
      },
      arguments: []
    }
  }],
  sourceType: "script"
}, {"ecmaVersion": 16});

// ES17: using should be treated as regular identifier (method call)
test("using.dispose();", {
  type: "Program",
  start: 0,
  end: 16,
  body: [{
    type: "ExpressionStatement",
    start: 0,
    end: 16,
    expression: {
      type: "CallExpression",
      start: 0,
      end: 15,
      callee: {
        type: "MemberExpression",
        start: 0,
        end: 13,
        object: {
          type: "Identifier",
          start: 0,
          end: 5,
          name: "using"
        },
        property: {
          type: "Identifier",
          start: 6,
          end: 13,
          name: "dispose"
        },
        computed: false
      },
      arguments: []
    }
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// ES16: using should be treated as regular identifier (logical expression)
test("using && doSomething();", {
  type: "Program",
  start: 0,
  end: 23,
  body: [{
    type: "ExpressionStatement",
    start: 0,
    end: 23,
    expression: {
      type: "LogicalExpression",
      start: 0,
      end: 22,
      operator: "&&",
      left: {
        type: "Identifier",
        start: 0,
        end: 5,
        name: "using"
      },
      right: {
        type: "CallExpression",
        start: 9,
        end: 22,
        callee: {
          type: "Identifier",
          start: 9,
          end: 20,
          name: "doSomething"
        },
        arguments: []
      }
    }
  }],
  sourceType: "script"
}, {"ecmaVersion": 16});

// ES17: using should be treated as regular identifier (logical expression)
test("using && doSomething();", {
  type: "Program",
  start: 0,
  end: 23,
  body: [{
    type: "ExpressionStatement",
    start: 0,
    end: 23,
    expression: {
      type: "LogicalExpression",
      start: 0,
      end: 22,
      operator: "&&",
      left: {
        type: "Identifier",
        start: 0,
        end: 5,
        name: "using"
      },
      right: {
        type: "CallExpression",
        start: 9,
        end: 22,
        callee: {
          type: "Identifier",
          start: 9,
          end: 20,
          name: "doSomething"
        },
        arguments: []
      }
    }
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// ES16: await using should be treated as regular identifiers
test("await.using;", {
  type: "Program",
  start: 0,
  end: 12,
  body: [{
    type: "ExpressionStatement",
    start: 0,
    end: 12,
    expression: {
      type: "MemberExpression",
      start: 0,
      end: 11,
      object: {
        type: "Identifier",
        start: 0,
        end: 5,
        name: "await"
      },
      property: {
        type: "Identifier",
        start: 6,
        end: 11,
        name: "using"
      },
      computed: false
    }
  }],
  sourceType: "script"
}, {"ecmaVersion": 16});

// ES17: await using should be treated as regular identifiers
test("await.using;", {
  type: "Program",
  start: 0,
  end: 12,
  body: [{
    type: "ExpressionStatement",
    start: 0,
    end: 12,
    expression: {
      type: "MemberExpression",
      start: 0,
      end: 11,
      object: {
        type: "Identifier",
        start: 0,
        end: 5,
        name: "await"
      },
      property: {
        type: "Identifier",
        start: 6,
        end: 11,
        name: "using"
      },
      computed: false
    }
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// ES16: using should be treated as regular identifier (for-of)
test("for (using of x) {}", {
  type: "Program",
  start: 0,
  end: 19,
  body: [{
    type: "ForOfStatement",
    start: 0,
    end: 19,
    await: false,
    left: {
      type: "Identifier",
      start: 5,
      end: 10,
      name: "using"
    },
    right: {
      type: "Identifier",
      start: 14,
      end: 15,
      name: "x"
    },
    body: {
      type: "BlockStatement",
      start: 17,
      end: 19,
      body: []
    }
  }],
  sourceType: "script"
}, {"ecmaVersion": 16});

// ES17: using should be treated as regular identifier (for-of)
test("for (using of x) {}", {
  type: "Program",
  start: 0,
  end: 19,
  body: [{
    type: "ForOfStatement",
    start: 0,
    end: 19,
    await: false,
    left: {
      type: "Identifier",
      start: 5,
      end: 10,
      name: "using"
    },
    right: {
      type: "Identifier",
      start: 14,
      end: 15,
      name: "x"
    },
    body: {
      type: "BlockStatement",
      start: 17,
      end: 19,
      body: []
    }
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// --- LineTerminator restrictions ---

// using with LineTerminator should be parsed as identifier + assignment, not using declaration
test(`using
x = resource;`, {
  type: "Program",
  start: 0,
  end: 19,
  body: [{
    type: "ExpressionStatement",
    start: 0,
    end: 5,
    expression: {
      type: "Identifier",
      start: 0,
      end: 5,
      name: "using"
    }
  }, {
    type: "ExpressionStatement",
    start: 6,
    end: 19,
    expression: {
      type: "AssignmentExpression",
      start: 6,
      end: 18,
      operator: "=",
      left: {
        type: "Identifier",
        start: 6,
        end: 7,
        name: "x"
      },
      right: {
        type: "Identifier",
        start: 10,
        end: 18,
        name: "resource"
      }
    }
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// LineTerminator between 'await' and 'using' (violates spec)
testFail(`async function test() { await
using x = resource; }`, "Unexpected token (2:6)", {"ecmaVersion": 17, "sourceType": "script"});

// await using with LineTerminator after using should be parsed as await identifier + assignment
test(`async function test() { await using
x = resource; }`, {
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
        type: "ExpressionStatement",
        start: 24,
        end: 35,
        expression: {
          type: "AwaitExpression",
          start: 24,
          end: 35,
          argument: {
            type: "Identifier",
            start: 30,
            end: 35,
            name: "using"
          }
        }
      }, {
        type: "ExpressionStatement",
        start: 36,
        end: 49,
        expression: {
          type: "AssignmentExpression",
          start: 36,
          end: 48,
          operator: "=",
          left: {
            type: "Identifier",
            start: 36,
            end: 37,
            name: "x"
          },
          right: {
            type: "Identifier",
            start: 40,
            end: 48,
            name: "resource"
          }
        }
      }]
    },
    generator: false,
    async: true
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// Top-level await using with LineTerminator after using should parse as await identifier + assignment
test(`await using
x = resource;`, {
  type: "Program",
  start: 0,
  end: 25,
  body: [{
    type: "ExpressionStatement",
    start: 0,
    end: 11,
    expression: {
      type: "AwaitExpression",
      start: 0,
      end: 11,
      argument: {
        type: "Identifier",
        start: 6,
        end: 11,
        name: "using"
      }
    }
  }, {
    type: "ExpressionStatement",
    start: 12,
    end: 25,
    expression: {
      type: "AssignmentExpression",
      start: 12,
      end: 24,
      operator: "=",
      left: {
        type: "Identifier",
        start: 12,
        end: 13,
        name: "x"
      },
      right: {
        type: "Identifier",
        start: 16,
        end: 24,
        name: "resource"
      }
    }
  }],
  sourceType: "module"
}, {"ecmaVersion": 17, "sourceType": "module"});

// Valid case: Comments between await and using (no actual LineTerminator)
test("async function test() { await /* comment */ using x = resource; }", {
  type: "Program",
  start: 0,
  end: 65,
  body: [{
    type: "FunctionDeclaration",
    start: 0,
    end: 65,
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
      end: 65,
      body: [{
        type: "VariableDeclaration",
        start: 24,
        end: 63,
        declarations: [{
          type: "VariableDeclarator",
          start: 50,
          end: 62,
          id: {
            type: "Identifier",
            start: 50,
            end: 51,
            name: "x"
          },
          init: {
            type: "Identifier",
            start: 54,
            end: 62,
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

// Multiple line terminators should be parsed as separate statements
test(`using


x = resource;`, {
  type: "Program",
  start: 0,
  end: 21,
  body: [{
    type: "ExpressionStatement",
    start: 0,
    end: 5,
    expression: {
      type: "Identifier",
      start: 0,
      end: 5,
      name: "using"
    }
  }, {
    type: "ExpressionStatement",
    start: 8,
    end: 21,
    expression: {
      type: "AssignmentExpression",
      start: 8,
      end: 20,
      operator: "=",
      left: {
        type: "Identifier",
        start: 8,
        end: 9,
        name: "x"
      },
      right: {
        type: "Identifier",
        start: 12,
        end: 20,
        name: "resource"
      }
    }
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// --- Unicode and special characters ---

// Using with Unicode escape sequence identifier
test("{ using \\u0078 = resource; }", {
  type: "Program",
  start: 0,
  end: 28,
  body: [{
    type: "BlockStatement",
    start: 0,
    end: 28,
    body: [{
      type: "VariableDeclaration",
      start: 2,
      end: 26,
      declarations: [{
        type: "VariableDeclarator",
        start: 8,
        end: 25,
        id: {
          type: "Identifier",
          start: 8,
          end: 14,
          name: "x"
        },
        init: {
          type: "Identifier",
          start: 17,
          end: 25,
          name: "resource"
        }
      }],
      kind: "using"
    }]
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// Using with Latin-1 supplement characters
test("{ using café = resource; }", {
  type: "Program",
  start: 0,
  end: 26,
  body: [{
    type: "BlockStatement",
    start: 0,
    end: 26,
    body: [{
      type: "VariableDeclaration",
      start: 2,
      end: 24,
      declarations: [{
        type: "VariableDeclarator",
        start: 8,
        end: 23,
        id: {
          type: "Identifier",
          start: 8,
          end: 12,
          name: "café"
        },
        init: {
          type: "Identifier",
          start: 15,
          end: 23,
          name: "resource"
        }
      }],
      kind: "using"
    }]
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// Await using with Unicode identifier
test("async function test() { await using \\u03B1 = resource; }", {
  type: "Program",
  start: 0,
  end: 56,
  body: [{
    type: "FunctionDeclaration",
    start: 0,
    end: 56,
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
      end: 56,
      body: [{
        type: "VariableDeclaration",
        start: 24,
        end: 54,
        declarations: [{
          type: "VariableDeclarator",
          start: 36,
          end: 53,
          id: {
            type: "Identifier",
            start: 36,
            end: 42,
            name: "α"
          },
          init: {
            type: "Identifier",
            start: 45,
            end: 53,
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

// Unicode in using identifier
test("{ using \\u{61} = resource; }", {
  type: "Program",
  start: 0,
  end: 28,
  body: [{
    type: "BlockStatement",
    start: 0,
    end: 28,
    body: [{
      type: "VariableDeclaration",
      start: 2,
      end: 26,
      declarations: [{
        type: "VariableDeclarator",
        start: 8,
        end: 25,
        id: {
          type: "Identifier",
          start: 8,
          end: 14,
          name: "a"
        },
        init: {
          type: "Identifier",
          start: 17,
          end: 25,
          name: "resource"
        }
      }],
      kind: "using"
    }]
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// --- Complex expressions and ASI ---

// Using with complex member expression
test("{ using x = obj.resource.handle; }", {
  type: "Program",
  start: 0,
  end: 34,
  body: [{
    type: "BlockStatement",
    start: 0,
    end: 34,
    body: [{
      type: "VariableDeclaration",
      start: 2,
      end: 32,
      declarations: [{
        type: "VariableDeclarator",
        start: 8,
        end: 31,
        id: {
          type: "Identifier",
          start: 8,
          end: 9,
          name: "x"
        },
        init: {
          type: "MemberExpression",
          start: 12,
          end: 31,
          object: {
            type: "MemberExpression",
            start: 12,
            end: 24,
            object: {
              type: "Identifier",
              start: 12,
              end: 15,
              name: "obj"
            },
            property: {
              type: "Identifier",
              start: 16,
              end: 24,
              name: "resource"
            },
            computed: false
          },
          property: {
            type: "Identifier",
            start: 25,
            end: 31,
            name: "handle"
          },
          computed: false
        }
      }],
      kind: "using"
    }]
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// Using with computed property access
test("{ using x = obj[key]; }", {
  type: "Program",
  start: 0,
  end: 23,
  body: [{
    type: "BlockStatement",
    start: 0,
    end: 23,
    body: [{
      type: "VariableDeclaration",
      start: 2,
      end: 21,
      declarations: [{
        type: "VariableDeclarator",
        start: 8,
        end: 20,
        id: {
          type: "Identifier",
          start: 8,
          end: 9,
          name: "x"
        },
        init: {
          type: "MemberExpression",
          start: 12,
          end: 20,
          object: {
            type: "Identifier",
            start: 12,
            end: 15,
            name: "obj"
          },
          property: {
            type: "Identifier",
            start: 16,
            end: 19,
            name: "key"
          },
          computed: true
        }
      }],
      kind: "using"
    }]
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// Using with call expression
test("{ using x = createResource(); }", {
  type: "Program",
  start: 0,
  end: 31,
  body: [{
    type: "BlockStatement",
    start: 0,
    end: 31,
    body: [{
      type: "VariableDeclaration",
      start: 2,
      end: 29,
      declarations: [{
        type: "VariableDeclarator",
        start: 8,
        end: 28,
        id: {
          type: "Identifier",
          start: 8,
          end: 9,
          name: "x"
        },
        init: {
          type: "CallExpression",
          start: 12,
          end: 28,
          callee: {
            type: "Identifier",
            start: 12,
            end: 26,
            name: "createResource"
          },
          arguments: []
        }
      }],
      kind: "using"
    }]
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// Using with conditional (ternary) expression
test("{ using x = condition ? resource1 : resource2; }", {
  type: "Program",
  start: 0,
  end: 48,
  body: [{
    type: "BlockStatement",
    start: 0,
    end: 48,
    body: [{
      type: "VariableDeclaration",
      start: 2,
      end: 46,
      declarations: [{
        type: "VariableDeclarator",
        start: 8,
        end: 45,
        id: {
          type: "Identifier",
          start: 8,
          end: 9,
          name: "x"
        },
        init: {
          type: "ConditionalExpression",
          start: 12,
          end: 45,
          test: {
            type: "Identifier",
            start: 12,
            end: 21,
            name: "condition"
          },
          consequent: {
            type: "Identifier",
            start: 24,
            end: 33,
            name: "resource1"
          },
          alternate: {
            type: "Identifier",
            start: 36,
            end: 45,
            name: "resource2"
          }
        }
      }],
      kind: "using"
    }]
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// Using with logical OR expression
test("{ using x = resource || fallback; }", {
  type: "Program",
  start: 0,
  end: 35,
  body: [{
    type: "BlockStatement",
    start: 0,
    end: 35,
    body: [{
      type: "VariableDeclaration",
      start: 2,
      end: 33,
      declarations: [{
        type: "VariableDeclarator",
        start: 8,
        end: 32,
        id: {
          type: "Identifier",
          start: 8,
          end: 9,
          name: "x"
        },
        init: {
          type: "LogicalExpression",
          start: 12,
          end: 32,
          operator: "||",
          left: {
            type: "Identifier",
            start: 12,
            end: 20,
            name: "resource"
          },
          right: {
            type: "Identifier",
            start: 24,
            end: 32,
            name: "fallback"
          }
        }
      }],
      kind: "using"
    }]
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// Test null and undefined as valid initializers
test("{ using x = null; }", {
  type: "Program",
  start: 0,
  end: 19,
  body: [{
    type: "BlockStatement",
    start: 0,
    end: 19,
    body: [{
      type: "VariableDeclaration",
      start: 2,
      end: 17,
      declarations: [{
        type: "VariableDeclarator",
        start: 8,
        end: 16,
        id: {
          type: "Identifier",
          start: 8,
          end: 9,
          name: "x"
        },
        init: {
          type: "Literal",
          start: 12,
          end: 16,
          value: null
        }
      }],
      kind: "using"
    }]
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

test("{ using x = undefined; }", {
  type: "Program",
  start: 0,
  end: 24,
  body: [{
    type: "BlockStatement",
    start: 0,
    end: 24,
    body: [{
      type: "VariableDeclaration",
      start: 2,
      end: 22,
      declarations: [{
        type: "VariableDeclarator",
        start: 8,
        end: 21,
        id: {
          type: "Identifier",
          start: 8,
          end: 9,
          name: "x"
        },
        init: {
          type: "Identifier",
          start: 12,
          end: 21,
          name: "undefined"
        }
      }],
      kind: "using"
    }]
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// Using with BigInt literal
test("{ using x = 123n; }", {
  type: "Program",
  start: 0,
  end: 19,
  body: [{
    type: "BlockStatement",
    start: 0,
    end: 19,
    body: [{
      type: "VariableDeclaration",
      start: 2,
      end: 17,
      declarations: [{
        type: "VariableDeclarator",
        start: 8,
        end: 16,
        id: {
          type: "Identifier",
          start: 8,
          end: 9,
          name: "x"
        },
        init: {
          type: "Literal",
          start: 12,
          end: 16,
          value: 123n,
          bigint: "123"
        }
      }],
      kind: "using"
    }]
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// ASI (Automatic Semicolon Insertion) test - using without semicolon 
test("{ using x = resource\n}", {
  type: "Program",
  start: 0,
  end: 22,
  body: [{
    type: "BlockStatement",
    start: 0,
    end: 22,
    body: [{
      type: "VariableDeclaration",
      start: 2,
      end: 20,
      declarations: [{
        type: "VariableDeclarator",
        start: 8,
        end: 20,
        id: {
          type: "Identifier",
          start: 8,
          end: 9,
          name: "x"
        },
        init: {
          type: "Identifier",
          start: 12,
          end: 20,
          name: "resource"
        }
      }],
      kind: "using"
    }]
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// --- Additional contexts ---

// Using in catch clause
test("try {} catch (e) { using x = resource; }", {
  type: "Program",
  start: 0,
  end: 40,
  body: [{
    type: "TryStatement",
    start: 0,
    end: 40,
    block: {
      type: "BlockStatement",
      start: 4,
      end: 6,
      body: []
    },
    handler: {
      type: "CatchClause",
      start: 7,
      end: 40,
      param: {
        type: "Identifier",
        start: 14,
        end: 15,
        name: "e"
      },
      body: {
        type: "BlockStatement",
        start: 17,
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
      }
    },
    finalizer: null
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// Using in finally clause
test("try {} finally { using x = resource; }", {
  type: "Program",
  start: 0,
  end: 38,
  body: [{
    type: "TryStatement",
    start: 0,
    end: 38,
    block: {
      type: "BlockStatement",
      start: 4,
      end: 6,
      body: []
    },
    handler: null,
    finalizer: {
      type: "BlockStatement",
      start: 15,
      end: 38,
      body: [{
        type: "VariableDeclaration",
        start: 17,
        end: 36,
        declarations: [{
          type: "VariableDeclarator",
          start: 23,
          end: 35,
          id: {
            type: "Identifier",
            start: 23,
            end: 24,
            name: "x"
          },
          init: {
            type: "Identifier",
            start: 27,
            end: 35,
            name: "resource"
          }
        }],
        kind: "using"
      }]
    }
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// Using in if statement block
test("if (condition) { using x = resource; }", {
  type: "Program",
  start: 0,
  end: 38,
  body: [{
    type: "IfStatement",
    start: 0,
    end: 38,
    test: {
      type: "Identifier",
      start: 4,
      end: 13,
      name: "condition"
    },
    consequent: {
      type: "BlockStatement",
      start: 15,
      end: 38,
      body: [{
        type: "VariableDeclaration",
        start: 17,
        end: 36,
        declarations: [{
          type: "VariableDeclarator",
          start: 23,
          end: 35,
          id: {
            type: "Identifier",
            start: 23,
            end: 24,
            name: "x"
          },
          init: {
            type: "Identifier",
            start: 27,
            end: 35,
            name: "resource"
          }
        }],
        kind: "using"
      }]
    },
    alternate: null
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// Using in while statement block
test("while (condition) { using x = resource; break; }", {
  type: "Program",
  start: 0,
  end: 48,
  body: [{
    type: "WhileStatement",
    start: 0,
    end: 48,
    test: {
      type: "Identifier",
      start: 7,
      end: 16,
      name: "condition"
    },
    body: {
      type: "BlockStatement",
      start: 18,
      end: 48,
      body: [{
        type: "VariableDeclaration",
        start: 20,
        end: 39,
        declarations: [{
          type: "VariableDeclarator",
          start: 26,
          end: 38,
          id: {
            type: "Identifier",
            start: 26,
            end: 27,
            name: "x"
          },
          init: {
            type: "Identifier",
            start: 30,
            end: 38,
            name: "resource"
          }
        }],
        kind: "using"
      }, {
        type: "BreakStatement",
        start: 40,
        end: 46,
        label: null
      }]
    }
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// Using in labeled statement block
test("label: { using x = resource; }", {
  type: "Program",
  start: 0,
  end: 30,
  body: [{
    type: "LabeledStatement",
    start: 0,
    end: 30,
    label: {
      type: "Identifier",
      start: 0,
      end: 5,
      name: "label"
    },
    body: {
      type: "BlockStatement",
      start: 7,
      end: 30,
      body: [{
        type: "VariableDeclaration",
        start: 9,
        end: 28,
        declarations: [{
          type: "VariableDeclarator",
          start: 15,
          end: 27,
          id: {
            type: "Identifier",
            start: 15,
            end: 16,
            name: "x"
          },
          init: {
            type: "Identifier",
            start: 19,
            end: 27,
            name: "resource"
          }
        }],
        kind: "using"
      }]
    }
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// Using with 'arguments' identifier
test("{ using arguments = resource; }", {
  type: "Program",
  start: 0,
  end: 31,
  body: [{
    type: "BlockStatement",
    start: 0,
    end: 31,
    body: [{
      type: "VariableDeclaration",
      start: 2,
      end: 29,
      declarations: [{
        type: "VariableDeclarator",
        start: 8,
        end: 28,
        id: {
          type: "Identifier",
          start: 8,
          end: 17,
          name: "arguments"
        },
        init: {
          type: "Identifier",
          start: 20,
          end: 28,
          name: "resource"
        }
      }],
      kind: "using"
    }]
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});

// Using with 'eval' identifier (should work, eval is not restricted in using declarations)
test("{ using eval = resource; }", {
  type: "Program",
  start: 0,
  end: 26,
  body: [{
    type: "BlockStatement",
    start: 0,
    end: 26,
    body: [{
      type: "VariableDeclaration",
      start: 2,
      end: 24,
      declarations: [{
        type: "VariableDeclarator",
        start: 8,
        end: 23,
        id: {
          type: "Identifier",
          start: 8,
          end: 12,
          name: "eval"
        },
        init: {
          type: "Identifier",
          start: 15,
          end: 23,
          name: "resource"
        }
      }],
      kind: "using"
    }]
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});


// ES17: using should be treated as using keyword
test("for (using ofa of x) {}", {
  type: "Program",
  start: 0,
  end: 23,
  body: [{
    type: "ForOfStatement",
    start: 0,
    end: 23,
    left: {
      type: "VariableDeclaration",
      start: 5,
      end: 14,
      declarations: [{
        type: "VariableDeclarator",
        start: 11,
        end: 14,
        id: {
          type: "Identifier",
          start: 11,
          end: 14,
          name: "ofa"
        },
        init: null
      }],
      kind: "using"
    },
    right: {
      type: "Identifier",
      start: 18,
      end: 19,
      name: "x"
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

// await using should be treated as regular identifiers when not followed by variable declaration
test("async function test() { await usingX; }", {
  type: "Program",
  start: 0,
  end: 39,
  body: [{
    type: "FunctionDeclaration",
    start: 0,
    end: 39,
    id: {
      type: "Identifier",
      start: 15,
      end: 19,
      name: "test"
    },
    generator: false,
    async: true,
    params: [],
    body: {
      type: "BlockStatement",
      start: 22,
      end: 39,
      body: [{
        type: "ExpressionStatement",
        start: 24,
        end: 37,
        expression: {
          type: "AwaitExpression",
          start: 24,
          end: 36,
          argument: {
            type: "Identifier",
            start: 30,
            end: 36,
            name: "usingX"
          }
        }
      }]
    }
  }],
  sourceType: "script"
}, {"ecmaVersion": 17});
