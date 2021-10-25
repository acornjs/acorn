import buble from "@rollup/plugin-buble"

export default {
  external: ["fs", "path", "acorn"],
  input: "acorn/src/bin/acorn.js",
  output: {
    file: "acorn/dist/bin.js",
    format: "cjs",
    paths: {acorn: "./acorn.js"}
  },
  plugins: [buble()]
}
