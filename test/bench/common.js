'use strict';

const isWorker = typeof importScripts !== 'undefined';

// var because must leak into globals
var module, exports, req;

// CommonJS shim for Web Worker
if (isWorker) {
  exports = self;

  req = (name, urlPrefix = 'https://unpkg.com/') => {
    let oldModule = module, oldExports = exports;
    exports = {};
    module = { exports };
    importScripts(urlPrefix + name);
    let exported = module.exports;
    module = oldModule;
    exports = oldExports;
    return exported;
  };
} else {
  req = require;
}

exports.parsers = {
  'Acorn (dev)'() {
    const { parse } = req('../../acorn/dist/acorn.js', '');
    return {
      version: '',
      parse: s => parse(s, { locations: true })
    };
  },

  'Acorn'() {
    const { version, parse } = req('acorn');
    return {
      version,
      parse: s => parse(s, { locations: true })
    };
  },

  'Esprima'() {
    const { version, parse } = req('esprima');
    return {
      version,
      parse: s => parse(s, { loc: true })
    }
  },

  'TypeScript'() {
    const { version, createSourceFile, ScriptTarget: { ES6 } } = req('typescript');
    return {
      version,
      parse: s => createSourceFile('source.js', s, ES6)
    };
  },

  'Traceur'() {
    req('traceur/bin/traceur.js'); // it creates a global :(
    const { SourceFile, Parser } = traceur.syntax;
    return {
      version: traceur.loader.TraceurLoader.prototype.version,
      parse: s => new Parser(new SourceFile('source.js', s)).parseScript()
    }
  },

  'Flow'() {
    const { parse } = req('flow-parser');
    return {
      version: isWorker ? '' : require('flow-parser/package.json').version,
      parse
    };
  },

  'Babylon'() {
    const { parse } = req('babylon');
    return {
      version: isWorker ? '' : require('babylon/package.json').version,
      parse
    };
  },
};

exports.parserNames = Object.keys(exports.parsers);

exports.inputNames = [
  'angular.js',
  'backbone.js',
  'ember.js',
  'jquery.js',
  'react-dom.js',
  'react.js'
];

let read;

if (isWorker) {
  read = name => fetch(name).then(response => response.text());
} else {
  const { readFile } = require('fs');

  read = name => new Promise((resolve, reject) => {
    readFile(`${__dirname}/${name}`, 'utf-8', (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
}

exports.inputs = Promise.all(
  exports.inputNames
  .map(name => read(`fixtures/${name}`))
);
