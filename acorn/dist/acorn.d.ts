export as namespace acorn
export = acorn

declare namespace acorn {
  function parse(input: string, options: Options): Node

  function parseExpressionAt(input: string, pos: number, options: Options): Node

  function tokenizer(input: string, options: Options): {
    getToken(): Token
    [Symbol.iterator](): Iterator<Token>
  }

  type ecmaVersion = 3 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 'latest'

  interface Options {
    ecmaVersion: ecmaVersion
    sourceType?: 'script' | 'module'
    onInsertedSemicolon?: (lastTokEnd: number, lastTokEndLoc?: Position) => void
    onTrailingComma?: (lastTokEnd: number, lastTokEndLoc?: Position) => void
    allowReserved?: boolean | 'never'
    allowReturnOutsideFunction?: boolean
    allowImportExportEverywhere?: boolean
    allowAwaitOutsideFunction?: boolean
    allowSuperOutsideMethod?: boolean
    allowHashBang?: boolean
    locations?: boolean
    onToken?: ((token: Token) => any) | Token[]
    onComment?: ((
      isBlock: boolean, text: string, start: number, end: number, startLoc?: Position,
      endLoc?: Position
    ) => void) | Comment[]
    ranges?: boolean
    program?: Node
    sourceFile?: string
    directSourceFile?: string
    preserveParens?: boolean
  }

  class Parser {
    // state.js
    lineStart: number;
    options: Options;
    curLine: number;
    start: number;
    end: number;
    input: string;
    type: TokenType;

    // state.js
    constructor(options: Options, input: string, startPos?: number)
    parse(this: Parser): Node

    // tokenize.js
    next(): void;
    nextToken(): void;

    // statement.js
    parseTopLevel(node: Node): Node;

    // node.js
    finishNode(node: Node, type: string): Node;
    finishNodeAt(node: Node, type: string, pos: number, loc: Position): Node;

    // location.js
    raise(pos: number, message: string) : void;
    raiseRecoverable?(pos: number, message: string) : void;

    // parseutils.js
    unexpected(pos: number) : void;

    // index.js
    static acorn: typeof acorn;

    // state.js
    static parse(this: typeof Parser, input: string, options: Options): Node
    static parseExpressionAt(this: typeof Parser, input: string, pos: number, options: Options): Node
    static tokenizer(this: typeof Parser, input: string, options: Options): {
      getToken(): Token
      [Symbol.iterator](): Iterator<Token>
    }
    static extend(this: typeof Parser, ...plugins: ((BaseParser: typeof Parser) => typeof Parser)[]): typeof Parser
  }

  interface Position { line: number; column: number; offset: number }

  const defaultOptions: Options

  function getLineInfo(input: string, offset: number): Position

  class SourceLocation {
    start: Position
    end: Position
    source?: string | null
    constructor(p: Parser, start: Position, end: Position)
  }

  class TokenType {
    label: string
    keyword: string
    beforeExpr: boolean
    startsExpr: boolean
    isLoop: boolean
    isAssign: boolean
    prefix: boolean
    postfix: boolean
    binop: number
    updateContext?: (prevType: TokenType) => void
    constructor(label: string, conf?: any)
  }

  const tokTypes: {
    num: TokenType
    regexp: TokenType
    string: TokenType
    name: TokenType
    privateId: TokenType
    eof: TokenType
    bracketL: TokenType
    bracketR: TokenType
    braceL: TokenType
    braceR: TokenType
    parenL: TokenType
    parenR: TokenType
    comma: TokenType
    semi: TokenType
    colon: TokenType
    dot: TokenType
    question: TokenType
    questionDot: TokenType
    arrow: TokenType
    template: TokenType
    invalidTemplate: TokenType
    ellipsis: TokenType
    backQuote: TokenType
    dollarBraceL: TokenType
    eq: TokenType
    assign: TokenType
    incDec: TokenType
    prefix: TokenType
    logicalOR: TokenType
    logicalAND: TokenType
    bitwiseOR: TokenType
    bitwiseXOR: TokenType
    bitwiseAND: TokenType
    equality: TokenType
    relational: TokenType
    bitShift: TokenType
    plusMin: TokenType
    modulo: TokenType
    star: TokenType
    slash: TokenType
    starstar: TokenType
    coalesce: TokenType
    _break: TokenType
    _case: TokenType
    _catch: TokenType
    _continue: TokenType
    _debugger: TokenType
    _default: TokenType
    _do: TokenType
    _else: TokenType
    _finally: TokenType
    _for: TokenType
    _function: TokenType
    _if: TokenType
    _return: TokenType
    _switch: TokenType
    _throw: TokenType
    _try: TokenType
    _var: TokenType
    _const: TokenType
    _while: TokenType
    _with: TokenType
    _new: TokenType
    _this: TokenType
    _super: TokenType
    _class: TokenType
    _extends: TokenType
    _export: TokenType
    _import: TokenType
    _null: TokenType
    _true: TokenType
    _false: TokenType
    _in: TokenType
    _instanceof: TokenType
    _typeof: TokenType
    _void: TokenType
    _delete: TokenType
  }

  class TokContext {
    constructor(token: string, isExpr: boolean, preserveSpace: boolean, override?: (p: Parser) => void)
  }

  const tokContexts: {
    b_stat: TokContext
    b_expr: TokContext
    b_tmpl: TokContext
    p_stat: TokContext
    p_expr: TokContext
    q_tmpl: TokContext
    f_expr: TokContext
    f_stat: TokContext
    f_expr_gen: TokContext
    f_gen: TokContext
  }

  function isIdentifierStart(code: number, astral?: boolean): boolean

  function isIdentifierChar(code: number, astral?: boolean): boolean

  interface AbstractToken {
  }

  interface Comment extends AbstractToken {
    type: 'Line' | 'Block'
    value: string
    start: number
    end: number
    loc?: SourceLocation
    range?: [number, number]
  }

  class Token {
    type: TokenType
    value: any
    start: number
    end: number
    loc?: SourceLocation
    range?: [number, number]
    constructor(p: Parser)
  }

  function isNewLine(code: number): boolean

  const lineBreak: RegExp

  const lineBreakG: RegExp

  const version: string

  interface BaseNodeProps {
    type: string
    start: number
    end: number
    loc?: SourceLocation
    sourceFile?: string
    range?: [number, number]
    constructor(parser: Parser, pos: number, loc?: SourceLocation)
  }

  export type Node =
    Program |
    BreakStatement |
    ContinueStatement |
    DebuggerStatement |
    DoWhileStatement |
    ForStatement |
    ForInStatement |
    ForOfStatement |
    IfStatement |
    ReturnStatement |
    ThrowStatement |
    SwitchCase |
    SwitchStatement |
    TryStatement |
    CatchClause |
    VariableDeclaration |
    VariableDeclarator |
    WhileStatement |
    WithStatement |
    EmptyStatement |
    LabeledStatement |
    ExpressionStatement |
    BlockStatement |
    FunctionDeclaration |
    FunctionExpression |
    ClassDeclaration |
    ClassExpression |
    ClassBody |
    MethodDefinition |
    PropertyDefinition |
    StaticBlock |
    ExportAllDeclaration |
    ExportSpecifier |
    ExportNamedDeclaration |
    ExportDefaultDeclaration |
    ImportDeclaration |
    ImportNamespaceSpecifier |
    ImportDefaultSpecifier |
    ImportSpecifier |
    SequenceExpression |
    YieldExpression |
    AssignmentExpression |
    ConditionalExpression |
    LogicalExpression |
    BinaryExpression |
    UpdateExpression |
    UnaryExpression |
    ChainExpression |
    MemberExpression |
    CallExpression |
    TaggedTemplateExpression |
    ThisExpression |
    Super |
    Literal |
    ParenthesizedExpression |
    ArrayExpression |
    Identifier |
    MetaProperty |
    ImportExpression |
    NewExpression |
    TemplateElement |
    TemplateLiteral |
    ObjectExpression |
    SpreadElement |
    Property |
    PrivateIdentifier |
    ObjectPattern |
    ArrayPattern |
    RestElement |
    AssignmentPattern |
    ArrowFunctionExpression |
    AwaitExpression

  export type Expression =
    | ArrayExpression
    | AssignmentExpression
    | BinaryExpression
    | CallExpression
    | ConditionalExpression
    | FunctionExpression
    | Identifier
    | LogicalExpression
    | MemberExpression
    | NewExpression
    | ObjectExpression
    | SequenceExpression
    | ParenthesizedExpression
    | ThisExpression
    | UnaryExpression
    | UpdateExpression
    | ArrowFunctionExpression
    | ClassExpression
    | MetaProperty
    | Super
    | TaggedTemplateExpression
    | TemplateLiteral
    | YieldExpression
    | AwaitExpression

  export type Statement =
    | BlockStatement
    | BreakStatement
    | ContinueStatement
    | DebuggerStatement
    | DoWhileStatement
    | EmptyStatement
    | ExpressionStatement
    | ForInStatement
    | ForStatement
    | FunctionDeclaration
    | IfStatement
    | LabeledStatement
    | ReturnStatement
    | SwitchStatement
    | ThrowStatement
    | TryStatement
    | VariableDeclaration
    | WhileStatement
    | WithStatement
    | ClassDeclaration
    | ExportAllDeclaration
    | ExportDefaultDeclaration
    | ExportNamedDeclaration
    | ForOfStatement
    | ImportDeclaration

  export type Pattern = AssignmentPattern | ArrayPattern | ObjectPattern

  export type LVal =
    | Identifier
    | MemberExpression
    | RestElement
    | AssignmentPattern
    | ArrayPattern
    | ObjectPattern


  export type PatternLike =
    | Identifier
    | RestElement
    | AssignmentPattern
    | ArrayPattern
    | ObjectPattern

  export type Declaration =
    | FunctionDeclaration
    | VariableDeclaration
    | ClassDeclaration
    | ExportAllDeclaration
    | ExportDefaultDeclaration
    | ExportNamedDeclaration
    | ImportDeclaration

  export interface Program extends BaseNodeProps {
    type: 'Program'
    sourceType: Options['sourceType']
    body: Array<Statement>
  }

  export interface BreakStatement extends BaseNodeProps {
    type: 'BreakStatement'
    label: null | Identifier
  }

  export interface ContinueStatement extends BaseNodeProps {
    type: 'ContinueStatement'
    label: null | Identifier
  }

  export interface DebuggerStatement extends BaseNodeProps {
    type: 'DebuggerStatement'
  }

  export interface DoWhileStatement extends BaseNodeProps {
    type: 'DoWhileStatement'
    body: Statement
    test: Expression
  }

  export interface ForStatement extends BaseNodeProps {
    type: 'ForStatement'
    init: VariableDeclaration | Expression | null
    test: Expression | null
    update: Expression | null
    body: Statement
  }

  export interface ForInStatement extends BaseNodeProps {
    type: 'ForInStatement'
    body: Statement
    left: VariableDeclaration | LVal
    right: Expression
  }

  export interface ForOfStatement extends BaseNodeProps {
    type: 'ForOfStatement'
    body: Statement
    left: VariableDeclaration | LVal
    right: Expression
    await: boolean
  }

  export interface IfStatement extends BaseNodeProps{
    type: 'IfStatement'
    test: Expression
    consequent: Statement
    alternate: Statement | null
  }

  export interface ReturnStatement extends BaseNodeProps{
    type: 'ReturnStatement'
    argument: Expression | null
  }

  export interface SwitchCase extends BaseNodeProps{
    type: 'SwitchCase'
    consequent: Array<Statement>
    test: Expression | null
  }

  export interface SwitchStatement extends BaseNodeProps{
    type: 'SwitchStatement'
    discriminant: Expression;
    cases: Array<SwitchCase>;
  }

  export interface ThrowStatement extends BaseNodeProps{
    type: 'ThrowStatement'
    argument: Expression
  }

  export interface TryStatement extends BaseNodeProps{
    type: 'TryStatement'
    block: BlockStatement
    handler: CatchClause | null
    finalizer : BlockStatement | null
  }

  export interface CatchClause extends BaseNodeProps{
    type: 'CatchClause'
    param: Identifier | ArrayPattern | ObjectPattern | null
    body: BlockStatement
  }

  export interface VariableDeclaration extends BaseNodeProps{
    type: 'VariableDeclaration'
    declarations: Array<VariableDeclarator>
    kind: 'var' | 'let' | 'const'
  }

  export interface VariableDeclarator extends BaseNodeProps{
    type: 'VariableDeclarator'
    id: LVal
    init: Expression | null
  }

  export interface WhileStatement extends BaseNodeProps{
    type: 'WhileStatement'
    test: Expression
    body: Statement
  }

  export interface WithStatement extends BaseNodeProps{
    type: 'WithStatement'
    object: Expression
    body: Statement
  }

  export interface EmptyStatement extends BaseNodeProps{
    type: 'EmptyStatement'
  }

  export interface LabeledStatement extends BaseNodeProps{
    type: 'LabeledStatement'
    body: Statement
    label: Identifier
  }

  export interface ExpressionStatement extends BaseNodeProps{
    type: 'ExpressionStatement'
    expression: Expression
  }

  export interface BlockStatement extends BaseNodeProps{
    type: 'BlockStatement'
    body: Array<Statement>
  }

  export interface FunctionDeclaration extends BaseNodeProps{
    type: 'FunctionDeclaration'
    id: Identifier | null
    generator?: boolean
    async: boolean
    params: Array<Identifier | Pattern | RestElement>
    expression: boolean
    body: BlockStatement
  }

  export interface FunctionExpression extends BaseNodeProps{
    type: 'FunctionExpression'
    id: Identifier | null
    generator?: boolean
    async: boolean
    params: Array<Identifier | Pattern | RestElement>
    expression: boolean
    body: BlockStatement
  }

  export interface ClassDeclaration extends BaseNodeProps{
    type: 'ClassDeclaration'
    id: Identifier | null
    superClass: Expression | null
    body: ClassBody
  }

  export interface ClassExpression extends BaseNodeProps{
    type: 'ClassExpression'
    id: Identifier | null
    superClass: Expression | null
    body: ClassBody
  }

  export interface ClassBody extends BaseNodeProps {
    type: 'ClassBody'
    body: Array<StaticBlock | Identifier | MethodDefinition | PropertyDefinition>
  }

  export interface MethodDefinition extends BaseNodeProps {
    type: 'MethodDefinition'
    static: boolean
    computed: boolean
    key: Identifier | Literal | Expression
    kind: "get" | "set" | "method" | "constructor"
    value: FunctionExpression | null
  }

  export interface PropertyDefinition extends BaseNodeProps {
    type: 'PropertyDefinition'
    static: boolean
    computed: boolean
    key: Identifier | Literal | Expression
    value: Expression | null
  }

  export interface StaticBlock extends BaseNodeProps {
    type: 'StaticBlock'
    body: Array<Statement>
  }

  export interface ExportAllDeclaration extends BaseNodeProps {
    type: 'ExportAllDeclaration'
    exported: Identifier | Literal | null
    source: Literal
  }

  export interface ExportDefaultDeclaration extends BaseNodeProps {
    type: 'ExportDefaultDeclaration'
    declaration: FunctionDeclaration | ClassDeclaration | Expression
  }

  export interface ExportNamedDeclaration extends BaseNodeProps {
    type: 'ExportNamedDeclaration'
    declaration: Declaration | null
    specifiers: Array<ExportSpecifier>
    source: Literal | null
  }

  export interface ExportSpecifier extends BaseNodeProps {
    type: 'ExportSpecifier'
    local: Identifier
    exported: Identifier | Literal
  }

  export interface ImportDeclaration extends BaseNodeProps {
    type: 'ImportDeclaration'
    specifiers: Array<ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier>
    source: Literal
  }

  export interface ImportDefaultSpecifier extends BaseNodeProps {
    type: 'ImportDefaultSpecifier'
    local: Identifier
  }

  export interface ImportNamespaceSpecifier extends BaseNodeProps {
    type: 'ImportNamespaceSpecifier'
    local: Identifier
  }

  export interface ImportSpecifier extends BaseNodeProps {
    type: 'ImportSpecifier'
    local: Identifier
    imported: Identifier
  }

  export interface SequenceExpression extends BaseNodeProps {
    type: 'SequenceExpression'
    expressions: Array<Expression>
  }

  export interface YieldExpression extends BaseNodeProps {
    type: 'YieldExpression'
    delegate: boolean
    argument: Expression | null
  }

  export interface AssignmentExpression extends BaseNodeProps {
    type: 'AssignmentExpression'
    operator: string
    left: LVal
    right: Expression
  }

  export interface ConditionalExpression extends BaseNodeProps {
    type: 'ConditionalExpression'
    test: Expression
    consequent: Expression
    alternate: Expression
  }

  export interface LogicalExpression extends BaseNodeProps {
    type: 'LogicalExpression'
    operator:
      | "||"
      | "&&"
      | "??"
    left: Expression
    right: Expression
  }

  export interface BinaryExpression extends BaseNodeProps {
    type: 'BinaryExpression'
    operator:
      | "+"
      | "-"
      | "/"
      | "%"
      | "*"
      | "**"
      | "&"
      | "|"
      | ">>"
      | ">>>"
      | "<<"
      | "^"
      | "=="
      | "==="
      | "!="
      | "!=="
      | "in"
      | "instanceof"
      | ">"
      | "<"
      | ">="
      | "<="
      | "|>"
    left: Expression
    right: Expression
  }

  export interface UpdateExpression extends BaseNodeProps {
    type: 'UpdateExpression'
    operator: "++" | "--"
    argument: Expression
    prefix: boolean
  }

  export interface UnaryExpression extends BaseNodeProps {
    type: 'UnaryExpression'
    operator: 'void' | 'throw' | 'delete' | '!' | '+' | '-' | '~' | 'typeof'
    prefix: boolean
    argument: Expression
  }

  export interface ChainExpression extends BaseNodeProps {
    type: 'ChainExpression'
    expression: ArrowFunctionExpression
  }

  export interface MemberExpression extends BaseNodeProps {
    type: 'MemberExpression'
    object: Expression
    property: Expression | Identifier | PrivateIdentifier
    computed: boolean
    optional?: boolean
  }

  export interface CallExpression extends BaseNodeProps {
    type: 'CallExpression'
    callee: Expression
    arguments: Array<Expression | SpreadElement | null>
    optional?: boolean
  }

  export interface TaggedTemplateExpression extends BaseNodeProps {
    type: 'TaggedTemplateExpression'
    tag: Expression
    quasi: TemplateLiteral
  }

  export interface ThisExpression extends BaseNodeProps {
    type: 'ThisExpression'
  }

  export interface Super extends BaseNodeProps {
    type: 'Super'
  }

  export interface Literal extends BaseNodeProps {
    type: 'Literal'
    value: string
    raw: string
    bigint?: string
    regex?: {
      pattern: string
      flags: string
    }
  }

  export interface ParenthesizedExpression extends BaseNodeProps {
    type: 'ParenthesizedExpression'
    expression: Expression
  }

  export interface ArrayExpression extends BaseNodeProps {
    type: 'ArrayExpression'
    elements: Array<Expression | SpreadElement | null>
  }

  export interface Identifier extends BaseNodeProps {
    type: 'Identifier'
    name: string
  }

  export interface MetaProperty extends BaseNodeProps {
    type: 'MetaProperty'
    meta: Identifier
    property: Identifier
  }

  export interface ImportExpression extends BaseNodeProps {
    type: 'ImportExpression'
    source: Expression
  }

  export interface NewExpression extends BaseNodeProps {
    type: 'NewExpression'
    callee: Expression
    arguments: Array<Expression | SpreadElement | null>
  }

  export interface TemplateElement extends BaseNodeProps {
    type: 'TemplateElement'
    value: {
      raw: string
      cooked: null | string
    }
    tail: boolean
  }

  export interface TemplateLiteral extends BaseNodeProps {
    type: 'TemplateLiteral'
    expressions: Array<Expression>
    quasis: Array<TemplateElement>
  }

  export interface ObjectExpression extends BaseNodeProps {
    type: 'ObjectExpression'
    properties: Array<Property | SpreadElement | RestElement>
  }

  export interface SpreadElement extends BaseNodeProps {
    type: 'SpreadElement'
    argument: Expression
  }

  export interface Property extends BaseNodeProps {
    type: 'Property'
    method: boolean
    shorthand: boolean
    key: Identifier | Literal | Expression
    computed?: boolean
    kind: string
    value: Expression
  }

  export interface PrivateIdentifier extends BaseNodeProps {
    type: 'PrivateIdentifier'
    name: string
  }

  export interface ObjectPattern extends BaseNodeProps {
    type: 'ObjectPattern'
    properties: Array<Property | SpreadElement | RestElement>
  }

  export interface ArrayPattern extends BaseNodeProps {
    type: 'ArrayPattern'
    elements: Array<PatternLike | LVal | null>
  }

  export interface RestElement extends BaseNodeProps {
    type: 'RestElement'
    argument: LVal
  }

  export interface AssignmentPattern extends BaseNodeProps {
    type: 'AssignmentPattern'
    left:
      | Identifier
      | ObjectPattern
      | ArrayPattern
      | MemberExpression
    right: Expression
  }

  export interface ArrowFunctionExpression extends BaseNodeProps {
    type: 'ArrowFunctionExpression'
    async: boolean
    params: Array<Identifier | Pattern | RestElement>
    expression: boolean
    body: BlockStatement | Expression
    generator?: boolean
  }

  export interface AwaitExpression extends BaseNodeProps {
    type: 'AwaitExpression'
    argument: Expression
  }
}
