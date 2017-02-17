// tests for both the tokenizer and parser. Parser test results could be checked tighter.
// api: [input, ?[token-output-count, parser-output-count], ?regex-hints, desc]
// regex-hints are for tokenizer, will tell for each token whether it might parse regex or not (parser's job)
var good = [

["var abc;", 4, "Variable Declaration"],
["var abc = 5;", 8, "Variable Declaration, Assignment"],
["/* */", 1, "Block Comment"],
["/** **/", 1, "JSDoc-style Comment"],
["var f = function(){;};", 13, "Assignment, Function Expression"],
["hi; // moo", 4, "Trailing Line Comment"],
["hi; // moo\n;", 6, "Trailing Line Comment, Linefeed, `;`"],
["var varwithfunction;", 4, "Variable Declaration, Identifier Containing Reserved Words, `;`"],
["a + b;", 6, "Addition/Concatenation"],

["'a'", [1, 2], "Single-Quoted String"],
["'a';", 2, "Single-Quoted String, `;`"], // Taken from the parser test suite.

["'a\\n'", [1, 2], "Single-Quoted String With Escaped Linefeed"],
["'a\\n';", 2, "Single-Quoted String With Escaped Linefeed, `;`"], // Taken from the parser test suite.

["\"a\"", [1, 2], "Double-Quoted String"],
["\"a\";", 2, "Double-Quoted String, `;`"], // Taken from the parser test suite.

["\"a\\n\"", [1, 2], "Double-Quoted String With Escaped Linefeed"],
["\"a\\n\";", 2, "Double-Quoted String With Escaped Linefeed, `;`"], // Taken from the parser test suite.

["500", [1, 2], "Integer"],
["500;", 2, "Integer, `;`"], // Taken from the parser test suite.

["500.", [1, 2], "Double With Trailing Decimal Point"],
["500.;", 2, "Double With Trailing Decimal Point"], // Taken from the parser test suite.

["500.432", [1, 2], "Double With Decimal Component"],
["500.432;", 2, "Double With Decimal Component, `;`"], // Taken from the parser test suite.

[".432432", [1, 2], "Number, 0 < Double < 1"],
[".432432;", 2, "Number, 0 < Double < 1, `;`"], // Taken from the parser test suite.

["(a,b,c)", [7, 8], "Parentheses, Comma-separated identifiers"],
["(a,b,c);", 8, "Parentheses, Comma-separated identifiers, `;`"], // Taken from the parser test suite.

["[1,2,abc]", [7, 8], "Array literal"],
["[1,2,abc];", 8, "Array literal, `;`"], // Taken from the parser test suite.

["var o = {a:1,\"b\":2,c:c};", 20, "Assignment, Object Literal, `;`"], // Taken from the parser test suite.

["var x;\nvar y;", 9, "2 Variable Declarations, Multiple lines"],
["var x;\nfunction n(){ }", 13, "Variable, Linefeed, Function Declaration"],
["var x;\nfunction n(abc){ }", 14, "Variable, Linefeed, Function Declaration With One Argument"],
["var x;\nfunction n(abc, def){ }", 17, "Variable, Linefeed, Function Declaration With Multiple Arguments"],
["function n(){ \"hello\"; }", 11, "Function Declaration, Body"],

["/a/;", 2, [true, false], "RegExp Literal, `;`"],
["/a/b;", 2, [true, true], "RegExp Literal, Flags, `;`"],
["++x;", 3, "Unary Increment, Prefix, `;`"],
[" / /;", 3, [true, true, false], "RegExp, Leading Whitespace, `;`"],
["/ / / / /", [5, 6], [true, false, false, false, true], "RegExp Containing One Space, Space, Division, Space, RegExp Containing One Space"],

// Taken from a parser test suite. (eh, not sure which one... :(  )

["\"var\";", 2, "Keyword String, `;`"],
["\"variable\";", 2, "String Beginning With Keyword, `;`"],
["\"somevariable\";", 2, "String Containing Keyword, `;`"],
["\"somevar\";", 2, "String Ending With Keyword, `;`"],

["var varwithfunction;", 4, "Keywords should not be matched in identifiers"],

["var o = {a:1};", 12, "Object Literal With Unquoted Property"],
["var o = {\"b\":2};", 12, "Object Literal With Quoted Property"],
["var o = {c:c};", 12, "Object Literal With Equivalent Property Name and Identifier"],

["/a/ / /b/;", 6, [true, true, false, false, true, false], "RegExp, Division, RegExp, `;`"],
["a/b/c;", 6, "Triple Division (Identifier / Identifier / Identifier)"],

["+function(){/regex/;};", 9, [false, false, false, false, false, true, false, false, false], "Unary `+` Operator, Function Expression Containing RegExp and Semicolon, `;`"],

// Line Terminators.

["\r\n", 1, "CRLF Line Ending = 1 Linefeed"],
["\r", 1, "CR Line Ending = 1 Linefeed"],
["\n", 1, "LF Line Ending = 1 Linefeed"],
["\r\n\n\u2028\u2029\r", 5, "Various Line Terminators"],

// Whitespace.
["throw \t\u000b\u000c\u00a0\uffffb", [8, 9], "Whitespace"],
// Additional tests for whitespace...

// http://code.google.com/p/es-lab/source/browse/trunk/tests/parser/parsertests.js?r=86 and 430.

// first tests for the lexer, should also parse as program

// Comments.
["//foo!@#^&$1234\nbar;", 4, "Line Comment, Linefeed, Identifier, `;`"],
["/* abcd!@#@$* { } && null*/;", 2, "Single-Line Block Comment, `;`"],
["/*foo\nbar*/;", 2, "Multi-Line Block Comment, `;`"],
["/*x*x*/;", 2, "Block Comment With Asterisks, `;`"],
["/**/;", 2, "Empty Comment, `;`"],

// Identifiers.
["x;", 2, "Single-Character Identifier, `;`"],
["_x;", 2, "Identifier With Leading `_`, `;`"],
["xyz;", 2, "Identifier With Letters Only, `;`"],
["$x;", 2, "Identifier With Leading `$`, `;`"],
["x5;", 2, "Identifier With Number As Second Character, `;`"],
["x_y;", 2, "Identifier Containing `_`, `;`"],
["x+5;", 4, "Identifier, Binary `+` Operator, Identifier, `;`"],
["xyz123;", 2, "Alphanumeric Identifier, `;`"],
["x1y1z1;", 2, "Alternating Alphanumeric Identifier, `;`"],
["foo\\u00d8bar;", 2, "Identifier With Unicode Escape Sequence middle (`\\uXXXX`), `;`"],
["\\u00d8bar;", 2, "Identifier With Unicode Escape Sequence begin (`\\uXXXX`), `;`"],
["foo\\u00d8;", 2, "Identifier With Unicode Escape Sequence end (`\\uXXXX`), `;`"],
["f\u00d8\u00d8bar;", 2, "Identifier With Embedded Unicode Character"],

// Numbers.
["5;", 2, "Integer, `;`"],
["5.5;", 2, "Double, `;`"],
["0;", 2, "Integer Zero, `;`"],
["0.0;", 2, "Double Zero, `;`"],
["0.001;", 2, "0 < Decimalized Double < 1, `;`"],
["1.e2;", 2, "Integer With Decimal and Exponential Component (`e`), `;`"],
["1.e-2;", 2, "Integer With Decimal and Negative Exponential Component, `;`"],
["1.E2;", 2, "Integer With Decimal and Uppercase Exponential Component (`E`), `;`"],
["1.E-2;", 2, "Integer With Decimal and Uppercase Negative Exponential Component, `;`"],
[".5;", 2, "0 < Double < 1, `;`"],
[".5e3;", 2, "(0 < Double < 1) With Exponential Component"],
[".5e-3;", 2, "(0 < Double < 1) With Negative Exponential Component"],
["0.5e3;", 2, "(0 < Decimalized Double < 1) With Exponential Component"],
["55;", 2, "Two-Digit Integer, `;`"],
["123;", 2, "Three-Digit Integer, `;`"],
["55.55;", 2, "Two-Digit Double, `;`"],
["55.55e10;", 2, "Two-Digit Double With Exponential Component, `;`"],
["123.456;", 2, "Three-Digit Double, `;`"],
["1+e;", 4, "Additive Expression, `;`"],
["0x01;", 2, "Hexadecimal `1` With 1 Leading Zero, `;`"],
["0xcafe;", 2, "Hexadecimal `51966`, `;`"],
["0x12345678;", 2, "Hexadecimal `305419896`, `;`"],
["0x1234ABCD;", 2, "Hexadecimal `305441741` With Uppercase Letters, `;`"],
["0x0001;", 2, "Hexadecimal `1` with 3 Leading Zeros, `;`"],

// Strings.
["\"foo\";", 2, "Multi-Character Double-Quoted String, `;`"],
["\"a\\n\";", 2, "Double-Quoted String Containing Linefeed, `;`"],
["\'foo\';", 2, "Single-Quoted String, `;`"],
["'a\\n';", 2, "Single-Quoted String Containing Linefeed, `;`"],
["\"x\";", 2, "Single-Character Double-Quoted String, `;`"],
["'';", 2, "Empty Single-Quoted String, `;`"],
["\"foo\\tbar\";", 2, "Double-Quoted String With Tab Character, `;`"],
["\"!@#$%^&*()_+{}[]\";", 2, "Double-Quoted String Containing Punctuators, `;`"],
["\"/*test*/\";", 2, "Double-Quoted String Containing Block Comment, `;`"],
["\"//test\";", 2, "Double-Quoted String Containing Line Comment, `;`"],
["\"\\\\\";", 2, "Double-Quoted String Containing Reverse Solidus, `;`"],
["\"\\u0001\";", 2, "Double-Quoted String Containing Numeric Unicode Escape Sequence, `;`"],
["\"\\uFEFF\";", 2, "Double-Quoted String Containing Alphanumeric Unicode Escape Sequence, `;`"],
["\"\\u10002\";", 2, "Double-Quoted String Containing 5-Digit Unicode Escape Sequence, `;`"],
["\"\\x55\";", 2, "Double-Quoted String Containing Hex Escape Sequence, `;`"],
["\"\\x55a\";", 2, "Double-Quoted String Containing Hex Escape Sequence and Additional Character, `;`"],
["\"a\\\\nb\";", 2, "Double-Quoted String Containing Escaped Linefeed, `;`"],
["\";\"", [1, 2], "Double-Quoted String Containing `;`"],
["\"a\\\nb\";", 2, "Double-Quoted String Containing Reverse Solidus and Linefeed, `;`"],
["'\\\\'+ ''", [4, 5], "Single-Quoted String Containing Reverse Solidus, `+`, Empty Single-Quoted String"],

// `null`, `true`, and `false`.
["null;", 2, "`null`, `;`"],
["true;", 2, "`true`, `;`"],
["false;", 2, "`false`, `;`"],

// RegExps
["/a/;", 2, [true, true], "Single-Character RegExp, `;`"],
["/abc/;", 2, [true, true], "Multi-Character RegExp, `;`"],
["/abc[a-z]*def/g;", 2, [true, true], "RegExp Containing Character Range and Quantifier, `;`"],
["/\\b/;", 2, [true, true], "RegExp Containing Control Character, `;`"],
["/[a-zA-Z]/;", 2, [true, true], "RegExp Containing Extended Character Range, `;`"],

// Additional Program Tests.

// RegExps.
["/foo(.*)/g;", 2, [true, false], "RegExp Containing Capturing Group and Quantifier, `;`"],

// Array Literals.
["[];", 3, "Empty Array, `;`"],
["[\n\f\r\t\u0020];", 8, "Array Containing Whitespace, `;`"], // note: \b used to be in here, but it isnt part of whitespace (any more?), so i removed it.
["[1];", 4, "Array Containing 1 Element, `;`"],
["[1,2];", 6, "Array Containing 2 Elements, `;`"],
["[1,2,,];", 8, "Array Containing 2 Elisions, `;`"],
["[1,2,3];", 8, "Array Containing 3 Elements, `;`"],
["[1,2,3,,,];", 11, "Array Containing 3 Elisions, `;`"],

// Object Literals.
["({x:5});", 8, "Object Literal Containing 1 Member; `;`"],
["({x:5,y:6});", 12, "Object Literal Containing 2 Members, `;`"],
["({x:5,});", 9, "Object Literal Containing 1 Member and Trailing Comma, `;`"],
["({if:5});", 8, "Object Literal Containing Reserved Word Property Name, `;`"],
["({ get x() {42;} });", 17, "Object Literal Containing Getter, `;`"],
["({ set y(a) {1;} });", 18, "Object Literal Containing Setter, `;`"],

// Member Expressions.
["o.m;", 4, "Dot Member Accessor, `;`"],
["o['m'];", 5, "Square Bracket Member Accessor, `;`"],
["o['n']['m'];", 8, "Nested Square Bracket Member Accessor, `;`"],
["o.n.m;", 6, "Nested Dot Member Accessor, `;`"],
["o.if;", 4, "Dot Reserved Property Name Accessor, `;`"],

// Function Calls.
["f();", 4, "Function Call Operator, `;`"],
["f(x);", 5, "Function Call Operator With 1 Argument, `;`"],
["f(x,y);", 7, "Function Call Operator With Multiple Arguments, `;`"],
["o.m();", 6, "Dot Member Accessor, Function Call, `;`"],
["o['m']();", 7, "Square Bracket Member Accessor, Function Call, `;`"],
["o.m(x);", 7, "Dot Member Accessor, Function Call With 1 Argument, `;`"],
["o['m'](x);", 8, "Square Bracket Member Accessor, Function Call With 1 Argument, `;`"],
["o.m(x,y);", 9, "Dot Member Accessor, Function Call With 2 Arguments, `;`"],
["o['m'](x,y);", 10, "Square Bracket Member Accessor, Function Call With 2 Arguments, `;`"],
["f(x)(y);", 8, "Nested Function Call With 1 Argument Each, `;`"],
["f().x;", 6, "Function Call, Dot Member Accessor, `;`"],

// `eval` Function.
["eval('x');", 5, "`eval` Invocation With 1 Argument, `;`"],
["(eval)('x');", 7, "Direct `eval` Call Example, `;`"],
["(1,eval)('x');", 9, "Indirect `eval` Call Example, `;`"],
["eval(x,y);", 7, "`eval` Invocation With 2 Arguments, `;`"],

// `new` Operator.
["new f();", 6, "`new` Operator, Function Call, `;`"],
["new o;", 4, "`new` Operator, Identifier, `;`"],
["new o.m;", 6, "`new` Operator, Dot Member Accessor, `;`"],
["new o.m(x);", 9, "`new` Operator, Dot Member Accessor, Function Call With 1 Argument, `;`"],
["new o.m(x,y);", 11, "``new` Operator, Dot Member Accessor, Function Call With 2 Arguments , `;`"],

// Prefix and Postfix Increment.
["++x;", 3, "Prefix Increment, Identifier, `;`"],
["x++;", 3, "Identifier, Postfix Increment, `;`"],
["--x;", 3, "Prefix Decrement, Identifier, `;`"],
["x--;", 3, "Postfix Decrement, Identifier, `;`"],
["x ++;", 4, "Identifier, Space, Postfix Increment, `;`"],
["x /* comment */ ++;", 6, "Identifier, Block Comment, Postfix Increment, `;`"],
["++ /* comment */ x;", 6, "Prefix Increment, Block Comment, Identifier, `;`"],

// Unary Operators.
["delete x;", 4, "`delete` Operator, Space, Identifier, `;`"],
["void x;", 4, "`void` Operator, Space, Identifier, `;`"],
["typeof x;", 4, "`typeof` Operator, Space, Identifier, `;`"],
["+x;", 3, "Unary `+` Operator, Identifier, `;`"],
["-x;", 3, "Unary Negation Operator, Identifier, `;`"],
["~x;", 3, "Bitwise NOT Operator, Identifier, `;`"],
["!x;", 3, "Logical NOT Operator, Identifier, `;`"],

// Comma Operator.
["x, y;", 5, "Comma Operator"],

// ...
["new Date++;", 5, "`new` Operator, Identifier, Postfix Increment, `;`"],
["+x++;", 4, "Unary `+`, Identifier, Postfix Increment, `;`"],

// Expressions.
["1 * 2;", 6, "Integer, Multiplication, Integer, `;`"],
["1 / 2;", 6, "Integer, Division, Integer, `;`"],
["1 % 2;", 6, "Integer, Modulus, Integer, `;`"],
["1 + 2;", 6, "Integer, Addition, Integer, `;`"],
["1 - 2;", 6, "Integer, Subtraction, Integer, `;`"],
["1 << 2;", 6, "Integer, Bitwise Left Shift, Integer, `;`"],
["1 >>> 2;", 6, "Integer, Bitwise Zero-fill Right Shift, Integer, `;`"],
["1 >> 2;", 6, "Integer, Bitwise Sign-Propagating Right Shift, Integer, `;`"],
["1 * 2 + 3;", 10, "Order-of-Operations Expression, `;`"],
["(1+2)*3;", 8, "Parenthesized Additive Expression, Multiplication, `;`"],
["1*(2+3);", 8, "Multiplication, Parenthesized Additive Expression, `;`"],
["x<y;", 4, "Less-Than Relational Operator, `;`"],
["x>y;", 4, "Greater-Than Relational Operator, `;`"],
["x<=y;", 4, "Less-Than-or-Equal-To Relational Operator, `;`"],
["x>=y;", 4, "Greater-Than-or-Equal-To Relational Operator, `;`"],
["x instanceof y;", 6, "`instanceof` Operator, `;`"],
["x in y;", 6, "`in` Operator, `;`"],
["x&y;", 4, "Bitwise AND Operator, `;`"],
["x^y;", 4, "Bitwise XOR Operator, `;`"],
["x|y;", 4, "Bitwise OR Operator, `;`"],
["x+y<z;", 6, "Addition, Less-Than Relational, `;`"],
["x<y+z;", 6, "Less-Than Relational, Addition, `;`"],
["x+y+z;", 6, "Additive Expression With Three Identifiers, `;`"],
["x&y|z;", 6, "Bitwise AND-OR Expression With Three Identifiers, `;`"],
["x&&y;", 4, "Logical AND Operator, `;`"],
["x||y;", 4, "Logical OR Operator, `;`"],
["x&&y||z;", 6, "Logical AND-OR Expression With Three Identifiers, `;`"],
["x||y&&z;", 6, "Logical OR-AND Expression With Three Identifiers, `;`"],
["x<y?z:w;", 8, "Ternary Operator Expression With Four Identifiers, `;`"],

// Assignment Operators.
["x = y;", 6, "Assignment, `;`"],
["x >>>= y;", 6, "Bitwise Zero-Fill Right Shift Assignment, `;`"],
["x <<= y;", 6, "Bitwise Left Shift Assignment, `;`"],
["x += y;", 6, "Additive Assignment, `;`"],
["x -= y;", 6, "Subtractive Assignment, `;`"],
["x *= y;", 6, "Multiplicative Assignment, `;`"],
["x /= y;", 6, "Divisive Assignment, `;`"],
["x %= y;", 6, "Modulus Assignment, `;`"],
["x >>= y;", 6, "Bitwise Sign-Propagating Right Shift Assignment, `;`"],
["x &= y;", 6, "Bitwise AND Assignment, `;`"],
["x ^= y;", 6, "Bitwise XOR Assignment, `;`"],
["x |= y;", 6, "Bitwise OR Assignment, `;`"],

// Blocks.
["{};", 3, "Empty Block, `;`"],
["{x;};", 5, "Block Containing 1 Identifier, `;`"],
["{x;y;};", 7, "Block Containing 2 Identifiers, `;`"],

// Variable Declarations.
["var abc;", 4, "Variable Declaration"],
["var x,y;", 6, "Comma-Separated Variable Declarations, `;`"],
["var x=1,y=2;", 10, "Comma-Separated Variable Initializations, `;`"],
["var x,y=2;", 8, "Variable Declaration, Variable Initialization, `;`"],

// Empty Statements.
[";", 1, "Empty Statement"],
["\n;", 2, "Linefeed, `;`"],

// Expression Statements.
["x;", 2, "Identifier, `;`"],
["5;", 2, "Integer, `;`"],
["1+2;", 4, "Additive Statement, `;`"],

// `if...else` Statements.
["if (c) x; else y;", 13, "Space-Delimited `if...else` Statement"],
["if (c) x;", 8, "Space-Delimited `if` Statement, `;`"],
["if (c) {} else {};", 14, "Empty Block-Delimited `if...else` Statement"],
["if (c1) if (c2) s1; else s2;", 19, "Nested `if...else` Statement Without Dangling `else`"],

// `while` and `do...while` Loops.
["do s; while (e);", 11, "Space-Delimited `do...while` Loop"],
["do { s; } while (e);", 15, "Block-Delimited `do...while` Loop"],
["while (e) s;", 8, "Space-Delimited `while` Loop"],
["while (e) { s; };", 13, "Block-Delimited `while` Loop"],

// `for` and `for...in` Loops.
["for (;;) ;", 8, "Infinite Space-Delimited `for` Loop"],
["for (;c;x++) x;", 12, "`for` Loop: Empty Initialization Condition; Space-Delimited Body"],
["for (i;i<len;++i){};", 15, "Empty `for` Loop: Empty; Initialization, Test, and Increment Conditions Specified"],
["for (var i=0;i<len;++i) {};", 20, "Empty `for` Loop: Variable Declaration in Initialization Condition"],
["for (var i=0,j=0;;){};", 18, "`Empty for` Loop: Empty Test and Increment Conditions"],
["for (x in a);", 10, "Empty `for...in` Loop"],
["for (var x in a){};", 14, "Empty `for...in` Loop: Variable Declaration in Loop Header"],
["for (var x=5 in a) {};", 17, "Empty `for...in` Loop: Variable Initialization in Assignment Header"],
["for (var x = a in b in c) {};", 23, "Empty `for...in` Loop: Multiple `in` Expressions in Header"],
["for (var x=function(){a+b;}; a<b; ++i) some;", 29, "`for` Loop: Function Expression in Initialization Condition"],
["for (var x=function(){for (x=0; x<15; ++x) alert(foo); }; a<b; ++i) some;", 48, "for.in` Loop: Function Expression in Initialization Condition Containing `for` Loop"],
["for (x in a, b, c);", 16, "`for...in` With Multiple Comma-Separated Object References"],

// Flow of Control: `continue`, `break`, and `return` Statements.
["while(true)continue;", 6, "`continue` Statement"],
["label:while(true)continue label;", 10, "`continue` Statement With Identifier Label"],
["while(true)break;", 6, "`break` Statement"],
["somewhere:while(true)break somewhere;", 10, "`break` Statement With Identifier Label"],
["while(true)continue /* comment */ ;", 9, "`continue` Statement, Block Comment, `;`"],
["while(true)continue \n;", 8, "`continue` Statement, Space, Linefeed, `;`"],
["function f(){return;}", 9, "`return` Statement"],
["function f(){return 0;}", 11, "`return` Statement, Integer, `;`"],
["function f(){return 0 + \n 1;}", 17, "`return` Statement, Additive Expression Containing Linefeed, `;`"],

// `with` Statement.
["with (e) s;", 8, "`with` Statement, `;`"],

// `switch` Statement.
["switch (e) { case x: s; };", 18, "`switch` Statement With 1 `case`"],
["switch (e) { case x: s1;s2; default: s3; case y: s4; };", 34, "`switch` Statement: `case`, `default`, `case`"],
["switch (e) { default: s1; case x: s2; case y: s3; };", 32, "`switch` Statement: `default`, `case`, `case`"],
["switch (e) { default: s; };", 16, "`switch` Statement With `default` Case Only"],
["switch (e) { case x: s1; case y: s2; };", 26, "`switch` Statement With 2 `case`s"],

// Labels.
["foo : x;", 6, "Label (Identifier, Colon, Reference), `;`"],

// `throw` Statement.
["throw x;", 4, "Throw Statement, `;`"],
["throw x\n;", 5, "Throw Statement, Linefeed, `;`"],
["throw x", [3, 4], "Throw Statement, No `;` (Safari 2 Case)"],

// `try...catch...finally` Statement.
["try { s1; } catch (e) { s2; };", 22, "`try...catch` Statement"],
["try { s1; } finally { s2; };", 18, "`try...finally` Statement"],
["try { s1; } catch (e) { s2; } finally { s3; };", 31, "`try...catch...finally` Statement"],

// `debugger` Statement.
["debugger;", 2, "`debugger` Statement"],

// Function Declarations.
["function f() { x; y; };", 16, "Named Function Declaration With Body"],
["function f(x) { e; return x; };", 19, "Named Function Declaration With Argument and `return`"],
["function f(x,y) { var z; return x; };", 23, "Named Function Declaration With 2 Arguments, Variable Declaration, and `return`"],

// Function Expressions.
["(function empty() {;});", 12, "Parenthesized Empty Named Function Expression"],
["(function (x) {; });", 13, "Parenthesized Empty Function Expression"],
["(function f(x) { return x; });", 18, "Named Function Expression"],

// ECMAScript Program.
["var x; function f(){;}; null;", 17, "Variable Declaration, Function Declaration, `null`, `;`"],
[";;", 2, "Program: 2 Empty Statements"],
["{ x; y; z; }", 12, "Program: Block Comprising Semicolon-Delimited Identifiers"],
["function f(){ function g(){;}};", 17, "Program: Nested Function Declaration"],
["x;\n/*foo*/\n\t;", 7, "Program: Identifier, Linefeed, Block Comment, Linefeed"],

// Automatic Semicolon Insertion
["while(true)continue \n foo;", [10, 11], "Restricted Production: `continue` Statement"],
["while(true)break \n foo;", [10, 11], "Restricted Production: `break` Statement"],
["function f(){return\nfoo;}", [11, 12], "Restricted Production: `return` Statement"],
["var x; { 1 \n 2 } 3", [16, 19], "Classic Automatic Semicolon Insertion Case"],
["ab \t /* hi */\ncd", [7, 9], "Automatic Semicolon Insertion: Block Comment"],
["ab/*\n*/cd", [3, 5], "Automatic Semicolon Insertion Triggered by Multi-Line Block Comment"],
["while(true)continue /* wtf \r busta */ foo;", [10, 11], "Automatic Semicolon Insertion: `continue` Statement Preceding Multi-Line Block Comment"],
["function f() { s }", [11, 12], "Automatic Semicolon Insertion: Statement Within Function Declaration"],
["function f() { return }", [11, 12], "Automatic Semicolon Insertion: `return` Statement Within Function Declaration"],

// Strict Mode.
["\"use strict\"; 'bla'\n; foo;", 9, "Double-Quoted Strict Mode Directive, Program"],
["'use strict'; \"bla\"\n; foo;", 9, "Single-Quoted Strict Mode Directive, Program"],
["(function() { \"use strict\"; 'bla';\n foo; });", 20, "Strict Mode Directive Within Function"],
["\"use\\n strict\";", 2, "Invalid Strict Mode Directive Containing Linefeed"],
["foo; \"use strict\";", 5, "Invalid Strict Mode Directive Within Program"],

// Tests from http://es5conform.codeplex.com.

["\"use strict\"; var o = { eval: 42};", 17, "Section 8.7.2: `eval` object property name is permitted in strict mode"],
["({foo:0,foo:1});", 12, "Duplicate object property name is permitted in non-strict mode"],
["function foo(a,a){}", 10, "Duplicate argument name is permitted in non-strict mode"],
["(function foo(eval){})", [10, 11], "`eval` argument name is permitted in non-strict mode"],
["(function foo(arguments){})", [10, 11], "`arguments` argument name is permitted in non-strict mode"],

// Empty Programs.
["", 0, "Empty Program"],
["// test", 1, "Line Comment"],
["//test\n", 2, "Line Comment, Linefeed"],
["\n// test", 2, "Linefeed, Line Comment"],
["\n// test\n", 3, "Linefeed, Line Comment, Linefeed"],
["/* */", 1, "Single-Line Block Comment"],
["/*\ns,fd\n*/", 1, "Multi-Line Block Comment"],
["/*\ns,fd\n*/\n", 2, "Block Comment Containing Linefeeds, Linefeed"],
["  \t", 3, "Spaces and Tabs"],
["  /*\nsmeh*/\t\n   ", 8, "Spaces, Block Comment, Linefeeds, and Tabs"],

// Trailing Whitespace.
["a  ", [3, 4], "Trailing Space Characters"],
["a /* something */", [3, 4], "Trailing Block Comment"],
["a\n\t// hah", [4, 5], "Trailing Linefeed, Tab, and Line Comment"],
["/abc/de//f", [2, 3], [true, true], "RegExp With Flags, Trailing Line Comment"],
["/abc/de/*f*/\n\t", [4, 5], [true, true, true, true], "RegExp With Flags, Trailing Block Comment, Newline, Tab"],

// Regression Tests.
["for (x;function(){ a\nb };z) x;", [21, 23], "`for` Loop: Test Condition Contains Function Body With No Terminating `;`"],
["c=function(){return;return};", [11, 12], "Function Body: Two `return` Statements; No Terminating `;`"],
["d\nd()", [5, 7], "Identifier, Newline, Function Call"],
["for(;;){x=function(){}}", [14, 15], "Function Expression in `for` Loop Body"],
["for(var k;;){}", 10, "`for` Loop Header: Variable Declaration, Empty Test and Increment Conditions"],
["({get foo(){ }})", [12, 13], "Empty Getter"],
["\nreturnr", [2, 3], "Linefeed, Identifier Beginning With `return`"],
["/ // / /", [4, 5], [true, false, false, true], "RegExp Containing One Space, Division Operator, Space, RegExp Containing One Space"],
["trimRight = /\\s+$/;", 6, [false, false, false, false, true, false], "Typical `trimRight` RegExp"],
["trimLeft = /^\\s+/;\n\ttrimRight = /\\s+$/;", 14, [false, false, false, false, true, false, false, false, false, false, false, false, true, false], "`trimLeft` and `trimRight` RegExps"],
["\n\t// Used for trimming whitespace\n\ttrimLeft = /^\\s+/;\n\ttrimRight = /\\s+$/;\t\n", 21, [false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false], "Annotated `trimLeft` and `trimRight` RegExps"],

["/[\\/]/;", 2, [true, false], "RegExp: Escaped `/` Within Character Class"],
["/[/]/;", 2, [true, false], "RegExp: Escaped Trailing Character Class End (Valid in ES 5; Invalid in ES 3)"],

["({get:5});", 8, "`get` Used As Standard Property Name"],
["({set:5});", 8, "`get` Used As Standard Property Name"],
["l !== \"px\" && (d.style(h, c, (k || 1) + l), j = (k || 1) / f.cur() * j, d.style(h, c, j + l)), i[1] && (k = (i[1] === \"-=\" ? -1 : 1) * k + j), f.custom(j, k, l)", [131, 132], "Regression Test: RegExp/Division"],

["(/'/g, '\\\\\\'') + \"'\";", 11, [false, true], "Regression Test: Confusing Escape Character Sequence"],
["/abc\//no_comment", [3, 4], [true, false, false], "RegExp Followed By Line Comment"],
["a: b; c;", 8, "ASI Regression Test (failing asi for label being expr statement): Labeled Identifier, `;`, Identifier, `;`"],
["var x; function f(){ x; function g(){}}", 23, "Function Declaration Within Function Body"],
["while (x) { break }", [11, 12], "ASI: `while` Statement, `break`"],
["x.hasOwnProperty()", [5, 6], "Regression Test: Object Property Named `hasOwnProperty`"],
["(x) = 5", [7, 8], "LHS of Expression Contains Grouping Operator"],
["(x,x) = 5", [9, 10], "Syntactically Valid LHS Grouping Operator (Expression Will Produce A `ReferenceError` When Interpreted)"],
["switch(x){case 1:}", 10, "Single-`case` `switch` Statement Without Body"],
["while (x) { ++a\t}", [12, 13], "Prefix Increment Operator, Tab Character Within `while` Loop"],

["while(true){break}", [7, 8], "ASI: `break`"],
["while(true){continue}", [7, 8], "ASI: `continue`"],
["function f(){return}", [8, 9], "ASI: `return`"],
["a:while(true){continue a}", [11, 12], "ASI: `continue`, Identifier"],
["b:while(true){break b}", [11, 12], "ASI: `break`, Identifier"],
["function f(){return c}", [10, 11], "ASI: `return`, Identifier"],

["this.charsX = Gui.getSize(this.textarea).w / this.fontSize.w;", 25, "Complex Division Not Treated as RegExp"],
["x=y.a/z;",8,"simplified case of above"],
["(x)/ (y);", 9, "Parenthesized Dividend, Division Operator, Space, Parenthesized Divisor"],
["/^(?:\\/(?![*\\n\\/])(?:\\[(?:\\\\.|[^\\]\\\\\\n])*\\]|\\\\.|[^\\[\\/\\\\\\n])+\\/[gim]*)$/", [1, 2], [true], "Complex RegExp for Matching RegExps"],
["({a:b}[ohi].iets()++);", 16, "Object Literal With 1 Member, Square Bracket Member Accessor, Dot Member Accessor, Function Call, Postfix Increment"],

["/foo/\\u0069", [1, 2], [true], "regular expression with unicode escape as flag. yes, i went there"],

["for ((x=5)in y);", 13, "initialization of for-in var is not allowed without var, but okay if you wrap it in parens"],
["for (var x=y=z in a);", 16, "assignment as initializer"],
["do{}while(x)\nok;", [10, 11], "ASI after do-while because the semi is required"],

["a:b:c:nested;",8,"nested labels"],

//whole section of regexes in any kind of valid place
["{}/foo/;", 4, [false,false,true],"regex after block"],
["var x=/foo/;", 6, [false,false,false,false,true],"regex after var initalizer"],
["+{x:/y/};", 7, [false,false,false,false,true],"regex in objlit"],
["if(/x/)y;", 6, [false,false,true],"regex in statement header"],
["if(x)/y/;", 6, [false,false,false,false,true],"regex after statement header"],
["{/foo/}", [3, 4], [false,true],"regex as block body"],
["if(x){/foo/;}", 8, [false,false,false,false,false,true],"regex as real block body"],
[";/x/;", 3, [false,true], "regex after empty statement"],
["[/x/];", 4, [false,true], "regex in array"],
["x=x,x=/y/;", 8, [false,false,false,false,false,false,true], "regex assignment"],
["x=x,/y/;", 6, [false,false,false,false,true], "regex after comma"],
["x?/y/:z;", 6, [false,false,true], "regex middle of ternary"],
["x?y:/z/;", 6, [false,false,false,false,true], "regex end of ternary"],
["/=/;", 2, [true], "regex that looks like the start of a compound division assignment"],
["function f(){ return /foo/; }", 13, [true,true,true,true,true,true,true,true,true,true,true,true], "regex after return keyword"],
["switch(x){}/foo/;", 8, [true,true,true,true,true,true,true,true,true], "regex after switch"],
["function x(){}/foo/;", 9, [true,true,true,true,true,true,true,true,true,true], "regex after function decl"],
["while(x){}/foo/;", 8, [true,true,true,true,true,true,true,true,true], "regex after block"],
["try{}catch(e){}/foo/;", 11, [true,true,true,true,true,true,true,true,true,true,true], "regex after catch"],
["try{}finally{}/foo/;", 8, [true,true,true,true,true,true,true,true,true], "regex after catch"],
["throw /foo/;", 4, [true,true,true], "regex after throw"],
["(x)\n/y;", 7, "division with asi (not to be confused with regex, would be illegal)"],
["x\n/y/\nz;",8,"long multi-line division, no asi's applied"],
['n = 1\n/1*"\\/\\//.test(n + \'"//\')',[11, 12],"from wtfjs crash report (https://github.com/brianleroux/wtfjs/pull/37/files)"],
["{x;/x/;}", 6, [false, false, false, true], "regex after semi in block"],
["if(x)/y/;", 6, [false, false, false, false, true], "regex after if statement header"],
["for(;;)/y/;", 7, [false, false, false, false, false, true], "regex in for-each statement header"],
["for(/x/;;);", 7, [false, false, true, true, true, true, true, true, true], "regex in for-each statement header"],
["for(;/x/;);", 7, [false, false, true, true, true, true, true, true, true], "regex in for-each statement header"],
["for(;;/x/);", 7, [false, false, true, true, true, true, true, true, true], "regex in for-each statement header"],
["for(/x/;;/x/);", 8, [false, false, true, true, true, true, true, true, true], "regex in for-each statement header"],
["for(/x/;/x/;/x/);", 9, [false, false, true, true, true, true, true, true, true, true], "regex in for-each statement header"],
["for(x in y)/y/;", 10, [false, false, false, false, false, false, false, false, true], "regex after for-in statement header"],
["for(var a=/x/ in y)/y/;", 14, [false, false, true, true, true, true, true, true, true, true, true, true, true], "regex after for-in statement header"],
["for(x in /y/)/z/;", 10, [false, false, true, true, true, true, true, true, true], "regex after for-in statement header"],
["function f(){return /foo/;}", 11, [false, false, false, false, false, false, false, false, true], "returning a regex"],
["function f(){}/foo/;", 9, [false, false, false, false, false, false, false, true], "regex after a func def"],
["do{}while(/foo/);", 8, [false,false,false,false,false,true],"regex in do-while condition"],
["if(x)y;else /z/;", 10, [false,false,false,false,false,false,false,false,true],"regex for else"],
["foo:/bar/;", 4, [false, false, true], "regex after label"],

["!--foo;", 4, "prefix decr after bang"],
["!++foo;", 4, "prefix incr after bang"],

["for(i,j;;);", 9, "for with multiple expressions but no var in lead"],
["for(var i=x?y:z;;);", 15, "for with var and ternary initializer"],

["switch(x){case 1,2:}", 12, "switch cases can have multiple expressions as key"],
["x=x,y=y;", 8, "double assignment expression"],

["X/R>=0", [5, 6], "/R a punctuator is not"], // regex also found >= and it would take that length instead of the /

["a/*\r*/b;", [4, 5], "asi for multiline comment with only a return"],
["/**/", 1, "just an empty multi-line comment"],
["//", 1, "empty single line comment terminated by eof"],
["//\n", 2, "empty single line comment terminated by \\n and eof"],
["//\nfoo;", 4, "empty single line comment terminated by newline"],

["foo <!-- bar;", 8, "html comment is okay like this"],

["'foo\\\r\nbar';", 2, "string with windows rn newline escape"],
["'foo\\\rbar';", 2, "string with mac newline escape r"],
["'foo\\\nbar';", 2, "string with unix newline escape n"],
["'foo\\\u2028bar';", 2, "string with newline escape 28"],
["'foo\\\u2029bar';", 2, "string with newline escape 29"],

["(a?b:c);", 8, "ternary expression that's not at the start"],
["x=(a?b:c);", 10, "ternary expression that's not at the start, after assignment"],
["for ((a?b:c) in y)z;", 17, "ternary expression as left but not start for-in"],
["for ((x=a?b:c) in y)z;", 19, "ternary expression as left after assignment for-in"],
["for (var x=a?b:c in y)z;", 19, "ternary expression as left after var init for-in"],
["for (x in (a?b:c))z;", 17, "ternary expression right but not start of for-in"],
["for (x in y=(a?b:c))z;", 19, "ternary expression right of for-in after assignment"],
["x?y:z=5;", 8, "assignment in ternary part"],
["for(x=5;;);", 9, "just making sure this still works (such assignment is illegal with for-in)"],
["for ((x = [x in y]) in z);", 22, "odd in construct even though array clearly incorrect"],
["for ((x = {x:x in y}) in z);", 24, "odd in construct even though array clearly incorrect"],
["for (key instanceof bar in foo);", 14, "fun fact, with empty object foo will never even evaluate bar"],

["function f(){ foo: return; }", 14, "label must not make forget function-context-state for return"],
["for(;;)foo:break;", 9, "label must not make forget for-each-context-state for break"],
["for(x in y)foo:break;", 12, "label must not make forget for-in-context-state for break"],
["while(true)foo:break;", 8, "label must not make forget while-context-state for break"],
["switch(x){case x:foo:break;}", 14, "label must not make forget switch-context-state for break"],
["for(;;)foo:continue;", 9, "label must not make forget for-each-context-state for continue"],
["for(x in y)foo:continue;", 12, "label must not make forget for-in-context-state for continue"],
["while(true)foo:continue;", 8, "label must not make forget while-context-state for continue"],

["while(true)break\n;", 7, "No ASI after break because semi is ok by parser"],
["{while(true)break}", [7, 8], "ASI after break because of }"],
["while(true)break\n", [6, 7], "ASI because of newline/EOF"],
["while(true)break", [5, 6], "ASI because of EOF"],
["while(true)break\nx;", [8, 9], "ASI because of newline"],

["while(true)continue\n;", 7, "just a continue"],
["{while(true)continue}", [7, 8], "ASI because of }"],
["while(true)continue\n", [6, 7], "ASI because of EOF"],
["while(true)continue", [5, 6], "ASI because of EOF"],
["while(true)continue\nx;", [8, 9], "ASI because of newline"],

["function f(){return\n;}", [10, 11], "ASI after break with return, ignoring the semi-colon on next line"],
["function f(){return\n}", [9, 10], "ASI after break because of }"],
["function f(){return}", [8, 9], "ASI after break because of }"],
["function f(){return\nx;}", [11, 12], "ASI because of newline"],

["x", [1,2], "eof applies asi..."],

["0", [1,2], "some number checks i needed to do"],
["1", [1,2], "some number checks i needed to do"],
["0.", [1,2], "some number checks i needed to do"],
["1.", [1,2], "some number checks i needed to do"],
[".0", [1,2], "some number checks i needed to do"],
[".1", [1,2], "some number checks i needed to do"],
["0e1", [1,2], "some number checks i needed to do"],
["0.e1", [1,2], "some number checks i needed to do"],
["0,1", [3,4], "uhm, yeah, still just two numbers, right?"],

["(function(){}());", 10, "iife, cant believe i wasnt testing this yet"],
["+function(){};", 7, "can believe I wasnt testing for this though"],

// code coverage missing tests
["x!=y;",4,"cant believe this isnt tested by anything above"],


];

// these are mainly for the parser, of course...
var bad = [
  ['for (x = 5 in y) ;', "initialization (dead code) in for-in is only allowed with var keyword or with parens"],
  ["for (a?b:(c in y))z;", "invalid"],
  ["for (a?b:(c in y) in d)z;", "even if you wrap the `in`, still invalid"],
  ["for ((x in b); c; u) {};", "`in` wrapped in parens as first part of for-each"],
  ["for ((x in b) in u) {};", "`in` wrapped in parens as first part of for-in"],

  ['while(true)break 5+5;', "break arg, if any, must be a valid label identifier"],
  ['while(true)continue 5+5;', "break arg, if any, must be a valid label identifier"],
  ['while(true)break if;', "break arg, if any, must be a valid label identifier"],
  ['while(true)continue if;', "break arg, if any, must be a valid label identifier"],

  ['do {} while() fail;', "semi after while is required"],
  ["foo--.toString();", "postfix ops effectively end the primary expression"],
  ["foo++.toString();", "postfix ops effectively end the primary expression"],
  ["foo--['toString'];", "postfix ops effectively end the primary expression"],
  ["foo++['toString'];", "postfix ops effectively end the primary expression"],
  ["foo--('toString');", "now you're just being silly (there's _no_ way this can lead to valid runtime code.)"],
  ["foo++('toString');", "now you're just being silly (there's _no_ way this can lead to valid runtime code.)"],

  ['x={get foo(x){}};', "getters have no params"],
  ['x={get foo(x,y){}};', "getters have no params"],
  ['x={set foo(){}};', "setters have one param"],
  ['x={set foo(x,y){}};', "setters have one param"],

  ['x={get (){}};', "getters must have a name"],
  ['x={set (x){}};', "setters must have a name"],

  ['{a:1,\"b\":2,c:c}', "old test, not sure how this never crashed anything. this is a block, not an objlit"],

  ["switch(x){ default: foo; break; case x: break; default: fail; }", "double default"],

  // a few partial tests if incomplete structures
  ['foo/', "make sure this doesnt pass.."],
  ['if(foo)', 'incomplete if'],
  ['for(;;)', 'incomplete for-each'],
  ['for(x in y)', 'incomplete for-in'],
  ['while(x)', 'incomplete while'],
  ['do while();', 'incomplete while'],
  ['if(x);else', 'incomplete else'],
  ['try catch(e){}', 'incomplete try'],
  ['try {} catch(e)', 'incomplete catch'],
  ['try {} finally', 'incomplete finally'],
  ['with(x)', 'incomplete with'],
  ['label:', 'incomplete labelled statement'],
  ['throw', 'incomplete throw'],
  ['x?y', 'incomplete ternary'],
  ['function f(){', 'incomplete function'],
  // incompletes at eof but where comment follows it (prevents simple pos checks to pass)
  ['foo/ //x', "make sure this doesnt pass.."],
  ['if(foo)//x', 'incomplete if'],
  ['for(;;)//x', 'incomplete for-each'],
  ['for(x in y)//x', 'incomplete for-in'],
  ['while(x)//x', 'incomplete while'],
  ['do while();//x', 'incomplete while'],
  ['if(x);else//x', 'incomplete else'],
  ['try catch(e){}//x', 'incomplete try'],
  ['try {} catch(e)//x', 'incomplete catch'],
  ['try {} finally//x', 'incomplete finally'],
  ['with(x)//x', 'incomplete with'],
  ['label://x', 'incomplete labelled statement'],
  ['throw//x', 'incomplete throw'],
  ['x?y//x', 'incomplete ternary'],
  ['function f(){//x', 'incomplete function'],

  ['var foo, /bar/;', 'var statement that runs into a regex'],
  ['for (var foo, /bar/ in x);', 'for-in var that runs into a regex'],
  ['({/foo/:5});', "regex as objlit key"],
  ['({x:y, /foo/:5});', "regex as (second) objlit key"],

  ['`', "backticks do not occur in js syntax"],
  ['#', "hashes do not occur in js syntax"],
  ['@', "at signs do not occur in js syntax"],

  ['x/**/bar;', "asi not applied"],
  ['x/*      */bar;', "asi not applied"],

  ['/foo\nbar/', "newline in regex"],
  ['/foo\u2029bar/', "newline in regex 2"],
  ['/foo\\\nbar/', "escaped newline in regex"],
  ['/foo\\\rbar/', "escaped newline in regex 2"],
  ['/foo[\\\n]bar/', "escaped newline in regex char class"],
  ['/foo[\\\r]bar/', "escaped newline in regex char class 2"],
  ['(x)\n/foo/;', "no asi when forward slash starts on next line"],
  ['do{}while(x)\n/foo/;', "no asi due to regex"],
  ['do{}while(x)/foo/;', "do while expects a semi (wont parse /foo/ as regex, regardless)"],
  ['try{}catch(/foo/){}', "catch argument cannot be a regex, regardless"],
  ['try /foo/; catch(e){}', "try body must always be a block"],
  ['try{}catch(e)/foo/', "catch body must always be a block"],
  ['try{}finally /foo/', "finally body must always be a block"],
  ['function f(/foo/){}', "function param names cannot be regex"],
  ['for (var i=0,;;);', "my parser on crack (yeah, this happened to be valid)"],

  ['foo\n<!--\nbar = 5;', "assignment after prefix decr is bad"],
  ['foo</script> <script>bar', "yeah, uh"],

  ['1x54', "malformed hex..."],
  ['2X54', "malformed hex..."],

  ['+xyz: debugger;', "label with prefix"],
  ['xyz--: debugger;', "label with suffix"],
  ['delete: ;', 'delete as label'],
  ['typeof: ;', 'typeof as label'],
  ['new: ;', 'new as label'],
  ['void: ;', "void as label"],
  ['if: ;', 'if as label'],

  ['return foo;', "return outside of function"],

  ['var break = 5;', 'keyword as varname'],
  ['var case = 5;', 'keyword as varname'],
  ['var if = 5;', 'keyword as varname'],
  ['var catch = 5;', 'keyword as varname'],
  ['var continue = 5;', 'keyword as varname'],
  ['var const = 5;', 'keyword as varname'],
  ['var class = 5;', 'keyword as varname'],
  ['var do = 5;', 'keyword as varname'],
  ['var debugger = 5;', 'keyword as varname'],
  ['var default = 5;', 'keyword as varname'],
  ['var delete = 5;', 'keyword as varname'],
  ['var else = 5;', 'keyword as varname'],
  ['var enum = 5;', 'keyword as varname'],
  ['var export = 5;', 'keyword as varname'],
  ['var extends = 5;', 'keyword as varname'],
  ['var false = 5;', 'keyword as varname'],
  ['var function = 5;', 'keyword as varname'],
  ['var for = 5;', 'keyword as varname'],
  ['var finally = 5;', 'keyword as varname'],
  ['var instanceof = 5;', 'keyword as varname'],
  ['var in = 5;', 'keyword as varname'],
  ['var if = 5;', 'keyword as varname'],
  ['var import = 5;', 'keyword as varname'],
  ['var null = 5;', 'keyword as varname'],
  ['var new = 5;', 'keyword as varname'],
  ['var return = 5;', 'keyword as varname'],
  ['var switch = 5;', 'keyword as varname'],
  ['var super = 5;', 'keyword as varname'],
  ['var this = 5;', 'keyword as varname'],
  ['var throw = 5;', 'keyword as varname'],
  ['var true = 5;', 'keyword as varname'],
  ['var try = 5;', 'keyword as varname'],
  ['var typeof = 5;', 'keyword as varname'],
  ['var var = 5;', 'keyword as varname'],
  ['var void = 5;', 'keyword as varname'],
  ['var while = 5;', 'keyword as varname'],
  ['var with = 5;', 'keyword as varname'],
  ['x?if:y;', 'keyword in expression'],
  ['function if(){}', 'keyword as function name'],
  ['function f(if){}', 'keyword as param name'],

  ['5 = 10;', 'Assignment to number, which doesnt return a reference'],
  ['null = 10;', 'Assignment to null, which doesnt return a reference'],
  ['true = 10;', 'Assignment to true, which doesnt return a reference'],
  ['false = 10;', 'Assignment to false, which doesnt return a reference'],
  ['this = 10;', 'Assignment to this, which is stupid and illegal'],
  ['eval = 10;', 'Assignment to eval, which is poisoned'],
  ['arguments = 10;', 'Assignment to arguments, which is poisoned'],

  ["while(true){continue a}", "label a not found"],
  ["while(true){break b}", "label b not found"],

  ["alert(5+void);", "void is not a value"],

  ["x=5+y<<=8", "<<= is a compound assignment and assignments are not allowed to follow non-assignment operators in an expression"],
  ["x=5+y>>=8", ">>= is a compound assignment and assignments are not allowed to follow non-assignment operators in an expression"],
  ["x=5+y>>>=8", ">>>= is a compound assignment and assignments are not allowed to follow non-assignment operators in an expression"],

  ["var f\\uuuuu;", "invalid unicode escape range"],

  ["5e", "e must have suffix"],
  ["5e+", "e+ must have suffix"],
  ["5e-", "e- must have suffix"],
  ["5e-foo", "requires suffix even when it looks like a proper expression"],
  ["5e+foo", "requires suffix even when it looks like a proper expression"],
  ["5e*foo", "requires suffix even when it looks like a proper expression"],

  ["=foo;", "due to label crap, this once was a thing"],

  ["foo:{while(false){continue foo;}}", "continue labels must be one from an iteration label set"],
  ["throw\nfoo;", "throw does not get ASI applied to it, a newline is always a syntax error"],

  ["var x == 5;", "make sure tokens arent skipped by checking just one character"],

  // code coverage missing cases
  ["'foo\nbar'", "no newlines in strings"],
  ["'foo", "unterminated string"],
  ["\"foo\nbar\"", "no newlines in strings"],
  ["\"foo", "unterminated string"],
  ["'foo\\ubaar", "invalid unicode escape"],
  ["'foo\\xfoo'", "invalid hex escape"],
  ["x~=y;",4,"binary negate has no compound sister"],
  ["/x\ny/", "illegal newline"],
  ["/x\ry/", "illegal newline"],
  ["/x\r\ny/", "illegal newline"],
  ["/x\u2028y/", "illegal newline"],
  ["/x\u2029y/", "illegal newline"],
  ["/x[\n]y/", "illegal newline"],
  ["/x[\r]y/", "illegal newline"],
  ["/x[\r\n]y/", "illegal newline"],
  ["/x[\u2028]y/", "illegal newline"],
  ["/x[\u2029]y/", "illegal newline"],
  ["/x\\\ny/", "illegal newline"],
  ["/x\\\ry/", "illegal newline"],
  ["/x\\\r\ny/", "illegal newline"],
  ["/x\\\u2028y/", "illegal newline"],
  ["/x\\\u2029y/", "illegal newline"],
  ["/foo", "unterminated regex"],
  ["/f[oo", "unterminated regex (in char class)"],
  ["for (var debugger in foo);", "no-in var reserved word test"],
  ["for (var key on bar);", "expecting in"],
  ["for (var key ik bar);", "expecting in"],
  ["for (var key inhere bar);", "expecting in"],
  ["for (var key instanceof bar);", "expecting in"],
  ["continue;", "continue requires label and loop"],
  ["continue foo;", "continue requires loop"],
  ["function foo(){ continue foo; }", "continue requires loop"],
  ["switch (x) { case 5: continue; }", "continue requires label and loop"],
  ["switch (x) { case 5: continue foo; }", "continue requires label and loop"],
  ["break;", "break requires label or loop"],
  ["function foo(){ break; }", "break requires label or loop"],
  ["try {}", "dont try this at home, you need catch/finally"],
  ["();", "missing expression"],
  ["foo(());", "missing expression"],
  ["foo[];", "missing expression"],
  ["foo?:bar;", "missing expression"],
  ["var x=;", "missing expression"],
  ["var x=foo,;", "missing stuff"],
  ["foo,;", "missing expression"],
  ["super();", "identifier expression statement that starts with a reserved word"],
  ["true:oops;", "reserved word as label name"],
  ["false:oops;", "reserved word as label name"],
  ["null:oops;", "reserved word as label name"],
  ["this:oops;", "reserved word as label name"],
  ["do x; y;", "missing while"],
  ["x?", "eof is not valid as a second part"],
  ["x?y:", "eof is not valid as a third part"],
  ["x,", "missing expression"],
  ["x, if (foo);", "missing expression (thrown as reserved identifier keyword)"],
  ["switch(x){ case: foo; }", "missing case expression"],
  ["for (var key,", "missing stuff in noin"],
  ["for (var key=", "missing stuff in noin"],
  ["for (var key=foo,", "missing stuff in noin"],
  ["for (var key=foo&&", "missing stuff in noin"],
];
