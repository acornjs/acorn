import {
  expectAssignable,
  expectError,
  expectNotAssignable,
  expectType
} from "tsd"

import * as acorn from "acorn"
import * as walk from ".."

type simpleParams = Parameters<typeof walk.simple>
type ancestorParams = Parameters<typeof walk.ancestor>
type recursiveParams = Parameters<typeof walk.recursive>
type makeParams = Parameters<typeof walk.make>
type fullParams = Parameters<typeof walk.full>
type fullAncestorParams = Parameters<typeof walk.fullAncestor>
type findNodeAtParams = Parameters<typeof walk.findNodeAt>
type findNodeAroundParams = Parameters<typeof walk.findNodeAround>
type findNodeAfterParams = Parameters<typeof walk.findNodeAfter>
type findNodeBeforeParams = Parameters<typeof walk.findNodeBefore>

const ast = acorn.parse("", {ecmaVersion: "latest"})

const v = () => {}

/*
Functions who accept visitor objects or "walker objects" should allow both Node
type names and Aggregate type names in the object.
 */
expectAssignable<simpleParams>([ast,
  {Super: v, Class: v},
  {Super: v, Class: v}
])

expectAssignable<ancestorParams>([ast,
  {Super: v, Class: v},
  {Super: v, Class: v}
])

expectAssignable<recursiveParams>([ast, null,
  {Super: v, Class: v},
  {Super: v, Class: v}
])

expectAssignable<makeParams>([
  {Super: v, Class: v},
  {Super: v, Class: v}
])

expectAssignable<fullParams>([ast, v,
  {Super: v, Class: v}
])

expectAssignable<fullAncestorParams>([ast, v,
  {Super: v, Class: v}
])

expectAssignable<findNodeAtParams>([ast, null, null, "Super",
  {Super: v, Class: v}
])

expectAssignable<findNodeAroundParams>([ast, null, "Super",
  {Super: v, Class: v}
])

expectAssignable<findNodeAfterParams>([ast, null, "Super",
  {Super: v, Class: v}
])

expectAssignable<findNodeBeforeParams>([ast, null, "Super",
  {Super: v, Class: v}
])

/*
Functions who accept visitor objects or "walker objects" should not allow
additional properties who are not valid Node/Aggregate type names
 */
expectNotAssignable<simpleParams>([ast, {NotANode: v}])
expectNotAssignable<simpleParams>([ast, {}, {NotANode: v}])

expectNotAssignable<ancestorParams>([ast, {NotANode: v}])
expectNotAssignable<ancestorParams>([ast, {}, {NotANode: v}])

expectNotAssignable<recursiveParams>([ast, null, {NotANode: v}])
expectNotAssignable<recursiveParams>([ast, null, {}, {NotANode: v}])

expectNotAssignable<makeParams>([{NotANode: v}])
expectNotAssignable<makeParams>([{}, {NotANode: v}])

expectNotAssignable<fullParams>([ast, v, {NotANode: v}])

expectNotAssignable<fullAncestorParams>([ast, v, {NotANode: v}])

expectNotAssignable<findNodeAtParams>([ast, null, null, "Super",
  {NotANode: v}
])

expectNotAssignable<findNodeAroundParams>([ast, null, "Super",
  {NotANode: v}
])

expectNotAssignable<findNodeAfterParams>([ast, null, "Super",
  {NotANode: v}
])

expectNotAssignable<findNodeBeforeParams>([ast, null, "Super",
  {NotANode: v}
])

/*
When we supply a visitor function to a walker function, and the walker function
calls us with a given Node, the Node should be of the type we specified as the
visitor function name.

If our visitor function is for an Aggregate, the Node we receive should be a
member of a discriminated union, who allows us to determine the actual type
of the Node.
 */
walk.simple(ast, {
  Super: (node) => { expectType<acorn.Super>(node) },
  Pattern: (node) => {
    expectType<acorn.Pattern>(node)
    if (node.type === "Identifier") { expectType<acorn.Identifier>(node) }
  }
})

walk.ancestor(ast, {
  Super: (node) => { expectType<acorn.Super>(node) },
  Pattern: (node) => {
    expectType<acorn.Pattern>(node)
    if (node.type === "Identifier") { expectType<acorn.Identifier>(node) }
  }
})

walk.recursive(ast, null, {
  Super: (node) => { expectType<acorn.Super>(node) },
  Pattern: (node) => {
    expectType<acorn.Pattern>(node)
    if (node.type === "Identifier") { expectType<acorn.Identifier>(node) }
  }
})

/*
Whenever we receive a Node as a parameter to a callback, it should be a member
of a discriminated union, who allows us to determine the actual type of the Node.
 */
walk.ancestor(ast, {
  Super: (_node, _state, ancestors) => {
    if (ancestors[0].type === "Super") { expectType<acorn.Super>(ancestors[0]) }
  },
})

walk.full(ast, (node) => {
  if (node.type === "Super") { expectType<acorn.Super>(node) }
})

walk.fullAncestor(ast, (node, _, ancestors) => {
  if (node.type === "Super") { expectType<acorn.Super>(node) }
  if (ancestors[0].type === "Super") { expectType<acorn.Super>(ancestors[0]) }
})

walk.findNodeAt(ast, null, null, (_, node) => {
  if (node.type === "Super") { expectType<acorn.Super>(node) }
  return true;
})

/*
Whenever we receive a type name as a parameter to a callback, it should be a
valid Node/Aggregate type name
 */
walk.full(ast, (_node, _state, type) => {
  expectAssignable<typeof type>("Super")
  expectAssignable<typeof type>("Pattern")
  expectNotAssignable<typeof type>("NotANode")
})

walk.fullAncestor(ast, (_node, _state, _ancestors, type) => {
  expectAssignable<typeof type>("Super")
  expectAssignable<typeof type>("Pattern")
  expectNotAssignable<typeof type>("NotANode")
})

walk.findNodeAt(ast, null, null, (type) => {
  expectAssignable<typeof type>("Super")
  expectAssignable<typeof type>("Pattern")
  expectNotAssignable<typeof type>("NotANode")
  return true;
})

/*
findNodeAt should reject an input string "type" who is not a valid
Node/Aggregate type name
 */
expectError(walk.findNodeAt(ast, null, null, "NotANode"))
expectError(walk.findNodeAround(ast, null, "NotANode"))

/*
findNodeAt should return a Node who's a member of a discriminated union, who
allows us to determine the actual type of the Node.
 */
const found = walk.findNodeAt(ast, null, null, () => true)
if (found?.node.type === "Literal") { expectType<acorn.Literal>(found?.node) }
