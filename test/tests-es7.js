// Tests for ECMAScript 7 syntax changes

if (typeof exports != "undefined") {
  var test = require("./driver.js").test;
  var testFail = require("./driver.js").testFail;
}

test("x **= 42", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "**=",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        right: {
          type: "Literal",
          value: 42,
          loc: {
            start: {
              line: 1,
              column: 6
            },
            end: {
              line: 1,
              column: 8
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 8
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 8
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 8
    }
  }
}, {
  ecmaVersion: 7,
  locations: true
});

testFail("x **= 42", "Unexpected token (1:3)", { ecmaVersion: 6 });

test("x ** y", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1
            }
          }
        },
        operator: "**",
        right: {
          type: "Identifier",
          name: "y",
          loc: {
            start: {
              line: 1,
              column: 5
            },
            end: {
              line: 1,
              column: 6
            }
          }
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 6
          }
        }
      },
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 6
        }
      }
    }
  ],
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 6
    }
  }
}, {
  ecmaVersion: 7,
  locations: true
});

testFail("x ** y", "Unexpected token (1:3)", { ecmaVersion: 6 });

// ** has highest precedence
test("3 ** 5 * 1", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        operator: "*",
        left: {
          type: "BinaryExpression",
          operator: "**",
          left: {
            type: "Literal",
            value: 3
          },
          right: {
            type: "Literal",
            value: 5
          }
        },
        right: {
          type: "Literal",
          value: 1
        }
      }
    }
  ]
}, {
  ecmaVersion: 7,
});

test("3 % 5 ** 1", {
  type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "%",
          left: {
            type: "Literal",
            value: 3
          },
          right: {
            type: "BinaryExpression",
            operator: "**",
            left: {
              type: "Literal",
              value: 5
            },
            right: {
              type: "Literal",
              value: 1
            }
          }
        }
      }
    ]
}, {
  ecmaVersion: 7,
});

testFail("x ** y", "Unexpected token (1:3)", { ecmaVersion: 6 });

// Disallowed unary ops
testFail("delete o.p ** 2;", "Base operand of ** cannot use a unary expression (1:0)", { ecmaVersion: 7 });
testFail("void 2 ** 2;", "Base operand of ** cannot use a unary expression (1:0)", { ecmaVersion: 7 });
testFail("typeof 2 ** 2;", "Base operand of ** cannot use a unary expression (1:0)", { ecmaVersion: 7 });
testFail("~3 ** 2;", "Base operand of ** cannot use a unary expression (1:0)", { ecmaVersion: 7 });
testFail("!1 ** 2;", "Base operand of ** cannot use a unary expression (1:0)", { ecmaVersion: 7 });
testFail("-2** 2;", "Base operand of ** cannot use a unary expression (1:0)", { ecmaVersion: 7 });
testFail("+2** 2;", "Base operand of ** cannot use a unary expression (1:0)", { ecmaVersion: 7 });

// make sure base operand check doesn't affect other operators
test("-a * 5", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "UnaryExpression",
          operator: "-",
          prefix: true,
          argument: {
            type: "Identifier",
            name: "a"
          }
        },
        operator: "*",
        right: {
          type: "Literal",
          value: 5,
        }
      }
    }
  ],
  sourceType: "script"
}, { ecmaVersion: 6 })


test("(-5) ** y", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "BinaryExpression",
        left: {
          type: "UnaryExpression",
          operator: "-",
          prefix: true,
          argument: {
            type: "Literal",
            value: 5
          }
        },
        operator: "**",
        right: {
          type: "Identifier",
          name: "y"
        }
      }
    }
  ]
}, {
  ecmaVersion: 7
});
