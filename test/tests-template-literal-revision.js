if (typeof exports !== "undefined") {
  var test = require("./driver.js").test
  var testFail = require("./driver.js").testFail
}

test("`foo`", {
  type: "Program",
  start: 0,
  end: 5,
  body: [
    {
      type: "ExpressionStatement",
      start: 0,
      end: 5,
      expression: {
        type: "TemplateLiteral",
        start: 0,
        end: 5,
        expressions: [],
        quasis: [
          {
            type: "TemplateElement",
            start: 1,
            end: 4,
            value: {
              raw: "foo",
              cooked: "foo"
            },
            tail: true
          }
        ]
      }
    }
  ],
  sourceType: "script"
}, {ecmaVersion: 9})

test("`foo\\u25a0`", {
  type: "Program",
  start: 0,
  end: 11,
  body: [
    {
      type: "ExpressionStatement",
      start: 0,
      end: 11,
      expression: {
        type: "TemplateLiteral",
        start: 0,
        end: 11,
        expressions: [],
        quasis: [
          {
            type: "TemplateElement",
            start: 1,
            end: 10,
            value: {
              raw: "foo\\u25a0",
              cooked: "foo■"
            },
            tail: true
          }
        ]
      }
    }
  ],
  sourceType: "script"
}, {ecmaVersion: 9})

test("`foo${bar}\\u25a0`", {
  type: "Program",
  start: 0,
  end: 17,
  body: [
    {
      type: "ExpressionStatement",
      start: 0,
      end: 17,
      expression: {
        type: "TemplateLiteral",
        start: 0,
        end: 17,
        expressions: [
          {
            type: "Identifier",
            start: 6,
            end: 9,
            name: "bar"
          }
        ],
        quasis: [
          {
            type: "TemplateElement",
            start: 1,
            end: 4,
            value: {
              raw: "foo",
              cooked: "foo"
            },
            tail: false
          },
          {
            type: "TemplateElement",
            start: 10,
            end: 16,
            value: {
              raw: "\\u25a0",
              cooked: "■"
            },
            tail: true
          }
        ]
      }
    }
  ],
  sourceType: "script"
}, {ecmaVersion: 9})

test("foo`\\u25a0`", {
  type: "Program",
  start: 0,
  end: 11,
  body: [
    {
      type: "ExpressionStatement",
      start: 0,
      end: 11,
      expression: {
        type: "TaggedTemplateExpression",
        start: 0,
        end: 11,
        tag: {
          type: "Identifier",
          start: 0,
          end: 3,
          name: "foo"
        },
        quasi: {
          type: "TemplateLiteral",
          start: 3,
          end: 11,
          expressions: [],
          quasis: [
            {
              type: "TemplateElement",
              start: 4,
              end: 10,
              value: {
                raw: "\\u25a0",
                cooked: "■"
              },
              tail: true
            }
          ]
        }
      }
    }
  ],
  sourceType: "script"
}, {ecmaVersion: 9})

test("foo`foo${bar}\\u25a0`", {
  type: "Program",
  start: 0,
  end: 20,
  body: [
    {
      type: "ExpressionStatement",
      start: 0,
      end: 20,
      expression: {
        type: "TaggedTemplateExpression",
        start: 0,
        end: 20,
        tag: {
          type: "Identifier",
          start: 0,
          end: 3,
          name: "foo"
        },
        quasi: {
          type: "TemplateLiteral",
          start: 3,
          end: 20,
          expressions: [
            {
              type: "Identifier",
              start: 9,
              end: 12,
              name: "bar"
            }
          ],
          quasis: [
            {
              type: "TemplateElement",
              start: 4,
              end: 7,
              value: {
                raw: "foo",
                cooked: "foo"
              },
              tail: false
            },
            {
              type: "TemplateElement",
              start: 13,
              end: 19,
              value: {
                raw: "\\u25a0",
                cooked: "■"
              },
              tail: true
            }
          ]
        }
      }
    }
  ],
  sourceType: "script"
}, {ecmaVersion: 9})

testFail("`\\unicode`", "Bad escape sequence in untagged template literal (1:1)", {ecmaVersion: 9})
testFail("`\\u`", "Bad escape sequence in untagged template literal (1:1)", {ecmaVersion: 9})
testFail("`\\u{`", "Bad escape sequence in untagged template literal (1:1)", {ecmaVersion: 9})
testFail("`\\u{abcdx`", "Bad escape sequence in untagged template literal (1:1)", {ecmaVersion: 9})
testFail("`\\u{abcdx}`", "Bad escape sequence in untagged template literal (1:1)", {ecmaVersion: 9})
testFail("`\\xylophone`", "Bad escape sequence in untagged template literal (1:1)", {ecmaVersion: 9})

testFail("foo`\\unicode`", "Bad character escape sequence (1:6)", {ecmaVersion: 8})
testFail("foo`\\xylophone`", "Bad character escape sequence (1:6)", {ecmaVersion: 8})

testFail("foo`\\unicode", "Unterminated template (1:4)", {ecmaVersion: 9})
testFail("foo`\\unicode\\`", "Unterminated template (1:4)", {ecmaVersion: 9})

test("foo`\\unicode`", {
  type: "Program",
  start: 0,
  end: 13,
  body: [
    {
      type: "ExpressionStatement",
      start: 0,
      end: 13,
      expression: {
        type: "TaggedTemplateExpression",
        start: 0,
        end: 13,
        tag: {
          type: "Identifier",
          start: 0,
          end: 3,
          name: "foo"
        },
        quasi: {
          type: "TemplateLiteral",
          start: 3,
          end: 13,
          expressions: [],
          quasis: [
            {
              type: "TemplateElement",
              start: 4,
              end: 12,
              value: {
                raw: "\\unicode",
                cooked: null
              },
              tail: true
            }
          ]
        }
      }
    }
  ],
  sourceType: "script"
}, {ecmaVersion: 9})

test("foo`foo${bar}\\unicode`", {
  type: "Program",
  start: 0,
  end: 22,
  body: [
    {
      type: "ExpressionStatement",
      start: 0,
      end: 22,
      expression: {
        type: "TaggedTemplateExpression",
        start: 0,
        end: 22,
        tag: {
          type: "Identifier",
          start: 0,
          end: 3,
          name: "foo"
        },
        quasi: {
          type: "TemplateLiteral",
          start: 3,
          end: 22,
          expressions: [
            {
              type: "Identifier",
              start: 9,
              end: 12,
              name: "bar"
            }
          ],
          quasis: [
            {
              type: "TemplateElement",
              start: 4,
              end: 7,
              value: {
                raw: "foo",
                cooked: "foo"
              },
              tail: false
            },
            {
              type: "TemplateElement",
              start: 13,
              end: 21,
              value: {
                raw: "\\unicode",
                cooked: null
              },
              tail: true
            }
          ]
        }
      }
    }
  ],
  sourceType: "script"
}, {ecmaVersion: 9})

test("foo`\\u`", {
  type: "Program",
  start: 0,
  end: 7,
  body: [
    {
      type: "ExpressionStatement",
      start: 0,
      end: 7,
      expression: {
        type: "TaggedTemplateExpression",
        start: 0,
        end: 7,
        tag: {
          type: "Identifier",
          start: 0,
          end: 3,
          name: "foo"
        },
        quasi: {
          type: "TemplateLiteral",
          start: 3,
          end: 7,
          expressions: [],
          quasis: [
            {
              type: "TemplateElement",
              start: 4,
              end: 6,
              value: {
                raw: "\\u",
                cooked: null
              },
              tail: true
            }
          ]
        }
      }
    }
  ],
  sourceType: "script"
}, {ecmaVersion: 9})

test("foo`\\u{`", {
  type: "Program",
  start: 0,
  end: 8,
  body: [
    {
      type: "ExpressionStatement",
      start: 0,
      end: 8,
      expression: {
        type: "TaggedTemplateExpression",
        start: 0,
        end: 8,
        tag: {
          type: "Identifier",
          start: 0,
          end: 3,
          name: "foo"
        },
        quasi: {
          type: "TemplateLiteral",
          start: 3,
          end: 8,
          expressions: [],
          quasis: [
            {
              type: "TemplateElement",
              start: 4,
              end: 7,
              value: {
                raw: "\\u{",
                cooked: null
              },
              tail: true
            }
          ]
        }
      }
    }
  ],
  sourceType: "script"
}, {ecmaVersion: 9})

test("foo`\\u{abcdx`", {
  type: "Program",
  start: 0,
  end: 13,
  body: [
    {
      type: "ExpressionStatement",
      start: 0,
      end: 13,
      expression: {
        type: "TaggedTemplateExpression",
        start: 0,
        end: 13,
        tag: {
          type: "Identifier",
          start: 0,
          end: 3,
          name: "foo"
        },
        quasi: {
          type: "TemplateLiteral",
          start: 3,
          end: 13,
          expressions: [],
          quasis: [
            {
              type: "TemplateElement",
              start: 4,
              end: 12,
              value: {
                raw: "\\u{abcdx",
                cooked: null
              },
              tail: true
            }
          ]
        }
      }
    }
  ],
  sourceType: "script"
}, {ecmaVersion: 9})

test("foo`\\u{abcdx}`", {
  type: "Program",
  start: 0,
  end: 14,
  body: [
    {
      type: "ExpressionStatement",
      start: 0,
      end: 14,
      expression: {
        type: "TaggedTemplateExpression",
        start: 0,
        end: 14,
        tag: {
          type: "Identifier",
          start: 0,
          end: 3,
          name: "foo"
        },
        quasi: {
          type: "TemplateLiteral",
          start: 3,
          end: 14,
          expressions: [],
          quasis: [
            {
              type: "TemplateElement",
              start: 4,
              end: 13,
              value: {
                raw: "\\u{abcdx}",
                cooked: null
              },
              tail: true
            }
          ]
        }
      }
    }
  ],
  sourceType: "script"
}, {ecmaVersion: 9})

test("foo`\\unicode\\\\`", {
  type: "Program",
  start: 0,
  end: 15,
  body: [
    {
      type: "ExpressionStatement",
      start: 0,
      end: 15,
      expression: {
        type: "TaggedTemplateExpression",
        start: 0,
        end: 15,
        tag: {
          type: "Identifier",
          start: 0,
          end: 3,
          name: "foo"
        },
        quasi: {
          type: "TemplateLiteral",
          start: 3,
          end: 15,
          expressions: [],
          quasis: [
            {
              type: "TemplateElement",
              start: 4,
              end: 14,
              value: {
                raw: "\\unicode\\\\",
                cooked: null
              },
              tail: true
            }
          ]
        }
      }
    }
  ],
  sourceType: "script"
}, {ecmaVersion: 9})

test("`${ {class: 1} }`", {}, { ecmaVersion: 9 })
test("`${ {delete: 1} }`", {}, { ecmaVersion: 9 })
test("`${ {enum: 1} }`", {}, { ecmaVersion: 9 })
test("`${ {function: 1} }`", {}, { ecmaVersion: 9 })
