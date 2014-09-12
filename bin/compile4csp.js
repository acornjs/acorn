#!/usr/bin/env node

// Based on https://github.com/RReverser/acorn-csp by @RReverser

'use strict';

var srcPath = require.resolve('..');
var destPath = srcPath.replace('.js', '_csp.js');

var acorn = require(srcPath);
var fs = require('fs');
var vm = require('vm');
var recast = require('recast');
var b = recast.types.builders;

// Read original Acorn's source with conservative parser (recast).
var source = fs.readFileSync(srcPath, 'utf-8');
var ast = recast.parse(source);

// Instrument code.
var makePredicatePath;

recast.visit(ast, {
	visitFunctionDeclaration: function (path) {
		var node = path.node;
		if (node.id.name === 'makePredicate') {
			// Found makePredicate function.
			makePredicatePath = path;
			// And provide wrapper that collects all the possible results.
			path.insertAfter(b.expressionStatement(
				b.assignmentExpression(
					'=',
					node.id,
					b.callExpression(
						b.identifier('wrapMakePredicate'),
						[node.id]
					)
				)
			));
			return false;
		} else {
			this.traverse(path);
		}
	}
});

// Execute instrumented code and collect possible predicates.
var makePredicateCache = Object.create(null);

vm.runInNewContext(recast.prettyPrint(ast).code, {
	wrapMakePredicate: function (makePredicate) {
		return function (words) {
			var generatedFn = makePredicate(words);
			makePredicateCache[words] = generatedFn.toString();
			return generatedFn;
		};
	}
});

// Remove wrapper.
makePredicatePath.parentPath.get(makePredicatePath.name + 1).replace();

// And generate it's body as hash of collected inputs/outputs.
makePredicatePath.get('body', 'body').replace([b.returnStatement(
	b.memberExpression(
		b.objectExpression(Object.keys(makePredicateCache).map(function (key) {
			var funcNode = acorn.parse(makePredicateCache[key]).body[0];
			return b.property('init', b.literal(key), b.functionExpression(
				null,
				funcNode.params,
				funcNode.body
			));
		})),
		makePredicatePath.get('params', 0).node,
		true
	)
)]);

// Finally, save transformed AST to file with preserved formatting.
fs.writeFileSync(destPath, recast.print(ast).code);

console.log('Generated successfully!');