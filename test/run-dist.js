var IS_BROWSER = require('is-browser');

var runner = require('./runner.js');

var driver = require("./driver.js");
require("./tests.js");
require("./tests-harmony.js");

var acorn = require("../dist/acorn");
require("../dist/acorn_loose");

runner(acorn, driver, IS_BROWSER ? 'Test Browserify' : 'Test Dist');
