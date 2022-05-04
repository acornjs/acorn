import buble from "@rollup/plugin-buble"
import typescript from "@rollup/plugin-typescript"
import dts from "rollup-plugin-dts"

export default [
  {
    input: "acorn/src/index.ts",
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
      typescript({
        compilerOptions: {
          lib: ["es6", "dom"],
          target: "es5"
        }
      }),
      buble({transforms: {dangerousForOf: true}})
    ]
  },
  {
    input: "acorn/src/index.ts",
    output: [
      {
        file: "acorn/dist/acorn.d.ts",
        format: "es"
      }
    ],
    plugins: [
      dts()
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
