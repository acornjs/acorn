import {isIdentifierStart, isIdentifierChar} from "./identifier.js"
import UNICODE_PROPERTY_VALUES from "./unicode-property-data.js"

const BACKSPACE = 0x08
const CHARACTER_TABULATION = 0x09
const LINE_FEED = 0x0A
const LINE_TABULATION = 0x0B
const FORM_FEED = 0x0C
const CARRIAGE_RETURN = 0x0D
const EXCLAMATION_MARK = 0x21 // !
const DOLLAR_SIGN = 0x24 // $
const LEFT_PARENTHESIS = 0x28 // (
const RIGHT_PARENTHESIS = 0x29 // )
const ASTERISK = 0x2A // *
const PLUS_SIGN = 0x2B // +
const COMMA = 0x2C // ,
const HYPHEN_MINUS = 0x2D // -
const FULL_STOP = 0x2E // .
const SOLIDUS = 0x2F // /
const DIGIT_ZERO = 0x30 // 0
const DIGIT_ONE = 0x31 // 1
const DIGIT_THREE = 0x33 // 3
const DIGIT_SEVEN = 0x37 // 7
const DIGIT_NINE = 0x39 // 9
const COLON = 0x3A // :
const LESS_THAN_SIGN = 0x3C // <
const EQUALS_SIGN = 0x3D // =
const GREATER_THAN_SIGN = 0x3E // >
const QUESTION_MARK = 0x3F // ?
const LATIN_CAPITAL_LETTER_A = 0x41 // A
const LATIN_CAPITAL_LETTER_B = 0x42 // B
const LATIN_CAPITAL_LETTER_D = 0x44 // D
const LATIN_CAPITAL_LETTER_F = 0x46 // F
const LATIN_CAPITAL_LETTER_P = 0x50 // P
const LATIN_CAPITAL_LETTER_S = 0x53 // S
const LATIN_CAPITAL_LETTER_W = 0x57 // W
const LATIN_CAPITAL_LETTER_Z = 0x5A // Z
const LOW_LINE = 0x5F // _
const LATIN_SMALL_LETTER_A = 0x61 // a
const LATIN_SMALL_LETTER_B = 0x62 // b
const LATIN_SMALL_LETTER_C = 0x63 // c
const LATIN_SMALL_LETTER_D = 0x64 // d
const LATIN_SMALL_LETTER_F = 0x66 // f
const LATIN_SMALL_LETTER_K = 0x6B // k
const LATIN_SMALL_LETTER_N = 0x6E // n
const LATIN_SMALL_LETTER_P = 0x70 // p
const LATIN_SMALL_LETTER_R = 0x72 // r
const LATIN_SMALL_LETTER_S = 0x73 // s
const LATIN_SMALL_LETTER_T = 0x74 // t
const LATIN_SMALL_LETTER_U = 0x75 // u
const LATIN_SMALL_LETTER_V = 0x76 // v
const LATIN_SMALL_LETTER_W = 0x77 // w
const LATIN_SMALL_LETTER_X = 0x78 // x
const LATIN_SMALL_LETTER_Z = 0x7A // z
const LEFT_SQUARE_BRACKET = 0x5B // [
const REVERSE_SOLIDUS = 0x5C // \
const RIGHT_SQUARE_BRACKET = 0x5D // [
const CIRCUMFLEX_ACCENT = 0x5E // ^
const LEFT_CURLY_BRACKET = 0x7B // {
const VERTICAL_LINE = 0x7C // |
const RIGHT_CURLY_BRACKET = 0x7D // }
const ZERO_WIDTH_NON_JOINER = 0x200C
const ZERO_WIDTH_JOINER = 0x200D

export class RegExpValidator {
  /**
   * Initialize this validator.
   * @param {Parser} parser The parser.
   */
  constructor(parser) {
    this.parser = parser
    this.ecmaVersion = parser.options.ecmaVersion
    this.validFlags = `gim${this.ecmaVersion >= 6 ? "uy" : ""}${this.ecmaVersion >= 9 ? "s" : ""}`
    this.source = ""
    this.start = 0
    this.switchU = false
    this.switchN = false
    this.pos = 0
    this.lastStringValue = ""
    this.numCapturingParens = 0
    this.maxBackReference = 0
    this.groupNames = []
    this.backReferenceNames = []
  }

  // ---------------------------------------------------------------------------
  // Public
  // ---------------------------------------------------------------------------

  /**
   * Validate the flags part of a given RegExpLiteral.
   *
   * @param {number} start The index of the start location of the RegExp literal.
   * @param {string} flags The flags part of the RegExpLiteral.
   * @returns {void}
   */
  validateFlags(start, flags) {
    const validFlags = this.validFlags
    for (let i = 0; i < flags.length; i++) {
      const flag = flags.charAt(i)
      if (validFlags.indexOf(flag) == -1) {
        this.parser.raise(start, "Invalid regular expression flag")
      }
      if (flags.indexOf(flag, i + 1) > -1) {
        this.parser.raise(start, "Duplicate regular expression flag")
      }
    }
  }

  /**
   * Validate the pattern part of a given RegExpLiteral.
   *
   * This is syntax:
   *   https://www.ecma-international.org/ecma-262/8.0/#sec-regular-expressions-patterns
   *
   * @param {number} start The index of the start location of the RegExp literal.
   * @param {string} pattern The pattern part of the RegExpLiteral.
   * @param {boolean} unicode `true` if the RegExp has `u` flag.
   * @returns {void}
   */
  validatePattern(start, pattern, unicode) {
    this.start = start | 0
    this.source = pattern + ""
    this.switchU = !!unicode && this.ecmaVersion >= 6
    this.switchN = !!unicode && this.ecmaVersion >= 9
    this.pattern()

    // The goal symbol for the parse is |Pattern[~U, ~N]|. If the result of
    // parsing contains a |GroupName|, reparse with the goal symbol
    // |Pattern[~U, +N]| and use this result instead. Throw a *SyntaxError*
    // exception if _P_ did not conform to the grammar, if any elements of _P_
    // were not matched by the parse, or if any Early Error conditions exist.
    if (!this.switchN && this.ecmaVersion >= 9 && this.groupNames.length > 0) {
      this.switchN = true
      this.pattern()
    }
  }

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  raise(message) {
    this.parser.raise(this.start, `Invalid regular expression: /${this.source}/: ${message}`)
  }

  // Node.js 0.12/0.10 don't support String.prototype.codePointAt().
  codePointAt(i) {
    const s = this.source
    const l = s.length
    if (i >= l) {
      return -1
    }
    const c = s.charCodeAt(i)
    if (c <= 0xD7FF || c >= 0xE000 || i + 1 >= l) {
      return c
    }
    return (c << 10) + s.charCodeAt(i + 1) - 0x35FDC00
  }

  nextIndex(i) {
    const s = this.source
    const l = s.length
    if (i >= l) {
      return l
    }
    const c = s.charCodeAt(i)
    if (c <= 0xD7FF || c >= 0xE000 || i + 1 >= l) {
      return i + 1
    }
    return i + 2
  }

  current() {
    return this.codePointAt(this.pos)
  }

  lookahead() {
    return this.codePointAt(this.nextIndex(this.pos))
  }

  advance() {
    this.pos = this.nextIndex(this.pos)
  }

  eat(ch) {
    if (this.current() === ch) {
      this.advance()
      return true
    }
    return false
  }

  parseDecimalInt(start, end) {
    return parseInt(this.source.slice(start, end), 10)
  }

  parseHexInt(start, end) {
    return parseInt(this.source.slice(start, end), 16)
  }

  parseOctalInt(start, end) {
    return parseInt(this.source.slice(start, end), 8)
  }

  codePointToString(ch) {
    if (ch <= 0xFFFF) {
      return String.fromCharCode(ch)
    }
    ch -= 0x10000
    return String.fromCharCode((ch >> 10) + 0xD800, (ch & 0x03FF) + 0xDC00)
  }

  // ---------------------------------------------------------------------------
  // Productions
  // ---------------------------------------------------------------------------

  // https://www.ecma-international.org/ecma-262/8.0/#prod-Pattern
  pattern() {
    this.pos = 0
    this.numCapturingParens = 0
    this.maxBackReference = 0
    this.groupNames.length = 0
    this.backReferenceNames.length = 0

    this.disjunction()

    if (this.pos !== this.source.length) {
      // Make the same messages as V8.
      if (this.eat(RIGHT_PARENTHESIS)) {
        this.raise("Unmatched ')'")
      }
      if (this.eat(RIGHT_SQUARE_BRACKET) || this.eat(RIGHT_CURLY_BRACKET)) {
        this.raise("Lone quantifier brackets")
      }
    }
    if (this.maxBackReference > this.numCapturingParens) {
      this.raise("Invalid escape")
    }
    for (const name of this.backReferenceNames) {
      if (this.groupNames.indexOf(name) === -1) {
        this.raise("Invalid named capture referenced")
      }
    }
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-Disjunction
  disjunction() {
    this.alternative()
    while (this.eat(VERTICAL_LINE)) {
      this.alternative()
    }

    // Make the same message as V8.
    if (this.eatQuantifier(true)) {
      this.raise("Nothing to repeat")
    }
    if (this.eat(LEFT_CURLY_BRACKET)) {
      this.raise("Lone quantifier brackets")
    }
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-Alternative
  alternative() {
    while (this.pos < this.source.length && this.eatTerm())
      ;
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-Term
  eatTerm() {
    const start = this.pos

    if (this.eatQuantifiableAssertion()) {
      if (this.eatQuantifier()) {
        // Make the same message as V8.
        if (this.switchU) {
          this.raise("Invalid quantifier")
        }
        return true
      }
      this.pos = start
    }

    if (this.eatAssertion()) {
      return true
    }

    if (this.switchU ? this.eatAtom() : this.eatExtendedAtom()) {
      this.eatQuantifier()
      return true
    }

    return false
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-Assertion
  eatAssertion() {
    return (
      this.eat(CIRCUMFLEX_ACCENT) ||
      this.eat(DOLLAR_SIGN) ||
      this._eatWordBoundary() ||
      this._eatLookaheadAssertion()
    )
  }
  _eatWordBoundary() {
    const start = this.pos
    if (this.eat(REVERSE_SOLIDUS)) {
      if (this.eat(LATIN_CAPITAL_LETTER_B) || this.eat(LATIN_SMALL_LETTER_B)) {
        return true
      }
      this.pos = start
    }
    return false
  }
  _eatLookaheadAssertion() {
    const start = this.pos
    if (this.eat(LEFT_PARENTHESIS)) {
      if (this.eat(QUESTION_MARK) && (this.eat(EQUALS_SIGN) || this.eat(EXCLAMATION_MARK))) {
        this.disjunction()
        if (!this.eat(RIGHT_PARENTHESIS)) {
          this.raise("Unterminated group")
        }
        return true
      }
      this.pos = start
    }
    return false
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-QuantifiableAssertion
  eatQuantifiableAssertion() {
    return this._eatLookaheadAssertion()
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-Quantifier
  eatQuantifier(noError = false) {
    if (this.eatQuantifierPrefix(noError)) {
      this.eat(QUESTION_MARK)
      return true
    }
    return false
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-QuantifierPrefix
  eatQuantifierPrefix(noError) {
    return (
      this.eat(ASTERISK) ||
      this.eat(PLUS_SIGN) ||
      this.eat(QUESTION_MARK) ||
      this._eatBracedQuantifier(noError)
    )
  }
  _eatBracedQuantifier(noError) {
    const start = this.pos
    if (this.eat(LEFT_CURLY_BRACKET)) {
      let i = this.pos, min = 0, max = -1
      if (this.eatDecimalDigits()) {
        min = this.parseDecimalInt(i, this.pos)
        if (this.eat(COMMA)) {
          i = this.pos
          if (this.eatDecimalDigits()) {
            max = this.parseDecimalInt(i, this.pos)
          }
        }
        if (this.eat(RIGHT_CURLY_BRACKET)) {
          // SyntaxError in https://www.ecma-international.org/ecma-262/8.0/#sec-term
          if (max !== -1 && max < min && !noError) {
            this.raise("numbers out of order in {} quantifier")
          }
          return true
        }
      }
      if (this.switchU && !noError) {
        this.raise("Incomplete quantifier")
      }
      this.pos = start
    }
    return false
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-Atom
  eatAtom() {
    return (
      this.eatPatternCharacters() ||
      this.eat(FULL_STOP) ||
      this._eatReverseSolidusAtomEscape() ||
      this.eatCharacterClass() ||
      this._eatUncapturingGroup() ||
      this._eatCapturingGroup()
    )
  }
  _eatReverseSolidusAtomEscape() {
    const start = this.pos
    if (this.eat(REVERSE_SOLIDUS)) {
      if (this.eatAtomEscape()) {
        return true
      }
      this.pos = start
    }
    return false
  }
  _eatUncapturingGroup() {
    const start = this.pos
    if (this.eat(LEFT_PARENTHESIS)) {
      if (this.eat(QUESTION_MARK) && this.eat(COLON)) {
        this.disjunction()
        if (this.eat(RIGHT_PARENTHESIS)) {
          return true
        }
        this.raise("Unterminated group")
      }
      this.pos = start
    }
    return false
  }
  _eatCapturingGroup() {
    if (this.eat(LEFT_PARENTHESIS)) {
      if (this.ecmaVersion >= 9) {
        this.groupSpecifier()
      } else if (this.current() === QUESTION_MARK) {
        this.raise("Invalid group")
      }
      this.disjunction()
      if (this.eat(RIGHT_PARENTHESIS)) {
        this.numCapturingParens += 1
        return true
      }
      this.raise("Unterminated group")
    }
    return false
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ExtendedAtom
  eatExtendedAtom() {
    return (
      this.eat(FULL_STOP) ||
      this._eatReverseSolidusAtomEscape() ||
      this.eatCharacterClass() ||
      this._eatUncapturingGroup() ||
      this._eatCapturingGroup() ||
      this.eatInvalidBracedQuantifier() ||
      this.eatExtendedPatternCharacter()
    )
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-InvalidBracedQuantifier
  eatInvalidBracedQuantifier() {
    if (this._eatBracedQuantifier(true)) {
      this.raise("Nothing to repeat")
    }
    return false
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-SyntaxCharacter
  eatSyntaxCharacter() {
    if (this._isSyntaxCharacter(this.current())) {
      this.advance()
      return true
    }
    return false
  }
  _isSyntaxCharacter(ch) {
    return (
      ch === CIRCUMFLEX_ACCENT ||
      ch === DOLLAR_SIGN ||
      ch === REVERSE_SOLIDUS ||
      ch === FULL_STOP ||
      ch === ASTERISK ||
      ch === PLUS_SIGN ||
      ch === QUESTION_MARK ||
      ch === LEFT_PARENTHESIS ||
      ch === RIGHT_PARENTHESIS ||
      ch === LEFT_SQUARE_BRACKET ||
      ch === RIGHT_SQUARE_BRACKET ||
      ch === LEFT_CURLY_BRACKET ||
      ch === RIGHT_CURLY_BRACKET ||
      ch === VERTICAL_LINE
    )
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-PatternCharacter
  // But eat eager.
  eatPatternCharacters() {
    const start = this.pos
    let ch = 0
    while ((ch = this.current()) !== -1 && !this._isSyntaxCharacter(ch)) {
      this.advance()
    }
    return this.pos !== start
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ExtendedPatternCharacter
  eatExtendedPatternCharacter() {
    const ch = this.current()
    if (
      ch !== -1 &&
      ch !== CIRCUMFLEX_ACCENT &&
      ch !== DOLLAR_SIGN &&
      ch !== FULL_STOP &&
      ch !== ASTERISK &&
      ch !== PLUS_SIGN &&
      ch !== QUESTION_MARK &&
      ch !== LEFT_PARENTHESIS &&
      ch !== RIGHT_PARENTHESIS &&
      ch !== LEFT_SQUARE_BRACKET &&
      ch !== VERTICAL_LINE
    ) {
      this.advance()
      return true
    }
    return false
  }

  // GroupSpecifier[U] ::
  //   [empty]
  //   `?` GroupName[?U]
  groupSpecifier() {
    if (this.eat(QUESTION_MARK)) {
      if (this.eatGroupName()) {
        if (this.groupNames.indexOf(this.lastStringValue) !== -1) {
          this.raise("Duplicate capture group name")
        }
        this.groupNames.push(this.lastStringValue)
        return
      }
      this.raise("Invalid group")
    }
  }

  // GroupName[U] ::
  //   `<` RegExpIdentifierName[?U] `>`
  // RegExpIdentifierName[U] ::
  //   RegExpIdentifierStart[?U]
  //   RegExpIdentifierName[?U] RegExpIdentifierPart[?U]
  // Note: this updates `this.lastStringValue` property with the eaten name.
  eatGroupName() {
    this.lastStringValue = ""
    if (this.eat(LESS_THAN_SIGN)) {
      if (this.eatRegExpIdentifierStart()) {
        while (this.eatRegExpIdentifierPart())
          ;
        if (this.eat(GREATER_THAN_SIGN)) {
          return true
        }
      }
      this.raise("Invalid capture group name")
    }
    return false
  }

  // RegExpIdentifierStart[U] ::
  //   UnicodeIDStart
  //   `$`
  //   `_`
  //   `\` RegExpUnicodeEscapeSequence[?U]
  // Note: this appends the eaten character to `this.lastStringValue` property.
  eatRegExpIdentifierStart() {
    const start = this.pos
    let ch = this.current()
    this.advance()

    if (ch === REVERSE_SOLIDUS && this.eatRegExpUnicodeEscapeSequence()) {
      ch = this._parseRegExpUnicodeEscapeSequence(start + 1, this.pos)
    }
    if (this._isRegExpIdentifierStart(ch)) {
      this.lastStringValue += this.codePointToString(ch)
      return true
    }

    this.pos = start
    return false
  }
  _isRegExpIdentifierStart(ch) {
    return isIdentifierStart(ch, true) || ch === DOLLAR_SIGN || ch === LOW_LINE
  }

  // RegExpIdentifierPart[U] ::
  //   UnicodeIDContinue
  //   `$`
  //   `_`
  //   `\` RegExpUnicodeEscapeSequence[?U]
  //   <ZWNJ>
  //   <ZWJ>
  // Note: this appends the eaten character to `this.lastStringValue` property.
  eatRegExpIdentifierPart() {
    const start = this.pos
    let ch = this.current()
    this.advance()

    if (ch === REVERSE_SOLIDUS && this.eatRegExpUnicodeEscapeSequence()) {
      ch = this._parseRegExpUnicodeEscapeSequence(start + 1, this.pos)
    }
    if (this._isRegExpIdentifierPart(ch)) {
      this.lastStringValue += this.codePointToString(ch)
      return true
    }

    this.pos = start
    return false
  }
  _isRegExpIdentifierPart(ch) {
    return isIdentifierChar(ch, true) || ch === DOLLAR_SIGN || ch === LOW_LINE || ch === ZERO_WIDTH_NON_JOINER || ch === ZERO_WIDTH_JOINER
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-AtomEscape
  eatAtomEscape() {
    if (
      this._eatBackReference() ||
      this.eatCharacterClassEscape() ||
      this.eatCharacterEscape() ||
      (this.switchN && this._eatKGroupName())
    ) {
      return true
    }
    if (this.switchU) {
      // Make the same message as V8.
      if (this.current() === LATIN_SMALL_LETTER_C) {
        this.raise("Invalid unicode escape")
      }
      this.raise("Invalid escape")
    }
    return false
  }
  _eatBackReference() {
    const start = this.pos
    if (this.eatDecimalEscape()) {
      const n = this.parseDecimalInt(start, this.pos)
      if (this.switchU) {
        // For SyntaxError in https://www.ecma-international.org/ecma-262/8.0/#sec-atomescape
        if (n > this.maxBackReference) {
          this.maxBackReference = n
        }
        return true
      }
      if (n <= this.numCapturingParens) {
        return true
      }
      this.pos = start
    }
    return false
  }
  _eatKGroupName() {
    if (this.eat(LATIN_SMALL_LETTER_K)) {
      if (this.eatGroupName()) {
        this.backReferenceNames.push(this.lastStringValue)
        return true
      }
      this.raise("Invalid named reference")
    }
    return false
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-CharacterEscape
  eatCharacterEscape() {
    return (
      this.eatControlEscape() ||
      this._eatCControlLetter() ||
      this._eatZero() ||
      this.eatHexEscapeSequence() ||
      this.eatRegExpUnicodeEscapeSequence() ||
      (!this.switchU && this.eatLegacyOctalEscapeSequence()) ||
      this.eatIdentityEscape()
    )
  }
  _eatCControlLetter() {
    const start = this.pos
    if (this.eat(LATIN_SMALL_LETTER_C)) {
      if (this.eatControlLetter()) {
        return true
      }
      this.pos = start
    }
    return false
  }
  _eatZero() {
    if (this.current() === DIGIT_ZERO && !this._isDecimalDigit(this.lookahead())) {
      this.advance()
      return true
    }
    return false
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-ControlEscape
  eatControlEscape() {
    if (this._isControlEscape(this.current())) {
      this.advance()
      return true
    }
    return false
  }
  _isControlEscape(ch) {
    return (
      ch === LATIN_SMALL_LETTER_F ||
      ch === LATIN_SMALL_LETTER_N ||
      ch === LATIN_SMALL_LETTER_R ||
      ch === LATIN_SMALL_LETTER_T ||
      ch === LATIN_SMALL_LETTER_V
    )
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-ControlLetter
  eatControlLetter() {
    if (this._isControlLetter(this.current())) {
      this.advance()
      return true
    }
    return false
  }
  _isControlLetter(ch) {
    return (
      (ch >= LATIN_CAPITAL_LETTER_A && ch <= LATIN_CAPITAL_LETTER_Z) ||
      (ch >= LATIN_SMALL_LETTER_A && ch <= LATIN_SMALL_LETTER_Z)
    )
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-RegExpUnicodeEscapeSequence
  eatRegExpUnicodeEscapeSequence() {
    const start = this.pos

    if (this.eat(LATIN_SMALL_LETTER_U)) {
      if (this._eatFixedHexDigits(4)) {
        const code = this.parseHexInt(this.pos - 4, this.pos)
        if (this.switchU && code >= 0xD800 && code <= 0xDBFF) {
          const leadSurrogateEnd = this.pos
          if (this.eat(REVERSE_SOLIDUS) && this.eat(LATIN_SMALL_LETTER_U) && this._eatFixedHexDigits(4)) {
            const codeT = this.parseHexInt(this.pos - 4, this.pos)
            if (codeT >= 0xDC00 && codeT <= 0xDFFF) {
              return true
            }
          }
          this.pos = leadSurrogateEnd
        }
        return true
      }
      if (
        this.switchU &&
        this.eat(LEFT_CURLY_BRACKET) &&
        this.eatHexDigits() &&
        this.eat(RIGHT_CURLY_BRACKET) &&
        this._isValidUnicode(this.parseHexInt(start + 2, this.pos - 1))
      ) {
        return true
      }
      if (this.switchU) {
        this.raise("Invalid unicode escape")
      }
      this.pos = start
    }

    return false
  }
  _isValidUnicode(ch) {
    return ch >= 0 && ch <= 0x10FFFF
  }
  _parseRegExpUnicodeEscapeSequence(start, end) {
    start += 1 // skip `u`
    if (end - start >= 3 && this.codePointAt(start) === LEFT_CURLY_BRACKET) {
      return this.parseHexInt(start + 1, end - 1)
    }
    if (end - start === 4) {
      return this.parseHexInt(start, end)
    }
    if (end - start === 10) {
      const lead = this.parseHexInt(start, start + 4)
      const trail = this.parseHexInt(end - 4, end)
      return (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000
    }
    return LATIN_SMALL_LETTER_U
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-IdentityEscape
  eatIdentityEscape() {
    if (this.switchU) {
      return (
        this.eatSyntaxCharacter() ||
        this.eat(SOLIDUS)
      )
    }

    const ch = this.current()
    if (ch !== LATIN_SMALL_LETTER_C && (!this.switchN || ch !== LATIN_SMALL_LETTER_K)) {
      this.advance()
      return true
    }

    return false
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-DecimalEscape
  eatDecimalEscape() {
    let ch = this.current()
    if (ch >= DIGIT_ONE && ch <= DIGIT_NINE) {
      do {
        this.advance()
      } while ((ch = this.current()) >= DIGIT_ZERO && ch <= DIGIT_NINE)
      return true
    }
    return false
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-CharacterClassEscape
  eatCharacterClassEscape() {
    const ch = this.current()
    if (this._isCharacterClassEscape(ch)) {
      this.advance()
      return true
    }
    if (this.switchU && this.ecmaVersion >= 9 && (ch === LATIN_CAPITAL_LETTER_P || ch === LATIN_SMALL_LETTER_P)) {
      this.advance()
      if (this.eat(LEFT_CURLY_BRACKET) && this.eatUnicodePropertyValueExpression() && this.eat(RIGHT_CURLY_BRACKET)) {
        return true
      }
      this.raise("Invalid property name")
    }
    return false
  }
  _isCharacterClassEscape(ch) {
    return (
      ch === LATIN_SMALL_LETTER_D ||
      ch === LATIN_CAPITAL_LETTER_D ||
      ch === LATIN_SMALL_LETTER_S ||
      ch === LATIN_CAPITAL_LETTER_S ||
      ch === LATIN_SMALL_LETTER_W ||
      ch === LATIN_CAPITAL_LETTER_W
    )
  }

  // UnicodePropertyValueExpression ::
  //   UnicodePropertyName `=` UnicodePropertyValue
  //   LoneUnicodePropertyNameOrValue
  eatUnicodePropertyValueExpression() {
    const start = this.pos

    if (this.eatUnicodePropertyName() && this.eat(EQUALS_SIGN)) {
      const name = this.lastStringValue
      if (this.eatUnicodePropertyValue()) {
        const value = this.lastStringValue
        this._validateUnicodePropertyNameAndValue(name, value)
        return true
      }
    }
    this.pos = start

    if (this.eatLoneUnicodePropertyNameOrValue()) {
      const nameOrValue = this.lastStringValue
      this._validateUnicodePropertyNameOrValue(nameOrValue)
      return true
    }
    return false
  }
  _validateUnicodePropertyNameAndValue(name, value) {
    if (!UNICODE_PROPERTY_VALUES.hasOwnProperty(name) || UNICODE_PROPERTY_VALUES[name].indexOf(value) === -1) {
      this.raise("Invalid property name")
    }
  }
  _validateUnicodePropertyNameOrValue(nameOrValue) {
    if (UNICODE_PROPERTY_VALUES.$LONE.indexOf(nameOrValue) === -1) {
      this.raise("Invalid property name")
    }
  }

  // UnicodePropertyName ::
  //   UnicodePropertyNameCharacters
  eatUnicodePropertyName() {
    let ch = 0
    this.lastStringValue = ""
    while (this._isUnicodePropertyNameCharacter(ch = this.current())) {
      this.lastStringValue += this.codePointToString(ch)
      this.advance()
    }
    return this.lastStringValue !== ""
  }
  _isUnicodePropertyNameCharacter(ch) {
    return this._isControlLetter(ch) || ch === LOW_LINE
  }

  // UnicodePropertyValue ::
  //   UnicodePropertyValueCharacters
  eatUnicodePropertyValue() {
    let ch = 0
    this.lastStringValue = ""
    while (this._isUnicodePropertyValueCharacter(ch = this.current())) {
      this.lastStringValue += this.codePointToString(ch)
      this.advance()
    }
    return this.lastStringValue !== ""
  }
  _isUnicodePropertyValueCharacter(ch) {
    return this._isUnicodePropertyNameCharacter(ch) || this._isDecimalDigit(ch)
  }

  // LoneUnicodePropertyNameOrValue ::
  //   UnicodePropertyValueCharacters
  eatLoneUnicodePropertyNameOrValue() {
    return this.eatUnicodePropertyValue()
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-CharacterClass
  eatCharacterClass() {
    if (this.eat(LEFT_SQUARE_BRACKET)) {
      this.eat(CIRCUMFLEX_ACCENT)
      this.classRanges()
      if (this.eat(RIGHT_SQUARE_BRACKET)) {
        return true
      }
      // Unreachable since it threw "unterminated regular expression" error before.
      this.raise("Unterminated character class")
    }
    return false
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-ClassRanges
  // https://www.ecma-international.org/ecma-262/8.0/#prod-NonemptyClassRanges
  // https://www.ecma-international.org/ecma-262/8.0/#prod-NonemptyClassRangesNoDash
  classRanges() {
    for (; ;) {
      const leftStart = this.pos
      if (this.eatClassAtom()) {
        const leftEnd = this.pos
        if (this.eat(HYPHEN_MINUS)) {
          const rightStart = this.pos
          if (this.eatClassAtom()) {
            const rightEnd = this.pos
            const left = this._parseClassAtom(leftStart, leftEnd, false)
            const right = this._parseClassAtom(rightStart, rightEnd, true)
            if (this.switchU && (left === -1 || right === -1)) {
              this.raise("Invalid character class")
            }
            if (left !== -1 && right !== -1 && left > right) {
              this.raise("Range out of order in character class")
            }
          }
        }
      } else {
        break
      }
    }
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-ClassAtom
  // https://www.ecma-international.org/ecma-262/8.0/#prod-ClassAtomNoDash
  eatClassAtom() {
    const start = this.pos

    if (this.eat(REVERSE_SOLIDUS)) {
      if (this.eatClassEscape()) {
        return true
      }
      if (this.switchU) {
        // Make the same message as V8.
        const ch = this.current()
        if (ch === LATIN_SMALL_LETTER_C || this._isOctalDigit(ch)) {
          this.raise("Invalid class escape")
        }
        this.raise("Invalid escape")
      }
      this.pos = start
    }

    const ch = this.current()
    if (ch !== RIGHT_SQUARE_BRACKET) {
      this.advance()
      return true
    }

    return false
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ClassEscape
  eatClassEscape() {
    return (
      this.eat(LATIN_SMALL_LETTER_B) ||
      (this.switchU && this.eat(HYPHEN_MINUS)) ||
      (!this.switchU && this._eatCClassControlLetter()) ||
      this.eatCharacterClassEscape() ||
      this.eatCharacterEscape()
    )
  }
  _eatCClassControlLetter() {
    const start = this.pos
    if (this.eat(LATIN_SMALL_LETTER_C)) {
      if (this.eatClassControlLetter()) {
        return true
      }
      this.pos = start
    }
    return false
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ClassControlLetter
  eatClassControlLetter() {
    const ch = this.current()
    if (this._isDecimalDigit(ch) || ch === LOW_LINE) {
      this.advance()
      return true
    }
    return false
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-HexEscapeSequence
  eatHexEscapeSequence() {
    const start = this.pos

    if (this.eat(LATIN_SMALL_LETTER_X)) {
      if (this._eatFixedHexDigits(2)) {
        return true
      }
      if (this.switchU) {
        this.raise("Invalid escape")
      }
      this.pos = start
    }

    return false
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-DecimalDigits
  eatDecimalDigits() {
    const start = this.pos
    while (this._isDecimalDigit(this.current())) {
      this.advance()
    }
    return this.pos !== start
  }
  _isDecimalDigit(ch) {
    return ch >= DIGIT_ZERO && ch <= DIGIT_NINE
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-HexDigits
  eatHexDigits() {
    const start = this.pos
    while (this._isHexDigit(this.current())) {
      this.advance()
    }
    return this.pos !== start
  }
  _isHexDigit(ch) {
    return (
      (ch >= DIGIT_ZERO && ch <= DIGIT_NINE) ||
      (ch >= LATIN_CAPITAL_LETTER_A && ch <= LATIN_CAPITAL_LETTER_F) ||
      (ch >= LATIN_SMALL_LETTER_A && ch <= LATIN_SMALL_LETTER_F)
    )
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-LegacyOctalEscapeSequence
  // Allows only 0-377(octal) i.e. 0-255(decimal).
  eatLegacyOctalEscapeSequence() {
    const ch = this.current()
    if (this.eatOctalDigit()) {
      if (this.eatOctalDigit() && ch <= DIGIT_THREE) {
        this.eatOctalDigit()
      }
      return true
    }
    return false
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-OctalDigit
  eatOctalDigit() {
    if (this._isOctalDigit(this.current())) {
      this.advance()
      return true
    }
    return false
  }
  _isOctalDigit(ch) {
    return ch >= DIGIT_ZERO && ch <= DIGIT_SEVEN
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-Hex4Digits
  // https://www.ecma-international.org/ecma-262/8.0/#prod-HexDigit
  // And HexDigit HexDigit in https://www.ecma-international.org/ecma-262/8.0/#prod-HexEscapeSequence
  _eatFixedHexDigits(length) {
    const start = this.pos
    for (let i = 0; i < length; ++i) {
      if (!this._isHexDigit(this.current())) {
        this.pos = start
        return false
      }
      this.advance()
    }
    return true
  }

  // https://www.ecma-international.org/ecma-262/8.0/#sec-classatom
  // https://www.ecma-international.org/ecma-262/8.0/#sec-classatomnodash
  // https://www.ecma-international.org/ecma-262/8.0/#sec-classescape
  // Get the value of chracters to validate class ranges (e.g., [a-z]).
  _parseClassAtom(start, end, isRight) {
    const ch1 = this._getOneElementCharSetAt(start, isRight)
    if (ch1 === REVERSE_SOLIDUS) {
      const ch2 = this._getOneElementCharSetAt(start + 1, isRight)
      switch (ch2) {
      case LATIN_SMALL_LETTER_B:
        return BACKSPACE

      // CharacterClassEscape
      case LATIN_SMALL_LETTER_D:
      case LATIN_CAPITAL_LETTER_D:
      case LATIN_SMALL_LETTER_S:
      case LATIN_CAPITAL_LETTER_S:
      case LATIN_SMALL_LETTER_W:
      case LATIN_CAPITAL_LETTER_W:
      case LATIN_SMALL_LETTER_P:
      case LATIN_CAPITAL_LETTER_P:
        return -1 // Those are not single character.

      // CharacterEscape
      case LATIN_SMALL_LETTER_T:
        return CHARACTER_TABULATION
      case LATIN_SMALL_LETTER_N:
        return LINE_FEED
      case LATIN_SMALL_LETTER_V:
        return LINE_TABULATION
      case LATIN_SMALL_LETTER_F:
        return FORM_FEED
      case LATIN_SMALL_LETTER_R:
        return CARRIAGE_RETURN
      case LATIN_SMALL_LETTER_C:
        if (end - start === 3) {
          return this.codePointAt(start + 2) % 32
        }
        return LATIN_SMALL_LETTER_C
      case LATIN_SMALL_LETTER_X:
        if (end - start === 4) {
          return this.parseHexInt(start + 2, end)
        }
        return LATIN_SMALL_LETTER_X
      case LATIN_SMALL_LETTER_U:
        return this._parseRegExpUnicodeEscapeSequence(start + 1, end)
      default:
        if (!this.switchU && ch2 >= DIGIT_ZERO && ch2 <= DIGIT_SEVEN) {
          return this.parseOctalInt(start + 1, end)
        }
        return ch2
      }
    }
    return ch1
  }
  // https://www.ecma-international.org/ecma-262/8.0/#sec-notation
  _getOneElementCharSetAt(i, isRight) {
    const ch = this.codePointAt(i)
    if (this.switchU || ch <= 0xFFFF) {
      return ch
    }
    // This is a surrogate pair and no `u` flag, so returns a code point.
    // If the right of `-` then returns the lead surrogate.
    // If the left of `-` then returns the trail surrogate.
    return this.source.charCodeAt(isRight ? i : i + 1)
  }
}
