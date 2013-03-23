(function (exports) {
  
  var walk = (typeof acorn !== "undefined" && acorn.walk) || require("./walk.js");

  function ErrorPrototype() {}
  ErrorPrototype.prototype = Error.prototype;

  function ParseError(node) {
    this.node = node;
    this.line = node.loc.start.line;
    this.column = node.loc.start.column;
    this.message = "" + node.type + " (" + this.line + ", " + this.column + ")";
  }
  ParseError.prototype = new ErrorPrototype();
  ParseError.prototype.name = ParseError.name;

  var required_keys = [
    "BlockStatement", /*"Program",*/ "Statement", "EmptyStatement",
    "ExpressionStatement", "IfStatement", "LabeledStatement",
    "ContinueStatement", "BreakStatement", "WithStatement", "SwitchStatement",
    "ReturnStatement", "ThrowStatement", "TryStatement", "WhileStatement",
    "DoWhileStatement", "ForStatement", "ForInStatement", "ForInit",  
    "DebuggerStatement", "FunctionDeclaration", "VariableDeclaration",
    "Function", "ScopeBody", /*"Expression",*/ "ThisExpression", "ArrayExpression",
    "ObjectExpression", "FunctionExpression", "SequenceExpression",
    "UpdateExpression", "UnaryExpression", "LogicalExpression",
    "AssignmentExpression", "BinaryExpression", "ConditionalExpression",
    "CallExpression", "NewExpression", "MemberExpression", "Literal",
    "Identifier"
  ];
  
  function rewrite_node(node) {
    rewrite_rules[node.type].apply(this, arguments);
  }

  function loc_between(left, right, align, offset) {
    if (!align) {
      align = "left";
    }

    if (!offset) {
      offset = 0;
    }

    var start = left.loc.end;
    var end = right.loc.start;
    var sameline = start.line === end.line;
    align = sameline && align === "center" ? "left" : align;
    var max_col = align === "left" ? start.column + offset : end.column - 1;
    var min_col = align === "right" ? end.column - offset : start.column;
    var line, column;

    if (sameline) {
      column = Math.floor((start.column + end.column) / 2);
      column = Math.min(column, max_col);
      column = Math.max(column, min_col);
      line = start.line;
    } else if (align === "left") {
      column = max_col;
      line = start.line;
    } else if (align === "right") {
      column = min_col;
      line = end.line;
    }

    return {
      column: column,
      line: line
    };
  }

  var rewrite_rules = exports.rewrite_rules = {
    Literal: function (node, jscode) {
      jscode.set(node.loc.start, node.raw);
    },

    ObjectExpression: function (node, jscode) {
      jscode.set(node.loc.start, "{");

      var properties = node.properties;
      for (var i = 0, len = properties.length; i < len; i++) {
        var property = properties[i];
        rewrite_node.call(this, property.key, jscode);
        jscode.set(loc_between(property.key, property.value), ":");
        rewrite_node.call(this, property.value, jscode);

        if (i !== (len - 1)) {
          jscode.set(property.value.loc.end, ",")
        }
      }

      jscode.set({ line: node.loc.end.line, column: node.loc.end.column - 1 }, "}");
    },

    Identifier: function (node, jscode) {
      if (node.name === "✖") {
        throw new ParseError(node);
      }
      jscode.set(node.loc.start, node.name);
    },

    VariableDeclaration: function (node, jscode) {
      jscode.set(node.loc.start, "var");
      var declarations = node.declarations;
      for (var i = 0, len = declarations.length; i < len; i++) {
        rewrite_node.call(this, declarations[i], jscode, i === (len - 1));
      }
    },

    VariableDeclarator: function (node, jscode, is_last) {
      rewrite_node.call(this, node.id, jscode);
      jscode.set(loc_between(node.id, node.init, null, 1), "=");

      if (!is_last) {
        jscode.set(node.loc.end, ",");
      }
    },

    Statement: function (node, jscode) {
      if (!node.semicolon) {
        jscode.set(node.loc.end, ";");
        node.semicolon = true;
      }
    },

    ExpressionStatement: function (node, jscode) {
      if (!node.semicolon) {
        jscode.set({ line: node.loc.end.line, column: node.loc.end.column - 1 }, ";");
        node.semicolon = true;
      }
    },

    BinaryExpression: function (node, jscode) {
      rewrite_node.call(this, node.left, jscode);
      rewrite_node.call(this, node.right, jscode);
      jscode.set(loc_between(node.left, node.right, null, 1), node.operator);
    }
  };

  function def_error(key) {
    exports.rewrite_rules[key] = function (node, state) {
      console.error(key, node, state);
      throw "NotImplementedError: '" + key + "' is required";
    };
  }

  for (var i = 0, len = required_keys.length; i < len; i++) {
    var key = required_keys[i];
    if (!(key in exports.rewrite_rules)) {
      def_error(key);
    }
  }
  

  // JSCode is a class that allows us to set the javascript code to particular lines and columns
  // We need this so that rewrite will (as much as possible) keep the same whitespace that was passed in.
  exports.JSCode = (function () {
    var r_newline_rn = /\r\n/;
    var r_line_indentation = /^\s*/;

    function JSCode(config) {
      config || (config = {});
      var old_code = config.old_code || '';
      this.newline = r_newline_rn.test(old_code) ? '\r\n' : '\n';
      this.old_lines = old_code.split(this.newline);
      this.lines = [];
    }

    var proto = JSCode.prototype;

    function get_linno(linno) {
      return linno - 1;
    }

    proto.get = function (linno, colno) {
      linno = get_linno(linno);
      var line = this[linno];
      if (line) {
        return line[colno];
      }
    };

    proto.set = function (loc, text) {
      var linno = get_linno(loc.line);
      var colno = loc.column;
      var lines = text.split(/\r?\n/);

      // Insert the text into the javascript respecting line and column
      // positions.
      for (var l = 0, llen = lines.length; l < llen; l++) {
        var _l = l + linno;
        var line_update = lines[l];
        var clen = line_update.length;
        
        var line = this.lines[_l];
        if (!line) {
          line = this.lines[_l] = [];
        }

        // Ensure we have enough columns to precede our input.
        while (line.length < colno) {
          line.push(" ");
        }
        
        for (var c = 0; c < clen; c++) {
          var _c = c + colno;
          line[_c] = line_update.charAt(c);
        }

        // After the first path, colno needs to be reset so we will update 
        // from column 0 on subsequent lines.
        colno = 0;
      }
    };

    proto.toString = function () {
      var lines = [];

      for (var l = 0, llen = this.lines.length; l < llen; l++) {
        var line = (this.lines[l] || []).join('');
        var old_line = this.old_lines[l];
        if (old_line) {
          var indentation = old_line.match(r_line_indentation);
          line = line.replace(r_line_indentation, indentation);
        }
        lines.push(line);
      }

      return lines.join(this.newline);
    };

    return JSCode;
  })();
  
  var rusetabs

  // code is an optional argument. It is the code from which the ast is 
  // generated. Passing code in allows us to get consistent indentation.
  // rewrite_rules is also an optional argument, and allows you to customize
  // the way the code is rewritten.
  exports.rewrite = function (ast, code, rewrite_rules) {
    if (rewrite_rules) {
      for (var prop in exports.rewrite_rules) {
        if (!(prop in rewrite_rules)) {
          rewrite_rules[prop] = exports.rewrite_rules[prop];
        }
      }
    } else {
      rewrite_rules = exports.rewrite_rules;
    }

    var jscode = new exports.JSCode({
      old_code: code
    });
    walk.simple(ast, rewrite_rules, null, jscode);

    return jscode.toString();
  };

})(typeof exports === "undefined" ? acorn.rewriter = {} : exports);
