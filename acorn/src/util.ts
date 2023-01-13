const {hasOwnProperty, toString} = Object.prototype

export const hasOwn = Object.hasOwn || ((obj: object, propName: PropertyKey): boolean => (
  hasOwnProperty.call(obj, propName)
))

export const isArray = Array.isArray || ((obj): obj is any[] => (
  toString.call(obj) === "[object Array]"
))

export function wordsRegexp(words: string): RegExp {
  return new RegExp("^(?:" + words.replace(/ /g, "|") + ")$")
}

export function codePointToString(code: number): string {
  // UTF-16 Decoding
  if (code <= 0xFFFF) return String.fromCharCode(code)
  code -= 0x10000
  return String.fromCharCode((code >> 10) + 0xD800, (code & 1023) + 0xDC00)
}

export const loneSurrogate = /[\uD800-\uDFFF]/u
