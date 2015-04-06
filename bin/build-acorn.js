var fs = require("fs"), path = require("path")
var stream = require("stream")

var browserify = require("browserify")
var babelify = require("babelify")
var derequire = require("derequire")

process.chdir(path.resolve(__dirname, ".."))

function derequireStream() {
  var tr = new stream.Transform
  var src = ''
  tr._transform = function(chunk, _, callback) {
    src += chunk
    callback()
  }
  tr._flush = function(callback) {
    this.push(derequire(src))
    callback()
  }
  return tr
}

browserify({standalone: "acorn"})
  .transform(babelify)
  .require("./src/index.js", {entry: true})
  .bundle()
  .on("error", function (err) { console.log("Error: " + err.message) })
  .pipe(derequireStream())
  .pipe(fs.createWriteStream("dist/acorn.js"))

function acornShim(file) {
  var tr = new stream.Transform
  if (file == path.resolve(__dirname, "../src/index.js")) {
    var sent = false
    tr._transform = function(chunk, _, callback) {
      if (!sent) {
        sent = true
        callback(null, "module.exports = typeof window != 'undefined' ? window.acorn : require(('suppress', './acorn'))")
      } else {
        callback()
      }
    }
  } else {
    tr._transform = function(chunk, _, callback) { callback(null, chunk) }
  }
  return tr
}

browserify({standalone: "acorn.loose"})
  .transform(acornShim)
  .transform(babelify)
  .require("./src/loose/index.js", {entry: true})
  .bundle()
  .on("error", function (err) { console.log("Error: " + err.message) })
  .pipe(derequireStream())
  .pipe(fs.createWriteStream("dist/acorn_loose.js"))

browserify({standalone: "acorn.walk"})
  .transform(acornShim)
  .transform(babelify)
  .require("./src/walk/index.js", {entry: true})
  .bundle()
  .on("error", function (err) { console.log("Error: " + err.message) })
  .pipe(derequireStream())
  .pipe(fs.createWriteStream("dist/walk.js"))
