import {Parser} from "./state"
import {SCOPE_FUNCTION} from "./scopeflags"

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

/**
 * A name can be declared with `var` if there are no variables with the same name declared with `let`/`const`
 * in the current lexical scope or any of the parent lexical scopes in this function.
 */
pp.canDeclareVarName = function(name) {
  for (let i = this.scopeStack.length - 1; i >= 0; --i) {
    const currentScope = this.scopeStack[i]
    if (currentScope.lexical.indexOf(name) !== -1) return false
    if (currentScope.flags & SCOPE_FUNCTION) return true
  }
  return true
}

/**
 * A name can be declared with `let`/`const` if there are no variables with the same name declared with `let`/`const`
 * in the current scope, and there are no variables with the same name declared with `var` in the current scope or in
 * any child lexical scopes in this function.
 */
pp.canDeclareLexicalName = function(name) {
  const currentScope = this.currentScope()
  return currentScope.lexical.indexOf(name) === -1 && currentScope.var.indexOf(name) === -1
}

pp.declareName = function(name, isVar) {
  if (isVar) {
    for (let i = this.scopeStack.length - 1; i >= 0; i--) {
      let scope = this.scopeStack[i]
      scope.var.push(name)
      if (scope.flags & SCOPE_FUNCTION) break
    }
  } else {
    this.currentScope().lexical.push(name)
  }
}

pp.currentScope = function() {
  return this.scopeStack[this.scopeStack.length - 1]
}

pp.currentFunctionScope = function() {
  for (let i = this.scopeStack.length - 1;; i--) {
    let scope = this.scopeStack[i]
    if (scope.flags & SCOPE_FUNCTION) return scope
  }
}
