if (typeof exports !== "undefined") {
  var test = require("./driver.js").test;
  var testFail = require("./driver.js").testFail;
}

const newBigIntLiteral = (start, stringValue) => ({
  start: start,
  type: "Literal",
  end: start + stringValue.length + 1,
  value: typeof BigInt !== "undefined" ? BigInt(stringValue) : null,
  raw: `${stringValue}n`,
  bigint: stringValue
})

const digits = [
  {d: "0", ast: start => newBigIntLiteral(start, "0")},
  {d: "2", ast: start => newBigIntLiteral(start, "2")},
  {d: "0x2", ast: start => newBigIntLiteral(start, "0x2")},
  {d: "0o2", ast: start => newBigIntLiteral(start, "0o2")},
  {d: "0b10", ast: start => newBigIntLiteral(start, "0b10")},
  {d: "-0xbf2ed51ff75d380fd3be813ec6185780", ast: start => ({
    start: start,
    type: "UnaryExpression",
    end: start + 36,
    operator: "-",
    prefix: true,
    argument: newBigIntLiteral(start + 1, "0xbf2ed51ff75d380fd3be813ec6185780")
  })},
  {d: "02", error: start => `Identifier directly after number (1:${start + 2})`},
  {d: "2e2", error: start => `Identifier directly after number (1:${start + 3})`},
  {d: "2.4", error: start => `Identifier directly after number (1:${start + 3})`},
  {d: ".4", error: start => `Identifier directly after number (1:${start + 2})`},
]
const statements = [
  {s: "let i = %s", ast: content => ({
    start: 0,
    type: "VariableDeclaration",
    end: content.end,
    kind: "let",
    declarations: [{
      start: 4,
      type: "VariableDeclarator",
      end: content.end,
      id: {
        start: 4,
        type: "Identifier",
        end: 5,
        name: "i"
      },
      init: content
    }]
  })},

  {s: "i = %s", ast: content => ({
    start: 0,
    type: "ExpressionStatement",
    end: content.end,
    expression: {
      start: 0,
      type: "AssignmentExpression",
      end: content.end,
      operator: "=",
      left: {
        start: 0,
        type: "Identifier",
        end: 1,
        name: "i"
      },
      right: content
    }
  })},

  {s: "((i = %s) => {})", ast: content => ({
    start: 0,
    type: "ExpressionStatement",
    end: content.end + 8,
    expression: {
      start: 1,
      type: "ArrowFunctionExpression",
      end: content.end + 7,
      id: null,
      generator: false,
      expression: false,
      async: false,
      params: [
        {
          start: 2,
          type: "AssignmentPattern",
          end: content.end,
          left: {
            start: 2,
            type: "Identifier",
            end: 3,
            name: "i"
          },
          right: content
        }
      ],
      body: {
        start: content.end + 5,
        type: "BlockStatement",
        end: content.end + 7,
        body: []
      }
    }
  })},

  {s: "for (let i = 0n; i < %s;++i) {}", ast: content => ({
    start: 0,
    type: "ForStatement",
    end: content.end + 8,
    init: {
      start: 5,
      type: "VariableDeclaration",
      end: 15,
      declarations: [
        {
          start: 9,
          type: "VariableDeclarator",
          end: 15,
          id: {
            start: 9,
            type: "Identifier",
            end: 10,
            name: "i"
          },
          init: newBigIntLiteral(13, "0")
        }
      ],
      kind: "let"
    },
    test: {
      start: 17,
      type: "BinaryExpression",
      end: content.end,
      left: {
        start: 17,
        type: "Identifier",
        start: 17,
        end: 18,
        name: "i"
      },
      operator: "<",
      right: content
    },
    update: {
      start: content.end + 1,
      type: "UpdateExpression",
      end: content.end + 4,
      operator: "++",
      prefix: true,
      argument: {
        start: content.end + 3,
        type: "Identifier",
        end: content.end + 4,
        name: "i"
      }
    },
    body: {
      start: content.end + 6,
      type: "BlockStatement",
      end: content.end + 8,
      body: []
    }
  })},

  {s: "i + %s", ast: content => ({
    start: 0,
    type: "ExpressionStatement",
    end: content.end,
    expression: {
      start: 0,
      type: "BinaryExpression",
      end: content.end,
      left: {
        start: 0,
        type: "Identifier",
        start: 0,
        end: 1,
        name: "i"
      },
      operator: "+",
      right: content
    }
  })}
]
statements.forEach(statement => {
  const start = statement.s.indexOf("%s")
  digits.forEach(d => {
    (d.error ? testFail : test)(
      statement.s.replace("%s", `${d.d}n`),
      d.error ? d.error(start) : { type: "Program", body: [
        statement.ast(d.ast(start))
      ]}, { ecmaVersion: 11 }
    )
  })
})
