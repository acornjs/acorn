import buble from "rollup-plugin-buble"

export default {
  input: "acorn/src/index.js",
  output: [
    {
      file: "acorn/dist/acorn.js",
      format: "umd",
      name: "acorn",
      sourcemap: true
    },
    {
      file: "acorn/dist/acorn.mjs",
      format: "es",
      sourcemap: true
    }
  ],
  plugins: [
    buble({transforms: {dangerousForOf: true}})
  ]
}
