import 'acorn'

declare module 'acorn' {
  interface Token {
    value?: string | number | null;
  }
};
