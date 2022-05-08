import {Parser} from "./state.js"
import {Position, SourceLocation} from "./locutil.js"

export class Node {
  type: string
  start: number
  end: number
  loc?: SourceLocation
  sourceFile?: string
  range?: [number, number]
  body: any
  sourceType: any

  constructor(parser: Parser, pos: number, loc?: Position) {
    this.type = ""
    this.start = pos
    this.end = 0
    if (parser.options.locations)
      this.loc = new SourceLocation(parser, loc)
    if (parser.options.directSourceFile)
      this.sourceFile = parser.options.directSourceFile
    if (parser.options.ranges)
      this.range = [pos, 0]
  }
}

// Start an AST node, attaching a start offset.

const pp = Parser.prototype

pp.startNode = function(this: Parser) {
  return new Node(this, this.start, this.startLoc)
}

pp.startNodeAt = function(this: Parser, pos, loc) {
  return new Node(this, pos, loc)
}

// Finish an AST node, adding `type` and `end` properties.

function finishNodeAt(node, type, pos, loc) {
  node.type = type
  node.end = pos
  if (this.options.locations)
    node.loc.end = loc
  if (this.options.ranges)
    node.range[1] = pos
  return node
}

pp.finishNode = function(this: Parser, node, type) {
  return finishNodeAt.call(this, node, type, this.lastTokEnd, this.lastTokEndLoc)
}

// Finish node at given position

pp.finishNodeAt = function(this: Parser, node, type, pos, loc) {
  return finishNodeAt.call(this, node, type, pos, loc)
}

pp.copyNode = function(this: Parser, node) {
  let newNode = new Node(this, node.start, this.startLoc)
  for (let prop in node) newNode[prop] = node[prop]
  return newNode
}
