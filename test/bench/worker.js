'use strict';

importScripts('common.js');
importScripts(`https://unpkg.com/lodash`);
importScripts(`https://unpkg.com/benchmark`);

postMessage({
  parserNames,
  inputNames
});

onmessage = () => inputs.then(inputs => {
  inputs.forEach((input, row) => {
    let suite = new Benchmark.Suite();

    parserNames.forEach(parserName => {
      let parse = parsers[parserName];

      suite.add(parserName, function () {
        parse(input);
      });
    });

    let cell = 0;

    postMessage({
      type: 'start',
      row,
      cell
    });

    suite
    .on('cycle', ({ target: bench }) => {
      console.log(bench.toString());

      postMessage({
        type: 'cycle',
        row,
        cell: cell++,
        text: `${bench.hz.toFixed(2)} ops/sec`
      });
    })
    .on('error', ({ target: bench }) => {
      console.error(bench.error);

      postMessage({
        type: 'error',
        row,
        cell: cell++,
        text: bench.error.name
      });
    })
    .on('complete', ({ target }) => {
      let [slowest, fastest] =
        ['slowest', 'fastest']
        .map(type => (
          suite.filter(type)
          .map('name')
          .map(name => parserNames.indexOf(name))
        ));

      postMessage({
        type: 'complete',
        row,
        slowest,
        fastest
      });
    })
    .run()
  });
}).catch(console.error);
