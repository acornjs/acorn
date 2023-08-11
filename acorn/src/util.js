const {hasOwnProperty, toString} = Object.prototype

export const hasOwn = Object.hasOwn || ((obj, propName) => (
  hasOwnProperty.call(obj, propName)
))

export const isArray = Array.isArray || ((obj) => (
  toString.call(obj) === "[object Array]"
))

const regexpCache = Object.create(null)

export function wordsRegexp(words) {
  return regexpCache[words] || (regexpCache[words] = new RegExp("^(?:" + words.replace(/ /g, "|") + ")$"))
}

export function codePointToString(code) {
  // UTF-16 Decoding
  if (code <= 0xFFFF) return String.fromCharCode(code)
  code -= 0x10000
  return String.fromCharCode((code >> 10) + 0xD800, (code & 1023) + 0xDC00)
}

export const loneSurrogate = /[\uD800-\uDFFF]/u
