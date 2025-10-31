import * as driver from "./driver.js"
import "./tests.js";
import "./tests-harmony.js";
import "./tests-es7.js";
import "./tests-asyncawait.js";
import "./tests-await-top-level.js";
import "./tests-trailing-commas-in-func.js";
import "./tests-template-literal-revision.js";
import "./tests-directive.js";
import "./tests-rest-spread-properties.js";
import "./tests-async-iteration.js";
import "./tests-regexp.js";
import "./tests-regexp-2018.js";
import "./tests-regexp-2020.js";
import "./tests-regexp-2022.js";
import "./tests-regexp-2024.js";
import "./tests-regexp-2025.js";
import "./tests-json-superset.js";
import "./tests-optional-catch-binding.js";
import "./tests-bigint.js";
import "./tests-dynamic-import.js";
import "./tests-export-named.js";
import "./tests-export-all-as-ns-from-source.js";
import "./tests-import-meta.js";
import "./tests-nullish-coalescing.js";
import "./tests-optional-chaining.js";
import "./tests-logical-assignment-operators.js";
import "./tests-numeric-separators.js";
import "./tests-class-features-2022.js";
import "./tests-module-string-names.js";
import "./tests-import-attributes.js";
import "./tests-using.js";
import "./tests-commonjs.js";
import * as acorn from "../acorn/src/index.js";
import * as acorn_loose from "../acorn-loose/src/index.js";

var htmlLog = typeof document === "object" && document.getElementById('log');
var htmlGroup = htmlLog;

function group(name) {
  if (htmlGroup) {
    var parentGroup = htmlGroup;
    htmlGroup = document.createElement("ul");
    var item = document.createElement("li");
    item.textContent = name;
    item.appendChild(htmlGroup);
    parentGroup.appendChild(item);
  }
  if (typeof console === "object" && console.group) {
    console.group(name);
  }
}

function groupEnd() {
  if (htmlGroup) {
    htmlGroup = htmlGroup.parentElement.parentElement;
  }
  if (typeof console === "object" && console.groupEnd) {
    console.groupEnd(name);
  }
}

function log(title, message) {
  if (htmlGroup) {
    var elem = document.createElement("li");
    elem.innerHTML = "<b>" + title + "</b> " + message;
    htmlGroup.appendChild(elem);
  }
  if (typeof console === "object") console.log(title, message);
}

var stats, modes = {
  Normal: {
    config: {
      parse: acorn.parse
    }
  },
  Loose: {
    config: {
      parse: acorn_loose.parse,
      loose: true,
      filter: function (test) {
        var opts = test.options || {};
        return opts.loose !== false;
      }
    }
  },

  // Test whether the test for `sourceType: 'script'` produces the same result for `'commonjs'`.
  'Normal with sourceType: commonjs': {
    config: {
      parse: (code, option) => acorn.parse(code, Object.assign({}, option, { sourceType: 'commonjs' })),
      filter: function (test) {
        var opts = test.options || {};
        return opts.commonjs !== false && !opts.allowAwaitOutsideFunction && (!opts.sourceType || opts.sourceType === 'script');
      }
    }
  },
  'Loose with sourceType: commonjs': {
    config: {
      parse: (code, option) => acorn_loose.parse(code, Object.assign({}, option, { sourceType: 'commonjs' })),
      loose: true,
      filter: function (test) {
        var opts = test.options || {};
        if (opts.loose === false) return false;
        return opts.commonjs !== false && !opts.allowAwaitOutsideFunction && (!opts.sourceType || opts.sourceType === 'script');
      }
    }
  }
};

function report(state, code, message) {
  if (state !== "ok") {++stats.failed; log(code, message);}
  ++stats.testsRun;
}

group("Errors");

for (var name in modes) {
  group(name);
  var mode = modes[name];
  stats = mode.stats = {testsRun: 0, failed: 0};
  var t0 = +new Date;
  driver.runTests(mode.config, report);
  mode.stats.duration = +new Date - t0;
  groupEnd();
}

groupEnd();

function outputStats(name, stats) {
  log(name + ":", stats.testsRun + " tests run in " + stats.duration + "ms; " +
    (stats.failed ? stats.failed + " failures." : "all passed."));
}

var total = {testsRun: 0, failed: 0, duration: 0};

group("Stats");

for (var name in modes) {
  var stats = modes[name].stats;
  outputStats(name + " parser", stats);
  for (var key in stats) total[key] += stats[key];
}

outputStats("Total", total);

groupEnd();

if (total.failed && typeof process === "object") {
  process.stdout.write("", function() {
    process.exit(1);
  });
}
