const {hasOwnProperty, toString} = Object.prototype

export const hasOwn = Object.hasOwn || ((obj, propName) => (
  hasOwnProperty.call(obj, propName)
))

export const isArray = Array.isArray || ((obj) => (
  toString.call(obj) === "[object Array]"
))

export function wordsRegexp(words) {
  return new RegExp("^(?:" + words.replace(/ /g, "|") + ")$")
}

export const loneSurrogate = /[\uD800-\uDFFF]/u
