'use strict';

const BenchTable = require('benchtable');
const { parsers, parserNames, inputs, inputNames } = require('./common');

const yargs = require('yargs')
  .help()
  .alias('?', 'help');

const optionNames = new Map(parserNames.map(name => [
  name,

  name
  .toLowerCase()
  .replace(/[^a-z]+/g, '-')
  .replace(/(^-|-$)/g, '')
]));

parserNames.forEach(name => {
  yargs.option(optionNames.get(name), {
    group: 'Benchmark parsers:',
    describe: name,
    type: 'boolean',
    default: name.startsWith('Acorn') || undefined
  });
});

const { argv } = yargs;

let suite = new BenchTable('parsers', { isTransposed: true });

parserNames.forEach(name => {
  if (!argv[optionNames.get(name)]) {
    return;
  }
  const { version, parse } = parsers[name]();
  if (version) {
    name += ` ${version}`;
  }
  console.log(`Enabled ${name}`);
  suite.addFunction(name, parse);
});

console.log('Running benchmarks...');

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
