// Tests for ECMAScript 2021 `&&=`, `||=`, `??=`

if (typeof exports !== "undefined") {
  var test = require("./driver.js").test;
  var testFail = require("./driver.js").testFail;
}

test(
  "a &&= b",
  {
    "type": "Program",
    "start": 0,
    "end": 7,
    "body": [
      {
        "type": "ExpressionStatement",
        "start": 0,
        "end": 7,
        "expression": {
          "type": "AssignmentExpression",
          "start": 0,
          "end": 7,
          "operator": "&&=",
          "left": {
            "type": "Identifier",
            "start": 0,
            "end": 1,
            "name": "a"
          },
          "right": {
            "type": "Identifier",
            "start": 6,
            "end": 7,
            "name": "b"
          }
        }
      }
    ],
    "sourceType": "script"
  },
  { ecmaVersion: 12 }
);

test(
  "a ||= b",
  {
    "type": "Program",
    "start": 0,
    "end": 7,
    "body": [
      {
        "type": "ExpressionStatement",
        "start": 0,
        "end": 7,
        "expression": {
          "type": "AssignmentExpression",
          "start": 0,
          "end": 7,
          "operator": "||=",
          "left": {
            "type": "Identifier",
            "start": 0,
            "end": 1,
            "name": "a"
          },
          "right": {
            "type": "Identifier",
            "start": 6,
            "end": 7,
            "name": "b"
          }
        }
      }
    ],
    "sourceType": "script"
  },
  { ecmaVersion: 12 }
);

test(
  "a ??= b",
  {
    "type": "Program",
    "start": 0,
    "end": 7,
    "body": [
      {
        "type": "ExpressionStatement",
        "start": 0,
        "end": 7,
        "expression": {
          "type": "AssignmentExpression",
          "start": 0,
          "end": 7,
          "operator": "??=",
          "left": {
            "type": "Identifier",
            "start": 0,
            "end": 1,
            "name": "a"
          },
          "right": {
            "type": "Identifier",
            "start": 6,
            "end": 7,
            "name": "b"
          }
        }
      }
    ],
    "sourceType": "script"
  },
  { ecmaVersion: 12 }
);

test(
  "a &&= b ||= c ??= d",
  {
    "type": "Program",
    "start": 0,
    "end": 19,
    "body": [
      {
        "type": "ExpressionStatement",
        "start": 0,
        "end": 19,
        "expression": {
          "type": "AssignmentExpression",
          "start": 0,
          "end": 19,
          "operator": "&&=",
          "left": {
            "type": "Identifier",
            "start": 0,
            "end": 1,
            "name": "a"
          },
          "right": {
            "type": "AssignmentExpression",
            "start": 6,
            "end": 19,
            "operator": "||=",
            "left": {
              "type": "Identifier",
              "start": 6,
              "end": 7,
              "name": "b"
            },
            "right": {
              "type": "AssignmentExpression",
              "start": 12,
              "end": 19,
              "operator": "??=",
              "left": {
                "type": "Identifier",
                "start": 12,
                "end": 13,
                "name": "c"
              },
              "right": {
                "type": "Identifier",
                "start": 18,
                "end": 19,
                "name": "d"
              }
            }
          }
        }
      }
    ],
    "sourceType": "script"
  },
  { ecmaVersion: 12 }
);

testFail("a &&= b", "Unexpected token (1:4)", { ecmaVersion: 11 });
testFail("a ||= b", "Unexpected token (1:4)", { ecmaVersion: 11 });
testFail("a ??= b", "Unexpected token (1:4)", { ecmaVersion: 11 });

testFail("({a} &&= b)", "Assigning to rvalue (1:1)", { ecmaVersion: 12 });
testFail("({a} ||= b)", "Assigning to rvalue (1:1)", { ecmaVersion: 12 });
testFail("({a} ??= b)", "Assigning to rvalue (1:1)", { ecmaVersion: 12 });
