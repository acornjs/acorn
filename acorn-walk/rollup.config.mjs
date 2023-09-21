import buble from "@rollup/plugin-buble"
import {promises as fs} from "node:fs"

const copy = (from, to) => ({
  async writeBundle() { await fs.writeFile(to, await fs.readFile(from)) }
})

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
    buble({transforms: {dangerousForOf: true}}),
    copy("acorn-walk/src/walk.d.ts", "acorn-walk/dist/walk.d.ts"),
    copy("acorn-walk/src/walk.d.ts", "acorn-walk/dist/walk.d.mts")
  ]
}
