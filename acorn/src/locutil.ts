
import {Parser} from "./state.js"
import {nextLineBreak} from "./whitespace.js"

// These are used when `options.locations` is on, for the
// `startLoc` and `endLoc` properties.

export class Position {
  line: number
  column: number

  constructor(line, col) {
    this.line = line
    this.column = col
  }

  offset(n) {
    return new Position(this.line, this.column + n)
  }
}

export class SourceLocation {
  start: Position
  end: Position
  source?: string | null
  constructor(p: Parser, start: Position, end: Position) {
    this.start = start
    this.end = end
    if (p.sourceFile !== null) this.source = p.sourceFile
  }
}

// The `getLineInfo` function is mostly useful when the
// `locations` option is off (for performance reasons) and you
// want to find the line/column position for a given character
// offset. `input` should be the code string that the offset refers
// into.

export function getLineInfo(input: string, offset: number): Position {
  for (let line = 1, cur = 0;;) {
    let nextBreak = nextLineBreak(input, cur, offset)
    if (nextBreak < 0) return new Position(line, offset - cur)
    ++line
    cur = nextBreak
  }
}
