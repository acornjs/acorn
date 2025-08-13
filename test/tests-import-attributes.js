/* eslint quote-props: ["error", "as-needed"] */
/* eslint quotes: ["error", "double", { "avoidEscape": true }] */
if (typeof exports !== "undefined") {
  var test = require("./driver.js").test;
  var testFail = require("./driver.js").testFail;
}

test(
  'import json from "./foo.json" with { type: "json" };',
  {
    type: "Program",
    start: 0,
    end: 52,
    body: [
      {
        type: "ImportDeclaration",
        start: 0,
        end: 52,
        specifiers: [
          {
            type: "ImportDefaultSpecifier",
            start: 7,
            end: 11,
            local: {
              type: "Identifier",
              start: 7,
              end: 11,
              name: "json",
            },
          },
        ],
        source: {
          type: "Literal",
          start: 17,
          end: 29,
          value: "./foo.json",
          raw: '"./foo.json"',
        },
        attributes: [
          {
            type: "ImportAttribute",
            start: 37,
            end: 49,
            key: {
              type: "Identifier",
              start: 37,
              end: 41,
              name: "type",
            },
            value: {
              type: "Literal",
              start: 43,
              end: 49,
              value: "json",
              raw: '"json"',
            },
          },
        ],
      },
    ],
    sourceType: "module",
  },
  { sourceType: "module", ecmaVersion: 16 }
);

test(
  'import "./foo.json" with { type: "json" };',
  {
    type: "Program",
    start: 0,
    end: 42,
    body: [
      {
        type: "ImportDeclaration",
        start: 0,
        end: 42,
        specifiers: [],
        source: {
          type: "Literal",
          start: 7,
          end: 19,
          value: "./foo.json",
          raw: '"./foo.json"',
        },
        attributes: [
          {
            type: "ImportAttribute",
            start: 27,
            end: 39,
            key: {
              type: "Identifier",
              start: 27,
              end: 31,
              name: "type",
            },
            value: {
              type: "Literal",
              start: 33,
              end: 39,
              value: "json",
              raw: '"json"',
            },
          },
        ],
      },
    ],
    sourceType: "module",
  },
  { sourceType: "module", ecmaVersion: 16 }
);

test(
  'import json from "./foo.json";', // Without attributes
  {
    type: "Program",
    start: 0,
    end: 30,
    body: [
      {
        type: "ImportDeclaration",
        start: 0,
        end: 30,
        specifiers: [
          {
            type: "ImportDefaultSpecifier",
            start: 7,
            end: 11,
            local: {
              type: "Identifier",
              start: 7,
              end: 11,
              name: "json",
            },
          },
        ],
        source: {
          type: "Literal",
          start: 17,
          end: 29,
          value: "./foo.json",
          raw: '"./foo.json"',
        },
        attributes: [],
      },
    ],
    sourceType: "module",
  },
  { sourceType: "module", ecmaVersion: 16 }
);

test(
  'import "./foo.json";', // Without attributes
  {
    type: "Program",
    start: 0,
    end: 20,
    body: [
      {
        type: "ImportDeclaration",
        start: 0,
        end: 20,
        specifiers: [],
        source: {
          type: "Literal",
          start: 7,
          end: 19,
          value: "./foo.json",
          raw: '"./foo.json"',
        },
        attributes: [],
      },
    ],
    sourceType: "module",
  },
  { sourceType: "module", ecmaVersion: 16 }
);

test(
  'export {v} from "./foo.json" with { type: "json" };',
  {
    type: "Program",
    start: 0,
    end: 51,
    body: [
      {
        type: "ExportNamedDeclaration",
        start: 0,
        end: 51,
        declaration: null,
        specifiers: [
          {
            type: "ExportSpecifier",
            start: 8,
            end: 9,
            local: {
              type: "Identifier",
              start: 8,
              end: 9,
              name: "v",
            },
            exported: {
              type: "Identifier",
              start: 8,
              end: 9,
              name: "v",
            },
          },
        ],
        source: {
          type: "Literal",
          start: 16,
          end: 28,
          value: "./foo.json",
          raw: '"./foo.json"',
        },
        attributes: [
          {
            type: "ImportAttribute",
            start: 36,
            end: 48,
            key: {
              type: "Identifier",
              start: 36,
              end: 40,
              name: "type",
            },
            value: {
              type: "Literal",
              start: 42,
              end: 48,
              value: "json",
              raw: '"json"',
            },
          },
        ],
      },
    ],
    sourceType: "module",
  },
  { sourceType: "module", ecmaVersion: 16 }
);

test(
  'export {v} from "./foo.json";', // Without attributes
  {
    type: "Program",
    start: 0,
    end: 29,
    body: [
      {
        type: "ExportNamedDeclaration",
        start: 0,
        end: 29,
        declaration: null,
        specifiers: [
          {
            type: "ExportSpecifier",
            start: 8,
            end: 9,
            local: {
              type: "Identifier",
              start: 8,
              end: 9,
              name: "v",
            },
            exported: {
              type: "Identifier",
              start: 8,
              end: 9,
              name: "v",
            },
          },
        ],
        source: {
          type: "Literal",
          start: 16,
          end: 28,
          value: "./foo.json",
          raw: '"./foo.json"',
        },
        attributes: [],
      },
    ],
    sourceType: "module",
  },
  { sourceType: "module", ecmaVersion: 16 }
);

test(
  'export * as json from "./foo.json" with { type: "json" };',
  {
    type: "Program",
    start: 0,
    end: 57,
    body: [
      {
        type: "ExportAllDeclaration",
        start: 0,
        end: 57,
        exported: {
          type: "Identifier",
          start: 12,
          end: 16,
          name: "json",
        },
        source: {
          type: "Literal",
          start: 22,
          end: 34,
          value: "./foo.json",
          raw: '"./foo.json"',
        },
        attributes: [
          {
            type: "ImportAttribute",
            start: 42,
            end: 54,
            key: {
              type: "Identifier",
              start: 42,
              end: 46,
              name: "type",
            },
            value: {
              type: "Literal",
              start: 48,
              end: 54,
              value: "json",
              raw: '"json"',
            },
          },
        ],
      },
    ],
    sourceType: "module",
  },
  { sourceType: "module", ecmaVersion: 16 }
);

test(
  'export * as json from "./foo.json";', // Without attributes
  {
    type: "Program",
    start: 0,
    end: 35,
    body: [
      {
        type: "ExportAllDeclaration",
        start: 0,
        end: 35,
        exported: {
          type: "Identifier",
          start: 12,
          end: 16,
          name: "json",
        },
        source: {
          type: "Literal",
          start: 22,
          end: 34,
          value: "./foo.json",
          raw: '"./foo.json"',
        },
        attributes: [],
      },
    ],
    sourceType: "module",
  },
  { sourceType: "module", ecmaVersion: 16 }
);

test(
  'import("foo.json", { with: { type: "json" } });',
  {
    type: "Program",
    start: 0,
    end: 47,
    body: [
      {
        type: "ExpressionStatement",
        start: 0,
        end: 47,
        expression: {
          type: "ImportExpression",
          start: 0,
          end: 46,
          source: {
            type: "Literal",
            start: 7,
            end: 17,
            value: "foo.json",
            raw: '"foo.json"',
          },
          options: {
            type: "ObjectExpression",
            start: 19,
            end: 45,
            properties: [
              {
                type: "Property",
                start: 21,
                end: 43,
                method: false,
                shorthand: false,
                computed: false,
                key: {
                  type: "Identifier",
                  start: 21,
                  end: 25,
                  name: "with",
                },
                value: {
                  type: "ObjectExpression",
                  start: 27,
                  end: 43,
                  properties: [
                    {
                      type: "Property",
                      start: 29,
                      end: 41,
                      method: false,
                      shorthand: false,
                      computed: false,
                      key: {
                        type: "Identifier",
                        start: 29,
                        end: 33,
                        name: "type",
                      },
                      value: {
                        type: "Literal",
                        start: 35,
                        end: 41,
                        value: "json",
                        raw: '"json"',
                      },
                      kind: "init",
                    },
                  ],
                },
                kind: "init",
              },
            ],
          },
        },
      },
    ],
    sourceType: "module",
  },
  { sourceType: "module", ecmaVersion: 16 }
);

test(
  'import("foo.json", );', // Allow trailing comma
  {
    type: "Program",
    start: 0,
    end: 21,
    body: [
      {
        type: "ExpressionStatement",
        start: 0,
        end: 21,
        expression: {
          type: "ImportExpression",
          start: 0,
          end: 20,
          source: {
            type: "Literal",
            start: 7,
            end: 17,
            value: "foo.json",
            raw: '"foo.json"',
          },
          options: null,
        },
      },
    ],
    sourceType: "module",
  },
  { sourceType: "module", ecmaVersion: 16 }
);

test(
  'import("foo.json", { with: { type: "json" } }, );',
  {
    type: "Program",
    start: 0,
    end: 49,
    body: [
      {
        type: "ExpressionStatement",
        start: 0,
        end: 49,
        expression: {
          type: "ImportExpression",
          start: 0,
          end: 48,
          source: {
            type: "Literal",
            start: 7,
            end: 17,
            value: "foo.json",
            raw: '"foo.json"',
          },
          options: {
            type: "ObjectExpression",
            start: 19,
            end: 45,
            properties: [
              {
                type: "Property",
                start: 21,
                end: 43,
                method: false,
                shorthand: false,
                computed: false,
                key: {
                  type: "Identifier",
                  start: 21,
                  end: 25,
                  name: "with",
                },
                kind: "init",
                value: {
                  type: "ObjectExpression",
                  start: 27,
                  end: 43,
                  properties: [
                    {
                      type: "Property",
                      start: 29,
                      end: 41,
                      method: false,
                      shorthand: false,
                      computed: false,
                      key: {
                        type: "Identifier",
                        start: 29,
                        end: 33,
                        name: "type",
                      },
                      kind: "init",
                      value: {
                        type: "Literal",
                        start: 35,
                        end: 41,
                        value: "json",
                        raw: '"json"',
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      },
    ],
    sourceType: "module",
  },
  { sourceType: "module", ecmaVersion: 16 }
);

test(
  'import(\"foo.json\", foo );',
  {
    type: "Program",
    start: 0,
    end: 25,
    body: [
      {
        type: "ExpressionStatement",
        start: 0,
        end: 25,
        expression: {
          type: "ImportExpression",
          start: 0,
          end: 24,
          source: {
            type: "Literal",
            start: 7,
            end: 17,
            value: "foo.json",
            raw: '"foo.json"',
          },
          options: {
            type: "Identifier",
            start: 19,
            end: 22,
            name: "foo",
          },
        },
      },
    ],
    sourceType: "module",
  },
  { sourceType: "module", ecmaVersion: 16 }
);

test(
  'import "./foo.json" with { foo: "bar" };', // Allow unknown attributes
  {
    type: "Program",
    start: 0,
    end: 40,
    body: [
      {
        type: "ImportDeclaration",
        start: 0,
        end: 40,
        specifiers: [],
        source: {
          type: "Literal",
          start: 7,
          end: 19,
          value: "./foo.json",
          raw: '"./foo.json"',
        },
        attributes: [
          {
            type: "ImportAttribute",
            start: 27,
            end: 37,
            key: {
              type: "Identifier",
              start: 27,
              end: 30,
              name: "foo",
            },
            value: {
              type: "Literal",
              start: 32,
              end: 37,
              value: "bar",
              raw: '"bar"',
            },
          },
        ],
      },
    ],
    sourceType: "module",
  },
  { sourceType: "module", ecmaVersion: 16 }
);

test(
  'import "./foo.json" with { "type": "json" };', // Allow string key
  {
    type: "Program",
    start: 0,
    end: 44,
    body: [
      {
        type: "ImportDeclaration",
        start: 0,
        end: 44,
        specifiers: [],
        source: {
          type: "Literal",
          start: 7,
          end: 19,
          value: "./foo.json",
          raw: '"./foo.json"',
        },
        attributes: [
          {
            type: "ImportAttribute",
            start: 27,
            end: 41,
            key: {
              type: "Literal",
              start: 27,
              end: 33,
              value: "type",
              raw: '"type"',
            },
            value: {
              type: "Literal",
              start: 35,
              end: 41,
              value: "json",
              raw: '"json"',
            },
          },
        ],
      },
    ],
    sourceType: "module",
  },
  { sourceType: "module", ecmaVersion: 16 }
);

test(
  'import "./foo.json" with { a: "a", b: "b" };', // Allow multiple attributes
  {
    type: "Program",
    start: 0,
    end: 44,
    body: [
      {
        type: "ImportDeclaration",
        start: 0,
        end: 44,
        specifiers: [],
        source: {
          type: "Literal",
          start: 7,
          end: 19,
          value: "./foo.json",
          raw: '"./foo.json"',
        },
        attributes: [
          {
            type: "ImportAttribute",
            start: 27,
            end: 33,
            key: {
              type: "Identifier",
              start: 27,
              end: 28,
              name: "a",
            },
            value: {
              type: "Literal",
              start: 30,
              end: 33,
              value: "a",
              raw: '"a"',
            },
          },
          {
            type: "ImportAttribute",
            start: 35,
            end: 41,
            key: {
              type: "Identifier",
              start: 35,
              end: 36,
              name: "b",
            },
            value: {
              type: "Literal",
              start: 38,
              end: 41,
              value: "b",
              raw: '"b"',
            },
          },
        ],
      },
    ],
    sourceType: "module",
  },
  { sourceType: "module", ecmaVersion: 16 }
);

test(
  'import "./foo.json" with { "type": "json",  };', // Allow trailing comma
  {
    type: "Program",
    start: 0,
    end: 46,
    body: [
      {
        type: "ImportDeclaration",
        start: 0,
        end: 46,
        specifiers: [],
        source: {
          type: "Literal",
          start: 7,
          end: 19,
          value: "./foo.json",
          raw: '"./foo.json"',
        },
        attributes: [
          {
            type: "ImportAttribute",
            start: 27,
            end: 41,
            key: {
              type: "Literal",
              start: 27,
              end: 33,
              value: "type",
              raw: '"type"',
            },
            value: {
              type: "Literal",
              start: 35,
              end: 41,
              value: "json",
              raw: '"json"',
            },
          },
        ],
      },
    ],
    sourceType: "module",
  },
  { sourceType: "module", ecmaVersion: 16 }
);

testFail(
  'import "./foo.json" with { 42: "s" };', // Disallow number key
  "Unexpected token (1:27)",
  { sourceType: "module", ecmaVersion: 16 }
);

testFail(
  'import "./foo.json" with { type: 42 };', // Disallow number value
  "Unexpected token (1:33)",
  { sourceType: "module", ecmaVersion: 16 }
);

testFail(
  'import "./foo.json" with { type: "json", type: "html" };', // Disallow duplicate key
  "Duplicate attribute key 'type' (1:41)",
  { sourceType: "module", ecmaVersion: 16 }
);

testFail(
  'import "./foo.json" with { type: "json", , };',
  "Unexpected token (1:41)",
  { sourceType: "module", ecmaVersion: 16 }
);

testFail('export { json } with { type: "json" };', "Unexpected token (1:16)", {
  sourceType: "module",
  ecmaVersion: 16,
});

testFail('import("foo.json", , );', "Unexpected token (1:19)", {
  sourceType: "module",
  ecmaVersion: 16,
});

testFail('import("foo.json", foo , , );', "Unexpected token (1:25)", {
  sourceType: "module",
  ecmaVersion: 16,
});
