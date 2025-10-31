import { test } from "./driver.js";
import { testFail } from "./driver.js";

test("try {} catch {}", {
  type: "Program",
  start: 0,
  end: 15,
  body: [
    {
      type: "TryStatement",
      start: 0,
      end: 15,
      block: {
        type: "BlockStatement",
        start: 4,
        end: 6,
        body: []
      },
      handler: {
        type: "CatchClause",
        start: 7,
        end: 15,
        param: null,
        body: {
          type: "BlockStatement",
          start: 13,
          end: 15,
          body: []
        }
      },
      finalizer: null
    }
  ],
  sourceType: "script"
}, {ecmaVersion: 10})
