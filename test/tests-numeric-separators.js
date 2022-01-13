// Tests for ECMAScript 2021 Numeric Separators

if (typeof exports !== "undefined") {
  var test = require("./driver.js").test;
  var testFail = require("./driver.js").testFail;
}

function bigint(str) {
  if (typeof BigInt !== "function") {
    return null
  }
  return BigInt(str)
}

test(
  "123_456",
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
          "type": "Literal",
          "start": 0,
          "end": 7,
          "value": 123456,
          "raw": "123_456"
        }
      }
    ],
    "sourceType": "script"
  },
  { ecmaVersion: 12 }
);

test(
  "123_456.123_456e+123_456",
  {
    "type": "Program",
    "start": 0,
    "end": 24,
    "body": [
      {
        "type": "ExpressionStatement",
        "start": 0,
        "end": 24,
        "expression": {
          "type": "Literal",
          "start": 0,
          "end": 24,
          "value": 123456.123456e+123456,
          "raw": "123_456.123_456e+123_456"
        }
      }
    ],
    "sourceType": "script"
  },
  { ecmaVersion: 12 }
);

test(
  "0b1010_0001",
  {
    "type": "Program",
    "start": 0,
    "end": 11,
    "body": [
      {
        "type": "ExpressionStatement",
        "start": 0,
        "end": 11,
        "expression": {
          "type": "Literal",
          "start": 0,
          "end": 11,
          "value": 0b10100001,
          "raw": "0b1010_0001"
        }
      }
    ],
    "sourceType": "script"
  },
  { ecmaVersion: 12 }
);

test(
  "0xDEAD_BEAF",
  {
    "type": "Program",
    "start": 0,
    "end": 11,
    "body": [
      {
        "type": "ExpressionStatement",
        "start": 0,
        "end": 11,
        "expression": {
          "type": "Literal",
          "start": 0,
          "end": 11,
          "value": 0xDEADBEAF,
          "raw": "0xDEAD_BEAF"
        }
      }
    ],
    "sourceType": "script"
  },
  { ecmaVersion: 12 }
);

test(
  "0o755_666",
  {
    "type": "Program",
    "start": 0,
    "end": 9,
    "body": [
      {
        "type": "ExpressionStatement",
        "start": 0,
        "end": 9,
        "expression": {
          "type": "Literal",
          "start": 0,
          "end": 9,
          "value": 0o755666,
          "raw": "0o755_666"
        }
      }
    ],
    "sourceType": "script"
  },
  { ecmaVersion: 12 }
);

test(
  "123_456n",
  {
    "type": "Program",
    "start": 0,
    "end": 8,
    "body": [
      {
        "type": "ExpressionStatement",
        "start": 0,
        "end": 8,
        "expression": {
          "type": "Literal",
          "start": 0,
          "end": 8,
          "value": bigint("123456"),
          "raw": "123_456n",
          "bigint": "123456"
        }
      }
    ],
    "sourceType": "script"
  },
  { ecmaVersion: 12 }
);

test(
  ".012_345",
  {
    "type": "Program",
    "start": 0,
    "end": 8,
    "body": [
      {
        "type": "ExpressionStatement",
        "start": 0,
        "end": 8,
        "expression": {
          "type": "Literal",
          "start": 0,
          "end": 8,
          "value": 0.012345,
          "raw": ".012_345"
        }
      }
    ],
    "sourceType": "script"
  },
  { ecmaVersion: 12 }
);

testFail("123_456", "Identifier directly after number (1:3)", { ecmaVersion: 11 });
testFail("123__456", "Numeric separator must be exactly one underscore (1:4)", { ecmaVersion: 12 });
testFail("0._123456", "Numeric separator is not allowed at the first of digits (1:2)", { ecmaVersion: 12 });
testFail("123456_", "Numeric separator is not allowed at the last of digits (1:6)", { ecmaVersion: 12 });
testFail("012_345", "Numeric separator is not allowed in legacy octal numeric literals (1:3)", { ecmaVersion: 12 });

testFail("'\\x2_0'", "Bad character escape sequence (1:3)", { ecmaVersion: 12 });
testFail("'\\u00_20'", "Bad character escape sequence (1:3)", { ecmaVersion: 12 });
testFail("'\\u{2_0}'", "Bad character escape sequence (1:4)", { ecmaVersion: 12 });
