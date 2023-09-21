import buble from "@rollup/plugin-buble"
import {promises as fs} from "node:fs"

const copy = (from, to) => ({
  async writeBundle() { await fs.writeFile(to, await fs.readFile(from)) }
})

export default [
  {
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
      buble({transforms: {dangerousForOf: true}}),
      copy("acorn/src/acorn.d.ts", "acorn/dist/acorn.d.ts"),
      copy("acorn/src/acorn.d.ts", "acorn/dist/acorn.d.mts")
    ]
  },
  {
    external: ["acorn", "fs", "path"],
    input: "acorn/src/bin/acorn.js",
    output: {
      file: "acorn/dist/bin.js",
      format: "cjs",
      paths: {acorn: "./acorn.js"}
    },
    plugins: [
      buble({transforms: {dangerousForOf: true}})
    ]
  }
]
