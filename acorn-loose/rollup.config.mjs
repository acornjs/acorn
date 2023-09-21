import buble from "@rollup/plugin-buble"
import {promises as fs} from "node:fs"

const copy = (from, to) => ({
  async writeBundle() { await fs.writeFile(to, await fs.readFile(from)) }
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
