// Tests largely based on those of Esprima
// (http://esprima.org/test/)

if (typeof exports != "undefined") {
  var driver = require("./driver.js");
  var test = driver.test, testFail = driver.testFail, testAssert = driver.testAssert, misMatch = driver.misMatch;
  var acorn = require("..");
}

test("this\n", {
  ecmaVersion: 5,
  locations: true
});

test("null\n", {
  ecmaVersion: 5,
  locations: true
});

test("\n    42\n\n", {
  ecmaVersion: 5,
  locations: true
});

test("/foobar/", {
  ecmaVersion: 5,
  locations: true
});

test("/[a-z]/g", {
  ecmaVersion: 5,
  locations: true
});

test("(1 + 2 ) * 3", {
  ecmaVersion: 5,
  locations: true
});

test("(1 + 2 ) * 3", {
  ecmaVersion: 5,
  locations: true,
  preserveParens: true
});

test("(x = 23)", {
  ecmaVersion: 5,
  preserveParens: true
});

test("x = []", {
  ecmaVersion: 5,
  locations: true
});

test("x = [ ]", {
  ecmaVersion: 5,
  locations: true
});

test("x = [ 42 ]", {
  ecmaVersion: 5,
  locations: true
});

test("x = [ 42, ]", {
  ecmaVersion: 5,
  locations: true
});

test("x = [ ,, 42 ]", {
  ecmaVersion: 5,
  locations: true
});

test("x = [ 1, 2, 3, ]", {
  ecmaVersion: 5,
  locations: true
});

test("x = [ 1, 2,, 3, ]", {
  ecmaVersion: 5,
  locations: true
});

test("日本語 = []", {
  ecmaVersion: 5,
  locations: true
});

test("T‿ = []", {
  ecmaVersion: 5,
  locations: true
});

test("T‌ = []", {
  ecmaVersion: 5,
  locations: true
});

test("T‍ = []", {
  ecmaVersion: 5,
  locations: true
});

test("ⅣⅡ = []", {
  ecmaVersion: 5,
  locations: true
});

test("ⅣⅡ = []", {
  ecmaVersion: 5,
  locations: true
});

test("x = {}", {
  ecmaVersion: 5,
  locations: true
});

test("x = { }", {
  ecmaVersion: 5,
  locations: true
});

test("x = { answer: 42 }", {
  ecmaVersion: 5,
  locations: true
});

test("x = { if: 42 }", {
  ecmaVersion: 5,
  locations: true
});

test("x = { true: 42 }", {
  ecmaVersion: 5,
  locations: true
});

test("x = { false: 42 }", {
  ecmaVersion: 5,
  locations: true
});

test("x = { null: 42 }", {
  ecmaVersion: 5,
  locations: true
});

test("x = { \"answer\": 42 }", {
  ecmaVersion: 5,
  locations: true
});

test("x = { x: 1, x: 2 }", {
  ecmaVersion: 5,
  locations: true
});

test("x = { get width() { return m_width } }", {
  ecmaVersion: 5,
  locations: true
});

test("x = { get undef() {} }", {
  ecmaVersion: 5,
  locations: true
});

test("x = { get if() {} }", {
  ecmaVersion: 5,
  locations: true
});

test("x = { get true() {} }", {
  ecmaVersion: 5,
  locations: true
});

test("x = { get false() {} }", {
  ecmaVersion: 5,
  locations: true
});

test("x = { get null() {} }", {
  ecmaVersion: 5,
  locations: true
});

test("x = { get \"undef\"() {} }", {
  ecmaVersion: 5,
  locations: true
});

test("x = { get 10() {} }", {
  ecmaVersion: 5,
  locations: true
});

test("x = { set width(w) { m_width = w } }", {
  ecmaVersion: 5,
  locations: true
});

test("x = { set if(w) { m_if = w } }", {
  ecmaVersion: 5,
  locations: true
});

test("x = { set true(w) { m_true = w } }", {
  ecmaVersion: 5,
  locations: true
});

test("x = { set false(w) { m_false = w } }", {
  ecmaVersion: 5,
  locations: true
});

test("x = { set null(w) { m_null = w } }", {
  ecmaVersion: 5,
  locations: true
});

test("x = { set \"null\"(w) { m_null = w } }", {
  ecmaVersion: 5,
  locations: true
});

test("x = { set 10(w) { m_null = w } }", {
  ecmaVersion: 5,
  locations: true
});

test("x = { get: 42 }", {
  ecmaVersion: 5,
  locations: true
});

test("x = { set: 43 }", {
  ecmaVersion: 5,
  locations: true
});

test("/* block comment */ 42", {
  ecmaVersion: 5,
  locations: true
});

test("42 /*The*/ /*Answer*/", {
  ecmaVersion: 5,
  locations: true
});

test("42 /*the*/ /*answer*/", {
  ecmaVersion: 5,
  locations: true
});

test("/* multiline\ncomment\nshould\nbe\nignored */ 42", {
  ecmaVersion: 5,
  locations: true
});

test("/*a\r\nb*/ 42", {
  ecmaVersion: 5,
  locations: true
});

test("/*a\rb*/ 42", {
  ecmaVersion: 5,
  locations: true
});

test("/*a\nb*/ 42", {
  ecmaVersion: 5,
  locations: true
});

test("/*a\nc*/ 42", {
  ecmaVersion: 5,
  locations: true
});

test("// line comment\n42", {
  ecmaVersion: 5,
  locations: true
});

test("42 // line comment", {
  ecmaVersion: 5,
  locations: true
});

test("// Hello, world!\n42", {
  ecmaVersion: 5,
  locations: true
});

test("// Hello, world!\n", {
  ecmaVersion: 5,
  locations: true
});

test("// Hallo, world!\n", {
  ecmaVersion: 5,
  locations: true
});

test("//\n42", {
  ecmaVersion: 5,
  locations: true
});

test("//", {
  ecmaVersion: 5,
  locations: true
});

test("// ", {
  ecmaVersion: 5,
  locations: true
});

test("/**/42", {
  ecmaVersion: 5,
  locations: true
});

test("// Hello, world!\n\n//   Another hello\n42", {
  ecmaVersion: 5,
  locations: true
});

test("if (x) { // Some comment\ndoThat(); }", {
  ecmaVersion: 5,
  locations: true
});

test("switch (answer) { case 42: /* perfect */ bingo() }", {
  ecmaVersion: 5,
  locations: true
});

test("0", {
  ecmaVersion: 5,
  locations: true
});

test("3", {
  ecmaVersion: 5,
  locations: true
});

test("5", {
  ecmaVersion: 5,
  locations: true
});

test("42", {
  ecmaVersion: 5,
  locations: true
});

test(".14", {
  ecmaVersion: 5,
  locations: true
});

test("3.14159", {
  ecmaVersion: 5,
  locations: true
});

test("6.02214179e+23", {
  ecmaVersion: 5,
  locations: true
});

test("1.492417830e-10", {
  ecmaVersion: 5,
  locations: true
});

test("0x0", {
  ecmaVersion: 5,
  locations: true
});

test("0e+100", {
  ecmaVersion: 5,
  locations: true
});

test("0xabc", {
  ecmaVersion: 5,
  locations: true
});

test("0xdef", {
  ecmaVersion: 5,
  locations: true
});

test("0X1A", {
  ecmaVersion: 5,
  locations: true
});

test("0x10", {
  ecmaVersion: 5,
  locations: true
});

test("0x100", {
  ecmaVersion: 5,
  locations: true
});

test("0X04", {
  ecmaVersion: 5,
  locations: true
});

test("02", {
  ecmaVersion: 5,
  locations: true
});

test("012", {
  ecmaVersion: 5,
  locations: true
});

test("0012", {
  ecmaVersion: 5,
  locations: true
});

test("\"Hello\"", {
  ecmaVersion: 5,
  locations: true
});

test("\"\\n\\r\\t\\v\\b\\f\\\\\\'\\\"\\0\"", {
  ecmaVersion: 5,
  locations: true
});

test("\"\\u0061\"", {
  ecmaVersion: 5,
  locations: true
});

test("\"\\x61\"", {
  ecmaVersion: 5,
  locations: true
});

test("\"Hello\\nworld\"", {
  ecmaVersion: 5,
  locations: true
});

test("\"Hello\\\nworld\"", {
  ecmaVersion: 5,
  locations: true
});

test("\"Hello\\02World\"", {
  ecmaVersion: 5,
  locations: true
});

test("\"Hello\\012World\"", {
  ecmaVersion: 5,
  locations: true
});

test("\"Hello\\122World\"", {
  ecmaVersion: 5,
  locations: true
});

test("\"Hello\\0122World\"", {
  ecmaVersion: 5,
  locations: true
});

test("\"Hello\\312World\"", {
  ecmaVersion: 5,
  locations: true
});

test("\"Hello\\412World\"", {
  ecmaVersion: 5,
  locations: true
});

test("\"Hello\\812World\"", {
  ecmaVersion: 5,
  locations: true
});

test("\"Hello\\712World\"", {
  ecmaVersion: 5,
  locations: true
});

test("\"Hello\\0World\"", {
  ecmaVersion: 5,
  locations: true
});

test("\"Hello\\\r\nworld\"", {
  ecmaVersion: 5,
  locations: true
});

test("\"Hello\\1World\"", {
  ecmaVersion: 5,
  locations: true
});

test("var x = /[a-z]/i", {
  ecmaVersion: 5,
  locations: true
});

test("var x = /[x-z]/i", {
  ecmaVersion: 5,
  locations: true
});

test("var x = /[a-c]/i", {
  ecmaVersion: 5,
  locations: true
});

test("var x = /[P QR]/i", {
  ecmaVersion: 5,
  locations: true
});

test("var x = /foo\\/bar/", {
  ecmaVersion: 5,
  locations: true
});

test("var x = /=([^=\\s])+/g", {
  ecmaVersion: 5,
  locations: true
});

test("var x = /[P QR]/\\u0067", {
  ecmaVersion: 5,
  locations: true
});

test("new Button", {
  ecmaVersion: 5,
  locations: true
});

test("new Button()", {
  ecmaVersion: 5,
  locations: true
});

test("new new foo", {
  ecmaVersion: 5,
  locations: true
});

test("new new foo()", {
  ecmaVersion: 5,
  locations: true
});

test("new foo().bar()", {
  ecmaVersion: 5,
  locations: true
});

test("new foo[bar]", {
  ecmaVersion: 5,
  locations: true
});

test("new foo.bar()", {
  ecmaVersion: 5,
  locations: true
});

test("( new foo).bar()", {
  ecmaVersion: 5,
  locations: true
});

test("foo(bar, baz)", {
  ecmaVersion: 5,
  locations: true
});

test("(    foo  )()", {
  ecmaVersion: 5,
  locations: true
});

test("universe.milkyway", {
  ecmaVersion: 5,
  locations: true
});

test("universe.milkyway.solarsystem", {
  ecmaVersion: 5,
  locations: true
});

test("universe.milkyway.solarsystem.Earth", {
  ecmaVersion: 5,
  locations: true
});

test("universe[galaxyName, otherUselessName]", {
  ecmaVersion: 5,
  locations: true
});

test("universe[galaxyName]", {
  ecmaVersion: 5,
  locations: true
});

test("universe[42].galaxies", {
  ecmaVersion: 5,
  locations: true
});

test("universe(42).galaxies", {
  ecmaVersion: 5,
  locations: true
});

test("universe(42).galaxies(14, 3, 77).milkyway", {
  ecmaVersion: 5,
  locations: true
});

test("earth.asia.Indonesia.prepareForElection(2014)", {
  ecmaVersion: 5,
  locations: true
});

test("universe.if", {
  ecmaVersion: 5,
  locations: true
});

test("universe.true", {
  ecmaVersion: 5,
  locations: true
});

test("universe.false", {
  ecmaVersion: 5,
  locations: true
});

test("universe.null", {
  ecmaVersion: 5,
  locations: true
});

test("x++", {
  ecmaVersion: 5,
  locations: true
});

test("x--", {
  ecmaVersion: 5,
  locations: true
});

test("eval++", {
  ecmaVersion: 5,
  locations: true
});

test("eval--", {
  ecmaVersion: 5,
  locations: true
});

test("arguments++", {
  ecmaVersion: 5,
  locations: true
});

test("arguments--", {
  ecmaVersion: 5,
  locations: true
});

test("++x", {
  ecmaVersion: 5,
  locations: true
});

test("--x", {
  ecmaVersion: 5,
  locations: true
});

test("++eval", {
  ecmaVersion: 5,
  locations: true
});

test("--eval", {
  ecmaVersion: 5,
  locations: true
});

test("++arguments", {
  ecmaVersion: 5,
  locations: true
});

test("--arguments", {
  ecmaVersion: 5,
  locations: true
});

test("+x", {
  ecmaVersion: 5,
  locations: true
});

test("-x", {
  ecmaVersion: 5,
  locations: true
});

test("~x", {
  ecmaVersion: 5,
  locations: true
});

test("!x", {
  ecmaVersion: 5,
  locations: true
});

test("void x", {
  ecmaVersion: 5,
  locations: true
});

test("delete x", {
  ecmaVersion: 5,
  locations: true
});

test("typeof x", {
  ecmaVersion: 5,
  locations: true
});

test("x * y", {
  ecmaVersion: 5,
  locations: true
});

test("x / y", {
  ecmaVersion: 5,
  locations: true
});

test("x % y", {
  ecmaVersion: 5,
  locations: true
});

test("x + y", {
  ecmaVersion: 5,
  locations: true
});

test("x - y", {
  ecmaVersion: 5,
  locations: true
});

test("x << y", {
  ecmaVersion: 5,
  locations: true
});

test("x >> y", {
  ecmaVersion: 5,
  locations: true
});

test("x >>> y", {
  ecmaVersion: 5,
  locations: true
});

test("x < y", {
  ecmaVersion: 5,
  locations: true
});

test("x > y", {
  ecmaVersion: 5,
  locations: true
});

test("x <= y", {
  ecmaVersion: 5,
  locations: true
});

test("x >= y", {
  ecmaVersion: 5,
  locations: true
});

test("x in y", {
  ecmaVersion: 5,
  locations: true
});

test("x instanceof y", {
  ecmaVersion: 5,
  locations: true
});

test("x < y < z", {
  ecmaVersion: 5,
  locations: true
});

test("x == y", {
  ecmaVersion: 5,
  locations: true
});

test("x != y", {
  ecmaVersion: 5,
  locations: true
});

test("x === y", {
  ecmaVersion: 5,
  locations: true
});

test("x !== y", {
  ecmaVersion: 5,
  locations: true
});

test("x & y", {
  ecmaVersion: 5,
  locations: true
});

test("x ^ y", {
  ecmaVersion: 5,
  locations: true
});

test("x | y", {
  ecmaVersion: 5,
  locations: true
});

test("x + y + z", {
  ecmaVersion: 5,
  locations: true
});

test("x - y + z", {
  ecmaVersion: 5,
  locations: true
});

test("x + y - z", {
  ecmaVersion: 5,
  locations: true
});

test("x - y - z", {
  ecmaVersion: 5,
  locations: true
});

test("x + y * z", {
  ecmaVersion: 5,
  locations: true
});

test("x + y / z", {
  ecmaVersion: 5,
  locations: true
});

test("x - y % z", {
  ecmaVersion: 5,
  locations: true
});

test("x * y * z", {
  ecmaVersion: 5,
  locations: true
});

test("x * y / z", {
  ecmaVersion: 5,
  locations: true
});

test("x * y % z", {
  ecmaVersion: 5,
  locations: true
});

test("x % y * z", {
  ecmaVersion: 5,
  locations: true
});

test("x << y << z", {
  ecmaVersion: 5,
  locations: true
});

test("x | y | z", {
  ecmaVersion: 5,
  locations: true
});

test("x & y & z", {
  ecmaVersion: 5,
  locations: true
});

test("x ^ y ^ z", {
  ecmaVersion: 5,
  locations: true
});

test("x & y | z", {
  ecmaVersion: 5,
  locations: true
});

test("x | y ^ z", {
  ecmaVersion: 5,
  locations: true
});

test("x | y & z", {
  ecmaVersion: 5,
  locations: true
});

test("x || y", {
  ecmaVersion: 5,
  locations: true
});

test("x && y", {
  ecmaVersion: 5,
  locations: true
});

test("x || y || z", {
  ecmaVersion: 5,
  locations: true
});

test("x && y && z", {
  ecmaVersion: 5,
  locations: true
});

test("x || y && z", {
  ecmaVersion: 5,
  locations: true
});

test("x || y ^ z", {
  ecmaVersion: 5,
  locations: true
});

test("y ? 1 : 2", {
  ecmaVersion: 5,
  locations: true
});

test("x && y ? 1 : 2", {
  ecmaVersion: 5,
  locations: true
});

test("x = 42", {
  ecmaVersion: 5,
  locations: true
});

test("eval = 42", {
  ecmaVersion: 5,
  locations: true
});

test("arguments = 42", {
  ecmaVersion: 5,
  locations: true
});

test("x *= 42", {
  ecmaVersion: 5,
  locations: true
});

test("x /= 42", {
  ecmaVersion: 5,
  locations: true
});

test("x %= 42", {
  ecmaVersion: 5,
  locations: true
});

test("x += 42", {
  ecmaVersion: 5,
  locations: true
});

test("x -= 42", {
  ecmaVersion: 5,
  locations: true
});

test("x <<= 42", {
  ecmaVersion: 5,
  locations: true
});

test("x >>= 42", {
  ecmaVersion: 5,
  locations: true
});

test("x >>>= 42", {
  ecmaVersion: 5,
  locations: true
});

test("x &= 42", {
  ecmaVersion: 5,
  locations: true
});

test("x ^= 42", {
  ecmaVersion: 5,
  locations: true
});

test("x |= 42", {
  ecmaVersion: 5,
  locations: true
});

test("{ foo }", {
  ecmaVersion: 5,
  locations: true
});

test("{ doThis(); doThat(); }", {
  ecmaVersion: 5,
  locations: true
});

test("{}", {
  ecmaVersion: 5,
  locations: true
});

test("var x", {
  ecmaVersion: 5,
  locations: true
});

test("var await", {
  ecmaVersion: 5,
  locations: true
});

test("var x, y;", {
  ecmaVersion: 5,
  locations: true
});

test("var x = 42", {
  ecmaVersion: 5,
  locations: true
});

test("var eval = 42, arguments = 42", {
  ecmaVersion: 5,
  locations: true
});

test("var x = 14, y = 3, z = 1977", {
  ecmaVersion: 5,
  locations: true
});

test("var implements, interface, package", {
  ecmaVersion: 5,
  locations: true
});

test("var private, protected, public, static", {
  ecmaVersion: 5,
  locations: true
});

test(";", {
  ecmaVersion: 5,
  locations: true
});

test("x", {
  ecmaVersion: 5,
  locations: true
});

test("x, y", {
  ecmaVersion: 5,
  locations: true
});

test("\\u0061", {
  ecmaVersion: 5,
  locations: true
});

test("a\\u0061", {
  ecmaVersion: 5,
  locations: true
});

test("if (morning) goodMorning()", {
  ecmaVersion: 5,
  locations: true
});

test("if (morning) (function(){})", {
  ecmaVersion: 5,
  locations: true
});

test("if (morning) var x = 0;", {
  ecmaVersion: 5,
  locations: true
});

test("if (morning) function a(){}", {
  ecmaVersion: 5,
  locations: true
});

test("if (morning) goodMorning(); else goodDay()", {
  ecmaVersion: 5,
  locations: true
});

test("do keep(); while (true)", {
  ecmaVersion: 5,
  locations: true
});

test("do keep(); while (true);", {
  ecmaVersion: 5,
  locations: true
});

test("do { x++; y--; } while (x < 10)", {
  ecmaVersion: 5,
  locations: true
});

test("{ do { } while (false);false }", {
  ecmaVersion: 5,
  locations: true
});

test("while (true) doSomething()", {
  ecmaVersion: 5,
  locations: true
});

test("while (x < 10) { x++; y--; }", {
  ecmaVersion: 5,
  locations: true
});

test("for(;;);", {
  ecmaVersion: 5,
  locations: true
});

test("for(;;){}", {
  ecmaVersion: 5,
  locations: true
});

test("for(x = 0;;);", {
  ecmaVersion: 5,
  locations: true
});

test("for(var x = 0;;);", {
  ecmaVersion: 5,
  locations: true
});

test("for(var x = 0, y = 1;;);", {
  ecmaVersion: 5,
  locations: true
});

test("for(x = 0; x < 42;);", {
  ecmaVersion: 5,
  locations: true
});

test("for(x = 0; x < 42; x++);", {
  ecmaVersion: 5,
  locations: true
});

test("for(x = 0; x < 42; x++) process(x);", {
  ecmaVersion: 5,
  locations: true
});

test("for(x in list) process(x);", {
  ecmaVersion: 5,
  locations: true
});

test("for (var x in list) process(x);", {
  ecmaVersion: 5,
  locations: true
});

test("for (var x = 42 in list) process(x);", {
  ecmaVersion: 5,
  locations: true
});

test("for (var i = function() { return 10 in [] } in list) process(x);", {
  ecmaVersion: 5,
  locations: true
});

test("while (true) { continue; }", {
  ecmaVersion: 5,
  locations: true
});

test("while (true) { continue }", {
  ecmaVersion: 5,
  locations: true
});

test("done: while (true) { continue done }", {
  ecmaVersion: 5,
  locations: true
});

test("done: while (true) { continue done; }", {
  ecmaVersion: 5,
  locations: true
});

test("while (true) { break }", {
  ecmaVersion: 5,
  locations: true
});

test("done: while (true) { break done }", {
  ecmaVersion: 5,
  locations: true
});

test("done: while (true) { break done; }", {
  ecmaVersion: 5,
  locations: true
});

test("target1: target2: while (true) { continue target1; }", {
  ecmaVersion: 5,
  locations: true
});
test("target1: target2: target3: while (true) { continue target1; }", {
  ecmaVersion: 5,
  locations: true
});

test("(function(){ return })", {
  ecmaVersion: 5,
  locations: true
});

test("(function(){ return; })", {
  ecmaVersion: 5,
  locations: true
});

test("(function(){ return x; })", {
  ecmaVersion: 5,
  locations: true
});

test("(function(){ return x * y })", {
  ecmaVersion: 5,
  locations: true
});

test("with (x) foo = bar", {
  ecmaVersion: 5,
  locations: true
});

test("with (x) foo = bar;", {
  ecmaVersion: 5,
  locations: true
});

// Test that innocuous string that evaluates to `use strict` is not promoted to
// Use Strict directive.
test("'use\\x20strict'; with (x) foo = bar;", {
  ecmaVersion: 5,
  locations: true
});

// Test that innocuous string that evaluates to `use strict` is not promoted to
// Use Strict directive.
test('"use\\x20strict"; with (x) foo = bar;', {
  ecmaVersion: 5,
  locations: true
});

test("with (x) { foo = bar }", {
  ecmaVersion: 5,
  locations: true
});

test("switch (x) {}", {
  ecmaVersion: 5,
  locations: true
});

test("switch (answer) { case 42: hi(); break; }", {
  ecmaVersion: 5,
  locations: true
});

test("switch (answer) { case 42: hi(); break; default: break }", {
  ecmaVersion: 5,
  locations: true
});

test("start: for (;;) break start", {
  ecmaVersion: 5,
  locations: true
});

test("start: while (true) break start", {
  ecmaVersion: 5,
  locations: true
});

test("throw x;", {
  ecmaVersion: 5,
  locations: true
});

test("throw x * y", {
  ecmaVersion: 5,
  locations: true
});

test("throw { message: \"Error\" }", {
  ecmaVersion: 5,
  locations: true
});

test("try { } catch (e) { }", {
  ecmaVersion: 5,
  locations: true
});

test("try { } catch (eval) { }", {
  ecmaVersion: 5,
  locations: true
});

test("try { } catch (arguments) { }", {
  ecmaVersion: 5,
  locations: true
});

test("try { } catch (e) { say(e) }", {
  ecmaVersion: 5,
  locations: true
});

test("try { } finally { cleanup(stuff) }", {
  ecmaVersion: 5,
  locations: true
});

test("try { doThat(); } catch (e) { say(e) }", {
  ecmaVersion: 5,
  locations: true
});

test("try { doThat(); } catch (e) { say(e) } finally { cleanup(stuff) }", {
  ecmaVersion: 5,
  locations: true
});

test("debugger;", {
  ecmaVersion: 5,
  locations: true
});

test("function hello() { sayHi(); }", {
  ecmaVersion: 5,
  locations: true
});

test("function eval() { }", {
  ecmaVersion: 5,
  locations: true
});

test("function arguments() { }", {
  ecmaVersion: 5,
  locations: true
});

test("function test(t, t) { }", {
  ecmaVersion: 5,
  locations: true
});

test("(function test(t, t) { })", {
  ecmaVersion: 5,
  locations: true
});

test("function eval() { function inner() { \"use strict\" } }", {
  ecmaVersion: 5,
  locations: true
});

test("function hello(a) { sayHi(); }", {
  ecmaVersion: 5,
  locations: true
});

test("function hello(a, b) { sayHi(); }", {
  ecmaVersion: 5,
  locations: true
});

test("function hello(...rest) { }", {
  ecmaVersion: 6,
  locations: true
});

test("function hello(a, ...rest) { }", {
  ecmaVersion: 6,
  locations: true
});

test("var hi = function() { sayHi() };", {
  ecmaVersion: 5,
  locations: true
});

test("var hi = function (...r) { sayHi() };", {
  ecmaVersion: 6,
  locations: true
});

test("var hi = function eval() { };", {
  ecmaVersion: 5,
  locations: true
});

test("var hi = function arguments() { };", {
  ecmaVersion: 5,
  locations: true
});

test("var hello = function hi() { sayHi() };", {
  ecmaVersion: 5,
  locations: true
});

test("(function(){})", {
  ecmaVersion: 5,
  locations: true
});

test("{ x\n++y }", {
  ecmaVersion: 5,
  locations: true
});

test("{ x\n--y }", {
  ecmaVersion: 5,
  locations: true
});

test("var x /* comment */;", {
  ecmaVersion: 5,
  locations: true
});

test("{ var x = 14, y = 3\nz; }", {
  ecmaVersion: 5,
  locations: true
});

test("while (true) { continue\nthere; }", {
  ecmaVersion: 5,
  locations: true
});

test("while (true) { continue // Comment\nthere; }", {
  ecmaVersion: 5,
  locations: true
});

test("while (true) { continue /* Multiline\nComment */there; }", {
  ecmaVersion: 5,
  locations: true
});

test("while (true) { break\nthere; }", {
  ecmaVersion: 5,
  locations: true
});

test("while (true) { break // Comment\nthere; }", {
  ecmaVersion: 5,
  locations: true
});

test("while (true) { break /* Multiline\nComment */there; }", {
  ecmaVersion: 5,
  locations: true
});

test("(function(){ return\nx; })", {
  ecmaVersion: 5,
  locations: true
});

test("(function(){ return // Comment\nx; })", {
  ecmaVersion: 5,
  locations: true
});

test("(function(){ return/* Multiline\nComment */x; })", {
  ecmaVersion: 5,
  locations: true
});

test("{ throw error\nerror; }", {
  ecmaVersion: 5,
  locations: true
});

test("{ throw error// Comment\nerror; }", {
  ecmaVersion: 5,
  locations: true
});

test("{ throw error/* Multiline\nComment */error; }", {
  ecmaVersion: 5,
  locations: true
});

test("", {
  ecmaVersion: 5,
  locations: true
});

test("foo: if (true) break foo;", {
  ecmaVersion: 5,
  locations: true
});

test("(function () {\n 'use strict';\n '\0';\n}())", {
  ecmaVersion: 5,
  locations: true
});

test("123..toString(10)", {
  ecmaVersion: 5,
  locations: true
});

test("123.+2", {
  ecmaVersion: 5,
  locations: true
});

test("a\u2028b", {
  ecmaVersion: 5,
  locations: true
});

test("'a\\u0026b'", {
  ecmaVersion: 5,
  locations: true
});

test("foo: 10; foo: 20;", {
  ecmaVersion: 5,
  locations: true
});

test("if(1)/  foo/", {
  ecmaVersion: 5,
  locations: true
});

test("price_9̶9̶_89", {
  ecmaVersion: 5,
  locations: true
});

// `\0` is valid even in strict mode
test("function hello() { 'use strict'; \"\\0\"; }", {
  ecmaVersion: 5,
  locations: true
});

// option tests

test("var a = 1;", {
  ecmaVersion: 5,
  locations: true,
  sourceFile: "test.js"
});

test("a.in / b", {
  ecmaVersion: 5,
  locations: true
});

// A number of slash-disambiguation corner cases
test("return {} / 2", {
  ecmaVersion: 5,
  allowReturnOutsideFunction: true
});
test("return\n{}\n/foo/", {
  ecmaVersion: 5,
  allowReturnOutsideFunction: true
});
test("+{} / 2", {
  ecmaVersion: 5,
  locations: true
});
test("{}\n/foo/", {
  ecmaVersion: 5,
  locations: true
});
test("x++\n{}\n/foo/", {
  ecmaVersion: 5,
  locations: true
});
test("{{}\n/foo/}", {
  ecmaVersion: 5,
  locations: true
});
test("while (1) /foo/", {
  ecmaVersion: 5,
  locations: true
});
test("while (1) {} /foo/", {
  ecmaVersion: 5,
  locations: true
});
test("(1) / 2", {
  ecmaVersion: 5,
  locations: true
});
test("({a: [1]}+[]) / 2", {
  ecmaVersion: 5,
  locations: true
});
test("{[1]}\n/foo/", {
  ecmaVersion: 5,
  locations: true
});
test("switch(a) { case 1: {}\n/foo/ }", {
  ecmaVersion: 5,
  locations: true
});
test("({1: {} / 2})", {
  ecmaVersion: 5,
  locations: true
});
test("+x++ / 2", {
  ecmaVersion: 5,
  locations: true
});
test("foo.in\n{}\n/foo/", {
  ecmaVersion: 5,
  locations: true
});
test("var x = function f() {} / 3;", {
  ecmaVersion: 5,
  locations: true
});
test("+function f() {} / 3;", {
  ecmaVersion: 5,
  locations: true
});
test("foo: function x() {} /regexp/", {
  ecmaVersion: 5,
  locations: true
});
test("x = {foo: function x() {} / divide}", {
  ecmaVersion: 5,
  locations: true
});
test("foo; function f() {} /regexp/", {
  ecmaVersion: 5,
  locations: true
});
test("{function f() {} /regexp/}", {
  ecmaVersion: 5,
  locations: true
});

test("{}/=/", {
  ecmaVersion: 5,
  locations: true
});

test("foo <!--bar\n+baz", {
  ecmaVersion: 5,
  locations: true
});

test("x = y-->10;\n --> nothing", {
  ecmaVersion: 5,
  locations: true
});

test("'use strict';\nobject.static();", {
  ecmaVersion: 5,
  locations: true
});

// Failure tests

testFail("{",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("}",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("3ea",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("3in []",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("3e",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("3e+",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("3e-",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("3x",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("3x0",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("0x",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("'use strict'; 09",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("'use strict'; 018",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("01a",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("3in[]",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("0x3in[]",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("\"Hello\nWorld\"",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("x\\",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("x\\u005c",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("x\\u002a",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("/",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("/test",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("var x = /[a-z]/\\ux",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("3 = 4",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("func() = 4",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("(1 + 1) = 10",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("1++",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("1--",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("++1",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("--1",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("for((1 + 1) in list) process(x);",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("[",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("[,",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("1 + {",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("1 + { t:t ",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("1 + { t:t,",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("var x = /\n/",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("var x = \"\n",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("var if = 42",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("i + 2 = 42",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("+i = 42",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("1 + (",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("\n\n\n{",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("\n/* Some multiline\ncomment */\n)",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("{ set 1 }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("{ get 2 }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("({ set: s(if) { } })",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("({ set s(.) { } })",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("({ set: s() { } })",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("({ set: s(a, b) { } })",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("({ get: g(d) { } })",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("({ get i() { }, i: 42 })",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("({ i: 42, get i() { } })",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("({ set i(x) { }, i: 42 })",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("({ i: 42, set i(x) { } })",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("({ get i() { }, get i() { } })",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("({ set i(x) { }, set i(x) { } })",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("'use strict'; ({ __proto__: 1, __proto__: 2 })",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function t(...) { }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function t(...) { }", { ecmaVersion: 6 });

testFail("function t(...rest, b) { }", { ecmaVersion: 6 });

testFail("function t(if) { }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function t(true) { }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function t(false) { }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function t(null) { }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function null() { }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function true() { }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function false() { }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function if() { }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("a b;",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("if.a;",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("a if;",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("a class;",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("break\n",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("break 1;",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("continue\n",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("continue 2;",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("throw",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("throw;",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("for (var i, i2 in {});",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("for ((i in {}));",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("for (i + 1 in {});",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("for (+i in {});",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("if(false)",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("if(false) doThis(); else",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("do",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("while(false)",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("for(;;)",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("with(x)",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("try { }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("‿ = 10",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("if(true) let a = 1;",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("switch (c) { default: default: }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("new X().\"s\"",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("/*",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("/*\n\n\n",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("/**",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("/*\n\n*",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("/*hello",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("/*hello  *",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("\n]",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("\r]",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("\r\n]",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("\n\r]",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("//\r\n]",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("//\n\r]",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("/a\\\n/",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("//\r \n]",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("/*\r\n*/]",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("/*\n\r*/]",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("/*\r \n*/]",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("\\\\",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("\\u005c",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("\\x",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("\\u0000",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("‌ = []",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("‍ = []",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("\"\\",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("\"\\u",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("return",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("break",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("continue",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("switch (x) { default: continue; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("do { x } *",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("while (true) { break x; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("while (true) { continue x; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("x: while (true) { (function () { break x; }); }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("x: while (true) { (function () { continue x; }); }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("x: while (true) { (function () { break; }); }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("x: while (true) { (function () { continue; }); }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("x: while (true) { x: while (true) { } }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("(function () { 'use strict'; delete i; }())",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function x() { '\\12'; 'use strict'; }", {
  ecmaVersion: 5,
  locations: true
})

testFail("(function () { 'use strict'; with (i); }())",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() {'use strict'; ({ i: 42, i: 42 }) }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() {'use strict'; ({ hasOwnProperty: 42, hasOwnProperty: 42 }) }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() {'use strict'; var eval = 10; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() {'use strict'; var arguments = 10; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() {'use strict'; try { } catch (eval) { } }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() {'use strict'; try { } catch (arguments) { } }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() {'use strict'; eval = 10; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() {'use strict'; arguments = 10; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() {'use strict'; ++eval; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() {'use strict'; --eval; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() {'use strict'; ++arguments; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() {'use strict'; --arguments; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() {'use strict'; eval++; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() {'use strict'; eval--; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() {'use strict'; arguments++; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() {'use strict'; arguments--; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() {'use strict'; function eval() { } }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() {'use strict'; function arguments() { } }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function eval() {'use strict'; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function arguments() {'use strict'; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() {'use strict'; (function eval() { }()) }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() {'use strict'; (function arguments() { }()) }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("(function eval() {'use strict'; })()",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("(function arguments() {'use strict'; })()",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() {'use strict'; ({ s: function eval() { } }); }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("(function package() {'use strict'; })()",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() {'use strict'; ({ i: 10, set s(eval) { } }); }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() {'use strict'; ({ set s(eval) { } }); }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() {'use strict'; ({ s: function s(eval) { } }); }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello(eval) {'use strict';}",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello(arguments) {'use strict';}",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() { 'use strict'; function inner(eval) {} }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() { 'use strict'; function inner(arguments) {} }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() { 'use strict'; \"\\1\"; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() { 'use strict'; \"\\00\"; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() { 'use strict'; \"\\000\"; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() { 'use strict'; 021; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() { 'use strict'; ({ \"\\1\": 42 }); }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() { 'use strict'; ({ 021: 42 }); }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() { \"use strict\"; function inner() { \"octal directive\\1\"; } }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() { \"use strict\"; var implements; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() { \"use strict\"; var interface; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() { \"use strict\"; var package; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() { \"use strict\"; var private; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() { \"use strict\"; var protected; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() { \"use strict\"; var public; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello() { \"use strict\"; var static; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function hello(static) { \"use strict\"; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function static() { \"use strict\"; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("\"use strict\"; function static() { }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function a(t, t) { \"use strict\"; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function a(eval) { \"use strict\"; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function a(package) { \"use strict\"; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function a() { \"use strict\"; function b(t, t) { }; }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("(function a(t, t) { \"use strict\"; })",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("function a() { \"use strict\"; (function b(t, t) { }); }",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("(function a(eval) { \"use strict\"; })",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("(function a(package) { \"use strict\"; })",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("\"use strict\";function foo(){\"use strict\";}function bar(){var v = 015}",
         {
           ecmaVersion: 5,
           locations: true
         });

testFail("var this = 10;", {
  ecmaVersion: 5,
  locations: true
});

testFail("throw\n10;", {
  ecmaVersion: 5,
  locations: true
});


// ECMA < 6 mode should work as before

testFail("const a;", {
  ecmaVersion: 5,
  locations: true
});

testFail("let x;", {
  ecmaVersion: 5,
  locations: true
});

testFail("const a = 1;", {
  ecmaVersion: 5,
  locations: true
});

testFail("let a = 1;", {
  ecmaVersion: 5,
  locations: true
});

testFail("for(const x = 0;;);", {
  ecmaVersion: 5,
  locations: true
});

testFail("for(let x = 0;;);", {
  ecmaVersion: 5,
  locations: true
});

testFail("function a(b = c) {}", {
  ecmaVersion: 5,
  locations: true
})

test("let++", {
  ecmaVersion: 5,
  locations: true
});

// ECMA 6 support

test("let x", {ecmaVersion: 6, locations: true});

test("let x, y;", {ecmaVersion: 6, locations: true});

test("let x = 42", {ecmaVersion: 6, locations: true});

test("let eval = 42, arguments = 42", {ecmaVersion: 6, locations: true});

test("let x = 14, y = 3, z = 1977", {ecmaVersion: 6, locations: true});

test("for(let x = 0;;);", {ecmaVersion: 6, locations: true});

test("for(let x = 0, y = 1;;);", {ecmaVersion: 6, locations: true});

test("for (let x in list) process(x);", {ecmaVersion: 6, locations: true});

test("const x = 42", {ecmaVersion: 6, locations: true});

test("const eval = 42, arguments = 42", {ecmaVersion: 6, locations: true});

test("const x = 14, y = 3, z = 1977", {ecmaVersion: 6, locations: true});

testFail("const a;", {ecmaVersion: 6});

test("for(const x = 0;;);", {ecmaVersion: 6, ranges: true});

testFail("for(x of a);", {
  ecmaVersion: 5,
  locations: true
});

testFail("for(var x of a);", {
  ecmaVersion: 5,
  locations: true
});

// Assertion Tests
test(function TestComments() {
    // Bear class
    function Bear(x,y,z) {
      this.position = [x||0,y||0,z||0]
    }

    Bear.prototype.roar = function(message) {
      return 'RAWWW: ' + message; // Whatever
    };

    function Cat() {
    /* 1
       2
       3*/
    }

    Cat.prototype.roar = function(message) {
      return 'MEOOWW: ' + /*stuff*/ message;
    };
}.toString().replace(/\r\n/g, '\n'), {
  ecmaVersion: 5,

  onComment: [
    {type: "Line", value: " Bear class"},
    {type: "Line", value: " Whatever"},
    {type: "Block",  value: [
            " 1",
      "       2",
      "       3"
    ].join('\n')},
    {type: "Block", value: "stuff"}
  ]
});

test("<!--\n;", {
  ecmaVersion: 5,
  locations: true
});

test("\nfunction plop() {\n'use strict';\n/* Comment */\n}", {
  ecmaVersion: 5,
  locations: true,

  onComment: [{
    type: "Block",
    value: " Comment ",
    loc: {
      start: { line: 4, column: 0 },
      end: { line: 4, column: 13 }
    }
  }]
});

test("// line comment", {
  ecmaVersion: 5,
  locations: true,

  onComment: [{
    type: "Line",
    value: " line comment",
    loc: {
      start: { line: 1, column: 0 },
      end: { line: 1, column: 15 }
    }
  }]
});

test("<!-- HTML comment", {
  ecmaVersion: 5,
  locations: true,

  onComment: [{
    type: "Line",
    value: " HTML comment",
    loc: {
      start: { line: 1, column: 0 },
      end: { line: 1, column: 17 }
    }
  }]
});

test(";\n--> HTML comment", {
  ecmaVersion: 5,
  locations: true,

  onComment: [{
    type: "Line",
    value: " HTML comment",
    loc: {
      start: { line: 2, column: 0 },
      end: { line: 2, column: 16 }
    }
  }]
});

var tokTypes = acorn.tokTypes;

test('var x = (1 + 2)', {
  ecmaVersion: 5,
  locations: true,
  loose: false,

  onToken: [
    {
      type: tokTypes._var,
      value: "var",
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 3}
      }
    },
    {
      type: tokTypes.name,
      value: "x",
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 5}
      }
    },
    {
      type: tokTypes.eq,
      value: "=",
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    {
      type: tokTypes.parenL,
      value: undefined,
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 9}
      }
    },
    {
      type: tokTypes.num,
      value: 1,
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 10}
      }
    },
    {
      type: {binop: 9, prefix: true, beforeExpr: true},
      value: "+",
      loc: {
        start: {line: 1, column: 11},
        end: {line: 1, column: 12}
      }
    },
    {
      type: tokTypes.num,
      value: 2,
      loc: {
        start: {line: 1, column: 13},
        end: {line: 1, column: 14}
      }
    },
    {
      type: tokTypes.parenR,
      value: undefined,
      loc: {
        start: {line: 1, column: 14},
        end: {line: 1, column: 15}
      }
    },
    {
      type: tokTypes.eof,
      value: undefined,
      loc: {
        start: {line: 1, column: 15},
        end: {line: 1, column: 15}
      }
    }
  ]
});

test("function f(f) { 'use strict'; }", {
  ecmaVersion: 5,
  locations: true
});

// https://github.com/ternjs/acorn/issues/180
test("#!/usr/bin/node\n;", {
  ecmaVersion: 5,
  allowHashBang: true,

  onComment: [{
    type: "Line",
    value: "/usr/bin/node",
    start: 0,
    end: 15
  }]
});

// https://github.com/ternjs/acorn/issues/204
test("(function () {} / 1)", {
  ecmaVersion: 5,
  locations: true
});

test("function f() {} / 1 /", {
  ecmaVersion: 5,
  locations: true
});

// https://github.com/ternjs/acorn/issues/320

test("do /x/; while (false);", {
  ecmaVersion: 5,
  locations: true
});

var semicolons = []
testAssert("var x\nreturn\n10", function() {
  var result = semicolons.join(" ");
  semicolons.length = 0;
  if (result != "5 12 15")
    return "Unexpected result for onInsertedSemicolon: " + result;
}, {
  ecmaVersion: 5,
  onInsertedSemicolon: function(pos) { semicolons.push(pos); },
  allowReturnOutsideFunction: true,
  loose: false
})

var trailingCommas = []
testAssert("[1,2,] + {foo: 1,}", function() {
  var result = trailingCommas.join(" ");
  trailingCommas.length = 0;
  if (result != "4 16")
    return "Unexpected result for onTrailingComma: " + result;
}, {
  ecmaVersion: 5,
  onTrailingComma: function(pos) { trailingCommas.push(pos); },
  loose: false
})

// https://github.com/ternjs/acorn/issues/275

testFail("({ get prop(x) {} })", {
  ecmaVersion: 5,
  locations: true
});
testFail("({ set prop() {} })", {
  ecmaVersion: 5,
  locations: true
});
testFail("({ set prop(x, y) {} })", {
  ecmaVersion: 5,
  locations: true
});

// https://github.com/ternjs/acorn/issues/363

test("/[a-z]/gim", {
  ecmaVersion: 5,
  locations: true
});
testFail("/[a-z]/u", {
  ecmaVersion: 5,
  locations: true
});
testFail("/[a-z]/y", {
  ecmaVersion: 5,
  locations: true
});
testFail("/[a-z]/s", {
  ecmaVersion: 5,
  locations: true
});

testFail("function(){}", {
  ecmaVersion: 5,
  locations: true
});

test("0123. in/foo/i", {
  ecmaVersion: 5,
  locations: true
})

test("0128", {
  ecmaVersion: 5,
  locations: true
})

test("undefined", { ecmaVersion: 8 })

testFail("\\u{74}rue", {ecmaVersion: 6})

testFail("(x=1)=2", {
  ecmaVersion: 5,
  locations: true
})

test("(foo = [])[0] = 4;", {
  ecmaVersion: 5,
  locations: true
})

test("for ((foo = []).bar in {}) {}", {
  ecmaVersion: 5,
  locations: true
})

test("((b), a=1)", {
  ecmaVersion: 5,
  locations: true
})

test("(x) = 1", {
  ecmaVersion: 5,
  locations: true
})

testFail("try {} catch (foo) { var foo; }", {
  ecmaVersion: 5,
  locations: true
})
testFail("try {} catch (foo) { let foo; }", {ecmaVersion: 6})
testFail("try {} catch (foo) { try {} catch (_) { var foo; } }", {
  ecmaVersion: 5,
  locations: true
})
testFail("try {} catch ([foo]) { var foo; }", {ecmaVersion: 6})
testFail("try {} catch ({ foo }) { var foo; }", {ecmaVersion: 6})
testFail("try {} catch ([foo, foo]) {}", {ecmaVersion: 6})
testFail("try {} catch ({ a: foo, b: { c: [foo] } }) {}", {ecmaVersion: 6})
testFail("let foo; try {} catch (foo) {} let foo;", {ecmaVersion: 6})
testFail("try {} catch (foo) { function foo() {} }", {
  ecmaVersion: 5,
  locations: true
})

test("try {} catch (foo) {} var foo;", {
  ecmaVersion: 5,
  locations: true
})
test("try {} catch (foo) {} let foo;", {ecmaVersion: 6})
test("try {} catch (foo) { { let foo; } }", {ecmaVersion: 6})
test("try {} catch (foo) { function x() { var foo; } }", {ecmaVersion: 6})
test("try {} catch (foo) { function x(foo) {} }", {ecmaVersion: 6})

test("'use strict'; let foo = function foo() {}", {ecmaVersion: 6})

test("/**/ --> comment\n", {
  ecmaVersion: 5,
  locations: true
})
