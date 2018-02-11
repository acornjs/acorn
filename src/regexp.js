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
const EQUALS_SIGN = 0x3D // =
const QUESTION_MARK = 0x3F // ?
const LATIN_CAPITAL_LETTER_A = 0x41 // A
const LATIN_CAPITAL_LETTER_B = 0x42 // B
const LATIN_CAPITAL_LETTER_D = 0x44 // D
const LATIN_CAPITAL_LETTER_F = 0x46 // F
const LATIN_CAPITAL_LETTER_S = 0x53 // S
const LATIN_CAPITAL_LETTER_W = 0x57 // W
const LATIN_CAPITAL_LETTER_Z = 0x5A // Z
const LOW_LINE = 0x5F // _
const LATIN_SMALL_LETTER_A = 0x61 // a
const LATIN_SMALL_LETTER_B = 0x62 // b
const LATIN_SMALL_LETTER_C = 0x63 // c
const LATIN_SMALL_LETTER_D = 0x64 // d
const LATIN_SMALL_LETTER_F = 0x66 // f
const LATIN_SMALL_LETTER_N = 0x6E // n
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
    this.pos = 0
    this.numCapturingParens = 0
    this.maxBackReference = 0
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
    this.pos = 0
    this.numCapturingParens = 0
    this.maxBackReference = 0

    this.disjunction(unicode)
    if (this.pos !== this.source.length) {
      // Make the same messages as V8.
      if (this.eat(RIGHT_PARENTHESIS)) {
        this.raise("Unmatched ')'")
      }
      if (this.eat(RIGHT_SQUARE_BRACKET) || this.eat(RIGHT_CURLY_BRACKET)) {
        this.raise("Lone quantifier brackets")
      }
    }
    // SyntaxError in https://www.ecma-international.org/ecma-262/8.0/#sec-atomescape
    if (this.maxBackReference > this.numCapturingParens) {
      this.raise("Invalid escape")
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

  // ---------------------------------------------------------------------------
  // Productions
  // ---------------------------------------------------------------------------

  // https://www.ecma-international.org/ecma-262/8.0/#prod-Disjunction
  disjunction(unicode) {
    this.alternative(unicode)
    while (this.eat(VERTICAL_LINE)) {
      this.alternative(unicode)
    }

    // Make the same message as V8.
    if (this.eatQuantifier(unicode, true)) {
      this.raise("Nothing to repeat")
    }
    if (this.eat(LEFT_CURLY_BRACKET)) {
      this.raise("Lone quantifier brackets")
    }
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-Alternative
  alternative(unicode) {
    while (this.pos < this.source.length && this.eatTerm(unicode))
      ;
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-Term
  eatTerm(unicode) {
    const start = this.pos

    if (this.eatQuantifiableAssertion()) {
      if (this.eatQuantifier(unicode)) {
        // Make the same message as V8.
        if (unicode) {
          this.raise("Invalid quantifier")
        }
        return true
      }
      this.pos = start
    }

    if (this.eatAssertion(unicode)) {
      return true
    }

    if (unicode ? this.eatAtom(true) : this.eatExtendedAtom()) {
      this.eatQuantifier(unicode)
      return true
    }

    return false
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-Assertion
  eatAssertion(unicode) {
    return (
      this.eat(CIRCUMFLEX_ACCENT) ||
      this.eat(DOLLAR_SIGN) ||
      this._eatWordBoundary() ||
      this._eatLookaheadAssertion(unicode)
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
  _eatLookaheadAssertion(unicode) {
    const start = this.pos
    if (this.eat(LEFT_PARENTHESIS)) {
      if (this.eat(QUESTION_MARK) && (this.eat(EQUALS_SIGN) || this.eat(EXCLAMATION_MARK))) {
        this.disjunction(unicode)
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
    return this._eatLookaheadAssertion(false)
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-Quantifier
  eatQuantifier(unicode, noError = false) {
    if (this.eatQuantifierPrefix(unicode, noError)) {
      this.eat(QUESTION_MARK)
      return true
    }
    return false
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-QuantifierPrefix
  eatQuantifierPrefix(unicode, noError) {
    return (
      this.eat(ASTERISK) ||
      this.eat(PLUS_SIGN) ||
      this.eat(QUESTION_MARK) ||
      this._eatBracedQuantifier(unicode, noError)
    )
  }
  _eatBracedQuantifier(unicode, noError) {
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
      if (unicode && !noError) {
        this.raise("Incomplete quantifier")
      }
      this.pos = start
    }
    return false
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-Atom
  eatAtom(unicode) {
    return (
      this.eatPatternCharacters() ||
      this.eat(FULL_STOP) ||
      this._eatReverseSolidusAtomEscape(unicode) ||
      this.eatCharacterClass(unicode) ||
      this._eatCapturingOrUncapturingGroup(unicode)
    )
  }
  _eatReverseSolidusAtomEscape(unicode) {
    const start = this.pos
    if (this.eat(REVERSE_SOLIDUS)) {
      if (this.eatAtomEscape(unicode)) {
        return true
      }
      this.pos = start
    }
    return false
  }
  _eatCapturingOrUncapturingGroup(unicode) {
    if (this.eat(LEFT_PARENTHESIS)) {
      const uncaptured = this.eat(QUESTION_MARK)
      if (uncaptured && !this.eat(COLON)) {
        this.raise("Invalid group")
      }
      this.disjunction(unicode)
      if (!this.eat(RIGHT_PARENTHESIS)) {
        this.raise("Unterminated group")
      }
      if (!uncaptured) {
        this.numCapturingParens += 1
      }
      return true
    }
    return false
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ExtendedAtom
  eatExtendedAtom() {
    return (
      this.eat(FULL_STOP) ||
      this._eatReverseSolidusAtomEscape(false) ||
      this.eatCharacterClass(false) ||
      this._eatCapturingOrUncapturingGroup(false) ||
      this.eatInvalidBracedQuantifier() ||
      this.eatExtendedPatternCharacter()
    )
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-InvalidBracedQuantifier
  eatInvalidBracedQuantifier() {
    if (this._eatBracedQuantifier(false, true)) {
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

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-AtomEscape
  eatAtomEscape(unicode) {
    const start = this.pos
    if (this.eatDecimalEscape()) {
      const n = this.parseDecimalInt(start, this.pos)
      if (unicode) {
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
    if (this.eatCharacterClassEscape(unicode) || this.eatCharacterEscape(unicode)) {
      return true
    }
    if (unicode) {
      // Make the same message as V8.
      if (this.current() === LATIN_SMALL_LETTER_C) {
        this.raise("Invalid unicode escape")
      }
      this.raise("Invalid escape")
    }
    return false
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-CharacterEscape
  eatCharacterEscape(unicode) {
    return (
      this.eatControlEscape() ||
      this._eatCControlLetter() ||
      this._eatZero() ||
      this.eatHexEscapeSequence(unicode) ||
      this.eatRegExpUnicodeEscapeSequence(unicode) ||
      (!unicode && this.eatLegacyOctalEscapeSequence()) ||
      this.eatIdentityEscape(unicode)
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
  eatRegExpUnicodeEscapeSequence(unicode) {
    const start = this.pos

    if (this.eat(LATIN_SMALL_LETTER_U)) {
      if (this._eatFixedHexDigits(4)) {
        const code = this.parseHexInt(this.pos - 4, this.pos)
        if (unicode && code >= 0xD800 && code <= 0xDBFF) {
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
        unicode &&
        this.eat(LEFT_CURLY_BRACKET) &&
        this.eatHexDigits() &&
        this.eat(RIGHT_CURLY_BRACKET) &&
        this._isValidUnicode(this.parseHexInt(start + 2, this.pos - 1))
      ) {
        return true
      }
      if (unicode) {
        this.raise("Invalid unicode escape")
      }
      this.pos = start
    }

    return false
  }
  _isValidUnicode(ch) {
    return ch >= 0 && ch <= 0x10FFFF
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-IdentityEscape
  eatIdentityEscape(unicode) {
    if (unicode) {
      return (
        this.eatSyntaxCharacter() ||
        this.eat(SOLIDUS)
      )
    }

    if (this.current() !== LATIN_SMALL_LETTER_C) {
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
    if (this._isCharacterClassEscape(this.current())) {
      this.advance()
      return true
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

  // https://www.ecma-international.org/ecma-262/8.0/#prod-CharacterClass
  eatCharacterClass(unicode) {
    if (this.eat(LEFT_SQUARE_BRACKET)) {
      this.eat(CIRCUMFLEX_ACCENT)
      this.classRanges(unicode)
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
  classRanges(unicode) {
    for (; ;) {
      const leftStart = this.pos
      if (this.eatClassAtom(unicode)) {
        const leftEnd = this.pos
        if (this.eat(HYPHEN_MINUS)) {
          const rightStart = this.pos
          if (this.eatClassAtom(unicode)) {
            const rightEnd = this.pos
            const left = this._parseClassAtom(leftStart, leftEnd, unicode, false)
            const right = this._parseClassAtom(rightStart, rightEnd, unicode, true)
            if (unicode && (left === -1 || right === -1)) {
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
  eatClassAtom(unicode) {
    const start = this.pos

    if (this.eat(REVERSE_SOLIDUS)) {
      if (this.eatClassEscape(unicode)) {
        return true
      }
      if (unicode) {
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
  eatClassEscape(unicode) {
    return (
      this.eat(LATIN_SMALL_LETTER_B) ||
      (unicode && this.eat(HYPHEN_MINUS)) ||
      (!unicode && this._eatCClassControlLetter(unicode)) ||
      this.eatCharacterClassEscape() ||
      this.eatCharacterEscape(unicode)
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
  eatHexEscapeSequence(unicode) {
    const start = this.pos

    if (this.eat(LATIN_SMALL_LETTER_X)) {
      if (this._eatFixedHexDigits(2)) {
        return true
      }
      if (unicode) {
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
  _parseClassAtom(start, end, unicode, isRight) {
    const ch1 = this._getOneElementCharSetAt(start, unicode, isRight)
    if (ch1 === REVERSE_SOLIDUS) {
      const ch2 = this._getOneElementCharSetAt(start + 1, unicode, isRight)
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
        if (end - start >= 5 && this.codePointAt(start + 2) === LEFT_CURLY_BRACKET) {
          return this.parseHexInt(start + 3, end - 1)
        }
        if (end - start === 6) {
          return this.parseHexInt(start + 2, end)
        }
        if (end - start === 12) {
          const lead = this.parseHexInt(start + 2, start + 6)
          const trail = this.parseHexInt(start + 8, start + 12)
          return (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000
        }
        return LATIN_SMALL_LETTER_U
      default:
        if (!unicode && ch2 >= DIGIT_ZERO && ch2 <= DIGIT_SEVEN) {
          return this.parseOctalInt(start + 1, end)
        }
        return ch2
      }
    }
    return ch1
  }
  // https://www.ecma-international.org/ecma-262/8.0/#sec-notation
  _getOneElementCharSetAt(i, unicode, isRight) {
    const ch = this.codePointAt(i)
    if (unicode || ch <= 0xFFFF) {
      return ch
    }
    // This is a surrogate pair and no `u` flag, so returns a code point.
    // If the right of `-` then returns the lead surrogate.
    // If the left of `-` then returns the trail surrogate.
    return this.source.charCodeAt(isRight ? i : i + 1)
  }
}
