import { dirname, resolve } from 'path';
import { statSync } from 'fs';
import buble from 'rollup-plugin-buble';

// this is a bit of a hack to trick Rollup into keeping the
// correct relative path in the bundled output – probably
// something Rollup itself should handle more smartly
var FAKE_ACORN_DIST = resolve( 'src/loose/acorn.js' );

export default {
	entry: 'src/loose/index.js',
	moduleName: 'acorn.loose',
	plugins: [
		{
			resolveId: function ( importee, importer ) {
				if ( !importer ) return;

				// externalise acorn
				var resolved = resolve( dirname( importer ), importee );
				try {
					var stats = statSync( resolved );
					resolved = resolve( resolved, 'index.js' );
				} catch ( err ) {
					resolved += '.js';
				}

				if ( resolved === resolve( 'src/index.js' ) ) {
					return FAKE_ACORN_DIST;
				}
			}
		},
		buble()
	],
	external: [ FAKE_ACORN_DIST ],
	globals: {
		'./acorn.js': 'acorn'
	},
	targets: [
		{ dest: 'dist/acorn_loose.js', format: 'umd' },
		{ dest: 'dist/acorn_loose.es.js', format: 'es6' }
	]
};
