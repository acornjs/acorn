if (parseInt(process.versions.node) > 4) {
  console.log("Linting...")
  var join = require("path").join
  try {
    require("child_process").execSync(
      join("node_modules", ".bin", "eslint") + " " + join(__dirname, "..", "*", "src"),
      {encoding: "utf8", stdio: "inherit"}
    )
    console.log("OK")
  } catch (_) {
    process.exit(1)
  }
}
