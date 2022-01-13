if (typeof exports !== "undefined") {
  var test = require("./driver.js").test
  var testFail = require("./driver.js").testFail
}

// https://github.com/tc39/ecma262/pull/1869
testFail("/(?<\\ud835\\udc9c>.)/", "Invalid regular expression: /(?<\\ud835\\udc9c>.)/: Invalid capture group name (1:1)", { ecmaVersion: 2019 })
test("/(?<\\ud835\\udc9c>.)/", {}, { ecmaVersion: 2020 })
test("/(?<\\ud835\\udc9c>.)/u", {}, { ecmaVersion: 2019 })
test("/(?<\\ud835\\udc9c>.)/u", {}, { ecmaVersion: 2020 })

testFail("/(?<\\u{1d49c}>.)/", "Invalid regular expression: /(?<\\u{1d49c}>.)/: Invalid capture group name (1:1)", { ecmaVersion: 2019 })
test("/(?<\\u{1d49c}>.)/", {}, { ecmaVersion: 2020 })
test("/(?<\\u{1d49c}>.)/u", {}, { ecmaVersion: 2019 })
test("/(?<\\u{1d49c}>.)/u", {}, { ecmaVersion: 2020 })

testFail("/(?<𝒜>.)/", "Invalid regular expression: /(?<𝒜>.)/: Invalid capture group name (1:1)", { ecmaVersion: 2019 })
test("/(?<𝒜>.)/", {}, { ecmaVersion: 2020 })
test("/(?<𝒜>.)/u", {}, { ecmaVersion: 2019 })
test("/(?<𝒜>.)/u", {}, { ecmaVersion: 2020 })

