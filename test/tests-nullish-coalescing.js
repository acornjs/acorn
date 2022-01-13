
if (typeof exports !== "undefined") {
  var driver = require("./driver.js");
  var test = driver.test, testFail = driver.testFail;
}

test("a ?? b", {
  "type": "Program",
  "start": 0,
  "end": 6,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 6,
      "expression": {
        "type": "LogicalExpression",
        "start": 0,
        "end": 6,
        "left": {
          "type": "Identifier",
          "start": 0,
          "end": 1,
          "name": "a"
        },
        "operator": "??",
        "right": {
          "type": "Identifier",
          "start": 5,
          "end": 6,
          "name": "b"
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })
test("a ?? b ?? c", {
  "type": "Program",
  "start": 0,
  "end": 11,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 11,
      "expression": {
        "type": "LogicalExpression",
        "start": 0,
        "end": 11,
        "left": {
          "type": "LogicalExpression",
          "start": 0,
          "end": 6,
          "left": {
            "type": "Identifier",
            "start": 0,
            "end": 1,
            "name": "a"
          },
          "operator": "??",
          "right": {
            "type": "Identifier",
            "start": 5,
            "end": 6,
            "name": "b"
          }
        },
        "operator": "??",
        "right": {
          "type": "Identifier",
          "start": 10,
          "end": 11,
          "name": "c"
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })

test("a | b ?? c | d", {
  "type": "Program",
  "start": 0,
  "end": 14,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 14,
      "expression": {
        "type": "LogicalExpression",
        "start": 0,
        "end": 14,
        "left": {
          "type": "BinaryExpression",
          "start": 0,
          "end": 5,
          "left": {
            "type": "Identifier",
            "start": 0,
            "end": 1,
            "name": "a"
          },
          "operator": "|",
          "right": {
            "type": "Identifier",
            "start": 4,
            "end": 5,
            "name": "b"
          }
        },
        "operator": "??",
        "right": {
          "type": "BinaryExpression",
          "start": 9,
          "end": 14,
          "left": {
            "type": "Identifier",
            "start": 9,
            "end": 10,
            "name": "c"
          },
          "operator": "|",
          "right": {
            "type": "Identifier",
            "start": 13,
            "end": 14,
            "name": "d"
          }
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })
test("a ?? b ? c : d", {
  "type": "Program",
  "start": 0,
  "end": 14,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 14,
      "expression": {
        "type": "ConditionalExpression",
        "start": 0,
        "end": 14,
        "test": {
          "type": "LogicalExpression",
          "start": 0,
          "end": 6,
          "left": {
            "type": "Identifier",
            "start": 0,
            "end": 1,
            "name": "a"
          },
          "operator": "??",
          "right": {
            "type": "Identifier",
            "start": 5,
            "end": 6,
            "name": "b"
          }
        },
        "consequent": {
          "type": "Identifier",
          "start": 9,
          "end": 10,
          "name": "c"
        },
        "alternate": {
          "type": "Identifier",
          "start": 13,
          "end": 14,
          "name": "d"
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })

test("(a || b) ?? c", {
  "type": "Program",
  "start": 0,
  "end": 13,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 13,
      "expression": {
        "type": "LogicalExpression",
        "start": 0,
        "end": 13,
        "left": {
          "type": "LogicalExpression",
          "start": 1,
          "end": 7,
          "left": {
            "type": "Identifier",
            "start": 1,
            "end": 2,
            "name": "a"
          },
          "operator": "||",
          "right": {
            "type": "Identifier",
            "start": 6,
            "end": 7,
            "name": "b"
          }
        },
        "operator": "??",
        "right": {
          "type": "Identifier",
          "start": 12,
          "end": 13,
          "name": "c"
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })
test("a || (b ?? c)", {
  "type": "Program",
  "start": 0,
  "end": 13,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 13,
      "expression": {
        "type": "LogicalExpression",
        "start": 0,
        "end": 13,
        "left": {
          "type": "Identifier",
          "start": 0,
          "end": 1,
          "name": "a"
        },
        "operator": "||",
        "right": {
          "type": "LogicalExpression",
          "start": 6,
          "end": 12,
          "left": {
            "type": "Identifier",
            "start": 6,
            "end": 7,
            "name": "b"
          },
          "operator": "??",
          "right": {
            "type": "Identifier",
            "start": 11,
            "end": 12,
            "name": "c"
          }
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })

test("(a && b) ?? c", {
  "type": "Program",
  "start": 0,
  "end": 13,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 13,
      "expression": {
        "type": "LogicalExpression",
        "start": 0,
        "end": 13,
        "left": {
          "type": "LogicalExpression",
          "start": 1,
          "end": 7,
          "left": {
            "type": "Identifier",
            "start": 1,
            "end": 2,
            "name": "a"
          },
          "operator": "&&",
          "right": {
            "type": "Identifier",
            "start": 6,
            "end": 7,
            "name": "b"
          }
        },
        "operator": "??",
        "right": {
          "type": "Identifier",
          "start": 12,
          "end": 13,
          "name": "c"
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })
test("a && (b ?? c)", {
  "type": "Program",
  "start": 0,
  "end": 13,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 13,
      "expression": {
        "type": "LogicalExpression",
        "start": 0,
        "end": 13,
        "left": {
          "type": "Identifier",
          "start": 0,
          "end": 1,
          "name": "a"
        },
        "operator": "&&",
        "right": {
          "type": "LogicalExpression",
          "start": 6,
          "end": 12,
          "left": {
            "type": "Identifier",
            "start": 6,
            "end": 7,
            "name": "b"
          },
          "operator": "??",
          "right": {
            "type": "Identifier",
            "start": 11,
            "end": 12,
            "name": "c"
          }
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })

test("(a ?? b) || c", {
  "type": "Program",
  "start": 0,
  "end": 13,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 13,
      "expression": {
        "type": "LogicalExpression",
        "start": 0,
        "end": 13,
        "left": {
          "type": "LogicalExpression",
          "start": 1,
          "end": 7,
          "left": {
            "type": "Identifier",
            "start": 1,
            "end": 2,
            "name": "a"
          },
          "operator": "??",
          "right": {
            "type": "Identifier",
            "start": 6,
            "end": 7,
            "name": "b"
          }
        },
        "operator": "||",
        "right": {
          "type": "Identifier",
          "start": 12,
          "end": 13,
          "name": "c"
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })
test("a ?? (b || c)", {
  "type": "Program",
  "start": 0,
  "end": 13,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 13,
      "expression": {
        "type": "LogicalExpression",
        "start": 0,
        "end": 13,
        "left": {
          "type": "Identifier",
          "start": 0,
          "end": 1,
          "name": "a"
        },
        "operator": "??",
        "right": {
          "type": "LogicalExpression",
          "start": 6,
          "end": 12,
          "left": {
            "type": "Identifier",
            "start": 6,
            "end": 7,
            "name": "b"
          },
          "operator": "||",
          "right": {
            "type": "Identifier",
            "start": 11,
            "end": 12,
            "name": "c"
          }
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })

test("(a ?? b) && c", {
  "type": "Program",
  "start": 0,
  "end": 13,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 13,
      "expression": {
        "type": "LogicalExpression",
        "start": 0,
        "end": 13,
        "left": {
          "type": "LogicalExpression",
          "start": 1,
          "end": 7,
          "left": {
            "type": "Identifier",
            "start": 1,
            "end": 2,
            "name": "a"
          },
          "operator": "??",
          "right": {
            "type": "Identifier",
            "start": 6,
            "end": 7,
            "name": "b"
          }
        },
        "operator": "&&",
        "right": {
          "type": "Identifier",
          "start": 12,
          "end": 13,
          "name": "c"
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })
test("a ?? (b && c)", {
  "type": "Program",
  "start": 0,
  "end": 13,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 13,
      "expression": {
        "type": "LogicalExpression",
        "start": 0,
        "end": 13,
        "left": {
          "type": "Identifier",
          "start": 0,
          "end": 1,
          "name": "a"
        },
        "operator": "??",
        "right": {
          "type": "LogicalExpression",
          "start": 6,
          "end": 12,
          "left": {
            "type": "Identifier",
            "start": 6,
            "end": 7,
            "name": "b"
          },
          "operator": "&&",
          "right": {
            "type": "Identifier",
            "start": 11,
            "end": 12,
            "name": "c"
          }
        }
      }
    }
  ],
  "sourceType": "script"
}, { ecmaVersion: 11 })

testFail("a ?? b", "Unexpected token (1:3)", { ecmaVersion: 10 })
testFail("?? b", "Unexpected token (1:0)", { ecmaVersion: 11 })
testFail("a ??", "Unexpected token (1:4)", { ecmaVersion: 11 })
testFail("a || b ?? c", "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses (1:7)", { ecmaVersion: 11 })
testFail("a && b ?? c", "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses (1:7)", { ecmaVersion: 11 })
testFail("a ?? b || c", "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses (1:7)", { ecmaVersion: 11 })
testFail("a ?? b && c", "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses (1:7)", { ecmaVersion: 11 })

testFail("a+1 || b+1 ?? c", "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses (1:11)", { ecmaVersion: 11 })
testFail("a+1 && b+1 ?? c", "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses (1:11)", { ecmaVersion: 11 })
testFail("a+1 ?? b+1 || c", "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses (1:11)", { ecmaVersion: 11 })
testFail("a+1 ?? b+1 && c", "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses (1:11)", { ecmaVersion: 11 })
