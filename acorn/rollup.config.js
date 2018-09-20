import buble from "rollup-plugin-buble"

export default {
  entry: "acorn/src/index.mjs",
  moduleName: "acorn",
  plugins: [
    buble({transforms: {dangerousForOf: true}})
  ],
  sourceMap: true,
  targets: [
    {dest: "acorn/dist/acorn.js", format: "umd"},
    {dest: "acorn/dist/acorn.mjs", format: "es"}
  ]
}
