import {Parser, SourceLocation, tokTypes as tt, Node, lineBreak, isNewLine} from "acorn"
import {dummyValue} from "./parseutil.js"

function noop() {}

export class LooseParser {
  constructor(input, options = {}) {
    this.toks = this.constructor.BaseParser.tokenizer(input, options)
    this.options = this.toks.options
    this.input = this.toks.input
    this.tok = this.last = {type: tt.eof, start: 0, end: 0}
    this.tok.validateRegExpFlags = noop
    this.tok.validateRegExpPattern = noop
    if (this.options.locations) {
      let here = this.toks.curPosition()
      this.tok.loc = new SourceLocation(this.toks, here, here)
    }
    this.ahead = [] // Tokens ahead
    this.context = [] // Indentation contexted
    this.curIndent = 0
    this.curLineStart = 0
    this.nextLineStart = this.lineEnd(this.curLineStart) + 1
    this.inAsync = false
    this.inGenerator = false
    this.inFunction = false
  }

  startNode() {
    return new Node(this.toks, this.tok.start, this.options.locations ? this.tok.loc.start : null)
  }

  storeCurrentPos() {
    return this.options.locations ? [this.tok.start, this.tok.loc.start] : this.tok.start
  }

  startNodeAt(pos) {
    if (this.options.locations) {
      return new Node(this.toks, pos[0], pos[1])
    } else {
      return new Node(this.toks, pos)
    }
  }

  finishNode(node, type) {
    node.type = type
    node.end = this.last.end
    if (this.options.locations)
      node.loc.end = this.last.loc.end
    if (this.options.ranges)
      node.range[1] = this.last.end
    return node
  }

  dummyNode(type) {
    let dummy = this.startNode()
    dummy.type = type
    dummy.end = dummy.start
    if (this.options.locations)
      dummy.loc.end = dummy.loc.start
    if (this.options.ranges)
      dummy.range[1] = dummy.start
    this.last = {type: tt.name, start: dummy.start, end: dummy.start, loc: dummy.loc}
    return dummy
  }

  dummyIdent() {
    let dummy = this.dummyNode("Identifier")
    dummy.name = dummyValue
    return dummy
  }

  dummyString() {
    let dummy = this.dummyNode("Literal")
    dummy.value = dummy.raw = dummyValue
    return dummy
  }

  eat(type) {
    if (this.tok.type === type) {
      this.next()
      return true
    } else {
      return false
    }
  }

  isContextual(name) {
    return this.tok.type === tt.name && this.tok.value === name
  }

  eatContextual(name) {
    return this.tok.value === name && this.eat(tt.name)
  }

  canInsertSemicolon() {
    return this.tok.type === tt.eof || this.tok.type === tt.braceR ||
      lineBreak.test(this.input.slice(this.last.end, this.tok.start))
  }

  semicolon() {
    return this.eat(tt.semi)
  }

  expect(type) {
    if (this.eat(type)) return true
    for (let i = 1; i <= 2; i++) {
      if (this.lookAhead(i).type === type) {
        for (let j = 0; j < i; j++) this.next()
        return true
      }
    }
  }

  pushCx() {
    this.context.push(this.curIndent)
  }

  popCx() {
    this.curIndent = this.context.pop()
  }

  lineEnd(pos) {
    while (pos < this.input.length && !isNewLine(this.input.charCodeAt(pos))) ++pos
    return pos
  }

  indentationAfter(pos) {
    for (let count = 0;; ++pos) {
      let ch = this.input.charCodeAt(pos)
      if (ch === 32) ++count
      else if (ch === 9) count += this.options.tabSize
      else return count
    }
  }

  closes(closeTok, indent, line, blockHeuristic) {
    if (this.tok.type === closeTok || this.tok.type === tt.eof) return true
    return line !== this.curLineStart && this.curIndent < indent && this.tokenStartsLine() &&
      (!blockHeuristic || this.nextLineStart >= this.input.length ||
       this.indentationAfter(this.nextLineStart) < indent)
  }

  tokenStartsLine() {
    for (let p = this.tok.start - 1; p >= this.curLineStart; --p) {
      let ch = this.input.charCodeAt(p)
      if (ch !== 9 && ch !== 32) return false
    }
    return true
  }

  isLet() {
    if (this.options.ecmaVersion < 6 || !this.isContextual("let")) return false

    // Check if the current token contains unicode escapes
    // If so, it should not be treated as a let declaration
    let currentTokenText = this.input.slice(this.tok.start, this.tok.end)
    if (currentTokenText.includes("\\u")) return false

    // In loose parser, be more conservative - only treat as let declaration
    // if followed by clear declaration patterns
    let nextTok = this.lookAhead(1)
    if (!nextTok) return false
    // Check for common let declaration patterns: let x, let {, let [
    return nextTok.type === tt.name || nextTok.type === tt.braceL || nextTok.type === tt.bracketL
  }

  isAsyncFunction() {
    if (this.options.ecmaVersion < 8 || !this.isContextual("async"))
      return false

    // Check if there is a line break between 'async' and 'function'
    // If so, it should not be treated as async function
    let asyncEnd = this.tok.end
    let nextTok = this.lookAhead(1)
    if (!nextTok) return false

    // Check for line break between async and function
    let betweenText = this.input.slice(asyncEnd, nextTok.start)
    if (/\n|\r/.test(betweenText)) return false

    return nextTok.type === tt._function
  }

  isUsing() {
    if (this.options.ecmaVersion < 17 || !this.isContextual("using"))
      return false
    return true // loose parser is more permissive
  }

  isAwaitUsingDeclaration() {
    if (this.options.ecmaVersion < 17 || !this.isContextual("await"))
      return false
    // In modules, top-level await is allowed
    if (this.inAsync || this.options.sourceType === "module") {
      return true
    }
    return false
  }

  extend(name, f) {
    this[name] = f(this[name])
  }

  parse() {
    this.next()
    return this.parseTopLevel()
  }

  static extend(...plugins) {
    let cls = this
    for (let i = 0; i < plugins.length; i++) cls = plugins[i](cls)
    return cls
  }

  static parse(input, options) {
    return new this(input, options).parse()
  }
}

// Allows plugins to extend the base parser / tokenizer used
LooseParser.BaseParser = Parser
