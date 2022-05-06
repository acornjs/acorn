import {reservedWords, keywords} from "./identifier.js"
import {TokenType, types as tt} from "./tokentype.js"
import {lineBreak} from "./whitespace.js"
import {getOptions} from "./options.js"
import {wordsRegexp} from "./util.js"
import {SCOPE_TOP, SCOPE_FUNCTION, SCOPE_ASYNC, SCOPE_GENERATOR, SCOPE_SUPER, SCOPE_DIRECT_SUPER, SCOPE_CLASS_STATIC_BLOCK} from "./scopeflags.js"
import {Options} from "./types"
import {Node} from "./node.js"
import {Position} from "./locutil.js"

export class Parser {
  static acorn: any

  lineStart: number
  options: Options
  curLine: number
  start: number
  end: number
  input: string
  type: TokenType
  next: () => void
  nextToken: () => void
  parseTopLevel: (node: Node) =>Node
  finishNode: (node: Node, type: string) => Node
  finishNodeAt: (node: Node, type: string, pos: number, loc: Position) => Node
  raise: (pos: number, message: string) => void
  raiseRecoverable: (pos: number, message: string) => void
  unexpected: (pos: number) => void

  adaptDirectivePrologue: any
  afterTrailingComma: any
  awaitIdentPos: any
  awaitPos: any
  braceIsBlock: any
  buildBinary: any
  canInsertSemicolon: any
  checkExport: any
  checkExpressionErrors: any
  checkLocalExport: any
  checkLValInnerPattern: any
  checkLValPattern: any
  checkLValSimple: any
  checkParams: any
  checkPatternErrors: any
  checkPatternExport: any
  checkPropClash: any
  checkUnreserved: any
  checkVariableExport: any
  checkYieldAwaitInDefaultParams: any
  containsEsc: any
  context: any
  copyNode: any
  curContext: any
  curPosition: any
  currentScope: any
  currentThisScope: any
  currentVarScope: any
  declareName: any
  eat: any
  eatContextual: any
  endLoc: any
  enterClassBody: any
  enterScope: any
  exitClassBody: any
  exitScope: any
  expect: any
  expectContextual: any
  exprAllowed: any
  finishOp: any
  finishToken: any
  fullCharCodeAtPos: any
  getToken: any
  getTokenFromCode: any
  inGeneratorContext: any
  initFunction: any
  initialContext: any
  inModule: any
  insertSemicolon: any
  inTemplateElement: any
  invalidStringToken: any
  isAsyncFunction: any
  isAsyncProp: any
  isClassElementNameStart: any
  isContextual: any
  isDirectiveCandidate: any
  isLet: any
  isSimpleAssignTarget: any
  isSimpleParamList: any
  keywords: any
  labels: any
  lastTokEnd: any
  lastTokEndLoc: any
  lastTokStart: any
  lastTokStartLoc: any
  overrideContext: any
  parseArrowExpression: any
  parseAwait: any
  parseBindingAtom: any
  parseBindingList: any
  parseBindingListItem: any
  parseBlock: any
  parseBreakContinueStatement: any
  parseClass: any
  parseClassElement: any
  parseClassElementName: any
  parseClassField: any
  parseClassId: any
  parseClassMethod: any
  parseClassStaticBlock: any
  parseClassSuper: any
  parseDebuggerStatement: any
  parseDoStatement: any
  parseDynamicImport: any
  parseEmptyStatement: any
  parseExport: any
  parseExportSpecifiers: any
  parseExprAtom: any
  parseExpression: any
  parseExpressionStatement: any
  parseExprImport: any
  parseExprList: any
  parseExprOp: any
  parseExprOps: any
  parseExprSubscripts: any
  parseFor: any
  parseForIn: any
  parseForStatement: any
  parseFunction: any
  parseFunctionBody: any
  parseFunctionParams: any
  parseFunctionStatement: any
  parseIdent: any
  parseIfStatement: any
  parseImport: any
  parseImportMeta: any
  parseImportSpecifiers: any
  parseLabeledStatement: any
  parseLiteral: any
  parseMaybeAssign: any
  parseMaybeConditional: any
  parseMaybeDefault: any
  parseMaybeUnary: any
  parseMethod: any
  parseModuleExportName: any
  parseNew: any
  parseObj: any
  parseParenAndDistinguishExpression: any
  parseParenArrowList: any
  parseParenExpression: any
  parseParenItem: any
  parsePrivateIdent: any
  parseProperty: any
  parsePropertyName: any
  parsePropertyValue: any
  parseRestBinding: any
  parseReturnStatement: any
  parseSpread: any
  parseStatement: any
  parseSubscript: any
  parseSubscripts: any
  parseSwitchStatement: any
  parseTemplate: any
  parseTemplateElement: any
  parseThrowStatement: any
  parseTryStatement: any
  parseVar: any
  parseVarId: any
  parseVarStatement: any
  parseWhileStatement: any
  parseWithStatement: any
  parseYield: any
  pos: any
  potentialArrowAt: any
  potentialArrowInForAwait: any
  privateNameStack: any
  readCodePoint: any
  readEscapedChar: any
  readHexChar: any
  readInt: any
  readInvalidTemplateToken: any
  readNumber: any
  readRadixNumber: any
  readRegexp: any
  readString: any
  readTmplToken: any
  readToken: any
  readToken_caret: any
  readToken_dot: any
  readToken_eq_excl: any
  readToken_lt_gt: any
  readToken_mult_modulo_exp: any
  readToken_numberSign: any
  readToken_pipe_amp: any
  readToken_plus_min: any
  readToken_question: any
  readToken_slash: any
  readWord: any
  readWord1: any
  regexp_alternative: any
  regexp_classRanges: any
  regexp_disjunction: any
  regexp_eatAssertion: any
  regexp_eatAtom: any
  regexp_eatAtomEscape: any
  regexp_eatBackReference: any
  regexp_eatBracedQuantifier: any
  regexp_eatCapturingGroup: any
  regexp_eatCControlLetter: any
  regexp_eatCharacterClass: any
  regexp_eatCharacterClassEscape: any
  regexp_eatCharacterEscape: any
  regexp_eatClassAtom: any
  regexp_eatClassControlLetter: any
  regexp_eatClassEscape: any
  regexp_eatControlEscape: any
  regexp_eatControlLetter: any
  regexp_eatDecimalDigits: any
  regexp_eatDecimalEscape: any
  regexp_eatExtendedAtom: any
  regexp_eatExtendedPatternCharacter: any
  regexp_eatFixedHexDigits: any
  regexp_eatGroupName: any
  regexp_eatHexDigits: any
  regexp_eatHexEscapeSequence: any
  regexp_eatIdentityEscape: any
  regexp_eatInvalidBracedQuantifier: any
  regexp_eatKGroupName: any
  regexp_eatLegacyOctalEscapeSequence: any
  regexp_eatLoneUnicodePropertyNameOrValue: any
  regexp_eatOctalDigit: any
  regexp_eatPatternCharacters: any
  regexp_eatQuantifier: any
  regexp_eatQuantifierPrefix: any
  regexp_eatRegExpIdentifierName: any
  regexp_eatRegExpIdentifierPart: any
  regexp_eatRegExpIdentifierStart: any
  regexp_eatRegExpUnicodeEscapeSequence: any
  regexp_eatReverseSolidusAtomEscape: any
  regexp_eatSyntaxCharacter: any
  regexp_eatTerm: any
  regexp_eatUncapturingGroup: any
  regexp_eatUnicodePropertyName: any
  regexp_eatUnicodePropertyValue: any
  regexp_eatUnicodePropertyValueExpression: any
  regexp_eatZero: any
  regexp_groupSpecifier: any
  regexp_pattern: any
  regexpState: any
  regexp_validateUnicodePropertyNameAndValue: any
  regexp_validateUnicodePropertyNameOrValue: any
  reservedWords: any
  reservedWordsStrict: any
  reservedWordsStrictBind: any
  scopeStack: any
  semicolon: any
  shouldParseExportStatement: any
  skipBlockComment: any
  skipLineComment: any
  skipSpace: any
  sourceFile: any
  startLoc: any
  startNode: any
  startNodeAt: any
  strict: any
  strictDirective: any
  toAssignable: any
  toAssignableList: any
  treatFunctionsAsVarInScope: any
  tryReadTemplateToken: any
  undefinedExports: any
  updateContext: any
  validateRegExpFlags: any
  validateRegExpPattern: any
  value: any
  yieldPos: any

  constructor(options: Options, input: string, startPos?: number) {
    this.options = options = getOptions(options)
    this.sourceFile = options.sourceFile
    this.keywords = wordsRegexp(keywords[options.ecmaVersion >= 6 ? 6 : options.sourceType === "module" ? "5module" : 5])
    let reserved = ""
    if (options.allowReserved !== true) {
      reserved = reservedWords[options.ecmaVersion >= 6 ? 6 : options.ecmaVersion === 5 ? 5 : 3]
      if (options.sourceType === "module") reserved += " await"
    }
    this.reservedWords = wordsRegexp(reserved)
    let reservedStrict = (reserved ? reserved + " " : "") + reservedWords.strict
    this.reservedWordsStrict = wordsRegexp(reservedStrict)
    this.reservedWordsStrictBind = wordsRegexp(reservedStrict + " " + reservedWords.strictBind)
    this.input = String(input)

    // Used to signal to callers of `readWord1` whether the word
    // contained any escape sequences. This is needed because words with
    // escape sequences must not be interpreted as keywords.
    this.containsEsc = false

    // Set up token state

    // The current position of the tokenizer in the input.
    if (startPos) {
      this.pos = startPos
      this.lineStart = this.input.lastIndexOf("\n", startPos - 1) + 1
      this.curLine = this.input.slice(0, this.lineStart).split(lineBreak).length
    } else {
      this.pos = this.lineStart = 0
      this.curLine = 1
    }

    // Properties of the current token:
    // Its type
    this.type = tt.eof
    // For tokens that include more information than their type, the value
    this.value = null
    // Its start and end offset
    this.start = this.end = this.pos
    // And, if locations are used, the {line, column} object
    // corresponding to those offsets
    this.startLoc = this.endLoc = this.curPosition()

    // Position information for the previous token
    this.lastTokEndLoc = this.lastTokStartLoc = null
    this.lastTokStart = this.lastTokEnd = this.pos

    // The context stack is used to superficially track syntactic
    // context to predict whether a regular expression is allowed in a
    // given position.
    this.context = this.initialContext()
    this.exprAllowed = true

    // Figure out if it's a module code.
    this.inModule = options.sourceType === "module"
    this.strict = this.inModule || this.strictDirective(this.pos)

    // Used to signify the start of a potential arrow function
    this.potentialArrowAt = -1
    this.potentialArrowInForAwait = false

    // Positions to delayed-check that yield/await does not exist in default parameters.
    this.yieldPos = this.awaitPos = this.awaitIdentPos = 0
    // Labels in scope.
    this.labels = []
    // Thus-far undefined exports.
    this.undefinedExports = Object.create(null)

    // If enabled, skip leading hashbang line.
    if (this.pos === 0 && options.allowHashBang && this.input.slice(0, 2) === "#!")
      this.skipLineComment(2)

    // Scope tracking for duplicate variable names (see scope.js)
    this.scopeStack = []
    this.enterScope(SCOPE_TOP)

    // For RegExp validation
    this.regexpState = null

    // The stack of private names.
    // Each element has two properties: 'declared' and 'used'.
    // When it exited from the outermost class definition, all used private names must be declared.
    this.privateNameStack = []
  }

  parse(): Node {
    let node = this.options.program || this.startNode()
    this.nextToken()
    return this.parseTopLevel(node)
  }

  get inFunction() { return (this.currentVarScope().flags & SCOPE_FUNCTION) > 0 }

  get inGenerator() { return (this.currentVarScope().flags & SCOPE_GENERATOR) > 0 && !this.currentVarScope().inClassFieldInit }

  get inAsync() { return (this.currentVarScope().flags & SCOPE_ASYNC) > 0 && !this.currentVarScope().inClassFieldInit }

  get canAwait() {
    for (let i = this.scopeStack.length - 1; i >= 0; i--) {
      let scope = this.scopeStack[i]
      if (scope.inClassFieldInit || scope.flags & SCOPE_CLASS_STATIC_BLOCK) return false
      if (scope.flags & SCOPE_FUNCTION) return (scope.flags & SCOPE_ASYNC) > 0
    }
    return (this.inModule && this.options.ecmaVersion >= 13) || this.options.allowAwaitOutsideFunction
  }

  get allowSuper() {
    const {flags, inClassFieldInit} = this.currentThisScope()
    return (flags & SCOPE_SUPER) > 0 || inClassFieldInit || this.options.allowSuperOutsideMethod
  }

  get allowDirectSuper() { return (this.currentThisScope().flags & SCOPE_DIRECT_SUPER) > 0 }

  get treatFunctionsAsVar() { return this.treatFunctionsAsVarInScope(this.currentScope()) }

  get allowNewDotTarget() {
    const {flags, inClassFieldInit} = this.currentThisScope()
    return (flags & (SCOPE_FUNCTION | SCOPE_CLASS_STATIC_BLOCK)) > 0 || inClassFieldInit
  }

  get inClassStaticBlock() {
    return (this.currentVarScope().flags & SCOPE_CLASS_STATIC_BLOCK) > 0
  }

  static extend(...plugins) {
    let cls = this
    for (let i = 0; i < plugins.length; i++) cls = plugins[i](cls)
    return cls
  }

  static parse(input: string, options: Options) {
    return new this(options, input).parse()
  }

  static parseExpressionAt(input: string, pos: number, options: Options): Node {
    let parser = new this(options, input, pos)
    parser.nextToken()
    return parser.parseExpression()
  }

  static tokenizer(input: string, options: Options): {
    getToken(): Token
    [Symbol.iterator](): Iterator<Token>
  } {
    return new this(options, input)
  }
}
