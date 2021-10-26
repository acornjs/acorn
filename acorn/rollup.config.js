import buble from "@rollup/plugin-buble"

export default {
  input: "acorn/src/index.js",
  output: [
    {
      file: "acorn/dist/acorn.js",
      format: "umd",
      name: "acorn"
    },
    {
      file: "acorn/dist/acorn.mjs",
      format: "es"
    }
  ],
  plugins: [
    buble({transforms: {dangerousForOf: true}})
  ]
}
