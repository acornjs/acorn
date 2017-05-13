const {hasOwnProperty, toString} = Object.prototype
const {create} = Object

// Checks if an object has a property.
export function has(obj, propName) {
  return hasOwnProperty.call(obj, propName)
}

// Creates an object intended to be used as a map
export const map = create ? () => create(null) : () => ({})

export const isArray = Array.isArray || ((obj) => (
  toString.call(obj) === "[object Array]"
))
