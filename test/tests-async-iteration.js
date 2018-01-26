if (typeof exports != "undefined") {
  var driver = require("./driver.js");
  var test = driver.test, testFail = driver.testFail
}

test(
  "for await (const line of readLines(filePath)) {\n" +
  "  console.log(line);\n" +
  "}", { body: [{
    type: "ForOfStatement",
    start: 0,
    end: 70,
    await: true,
    left: {
      type: "VariableDeclaration",
      start: 11,
      end: 21,
      declarations: [ {
        type: "VariableDeclarator",
        start: 17,
        end: 21,
        id: { type: "Identifier", start: 17, end: 21, name: "line" },
        init: null } ],
      kind: "const" },
    right: {
      type: "CallExpression",
      start: 25,
      end: 44,
      callee: { type: "Identifier", start: 25, end: 34, name: "readLines" },
      arguments: [ { type: "Identifier", start: 35, end: 43, name: "filePath" } ]
    },
    body: {
      type: "BlockStatement",
      start: 46,
      end: 70,
      body: [ {
        type: "ExpressionStatement",
        start: 50,
        end: 68,
        expression: {
          type: "CallExpression",
          start: 50,
          end: 67,
          callee: {
            type: "MemberExpression",
            start: 50,
            end: 61,
            object: { type: "Identifier", start: 50, end: 57, name: "console" },
            property: { type: "Identifier", start: 58, end: 61, name: "log" },
            computed: false },
          arguments: [ { type: "Identifier", start: 62, end: 66, name: "line" } ]
        }
      } ]
    }
  }]}, { ecmaVersion: 9 }
)

const functions = [
  {
    text: "async function* x() %s",
    bodyAt: 20,
    ast: body => ({
      type: "FunctionDeclaration",
      start: 0,
      end: body.end,
      async: true,
      generator: true,
      body: body
    })
  },

  {
    text: "ref = async function*() %s",
    bodyAt: 24,
    ast: body => ({
      type: "ExpressionStatement",
      start: 0,
      end: body.end,
      expression: {
        type: "AssignmentExpression",
        start: 0,
        end: body.end,
        right: {
          type: "FunctionExpression",
          start: 6,
          end: body.end,
          async: true,
          generator: true,
          body: body
        }
      }
    })
  },

  {
    text: "(async function*() %s)",
    bodyAt: 19,
    ast: body => ({
      type: "ExpressionStatement",
      start: 0,
      end: body.end + 1,
      expression: {
        type: "FunctionExpression",
        start: 1,
        end: body.end,
        async: true,
        generator: true,
        body: body
      }
    })
  },

  {
    text: "var gen = { async *method() %s }",
    bodyAt: 28,
    ast: body => ({
      type: "VariableDeclaration",
      start: 0,
      end: body.end + 2,
      declarations: [ {
        type: "VariableDeclarator",
        start: 4,
        end: body.end + 2,
        id: { type: "Identifier", start: 4, end: 7, name: "gen" },
        init: {
          type: "ObjectExpression",
          start: 10,
          end: body.end + 2,
          properties: [ {
            type: "Property",
            start: 12,
            end: body.end,
            method: true,
            shorthand: false,
            computed: false,
            key: { type: "Identifier", start: 19, end: 25, name: "method" },
            kind: "init",
            value: {
              type: "FunctionExpression",
              start: 25,
              end: body.end,
              id: null,
              generator: true,
              expression: false,
              async: true,
              params: [],
              body: body
            }
          } ]
        }
      } ],
      kind: "var"
    })
  },

  {
    text: "export default async function*() %s",
    options: { sourceType: "module", ecmaVersion: 9 },
    bodyAt: 33,
    ast: body => ({
      type: "ExportDefaultDeclaration",
      start: 0,
      end: body.end,
      declaration: {
        type: "FunctionDeclaration",
        start: 15,
        end: body.end,
        id: null,
        generator: true,
        expression: false,
        async: true,
        params: [],
        body: body
      }
    })
  },

  {
    text: "var C = class { async *method() %s }",
    bodyAt: 32,
    ast: body => ({
      type: "VariableDeclaration",
      start: 0,
      end: body.end + 2,
      declarations: [ {
        type: "VariableDeclarator",
        start: 4,
        end: body.end + 2,
        id: { type: "Identifier", start: 4, end: 5, name: "C" },
        init: {
          type: "ClassExpression",
          start: 8,
          end: body.end + 2,
          body: { type: "ClassBody", body: [ {
            type: "MethodDefinition",
            start: 16,
            end: body.end,
            computed: false,
            key: { type: "Identifier", start: 23, end: 29, name: "method" },
            kind: "method",
            value: {
              type: "FunctionExpression",
              start: 29,
              end: body.end,
              id: null,
              generator: true,
              expression: false,
              async: true,
              params: [],
              body: body
            }
          } ] }
        }
      } ],
      kind: "var"
    })
  },

  {
    text: "var C = class { static async *method() %s }",
    bodyAt: 39,
    ast: body => ({
      type: "VariableDeclaration",
      start: 0,
      end: body.end + 2,
      declarations: [ {
        type: "VariableDeclarator",
        start: 4,
        end: body.end + 2,
        id: { type: "Identifier", start: 4, end: 5, name: "C" },
        init: {
          type: "ClassExpression",
          start: 8,
          end: body.end + 2,
          body: { type: "ClassBody", body: [ {
            type: "MethodDefinition",
            start: 16,
            end: body.end,
            computed: false,
            static: true,
            key: { type: "Identifier", start: 30, end: 36, name: "method" },
            kind: "method",
            value: {
              type: "FunctionExpression",
              start: 36,
              end: body.end,
              id: null,
              generator: true,
              expression: false,
              async: true,
              params: [],
              body: body
            }
          } ] }
        }
      } ],
      kind: "var"
    })
  }
];

[
  { body: "{}", passes: true, ast: start => ({
    body: [],
    end: start + 2,
    start: start,
    type: "BlockStatement"
  }) },

  { body: "{ super(); }", passes: false, error: start => "'super' in body of async generator (1:" + (start + 2) + ")"},

  { body: "{ var x = () => { super(); } }", passes: true, ast: start => ({
    end: start + 30,
    start: start,
    type: "BlockStatement",
    body: [ {
      type: "VariableDeclaration",
      start: start + 2,
      end: start + 28,
      kind: "var",
      declarations: [ {
        type: "VariableDeclarator",
        start: start + 6,
        end: start + 28,
        id: { type: "Identifier", start: start + 6, end: start + 7, name: "x" },
        init: {
          type: "ArrowFunctionExpression",
          start: start + 10,
          end: start + 28,
          id: null,
          generator: false,
          expression: false,
          async: false,
          params: [],
          body: {
            type: "BlockStatement",
            start: start + 16,
            end: start + 28,
            body: [ {
              type: "ExpressionStatement",
              start: start + 18,
              end: start + 26,
              expression: {
                type: "CallExpression",
                start: start + 18,
                end: start + 25,
                callee: { type: "Super", start: start + 18, end: start + 23 },
                arguments: [] } } ] } }
      } ]
    } ]
  }) },

  { body: "{ var x = function () { super(); } }", passes: true, ast: start => ({
    end: start + 36,
    start: start,
    type: "BlockStatement",
    body: [ {
      type: "VariableDeclaration",
      start: start + 2,
      end: start + 34,
      kind: "var",
      declarations: [ {
        type: "VariableDeclarator",
        start: start + 6,
        end: start + 34,
        id: { type: "Identifier", start: start + 6, end: start + 7, name: "x" },
        init: {
          type: "FunctionExpression",
          start: start + 10,
          end: start + 34,
          id: null,
          generator: false,
          expression: false,
          async: false,
          params: [],
          body: {
            type: "BlockStatement",
            start: start + 22,
            end: start + 34,
            body: [ {
              type: "ExpressionStatement",
              start: start + 24,
              end: start + 32,
              expression: {
                type: "CallExpression",
                start: start + 24,
                end: start + 31,
                callee: { type: "Super", start: start + 24, end: start + 29 },
                arguments: [] } } ] } }
      } ]
    } ]
  }) },

  { body: "{ var x = { y: function () { super(); } } }", passes: true, ast: start => ({
    type: "BlockStatement",
    start: start,
    end: start + 43,
    body: [ {
      type: "VariableDeclaration",
      start: start + 2,
      end: start + 41,
      declarations: [ {
        type: "VariableDeclarator",
        start: start + 6,
        end: start + 41,
        id: { type: "Identifier", start: start + 6, end: start + 7, name: "x" },
        init: {
          type: "ObjectExpression",
          start: start + 10,
          end: start + 41,
          properties: [ {
            type: "Property",
            start: start + 12,
            end: start + 39,
            method: false,
            shorthand: false,
            computed: false,
            key: { type: "Identifier", start: start + 12, end: start + 13, name: "y" },
            value: {
              type: "FunctionExpression",
              start: start + 15,
              end: start + 39,
              id: null,
              generator: false,
              expression: false,
              async: false,
              params: [],
              body: {
                type: "BlockStatement",
                start: start + 27,
                end: start + 39,
                body: [ {
                  type: "ExpressionStatement",
                  start: start + 29,
                  end: start + 37,
                  expression: {
                    type: "CallExpression",
                    start: start + 29,
                    end: start + 36,
                    callee: { type: "Super", start: start + 29, end: start + 34 },
                    arguments: [] } } ] } },
            kind: "init" } ] } } ],
      kind: "var" } ]
  }) },
].forEach(body => functions.forEach(f => {
  const text = f.text.replace("%s", body.body), options = f.options || { ecmaVersion: 9 };
  if (body.passes) {
    test(text, {body: [f.ast(body.ast(f.bodyAt))]}, options)
  } else {
    testFail(text, body.error(f.bodyAt), options)
  }
}))

test("({ async *method(){} })", {}, { ecmaVersion: 9 })
testFail("({ \\u0061sync *method(){} })", "Unexpected token (1:14)", { ecmaVersion: 9 })
testFail("void \\u0061sync function* f(){};", "Unexpected token (1:16)", { ecmaVersion: 9 })
testFail("for ( ; false; ) async function* g() {}", "Unexpected token (1:17)", { ecmaVersion: 9 })
test("({async() { }})", {}, { ecmaVersion: 9 })
test("({async = 0} = {})", {}, { ecmaVersion: 9 })
test("({async, foo})", {}, { ecmaVersion: 9 })
test("({async})", {}, { ecmaVersion: 9 })
test("({async: true})", {}, { ecmaVersion: 9 })
testFail("({async\n    foo() { }})", "Unexpected token (2:4)", { ecmaVersion: 9 })
testFail("for await (;;) {}", "Unexpected token (1:4)", { ecmaVersion: 9 })
testFail("for await (let a;;) {}", "Unexpected token (1:4)", { ecmaVersion: 9 })
testFail("for await (var a;;) {}", "Unexpected token (1:4)", { ecmaVersion: 9 })
testFail("for await (a in b) {}", "Unexpected token (1:4)", { ecmaVersion: 9 })
testFail("for await (let a in b) {}", "Unexpected token (1:4)", { ecmaVersion: 9 })
testFail("for await (var a in b) {}", "Unexpected token (1:4)", { ecmaVersion: 9 })
