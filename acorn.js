// Acorn is a tiny, fast JavaScript parser written in JavaScript.
//
// Acorn was written by Marijn Haverbeke and various contributors and
// released under an MIT license.
//
// Git repositories for Acorn are available at
//
//     http://marijnhaverbeke.nl/git/acorn
//     https://github.com/marijnh/acorn.git
//
// Please use the [github bug tracker][ghbt] to report issues.
//
// [ghbt]: https://github.com/marijnh/acorn/issues
//
// This file defines the main parser interface. The library also comes
// with a [error-tolerant parser][dammit] and an
// [abstract syntax tree walker][walk], defined in other files.
//
// [dammit]: acorn_loose.js
// [walk]: util/walk.js

(function(root, mod) {
  if (typeof exports == "object" && typeof module == "object") return mod(exports); // CommonJS
  if (typeof define == "function" && define.amd) return define(["exports"], mod); // AMD
  mod(root.acorn || (root.acorn = {})); // Plain browser env
})(this, function(exports) {
  "use strict";

  exports.version = "0.11.1";

  // The main exported interface (under `self.acorn` when in the
  // browser) is a `parse` function that takes a code string and
  // returns an abstract syntax tree as specified by [Mozilla parser
  // API][api].
  //
  // [api]: https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API

  exports.parse = function(input, options) {
    var p = new Parser(options, input);
    var startPos = p.options.locations ? [p.pos, p.curPosition()] : p.pos;
    p.readToken();
    return p.parseTopLevel(p.options.program || p.startNodeAt(startPos));
  };

  // A second optional argument can be given to further configure
  // the parser process. These options are recognized:

  var defaultOptions = exports.defaultOptions = {
    // `ecmaVersion` indicates the ECMAScript version to parse. Must
    // be either 3, or 5, or 6. This influences support for strict
    // mode, the set of reserved words, support for getters and
    // setters and other features.
    ecmaVersion: 5,
    // Turn on `strictSemicolons` to prevent the parser from doing
    // automatic semicolon insertion.
    strictSemicolons: false,
    // When `allowTrailingCommas` is false, the parser will not allow
    // trailing commas in array and object literals.
    allowTrailingCommas: true,
    // By default, reserved words are not enforced. Enable
    // `forbidReserved` to enforce them. When this option has the
    // value "everywhere", reserved words and keywords can also not be
    // used as property names.
    forbidReserved: false,
    // When enabled, a return at the top level is not considered an
    // error.
    allowReturnOutsideFunction: false,
    // When enabled, import/export statements are not constrained to
    // appearing at the top of the program.
    allowImportExportEverywhere: false,
    // When enabled, hashbang directive in the beginning of file
    // is allowed and treated as a line comment.
    allowHashBang: false,
    // When `locations` is on, `loc` properties holding objects with
    // `start` and `end` properties in `{line, column}` form (with
    // line being 1-based and column 0-based) will be attached to the
    // nodes.
    locations: false,
    // A function can be passed as `onToken` option, which will
    // cause Acorn to call that function with object in the same
    // format as tokenize() returns. Note that you are not
    // allowed to call the parser from the callback—that will
    // corrupt its internal state.
    onToken: null,
    // A function can be passed as `onComment` option, which will
    // cause Acorn to call that function with `(block, text, start,
    // end)` parameters whenever a comment is skipped. `block` is a
    // boolean indicating whether this is a block (`/* */`) comment,
    // `text` is the content of the comment, and `start` and `end` are
    // character offsets that denote the start and end of the comment.
    // When the `locations` option is on, two more parameters are
    // passed, the full `{line, column}` locations of the start and
    // end of the comments. Note that you are not allowed to call the
    // parser from the callback—that will corrupt its internal state.
    onComment: null,
    // Nodes have their start and end characters offsets recorded in
    // `start` and `end` properties (directly on the node, rather than
    // the `loc` object, which holds line/column data. To also add a
    // [semi-standardized][range] `range` property holding a `[start,
    // end]` array with the same numbers, set the `ranges` option to
    // `true`.
    //
    // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
    ranges: false,
    // It is possible to parse multiple files into a single AST by
    // passing the tree produced by parsing the first file as
    // `program` option in subsequent parses. This will add the
    // toplevel forms of the parsed file to the `Program` (top) node
    // of an existing parse tree.
    program: null,
    // When `locations` is on, you can pass this to record the source
    // file in every node's `loc` object.
    sourceFile: null,
    // This value, if given, is stored in every node, whether
    // `locations` is on or off.
    directSourceFile: null,
    // When enabled, parenthesized expressions are represented by
    // (non-standard) ParenthesizedExpression nodes
    preserveParens: false
  };

  // This function tries to parse a single expression at a given
  // offset in a string. Useful for parsing mixed-language formats
  // that embed JavaScript expressions.

  exports.parseExpressionAt = function(input, pos, options) {
    var p = new Parser(options, input, pos);
    p.readToken();
    return p.parseExpression();
  };

  // The `getLineInfo` function is mostly useful when the
  // `locations` option is off (for performance reasons) and you
  // want to find the line/column position for a given character
  // offset. `input` should be the code string that the offset refers
  // into.

  var getLineInfo = exports.getLineInfo = function(input, offset) {
    for (var line = 1, cur = 0;;) {
      lineBreak.lastIndex = cur;
      var match = lineBreak.exec(input);
      if (match && match.index < offset) {
        ++line;
        cur = match.index + match[0].length;
      } else break;
    }
    return new Position(line, offset - cur);
  };

  // Object type used to represent tokens. Note that normally, tokens
  // simply exist as properties on the parser object. This is only
  // used for the onToken callback and the external tokenizer.

  var Token = exports.Token = function(p) {
    this.type = p.type;
    this.value = p.value;
    this.start = p.start;
    this.end = p.end;
    if (p.options.locations) {
      this.loc = new SourceLocation(p);
      this.loc.end = p.endLoc;
    }
    if (p.options.ranges)
      this.range = [p.start, p.end];
  };

  // Acorn is organized as a tokenizer and a recursive-descent parser.
  // The `tokenize` export provides an interface to the tokenizer.
  // Because the tokenizer is optimized for being efficiently used by
  // the Acorn parser itself, this interface is somewhat crude and not
  // very modular.

  exports.tokenize = function(input, options) {
    var p = new Parser(options, input);

    function getToken() {
      p.lastTokEnd = p.end;
      p.readToken();
      return new Token(p);
    }

    getToken.current = function() { return new Token(p); };

    getToken.jumpTo = function(pos, exprAllowed) {
      p.pos = pos;
      if (p.options.locations) {
        p.curLine = 1;
        p.lineStart = lineBreak.lastIndex = 0;
        var match;
        while ((match = lineBreak.exec(p.input)) && match.index < pos) {
          ++p.curLine;
          p.lineStart = match.index + match[0].length;
        }
      }
      p.exprAllowed = !!exprAllowed;
    };

    // If we're in an ES6 environment, make this an iterator.
    if (typeof Symbol !== "undefined") {
      getToken[Symbol.iterator] = function () {
        return {
          next: function () {
            var token = getToken();
            return {
              done: token.type === _eof,
              value: token
            };
          }
        };
      };
    }

    getToken.options = p.options;
    return getToken;
  };

  // Interpret and default an options object

  function parseOptions(opts) {
    var options = {};
    for (var opt in defaultOptions)
      options[opt] = opts && has(opts, opt) ? opts[opt] : defaultOptions[opt];

    if (isArray(options.onToken)) {
      var tokens = options.onToken;
      options.onToken = function (token) { tokens.push(token); };
    }
    if (isArray(options.onComment))
      options.onComment = pushComment(options, options.onComment);

    return options;
  }

  function pushComment(options, array) {
    return function (block, text, start, end, startLoc, endLoc) {
      var comment = {
        type: block ? 'Block' : 'Line',
        value: text,
        start: start,
        end: end
      };
      if (options.locations) {
        comment.loc = new SourceLocation(this);
        comment.loc.start = startLoc;
        comment.loc.end = endLoc;
      }
      if (options.ranges)
        comment.range = [start, end];
      array.push(comment);
    };
  }

  // Reused empty array added for node fields that are always empty.

  var empty = [];

  // ## Token types

  // The assignment of fine-grained, information-carrying type objects
  // allows the tokenizer to store the information it has about a
  // token in a way that is very cheap for the parser to look up.

  // All token type variables start with an underscore, to make them
  // easy to recognize.

  // These are the general types. The `type` property is only used to
  // make them recognizeable when debugging.

  var _num = {type: "num"}, _regexp = {type: "regexp"}, _string = {type: "string"};
  var _name = {type: "name"}, _eof = {type: "eof"};

  // Keyword tokens. The `keyword` property (also used in keyword-like
  // operators) indicates that the token originated from an
  // identifier-like word, which is used when parsing property names.
  //
  // The `beforeExpr` property is used to disambiguate between regular
  // expressions and divisions. It is set on all token types that can
  // be followed by an expression (thus, a slash after them would be a
  // regular expression).
  //
  // `isLoop` marks a keyword as starting a loop, which is important
  // to know when parsing a label, in order to allow or disallow
  // continue jumps to that label.

  var _break = {keyword: "break"}, _case = {keyword: "case", beforeExpr: true}, _catch = {keyword: "catch"};
  var _continue = {keyword: "continue"}, _debugger = {keyword: "debugger"}, _default = {keyword: "default"};
  var _do = {keyword: "do", isLoop: true}, _else = {keyword: "else", beforeExpr: true};
  var _finally = {keyword: "finally"}, _for = {keyword: "for", isLoop: true}, _function = {keyword: "function"};
  var _if = {keyword: "if"}, _return = {keyword: "return", beforeExpr: true}, _switch = {keyword: "switch"};
  var _throw = {keyword: "throw", beforeExpr: true}, _try = {keyword: "try"}, _var = {keyword: "var"};
  var _let = {keyword: "let"}, _const = {keyword: "const"};
  var _while = {keyword: "while", isLoop: true}, _with = {keyword: "with"}, _new = {keyword: "new", beforeExpr: true};
  var _this = {keyword: "this"};
  var _class = {keyword: "class"}, _extends = {keyword: "extends", beforeExpr: true};
  var _export = {keyword: "export"}, _import = {keyword: "import"};
  var _yield = {keyword: "yield", beforeExpr: true};

  // The keywords that denote values.

  var _null = {keyword: "null", atomValue: null}, _true = {keyword: "true", atomValue: true};
  var _false = {keyword: "false", atomValue: false};

  // Some keywords are treated as regular operators. `in` sometimes
  // (when parsing `for`) needs to be tested against specifically, so
  // we assign a variable name to it for quick comparing.

  var _in = {keyword: "in", binop: 7, beforeExpr: true};

  // Map keyword names to token types.

  var keywordTypes = {"break": _break, "case": _case, "catch": _catch,
                      "continue": _continue, "debugger": _debugger, "default": _default,
                      "do": _do, "else": _else, "finally": _finally, "for": _for,
                      "function": _function, "if": _if, "return": _return, "switch": _switch,
                      "throw": _throw, "try": _try, "var": _var, "let": _let, "const": _const,
                      "while": _while, "with": _with,
                      "null": _null, "true": _true, "false": _false, "new": _new, "in": _in,
                      "instanceof": {keyword: "instanceof", binop: 7, beforeExpr: true}, "this": _this,
                      "typeof": {keyword: "typeof", prefix: true, beforeExpr: true},
                      "void": {keyword: "void", prefix: true, beforeExpr: true},
                      "delete": {keyword: "delete", prefix: true, beforeExpr: true},
                      "class": _class, "extends": _extends,
                      "export": _export, "import": _import, "yield": _yield};

  // Punctuation token types. Again, the `type` property is purely for debugging.

  var _bracketL = {type: "[", beforeExpr: true}, _bracketR = {type: "]"}, _braceL = {type: "{", beforeExpr: true};
  var _braceR = {type: "}"}, _parenL = {type: "(", beforeExpr: true}, _parenR = {type: ")"};
  var _comma = {type: ",", beforeExpr: true}, _semi = {type: ";", beforeExpr: true};
  var _colon = {type: ":", beforeExpr: true}, _dot = {type: "."}, _question = {type: "?", beforeExpr: true};
  var _arrow = {type: "=>", beforeExpr: true}, _template = {type: "template"};
  var _ellipsis = {type: "...", beforeExpr: true};
  var _backQuote = {type: "`"}, _dollarBraceL = {type: "${", beforeExpr: true};

  // Operators. These carry several kinds of properties to help the
  // parser use them properly (the presence of these properties is
  // what categorizes them as operators).
  //
  // `binop`, when present, specifies that this operator is a binary
  // operator, and will refer to its precedence.
  //
  // `prefix` and `postfix` mark the operator as a prefix or postfix
  // unary operator. `isUpdate` specifies that the node produced by
  // the operator should be of type UpdateExpression rather than
  // simply UnaryExpression (`++` and `--`).
  //
  // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
  // binary operators with a very low precedence, that should result
  // in AssignmentExpression nodes.

  var _slash = {binop: 10, beforeExpr: true}, _eq = {isAssign: true, beforeExpr: true};
  var _assign = {isAssign: true, beforeExpr: true};
  var _incDec = {postfix: true, prefix: true, isUpdate: true}, _prefix = {prefix: true, beforeExpr: true};
  var _logicalOR = {binop: 1, beforeExpr: true};
  var _logicalAND = {binop: 2, beforeExpr: true};
  var _bitwiseOR = {binop: 3, beforeExpr: true};
  var _bitwiseXOR = {binop: 4, beforeExpr: true};
  var _bitwiseAND = {binop: 5, beforeExpr: true};
  var _equality = {binop: 6, beforeExpr: true};
  var _relational = {binop: 7, beforeExpr: true};
  var _bitShift = {binop: 8, beforeExpr: true};
  var _plusMin = {binop: 9, prefix: true, beforeExpr: true};
  var _modulo = {binop: 10, beforeExpr: true};

  // '*' may be multiply or have special meaning in ES6
  var _star = {binop: 10, beforeExpr: true};

  // Provide access to the token types for external users of the
  // tokenizer.

  exports.tokTypes = {bracketL: _bracketL, bracketR: _bracketR, braceL: _braceL, braceR: _braceR,
                      parenL: _parenL, parenR: _parenR, comma: _comma, semi: _semi, colon: _colon,
                      dot: _dot, ellipsis: _ellipsis, question: _question, slash: _slash, eq: _eq,
                      name: _name, eof: _eof, num: _num, regexp: _regexp, string: _string,
                      arrow: _arrow, template: _template, star: _star, assign: _assign,
                      backQuote: _backQuote, dollarBraceL: _dollarBraceL};
  for (var kw in keywordTypes) exports.tokTypes["_" + kw] = keywordTypes[kw];

  // This is a trick taken from Esprima. It turns out that, on
  // non-Chrome browsers, to check whether a string is in a set, a
  // predicate containing a big ugly `switch` statement is faster than
  // a regular expression, and on Chrome the two are about on par.
  // This function uses `eval` (non-lexical) to produce such a
  // predicate from a space-separated string of words.
  //
  // It starts by sorting the words by length.

  function makePredicate(words) {
    words = words.split(" ");
    var f = "", cats = [];
    out: for (var i = 0; i < words.length; ++i) {
      for (var j = 0; j < cats.length; ++j)
        if (cats[j][0].length == words[i].length) {
          cats[j].push(words[i]);
          continue out;
        }
      cats.push([words[i]]);
    }
    function compareTo(arr) {
      if (arr.length == 1) return f += "return str === " + JSON.stringify(arr[0]) + ";";
      f += "switch(str){";
      for (var i = 0; i < arr.length; ++i) f += "case " + JSON.stringify(arr[i]) + ":";
      f += "return true}return false;";
    }

    // When there are more than three length categories, an outer
    // switch first dispatches on the lengths, to save on comparisons.

    if (cats.length > 3) {
      cats.sort(function(a, b) {return b.length - a.length;});
      f += "switch(str.length){";
      for (var i = 0; i < cats.length; ++i) {
        var cat = cats[i];
        f += "case " + cat[0].length + ":";
        compareTo(cat);
      }
      f += "}";

    // Otherwise, simply generate a flat `switch` statement.

    } else {
      compareTo(words);
    }
    return new Function("str", f);
  }

  // The ECMAScript 3 reserved word list.

  var isReservedWord3 = makePredicate("abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile");

  // ECMAScript 5 reserved words.

  var isReservedWord5 = makePredicate("class enum extends super const export import");

  // The additional reserved words in strict mode.

  var isStrictReservedWord = makePredicate("implements interface let package private protected public static yield");

  // The forbidden variable names in strict mode.

  var isStrictBadIdWord = makePredicate("eval arguments");

  // And the keywords.

  var ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";

  var isEcma5AndLessKeyword = makePredicate(ecma5AndLessKeywords);

  var isEcma6Keyword = makePredicate(ecma5AndLessKeywords + " let const class extends export import yield");

  // ## Character categories

  // Big ugly regular expressions that match characters in the
  // whitespace, identifier, and identifier-start categories. These
  // are only applied when a character is found to actually have a
  // code point above 128.
  // Generated by `tools/generate-identifier-regex.js`.

  var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
  var nonASCIIidentifierStartChars = "\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B2\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC";
  var nonASCIIidentifierChars = "\u0300-\u036F\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08E4-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0D01-\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19B0-\u19C0\u19C8\u19C9\u19D0-\u19D9\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFC-\u1DFF\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA620-\uA629\uA66F\uA674-\uA67D\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F1\uA900-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2D\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F";
  var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
  var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

  // Whether a single character denotes a newline.

  var newline = /[\n\r\u2028\u2029]/;

  function isNewLine(code) {
    return code === 10 || code === 13 || code === 0x2028 || code == 0x2029;
  }

  // Matches a whole line break (where CRLF is considered a single
  // line break). Used to count lines.

  var lineBreak = /\r\n|[\n\r\u2028\u2029]/g;

  // Test whether a given character code starts an identifier.

  var isIdentifierStart = exports.isIdentifierStart = function(code) {
    if (code < 65) return code === 36;
    if (code < 91) return true;
    if (code < 97) return code === 95;
    if (code < 123)return true;
    return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
  };

  // Test whether a given character is part of an identifier.

  var isIdentifierChar = exports.isIdentifierChar = function(code) {
    if (code < 48) return code === 36;
    if (code < 58) return true;
    if (code < 65) return false;
    if (code < 91) return true;
    if (code < 97) return code === 95;
    if (code < 123)return true;
    return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
  };

  // ## Tokenizer

  // These are used when `options.locations` is on, for the
  // `startLoc` and `endLoc` properties.

  function Position(line, col) {
    this.line = line;
    this.column = col;
  }

  Position.prototype.offset = function(n) {
    return new Position(this.line, this.column + n);
  };

  // ## Parser

  // A recursive descent parser operates by defining functions for all
  // syntactic elements, and recursively calling those, each function
  // advancing the input stream and returning an AST node. Precedence
  // of constructs (for example, the fact that `!x[1]` means `!(x[1])`
  // instead of `(!x)[1]` is handled by the fact that the parser
  // function that parses unary prefix operators is called first, and
  // in turn calls the function that parses `[]` subscripts — that
  // way, it'll receive the node for `x[1]` already parsed, and wraps
  // *that* in the unary operator node.
  //
  // Acorn uses an [operator precedence parser][opp] to handle binary
  // operator precedence, because it is much more compact than using
  // the technique outlined above, which uses different, nesting
  // functions to specify precedence, for all of the ten binary
  // precedence levels that JavaScript defines.
  //
  // [opp]: http://en.wikipedia.org/wiki/Operator-precedence_parser

  function Parser(options, input, startPos) {
    this.options = parseOptions(options);
    this.sourceFile = this.options.sourceFile || null;
    this.isKeyword = this.options.ecmaVersion >= 6 ? isEcma6Keyword : isEcma5AndLessKeyword;
    this.input = String(input);

    // Set up token state

    // The current position of the tokenizer in the input.
    if (startPos) {
      this.pos = startPos;
      this.lineStart = Math.max(0, this.input.lastIndexOf("\n", startPos));
      this.curLine = this.input.slice(0, this.lineStart).split(newline).length;
    } else {
      this.pos = this.lineStart = 0;
      this.curLine = 1;
    }

    // Properties of the current token:
    // Its type
    this.type = _eof;
    // For tokens that include more information than their type, the value
    this.value = null;
    // Its start and end offset
    this.start = this.end = this.pos;
    // And, if locations are used, the {line, column} object
    // corresponding to those offsets
    this.startLoc = this.endLoc = null;

    // Position information for the previous token
    this.lastTokEndLoc = null;
    this.lastTokStart = this.lastTokEnd = this.pos;

    // The context stack is used to superficially track syntactic
    // context to predict whether a regular expression is allowed in a
    // given position.
    this.context = [b_stat];
    this.exprAllowed = true;

    // Flags to track whether we are in strict mode, a function, a
    // generator.
    this.strict = this.inFunction = this.inGenerator = false;
    // Labels in scope.
    this.labels = [];

    // If enabled, skip leading hashbang line.
    if (this.pos === 0 && this.options.allowHashBang && this.input.slice(0, 2) === '#!')
      this.skipLineComment(2);
  }

  // Shorthand because we are going to be adding a _lot_ of methods to
  // this.
  var pp = Parser.prototype;

  // Move to the next token

  pp.next = function() {
    if (this.options.onToken)
      this.options.onToken(new Token(this));

    this.lastTokEnd = this.end;
    this.lastTokStart = this.start;
    this.lastTokEndLoc = this.endLoc;
    this.readToken();
  };

  // Toggle strict mode. Re-reads the next number or string to please
  // pedantic tests (`"use strict"; 010;` should fail).

  pp.setStrict = function(strict) {
    this.strict = strict;
    if (this.type !== _num && this.type !== _string) return;
    this.pos = this.start;
    if (this.options.locations) {
      while (this.pos < this.lineStart) {
        this.lineStart = this.input.lastIndexOf("\n", this.lineStart - 2) + 1;
        --this.curLine;
      }
    }
    this.readToken();
  };

  pp.curTokContext = function() {
    return this.context[this.context.length - 1];
  };

  // Read a single token, updating the parser object's token-related
  // properties.

  pp.readToken = function() {
    var inTemplate = this.curTokContext() === q_tmpl;
    if (!inTemplate) this.skipSpace();

    this.start = this.pos;
    if (this.options.locations) this.startLoc = this.curPosition();
    if (this.pos >= this.input.length) return this.finishToken(_eof);

    if (inTemplate) return this.readTmplToken();

    var code = this.input.charCodeAt(this.pos);

    // Identifier or keyword. '\uXXXX' sequences are allowed in
    // identifiers, so '\' also dispatches to that.
    if (isIdentifierStart(code) || code === 92 /* '\' */) return this.readWord();

    if (this.getTokenFromCode(code) === false) {
      // If we are here, we either found a non-ASCII identifier
      // character, or something that's entirely disallowed.
      var ch = String.fromCharCode(code);
      if (ch === "\\" || nonASCIIidentifierStart.test(ch)) return this.readWord();
      this.raise(this.pos, "Unexpected character '" + ch + "'");
    }
  };

  pp.skipBlockComment = function() {
    var startLoc = this.options.onComment && this.options.locations && this.curPosition();
    var start = this.pos, end = this.input.indexOf("*/", this.pos += 2);
    if (end === -1) this.raise(this.pos - 2, "Unterminated comment");
    this.pos = end + 2;
    if (this.options.locations) {
      lineBreak.lastIndex = start;
      var match;
      while ((match = lineBreak.exec(this.input)) && match.index < this.pos) {
        ++this.curLine;
        this.lineStart = match.index + match[0].length;
      }
    }
    if (this.options.onComment)
      this.options.onComment(true, this.input.slice(start + 2, end), start, this.pos,
                             startLoc, this.options.locations && this.curPosition());
  };

  pp.skipLineComment = function(startSkip) {
    var start = this.pos;
    var startLoc = this.options.onComment && this.options.locations && this.curPosition();
    var ch = this.input.charCodeAt(this.pos+=startSkip);
    while (this.pos < this.input.length && ch !== 10 && ch !== 13 && ch !== 8232 && ch !== 8233) {
      ++this.pos;
      ch = this.input.charCodeAt(this.pos);
    }
    if (this.options.onComment)
      this.options.onComment(false, this.input.slice(start + startSkip, this.pos), start, this.pos,
                             startLoc, this.options.locations && this.curPosition());
  };

  // Called at the start of the parse and after every token. Skips
  // whitespace and comments, and.

  pp.skipSpace = function() {
    while (this.pos < this.input.length) {
      var ch = this.input.charCodeAt(this.pos);
      if (ch === 32) { // ' '
        ++this.pos;
      } else if (ch === 13) {
        ++this.pos;
        var next = this.input.charCodeAt(this.pos);
        if (next === 10) {
          ++this.pos;
        }
        if (this.options.locations) {
          ++this.curLine;
          this.lineStart = this.pos;
        }
      } else if (ch === 10 || ch === 8232 || ch === 8233) {
        ++this.pos;
        if (this.options.locations) {
          ++this.curLine;
          this.lineStart = this.pos;
        }
      } else if (ch > 8 && ch < 14) {
        ++this.pos;
      } else if (ch === 47) { // '/'
        var next = this.input.charCodeAt(this.pos + 1);
        if (next === 42) { // '*'
          this.skipBlockComment();
        } else if (next === 47) { // '/'
          this.skipLineComment(2);
        } else break;
      } else if (ch === 160) { // '\xa0'
        ++this.pos;
      } else if (ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
        ++this.pos;
      } else {
        break;
      }
    }
  };

  pp.curPosition = function() {
    return new Position(this.curLine, this.pos - this.lineStart);
  };

  // The algorithm used to determine whether a regexp can appear at a
  // given point in the program is loosely based on sweet.js' approach.
  // See https://github.com/mozilla/sweet.js/wiki/design

  var b_stat = {token: "{", isExpr: false}, b_expr = {token: "{", isExpr: true}, b_tmpl = {token: "${", isExpr: true};
  var p_stat = {token: "(", isExpr: false}, p_expr = {token: "(", isExpr: true};
  var q_tmpl = {token: "`", isExpr: true}, f_expr = {token: "function", isExpr: true};

  pp.braceIsBlock = function(prevType) {
    var parent;
    if (prevType === _colon && (parent = this.curTokContext()).token == "{")
      return !parent.isExpr;
    if (prevType === _return)
      return newline.test(this.input.slice(this.lastTokEnd, this.start));
    if (prevType === _else || prevType === _semi || prevType === _eof)
      return true;
    if (prevType == _braceL)
      return this.curTokContext() === b_stat;
    return !this.exprAllowed;
  };

  // Called at the end of every token. Sets `end`, `val`, and
  // maintains `context` and `exprAllowed`, and skips the space after
  // the token, so that the next one's `start` will point at the
  // right position.

  pp.finishToken = function(type, val) {
    this.end = this.pos;
    if (this.options.locations) this.endLoc = this.curPosition();
    var prevType = this.type;
    this.type = type;
    this.value = val;

    // Update context info
    if (type === _parenR || type === _braceR) {
      var out = this.context.pop();
      if (out === b_stat && this.curTokContext() === f_expr) {
        this.context.pop();
        this.exprAllowed = false;
      } else if (out !== b_tmpl) {
        this.exprAllowed = !(out && out.isExpr);
      }
    } else if (type === _braceL) {
      this.context.push(this.braceIsBlock(prevType) ? b_stat : b_expr);
      this.exprAllowed = true;
    } else if (type === _dollarBraceL) {
      this.context.push(b_tmpl);
      this.exprAllowed = true;
    } else if (type == _parenL) {
      var statementParens = prevType === _if || prevType === _for || prevType === _with || prevType === _while;
      this.context.push(statementParens ? p_stat : p_expr);
      this.exprAllowed = true;
    } else if (type == _incDec) {
      // tokExprAllowed stays unchanged
    } else if (type.keyword && prevType == _dot) {
      this.exprAllowed = false;
    } else if (type == _function) {
      if (this.curTokContext() !== b_stat) {
        this.context.push(f_expr);
      }
      this.exprAllowed = false;
    } else if (type === _backQuote) {
      if (this.curTokContext() === q_tmpl)
        this.context.pop();
      else
        this.context.push(q_tmpl);
      this.exprAllowed = false;
    } else {
      this.exprAllowed = type.beforeExpr;
    }
  };

  // ### Token reading

  // This is the function that is called to fetch the next token. It
  // is somewhat obscure, because it works in character codes rather
  // than characters, and because operator parsing has been inlined
  // into it.
  //
  // All in the name of speed.
  //
  pp.readToken_dot = function() {
    var next = this.input.charCodeAt(this.pos + 1);
    if (next >= 48 && next <= 57) return this.readNumber(true);
    var next2 = this.input.charCodeAt(this.pos + 2);
    if (this.options.ecmaVersion >= 6 && next === 46 && next2 === 46) { // 46 = dot '.'
      this.pos += 3;
      return this.finishToken(_ellipsis);
    } else {
      ++this.pos;
      return this.finishToken(_dot);
    }
  };

  pp.readToken_slash = function() { // '/'
    var next = this.input.charCodeAt(this.pos + 1);
    if (this.exprAllowed) {++this.pos; return this.readRegexp();}
    if (next === 61) return this.finishOp(_assign, 2);
    return this.finishOp(_slash, 1);
  };

  pp.readToken_mult_modulo = function(code) { // '%*'
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === 61) return this.finishOp(_assign, 2);
    return this.finishOp(code === 42 ? _star : _modulo, 1);
  };

  pp.readToken_pipe_amp = function(code) { // '|&'
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === code) return this.finishOp(code === 124 ? _logicalOR : _logicalAND, 2);
    if (next === 61) return this.finishOp(_assign, 2);
    return this.finishOp(code === 124 ? _bitwiseOR : _bitwiseAND, 1);
  };

  pp.readToken_caret = function() { // '^'
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === 61) return this.finishOp(_assign, 2);
    return this.finishOp(_bitwiseXOR, 1);
  };

  pp.readToken_plus_min = function(code) { // '+-'
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === code) {
      if (next == 45 && this.input.charCodeAt(this.pos + 2) == 62 &&
          newline.test(this.input.slice(this.lastTokEnd, this.pos))) {
        // A `-->` line comment
        this.skipLineComment(3);
        this.skipSpace();
        return this.readToken();
      }
      return this.finishOp(_incDec, 2);
    }
    if (next === 61) return this.finishOp(_assign, 2);
    return this.finishOp(_plusMin, 1);
  };

  pp.readToken_lt_gt = function(code) { // '<>'
    var next = this.input.charCodeAt(this.pos + 1);
    var size = 1;
    if (next === code) {
      size = code === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2;
      if (this.input.charCodeAt(this.pos + size) === 61) return this.finishOp(_assign, size + 1);
      return this.finishOp(_bitShift, size);
    }
    if (next == 33 && code == 60 && this.input.charCodeAt(this.pos + 2) == 45 &&
        this.input.charCodeAt(this.pos + 3) == 45) {
      // `<!--`, an XML-style comment that should be interpreted as a line comment
      this.skipLineComment(4);
      this.skipSpace();
      return this.readToken();
    }
    if (next === 61)
      size = this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2;
    return this.finishOp(_relational, size);
  };

  pp.readToken_eq_excl = function(code) { // '=!', '=>'
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === 61) return this.finishOp(_equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2);
    if (code === 61 && next === 62 && this.options.ecmaVersion >= 6) { // '=>'
      this.pos += 2;
      return this.finishToken(_arrow);
    }
    return this.finishOp(code === 61 ? _eq : _prefix, 1);
  };

  pp.getTokenFromCode = function(code) {
    switch (code) {
    // The interpretation of a dot depends on whether it is followed
    // by a digit or another two dots.
    case 46: // '.'
      return this.readToken_dot();

    // Punctuation tokens.
    case 40: ++this.pos; return this.finishToken(_parenL);
    case 41: ++this.pos; return this.finishToken(_parenR);
    case 59: ++this.pos; return this.finishToken(_semi);
    case 44: ++this.pos; return this.finishToken(_comma);
    case 91: ++this.pos; return this.finishToken(_bracketL);
    case 93: ++this.pos; return this.finishToken(_bracketR);
    case 123: ++this.pos; return this.finishToken(_braceL);
    case 125: ++this.pos; return this.finishToken(_braceR);
    case 58: ++this.pos; return this.finishToken(_colon);
    case 63: ++this.pos; return this.finishToken(_question);

    case 96: // '`'
      if (this.options.ecmaVersion >= 6) {
        ++this.pos;
        return this.finishToken(_backQuote);
      } else {
        return false;
      }

    case 48: // '0'
      var next = this.input.charCodeAt(this.pos + 1);
      if (next === 120 || next === 88) return this.readRadixNumber(16); // '0x', '0X' - hex number
      if (this.options.ecmaVersion >= 6) {
        if (next === 111 || next === 79) return this.readRadixNumber(8); // '0o', '0O' - octal number
        if (next === 98 || next === 66) return this.readRadixNumber(2); // '0b', '0B' - binary number
      }
    // Anything else beginning with a digit is an integer, octal
    // number, or float.
    case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57: // 1-9
      return this.readNumber(false);

    // Quotes produce strings.
    case 34: case 39: // '"', "'"
      return this.readString(code);

    // Operators are parsed inline in tiny state machines. '=' (61) is
    // often referred to. `finishOp` simply skips the amount of
    // characters it is given as second argument, and returns a token
    // of the type given by its first argument.

    case 47: // '/'
      return this.readToken_slash();

    case 37: case 42: // '%*'
      return this.readToken_mult_modulo(code);

    case 124: case 38: // '|&'
      return this.readToken_pipe_amp(code);

    case 94: // '^'
      return this.readToken_caret();

    case 43: case 45: // '+-'
      return this.readToken_plus_min(code);

    case 60: case 62: // '<>'
      return this.readToken_lt_gt(code);

    case 61: case 33: // '=!'
      return this.readToken_eq_excl(code);

    case 126: // '~'
      return this.finishOp(_prefix, 1);
    }

    return false;
  };

  pp.finishOp = function(type, size) {
    var str = this.input.slice(this.pos, this.pos + size);
    this.pos += size;
    return this.finishToken(type, str);
  };

  var regexpUnicodeSupport = false;
  try { new RegExp("\uffff", "u"); regexpUnicodeSupport = true; }
  catch(e) {}

  // Parse a regular expression. Some context-awareness is necessary,
  // since a '/' inside a '[]' set does not end the expression.

  pp.readRegexp = function() {
    var content = "", escaped, inClass, start = this.pos;
    for (;;) {
      if (this.pos >= this.input.length) this.raise(start, "Unterminated regular expression");
      var ch = this.input.charAt(this.pos);
      if (newline.test(ch)) this.raise(start, "Unterminated regular expression");
      if (!escaped) {
        if (ch === "[") inClass = true;
        else if (ch === "]" && inClass) inClass = false;
        else if (ch === "/" && !inClass) break;
        escaped = ch === "\\";
      } else escaped = false;
      ++this.pos;
    }
    var content = this.input.slice(start, this.pos);
    ++this.pos;
    // Need to use `readWord1` because '\uXXXX' sequences are allowed
    // here (don't ask).
    var mods = this.readWord1();
    var tmp = content;
    if (mods) {
      var validFlags = /^[gmsiy]*$/;
      if (this.options.ecmaVersion >= 6) validFlags = /^[gmsiyu]*$/;
      if (!validFlags.test(mods)) this.raise(start, "Invalid regular expression flag");
      if (mods.indexOf('u') >= 0 && !regexpUnicodeSupport) {
        // Replace each astral symbol and every Unicode code point
        // escape sequence that represents such a symbol with a single
        // ASCII symbol to avoid throwing on regular expressions that
        // are only valid in combination with the `/u` flag.
        tmp = tmp
          .replace(/\\u\{([0-9a-fA-F]{5,6})\}/g, "x")
          .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "x");
      }
    }
    // Detect invalid regular expressions.
    try {
      new RegExp(tmp);
    } catch (e) {
      if (e instanceof SyntaxError) this.raise(start, "Error parsing regular expression: " + e.message);
      this.raise(e);
    }
    // Get a regular expression object for this pattern-flag pair, or `null` in
    // case the current environment doesn't support the flags it uses.
    try {
      var value = new RegExp(content, mods);
    } catch (err) {
      value = null;
    }
    return this.finishToken(_regexp, {pattern: content, flags: mods, value: value});
  };

  // Read an integer in the given radix. Return null if zero digits
  // were read, the integer value otherwise. When `len` is given, this
  // will return `null` unless the integer has exactly `len` digits.

  pp.readInt = function(radix, len) {
    var start = this.pos, total = 0;
    for (var i = 0, e = len == null ? Infinity : len; i < e; ++i) {
      var code = this.input.charCodeAt(this.pos), val;
      if (code >= 97) val = code - 97 + 10; // a
      else if (code >= 65) val = code - 65 + 10; // A
      else if (code >= 48 && code <= 57) val = code - 48; // 0-9
      else val = Infinity;
      if (val >= radix) break;
      ++this.pos;
      total = total * radix + val;
    }
    if (this.pos === start || len != null && this.pos - start !== len) return null;

    return total;
  };

  pp.readRadixNumber = function(radix) {
    this.pos += 2; // 0x
    var val = this.readInt(radix);
    if (val == null) this.raise(this.start + 2, "Expected number in radix " + radix);
    if (isIdentifierStart(this.input.charCodeAt(this.pos))) this.raise(this.pos, "Identifier directly after number");
    return this.finishToken(_num, val);
  };

  // Read an integer, octal integer, or floating-point number.

  pp.readNumber = function(startsWithDot) {
    var start = this.pos, isFloat = false, octal = this.input.charCodeAt(this.pos) === 48;
    if (!startsWithDot && this.readInt(10) === null) this.raise(start, "Invalid number");
    if (this.input.charCodeAt(this.pos) === 46) {
      ++this.pos;
      this.readInt(10);
      isFloat = true;
    }
    var next = this.input.charCodeAt(this.pos);
    if (next === 69 || next === 101) { // 'eE'
      next = this.input.charCodeAt(++this.pos);
      if (next === 43 || next === 45) ++this.pos; // '+-'
      if (this.readInt(10) === null) this.raise(start, "Invalid number");
      isFloat = true;
    }
    if (isIdentifierStart(this.input.charCodeAt(this.pos))) this.raise(this.pos, "Identifier directly after number");

    var str = this.input.slice(start, this.pos), val;
    if (isFloat) val = parseFloat(str);
    else if (!octal || str.length === 1) val = parseInt(str, 10);
    else if (/[89]/.test(str) || this.strict) this.raise(start, "Invalid number");
    else val = parseInt(str, 8);
    return this.finishToken(_num, val);
  };

  // Read a string value, interpreting backslash-escapes.

  pp.readCodePoint = function() {
    var ch = this.input.charCodeAt(this.pos), code;

    if (ch === 123) {
      if (this.options.ecmaVersion < 6) this.unexpected();
      ++this.pos;
      code = this.readHexChar(this.input.indexOf('}', this.pos) - this.pos);
      ++this.pos;
      if (code > 0x10FFFF) this.unexpected();
    } else {
      code = this.readHexChar(4);
    }

    // UTF-16 Encoding
    if (code <= 0xFFFF) {
      return String.fromCharCode(code);
    }
    var cu1 = ((code - 0x10000) >> 10) + 0xD800;
    var cu2 = ((code - 0x10000) & 1023) + 0xDC00;
    return String.fromCharCode(cu1, cu2);
  };

  pp.readString = function(quote) {
    var out = "", chunkStart = ++this.pos;
    for (;;) {
      if (this.pos >= this.input.length) this.raise(this.start, "Unterminated string constant");
      var ch = this.input.charCodeAt(this.pos);
      if (ch === quote) break;
      if (ch === 92) { // '\'
        out += this.input.slice(chunkStart, this.pos);
        out += this.readEscapedChar();
        chunkStart = this.pos;
      } else {
        if (isNewLine(ch)) this.raise(this.start, "Unterminated string constant");
        ++this.pos;
      }
    }
    out += this.input.slice(chunkStart, this.pos++);
    return this.finishToken(_string, out);
  };

  // Reads template string tokens.

  pp.readTmplToken = function() {
    var out = "", chunkStart = this.pos;
    for (;;) {
      if (this.pos >= this.input.length) this.raise(this.start, "Unterminated template");
      var ch = this.input.charCodeAt(this.pos);
      if (ch === 96 || ch === 36 && this.input.charCodeAt(this.pos + 1) === 123) { // '`', '${'
        if (this.pos === this.start && this.type === _template) {
          if (ch === 36) {
            this.pos += 2;
            return this.finishToken(_dollarBraceL);
          } else {
            ++this.pos;
            return this.finishToken(_backQuote);
          }
        }
        out += this.input.slice(chunkStart, this.pos);
        return this.finishToken(_template, out);
      }
      if (ch === 92) { // '\'
        out += this.input.slice(chunkStart, this.pos);
        out += this.readEscapedChar();
        chunkStart = this.pos;
      } else if (isNewLine(ch)) {
        out += this.input.slice(chunkStart, this.pos);
        ++this.pos;
        if (ch === 13 && this.input.charCodeAt(this.pos) === 10) {
          ++this.pos;
          out += "\n";
        } else {
          out += String.fromCharCode(ch);
        }
        if (this.options.locations) {
          ++this.curLine;
          this.lineStart = this.pos;
        }
        chunkStart = this.pos;
      } else {
        ++this.pos;
      }
    }
  };

  // Used to read escaped characters

  pp.readEscapedChar = function() {
    var ch = this.input.charCodeAt(++this.pos);
    var octal = /^[0-7]+/.exec(this.input.slice(this.pos, this.pos + 3));
    if (octal) octal = octal[0];
    while (octal && parseInt(octal, 8) > 255) octal = octal.slice(0, -1);
    if (octal === "0") octal = null;
    ++this.pos;
    if (octal) {
      if (this.strict) this.raise(this.pos - 2, "Octal literal in strict mode");
      this.pos += octal.length - 1;
      return String.fromCharCode(parseInt(octal, 8));
    } else {
      switch (ch) {
        case 110: return "\n"; // 'n' -> '\n'
        case 114: return "\r"; // 'r' -> '\r'
        case 120: return String.fromCharCode(this.readHexChar(2)); // 'x'
        case 117: return this.readCodePoint(); // 'u'
        case 116: return "\t"; // 't' -> '\t'
        case 98: return "\b"; // 'b' -> '\b'
        case 118: return "\u000b"; // 'v' -> '\u000b'
        case 102: return "\f"; // 'f' -> '\f'
        case 48: return "\0"; // 0 -> '\0'
        case 13: if (this.input.charCodeAt(this.pos) === 10) ++this.pos; // '\r\n'
        case 10: // ' \n'
          if (this.options.locations) { this.lineStart = this.pos; ++this.curLine; }
          return "";
        default: return String.fromCharCode(ch);
      }
    }
  };

  // Used to read character escape sequences ('\x', '\u', '\U').

  pp.readHexChar = function(len) {
    var n = this.readInt(16, len);
    if (n === null) this.raise(this.start, "Bad character escape sequence");
    return n;
  };

  // Used to signal to callers of `readWord1` whether the word
  // contained any escape sequences. This is needed because words with
  // escape sequences must not be interpreted as keywords.

  var containsEsc;

  // Read an identifier, and return it as a string. Sets `containsEsc`
  // to whether the word contained a '\u' escape.
  //
  // Incrementally adds only escaped chars, adding other chunks as-is
  // as a micro-optimization.

  pp.readWord1 = function() {
    containsEsc = false;
    var word = "", first = true, chunkStart = this.pos;
    while (this.pos < this.input.length) {
      var ch = this.input.charCodeAt(this.pos);
      if (isIdentifierChar(ch)) {
        ++this.pos;
      } else if (ch === 92) { // "\"
        containsEsc = true;
        word += this.input.slice(chunkStart, this.pos);
        if (this.input.charCodeAt(++this.pos) != 117) // "u"
          this.raise(this.pos, "Expecting Unicode escape sequence \\uXXXX");
        ++this.pos;
        var esc = this.readHexChar(4);
        var escStr = String.fromCharCode(esc);
        if (!escStr) this.raise(this.pos - 1, "Invalid Unicode escape");
        if (!(first ? isIdentifierStart(esc) : isIdentifierChar(esc)))
          this.raise(this.pos - 4, "Invalid Unicode escape");
        word += escStr;
        chunkStart = this.pos;
      } else {
        break;
      }
      first = false;
    }
    return word + this.input.slice(chunkStart, this.pos);
  };

  // Read an identifier or keyword token. Will check for reserved
  // words when necessary.

  pp.readWord = function() {
    var word = this.readWord1();
    var type = _name;
    if (!containsEsc && this.isKeyword(word))
      type = keywordTypes[word];
    return this.finishToken(type, word);
  };

  // This function is used to raise exceptions on parse errors. It
  // takes an offset integer (into the current `input`) to indicate
  // the location of the error, attaches the position to the end
  // of the error message, and then raises a `SyntaxError` with that
  // message.

  pp.raise = function(pos, message) {
    var loc = getLineInfo(this.input, pos);
    message += " (" + loc.line + ":" + loc.column + ")";
    var err = new SyntaxError(message);
    err.pos = pos; err.loc = loc; err.raisedAt = this.pos;
    throw err;
  };

  pp.currentPos = function() {
    return this.options.locations ? [this.start, this.startLoc] : this.start;
  };

  // ### Parser utilities

  // Start an AST node, attaching a start offset.

  var Node = exports.Node = function() {};

  function SourceLocation(p) {
    this.start = p.startLoc;
    if (p.sourceFile !== null) this.source = p.sourceFile;
  }

  pp.startNode = function() {
    var node = new Node;
    node.start = this.start;
    if (this.options.locations)
      node.loc = new SourceLocation(this);
    if (this.options.directSourceFile)
      node.sourceFile = this.options.directSourceFile;
    if (this.options.ranges)
      node.range = [this.start, 0];
    return node;
  };

  pp.startNodeAt = function(pos) {
    var node = new Node, start = pos;
    if (this.options.locations) {
      node.loc = new SourceLocation(this);
      node.loc.start = start[1];
      start = pos[0];
    }
    node.start = start;
    if (this.options.directSourceFile)
      node.sourceFile = this.options.directSourceFile;
    if (this.options.ranges)
      node.range = [start, 0];
    return node;
  };

  // Finish an AST node, adding `type` and `end` properties.

  pp.finishNode = function(node, type) {
    node.type = type;
    node.end = this.lastTokEnd;
    if (this.options.locations)
      node.loc.end = this.lastTokEndLoc;
    if (this.options.ranges)
      node.range[1] = this.lastTokEnd;
    return node;
  };

  // Finish node at given position

  pp.finishNodeAt = function(node, type, pos) {
    if (this.options.locations) { node.loc.end = pos[1]; pos = pos[0]; }
    node.type = type;
    node.end = pos;
    if (this.options.ranges)
      node.range[1] = pos;
    return node;
  };

  // Test whether a statement node is the string literal `"use strict"`.

  pp.isUseStrict = function(stmt) {
    return this.options.ecmaVersion >= 5 && stmt.type === "ExpressionStatement" &&
      stmt.expression.type === "Literal" && stmt.expression.value === "use strict";
  };

  // Predicate that tests whether the next token is of the given
  // type, and if yes, consumes it as a side effect.

  pp.eat = function(type) {
    if (this.type === type) {
      this.next();
      return true;
    } else {
      return false;
    }
  };

  // Tests whether parsed token is a contextual keyword.

  pp.isContextual = function(name) {
    return this.type === _name && this.value === name;
  };

  // Consumes contextual keyword if possible.

  pp.eatContextual = function(name) {
    return this.value === name && this.eat(_name);
  };

  // Asserts that following token is given contextual keyword.

  pp.expectContextual = function(name) {
    if (!this.eatContextual(name)) this.unexpected();
  };

  // Test whether a semicolon can be inserted at the current position.

  pp.canInsertSemicolon = function() {
    return !this.options.strictSemicolons &&
      (this.type === _eof || this.type === _braceR || newline.test(this.input.slice(this.lastTokEnd, this.start)));
  };

  // Consume a semicolon, or, failing that, see if we are allowed to
  // pretend that there is a semicolon at this position.

  pp.semicolon = function() {
    if (!this.eat(_semi) && !this.canInsertSemicolon()) this.unexpected();
  };

  // Expect a token of a given type. If found, consume it, otherwise,
  // raise an unexpected token error.

  pp.expect = function(type) {
    this.eat(type) || this.unexpected();
  };

  // Raise an unexpected token error.

  pp.unexpected = function(pos) {
    this.raise(pos != null ? pos : this.start, "Unexpected token");
  };

  function isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  }

  // Checks if an object has a property.

  function has(obj, propName) {
    return Object.prototype.hasOwnProperty.call(obj, propName);
  }

  // Convert existing expression atom to assignable pattern
  // if possible.

  pp.toAssignable = function(node, isBinding) {
    if (this.options.ecmaVersion >= 6 && node) {
      switch (node.type) {
        case "Identifier":
        case "ObjectPattern":
        case "ArrayPattern":
        case "AssignmentPattern":
          break;

        case "ObjectExpression":
          node.type = "ObjectPattern";
          for (var i = 0; i < node.properties.length; i++) {
            var prop = node.properties[i];
            if (prop.kind !== "init") this.raise(prop.key.start, "Object pattern can't contain getter or setter");
            this.toAssignable(prop.value, isBinding);
          }
          break;

        case "ArrayExpression":
          node.type = "ArrayPattern";
          this.toAssignableList(node.elements, isBinding);
          break;

        case "AssignmentExpression":
          if (node.operator === "=") {
            node.type = "AssignmentPattern";
          } else {
            this.raise(node.left.end, "Only '=' operator can be used for specifying default value.");
          }
          break;

        case "MemberExpression":
          if (!isBinding) break;

        default:
          this.raise(node.start, "Assigning to rvalue");
      }
    }
    return node;
  };

  // Convert list of expression atoms to binding list.

  pp.toAssignableList = function(exprList, isBinding) {
    if (exprList.length) {
      for (var i = 0; i < exprList.length - 1; i++) {
        this.toAssignable(exprList[i], isBinding);
      }
      var last = exprList[exprList.length - 1];
      switch (last.type) {
        case "RestElement":
          break;
        case "SpreadElement":
          last.type = "RestElement";
          var arg = last.argument;
          this.toAssignable(arg, isBinding);
          if (arg.type !== "Identifier" && arg.type !== "MemberExpression" && arg.type !== "ArrayPattern")
            this.unexpected(arg.start);
          break;
        default:
          this.toAssignable(last, isBinding);
      }
    }
    return exprList;
  };

  // Parses spread element.

  pp.parseSpread = function(refShorthandDefaultPos) {
    var node = this.startNode();
    this.next();
    node.argument = this.parseMaybeAssign(refShorthandDefaultPos);
    return this.finishNode(node, "SpreadElement");
  };

  pp.parseRest = function() {
    var node = this.startNode();
    this.next();
    node.argument = this.type === _name || this.type === _bracketL ? this.parseBindingAtom() : this.unexpected();
    return this.finishNode(node, "RestElement");
  };

  // Parses lvalue (assignable) atom.

  pp.parseBindingAtom = function() {
    if (this.options.ecmaVersion < 6) return this.parseIdent();
    switch (this.type) {
      case _name:
        return this.parseIdent();

      case _bracketL:
        var node = this.startNode();
        this.next();
        node.elements = this.parseBindingList(_bracketR, true);
        return this.finishNode(node, "ArrayPattern");

      case _braceL:
        return this.parseObj(true);

      default:
        this.unexpected();
    }
  };

  pp.parseBindingList = function(close, allowEmpty) {
    var elts = [], first = true;
    while (!this.eat(close)) {
      first ? first = false : this.expect(_comma);
      if (this.type === _ellipsis) {
        elts.push(this.parseRest());
        this.expect(close);
        break;
      }
      elts.push(allowEmpty && this.type === _comma ? null : this.parseMaybeDefault());
    }
    return elts;
  };

  // Parses assignment pattern around given atom if possible.

  pp.parseMaybeDefault = function(startPos, left) {
    startPos = startPos || this.currentPos();
    left = left || this.parseBindingAtom();
    if (!this.eat(_eq)) return left;
    var node = this.startNodeAt(startPos);
    node.operator = "=";
    node.left = left;
    node.right = this.parseMaybeAssign();
    return this.finishNode(node, "AssignmentPattern");
  };

  // Verify that argument names are not repeated, and it does not
  // try to bind the words `eval` or `arguments`.

  pp.checkFunctionParam = function(param, nameHash) {
    switch (param.type) {
      case "Identifier":
        if (isStrictReservedWord(param.name) || isStrictBadIdWord(param.name))
          this.raise(param.start, "Defining '" + param.name + "' in strict mode");
        if (has(nameHash, param.name))
          this.raise(param.start, "Argument name clash in strict mode");
        nameHash[param.name] = true;
        break;

      case "ObjectPattern":
        for (var i = 0; i < param.properties.length; i++)
          this.checkFunctionParam(param.properties[i].value, nameHash);
        break;

      case "ArrayPattern":
        for (var i = 0; i < param.elements.length; i++) {
          var elem = param.elements[i];
          if (elem) this.checkFunctionParam(elem, nameHash);
        }
        break;

      case "RestElement":
        return this.checkFunctionParam(param.argument, nameHash);
    }
  };

  // Check if property name clashes with already added.
  // Object/class getters and setters are not allowed to clash —
  // either with each other or with an init property — and in
  // strict mode, init properties are also not allowed to be repeated.

  pp.checkPropClash = function(prop, propHash) {
    if (this.options.ecmaVersion >= 6) return;
    var key = prop.key, name;
    switch (key.type) {
      case "Identifier": name = key.name; break;
      case "Literal": name = String(key.value); break;
      default: return;
    }
    var kind = prop.kind || "init", other;
    if (has(propHash, name)) {
      other = propHash[name];
      var isGetSet = kind !== "init";
      if ((this.strict || isGetSet) && other[kind] || !(isGetSet ^ other.init))
        this.raise(key.start, "Redefinition of property");
    } else {
      other = propHash[name] = {
        init: false,
        get: false,
        set: false
      };
    }
    other[kind] = true;
  };

  // Verify that a node is an lval — something that can be assigned
  // to.

  pp.checkLVal = function(expr, isBinding) {
    switch (expr.type) {
      case "Identifier":
        if (this.strict && (isStrictBadIdWord(expr.name) || isStrictReservedWord(expr.name)))
          this.raise(expr.start, (isBinding ? "Binding " : "Assigning to ") + expr.name + " in strict mode");
        break;

      case "MemberExpression":
        if (isBinding) this.raise(expr.start, "Binding to member expression");
        break;

      case "ObjectPattern":
        for (var i = 0; i < expr.properties.length; i++)
          this.checkLVal(expr.properties[i].value, isBinding);
        break;

      case "ArrayPattern":
        for (var i = 0; i < expr.elements.length; i++) {
          var elem = expr.elements[i];
          if (elem) this.checkLVal(elem, isBinding);
        }
        break;

      case "AssignmentPattern":
        this.checkLVal(expr.left);
        break;

      case "RestElement":
        this.checkLVal(expr.argument);
        break;

      default:
        this.raise(expr.start, "Assigning to rvalue");
    }
  };

  // ### Statement parsing

  // Parse a program. Initializes the parser, reads any number of
  // statements, and wraps them in a Program node.  Optionally takes a
  // `program` argument.  If present, the statements will be appended
  // to its body instead of creating a new node.

  pp.parseTopLevel = function(node) {
    var first = true;
    if (!node.body) node.body = [];
    while (this.type !== _eof) {
      var stmt = this.parseStatement(true, true);
      node.body.push(stmt);
      if (first && this.isUseStrict(stmt)) this.setStrict(true);
      first = false;
    }

    this.next();
    return this.finishNode(node, "Program");
  };

  var loopLabel = {kind: "loop"}, switchLabel = {kind: "switch"};

  // Parse a single statement.
  //
  // If expecting a statement and finding a slash operator, parse a
  // regular expression literal. This is to handle cases like
  // `if (foo) /blah/.exec(foo);`, where looking at the previous token
  // does not help.

  pp.parseStatement = function(declaration, topLevel) {
    var starttype = this.type, node = this.startNode();

    // Most types of statements are recognized by the keyword they
    // start with. Many are trivial to parse, some require a bit of
    // complexity.

    switch (starttype) {
    case _break: case _continue: return this.parseBreakContinueStatement(node, starttype.keyword);
    case _debugger: return this.parseDebuggerStatement(node);
    case _do: return this.parseDoStatement(node);
    case _for: return this.parseForStatement(node);
    case _function:
      if (!declaration && this.options.ecmaVersion >= 6) this.unexpected();
      return this.parseFunctionStatement(node);
    case _class:
      if (!declaration) this.unexpected();
      return this.parseClass(node, true);
    case _if: return this.parseIfStatement(node);
    case _return: return this.parseReturnStatement(node);
    case _switch: return this.parseSwitchStatement(node);
    case _throw: return this.parseThrowStatement(node);
    case _try: return this.parseTryStatement(node);
    case _let: case _const: if (!declaration) this.unexpected(); // NOTE: falls through to _var
    case _var: return this.parseVarStatement(node, starttype.keyword);
    case _while: return this.parseWhileStatement(node);
    case _with: return this.parseWithStatement(node);
    case _braceL: return this.parseBlock(); // no point creating a function for this
    case _semi: return this.parseEmptyStatement(node);
    case _export:
    case _import:
      if (!topLevel && !this.options.allowImportExportEverywhere)
        this.raise(this.start, "'import' and 'export' may only appear at the top level");
      return starttype === _import ? this.parseImport(node) : this.parseExport(node);

      // If the statement does not start with a statement keyword or a
      // brace, it's an ExpressionStatement or LabeledStatement. We
      // simply start parsing an expression, and afterwards, if the
      // next token is a colon and the expression was a simple
      // Identifier node, we switch to interpreting it as a label.
    default:
      var maybeName = this.value, expr = this.parseExpression();
      if (starttype === _name && expr.type === "Identifier" && this.eat(_colon))
        return this.parseLabeledStatement(node, maybeName, expr);
      else return this.parseExpressionStatement(node, expr);
    }
  };

  pp.parseBreakContinueStatement = function(node, keyword) {
    var isBreak = keyword == "break";
    this.next();
    if (this.eat(_semi) || this.canInsertSemicolon()) node.label = null;
    else if (this.type !== _name) this.unexpected();
    else {
      node.label = this.parseIdent();
      this.semicolon();
    }

    // Verify that there is an actual destination to break or
    // continue to.
    for (var i = 0; i < this.labels.length; ++i) {
      var lab = this.labels[i];
      if (node.label == null || lab.name === node.label.name) {
        if (lab.kind != null && (isBreak || lab.kind === "loop")) break;
        if (node.label && isBreak) break;
      }
    }
    if (i === this.labels.length) this.raise(node.start, "Unsyntactic " + keyword);
    return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
  };

  pp.parseDebuggerStatement = function(node) {
    this.next();
    this.semicolon();
    return this.finishNode(node, "DebuggerStatement");
  };

  pp.parseDoStatement = function(node) {
    this.next();
    this.labels.push(loopLabel);
    node.body = this.parseStatement(false);
    this.labels.pop();
    this.expect(_while);
    node.test = this.parseParenExpression();
    if (this.options.ecmaVersion >= 6)
      this.eat(_semi);
    else
      this.semicolon();
    return this.finishNode(node, "DoWhileStatement");
  };

  // Disambiguating between a `for` and a `for`/`in` or `for`/`of`
  // loop is non-trivial. Basically, we have to parse the init `var`
  // statement or expression, disallowing the `in` operator (see
  // the second parameter to `parseExpression`), and then check
  // whether the next token is `in` or `of`. When there is no init
  // part (semicolon immediately after the opening parenthesis), it
  // is a regular `for` loop.

  pp.parseForStatement = function(node) {
    this.next();
    this.labels.push(loopLabel);
    this.expect(_parenL);
    if (this.type === _semi) return this.parseFor(node, null);
    if (this.type === _var || this.type === _let) {
      var init = this.startNode(), varKind = this.type.keyword, isLet = this.type === _let;
      this.next();
      this.parseVar(init, true, varKind);
      this.finishNode(init, "VariableDeclaration");
      if ((this.type === _in || (this.options.ecmaVersion >= 6 && this.isContextual("of"))) && init.declarations.length === 1 &&
          !(isLet && init.declarations[0].init))
        return this.parseForIn(node, init);
      return this.parseFor(node, init);
    }
    var refShorthandDefaultPos = {start: 0};
    var init = this.parseExpression(true, refShorthandDefaultPos);
    if (this.type === _in || (this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
      this.toAssignable(init);
      this.checkLVal(init);
      return this.parseForIn(node, init);
    } else if (refShorthandDefaultPos.start) {
      this.unexpected(refShorthandDefaultPos.start);
    }
    return this.parseFor(node, init);
  };

  pp.parseFunctionStatement = function(node) {
    this.next();
    return this.parseFunction(node, true);
  };

  pp.parseIfStatement = function(node) {
    this.next();
    node.test = this.parseParenExpression();
    node.consequent = this.parseStatement(false);
    node.alternate = this.eat(_else) ? this.parseStatement(false) : null;
    return this.finishNode(node, "IfStatement");
  };

  pp.parseReturnStatement = function(node) {
    if (!this.inFunction && !this.options.allowReturnOutsideFunction)
      this.raise(this.start, "'return' outside of function");
    this.next();

    // In `return` (and `break`/`continue`), the keywords with
    // optional arguments, we eagerly look for a semicolon or the
    // possibility to insert one.

    if (this.eat(_semi) || this.canInsertSemicolon()) node.argument = null;
    else { node.argument = this.parseExpression(); this.semicolon(); }
    return this.finishNode(node, "ReturnStatement");
  };

  pp.parseSwitchStatement = function(node) {
    this.next();
    node.discriminant = this.parseParenExpression();
    node.cases = [];
    this.expect(_braceL);
    this.labels.push(switchLabel);

    // Statements under must be grouped (by label) in SwitchCase
    // nodes. `cur` is used to keep the node that we are currently
    // adding statements to.

    for (var cur, sawDefault; this.type != _braceR;) {
      if (this.type === _case || this.type === _default) {
        var isCase = this.type === _case;
        if (cur) this.finishNode(cur, "SwitchCase");
        node.cases.push(cur = this.startNode());
        cur.consequent = [];
        this.next();
        if (isCase) cur.test = this.parseExpression();
        else {
          if (sawDefault) this.raise(this.lastTokStart, "Multiple default clauses"); sawDefault = true;
          cur.test = null;
        }
        this.expect(_colon);
      } else {
        if (!cur) this.unexpected();
        cur.consequent.push(this.parseStatement(true));
      }
    }
    if (cur) this.finishNode(cur, "SwitchCase");
    this.next(); // Closing brace
    this.labels.pop();
    return this.finishNode(node, "SwitchStatement");
  };

  pp.parseThrowStatement = function(node) {
    this.next();
    if (newline.test(this.input.slice(this.lastTokEnd, this.start)))
      this.raise(this.lastTokEnd, "Illegal newline after throw");
    node.argument = this.parseExpression();
    this.semicolon();
    return this.finishNode(node, "ThrowStatement");
  };

  pp.parseTryStatement = function(node) {
    this.next();
    node.block = this.parseBlock();
    node.handler = null;
    if (this.type === _catch) {
      var clause = this.startNode();
      this.next();
      this.expect(_parenL);
      clause.param = this.parseBindingAtom();
      this.checkLVal(clause.param, true);
      this.expect(_parenR);
      clause.guard = null;
      clause.body = this.parseBlock();
      node.handler = this.finishNode(clause, "CatchClause");
    }
    node.guardedHandlers = empty;
    node.finalizer = this.eat(_finally) ? this.parseBlock() : null;
    if (!node.handler && !node.finalizer)
      this.raise(node.start, "Missing catch or finally clause");
    return this.finishNode(node, "TryStatement");
  };

  pp.parseVarStatement = function(node, kind) {
    this.next();
    this.parseVar(node, false, kind);
    this.semicolon();
    return this.finishNode(node, "VariableDeclaration");
  };

  pp.parseWhileStatement = function(node) {
    this.next();
    node.test = this.parseParenExpression();
    this.labels.push(loopLabel);
    node.body = this.parseStatement(false);
    this.labels.pop();
    return this.finishNode(node, "WhileStatement");
  };

  pp.parseWithStatement = function(node) {
    if (this.strict) this.raise(this.start, "'with' in strict mode");
    this.next();
    node.object = this.parseParenExpression();
    node.body = this.parseStatement(false);
    return this.finishNode(node, "WithStatement");
  };

  pp.parseEmptyStatement = function(node) {
    this.next();
    return this.finishNode(node, "EmptyStatement");
  };

  pp.parseLabeledStatement = function(node, maybeName, expr) {
    for (var i = 0; i < this.labels.length; ++i)
      if (this.labels[i].name === maybeName) this.raise(expr.start, "Label '" + maybeName + "' is already declared");
    var kind = this.type.isLoop ? "loop" : this.type === _switch ? "switch" : null;
    this.labels.push({name: maybeName, kind: kind});
    node.body = this.parseStatement(true);
    this.labels.pop();
    node.label = expr;
    return this.finishNode(node, "LabeledStatement");
  };

  pp.parseExpressionStatement = function(node, expr) {
    node.expression = expr;
    this.semicolon();
    return this.finishNode(node, "ExpressionStatement");
  };

  // Used for constructs like `switch` and `if` that insist on
  // parentheses around their expression.

  pp.parseParenExpression = function() {
    this.expect(_parenL);
    var val = this.parseExpression();
    this.expect(_parenR);
    return val;
  };

  // Parse a semicolon-enclosed block of statements, handling `"use
  // strict"` declarations when `allowStrict` is true (used for
  // function bodies).

  pp.parseBlock = function(allowStrict) {
    var node = this.startNode(), first = true, oldStrict;
    node.body = [];
    this.expect(_braceL);
    while (!this.eat(_braceR)) {
      var stmt = this.parseStatement(true);
      node.body.push(stmt);
      if (first && allowStrict && this.isUseStrict(stmt)) {
        oldStrict = this.strict;
        this.setStrict(this.strict = true);
      }
      first = false;
    }
    if (oldStrict === false) this.setStrict(false);
    return this.finishNode(node, "BlockStatement");
  };

  // Parse a regular `for` loop. The disambiguation code in
  // `parseStatement` will already have parsed the init statement or
  // expression.

  pp.parseFor = function(node, init) {
    node.init = init;
    this.expect(_semi);
    node.test = this.type === _semi ? null : this.parseExpression();
    this.expect(_semi);
    node.update = this.type === _parenR ? null : this.parseExpression();
    this.expect(_parenR);
    node.body = this.parseStatement(false);
    this.labels.pop();
    return this.finishNode(node, "ForStatement");
  };

  // Parse a `for`/`in` and `for`/`of` loop, which are almost
  // same from parser's perspective.

  pp.parseForIn = function(node, init) {
    var type = this.type === _in ? "ForInStatement" : "ForOfStatement";
    this.next();
    node.left = init;
    node.right = this.parseExpression();
    this.expect(_parenR);
    node.body = this.parseStatement(false);
    this.labels.pop();
    return this.finishNode(node, type);
  };

  // Parse a list of variable declarations.

  pp.parseVar = function(node, noIn, kind) {
    node.declarations = [];
    node.kind = kind;
    for (;;) {
      var decl = this.startNode();
      decl.id = this.parseBindingAtom();
      this.checkLVal(decl.id, true);
      decl.init = this.eat(_eq) ? this.parseMaybeAssign(noIn) : (kind === _const.keyword ? this.unexpected() : null);
      node.declarations.push(this.finishNode(decl, "VariableDeclarator"));
      if (!this.eat(_comma)) break;
    }
    return node;
  };

  // ### Expression parsing

  // These nest, from the most general expression type at the top to
  // 'atomic', nondivisible expression types at the bottom. Most of
  // the functions will simply let the function(s) below them parse,
  // and, *if* the syntactic construct they handle is present, wrap
  // the AST node that the inner parser gave them in another node.

  // Parse a full expression. The optional arguments are used to
  // forbid the `in` operator (in for loops initalization expressions)
  // and provide reference for storing '=' operator inside shorthand
  // property assignment in contexts where both object expression
  // and object pattern might appear (so it's possible to raise
  // delayed syntax error at correct position).

  pp.parseExpression = function(noIn, refShorthandDefaultPos) {
    var start = this.currentPos();
    var expr = this.parseMaybeAssign(noIn, refShorthandDefaultPos);
    if (this.type === _comma) {
      var node = this.startNodeAt(start);
      node.expressions = [expr];
      while (this.eat(_comma)) node.expressions.push(this.parseMaybeAssign(noIn, refShorthandDefaultPos));
      return this.finishNode(node, "SequenceExpression");
    }
    return expr;
  };

  // Parse an assignment expression. This includes applications of
  // operators like `+=`.

  pp.parseMaybeAssign = function(noIn, refShorthandDefaultPos) {
    var failOnShorthandAssign;
    if (!refShorthandDefaultPos) {
      refShorthandDefaultPos = {start: 0};
      failOnShorthandAssign = true;
    } else {
      failOnShorthandAssign = false;
    }
    var start = this.currentPos();
    var left = this.parseMaybeConditional(noIn, refShorthandDefaultPos);
    if (this.type.isAssign) {
      var node = this.startNodeAt(start);
      node.operator = this.value;
      node.left = this.type === _eq ? this.toAssignable(left) : left;
      refShorthandDefaultPos.start = 0; // reset because shorthand default was used correctly
      this.checkLVal(left);
      this.next();
      node.right = this.parseMaybeAssign(noIn);
      return this.finishNode(node, "AssignmentExpression");
    } else if (failOnShorthandAssign && refShorthandDefaultPos.start) {
      this.unexpected(refShorthandDefaultPos.start);
    }
    return left;
  };

  // Parse a ternary conditional (`?:`) operator.

  pp.parseMaybeConditional = function(noIn, refShorthandDefaultPos) {
    var start = this.currentPos();
    var expr = this.parseExprOps(noIn, refShorthandDefaultPos);
    if (refShorthandDefaultPos && refShorthandDefaultPos.start) return expr;
    if (this.eat(_question)) {
      var node = this.startNodeAt(start);
      node.test = expr;
      node.consequent = this.parseMaybeAssign();
      this.expect(_colon);
      node.alternate = this.parseMaybeAssign(noIn);
      return this.finishNode(node, "ConditionalExpression");
    }
    return expr;
  };

  // Start the precedence parser.

  pp.parseExprOps = function(noIn, refShorthandDefaultPos) {
    var start = this.currentPos();
    var expr = this.parseMaybeUnary(refShorthandDefaultPos);
    if (refShorthandDefaultPos && refShorthandDefaultPos.start) return expr;
    return this.parseExprOp(expr, start, -1, noIn);
  };

  // Parse binary operators with the operator precedence parsing
  // algorithm. `left` is the left-hand side of the operator.
  // `minPrec` provides context that allows the function to stop and
  // defer further parser to one of its callers when it encounters an
  // operator that has a lower precedence than the set it is parsing.

  pp.parseExprOp = function(left, leftStart, minPrec, noIn) {
    var prec = this.type.binop;
    if (prec != null && (!noIn || this.type !== _in)) {
      if (prec > minPrec) {
        var node = this.startNodeAt(leftStart);
        node.left = left;
        node.operator = this.value;
        var op = this.type;
        this.next();
        var start = this.currentPos();
        node.right = this.parseExprOp(this.parseMaybeUnary(), start, prec, noIn);
        this.finishNode(node, (op === _logicalOR || op === _logicalAND) ? "LogicalExpression" : "BinaryExpression");
        return this.parseExprOp(node, leftStart, minPrec, noIn);
      }
    }
    return left;
  };

  // Parse unary operators, both prefix and postfix.

  pp.parseMaybeUnary = function(refShorthandDefaultPos) {
    if (this.type.prefix) {
      var node = this.startNode(), update = this.type.isUpdate;
      node.operator = this.value;
      node.prefix = true;
      this.next();
      node.argument = this.parseMaybeUnary();
      if (refShorthandDefaultPos && refShorthandDefaultPos.start) this.unexpected(refShorthandDefaultPos.start);
      if (update) this.checkLVal(node.argument);
      else if (this.strict && node.operator === "delete" &&
               node.argument.type === "Identifier")
        this.raise(node.start, "Deleting local variable in strict mode");
      return this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
    }
    var start = this.currentPos();
    var expr = this.parseExprSubscripts(refShorthandDefaultPos);
    if (refShorthandDefaultPos && refShorthandDefaultPos.start) return expr;
    while (this.type.postfix && !this.canInsertSemicolon()) {
      var node = this.startNodeAt(start);
      node.operator = this.value;
      node.prefix = false;
      node.argument = expr;
      this.checkLVal(expr);
      this.next();
      expr = this.finishNode(node, "UpdateExpression");
    }
    return expr;
  };

  // Parse call, dot, and `[]`-subscript expressions.

  pp.parseExprSubscripts = function(refShorthandDefaultPos) {
    var start = this.currentPos();
    var expr = this.parseExprAtom(refShorthandDefaultPos);
    if (refShorthandDefaultPos && refShorthandDefaultPos.start) return expr;
    return this.parseSubscripts(expr, start);
  };

  pp.parseSubscripts = function(base, start, noCalls) {
    if (this.eat(_dot)) {
      var node = this.startNodeAt(start);
      node.object = base;
      node.property = this.parseIdent(true);
      node.computed = false;
      return this.parseSubscripts(this.finishNode(node, "MemberExpression"), start, noCalls);
    } else if (this.eat(_bracketL)) {
      var node = this.startNodeAt(start);
      node.object = base;
      node.property = this.parseExpression();
      node.computed = true;
      this.expect(_bracketR);
      return this.parseSubscripts(this.finishNode(node, "MemberExpression"), start, noCalls);
    } else if (!noCalls && this.eat(_parenL)) {
      var node = this.startNodeAt(start);
      node.callee = base;
      node.arguments = this.parseExprList(_parenR, false);
      return this.parseSubscripts(this.finishNode(node, "CallExpression"), start, noCalls);
    } else if (this.type === _backQuote) {
      var node = this.startNodeAt(start);
      node.tag = base;
      node.quasi = this.parseTemplate();
      return this.parseSubscripts(this.finishNode(node, "TaggedTemplateExpression"), start, noCalls);
    } return base;
  };

  // Parse an atomic expression — either a single token that is an
  // expression, an expression started by a keyword like `function` or
  // `new`, or an expression wrapped in punctuation like `()`, `[]`,
  // or `{}`.

  pp.parseExprAtom = function(refShorthandDefaultPos) {
    switch (this.type) {
    case _this:
      var node = this.startNode();
      this.next();
      return this.finishNode(node, "ThisExpression");

    case _yield:
      if (this.inGenerator) return this.parseYield();

    case _name:
      var start = this.currentPos();
      var id = this.parseIdent(this.type !== _name);
      if (!this.canInsertSemicolon() && this.eat(_arrow)) {
        return this.parseArrowExpression(this.startNodeAt(start), [id]);
      }
      return id;

    case _regexp:
      var node = this.startNode();
      node.regex = {pattern: this.value.pattern, flags: this.value.flags};
      node.value = this.value.value;
      node.raw = this.input.slice(this.start, this.end);
      this.next();
      return this.finishNode(node, "Literal");

    case _num: case _string:
      var node = this.startNode();
      node.value = this.value;
      node.raw = this.input.slice(this.start, this.end);
      this.next();
      return this.finishNode(node, "Literal");

    case _null: case _true: case _false:
      var node = this.startNode();
      node.value = this.type.atomValue;
      node.raw = this.type.keyword;
      this.next();
      return this.finishNode(node, "Literal");

    case _parenL:
      return this.parseParenAndDistinguishExpression();

    case _bracketL:
      var node = this.startNode();
      this.next();
      // check whether this is array comprehension or regular array
      if (this.options.ecmaVersion >= 7 && this.type === _for) {
        return this.parseComprehension(node, false);
      }
      node.elements = this.parseExprList(_bracketR, true, true, refShorthandDefaultPos);
      return this.finishNode(node, "ArrayExpression");

    case _braceL:
      return this.parseObj(false, refShorthandDefaultPos);

    case _function:
      var node = this.startNode();
      this.next();
      return this.parseFunction(node, false);

    case _class:
      return this.parseClass(this.startNode(), false);

    case _new:
      return this.parseNew();

    case _backQuote:
      return this.parseTemplate();

    default:
      this.unexpected();
    }
  };

  pp.parseParenAndDistinguishExpression = function() {
    var start = this.currentPos(), val;
    if (this.options.ecmaVersion >= 6) {
      this.next();

      if (this.options.ecmaVersion >= 7 && this.type === _for) {
        return this.parseComprehension(this.startNodeAt(start), true);
      }

      var innerStart = this.currentPos(), exprList = [], first = true;
      var refShorthandDefaultPos = {start: 0}, spreadStart, innerParenStart;
      while (this.type !== _parenR) {
        first ? first = false : this.expect(_comma);
        if (this.type === _ellipsis) {
          spreadStart = this.start;
          exprList.push(this.parseRest());
          break;
        } else {
          if (this.type === _parenL && !innerParenStart) {
            innerParenStart = this.start;
          }
          exprList.push(this.parseMaybeAssign(false, refShorthandDefaultPos));
        }
      }
      var innerEnd = this.currentPos();
      this.expect(_parenR);

      if (!this.canInsertSemicolon() && this.eat(_arrow)) {
        if (innerParenStart) this.unexpected(innerParenStart);
        return this.parseArrowExpression(this.startNodeAt(start), exprList);
      }

      if (!exprList.length) this.unexpected(this.lastTokStart);
      if (spreadStart) this.unexpected(spreadStart);
      if (refShorthandDefaultPos.start) this.unexpected(refShorthandDefaultPos.start);

      if (exprList.length > 1) {
        val = this.startNodeAt(innerStart);
        val.expressions = exprList;
        this.finishNodeAt(val, "SequenceExpression", innerEnd);
      } else {
        val = exprList[0];
      }
    } else {
      val = this.parseParenExpression();
    }

    if (this.options.preserveParens) {
      var par = this.startNodeAt(start);
      par.expression = val;
      return this.finishNode(par, "ParenthesizedExpression");
    } else {
      return val;
    }
  };

  // New's precedence is slightly tricky. It must allow its argument
  // to be a `[]` or dot subscript expression, but not a call — at
  // least, not without wrapping it in parentheses. Thus, it uses the

  pp.parseNew = function() {
    var node = this.startNode();
    this.next();
    var start = this.currentPos();
    node.callee = this.parseSubscripts(this.parseExprAtom(), start, true);
    if (this.eat(_parenL)) node.arguments = this.parseExprList(_parenR, false);
    else node.arguments = empty;
    return this.finishNode(node, "NewExpression");
  };

  // Parse template expression.

  pp.parseTemplateElement = function() {
    var elem = this.startNode();
    elem.value = {
      raw: this.input.slice(this.start, this.end),
      cooked: this.value
    };
    this.next();
    elem.tail = this.type === _backQuote;
    return this.finishNode(elem, "TemplateElement");
  };

  pp.parseTemplate = function() {
    var node = this.startNode();
    this.next();
    node.expressions = [];
    var curElt = this.parseTemplateElement();
    node.quasis = [curElt];
    while (!curElt.tail) {
      this.expect(_dollarBraceL);
      node.expressions.push(this.parseExpression());
      this.expect(_braceR);
      node.quasis.push(curElt = this.parseTemplateElement());
    }
    this.next();
    return this.finishNode(node, "TemplateLiteral");
  };

  // Parse an object literal or binding pattern.

  pp.parseObj = function(isPattern, refShorthandDefaultPos) {
    var node = this.startNode(), first = true, propHash = {};
    node.properties = [];
    this.next();
    while (!this.eat(_braceR)) {
      if (!first) {
        this.expect(_comma);
        if (this.options.allowTrailingCommas && this.eat(_braceR)) break;
      } else first = false;

      var prop = this.startNode(), isGenerator, start;
      if (this.options.ecmaVersion >= 6) {
        prop.method = false;
        prop.shorthand = false;
        if (isPattern || refShorthandDefaultPos) {
          start = this.currentPos();
        }
        if (!isPattern) {
          isGenerator = this.eat(_star);
        }
      }
      this.parsePropertyName(prop);
      if (this.eat(_colon)) {
        prop.value = isPattern ? this.parseMaybeDefault() : this.parseMaybeAssign(false, refShorthandDefaultPos);
        prop.kind = "init";
      } else if (this.options.ecmaVersion >= 6 && this.type === _parenL) {
        if (isPattern) this.unexpected();
        prop.kind = "init";
        prop.method = true;
        prop.value = this.parseMethod(isGenerator);
      } else if (this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" &&
                 (prop.key.name === "get" || prop.key.name === "set") &&
                 (this.type != _comma && this.type != _braceR)) {
        if (isGenerator || isPattern) this.unexpected();
        prop.kind = prop.key.name;
        this.parsePropertyName(prop);
        prop.value = this.parseMethod(false);
      } else if (this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier") {
        prop.kind = "init";
        if (isPattern) {
          prop.value = this.parseMaybeDefault(start, prop.key);
        } else if (this.type === _eq && refShorthandDefaultPos) {
          if (!refShorthandDefaultPos.start)
            refShorthandDefaultPos.start = this.start;
          prop.value = this.parseMaybeDefault(start, prop.key);
        } else {
          prop.value = prop.key;
        }
        prop.shorthand = true;
      } else this.unexpected();

      this.checkPropClash(prop, propHash);
      node.properties.push(this.finishNode(prop, "Property"));
    }
    return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression");
  };

  pp.parsePropertyName = function(prop) {
    if (this.options.ecmaVersion >= 6) {
      if (this.eat(_bracketL)) {
        prop.computed = true;
        prop.key = this.parseExpression();
        this.expect(_bracketR);
        return;
      } else {
        prop.computed = false;
      }
    }
    prop.key = (this.type === _num || this.type === _string) ? this.parseExprAtom() : this.parseIdent(true);
  };

  // Initialize empty function node.

  pp.initFunction = function(node) {
    node.id = null;
    if (this.options.ecmaVersion >= 6) {
      node.generator = false;
      node.expression = false;
    }
  };

  // Parse a function declaration or literal (depending on the
  // `isStatement` parameter).

  pp.parseFunction = function(node, isStatement, allowExpressionBody) {
    this.initFunction(node);
    if (this.options.ecmaVersion >= 6) {
      node.generator = this.eat(_star);
    }
    if (isStatement || this.type === _name) {
      node.id = this.parseIdent();
    }
    this.expect(_parenL);
    node.params = this.parseBindingList(_parenR, false);
    this.parseFunctionBody(node, allowExpressionBody);
    return this.finishNode(node, isStatement ? "FunctionDeclaration" : "FunctionExpression");
  };

  // Parse object or class method.

  pp.parseMethod = function(isGenerator) {
    var node = this.startNode();
    this.initFunction(node);
    this.expect(_parenL);
    node.params = this.parseBindingList(_parenR, false);
    var allowExpressionBody;
    if (this.options.ecmaVersion >= 6) {
      node.generator = isGenerator;
      allowExpressionBody = true;
    } else {
      allowExpressionBody = false;
    }
    this.parseFunctionBody(node, allowExpressionBody);
    return this.finishNode(node, "FunctionExpression");
  };

  // Parse arrow function expression with given parameters.

  pp.parseArrowExpression = function(node, params) {
    this.initFunction(node);
    node.params = this.toAssignableList(params, true);
    this.parseFunctionBody(node, true);
    return this.finishNode(node, "ArrowFunctionExpression");
  };

  // Parse function body and check parameters.

  pp.parseFunctionBody = function(node, allowExpression) {
    var isExpression = allowExpression && this.type !== _braceL;

    if (isExpression) {
      node.body = this.parseMaybeAssign();
      node.expression = true;
    } else {
      // Start a new scope with regard to labels and the `inFunction`
      // flag (restore them to their old value afterwards).
      var oldInFunc = this.inFunction, oldInGen = this.inGenerator, oldLabels = this.labels;
      this.inFunction = true; this.inGenerator = node.generator; this.labels = [];
      node.body = this.parseBlock(true);
      node.expression = false;
      this.inFunction = oldInFunc; this.inGenerator = oldInGen; this.labels = oldLabels;
    }

    // If this is a strict mode function, verify that argument names
    // are not repeated, and it does not try to bind the words `eval`
    // or `arguments`.
    if (this.strict || !isExpression && node.body.body.length && this.isUseStrict(node.body.body[0])) {
      var nameHash = {};
      if (node.id)
        this.checkFunctionParam(node.id, {});
      for (var i = 0; i < node.params.length; i++)
        this.checkFunctionParam(node.params[i], nameHash);
    }
  };

  // Parse a class declaration or literal (depending on the
  // `isStatement` parameter).

  pp.parseClass = function(node, isStatement) {
    this.next();
    node.id = this.type === _name ? this.parseIdent() : isStatement ? this.unexpected() : null;
    node.superClass = this.eat(_extends) ? this.parseExprSubscripts() : null;
    var classBody = this.startNode();
    classBody.body = [];
    this.expect(_braceL);
    while (!this.eat(_braceR)) {
      if (this.eat(_semi)) continue;
      var method = this.startNode();
      var isGenerator = this.eat(_star);
      this.parsePropertyName(method);
      if (this.type !== _parenL && !method.computed && method.key.type === "Identifier" &&
          method.key.name === "static") {
        if (isGenerator) this.unexpected();
        method['static'] = true;
        isGenerator = this.eat(_star);
        this.parsePropertyName(method);
      } else {
        method['static'] = false;
      }
      if (this.type !== _parenL && !method.computed && method.key.type === "Identifier" &&
          (method.key.name === "get" || method.key.name === "set")) {
        if (isGenerator) this.unexpected();
        method.kind = method.key.name;
        this.parsePropertyName(method);
      } else {
        method.kind = "";
      }
      method.value = this.parseMethod(isGenerator);
      classBody.body.push(this.finishNode(method, "MethodDefinition"));
    }
    node.body = this.finishNode(classBody, "ClassBody");
    return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
  };

  // Parses a comma-separated list of expressions, and returns them as
  // an array. `close` is the token type that ends the list, and
  // `allowEmpty` can be turned on to allow subsequent commas with
  // nothing in between them to be parsed as `null` (which is needed
  // for array literals).

  pp.parseExprList = function(close, allowTrailingComma, allowEmpty, refShorthandDefaultPos) {
    var elts = [], first = true;
    while (!this.eat(close)) {
      if (!first) {
        this.expect(_comma);
        if (allowTrailingComma && this.options.allowTrailingCommas && this.eat(close)) break;
      } else first = false;

      if (allowEmpty && this.type === _comma) {
        elts.push(null);
      } else {
        if (this.type === _ellipsis)
          elts.push(this.parseSpread(refShorthandDefaultPos));
        else
          elts.push(this.parseMaybeAssign(false, refShorthandDefaultPos));
      }
    }
    return elts;
  };

  // Parse the next token as an identifier. If `liberal` is true (used
  // when parsing properties), it will also convert keywords into
  // identifiers.

  pp.parseIdent = function(liberal) {
    var node = this.startNode();
    if (liberal && this.options.forbidReserved == "everywhere") liberal = false;
    if (this.type === _name) {
      if (!liberal &&
          (this.options.forbidReserved &&
           (this.options.ecmaVersion === 3 ? isReservedWord3 : isReservedWord5)(this.value) ||
           this.strict && isStrictReservedWord(this.value)) &&
          this.input.slice(this.start, this.end).indexOf("\\") == -1)
        this.raise(this.start, "The keyword '" + this.value + "' is reserved");
      node.name = this.value;
    } else if (liberal && this.type.keyword) {
      node.name = this.type.keyword;
    } else {
      this.unexpected();
    }
    this.next();
    return this.finishNode(node, "Identifier");
  };

  // Parses module export declaration.

  pp.parseExport = function(node) {
    this.next();
    // export var|const|let|function|class ...;
    if (this.type === _var || this.type === _const || this.type === _let || this.type === _function || this.type === _class) {
      node.declaration = this.parseStatement(true);
      node['default'] = false;
      node.specifiers = null;
      node.source = null;
    } else
    // export default ...;
    if (this.eat(_default)) {
      var expr = this.parseMaybeAssign();
      if (expr.id) {
        switch (expr.type) {
          case "FunctionExpression": expr.type = "FunctionDeclaration"; break;
          case "ClassExpression": expr.type = "ClassDeclaration"; break;
        }
      }
      node.declaration = expr;
      node['default'] = true;
      node.specifiers = null;
      node.source = null;
      this.semicolon();
    } else {
      // export * from '...';
      // export { x, y as z } [from '...'];
      var isBatch = this.type === _star;
      node.declaration = null;
      node['default'] = false;
      node.specifiers = this.parseExportSpecifiers();
      if (this.eatContextual("from")) {
        node.source = this.type === _string ? this.parseExprAtom() : this.unexpected();
      } else {
        if (isBatch) this.unexpected();
        node.source = null;
      }
      this.semicolon();
    }
    return this.finishNode(node, "ExportDeclaration");
  };

  // Parses a comma-separated list of module exports.

  pp.parseExportSpecifiers = function() {
    var nodes = [], first = true;
    if (this.type === _star) {
      // export * from '...'
      var node = this.startNode();
      this.next();
      nodes.push(this.finishNode(node, "ExportBatchSpecifier"));
    } else {
      // export { x, y as z } [from '...']
      this.expect(_braceL);
      while (!this.eat(_braceR)) {
        if (!first) {
          this.expect(_comma);
          if (this.options.allowTrailingCommas && this.eat(_braceR)) break;
        } else first = false;

        var node = this.startNode();
        node.id = this.parseIdent(this.type === _default);
        node.name = this.eatContextual("as") ? this.parseIdent(true) : null;
        nodes.push(this.finishNode(node, "ExportSpecifier"));
      }
    }
    return nodes;
  };

  // Parses import declaration.

  pp.parseImport = function(node) {
    this.next();
    // import '...';
    if (this.type === _string) {
      node.specifiers = [];
      node.source = this.parseExprAtom();
      node.kind = "";
    } else {
      node.specifiers = this.parseImportSpecifiers();
      this.expectContextual("from");
      node.source = this.type === _string ? this.parseExprAtom() : this.unexpected();
    }
    this.semicolon();
    return this.finishNode(node, "ImportDeclaration");
  };

  // Parses a comma-separated list of module imports.

  pp.parseImportSpecifiers = function() {
    var nodes = [], first = true;
    if (this.type === _name) {
      // import defaultObj, { x, y as z } from '...'
      var node = this.startNode();
      node.id = this.parseIdent();
      this.checkLVal(node.id, true);
      node.name = null;
      node['default'] = true;
      nodes.push(this.finishNode(node, "ImportSpecifier"));
      if (!this.eat(_comma)) return nodes;
    }
    if (this.type === _star) {
      var node = this.startNode();
      this.next();
      this.expectContextual("as");
      node.name = this.parseIdent();
      this.checkLVal(node.name, true);
      nodes.push(this.finishNode(node, "ImportBatchSpecifier"));
      return nodes;
    }
    this.expect(_braceL);
    while (!this.eat(_braceR)) {
      if (!first) {
        this.expect(_comma);
        if (this.options.allowTrailingCommas && this.eat(_braceR)) break;
      } else first = false;

      var node = this.startNode();
      node.id = this.parseIdent(true);
      node.name = this.eatContextual("as") ? this.parseIdent() : null;
      this.checkLVal(node.name || node.id, true);
      node['default'] = false;
      nodes.push(this.finishNode(node, "ImportSpecifier"));
    }
    return nodes;
  };

  // Parses yield expression inside generator.

  pp.parseYield = function() {
    var node = this.startNode();
    this.next();
    if (this.eat(_semi) || this.canInsertSemicolon()) {
      node.delegate = false;
      node.argument = null;
    } else {
      node.delegate = this.eat(_star);
      node.argument = this.parseMaybeAssign();
    }
    return this.finishNode(node, "YieldExpression");
  };

  // Parses array and generator comprehensions.

  pp.parseComprehension = function(node, isGenerator) {
    node.blocks = [];
    while (this.type === _for) {
      var block = this.startNode();
      this.next();
      this.expect(_parenL);
      block.left = this.parseBindingAtom();
      this.checkLVal(block.left, true);
      this.expectContextual("of");
      block.right = this.parseExpression();
      this.expect(_parenR);
      node.blocks.push(this.finishNode(block, "ComprehensionBlock"));
    }
    node.filter = this.eat(_if) ? this.parseParenExpression() : null;
    node.body = this.parseExpression();
    this.expect(isGenerator ? _parenR : _bracketR);
    node.generator = isGenerator;
    return this.finishNode(node, "ComprehensionExpression");
  };
});
