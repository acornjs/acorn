import {Parser} from "./state"
import {SCOPE_VAR, SCOPE_FUNCTION, SCOPE_ARROW, SCOPE_SIMPLE_CATCH, BIND_LEXICAL, BIND_SIMPLE_CATCH, BIND_FUNCTION} from "./scopeflags"

const pp = Parser.prototype

class Scope {
  constructor(flags) {
    this.flags = flags
    // A list of var-declared names in the current lexical scope
    this.var = []
    // A list of lexically-declared names in the current lexical scope
    this.lexical = []
  }
}

// The functions in this module keep track of declared variables in the current scope in order to detect duplicate variable names.

pp.enterScope = function(flags) {
  this.scopeStack.push(new Scope(flags))
}

pp.exitScope = function() {
  this.scopeStack.pop()
}

pp.declareName = function(name, bindingType, pos) {
  let redeclared = false
  if (bindingType === BIND_LEXICAL) {
    const scope = this.currentScope()
    redeclared = scope.lexical.indexOf(name) > -1 || scope.var.indexOf(name) > -1
    scope.lexical.push(name)
  } else if (bindingType === BIND_SIMPLE_CATCH) {
    const scope = this.currentScope()
    scope.lexical.push(name)
  } else if (bindingType === BIND_FUNCTION) {
    const scope = this.currentScope()
    redeclared = scope.lexical.indexOf(name) > -1
    scope.var.push(name)
  } else {
    for (let i = this.scopeStack.length - 1; i >= 0; --i) {
      const scope = this.scopeStack[i]
      if (scope.lexical.indexOf(name) > -1 && !(scope.flags & SCOPE_SIMPLE_CATCH) && scope.lexical[0] === name) redeclared = true
      scope.var.push(name)
      if (scope.flags & SCOPE_VAR) break
    }
  }
  if (redeclared) this.raiseRecoverable(pos, `Identifier '${name}' has already been declared`)
}

pp.currentScope = function() {
  return this.scopeStack[this.scopeStack.length - 1]
}

pp.currentVarScope = function() {
  for (let i = this.scopeStack.length - 1;; i--) {
    let scope = this.scopeStack[i]
    if (scope.flags & SCOPE_VAR) return scope
  }
}

pp.inNonArrowFunction = function() {
  for (let i = this.scopeStack.length - 1; i >= 0; i--)
    if (this.scopeStack[i].flags & SCOPE_FUNCTION && !(this.scopeStack[i].flags & SCOPE_ARROW)) return true
  return false
}
