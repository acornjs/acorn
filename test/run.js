(function() {
  var driver, acorn, snapshot;

  if (typeof require !== "undefined") {
    driver = require("./driver.js");
    require("./tests.js");
    require("./tests-harmony.js");
    require("./tests-es7.js");
    require("./tests-asyncawait.js");
    require("./tests-trailing-commas-in-func.js");
    require("./tests-template-literal-revision.js");
    acorn = require("../dist/acorn");
    require("../dist/acorn_loose");
    snapshot = require("./snapshot.js");
  } else {
    driver = window;
    acorn = window.acorn;
    snapshot = window.snapshot;
  }

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
        parse: acorn.parse_dammit,
        loose: true,
        filter: function (test) {
          var opts = test.options || {};
          return opts.loose !== false;
        }
      }
    }
  };

  function report(state, code, message) {
    if (state == "new") {
      ++stats.added;
      log(code, "new test");
    } else if (state != "ok") {
      ++stats.failed;
      log(code, message);
    }
    ++stats.testsRun;
  }

  group("Errors");

  for (var name in modes) {
    group(name);
    var mode = modes[name];
    stats = mode.stats = {testsRun: 0, failed: 0, added: 0};
    var t0 = +new Date;
    driver.runTests(mode.config, snapshot, report);
    mode.stats.duration = +new Date - t0;
    groupEnd();
  }

  groupEnd();

  var needsUpdate = false;

  function outputStats(name, stats) {
    log(name + ":", stats.testsRun + " tests run in " + stats.duration + "ms" +
      (stats.failed ? "; " + stats.failed + " failures" : "") +
      (stats.added ? "; " + stats.added + " new tests" : "") +
      (stats.failed || stats.added ? "" : "; all passed") +
      ".");
  }

  var total = {testsRun: 0, failed: 0, duration: 0, added: 0};

  group("Stats");

  for (var name in modes) {
    var stats = modes[name].stats;
    outputStats(name + " parser", stats);
    for (var key in stats) total[key] += stats[key];
  }

  outputStats("Total", total);

  groupEnd();

  if (typeof process === "object" && (total.failed || total.added)) {
    if (process.argv.indexOf('--update') >= 0) {
      require("fs").writeFileSync(
        __dirname + "/snapshot.js",

        "var snapshot = " +
        JSON.stringify(snapshot, function (key, value) {
          if (value instanceof RegExp) {
            return;
          }
          return value;
        }, 2)
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029')
        .replace(/^(      \s*)"(.*?)":/igm, '$1$2:') +
        ";\n" +
        "\n" +
        "if (typeof module !== 'undefined') module.exports = snapshot;"
      );
      console.log("Updated snapshot.")
    } else {
      console.log(
        "New or failed test found. " +
        "Run with --update to update snapshot if these changes are intentional."
      )
      process.stdout.write("", function() {
        process.exit(1);
      });
    }
  }
})();
