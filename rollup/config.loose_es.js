import buble from 'rollup-plugin-buble'
import {resolve} from 'path'

var acorn = resolve('src/index.js')
var paths = {}, globals = {}
paths[acorn] = './acorn.es'
globals[acorn] = 'acorn'

export default {
  entry: 'src/loose/index.js',
  moduleName: 'acorn.loose',
  external: [ acorn ],
  paths: paths,
  globals: globals,
  targets: [
    { dest: 'dist/acorn_loose.es.js', format: 'es' }
  ],
  plugins: [
    buble({
      transforms: {
	dangerousForOf: true
      }
    })
  ]
}
