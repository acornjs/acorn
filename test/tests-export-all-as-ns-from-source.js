
if (typeof exports !== "undefined") {
  var driver = require("./driver.js");
  var test = driver.test, testFail = driver.testFail;
}

//------------------------------------------------------------------------------
// export * as ns from "source"
//------------------------------------------------------------------------------

test("export * as ns from \"source\"", {
  "type": "Program",
  "start": 0,
  "end": 28,
  "body": [
    {
      "type": "ExportAllDeclaration",
      "start": 0,
      "end": 28,
      "exported": {
        "type": "Identifier",
        "start": 12,
        "end": 14,
        "name": "ns"
      },
      "source": {
        "type": "Literal",
        "start": 20,
        "end": 28,
        "value": "source",
        "raw": "\"source\""
      }
    }
  ],
  "sourceType": "module"
}, { sourceType: "module", ecmaVersion: 11 })

test("export * as foo from \"bar\"", {
  "type": "Program",
  "start": 0,
  "end": 26,
  "body": [
    {
      "type": "ExportAllDeclaration",
      "start": 0,
      "end": 26,
      "exported": {
        "type": "Identifier",
        "start": 12,
        "end": 15,
        "name": "foo"
      },
      "source": {
        "type": "Literal",
        "start": 21,
        "end": 26,
        "value": "bar",
        "raw": "\"bar\""
      }
    }
  ],
  "sourceType": "module"
}, { sourceType: "module", ecmaVersion: 11 })

test("export * from \"source\"", {
  "type": "Program",
  "start": 0,
  "end": 22,
  "body": [
    {
      "type": "ExportAllDeclaration",
      "start": 0,
      "end": 22,
      "exported": null,
      "source": {
        "type": "Literal",
        "start": 14,
        "end": 22,
        "value": "source",
        "raw": "\"source\""
      }
    }
  ],
  "sourceType": "module"
}, { sourceType: "module", ecmaVersion: 11 })

test("export * from 'a';", {
  type: "Program",
  body: [
    {
      type: "ExportAllDeclaration",
      exported: null,
      source: {
        type: "Literal",
      }
    }
  ]
}, {sourceType: "module", ecmaVersion: 11})

testFail("export * as ns from \"source\"", "'import' and 'export' may appear only with 'sourceType: module' (1:0)", { sourceType: "script", ecmaVersion: 11 })
testFail("export * as ns from \"source\"", "Unexpected token (1:9)", { sourceType: "module", ecmaVersion: 10 })
testFail("export * as ns", "Unexpected token (1:14)", { sourceType: "module", ecmaVersion: 11 })
testFail("export * as from \"source\"", "Unexpected token (1:17)", { sourceType: "module", ecmaVersion: 11 })
testFail("export * as ns \"source\"", "Unexpected token (1:15)", { sourceType: "module", ecmaVersion: 11 })
testFail("export {} as ns from \"source\"", "Unexpected token (1:10)", { sourceType: "module", ecmaVersion: 11 })
