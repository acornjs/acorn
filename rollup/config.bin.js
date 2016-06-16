import buble from 'rollup-plugin-buble';
import { dirname, resolve } from 'path';

// this is a bit of a hack to trick Rollup into keeping the
// correct relative path in the bundled output – probably
// something Rollup itself should handle more smartly
var FAKE_ACORN_DIST = resolve( 'src/dist/acorn.js' );

export default {
	entry: 'src/bin/acorn.js',
	dest: 'bin/acorn',
	format: 'cjs',
	banner: '#!/usr/bin/env node',
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
	external: [
		'fs',
		'path',
		FAKE_ACORN_DIST
	]
};
