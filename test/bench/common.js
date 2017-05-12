'use strict';

const isWorker = typeof importScripts !== 'undefined';

if (isWorker) {
  importScripts('https://unpkg.com/esprima');
  importScripts('../../dist/acorn.js');
  var acornDev = acorn;
  var acorn = undefined;
  importScripts('https://unpkg.com/acorn');
  importScripts('https://unpkg.com/traceur/bin/traceur.js');
  importScripts('https://unpkg.com/typescript');
} else {
  var fs = require('fs');
  var esprima = require('esprima');
  var acornDev = require('../../dist/acorn');
  var acorn = require('acorn');
  require('traceur'); // yeah, it creates a global...
  var ts = require('typescript');
}

var parsers = {
  [`Acorn (dev)`](s) {
    acornDev.parse(s, { locations: true });
  },
  [`Acorn ${acorn.version}`](s) {
    acorn.parse(s, { locations: true });
  },
  [`Esprima ${esprima.version}`](s) {
    esprima.parse(s, { loc: true });
  },
  [`TypeScript ${ts.version}`](s) {
    ts.createSourceFile('source.js', s, ts.ScriptTarget.ES6);
  },
  [`Traceur ${traceur.loader.TraceurLoader.prototype.version}`](s) {
    var file = new traceur.syntax.SourceFile('source.js', s);
    var parser = new traceur.syntax.Parser(file);
    parser.parseScript();
  },
};

var parserNames = Object.keys(parsers);

var inputNames = [
  'angular.js',
  'backbone.js',
  'ember.js',
  'jquery.js',
  'react-dom.js',
  'react.js'
];

var inputs = Promise.all(inputNames.map(name => {
  name = `fixtures/${name}`;

  if (isWorker) {
    return fetch(name).then(response => response.text());
  } else {
    return new Promise((resolve, reject) => {
      fs.readFile(`${__dirname}/${name}`, 'utf-8', (err, data) => {
        err ? reject(err) : resolve(data);
      });
    });
  }
}));

if (!isWorker) {
  module.exports = {
    parsers,
    parserNames,
    inputs,
    inputNames
  };
}
