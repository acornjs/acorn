import {isIdentifierStart, isIdentifierChar} from "./identifier.js"
import {Parser} from "./state.js"
import UNICODE_PROPERTY_VALUES from "./unicode-property-data.js"

/* eslint no-invalid-this: error */

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

const pp = Parser.prototype

export class RegExpValidationState {
  constructor(parser) {
    this.parser = parser
    this.validFlags = `gim${parser.options.ecmaVersion >= 6 ? "uy" : ""}${parser.options.ecmaVersion >= 9 ? "s" : ""}`
    this.source = ""
    this.flags = ""
    this.start = 0
    this.switchU = false
    this.switchN = false
    this.pos = 0
    this.lastIntValue = 0
    this.lastStringValue = ""
    this.lastAssertionIsQuantifiable = false
    this.numCapturingParens = 0
    this.maxBackReference = 0
    this.groupNames = []
    this.backReferenceNames = []
  }

  reset(start, pattern, flags) {
    const unicode = flags.indexOf("u") !== -1
    this.start = start | 0
    this.source = pattern + ""
    this.flags = flags
    this.switchU = unicode && this.parser.options.ecmaVersion >= 6
    this.switchN = unicode && this.parser.options.ecmaVersion >= 9
  }

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
}

function codePointToString(ch) {
  if (ch <= 0xFFFF) {
    return String.fromCharCode(ch)
  }
  return String.fromCharCode(getLeadSurrogate(ch), getTrailSurrogate(ch))
}
function getLeadSurrogate(ch) {
  return ((ch - 0x10000) >> 10) + 0xD800
}
function getTrailSurrogate(ch) {
  return ((ch - 0x10000) & 0x03FF) + 0xDC00
}

/**
 * Validate the flags part of a given RegExpLiteral.
 *
 * @param {RegExpValidationState} state The state to validate RegExp.
 * @returns {void}
 */
pp.validateRegExpFlags = function(state) {
  const validFlags = state.validFlags
  const flags = state.flags

  for (let i = 0; i < flags.length; i++) {
    const flag = flags.charAt(i)
    if (validFlags.indexOf(flag) == -1) {
      this.raise(state.start, "Invalid regular expression flag")
    }
    if (flags.indexOf(flag, i + 1) > -1) {
      this.raise(state.start, "Duplicate regular expression flag")
    }
  }
}

/**
 * Validate the pattern part of a given RegExpLiteral.
 *
 * @param {RegExpValidationState} state The state to validate RegExp.
 * @returns {void}
 */
pp.validateRegExpPattern = function(state) {
  this.validateRegExp_pattern(state)

  // The goal symbol for the parse is |Pattern[~U, ~N]|. If the result of
  // parsing contains a |GroupName|, reparse with the goal symbol
  // |Pattern[~U, +N]| and use this result instead. Throw a *SyntaxError*
  // exception if _P_ did not conform to the grammar, if any elements of _P_
  // were not matched by the parse, or if any Early Error conditions exist.
  if (!state.switchN && this.options.ecmaVersion >= 9 && state.groupNames.length > 0) {
    state.switchN = true
    this.validateRegExp_pattern(state)
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Productions
// ---------------------------------------------------------------------------

// https://www.ecma-international.org/ecma-262/8.0/#prod-Pattern
pp.validateRegExp_pattern = function(state) {
  state.pos = 0
  state.lastIntValue = 0
  state.lastStringValue = ""
  state.lastAssertionIsQuantifiable = false
  state.numCapturingParens = 0
  state.maxBackReference = 0
  state.groupNames.length = 0
  state.backReferenceNames.length = 0

  this.validateRegExp_disjunction(state)

  if (state.pos !== state.source.length) {
    // Make the same messages as V8.
    if (state.eat(RIGHT_PARENTHESIS)) {
      state.raise("Unmatched ')'")
    }
    if (state.eat(RIGHT_SQUARE_BRACKET) || state.eat(RIGHT_CURLY_BRACKET)) {
      state.raise("Lone quantifier brackets")
    }
  }
  if (state.maxBackReference > state.numCapturingParens) {
    state.raise("Invalid escape")
  }
  for (const name of state.backReferenceNames) {
    if (state.groupNames.indexOf(name) === -1) {
      state.raise("Invalid named capture referenced")
    }
  }
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-Disjunction
pp.validateRegExp_disjunction = function(state) {
  this.validateRegExp_alternative(state)
  while (state.eat(VERTICAL_LINE)) {
    this.validateRegExp_alternative(state)
  }

  // Make the same message as V8.
  if (this.validateRegExp_eatQuantifier(state, true)) {
    state.raise("Nothing to repeat")
  }
  if (state.eat(LEFT_CURLY_BRACKET)) {
    state.raise("Lone quantifier brackets")
  }
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-Alternative
pp.validateRegExp_alternative = function(state) {
  while (state.pos < state.source.length && this.validateRegExp_eatTerm(state))
    ;
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-Term
pp.validateRegExp_eatTerm = function(state) {
  if (this.validateRegExp_eatAssertion(state)) {
    // Handle `QuantifiableAssertion Quantifier` alternative.
    // `state.lastAssertionIsQuantifiable` is true if the last eaten Assertion
    // is a QuantifiableAssertion.
    if (state.lastAssertionIsQuantifiable && this.validateRegExp_eatQuantifier(state)) {
      // Make the same message as V8.
      if (state.switchU) {
        state.raise("Invalid quantifier")
      }
    }
    return true
  }

  if (state.switchU ? this.validateRegExp_eatAtom(state) : this.validateRegExp_eatExtendedAtom(state)) {
    this.validateRegExp_eatQuantifier(state)
    return true
  }

  return false
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-Assertion
pp.validateRegExp_eatAssertion = function(state) {
  const start = state.pos
  state.lastAssertionIsQuantifiable = false

  // ^, $
  if (state.eat(CIRCUMFLEX_ACCENT) || state.eat(DOLLAR_SIGN)) {
    return true
  }

  // \b \B
  if (state.eat(REVERSE_SOLIDUS)) {
    if (state.eat(LATIN_CAPITAL_LETTER_B) || state.eat(LATIN_SMALL_LETTER_B)) {
      return true
    }
    state.pos = start
  }

  // Lookahead / Lookbehind
  if (state.eat(LEFT_PARENTHESIS) && state.eat(QUESTION_MARK)) {
    if (this.options.ecmaVersion >= 9) {
      state.eat(LESS_THAN_SIGN)
    }
    if (state.eat(EQUALS_SIGN) || state.eat(EXCLAMATION_MARK)) {
      this.validateRegExp_disjunction(state)
      if (!state.eat(RIGHT_PARENTHESIS)) {
        state.raise("Unterminated group")
      }
      state.lastAssertionIsQuantifiable = true
      return true
    }
  }

  state.pos = start
  return false
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-Quantifier
pp.validateRegExp_eatQuantifier = function(state, noError = false) {
  if (this.validateRegExp_eatQuantifierPrefix(state, noError)) {
    state.eat(QUESTION_MARK)
    return true
  }
  return false
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-QuantifierPrefix
pp.validateRegExp_eatQuantifierPrefix = function(state, noError) {
  return (
    state.eat(ASTERISK) ||
    state.eat(PLUS_SIGN) ||
    state.eat(QUESTION_MARK) ||
    this.validateRegExp_eatBracedQuantifier(state, noError)
  )
}
pp.validateRegExp_eatBracedQuantifier = function(state, noError) {
  const start = state.pos
  if (state.eat(LEFT_CURLY_BRACKET)) {
    let min = 0, max = -1
    if (this.validateRegExp_eatDecimalDigits(state)) {
      min = state.lastIntValue
      if (state.eat(COMMA) && this.validateRegExp_eatDecimalDigits(state)) {
        max = state.lastIntValue
      }
      if (state.eat(RIGHT_CURLY_BRACKET)) {
        // SyntaxError in https://www.ecma-international.org/ecma-262/8.0/#sec-term
        if (max !== -1 && max < min && !noError) {
          state.raise("numbers out of order in {} quantifier")
        }
        return true
      }
    }
    if (state.switchU && !noError) {
      state.raise("Incomplete quantifier")
    }
    state.pos = start
  }
  return false
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-Atom
pp.validateRegExp_eatAtom = function(state) {
  return (
    this.validateRegExp_eatPatternCharacters(state) ||
    state.eat(FULL_STOP) ||
    this.validateRegExp_eatReverseSolidusAtomEscape(state) ||
    this.validateRegExp_eatCharacterClass(state) ||
    this.validateRegExp_eatUncapturingGroup(state) ||
    this.validateRegExp_eatCapturingGroup(state)
  )
}
pp.validateRegExp_eatReverseSolidusAtomEscape = function(state) {
  const start = state.pos
  if (state.eat(REVERSE_SOLIDUS)) {
    if (this.validateRegExp_eatAtomEscape(state)) {
      return true
    }
    state.pos = start
  }
  return false
}
pp.validateRegExp_eatUncapturingGroup = function(state) {
  const start = state.pos
  if (state.eat(LEFT_PARENTHESIS)) {
    if (state.eat(QUESTION_MARK) && state.eat(COLON)) {
      this.validateRegExp_disjunction(state)
      if (state.eat(RIGHT_PARENTHESIS)) {
        return true
      }
      state.raise("Unterminated group")
    }
    state.pos = start
  }
  return false
}
pp.validateRegExp_eatCapturingGroup = function(state) {
  if (state.eat(LEFT_PARENTHESIS)) {
    if (this.options.ecmaVersion >= 9) {
      this.validateRegExp_groupSpecifier(state)
    } else if (state.current() === QUESTION_MARK) {
      state.raise("Invalid group")
    }
    this.validateRegExp_disjunction(state)
    if (state.eat(RIGHT_PARENTHESIS)) {
      state.numCapturingParens += 1
      return true
    }
    state.raise("Unterminated group")
  }
  return false
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ExtendedAtom
pp.validateRegExp_eatExtendedAtom = function(state) {
  return (
    state.eat(FULL_STOP) ||
    this.validateRegExp_eatReverseSolidusAtomEscape(state) ||
    this.validateRegExp_eatCharacterClass(state) ||
    this.validateRegExp_eatUncapturingGroup(state) ||
    this.validateRegExp_eatCapturingGroup(state) ||
    this.validateRegExp_eatInvalidBracedQuantifier(state) ||
    this.validateRegExp_eatExtendedPatternCharacter(state)
  )
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-InvalidBracedQuantifier
pp.validateRegExp_eatInvalidBracedQuantifier = function(state) {
  if (this.validateRegExp_eatBracedQuantifier(state, true)) {
    state.raise("Nothing to repeat")
  }
  return false
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-SyntaxCharacter
pp.validateRegExp_eatSyntaxCharacter = function(state) {
  const ch = state.current()
  if (isSyntaxCharacter(ch)) {
    state.lastIntValue = ch
    state.advance()
    return true
  }
  return false
}
function isSyntaxCharacter(ch) {
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
pp.validateRegExp_eatPatternCharacters = function(state) {
  const start = state.pos
  let ch = 0
  while ((ch = state.current()) !== -1 && !isSyntaxCharacter(ch)) {
    state.advance()
  }
  return state.pos !== start
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ExtendedPatternCharacter
pp.validateRegExp_eatExtendedPatternCharacter = function(state) {
  const ch = state.current()
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
    state.advance()
    return true
  }
  return false
}

// GroupSpecifier[U] ::
//   [empty]
//   `?` GroupName[?U]
pp.validateRegExp_groupSpecifier = function(state) {
  if (state.eat(QUESTION_MARK)) {
    if (this.validateRegExp_eatGroupName(state)) {
      if (state.groupNames.indexOf(state.lastStringValue) !== -1) {
        state.raise("Duplicate capture group name")
      }
      state.groupNames.push(state.lastStringValue)
      return
    }
    state.raise("Invalid group")
  }
}

// GroupName[U] ::
//   `<` RegExpIdentifierName[?U] `>`
// RegExpIdentifierName[U] ::
//   RegExpIdentifierStart[?U]
//   RegExpIdentifierName[?U] RegExpIdentifierPart[?U]
// Note: this updates `state.lastStringValue` property with the eaten name.
pp.validateRegExp_eatGroupName = function(state) {
  state.lastStringValue = ""
  if (state.eat(LESS_THAN_SIGN)) {
    if (this.validateRegExp_eatRegExpIdentifierStart(state)) {
      state.lastStringValue += codePointToString(state.lastIntValue)
      while (this.validateRegExp_eatRegExpIdentifierPart(state)) {
        state.lastStringValue += codePointToString(state.lastIntValue)
      }
      if (state.eat(GREATER_THAN_SIGN)) {
        return true
      }
    }
    state.raise("Invalid capture group name")
  }
  return false
}

// RegExpIdentifierStart[U] ::
//   UnicodeIDStart
//   `$`
//   `_`
//   `\` RegExpUnicodeEscapeSequence[?U]
pp.validateRegExp_eatRegExpIdentifierStart = function(state) {
  const start = state.pos
  let ch = state.current()
  state.advance()

  if (ch === REVERSE_SOLIDUS && this.validateRegExp_eatRegExpUnicodeEscapeSequence(state)) {
    ch = state.lastIntValue
  }
  if (isRegExpIdentifierStart(ch)) {
    state.lastIntValue = ch
    return true
  }

  state.pos = start
  return false
}
function isRegExpIdentifierStart(ch) {
  return isIdentifierStart(ch, true) || ch === DOLLAR_SIGN || ch === LOW_LINE
}

// RegExpIdentifierPart[U] ::
//   UnicodeIDContinue
//   `$`
//   `_`
//   `\` RegExpUnicodeEscapeSequence[?U]
//   <ZWNJ>
//   <ZWJ>
pp.validateRegExp_eatRegExpIdentifierPart = function(state) {
  const start = state.pos
  let ch = state.current()
  state.advance()

  if (ch === REVERSE_SOLIDUS && this.validateRegExp_eatRegExpUnicodeEscapeSequence(state)) {
    ch = state.lastIntValue
  }
  if (isRegExpIdentifierPart(ch)) {
    state.lastIntValue = ch
    return true
  }

  state.pos = start
  return false
}
function isRegExpIdentifierPart(ch) {
  return isIdentifierChar(ch, true) || ch === DOLLAR_SIGN || ch === LOW_LINE || ch === ZERO_WIDTH_NON_JOINER || ch === ZERO_WIDTH_JOINER
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-AtomEscape
pp.validateRegExp_eatAtomEscape = function(state) {
  if (
    this.validateRegExp_eatBackReference(state) ||
    this.validateRegExp_eatCharacterClassEscape(state) ||
    this.validateRegExp_eatCharacterEscape(state) ||
    (state.switchN && this.validateRegExp_eatKGroupName(state))
  ) {
    return true
  }
  if (state.switchU) {
    // Make the same message as V8.
    if (state.current() === LATIN_SMALL_LETTER_C) {
      state.raise("Invalid unicode escape")
    }
    state.raise("Invalid escape")
  }
  return false
}
pp.validateRegExp_eatBackReference = function(state) {
  const start = state.pos
  if (this.validateRegExp_eatDecimalEscape(state)) {
    const n = state.lastIntValue
    if (state.switchU) {
      // For SyntaxError in https://www.ecma-international.org/ecma-262/8.0/#sec-atomescape
      if (n > state.maxBackReference) {
        state.maxBackReference = n
      }
      return true
    }
    if (n <= state.numCapturingParens) {
      return true
    }
    state.pos = start
  }
  return false
}
pp.validateRegExp_eatKGroupName = function(state) {
  if (state.eat(LATIN_SMALL_LETTER_K)) {
    if (this.validateRegExp_eatGroupName(state)) {
      state.backReferenceNames.push(state.lastStringValue)
      return true
    }
    state.raise("Invalid named reference")
  }
  return false
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-CharacterEscape
pp.validateRegExp_eatCharacterEscape = function(state) {
  return (
    this.validateRegExp_eatControlEscape(state) ||
    this.validateRegExp_eatCControlLetter(state) ||
    this.validateRegExp_eatZero(state) ||
    this.validateRegExp_eatHexEscapeSequence(state) ||
    this.validateRegExp_eatRegExpUnicodeEscapeSequence(state) ||
    (!state.switchU && this.validateRegExp_eatLegacyOctalEscapeSequence(state)) ||
    this.validateRegExp_eatIdentityEscape(state)
  )
}
pp.validateRegExp_eatCControlLetter = function(state) {
  const start = state.pos
  if (state.eat(LATIN_SMALL_LETTER_C)) {
    if (this.validateRegExp_eatControlLetter(state)) {
      return true
    }
    state.pos = start
  }
  return false
}
pp.validateRegExp_eatZero = function(state) {
  if (state.current() === DIGIT_ZERO && !isDecimalDigit(state.lookahead())) {
    state.lastIntValue = 0
    state.advance()
    return true
  }
  return false
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-ControlEscape
pp.validateRegExp_eatControlEscape = function(state) {
  const ch = state.current()
  if (ch === LATIN_SMALL_LETTER_T) {
    state.lastIntValue = CHARACTER_TABULATION
    state.advance()
    return true
  }
  if (ch === LATIN_SMALL_LETTER_N) {
    state.lastIntValue = LINE_FEED
    state.advance()
    return true
  }
  if (ch === LATIN_SMALL_LETTER_V) {
    state.lastIntValue = LINE_TABULATION
    state.advance()
    return true
  }
  if (ch === LATIN_SMALL_LETTER_F) {
    state.lastIntValue = FORM_FEED
    state.advance()
    return true
  }
  if (ch === LATIN_SMALL_LETTER_R) {
    state.lastIntValue = CARRIAGE_RETURN
    state.advance()
    return true
  }
  return false
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-ControlLetter
pp.validateRegExp_eatControlLetter = function(state) {
  const ch = state.current()
  if (isControlLetter(ch)) {
    state.lastIntValue = ch % 0x20
    state.advance()
    return true
  }
  return false
}
function isControlLetter(ch) {
  return (
    (ch >= LATIN_CAPITAL_LETTER_A && ch <= LATIN_CAPITAL_LETTER_Z) ||
    (ch >= LATIN_SMALL_LETTER_A && ch <= LATIN_SMALL_LETTER_Z)
  )
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-RegExpUnicodeEscapeSequence
pp.validateRegExp_eatRegExpUnicodeEscapeSequence = function(state) {
  const start = state.pos

  if (state.eat(LATIN_SMALL_LETTER_U)) {
    if (this.validateRegExp_eatFixedHexDigits(state, 4)) {
      const lead = state.lastIntValue
      if (state.switchU && lead >= 0xD800 && lead <= 0xDBFF) {
        const leadSurrogateEnd = state.pos
        if (state.eat(REVERSE_SOLIDUS) && state.eat(LATIN_SMALL_LETTER_U) && this.validateRegExp_eatFixedHexDigits(state, 4)) {
          const trail = state.lastIntValue
          if (trail >= 0xDC00 && trail <= 0xDFFF) {
            state.lastIntValue = (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000
            return true
          }
        }
        state.pos = leadSurrogateEnd
        state.lastIntValue = lead
      }
      return true
    }
    if (
      state.switchU &&
      state.eat(LEFT_CURLY_BRACKET) &&
      this.validateRegExp_eatHexDigits(state) &&
      state.eat(RIGHT_CURLY_BRACKET) &&
      isValidUnicode(state.lastIntValue)
    ) {
      return true
    }
    if (state.switchU) {
      state.raise("Invalid unicode escape")
    }
    state.pos = start
  }

  return false
}
function isValidUnicode(ch) {
  return ch >= 0 && ch <= 0x10FFFF
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-IdentityEscape
pp.validateRegExp_eatIdentityEscape = function(state) {
  if (state.switchU) {
    if (this.validateRegExp_eatSyntaxCharacter(state)) {
      return true
    }
    if (state.eat(SOLIDUS)) {
      state.lastIntValue = SOLIDUS
      return true
    }
    return false
  }

  const ch = state.current()
  if (ch !== LATIN_SMALL_LETTER_C && (!state.switchN || ch !== LATIN_SMALL_LETTER_K)) {
    state.lastIntValue = ch
    state.advance()
    return true
  }

  return false
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-DecimalEscape
pp.validateRegExp_eatDecimalEscape = function(state) {
  state.lastIntValue = 0
  let ch = state.current()
  if (ch >= DIGIT_ONE && ch <= DIGIT_NINE) {
    do {
      state.lastIntValue = 10 * state.lastIntValue + (ch - DIGIT_ZERO)
      state.advance()
    } while ((ch = state.current()) >= DIGIT_ZERO && ch <= DIGIT_NINE)
    return true
  }
  return false
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-CharacterClassEscape
pp.validateRegExp_eatCharacterClassEscape = function(state) {
  const ch = state.current()

  if (isCharacterClassEscape(ch)) {
    state.lastIntValue = -1
    state.advance()
    return true
  }

  if (
    state.switchU &&
    this.options.ecmaVersion >= 9 &&
    (ch === LATIN_CAPITAL_LETTER_P || ch === LATIN_SMALL_LETTER_P)
  ) {
    state.lastIntValue = -1
    state.advance()
    if (
      state.eat(LEFT_CURLY_BRACKET) &&
      this.validateRegExp_eatUnicodePropertyValueExpression(state) &&
      state.eat(RIGHT_CURLY_BRACKET)
    ) {
      return true
    }
    state.raise("Invalid property name")
  }

  return false
}
function isCharacterClassEscape(ch) {
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
pp.validateRegExp_eatUnicodePropertyValueExpression = function(state) {
  const start = state.pos

  // UnicodePropertyName `=` UnicodePropertyValue
  if (this.validateRegExp_eatUnicodePropertyName(state) && state.eat(EQUALS_SIGN)) {
    const name = state.lastStringValue
    if (this.validateRegExp_eatUnicodePropertyValue(state)) {
      const value = state.lastStringValue
      this.validateRegExp_validateUnicodePropertyNameAndValue(state, name, value)
      return true
    }
  }
  state.pos = start

  // LoneUnicodePropertyNameOrValue
  if (this.validateRegExp_eatLoneUnicodePropertyNameOrValue(state)) {
    const nameOrValue = state.lastStringValue
    this.validateRegExp_validateUnicodePropertyNameOrValue(state, nameOrValue)
    return true
  }
  return false
}
pp.validateRegExp_validateUnicodePropertyNameAndValue = function(state, name, value) {
  if (!UNICODE_PROPERTY_VALUES.hasOwnProperty(name) || UNICODE_PROPERTY_VALUES[name].indexOf(value) === -1) {
    state.raise("Invalid property name")
  }
}
pp.validateRegExp_validateUnicodePropertyNameOrValue = function(state, nameOrValue) {
  if (UNICODE_PROPERTY_VALUES.$LONE.indexOf(nameOrValue) === -1) {
    state.raise("Invalid property name")
  }
}

// UnicodePropertyName ::
//   UnicodePropertyNameCharacters
pp.validateRegExp_eatUnicodePropertyName = function(state) {
  let ch = 0
  state.lastStringValue = ""
  while (isUnicodePropertyNameCharacter(ch = state.current())) {
    state.lastStringValue += codePointToString(ch)
    state.advance()
  }
  return state.lastStringValue !== ""
}
function isUnicodePropertyNameCharacter(ch) {
  return isControlLetter(ch) || ch === LOW_LINE
}

// UnicodePropertyValue ::
//   UnicodePropertyValueCharacters
pp.validateRegExp_eatUnicodePropertyValue = function(state) {
  let ch = 0
  state.lastStringValue = ""
  while (isUnicodePropertyValueCharacter(ch = state.current())) {
    state.lastStringValue += codePointToString(ch)
    state.advance()
  }
  return state.lastStringValue !== ""
}
function isUnicodePropertyValueCharacter(ch) {
  return isUnicodePropertyNameCharacter(ch) || isDecimalDigit(ch)
}

// LoneUnicodePropertyNameOrValue ::
//   UnicodePropertyValueCharacters
pp.validateRegExp_eatLoneUnicodePropertyNameOrValue = function(state) {
  return this.validateRegExp_eatUnicodePropertyValue(state)
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-CharacterClass
pp.validateRegExp_eatCharacterClass = function(state) {
  if (state.eat(LEFT_SQUARE_BRACKET)) {
    state.eat(CIRCUMFLEX_ACCENT)
    this.validateRegExp_classRanges(state)
    if (state.eat(RIGHT_SQUARE_BRACKET)) {
      return true
    }
    // Unreachable since it threw "unterminated regular expression" error before.
    state.raise("Unterminated character class")
  }
  return false
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-ClassRanges
// https://www.ecma-international.org/ecma-262/8.0/#prod-NonemptyClassRanges
// https://www.ecma-international.org/ecma-262/8.0/#prod-NonemptyClassRangesNoDash
pp.validateRegExp_classRanges = function(state) {
  while (this.validateRegExp_eatClassAtom(state)) {
    const left = (state.switchU || state.lastIntValue <= 0xFFFF)
      ? state.lastIntValue
      : getTrailSurrogate(state.lastIntValue)

    if (state.eat(HYPHEN_MINUS) && this.validateRegExp_eatClassAtom(state)) {
      const right = (state.switchU || state.lastIntValue <= 0xFFFF)
        ? state.lastIntValue
        : getLeadSurrogate(state.lastIntValue)

      if (state.switchU && (left === -1 || right === -1)) {
        state.raise("Invalid character class")
      }
      if (left !== -1 && right !== -1 && left > right) {
        state.raise("Range out of order in character class")
      }
    }
  }
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-ClassAtom
// https://www.ecma-international.org/ecma-262/8.0/#prod-ClassAtomNoDash
pp.validateRegExp_eatClassAtom = function(state) {
  const start = state.pos

  if (state.eat(REVERSE_SOLIDUS)) {
    if (this.validateRegExp_eatClassEscape(state)) {
      return true
    }
    if (state.switchU) {
      // Make the same message as V8.
      const ch = state.current()
      if (ch === LATIN_SMALL_LETTER_C || isOctalDigit(ch)) {
        state.raise("Invalid class escape")
      }
      state.raise("Invalid escape")
    }
    state.pos = start
  }

  const ch = state.current()
  if (ch !== RIGHT_SQUARE_BRACKET) {
    state.lastIntValue = ch
    state.advance()
    return true
  }

  return false
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ClassEscape
pp.validateRegExp_eatClassEscape = function(state) {
  const start = state.pos

  if (state.eat(LATIN_SMALL_LETTER_B)) {
    state.lastIntValue = BACKSPACE
    return true
  }

  if (state.switchU && state.eat(HYPHEN_MINUS)) {
    state.lastIntValue = HYPHEN_MINUS
    return true
  }

  if (!state.switchU && state.eat(LATIN_SMALL_LETTER_C)) {
    if (this.validateRegExp_eatClassControlLetter(state)) {
      return true
    }
    state.pos = start
  }

  return (
    this.validateRegExp_eatCharacterClassEscape(state) ||
    this.validateRegExp_eatCharacterEscape(state)
  )
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ClassControlLetter
pp.validateRegExp_eatClassControlLetter = function(state) {
  const ch = state.current()
  if (isDecimalDigit(ch) || ch === LOW_LINE) {
    state.lastIntValue = ch % 0x20
    state.advance()
    return true
  }
  return false
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-HexEscapeSequence
pp.validateRegExp_eatHexEscapeSequence = function(state) {
  const start = state.pos
  if (state.eat(LATIN_SMALL_LETTER_X)) {
    if (this.validateRegExp_eatFixedHexDigits(state, 2)) {
      return true
    }
    if (state.switchU) {
      state.raise("Invalid escape")
    }
    state.pos = start
  }
  return false
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-DecimalDigits
pp.validateRegExp_eatDecimalDigits = function(state) {
  const start = state.pos
  let ch = 0
  state.lastIntValue = 0
  while (isDecimalDigit(ch = state.current())) {
    state.lastIntValue = 10 * state.lastIntValue + (ch - DIGIT_ZERO)
    state.advance()
  }
  return state.pos !== start
}
function isDecimalDigit(ch) {
  return ch >= DIGIT_ZERO && ch <= DIGIT_NINE
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-HexDigits
pp.validateRegExp_eatHexDigits = function(state) {
  const start = state.pos
  let ch = 0
  state.lastIntValue = 0
  while (isHexDigit(ch = state.current())) {
    state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch)
    state.advance()
  }
  return state.pos !== start
}
function isHexDigit(ch) {
  return (
    (ch >= DIGIT_ZERO && ch <= DIGIT_NINE) ||
    (ch >= LATIN_CAPITAL_LETTER_A && ch <= LATIN_CAPITAL_LETTER_F) ||
    (ch >= LATIN_SMALL_LETTER_A && ch <= LATIN_SMALL_LETTER_F)
  )
}
function hexToInt(ch) {
  if (ch >= LATIN_CAPITAL_LETTER_A && ch <= LATIN_CAPITAL_LETTER_F) {
    return 10 + (ch - LATIN_CAPITAL_LETTER_A)
  }
  if (ch >= LATIN_SMALL_LETTER_A && ch <= LATIN_SMALL_LETTER_F) {
    return 10 + (ch - LATIN_SMALL_LETTER_A)
  }
  return ch - DIGIT_ZERO
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-LegacyOctalEscapeSequence
// Allows only 0-377(octal) i.e. 0-255(decimal).
pp.validateRegExp_eatLegacyOctalEscapeSequence = function(state) {
  if (this.validateRegExp_eatOctalDigit(state)) {
    const n1 = state.lastIntValue
    if (this.validateRegExp_eatOctalDigit(state)) {
      const n2 = state.lastIntValue
      if (n1 <= 3 && this.validateRegExp_eatOctalDigit(state)) {
        state.lastIntValue = n1 * 64 + n2 * 8 + state.lastIntValue
      } else {
        state.lastIntValue = n1 * 8 + n2
      }
    } else {
      state.lastIntValue = n1
    }
    return true
  }
  return false
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-OctalDigit
pp.validateRegExp_eatOctalDigit = function(state) {
  const ch = state.current()
  if (isOctalDigit(ch)) {
    state.lastIntValue = ch - DIGIT_ZERO
    state.advance()
    return true
  }
  state.lastIntValue = 0
  return false
}
function isOctalDigit(ch) {
  return ch >= DIGIT_ZERO && ch <= DIGIT_SEVEN
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-Hex4Digits
// https://www.ecma-international.org/ecma-262/8.0/#prod-HexDigit
// And HexDigit HexDigit in https://www.ecma-international.org/ecma-262/8.0/#prod-HexEscapeSequence
pp.validateRegExp_eatFixedHexDigits = function(state, length) {
  const start = state.pos
  state.lastIntValue = 0
  for (let i = 0; i < length; ++i) {
    const ch = state.current()
    if (!isHexDigit(ch)) {
      state.pos = start
      return false
    }
    state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch)
    state.advance()
  }
  return true
}
