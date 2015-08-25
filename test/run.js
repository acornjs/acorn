'use strict';

var runner = require('./runner.js');

var driver = require("./driver.js");
require("./tests.js");
require("./tests-harmony.js");

require("babel-core/register");
var acorn = require("../src");
require("../src/loose");

runner(acorn, driver, 'Test Source');
