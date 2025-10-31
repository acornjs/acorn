import {readFile, writeFile} from "node:fs/promises"
import buble from "@rollup/plugin-buble"

const copy = (from, to) => ({
  async writeBundle() { await writeFile(to, await readFile(from)) }
})

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
    buble({transforms: {dangerousForOf: true}}),
    copy("acorn-loose/src/acorn-loose.d.ts", "acorn-loose/dist/acorn-loose.d.ts"),
    copy("acorn-loose/src/acorn-loose.d.ts", "acorn-loose/dist/acorn-loose.d.mts")
  ]
}
