const { hasOwnProperty, toString } = Object.prototype

// Checks if an object has a property.

const has = (obj, propName) => (
  hasOwnProperty.call(obj, propName)
)

const isArray = Array.isArray || ((obj) => (
  toString.call(obj) === "[object Array]"
))

export { has, isArray }
