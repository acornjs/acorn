// AST walker module for ESTree compatible trees

// A simple walk is one where you simply specify callbacks to be
// called on specific nodes. The last two arguments are optional. A
// simple use would be
//
//     walk.simple(myTree, {
//         Expression: function(node) { ... }
//     });
//
// to do something with all expressions. All ESTree node types
// can be used to identify node types, as well as Expression and
// Statement, which denote categories of nodes.
//
// The base argument can be used to pass a custom (recursive)
// walker, and state can be used to give this walked an initial
// state.

export function simple(node, visitors, baseVisitor, state, override) {
  if (!baseVisitor) baseVisitor = base
  ;(function c(node, st, override) {
    let type = override || node.type, found = visitors[type]
    baseVisitor[type](node, st, c)
    if (found) found(node, st)
  })(node, state, override)
}

// An ancestor walk keeps an array of ancestor nodes (including the
// current node) and passes them to the callback as third parameter
// (and also as state parameter when no other state is present).
export function ancestor(node, visitors, baseVisitor, state, override) {
  let ancestors = []
  if (!baseVisitor) baseVisitor = base
  ;(function c(node, st, override) {
    let type = override || node.type, found = visitors[type]
    let isNew = node !== ancestors[ancestors.length - 1]
    if (isNew) ancestors.push(node)
    baseVisitor[type](node, st, c)
    if (found) found(node, st || ancestors, ancestors)
    if (isNew) ancestors.pop()
  })(node, state, override)
}

// A recursive walk is one where your functions override the default
// walkers. They can modify and replace the state parameter that's
// threaded through the walk, and can opt how and whether to walk
// their child nodes (by calling their third argument on these
// nodes).
export function recursive(node, state, funcs, baseVisitor, override) {
  let visitor = funcs ? make(funcs, baseVisitor || undefined) : baseVisitor
  ;(function c(node, st, override) {
    visitor[override || node.type](node, st, c)
  })(node, state, override)
}

function makeTest(test) {
  if (typeof test === "string")
    return type => type === test
  else if (!test)
    return () => true
  else
    return test
}

class Found {
  constructor(node, state) { this.node = node; this.state = state }
}

// A full walk triggers the callback on each node
export function full(node, callback, baseVisitor, state, override) {
  if (!baseVisitor) baseVisitor = base
  let last
  ;(function c(node, st, override) {
    let type = override || node.type
    baseVisitor[type](node, st, c)
    if (last !== node) {
      callback(node, st, type)
      last = node
    }
  })(node, state, override)
}

// An fullAncestor walk is like an ancestor walk, but triggers
// the callback on each node
export function fullAncestor(node, callback, baseVisitor, state) {
  if (!baseVisitor) baseVisitor = base
  let ancestors = [], last
  ;(function c(node, st, override) {
    let type = override || node.type
    let isNew = node !== ancestors[ancestors.length - 1]
    if (isNew) ancestors.push(node)
    baseVisitor[type](node, st, c)
    if (last !== node) {
      callback(node, st || ancestors, ancestors, type)
      last = node
    }
    if (isNew) ancestors.pop()
  })(node, state)
}

// Find a node with a given start, end, and type (all are optional,
// null can be used as wildcard). Returns a {node, state} object, or
// undefined when it doesn't find a matching node.
export function findNodeAt(node, start, end, test, baseVisitor, state) {
  if (!baseVisitor) baseVisitor = base
  test = makeTest(test)
  try {
    (function c(node, st, override) {
      let type = override || node.type
      if ((start == null || node.start <= start) &&
          (end == null || node.end >= end))
        baseVisitor[type](node, st, c)
      if ((start == null || node.start === start) &&
          (end == null || node.end === end) &&
          test(type, node))
        throw new Found(node, st)
    })(node, state)
  } catch (e) {
    if (e instanceof Found) return e
    throw e
  }
}

// Find the innermost node of a given type that contains the given
// position. Interface similar to findNodeAt.
export function findNodeAround(node, pos, test, baseVisitor, state) {
  test = makeTest(test)
  if (!baseVisitor) baseVisitor = base
  try {
    (function c(node, st, override) {
      let type = override || node.type
      if (node.start > pos || node.end < pos) return
      baseVisitor[type](node, st, c)
      if (test(type, node)) throw new Found(node, st)
    })(node, state)
  } catch (e) {
    if (e instanceof Found) return e
    throw e
  }
}

// Find the outermost matching node after a given position.
export function findNodeAfter(node, pos, test, baseVisitor, state) {
  test = makeTest(test)
  if (!baseVisitor) baseVisitor = base
  try {
    (function c(node, st, override) {
      if (node.end < pos) return
      let type = override || node.type
      if (node.start >= pos && test(type, node)) throw new Found(node, st)
      baseVisitor[type](node, st, c)
    })(node, state)
  } catch (e) {
    if (e instanceof Found) return e
    throw e
  }
}

// Find the outermost matching node before a given position.
export function findNodeBefore(node, pos, test, baseVisitor, state) {
  test = makeTest(test)
  if (!baseVisitor) baseVisitor = base
  let max
  ;(function c(node, st, override) {
    if (node.start > pos) return
    let type = override || node.type
    if (node.end <= pos && (!max || max.node.end < node.end) && test(type, node))
      max = new Found(node, st)
    baseVisitor[type](node, st, c)
  })(node, state)
  return max
}

// Used to create a custom walker. Will fill in all missing node
// type properties with the defaults.
export function make(funcs, baseVisitor) {
  let visitor = baseVisitor? Object.create(baseVisitor) : new Base();
  return Object.assign(visitor, funcs)
}

function skipThrough(node, st, c) { c(node, st) }
function ignore(_node, _st, _c) {}

// Node walkers.

/**
 * can be used to create custom baseVisitor
 * ```js
 * const visitor = new Base();
 * visitor.BlockStatement = (...args) => {}
 * ```
 */
export class Base {}

Base.prototype.Program = Base.prototype.BlockStatement = Base.prototype.StaticBlock = function (node, st, c) {
  for (let stmt of node.body)
    c(stmt, st, "Statement")
}
Base.prototype.Statement = skipThrough
Base.prototype.EmptyStatement = ignore
Base.prototype.ExpressionStatement = Base.prototype.ParenthesizedExpression = Base.prototype.ChainExpression =
  function (node, st, c) { c(node.expression, st, "Expression") };
Base.prototype.IfStatement = function (node, st, c) {
  c(node.test, st, "Expression")
  c(node.consequent, st, "Statement")
  if (node.alternate) c(node.alternate, st, "Statement")
}
Base.prototype.LabeledStatement = function (node, st, c) { c(node.body, st, "Statement") }
Base.prototype.BreakStatement = Base.prototype.ContinueStatement = ignore
Base.prototype.WithStatement = function (node, st, c) {
  c(node.object, st, "Expression")
  c(node.body, st, "Statement")
}
Base.prototype.SwitchStatement = function (node, st, c) {
  c(node.discriminant, st, "Expression")
  for (let cs of node.cases) {
    if (cs.test) c(cs.test, st, "Expression")
    for (let cons of cs.consequent)
      c(cons, st, "Statement")
  }
}
Base.prototype.SwitchCase = function (node, st, c) {
  if (node.test) c(node.test, st, "Expression")
  for (let cons of node.consequent)
    c(cons, st, "Statement")
}
Base.prototype.ReturnStatement = Base.prototype.YieldExpression = Base.prototype.AwaitExpression = function (node, st, c) {
  if (node.argument) c(node.argument, st, "Expression")
}
Base.prototype.ThrowStatement = Base.prototype.SpreadElement =
function (node, st, c) { c(node.argument, st, "Expression") }
Base.prototype.TryStatement = function (node, st, c) {
  c(node.block, st, "Statement")
  if (node.handler) c(node.handler, st)
  if (node.finalizer) c(node.finalizer, st, "Statement")
}
Base.prototype.CatchClause = function (node, st, c) {
  if (node.param) c(node.param, st, "Pattern")
  c(node.body, st, "Statement")
}
Base.prototype.WhileStatement = Base.prototype.DoWhileStatement = function (node, st, c) {
  c(node.test, st, "Expression")
  c(node.body, st, "Statement")
}
Base.prototype.ForStatement = function (node, st, c) {
  if (node.init) c(node.init, st, "ForInit")
  if (node.test) c(node.test, st, "Expression")
  if (node.update) c(node.update, st, "Expression")
  c(node.body, st, "Statement")
}
Base.prototype.ForInStatement = Base.prototype.ForOfStatement = function (node, st, c) {
  c(node.left, st, "ForInit")
  c(node.right, st, "Expression")
  c(node.body, st, "Statement")
}
Base.prototype.ForInit = function (node, st, c) {
  if (node.type === "VariableDeclaration") c(node, st)
  else c(node, st, "Expression")
}
Base.prototype.DebuggerStatement = ignore

Base.prototype.FunctionDeclaration = function (node, st, c) { c(node, st, "Function") }
Base.prototype.VariableDeclaration = function (node, st, c) {
  for (let decl of node.declarations)
    c(decl, st)
}
Base.prototype.VariableDeclarator = function (node, st, c) {
  c(node.id, st, "Pattern")
  if (node.init) c(node.init, st, "Expression")
}

Base.prototype.Function = function (node, st, c) {
  if (node.id) c(node.id, st, "Pattern")
  for (let param of node.params)
    c(param, st, "Pattern")
  c(node.body, st, node.expression ? "Expression" : "Statement")
}

Base.prototype.Pattern = function (node, st, c) {
  if (node.type === "Identifier")
    c(node, st, "VariablePattern")
  else if (node.type === "MemberExpression")
    c(node, st, "MemberPattern")
  else
    c(node, st)
}
Base.prototype.VariablePattern = ignore
Base.prototype.MemberPattern = skipThrough
Base.prototype.RestElement = function (node, st, c) { c(node.argument, st, "Pattern") }
Base.prototype.ArrayPattern = function (node, st, c) {
  for (let elt of node.elements) {
    if (elt) c(elt, st, "Pattern")
  }
}
Base.prototype.ObjectPattern = function (node, st, c) {
  for (let prop of node.properties) {
    if (prop.type === "Property") {
      if (prop.computed) c(prop.key, st, "Expression")
      c(prop.value, st, "Pattern")
    } else if (prop.type === "RestElement") {
      c(prop.argument, st, "Pattern")
    }
  }
}

Base.prototype.Expression = skipThrough
Base.prototype.ThisExpression = Base.prototype.Super = Base.prototype.MetaProperty = ignore
Base.prototype.ArrayExpression = function (node, st, c) {
  for (let elt of node.elements) {
    if (elt) c(elt, st, "Expression")
  }
}
Base.prototype.ObjectExpression = function (node, st, c) {
  for (let prop of node.properties)
    c(prop, st)
}
Base.prototype.FunctionExpression = Base.prototype.ArrowFunctionExpression = Base.prototype.FunctionDeclaration
Base.prototype.SequenceExpression = function (node, st, c) {
  for (let expr of node.expressions)
    c(expr, st, "Expression")
}
Base.prototype.TemplateLiteral = function (node, st, c) {
  for (let quasi of node.quasis)
    c(quasi, st)

  for (let expr of node.expressions)
    c(expr, st, "Expression")
}
Base.prototype.TemplateElement = ignore
Base.prototype.UnaryExpression = Base.prototype.UpdateExpression = function (node, st, c) {
  c(node.argument, st, "Expression")
}
Base.prototype.BinaryExpression = Base.prototype.LogicalExpression = function (node, st, c) {
  c(node.left, st, "Expression")
  c(node.right, st, "Expression")
}
Base.prototype.AssignmentExpression = Base.prototype.AssignmentPattern = function (node, st, c) {
  c(node.left, st, "Pattern")
  c(node.right, st, "Expression")
}
Base.prototype.ConditionalExpression = function (node, st, c) {
  c(node.test, st, "Expression")
  c(node.consequent, st, "Expression")
  c(node.alternate, st, "Expression")
}
Base.prototype.NewExpression = Base.prototype.CallExpression = function (node, st, c) {
  c(node.callee, st, "Expression")
  if (node.arguments)
    for (let arg of node.arguments)
      c(arg, st, "Expression")
}
Base.prototype.MemberExpression = function (node, st, c) {
  c(node.object, st, "Expression")
  if (node.computed) c(node.property, st, "Expression")
}
Base.prototype.ExportNamedDeclaration = Base.prototype.ExportDefaultDeclaration = function (node, st, c) {
  if (node.declaration)
    c(node.declaration, st, node.type === "ExportNamedDeclaration" || node.declaration.id ? "Statement" : "Expression")
  if (node.source) c(node.source, st, "Expression")
}
Base.prototype.ExportAllDeclaration = function (node, st, c) {
  if (node.exported)
    c(node.exported, st)
  c(node.source, st, "Expression")
}
Base.prototype.ImportDeclaration = function (node, st, c) {
  for (let spec of node.specifiers)
    c(spec, st)
  c(node.source, st, "Expression")
}
Base.prototype.ImportExpression = function (node, st, c) {
  c(node.source, st, "Expression")
}
Base.prototype.ImportSpecifier = Base.prototype.ImportDefaultSpecifier = Base.prototype.ImportNamespaceSpecifier = Base.prototype.Identifier = Base.prototype.PrivateIdentifier = Base.prototype.Literal = ignore

Base.prototype.TaggedTemplateExpression = function (node, st, c) {
  c(node.tag, st, "Expression")
  c(node.quasi, st, "Expression")
}
Base.prototype.ClassDeclaration = Base.prototype.ClassExpression = function (node, st, c) { c(node, st, "Class") }
Base.prototype.Class = function (node, st, c) {
  if (node.id) c(node.id, st, "Pattern")
  if (node.superClass) c(node.superClass, st, "Expression")
  c(node.body, st)
}
Base.prototype.ClassBody = function (node, st, c) {
  for (let elt of node.body)
    c(elt, st)
}
Base.prototype.MethodDefinition = Base.prototype.PropertyDefinition = Base.prototype.Property = function (node, st, c) {
  if (node.computed) c(node.key, st, "Expression")
  if (node.value) c(node.value, st, "Expression")
}

export const base = new Base();