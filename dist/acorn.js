"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const acorn = __importStar(require("acorn"));
let inputFilePaths = [];
let forceFileName = false;
let fileMode = false;
let silent = false;
let compact = false;
let tokenize = false;
const options = {};
function help(status) {
    const print = status === 0 ? console.log : console.error;
    print("usage: " +
        (0, path_1.basename)(process.argv[1] || "") +
        " [--ecma3|--ecma5|--ecma6|--ecma7|--ecma8|--ecma9|...|--ecma2015|--ecma2016|--ecma2017|--ecma2018|...]");
    print("[--tokenize] [--locations] [--allow-hash-bang] [--allow-await-outside-function] [--compact] [--silent] [--module] [--help] [--] [<infile>...]");
    process.exit(status);
}
for (let i = 2; i < process.argv.length; ++i) {
    const arg = process.argv[i];
    if (!arg)
        continue;
    if (arg[0] !== "-" || arg === "-")
        inputFilePaths.push(arg);
    else if (arg === "--") {
        inputFilePaths.push(...process.argv.slice(i + 1));
        forceFileName = true;
        break;
    }
    else if (arg === "--locations")
        options.locations = true;
    else if (arg === "--allow-hash-bang")
        options.allowHashBang = true;
    else if (arg === "--allow-await-outside-function")
        options.allowAwaitOutsideFunction = true;
    else if (arg === "--silent")
        silent = true;
    else if (arg === "--compact")
        compact = true;
    else if (arg === "--help")
        help(0);
    else if (arg === "--tokenize")
        tokenize = true;
    else if (arg === "--module")
        options.sourceType = "module";
    else {
        const match = arg.match(/^--ecma(\d+)$/);
        if (match)
            options.ecmaVersion = +(match?.[1] ?? 55);
        else
            help(1);
    }
}
function run(codeList) {
    let result = [];
    let fileIdx = 0;
    try {
        codeList.forEach((code, idx) => {
            fileIdx = idx;
            if (!tokenize) {
                const program = acorn.parse(code, options);
                result = program;
                options.program = program;
            }
            else {
                const tokenizer = acorn.tokenizer(code, options);
                const tokens = Array.isArray(result) ? result : [];
                let token;
                do {
                    token = tokenizer.getToken();
                    tokens.push(token);
                } while (token.type !== acorn.tokTypes.eof);
                result = tokens;
            }
        });
    }
    catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        console.error(fileMode
            ? message.replace(/\(\d+:\d+\)$/, (m) => m.slice(0, 1) + inputFilePaths[fileIdx] + " " + m.slice(1))
            : message);
        process.exit(1);
    }
    if (!silent) {
        console.log(JSON.stringify(result, (_, value) => typeof value === "bigint" ? null : value, compact ? undefined : 2));
    }
}
fileMode =
    inputFilePaths.length > 0 &&
        (forceFileName ||
            !inputFilePaths.includes("-") ||
            inputFilePaths.length !== 1);
if (fileMode) {
    run(inputFilePaths.map((path) => (0, fs_1.readFileSync)(path, "utf8")));
}
else {
    let code = "";
    process.stdin.resume();
    process.stdin.on("data", (chunk) => (code += chunk));
    process.stdin.on("end", () => run([code]));
}
