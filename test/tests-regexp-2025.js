if (typeof exports !== "undefined") {
  var test = require("./driver.js").test
  var testFail = require("./driver.js").testFail
}

test("/(?<x>a)|(?<x>b)/", {}, {ecmaVersion: 2025})
testFail("/(?<x>a)|(?<x>b)/", "Invalid regular expression: /(?<x>a)|(?<x>b)/: Duplicate capture group name (1:1)", {ecmaVersion: 2024 })
testFail("/(?<x>a)(?<x>b)/", "Invalid regular expression: /(?<x>a)(?<x>b)/: Duplicate capture group name (1:1)", {ecmaVersion: 2025})
test("/(?:(?<x>a)|(?<x>b))\\k<x>/", {}, {ecmaVersion: 2025})
testFail("/(?:(?<x>a)|(?<x>b))\\k<x>/", "Invalid regular expression: /(?:(?<x>a)|(?<x>b))\\k<x>/: Duplicate capture group name (1:1)", {ecmaVersion: 2024 })
testFail("/(?:(?<x>a)(?<x>b))\\k<x>/", "Invalid regular expression: /(?:(?<x>a)(?<x>b))\\k<x>/: Duplicate capture group name (1:1)", {ecmaVersion: 2025})
test("/(?<y>a)(?<x>a)|(?<x>b)(?<y>b)/", {}, {ecmaVersion: 2025})
test("/(?<x>a)|(?<x>b)|(?<x>c)/", {}, {ecmaVersion: 2025})
test("/(?<x>a)|\\k<x>/", {}, {ecmaVersion: 2025})
testFail("/(?<x>a)|(?<x>b)(?<x>c)/", "Invalid regular expression: /(?<x>a)|(?<x>b)(?<x>c)/: Duplicate capture group name (1:1)", {ecmaVersion: 2025})
testFail("/(?:(?<x>a)|(?<x>b))(?<x>c)/", "Invalid regular expression: /(?:(?<x>a)|(?<x>b))(?<x>c)/: Duplicate capture group name (1:1)", {ecmaVersion: 2025})
testFail("/(?<x>a)(?:(?<x>b)|(?<x>c))/", "Invalid regular expression: /(?<x>a)(?:(?<x>b)|(?<x>c))/: Duplicate capture group name (1:1)", {ecmaVersion: 2025})
testFail("/(?:(?:(?<x>a)|(?<x>b))|(?:))(?<x>c)/", "Invalid regular expression: /(?:(?:(?<x>a)|(?<x>b))|(?:))(?<x>c)/: Duplicate capture group name (1:1)", {ecmaVersion: 2025})
