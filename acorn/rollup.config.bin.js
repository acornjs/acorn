import buble from "rollup-plugin-buble"

export default {
  input: "acorn/src/bin/acorn.js",
  output: {
    file: "acorn/dist/bin.js",
    format: "cjs",
    paths: {acorn: "./acorn.js"},
    external: ["fs", "path", "acorn"]
  },
  plugins: [buble()]
}
