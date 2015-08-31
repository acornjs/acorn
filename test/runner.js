(function () {

  var htmlLog = typeof document === "object" && document.getElementById('log');
  var htmlGroup = htmlLog;
  var logIndent = '';

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
    } else if (typeof console === 'object') {
      console.log(logIndent + name);
      logIndent += '  ';
    }
  }

  function groupEnd() {
    if (htmlGroup) {
      htmlGroup = htmlGroup.parentElement.parentElement;
    }
    if (typeof console === "object" && console.groupEnd) {
      console.groupEnd(name);
    } else if (typeof console === 'object') {
      logIndent = logIndent.substr(0, logIndent.length - 2);
    }
  }

  function log(title, message) {
    if (htmlGroup) {
      var elem = document.createElement("li");
      elem.innerHTML = "<b>" + title + "</b> " + message;
      htmlGroup.appendChild(elem);
    }
    if (typeof console === "object") console.log(logIndent + title, message);
  }

  function run(acorn, driver, title) {

    if (title) group(title);

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
            if (opts.loose === false) return false;
            return (opts.ecmaVersion || 5) <= 6;
          }
        }
      }
    };

    function report(state, code, message) {
      if (state != "ok") {++stats.failed; log(code, message);}
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
      if (mode.stats.failed === 0) {
        log("", "all passed");
      }
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
    
    if (title) groupEnd();
  }

  if (typeof require !== 'undefined') {
    module.exports = run;
  } else {
    window.run = run;
  }
}());