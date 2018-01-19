import {Parser} from "./state"

const pp = Parser.prototype

// The functions in this module keep track of declared variables in the current scope in order to detect duplicate variable names.

pp.enterFunctionScope = function() {
  // var: a list of var-declared names in the current lexical scope
  // lexical: a list of lexically-declared names in the current lexical scope
  // childVar: a list of var-declared names in all child lexical scopes of the current lexical scope (within the current function scope)
  this.scopeStack.push({var: [], lexical: [], childVar: [], function: true})
}

pp.exitFunctionScope = function() {
  this.scopeStack.pop()
}

pp.enterLexicalScope = function() {
  this.scopeStack.push({var: [], lexical: [], childVar: [], function: false})
}

pp.exitLexicalScope = function() {
  const childScope = this.scopeStack.pop()
  const parentScope = this.scopeStack[this.scopeStack.length - 1]

  parentScope.childVar = parentScope.childVar.concat(childScope.var, childScope.childVar)
}

/**
 * A name can be declared with `var` if there are no variables with the same name declared with `let`/`const`
 * in the current lexical scope or any of the parent lexical scopes in this function.
 */
pp.canDeclareVarName = function(name) {
  for (let i = this.scopeStack.length - 1; i >= 0; --i) {
    const currentScope = this.scopeStack[i]
    if (currentScope.lexical.indexOf(name) !== -1) return false
    if (currentScope.function) return true
  }
  return true
}

/**
 * A name can be declared with `let`/`const` if there are no variables with the same name declared with `let`/`const`
 * in the current scope, and there are no variables with the same name declared with `var` in the current scope or in
 * any child lexical scopes in this function.
 */
pp.canDeclareLexicalName = function(name) {
  const currentScope = this.scopeStack[this.scopeStack.length - 1]

  return currentScope.lexical.indexOf(name) === -1 && currentScope.var.indexOf(name) === -1 && currentScope.childVar.indexOf(name) === -1
}

pp.declareVarName = function(name) {
  this.scopeStack[this.scopeStack.length - 1].var.push(name)
}

pp.declareLexicalName = function(name) {
  this.scopeStack[this.scopeStack.length - 1].lexical.push(name)
}
