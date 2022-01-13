if (typeof exports !== "undefined") {
  var test = require("./driver.js").test
  var testFail = require("./driver.js").testFail
}

// https://github.com/tc39/ecma262/pull/1713
testFail("/a+(?<Z>z)?/d", "Invalid regular expression flag (1:1)", { ecmaVersion: 2021 })
test("/a+(?<Z>z)?/d", {}, { ecmaVersion: 2022 })
