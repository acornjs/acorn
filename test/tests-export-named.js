// Tests for `ExportNamedDeclaration`

import { test } from "./driver.js";
import { testFail } from "./driver.js";

//------------------------------------------------------------------------------
// export {x} from "source"
//------------------------------------------------------------------------------

test("export {x} from \"source\"", {
  "type": "Program",
  "start": 0,
  "end": 24,
  "body": [
    {
      "type": "ExportNamedDeclaration",
      "start": 0,
      "end": 24,
      "declaration": null,
      "specifiers": [
        {
          "type": "ExportSpecifier",
          "start": 8,
          "end": 9,
          "local": {
            "type": "Identifier",
            "start": 8,
            "end": 9,
            "name": "x"
          },
          "exported": {
            "type": "Identifier",
            "start": 8,
            "end": 9,
            "name": "x"
          }
        }
      ],
      "source": {
        "type": "Literal",
        "start": 16,
        "end": 24,
        "value": "source",
        "raw": "\"source\""
      },
      "attributes": []
    }
  ],
  "sourceType": "module"
}, { sourceType: "module", ecmaVersion: 16 })

test("export {x as y} from \"source\"", {
  "type": "Program",
  "start": 0,
  "end": 29,
  "body": [
    {
      "type": "ExportNamedDeclaration",
      "start": 0,
      "end": 29,
      "declaration": null,
      "specifiers": [
        {
          "type": "ExportSpecifier",
          "start": 8,
          "end": 14,
          "local": {
            "type": "Identifier",
            "start": 8,
            "end": 9,
            "name": "x"
          },
          "exported": {
            "type": "Identifier",
            "start": 13,
            "end": 14,
            "name": "y"
          }
        }
      ],
      "source": {
        "type": "Literal",
        "start": 21,
        "end": 29,
        "value": "source",
        "raw": "\"source\""
      },
      "attributes": []
    }
  ],
  "sourceType": "module"
}, { sourceType: "module", ecmaVersion: 16 })

//------------------------------------------------------------------------------
// export {x}
//------------------------------------------------------------------------------

test("let x; export {x};", {
  "type": "Program",
  "start": 0,
  "end": 18,
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 0,
      "end": 6,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 4,
          "end": 5,
          "id": {
            "type": "Identifier",
            "start": 4,
            "end": 5,
            "name": "x"
          },
          "init": null
        }
      ],
      "kind": "let"
    },
    {
      "type": "ExportNamedDeclaration",
      "start": 7,
      "end": 18,
      "declaration": null,
      "specifiers": [
        {
          "type": "ExportSpecifier",
          "start": 15,
          "end": 16,
          "local": {
            "type": "Identifier",
            "start": 15,
            "end": 16,
            "name": "x"
          },
          "exported": {
            "type": "Identifier",
            "start": 15,
            "end": 16,
            "name": "x"
          }
        }
      ],
      "source": null,
      "attributes": []
    }
  ],
  "sourceType": "module"
}, { sourceType: "module", ecmaVersion: 16 })

test("let x; export {x as y};", {
  "type": "Program",
  "start": 0,
  "end": 23,
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 0,
      "end": 6,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 4,
          "end": 5,
          "id": {
            "type": "Identifier",
            "start": 4,
            "end": 5,
            "name": "x"
          },
          "init": null
        }
      ],
      "kind": "let"
    },
    {
      "type": "ExportNamedDeclaration",
      "start": 7,
      "end": 23,
      "declaration": null,
      "specifiers": [
        {
          "type": "ExportSpecifier",
          "start": 15,
          "end": 21,
          "local": {
            "type": "Identifier",
            "start": 15,
            "end": 16,
            "name": "x"
          },
          "exported": {
            "type": "Identifier",
            "start": 20,
            "end": 21,
            "name": "y"
          }
        }
      ],
      "source": null,
      "attributes": []
    }
  ],
  "sourceType": "module"
}, {sourceType: "module", ecmaVersion: 16})

testFail("export {x} from \"source\"", "'import' and 'export' may appear only with 'sourceType: module' (1:0)", { sourceType: "script", ecmaVersion: 11 })
testFail("export {x as y} from \"source\"", "'import' and 'export' may appear only with 'sourceType: module' (1:0)", { sourceType: "script", ecmaVersion: 11 })
testFail("export {x}; let x;", "'import' and 'export' may appear only with 'sourceType: module' (1:0)", { sourceType: "script", ecmaVersion: 11 })
testFail("export {x as y}; let x;", "'import' and 'export' may appear only with 'sourceType: module' (1:0)", { sourceType: "script", ecmaVersion: 11 })
