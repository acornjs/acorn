import buble from "rollup-plugin-buble"

export default {
  input: "acorn/src/index.mjs",
  output: [
    {
      file: "acorn/dist/acorn.js",
      format: "umd",
      name: "acorn",
      sourceMap: true
    },
    {
      file: "acorn/dist/acorn.mjs",
      format: "es",
      sourceMap: true
    }
  ],
  plugins: [
    buble({transforms: {dangerousForOf: true}})
  ]
}
