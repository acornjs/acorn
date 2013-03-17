(function (exports) {
  
  exports.walk || (exports.walk = require("./walk.js"));

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

  var rewrite_rules = exports.rewrite_rules = {
    Literal: function (node, jscode) {
      jscode.set(node.loc.start, node.raw);
    },

    ObjectExpression: function (node, jscode) {
      jscode.set(node.loc.start, "{");

      var properties = node.properties;
      for (var i = 0, len = properties.length; i < len; i++) {
        var property = properties[i];
        var is_last = i === (len - 1);
        rewrite_rules.ObjectExpression_key.call(this, property.key, jscode, is_last);
        rewrite_rules.ObjectExpression_value.call(this, property.value, jscode, is_last);
      }

      jscode.set({ line: node.loc.end.line, column: node.loc.end.column - 1 }, "}");
    },

    ObjectExpression_key: function (node, jscode) {
      rewrite_node.call(this, node, jscode);
      jscode.set(node.loc.end, ":");
    },

    ObjectExpression_value: function (node, jscode, is_last) {
      rewrite_node.call(this, node, jscode);
      if (!is_last) {
        jscode.set(node.loc.end, ",");
      }
    },

    Identifier: function (node, jscode) {
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

      var idEnd = node.id.loc.end;
      var initStart = node.init.loc.start;
      jscode.set({
        line: idEnd.line,
        column: initStart.line === idEnd.line ? Math.floor((idEnd.column + initStart.column) / 2) : idEnd.column + 1
      }, "=");

      if (!is_last) {
        jscode.set(node.loc.end, ",");
      }
    },

    Statement: function (node, jscode) {
      jscode.set(node.loc.end, ";");
    }
  };

  function def_error(key) {
    exports.rewrite_rules[key] = function (node, state) {
      console.log(key, node, state);
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
    function JSCode(config) {
      config || (config = {});
      this.usetabs = config.usetabs;
      this.tabwidth = config.tabwidth || 4;
      this.rn = config.rn;
    }

    var proto = JSCode.prototype = [];

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
      var linno = loc.line;
      var colno = loc.column;

      linno = get_linno(linno);
      var lines = text.split(/\r?\n/);

      // Ensure we have enough lines for the text we'll insert
      var last_linno = linno + (lines.length - 1);
      while (this.length <= last_linno) {
        this.push([]);
      }

      // Insert the text into the javascript respecting line and column
      // positions.
      for (var l = 0, llen = lines.length; l < llen; l++) {
        var _l = l + linno;
        var line_update = lines[l];
        var clen = line_update.length;
        
        // Ensure we have enough columns to precede our input.
        var line = this[_l];
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
      var newline = this.rn ? "\r\n" : "\n";

      for (var l = 0, llen = this.length; l < llen; l++) {
        var line = this[l];

        // Use tabs for indentation.
        if (this.usetabs) {
          var spaces = 0;
          for (var c = 0, clen = line.length; c < clen; c++) {
            if (line[c] === " ") {
              spaces += 1;
              c -= 1;
              line.shift();
            }
          }
          var tabs = Math.floor(spaces / this.tabwidth);
          var spaces = spaces % this.tabwidth;
          line.unshift(Array(spaces + 1).join(' '));
          line.unshift(Array(tabs + 1).join(' '));
        }

        lines.push(line.join(''));
      }

      return lines.join(newline);
    };

    return JSCode;
  })();
  
  exports.rewrite = function (ast, rewrite_rules) {
    if (!acorn.walk) {
      throw "Can't rewrite an acorn ast without acorn.walk";
    }

    if (rewrite_rules) {
      for (var prop in exports.rewrite_rules) {
        if (!(prop in rewrite_rules)) {
          rewrite_rules[prop] = exports.rewrite_rules[prop];
        }
      }
    } else {
      rewrite_rules = exports.rewrite_rules;
    }

    var jscode = new exports.JSCode();
    acorn.walk.simple(ast, rewrite_rules, null, jscode);

    return jscode.toString();
  };

})(typeof exports === "undefined" ? acorn.rewriter = {} : exports);
