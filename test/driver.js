(function(exports) {
  var tests = [];

  function pushTest(test) {
    if (!test.options || !test.options.ecmaVersion) {
      throw new Error("Tests must specify options with ecmaVersion")
    }
    tests.push(test);
  }

  exports.test = function(code, options) {
    pushTest({code: code, options: options});
  };
  exports.testFail = function(code, options) {
    pushTest({code: code, options: options});
  };
  exports.testAssert = function(code, assert, options) {
    pushTest({code: code, assert: assert, options: options});
  };

  exports.runTests = function(config, snapshot, callback) {
    var parse = config.parse;

    for (var i = 0; i < tests.length; ++i) {
      var test = tests[i];
      if (config.filter && !config.filter(test)) continue;
      var expected = {};
      var testOpts = test.options;
      if (expected.onComment = testOpts.onComment)
        testOpts.onComment = []
      if (expected.onToken = testOpts.onToken)
        testOpts.onToken = [];

      var subCategory = "es" + testOpts.ecmaVersion;
      if (testOpts.sourceType === 'module') {
        subCategory += '-module';
      }
      if (testOpts.preserveParens) {
        subCategory += '-parens';
      }
      if (config.loose) {
        subCategory += "-loose";
      }

      var snapshotCategory = snapshot[subCategory] || (snapshot[subCategory] = {});
      var testSnapshot = snapshotCategory[test.code];

      try {
        var ast = parse(test.code, testOpts);
      } catch(e) {
        if (!(e instanceof SyntaxError)) { console.error(e.stack); throw e; }
        ast = {
          type: "Error",
          message: e.message
        };
        continue
      }

      if (test.assert) {
        var error = test.assert(ast);
        if (error) {
          callback("fail", test.code, "\n  Assertion failed:\n " + error);
        } else {
          callback("ok", test.code);
        }
      } else {
        if (testSnapshot) {
          var mis = misMatch(testSnapshot, ast);
          for (var name in expected) {
            if (mis) break;
            mis = misMatch(expected[name], testOpts[name]);
          }
          if (mis) {
            mis = mis.msg + " (ast" + mis.path + ")";
            callback("fail", test.code, mis);
          } else {
            callback("ok", test.code);
          }
        } else {
          console.log(subCategory, test.code)
          callback("new", test.code)
        }
        snapshotCategory[test.code] = ast
      }
    }
  };

  function ppJSON(v) { return v instanceof RegExp ? "{}" : JSON.stringify(v, null, 2); }
  function addPath(mis, part) {
    if ((part | 0) == part) {
      mis.path += "[" + part + "]";
    } else {
      mis.path += "." + part;
    }
    return mis;
  }

  var misMatch = exports.misMatch = function(exp, act) {
    if (act instanceof RegExp) return;
    if (!exp || !act || (typeof exp != "object") || (typeof act != "object")) {
      if (exp !== act && typeof exp != "function")
        return {
          msg: ppJSON(exp) + " !== " + ppJSON(act),
          path: ""
        };
    } else if (exp.splice) {
      if (!act.slice) return {
        msg: ppJSON(exp) + " != " + ppJSON(act),
        path: ""
      };
      if (act.length != exp.length) return {
        msg: "array length mismatch " + exp.length + " != " + act.length,
        path: ""
      };
      for (var i = 0; i < act.length; ++i) {
        var mis = misMatch(exp[i], act[i]);
        if (mis) return addPath(mis, i);
      }
    } else {
      for (var prop in exp) {
        var mis = misMatch(exp[prop], act[prop]);
        if (mis) return addPath(mis, prop);
      }
    }
  };

  function mangle(ast) {
    if (typeof ast != "object" || !ast) return;
    if (ast.slice) {
      for (var i = 0; i < ast.length; ++i) mangle(ast[i]);
    } else {
      var loc = ast.start && ast.end && {start: ast.start, end: ast.end};
      if (loc) { delete ast.start; delete ast.end; }
      for (var name in ast) if (ast.hasOwnProperty(name)) mangle(ast[name]);
      if (loc) ast.loc = loc;
    }
  }

  exports.printTests = function() {
    var out = "";
    for (var i = 0; i < tests.length; ++i) {
      if (tests[i].error) continue;
      mangle(tests[i].ast);
      out += "test(" + JSON.stringify(tests[i].code) + ", " + JSON.stringify(tests[i].ast, null, 2) + ");\n\n";
    }
    document.body.innerHTML = "";
    document.body.appendChild(document.createElement("pre")).appendChild(document.createTextNode(out));
  };
})(typeof exports == "undefined" ? window : exports);
