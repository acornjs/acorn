(function() {
  var driver = require("./driver.js")
  require("./tests.js");
  require("./tests-harmony.js");
  require("./tests-es7.js");
  require("./tests-asyncawait.js");
  require("./tests-await-top-level.js");
  require("./tests-trailing-commas-in-func.js");
  require("./tests-template-literal-revision.js");
  require("./tests-directive.js");
  require("./tests-rest-spread-properties.js");
  require("./tests-async-iteration.js");
  require("./tests-regexp.js");
  require("./tests-regexp-2018.js");
  require("./tests-regexp-2020.js");
  require("./tests-regexp-2022.js");
  require("./tests-regexp-2024.js");
  require("./tests-regexp-2025.js");
  require("./tests-json-superset.js");
  require("./tests-optional-catch-binding.js");
  require("./tests-bigint.js");
  require("./tests-dynamic-import.js");
  require("./tests-export-all-as-ns-from-source.js");
  require("./tests-import-meta.js");
  require("./tests-nullish-coalescing.js");
  require("./tests-optional-chaining.js");
  require("./tests-logical-assignment-operators.js");
  require("./tests-numeric-separators.js");
  require("./tests-class-features-2022.js");
  require("./tests-module-string-names.js");
  var acorn = require("../acorn")
  var acorn_loose = require("../acorn-loose")

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
})();
