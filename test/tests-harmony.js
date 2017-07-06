/*
  Copyright (C) 2015 Ingvar Stepanyan <me@rreverser.com>
  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
  Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
  Copyright (C) 2011 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2011 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2011 Arpad Borsos <arpad.borsos@googlemail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

if (typeof exports != "undefined") {
  var test = require("./driver.js").test;
  var testFail = require("./driver.js").testFail;
}

/*
  Tests below were automatically converted from https://github.com/ariya/esprima/blob/2bb17ef9a45c88e82d72c2c61b7b7af93caef028/test/harmonytest.js.

  Manually fixed locations for:
   - parenthesized expressions (include brackets into expression's location)
   - expression statements (excluded spaces after statement's semicolon)
   - arrow and method functions (included arguments into function's location)
   - template elements (excluded '`', '${' and '}' from element's location)
*/

// ES6 Unicode Code Point Escape Sequence

test("\"\\u{714E}\\u{8336}\"", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("\"\\u{20BB7}\\u{91CE}\\u{5BB6}\"", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// ES6: Numeric Literal

test("00", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0o0", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function test() {'use strict'; 0o0; }", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0o2", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0o12", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0O0", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function test() {'use strict'; 0O0; }", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0O2", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0O12", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0b0", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0b1", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0b10", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0B0", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0B1", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0B10", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// ES6 Template Strings

test("`42`", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("raw`42`", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("raw`hello ${name}`", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("`$`", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("`\\n\\r\\b\\v\\t\\f\\\n\\\r\n`", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("`\n\r\n\r`", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("`\\u{000042}\\u0042\\x42u0\\A`", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("new raw`42`", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test(
  "`outer${{x: {y: 10}}}bar${`nested${function(){return 1;}}endnest`}end`",
  {
    ecmaVersion: 6
  }
);


// ES6: Switch Case Declaration

test("switch (answer) { case 42: let t = 42; break; }", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// ES6: Arrow Function

test("() => \"test\"", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("e => \"test\"", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(e) => \"test\"", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(a, b) => \"test\"", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("e => { 42; }", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("e => ({ property: 42 })", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("e => { label: 42 }", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(a, b) => { 42; }", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("([a, , b]) => 42", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

testFail("([a.a]) => 42", {ecmaVersion: 6});
testFail("() => {}()", {ecmaVersion: 6})
testFail("(a) => {}()", {ecmaVersion: 6})
testFail("a => {}()", {ecmaVersion: 6})
testFail("console.log(typeof () => {});", {ecmaVersion: 6})

test("(() => {})()", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("((() => {}))()", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});


test("(x=1) => x * x", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("eval => 42", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("arguments => 42", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(a) => 00", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(eval, a) => 42", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(eval = 10) => 42", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(eval, a = 10) => 42", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(x => x)", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("x => y => 42", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(x) => ((y, z) => (x, y, z))", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("foo(() => {})", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("foo((x, y) => {})", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// ES6: Method Definition

test("x = { method() { } }", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("x = { method(test) { } }", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("x = { 'method'() { } }", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("x = { get() { } }", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("x = { set() { } }", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// Harmony: Object Literal Property Value Shorthand

test("x = { y, z }", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// Harmony: Destructuring

test("[a, b] = [b, a]", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({ responseText: text } = res)", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("const {a} = {}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("const [a] = []", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("let {a} = {}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("let [a] = []", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var {a} = {}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var [a] = []", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("const {a:b} = {}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("let {a:b} = {}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var {a:b} = {}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// Harmony: Modules

test("export var document", {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("export var document = { }", {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

testFail("export var await", { ecmaVersion: 6, sourceType: "module" })

test("export let document", {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("export let document = { }", {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("export const document = { }", {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("export function parse() { }", {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("export class Class {}", {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

testFail("export new Foo();", {ecmaVersion: 6, sourceType: "module"});
testFail("export typeof foo;", {ecmaVersion: 6, sourceType: "module"});

test("export default 42", {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test(
  "export default function () {}",
  {ecmaVersion: 6, sourceType: "module", ranges: true}
);

test(
  "export default function f() {}",
  {ecmaVersion: 6, sourceType: "module", ranges: true}
);

test(
  "export default class {}",
  {ecmaVersion: 6, sourceType: "module", ranges: true}
);

test(
  "export default class A {}",
  {ecmaVersion: 6, sourceType: "module", ranges: true}
);

test("export default (class{});", {ecmaVersion: 6, sourceType: "module"})

testFail("export *", {ecmaVersion: 6, sourceType: "module"});

test("export * from \"crypto\"", {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("export { encrypt }", {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("export { encrypt, decrypt }", {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("export { encrypt as default }", {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("export { encrypt, decrypt as dec }", {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("export { default } from \"other\"", {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

testFail("export { default }", {ecmaVersion: 6, sourceType: "module" });
testFail("export { if }", {ecmaVersion: 6, sourceType: "module" });
testFail("export { default as foo }", {ecmaVersion: 6, sourceType: "module" });
testFail("export { if as foo }", {ecmaVersion: 6, sourceType: "module" });

test("import \"jquery\"", {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("import $ from \"jquery\"", {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("import { encrypt, decrypt } from \"crypto\"", {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("import { encrypt as enc } from \"crypto\"", {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("import crypto, { decrypt, encrypt as enc } from \"crypto\"", {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

testFail("import default from \"foo\"", {ecmaVersion: 6, sourceType: "module"});

test("import { null as nil } from \"bar\"", {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("import * as crypto from \"crypto\"", {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

testFail("import { class } from 'foo'", {ecmaVersion: 6, sourceType: "module" });
testFail(
  "import { class, var } from 'foo'",
  {ecmaVersion: 6, sourceType: "module" }
);
testFail(
  "import { a as class } from 'foo'",
  {ecmaVersion: 6, sourceType: "module" }
);
testFail("import * as class from 'foo'", {ecmaVersion: 6, sourceType: "module" });
testFail("import { enum } from 'foo'", {ecmaVersion: 6, sourceType: "module" });
testFail("import { a as enum } from 'foo'", {ecmaVersion: 6, sourceType: "module" });
testFail("import * as enum from 'foo'", {ecmaVersion: 6, sourceType: "module" });

// Harmony: Yield Expression

test("(function* () { yield v })", {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("(function* () { yield\nv })", {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("(function* () { yield *v })", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function* test () { yield *v }", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var x = { *test () { yield *v } };", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function* foo() { console.log(yield); }", {ecmaVersion: 6})

test("function* t() {}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(function* () { yield yield 10 })", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

testFail("function *g() { (x = yield) => {} }", { ecmaVersion: 6 })
testFail("function *g() { ({x = yield}) => {} }", { ecmaVersion: 6 })

// Harmony: Iterators

test("for(x of list) process(x);", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("for (var x of list) process(x);", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("for (var x = 42 of list) process(x);", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("for (let x of list) process(x);", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// Harmony: Class (strawman)

test("var A = class extends B {}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A extends class B extends C {} {}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A {get() {}}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { static get() {}}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A extends B {get foo() {}}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A extends B { static get foo() {}}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A {set a(v) {}}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { static set a(v) {}}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A {set(v) {};}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { static set(v) {};}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A {*gen(v) { yield v; }}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { static *gen(v) { yield v; }}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("\"use strict\"; (class A {constructor() { super() }})", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A {'constructor'() {}}", {ecmaVersion: 6});

testFail("class A { constructor() {} 'constructor'() }", {ecmaVersion: 6});

testFail("class A { get constructor() {} }", {ecmaVersion: 6});

testFail("class A { *constructor() {} }", {ecmaVersion: 6});

test("class A {static foo() {}}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A {foo() {} static bar() {}}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("\"use strict\"; (class A { static constructor() { super() }})", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { foo() {} bar() {}}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { get foo() {} set foo(v) {}}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { static get foo() {} get foo() {}}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { static get foo() {} static get bar() {} }", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test(
  "class A { static get foo() {} static set foo(v) {} get foo() {} set foo(v) {}}",
  {
    ecmaVersion: 6,
    ranges: true,
    locations: true
  }
);


test("class A { static [foo]() {} }", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { static get [foo]() {} }", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { set foo(v) {} get foo() {} }", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { foo() {} get foo() {} }", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class Semicolon { ; }", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// ES6: Computed Properties

test("({[x]: 10})", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({[\"x\" + \"y\"]: 10})", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({[x]: function() {}})", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({[x]: 10, y: 20})", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({get [x]() {}, set [x](v) {}})", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({[x]() {}})", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var {[x]: y} = {y}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function f({[x]: y}) {}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var x = {*[test]() { yield *v; }}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A {[x]() {}}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

testFail("({[x]})", {ecmaVersion: 6});

// ES6: Default parameters

test("function f([x] = [1]) {}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function f([x] = [1]) { 'use strict' }", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function f({x} = {x: 10}) {}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("f = function({x} = {x: 10}) {}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({f: function({x} = {x: 10}) {}})", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({f({x} = {x: 10}) {}})", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(class {f({x} = {x: 10}) {}})", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(({x} = {x: 10}) => {})", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("x = function(y = 1) {}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function f(a = 1) {}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("x = { f: function(a=1) {} }", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("x = { f(a=1) {} }", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// ES6: Rest parameters

test("function f(a, ...b) {}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// ES6: Destructured Parameters

test("function x([ a, b ]){}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function x({ a, b }){}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

testFail("function x(...[ a, b ]){}", {ecmaVersion: 6});

testFail("function x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){}", {ecmaVersion: 6});

test("(function x([ a, b ]){})", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(function x({ a, b }){})", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

testFail("(function x(...[ a, b ]){})", {ecmaVersion: 6});
testFail("var a = { set foo(...v) {} };", {ecmaVersion: 6});
testFail("class a { set foo(...v) {} };", {ecmaVersion: 6});

testFail(
  "(function x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){})",
  {ecmaVersion: 6}
);

test("({ x([ a, b ]){} })", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({ x(...[ a, b ]){} })", {
  ecmaVersion: 7,
  ranges: true,
  locations: true
});

test("({ x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){} })", {
  ecmaVersion: 7,
  ranges: true,
  locations: true
});

test("(...a) => {}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(a, ...b) => {}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({ a }) => {}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({ a }, ...b) => {}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

testFail("(...[a, b]) => {}", {ecmaVersion: 6 });

testFail("(a, ...[b]) => {}", {ecmaVersion: 6 });

test("({ a: [a, b] }, ...c) => {}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({ a: b, c }, [d, e], ...f) => {}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// ES6: SpreadElement

test("[...a] = b", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("[a, ...b] = c", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("[{ a, b }, ...c] = d", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("[a, ...[b, c]] = d", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var [...a] = b", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var [a, ...b] = c", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var [{ a, b }, ...c] = d", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var [a, ...[b, c]] = d", {
  ecmaVersion: 7,
  ranges: true,
  locations: true
});

test("func(...a)", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("func(a, ...b)", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("func(...a, b)", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("/[a-z]/u", {
  locations: true,
  ecmaVersion: 6
});

test("/[\\uD834\\uDF06-\\uD834\\uDF08a-z]/u", {
  locations: true,
  ecmaVersion: 6
});

test("do {} while (false) foo();", {
  ecmaVersion: 6
});

// Harmony Invalid syntax

testFail("0o", {ecmaVersion: 6});

testFail("0o1a", {ecmaVersion: 6});

testFail("0o9", {ecmaVersion: 6});

testFail("0o18", {ecmaVersion: 6});

testFail("0O", {ecmaVersion: 6});

testFail("0O1a", {ecmaVersion: 6});

testFail("0O9", {ecmaVersion: 6});

testFail("0O18", {ecmaVersion: 6});

testFail("0b", {ecmaVersion: 6});

testFail("0b1a", {ecmaVersion: 6});

testFail("0b9", {ecmaVersion: 6});

testFail("0b18", {ecmaVersion: 6});

testFail("0b12", {ecmaVersion: 6});

testFail("0B", {ecmaVersion: 6});

testFail("0B1a", {ecmaVersion: 6});

testFail("0B9", {ecmaVersion: 6});

testFail("0B18", {ecmaVersion: 6});

testFail("0B12", {ecmaVersion: 6});

testFail("\"\\u{110000}\"", {ecmaVersion: 6});

testFail("\"\\u{}\"", {ecmaVersion: 6});

testFail("\"\\u{FFFF\"", {ecmaVersion: 6});

testFail("\"\\u{FFZ}\"", {ecmaVersion: 6});

testFail("[v] += ary", {ecmaVersion: 6});

testFail("[2] = 42", {ecmaVersion: 6});

testFail("({ obj:20 }) = 42", {ecmaVersion: 6});

testFail("( { get x() {} } = 0)", {ecmaVersion: 6});

testFail("x \n is y", {ecmaVersion: 6});

testFail("x \n isnt y", {ecmaVersion: 6});

testFail("function default() {}", {ecmaVersion: 6});

testFail(
  "function hello() {'use strict'; ({ i: 10, s(eval) { } }); }",
  {ecmaVersion: 6}
);

testFail("function a() { \"use strict\"; ({ b(t, t) { } }); }", {ecmaVersion: 6});

testFail("var super", {ecmaVersion: 6});

testFail("var default", {ecmaVersion: 6});

testFail("let default", {ecmaVersion: 6});

testFail("const default", {ecmaVersion: 6});

testFail("\"use strict\"; ({ v: eval } = obj)", {ecmaVersion: 6});

testFail("\"use strict\"; ({ v: arguments } = obj)", {ecmaVersion: 6});

testFail("for (let x = 42 in list) process(x);", {ecmaVersion: 6});

testFail("for (let x = 42 of list) process(x);", {ecmaVersion: 6});

testFail("import foo", {ecmaVersion: 6, sourceType: "module"});

testFail("import { foo, bar }", {ecmaVersion: 6, sourceType: "module"});

testFail("import foo from bar", {ecmaVersion: 6, sourceType: "module"});

testFail("((a)) => 42", {ecmaVersion: 6});

testFail("(a, (b)) => 42", {ecmaVersion: 6});

testFail("\"use strict\"; (eval = 10) => 42", {ecmaVersion: 6});

testFail("\"use strict\"; eval => 42", {ecmaVersion: 6});

testFail("\"use strict\"; arguments => 42", {ecmaVersion: 6});

testFail("\"use strict\"; (eval, a) => 42", {ecmaVersion: 6});

testFail("\"use strict\"; (arguments, a) => 42", {ecmaVersion: 6});

testFail("\"use strict\"; (eval, a = 10) => 42", {ecmaVersion: 6});

testFail("(a, a) => 42", {ecmaVersion: 6});

testFail("function foo(a, a = 2) {}", {ecmaVersion: 6});

testFail("\"use strict\"; (a, a) => 42", {ecmaVersion: 6});

testFail("\"use strict\"; (a) => 00", {ecmaVersion: 6});

testFail("() <= 42", {ecmaVersion: 6});

testFail("(10) => 00", {ecmaVersion: 6});

testFail("(10, 20) => 00", {ecmaVersion: 6});

testFail("yield v", {ecmaVersion: 6});

testFail("yield 10", {ecmaVersion: 6});

testFail("void { [1, 2]: 3 };", {ecmaVersion: 6});

testFail("let [this] = [10]", {ecmaVersion: 6});
testFail("let {this} = x", {ecmaVersion: 6});
testFail("let [function] = [10]", {ecmaVersion: 6});
testFail("let [function] = x", {ecmaVersion: 6});
testFail("([function] = [10])", {ecmaVersion: 6});
testFail("([this] = [10])", {ecmaVersion: 6});
testFail("({this} = x)", {ecmaVersion: 6});
testFail("var x = {this}", {ecmaVersion: 6});

test("yield* 10", {
  ecmaVersion: 6,
  loose: false,
  ranges: true,
  locations: true
});

test("e => yield* 10", {
  ecmaVersion: 6,
  loose: false,
  ranges: true,
  locations: true
});

testFail("(function () { yield 10 })", {ecmaVersion: 6});

test("(function () { yield* 10 })", {
  ecmaVersion: 6,
  loose: false,
  ranges: true,
  locations: true
});

test("let + 1", {ecmaVersion: 6})

test("var let = 1", {ecmaVersion: 6})

testFail("'use strict'; let + 1", {ecmaVersion: 6})

test("var yield = 2", {ecmaVersion: 6})

testFail("(function() { \"use strict\"; f(yield v) })", {ecmaVersion: 6});

testFail("var obj = { *test** }", {ecmaVersion: 6});

testFail("class A extends yield B { }", {ecmaVersion: 6});

testFail("class default", {ecmaVersion: 6});

testFail("`test", {ecmaVersion: 6});

testFail("switch `test`", {ecmaVersion: 6});

testFail("`hello ${10 `test`", {ecmaVersion: 6});

testFail("`hello ${10;test`", {ecmaVersion: 6});

testFail("function a() 1 // expression closure is not supported", {ecmaVersion: 6});

testFail("({ \"chance\" }) = obj", {ecmaVersion: 6});

testFail("({ 42 }) = obj", {ecmaVersion: 6});

testFail("function f(a, ...b, c)", {ecmaVersion: 6});

testFail("function f(a, ...b = 0)", {ecmaVersion: 6});

testFail("function x(...{ a }){}", {ecmaVersion: 6});

testFail("\"use strict\"; function x(a, { a }){}", {ecmaVersion: 6});

testFail(
  "\"use strict\"; function x({ b: { a } }, [{ b: { a } }]){}",
  {ecmaVersion: 6}
);

testFail("\"use strict\"; function x(a, ...[a]){}", {ecmaVersion: 6});

testFail("(...a, b) => {}", {ecmaVersion: 6});

testFail("([ 5 ]) => {}", {ecmaVersion: 6});

testFail("({ 5 }) => {}", {ecmaVersion: 6});

testFail("(...[ 5 ]) => {}", {ecmaVersion: 7});

test("[...{ a }] = b", {ecmaVersion: 6});

testFail("[...a, b] = c", {ecmaVersion: 6});

testFail("({ t(eval) { \"use strict\"; } });", {ecmaVersion: 6});

testFail("\"use strict\"; `${test}\\02`;", {ecmaVersion: 6});

testFail("if (1) import \"acorn\";", {ecmaVersion: 6});

testFail("[...a, ] = b", {ecmaVersion: 6});

testFail("if (b,...a, );", {ecmaVersion: 6});

testFail("(b, ...a)", {ecmaVersion: 6});

testFail("switch (cond) { case 10: let a = 20; ", {ecmaVersion: 6});

testFail("\"use strict\"; (eval) => 42", {ecmaVersion: 6});

testFail("(eval) => { \"use strict\"; 42 }", {ecmaVersion: 6});

testFail("({ get test() { } }) => 42", {ecmaVersion: 6});

/* Regression tests */

// # https://github.com/ternjs/acorn/issues/127
test('doSmth(`${x} + ${y} = ${x + y}`)', {ecmaVersion: 6});

// # https://github.com/ternjs/acorn/issues/129
test('function normal(x, y = 10) {}', {ecmaVersion: 6});

// test preserveParens option with arrow functions
test("() => 42", {ecmaVersion: 6, preserveParens: true});

// https://github.com/ternjs/acorn/issues/161
test("import foo, * as bar from 'baz';", {ecmaVersion: 6, sourceType: "module"});

// https://github.com/ternjs/acorn/issues/173
test("`{${x}}`, `}`", {ecmaVersion: 6});

// https://github.com/ternjs/acorn/issues/186
test('var {get} = obj;', {ecmaVersion: 6});

// Destructuring defaults (https://github.com/ternjs/acorn/issues/181)

test("var {propName: localVar = defaultValue} = obj", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var {propName = defaultValue} = obj", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var [localVar = defaultValue] = obj", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({x = 0} = obj)", {
  ecmaVersion: 6,
  ranges: true
});

test("({x = 0}) => x", {
  ecmaVersion: 6,
  ranges: true
});

test("[a, {b: {c = 1}}] = arr", {
  ecmaVersion: 6,
  ranges: true
});

test("for ({x = 0} in arr);", {
  ecmaVersion: 6,
  ranges: true
});

testFail("obj = {x = 0}", {ecmaVersion: 6});

testFail("f({x = 0})", {ecmaVersion: 6});

// https://github.com/ternjs/acorn/issues/191

test("try {} catch ({message}) {}", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// https://github.com/ternjs/acorn/issues/192

test("class A { static() {} }", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// https://github.com/ternjs/acorn/issues/213

test("for (const x of list) process(x);", {ecmaVersion: 6, ranges: true});

test("class A { *static() {} }", {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("`${/\\d/.exec('1')[0]}`", {
  ecmaVersion: 6
});

test("var _𐒦 = 10;", {ecmaVersion: 6});

test("var 𫠝_ = 10;", {ecmaVersion: 6});

test("var _\\u{104A6} = 10;", {ecmaVersion: 6});

test("let [x,] = [1]", {ecmaVersion: 6});

test("let {x} = y", {ecmaVersion: 6})

test("[x,,] = 1", {ecmaVersion: 6});

test("for (var [name, value] in obj) {}", {ecmaVersion: 6})

testFail("let [x]", {ecmaVersion: 6})
testFail("var [x]", {ecmaVersion: 6})
testFail("var _𖫵 = 11;", {ecmaVersion: 6});
testFail("var 𫠞_ = 12;", {ecmaVersion: 6});
testFail("var 𫠝_ = 10;", {ecmaVersion: 5});
testFail("if (1) let x = 10;", {ecmaVersion: 6});
testFail("for (;;) const x = 10;", {ecmaVersion: 6});
testFail("while (1) function foo(){}", {ecmaVersion: 6});
testFail("if (1) ; else class Cls {}", {ecmaVersion: 6});

testFail("'use strict'; [...eval] = arr", {ecmaVersion: 6});
testFail("'use strict'; ({eval = defValue} = obj)", {ecmaVersion: 6});

testFail("[...eval] = arr", {ecmaVersion: 6, sourceType: "module"});

testFail("function* y({yield}) {}", {ecmaVersion: 6});

test("function foo() { new.target; }", {ecmaVersion: 6});

testFail("new.prop", {ecmaVersion: 6});
testFail("new.target", {ecmaVersion: 6});

test(
  "export default function foo() {} false",
  {ecmaVersion: 6, sourceType: "module"}
)

// https://github.com/ternjs/acorn/issues/274

testFail("`\\07`", {ecmaVersion: 6});

// https://github.com/ternjs/acorn/issues/277

testFail("x = { method() 42 }", {ecmaVersion: 6});

testFail("x = { get method() 42 }", {ecmaVersion: 6});

testFail("x = { set method(val) v = val }", {ecmaVersion: 6});

// https://github.com/ternjs/acorn/issues/278

testFail("/\\u{110000}/u", {ecmaVersion: 6});

// https://github.com/ternjs/acorn/issues/279

testFail("super", {ecmaVersion: 6});

// https://github.com/ternjs/acorn/issues/275

testFail("class A { get prop(x) {} }", {ecmaVersion: 6});
testFail("class A { set prop() {} }", {ecmaVersion: 6});
testFail("class A { set prop(x, y) {} }", {ecmaVersion: 6});

// https://github.com/ternjs/acorn/issues/276

testFail("({ __proto__: 1, __proto__: 2 })", {ecmaVersion: 6});
testFail("({ '__proto__': 1, __proto__: 2 })", {ecmaVersion: 6});
test("({ ['__proto__']: 1, __proto__: 2 })", {ecmaVersion: 6});
test("({ __proto__() { return 1 }, __proto__: 2 })", {ecmaVersion: 6});
test("({ get __proto__() { return 1 }, __proto__: 2 })", {ecmaVersion: 6});
test("({ __proto__, __proto__: 2 })", {ecmaVersion: 6});

test("export default /foo/", {ecmaVersion: 6, sourceType: "module"});

test("var await = 0", {
  ecmaVersion: 6,
  sourceType: "script",
  allowReserved: false,
  locations: true
})
testFail("var await = 0", {
  ecmaVersion: 6,
  sourceType: "module",
  allowReserved: false,
  locations: true
})

// https://github.com/ternjs/acorn/issues/363

test("/[a-z]/gimuy", {ecmaVersion: 6});
testFail("/[a-z]/s", {ecmaVersion: 6});

testFail("[...x in y] = []", {ecmaVersion: 6});

testFail(
  "export let x = a; export function x() {}",
  {ecmaVersion: 6, sourceType: "module"}
)
testFail(
  "export let [{x = 2}] = a; export {x}",
  {ecmaVersion: 6, sourceType: "module"}
)
testFail(
  "export default 100; export default 3",
  {ecmaVersion: 6, sourceType: "module"}
)

test("(([,]) => 0)", {ecmaVersion: 6});

// 'eval' and 'arguments' are not reserved word, but those can not be a BindingIdentifier.

test("function foo() { return {arguments} }", {ecmaVersion: 6})
test("function foo() { return {eval} }", {ecmaVersion: 6})
test("function foo() { 'use strict'; return {arguments} }", {ecmaVersion: 6})
test("function foo() { 'use strict'; return {eval} }", {ecmaVersion: 6})

test("function foo() { return {yield} }", {ecmaVersion: 6})

testFail("function foo() { 'use strict'; return {yield} }", {ecmaVersion: 6});

testFail("function foo() { 'use strict'; var {arguments} = {} }", {ecmaVersion: 6});
testFail("function foo() { 'use strict'; var {eval} = {} }", {ecmaVersion: 6});
testFail(
  "function foo() { 'use strict'; var {arguments = 1} = {} }",
  {ecmaVersion: 6}
);
testFail("function foo() { 'use strict'; var {eval = 1} = {} }", {ecmaVersion: 6});

// cannot use yield expressions in parameters.
testFail("function* wrap() { function* foo(a = 1 + (yield)) {} }", {ecmaVersion: 6});
testFail("function* wrap() { return (a = 1 + (yield)) => a }", {ecmaVersion: 6});

// can use yield expressions in parameters if it's inside of a nested generator.
test("function* foo(a = function*(b) { yield b }) { }", {ecmaVersion: 6});

// 'yield' as function names.

test("function* yield() {}", {ecmaVersion: 6})

test("({*yield() {}})", {ecmaVersion: 6})

test("class A {*yield() {}}", {ecmaVersion: 6})

testFail("(function* yield() {})", {ecmaVersion: 6})
testFail("function* wrap() {\nfunction* yield() {}\n}", {ecmaVersion: 6})
test("function* wrap() {\n({*yield() {}})\n}", {ecmaVersion: 6})
test("function* wrap() {\nclass A {*yield() {}}\n}", {ecmaVersion: 6})

// Forbid yield expressions in default parameters:
testFail("function* foo(a = yield b) {}", {ecmaVersion: 6})
testFail("(function* foo(a = yield b) {})", {ecmaVersion: 6})
testFail("({*foo(a = yield b) {}})", {ecmaVersion: 6})
testFail("(class {*foo(a = yield b) {}})", {ecmaVersion: 6})
testFail("function* foo(a = class extends (yield b) {}) {}", {ecmaVersion: 6})

// Allow yield expressions inside functions in default parameters:
test("function* foo(a = function* foo() { yield b }) {}", {ecmaVersion: 6})
test("function* foo(a = {*bar() { yield b }}) {}", {ecmaVersion: 6})
test("function* foo(a = class {*bar() { yield b }}) {}", {ecmaVersion: 6})

// Distinguish ParenthesizedExpression or ArrowFunctionExpression
test("function* wrap() {\n(a = yield b)\n}", {ecmaVersion: 6})
testFail("function* wrap() {\n(a = yield b) => a\n}", {ecmaVersion: 6})

test("function* wrap() {\n({a = yield b} = obj)\n}", {ecmaVersion: 6})

test("export default class Foo {}++x", {ecmaVersion: 6, sourceType: "module"})


test("function *f() { yield\n{}/1/g\n}", {ecmaVersion: 6})

test("class B extends A { foo(a = super.foo()) { return a }}", {ecmaVersion: 6})

testFail("function* wrap() {\n({a = yield b} = obj) => a\n}", {ecmaVersion: 6})

// invalid syntax '*foo: 1'
testFail("({*foo: 1})", {ecmaVersion: 6})

test(
  "export { x as y } from './y.js';\nexport { x as z } from './z.js';",
  {sourceType: "module", ecmaVersion: 6}
)

test(
  "export { default as y } from './y.js';\nexport default 42;",
  {sourceType: "module", ecmaVersion: 6}
)

testFail(
  "export { default} from './y.js';\nexport default 42;",
  {sourceType: "module", ecmaVersion: 6}
)

testFail("foo: class X {}", {ecmaVersion: 6})

testFail("'use strict'; bar: function x() {}", {ecmaVersion: 6})

testFail("({x, y}) = {}", {ecmaVersion: 6})

test("[x, (y), {z, u: (v)}] = foo", {ecmaVersion: 6})

test("export default function(x) {};", {ecmaVersion: 6, sourceType: "module"})

testFail("var foo = 1; let foo = 1;", {ecmaVersion: 6})

testFail("{ var foo = 1; let foo = 1; }", {ecmaVersion: 6})

testFail("let foo = 1; var foo = 1;", {ecmaVersion: 6})

testFail("let foo = 1; let foo = 1;", {ecmaVersion: 6})

testFail("var foo = 1; const foo = 1;", {ecmaVersion: 6})

testFail("const foo = 1; var foo = 1;", {ecmaVersion: 6})

testFail("var [foo] = [1]; let foo = 1;", {ecmaVersion: 6})

testFail("var [{ bar: [foo] }] = x; let {foo} = 1;", {ecmaVersion: 6})

testFail("if (x) var foo = 1; let foo = 1;", {ecmaVersion: 6})

testFail("if (x) {} else var foo = 1; let foo = 1;", {ecmaVersion: 6})

testFail("if (x) var foo = 1; else {} let foo = 1;", {ecmaVersion: 6})

testFail(
  "if (x) {} else if (y) {} else var foo = 1; let foo = 1;",
  {ecmaVersion: 6}
)

testFail("while (x) var foo = 1; let foo = 1;", {ecmaVersion: 6})

testFail("do var foo = 1; while (x) let foo = 1;", {ecmaVersion: 6})

testFail("for (;;) var foo = 1; let foo = 1;", {ecmaVersion: 6})

testFail("for (const x of y) var foo = 1; let foo = 1;", {ecmaVersion: 6})

testFail("for (const x in y) var foo = 1; let foo = 1;", {ecmaVersion: 6})

testFail("label: var foo = 1; let foo = 1;", {ecmaVersion: 6})

testFail("switch (x) { case 0: var foo = 1 } let foo = 1;", {ecmaVersion: 6})

testFail("try { var foo = 1; } catch (e) {} let foo = 1;", {ecmaVersion: 6})

testFail("function foo() {} let foo = 1;", {ecmaVersion: 6})

testFail("{ var foo = 1; } let foo = 1;", {ecmaVersion: 6})

testFail("let foo = 1; { var foo = 1; }", {ecmaVersion: 6})

testFail("let foo = 1; function x(foo) {} { var foo = 1; }", {ecmaVersion: 6})

testFail("if (x) { if (y) var foo = 1; } let foo = 1;", {ecmaVersion: 6})

testFail("var foo = 1; function x() {} let foo = 1;", {ecmaVersion: 6})

testFail("{ let foo = 1; { let foo = 2; } let foo = 1; }", {ecmaVersion: 6})

testFail("for (var foo of y) {} let foo = 1;", {ecmaVersion: 6})

testFail("function x(foo) { let foo = 1; }", {ecmaVersion: 6})

testFail("var [...foo] = x; let foo = 1;", {ecmaVersion: 6})

testFail("foo => { let foo; }", {ecmaVersion: 6})

testFail("({ x(foo) { let foo; } })", {ecmaVersion: 6})

testFail("try {} catch (foo) { let foo = 1; }", {ecmaVersion: 6})

test("var foo = 1; var foo = 1;", {ecmaVersion: 6})

test("if (x) var foo = 1; var foo = 1;", {ecmaVersion: 6})

test("function x() { var foo = 1; } let foo = 1;", {ecmaVersion: 6})

test("function foo() { let foo = 1; }", {ecmaVersion: 6})

test("var foo = 1; { let foo = 1; }", {ecmaVersion: 6})

test("{ let foo = 1; { let foo = 2; } }", {ecmaVersion: 6})

test("var foo; try {} catch (_) { let foo; }", {ecmaVersion: 6})

test("let x = 1; function foo(x) {}", {ecmaVersion: 6})

test("for (let i = 0;;); for (let i = 0;;);", {ecmaVersion: 6})

test("for (const foo of bar); for (const foo of bar);", {ecmaVersion: 6})

test("for (const foo in bar); for (const foo in bar);", {ecmaVersion: 6})

test("for (let foo in bar) { let foo = 1; }", {ecmaVersion: 6})

test("for (let foo of bar) { let foo = 1; }", {ecmaVersion: 6})

test("class Foo { method(foo) {} method2() { let foo; } }", {ecmaVersion: 6})

test("() => { let foo; }; foo => {}", {ecmaVersion: 6})

test("() => { let foo; }; () => { let foo; }", {ecmaVersion: 6})

test("switch(x) { case 1: let foo = 1; } let foo = 1;", {ecmaVersion: 6})

test("'use strict'; function foo() { let foo = 1; }", {ecmaVersion: 6})

test("let foo = 1; function x() { var foo = 1; }", {ecmaVersion: 6})

test("[...foo, bar = 1]", {ecmaVersion: 6})

test("for (var a of /b/) {}", {ecmaVersion: 6})

test("for (var {a} of /b/) {}", {ecmaVersion: 6})

test("for (let {a} of /b/) {}", {ecmaVersion: 6})

test("function* bar() { yield /re/ }", {ecmaVersion: 6})

test("function* bar() { yield class {} }", {ecmaVersion: 6})

test("() => {}\n/re/", {ecmaVersion: 6})

test("(() => {}) + 2", {ecmaVersion: 6})

testFail("(x) => {} + 2", {ecmaVersion: 6})

test("function *f1() { function g() { return yield / 1 } }", {ecmaVersion: 6})
