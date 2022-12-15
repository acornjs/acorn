import buble from "@rollup/plugin-buble"

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
      buble({transforms: {dangerousForOf: true}})
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
