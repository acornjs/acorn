// Tests for ECMAScript 2020 dynamic import

if (typeof exports != 'undefined') {
  var test = require('./driver.js').test;
  var testFail = require('./driver.js').testFail;
}

test(
  "import('dynamicImport.js')",
  {
    type: 'Program',
    start: 0,
    end: 26,
    body: [
      {
        type: 'ExpressionStatement',
        start: 0,
        end: 26,
        expression: {
          type: 'CallExpression',
          start: 0,
          end: 26,
          callee: { type: 'Import', start: 0, end: 6 },
          arguments: [
            {
              type: 'Literal',
              start: 7,
              end: 25,
              value: 'dynamicImport.js',
              raw: "'dynamicImport.js'"
            }
          ]
        }
      }
    ],
    sourceType: 'script'
  },
  { ecmaVersion: 11 }
);

test(
  "function* a() { yield import('http'); }",
  {
    type: 'Program',
    start: 0,
    end: 39,
    body: [
      {
        type: 'FunctionDeclaration',
        start: 0,
        end: 39,
        id: { type: 'Identifier', start: 10, end: 11, name: 'a' },
        expression: false,
        generator: true,
        async: false,
        params: [],
        body: {
          type: 'BlockStatement',
          start: 14,
          end: 39,
          body: [
            {
              type: 'ExpressionStatement',
              start: 16,
              end: 37,
              expression: {
                type: 'YieldExpression',
                start: 16,
                end: 36,
                delegate: false,
                argument: {
                  type: 'CallExpression',
                  start: 22,
                  end: 36,
                  callee: { type: 'Import', start: 22, end: 28 },
                  arguments: [{ type: 'Literal', start: 29, end: 35, value: 'http', raw: "'http'" }]
                }
              }
            }
          ]
        }
      }
    ],
    sourceType: 'script'
  },
  { ecmaVersion: 11 }
);

testFail('function failsParse() { return import.then(); }', 'Unexpected token (1:37)', {
  ecmaVersion: 11,
  loose: false
});

testFail("var dynImport = import; dynImport('http');", 'Unexpected token (1:22)', {
  ecmaVersion: 11,
  loose: false
});

testFail("import('test.js')", 'Unexpected token (1:6)', {
  ecmaVersion: 10,
  loose: false,
  sourceType: 'module'
});

testFail("import()", 'import() requires exactly one argument (1:0)', {
  ecmaVersion: 11,
  loose: false
});

testFail("import(a, b)", 'import() requires exactly one argument (1:0)', {
  ecmaVersion: 11,
  loose: false
});

testFail("import(...[a])", '... is not allowed in import() (1:7)', {
  ecmaVersion: 11,
  loose: false
});

testFail("import(source,)", 'Unexpected token (1:14)', {
  ecmaVersion: 11,
  loose: false
});

testFail("new import(source)", 'Cannot use new with import(...) (1:4)', {
  ecmaVersion: 11,
  loose: false
});
