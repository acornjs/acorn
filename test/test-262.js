"use strict"

const path = require("path")

const testDir = path.join(__dirname, "..", "node_modules", "test262")
const whitelistFile = path.join(__dirname, "test-262-whitelist.txt")
const shouldUpdate = process.argv.indexOf("--update-whitelist") > -1
const parse = require("..").parse

const TestStream = require("test262-stream")
const Interpreter = require("results-interpreter")
const skippedFeatures = [
  "object-spread",
  "object-rest",
  "regexp-named-groups",
  "BigInt",
  "async-iteration",
  "class-fields",
  "regexp-unicode-property-escapes",
  "regexp-lookbehind",
  "regexp-dotall",
  "optional-catch-binding"
]

const stream = new TestStream(testDir)
const {Transform} = require("stream")
const results = new Transform({
  objectMode: true,
  transform(test, encoding, done) {
    const features = test.attrs.features;
    const skip = features &&
      features.some((feature) => skippedFeatures.indexOf(feature) > -1);

    if (skip) {
      done();
      return;
    }

    const result = {
      id: test.file + "(" + test.scenario + ")",
      expected: test.attrs.negative && test.attrs.negative.phase === "early"
        ? "fail" : "pass"
    }
    const options = {
      sourceType: test.attrs.flags.module ? "module" : "script",
      ecmaVersion: 9
    }

    try {
      parse(test.contents, options)
      result.actual = "pass"
    } catch (err) {
      result.actual = "fail"
    }

    done(null, result)
  }
})
const interpreter = new Interpreter(whitelistFile, {
  outputFile: shouldUpdate ? whitelistFile : null
})

console.log("Now running tests...")
console.log(`(skipping the following features: ${skippedFeatures.join(", ")})`);
if (shouldUpdate) {
  console.log(
    "The whitelist file will be updated according to the results of this " +
    "test run."
  )
} else {
  console.log(
    "Note: the whitelist file may be automatically updated by specifying " +
    "the `--update-whitelist` flag."
  )
}

stream.pipe(results)
  .pipe(interpreter)
  .on("error", (error) => {
    console.error(error)
    process.exitCode = 1
  })
  .on("finish", function() {
    report(this.summary)
    process.exitCode = this.summary.passed ? 0 : 1
  })

function report(summary) {
  const goodnews = [
    summary.allowed.success.length + " valid programs parsed without error",
    summary.allowed.failure.length +
      " invalid programs produced a parsing error",
    summary.allowed.falsePositive.length +
      " invalid programs did not produce a parsing error" +
      " (and allowed by the whitelist file)",
    summary.allowed.falseNegative.length +
      " valid programs produced a parsing error" +
      " (and allowed by the whitelist file)"
  ]
  const badnews = []
  const badnewsDetails = []

  void [
    {
      tests: summary.disallowed.success,
      label:
        "valid programs parsed without error" +
        " (in violation of the whitelist file)"
    },
    {
      tests: summary.disallowed.failure,
      label:
        "invalid programs produced a parsing error" +
        " (in violation of the whitelist file)"
    },
    {
      tests: summary.disallowed.falsePositive,
      label:
        "invalid programs did not produce a parsing error" +
        " (without a corresponding entry in the whitelist file)"
    },
    {
      tests: summary.disallowed.falseNegative,
      label:
        "valid programs produced a parsing error" +
        " (without a corresponding entry in the whitelist file)"
    },
    {
      tests: summary.unrecognized,
      label: "non-existent programs specified in the whitelist file"
    }
  ].forEach(function({tests, label}) {
    if (!tests.length) {
      return
    }

    const desc = tests.length + " " + label

    badnews.push(desc)
    badnewsDetails.push(desc + ":")
    badnewsDetails.push(
      ...tests.map(function(test) {
        return test.id || test
      })
    )
  })

  console.log("Testing complete.")
  console.log("Summary:")
  console.log(goodnews.join("\n").replace(/^/gm, " ✔ "))

  if (!summary.passed) {
    console.log("")
    console.log(badnews.join("\n").replace(/^/gm, " ✘ "))
    console.log("")
    console.log("Details:")
    console.log(badnewsDetails.join("\n").replace(/^/gm, "   "))
  }
}
