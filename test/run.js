(function () {
  let driver = require("./driver.js");
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
  require("./tests-export-named.js");
  require("./tests-export-all-as-ns-from-source.js");
  require("./tests-import-meta.js");
  require("./tests-nullish-coalescing.js");
  require("./tests-optional-chaining.js");
  require("./tests-logical-assignment-operators.js");
  require("./tests-numeric-separators.js");
  require("./tests-class-features-2022.js");
  require("./tests-module-string-names.js");
  require("./tests-import-attributes.js");
  require("./tests-using.js");
  require("./tests-commonjs.js");
  let acorn = require("../acorn");
  let acorn_loose = require("../acorn-loose");

  let htmlLog = typeof document === "object" && document.getElementById("log");
  let htmlGroup = htmlLog;

  function group(name) {
    if (htmlGroup) {
      let parentGroup = htmlGroup;
      htmlGroup = document.createElement("ul");
      let item = document.createElement("li");
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
      let elem = document.createElement("li");
      elem.innerHTML = "<b>" + title + "</b> " + message;
      htmlGroup.appendChild(elem);
    }
    if (typeof console === "object") console.log(title, message);
  }

  var stats,
    modes = {
      Normal: {
        config: {
          parse: acorn.parse,
        },
      },
      Loose: {
        config: {
          parse: acorn_loose.parse,
          loose: true,
          filter: function (test) {
            let opts = test.options || {};
            return opts.loose !== false;
          },
        },
      },

      // Test whether the test for `sourceType: 'script'` produces the same result for `'commonjs'`.
      "Normal with sourceType: commonjs": {
        config: {
          parse: (code, option) =>
            acorn.parse(
              code,
              Object.assign({}, option, { sourceType: "commonjs" })
            ),
          filter: function (test) {
            let opts = test.options || {};
            return (
              opts.commonjs !== false &&
              !opts.allowAwaitOutsideFunction &&
              (!opts.sourceType || opts.sourceType === "script")
            );
          },
        },
      },
      "Loose with sourceType: commonjs": {
        config: {
          parse: (code, option) =>
            acorn_loose.parse(
              code,
              Object.assign({}, option, { sourceType: "commonjs" })
            ),
          loose: true,
          filter: function (test) {
            let opts = test.options || {};
            if (opts.loose === false) return false;
            return (
              opts.commonjs !== false &&
              !opts.allowAwaitOutsideFunction &&
              (!opts.sourceType || opts.sourceType === "script")
            );
          },
        },
      },
    };

  function report(state, code, message) {
    if (state !== "ok") {
      ++stats.failed;
      log(code, message);
    }
    ++stats.testsRun;
  }

  group("Errors");

  for (var name in modes) {
    group(name);
    let mode = modes[name];
    stats = mode.stats = { testsRun: 0, failed: 0 };
    let t0 = +new Date();
    driver.runTests(mode.config, report);
    mode.stats.duration = +new Date() - t0;
    groupEnd();
  }

  groupEnd();

  function outputStats(name, stats) {
    log(
      name + ":",
      stats.testsRun +
        " tests run in " +
        stats.duration +
        "ms; " +
        (stats.failed ? stats.failed + " failures." : "all passed.")
    );
  }

  let total = { testsRun: 0, failed: 0, duration: 0 };

  group("Stats");

  for (var name in modes) {
    var stats = modes[name].stats;
    outputStats(name + " parser", stats);
    for (let key in stats) total[key] += stats[key];
  }

  outputStats("Total", total);

  groupEnd();

  if (total.failed && typeof process === "object") {
    process.stdout.write("", function () {
      process.exit(1);
    });
  }
})();
