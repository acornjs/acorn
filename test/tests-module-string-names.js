if (typeof exports !== "undefined") {
  var test = require("./driver.js").test;
  var testFail = require("./driver.js").testFail;
}

test(
  'import {"學而時習之，不亦說乎？" as quotation} from "Confucius";',
  {
    type: "Program",
    start: 0,
    end: 53,
    body: [
      {
        type: "ImportDeclaration",
        start: 0,
        end: 53,
        specifiers: [
          {
            type: "ImportSpecifier",
            start: 8,
            end: 34,
            imported: {
              type: "Literal",
              start: 8,
              end: 21,
              value: "學而時習之，不亦說乎？",
              raw: '"學而時習之，不亦說乎？"',
            },
            local: {
              type: "Identifier",
              start: 25,
              end: 34,
              name: "quotation",
            },
          },
        ],
        source: {
          type: "Literal",
          start: 41,
          end: 52,
          value: "Confucius",
          raw: '"Confucius"',
        },
      },
    ],
    sourceType: "module",
  },
  { sourceType: "module", ecmaVersion: 13 }
);

test(
  'const quotation = ""; export { quotation as "學而時習之，不亦說乎？" };',
  {
    type: "Program",
    start: 0,
    end: 60,
    body: [
      {
        type: "VariableDeclaration",
        start: 0,
        end: 21,
        declarations: [
          {
            type: "VariableDeclarator",
            start: 6,
            end: 20,
            id: {
              type: "Identifier",
              start: 6,
              end: 15,
              name: "quotation",
            },
            init: {
              type: "Literal",
              start: 18,
              end: 20,
              value: "",
              raw: '""',
            },
          },
        ],
        kind: "const",
      },
      {
        type: "ExportNamedDeclaration",
        start: 22,
        end: 60,
        declaration: null,
        specifiers: [
          {
            type: "ExportSpecifier",
            start: 31,
            end: 57,
            local: {
              type: "Identifier",
              start: 31,
              end: 40,
              name: "quotation",
            },
            exported: {
              type: "Literal",
              start: 44,
              end: 57,
              value: "學而時習之，不亦說乎？",
              raw: '"學而時習之，不亦說乎？"',
            },
          },
        ],
        source: null,
      },
    ],
    sourceType: "module",
  },
  { sourceType: "module", ecmaVersion: 13 }
);

test(
  'export * as "忠恕。" from "Confucius";',
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
          type: "Literal",
          start: 12,
          end: 17,
          value: "忠恕。",
          raw: '"忠恕。"',
        },
        source: {
          type: "Literal",
          start: 23,
          end: 34,
          value: "Confucius",
          raw: '"Confucius"',
        },
      },
    ],
    sourceType: "module",
  },
  { sourceType: "module", ecmaVersion: 13 }
);

test(
  'export { "學而時習之，不亦說乎？", "吾道一以貫之。" as "忠恕。" } from "Confucius";',
  {
    type: "Program",
    start: 0,
    end: 62,
    body: [
      {
        type: "ExportNamedDeclaration",
        start: 0,
        end: 62,
        declaration: null,
        specifiers: [
          {
            type: "ExportSpecifier",
            start: 9,
            end: 22,
            local: {
              type: "Literal",
              start: 9,
              end: 22,
              value: "學而時習之，不亦說乎？",
              raw: '"學而時習之，不亦說乎？"',
            },
            exported: {
              type: "Literal",
              start: 9,
              end: 22,
              value: "學而時習之，不亦說乎？",
              raw: '"學而時習之，不亦說乎？"',
            },
          },
          {
            type: "ExportSpecifier",
            start: 24,
            end: 42,
            local: {
              type: "Literal",
              start: 24,
              end: 33,
              value: "吾道一以貫之。",
              raw: '"吾道一以貫之。"',
            },
            exported: {
              type: "Literal",
              start: 37,
              end: 42,
              value: "忠恕。",
              raw: '"忠恕。"',
            },
          },
        ],
        source: {
          type: "Literal",
          start: 50,
          end: 61,
          value: "Confucius",
          raw: '"Confucius"',
        },
      },
    ],
    sourceType: "module",
  },
  { sourceType: "module", ecmaVersion: 13 }
);

test(
  'import { "foo" as bar, "default" as qux } from "module-a";',
  {
    type: "Program",
    start: 0,
    end: 58,
    body: [
      {
        type: "ImportDeclaration",
        start: 0,
        end: 58,
        specifiers: [
          {
            type: "ImportSpecifier",
            start: 9,
            end: 21,
            imported: {
              type: "Literal",
              start: 9,
              end: 14,
              value: "foo",
              raw: '"foo"',
            },
            local: {
              type: "Identifier",
              start: 18,
              end: 21,
              name: "bar",
            },
          },
          {
            type: "ImportSpecifier",
            start: 23,
            end: 39,
            imported: {
              type: "Literal",
              start: 23,
              end: 32,
              value: "default",
              raw: '"default"',
            },
            local: {
              type: "Identifier",
              start: 36,
              end: 39,
              name: "qux",
            },
          },
        ],
        source: {
          type: "Literal",
          start: 47,
          end: 57,
          value: "module-a",
          raw: '"module-a"',
        },
      },
    ],
    sourceType: "module",
  },
  { sourceType: "module", ecmaVersion: 13 }
);

test(
  'import { "default" as quotation } from "Confucius";',
  {
    type: "Program",
    start: 0,
    end: 51,
    body: [
      {
        type: "ImportDeclaration",
        start: 0,
        end: 51,
        specifiers: [
          {
            type: "ImportSpecifier",
            start: 9,
            end: 31,
            imported: {
              type: "Literal",
              start: 9,
              end: 18,
              value: "default",
              raw: '"default"',
            },
            local: {
              type: "Identifier",
              start: 22,
              end: 31,
              name: "quotation",
            },
          },
        ],
        source: {
          type: "Literal",
          start: 39,
          end: 50,
          value: "Confucius",
          raw: '"Confucius"',
        },
      },
    ],
    sourceType: "module",
  },
  { sourceType: "module", ecmaVersion: 13 }
);

testFail(
  'export { "學而時習之，不亦說乎？", "吾道一以貫之。" as "忠恕。" };',
  "A string literal cannot be used as an exported binding without `from`. (1:9)",
  { sourceType: "module", ecmaVersion: 13 }
);

testFail(
  'const foo = 42; export { foo as "\ud800\udbff" }',
  "An export name cannot include a lone surrogate. (1:32)",
  { sourceType: "module", ecmaVersion: 13 }
);

testFail(
  'const foo = 43, bar = 32; export { foo, bar as "foo" };',
  "Duplicate export 'foo' (1:47)",
  { sourceType: "module", ecmaVersion: 13 }
);

test('export * as "a" from "mod1"\nexport * as "b" from "mod2"', {},
     { sourceType: "module", ecmaVersion: 13 });
