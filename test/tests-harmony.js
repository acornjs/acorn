/*
  Copyright (C) 2015 Ingvar Stepanyan <me@rreverser.com>
  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
  Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
  Copyright (C) 2011 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2011 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2011 Arpad Borsos <arpad.borsos@googlemail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

if (typeof exports != "undefined") {
  var test = require("./driver.js").test;
  var testFail = require("./driver.js").testFail;
}

/*
  Tests below were automatically converted from https://github.com/ariya/esprima/blob/2bb17ef9a45c88e82d72c2c61b7b7af93caef028/test/harmonytest.js.

  Manually fixed locations for:
   - parenthesized expressions (include brackets into expression's location)
   - expression statements (excluded spaces after statement's semicolon)
   - arrow and method functions (included arguments into function's location)
   - template elements (excluded '`', '${' and '}' from element's location)
*/

// ES6 Unicode Code Point Escape Sequence

test("\"\\u{714E}\\u{8336}\"", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: "煎茶",
      raw: "\"\\u{714E}\\u{8336}\"",
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 18}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 18}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 18}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("\"\\u{20BB7}\\u{91CE}\\u{5BB6}\"", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: "𠮷野家",
      raw: "\"\\u{20BB7}\\u{91CE}\\u{5BB6}\"",
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 27}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 27}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 27}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// ES6: Numeric Literal

test("00", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: 0,
      raw: "00",
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 2}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 2}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 2}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0o0", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: 0,
      raw: "0o0",
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 3}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 3}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 3}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function test() {'use strict'; 0o0; }", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "test",
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 13}
      }
    },
    params: [],
    body: {
      type: "BlockStatement",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "Literal",
            value: "use strict",
            raw: "'use strict'",
            loc: {
              start: {line: 1, column: 17},
              end: {line: 1, column: 29}
            }
          },
          loc: {
            start: {line: 1, column: 17},
            end: {line: 1, column: 30}
          }
        },
        {
          type: "ExpressionStatement",
          expression: {
            type: "Literal",
            value: 0,
            raw: "0o0",
            loc: {
              start: {line: 1, column: 31},
              end: {line: 1, column: 34}
            }
          },
          loc: {
            start: {line: 1, column: 31},
            end: {line: 1, column: 35}
          }
        }
      ],
      loc: {
        start: {line: 1, column: 16},
        end: {line: 1, column: 37}
      }
    },
    generator: false,
    expression: false,
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 37}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 37}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0o2", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: 2,
      raw: "0o2",
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 3}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 3}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 3}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0o12", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: 10,
      raw: "0o12",
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 4}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 4}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 4}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0O0", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: 0,
      raw: "0O0",
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 3}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 3}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 3}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function test() {'use strict'; 0O0; }", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "test",
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 13}
      }
    },
    params: [],
    body: {
      type: "BlockStatement",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "Literal",
            value: "use strict",
            raw: "'use strict'",
            loc: {
              start: {line: 1, column: 17},
              end: {line: 1, column: 29}
            }
          },
          loc: {
            start: {line: 1, column: 17},
            end: {line: 1, column: 30}
          }
        },
        {
          type: "ExpressionStatement",
          expression: {
            type: "Literal",
            value: 0,
            raw: "0O0",
            loc: {
              start: {line: 1, column: 31},
              end: {line: 1, column: 34}
            }
          },
          loc: {
            start: {line: 1, column: 31},
            end: {line: 1, column: 35}
          }
        }
      ],
      loc: {
        start: {line: 1, column: 16},
        end: {line: 1, column: 37}
      }
    },
    generator: false,
    expression: false,
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 37}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 37}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0O2", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: 2,
      raw: "0O2",
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 3}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 3}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 3}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0O12", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: 10,
      raw: "0O12",
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 4}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 4}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 4}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0b0", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: 0,
      raw: "0b0",
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 3}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 3}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 3}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0b1", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: 1,
      raw: "0b1",
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 3}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 3}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 3}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0b10", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: 2,
      raw: "0b10",
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 4}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 4}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 4}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0B0", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: 0,
      raw: "0B0",
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 3}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 3}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 3}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0B1", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: 1,
      raw: "0B1",
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 3}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 3}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 3}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0B10", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: 2,
      raw: "0B10",
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 4}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 4}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 4}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// ES6 Template Strings

test("`42`", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "TemplateLiteral",
      quasis: [{
        type: "TemplateElement",
        value: {raw: "42", cooked: "42"},
        tail: true,
        loc: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 3}
        }
      }],
      expressions: [],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 4}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 4}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 4}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("raw`42`", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "TaggedTemplateExpression",
      tag: {
        type: "Identifier",
        name: "raw",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 3}
        }
      },
      quasi: {
        type: "TemplateLiteral",
        quasis: [{
          type: "TemplateElement",
          value: {raw: "42", cooked: "42"},
          tail: true,
          loc: {
            start: {line: 1, column: 4},
            end: {line: 1, column: 6}
          }
        }],
        expressions: [],
        loc: {
          start: {line: 1, column: 3},
          end: {line: 1, column: 7}
        }
      },
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 7}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 7}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 7}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("raw`hello ${name}`", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "TaggedTemplateExpression",
      tag: {
        type: "Identifier",
        name: "raw",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 3}
        }
      },
      quasi: {
        type: "TemplateLiteral",
        quasis: [
          {
            type: "TemplateElement",
            value: {raw: "hello ", cooked: "hello "},
            tail: false,
            loc: {
              start: {line: 1, column: 4},
              end: {line: 1, column: 10}
            }
          },
          {
            type: "TemplateElement",
            value: {raw: "", cooked: ""},
            tail: true,
            loc: {
              start: {line: 1, column: 17},
              end: {line: 1, column: 17}
            }
          }
        ],
        expressions: [{
          type: "Identifier",
          name: "name",
          loc: {
            start: {line: 1, column: 12},
            end: {line: 1, column: 16}
          }
        }],
        loc: {
          start: {line: 1, column: 3},
          end: {line: 1, column: 18}
        }
      },
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 18}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 18}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 18}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("`$`", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "TemplateLiteral",
      quasis: [{
        type: "TemplateElement",
        value: {raw: "$", cooked: "$"},
        tail: true,
        loc: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 2}
        }
      }],
      expressions: [],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 3}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 3}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 3}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("`\\n\\r\\b\\v\\t\\f\\\n\\\r\n`", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "TemplateLiteral",
      quasis: [{
        type: "TemplateElement",
        value: {raw: "\\n\\r\\b\\v\\t\\f\\\n\\\n", cooked: "\n\r\b\u000b\t\f"},
        tail: true,
        loc: {
          start: {line: 1, column: 1},
          end: {line: 3, column: 0}
        }
      }],
      expressions: [],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 3, column: 1}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 3, column: 1}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 3, column: 1}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("`\n\r\n\r`", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "TemplateLiteral",
      quasis: [{
        type: "TemplateElement",
        value: {raw: "\n\n\n", cooked: "\n\n\n"},
        tail: true,
        loc: {
          start: {line: 1, column: 1},
          end: {line: 4, column: 0}
        }
      }],
      expressions: [],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 4, column: 1}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 4, column: 1}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 4, column: 1}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("`\\u{000042}\\u0042\\x42u0\\A`", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "TemplateLiteral",
      quasis: [{
        type: "TemplateElement",
        value: {raw: "\\u{000042}\\u0042\\x42u0\\A", cooked: "BBBu0A"},
        tail: true,
        loc: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 25}
        }
      }],
      expressions: [],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 26}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 26}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 26}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("new raw`42`", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "NewExpression",
      callee: {
        type: "TaggedTemplateExpression",
        tag: {
          type: "Identifier",
          name: "raw",
          loc: {
            start: {line: 1, column: 4},
            end: {line: 1, column: 7}
          }
        },
        quasi: {
          type: "TemplateLiteral",
          quasis: [{
            type: "TemplateElement",
            value: {raw: "42", cooked: "42"},
            tail: true,
            loc: {
              start: {line: 1, column: 8},
              end: {line: 1, column: 10}
            }
          }],
          expressions: [],
          loc: {
            start: {line: 1, column: 7},
            end: {line: 1, column: 11}
          }
        },
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 11}
        }
      },
      arguments: [],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 11}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 11}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 11}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("`outer${{x: {y: 10}}}bar${`nested${function(){return 1;}}endnest`}end`",{
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "TemplateLiteral",
        expressions: [
          {
            type: "ObjectExpression",
            properties: [
              {
                type: "Property",
                method: false,
                shorthand: false,
                computed: false,
                key: {
                  type: "Identifier",
                  name: "x"
                },
                value: {
                  type: "ObjectExpression",
                  properties: [
                    {
                      type: "Property",
                      method: false,
                      shorthand: false,
                      computed: false,
                      key: {
                        type: "Identifier",
                        name: "y"
                      },
                      value: {
                        type: "Literal",
                        value: 10,
                        raw: "10"
                      },
                      kind: "init"
                    }
                  ]
                },
                kind: "init"
              }
            ]
          },
          {
            type: "TemplateLiteral",
            expressions: [
              {
                type: "FunctionExpression",
                id: null,
                params: [],
                generator: false,
                body: {
                  type: "BlockStatement",
                  body: [
                    {
                      type: "ReturnStatement",
                      argument: {
                        type: "Literal",
                        value: 1,
                        raw: "1"
                      }
                    }
                  ]
                },
                expression: false
              }
            ],
            quasis: [
              {
                type: "TemplateElement",
                value: {
                  cooked: "nested",
                  raw: "nested"
                },
                tail: false
              },
              {
                type: "TemplateElement",
                value: {
                  cooked: "endnest",
                  raw: "endnest"
                },
                tail: true
              }
            ]
          }
        ],
        quasis: [
          {
            type: "TemplateElement",
            value: {
              cooked: "outer",
              raw: "outer"
            },
            tail: false
          },
          {
            type: "TemplateElement",
            value: {
              cooked: "bar",
              raw: "bar"
            },
            tail: false
          },
          {
            type: "TemplateElement",
            value: {
              cooked: "end",
              raw: "end"
            },
            tail: true
          }
        ]
      }
    }
  ]
}, {
  ecmaVersion: 6
});


// ES6: Switch Case Declaration

test("switch (answer) { case 42: let t = 42; break; }", {
  type: "Program",
  body: [{
    type: "SwitchStatement",
    discriminant: {
      type: "Identifier",
      name: "answer",
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 14}
      }
    },
    cases: [{
      type: "SwitchCase",
      test: {
        type: "Literal",
        value: 42,
        raw: "42",
        loc: {
          start: {line: 1, column: 23},
          end: {line: 1, column: 25}
        }
      },
      consequent: [
        {
          type: "VariableDeclaration",
          declarations: [{
            type: "VariableDeclarator",
            id: {
              type: "Identifier",
              name: "t",
              loc: {
                start: {line: 1, column: 31},
                end: {line: 1, column: 32}
              }
            },
            init: {
              type: "Literal",
              value: 42,
              raw: "42",
              loc: {
                start: {line: 1, column: 35},
                end: {line: 1, column: 37}
              }
            },
            loc: {
              start: {line: 1, column: 31},
              end: {line: 1, column: 37}
            }
          }],
          kind: "let",
          loc: {
            start: {line: 1, column: 27},
            end: {line: 1, column: 38}
          }
        },
        {
          type: "BreakStatement",
          label: null,
          loc: {
            start: {line: 1, column: 39},
            end: {line: 1, column: 45}
          }
        }
      ],
      loc: {
        start: {line: 1, column: 18},
        end: {line: 1, column: 45}
      }
    }],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 47}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 47}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// ES6: Arrow Function

test("() => \"test\"", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [],
      body: {
        type: "Literal",
        value: "test",
        raw: "\"test\"",
        loc: {
          start: {line: 1, column: 6},
          end: {line: 1, column: 12}
        }
      },
      generator: false,
      expression: true,
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 12}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 12}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 12}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("e => \"test\"", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "Identifier",
        name: "e",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      }],
      body: {
        type: "Literal",
        value: "test",
        raw: "\"test\"",
        loc: {
          start: {line: 1, column: 5},
          end: {line: 1, column: 11}
        }
      },
      generator: false,
      expression: true,
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 11}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 11}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 11}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(e) => \"test\"", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "Identifier",
        name: "e",
        loc: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 2}
        }
      }],
      body: {
        type: "Literal",
        value: "test",
        raw: "\"test\"",
        loc: {
          start: {line: 1, column: 7},
          end: {line: 1, column: 13}
        }
      },
      generator: false,
      expression: true,
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 13}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 13}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 13}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(a, b) => \"test\"", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [
        {
          type: "Identifier",
          name: "a",
          loc: {
            start: {line: 1, column: 1},
            end: {line: 1, column: 2}
          }
        },
        {
          type: "Identifier",
          name: "b",
          loc: {
            start: {line: 1, column: 4},
            end: {line: 1, column: 5}
          }
        }
      ],
      body: {
        type: "Literal",
        value: "test",
        raw: "\"test\"",
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 16}
        }
      },
      generator: false,
      expression: true,
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 16}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 16}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 16}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("e => { 42; }", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "Identifier",
        name: "e",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      }],
      body: {
        type: "BlockStatement",
        body: [{
          type: "ExpressionStatement",
          expression: {
            type: "Literal",
            value: 42,
            raw: "42",
            loc: {
              start: {line: 1, column: 7},
              end: {line: 1, column: 9}
            }
          },
          loc: {
            start: {line: 1, column: 7},
            end: {line: 1, column: 10}
          }
        }],
        loc: {
          start: {line: 1, column: 5},
          end: {line: 1, column: 12}
        }
      },
      generator: false,
      expression: false,
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 12}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 12}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 12}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("e => ({ property: 42 })", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "Identifier",
        name: "e",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      }],
      body: {
        type: "ObjectExpression",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "property",
            loc: {
              start: {line: 1, column: 8},
              end: {line: 1, column: 16}
            }
          },
          value: {
            type: "Literal",
            value: 42,
            raw: "42",
            loc: {
              start: {line: 1, column: 18},
              end: {line: 1, column: 20}
            }
          },
          kind: "init",
          method: false,
          shorthand: false,
          computed: false,
          loc: {
            start: {line: 1, column: 8},
            end: {line: 1, column: 20}
          }
        }],
        loc: {
          start: {line: 1, column: 6},
          end: {line: 1, column: 22}
        }
      },
      generator: false,
      expression: true,
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 23}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 23}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 23}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("e => { label: 42 }", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "Identifier",
        name: "e",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      }],
      body: {
        type: "BlockStatement",
        body: [{
          type: "LabeledStatement",
          label: {
            type: "Identifier",
            name: "label",
            loc: {
              start: {line: 1, column: 7},
              end: {line: 1, column: 12}
            }
          },
          body: {
            type: "ExpressionStatement",
            expression: {
              type: "Literal",
              value: 42,
              raw: "42",
              loc: {
                start: {line: 1, column: 14},
                end: {line: 1, column: 16}
              }
            },
            loc: {
              start: {line: 1, column: 14},
              end: {line: 1, column: 16}
            }
          },
          loc: {
            start: {line: 1, column: 7},
            end: {line: 1, column: 16}
          }
        }],
        loc: {
          start: {line: 1, column: 5},
          end: {line: 1, column: 18}
        }
      },
      generator: false,
      expression: false,
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 18}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 18}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 18}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(a, b) => { 42; }", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [
        {
          type: "Identifier",
          name: "a",
          loc: {
            start: {line: 1, column: 1},
            end: {line: 1, column: 2}
          }
        },
        {
          type: "Identifier",
          name: "b",
          loc: {
            start: {line: 1, column: 4},
            end: {line: 1, column: 5}
          }
        }
      ],
      body: {
        type: "BlockStatement",
        body: [{
          type: "ExpressionStatement",
          expression: {
            type: "Literal",
            value: 42,
            raw: "42",
            loc: {
              start: {line: 1, column: 12},
              end: {line: 1, column: 14}
            }
          },
          loc: {
            start: {line: 1, column: 12},
            end: {line: 1, column: 15}
          }
        }],
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 17}
        }
      },
      generator: false,
      expression: false,
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 17}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 17}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 17}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("([a, , b]) => 42", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "ArrayPattern",
        elements: [
          {
            type: "Identifier",
            name: "a",
            loc: {
              start: {line: 1, column: 2},
              end: {line: 1, column: 3}
            }
          },
          null,
          {
            type: "Identifier",
            name: "b",
            loc: {
              start: {line: 1, column: 7},
              end: {line: 1, column: 8}
            }
          }
        ],
        loc: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 9}
        }
      }],
      body: {
        type: "Literal",
        value: 42,
        raw: "42",
        loc: {
          start: {line: 1, column: 14},
          end: {line: 1, column: 16}
        }
      },
      generator: false,
      expression: true,
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 16}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 16}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 16}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

testFail("([a.a]) => 42", "Assigning to rvalue (1:2)", {ecmaVersion: 6});
testFail("() => {}()", "Unexpected token (1:8)", {ecmaVersion: 6})
testFail("(a) => {}()", "Unexpected token (1:9)", {ecmaVersion: 6})
testFail("a => {}()", "Unexpected token (1:7)", {ecmaVersion: 6})
testFail("console.log(typeof () => {});", "Unexpected token (1:20)", {ecmaVersion: 6})

test("(() => {})()", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
        type: "CallExpression",
        start: 0,
        end: 12,
        callee: {
          type: "ArrowFunctionExpression",
          id: null,
          params: [],
          body: {
            type: "BlockStatement",
            body: [],
            start: 7,
            end: 9,
            loc: {
              start: {line: 1, column: 7},
              end: {line: 1, column: 9}
            }
          },
          generator: false,
          expression: false,
          loc: {
            start: {line: 1, column: 1},
            end: {line: 1, column: 9}
          }
        }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 12}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 12}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("((() => {}))()", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
        type: "CallExpression",
        start: 0,
        end: 14,
        callee: {
          type: "ArrowFunctionExpression",
          id: null,
          params: [],
          body: {
            type: "BlockStatement",
            body: [],
            start: 8,
            end: 10,
            loc: {
              start: {line: 1, column: 8},
              end: {line: 1, column: 10}
            }
          },
          generator: false,
          expression: false,
          loc: {
            start: {line: 1, column: 2},
            end: {line: 1, column: 10}
          }
        }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 14}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 14}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});


test("(x=1) => x * x", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "AssignmentPattern",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {line: 1, column: 1},
            end: {line: 1, column: 2}
          }
        },
        right: {
          type: "Literal",
          value: 1,
          raw: "1",
          loc: {
            start: {line: 1, column: 3},
            end: {line: 1, column: 4}
          }
        },
        loc: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 4}
        }
      }],
      body: {
        type: "BinaryExpression",
        operator: "*",
        left: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {line: 1, column: 9},
            end: {line: 1, column: 10}
          }
        },
        right: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {line: 1, column: 13},
            end: {line: 1, column: 14}
          }
        },
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 14}
        }
      },
      generator: false,
      expression: true,
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 14}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 14}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 14}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("eval => 42", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "Identifier",
        name: "eval",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 4}
        }
      }],
      body: {
        type: "Literal",
        value: 42,
        raw: "42",
        loc: {
          start: {line: 1, column: 8},
          end: {line: 1, column: 10}
        }
      },
      generator: false,
      expression: true,
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 10}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 10}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 10}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("arguments => 42", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "Identifier",
        name: "arguments",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 9}
        }
      }],
      body: {
        type: "Literal",
        value: 42,
        raw: "42",
        loc: {
          start: {line: 1, column: 13},
          end: {line: 1, column: 15}
        }
      },
      generator: false,
      expression: true,
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 15}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 15}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 15}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(a) => 00", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "Identifier",
        name: "a",
        loc: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 2}
        }
      }],
      body: {
        type: "Literal",
        value: 0,
        raw: "00",
        loc: {
          start: {line: 1, column: 7},
          end: {line: 1, column: 9}
        }
      },
      generator: false,
      expression: true,
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 9}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 9}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 9}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(eval, a) => 42", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [
        {
          type: "Identifier",
          name: "eval",
          loc: {
            start: {line: 1, column: 1},
            end: {line: 1, column: 5}
          }
        },
        {
          type: "Identifier",
          name: "a",
          loc: {
            start: {line: 1, column: 7},
            end: {line: 1, column: 8}
          }
        }
      ],
      body: {
        type: "Literal",
        value: 42,
        raw: "42",
        loc: {
          start: {line: 1, column: 13},
          end: {line: 1, column: 15}
        }
      },
      generator: false,
      expression: true,
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 15}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 15}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 15}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(eval = 10) => 42", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "AssignmentPattern",
        left: {
          type: "Identifier",
          name: "eval",
          loc: {
            start: {line: 1, column: 1},
            end: {line: 1, column: 5}
          }
        },
        right: {
          type: "Literal",
          value: 10,
          raw: "10",
          loc: {
            start: {line: 1, column: 8},
            end: {line: 1, column: 10}
          }
        },
        loc: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 10}
        }
      }],
      body: {
        type: "Literal",
        value: 42,
        raw: "42",
        loc: {
          start: {line: 1, column: 15},
          end: {line: 1, column: 17}
        }
      },
      generator: false,
      expression: true,
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 17}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 17}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 17}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(eval, a = 10) => 42", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [
        {
          type: "Identifier",
          name: "eval",
          loc: {
            start: {line: 1, column: 1},
            end: {line: 1, column: 5}
          }
        },
        {
          type: "AssignmentPattern",
          left: {
            type: "Identifier",
            name: "a",
            loc: {
              start: {line: 1, column: 7},
              end: {line: 1, column: 8}
            }
          },
          right: {
            type: "Literal",
            value: 10,
            raw: "10",
            loc: {
              start: {line: 1, column: 11},
              end: {line: 1, column: 13}
            }
          },
          loc: {
            start: {line: 1, column: 7},
            end: {line: 1, column: 13}
          }
        }
      ],
      body: {
        type: "Literal",
        value: 42,
        raw: "42",
        loc: {
          start: {line: 1, column: 18},
          end: {line: 1, column: 20}
        }
      },
      generator: false,
      expression: true,
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 20}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 20}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 20}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(x => x)", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "Identifier",
        name: "x",
        loc: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 2}
        }
      }],
      body: {
        type: "Identifier",
        name: "x",
        loc: {
          start: {line: 1, column: 6},
          end: {line: 1, column: 7}
        }
      },
      generator: false,
      expression: true,
      loc: {
        start: {line: 1, column: 1},
        end: {line: 1, column: 7}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 8}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 8}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("x => y => 42", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "Identifier",
        name: "x",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      }],
      body: {
        type: "ArrowFunctionExpression",
        id: null,
        params: [{
          type: "Identifier",
          name: "y",
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 6}
          }
        }],
        body: {
          type: "Literal",
          value: 42,
          raw: "42",
          loc: {
            start: {line: 1, column: 10},
            end: {line: 1, column: 12}
          }
        },
        generator: false,
        expression: true,
        loc: {
          start: {line: 1, column: 5},
          end: {line: 1, column: 12}
        }
      },
      generator: false,
      expression: true,
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 12}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 12}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 12}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(x) => ((y, z) => (x, y, z))", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "Identifier",
        name: "x",
        loc: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 2}
        }
      }],
      body: {
        type: "ArrowFunctionExpression",
        id: null,
        params: [
          {
            type: "Identifier",
            name: "y",
            loc: {
              start: {line: 1, column: 9},
              end: {line: 1, column: 10}
            }
          },
          {
            type: "Identifier",
            name: "z",
            loc: {
              start: {line: 1, column: 12},
              end: {line: 1, column: 13}
            }
          }
        ],
        body: {
          type: "SequenceExpression",
          expressions: [
            {
              type: "Identifier",
              name: "x",
              loc: {
                start: {line: 1, column: 19},
                end: {line: 1, column: 20}
              }
            },
            {
              type: "Identifier",
              name: "y",
              loc: {
                start: {line: 1, column: 22},
                end: {line: 1, column: 23}
              }
            },
            {
              type: "Identifier",
              name: "z",
              loc: {
                start: {line: 1, column: 25},
                end: {line: 1, column: 26}
              }
            }
          ],
          loc: {
            start: {line: 1, column: 19},
            end: {line: 1, column: 26}
          }
        },
        generator: false,
        expression: true,
        loc: {
          start: {line: 1, column: 8},
          end: {line: 1, column: 27}
        }
      },
      generator: false,
      expression: true,
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 28}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 28}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 28}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("foo(() => {})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "CallExpression",
      callee: {
        type: "Identifier",
        name: "foo",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 3}
        }
      },
      arguments: [{
        type: "ArrowFunctionExpression",
        id: null,
        params: [],
        body: {
          type: "BlockStatement",
          body: [],
          loc: {
            start: {line: 1, column: 10},
            end: {line: 1, column: 12}
          }
        },
        generator: false,
        expression: false,
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 12}
        }
      }],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 13}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 13}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 13}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("foo((x, y) => {})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "CallExpression",
      callee: {
        type: "Identifier",
        name: "foo",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 3}
        }
      },
      arguments: [{
        type: "ArrowFunctionExpression",
        id: null,
        params: [
          {
            type: "Identifier",
            name: "x",
            loc: {
              start: {line: 1, column: 5},
              end: {line: 1, column: 6}
            }
          },
          {
            type: "Identifier",
            name: "y",
            loc: {
              start: {line: 1, column: 8},
              end: {line: 1, column: 9}
            }
          }
        ],
        body: {
          type: "BlockStatement",
          body: [],
          loc: {
            start: {line: 1, column: 14},
            end: {line: 1, column: 16}
          }
        },
        generator: false,
        expression: false,
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 16}
        }
      }],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 17}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 17}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 17}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// ES6: Method Definition

test("x = { method() { } }", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "Identifier",
        name: "x",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      },
      right: {
        type: "ObjectExpression",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "method",
            loc: {
              start: {line: 1, column: 6},
              end: {line: 1, column: 12}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            body: {
              type: "BlockStatement",
              body: [],
              loc: {
                start: {line: 1, column: 15},
                end: {line: 1, column: 18}
              }
            },
            generator: false,
            expression: false,
            loc: {
              start: {line: 1, column: 12},
              end: {line: 1, column: 18}
            }
          },
          kind: "init",
          method: true,
          shorthand: false,
          computed: false,
          loc: {
            start: {line: 1, column: 6},
            end: {line: 1, column: 18}
          }
        }],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 20}
        }
      },
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 20}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 20}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 20}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("x = { method(test) { } }", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "Identifier",
        name: "x",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      },
      right: {
        type: "ObjectExpression",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "method",
            loc: {
              start: {line: 1, column: 6},
              end: {line: 1, column: 12}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [{
              type: "Identifier",
              name: "test",
              loc: {
                start: {line: 1, column: 13},
                end: {line: 1, column: 17}
              }
            }],
            body: {
              type: "BlockStatement",
              body: [],
              loc: {
                start: {line: 1, column: 19},
                end: {line: 1, column: 22}
              }
            },
            generator: false,
            expression: false,
            loc: {
              start: {line: 1, column: 12},
              end: {line: 1, column: 22}
            }
          },
          kind: "init",
          method: true,
          shorthand: false,
          computed: false,
          loc: {
            start: {line: 1, column: 6},
            end: {line: 1, column: 22}
          }
        }],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 24}
        }
      },
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 24}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 24}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 24}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("x = { 'method'() { } }", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "Identifier",
        name: "x",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      },
      right: {
        type: "ObjectExpression",
        properties: [{
          type: "Property",
          key: {
            type: "Literal",
            value: "method",
            raw: "'method'",
            loc: {
              start: {line: 1, column: 6},
              end: {line: 1, column: 14}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            body: {
              type: "BlockStatement",
              body: [],
              loc: {
                start: {line: 1, column: 17},
                end: {line: 1, column: 20}
              }
            },
            generator: false,
            expression: false,
            loc: {
              start: {line: 1, column: 14},
              end: {line: 1, column: 20}
            }
          },
          kind: "init",
          method: true,
          shorthand: false,
          computed: false,
          loc: {
            start: {line: 1, column: 6},
            end: {line: 1, column: 20}
          }
        }],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 22}
        }
      },
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 22}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 22}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 22}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("x = { get() { } }", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "Identifier",
        name: "x",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      },
      right: {
        type: "ObjectExpression",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "get",
            loc: {
              start: {line: 1, column: 6},
              end: {line: 1, column: 9}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            body: {
              type: "BlockStatement",
              body: [],
              loc: {
                start: {line: 1, column: 12},
                end: {line: 1, column: 15}
              }
            },
            generator: false,
            expression: false,
            loc: {
              start: {line: 1, column: 9},
              end: {line: 1, column: 15}
            }
          },
          kind: "init",
          method: true,
          shorthand: false,
          computed: false,
          loc: {
            start: {line: 1, column: 6},
            end: {line: 1, column: 15}
          }
        }],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 17}
        }
      },
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 17}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 17}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 17}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("x = { set() { } }", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "Identifier",
        name: "x",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      },
      right: {
        type: "ObjectExpression",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "set",
            loc: {
              start: {line: 1, column: 6},
              end: {line: 1, column: 9}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            body: {
              type: "BlockStatement",
              body: [],
              loc: {
                start: {line: 1, column: 12},
                end: {line: 1, column: 15}
              }
            },
            generator: false,
            expression: false,
            loc: {
              start: {line: 1, column: 9},
              end: {line: 1, column: 15}
            }
          },
          kind: "init",
          method: true,
          shorthand: false,
          computed: false,
          loc: {
            start: {line: 1, column: 6},
            end: {line: 1, column: 15}
          }
        }],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 17}
        }
      },
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 17}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 17}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 17}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// Harmony: Object Literal Property Value Shorthand

test("x = { y, z }", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "Identifier",
        name: "x",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      },
      right: {
        type: "ObjectExpression",
        properties: [
          {
            type: "Property",
            key: {
              type: "Identifier",
              name: "y",
              loc: {
                start: {line: 1, column: 6},
                end: {line: 1, column: 7}
              }
            },
            value: {
              type: "Identifier",
              name: "y",
              loc: {
                start: {line: 1, column: 6},
                end: {line: 1, column: 7}
              }
            },
            kind: "init",
            method: false,
            shorthand: true,
            computed: false,
            loc: {
              start: {line: 1, column: 6},
              end: {line: 1, column: 7}
            }
          },
          {
            type: "Property",
            key: {
              type: "Identifier",
              name: "z",
              loc: {
                start: {line: 1, column: 9},
                end: {line: 1, column: 10}
              }
            },
            value: {
              type: "Identifier",
              name: "z",
              loc: {
                start: {line: 1, column: 9},
                end: {line: 1, column: 10}
              }
            },
            kind: "init",
            method: false,
            shorthand: true,
            computed: false,
            loc: {
              start: {line: 1, column: 9},
              end: {line: 1, column: 10}
            }
          }
        ],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 12}
        }
      },
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 12}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 12}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 12}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// Harmony: Destructuring

test("[a, b] = [b, a]", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "ArrayPattern",
        elements: [
          {
            type: "Identifier",
            name: "a",
            loc: {
              start: {line: 1, column: 1},
              end: {line: 1, column: 2}
            }
          },
          {
            type: "Identifier",
            name: "b",
            loc: {
              start: {line: 1, column: 4},
              end: {line: 1, column: 5}
            }
          }
        ],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 6}
        }
      },
      right: {
        type: "ArrayExpression",
        elements: [
          {
            type: "Identifier",
            name: "b",
            loc: {
              start: {line: 1, column: 10},
              end: {line: 1, column: 11}
            }
          },
          {
            type: "Identifier",
            name: "a",
            loc: {
              start: {line: 1, column: 13},
              end: {line: 1, column: 14}
            }
          }
        ],
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 15}
        }
      },
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 15}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 15}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 15}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({ responseText: text }) = res", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "ObjectPattern",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "responseText",
            loc: {
              start: {line: 1, column: 3},
              end: {line: 1, column: 15}
            }
          },
          value: {
            type: "Identifier",
            name: "text",
            loc: {
              start: {line: 1, column: 17},
              end: {line: 1, column: 21}
            }
          },
          kind: "init",
          method: false,
          shorthand: false,
          computed: false,
          loc: {
            start: {line: 1, column: 3},
            end: {line: 1, column: 21}
          }
        }],
        loc: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 23}
        }
      },
      right: {
        type: "Identifier",
        name: "res",
        loc: {
          start: {line: 1, column: 27},
          end: {line: 1, column: 30}
        }
      },
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 30}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 30}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 30}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("const {a} = {}", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "ObjectPattern",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "a",
            loc: {
              start: {line: 1, column: 7},
              end: {line: 1, column: 8}
            }
          },
          value: {
            type: "Identifier",
            name: "a",
            loc: {
              start: {line: 1, column: 7},
              end: {line: 1, column: 8}
            }
          },
          kind: "init",
          method: false,
          shorthand: true,
          computed: false,
          loc: {
            start: {line: 1, column: 7},
            end: {line: 1, column: 8}
          }
        }],
        loc: {
          start: {line: 1, column: 6},
          end: {line: 1, column: 9}
        }
      },
      init: {
        type: "ObjectExpression",
        properties: [],
        loc: {
          start: {line: 1, column: 12},
          end: {line: 1, column: 14}
        }
      },
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 14}
      }
    }],
    kind: "const",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 14}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 14}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("const [a] = []", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "ArrayPattern",
        elements: [{
          type: "Identifier",
          name: "a",
          loc: {
            start: {line: 1, column: 7},
            end: {line: 1, column: 8}
          }
        }],
        loc: {
          start: {line: 1, column: 6},
          end: {line: 1, column: 9}
        }
      },
      init: {
        type: "ArrayExpression",
        elements: [],
        loc: {
          start: {line: 1, column: 12},
          end: {line: 1, column: 14}
        }
      },
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 14}
      }
    }],
    kind: "const",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 14}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 14}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("let {a} = {}", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "ObjectPattern",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "a",
            loc: {
              start: {line: 1, column: 5},
              end: {line: 1, column: 6}
            }
          },
          value: {
            type: "Identifier",
            name: "a",
            loc: {
              start: {line: 1, column: 5},
              end: {line: 1, column: 6}
            }
          },
          kind: "init",
          method: false,
          shorthand: true,
          computed: false,
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 6}
          }
        }],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 7}
        }
      },
      init: {
        type: "ObjectExpression",
        properties: [],
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 12}
        }
      },
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 12}
      }
    }],
    kind: "let",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 12}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 12}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("let [a] = []", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "ArrayPattern",
        elements: [{
          type: "Identifier",
          name: "a",
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 6}
          }
        }],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 7}
        }
      },
      init: {
        type: "ArrayExpression",
        elements: [],
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 12}
        }
      },
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 12}
      }
    }],
    kind: "let",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 12}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 12}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var {a} = {}", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "ObjectPattern",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "a",
            loc: {
              start: {line: 1, column: 5},
              end: {line: 1, column: 6}
            }
          },
          value: {
            type: "Identifier",
            name: "a",
            loc: {
              start: {line: 1, column: 5},
              end: {line: 1, column: 6}
            }
          },
          kind: "init",
          method: false,
          shorthand: true,
          computed: false,
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 6}
          }
        }],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 7}
        }
      },
      init: {
        type: "ObjectExpression",
        properties: [],
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 12}
        }
      },
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 12}
      }
    }],
    kind: "var",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 12}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 12}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var [a] = []", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "ArrayPattern",
        elements: [{
          type: "Identifier",
          name: "a",
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 6}
          }
        }],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 7}
        }
      },
      init: {
        type: "ArrayExpression",
        elements: [],
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 12}
        }
      },
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 12}
      }
    }],
    kind: "var",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 12}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 12}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("const {a:b} = {}", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "ObjectPattern",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "a",
            loc: {
              start: {line: 1, column: 7},
              end: {line: 1, column: 8}
            }
          },
          value: {
            type: "Identifier",
            name: "b",
            loc: {
              start: {line: 1, column: 9},
              end: {line: 1, column: 10}
            }
          },
          kind: "init",
          method: false,
          shorthand: false,
          computed: false,
          loc: {
            start: {line: 1, column: 7},
            end: {line: 1, column: 10}
          }
        }],
        loc: {
          start: {line: 1, column: 6},
          end: {line: 1, column: 11}
        }
      },
      init: {
        type: "ObjectExpression",
        properties: [],
        loc: {
          start: {line: 1, column: 14},
          end: {line: 1, column: 16}
        }
      },
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 16}
      }
    }],
    kind: "const",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 16}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 16}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("let {a:b} = {}", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "ObjectPattern",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "a",
            loc: {
              start: {line: 1, column: 5},
              end: {line: 1, column: 6}
            }
          },
          value: {
            type: "Identifier",
            name: "b",
            loc: {
              start: {line: 1, column: 7},
              end: {line: 1, column: 8}
            }
          },
          kind: "init",
          method: false,
          shorthand: false,
          computed: false,
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 8}
          }
        }],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 9}
        }
      },
      init: {
        type: "ObjectExpression",
        properties: [],
        loc: {
          start: {line: 1, column: 12},
          end: {line: 1, column: 14}
        }
      },
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 14}
      }
    }],
    kind: "let",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 14}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 14}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var {a:b} = {}", {
  type: "Program",
  sourceType: "script",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "ObjectPattern",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "a",
            loc: {
              start: {line: 1, column: 5},
              end: {line: 1, column: 6}
            }
          },
          value: {
            type: "Identifier",
            name: "b",
            loc: {
              start: {line: 1, column: 7},
              end: {line: 1, column: 8}
            }
          },
          kind: "init",
          method: false,
          shorthand: false,
          computed: false,
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 8}
          }
        }],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 9}
        }
      },
      init: {
        type: "ObjectExpression",
        properties: [],
        loc: {
          start: {line: 1, column: 12},
          end: {line: 1, column: 14}
        }
      },
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 14}
      }
    }],
    kind: "var",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 14}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 14}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// Harmony: Modules

test("export var document", {
  type: "Program",
  sourceType: "module",
  body: [{
    type: "ExportNamedDeclaration",
    declaration: {
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "document",
          loc: {
            start: {line: 1, column: 11},
            end: {line: 1, column: 19}
          }
        },
        init: null,
        loc: {
          start: {line: 1, column: 11},
          end: {line: 1, column: 19}
        }
      }],
      kind: "var",
      loc: {
        start: {line: 1, column: 7},
        end: {line: 1, column: 19}
      }
    },
    specifiers: [],
    source: null,
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 19}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 19}
  }
}, {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("export var document = { }", {
  type: "Program",
  body: [{
    type: "ExportNamedDeclaration",
    declaration: {
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "document",
          loc: {
            start: {line: 1, column: 11},
            end: {line: 1, column: 19}
          }
        },
        init: {
          type: "ObjectExpression",
          properties: [],
          loc: {
            start: {line: 1, column: 22},
            end: {line: 1, column: 25}
          }
        },
        loc: {
          start: {line: 1, column: 11},
          end: {line: 1, column: 25}
        }
      }],
      kind: "var",
      loc: {
        start: {line: 1, column: 7},
        end: {line: 1, column: 25}
      }
    },
    specifiers: [],
    source: null,
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 25}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 25}
  }
}, {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

testFail("export var await", "The keyword 'await' is reserved (1:11)", { ecmaVersion: 6, sourceType: "module" })

test("export let document", {
  type: "Program",
  body: [{
    type: "ExportNamedDeclaration",
    declaration: {
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "document",
          loc: {
            start: {line: 1, column: 11},
            end: {line: 1, column: 19}
          }
        },
        init: null,
        loc: {
          start: {line: 1, column: 11},
          end: {line: 1, column: 19}
        }
      }],
      kind: "let",
      loc: {
        start: {line: 1, column: 7},
        end: {line: 1, column: 19}
      }
    },
    specifiers: [],
    source: null,
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 19}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 19}
  }
}, {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("export let document = { }", {
  type: "Program",
  body: [{
    type: "ExportNamedDeclaration",
    declaration: {
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "document",
          loc: {
            start: {line: 1, column: 11},
            end: {line: 1, column: 19}
          }
        },
        init: {
          type: "ObjectExpression",
          properties: [],
          loc: {
            start: {line: 1, column: 22},
            end: {line: 1, column: 25}
          }
        },
        loc: {
          start: {line: 1, column: 11},
          end: {line: 1, column: 25}
        }
      }],
      kind: "let",
      loc: {
        start: {line: 1, column: 7},
        end: {line: 1, column: 25}
      }
    },
    specifiers: [],
    source: null,
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 25}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 25}
  }
}, {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("export const document = { }", {
  type: "Program",
  body: [{
    type: "ExportNamedDeclaration",
    declaration: {
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "document",
          loc: {
            start: {line: 1, column: 13},
            end: {line: 1, column: 21}
          }
        },
        init: {
          type: "ObjectExpression",
          properties: [],
          loc: {
            start: {line: 1, column: 24},
            end: {line: 1, column: 27}
          }
        },
        loc: {
          start: {line: 1, column: 13},
          end: {line: 1, column: 27}
        }
      }],
      kind: "const",
      loc: {
        start: {line: 1, column: 7},
        end: {line: 1, column: 27}
      }
    },
    specifiers: [],
    source: null,
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 27}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 27}
  }
}, {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("export function parse() { }", {
  type: "Program",
  body: [{
    type: "ExportNamedDeclaration",
    declaration: {
      type: "FunctionDeclaration",
      id: {
        type: "Identifier",
        name: "parse",
        loc: {
          start: {line: 1, column: 16},
          end: {line: 1, column: 21}
        }
      },
      params: [],
      body: {
        type: "BlockStatement",
        body: [],
        loc: {
          start: {line: 1, column: 24},
          end: {line: 1, column: 27}
        }
      },
      generator: false,
      expression: false,
      loc: {
        start: {line: 1, column: 7},
        end: {line: 1, column: 27}
      }
    },
    specifiers: [],
    source: null,
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 27}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 27}
  }
}, {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("export class Class {}", {
  type: "Program",
  body: [{
    type: "ExportNamedDeclaration",
    declaration: {
      type: "ClassDeclaration",
      id: {
        type: "Identifier",
        name: "Class",
        loc: {
          start: {line: 1, column: 13},
          end: {line: 1, column: 18}
        }
      },
      superClass: null,
      body: {
        type: "ClassBody",
        body: [],
        loc: {
          start: {line: 1, column: 19},
          end: {line: 1, column: 21}
        }
      },
      loc: {
        start: {line: 1, column: 7},
        end: {line: 1, column: 21}
      }
    },
    specifiers: [],
    source: null,
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 21}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 21}
  }
}, {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("export default 42", {
  type: "Program",
  body: [{
    type: "ExportDefaultDeclaration",
    declaration: {
      type: "Literal",
      value: 42,
      raw: "42",
      loc: {
        start: {line: 1, column: 15},
        end: {line: 1, column: 17}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 17}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 17}
  }
}, {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("export default function () {}", {
  type: "Program",
  range: [0, 29],
  body: [{
    type: "ExportDefaultDeclaration",
    range: [0, 29],
    declaration: {
      type: "FunctionExpression",
      range: [15, 29],
      id: null,
      generator: false,
      expression: false,
      params: [],
      body: {
        type: "BlockStatement",
        range: [27, 29],
        body: []
      }
    }
  }]
}, {ecmaVersion: 6, sourceType: "module", ranges: true});

test("export default function f() {}", {
  type: "Program",
  range: [0, 30],
  body: [{
    type: "ExportDefaultDeclaration",
    range: [0, 30],
    declaration: {
      type: "FunctionDeclaration",
      range: [15, 30],
      id: {
        type: "Identifier",
        range: [24, 25],
        name: "f"
      },
      generator: false,
      expression: false,
      params: [],
      body: {
        type: "BlockStatement",
        range: [28, 30],
        body: []
      }
    }
  }]
}, {ecmaVersion: 6, sourceType: "module", ranges: true});

test("export default class {}", {
  type: "Program",
  range: [0, 23],
  body: [{
    type: "ExportDefaultDeclaration",
    range: [0, 23],
    declaration: {
      type: "ClassExpression",
      range: [15, 23],
      id: null,
      superClass: null,
      body: {
        type: "ClassBody",
        range: [21, 23],
        body: []
      }
    }
  }]
}, {ecmaVersion: 6, sourceType: "module", ranges: true});

test("export default class A {}", {
  type: "Program",
  range: [0, 25],
  body: [{
    type: "ExportDefaultDeclaration",
    range: [0, 25],
    declaration: {
      type: "ClassDeclaration",
      range: [15, 25],
      id: {
        type: "Identifier",
        range: [21, 22],
        name: "A"
      },
      superClass: null,
      body: {
        type: "ClassBody",
        range: [23, 25],
        body: []
      }
    }
  }]
}, {ecmaVersion: 6, sourceType: "module", ranges: true});

test("export default (class{});", {
  "type": "Program",
  "body": [
    {
      "type": "ExportDefaultDeclaration",
      "declaration": {
        "type": "ClassExpression",
        "id": null,
        "superClass": null,
        "body": {
          "type": "ClassBody",
          "body": []
        }
      }
    }
  ]
}, {ecmaVersion: 6, sourceType: "module"})

testFail("export *", "Unexpected token (1:8)", {ecmaVersion: 6, sourceType: "module"});

test("export * from \"crypto\"", {
  type: "Program",
  body: [{
    type: "ExportAllDeclaration",
    source: {
      type: "Literal",
      value: "crypto",
      raw: "\"crypto\"",
      loc: {
        start: {line: 1, column: 14},
        end: {line: 1, column: 22}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 22}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 22}
  }
}, {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("export { encrypt }", {
  type: "Program",
  body: [{
    type: "ExportNamedDeclaration",
    declaration: null,
    specifiers: [{
      type: "ExportSpecifier",
      exported: {
        type: "Identifier",
        name: "encrypt",
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 16}
        }
      },
      local: {
        type: "Identifier",
        name: "encrypt",
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 16}
        }
      },
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 16}
      }
    }],
    source: null,
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 18}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 18}
  }
}, {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("export { encrypt, decrypt }", {
  type: "Program",
  body: [{
    type: "ExportNamedDeclaration",
    declaration: null,
    specifiers: [
      {
        type: "ExportSpecifier",
        exported: {
          type: "Identifier",
          name: "encrypt",
          loc: {
            start: {line: 1, column: 9},
            end: {line: 1, column: 16}
          }
        },
        local: {
          type: "Identifier",
          name: "encrypt",
          loc: {
            start: {line: 1, column: 9},
            end: {line: 1, column: 16}
          }
        },
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 16}
        }
      },
      {
        type: "ExportSpecifier",
        exported: {
          type: "Identifier",
          name: "decrypt",
          loc: {
            start: {line: 1, column: 18},
            end: {line: 1, column: 25}
          }
        },
        local: {
          type: "Identifier",
          name: "decrypt",
          loc: {
            start: {line: 1, column: 18},
            end: {line: 1, column: 25}
          }
        },
        loc: {
          start: {line: 1, column: 18},
          end: {line: 1, column: 25}
        }
      }
    ],
    source: null,
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 27}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 27}
  }
}, {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("export { encrypt as default }", {
  type: "Program",
  body: [{
    type: "ExportNamedDeclaration",
    declaration: null,
    specifiers: [{
      type: "ExportSpecifier",
      exported: {
        type: "Identifier",
        name: "default",
        loc: {
          start: {line: 1, column: 20},
          end: {line: 1, column: 27}
        }
      },
      local: {
        type: "Identifier",
        name: "encrypt",
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 16}
        }
      },
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 27}
      }
    }],
    source: null,
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 29}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 29}
  }
}, {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("export { encrypt, decrypt as dec }", {
  type: "Program",
  body: [{
    type: "ExportNamedDeclaration",
    declaration: null,
    specifiers: [
      {
        type: "ExportSpecifier",
        exported: {
          type: "Identifier",
          name: "encrypt",
          loc: {
            start: {line: 1, column: 9},
            end: {line: 1, column: 16}
          }
        },
        local: {
          type: "Identifier",
          name: "encrypt",
          loc: {
            start: {line: 1, column: 9},
            end: {line: 1, column: 16}
          }
        },
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 16}
        }
      },
      {
        type: "ExportSpecifier",
        exported: {
          type: "Identifier",
          name: "dec",
          loc: {
            start: {line: 1, column: 29},
            end: {line: 1, column: 32}
          }
        },
        local: {
          type: "Identifier",
          name: "decrypt",
          loc: {
            start: {line: 1, column: 18},
            end: {line: 1, column: 25}
          }
        },
        loc: {
          start: {line: 1, column: 18},
          end: {line: 1, column: 32}
        }
      }
    ],
    source: null,
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 34}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 34}
  }
}, {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("export { default } from \"other\"", {
  type: "Program",
  body: [{
    type: "ExportNamedDeclaration",
    declaration: null,
    specifiers: [
      {
        type: "ExportSpecifier",
        exported: {
          type: "Identifier",
          name: "default",
          loc: {
            start: {line: 1, column: 9},
            end: {line: 1, column: 16}
          }
        },
        local: {
          type: "Identifier",
          name: "default",
          loc: {
            start: {line: 1, column: 9},
            end: {line: 1, column: 16}
          }
        },
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 16}
        }
      }
    ],
    source: {
      type: "Literal",
      loc: {
        start: {
          line: 1,
          column: 24
        },
        end: {
          line: 1,
          column: 31
        }
      },
      value: "other",
      raw: "\"other\""
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 31}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 31}
  }
}, {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

testFail("export { default }", "Unexpected token (1:9)", {ecmaVersion: 6, sourceType: "module" });
testFail("export { if }", "Unexpected token (1:9)", {ecmaVersion: 6, sourceType: "module" });
testFail("export { if } from 'foo'", "Unexpected token (1:9)", {ecmaVersion: 6, sourceType: "module" });
testFail("export { default as foo }", "Unexpected token (1:9)", {ecmaVersion: 6, sourceType: "module" });
testFail("export { if as foo }", "Unexpected token (1:9)", {ecmaVersion: 6, sourceType: "module" });

test("import \"jquery\"", {
  type: "Program",
  body: [{
    type: "ImportDeclaration",
    specifiers: [],
    source: {
      type: "Literal",
      value: "jquery",
      raw: "\"jquery\"",
      loc: {
        start: {line: 1, column: 7},
        end: {line: 1, column: 15}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 15}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 15}
  }
}, {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("import $ from \"jquery\"", {
  type: "Program",
  body: [{
    type: "ImportDeclaration",
    specifiers: [{
      type: "ImportDefaultSpecifier",
      local: {
        type: "Identifier",
        name: "$",
        loc: {
          start: {line: 1, column: 7},
          end: {line: 1, column: 8}
        }
      },
      loc: {
        start: {line: 1, column: 7},
        end: {line: 1, column: 8}
      }
    }],
    source: {
      type: "Literal",
      value: "jquery",
      raw: "\"jquery\"",
      loc: {
        start: {line: 1, column: 14},
        end: {line: 1, column: 22}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 22}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 22}
  }
}, {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("import { encrypt, decrypt } from \"crypto\"", {
  type: "Program",
  body: [{
    type: "ImportDeclaration",
    specifiers: [
      {
        type: "ImportSpecifier",
        imported: {
          type: "Identifier",
          name: "encrypt",
          loc: {
            start: {line: 1, column: 9},
            end: {line: 1, column: 16}
          }
        },
        local: {
          type: "Identifier",
          name: "encrypt",
          loc: {
            start: {line: 1, column: 9},
            end: {line: 1, column: 16}
          }
        },
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 16}
        }
      },
      {
        type: "ImportSpecifier",
        imported: {
          type: "Identifier",
          name: "decrypt",
          loc: {
            start: {line: 1, column: 18},
            end: {line: 1, column: 25}
          }
        },
        local: {
          type: "Identifier",
          name: "decrypt",
          loc: {
            start: {line: 1, column: 18},
            end: {line: 1, column: 25}
          }
        },
        loc: {
          start: {line: 1, column: 18},
          end: {line: 1, column: 25}
        }
      }
    ],
    source: {
      type: "Literal",
      value: "crypto",
      raw: "\"crypto\"",
      loc: {
        start: {line: 1, column: 33},
        end: {line: 1, column: 41}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 41}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 41}
  }
}, {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("import { encrypt as enc } from \"crypto\"", {
  type: "Program",
  body: [{
    type: "ImportDeclaration",
    specifiers: [{
      type: "ImportSpecifier",
      imported: {
        type: "Identifier",
        name: "encrypt",
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 16}
        }
      },
      local: {
        type: "Identifier",
        name: "enc",
        loc: {
          start: {line: 1, column: 20},
          end: {line: 1, column: 23}
        }
      },
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 23}
      }
    }],
    source: {
      type: "Literal",
      value: "crypto",
      raw: "\"crypto\"",
      loc: {
        start: {line: 1, column: 31},
        end: {line: 1, column: 39}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 39}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 39}
  }
}, {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("import crypto, { decrypt, encrypt as enc } from \"crypto\"", {
  type: "Program",
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 56}
  },
  body: [{
    type: "ImportDeclaration",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 56}
    },
    specifiers: [
      {
        type: "ImportDefaultSpecifier",
        loc: {
          start: {line: 1, column: 7},
          end: {line: 1, column: 13}
        },
        local: {
          type: "Identifier",
          loc: {
            start: {line: 1, column: 7},
            end: {line: 1, column: 13}
          },
          name: "crypto"
        }
      },
      {
        type: "ImportSpecifier",
        loc: {
          start: {line: 1, column: 17},
          end: {line: 1, column: 24}
        },
        imported: {
          type: "Identifier",
          loc: {
            start: {line: 1, column: 17},
            end: {line: 1, column: 24}
          },
          name: "decrypt"
        },
        local: {
          type: "Identifier",
          loc: {
            start: {line: 1, column: 17},
            end: {line: 1, column: 24}
          },
          name: "decrypt"
        }
      },
      {
        type: "ImportSpecifier",
        loc: {
          start: {line: 1, column: 26},
          end: {line: 1, column: 40}
        },
        imported: {
          type: "Identifier",
          loc: {
            start: {line: 1, column: 26},
            end: {line: 1, column: 33}
          },
          name: "encrypt"
        },
        local: {
          type: "Identifier",
          loc: {
            start: {line: 1, column: 37},
            end: {line: 1, column: 40}
          },
          name: "enc"
        }
      }
    ],
    source: {
      type: "Literal",
      loc: {
        start: {line: 1, column: 48},
        end: {line: 1, column: 56}
      },
      value: "crypto",
      raw: "\"crypto\""
    }
  }]
}, {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

testFail("import default from \"foo\"", "Unexpected token (1:7)", {ecmaVersion: 6, sourceType: "module"});

test("import { null as nil } from \"bar\"", {
  type: "Program",
  body: [{
    type: "ImportDeclaration",
    specifiers: [{
      type: "ImportSpecifier",
      imported: {
        type: "Identifier",
        name: "null",
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 13}
        }
      },
      local: {
        type: "Identifier",
        name: "nil",
        loc: {
          start: {line: 1, column: 17},
          end: {line: 1, column: 20}
        }
      },
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 20}
      }
    }],
    source: {
      type: "Literal",
      value: "bar",
      raw: "\"bar\"",
      loc: {
        start: {line: 1, column: 28},
        end: {line: 1, column: 33}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 33}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 33}
  }
}, {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("import * as crypto from \"crypto\"", {
  type: "Program",
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 32}
  },
  body: [{
    type: "ImportDeclaration",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 32}
    },
    specifiers: [{
      type: "ImportNamespaceSpecifier",
      loc: {
        start: {line: 1, column: 7},
        end: {line: 1, column: 18}
      },
      local: {
        type: "Identifier",
        loc: {
          start: {line: 1, column: 12},
          end: {line: 1, column: 18}
        },
        name: "crypto"
      }
    }],
    source: {
      type: "Literal",
      loc: {
        start: {line: 1, column: 24},
        end: {line: 1, column: 32}
      },
      value: "crypto",
      raw: "\"crypto\""
    }
  }]
}, {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

testFail("import { class } from 'foo'", "Unexpected token (1:9)", {ecmaVersion: 6, sourceType: "module" });
testFail("import { class, var } from 'foo'", "Unexpected token (1:9)", {ecmaVersion: 6, sourceType: "module" });
testFail("import { a as class } from 'foo'", "Unexpected token (1:14)", {ecmaVersion: 6, sourceType: "module" });
testFail("import * as class from 'foo'", "Unexpected token (1:12)", {ecmaVersion: 6, sourceType: "module" });
testFail("import { enum } from 'foo'", "The keyword 'enum' is reserved (1:9)", {ecmaVersion: 6, sourceType: "module" });
testFail("import { a as enum } from 'foo'", "The keyword 'enum' is reserved (1:14)", {ecmaVersion: 6, sourceType: "module" });
testFail("import * as enum from 'foo'", "The keyword 'enum' is reserved (1:12)", {ecmaVersion: 6, sourceType: "module" });

// Harmony: Yield Expression

test("(function* () { yield v })", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "FunctionExpression",
      id: null,
      params: [],
      body: {
        type: "BlockStatement",
        body: [{
          type: "ExpressionStatement",
          expression: {
            type: "YieldExpression",
            argument: {
              type: "Identifier",
              name: "v",
              loc: {
                start: {line: 1, column: 22},
                end: {line: 1, column: 23}
              }
            },
            delegate: false,
            loc: {
              start: {line: 1, column: 16},
              end: {line: 1, column: 23}
            }
          },
          loc: {
            start: {line: 1, column: 16},
            end: {line: 1, column: 23}
          }
        }],
        loc: {
          start: {line: 1, column: 14},
          end: {line: 1, column: 25}
        }
      },
      generator: true,
      expression: false,
      loc: {
        start: {line: 1, column: 1},
        end: {line: 1, column: 25}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 26}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 26}
  }
}, {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("(function* () { yield\nv })", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "FunctionExpression",
      id: null,
      params: [],
      body: {
        type: "BlockStatement",
        body: [
          {
            type: "ExpressionStatement",
            expression: {
              type: "YieldExpression",
              argument: null,
              delegate: false,
              loc: {
                start: {line: 1, column: 16},
                end: {line: 1, column: 21}
              }
            },
            loc: {
              start: {line: 1, column: 16},
              end: {line: 1, column: 21}
            }
          },
          {
            type: "ExpressionStatement",
            expression: {
              type: "Identifier",
              name: "v",
              loc: {
                start: {line: 2, column: 0},
                end: {line: 2, column: 1}
              }
            },
            loc: {
              start: {line: 2, column: 0},
              end: {line: 2, column: 1}
            }
          }
        ],
        loc: {
          start: {line: 1, column: 14},
          end: {line: 2, column: 3}
        }
      },
      generator: true,
      expression: false,
      loc: {
        start: {line: 1, column: 1},
        end: {line: 2, column: 3}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 2, column: 4}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 2, column: 4}
  }
}, {
  ecmaVersion: 6,
  sourceType: "module",
  ranges: true,
  locations: true
});

test("(function* () { yield *v })", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "FunctionExpression",
      id: null,
      params: [],
      body: {
        type: "BlockStatement",
        body: [{
          type: "ExpressionStatement",
          expression: {
            type: "YieldExpression",
            argument: {
              type: "Identifier",
              name: "v",
              loc: {
                start: {line: 1, column: 23},
                end: {line: 1, column: 24}
              }
            },
            delegate: true,
            loc: {
              start: {line: 1, column: 16},
              end: {line: 1, column: 24}
            }
          },
          loc: {
            start: {line: 1, column: 16},
            end: {line: 1, column: 24}
          }
        }],
        loc: {
          start: {line: 1, column: 14},
          end: {line: 1, column: 26}
        }
      },
      generator: true,
      expression: false,
      loc: {
        start: {line: 1, column: 1},
        end: {line: 1, column: 26}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 27}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 27}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function* test () { yield *v }", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "test",
      loc: {
        start: {line: 1, column: 10},
        end: {line: 1, column: 14}
      }
    },
    params: [],
    body: {
      type: "BlockStatement",
      body: [{
        type: "ExpressionStatement",
        expression: {
          type: "YieldExpression",
          argument: {
            type: "Identifier",
            name: "v",
            loc: {
              start: {line: 1, column: 27},
              end: {line: 1, column: 28}
            }
          },
          delegate: true,
          loc: {
            start: {line: 1, column: 20},
            end: {line: 1, column: 28}
          }
        },
        loc: {
          start: {line: 1, column: 20},
          end: {line: 1, column: 28}
        }
      }],
      loc: {
        start: {line: 1, column: 18},
        end: {line: 1, column: 30}
      }
    },
    generator: true,
    expression: false,
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 30}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 30}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var x = { *test () { yield *v } };", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "Identifier",
        name: "x",
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 5}
        }
      },
      init: {
        type: "ObjectExpression",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "test",
            loc: {
              start: {line: 1, column: 11},
              end: {line: 1, column: 15}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            body: {
              type: "BlockStatement",
              body: [{
                type: "ExpressionStatement",
                expression: {
                  type: "YieldExpression",
                  argument: {
                    type: "Identifier",
                    name: "v",
                    loc: {
                      start: {line: 1, column: 28},
                      end: {line: 1, column: 29}
                    }
                  },
                  delegate: true,
                  loc: {
                    start: {line: 1, column: 21},
                    end: {line: 1, column: 29}
                  }
                },
                loc: {
                  start: {line: 1, column: 21},
                  end: {line: 1, column: 29}
                }
              }],
              loc: {
                start: {line: 1, column: 19},
                end: {line: 1, column: 31}
              }
            },
            generator: true,
            expression: false,
            loc: {
              start: {line: 1, column: 16},
              end: {line: 1, column: 31}
            }
          },
          kind: "init",
          method: true,
          shorthand: false,
          computed: false,
          loc: {
            start: {line: 1, column: 10},
            end: {line: 1, column: 31}
          }
        }],
        loc: {
          start: {line: 1, column: 8},
          end: {line: 1, column: 33}
        }
      },
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 33}
      }
    }],
    kind: "var",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 34}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 34}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function* foo() { console.log(yield); }", {
  body: [
    {
      id: {
        name: "foo",
        type: "Identifier",
      },
      generator: true,
      expression: false,
      params: [],
      body: {
        body: [
          {
            expression: {
              callee: {
                object: {
                  name: "console",
                  type: "Identifier",
                },
                property: {
                  name: "log",
                  type: "Identifier",
                },
                computed: false,
                type: "MemberExpression",
              },
              arguments: [
                {
                  delegate: false,
                  argument: null,
                  type: "YieldExpression",
                }
              ],
              type: "CallExpression",
            },
            type: "ExpressionStatement",
          }
        ],
        type: "BlockStatement",
      },
      type: "FunctionDeclaration",
    }
  ],
  sourceType: "script",
  type: "Program"
}, {ecmaVersion: 6})

test("function* t() {}", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "t",
      loc: {
        start: {line: 1, column: 10},
        end: {line: 1, column: 11}
      }
    },
    params: [],
    body: {
      type: "BlockStatement",
      body: [],
      loc: {
        start: {line: 1, column: 14},
        end: {line: 1, column: 16}
      }
    },
    generator: true,
    expression: false,
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 16}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 16}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(function* () { yield yield 10 })", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "FunctionExpression",
      id: null,
      params: [],
      body: {
        type: "BlockStatement",
        body: [{
          type: "ExpressionStatement",
          expression: {
            type: "YieldExpression",
            argument: {
              type: "YieldExpression",
              argument: {
                type: "Literal",
                value: 10,
                raw: "10",
                loc: {
                  start: {line: 1, column: 28},
                  end: {line: 1, column: 30}
                }
              },
              delegate: false,
              loc: {
                start: {line: 1, column: 22},
                end: {line: 1, column: 30}
              }
            },
            delegate: false,
            loc: {
              start: {line: 1, column: 16},
              end: {line: 1, column: 30}
            }
          },
          loc: {
            start: {line: 1, column: 16},
            end: {line: 1, column: 30}
          }
        }],
        loc: {
          start: {line: 1, column: 14},
          end: {line: 1, column: 32}
        }
      },
      generator: true,
      expression: false,
      loc: {
        start: {line: 1, column: 1},
        end: {line: 1, column: 32}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 33}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 33}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

testFail("function *g() { (x = yield) => {} }", "Yield expression cannot be a default value (1:21)", { ecmaVersion: 6 })
testFail("function *g() { ({x = yield}) => {} }", "Yield expression cannot be a default value (1:22)", { ecmaVersion: 6 })

// Harmony: Iterators

test("for(x of list) process(x);", {
  type: "Program",
  body: [{
    type: "ForOfStatement",
    left: {
      type: "Identifier",
      name: "x",
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 5}
      }
    },
    right: {
      type: "Identifier",
      name: "list",
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 13}
      }
    },
    body: {
      type: "ExpressionStatement",
      expression: {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          name: "process",
          loc: {
            start: {line: 1, column: 15},
            end: {line: 1, column: 22}
          }
        },
        arguments: [{
          type: "Identifier",
          name: "x",
          loc: {
            start: {line: 1, column: 23},
            end: {line: 1, column: 24}
          }
        }],
        loc: {
          start: {line: 1, column: 15},
          end: {line: 1, column: 25}
        }
      },
      loc: {
        start: {line: 1, column: 15},
        end: {line: 1, column: 26}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 26}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 26}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("for (var x of list) process(x);", {
  type: "Program",
  body: [{
    type: "ForOfStatement",
    left: {
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {line: 1, column: 9},
            end: {line: 1, column: 10}
          }
        },
        init: null,
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 10}
        }
      }],
      kind: "var",
      loc: {
        start: {line: 1, column: 5},
        end: {line: 1, column: 10}
      }
    },
    right: {
      type: "Identifier",
      name: "list",
      loc: {
        start: {line: 1, column: 14},
        end: {line: 1, column: 18}
      }
    },
    body: {
      type: "ExpressionStatement",
      expression: {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          name: "process",
          loc: {
            start: {line: 1, column: 20},
            end: {line: 1, column: 27}
          }
        },
        arguments: [{
          type: "Identifier",
          name: "x",
          loc: {
            start: {line: 1, column: 28},
            end: {line: 1, column: 29}
          }
        }],
        loc: {
          start: {line: 1, column: 20},
          end: {line: 1, column: 30}
        }
      },
      loc: {
        start: {line: 1, column: 20},
        end: {line: 1, column: 31}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 31}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 31}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("for (var x = 42 of list) process(x);", {
  type: "Program",
  body: [{
    type: "ForOfStatement",
    left: {
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {line: 1, column: 9},
            end: {line: 1, column: 10}
          }
        },
        init: {
          type: "Literal",
          value: 42,
          raw: "42",
          loc: {
            start: {line: 1, column: 13},
            end: {line: 1, column: 15}
          }
        },
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 15}
        }
      }],
      kind: "var",
      loc: {
        start: {line: 1, column: 5},
        end: {line: 1, column: 15}
      }
    },
    right: {
      type: "Identifier",
      name: "list",
      loc: {
        start: {line: 1, column: 19},
        end: {line: 1, column: 23}
      }
    },
    body: {
      type: "ExpressionStatement",
      expression: {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          name: "process",
          loc: {
            start: {line: 1, column: 25},
            end: {line: 1, column: 32}
          }
        },
        arguments: [{
          type: "Identifier",
          name: "x",
          loc: {
            start: {line: 1, column: 33},
            end: {line: 1, column: 34}
          }
        }],
        loc: {
          start: {line: 1, column: 25},
          end: {line: 1, column: 35}
        }
      },
      loc: {
        start: {line: 1, column: 25},
        end: {line: 1, column: 36}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 36}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 36}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("for (let x of list) process(x);", {
  type: "Program",
  body: [{
    type: "ForOfStatement",
    left: {
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {line: 1, column: 9},
            end: {line: 1, column: 10}
          }
        },
        init: null,
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 10}
        }
      }],
      kind: "let",
      loc: {
        start: {line: 1, column: 5},
        end: {line: 1, column: 10}
      }
    },
    right: {
      type: "Identifier",
      name: "list",
      loc: {
        start: {line: 1, column: 14},
        end: {line: 1, column: 18}
      }
    },
    body: {
      type: "ExpressionStatement",
      expression: {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          name: "process",
          loc: {
            start: {line: 1, column: 20},
            end: {line: 1, column: 27}
          }
        },
        arguments: [{
          type: "Identifier",
          name: "x",
          loc: {
            start: {line: 1, column: 28},
            end: {line: 1, column: 29}
          }
        }],
        loc: {
          start: {line: 1, column: 20},
          end: {line: 1, column: 30}
        }
      },
      loc: {
        start: {line: 1, column: 20},
        end: {line: 1, column: 31}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 31}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 31}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// Harmony: Class (strawman)

test("var A = class extends B {}", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "Identifier",
        name: "A",
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 5}
        }
      },
      init: {
        type: "ClassExpression",
        superClass: {
          type: "Identifier",
          name: "B",
          loc: {
            start: {line: 1, column: 22},
            end: {line: 1, column: 23}
          }
        },
        body: {
          type: "ClassBody",
          body: [],
          loc: {
            start: {line: 1, column: 24},
            end: {line: 1, column: 26}
          }
        },
        loc: {
          start: {line: 1, column: 8},
          end: {line: 1, column: 26}
        }
      },
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 26}
      }
    }],
    kind: "var",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 26}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 26}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A extends class B extends C {} {}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: {
      type: "ClassExpression",
      id: {
        type: "Identifier",
        name: "B",
        loc: {
          start: {line: 1, column: 22},
          end: {line: 1, column: 23}
        }
      },
      superClass: {
        type: "Identifier",
        name: "C",
        loc: {
          start: {line: 1, column: 32},
          end: {line: 1, column: 33}
        }
      },
      body: {
        type: "ClassBody",
        body: [],
        loc: {
          start: {line: 1, column: 34},
          end: {line: 1, column: 36}
        }
      },
      loc: {
        start: {line: 1, column: 16},
        end: {line: 1, column: 36}
      }
    },
    body: {
      type: "ClassBody",
      body: [],
      loc: {
        start: {line: 1, column: 37},
        end: {line: 1, column: 39}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 39}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 39}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A {get() {}}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [{
        type: "MethodDefinition",
        computed: false,
        key: {
          type: "Identifier",
          name: "get",
          loc: {
            start: {line: 1, column: 9},
            end: {line: 1, column: 12}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [],
          body: {
            type: "BlockStatement",
            body: [],
            loc: {
              start: {line: 1, column: 15},
              end: {line: 1, column: 17}
            }
          },
          generator: false,
          expression: false,
          loc: {
            start: {line: 1, column: 12},
            end: {line: 1, column: 17}
          }
        },
        kind: "method",
        static: false,
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 17}
        }
      }],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 18}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 18}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 18}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { static get() {}}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [{
        type: "MethodDefinition",
        computed: false,
        key: {
          type: "Identifier",
          name: "get",
          loc: {
            start: {line: 1, column: 17},
            end: {line: 1, column: 20}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [],
          body: {
            type: "BlockStatement",
            body: [],
            loc: {
              start: {line: 1, column: 23},
              end: {line: 1, column: 25}
            }
          },
          generator: false,
          expression: false,
          loc: {
            start: {line: 1, column: 20},
            end: {line: 1, column: 25}
          }
        },
        kind: "method",
        static: true,
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 25}
        }
      }],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 26}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 26}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 26}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A extends B {get foo() {}}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: {
      type: "Identifier",
      name: "B",
      loc: {
        start: {line: 1, column: 16},
        end: {line: 1, column: 17}
      }
    },
    body: {
      type: "ClassBody",
      body: [{
        type: "MethodDefinition",
        computed: false,
        key: {
          type: "Identifier",
          name: "foo",
          loc: {
            start: {line: 1, column: 23},
            end: {line: 1, column: 26}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [],
          body: {
            type: "BlockStatement",
            body: [],
            loc: {
              start: {line: 1, column: 29},
              end: {line: 1, column: 31}
            }
          },
          generator: false,
          expression: false,
          loc: {
            start: {line: 1, column: 26},
            end: {line: 1, column: 31}
          }
        },
        kind: "get",
        static: false,
        loc: {
          start: {line: 1, column: 19},
          end: {line: 1, column: 31}
        }
      }],
      loc: {
        start: {line: 1, column: 18},
        end: {line: 1, column: 32}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 32}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 32}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A extends B { static get foo() {}}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: {
      type: "Identifier",
      name: "B",
      loc: {
        start: {line: 1, column: 16},
        end: {line: 1, column: 17}
      }
    },
    body: {
      type: "ClassBody",
      body: [{
        type: "MethodDefinition",
        computed: false,
        key: {
          type: "Identifier",
          name: "foo",
          loc: {
            start: {line: 1, column: 31},
            end: {line: 1, column: 34}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [],
          body: {
            type: "BlockStatement",
            body: [],
            loc: {
              start: {line: 1, column: 37},
              end: {line: 1, column: 39}
            }
          },
          generator: false,
          expression: false,
          loc: {
            start: {line: 1, column: 34},
            end: {line: 1, column: 39}
          }
        },
        kind: "get",
        static: true,
        loc: {
          start: {line: 1, column: 20},
          end: {line: 1, column: 39}
        }
      }],
      loc: {
        start: {line: 1, column: 18},
        end: {line: 1, column: 40}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 40}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 40}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A {set a(v) {}}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [{
        type: "MethodDefinition",
        computed: false,
        key: {
          type: "Identifier",
          name: "a",
          loc: {
            start: {line: 1, column: 13},
            end: {line: 1, column: 14}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [{
            type: "Identifier",
            name: "v",
            loc: {
              start: {line: 1, column: 15},
              end: {line: 1, column: 16}
            }
          }],
          body: {
            type: "BlockStatement",
            body: [],
            loc: {
              start: {line: 1, column: 18},
              end: {line: 1, column: 20}
            }
          },
          generator: false,
          expression: false,
          loc: {
            start: {line: 1, column: 14},
            end: {line: 1, column: 20}
          }
        },
        kind: "set",
        static: false,
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 20}
        }
      }],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 21}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 21}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 21}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { static set a(v) {}}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [{
        type: "MethodDefinition",
        computed: false,
        key: {
          type: "Identifier",
          name: "a",
          loc: {
            start: {line: 1, column: 21},
            end: {line: 1, column: 22}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [{
            type: "Identifier",
            name: "v",
            loc: {
              start: {line: 1, column: 23},
              end: {line: 1, column: 24}
            }
          }],
          body: {
            type: "BlockStatement",
            body: [],
            loc: {
              start: {line: 1, column: 26},
              end: {line: 1, column: 28}
            }
          },
          generator: false,
          expression: false,
          loc: {
            start: {line: 1, column: 22},
            end: {line: 1, column: 28}
          }
        },
        kind: "set",
        static: true,
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 28}
        }
      }],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 29}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 29}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 29}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A {set(v) {};}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [{
        type: "MethodDefinition",
        computed: false,
        key: {
          type: "Identifier",
          name: "set",
          loc: {
            start: {line: 1, column: 9},
            end: {line: 1, column: 12}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [{
            type: "Identifier",
            name: "v",
            loc: {
              start: {line: 1, column: 13},
              end: {line: 1, column: 14}
            }
          }],
          body: {
            type: "BlockStatement",
            body: [],
            loc: {
              start: {line: 1, column: 16},
              end: {line: 1, column: 18}
            }
          },
          generator: false,
          expression: false,
          loc: {
            start: {line: 1, column: 12},
            end: {line: 1, column: 18}
          }
        },
        kind: "method",
        static: false,
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 18}
        }
      }],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 20}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 20}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 20}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { static set(v) {};}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [{
        type: "MethodDefinition",
        computed: false,
        key: {
          type: "Identifier",
          name: "set",
          loc: {
            start: {line: 1, column: 17},
            end: {line: 1, column: 20}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [{
            type: "Identifier",
            name: "v",
            loc: {
              start: {line: 1, column: 21},
              end: {line: 1, column: 22}
            }
          }],
          body: {
            type: "BlockStatement",
            body: [],
            loc: {
              start: {line: 1, column: 24},
              end: {line: 1, column: 26}
            }
          },
          generator: false,
          expression: false,
          loc: {
            start: {line: 1, column: 20},
            end: {line: 1, column: 26}
          }
        },
        kind: "method",
        static: true,
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 26}
        }
      }],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 28}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 28}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 28}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A {*gen(v) { yield v; }}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [{
        type: "MethodDefinition",
        computed: false,
        key: {
          type: "Identifier",
          name: "gen",
          loc: {
            start: {line: 1, column: 10},
            end: {line: 1, column: 13}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [{
            type: "Identifier",
            name: "v",
            loc: {
              start: {line: 1, column: 14},
              end: {line: 1, column: 15}
            }
          }],
          body: {
            type: "BlockStatement",
            body: [{
              type: "ExpressionStatement",
              expression: {
                type: "YieldExpression",
                argument: {
                  type: "Identifier",
                  name: "v",
                  loc: {
                    start: {line: 1, column: 25},
                    end: {line: 1, column: 26}
                  }
                },
                delegate: false,
                loc: {
                  start: {line: 1, column: 19},
                  end: {line: 1, column: 26}
                }
              },
              loc: {
                start: {line: 1, column: 19},
                end: {line: 1, column: 27}
              }
            }],
            loc: {
              start: {line: 1, column: 17},
              end: {line: 1, column: 29}
            }
          },
          generator: true,
          expression: false,
          loc: {
            start: {line: 1, column: 13},
            end: {line: 1, column: 29}
          }
        },
        kind: "method",
        static: false,
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 29}
        }
      }],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 30}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 30}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 30}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { static *gen(v) { yield v; }}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [{
        type: "MethodDefinition",
        computed: false,
        key: {
          type: "Identifier",
          name: "gen",
          loc: {
            start: {line: 1, column: 18},
            end: {line: 1, column: 21}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [{
            type: "Identifier",
            name: "v",
            loc: {
              start: {line: 1, column: 22},
              end: {line: 1, column: 23}
            }
          }],
          body: {
            type: "BlockStatement",
            body: [{
              type: "ExpressionStatement",
              expression: {
                type: "YieldExpression",
                argument: {
                  type: "Identifier",
                  name: "v",
                  loc: {
                    start: {line: 1, column: 33},
                    end: {line: 1, column: 34}
                  }
                },
                delegate: false,
                loc: {
                  start: {line: 1, column: 27},
                  end: {line: 1, column: 34}
                }
              },
              loc: {
                start: {line: 1, column: 27},
                end: {line: 1, column: 35}
              }
            }],
            loc: {
              start: {line: 1, column: 25},
              end: {line: 1, column: 37}
            }
          },
          generator: true,
          expression: false,
          loc: {
            start: {line: 1, column: 21},
            end: {line: 1, column: 37}
          }
        },
        kind: "method",
        static: true,
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 37}
        }
      }],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 38}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 38}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 38}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("\"use strict\"; (class A {constructor() { super() }})", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: "use strict",
        raw: "\"use strict\"",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 12}
        }
      },
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 13}
      }
    },
    {
      type: "ExpressionStatement",
      expression: {
        type: "ClassExpression",
        id: {
          type: "Identifier",
          name: "A",
          loc: {
            start: {line: 1, column: 21},
            end: {line: 1, column: 22}
          }
        },
        superClass: null,
        body: {
          type: "ClassBody",
          body: [{
            type: "MethodDefinition",
            computed: false,
            key: {
              type: "Identifier",
              name: "constructor",
              loc: {
                start: {line: 1, column: 24},
                end: {line: 1, column: 35}
              }
            },
            value: {
              type: "FunctionExpression",
              id: null,
              params: [],
              body: {
                type: "BlockStatement",
                body: [{
                  type: "ExpressionStatement",
                  expression: {
                    type: "CallExpression",
                    callee: {
                      type: "Super",
                      loc: {
                        start: {line: 1, column: 40},
                        end: {line: 1, column: 45}
                      }
                    },
                    arguments: [],
                    loc: {
                      start: {line: 1, column: 40},
                      end: {line: 1, column: 47}
                    }
                  },
                  loc: {
                    start: {line: 1, column: 40},
                    end: {line: 1, column: 47}
                  }
                }],
                loc: {
                  start: {line: 1, column: 38},
                  end: {line: 1, column: 49}
                }
              },
              generator: false,
              expression: false,
              loc: {
                start: {line: 1, column: 35},
                end: {line: 1, column: 49}
              }
            },
            kind: "constructor",
            static: false,
            loc: {
              start: {line: 1, column: 24},
              end: {line: 1, column: 49}
            }
          }],
          loc: {
            start: {line: 1, column: 23},
            end: {line: 1, column: 50}
          }
        },
        loc: {
          start: {line: 1, column: 15},
          end: {line: 1, column: 50}
        }
      },
      loc: {
        start: {line: 1, column: 14},
        end: {line: 1, column: 51}
      }
    }
  ],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 51}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A {'constructor'() {}}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {type: "Identifier", name: "A"},
    superClass: null,
    body: {
      type: "ClassBody",
      body: [{
        type: "MethodDefinition",
        computed: false,
        key: {type: "Literal", value: "constructor"},
        static: false,
        kind: "constructor",
        value: {
          type: "FunctionExpression",
          id: null,
          generator: false,
          expression: false,
          params: [],
          body: {
            type: "BlockStatement",
            body: []
          }
        }
      }]
    }
  }]
}, {ecmaVersion: 6});

testFail("class A { constructor() {} 'constructor'() }", "Duplicate constructor in the same class (1:27)", {ecmaVersion: 6});

testFail("class A { get constructor() {} }", "Constructor can't have get/set modifier (1:14)", {ecmaVersion: 6});

testFail("class A { *constructor() {} }", "Constructor can't be a generator (1:11)", {ecmaVersion: 6});

test("class A {static foo() {}}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [{
        type: "MethodDefinition",
        computed: false,
        key: {
          type: "Identifier",
          name: "foo",
          loc: {
            start: {line: 1, column: 16},
            end: {line: 1, column: 19}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [],
          body: {
            type: "BlockStatement",
            body: [],
            loc: {
              start: {line: 1, column: 22},
              end: {line: 1, column: 24}
            }
          },
          generator: false,
          expression: false,
          loc: {
            start: {line: 1, column: 19},
            end: {line: 1, column: 24}
          }
        },
        kind: "method",
        static: true,
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 24}
        }
      }],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 25}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 25}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 25}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A {foo() {} static bar() {}}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "foo",
            loc: {
              start: {line: 1, column: 9},
              end: {line: 1, column: 12}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            body: {
              type: "BlockStatement",
              body: [],
              loc: {
                start: {line: 1, column: 15},
                end: {line: 1, column: 17}
              }
            },
            generator: false,
            expression: false,
            loc: {
              start: {line: 1, column: 12},
              end: {line: 1, column: 17}
            }
          },
          kind: "method",
          static: false,
          loc: {
            start: {line: 1, column: 9},
            end: {line: 1, column: 17}
          }
        },
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "bar",
            loc: {
              start: {line: 1, column: 25},
              end: {line: 1, column: 28}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            body: {
              type: "BlockStatement",
              body: [],
              loc: {
                start: {line: 1, column: 31},
                end: {line: 1, column: 33}
              }
            },
            generator: false,
            expression: false,
            loc: {
              start: {line: 1, column: 28},
              end: {line: 1, column: 33}
            }
          },
          kind: "method",
          static: true,
          loc: {
            start: {line: 1, column: 18},
            end: {line: 1, column: 33}
          }
        }
      ],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 34}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 34}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 34}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("\"use strict\"; (class A { static constructor() { super() }})", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: "use strict",
        raw: "\"use strict\"",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 12}
        }
      },
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 13}
      }
    },
    {
      type: "ExpressionStatement",
      expression: {
        type: "ClassExpression",
        id: {
          type: "Identifier",
          name: "A",
          loc: {
            start: {line: 1, column: 21},
            end: {line: 1, column: 22}
          }
        },
        superClass: null,
        body: {
          type: "ClassBody",
          body: [{
            type: "MethodDefinition",
            computed: false,
            key: {
              type: "Identifier",
              name: "constructor",
              loc: {
                start: {line: 1, column: 32},
                end: {line: 1, column: 43}
              }
            },
            value: {
              type: "FunctionExpression",
              id: null,
              params: [],
              body: {
                type: "BlockStatement",
                body: [{
                  type: "ExpressionStatement",
                  expression: {
                    type: "CallExpression",
                    callee: {
                      type: "Super",
                      loc: {
                        start: {line: 1, column: 48},
                        end: {line: 1, column: 53}
                      }
                    },
                    arguments: [],
                    loc: {
                      start: {line: 1, column: 48},
                      end: {line: 1, column: 55}
                    }
                  },
                  loc: {
                    start: {line: 1, column: 48},
                    end: {line: 1, column: 55}
                  }
                }],
                loc: {
                  start: {line: 1, column: 46},
                  end: {line: 1, column: 57}
                }
              },
              generator: false,
              expression: false,
              loc: {
                start: {line: 1, column: 43},
                end: {line: 1, column: 57}
              }
            },
            kind: "method",
            static: true,
            loc: {
              start: {line: 1, column: 25},
              end: {line: 1, column: 57}
            }
          }],
          loc: {
            start: {line: 1, column: 23},
            end: {line: 1, column: 58}
          }
        },
        loc: {
          start: {line: 1, column: 15},
          end: {line: 1, column: 58}
        }
      },
      loc: {
        start: {line: 1, column: 14},
        end: {line: 1, column: 59}
      }
    }
  ],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 59}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { foo() {} bar() {}}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "foo",
            loc: {
              start: {line: 1, column: 10},
              end: {line: 1, column: 13}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            body: {
              type: "BlockStatement",
              body: [],
              loc: {
                start: {line: 1, column: 16},
                end: {line: 1, column: 18}
              }
            },
            generator: false,
            expression: false,
            loc: {
              start: {line: 1, column: 13},
              end: {line: 1, column: 18}
            }
          },
          kind: "method",
          static: false,
          loc: {
            start: {line: 1, column: 10},
            end: {line: 1, column: 18}
          }
        },
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "bar",
            loc: {
              start: {line: 1, column: 19},
              end: {line: 1, column: 22}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            body: {
              type: "BlockStatement",
              body: [],
              loc: {
                start: {line: 1, column: 25},
                end: {line: 1, column: 27}
              }
            },
            generator: false,
            expression: false,
            loc: {
              start: {line: 1, column: 22},
              end: {line: 1, column: 27}
            }
          },
          kind: "method",
          static: false,
          loc: {
            start: {line: 1, column: 19},
            end: {line: 1, column: 27}
          }
        }
      ],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 28}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 28}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 28}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { get foo() {} set foo(v) {}}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "foo",
            loc: {
              start: {line: 1, column: 14},
              end: {line: 1, column: 17}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            body: {
              type: "BlockStatement",
              body: [],
              loc: {
                start: {line: 1, column: 20},
                end: {line: 1, column: 22}
              }
            },
            generator: false,
            expression: false,
            loc: {
              start: {line: 1, column: 17},
              end: {line: 1, column: 22}
            }
          },
          kind: "get",
          static: false,
          loc: {
            start: {line: 1, column: 10},
            end: {line: 1, column: 22}
          }
        },
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "foo",
            loc: {
              start: {line: 1, column: 27},
              end: {line: 1, column: 30}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [{
              type: "Identifier",
              name: "v",
              loc: {
                start: {line: 1, column: 31},
                end: {line: 1, column: 32}
              }
            }],
            body: {
              type: "BlockStatement",
              body: [],
              loc: {
                start: {line: 1, column: 34},
                end: {line: 1, column: 36}
              }
            },
            generator: false,
            expression: false,
            loc: {
              start: {line: 1, column: 30},
              end: {line: 1, column: 36}
            }
          },
          kind: "set",
          static: false,
          loc: {
            start: {line: 1, column: 23},
            end: {line: 1, column: 36}
          }
        }
      ],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 37}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 37}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 37}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { static get foo() {} get foo() {}}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "foo",
            loc: {
              start: {line: 1, column: 21},
              end: {line: 1, column: 24}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            body: {
              type: "BlockStatement",
              body: [],
              loc: {
                start: {line: 1, column: 27},
                end: {line: 1, column: 29}
              }
            },
            generator: false,
            expression: false,
            loc: {
              start: {line: 1, column: 24},
              end: {line: 1, column: 29}
            }
          },
          kind: "get",
          static: true,
          loc: {
            start: {line: 1, column: 10},
            end: {line: 1, column: 29}
          }
        },
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "foo",
            loc: {
              start: {line: 1, column: 34},
              end: {line: 1, column: 37}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            body: {
              type: "BlockStatement",
              body: [],
              loc: {
                start: {line: 1, column: 40},
                end: {line: 1, column: 42}
              }
            },
            generator: false,
            expression: false,
            loc: {
              start: {line: 1, column: 37},
              end: {line: 1, column: 42}
            }
          },
          kind: "get",
          static: false,
          loc: {
            start: {line: 1, column: 30},
            end: {line: 1, column: 42}
          }
        }
      ],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 43}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 43}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 43}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { static get foo() {} static get bar() {} }", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "foo",
            loc: {
              start: {line: 1, column: 21},
              end: {line: 1, column: 24}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            body: {
              type: "BlockStatement",
              body: [],
              loc: {
                start: {line: 1, column: 27},
                end: {line: 1, column: 29}
              }
            },
            generator: false,
            expression: false,
            loc: {
              start: {line: 1, column: 24},
              end: {line: 1, column: 29}
            }
          },
          kind: "get",
          static: true,
          loc: {
            start: {line: 1, column: 10},
            end: {line: 1, column: 29}
          }
        },
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "bar",
            loc: {
              start: {line: 1, column: 41},
              end: {line: 1, column: 44}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            body: {
              type: "BlockStatement",
              body: [],
              loc: {
                start: {line: 1, column: 47},
                end: {line: 1, column: 49}
              }
            },
            generator: false,
            expression: false,
            loc: {
              start: {line: 1, column: 44},
              end: {line: 1, column: 49}
            }
          },
          kind: "get",
          static: true,
          loc: {
            start: {line: 1, column: 30},
            end: {line: 1, column: 49}
          }
        }
      ],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 51}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 51}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 51}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { static get foo() {} static set foo(v) {} get foo() {} set foo(v) {}}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "foo",
            loc: {
              start: {line: 1, column: 21},
              end: {line: 1, column: 24}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            body: {
              type: "BlockStatement",
              body: [],
              loc: {
                start: {line: 1, column: 27},
                end: {line: 1, column: 29}
              }
            },
            generator: false,
            expression: false,
            loc: {
              start: {line: 1, column: 24},
              end: {line: 1, column: 29}
            }
          },
          kind: "get",
          static: true,
          loc: {
            start: {line: 1, column: 10},
            end: {line: 1, column: 29}
          }
        },
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "foo",
            loc: {
              start: {line: 1, column: 41},
              end: {line: 1, column: 44}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [{
              type: "Identifier",
              name: "v",
              loc: {
                start: {line: 1, column: 45},
                end: {line: 1, column: 46}
              }
            }],
            body: {
              type: "BlockStatement",
              body: [],
              loc: {
                start: {line: 1, column: 48},
                end: {line: 1, column: 50}
              }
            },
            generator: false,
            expression: false,
            loc: {
              start: {line: 1, column: 44},
              end: {line: 1, column: 50}
            }
          },
          kind: "set",
          static: true,
          loc: {
            start: {line: 1, column: 30},
            end: {line: 1, column: 50}
          }
        },
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "foo",
            loc: {
              start: {line: 1, column: 55},
              end: {line: 1, column: 58}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            body: {
              type: "BlockStatement",
              body: [],
              loc: {
                start: {line: 1, column: 61},
                end: {line: 1, column: 63}
              }
            },
            generator: false,
            expression: false,
            loc: {
              start: {line: 1, column: 58},
              end: {line: 1, column: 63}
            }
          },
          kind: "get",
          static: false,
          loc: {
            start: {line: 1, column: 51},
            end: {line: 1, column: 63}
          }
        },
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "foo",
            loc: {
              start: {line: 1, column: 68},
              end: {line: 1, column: 71}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [{
              type: "Identifier",
              name: "v",
              loc: {
                start: {line: 1, column: 72},
                end: {line: 1, column: 73}
              }
            }],
            body: {
              type: "BlockStatement",
              body: [],
              loc: {
                start: {line: 1, column: 75},
                end: {line: 1, column: 77}
              }
            },
            generator: false,
            expression: false,
            loc: {
              start: {line: 1, column: 71},
              end: {line: 1, column: 77}
            }
          },
          kind: "set",
          static: false,
          loc: {
            start: {line: 1, column: 64},
            end: {line: 1, column: 77}
          }
        }
      ],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 78}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 78}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 78}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});


test("class A { static [foo]() {} }", {
  type: "Program",
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 29}
  },
  body: [{
    type: "ClassDeclaration",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 29}
    },
    id: {
      type: "Identifier",
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      },
      name: "A"
    },
    superClass: null,
    body: {
      type: "ClassBody",
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 29}
      },
      body: [{
        type: "MethodDefinition",
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 27}
        },
        static: true,
        computed: true,
        key: {
          type: "Identifier",
          loc: {
            start: {line: 1, column: 18},
            end: {line: 1, column: 21}
          },
          name: "foo"
        },
        kind: "method",
        value: {
          type: "FunctionExpression",
          loc: {
            start: {line: 1, column: 22},
            end: {line: 1, column: 27}
          },
          id: null,
          params: [],
          generator: false,
          body: {
            type: "BlockStatement",
            loc: {
              start: {line: 1, column: 25},
              end: {line: 1, column: 27}
            },
            body: []
          },
          expression: false
        }
      }]
    }
  }]
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { static get [foo]() {} }", {
  type: "Program",
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 33}
  },
  body: [{
    type: "ClassDeclaration",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 33}
    },
    id: {
      type: "Identifier",
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      },
      range: [
        6,
        7
      ],
      name: "A"
    },
    superClass: null,
    body: {
      type: "ClassBody",
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 33}
      },
      body: [{
        type: "MethodDefinition",
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 31}
        },
        static: true,
        computed: true,
        key: {
          type: "Identifier",
          loc: {
            start: {line: 1, column: 22},
            end: {line: 1, column: 25}
          },
          name: "foo"
        },
        kind: "get",
        value: {
          type: "FunctionExpression",
          loc: {
            start: {line: 1, column: 26},
            end: {line: 1, column: 31}
          },
          id: null,
          params: [],
          generator: false,
          body: {
            type: "BlockStatement",
            loc: {
              start: {line: 1, column: 29},
              end: {line: 1, column: 31}
            },
            body: []
          },
          expression: false
        }
      }]
    }
  }]
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { set foo(v) {} get foo() {} }", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "foo",
            loc: {
              start: {line: 1, column: 14},
              end: {line: 1, column: 17}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [{
              type: "Identifier",
              name: "v",
              loc: {
                start: {line: 1, column: 18},
                end: {line: 1, column: 19}
              }
            }],
            body: {
              type: "BlockStatement",
              body: [],
              loc: {
                start: {line: 1, column: 21},
                end: {line: 1, column: 23}
              }
            },
            generator: false,
            expression: false,
            loc: {
              start: {line: 1, column: 17},
              end: {line: 1, column: 23}
            }
          },
          kind: "set",
          static: false,
          loc: {
            start: {line: 1, column: 10},
            end: {line: 1, column: 23}
          }
        },
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "foo",
            loc: {
              start: {line: 1, column: 28},
              end: {line: 1, column: 31}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            body: {
              type: "BlockStatement",
              body: [],
              loc: {
                start: {line: 1, column: 34},
                end: {line: 1, column: 36}
              }
            },
            generator: false,
            expression: false,
            loc: {
              start: {line: 1, column: 31},
              end: {line: 1, column: 36}
            }
          },
          kind: "get",
          static: false,
          loc: {
            start: {line: 1, column: 24},
            end: {line: 1, column: 36}
          }
        }
      ],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 38}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 38}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 38}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { foo() {} get foo() {} }",{
  type: "Program",
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 33}
  },
  body: [{
    type: "ClassDeclaration",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 33}
    },
    id: {
      type: "Identifier",
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      },
      name: "A"
    },
    superClass: null,
    body: {
      type: "ClassBody",
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 33}
      },
      body: [
        {
          type: "MethodDefinition",
          loc: {
            start: {line: 1, column: 10},
            end: {line: 1, column: 18}
          },
          static: false,
          computed: false,
          key: {
            type: "Identifier",
            loc: {
              start: {line: 1, column: 10},
              end: {line: 1, column: 13}
            },
            name: "foo"
          },
          kind: "method",
          value: {
            type: "FunctionExpression",
            loc: {
              start: {line: 1, column: 13},
              end: {line: 1, column: 18}
            },
            id: null,
            params: [],
            generator: false,
            body: {
              type: "BlockStatement",
              loc: {
                start: {line: 1, column: 16},
                end: {line: 1, column: 18}
              },
              body: []
            },
            expression: false
          }
        },
        {
          type: "MethodDefinition",
          loc: {
            start: {line: 1, column: 19},
            end: {line: 1, column: 31}
          },
          static: false,
          computed: false,
          key: {
            type: "Identifier",
            loc: {
              start: {line: 1, column: 23},
              end: {line: 1, column: 26}
            },
            name: "foo"
          },
          kind: "get",
          value: {
            type: "FunctionExpression",
            loc: {
              start: {line: 1, column: 26},
              end: {line: 1, column: 31}
            },
            id: null,
            params: [],
            generator: false,
            body: {
              type: "BlockStatement",
              loc: {
                start: {line: 1, column: 29},
                end: {line: 1, column: 31}
              },
              body: []
            },
            expression: false
          }
        }
      ]
    }
  }]
},{
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class Semicolon { ; }", {
  type: "Program",
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 21}
  },
  body: [{
    type: "ClassDeclaration",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 21}
    },
    id: {
      type: "Identifier",
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 15}
      },
      name: "Semicolon"
    },
    superClass: null,
    body: {
      type: "ClassBody",
      loc: {
        start: {line: 1, column: 16},
        end: {line: 1, column: 21}
      },
      body: []
    }
  }]
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// ES6: Computed Properties

test("({[x]: 10})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ObjectExpression",
      properties: [{
        type: "Property",
        key: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {line: 1, column: 3},
            end: {line: 1, column: 4}
          }
        },
        value: {
          type: "Literal",
          value: 10,
          raw: "10",
          loc: {
            start: {line: 1, column: 7},
            end: {line: 1, column: 9}
          }
        },
        kind: "init",
        method: false,
        shorthand: false,
        computed: true,
        loc: {
          start: {line: 1, column: 2},
          end: {line: 1, column: 9}
        }
      }],
      loc: {
        start: {line: 1, column: 1},
        end: {line: 1, column: 10}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 11}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 11}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({[\"x\" + \"y\"]: 10})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ObjectExpression",
      properties: [{
        type: "Property",
        key: {
          type: "BinaryExpression",
          operator: "+",
          left: {
            type: "Literal",
            value: "x",
            raw: "\"x\"",
            loc: {
              start: {line: 1, column: 3},
              end: {line: 1, column: 6}
            }
          },
          right: {
            type: "Literal",
            value: "y",
            raw: "\"y\"",
            loc: {
              start: {line: 1, column: 9},
              end: {line: 1, column: 12}
            }
          },
          loc: {
            start: {line: 1, column: 3},
            end: {line: 1, column: 12}
          }
        },
        value: {
          type: "Literal",
          value: 10,
          raw: "10",
          loc: {
            start: {line: 1, column: 15},
            end: {line: 1, column: 17}
          }
        },
        kind: "init",
        method: false,
        shorthand: false,
        computed: true,
        loc: {
          start: {line: 1, column: 2},
          end: {line: 1, column: 17}
        }
      }],
      loc: {
        start: {line: 1, column: 1},
        end: {line: 1, column: 18}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 19}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 19}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({[x]: function() {}})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ObjectExpression",
      properties: [{
        type: "Property",
        key: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {line: 1, column: 3},
            end: {line: 1, column: 4}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [],
          body: {
            type: "BlockStatement",
            body: [],
            loc: {
              start: {line: 1, column: 18},
              end: {line: 1, column: 20}
            }
          },
          generator: false,
          expression: false,
          loc: {
            start: {line: 1, column: 7},
            end: {line: 1, column: 20}
          }
        },
        kind: "init",
        method: false,
        shorthand: false,
        computed: true,
        loc: {
          start: {line: 1, column: 2},
          end: {line: 1, column: 20}
        }
      }],
      loc: {
        start: {line: 1, column: 1},
        end: {line: 1, column: 21}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 22}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 22}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({[x]: 10, y: 20})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ObjectExpression",
      properties: [
        {
          type: "Property",
          key: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {line: 1, column: 3},
              end: {line: 1, column: 4}
            }
          },
          value: {
            type: "Literal",
            value: 10,
            raw: "10",
            loc: {
              start: {line: 1, column: 7},
              end: {line: 1, column: 9}
            }
          },
          kind: "init",
          method: false,
          shorthand: false,
          computed: true,
          loc: {
            start: {line: 1, column: 2},
            end: {line: 1, column: 9}
          }
        },
        {
          type: "Property",
          key: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {line: 1, column: 11},
              end: {line: 1, column: 12}
            }
          },
          value: {
            type: "Literal",
            value: 20,
            raw: "20",
            loc: {
              start: {line: 1, column: 14},
              end: {line: 1, column: 16}
            }
          },
          kind: "init",
          method: false,
          shorthand: false,
          computed: false,
          loc: {
            start: {line: 1, column: 11},
            end: {line: 1, column: 16}
          }
        }
      ],
      loc: {
        start: {line: 1, column: 1},
        end: {line: 1, column: 17}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 18}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 18}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({get [x]() {}, set [x](v) {}})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ObjectExpression",
      properties: [
        {
          type: "Property",
          key: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {line: 1, column: 7},
              end: {line: 1, column: 8}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            body: {
              type: "BlockStatement",
              body: [],
              loc: {
                start: {line: 1, column: 12},
                end: {line: 1, column: 14}
              }
            },
            generator: false,
            expression: false,
            loc: {
              start: {line: 1, column: 9},
              end: {line: 1, column: 14}
            }
          },
          kind: "get",
          method: false,
          shorthand: false,
          computed: true,
          loc: {
            start: {line: 1, column: 2},
            end: {line: 1, column: 14}
          }
        },
        {
          type: "Property",
          key: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {line: 1, column: 21},
              end: {line: 1, column: 22}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [{
              type: "Identifier",
              name: "v",
              loc: {
                start: {line: 1, column: 24},
                end: {line: 1, column: 25}
              }
            }],
            body: {
              type: "BlockStatement",
              body: [],
              loc: {
                start: {line: 1, column: 27},
                end: {line: 1, column: 29}
              }
            },
            generator: false,
            expression: false,
            loc: {
              start: {line: 1, column: 23},
              end: {line: 1, column: 29}
            }
          },
          kind: "set",
          method: false,
          shorthand: false,
          computed: true,
          loc: {
            start: {line: 1, column: 16},
            end: {line: 1, column: 29}
          }
        }
      ],
      loc: {
        start: {line: 1, column: 1},
        end: {line: 1, column: 30}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 31}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 31}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({[x]() {}})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ObjectExpression",
      properties: [{
        type: "Property",
        key: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {line: 1, column: 3},
            end: {line: 1, column: 4}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [],
          body: {
            type: "BlockStatement",
            body: [],
            loc: {
              start: {line: 1, column: 8},
              end: {line: 1, column: 10}
            }
          },
          generator: false,
          expression: false,
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 10}
          }
        },
        kind: "init",
        method: true,
        shorthand: false,
        computed: true,
        loc: {
          start: {line: 1, column: 2},
          end: {line: 1, column: 10}
        }
      }],
      loc: {
        start: {line: 1, column: 1},
        end: {line: 1, column: 11}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 12}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 12}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var {[x]: y} = {y}", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "ObjectPattern",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {line: 1, column: 6},
              end: {line: 1, column: 7}
            }
          },
          value: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {line: 1, column: 10},
              end: {line: 1, column: 11}
            }
          },
          kind: "init",
          method: false,
          shorthand: false,
          computed: true,
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 11}
          }
        }],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 12}
        }
      },
      init: {
        type: "ObjectExpression",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {line: 1, column: 16},
              end: {line: 1, column: 17}
            }
          },
          value: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {line: 1, column: 16},
              end: {line: 1, column: 17}
            }
          },
          kind: "init",
          method: false,
          shorthand: true,
          computed: false,
          loc: {
            start: {line: 1, column: 16},
            end: {line: 1, column: 17}
          }
        }],
        loc: {
          start: {line: 1, column: 15},
          end: {line: 1, column: 18}
        }
      },
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 18}
      }
    }],
    kind: "var",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 18}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 18}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function f({[x]: y}) {}", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "f",
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 10}
      }
    },
    params: [{
      type: "ObjectPattern",
      properties: [{
        type: "Property",
        key: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {line: 1, column: 13},
            end: {line: 1, column: 14}
          }
        },
        value: {
          type: "Identifier",
          name: "y",
          loc: {
            start: {line: 1, column: 17},
            end: {line: 1, column: 18}
          }
        },
        kind: "init",
        method: false,
        shorthand: false,
        computed: true,
        loc: {
          start: {line: 1, column: 12},
          end: {line: 1, column: 18}
        }
      }],
      loc: {
        start: {line: 1, column: 11},
        end: {line: 1, column: 19}
      }
    }],
    body: {
      type: "BlockStatement",
      body: [],
      loc: {
        start: {line: 1, column: 21},
        end: {line: 1, column: 23}
      }
    },
    generator: false,
    expression: false,
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 23}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 23}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var x = {*[test]() { yield *v; }}", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "Identifier",
        name: "x",
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 5}
        }
      },
      init: {
        type: "ObjectExpression",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "test",
            loc: {
              start: {line: 1, column: 11},
              end: {line: 1, column: 15}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            body: {
              type: "BlockStatement",
              body: [{
                type: "ExpressionStatement",
                expression: {
                  type: "YieldExpression",
                  argument: {
                    type: "Identifier",
                    name: "v",
                    loc: {
                      start: {line: 1, column: 28},
                      end: {line: 1, column: 29}
                    }
                  },
                  delegate: true,
                  loc: {
                    start: {line: 1, column: 21},
                    end: {line: 1, column: 29}
                  }
                },
                loc: {
                  start: {line: 1, column: 21},
                  end: {line: 1, column: 30}
                }
              }],
              loc: {
                start: {line: 1, column: 19},
                end: {line: 1, column: 32}
              }
            },
            generator: true,
            expression: false,
            loc: {
              start: {line: 1, column: 16},
              end: {line: 1, column: 32}
            }
          },
          kind: "init",
          method: true,
          shorthand: false,
          computed: true,
          loc: {
            start: {line: 1, column: 9},
            end: {line: 1, column: 32}
          }
        }],
        loc: {
          start: {line: 1, column: 8},
          end: {line: 1, column: 33}
        }
      },
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 33}
      }
    }],
    kind: "var",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 33}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 33}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A {[x]() {}}", {
  type: "Program",
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 18}
  },
  body: [{
    type: "ClassDeclaration",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 18}
    },
    id: {
      type: "Identifier",
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      },
      name: "A"
    },
    superClass: null,
    body: {
      type: "ClassBody",
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 18}
      },
      body: [{
        type: "MethodDefinition",
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 17}
        },
        static: false,
        computed: true,
        key: {
          type: "Identifier",
          loc: {
            start: {line: 1, column: 10},
            end: {line: 1, column: 11}
          },
          name: "x"
        },
        kind: "method",
        value: {
          type: "FunctionExpression",
          loc: {
            start: {line: 1, column: 12},
            end: {line: 1, column: 17}
          },
          id: null,
          params: [],
          generator: false,
          body: {
            type: "BlockStatement",
            loc: {
              start: {line: 1, column: 15},
              end: {line: 1, column: 17}
            },
            body: []
          },
          expression: false
        }
      }]
    }
  }]
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

testFail("({[x]})", "Unexpected token (1:5)", {ecmaVersion: 6});

// ES6: Default parameters

test("function f([x] = [1]) {}", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "f",
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 10}
      }
    },
    params: [{
      type: "AssignmentPattern",
      left: {
        type: "ArrayPattern",
        elements: [{
          type: "Identifier",
          name: "x",
          loc: {
            start: {line: 1, column: 12},
            end: {line: 1, column: 13}
          }
        }],
        loc: {
          start: {line: 1, column: 11},
          end: {line: 1, column: 14}
        }
      },
      right: {
        type: "ArrayExpression",
        elements: [{
          type: "Literal",
          value: 1,
          raw: "1",
          loc: {
            start: {line: 1, column: 18},
            end: {line: 1, column: 19}
          }
        }],
        loc: {
          start: {line: 1, column: 17},
          end: {line: 1, column: 20}
        }
      },
      loc: {
        start: {line: 1, column: 11},
        end: {line: 1, column: 20}
      }
    }],
    body: {
      type: "BlockStatement",
      body: [],
      loc: {
        start: {line: 1, column: 22},
        end: {line: 1, column: 24}
      }
    },
    generator: false,
    expression: false,
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 24}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 24}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function f([x] = [1]) { 'use strict' }", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "f",
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 10}
      }
    },
    params: [{
      type: "AssignmentPattern",
      left: {
        type: "ArrayPattern",
        elements: [{
          type: "Identifier",
          name: "x",
          loc: {
            start: {line: 1, column: 12},
            end: {line: 1, column: 13}
          }
        }],
        loc: {
          start: {line: 1, column: 11},
          end: {line: 1, column: 14}
        }
      },
      right: {
        type: "ArrayExpression",
        elements: [{
          type: "Literal",
          value: 1,
          raw: "1",
          loc: {
            start: {line: 1, column: 18},
            end: {line: 1, column: 19}
          }
        }],
        loc: {
          start: {line: 1, column: 17},
          end: {line: 1, column: 20}
        }
      },
      loc: {
        start: {line: 1, column: 11},
        end: {line: 1, column: 20}
      }
    }],
    body: {
      type: "BlockStatement",
      body: [
        {
          type: "ExpressionStatement",
          loc: {
            start: {line: 1, column: 24},
            end: {line: 1, column: 36}
          },
          expression: {
            type: "Literal",
            loc: {
              start: {line: 1, column: 24},
              end: {line: 1, column: 36}
            },
            value: "use strict",
            raw: "'use strict'"
          }
        }
      ],
      loc: {
        start: {line: 1, column: 22},
        end: {line: 1, column: 38}
      }
    },
    generator: false,
    expression: false,
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 38}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 38}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function f({x} = {x: 10}) {}", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "f",
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 10}
      }
    },
    params: [{
      type: "AssignmentPattern",
      left: {
        type: "ObjectPattern",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {line: 1, column: 12},
              end: {line: 1, column: 13}
            }
          },
          value: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {line: 1, column: 12},
              end: {line: 1, column: 13}
            }
          },
          kind: "init",
          method: false,
          shorthand: true,
          computed: false,
          loc: {
            start: {line: 1, column: 12},
            end: {line: 1, column: 13}
          }
        }],
        loc: {
          start: {line: 1, column: 11},
          end: {line: 1, column: 14}
        }
      },
      right: {
        type: "ObjectExpression",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "x",
            loc: {
              start: {line: 1, column: 18},
              end: {line: 1, column: 19}
            }
          },
          value: {
            type: "Literal",
            value: 10,
            raw: "10",
            loc: {
              start: {line: 1, column: 21},
              end: {line: 1, column: 23}
            }
          },
          kind: "init",
          method: false,
          shorthand: false,
          computed: false,
          loc: {
            start: {line: 1, column: 18},
            end: {line: 1, column: 23}
          }
        }],
        loc: {
          start: {line: 1, column: 17},
          end: {line: 1, column: 24}
        }
      },
      loc: {
        start: {line: 1, column: 11},
        end: {line: 1, column: 24}
      }
    }],
    body: {
      type: "BlockStatement",
      body: [],
      loc: {
        start: {line: 1, column: 26},
        end: {line: 1, column: 28}
      }
    },
    generator: false,
    expression: false,
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 28}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 28}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("f = function({x} = {x: 10}) {}", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "Identifier",
        name: "f",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      },
      right: {
        type: "FunctionExpression",
        id: null,
        params: [{
          type: "AssignmentPattern",
          left: {
            type: "ObjectPattern",
            properties: [{
              type: "Property",
              key: {
                type: "Identifier",
                name: "x",
                loc: {
                  start: {line: 1, column: 14},
                  end: {line: 1, column: 15}
                }
              },
              value: {
                type: "Identifier",
                name: "x",
                loc: {
                  start: {line: 1, column: 14},
                  end: {line: 1, column: 15}
                }
              },
              kind: "init",
              method: false,
              shorthand: true,
              computed: false,
              loc: {
                start: {line: 1, column: 14},
                end: {line: 1, column: 15}
              }
            }],
            loc: {
              start: {line: 1, column: 13},
              end: {line: 1, column: 16}
            }
          },
          right: {
            type: "ObjectExpression",
            properties: [{
              type: "Property",
              key: {
                type: "Identifier",
                name: "x",
                loc: {
                  start: {line: 1, column: 20},
                  end: {line: 1, column: 21}
                }
              },
              value: {
                type: "Literal",
                value: 10,
                raw: "10",
                loc: {
                  start: {line: 1, column: 23},
                  end: {line: 1, column: 25}
                }
              },
              kind: "init",
              method: false,
              shorthand: false,
              computed: false,
              loc: {
                start: {line: 1, column: 20},
                end: {line: 1, column: 25}
              }
            }],
            loc: {
              start: {line: 1, column: 19},
              end: {line: 1, column: 26}
            }
          },
          loc: {
            start: {line: 1, column: 13},
            end: {line: 1, column: 26}
          }
        }],
        body: {
          type: "BlockStatement",
          body: [],
          loc: {
            start: {line: 1, column: 28},
            end: {line: 1, column: 30}
          }
        },
        generator: false,
        expression: false,
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 30}
        }
      },
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 30}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 30}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 30}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({f: function({x} = {x: 10}) {}})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ObjectExpression",
      properties: [{
        type: "Property",
        key: {
          type: "Identifier",
          name: "f",
          loc: {
            start: {line: 1, column: 2},
            end: {line: 1, column: 3}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [{
            type: "AssignmentPattern",
            left: {
              type: "ObjectPattern",
              properties: [{
                type: "Property",
                key: {
                  type: "Identifier",
                  name: "x",
                  loc: {
                    start: {line: 1, column: 15},
                    end: {line: 1, column: 16}
                  }
                },
                value: {
                  type: "Identifier",
                  name: "x",
                  loc: {
                    start: {line: 1, column: 15},
                    end: {line: 1, column: 16}
                  }
                },
                kind: "init",
                method: false,
                shorthand: true,
                computed: false,
                loc: {
                  start: {line: 1, column: 15},
                  end: {line: 1, column: 16}
                }
              }],
              loc: {
                start: {line: 1, column: 14},
                end: {line: 1, column: 17}
              }
            },
            right: {
              type: "ObjectExpression",
              properties: [{
                type: "Property",
                key: {
                  type: "Identifier",
                  name: "x",
                  loc: {
                    start: {line: 1, column: 21},
                    end: {line: 1, column: 22}
                  }
                },
                value: {
                  type: "Literal",
                  value: 10,
                  raw: "10",
                  loc: {
                    start: {line: 1, column: 24},
                    end: {line: 1, column: 26}
                  }
                },
                kind: "init",
                method: false,
                shorthand: false,
                computed: false,
                loc: {
                  start: {line: 1, column: 21},
                  end: {line: 1, column: 26}
                }
              }],
              loc: {
                start: {line: 1, column: 20},
                end: {line: 1, column: 27}
              }
            },
            loc: {
              start: {line: 1, column: 14},
              end: {line: 1, column: 27}
            }
          }],
          body: {
            type: "BlockStatement",
            body: [],
            loc: {
              start: {line: 1, column: 29},
              end: {line: 1, column: 31}
            }
          },
          generator: false,
          expression: false,
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 31}
          }
        },
        kind: "init",
        method: false,
        shorthand: false,
        computed: false,
        loc: {
          start: {line: 1, column: 2},
          end: {line: 1, column: 31}
        }
      }],
      loc: {
        start: {line: 1, column: 1},
        end: {line: 1, column: 32}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 33}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 33}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({f({x} = {x: 10}) {}})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ObjectExpression",
      properties: [{
        type: "Property",
        key: {
          type: "Identifier",
          name: "f",
          loc: {
            start: {line: 1, column: 2},
            end: {line: 1, column: 3}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [{
            type: "AssignmentPattern",
            left: {
              type: "ObjectPattern",
              properties: [{
                type: "Property",
                key: {
                  type: "Identifier",
                  name: "x",
                  loc: {
                    start: {line: 1, column: 5},
                    end: {line: 1, column: 6}
                  }
                },
                value: {
                  type: "Identifier",
                  name: "x",
                  loc: {
                    start: {line: 1, column: 5},
                    end: {line: 1, column: 6}
                  }
                },
                kind: "init",
                method: false,
                shorthand: true,
                computed: false,
                loc: {
                  start: {line: 1, column: 5},
                  end: {line: 1, column: 6}
                }
              }],
              loc: {
                start: {line: 1, column: 4},
                end: {line: 1, column: 7}
              }
            },
            right: {
              type: "ObjectExpression",
              properties: [{
                type: "Property",
                key: {
                  type: "Identifier",
                  name: "x",
                  loc: {
                    start: {line: 1, column: 11},
                    end: {line: 1, column: 12}
                  }
                },
                value: {
                  type: "Literal",
                  value: 10,
                  raw: "10",
                  loc: {
                    start: {line: 1, column: 14},
                    end: {line: 1, column: 16}
                  }
                },
                kind: "init",
                method: false,
                shorthand: false,
                computed: false,
                loc: {
                  start: {line: 1, column: 11},
                  end: {line: 1, column: 16}
                }
              }],
              loc: {
                start: {line: 1, column: 10},
                end: {line: 1, column: 17}
              }
            },
            loc: {
              start: {line: 1, column: 4},
              end: {line: 1, column: 17}
            }
          }],
          body: {
            type: "BlockStatement",
            body: [],
            loc: {
              start: {line: 1, column: 19},
              end: {line: 1, column: 21}
            }
          },
          generator: false,
          expression: false,
          loc: {
            start: {line: 1, column: 3},
            end: {line: 1, column: 21}
          }
        },
        kind: "init",
        method: true,
        shorthand: false,
        computed: false,
        loc: {
          start: {line: 1, column: 2},
          end: {line: 1, column: 21}
        }
      }],
      loc: {
        start: {line: 1, column: 1},
        end: {line: 1, column: 22}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 23}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 23}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(class {f({x} = {x: 10}) {}})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ClassExpression",
      superClass: null,
      body: {
        type: "ClassBody",
        body: [{
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "f",
            loc: {
              start: {line: 1, column: 8},
              end: {line: 1, column: 9}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [{
              type: "AssignmentPattern",
              left: {
                type: "ObjectPattern",
                properties: [{
                  type: "Property",
                  key: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                      start: {line: 1, column: 11},
                      end: {line: 1, column: 12}
                    }
                  },
                  value: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                      start: {line: 1, column: 11},
                      end: {line: 1, column: 12}
                    }
                  },
                  kind: "init",
                  method: false,
                  shorthand: true,
                  computed: false,
                  loc: {
                    start: {line: 1, column: 11},
                    end: {line: 1, column: 12}
                  }
                }],
                loc: {
                  start: {line: 1, column: 10},
                  end: {line: 1, column: 13}
                }
              },
              right: {
                type: "ObjectExpression",
                properties: [{
                  type: "Property",
                  key: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                      start: {line: 1, column: 17},
                      end: {line: 1, column: 18}
                    }
                  },
                  value: {
                    type: "Literal",
                    value: 10,
                    raw: "10",
                    loc: {
                      start: {line: 1, column: 20},
                      end: {line: 1, column: 22}
                    }
                  },
                  kind: "init",
                  method: false,
                  shorthand: false,
                  computed: false,
                  loc: {
                    start: {line: 1, column: 17},
                    end: {line: 1, column: 22}
                  }
                }],
                loc: {
                  start: {line: 1, column: 16},
                  end: {line: 1, column: 23}
                }
              },
              loc: {
                start: {line: 1, column: 10},
                end: {line: 1, column: 23}
              }
            }],
            body: {
              type: "BlockStatement",
              body: [],
              loc: {
                start: {line: 1, column: 25},
                end: {line: 1, column: 27}
              }
            },
            generator: false,
            expression: false,
            loc: {
              start: {line: 1, column: 9},
              end: {line: 1, column: 27}
            }
          },
          kind: "method",
          static: false,
          loc: {
            start: {line: 1, column: 8},
            end: {line: 1, column: 27}
          }
        }],
        loc: {
          start: {line: 1, column: 7},
          end: {line: 1, column: 28}
        }
      },
      loc: {
        start: {line: 1, column: 1},
        end: {line: 1, column: 28}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 29}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 29}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(({x} = {x: 10}) => {})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "AssignmentPattern",
        left: {
          type: "ObjectPattern",
          properties: [{
            type: "Property",
            key: {
              type: "Identifier",
              name: "x",
              loc: {
                start: {line: 1, column: 3},
                end: {line: 1, column: 4}
              }
            },
            value: {
              type: "Identifier",
              name: "x",
              loc: {
                start: {line: 1, column: 3},
                end: {line: 1, column: 4}
              }
            },
            kind: "init",
            method: false,
            shorthand: true,
            computed: false,
            loc: {
              start: {line: 1, column: 3},
              end: {line: 1, column: 4}
            }
          }],
          loc: {
            start: {line: 1, column: 2},
            end: {line: 1, column: 5}
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [{
            type: "Property",
            key: {
              type: "Identifier",
              name: "x",
              loc: {
                start: {line: 1, column: 9},
                end: {line: 1, column: 10}
              }
            },
            value: {
              type: "Literal",
              value: 10,
              raw: "10",
              loc: {
                start: {line: 1, column: 12},
                end: {line: 1, column: 14}
              }
            },
            kind: "init",
            method: false,
            shorthand: false,
            computed: false,
            loc: {
              start: {line: 1, column: 9},
              end: {line: 1, column: 14}
            }
          }],
          loc: {
            start: {line: 1, column: 8},
            end: {line: 1, column: 15}
          }
        },
        loc: {
          start: {line: 1, column: 2},
          end: {line: 1, column: 15}
        }
      }],
      body: {
        type: "BlockStatement",
        body: [],
        loc: {
          start: {line: 1, column: 20},
          end: {line: 1, column: 22}
        }
      },
      generator: false,
      expression: false,
      loc: {
        start: {line: 1, column: 1},
        end: {line: 1, column: 22}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 23}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 23}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("x = function(y = 1) {}", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "Identifier",
        name: "x",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      },
      right: {
        type: "FunctionExpression",
        id: null,
        params: [{
          type: "AssignmentPattern",
          left: {
            type: "Identifier",
            name: "y",
            loc: {
              start: {line: 1, column: 13},
              end: {line: 1, column: 14}
            }
          },
          right: {
            type: "Literal",
            value: 1,
            raw: "1",
            loc: {
              start: {line: 1, column: 17},
              end: {line: 1, column: 18}
            }
          },
          loc: {
            start: {line: 1, column: 13},
            end: {line: 1, column: 18}
          }
        }],
        body: {
          type: "BlockStatement",
          body: [],
          loc: {
            start: {line: 1, column: 20},
            end: {line: 1, column: 22}
          }
        },
        generator: false,
        expression: false,
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 22}
        }
      },
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 22}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 22}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 22}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function f(a = 1) {}", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "f",
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 10}
      }
    },
    params: [{
      type: "AssignmentPattern",
      left: {
        type: "Identifier",
        name: "a",
        loc: {
          start: {line: 1, column: 11},
          end: {line: 1, column: 12}
        }
      },
      right: {
        type: "Literal",
        value: 1,
        raw: "1",
        loc: {
          start: {line: 1, column: 15},
          end: {line: 1, column: 16}
        }
      },
      loc: {
        start: {line: 1, column: 11},
        end: {line: 1, column: 16}
      }
    }],
    body: {
      type: "BlockStatement",
      body: [],
      loc: {
        start: {line: 1, column: 18},
        end: {line: 1, column: 20}
      }
    },
    generator: false,
    expression: false,
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 20}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 20}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("x = { f: function(a=1) {} }", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "Identifier",
        name: "x",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      },
      right: {
        type: "ObjectExpression",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "f",
            loc: {
              start: {line: 1, column: 6},
              end: {line: 1, column: 7}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [{
              type: "AssignmentPattern",
              left: {
                type: "Identifier",
                name: "a",
                loc: {
                  start: {line: 1, column: 18},
                  end: {line: 1, column: 19}
                }
              },
              right: {
                type: "Literal",
                value: 1,
                raw: "1",
                loc: {
                  start: {line: 1, column: 20},
                  end: {line: 1, column: 21}
                }
              },
              loc: {
                start: {line: 1, column: 18},
                end: {line: 1, column: 21}
              }
            }],
            body: {
              type: "BlockStatement",
              body: [],
              loc: {
                start: {line: 1, column: 23},
                end: {line: 1, column: 25}
              }
            },
            generator: false,
            expression: false,
            loc: {
              start: {line: 1, column: 9},
              end: {line: 1, column: 25}
            }
          },
          kind: "init",
          method: false,
          shorthand: false,
          computed: false,
          loc: {
            start: {line: 1, column: 6},
            end: {line: 1, column: 25}
          }
        }],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 27}
        }
      },
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 27}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 27}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 27}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("x = { f(a=1) {} }", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "Identifier",
        name: "x",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      },
      right: {
        type: "ObjectExpression",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "f",
            loc: {
              start: {line: 1, column: 6},
              end: {line: 1, column: 7}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [{
              type: "AssignmentPattern",
              left: {
                type: "Identifier",
                name: "a",
                loc: {
                  start: {line: 1, column: 8},
                  end: {line: 1, column: 9}
                }
              },
              right: {
                type: "Literal",
                value: 1,
                raw: "1",
                loc: {
                  start: {line: 1, column: 10},
                  end: {line: 1, column: 11}
                }
              },
              loc: {
                start: {line: 1, column: 8},
                end: {line: 1, column: 11}
              }
            }],
            body: {
              type: "BlockStatement",
              body: [],
              loc: {
                start: {line: 1, column: 13},
                end: {line: 1, column: 15}
              }
            },
            generator: false,
            expression: false,
            loc: {
              start: {line: 1, column: 7},
              end: {line: 1, column: 15}
            }
          },
          kind: "init",
          method: true,
          shorthand: false,
          computed: false,
          loc: {
            start: {line: 1, column: 6},
            end: {line: 1, column: 15}
          }
        }],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 17}
        }
      },
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 17}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 17}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 17}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// ES6: Rest parameters

test("function f(a, ...b) {}", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "f",
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 10}
      }
    },
    params: [
      {
        type: "Identifier",
        name: "a",
        loc: {
          start: {line: 1, column: 11},
          end: {line: 1, column: 12}
        }
      },
      {
        type: "RestElement",
        argument: {
          type: "Identifier",
          name: "b",
          loc: {
            start: {line: 1, column: 17},
            end: {line: 1, column: 18}
          }
        }
      }
    ],
    body: {
      type: "BlockStatement",
      body: [],
      loc: {
        start: {line: 1, column: 20},
        end: {line: 1, column: 22}
      }
    },
    generator: false,
    expression: false,
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 22}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 22}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// ES6: Destructured Parameters

test("function x([ a, b ]){}", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "x",
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 10}
      }
    },
    params: [{
      type: "ArrayPattern",
      elements: [
        {
          type: "Identifier",
          name: "a",
          loc: {
            start: {line: 1, column: 13},
            end: {line: 1, column: 14}
          }
        },
        {
          type: "Identifier",
          name: "b",
          loc: {
            start: {line: 1, column: 16},
            end: {line: 1, column: 17}
          }
        }
      ],
      loc: {
        start: {line: 1, column: 11},
        end: {line: 1, column: 19}
      }
    }],
    body: {
      type: "BlockStatement",
      body: [],
      loc: {
        start: {line: 1, column: 20},
        end: {line: 1, column: 22}
      }
    },
    generator: false,
    expression: false,
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 22}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 22}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function x({ a, b }){}", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "x",
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 10}
      }
    },
    params: [{
      type: "ObjectPattern",
      properties: [
        {
          type: "Property",
          key: {
            type: "Identifier",
            name: "a",
            loc: {
              start: {line: 1, column: 13},
              end: {line: 1, column: 14}
            }
          },
          value: {
            type: "Identifier",
            name: "a",
            loc: {
              start: {line: 1, column: 13},
              end: {line: 1, column: 14}
            }
          },
          kind: "init",
          method: false,
          shorthand: true,
          computed: false,
          loc: {
            start: {line: 1, column: 13},
            end: {line: 1, column: 14}
          }
        },
        {
          type: "Property",
          key: {
            type: "Identifier",
            name: "b",
            loc: {
              start: {line: 1, column: 16},
              end: {line: 1, column: 17}
            }
          },
          value: {
            type: "Identifier",
            name: "b",
            loc: {
              start: {line: 1, column: 16},
              end: {line: 1, column: 17}
            }
          },
          kind: "init",
          method: false,
          shorthand: true,
          computed: false,
          loc: {
            start: {line: 1, column: 16},
            end: {line: 1, column: 17}
          }
        }
      ],
      loc: {
        start: {line: 1, column: 11},
        end: {line: 1, column: 19}
      }
    }],
    body: {
      type: "BlockStatement",
      body: [],
      loc: {
        start: {line: 1, column: 20},
        end: {line: 1, column: 22}
      }
    },
    generator: false,
    expression: false,
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 22}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 22}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function x(a, { a }){}", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "x",
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 10}
      }
    },
    params: [
      {
        type: "Identifier",
        name: "a",
        loc: {
          start: {line: 1, column: 11},
          end: {line: 1, column: 12}
        }
      },
      {
        type: "ObjectPattern",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "a",
            loc: {
              start: {line: 1, column: 16},
              end: {line: 1, column: 17}
            }
          },
          value: {
            type: "Identifier",
            name: "a",
            loc: {
              start: {line: 1, column: 16},
              end: {line: 1, column: 17}
            }
          },
          kind: "init",
          method: false,
          shorthand: true,
          computed: false,
          loc: {
            start: {line: 1, column: 16},
            end: {line: 1, column: 17}
          }
        }],
        loc: {
          start: {line: 1, column: 14},
          end: {line: 1, column: 19}
        }
      }
    ],
    body: {
      type: "BlockStatement",
      body: [],
      loc: {
        start: {line: 1, column: 20},
        end: {line: 1, column: 22}
      }
    },
    generator: false,
    expression: false,
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 22}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 22}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

testFail("function x(...[ a, b ]){}", "Unexpected token (1:14)", {ecmaVersion: 6});

testFail("function x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){}", "Unexpected token (1:42)", {ecmaVersion: 6});

test("(function x([ a, b ]){})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "FunctionExpression",
      id: {
        type: "Identifier",
        name: "x",
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 11}
        }
      },
      params: [{
        type: "ArrayPattern",
        elements: [
          {
            type: "Identifier",
            name: "a",
            loc: {
              start: {line: 1, column: 14},
              end: {line: 1, column: 15}
            }
          },
          {
            type: "Identifier",
            name: "b",
            loc: {
              start: {line: 1, column: 17},
              end: {line: 1, column: 18}
            }
          }
        ],
        loc: {
          start: {line: 1, column: 12},
          end: {line: 1, column: 20}
        }
      }],
      body: {
        type: "BlockStatement",
        body: [],
        loc: {
          start: {line: 1, column: 21},
          end: {line: 1, column: 23}
        }
      },
      generator: false,
      expression: false,
      loc: {
        start: {line: 1, column: 1},
        end: {line: 1, column: 23}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 24}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 24}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(function x({ a, b }){})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "FunctionExpression",
      id: {
        type: "Identifier",
        name: "x",
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 11}
        }
      },
      params: [{
        type: "ObjectPattern",
        properties: [
          {
            type: "Property",
            key: {
              type: "Identifier",
              name: "a",
              loc: {
                start: {line: 1, column: 14},
                end: {line: 1, column: 15}
              }
            },
            value: {
              type: "Identifier",
              name: "a",
              loc: {
                start: {line: 1, column: 14},
                end: {line: 1, column: 15}
              }
            },
            kind: "init",
            method: false,
            shorthand: true,
            computed: false,
            loc: {
              start: {line: 1, column: 14},
              end: {line: 1, column: 15}
            }
          },
          {
            type: "Property",
            key: {
              type: "Identifier",
              name: "b",
              loc: {
                start: {line: 1, column: 17},
                end: {line: 1, column: 18}
              }
            },
            value: {
              type: "Identifier",
              name: "b",
              loc: {
                start: {line: 1, column: 17},
                end: {line: 1, column: 18}
              }
            },
            kind: "init",
            method: false,
            shorthand: true,
            computed: false,
            loc: {
              start: {line: 1, column: 17},
              end: {line: 1, column: 18}
            }
          }
        ],
        loc: {
          start: {line: 1, column: 12},
          end: {line: 1, column: 20}
        }
      }],
      body: {
        type: "BlockStatement",
        body: [],
        loc: {
          start: {line: 1, column: 21},
          end: {line: 1, column: 23}
        }
      },
      generator: false,
      expression: false,
      loc: {
        start: {line: 1, column: 1},
        end: {line: 1, column: 23}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 24}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 24}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

testFail("(function x(...[ a, b ]){})", "Unexpected token (1:15)", {ecmaVersion: 6});
testFail("var a = { set foo(...v) {} };", "Setter cannot use rest params (1:18)", {ecmaVersion: 6});
testFail("class a { set foo(...v) {} };", "Setter cannot use rest params (1:18)", {ecmaVersion: 6});

testFail("(function x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){})", "Unexpected token (1:43)", {ecmaVersion: 6});

test("({ x([ a, b ]){} })", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ObjectExpression",
      properties: [{
        type: "Property",
        key: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {line: 1, column: 3},
            end: {line: 1, column: 4}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [{
            type: "ArrayPattern",
            elements: [
              {
                type: "Identifier",
                name: "a",
                loc: {
                  start: {line: 1, column: 7},
                  end: {line: 1, column: 8}
                }
              },
              {
                type: "Identifier",
                name: "b",
                loc: {
                  start: {line: 1, column: 10},
                  end: {line: 1, column: 11}
                }
              }
            ],
            loc: {
              start: {line: 1, column: 5},
              end: {line: 1, column: 13}
            }
          }],
          body: {
            type: "BlockStatement",
            body: [],
            loc: {
              start: {line: 1, column: 14},
              end: {line: 1, column: 16}
            }
          },
          generator: false,
          expression: false,
          loc: {
            start: {line: 1, column: 4},
            end: {line: 1, column: 16}
          }
        },
        kind: "init",
        method: true,
        shorthand: false,
        computed: false,
        loc: {
          start: {line: 1, column: 3},
          end: {line: 1, column: 16}
        }
      }],
      loc: {
        start: {line: 1, column: 1},
        end: {line: 1, column: 18}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 19}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 19}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({ x(...[ a, b ]){} })", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ObjectExpression",
      properties: [{
        type: "Property",
        key: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {line: 1, column: 3},
            end: {line: 1, column: 4}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [{
            type: "RestElement",
            argument: {
              type: "ArrayPattern",
              elements: [
                {
                  type: "Identifier",
                  name: "a",
                  loc: {
                    start: {line: 1, column: 10},
                    end: {line: 1, column: 11}
                  }
                },
                {
                  type: "Identifier",
                  name: "b",
                  loc: {
                    start: {line: 1, column: 13},
                    end: {line: 1, column: 14}
                  }
                }
              ],
              loc: {
                start: {line: 1, column: 8},
                end: {line: 1, column: 16}
              }
            }
          }],
          body: {
            type: "BlockStatement",
            body: [],
            loc: {
              start: {line: 1, column: 17},
              end: {line: 1, column: 19}
            }
          },
          generator: false,
          expression: false,
          loc: {
            start: {line: 1, column: 4},
            end: {line: 1, column: 19}
          }
        },
        kind: "init",
        method: true,
        shorthand: false,
        computed: false,
        loc: {
          start: {line: 1, column: 3},
          end: {line: 1, column: 19}
        }
      }],
      loc: {
        start: {line: 1, column: 1},
        end: {line: 1, column: 21}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 22}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 22}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({ x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){} })", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ObjectExpression",
      properties: [{
        type: "Property",
        key: {
          type: "Identifier",
          name: "x",
          loc: {
            start: {line: 1, column: 3},
            end: {line: 1, column: 4}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [
          {
            type: "ObjectPattern",
            properties: [
              {
                type: "Property",
                key: {
                  type: "Identifier",
                  name: "a",
                  loc: {
                    start: {line: 1, column: 7},
                    end: {line: 1, column: 8}
                  }
                },
                value: {
                  type: "ObjectPattern",
                  properties: [
                    {
                      type: "Property",
                      key: {
                        type: "Identifier",
                        name: "w",
                        loc: {
                          start: {line: 1, column: 12},
                          end: {line: 1, column: 13}
                        }
                      },
                      value: {
                        type: "Identifier",
                        name: "w",
                        loc: {
                          start: {line: 1, column: 12},
                          end: {line: 1, column: 13}
                        }
                      },
                      kind: "init",
                      method: false,
                      shorthand: true,
                      computed: false,
                      loc: {
                        start: {line: 1, column: 12},
                        end: {line: 1, column: 13}
                      }
                    },
                    {
                      type: "Property",
                      key: {
                        type: "Identifier",
                        name: "x",
                        loc: {
                          start: {line: 1, column: 15},
                          end: {line: 1, column: 16}
                        }
                      },
                      value: {
                        type: "Identifier",
                        name: "x",
                        loc: {
                          start: {line: 1, column: 15},
                          end: {line: 1, column: 16}
                        }
                      },
                      kind: "init",
                      method: false,
                      shorthand: true,
                      computed: false,
                      loc: {
                        start: {line: 1, column: 15},
                        end: {line: 1, column: 16}
                      }
                    }
                  ],
                  loc: {
                    start: {line: 1, column: 10},
                    end: {line: 1, column: 18}
                  }
                },
                kind: "init",
                method: false,
                shorthand: false,
                computed: false,
                loc: {
                  start: {line: 1, column: 7},
                  end: {line: 1, column: 18}
                }
              },
              {
                type: "Property",
                key: {
                  type: "Identifier",
                  name: "b",
                  loc: {
                    start: {line: 1, column: 20},
                    end: {line: 1, column: 21}
                  }
                },
                value: {
                  type: "ArrayPattern",
                  elements: [
                    {
                      type: "Identifier",
                      name: "y",
                      loc: {
                        start: {line: 1, column: 24},
                        end: {line: 1, column: 25}
                      }
                    },
                    {
                      type: "Identifier",
                      name: "z",
                      loc: {
                        start: {line: 1, column: 27},
                        end: {line: 1, column: 28}
                      }
                    }
                  ],
                  loc: {
                    start: {line: 1, column: 23},
                    end: {line: 1, column: 29}
                  }
                },
                kind: "init",
                method: false,
                shorthand: false,
                computed: false,
                loc: {
                  start: {line: 1, column: 20},
                  end: {line: 1, column: 29}
                }
              }
            ],
            loc: {
              start: {line: 1, column: 5},
              end: {line: 1, column: 31}
            }
          },
          {
            type: "RestElement",
            argument: {
              type: "ArrayPattern",
              elements: [
                {
                  type: "Identifier",
                  name: "a",
                  loc: {
                    start: {line: 1, column: 37},
                    end: {line: 1, column: 38}
                  }
                },
                {
                  type: "Identifier",
                  name: "b",
                  loc: {
                    start: {line: 1, column: 40},
                    end: {line: 1, column: 41}
                  }
                },
                {
                  type: "Identifier",
                  name: "c",
                  loc: {
                    start: {line: 1, column: 43},
                    end: {line: 1, column: 44}
                  }
                }
              ],
              loc: {
                start: {line: 1, column: 36},
                end: {line: 1, column: 45}
              }
            }
          }
          ],
          body: {
            type: "BlockStatement",
            body: [],
            loc: {
              start: {line: 1, column: 46},
              end: {line: 1, column: 48}
            }
          },
          generator: false,
          expression: false,
          loc: {
            start: {line: 1, column: 4},
            end: {line: 1, column: 48}
          }
        },
        kind: "init",
        method: true,
        shorthand: false,
        computed: false,
        loc: {
          start: {line: 1, column: 3},
          end: {line: 1, column: 48}
        }
      }],
      loc: {
        start: {line: 1, column: 1},
        end: {line: 1, column: 50}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 51}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 51}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(...a) => {}", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "RestElement",
        argument: {
          type: "Identifier",
          name: "a",
          loc: {
            start: {line: 1, column: 4},
            end: {line: 1, column: 5}
          }
        }
      }],
      body: {
        type: "BlockStatement",
        body: [],
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 12}
        }
      },
      generator: false,
      expression: false,
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 12}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 12}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 12}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(a, ...b) => {}", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [
        {
          type: "Identifier",
          name: "a",
          loc: {
            start: {line: 1, column: 1},
            end: {line: 1, column: 2}
          }
        },
        {
          type: "RestElement",
          argument: {
            type: "Identifier",
            name: "b",
            loc: {
              start: {line: 1, column: 7},
              end: {line: 1, column: 8}
            }
          }
        }
      ],
      body: {
        type: "BlockStatement",
        body: [],
        loc: {
          start: {line: 1, column: 13},
          end: {line: 1, column: 15}
        }
      },
      generator: false,
      expression: false,
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 15}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 15}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 15}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({ a }) => {}", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "ObjectPattern",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "a",
            loc: {
              start: {line: 1, column: 3},
              end: {line: 1, column: 4}
            }
          },
          value: {
            type: "Identifier",
            name: "a",
            loc: {
              start: {line: 1, column: 3},
              end: {line: 1, column: 4}
            }
          },
          kind: "init",
          method: false,
          shorthand: true,
          computed: false,
          loc: {
            start: {line: 1, column: 3},
            end: {line: 1, column: 4}
          }
        }],
        loc: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 6}
        }
      }],
      body: {
        type: "BlockStatement",
        body: [],
        loc: {
          start: {line: 1, column: 11},
          end: {line: 1, column: 13}
        }
      },
      generator: false,
      expression: false,
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 13}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 13}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 13}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({ a }, ...b) => {}", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [
        {
          type: "ObjectPattern",
          properties: [{
            type: "Property",
            key: {
              type: "Identifier",
              name: "a",
              loc: {
                start: {line: 1, column: 3},
                end: {line: 1, column: 4}
              }
            },
            value: {
              type: "Identifier",
              name: "a",
              loc: {
                start: {line: 1, column: 3},
                end: {line: 1, column: 4}
              }
            },
            kind: "init",
            method: false,
            shorthand: true,
            computed: false,
            loc: {
              start: {line: 1, column: 3},
              end: {line: 1, column: 4}
            }
          }],
          loc: {
            start: {line: 1, column: 1},
            end: {line: 1, column: 6}
          }
        },
        {
          type: "RestElement",
          argument: {
            type: "Identifier",
            name: "b",
            loc: {
              start: {line: 1, column: 11},
              end: {line: 1, column: 12}
            }
          }
        }
      ],
      body: {
        type: "BlockStatement",
        body: [],
        loc: {
          start: {line: 1, column: 17},
          end: {line: 1, column: 19}
        }
      },
      generator: false,
      expression: false,
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 19}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 19}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 19}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

testFail("(...[a, b]) => {}", "Unexpected token (1:4)", {ecmaVersion: 6 });

testFail("(a, ...[b]) => {}", "Unexpected token (1:7)", {ecmaVersion: 6 });

test("({ a: [a, b] }, ...c) => {}", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [
        {
          type: "ObjectPattern",
          properties: [{
            type: "Property",
            key: {
              type: "Identifier",
              name: "a",
              loc: {
                start: {line: 1, column: 3},
                end: {line: 1, column: 4}
              }
            },
            value: {
              type: "ArrayPattern",
              elements: [
                {
                  type: "Identifier",
                  name: "a",
                  loc: {
                    start: {line: 1, column: 7},
                    end: {line: 1, column: 8}
                  }
                },
                {
                  type: "Identifier",
                  name: "b",
                  loc: {
                    start: {line: 1, column: 10},
                    end: {line: 1, column: 11}
                  }
                }
              ],
              loc: {
                start: {line: 1, column: 6},
                end: {line: 1, column: 12}
              }
            },
            kind: "init",
            method: false,
            shorthand: false,
            computed: false,
            loc: {
              start: {line: 1, column: 3},
              end: {line: 1, column: 12}
            }
          }],
          loc: {
            start: {line: 1, column: 1},
            end: {line: 1, column: 14}
          }
        },
        {
          type: "RestElement",
          argument: {
            type: "Identifier",
            name: "c",
            loc: {
              start: {line: 1, column: 19},
              end: {line: 1, column: 20}
            }
          }
        }
      ],
      body: {
        type: "BlockStatement",
        body: [],
        loc: {
          start: {line: 1, column: 25},
          end: {line: 1, column: 27}
        }
      },
      generator: false,
      expression: false,
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 27}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 27}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 27}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({ a: b, c }, [d, e], ...f) => {}", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [
        {
          type: "ObjectPattern",
          properties: [
            {
              type: "Property",
              key: {
                type: "Identifier",
                name: "a",
                loc: {
                  start: {line: 1, column: 3},
                  end: {line: 1, column: 4}
                }
              },
              value: {
                type: "Identifier",
                name: "b",
                loc: {
                  start: {line: 1, column: 6},
                  end: {line: 1, column: 7}
                }
              },
              kind: "init",
              method: false,
              shorthand: false,
              computed: false,
              loc: {
                start: {line: 1, column: 3},
                end: {line: 1, column: 7}
              }
            },
            {
              type: "Property",
              key: {
                type: "Identifier",
                name: "c",
                loc: {
                  start: {line: 1, column: 9},
                  end: {line: 1, column: 10}
                }
              },
              value: {
                type: "Identifier",
                name: "c",
                loc: {
                  start: {line: 1, column: 9},
                  end: {line: 1, column: 10}
                }
              },
              kind: "init",
              method: false,
              shorthand: true,
              computed: false,
              loc: {
                start: {line: 1, column: 9},
                end: {line: 1, column: 10}
              }
            }
          ],
          loc: {
            start: {line: 1, column: 1},
            end: {line: 1, column: 12}
          }
        },
        {
          type: "ArrayPattern",
          elements: [
            {
              type: "Identifier",
              name: "d",
              loc: {
                start: {line: 1, column: 15},
                end: {line: 1, column: 16}
              }
            },
            {
              type: "Identifier",
              name: "e",
              loc: {
                start: {line: 1, column: 18},
                end: {line: 1, column: 19}
              }
            }
          ],
          loc: {
            start: {line: 1, column: 14},
            end: {line: 1, column: 20}
          }
        },
        {
          type: "RestElement",
          argument: {
            type: "Identifier",
            name: "f",
            loc: {
              start: {line: 1, column: 25},
              end: {line: 1, column: 26}
            }
          }
        }
      ],
      body: {
        type: "BlockStatement",
        body: [],
        loc: {
          start: {line: 1, column: 31},
          end: {line: 1, column: 33}
        }
      },
      generator: false,
      expression: false,
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 33}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 33}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 33}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// ES6: SpreadElement

test("[...a] = b", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "ArrayPattern",
        elements: [{
          type: "RestElement",
          argument: {
            type: "Identifier",
            name: "a",
            loc: {
              start: {line: 1, column: 4},
              end: {line: 1, column: 5}
            }
          },
          loc: {
            start: {line: 1, column: 1},
            end: {line: 1, column: 5}
          }
        }],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 6}
        }
      },
      right: {
        type: "Identifier",
        name: "b",
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 10}
        }
      },
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 10}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 10}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 10}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("[a, ...b] = c", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "ArrayPattern",
        elements: [
          {
            type: "Identifier",
            name: "a",
            loc: {
              start: {line: 1, column: 1},
              end: {line: 1, column: 2}
            }
          },
          {
            type: "RestElement",
            argument: {
              type: "Identifier",
              name: "b",
              loc: {
                start: {line: 1, column: 7},
                end: {line: 1, column: 8}
              }
            },
            loc: {
              start: {line: 1, column: 4},
              end: {line: 1, column: 8}
            }
          }
        ],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 9}
        }
      },
      right: {
        type: "Identifier",
        name: "c",
        loc: {
          start: {line: 1, column: 12},
          end: {line: 1, column: 13}
        }
      },
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 13}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 13}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 13}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("[{ a, b }, ...c] = d", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "ArrayPattern",
        elements: [
          {
            type: "ObjectPattern",
            properties: [
              {
                type: "Property",
                key: {
                  type: "Identifier",
                  name: "a",
                  loc: {
                    start: {line: 1, column: 3},
                    end: {line: 1, column: 4}
                  }
                },
                value: {
                  type: "Identifier",
                  name: "a",
                  loc: {
                    start: {line: 1, column: 3},
                    end: {line: 1, column: 4}
                  }
                },
                kind: "init",
                method: false,
                shorthand: true,
                computed: false,
                loc: {
                  start: {line: 1, column: 3},
                  end: {line: 1, column: 4}
                }
              },
              {
                type: "Property",
                key: {
                  type: "Identifier",
                  name: "b",
                  loc: {
                    start: {line: 1, column: 6},
                    end: {line: 1, column: 7}
                  }
                },
                value: {
                  type: "Identifier",
                  name: "b",
                  loc: {
                    start: {line: 1, column: 6},
                    end: {line: 1, column: 7}
                  }
                },
                kind: "init",
                method: false,
                shorthand: true,
                computed: false,
                loc: {
                  start: {line: 1, column: 6},
                  end: {line: 1, column: 7}
                }
              }
            ],
            loc: {
              start: {line: 1, column: 1},
              end: {line: 1, column: 9}
            }
          },
          {
            type: "RestElement",
            argument: {
              type: "Identifier",
              name: "c",
              loc: {
                start: {line: 1, column: 14},
                end: {line: 1, column: 15}
              }
            },
            loc: {
              start: {line: 1, column: 11},
              end: {line: 1, column: 15}
            }
          }
        ],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 16}
        }
      },
      right: {
        type: "Identifier",
        name: "d",
        loc: {
          start: {line: 1, column: 19},
          end: {line: 1, column: 20}
        }
      },
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 20}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 20}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 20}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("[a, ...[b, c]] = d", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "ArrayPattern",
        elements: [
          {
            type: "Identifier",
            name: "a",
            loc: {
              start: {line: 1, column: 1},
              end: {line: 1, column: 2}
            }
          },
          {
            type: "RestElement",
            argument: {
              type: "ArrayPattern",
              elements: [
                {
                  type: "Identifier",
                  name: "b",
                  loc: {
                    start: {line: 1, column: 8},
                    end: {line: 1, column: 9}
                  }
                },
                {
                  type: "Identifier",
                  name: "c",
                  loc: {
                    start: {line: 1, column: 11},
                    end: {line: 1, column: 12}
                  }
                }
              ],
              loc: {
                start: {line: 1, column: 7},
                end: {line: 1, column: 13}
              }
            },
            loc: {
              start: {line: 1, column: 4},
              end: {line: 1, column: 13}
            }
          }
        ],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 14}
        }
      },
      right: {
        type: "Identifier",
        name: "d",
        loc: {
          start: {line: 1, column: 17},
          end: {line: 1, column: 18}
        }
      },
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 18}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 18}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 18}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var [...a] = b", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "ArrayPattern",
        elements: [{
          type: "RestElement",
          argument: {
            type: "Identifier",
            name: "a",
            loc: {
              start: {line: 1, column: 8},
              end: {line: 1, column: 9}
            }
          },
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 9}
          }
        }],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 10}
        }
      },
      init: {
        type: "Identifier",
        name: "b",
        loc: {
          start: {line: 1, column: 13},
          end: {line: 1, column: 14}
        }
      },
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 14}
      }
    }],
    kind: "var",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 14}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 14}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var [a, ...b] = c", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "ArrayPattern",
        elements: [
          {
            type: "Identifier",
            name: "a",
            loc: {
              start: {line: 1, column: 5},
              end: {line: 1, column: 6}
            }
          },
          {
            type: "RestElement",
            argument: {
              type: "Identifier",
              name: "b",
              loc: {
                start: {line: 1, column: 11},
                end: {line: 1, column: 12}
              }
            },
            loc: {
              start: {line: 1, column: 8},
              end: {line: 1, column: 12}
            }
          }
        ],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 13}
        }
      },
      init: {
        type: "Identifier",
        name: "c",
        loc: {
          start: {line: 1, column: 16},
          end: {line: 1, column: 17}
        }
      },
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 17}
      }
    }],
    kind: "var",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 17}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 17}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var [{ a, b }, ...c] = d", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "ArrayPattern",
        elements: [
          {
            type: "ObjectPattern",
            properties: [
              {
                type: "Property",
                key: {
                  type: "Identifier",
                  name: "a",
                  loc: {
                    start: {line: 1, column: 7},
                    end: {line: 1, column: 8}
                  }
                },
                value: {
                  type: "Identifier",
                  name: "a",
                  loc: {
                    start: {line: 1, column: 7},
                    end: {line: 1, column: 8}
                  }
                },
                kind: "init",
                method: false,
                shorthand: true,
                computed: false,
                loc: {
                  start: {line: 1, column: 7},
                  end: {line: 1, column: 8}
                }
              },
              {
                type: "Property",
                key: {
                  type: "Identifier",
                  name: "b",
                  loc: {
                    start: {line: 1, column: 10},
                    end: {line: 1, column: 11}
                  }
                },
                value: {
                  type: "Identifier",
                  name: "b",
                  loc: {
                    start: {line: 1, column: 10},
                    end: {line: 1, column: 11}
                  }
                },
                kind: "init",
                method: false,
                shorthand: true,
                computed: false,
                loc: {
                  start: {line: 1, column: 10},
                  end: {line: 1, column: 11}
                }
              }
            ],
            loc: {
              start: {line: 1, column: 5},
              end: {line: 1, column: 13}
            }
          },
          {
            type: "RestElement",
            argument: {
              type: "Identifier",
              name: "c",
              loc: {
                start: {line: 1, column: 18},
                end: {line: 1, column: 19}
              }
            },
            loc: {
              start: {line: 1, column: 15},
              end: {line: 1, column: 19}
            }
          }
        ],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 20}
        }
      },
      init: {
        type: "Identifier",
        name: "d",
        loc: {
          start: {line: 1, column: 23},
          end: {line: 1, column: 24}
        }
      },
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 24}
      }
    }],
    kind: "var",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 24}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 24}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var [a, ...[b, c]] = d", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "ArrayPattern",
        elements: [
          {
            type: "Identifier",
            name: "a",
            loc: {
              start: {line: 1, column: 5},
              end: {line: 1, column: 6}
            }
          },
          {
            type: "RestElement",
            argument: {
              type: "ArrayPattern",
              elements: [
                {
                  type: "Identifier",
                  name: "b",
                  loc: {
                    start: {line: 1, column: 12},
                    end: {line: 1, column: 13}
                  }
                },
                {
                  type: "Identifier",
                  name: "c",
                  loc: {
                    start: {line: 1, column: 15},
                    end: {line: 1, column: 16}
                  }
                }
              ],
              loc: {
                start: {line: 1, column: 11},
                end: {line: 1, column: 17}
              }
            },
            loc: {
              start: {line: 1, column: 8},
              end: {line: 1, column: 17}
            }
          }
        ],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 18}
        }
      },
      init: {
        type: "Identifier",
        name: "d",
        loc: {
          start: {line: 1, column: 21},
          end: {line: 1, column: 22}
        }
      },
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 22}
      }
    }],
    kind: "var",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 22}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 22}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("func(...a)", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "CallExpression",
      callee: {
        type: "Identifier",
        name: "func",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 4}
        }
      },
      arguments: [{
        type: "SpreadElement",
        argument: {
          type: "Identifier",
          name: "a",
          loc: {
            start: {line: 1, column: 8},
            end: {line: 1, column: 9}
          }
        },
        loc: {
          start: {line: 1, column: 5},
          end: {line: 1, column: 9}
        }
      }],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 10}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 10}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 10}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("func(a, ...b)", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "CallExpression",
      callee: {
        type: "Identifier",
        name: "func",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 4}
        }
      },
      arguments: [
        {
          type: "Identifier",
          name: "a",
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 6}
          }
        },
        {
          type: "SpreadElement",
          argument: {
            type: "Identifier",
            name: "b",
            loc: {
              start: {line: 1, column: 11},
              end: {line: 1, column: 12}
            }
          },
          loc: {
            start: {line: 1, column: 8},
            end: {line: 1, column: 12}
          }
        }
      ],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 13}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 13}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 13}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("func(...a, b)", {
  type: "Program",
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 13}
  },
  body: [{
    type: "ExpressionStatement",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 13}
    },
    expression: {
      type: "CallExpression",
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 13}
      },
      callee: {
        type: "Identifier",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 4}
        },
        name: "func"
      },
      arguments: [
        {
          type: "SpreadElement",
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 9}
          },
          argument: {
            type: "Identifier",
            loc: {
              start: {line: 1, column: 8},
              end: {line: 1, column: 9}
            },
            name: "a"
          }
        },
        {
          type: "Identifier",
          loc: {
            start: {line: 1, column: 11},
            end: {line: 1, column: 12}
          },
          name: "b"
        }
      ]
    }
  }]
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("/[a-z]/u", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        regex: {
          pattern: "[a-z]",
          flags: "u"
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 8
          }
        }
      }
    }
  ]
}, {
  locations: true,
  ecmaVersion: 6
});

test("/[\\uD834\\uDF06-\\uD834\\uDF08a-z]/u", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        regex: {
          pattern: "[\\uD834\\uDF06-\\uD834\\uDF08a-z]",
          flags: "u"
        },
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 33
          }
        }
      }
    }
  ]
}, {
  locations: true,
  ecmaVersion: 6
});

test("do {} while (false) foo();", {
  type: "Program",
  start: 0,
  end: 26,
  body: [
    {
      type: "DoWhileStatement",
      start: 0,
      end: 19,
      body: {
        type: "BlockStatement",
        start: 3,
        end: 5,
        body: []
      },
      test: {
        type: "Literal",
        start: 13,
        end: 18,
        value: false,
        raw: "false"
      }
    },
    {
      type: "ExpressionStatement",
      start: 20,
      end: 26,
      expression: {
        type: "CallExpression",
        start: 20,
        end: 25,
        callee: {
          type: "Identifier",
          start: 20,
          end: 23,
          name: "foo"
        },
        arguments: []
      }
    }
  ]
}, {
  ecmaVersion: 6
});

// Harmony Invalid syntax

testFail("0o", "Expected number in radix 8 (1:2)", {ecmaVersion: 6});

testFail("0o1a", "Identifier directly after number (1:3)", {ecmaVersion: 6});

testFail("0o9", "Expected number in radix 8 (1:2)", {ecmaVersion: 6});

testFail("0o18", "Unexpected token (1:3)", {ecmaVersion: 6});

testFail("0O", "Expected number in radix 8 (1:2)", {ecmaVersion: 6});

testFail("0O1a", "Identifier directly after number (1:3)", {ecmaVersion: 6});

testFail("0O9", "Expected number in radix 8 (1:2)", {ecmaVersion: 6});

testFail("0O18", "Unexpected token (1:3)", {ecmaVersion: 6});

testFail("0b", "Expected number in radix 2 (1:2)", {ecmaVersion: 6});

testFail("0b1a", "Identifier directly after number (1:3)", {ecmaVersion: 6});

testFail("0b9", "Expected number in radix 2 (1:2)", {ecmaVersion: 6});

testFail("0b18", "Unexpected token (1:3)", {ecmaVersion: 6});

testFail("0b12", "Unexpected token (1:3)", {ecmaVersion: 6});

testFail("0B", "Expected number in radix 2 (1:2)", {ecmaVersion: 6});

testFail("0B1a", "Identifier directly after number (1:3)", {ecmaVersion: 6});

testFail("0B9", "Expected number in radix 2 (1:2)", {ecmaVersion: 6});

testFail("0B18", "Unexpected token (1:3)", {ecmaVersion: 6});

testFail("0B12", "Unexpected token (1:3)", {ecmaVersion: 6});

testFail("\"\\u{110000}\"", "Code point out of bounds (1:4)", {ecmaVersion: 6});

testFail("\"\\u{}\"", "Bad character escape sequence (1:4)", {ecmaVersion: 6});

testFail("\"\\u{FFFF\"", "Bad character escape sequence (1:4)", {ecmaVersion: 6});

testFail("\"\\u{FFZ}\"", "Bad character escape sequence (1:4)", {ecmaVersion: 6});

testFail("[v] += ary", "Assigning to rvalue (1:0)", {ecmaVersion: 6});

testFail("[2] = 42", "Assigning to rvalue (1:1)", {ecmaVersion: 6});

testFail("({ obj:20 }) = 42", "Assigning to rvalue (1:7)", {ecmaVersion: 6});

testFail("( { get x() {} } ) = 0", "Object pattern can't contain getter or setter (1:8)", {ecmaVersion: 6});

testFail("x \n is y", "Unexpected token (2:4)", {ecmaVersion: 6});

testFail("x \n isnt y", "Unexpected token (2:6)", {ecmaVersion: 6});

testFail("function default() {}", "Unexpected token (1:9)", {ecmaVersion: 6});

testFail("function hello() {'use strict'; ({ i: 10, s(eval) { } }); }", "Binding eval in strict mode (1:44)", {ecmaVersion: 6});

testFail("function a() { \"use strict\"; ({ b(t, t) { } }); }", "Argument name clash (1:37)", {ecmaVersion: 6});

testFail("var super", "Unexpected token (1:4)", {ecmaVersion: 6});

testFail("var default", "Unexpected token (1:4)", {ecmaVersion: 6});

testFail("let default", "Unexpected token (1:4)", {ecmaVersion: 6});

testFail("const default", "Unexpected token (1:6)", {ecmaVersion: 6});

testFail("\"use strict\"; ({ v: eval }) = obj", "Assigning to eval in strict mode (1:20)", {ecmaVersion: 6});

testFail("\"use strict\"; ({ v: arguments }) = obj", "Assigning to arguments in strict mode (1:20)", {ecmaVersion: 6});

testFail("for (let x = 42 in list) process(x);", "Unexpected token (1:16)", {ecmaVersion: 6});

testFail("for (let x = 42 of list) process(x);", "Unexpected token (1:16)", {ecmaVersion: 6});

testFail("import foo", "Unexpected token (1:10)", {ecmaVersion: 6, sourceType: "module"});

testFail("import { foo, bar }", "Unexpected token (1:19)", {ecmaVersion: 6, sourceType: "module"});

testFail("import foo from bar", "Unexpected token (1:16)", {ecmaVersion: 6, sourceType: "module"});

testFail("((a)) => 42", "Unexpected token (1:1)", {ecmaVersion: 6});

testFail("(a, (b)) => 42", "Unexpected token (1:4)", {ecmaVersion: 6});

testFail("\"use strict\"; (eval = 10) => 42", "Assigning to eval in strict mode (1:15)", {ecmaVersion: 6});

testFail("\"use strict\"; eval => 42", "Binding eval in strict mode (1:14)", {ecmaVersion: 6});

testFail("\"use strict\"; arguments => 42", "Binding arguments in strict mode (1:14)", {ecmaVersion: 6});

testFail("\"use strict\"; (eval, a) => 42", "Binding eval in strict mode (1:15)", {ecmaVersion: 6});

testFail("\"use strict\"; (arguments, a) => 42", "Binding arguments in strict mode (1:15)", {ecmaVersion: 6});

testFail("\"use strict\"; (eval, a = 10) => 42", "Binding eval in strict mode (1:15)", {ecmaVersion: 6});

testFail("(a, a) => 42", "Argument name clash (1:4)", {ecmaVersion: 6});

testFail("\"use strict\"; (a, a) => 42", "Argument name clash (1:18)", {ecmaVersion: 6});

testFail("\"use strict\"; (a) => 00", "Invalid number (1:21)", {ecmaVersion: 6});

testFail("() <= 42", "Unexpected token (1:1)", {ecmaVersion: 6});

testFail("(10) => 00", "Assigning to rvalue (1:1)", {ecmaVersion: 6});

testFail("(10, 20) => 00", "Assigning to rvalue (1:1)", {ecmaVersion: 6});

testFail("yield v", "Unexpected token (1:6)", {ecmaVersion: 6});

testFail("yield 10", "Unexpected token (1:6)", {ecmaVersion: 6});

testFail("void { [1, 2]: 3 };", "Unexpected token (1:9)", {ecmaVersion: 6});

testFail("let [this] = [10]", "Unexpected token (1:5)", {ecmaVersion: 6});
testFail("let {this} = x", "'this' can not be used as shorthand property (1:5)", {ecmaVersion: 6});
testFail("let [function] = [10]", "Unexpected token (1:5)", {ecmaVersion: 6});
testFail("let [function] = x", "Unexpected token (1:5)", {ecmaVersion: 6});
testFail("([function] = [10])", "Unexpected token (1:10)", {ecmaVersion: 6});
testFail("([this] = [10])", "Assigning to rvalue (1:2)", {ecmaVersion: 6});
testFail("({this} = x)", "'this' can not be used as shorthand property (1:2)", {ecmaVersion: 6});
testFail("var x = {this}", "'this' can not be used as shorthand property (1:9)", {ecmaVersion: 6});

test("yield* 10", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "BinaryExpression",
      operator: "*",
      left: {
        type: "Identifier",
        name: "yield",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 5}
        }
      },
      right: {
        type: "Literal",
        value: 10,
        raw: "10",
        loc: {
          start: {line: 1, column: 7},
          end: {line: 1, column: 9}
        }
      },
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 9}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 9}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 9}
  }
}, {
  ecmaVersion: 6,
  loose: false,
  ranges: true,
  locations: true
});

test("e => yield* 10", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "Identifier",
        name: "e",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      }],
      body: {
        type: "BinaryExpression",
        operator: "*",
        left: {
          type: "Identifier",
          name: "yield",
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 10}
          }
        },
        right: {
          type: "Literal",
          value: 10,
          raw: "10",
          loc: {
            start: {line: 1, column: 12},
            end: {line: 1, column: 14}
          }
        },
        loc: {
          start: {line: 1, column: 5},
          end: {line: 1, column: 14}
        }
      },
      generator: false,
      expression: true,
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 14}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 14}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 14}
  }
}, {
  ecmaVersion: 6,
  loose: false,
  ranges: true,
  locations: true
});

testFail("(function () { yield 10 })", "Unexpected token (1:21)", {ecmaVersion: 6});

test("(function () { yield* 10 })", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "FunctionExpression",
      id: null,
      params: [],
      body: {
        type: "BlockStatement",
        body: [{
          type: "ExpressionStatement",
          expression: {
            type: "BinaryExpression",
            operator: "*",
            left: {
              type: "Identifier",
              name: "yield",
              loc: {
                start: {line: 1, column: 15},
                end: {line: 1, column: 20}
              }
            },
            right: {
              type: "Literal",
              value: 10,
              raw: "10",
              loc: {
                start: {line: 1, column: 22},
                end: {line: 1, column: 24}
              }
            },
            loc: {
              start: {line: 1, column: 15},
              end: {line: 1, column: 24}
            }
          },
          loc: {
            start: {line: 1, column: 15},
            end: {line: 1, column: 24}
          }
        }],
        loc: {
          start: {line: 1, column: 13},
          end: {line: 1, column: 26}
        }
      },
      generator: false,
      expression: false,
      loc: {
        start: {line: 1, column: 1},
        end: {line: 1, column: 26}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 27}
    }
  }],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 27}
  }
}, {
  ecmaVersion: 6,
  loose: false,
  ranges: true,
  locations: true
});

test("let + 1", {
  "type": "Program",
  "body": [
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "BinaryExpression",
        "left": {
          "type": "Identifier",
          "name": "let"
        },
        "operator": "+",
        "right": {
          "type": "Literal",
          "value": 1,
          "raw": "1"
        }
      }
    }
  ]
}, {ecmaVersion: 6})

test("var let = 1", {
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "let"
          },
          "init": {
            "type": "Literal",
            "value": 1,
            "raw": "1"
          }
        }
      ],
      "kind": "var"
    }
  ]
}, {ecmaVersion: 6})

testFail("'use strict'; let + 1", "The keyword 'let' is reserved (1:14)", {ecmaVersion: 6})

test("var yield = 2", {
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "yield"
          },
          "init": {
            "type": "Literal",
            "value": 2,
            "raw": "2"
          }
        }
      ],
      "kind": "var"
    }
  ]
}, {ecmaVersion: 6})

testFail("(function() { \"use strict\"; f(yield v) })", "The keyword 'yield' is reserved (1:30)", {ecmaVersion: 6});

testFail("var obj = { *test** }", "Unexpected token (1:17)", {ecmaVersion: 6});

testFail("class A extends yield B { }", "Unexpected token (1:22)", {ecmaVersion: 6});

testFail("class default", "Unexpected token (1:6)", {ecmaVersion: 6});

testFail("`test", "Unterminated template (1:1)", {ecmaVersion: 6});

testFail("switch `test`", "Unexpected token (1:7)", {ecmaVersion: 6});

testFail("`hello ${10 `test`", "Unexpected token (1:18)", {ecmaVersion: 6});

testFail("`hello ${10;test`", "Unexpected token (1:11)", {ecmaVersion: 6});

testFail("function a() 1 // expression closure is not supported", "Unexpected token (1:13)", {ecmaVersion: 6});

testFail("({ \"chance\" }) = obj", "Unexpected token (1:12)", {ecmaVersion: 6});

testFail("({ 42 }) = obj", "Unexpected token (1:6)", {ecmaVersion: 6});

testFail("function f(a, ...b, c)", "Comma is not permitted after the rest element (1:18)", {ecmaVersion: 6});

testFail("function f(a, ...b = 0)", "Unexpected token (1:19)", {ecmaVersion: 6});

testFail("function x(...{ a }){}", "Unexpected token (1:14)", {ecmaVersion: 6});

testFail("\"use strict\"; function x(a, { a }){}", "Argument name clash (1:30)", {ecmaVersion: 6});

testFail("\"use strict\"; function x({ b: { a } }, [{ b: { a } }]){}", "Argument name clash (1:47)", {ecmaVersion: 6});

testFail("\"use strict\"; function x(a, ...[a]){}", "Unexpected token (1:31)", {ecmaVersion: 6});

testFail("(...a, b) => {}", "Unexpected token (1:5)", {ecmaVersion: 6});

testFail("([ 5 ]) => {}", "Assigning to rvalue (1:3)", {ecmaVersion: 6});

testFail("({ 5 }) => {}", "Unexpected token (1:5)", {ecmaVersion: 6});

testFail("(...[ 5 ]) => {}", "Unexpected token (1:6)", {ecmaVersion: 6});

testFail("[...{ a }] = b", "Unexpected token (1:4)", {ecmaVersion: 6});

testFail("[...a, b] = c", "Comma is not permitted after the rest element (1:4)", {ecmaVersion: 6});

testFail("({ t(eval) { \"use strict\"; } });", "Binding eval in strict mode (1:5)", {ecmaVersion: 6});

testFail("\"use strict\"; `${test}\\02`;", "Octal literal in strict mode (1:22)", {ecmaVersion: 6});

testFail("if (1) import \"acorn\";", "'import' and 'export' may only appear at the top level (1:7)", {ecmaVersion: 6});

testFail("[...a, ] = b", "Comma is not permitted after the rest element (1:4)", {ecmaVersion: 6});

testFail("if (b,...a, );", "Unexpected token (1:6)", {ecmaVersion: 6});

testFail("(b, ...a)", "Unexpected token (1:4)", {ecmaVersion: 6});

testFail("switch (cond) { case 10: let a = 20; ", "Unexpected token (1:37)", {ecmaVersion: 6});

testFail("\"use strict\"; (eval) => 42", "Binding eval in strict mode (1:15)", {ecmaVersion: 6});

testFail("(eval) => { \"use strict\"; 42 }", "Binding eval in strict mode (1:1)", {ecmaVersion: 6});

testFail("({ get test() { } }) => 42", "Object pattern can't contain getter or setter (1:7)", {ecmaVersion: 6});

/* Regression tests */

// # https://github.com/ternjs/acorn/issues/127
test('doSmth(`${x} + ${y} = ${x + y}`)', {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "CallExpression",
      callee: {
        type: "Identifier",
        name: "doSmth"
      },
      arguments: [{
        type: "TemplateLiteral",
        expressions: [
          {
            type: "Identifier",
            name: "x"
          },
          {
            type: "Identifier",
            name: "y"
          },
          {
            type: "BinaryExpression",
            left: {
              type: "Identifier",
              name: "x"
            },
            operator: "+",
            right: {
              type: "Identifier",
              name: "y"
            }
          }
        ],
        quasis: [
          {
            type: "TemplateElement",
            value: {cooked: "", raw: ""},
            tail: false
          },
          {
            type: "TemplateElement",
            value: {cooked: " + ", raw: " + "},
            tail: false
          },
          {
            type: "TemplateElement",
            value: {cooked: " = ", raw: " = "},
            tail: false
          },
          {
            type: "TemplateElement",
            value: {cooked: "", raw: ""},
            tail: true
          }
        ]
      }]
    }
  }]
}, {ecmaVersion: 6});

// # https://github.com/ternjs/acorn/issues/129
test('function normal(x, y = 10) {}', {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "normal"
    },
    params: [
      {
        type: "Identifier",
        name: "x"
      },
      {
        type: "AssignmentPattern",
        left: {
          type: "Identifier",
          name: "y"
        },
        right: {
          type: "Literal",
          value: 10,
          raw: "10"
        }
      }
    ],
    generator: false,
    body: {
      type: "BlockStatement",
      body: []
    },
    expression: false
  }]
}, {ecmaVersion: 6});

// test preserveParens option with arrow functions
test("() => 42", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression"
    }
  }]
}, {ecmaVersion: 6, preserveParens: true});

// https://github.com/ternjs/acorn/issues/161
test("import foo, * as bar from 'baz';", {
  type: "Program",
  body: [{
    type: "ImportDeclaration",
    specifiers: [
      {
        type: "ImportDefaultSpecifier",
        local: {
          type: "Identifier",
          name: "foo"
        }
      },
      {
        type: "ImportNamespaceSpecifier",
        local: {
          type: "Identifier",
          name: "bar"
        }
      }
    ],
    source: {
      type: "Literal",
      value: "baz",
      raw: "'baz'"
    }
  }]
}, {ecmaVersion: 6, sourceType: "module"});

// https://github.com/ternjs/acorn/issues/173
test("`{${x}}`, `}`", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "SequenceExpression",
      expressions: [
        {
          type: "TemplateLiteral",
          expressions: [{
            type: "Identifier",
            name: "x"
          }],
          quasis: [
            {
              type: "TemplateElement",
              value: {cooked: "{", raw: "{"},
              tail: false
            },
            {
              type: "TemplateElement",
              value: {cooked: "}", raw: "}"},
              tail: true
            }
          ]
        },
        {
          type: "TemplateLiteral",
          expressions: [],
          quasis: [{
            type: "TemplateElement",
            value: {cooked: "}", raw: "}"},
            tail: true
          }]
        }
      ]
    }
  }]
}, {ecmaVersion: 6});

// https://github.com/ternjs/acorn/issues/186
test('var {get} = obj;', {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "ObjectPattern",
        properties: [{
          type: "Property",
          method: false,
          shorthand: true,
          computed: false,
          key: {
            type: "Identifier",
            name: "get"
          },
          kind: "init",
          value: {
            type: "Identifier",
            name: "get"
          }
        }]
      },
      init: {
        type: "Identifier",
        name: "obj"
      }
    }],
    kind: "var"
  }]
}, {ecmaVersion: 6});

// Destructuring defaults (https://github.com/ternjs/acorn/issues/181)

test("var {propName: localVar = defaultValue} = obj", {
  type: "Program",
  range: [0, 45],
  body: [{
    type: "VariableDeclaration",
    range: [0, 45],
    declarations: [{
      type: "VariableDeclarator",
      range: [4, 45],
      id: {
        type: "ObjectPattern",
        range: [4, 39],
        properties: [{
          type: "Property",
          range: [5, 38],
          method: false,
          shorthand: false,
          computed: false,
          key: {
            type: "Identifier",
            range: [5, 13],
            name: "propName"
          },
          value: {
            type: "AssignmentPattern",
            range: [15, 38],
            left: {
              type: "Identifier",
              range: [15, 23],
              name: "localVar"
            },
            right: {
              type: "Identifier",
              range: [26, 38],
              name: "defaultValue"
            }
          },
          kind: "init"
        }]
      },
      init: {
        type: "Identifier",
        range: [42, 45],
        name: "obj"
      }
    }],
    kind: "var"
  }]
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var {propName = defaultValue} = obj", {
  type: "Program",
  range: [0, 35],
  body: [{
    type: "VariableDeclaration",
    range: [0, 35],
    declarations: [{
      type: "VariableDeclarator",
      range: [4, 35],
      id: {
        type: "ObjectPattern",
        range: [4, 29],
        properties: [{
          type: "Property",
          range: [5, 28],
          method: false,
          shorthand: true,
          computed: false,
          key: {
            type: "Identifier",
            range: [5, 13],
            name: "propName"
          },
          kind: "init",
          value: {
            type: "AssignmentPattern",
            range: [5, 28],
            left: {
              type: "Identifier",
              range: [5, 13],
              name: "propName"
            },
            right: {
              type: "Identifier",
              range: [16, 28],
              name: "defaultValue"
            }
          }
        }]
      },
      init: {
        type: "Identifier",
        range: [32, 35],
        name: "obj"
      }
    }],
    kind: "var"
  }]
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var [localVar = defaultValue] = obj", {
  type: "Program",
  range: [0, 35],
  body: [{
    type: "VariableDeclaration",
    range: [0, 35],
    declarations: [{
      type: "VariableDeclarator",
      range: [4, 35],
      id: {
        type: "ArrayPattern",
        range: [4, 29],
        elements: [{
          type: "AssignmentPattern",
          range: [5, 28],
          left: {
            type: "Identifier",
            range: [5, 13],
            name: "localVar"
          },
          right: {
            type: "Identifier",
            range: [16, 28],
            name: "defaultValue"
          }
        }]
      },
      init: {
        type: "Identifier",
        range: [32, 35],
        name: "obj"
      }
    }],
    kind: "var"
  }]
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({x = 0} = obj)", {
  type: "Program",
  range: [0, 15],
  body: [{
    type: "ExpressionStatement",
    range: [0, 15],
    expression: {
      type: "AssignmentExpression",
      range: [1, 14],
      operator: "=",
      left: {
        type: "ObjectPattern",
        range: [1, 8],
        properties: [{
          type: "Property",
          range: [2, 7],
          method: false,
          shorthand: true,
          computed: false,
          key: {
            type: "Identifier",
            range: [2, 3],
            name: "x"
          },
          kind: "init",
          value: {
            type: "AssignmentPattern",
            range: [2, 7],
            left: {
              type: "Identifier",
              range: [2, 3],
              name: "x"
            },
            right: {
              type: "Literal",
              range: [6, 7],
              value: 0
            }
          }
        }]
      },
      right: {
        type: "Identifier",
        range: [11, 14],
        name: "obj"
      }
    }
  }]
}, {
  ecmaVersion: 6,
  ranges: true
});

test("({x = 0}) => x", {
  type: "Program",
  range: [0, 14],
  body: [{
    type: "ExpressionStatement",
    range: [0, 14],
    expression: {
      type: "ArrowFunctionExpression",
      range: [0, 14],
      id: null,
      generator: false,
      expression: true,
      params: [{
        type: "ObjectPattern",
        range: [1, 8],
        properties: [{
          type: "Property",
          range: [2, 7],
          method: false,
          shorthand: true,
          computed: false,
          key: {
            type: "Identifier",
            range: [2, 3],
            name: "x"
          },
          kind: "init",
          value: {
            type: "AssignmentPattern",
            range: [2, 7],
            left: {
              type: "Identifier",
              range: [2, 3],
              name: "x"
            },
            right: {
              type: "Literal",
              range: [6, 7],
              value: 0
            }
          }
        }]
      }],
      body: {
        type: "Identifier",
        range: [13, 14],
        name: "x"
      }
    }
  }]
}, {
  ecmaVersion: 6,
  ranges: true
});

test("[a, {b: {c = 1}}] = arr", {
  type: "Program",
  range: [0, 23],
  body: [{
    type: "ExpressionStatement",
    range: [0, 23],
    expression: {
      type: "AssignmentExpression",
      range: [0, 23],
      operator: "=",
      left: {
        type: "ArrayPattern",
        range: [0, 17],
        elements: [
          {
            type: "Identifier",
            range: [1, 2],
            name: "a"
          },
          {
            type: "ObjectPattern",
            range: [4, 16],
            properties: [{
              type: "Property",
              range: [5, 15],
              method: false,
              shorthand: false,
              computed: false,
              key: {
                type: "Identifier",
                range: [5, 6],
                name: "b"
              },
              value: {
                type: "ObjectPattern",
                range: [8, 15],
                properties: [{
                  type: "Property",
                  range: [9, 14],
                  method: false,
                  shorthand: true,
                  computed: false,
                  key: {
                    type: "Identifier",
                    range: [9, 10],
                    name: "c"
                  },
                  kind: "init",
                  value: {
                    type: "AssignmentPattern",
                    range: [9, 14],
                    left: {
                      type: "Identifier",
                      range: [9, 10],
                      name: "c"
                    },
                    right: {
                      type: "Literal",
                      range: [13, 14],
                      value: 1
                    }
                  }
                }]
              },
              kind: "init"
            }]
          }
        ]
      },
      right: {
        type: "Identifier",
        range: [20, 23],
        name: "arr"
      }
    }
  }]
}, {
  ecmaVersion: 6,
  ranges: true
});

test("for ({x = 0} in arr);", {
  type: "Program",
  range: [0, 21],
  body: [{
    type: "ForInStatement",
    range: [0, 21],
    left: {
      type: "ObjectPattern",
      range: [5, 12],
      properties: [{
        type: "Property",
        range: [6, 11],
        method: false,
        shorthand: true,
        computed: false,
        key: {
          type: "Identifier",
          range: [6, 7],
          name: "x"
        },
        kind: "init",
        value: {
          type: "AssignmentPattern",
          range: [6, 11],
          left: {
            type: "Identifier",
            range: [6, 7],
            name: "x"
          },
          right: {
            type: "Literal",
            range: [10, 11],
            value: 0
          }
        }
      }]
    },
    right: {
      type: "Identifier",
      range: [16, 19],
      name: "arr"
    },
    body: {
      type: "EmptyStatement",
      range: [20, 21]
    }
  }]
}, {
  ecmaVersion: 6,
  ranges: true
});

testFail("obj = {x = 0}", "Shorthand property assignments are valid only in destructuring patterns (1:9)", {ecmaVersion: 6});

testFail("f({x = 0})", "Shorthand property assignments are valid only in destructuring patterns (1:5)", {ecmaVersion: 6});

// https://github.com/ternjs/acorn/issues/191

test("try {} catch ({message}) {}", {
  type: "Program",
  range: [0, 27],
  body: [{
    type: "TryStatement",
    range: [0, 27],
    block: {
      type: "BlockStatement",
      range: [4, 6],
      body: []
    },
    handler: {
      type: "CatchClause",
      range: [7, 27],
      param: {
        type: "ObjectPattern",
        range: [14, 23],
        properties: [{
          type: "Property",
          range: [15, 22],
          method: false,
          shorthand: true,
          computed: false,
          key: {
            type: "Identifier",
            range: [15, 22],
            name: "message"
          },
          kind: "init",
          value: {
            type: "Identifier",
            range: [15, 22],
            name: "message"
          }
        }]
      },
      body: {
        type: "BlockStatement",
        range: [25, 27],
        body: []
      }
    },
    finalizer: null
  }]
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// https://github.com/ternjs/acorn/issues/192

test("class A { static() {} }", {
  type: "Program",
  range: [0, 23],
  body: [{
    type: "ClassDeclaration",
    range: [0, 23],
    id: {
      type: "Identifier",
      range: [6, 7],
      name: "A"
    },
    superClass: null,
    body: {
      type: "ClassBody",
      range: [8, 23],
      body: [{
        type: "MethodDefinition",
        range: [10, 21],
        computed: false,
        key: {
          type: "Identifier",
          range: [10, 16],
          name: "static"
        },
        static: false,
        kind: "method",
        value: {
          type: "FunctionExpression",
          range: [16, 21],
          id: null,
          params: [],
          generator: false,
          body: {
            type: "BlockStatement",
            range: [19, 21],
            body: []
          },
          expression: false
        }
      }]
    }
  }]
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// https://github.com/ternjs/acorn/issues/213

test("for (const x of list) process(x);", {
  type: "Program",
  body: [{
    type: "ForOfStatement",
    left: {
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "x",
          range: [11, 12]
        },
        init: null,
        range: [11, 12]
      }],
      kind: "const",
      range: [5, 12]
    },
    right: {
      type: "Identifier",
      name: "list",
      range: [16, 20]
    },
    body: {
      type: "ExpressionStatement",
      expression: {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          name: "process",
          range: [22, 29]
        },
        arguments: [{
          type: "Identifier",
          name: "x",
          range: [30, 31]
        }],
        range: [22, 32]
      },
      range: [22, 33]
    },
    range: [0, 33]
  }],
  range: [0, 33]
}, {ecmaVersion: 6, ranges: true});

test("class A { *static() {} }", {
  type: "Program",
  range: [0, 24],
  body: [{
    type: "ClassDeclaration",
    range: [0, 24],
    id: {
      type: "Identifier",
      range: [6, 7],
      name: "A"
    },
    superClass: null,
    body: {
      type: "ClassBody",
      range: [8, 24],
      body: [{
        type: "MethodDefinition",
        range: [10, 22],
        computed: false,
        key: {
          type: "Identifier",
          range: [11, 17],
          name: "static"
        },
        static: false,
        kind: "method",
        value: {
          type: "FunctionExpression",
          range: [17, 22],
          id: null,
          params: [],
          generator: true,
          body: {
            type: "BlockStatement",
            range: [20, 22],
            body: []
          },
          expression: false
        }
      }]
    }
  }]
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("`${/\\d/.exec('1')[0]}`", {
  "type": "Program",
  "start": 0,
  "end": 22,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 22,
      "expression": {
        "type": "TemplateLiteral",
        "start": 0,
        "end": 22,
        "expressions": [
          {
            "type": "MemberExpression",
            "start": 3,
            "end": 20,
            "object": {
              "type": "CallExpression",
              "start": 3,
              "end": 17,
              "callee": {
                "type": "MemberExpression",
                "start": 3,
                "end": 12,
                "object": {
                  "type": "Literal",
                  "start": 3,
                  "end": 7,
                  "regex": {
                    "pattern": "\\d",
                    "flags": ""
                  },
                  "value": /\d/,
                  "raw": "/\\d/"
                },
                "property": {
                  "type": "Identifier",
                  "start": 8,
                  "end": 12,
                  "name": "exec"
                },
                "computed": false
              },
              "arguments": [
                {
                  "type": "Literal",
                  "start": 13,
                  "end": 16,
                  "value": "1",
                  "raw": "'1'"
                }
              ]
            },
            "property": {
              "type": "Literal",
              "start": 18,
              "end": 19,
              "value": 0,
              "raw": "0"
            },
            "computed": true
          }
        ],
        "quasis": [
          {
            "type": "TemplateElement",
            "start": 1,
            "end": 1,
            "value": {
              "raw": "",
              "cooked": ""
            },
            "tail": false
          },
          {
            "type": "TemplateElement",
            "start": 21,
            "end": 21,
            "value": {
              "raw": "",
              "cooked": ""
            },
            "tail": true
          }
        ]
      }
    }
  ]
}, {
  ecmaVersion: 6
});

test("var _𐒦 = 10;", {
  "type": "Program",
  "start": 0,
  "end": 13,
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 0,
      "end": 13,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 4,
          "end": 12,
          "id": {
            "type": "Identifier",
            "start": 4,
            "end": 7,
            "name": "_𐒦"
          },
          "init": {
            "type": "Literal",
            "start": 10,
            "end": 12,
            "value": 10,
            "raw": "10"
          }
        }
      ],
      "kind": "var"
    }
  ]
}, {ecmaVersion: 6});

test("var 𫠝_ = 10;", {
  "type": "Program",
  "start": 0,
  "end": 13,
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 0,
      "end": 13,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 4,
          "end": 12,
          "id": {
            "type": "Identifier",
            "start": 4,
            "end": 7,
            "name": "𫠝_"
          },
          "init": {
            "type": "Literal",
            "start": 10,
            "end": 12,
            "value": 10,
            "raw": "10"
          }
        }
      ],
      "kind": "var"
    }
  ]
}, {ecmaVersion: 6});

test("var _\\u{104A6} = 10;", {
  "type": "Program",
  "start": 0,
  "end": 20,
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 0,
      "end": 20,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 4,
          "end": 19,
          "id": {
            "type": "Identifier",
            "start": 4,
            "end": 14,
            "name": "_𐒦"
          },
          "init": {
            "type": "Literal",
            "start": 17,
            "end": 19,
            "value": 10,
            "raw": "10"
          }
        }
      ],
      "kind": "var"
    }
  ]
}, {ecmaVersion: 6});

test("let [x,] = [1]", {
  "start": 0,
  "body": [
    {
      "start": 0,
      "declarations": [
        {
          "start": 4,
          "id": {
            "start": 4,
            "elements": [
              {
                "start": 5,
                "name": "x",
                "type": "Identifier",
                "end": 6
              }
            ],
            "type": "ArrayPattern",
            "end": 8
          },
          "init": {
            "start": 11,
            "elements": [
              {
                "start": 12,
                "value": 1,
                "raw": "1",
                "type": "Literal",
                "end": 13
              }
            ],
            "type": "ArrayExpression",
            "end": 14
          },
          "type": "VariableDeclarator",
          "end": 14
        }
      ],
      "kind": "let",
      "type": "VariableDeclaration",
      "end": 14
    }
  ],
  "type": "Program",
  "end": 14
}, {ecmaVersion: 6});

test("let {x} = y", {
  "start": 0,
  "body": [
    {
      "start": 0,
      "declarations": [
        {
          "start": 4,
          "id": {
            "start": 4,
            "properties": [
              {
                "start": 5,
                "method": false,
                "shorthand": true,
                "computed": false,
                "key": {
                  "start": 5,
                  "name": "x",
                  "type": "Identifier",
                  "end": 6
                },
                "kind": "init",
                "value": {
                  "start": 5,
                  "name": "x",
                  "type": "Identifier",
                  "end": 6
                },
                "type": "Property",
                "end": 6
              }
            ],
            "type": "ObjectPattern",
            "end": 7
          },
          "init": {
            "start": 10,
            "name": "y",
            "type": "Identifier",
            "end": 11
          },
          "type": "VariableDeclarator",
          "end": 11
        }
      ],
      "kind": "let",
      "type": "VariableDeclaration",
      "end": 11
    }
  ],
  "type": "Program",
  "end": 11
}, {ecmaVersion: 6})

test("[x,,] = 1", {}, {ecmaVersion: 6});

test("for (var [name, value] in obj) {}", {
  body: [
    {
      left: {
        declarations: [
          {
            id: {
              elements: [
                {
                  name: "name",
                  type: "Identifier"
                },
                {
                  name: "value",
                  type: "Identifier"
                }
              ],
              type: "ArrayPattern"
            },
            init: null,
            type: "VariableDeclarator"
          }
        ],
        kind: "var",
        type: "VariableDeclaration"
      },
      right: {
        name: "obj",
        type: "Identifier"
      },
      body: {
        body: [],
        type: "BlockStatement"
      },
      type: "ForInStatement"
    }
  ],
  sourceType: "script",
  type: "Program"
}, {ecmaVersion: 6})

testFail("let [x]", "Complex binding patterns require an initialization value (1:7)", {ecmaVersion: 6})
testFail("var [x]", "Complex binding patterns require an initialization value (1:7)", {ecmaVersion: 6})
testFail("var _𖫵 = 11;", "Unexpected character '𖫵' (1:5)", {ecmaVersion: 6});
testFail("var 𫠞_ = 12;", "Unexpected character '𫠞' (1:4)", {ecmaVersion: 6});
testFail("var 𫠝_ = 10;", "Unexpected character '𫠝' (1:4)", {ecmaVersion: 5});
testFail("if (1) let x = 10;", "Unexpected token (1:7)", {ecmaVersion: 6});
testFail("for (;;) const x = 10;", "Unexpected token (1:9)", {ecmaVersion: 6});
testFail("while (1) function foo(){}", "Unexpected token (1:10)", {ecmaVersion: 6});
testFail("if (1) ; else class Cls {}", "Unexpected token (1:14)", {ecmaVersion: 6});

testFail("'use strict'; [...eval] = arr", "Assigning to eval in strict mode (1:18)", {ecmaVersion: 6});
testFail("'use strict'; ({eval = defValue} = obj)", "'eval' can not be used as shorthand property (1:16)", {ecmaVersion: 6});

testFail("[...eval] = arr", "Assigning to eval in strict mode (1:4)", {ecmaVersion: 6, sourceType: "module"});

testFail("function* y({yield}) {}", "'yield' can not be used as shorthand property (1:13)", {ecmaVersion: 6});

test("function foo() { new.target; }", {
  type: "Program",
  body: [
    {
      type: "FunctionDeclaration",
      id: {
        type: "Identifier",
        name: "foo"
      },
      body: {
        type: "BlockStatement",
        body: [
          {
            type: "ExpressionStatement",
            expression: {
              type: "MetaProperty",
              meta: {type: "Identifier", name: "new"},
              property: {type: "Identifier", name: "target"}
            }
          }
        ]
      },
      generator: false,
      expression: false
    }
  ],
  sourceType: "script"
}, {ecmaVersion: 6});

testFail("new.prop", "The only valid meta property for new is new.target (1:4)", {ecmaVersion: 6});
testFail("new.target", "new.target can only be used in functions (1:0)", {ecmaVersion: 6});

test("export default function foo() {} false", {
  body: [
    {
      declaration: {
        id: {
          name: "foo",
          type: "Identifier"
        },
        generator: false,
        expression: false,
        params: [],
        body: {
          body: [],
          type: "BlockStatement"
        },
        type: "FunctionDeclaration"
      },
      type: "ExportDefaultDeclaration"
    },
    {
      expression: {
        value: false,
        raw: "false",
        type: "Literal"
      },
      type: "ExpressionStatement"
    }
  ],
  sourceType: "module",
  type: "Program"
}, {ecmaVersion: 6, sourceType: "module"})

// https://github.com/ternjs/acorn/issues/274

testFail("`\\07`", "Octal literal in strict mode (1:1)", {ecmaVersion: 6});

// https://github.com/ternjs/acorn/issues/277

testFail("x = { method() 42 }", "Unexpected token (1:15)", {ecmaVersion: 6});

testFail("x = { get method() 42 }", "Unexpected token (1:19)", {ecmaVersion: 6});

testFail("x = { set method(val) v = val }", "Unexpected token (1:22)", {ecmaVersion: 6});

// https://github.com/ternjs/acorn/issues/278

testFail("/\\u{110000}/u", "~", {ecmaVersion: 6});

// https://github.com/ternjs/acorn/issues/279

testFail("super", "'super' outside of function or class (1:0)", {ecmaVersion: 6});

// https://github.com/ternjs/acorn/issues/275

testFail("class A { get prop(x) {} }", "getter should have no params (1:18)", {ecmaVersion: 6});
testFail("class A { set prop() {} }", "setter should have exactly one param (1:18)", {ecmaVersion: 6});
testFail("class A { set prop(x, y) {} }", "setter should have exactly one param (1:18)", {ecmaVersion: 6});

// https://github.com/ternjs/acorn/issues/276

testFail("({ __proto__: 1, __proto__: 2 })", "Redefinition of __proto__ property (1:17)", {ecmaVersion: 6});
testFail("({ '__proto__': 1, __proto__: 2 })", "Redefinition of __proto__ property (1:19)", {ecmaVersion: 6});
test("({ ['__proto__']: 1, __proto__: 2 })", {}, {ecmaVersion: 6});
test("({ __proto__() { return 1 }, __proto__: 2 })", {}, {ecmaVersion: 6});
test("({ get __proto__() { return 1 }, __proto__: 2 })", {}, {ecmaVersion: 6});
test("({ __proto__, __proto__: 2 })", {}, {ecmaVersion: 6});

test("export default /foo/", {}, {ecmaVersion: 6, sourceType: "module"});

test("var await = 0", {
  type: "Program",
  start: 0,
  end: 13,
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 13
    }
  },
  body: [
    {
      type: "VariableDeclaration",
      start: 0,
      end: 13,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 13
        }
      },
      declarations: [
        {
          type: "VariableDeclarator",
          start: 4,
          end: 13,
          loc: {
            start: {
              line: 1,
              column: 4
            },
            end: {
              line: 1,
              column: 13
            }
          },
          id: {
            type: "Identifier",
            start: 4,
            end: 9,
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 9
              }
            },
            name: "await"
          },
          init: {
            type: "Literal",
            start: 12,
            end: 13,
            loc: {
              start: {
                line: 1,
                column: 12
              },
              end: {
                line: 1,
                column: 13
              }
            },
            value: 0,
            raw: "0"
          }
        }
      ],
      kind: "var"
    }
  ],
  sourceType: "script"
}, {
  ecmaVersion: 6,
  sourceType: "script",
  allowReserved: false,
  locations: true
})
testFail("var await = 0", "The keyword 'await' is reserved (1:4)", {
  ecmaVersion: 6,
  sourceType: "module",
  allowReserved: false,
  locations: true
})

// https://github.com/ternjs/acorn/issues/363

test("/[a-z]/gimuy", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        regex: {
          pattern: "[a-z]",
          flags: "gimuy"
        }
      }
    }
  ]
}, {ecmaVersion: 6});
testFail("/[a-z]/s", "Invalid regular expression flag (1:1)", {ecmaVersion: 6});

testFail("[...x in y] = []", "Assigning to rvalue (1:4)", {ecmaVersion: 6});

test("(([,]) => 0)", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      params: [{
        type: "ArrayPattern",
        elements: [null]
      }],
      body: {
        type: "Literal",
        value: 0,
        raw: "0"
      }
    }
  }]
}, {ecmaVersion: 6});
