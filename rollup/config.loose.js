export default {
	entry: 'src/loose/index.js',
	moduleName: 'acorn.loose',
	external: [ 'acorn' ],
	paths: {
		acorn: './acorn.js'
	},
	globals: {
		acorn: 'acorn'
	},
	targets: [
		{ dest: 'dist/acorn_loose.js', format: 'umd' },
		{ dest: 'dist/acorn_loose.es.js', format: 'es' }
	]
};
