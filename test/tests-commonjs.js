if (typeof exports !== "undefined") {
  var test = require("./driver.js").test
  var testFail = require("./driver.js").testFail
}

// Top-level using declaration with commonjs
test("using x = resource;", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "Identifier",
        name: "x"
      },
      init: {
        type: "Identifier",
        name: "resource"
      }
    }],
    kind: "using"
  }],
  sourceType: "script"
}, {ecmaVersion: 17, sourceType: "commonjs"});

// Top-level new.target with commonjs
test("new.target", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "MetaProperty",
      meta: {type: "Identifier", name: "new"},
      property: {type: "Identifier", name: "target"}
    }
  }],
  sourceType: "script"
}, {ecmaVersion: 6, sourceType: "commonjs"});

// new.target at top-level scope with commonjs
test("let y = () => new.target", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "Identifier",
        name: "y"
      },
      init: {
        type: "ArrowFunctionExpression",
        body: {
          type: "MetaProperty",
          meta: {type: "Identifier", name: "new"},
          property: {type: "Identifier", name: "target"}
        },
        params: []
      }
    }],
    kind: "let"
  }],
  sourceType: "script"
}, {ecmaVersion: 6, sourceType: "commonjs"});

// Top-level return statement with commonjs
test("return {} / 2", {
  type: "Program",
  body: [{
    type: "ReturnStatement",
    argument: {
      type: "BinaryExpression",
      left: {
        type: "ObjectExpression",
        properties: []
      },
      right: {
        type: "Literal",
        value: 2
      },
      operator: "/"
    }
  }],
  sourceType: "script"
}, {sourceType: "commonjs"});

// Illegal return statement with commonjs
testFail(`class X { static { return; } }`, "'return' outside of function (1:19)", {ecmaVersion: 13, sourceType: "commonjs"});

// Top-level await using declaration with commonjs
testFail("await using x = resource;", "Await using cannot appear outside of async function (1:0)", {ecmaVersion: 17, sourceType: "commonjs"});

// Disallowing allowAwaitOutsideFunction with commonjs
testFail("await 1", "Cannot use allowAwaitOutsideFunction with sourceType: commonjs", {allowAwaitOutsideFunction: true, sourceType: "commonjs"});
testFail("x", "Cannot use allowAwaitOutsideFunction with sourceType: commonjs", {allowAwaitOutsideFunction: true, sourceType: "commonjs"});
test("x", {}, {allowAwaitOutsideFunction: false, sourceType: "commonjs"});
