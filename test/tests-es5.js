if (typeof exports != "undefined") {
  var driver = require("./driver.js");
  var test = driver.test, testFail = driver.testFail;
}

// ECMA < 6 mode should work as before

testFail("({ get i() { }, i: 42 })",
         "Redefinition of property (1:16)", {ecmaVersion: 5});

testFail("({ i: 42, get i() { } })",
         "Redefinition of property (1:14)", {ecmaVersion: 5});

testFail("({ set i(x) { }, i: 42 })",
         "Redefinition of property (1:17)", {ecmaVersion: 5});

testFail("({ i: 42, set i(x) { } })",
         "Redefinition of property (1:14)", {ecmaVersion: 5});

testFail("({ get i() { }, get i() { } })",
         "Redefinition of property (1:20)", {ecmaVersion: 5});

testFail("({ set i(x) { }, set i(x) { } })",
         "Redefinition of property (1:21)", {ecmaVersion: 5});

testFail("'use strict'; ({ __proto__: 1, __proto__: 2 })",
         "Redefinition of property (1:31)", {ecmaVersion: 5});

testFail("function t(...) { }",
         "Unexpected token (1:11)", {ecmaVersion: 5});

testFail("if(true) let a = 1;",
         "Unexpected token (1:13)", {ecmaVersion: 5});

testFail("function hello() {'use strict'; ({ i: 42, i: 42 }) }",
         "Redefinition of property (1:42)", {ecmaVersion: 5});

testFail("function hello() {'use strict'; ({ hasOwnProperty: 42, hasOwnProperty: 42 }) }",
         "Redefinition of property (1:55)", {ecmaVersion: 5});

testFail("const a;", "The keyword 'const' is reserved (1:0)", {ecmaVersion: 5});

testFail("let x;", "Unexpected token (1:4)", {ecmaVersion: 5});

testFail("const a = 1;", "The keyword 'const' is reserved (1:0)", {ecmaVersion: 5});

testFail("let a = 1;", "Unexpected token (1:4)", {ecmaVersion: 5});

testFail("for(const x = 0;;);", "The keyword 'const' is reserved (1:4)", {ecmaVersion: 5});

testFail("for(let x = 0;;);", "Unexpected token (1:8)", {ecmaVersion: 5});

testFail("function a(b = c) {}", "Unexpected token (1:13)", {ecmaVersion: 5});

test("let++", {
  type: "Program",
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 5
    }
  },
  body: [
    {
      type: "ExpressionStatement",
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 5
        }
      },
      expression: {
        type: "UpdateExpression",
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 5
          }
        },
        operator: "++",
        prefix: false,
        argument: {
          type: "Identifier",
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 3
            }
          },
          name: "let"
        }
      }
    }
  ]
});

testFail("for(x of a);", "Unexpected token (1:6)", {ecmaVersion: 5});

testFail("for(var x of a);", "Unexpected token (1:10)", {ecmaVersion: 5});

testFail("/[a-z]/u", "Invalid regular expression flag (1:1)", {ecmaVersion: 5});
testFail("/[a-z]/y", "Invalid regular expression flag (1:1)", {ecmaVersion: 5});
