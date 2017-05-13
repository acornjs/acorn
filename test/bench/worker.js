'use strict';

importScripts('common.js');

const Benchmark = req('benchmark').runInContext({
  _: req('lodash')
});

postMessage({
  parserNames,
  inputNames
});

function getCell(bench) {
  return parserNames.indexOf(bench.name);
}

onmessage = ({ data: indices }) => {
  // Using block to workaround https://github.com/Microsoft/ChakraCore/issues/2606
  inputs.then(inputs => {
    let chosenParsers =
      parserNames
      .filter((_, i) => indices.includes(i))
      .map(name => Object.assign(parsers[name](), { name }));

    postMessage({
      type: 'versions',
      versions: chosenParsers.map(parser => parser.version)
    });

    inputs.forEach((input, row) => {
      let suite = new Benchmark.Suite();

      chosenParsers.forEach(({ name, parse }) => {
        suite.add(name, () => parse(input));
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
};
