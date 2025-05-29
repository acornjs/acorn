// Using declaration tests

if (typeof exports !== "undefined") {
  var test = require("./driver.js").test
  var testFail = require("./driver.js").testFail
}

// Basic using declaration
test("{ using x = resource; }", {
  type: "Program",
  body: [{
    type: "BlockStatement",
    body: [{
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "x"
        },
        init: {
          type: "Identifier",
          name: "resource"
        }
      }],
      kind: "using"
    }]
  }]
}, {ecmaVersion: 17});

// Multiple variable declarations (from TC39 proposal examples)
test("{ using a = resource1, b = resource2; }", {
  type: "Program",
  body: [{
    type: "BlockStatement",
    body: [{
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "a"
        },
        init: {
          type: "Identifier",
          name: "resource1"
        }
      }, {
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "b"
        },
        init: {
          type: "Identifier",
          name: "resource2"
        }
      }],
      kind: "using"
    }]
  }]
}, {ecmaVersion: 17});

// Using with object destructuring
test("{ using {x} = obj; }", {
  type: "Program",
  body: [{
    type: "BlockStatement",
    body: [{
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "ObjectPattern",
          properties: [{
            type: "Property",
            key: {
              type: "Identifier",
              name: "x"
            },
            value: {
              type: "Identifier",
              name: "x"
            },
            kind: "init",
            method: false,
            shorthand: true
          }]
        },
        init: {
          type: "Identifier",
          name: "obj"
        }
      }],
      kind: "using"
    }]
  }]
}, {ecmaVersion: 17});

// Complex object destructuring with renaming
test("{ using {x: y, z} = obj; }", {
  type: "Program",
  body: [{
    type: "BlockStatement",
    body: [{
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "ObjectPattern",
          properties: [{
            type: "Property",
            key: {
              type: "Identifier",
              name: "x"
            },
            value: {
              type: "Identifier",
              name: "y"
            },
            kind: "init",
            method: false,
            shorthand: false
          }, {
            type: "Property",
            key: {
              type: "Identifier",
              name: "z"
            },
            value: {
              type: "Identifier",
              name: "z"
            },
            kind: "init",
            method: false,
            shorthand: true
          }]
        },
        init: {
          type: "Identifier",
          name: "obj"
        }
      }],
      kind: "using"
    }]
  }]
}, {ecmaVersion: 17});

// Using with array destructuring
test("{ using [a, b] = arr; }", {
  type: "Program",
  body: [{
    type: "BlockStatement",
    body: [{
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "ArrayPattern",
          elements: [{
            type: "Identifier",
            name: "a"
          }, {
            type: "Identifier",
            name: "b"
          }]
        },
        init: {
          type: "Identifier",
          name: "arr"
        }
      }],
      kind: "using"
    }]
  }]
}, {ecmaVersion: 17});

// Array destructuring with rest element
test("{ using [first, ...rest] = arr; }", {
  type: "Program",
  body: [{
    type: "BlockStatement",
    body: [{
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "ArrayPattern",
          elements: [{
            type: "Identifier",
            name: "first"
          }, {
            type: "RestElement",
            argument: {
              type: "Identifier",
              name: "rest"
            }
          }]
        },
        init: {
          type: "Identifier",
          name: "arr"
        }
      }],
      kind: "using"
    }]
  }]
}, {ecmaVersion: 17});

// Top-level using declaration
test("using x = resource;", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "Identifier",
        name: "x"
      },
      init: {
        type: "Identifier",
        name: "resource"
      }
    }],
    kind: "using"
  }]
}, {ecmaVersion: 17});

// DisposableStack usage (from TC39 proposal)
test("{ using stack = new DisposableStack(); }", {
  type: "Program",
  body: [{
    type: "BlockStatement",
    body: [{
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "stack"
        },
        init: {
          type: "NewExpression",
          callee: {
            type: "Identifier",
            name: "DisposableStack"
          },
          arguments: []
        }
      }],
      kind: "using"
    }]
  }]
}, {ecmaVersion: 17});

// For loop with using
test("for (using x = resource; i < 10; i++) {}", {
  type: "Program",
  body: [{
    type: "ForStatement",
    init: {
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "x"
        },
        init: {
          type: "Identifier",
          name: "resource"
        }
      }],
      kind: "using"
    },
    test: {
      type: "BinaryExpression",
      left: {
        type: "Identifier",
        name: "i"
      },
      operator: "<",
      right: {
        type: "Literal",
        value: 10
      }
    },
    update: {
      type: "UpdateExpression",
      operator: "++",
      prefix: false,
      argument: {
        type: "Identifier",
        name: "i"
      }
    },
    body: {
      type: "BlockStatement",
      body: []
    }
  }]
}, {ecmaVersion: 17});

// For-of loop with using
test("for (using x of resources) {}", {
  type: "Program",
  body: [{
    type: "ForOfStatement",
    left: {
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "x"
        },
        init: null
      }],
      kind: "using"
    },
    right: {
      type: "Identifier",
      name: "resources"
    },
    body: {
      type: "BlockStatement",
      body: []
    }
  }]
}, {ecmaVersion: 17});

// For-in loop with using
test("for (using x in obj) {}", {
  type: "Program",
  body: [{
    type: "ForInStatement",
    left: {
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "x"
        },
        init: null
      }],
      kind: "using"
    },
    right: {
      type: "Identifier",
      name: "obj"
    },
    body: {
      type: "BlockStatement",
      body: []
    }
  }]
}, {ecmaVersion: 17});

// Export using
test("export using x = resource;", {
  type: "Program",
  body: [{
    type: "ExportNamedDeclaration",
    declaration: {
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "x"
        },
        init: {
          type: "Identifier",
          name: "resource"
        }
      }],
      kind: "using"
    },
    specifiers: [],
    source: null,
    attributes: []
  }],
  sourceType: "module"
}, {ecmaVersion: 17, sourceType: "module"});

// Export using with multiple declarations
test("export using a = resource1, b = resource2;", {
  type: "Program",
  body: [{
    type: "ExportNamedDeclaration",
    declaration: {
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "a"
        },
        init: {
          type: "Identifier",
          name: "resource1"
        }
      }, {
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "b"
        },
        init: {
          type: "Identifier",
          name: "resource2"
        }
      }],
      kind: "using"
    },
    specifiers: [],
    source: null,
    attributes: []
  }],
  sourceType: "module"
}, {ecmaVersion: 17, sourceType: "module"});

// Await using declaration tests

test("async function test() { await using x = resource; }", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "test"
    },
    params: [],
    body: {
      type: "BlockStatement",
      body: [{
        type: "VariableDeclaration",
        declarations: [{
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "x"
          },
          init: {
            type: "Identifier",
            name: "resource"
          }
        }],
        kind: "await using"
      }]
    },
    generator: false,
    async: true
  }]
}, {ecmaVersion: 17});

// Await using with multiple declarations
test("async function test() { await using a = resource1, b = resource2; }", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "test"
    },
    params: [],
    body: {
      type: "BlockStatement",
      body: [{
        type: "VariableDeclaration",
        declarations: [{
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "a"
          },
          init: {
            type: "Identifier",
            name: "resource1"
          }
        }, {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "b"
          },
          init: {
            type: "Identifier",
            name: "resource2"
          }
        }],
        kind: "await using"
      }]
    },
    generator: false,
    async: true
  }]
}, {ecmaVersion: 17});

// AsyncDisposableStack usage
test("async function test() { await using stack = new AsyncDisposableStack(); }", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "test"
    },
    params: [],
    body: {
      type: "BlockStatement",
      body: [{
        type: "VariableDeclaration",
        declarations: [{
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: "stack"
          },
          init: {
            type: "NewExpression",
            callee: {
              type: "Identifier",
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
  }]
}, {ecmaVersion: 17});

// Await using in for-of loop
test("async function test() { for (await using x of resources) {} }", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "test"
    },
    params: [],
    body: {
      type: "BlockStatement",
      body: [{
        type: "ForOfStatement",
        left: {
          type: "VariableDeclaration",
          declarations: [{
            type: "VariableDeclarator",
            id: {
              type: "Identifier",
              name: "x"
            },
            init: null
          }],
          kind: "await using"
        },
        right: {
          type: "Identifier",
          name: "resources"
        },
        body: {
          type: "BlockStatement",
          body: []
        }
      }]
    },
    generator: false,
    async: true
  }]
}, {ecmaVersion: 17});

// Top-level await using (in module)
test("await using x = resource;", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "Identifier",
        name: "x"
      },
      init: {
        type: "Identifier",
        name: "resource"
      }
    }],
    kind: "await using"
  }]
}, {ecmaVersion: 17, sourceType: "module"});

// Export await using
test("export await using x = resource;", {
  type: "Program",
  body: [{
    type: "ExportNamedDeclaration",
    declaration: {
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "x"
        },
        init: {
          type: "Identifier",
          name: "resource"
        }
      }],
      kind: "await using"
    },
    specifiers: [],
    source: null,
    attributes: []
  }],
  sourceType: "module"
}, {ecmaVersion: 17, sourceType: "module"});

// Error cases

// Basic missing initializer
testFail("{ using x; }", "Missing initializer in using declaration (1:9)", {ecmaVersion: 17});
testFail("{ using x = 5, y; }", "Missing initializer in using declaration (1:16)", {ecmaVersion: 17});

// Await using missing initializer
testFail("async function test() { await using x; }", "Missing initializer in await using declaration (1:37)", {ecmaVersion: 17});

// Await using outside async context - these are syntax errors because await is unexpected
testFail("{ await using x = resource; }", "Unexpected token (1:8)", {ecmaVersion: 17});

// Top-level await using in script (not module) - also syntax error
testFail("await using x = resource;", "Unexpected token (1:6)", {ecmaVersion: 17});

// Using with wrong ecmaVersion - should fail with Unexpected token
testFail("{ using x = resource; }", "Unexpected token (1:8)", {ecmaVersion: 16});

// Valid destructuring with default values in using - this is allowed
test("{ using {x = 5} = obj; }", {
  type: "Program",
  body: [{
    type: "BlockStatement",
    body: [{
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "ObjectPattern",
          properties: [{
            type: "Property",
            key: {
              type: "Identifier",
              name: "x"
            },
            value: {
              type: "AssignmentPattern",
              left: {
                type: "Identifier",
                name: "x"
              },
              right: {
                type: "Literal",
                value: 5
              }
            },
            kind: "init",
            method: false,
            shorthand: true
          }]
        },
        init: {
          type: "Identifier",
          name: "obj"
        }
      }],
      kind: "using"
    }]
  }]
}, {ecmaVersion: 17});

// Using in for-in with initializer (should fail) - error position is at using keyword
testFail("for (using x = resource in obj) {}", "for-in loop variable declaration may not have an initializer (1:5)", {ecmaVersion: 17});

// Using in for-of with initializer (should fail) - error position is at using keyword
testFail("for (using x = resource of arr) {}", "for-of loop variable declaration may not have an initializer (1:5)", {ecmaVersion: 17}); 