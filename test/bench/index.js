'use strict';

const BenchTable = require('benchtable');
const { parsers, parserNames, inputs, inputNames } = require('./common');

let suite = new BenchTable('parsers', { isTransposed: true });

parserNames.forEach(parserName => {
  suite.addFunction(parserName, parsers[parserName]);
});

inputs.then(inputs => {
  inputNames.forEach((inputName, i) => {
    suite.addInput(inputName, [inputs[i]]);
  });

  suite
  .on('cycle', function (event) {
    console.log(event.target.toString());
  })
  .on('error', function (event) {
    throw event.target.error;
  })
  .on('complete', function () {
    console.log(suite.table.toString());
  })
  .run()
}).catch(console.error);
