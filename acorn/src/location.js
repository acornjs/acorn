import {Parser} from "./state"
import {Position, getLineInfo} from "./locutil"

const pp = Parser.prototype

// This function is used to raise exceptions on parse errors. It
// takes an offset integer (into the current `input`) to indicate
// the location of the error, attaches the position to the end
// of the error message, and then raises a `SyntaxError` with that
// message.

pp.raise = function(pos, message) {
  let loc = getLineInfo(this.input, pos)
  if (loc.line === 0) {
    loc.column += this.dispColumn
  }
  loc.line += this.dispLine
  message += " (" + loc.line + ":" + loc.column + ")"
  let err = new SyntaxError(message)
  err.pos = pos; err.loc = loc; err.raisedAt = this.pos
  throw err
}

pp.raiseRecoverable = pp.raise

pp.curPosition = function() {
  if (this.options.locations) {
    let column = this.pos - this.lineStart
    return new Position(this.curLine + this.dispLine, this.curLine === 1 ? column + this.dispColumn : column)
  }
}
