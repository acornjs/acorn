if (typeof exports !== "undefined") {
  var test = require("./driver.js").test
  var testFail = require("./driver.js").testFail
}

//------------------------------------------------------------------------------
// await-top-level
//------------------------------------------------------------------------------

testFail("await 1", "Unexpected token (1:6)", {ecmaVersion: 8})
test("await 1", {
  "type": "Program",
  "start": 0,
  "end": 7,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 7,
      "expression": {
        "type": "AwaitExpression",
        "start": 0,
        "end": 7,
        "argument": {
          "type": "Literal",
          "start": 6,
          "end": 7,
          "value": 1
        }
      }
    }
  ]
}, {allowAwaitOutsideFunction: true, ecmaVersion: 8})
testFail("function foo() {return await 1}", "Unexpected token (1:29)", {ecmaVersion: 8})
testFail("function foo() {return await 1}", "Unexpected token (1:29)", {
  allowAwaitOutsideFunction: true,
  ecmaVersion: 8
})
// ES2022
test("await 1", {
  "type": "Program",
  "start": 0,
  "end": 7,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 7,
      "expression": {
        "type": "AwaitExpression",
        "start": 0,
        "end": 7,
        "argument": {
          "type": "Literal",
          "start": 6,
          "end": 7,
          "value": 1
        }
      }
    }
  ]
}, {ecmaVersion: 13, sourceType: "module"})
testFail("function foo() {return await 1}", "Unexpected token (1:29)", {ecmaVersion: 13})
testFail("await 1", "Unexpected token (1:6)", {
  allowAwaitOutsideFunction: false,
  ecmaVersion: 13
})
testFail("await 1", "Unexpected token (1:6)", {ecmaVersion: 12})
