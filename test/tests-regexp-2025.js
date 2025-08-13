if (typeof exports !== "undefined") {
  var test = require("./driver.js").test;
  var testFail = require("./driver.js").testFail;
}

// Duplicate named capture groups
test("/(?<x>a)|(?<x>b)/", {}, { ecmaVersion: 2025 });
testFail(
  "/(?<x>a)|(?<x>b)/",
  "Invalid regular expression: /(?<x>a)|(?<x>b)/: Duplicate capture group name (1:1)",
  { ecmaVersion: 2024 }
);
testFail(
  "/(?<x>a)(?<x>b)/",
  "Invalid regular expression: /(?<x>a)(?<x>b)/: Duplicate capture group name (1:1)",
  { ecmaVersion: 2025 }
);
test("/(?:(?<x>a)|(?<x>b))\\k<x>/", {}, { ecmaVersion: 2025 });
testFail(
  "/(?:(?<x>a)|(?<x>b))\\k<x>/",
  "Invalid regular expression: /(?:(?<x>a)|(?<x>b))\\k<x>/: Duplicate capture group name (1:1)",
  { ecmaVersion: 2024 }
);
testFail(
  "/(?:(?<x>a)(?<x>b))\\k<x>/",
  "Invalid regular expression: /(?:(?<x>a)(?<x>b))\\k<x>/: Duplicate capture group name (1:1)",
  { ecmaVersion: 2025 }
);
test("/(?<y>a)(?<x>a)|(?<x>b)(?<y>b)/", {}, { ecmaVersion: 2025 });
test("/(?<x>a)|(?<x>b)|(?<x>c)/", {}, { ecmaVersion: 2025 });
test("/(?<x>a)|\\k<x>/", {}, { ecmaVersion: 2025 });
testFail(
  "/(?<x>a)|(?<x>b)(?<x>c)/",
  "Invalid regular expression: /(?<x>a)|(?<x>b)(?<x>c)/: Duplicate capture group name (1:1)",
  { ecmaVersion: 2025 }
);
testFail(
  "/(?:(?<x>a)|(?<x>b))(?<x>c)/",
  "Invalid regular expression: /(?:(?<x>a)|(?<x>b))(?<x>c)/: Duplicate capture group name (1:1)",
  { ecmaVersion: 2025 }
);
testFail(
  "/(?<x>a)(?:(?<x>b)|(?<x>c))/",
  "Invalid regular expression: /(?<x>a)(?:(?<x>b)|(?<x>c))/: Duplicate capture group name (1:1)",
  { ecmaVersion: 2025 }
);
testFail(
  "/(?:(?:(?<x>a)|(?<x>b))|(?:))(?<x>c)/",
  "Invalid regular expression: /(?:(?:(?<x>a)|(?<x>b))|(?:))(?<x>c)/: Duplicate capture group name (1:1)",
  { ecmaVersion: 2025 }
);

// Modifiers
test("/(?i-m:p)?/", {}, { ecmaVersion: 2025 });
test("/(?i-m:p)?/u", {}, { ecmaVersion: 2025 });
test("/(?ims:p)?/", {}, { ecmaVersion: 2025 });
test("/(?ims-:p)?/", {}, { ecmaVersion: 2025 });
test("/(?-ims:p)?/", {}, { ecmaVersion: 2025 });
test("/(?:no modifiers)?/", {}, { ecmaVersion: 2025 });
// In ES2024
testFail(
  "/(?i-m:p)?/",
  "Invalid regular expression: /(?i-m:p)?/: Invalid group (1:1)",
  { ecmaVersion: 2024 }
);
testFail(
  "/(?ims:p)?/",
  "Invalid regular expression: /(?ims:p)?/: Invalid group (1:1)",
  { ecmaVersion: 2024 }
);
testFail(
  "/(?ims-:p)?/",
  "Invalid regular expression: /(?ims-:p)?/: Invalid group (1:1)",
  { ecmaVersion: 2024 }
);
testFail(
  "/(?-ims:p)?/",
  "Invalid regular expression: /(?-ims:p)?/: Invalid group (1:1)",
  { ecmaVersion: 2024 }
);
// It is a Syntax Error if the first modifiers and the second modifiers are both empty.
testFail(
  "/(?-:p)?/",
  "Invalid regular expression: /(?-:p)?/: Invalid regular expression modifiers (1:1)",
  { ecmaVersion: 2025 }
);
// It is a Syntax Error if the first modifiers contains the same code point more than once.
testFail(
  "/(?ii:p)?/",
  "Invalid regular expression: /(?ii:p)?/: Duplicate regular expression modifiers (1:1)",
  { ecmaVersion: 2025 }
);
// It is a Syntax Error if the second modifiers contains the same code point more than once.
testFail(
  "/(?-ii:p)?/",
  "Invalid regular expression: /(?-ii:p)?/: Duplicate regular expression modifiers (1:1)",
  { ecmaVersion: 2025 }
);
testFail(
  "/(?i-mm:p)?/",
  "Invalid regular expression: /(?i-mm:p)?/: Duplicate regular expression modifiers (1:1)",
  { ecmaVersion: 2025 }
);
// It is a Syntax Error if any code point in the first modifiers is also contained in the second modifiers.
testFail(
  "/(?i-i:p)?/",
  "Invalid regular expression: /(?i-i:p)?/: Duplicate regular expression modifiers (1:1)",
  { ecmaVersion: 2025 }
);
// Not modifiers
testFail(
  "/(?u:p)?/",
  "Invalid regular expression: /(?u:p)?/: Invalid group (1:1)",
  { ecmaVersion: 2025 }
);
testFail(
  "/(?u-:p)?/",
  "Invalid regular expression: /(?u-:p)?/: Invalid group (1:1)",
  { ecmaVersion: 2025 }
);
testFail(
  "/(?u-i:p)?/",
  "Invalid regular expression: /(?u-i:p)?/: Invalid group (1:1)",
  { ecmaVersion: 2025 }
);
testFail(
  "/(?-u:p)?/",
  "Invalid regular expression: /(?-u:p)?/: Invalid group (1:1)",
  { ecmaVersion: 2025 }
);
testFail(
  "/(?i-u:p)?/",
  "Invalid regular expression: /(?i-u:p)?/: Invalid group (1:1)",
  { ecmaVersion: 2025 }
);
