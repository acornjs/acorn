import {Position, SourceLocation} from "./locutil"
import {Node} from "./node"
import {Token} from "./tokenize"

type ecmaVersion = 3 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | "latest" | 1e8

interface AbstractToken {
}

export interface Comment extends AbstractToken {
  type: string
  value: string
  start: number
  end: number
  loc?: SourceLocation
  range?: [number, number]
}

export interface Options {
  ecmaVersion: ecmaVersion
  sourceType?: "script" | "module"
  onInsertedSemicolon?: (lastTokEnd: number, lastTokEndLoc?: Position) => void
  onTrailingComma?: (lastTokEnd: number, lastTokEndLoc?: Position) => void
  allowReserved?: boolean | "never"
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
