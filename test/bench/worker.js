'use strict';

importScripts('common.js');
importScripts(`https://unpkg.com/lodash`);
importScripts(`https://unpkg.com/benchmark`);

postMessage({
  parserNames,
  inputNames
});

function getCell(bench) {
  return parserNames.indexOf(bench.name);
}

onmessage = ({ data: indices }) => inputs.then(inputs => {
  let chosenParsers = parserNames.filter((_, i) => indices.includes(i));

  inputs.forEach((input, row) => {
    let suite = new Benchmark.Suite();

    chosenParsers.forEach(parserName => {
      let parse = parsers[parserName];
      suite.add(parserName, () => parse(input));
    });

    let indicesIter = indices[Symbol.iterator]();

    console.group(`Parsing ${inputNames[row]}`);

    postMessage({
      type: 'start',
      row,
      cell: indicesIter.next().value
    });

    function reportCell(bench, type, text) {
      postMessage({
        type,
        row,
        cell: getCell(bench),
        nextCell: indicesIter.next().value,
        text
      });
    }

    suite
    .on('cycle', ({ target: bench }) => {
      console.log(bench.toString());
      reportCell(bench, 'cycle', `${bench.hz.toFixed(2)} ops/sec`);
    })
    .on('error', ({ target: bench }) => {
      console.error(bench.error);
      reportCell(bench, 'error', bench.error.name);
    })
    .on('complete', ({ target }) => {
      postMessage({
        type: 'complete',
        row,
        slowest: suite.filter('slowest').map(getCell),
        fastest: suite.filter('fastest').map(getCell)
      });
    })
    .run();

    console.groupEnd();
  });
}).catch(console.error);
