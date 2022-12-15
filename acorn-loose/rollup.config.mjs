import buble from "@rollup/plugin-buble"

export default {
  external: ["acorn"],
  input: "acorn-loose/src/index.js",
  output: [
    {
      file: "acorn-loose/dist/acorn-loose.js",
      format: "umd",
      name: "acorn.loose",
      globals: {acorn: "acorn"}
    },
    {
      file: "acorn-loose/dist/acorn-loose.mjs",
      format: "es",
      globals: {acorn: "acorn"}
    }
  ],
  plugins: [
    buble({transforms: {dangerousForOf: true}})
  ]
}
