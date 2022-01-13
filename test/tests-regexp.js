if (typeof exports !== "undefined") {
  var test = require("./driver.js").test
  var testFail = require("./driver.js").testFail
}

test("/foo/", {}, { ecmaVersion: 5 })
test("/foo/", {}, { ecmaVersion: 2015 })
testFail("/foo/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/foo/u", {}, { ecmaVersion: 2015 })
test("/foo|bar/", {}, { ecmaVersion: 5 })
test("/foo|bar/", {}, { ecmaVersion: 2015 })
testFail("/foo|bar/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/foo|bar/u", {}, { ecmaVersion: 2015 })
test("/||||/", {}, { ecmaVersion: 5 })
test("/||||/", {}, { ecmaVersion: 2015 })
testFail("/||||/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/||||/u", {}, { ecmaVersion: 2015 })
test("/^|$|\\b|\\B/", {}, { ecmaVersion: 5 })
test("/^|$|\\b|\\B/", {}, { ecmaVersion: 2015 })
testFail("/^|$|\\b|\\B/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/^|$|\\b|\\B/u", {}, { ecmaVersion: 2015 })
testFail("/(/", "Invalid regular expression: /(/: Unterminated group (1:1)", { ecmaVersion: 5 })
testFail("/(/", "Invalid regular expression: /(/: Unterminated group (1:1)", { ecmaVersion: 2015 })
testFail("/(/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/(/u", "Invalid regular expression: /(/: Unterminated group (1:1)", { ecmaVersion: 2015 })
testFail("/(?/", "Invalid regular expression: /(?/: Invalid group (1:1)", { ecmaVersion: 5 })
testFail("/(?/", "Invalid regular expression: /(?/: Invalid group (1:1)", { ecmaVersion: 2015 })
testFail("/(?/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/(?/u", "Invalid regular expression: /(?/: Invalid group (1:1)", { ecmaVersion: 2015 })
testFail("/(?=/", "Invalid regular expression: /(?=/: Unterminated group (1:1)", { ecmaVersion: 5 })
testFail("/(?=/", "Invalid regular expression: /(?=/: Unterminated group (1:1)", { ecmaVersion: 2015 })
testFail("/(?=/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/(?=/u", "Invalid regular expression: /(?=/: Unterminated group (1:1)", { ecmaVersion: 2015 })
test("/(?=)/", {}, { ecmaVersion: 5 })
test("/(?=)/", {}, { ecmaVersion: 2015 })
testFail("/(?=)/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/(?=)/u", {}, { ecmaVersion: 2015 })
testFail("/(?=foo/", "Invalid regular expression: /(?=foo/: Unterminated group (1:1)", { ecmaVersion: 5 })
testFail("/(?=foo/", "Invalid regular expression: /(?=foo/: Unterminated group (1:1)", { ecmaVersion: 2015 })
testFail("/(?=foo/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/(?=foo/u", "Invalid regular expression: /(?=foo/: Unterminated group (1:1)", { ecmaVersion: 2015 })
test("/(?=foo)/", {}, { ecmaVersion: 5 })
test("/(?=foo)/", {}, { ecmaVersion: 2015 })
testFail("/(?=foo)/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/(?=foo)/u", {}, { ecmaVersion: 2015 })
testFail("/(?!/", "Invalid regular expression: /(?!/: Unterminated group (1:1)", { ecmaVersion: 5 })
testFail("/(?!/", "Invalid regular expression: /(?!/: Unterminated group (1:1)", { ecmaVersion: 2015 })
testFail("/(?!/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/(?!/u", "Invalid regular expression: /(?!/: Unterminated group (1:1)", { ecmaVersion: 2015 })
test("/(?!)/", {}, { ecmaVersion: 5 })
test("/(?!)/", {}, { ecmaVersion: 2015 })
testFail("/(?!)/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/(?!)/u", {}, { ecmaVersion: 2015 })
testFail("/(?!foo/", "Invalid regular expression: /(?!foo/: Unterminated group (1:1)", { ecmaVersion: 5 })
testFail("/(?!foo/", "Invalid regular expression: /(?!foo/: Unterminated group (1:1)", { ecmaVersion: 2015 })
testFail("/(?!foo/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/(?!foo/u", "Invalid regular expression: /(?!foo/: Unterminated group (1:1)", { ecmaVersion: 2015 })
test("/(?!foo)/", {}, { ecmaVersion: 5 })
test("/(?!foo)/", {}, { ecmaVersion: 2015 })
testFail("/(?!foo)/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/(?!foo)/u", {}, { ecmaVersion: 2015 })
test("/(?=a)*/", {}, { ecmaVersion: 5 })
test("/(?=a)*/", {}, { ecmaVersion: 2015 })
testFail("/(?=a)*/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/(?=a)*/u", "Invalid regular expression: /(?=a)*/: Invalid quantifier (1:1)", { ecmaVersion: 2015 })
test("/(?=a)+/", {}, { ecmaVersion: 5 })
test("/(?=a)+/", {}, { ecmaVersion: 2015 })
testFail("/(?=a)+/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/(?=a)+/u", "Invalid regular expression: /(?=a)+/: Invalid quantifier (1:1)", { ecmaVersion: 2015 })
test("/(?=a)?/", {}, { ecmaVersion: 5 })
test("/(?=a)?/", {}, { ecmaVersion: 2015 })
testFail("/(?=a)?/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/(?=a)?/u", "Invalid regular expression: /(?=a)?/: Invalid quantifier (1:1)", { ecmaVersion: 2015 })
test("/(?=a){/", {}, { ecmaVersion: 5 })
test("/(?=a){/", {}, { ecmaVersion: 2015 })
testFail("/(?=a){/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/(?=a){/u", "Invalid regular expression: /(?=a){/: Incomplete quantifier (1:1)", { ecmaVersion: 2015 })
test("/(?=a){}/", {}, { ecmaVersion: 5 })
test("/(?=a){}/", {}, { ecmaVersion: 2015 })
testFail("/(?=a){}/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/(?=a){}/u", "Invalid regular expression: /(?=a){}/: Incomplete quantifier (1:1)", { ecmaVersion: 2015 })
test("/(?=a){a}/", {}, { ecmaVersion: 5 })
test("/(?=a){a}/", {}, { ecmaVersion: 2015 })
testFail("/(?=a){a}/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/(?=a){a}/u", "Invalid regular expression: /(?=a){a}/: Incomplete quantifier (1:1)", { ecmaVersion: 2015 })
test("/(?=a){1}/", {}, { ecmaVersion: 5 })
test("/(?=a){1}/", {}, { ecmaVersion: 2015 })
testFail("/(?=a){1}/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/(?=a){1}/u", "Invalid regular expression: /(?=a){1}/: Invalid quantifier (1:1)", { ecmaVersion: 2015 })
test("/(?=a){1,}/", {}, { ecmaVersion: 5 })
test("/(?=a){1,}/", {}, { ecmaVersion: 2015 })
testFail("/(?=a){1,}/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/(?=a){1,}/u", "Invalid regular expression: /(?=a){1,}/: Invalid quantifier (1:1)", { ecmaVersion: 2015 })
test("/(?=a){1,2}/", {}, { ecmaVersion: 5 })
test("/(?=a){1,2}/", {}, { ecmaVersion: 2015 })
testFail("/(?=a){1,2}/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/(?=a){1,2}/u", "Invalid regular expression: /(?=a){1,2}/: Invalid quantifier (1:1)", { ecmaVersion: 2015 })
test("/a*/", {}, { ecmaVersion: 5 })
test("/a*/", {}, { ecmaVersion: 2015 })
testFail("/a*/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/a*/u", {}, { ecmaVersion: 2015 })
test("/a+/", {}, { ecmaVersion: 5 })
test("/a+/", {}, { ecmaVersion: 2015 })
testFail("/a+/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/a+/u", {}, { ecmaVersion: 2015 })
test("/a?/", {}, { ecmaVersion: 5 })
test("/a?/", {}, { ecmaVersion: 2015 })
testFail("/a?/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/a?/u", {}, { ecmaVersion: 2015 })
test("/a{/", {}, { ecmaVersion: 5 })
test("/a{/", {}, { ecmaVersion: 2015 })
testFail("/a{/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/a{/u", "Invalid regular expression: /a{/: Incomplete quantifier (1:1)", { ecmaVersion: 2015 })
test("/a{}/", {}, { ecmaVersion: 5 })
test("/a{}/", {}, { ecmaVersion: 2015 })
testFail("/a{}/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/a{}/u", "Invalid regular expression: /a{}/: Incomplete quantifier (1:1)", { ecmaVersion: 2015 })
test("/a{a}/", {}, { ecmaVersion: 5 })
test("/a{a}/", {}, { ecmaVersion: 2015 })
testFail("/a{a}/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/a{a}/u", "Invalid regular expression: /a{a}/: Incomplete quantifier (1:1)", { ecmaVersion: 2015 })
test("/a{1}/", {}, { ecmaVersion: 5 })
test("/a{1}/", {}, { ecmaVersion: 2015 })
testFail("/a{1}/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/a{1}/u", {}, { ecmaVersion: 2015 })
test("/a{1/", {}, { ecmaVersion: 5 })
test("/a{1/", {}, { ecmaVersion: 2015 })
testFail("/a{1/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/a{1/u", "Invalid regular expression: /a{1/: Incomplete quantifier (1:1)", { ecmaVersion: 2015 })
test("/a{1,}/", {}, { ecmaVersion: 5 })
test("/a{1,}/", {}, { ecmaVersion: 2015 })
testFail("/a{1,}/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/a{1,}/u", {}, { ecmaVersion: 2015 })
test("/a{1,/", {}, { ecmaVersion: 5 })
test("/a{1,/", {}, { ecmaVersion: 2015 })
testFail("/a{1,/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/a{1,/u", "Invalid regular expression: /a{1,/: Incomplete quantifier (1:1)", { ecmaVersion: 2015 })
test("/a{1,2}/", {}, { ecmaVersion: 5 })
test("/a{1,2}/", {}, { ecmaVersion: 2015 })
testFail("/a{1,2}/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/a{1,2}/u", {}, { ecmaVersion: 2015 })
test("/a{1,2/", {}, { ecmaVersion: 5 })
test("/a{1,2/", {}, { ecmaVersion: 2015 })
testFail("/a{1,2/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/a{1,2/u", "Invalid regular expression: /a{1,2/: Incomplete quantifier (1:1)", { ecmaVersion: 2015 })
testFail("/a{2,1}/", "Invalid regular expression: /a{2,1}/: numbers out of order in {} quantifier (1:1)", { ecmaVersion: 5 })
testFail("/a{2,1}/", "Invalid regular expression: /a{2,1}/: numbers out of order in {} quantifier (1:1)", { ecmaVersion: 2015 })
testFail("/a{2,1}/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/a{2,1}/u", "Invalid regular expression: /a{2,1}/: numbers out of order in {} quantifier (1:1)", { ecmaVersion: 2015 })
test("/a{2,1/", {}, { ecmaVersion: 5 })
test("/a{2,1/", {}, { ecmaVersion: 2015 })
testFail("/a{2,1/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/a{2,1/u", "Invalid regular expression: /a{2,1/: Incomplete quantifier (1:1)", { ecmaVersion: 2015 })
testFail("/(a{2,1}/", "Invalid regular expression: /(a{2,1}/: numbers out of order in {} quantifier (1:1)", { ecmaVersion: 5 })
testFail("/(a{2,1}/", "Invalid regular expression: /(a{2,1}/: numbers out of order in {} quantifier (1:1)", { ecmaVersion: 2015 })
testFail("/(a{2,1}/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/(a{2,1}/u", "Invalid regular expression: /(a{2,1}/: numbers out of order in {} quantifier (1:1)", { ecmaVersion: 2015 })
test("/a*?/", {}, { ecmaVersion: 5 })
test("/a*?/", {}, { ecmaVersion: 2015 })
testFail("/a*?/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/a*?/u", {}, { ecmaVersion: 2015 })
test("/a+?/", {}, { ecmaVersion: 5 })
test("/a+?/", {}, { ecmaVersion: 2015 })
testFail("/a+?/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/a+?/u", {}, { ecmaVersion: 2015 })
test("/a??/", {}, { ecmaVersion: 5 })
test("/a??/", {}, { ecmaVersion: 2015 })
testFail("/a??/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/a??/u", {}, { ecmaVersion: 2015 })
test("/a{?/", {}, { ecmaVersion: 5 })
test("/a{?/", {}, { ecmaVersion: 2015 })
testFail("/a{?/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/a{?/u", "Invalid regular expression: /a{?/: Incomplete quantifier (1:1)", { ecmaVersion: 2015 })
test("/a{}?/", {}, { ecmaVersion: 5 })
test("/a{}?/", {}, { ecmaVersion: 2015 })
testFail("/a{}?/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/a{}?/u", "Invalid regular expression: /a{}?/: Incomplete quantifier (1:1)", { ecmaVersion: 2015 })
test("/a{a}?/", {}, { ecmaVersion: 5 })
test("/a{a}?/", {}, { ecmaVersion: 2015 })
testFail("/a{a}?/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/a{a}?/u", "Invalid regular expression: /a{a}?/: Incomplete quantifier (1:1)", { ecmaVersion: 2015 })
test("/a{1}?/", {}, { ecmaVersion: 5 })
test("/a{1}?/", {}, { ecmaVersion: 2015 })
testFail("/a{1}?/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/a{1}?/u", {}, { ecmaVersion: 2015 })
test("/a{1?/", {}, { ecmaVersion: 5 })
test("/a{1?/", {}, { ecmaVersion: 2015 })
testFail("/a{1?/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/a{1?/u", "Invalid regular expression: /a{1?/: Incomplete quantifier (1:1)", { ecmaVersion: 2015 })
test("/a{1,}?/", {}, { ecmaVersion: 5 })
test("/a{1,}?/", {}, { ecmaVersion: 2015 })
testFail("/a{1,}?/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/a{1,}?/u", {}, { ecmaVersion: 2015 })
test("/a{1,?/", {}, { ecmaVersion: 5 })
test("/a{1,?/", {}, { ecmaVersion: 2015 })
testFail("/a{1,?/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/a{1,?/u", "Invalid regular expression: /a{1,?/: Incomplete quantifier (1:1)", { ecmaVersion: 2015 })
test("/a{1,2}?/", {}, { ecmaVersion: 5 })
test("/a{1,2}?/", {}, { ecmaVersion: 2015 })
testFail("/a{1,2}?/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/a{1,2}?/u", {}, { ecmaVersion: 2015 })
test("/a{1,2?/", {}, { ecmaVersion: 5 })
test("/a{1,2?/", {}, { ecmaVersion: 2015 })
testFail("/a{1,2?/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/a{1,2?/u", "Invalid regular expression: /a{1,2?/: Incomplete quantifier (1:1)", { ecmaVersion: 2015 })
testFail("/a{2,1}?/", "Invalid regular expression: /a{2,1}?/: numbers out of order in {} quantifier (1:1)", { ecmaVersion: 5 })
testFail("/a{2,1}?/", "Invalid regular expression: /a{2,1}?/: numbers out of order in {} quantifier (1:1)", { ecmaVersion: 2015 })
testFail("/a{2,1}?/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/a{2,1}?/u", "Invalid regular expression: /a{2,1}?/: numbers out of order in {} quantifier (1:1)", { ecmaVersion: 2015 })
test("/a{2,1?/", {}, { ecmaVersion: 5 })
test("/a{2,1?/", {}, { ecmaVersion: 2015 })
testFail("/a{2,1?/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/a{2,1?/u", "Invalid regular expression: /a{2,1?/: Incomplete quantifier (1:1)", { ecmaVersion: 2015 })
test("/👍🚀❇️/", {}, { ecmaVersion: 5 })
test("/👍🚀❇️/", {}, { ecmaVersion: 2015 })
testFail("/👍🚀❇️/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/👍🚀❇️/u", {}, { ecmaVersion: 2015 })
test("/^/", {}, { ecmaVersion: 5 })
test("/^/", {}, { ecmaVersion: 2015 })
testFail("/^/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/^/u", {}, { ecmaVersion: 2015 })
test("/$/", {}, { ecmaVersion: 5 })
test("/$/", {}, { ecmaVersion: 2015 })
testFail("/$/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/$/u", {}, { ecmaVersion: 2015 })
test("/./", {}, { ecmaVersion: 5 })
test("/./", {}, { ecmaVersion: 2015 })
testFail("/./u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/./u", {}, { ecmaVersion: 2015 })
testFail("/(*)/", "Invalid regular expression: /(*)/: Nothing to repeat (1:1)", { ecmaVersion: 5 })
testFail("/(*)/", "Invalid regular expression: /(*)/: Nothing to repeat (1:1)", { ecmaVersion: 2015 })
testFail("/(*)/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/(*)/u", "Invalid regular expression: /(*)/: Nothing to repeat (1:1)", { ecmaVersion: 2015 })
testFail("/+/", "Invalid regular expression: /+/: Nothing to repeat (1:1)", { ecmaVersion: 5 })
testFail("/+/", "Invalid regular expression: /+/: Nothing to repeat (1:1)", { ecmaVersion: 2015 })
testFail("/+/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/+/u", "Invalid regular expression: /+/: Nothing to repeat (1:1)", { ecmaVersion: 2015 })
testFail("/?/", "Invalid regular expression: /?/: Nothing to repeat (1:1)", { ecmaVersion: 5 })
testFail("/?/", "Invalid regular expression: /?/: Nothing to repeat (1:1)", { ecmaVersion: 2015 })
testFail("/?/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/?/u", "Invalid regular expression: /?/: Nothing to repeat (1:1)", { ecmaVersion: 2015 })
testFail("/(/", "Invalid regular expression: /(/: Unterminated group (1:1)", { ecmaVersion: 5 })
testFail("/(/", "Invalid regular expression: /(/: Unterminated group (1:1)", { ecmaVersion: 2015 })
testFail("/(/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/(/u", "Invalid regular expression: /(/: Unterminated group (1:1)", { ecmaVersion: 2015 })
testFail("/)/", "Invalid regular expression: /)/: Unmatched ')' (1:1)", { ecmaVersion: 5 })
testFail("/)/", "Invalid regular expression: /)/: Unmatched ')' (1:1)", { ecmaVersion: 2015 })
testFail("/)/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/)/u", "Invalid regular expression: /)/: Unmatched ')' (1:1)", { ecmaVersion: 2015 })
testFail("/[/", "Unterminated regular expression (1:1)", { ecmaVersion: 5 })
testFail("/[/", "Unterminated regular expression (1:1)", { ecmaVersion: 2015 })
testFail("/[/u", "Unterminated regular expression (1:1)", { ecmaVersion: 5 })
testFail("/[/u", "Unterminated regular expression (1:1)", { ecmaVersion: 2015 })
test("/]/", {}, { ecmaVersion: 5 })
test("/]/", {}, { ecmaVersion: 2015 })
testFail("/]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/]/u", "Invalid regular expression: /]/: Lone quantifier brackets (1:1)", { ecmaVersion: 2015 })
test("/{/", {}, { ecmaVersion: 5 })
test("/{/", {}, { ecmaVersion: 2015 })
testFail("/{/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/{/u", "Invalid regular expression: /{/: Lone quantifier brackets (1:1)", { ecmaVersion: 2015 })
test("/}/", {}, { ecmaVersion: 5 })
test("/}/", {}, { ecmaVersion: 2015 })
testFail("/}/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/}/u", "Invalid regular expression: /}/: Lone quantifier brackets (1:1)", { ecmaVersion: 2015 })
test("/|/", {}, { ecmaVersion: 5 })
test("/|/", {}, { ecmaVersion: 2015 })
testFail("/|/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/|/u", {}, { ecmaVersion: 2015 })
testFail("/^*/", "Invalid regular expression: /^*/: Nothing to repeat (1:1)", { ecmaVersion: 5 })
testFail("/^*/", "Invalid regular expression: /^*/: Nothing to repeat (1:1)", { ecmaVersion: 2015 })
testFail("/^*/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/^*/u", "Invalid regular expression: /^*/: Nothing to repeat (1:1)", { ecmaVersion: 2015 })
testFail("/$*/", "Invalid regular expression: /$*/: Nothing to repeat (1:1)", { ecmaVersion: 5 })
testFail("/$*/", "Invalid regular expression: /$*/: Nothing to repeat (1:1)", { ecmaVersion: 2015 })
testFail("/$*/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/$*/u", "Invalid regular expression: /$*/: Nothing to repeat (1:1)", { ecmaVersion: 2015 })
test("/${1,2/", {}, { ecmaVersion: 5 })
test("/${1,2/", {}, { ecmaVersion: 2015 })
testFail("/${1,2/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/${1,2/u", "Invalid regular expression: /${1,2/: Lone quantifier brackets (1:1)", { ecmaVersion: 2015 })
testFail("/${1,2}/", "Invalid regular expression: /${1,2}/: Nothing to repeat (1:1)", { ecmaVersion: 5 })
testFail("/${1,2}/", "Invalid regular expression: /${1,2}/: Nothing to repeat (1:1)", { ecmaVersion: 2015 })
testFail("/${1,2}/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/${1,2}/u", "Invalid regular expression: /${1,2}/: Nothing to repeat (1:1)", { ecmaVersion: 2015 })
testFail("/${2,1}/", "Invalid regular expression: /${2,1}/: Nothing to repeat (1:1)", { ecmaVersion: 5 })
testFail("/${2,1}/", "Invalid regular expression: /${2,1}/: Nothing to repeat (1:1)", { ecmaVersion: 2015 })
testFail("/${2,1}/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/${2,1}/u", "Invalid regular expression: /${2,1}/: Nothing to repeat (1:1)", { ecmaVersion: 2015 })
test("/\\1/", {}, { ecmaVersion: 5 })
test("/\\1/", {}, { ecmaVersion: 2015 })
testFail("/\\1/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/\\1/u", "Invalid regular expression: /\\1/: Invalid escape (1:1)", { ecmaVersion: 2015 })
test("/(a)\\1/", {}, { ecmaVersion: 5 })
test("/(a)\\1/", {}, { ecmaVersion: 2015 })
testFail("/(a)\\1/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/(a)\\1/u", {}, { ecmaVersion: 2015 })
test("/\\1(a)/", {}, { ecmaVersion: 5 })
test("/\\1(a)/", {}, { ecmaVersion: 2015 })
testFail("/\\1(a)/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\1(a)/u", {}, { ecmaVersion: 2015 })
testFail("/\\2(a)(/", "Invalid regular expression: /\\2(a)(/: Unterminated group (1:1)", { ecmaVersion: 5 })
testFail("/\\2(a)(/", "Invalid regular expression: /\\2(a)(/: Unterminated group (1:1)", { ecmaVersion: 2015 })
testFail("/\\2(a)(/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/\\2(a)(/u", "Invalid regular expression: /\\2(a)(/: Unterminated group (1:1)", { ecmaVersion: 2015 })
test("/(?:a)\\1/", {}, { ecmaVersion: 5 })
test("/(?:a)\\1/", {}, { ecmaVersion: 2015 })
testFail("/(?:a)\\1/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/(?:a)\\1/u", "Invalid regular expression: /(?:a)\\1/: Invalid escape (1:1)", { ecmaVersion: 2015 })
test("/(a)\\2/", {}, { ecmaVersion: 5 })
test("/(a)\\2/", {}, { ecmaVersion: 2015 })
testFail("/(a)\\2/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/(a)\\2/u", "Invalid regular expression: /(a)\\2/: Invalid escape (1:1)", { ecmaVersion: 2015 })
test("/(?:a)\\2/", {}, { ecmaVersion: 5 })
test("/(?:a)\\2/", {}, { ecmaVersion: 2015 })
testFail("/(?:a)\\2/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/(?:a)\\2/u", "Invalid regular expression: /(?:a)\\2/: Invalid escape (1:1)", { ecmaVersion: 2015 })
test("/(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)\\10/", {}, { ecmaVersion: 5 })
test("/(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)\\10/", {}, { ecmaVersion: 2015 })
testFail("/(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)\\10/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)\\10/u", {}, { ecmaVersion: 2015 })
test("/(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)\\11/", {}, { ecmaVersion: 5 })
test("/(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)\\11/", {}, { ecmaVersion: 2015 })
testFail("/(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)\\11/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)\\11/u", "Invalid regular expression: /(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)\\11/: Invalid escape (1:1)", { ecmaVersion: 2015 })
test("/(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)\\11/", {}, { ecmaVersion: 5 })
test("/(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)\\11/", {}, { ecmaVersion: 2015 })
testFail("/(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)\\11/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)\\11/u", {}, { ecmaVersion: 2015 })
testFail("/(?/", "Invalid regular expression: /(?/: Invalid group (1:1)", { ecmaVersion: 5 })
testFail("/(?/", "Invalid regular expression: /(?/: Invalid group (1:1)", { ecmaVersion: 2015 })
testFail("/(?/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/(?/u", "Invalid regular expression: /(?/: Invalid group (1:1)", { ecmaVersion: 2015 })
testFail("/(?a/", "Invalid regular expression: /(?a/: Invalid group (1:1)", { ecmaVersion: 5 })
testFail("/(?a/", "Invalid regular expression: /(?a/: Invalid group (1:1)", { ecmaVersion: 2015 })
testFail("/(?a/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/(?a/u", "Invalid regular expression: /(?a/: Invalid group (1:1)", { ecmaVersion: 2015 })
testFail("/(?a)/", "Invalid regular expression: /(?a)/: Invalid group (1:1)", { ecmaVersion: 5 })
testFail("/(?a)/", "Invalid regular expression: /(?a)/: Invalid group (1:1)", { ecmaVersion: 2015 })
testFail("/(?a)/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/(?a)/u", "Invalid regular expression: /(?a)/: Invalid group (1:1)", { ecmaVersion: 2015 })
testFail("/(?:/", "Invalid regular expression: /(?:/: Unterminated group (1:1)", { ecmaVersion: 5 })
testFail("/(?:/", "Invalid regular expression: /(?:/: Unterminated group (1:1)", { ecmaVersion: 2015 })
testFail("/(?:/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/(?:/u", "Invalid regular expression: /(?:/: Unterminated group (1:1)", { ecmaVersion: 2015 })
testFail("/(?:a/", "Invalid regular expression: /(?:a/: Unterminated group (1:1)", { ecmaVersion: 5 })
testFail("/(?:a/", "Invalid regular expression: /(?:a/: Unterminated group (1:1)", { ecmaVersion: 2015 })
testFail("/(?:a/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/(?:a/u", "Invalid regular expression: /(?:a/: Unterminated group (1:1)", { ecmaVersion: 2015 })
test("/(?:a)/", {}, { ecmaVersion: 5 })
test("/(?:a)/", {}, { ecmaVersion: 2015 })
testFail("/(?:a)/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/(?:a)/u", {}, { ecmaVersion: 2015 })
testFail("/(:a/", "Invalid regular expression: /(:a/: Unterminated group (1:1)", { ecmaVersion: 5 })
testFail("/(:a/", "Invalid regular expression: /(:a/: Unterminated group (1:1)", { ecmaVersion: 2015 })
testFail("/(:a/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/(:a/u", "Invalid regular expression: /(:a/: Unterminated group (1:1)", { ecmaVersion: 2015 })
test("/\\d/", {}, { ecmaVersion: 5 })
test("/\\d/", {}, { ecmaVersion: 2015 })
testFail("/\\d/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\d/u", {}, { ecmaVersion: 2015 })
test("/\\D/", {}, { ecmaVersion: 5 })
test("/\\D/", {}, { ecmaVersion: 2015 })
testFail("/\\D/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\D/u", {}, { ecmaVersion: 2015 })
test("/\\s/", {}, { ecmaVersion: 5 })
test("/\\s/", {}, { ecmaVersion: 2015 })
testFail("/\\s/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\s/u", {}, { ecmaVersion: 2015 })
test("/\\S/", {}, { ecmaVersion: 5 })
test("/\\S/", {}, { ecmaVersion: 2015 })
testFail("/\\S/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\S/u", {}, { ecmaVersion: 2015 })
test("/\\w/", {}, { ecmaVersion: 5 })
test("/\\w/", {}, { ecmaVersion: 2015 })
testFail("/\\w/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\w/u", {}, { ecmaVersion: 2015 })
test("/\\W/", {}, { ecmaVersion: 5 })
test("/\\W/", {}, { ecmaVersion: 2015 })
testFail("/\\W/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\W/u", {}, { ecmaVersion: 2015 })
test("/\\f/", {}, { ecmaVersion: 5 })
test("/\\f/", {}, { ecmaVersion: 2015 })
testFail("/\\f/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\f/u", {}, { ecmaVersion: 2015 })
test("/\\n/", {}, { ecmaVersion: 5 })
test("/\\n/", {}, { ecmaVersion: 2015 })
testFail("/\\n/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\n/u", {}, { ecmaVersion: 2015 })
test("/\\r/", {}, { ecmaVersion: 5 })
test("/\\r/", {}, { ecmaVersion: 2015 })
testFail("/\\r/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\r/u", {}, { ecmaVersion: 2015 })
test("/\\t/", {}, { ecmaVersion: 5 })
test("/\\t/", {}, { ecmaVersion: 2015 })
testFail("/\\t/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\t/u", {}, { ecmaVersion: 2015 })
test("/\\v/", {}, { ecmaVersion: 5 })
test("/\\v/", {}, { ecmaVersion: 2015 })
testFail("/\\v/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\v/u", {}, { ecmaVersion: 2015 })
test("/\\cA/", {}, { ecmaVersion: 5 })
test("/\\cA/", {}, { ecmaVersion: 2015 })
testFail("/\\cA/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\cA/u", {}, { ecmaVersion: 2015 })
test("/\\cz/", {}, { ecmaVersion: 5 })
test("/\\cz/", {}, { ecmaVersion: 2015 })
testFail("/\\cz/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\cz/u", {}, { ecmaVersion: 2015 })
test("/\\c1/", {}, { ecmaVersion: 5 })
test("/\\c1/", {}, { ecmaVersion: 2015 })
testFail("/\\c1/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/\\c1/u", "Invalid regular expression: /\\c1/: Invalid unicode escape (1:1)", { ecmaVersion: 2015 })
test("/\\c/", {}, { ecmaVersion: 5 })
test("/\\c/", {}, { ecmaVersion: 2015 })
testFail("/\\c/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/\\c/u", "Invalid regular expression: /\\c/: Invalid unicode escape (1:1)", { ecmaVersion: 2015 })
test("/\\0/", {}, { ecmaVersion: 5 })
test("/\\0/", {}, { ecmaVersion: 2015 })
testFail("/\\0/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\0/u", {}, { ecmaVersion: 2015 })
test("/\\u/", {}, { ecmaVersion: 5 })
test("/\\u/", {}, { ecmaVersion: 2015 })
testFail("/\\u/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/\\u/u", "Invalid regular expression: /\\u/: Invalid unicode escape (1:1)", { ecmaVersion: 2015 })
test("/\\u1/", {}, { ecmaVersion: 5 })
test("/\\u1/", {}, { ecmaVersion: 2015 })
testFail("/\\u1/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/\\u1/u", "Invalid regular expression: /\\u1/: Invalid unicode escape (1:1)", { ecmaVersion: 2015 })
test("/\\u12/", {}, { ecmaVersion: 5 })
test("/\\u12/", {}, { ecmaVersion: 2015 })
testFail("/\\u12/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/\\u12/u", "Invalid regular expression: /\\u12/: Invalid unicode escape (1:1)", { ecmaVersion: 2015 })
test("/\\u123/", {}, { ecmaVersion: 5 })
test("/\\u123/", {}, { ecmaVersion: 2015 })
testFail("/\\u123/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/\\u123/u", "Invalid regular expression: /\\u123/: Invalid unicode escape (1:1)", { ecmaVersion: 2015 })
test("/\\u1234/", {}, { ecmaVersion: 5 })
test("/\\u1234/", {}, { ecmaVersion: 2015 })
testFail("/\\u1234/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\u1234/u", {}, { ecmaVersion: 2015 })
test("/\\u12345/", {}, { ecmaVersion: 5 })
test("/\\u12345/", {}, { ecmaVersion: 2015 })
testFail("/\\u12345/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\u12345/u", {}, { ecmaVersion: 2015 })
test("/\\u{/", {}, { ecmaVersion: 5 })
test("/\\u{/", {}, { ecmaVersion: 2015 })
testFail("/\\u{/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/\\u{/u", "Invalid regular expression: /\\u{/: Invalid unicode escape (1:1)", { ecmaVersion: 2015 })
test("/\\u{z/", {}, { ecmaVersion: 5 })
test("/\\u{z/", {}, { ecmaVersion: 2015 })
testFail("/\\u{z/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/\\u{z/u", "Invalid regular expression: /\\u{z/: Invalid unicode escape (1:1)", { ecmaVersion: 2015 })
test("/\\u{a}/", {}, { ecmaVersion: 5 })
test("/\\u{a}/", {}, { ecmaVersion: 2015 })
testFail("/\\u{a}/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\u{a}/u", {}, { ecmaVersion: 2015 })
test("/\\u{20/", {}, { ecmaVersion: 5 })
test("/\\u{20/", {}, { ecmaVersion: 2015 })
testFail("/\\u{20/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/\\u{20/u", "Invalid regular expression: /\\u{20/: Invalid unicode escape (1:1)", { ecmaVersion: 2015 })
test("/\\u{20}/", {}, { ecmaVersion: 5 })
test("/\\u{20}/", {}, { ecmaVersion: 2015 })
testFail("/\\u{20}/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\u{20}/u", {}, { ecmaVersion: 2015 })
test("/\\u{10FFFF}/", {}, { ecmaVersion: 5 })
test("/\\u{10FFFF}/", {}, { ecmaVersion: 2015 })
testFail("/\\u{10FFFF}/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\u{10FFFF}/u", {}, { ecmaVersion: 2015 })
test("/\\u{110000}/", {}, { ecmaVersion: 5 })
test("/\\u{110000}/", {}, { ecmaVersion: 2015 })
testFail("/\\u{110000}/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/\\u{110000}/u", "Invalid regular expression: /\\u{110000}/: Invalid unicode escape (1:1)", { ecmaVersion: 2015 })
test("/\\u{00000001}/", {}, { ecmaVersion: 5 })
test("/\\u{00000001}/", {}, { ecmaVersion: 2015 })
testFail("/\\u{00000001}/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\u{00000001}/u", {}, { ecmaVersion: 2015 })
test("/\\377/", {}, { ecmaVersion: 5 })
test("/\\377/", {}, { ecmaVersion: 2015 })
testFail("/\\377/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/\\377/u", "Invalid regular expression: /\\377/: Invalid escape (1:1)", { ecmaVersion: 2015 })
test("/\\400/", {}, { ecmaVersion: 5 })
test("/\\400/", {}, { ecmaVersion: 2015 })
testFail("/\\400/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/\\400/u", "Invalid regular expression: /\\400/: Invalid escape (1:1)", { ecmaVersion: 2015 })
test("/\\^/", {}, { ecmaVersion: 5 })
test("/\\^/", {}, { ecmaVersion: 2015 })
testFail("/\\^/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\^/u", {}, { ecmaVersion: 2015 })
test("/\\$/", {}, { ecmaVersion: 5 })
test("/\\$/", {}, { ecmaVersion: 2015 })
testFail("/\\$/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\$/u", {}, { ecmaVersion: 2015 })
test("/\\./", {}, { ecmaVersion: 5 })
test("/\\./", {}, { ecmaVersion: 2015 })
testFail("/\\./u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\./u", {}, { ecmaVersion: 2015 })
test("/\\+/", {}, { ecmaVersion: 5 })
test("/\\+/", {}, { ecmaVersion: 2015 })
testFail("/\\+/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\+/u", {}, { ecmaVersion: 2015 })
test("/\\?/", {}, { ecmaVersion: 5 })
test("/\\?/", {}, { ecmaVersion: 2015 })
testFail("/\\?/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\?/u", {}, { ecmaVersion: 2015 })
test("/\\(/", {}, { ecmaVersion: 5 })
test("/\\(/", {}, { ecmaVersion: 2015 })
testFail("/\\(/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\(/u", {}, { ecmaVersion: 2015 })
test("/\\)/", {}, { ecmaVersion: 5 })
test("/\\)/", {}, { ecmaVersion: 2015 })
testFail("/\\)/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\)/u", {}, { ecmaVersion: 2015 })
test("/\\[/", {}, { ecmaVersion: 5 })
test("/\\[/", {}, { ecmaVersion: 2015 })
testFail("/\\[/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\[/u", {}, { ecmaVersion: 2015 })
test("/\\]/", {}, { ecmaVersion: 5 })
test("/\\]/", {}, { ecmaVersion: 2015 })
testFail("/\\]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\]/u", {}, { ecmaVersion: 2015 })
test("/\\{/", {}, { ecmaVersion: 5 })
test("/\\{/", {}, { ecmaVersion: 2015 })
testFail("/\\{/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\{/u", {}, { ecmaVersion: 2015 })
test("/\\}/", {}, { ecmaVersion: 5 })
test("/\\}/", {}, { ecmaVersion: 2015 })
testFail("/\\}/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\}/u", {}, { ecmaVersion: 2015 })
test("/\\|/", {}, { ecmaVersion: 5 })
test("/\\|/", {}, { ecmaVersion: 2015 })
testFail("/\\|/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\|/u", {}, { ecmaVersion: 2015 })
test("/\\//", {}, { ecmaVersion: 5 })
test("/\\//", {}, { ecmaVersion: 2015 })
testFail("/\\//u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\//u", {}, { ecmaVersion: 2015 })
test("/\\a/", {}, { ecmaVersion: 5 })
test("/\\a/", {}, { ecmaVersion: 2015 })
testFail("/\\a/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/\\a/u", "Invalid regular expression: /\\a/: Invalid escape (1:1)", { ecmaVersion: 2015 })
test("/\\s/", {}, { ecmaVersion: 5 })
test("/\\s/", {}, { ecmaVersion: 2015 })
testFail("/\\s/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/\\s/u", {}, { ecmaVersion: 2015 })
test("/[]/", {}, { ecmaVersion: 5 })
test("/[]/", {}, { ecmaVersion: 2015 })
testFail("/[]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[]/u", {}, { ecmaVersion: 2015 })
test("/[^-a-b-]/", {}, { ecmaVersion: 5 })
test("/[^-a-b-]/", {}, { ecmaVersion: 2015 })
testFail("/[^-a-b-]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[^-a-b-]/u", {}, { ecmaVersion: 2015 })
test("/[-]/", {}, { ecmaVersion: 5 })
test("/[-]/", {}, { ecmaVersion: 2015 })
testFail("/[-]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[-]/u", {}, { ecmaVersion: 2015 })
test("/[a]/", {}, { ecmaVersion: 5 })
test("/[a]/", {}, { ecmaVersion: 2015 })
testFail("/[a]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[a]/u", {}, { ecmaVersion: 2015 })
test("/[--]/", {}, { ecmaVersion: 5 })
test("/[--]/", {}, { ecmaVersion: 2015 })
testFail("/[--]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[--]/u", {}, { ecmaVersion: 2015 })
test("/[-a]/", {}, { ecmaVersion: 5 })
test("/[-a]/", {}, { ecmaVersion: 2015 })
testFail("/[-a]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[-a]/u", {}, { ecmaVersion: 2015 })
test("/[-a-]/", {}, { ecmaVersion: 5 })
test("/[-a-]/", {}, { ecmaVersion: 2015 })
testFail("/[-a-]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[-a-]/u", {}, { ecmaVersion: 2015 })
test("/[a-]/", {}, { ecmaVersion: 5 })
test("/[a-]/", {}, { ecmaVersion: 2015 })
testFail("/[a-]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[a-]/u", {}, { ecmaVersion: 2015 })
test("/[a-b]/", {}, { ecmaVersion: 5 })
test("/[a-b]/", {}, { ecmaVersion: 2015 })
testFail("/[a-b]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[a-b]/u", {}, { ecmaVersion: 2015 })
test("/[-a-b-]/", {}, { ecmaVersion: 5 })
test("/[-a-b-]/", {}, { ecmaVersion: 2015 })
testFail("/[-a-b-]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[-a-b-]/u", {}, { ecmaVersion: 2015 })
test("/[---]/", {}, { ecmaVersion: 5 })
test("/[---]/", {}, { ecmaVersion: 2015 })
testFail("/[---]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[---]/u", {}, { ecmaVersion: 2015 })
testFail("/[b-a]/", "Invalid regular expression: /[b-a]/: Range out of order in character class (1:1)", { ecmaVersion: 5 })
testFail("/[b-a]/", "Invalid regular expression: /[b-a]/: Range out of order in character class (1:1)", { ecmaVersion: 2015 })
testFail("/[b-a]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[b-a]/u", "Invalid regular expression: /[b-a]/: Range out of order in character class (1:1)", { ecmaVersion: 2015 })
test("/[a-b--/]/", {}, { ecmaVersion: 5 })
test("/[a-b--/]/", {}, { ecmaVersion: 2015 })
testFail("/[a-b--/]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[a-b--/]/u", {}, { ecmaVersion: 2015 })
testFail("/[a-b--+]/", "Invalid regular expression: /[a-b--+]/: Range out of order in character class (1:1)", { ecmaVersion: 5 })
testFail("/[a-b--+]/", "Invalid regular expression: /[a-b--+]/: Range out of order in character class (1:1)", { ecmaVersion: 2015 })
testFail("/[a-b--+]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[a-b--+]/u", "Invalid regular expression: /[a-b--+]/: Range out of order in character class (1:1)", { ecmaVersion: 2015 })
test("/[\\b-\\n]/", {}, { ecmaVersion: 5 })
test("/[\\b-\\n]/", {}, { ecmaVersion: 2015 })
testFail("/[\\b-\\n]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\b-\\n]/u", {}, { ecmaVersion: 2015 })
test("/[b\\-a]/", {}, { ecmaVersion: 5 })
test("/[b\\-a]/", {}, { ecmaVersion: 2015 })
testFail("/[b\\-a]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[b\\-a]/u", {}, { ecmaVersion: 2015 })
test("/[\\d]/", {}, { ecmaVersion: 5 })
test("/[\\d]/", {}, { ecmaVersion: 2015 })
testFail("/[\\d]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\d]/u", {}, { ecmaVersion: 2015 })
test("/[\\D]/", {}, { ecmaVersion: 5 })
test("/[\\D]/", {}, { ecmaVersion: 2015 })
testFail("/[\\D]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\D]/u", {}, { ecmaVersion: 2015 })
test("/[\\s]/", {}, { ecmaVersion: 5 })
test("/[\\s]/", {}, { ecmaVersion: 2015 })
testFail("/[\\s]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\s]/u", {}, { ecmaVersion: 2015 })
test("/[\\S]/", {}, { ecmaVersion: 5 })
test("/[\\S]/", {}, { ecmaVersion: 2015 })
testFail("/[\\S]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\S]/u", {}, { ecmaVersion: 2015 })
test("/[\\w]/", {}, { ecmaVersion: 5 })
test("/[\\w]/", {}, { ecmaVersion: 2015 })
testFail("/[\\w]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\w]/u", {}, { ecmaVersion: 2015 })
test("/[\\W]/", {}, { ecmaVersion: 5 })
test("/[\\W]/", {}, { ecmaVersion: 2015 })
testFail("/[\\W]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\W]/u", {}, { ecmaVersion: 2015 })
test("/[\\d]/", {}, { ecmaVersion: 5 })
test("/[\\d]/", {}, { ecmaVersion: 2015 })
testFail("/[\\d]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\d]/u", {}, { ecmaVersion: 2015 })
test("/[\\D]/", {}, { ecmaVersion: 5 })
test("/[\\D]/", {}, { ecmaVersion: 2015 })
testFail("/[\\D]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\D]/u", {}, { ecmaVersion: 2015 })
test("/[\\s]/", {}, { ecmaVersion: 5 })
test("/[\\s]/", {}, { ecmaVersion: 2015 })
testFail("/[\\s]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\s]/u", {}, { ecmaVersion: 2015 })
test("/[\\S]/", {}, { ecmaVersion: 5 })
test("/[\\S]/", {}, { ecmaVersion: 2015 })
testFail("/[\\S]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\S]/u", {}, { ecmaVersion: 2015 })
test("/[\\w]/", {}, { ecmaVersion: 5 })
test("/[\\w]/", {}, { ecmaVersion: 2015 })
testFail("/[\\w]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\w]/u", {}, { ecmaVersion: 2015 })
test("/[\\W]/", {}, { ecmaVersion: 5 })
test("/[\\W]/", {}, { ecmaVersion: 2015 })
testFail("/[\\W]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\W]/u", {}, { ecmaVersion: 2015 })
test("/[\\f]/", {}, { ecmaVersion: 5 })
test("/[\\f]/", {}, { ecmaVersion: 2015 })
testFail("/[\\f]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\f]/u", {}, { ecmaVersion: 2015 })
test("/[\\n]/", {}, { ecmaVersion: 5 })
test("/[\\n]/", {}, { ecmaVersion: 2015 })
testFail("/[\\n]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\n]/u", {}, { ecmaVersion: 2015 })
test("/[\\r]/", {}, { ecmaVersion: 5 })
test("/[\\r]/", {}, { ecmaVersion: 2015 })
testFail("/[\\r]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\r]/u", {}, { ecmaVersion: 2015 })
test("/[\\t]/", {}, { ecmaVersion: 5 })
test("/[\\t]/", {}, { ecmaVersion: 2015 })
testFail("/[\\t]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\t]/u", {}, { ecmaVersion: 2015 })
test("/[\\v]/", {}, { ecmaVersion: 5 })
test("/[\\v]/", {}, { ecmaVersion: 2015 })
testFail("/[\\v]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\v]/u", {}, { ecmaVersion: 2015 })
test("/[\\cA]/", {}, { ecmaVersion: 5 })
test("/[\\cA]/", {}, { ecmaVersion: 2015 })
testFail("/[\\cA]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\cA]/u", {}, { ecmaVersion: 2015 })
test("/[\\cz]/", {}, { ecmaVersion: 5 })
test("/[\\cz]/", {}, { ecmaVersion: 2015 })
testFail("/[\\cz]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\cz]/u", {}, { ecmaVersion: 2015 })
test("/[\\c1]/", {}, { ecmaVersion: 5 })
test("/[\\c1]/", {}, { ecmaVersion: 2015 })
testFail("/[\\c1]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\c1]/u", "Invalid regular expression: /[\\c1]/: Invalid class escape (1:1)", { ecmaVersion: 2015 })
test("/[\\c]/", {}, { ecmaVersion: 5 })
test("/[\\c]/", {}, { ecmaVersion: 2015 })
testFail("/[\\c]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\c]/u", "Invalid regular expression: /[\\c]/: Invalid class escape (1:1)", { ecmaVersion: 2015 })
test("/[\\0]/", {}, { ecmaVersion: 5 })
test("/[\\0]/", {}, { ecmaVersion: 2015 })
testFail("/[\\0]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\0]/u", {}, { ecmaVersion: 2015 })
test("/[\\x]/", {}, { ecmaVersion: 5 })
test("/[\\x]/", {}, { ecmaVersion: 2015 })
testFail("/[\\x]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\x]/u", "Invalid regular expression: /[\\x]/: Invalid escape (1:1)", { ecmaVersion: 2015 })
test("/[\\xz]/", {}, { ecmaVersion: 5 })
test("/[\\xz]/", {}, { ecmaVersion: 2015 })
testFail("/[\\xz]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\xz]/u", "Invalid regular expression: /[\\xz]/: Invalid escape (1:1)", { ecmaVersion: 2015 })
test("/[\\x1]/", {}, { ecmaVersion: 5 })
test("/[\\x1]/", {}, { ecmaVersion: 2015 })
testFail("/[\\x1]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\x1]/u", "Invalid regular expression: /[\\x1]/: Invalid escape (1:1)", { ecmaVersion: 2015 })
test("/[\\x12]/", {}, { ecmaVersion: 5 })
test("/[\\x12]/", {}, { ecmaVersion: 2015 })
testFail("/[\\x12]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\x12]/u", {}, { ecmaVersion: 2015 })
test("/[\\x123]/", {}, { ecmaVersion: 5 })
test("/[\\x123]/", {}, { ecmaVersion: 2015 })
testFail("/[\\x123]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\x123]/u", {}, { ecmaVersion: 2015 })
test("/[\\u]/", {}, { ecmaVersion: 5 })
test("/[\\u]/", {}, { ecmaVersion: 2015 })
testFail("/[\\u]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\u]/u", "Invalid regular expression: /[\\u]/: Invalid unicode escape (1:1)", { ecmaVersion: 2015 })
test("/[\\u1]/", {}, { ecmaVersion: 5 })
test("/[\\u1]/", {}, { ecmaVersion: 2015 })
testFail("/[\\u1]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\u1]/u", "Invalid regular expression: /[\\u1]/: Invalid unicode escape (1:1)", { ecmaVersion: 2015 })
test("/[\\u12]/", {}, { ecmaVersion: 5 })
test("/[\\u12]/", {}, { ecmaVersion: 2015 })
testFail("/[\\u12]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\u12]/u", "Invalid regular expression: /[\\u12]/: Invalid unicode escape (1:1)", { ecmaVersion: 2015 })
test("/[\\u123]/", {}, { ecmaVersion: 5 })
test("/[\\u123]/", {}, { ecmaVersion: 2015 })
testFail("/[\\u123]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\u123]/u", "Invalid regular expression: /[\\u123]/: Invalid unicode escape (1:1)", { ecmaVersion: 2015 })
test("/[\\u1234]/", {}, { ecmaVersion: 5 })
test("/[\\u1234]/", {}, { ecmaVersion: 2015 })
testFail("/[\\u1234]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\u1234]/u", {}, { ecmaVersion: 2015 })
test("/[\\u12345]/", {}, { ecmaVersion: 5 })
test("/[\\u12345]/", {}, { ecmaVersion: 2015 })
testFail("/[\\u12345]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\u12345]/u", {}, { ecmaVersion: 2015 })
test("/[\\u{]/", {}, { ecmaVersion: 5 })
test("/[\\u{]/", {}, { ecmaVersion: 2015 })
testFail("/[\\u{]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\u{]/u", "Invalid regular expression: /[\\u{]/: Invalid unicode escape (1:1)", { ecmaVersion: 2015 })
test("/[\\u{z]/", {}, { ecmaVersion: 5 })
test("/[\\u{z]/", {}, { ecmaVersion: 2015 })
testFail("/[\\u{z]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\u{z]/u", "Invalid regular expression: /[\\u{z]/: Invalid unicode escape (1:1)", { ecmaVersion: 2015 })
test("/[\\u{a}]/", {}, { ecmaVersion: 5 })
test("/[\\u{a}]/", {}, { ecmaVersion: 2015 })
testFail("/[\\u{a}]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\u{a}]/u", {}, { ecmaVersion: 2015 })
test("/[\\u{20]/", {}, { ecmaVersion: 5 })
test("/[\\u{20]/", {}, { ecmaVersion: 2015 })
testFail("/[\\u{20]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\u{20]/u", "Invalid regular expression: /[\\u{20]/: Invalid unicode escape (1:1)", { ecmaVersion: 2015 })
test("/[\\u{20}]/", {}, { ecmaVersion: 5 })
test("/[\\u{20}]/", {}, { ecmaVersion: 2015 })
testFail("/[\\u{20}]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\u{20}]/u", {}, { ecmaVersion: 2015 })
test("/[\\u{10FFFF}]/", {}, { ecmaVersion: 5 })
test("/[\\u{10FFFF}]/", {}, { ecmaVersion: 2015 })
testFail("/[\\u{10FFFF}]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\u{10FFFF}]/u", {}, { ecmaVersion: 2015 })
test("/[\\u{110000}]/", {}, { ecmaVersion: 5 })
test("/[\\u{110000}]/", {}, { ecmaVersion: 2015 })
testFail("/[\\u{110000}]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\u{110000}]/u", "Invalid regular expression: /[\\u{110000}]/: Invalid unicode escape (1:1)", { ecmaVersion: 2015 })
test("/[\\u{00000001}]/", {}, { ecmaVersion: 5 })
test("/[\\u{00000001}]/", {}, { ecmaVersion: 2015 })
testFail("/[\\u{00000001}]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\u{00000001}]/u", {}, { ecmaVersion: 2015 })
test("/[\\77]/", {}, { ecmaVersion: 5 })
test("/[\\77]/", {}, { ecmaVersion: 2015 })
testFail("/[\\77]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\77]/u", "Invalid regular expression: /[\\77]/: Invalid class escape (1:1)", { ecmaVersion: 2015 })
test("/[\\377]/", {}, { ecmaVersion: 5 })
test("/[\\377]/", {}, { ecmaVersion: 2015 })
testFail("/[\\377]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\377]/u", "Invalid regular expression: /[\\377]/: Invalid class escape (1:1)", { ecmaVersion: 2015 })
test("/[\\400]/", {}, { ecmaVersion: 5 })
test("/[\\400]/", {}, { ecmaVersion: 2015 })
testFail("/[\\400]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\400]/u", "Invalid regular expression: /[\\400]/: Invalid class escape (1:1)", { ecmaVersion: 2015 })
test("/[\\^]/", {}, { ecmaVersion: 5 })
test("/[\\^]/", {}, { ecmaVersion: 2015 })
testFail("/[\\^]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\^]/u", {}, { ecmaVersion: 2015 })
test("/[\\$]/", {}, { ecmaVersion: 5 })
test("/[\\$]/", {}, { ecmaVersion: 2015 })
testFail("/[\\$]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\$]/u", {}, { ecmaVersion: 2015 })
test("/[\\.]/", {}, { ecmaVersion: 5 })
test("/[\\.]/", {}, { ecmaVersion: 2015 })
testFail("/[\\.]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\.]/u", {}, { ecmaVersion: 2015 })
test("/[\\+]/", {}, { ecmaVersion: 5 })
test("/[\\+]/", {}, { ecmaVersion: 2015 })
testFail("/[\\+]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\+]/u", {}, { ecmaVersion: 2015 })
test("/[\\?]/", {}, { ecmaVersion: 5 })
test("/[\\?]/", {}, { ecmaVersion: 2015 })
testFail("/[\\?]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\?]/u", {}, { ecmaVersion: 2015 })
test("/[\\(]/", {}, { ecmaVersion: 5 })
test("/[\\(]/", {}, { ecmaVersion: 2015 })
testFail("/[\\(]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\(]/u", {}, { ecmaVersion: 2015 })
test("/[\\)]/", {}, { ecmaVersion: 5 })
test("/[\\)]/", {}, { ecmaVersion: 2015 })
testFail("/[\\)]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\)]/u", {}, { ecmaVersion: 2015 })
test("/[\\[]/", {}, { ecmaVersion: 5 })
test("/[\\[]/", {}, { ecmaVersion: 2015 })
testFail("/[\\[]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\[]/u", {}, { ecmaVersion: 2015 })
test("/[\\]]/", {}, { ecmaVersion: 5 })
test("/[\\]]/", {}, { ecmaVersion: 2015 })
testFail("/[\\]]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\]]/u", {}, { ecmaVersion: 2015 })
test("/[\\{]/", {}, { ecmaVersion: 5 })
test("/[\\{]/", {}, { ecmaVersion: 2015 })
testFail("/[\\{]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\{]/u", {}, { ecmaVersion: 2015 })
test("/[\\}]/", {}, { ecmaVersion: 5 })
test("/[\\}]/", {}, { ecmaVersion: 2015 })
testFail("/[\\}]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\}]/u", {}, { ecmaVersion: 2015 })
test("/[\\|]/", {}, { ecmaVersion: 5 })
test("/[\\|]/", {}, { ecmaVersion: 2015 })
testFail("/[\\|]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\|]/u", {}, { ecmaVersion: 2015 })
test("/[\\/]/", {}, { ecmaVersion: 5 })
test("/[\\/]/", {}, { ecmaVersion: 2015 })
testFail("/[\\/]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\/]/u", {}, { ecmaVersion: 2015 })
test("/[\\a]/", {}, { ecmaVersion: 5 })
test("/[\\a]/", {}, { ecmaVersion: 2015 })
testFail("/[\\a]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\a]/u", "Invalid regular expression: /[\\a]/: Invalid escape (1:1)", { ecmaVersion: 2015 })
test("/[\\s]/", {}, { ecmaVersion: 5 })
test("/[\\s]/", {}, { ecmaVersion: 2015 })
testFail("/[\\s]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\s]/u", {}, { ecmaVersion: 2015 })
test("/[\\d-\\uFFFF]/", {}, { ecmaVersion: 5 })
test("/[\\d-\\uFFFF]/", {}, { ecmaVersion: 2015 })
testFail("/[\\d-\\uFFFF]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\d-\\uFFFF]/u", "Invalid regular expression: /[\\d-\\uFFFF]/: Invalid character class (1:1)", { ecmaVersion: 2015 })
test("/[\\D-\\uFFFF]/", {}, { ecmaVersion: 5 })
test("/[\\D-\\uFFFF]/", {}, { ecmaVersion: 2015 })
testFail("/[\\D-\\uFFFF]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\D-\\uFFFF]/u", "Invalid regular expression: /[\\D-\\uFFFF]/: Invalid character class (1:1)", { ecmaVersion: 2015 })
test("/[\\s-\\uFFFF]/", {}, { ecmaVersion: 5 })
test("/[\\s-\\uFFFF]/", {}, { ecmaVersion: 2015 })
testFail("/[\\s-\\uFFFF]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\s-\\uFFFF]/u", "Invalid regular expression: /[\\s-\\uFFFF]/: Invalid character class (1:1)", { ecmaVersion: 2015 })
test("/[\\S-\\uFFFF]/", {}, { ecmaVersion: 5 })
test("/[\\S-\\uFFFF]/", {}, { ecmaVersion: 2015 })
testFail("/[\\S-\\uFFFF]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\S-\\uFFFF]/u", "Invalid regular expression: /[\\S-\\uFFFF]/: Invalid character class (1:1)", { ecmaVersion: 2015 })
test("/[\\w-\\uFFFF]/", {}, { ecmaVersion: 5 })
test("/[\\w-\\uFFFF]/", {}, { ecmaVersion: 2015 })
testFail("/[\\w-\\uFFFF]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\w-\\uFFFF]/u", "Invalid regular expression: /[\\w-\\uFFFF]/: Invalid character class (1:1)", { ecmaVersion: 2015 })
test("/[\\W-\\uFFFF]/", {}, { ecmaVersion: 5 })
test("/[\\W-\\uFFFF]/", {}, { ecmaVersion: 2015 })
testFail("/[\\W-\\uFFFF]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\W-\\uFFFF]/u", "Invalid regular expression: /[\\W-\\uFFFF]/: Invalid character class (1:1)", { ecmaVersion: 2015 })
test("/[\\u0000-\\d]/", {}, { ecmaVersion: 5 })
test("/[\\u0000-\\d]/", {}, { ecmaVersion: 2015 })
testFail("/[\\u0000-\\d]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\u0000-\\d]/u", "Invalid regular expression: /[\\u0000-\\d]/: Invalid character class (1:1)", { ecmaVersion: 2015 })
test("/[\\u0000-\\D]/", {}, { ecmaVersion: 5 })
test("/[\\u0000-\\D]/", {}, { ecmaVersion: 2015 })
testFail("/[\\u0000-\\D]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\u0000-\\D]/u", "Invalid regular expression: /[\\u0000-\\D]/: Invalid character class (1:1)", { ecmaVersion: 2015 })
test("/[\\u0000-\\s]/", {}, { ecmaVersion: 5 })
test("/[\\u0000-\\s]/", {}, { ecmaVersion: 2015 })
testFail("/[\\u0000-\\s]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\u0000-\\s]/u", "Invalid regular expression: /[\\u0000-\\s]/: Invalid character class (1:1)", { ecmaVersion: 2015 })
test("/[\\u0000-\\S]/", {}, { ecmaVersion: 5 })
test("/[\\u0000-\\S]/", {}, { ecmaVersion: 2015 })
testFail("/[\\u0000-\\S]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\u0000-\\S]/u", "Invalid regular expression: /[\\u0000-\\S]/: Invalid character class (1:1)", { ecmaVersion: 2015 })
test("/[\\u0000-\\w]/", {}, { ecmaVersion: 5 })
test("/[\\u0000-\\w]/", {}, { ecmaVersion: 2015 })
testFail("/[\\u0000-\\w]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\u0000-\\w]/u", "Invalid regular expression: /[\\u0000-\\w]/: Invalid character class (1:1)", { ecmaVersion: 2015 })
test("/[\\u0000-\\W]/", {}, { ecmaVersion: 5 })
test("/[\\u0000-\\W]/", {}, { ecmaVersion: 2015 })
testFail("/[\\u0000-\\W]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\u0000-\\W]/u", "Invalid regular expression: /[\\u0000-\\W]/: Invalid character class (1:1)", { ecmaVersion: 2015 })
test("/[\\u0000-\\u0001]/", {}, { ecmaVersion: 5 })
test("/[\\u0000-\\u0001]/", {}, { ecmaVersion: 2015 })
testFail("/[\\u0000-\\u0001]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\u0000-\\u0001]/u", {}, { ecmaVersion: 2015 })
testFail("/[\\u0001-\\u0000]/", "Invalid regular expression: /[\\u0001-\\u0000]/: Range out of order in character class (1:1)", { ecmaVersion: 5 })
testFail("/[\\u0001-\\u0000]/", "Invalid regular expression: /[\\u0001-\\u0000]/: Range out of order in character class (1:1)", { ecmaVersion: 2015 })
testFail("/[\\u0001-\\u0000]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\u0001-\\u0000]/u", "Invalid regular expression: /[\\u0001-\\u0000]/: Range out of order in character class (1:1)", { ecmaVersion: 2015 })
testFail("/[\\u{1}-\\u{2}]/", "Invalid regular expression: /[\\u{1}-\\u{2}]/: Range out of order in character class (1:1)", { ecmaVersion: 5 })
testFail("/[\\u{1}-\\u{2}]/", "Invalid regular expression: /[\\u{1}-\\u{2}]/: Range out of order in character class (1:1)", { ecmaVersion: 2015 })
testFail("/[\\u{1}-\\u{2}]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\u{1}-\\u{2}]/u", {}, { ecmaVersion: 2015 })
testFail("/[\\u{2}-\\u{1}]/", "Invalid regular expression: /[\\u{2}-\\u{1}]/: Range out of order in character class (1:1)", { ecmaVersion: 5 })
testFail("/[\\u{2}-\\u{1}]/", "Invalid regular expression: /[\\u{2}-\\u{1}]/: Range out of order in character class (1:1)", { ecmaVersion: 2015 })
testFail("/[\\u{2}-\\u{1}]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\u{2}-\\u{1}]/u", "Invalid regular expression: /[\\u{2}-\\u{1}]/: Range out of order in character class (1:1)", { ecmaVersion: 2015 })
test("/[\\u{2-\\u{1}]/", {}, { ecmaVersion: 5 })
test("/[\\u{2-\\u{1}]/", {}, { ecmaVersion: 2015 })
testFail("/[\\u{2-\\u{1}]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\u{2-\\u{1}]/u", "Invalid regular expression: /[\\u{2-\\u{1}]/: Invalid unicode escape (1:1)", { ecmaVersion: 2015 })
test("/[\\a-\\z]/", {}, { ecmaVersion: 5 })
test("/[\\a-\\z]/", {}, { ecmaVersion: 2015 })
testFail("/[\\a-\\z]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\a-\\z]/u", "Invalid regular expression: /[\\a-\\z]/: Invalid escape (1:1)", { ecmaVersion: 2015 })
testFail("/[\\z-\\a]/", "Invalid regular expression: /[\\z-\\a]/: Range out of order in character class (1:1)", { ecmaVersion: 5 })
testFail("/[\\z-\\a]/", "Invalid regular expression: /[\\z-\\a]/: Range out of order in character class (1:1)", { ecmaVersion: 2015 })
testFail("/[\\z-\\a]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\z-\\a]/u", "Invalid regular expression: /[\\z-\\a]/: Invalid escape (1:1)", { ecmaVersion: 2015 })
test("/[0-9--/]/", {}, { ecmaVersion: 5 })
test("/[0-9--/]/", {}, { ecmaVersion: 2015 })
testFail("/[0-9--/]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[0-9--/]/u", {}, { ecmaVersion: 2015 })
testFail("/[0-9--+]/", "Invalid regular expression: /[0-9--+]/: Range out of order in character class (1:1)", { ecmaVersion: 5 })
testFail("/[0-9--+]/", "Invalid regular expression: /[0-9--+]/: Range out of order in character class (1:1)", { ecmaVersion: 2015 })
testFail("/[0-9--+]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[0-9--+]/u", "Invalid regular expression: /[0-9--+]/: Range out of order in character class (1:1)", { ecmaVersion: 2015 })
testFail("/[\\c-a]/", "Invalid regular expression: /[\\c-a]/: Range out of order in character class (1:1)", { ecmaVersion: 5 })
testFail("/[\\c-a]/", "Invalid regular expression: /[\\c-a]/: Range out of order in character class (1:1)", { ecmaVersion: 2015 })
testFail("/[\\c-a]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\c-a]/u", "Invalid regular expression: /[\\c-a]/: Invalid class escape (1:1)", { ecmaVersion: 2015 })
test("/[\\c0-]/", {}, { ecmaVersion: 5 })
test("/[\\c0-]/", {}, { ecmaVersion: 2015 })
testFail("/[\\c0-]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\c0-]/u", "Invalid regular expression: /[\\c0-]/: Invalid class escape (1:1)", { ecmaVersion: 2015 })
test("/[\\c_]/", {}, { ecmaVersion: 5 })
test("/[\\c_]/", {}, { ecmaVersion: 2015 })
testFail("/[\\c_]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\c_]/u", "Invalid regular expression: /[\\c_]/: Invalid class escape (1:1)", { ecmaVersion: 2015 })
testFail("/[🌷-🌸]/", "Invalid regular expression: /[🌷-🌸]/: Range out of order in character class (1:1)", { ecmaVersion: 5 })
testFail("/[🌷-🌸]/", "Invalid regular expression: /[🌷-🌸]/: Range out of order in character class (1:1)", { ecmaVersion: 2015 })
testFail("/[🌷-🌸]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[🌷-🌸]/u", {}, { ecmaVersion: 2015 })
testFail("/[\\u0000-🌸-\\u0000]/", "Invalid regular expression: /[\\u0000-🌸-\\u0000]/: Range out of order in character class (1:1)", { ecmaVersion: 2015 })
testFail("/[\\u0000-\\ud83c\\udf38-\\u0000]/", "Invalid regular expression: /[\\u0000-\\ud83c\\udf38-\\u0000]/: Range out of order in character class (1:1)", { ecmaVersion: 2015 })
test("/[\\u0000-🌸-\\u0000]/u", {}, { ecmaVersion: 2015 })
test("/[\\u0000-\\u{1f338}-\\u0000]/u", {}, { ecmaVersion: 2015 })
test("/[\\u0000-\\ud83c\\udf38-\\u0000]/u", {}, { ecmaVersion: 2015 })
testFail("/[🌸-🌷]/", "Invalid regular expression: /[🌸-🌷]/: Range out of order in character class (1:1)", { ecmaVersion: 5 })
testFail("/[🌸-🌷]/", "Invalid regular expression: /[🌸-🌷]/: Range out of order in character class (1:1)", { ecmaVersion: 2015 })
testFail("/[🌸-🌷]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[🌸-🌷]/u", "Invalid regular expression: /[🌸-🌷]/: Range out of order in character class (1:1)", { ecmaVersion: 2015 })
testFail("/[\\uD834\\uDF06-\\uD834\\uDF08a-z]/", "Invalid regular expression: /[\\uD834\\uDF06-\\uD834\\uDF08a-z]/: Range out of order in character class (1:1)", { ecmaVersion: 5 })
testFail("/[\\uD834\\uDF06-\\uD834\\uDF08a-z]/", "Invalid regular expression: /[\\uD834\\uDF06-\\uD834\\uDF08a-z]/: Range out of order in character class (1:1)", { ecmaVersion: 2015 })
testFail("/[\\uD834\\uDF06-\\uD834\\uDF08a-z]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/[\\uD834\\uDF06-\\uD834\\uDF08a-z]/u", {}, { ecmaVersion: 2015 })
test("/^[0-9]*$/", {}, { ecmaVersion: 5 })
test("/^[0-9]*$/", {}, { ecmaVersion: 2015 })
testFail("/^[0-9]*$/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/^[0-9]*$/u", {}, { ecmaVersion: 2015 })
test("/^[0-9]+$/", {}, { ecmaVersion: 5 })
test("/^[0-9]+$/", {}, { ecmaVersion: 2015 })
testFail("/^[0-9]+$/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/^[0-9]+$/u", {}, { ecmaVersion: 2015 })
test("/^[a-zA-Z]*$/", {}, { ecmaVersion: 5 })
test("/^[a-zA-Z]*$/", {}, { ecmaVersion: 2015 })
testFail("/^[a-zA-Z]*$/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/^[a-zA-Z]*$/u", {}, { ecmaVersion: 2015 })
test("/^[a-zA-Z]+$/", {}, { ecmaVersion: 5 })
test("/^[a-zA-Z]+$/", {}, { ecmaVersion: 2015 })
testFail("/^[a-zA-Z]+$/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/^[a-zA-Z]+$/u", {}, { ecmaVersion: 2015 })
test("/^[0-9a-zA-Z]*$/", {}, { ecmaVersion: 5 })
test("/^[0-9a-zA-Z]*$/", {}, { ecmaVersion: 2015 })
testFail("/^[0-9a-zA-Z]*$/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/^[0-9a-zA-Z]*$/u", {}, { ecmaVersion: 2015 })
test("/^[a-zA-Z0-9!-/:-@\\[-`{-~]*$/", {}, { ecmaVersion: 5 })
test("/^[a-zA-Z0-9!-/:-@\\[-`{-~]*$/", {}, { ecmaVersion: 2015 })
testFail("/^[a-zA-Z0-9!-/:-@\\[-`{-~]*$/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/^[a-zA-Z0-9!-/:-@\\[-`{-~]*$/u", {}, { ecmaVersion: 2015 })
test("/^([a-zA-Z0-9]{8,})$/", {}, { ecmaVersion: 5 })
test("/^([a-zA-Z0-9]{8,})$/", {}, { ecmaVersion: 2015 })
testFail("/^([a-zA-Z0-9]{8,})$/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/^([a-zA-Z0-9]{8,})$/u", {}, { ecmaVersion: 2015 })
test("/^([a-zA-Z0-9]{6,8})$/", {}, { ecmaVersion: 5 })
test("/^([a-zA-Z0-9]{6,8})$/", {}, { ecmaVersion: 2015 })
testFail("/^([a-zA-Z0-9]{6,8})$/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/^([a-zA-Z0-9]{6,8})$/u", {}, { ecmaVersion: 2015 })
test("/^([0-9]{0,8})$/", {}, { ecmaVersion: 5 })
test("/^([0-9]{0,8})$/", {}, { ecmaVersion: 2015 })
testFail("/^([0-9]{0,8})$/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/^([0-9]{0,8})$/u", {}, { ecmaVersion: 2015 })
test("/^[0-9]{8}$/", {}, { ecmaVersion: 5 })
test("/^[0-9]{8}$/", {}, { ecmaVersion: 2015 })
testFail("/^[0-9]{8}$/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/^[0-9]{8}$/u", {}, { ecmaVersion: 2015 })
test("/^https?:\\/\\//", {}, { ecmaVersion: 5 })
test("/^https?:\\/\\//", {}, { ecmaVersion: 2015 })
testFail("/^https?:\\/\\//u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/^https?:\\/\\//u", {}, { ecmaVersion: 2015 })
test("/^\\d{3}-\\d{4}$/", {}, { ecmaVersion: 5 })
test("/^\\d{3}-\\d{4}$/", {}, { ecmaVersion: 2015 })
testFail("/^\\d{3}-\\d{4}$/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/^\\d{3}-\\d{4}$/u", {}, { ecmaVersion: 2015 })
test("/^\\d{1,3}(.\\d{1,3}){3}$/", {}, { ecmaVersion: 5 })
test("/^\\d{1,3}(.\\d{1,3}){3}$/", {}, { ecmaVersion: 2015 })
testFail("/^\\d{1,3}(.\\d{1,3}){3}$/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/^\\d{1,3}(.\\d{1,3}){3}$/u", {}, { ecmaVersion: 2015 })
test("/^([1-9][0-9]*|0)(\\.[0-9]+)?$/", {}, { ecmaVersion: 5 })
test("/^([1-9][0-9]*|0)(\\.[0-9]+)?$/", {}, { ecmaVersion: 2015 })
testFail("/^([1-9][0-9]*|0)(\\.[0-9]+)?$/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/^([1-9][0-9]*|0)(\\.[0-9]+)?$/u", {}, { ecmaVersion: 2015 })
test("/^-?([1-9][0-9]*|0)(\\.[0-9]+)?$/", {}, { ecmaVersion: 5 })
test("/^-?([1-9][0-9]*|0)(\\.[0-9]+)?$/", {}, { ecmaVersion: 2015 })
testFail("/^-?([1-9][0-9]*|0)(\\.[0-9]+)?$/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/^-?([1-9][0-9]*|0)(\\.[0-9]+)?$/u", {}, { ecmaVersion: 2015 })
test("/^[ぁ-んー]*$/", {}, { ecmaVersion: 5 })
test("/^[ぁ-んー]*$/", {}, { ecmaVersion: 2015 })
testFail("/^[ぁ-んー]*$/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/^[ぁ-んー]*$/u", {}, { ecmaVersion: 2015 })
test("/^[ァ-ンヴー]*$/", {}, { ecmaVersion: 5 })
test("/^[ァ-ンヴー]*$/", {}, { ecmaVersion: 2015 })
testFail("/^[ァ-ンヴー]*$/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/^[ァ-ンヴー]*$/u", {}, { ecmaVersion: 2015 })
test("/^[ｧ-ﾝﾞﾟ\\-]*$/", {}, { ecmaVersion: 5 })
test("/^[ｧ-ﾝﾞﾟ\\-]*$/", {}, { ecmaVersion: 2015 })
testFail("/^[ｧ-ﾝﾞﾟ\\-]*$/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/^[ｧ-ﾝﾞﾟ\\-]*$/u", {}, { ecmaVersion: 2015 })
test("/^[^\\x20-\\x7e]*$/", {}, { ecmaVersion: 5 })
test("/^[^\\x20-\\x7e]*$/", {}, { ecmaVersion: 2015 })
testFail("/^[^\\x20-\\x7e]*$/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/^[^\\x20-\\x7e]*$/u", {}, { ecmaVersion: 2015 })
test("/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$/", {}, { ecmaVersion: 5 })
test("/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$/", {}, { ecmaVersion: 2015 })
testFail("/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$/u", {}, { ecmaVersion: 2015 })
test("/^((4\\d{3})|(5[1-5]\\d{2})|(6011))([- ])?\\d{4}([- ])?\\d{4}([- ])?\\d{4}|3[4,7]\\d{13}$/", {}, { ecmaVersion: 5 })
test("/^((4\\d{3})|(5[1-5]\\d{2})|(6011))([- ])?\\d{4}([- ])?\\d{4}([- ])?\\d{4}|3[4,7]\\d{13}$/", {}, { ecmaVersion: 2015 })
testFail("/^((4\\d{3})|(5[1-5]\\d{2})|(6011))([- ])?\\d{4}([- ])?\\d{4}([- ])?\\d{4}|3[4,7]\\d{13}$/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/^((4\\d{3})|(5[1-5]\\d{2})|(6011))([- ])?\\d{4}([- ])?\\d{4}([- ])?\\d{4}|3[4,7]\\d{13}$/u", {}, { ecmaVersion: 2015 })
test("/^\\s*|\\s*$/", {}, { ecmaVersion: 5 })
test("/^\\s*|\\s*$/", {}, { ecmaVersion: 2015 })
testFail("/^\\s*|\\s*$/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
test("/^\\s*|\\s*$/u", {}, { ecmaVersion: 2015 })
test("/[\\d][\\12-\\14]{1,}[^\\d]/", {}, { ecmaVersion: 5 })
test("/[\\d][\\12-\\14]{1,}[^\\d]/", {}, { ecmaVersion: 2015 })
testFail("/[\\d][\\12-\\14]{1,}[^\\d]/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })
testFail("/[\\d][\\12-\\14]{1,}[^\\d]/u", "Invalid regular expression: /[\\d][\\12-\\14]{1,}[^\\d]/: Invalid class escape (1:1)", { ecmaVersion: 2015 })
test("/([a ]\\b)*\\b/", {}, { ecmaVersion: 5 })
test("/[x-*]/u".replace("*", String.fromCharCode(0xd800)), {}, {ecmaVersion: 6})

/*
// This is test case generator.
// The tests check whether those results are same as V8 native.

function getErrorMessage(pattern, flags) {
    try {
        new RegExp(pattern, flags)
        return undefined
    } catch (err) {
        return err.message
    }
}

const patterns = [
    ["foo"],
    ["foo|bar"],
    ["||||"],
    ["^|$|\\b|\\B"],
    ["("],
    ["(?"],
    ["(?="],
    ["(?=)"],
    ["(?=foo"],
    ["(?=foo)"],
    ["(?!"],
    ["(?!)"],
    ["(?!foo"],
    ["(?!foo)"],
    ["(?=a)*"],
    ["(?=a)+"],
    ["(?=a)?"],
    ["(?=a){"],
    ["(?=a){}"],
    ["(?=a){a}"],
    ["(?=a){1}"],
    ["(?=a){1,}"],
    ["(?=a){1,2}"],
    ["a*"],
    ["a+"],
    ["a?"],
    ["a{"],
    ["a{}"],
    ["a{a}"],
    ["a{1}"],
    ["a{1"],
    ["a{1,}"],
    ["a{1,"],
    ["a{1,2}"],
    ["a{1,2"],
    ["a{2,1}"],
    ["a{2,1"],
    ["(a{2,1}"],
    ["a*?"],
    ["a+?"],
    ["a??"],
    ["a{?"],
    ["a{}?"],
    ["a{a}?"],
    ["a{1}?"],
    ["a{1?"],
    ["a{1,}?"],
    ["a{1,?"],
    ["a{1,2}?"],
    ["a{1,2?"],
    ["a{2,1}?"],
    ["a{2,1?"],
    ["👍🚀❇️"],
    ["^"],
    ["$"],
    ["."],
    ["(*)"],
    ["+"],
    ["?"],
    ["("],
    [")"],
    ["[", "Unterminated regular expression", "Unterminated regular expression"],
    ["]"],
    ["{"],
    ["}"],
    ["|"],
    ["^*"],
    ["$*"],
    ["${1,2"],
    ["${1,2}"],
    ["${2,1}"],
    ["\\1"],
    ["(a)\\1"],
    ["\\1(a)"],
    ["\\2(a)("],
    ["(?:a)\\1"],
    ["(a)\\2"],
    ["(?:a)\\2"],
    ["(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)\\10"],
    ["(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)\\11"],
    ["(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)\\11"],
    ["(?"],
    ["(?a"],
    ["(?a)"],
    ["(?:"],
    ["(?:a"],
    ["(?:a)"],
    ["(:a"],
    ["\\d"],
    ["\\D"],
    ["\\s"],
    ["\\S"],
    ["\\w"],
    ["\\W"],
    ["\\f"],
    ["\\n"],
    ["\\r"],
    ["\\t"],
    ["\\v"],
    ["\\cA"],
    ["\\cz"],
    ["\\c1"],
    ["\\c"],
    ["\\0"],
    ["\\u"],
    ["\\u1"],
    ["\\u12"],
    ["\\u123"],
    ["\\u1234"],
    ["\\u12345"],
    ["\\u{"],
    ["\\u{z"],
    ["\\u{a}"],
    ["\\u{20"],
    ["\\u{20}"],
    ["\\u{10FFFF}"],
    ["\\u{110000}"],
    ["\\u{00000001}"],
    ["\\377"],
    ["\\400"],
    ["\\^"],
    ["\\$"],
    ["\\."],
    ["\\+"],
    ["\\?"],
    ["\\("],
    ["\\)"],
    ["\\["],
    ["\\]"],
    ["\\{"],
    ["\\}"],
    ["\\|"],
    ["\\/"],
    ["\\a"],
    ["\\s"],
    ["[]"],
    ["[^-a-b-]"],
    ["[-]"],
    ["[a]"],
    ["[--]"],
    ["[-a]"],
    ["[-a-]"],
    ["[a-]"],
    ["[a-b]"],
    ["[-a-b-]"],
    ["[---]"],
    ["[b-a]"],
    ["[a-b--/]"],
    ["[a-b--+]"],
    ["[\\b-\\n]"],
    ["[b\\-a]"],
    ["[\\d]"],
    ["[\\D]"],
    ["[\\s]"],
    ["[\\S]"],
    ["[\\w]"],
    ["[\\W]"],
    ["[\\d]"],
    ["[\\D]"],
    ["[\\s]"],
    ["[\\S]"],
    ["[\\w]"],
    ["[\\W]"],
    ["[\\f]"],
    ["[\\n]"],
    ["[\\r]"],
    ["[\\t]"],
    ["[\\v]"],
    ["[\\cA]"],
    ["[\\cz]"],
    ["[\\c1]"],
    ["[\\c]"],
    ["[\\0]"],
    ["[\\x]"],
    ["[\\xz]"],
    ["[\\x1]"],
    ["[\\x12]"],
    ["[\\x123]"],
    ["[\\u]"],
    ["[\\u1]"],
    ["[\\u12]"],
    ["[\\u123]"],
    ["[\\u1234]"],
    ["[\\u12345]"],
    ["[\\u{]"],
    ["[\\u{z]"],
    ["[\\u{a}]"],
    ["[\\u{20]"],
    ["[\\u{20}]"],
    ["[\\u{10FFFF}]"],
    ["[\\u{110000}]"],
    ["[\\u{00000001}]"],
    ["[\\77]"],
    ["[\\377]"],
    ["[\\400]"],
    ["[\\^]"],
    ["[\\$]"],
    ["[\\.]"],
    ["[\\+]"],
    ["[\\?]"],
    ["[\\(]"],
    ["[\\)]"],
    ["[\\[]"],
    ["[\\]]"],
    ["[\\{]"],
    ["[\\}]"],
    ["[\\|]"],
    ["[\\/]"],
    ["[\\a]"],
    ["[\\s]"],
    ["[\\d-\\uFFFF]"],
    ["[\\D-\\uFFFF]"],
    ["[\\s-\\uFFFF]"],
    ["[\\S-\\uFFFF]"],
    ["[\\w-\\uFFFF]"],
    ["[\\W-\\uFFFF]"],
    ["[\\u0000-\\d]"],
    ["[\\u0000-\\D]"],
    ["[\\u0000-\\s]"],
    ["[\\u0000-\\S]"],
    ["[\\u0000-\\w]"],
    ["[\\u0000-\\W]"],
    ["[\\u0000-\\u0001]"],
    ["[\\u0001-\\u0000]"],
    ["[\\u{1}-\\u{2}]"],
    ["[\\u{2}-\\u{1}]"],
    ["[\\u{2-\\u{1}]"],
    ["[\\a-\\z]"],
    ["[\\z-\\a]"],
    ["[0-9--/]"],
    ["[0-9--+]"],
    ["[\\c-a]"],
    ["[\\c0-\u001F]"],
    ["[\\c_]"],
    ["[🌷-🌸]"],
    ["[🌸-🌷]"],
    ["[\\uD834\\uDF06-\\uD834\\uDF08a-z]"],
    ["^[0-9]*$"],
    ["^[0-9]+$"],
    ["^[a-zA-Z]*$"],
    ["^[a-zA-Z]+$"],
    ["^[0-9a-zA-Z]*$"],
    ["^[a-zA-Z0-9!-/:-@\\[-`{-~]*$"],
    ["^([a-zA-Z0-9]{8,})$"],
    ["^([a-zA-Z0-9]{6,8})$"],
    ["^([0-9]{0,8})$"],
    ["^[0-9]{8}$"],
    ["^https?:\\/\\/"],
    ["^\\d{3}-\\d{4}$"],
    ["^\\d{1,3}(\.\\d{1,3}){3}$"],
    ["^([1-9][0-9]*|0)(\\.[0-9]+)?$"],
    ["^-?([1-9][0-9]*|0)(\\.[0-9]+)?$"],
    ["^[ぁ-んー]*$"],
    ["^[ァ-ンヴー]*$"],
    ["^[ｧ-ﾝﾞﾟ\\-]*$"],
    ["^[^\\x20-\\x7e]*$"],
    ["^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"],
    ["^((4\\d{3})|(5[1-5]\\d{2})|(6011))([- ])?\\d{4}([- ])?\\d{4}([- ])?\\d{4}|3[4,7]\\d{13}$"],
    ["^\\s*|\\s*$"],
    ["[\\d][\\12-\\14]{1,}[^\\d]"]
]

const tests = []
for (const [pattern, message, messageU] of patterns) {
    // Without u flag
    let msg = message || getErrorMessage(pattern, "")
    if (msg === undefined) {
        tests.push(`test("/${pattern.replace(/\\/g, "\\\\")}/", {}, { ecmaVersion: 5 })`)
        tests.push(`test("/${pattern.replace(/\\/g, "\\\\")}/", {}, { ecmaVersion: 2015 })`)
    } else {
        tests.push(`testFail("/${pattern.replace(/\\/g, "\\\\")}/", "${msg.replace(/\\/g, "\\\\")} (1:1)", { ecmaVersion: 5 })`)
        tests.push(`testFail("/${pattern.replace(/\\/g, "\\\\")}/", "${msg.replace(/\\/g, "\\\\")} (1:1)", { ecmaVersion: 2015 })`)
    }

    // With u flag
    msg = messageU || getErrorMessage(pattern, "u")
    tests.push(`testFail("/${pattern.replace(/\\/g, "\\\\")}/u", "Invalid regular expression flag (1:1)", { ecmaVersion: 5 })`)
    if (msg === undefined) {
        tests.push(`test("/${pattern.replace(/\\/g, "\\\\")}/u", {}, { ecmaVersion: 2015 })`)
    } else {
        tests.push(`testFail("/${pattern.replace(/\\/g, "\\\\")}/u", "${msg.replace(/\\/g, "\\\\")} (1:1)", { ecmaVersion: 2015 })`)
    }
}

require("fs").writeFileSync("a.txt", tests.join("\n"))

*/
