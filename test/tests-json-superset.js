import { test } from "./driver.js";
import { testFail } from "./driver.js";

test("'\u2029'", {}, {ecmaVersion: 2019})
test("'\u2028'", {}, {ecmaVersion: 2019})
test("\"\u2029\"", {}, {ecmaVersion: 2019})
test("\"\u2028\"", {}, {ecmaVersion: 2019})
test("`\u2029`", {}, {ecmaVersion: 2019})
test("`\u2028`", {}, {ecmaVersion: 2019})
testFail("/\u2029/", "Unterminated regular expression (1:1)", {ecmaVersion: 2019})
testFail("/\u2028/", "Unterminated regular expression (1:1)", {ecmaVersion: 2019})
