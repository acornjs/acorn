import buble from "@rollup/plugin-buble"

export default {
  input: "acorn-walk/src/index.js",
  output: [
    {
      file: "acorn-walk/dist/walk.js",
      format: "umd",
      name: "acorn.walk"
    },
    {
      file: "acorn-walk/dist/walk.mjs",
      format: "es"
    }
  ],
  plugins: [
    buble({transforms: {dangerousForOf: true}})
  ]
}
