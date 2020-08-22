import buble from "rollup-plugin-buble"

export default {
  input: "acorn-walk/src/index.js",
  output: [
    {
      file: "acorn-walk/dist/walk.js",
      format: "umd",
      name: "acorn.walk",
      sourcemap: true
    },
    {
      file: "acorn-walk/dist/walk.mjs",
      format: "es",
      sourcemap: true
    }
  ],
  plugins: [
    buble({transforms: {dangerousForOf: true}})
  ]
}
