if (parseInt(process.versions.node) > 4) {
  console.log("Linting...")
  try {
    require("child_process").execFileSync("node_modules/.bin/eslint", ["src/"],
                                          {cwd: __dirname + "/..", encoding: "utf8", stdio: "inherit"})
    console.log("OK")
  } catch(_) {
    process.exit(1)
  }
}
