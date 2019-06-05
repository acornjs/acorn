var tests = [];

exports.test = function(code, ast, options) {
  tests.push({code: code, ast: ast, options: options});
};
exports.testFail = function(code, message, options) {
  tests.push({code: code, error: message, options: options});
};
exports.testAssert = function(code, assert, options) {
  tests.push({code: code, assert: assert, options: options});
};

exports.runTests = function(config, callback) {
  var parse = config.parse;

  for (var i = 0; i < tests.length; ++i) {
    var test = tests[i];
    if (config.filter && !config.filter(test)) continue;
    var testOpts = test.options || {locations: true};
    if (!testOpts.ecmaVersion) testOpts.ecmaVersion = 5;
    var expected = {};
    if (expected.onComment = testOpts.onComment)
      testOpts.onComment = []
    if (expected.onToken = testOpts.onToken)
      testOpts.onToken = [];

    try {
      var ast = parse(test.code, testOpts);
    } catch(e) {
      if (!(e instanceof SyntaxError)) { console.log(e.stack); throw e; }
      if (test.error) {
        if (test.error.charAt(0) == "~" ? e.message.indexOf(test.error.slice(1)) > -1 : e.message == test.error)
          callback("ok", test.code);
        else
          callback("fail", test.code, "Expected error message: " + test.error + "\nGot error message: " + e.message);
      } else {
        callback("error", test.code, e.message || e.toString());
      }
      continue
    }

    if (test.error) {
      if (config.loose) callback("ok", test.code);
      else callback("fail", test.code, "Expected error message: " + test.error + "\nBut parsing succeeded.");
    } else if (test.assert) {
      var error = test.assert(ast);
      if (error) callback("fail", test.code, "\n  Assertion failed:\n " + error);
      else callback("ok", test.code);
    } else {
      var mis = misMatch(test.ast, ast);
      for (var name in expected) {
        if (mis) break;
        if (expected[name]) {
          mis = misMatch(expected[name], testOpts[name]);
          testOpts[name] = expected[name];
        }
      }
      if (mis) callback("fail", test.code, mis);
      else callback("ok", test.code);
    }
  }
};

function ppJSON(v) { return v instanceof RegExp ? v.toString() : (typeof v == "bigint" ? v.toString() : JSON.stringify(v, null, 2)); }
function addPath(str, pt) {
  if (str.charAt(str.length-1) == ")")
    return str.slice(0, str.length-1) + "/" + pt + ")";
  return str + " (" + pt + ")";
}

var misMatch = exports.misMatch = function(exp, act) {
  if (!exp || !act || (typeof exp != "object") || (typeof act != "object")) {
    if (exp !== act && typeof exp != "function")
      return ppJSON(exp) + " !== " + ppJSON(act);
  } else if (exp instanceof RegExp || act instanceof RegExp) {
    var left = ppJSON(exp), right = ppJSON(act);
    if (left !== right) return left + " !== " + right;
  } else if (exp.splice) {
    if (!act.slice) return ppJSON(exp) + " != " + ppJSON(act);
    if (act.length != exp.length) return "array length mismatch " + exp.length + " != " + act.length;
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

