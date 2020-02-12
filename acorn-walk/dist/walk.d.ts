import acorn from 'acorn';

declare module "acorn-walk" {
  type NodeType  = acorn.Node["type"];
  type DiscriminateUnion<T, K extends keyof T, V extends T[K] = T[K]> = T extends Record<K, V> ? T : never;
  type NarrowNode<K extends NodeType> = DiscriminateUnion<acorn.Node, "type", K>;
  
  type FullWalkerCallback<TState> = (
      node: acorn.Node,
      state: TState,
      type: NodeType
  ) => void;

  type FullAncestorWalkerCallback<TState> = (
      node: acorn.Node,
      state: TState | acorn.Node[],
      ancestors: acorn.Node[],
      type: NodeType
  ) => void;
  type WalkerCallback<TState> = (node: acorn.Node, state: TState) => void;

  type SimpleWalkerFn<K extends NodeType, TState> = (
      node: NarrowNode<K>,
      state: TState
  ) => void;
  
  type AncestorWalkerFn<K extends NodeType, TState> = (
      node: NarrowNode<K>,
      state: TState| acorn.Node[],
      ancestors: acorn.Node[]
  ) => void;

  type RecursiveWalkerFn<K extends NodeType, TState> = (
      node: NarrowNode<K>,
      state: TState,
      callback: WalkerCallback<TState>
  ) => void;
  
  type SimpleVisitors<Types extends NodeType, TState> = {
      [Type in Types]: SimpleWalkerFn<Type, TState>
  };

  type AncestorVisitors<Types extends NodeType, TState> = {
      [Type in Types]: AncestorWalkerFn<Type, TState>
  };
  
  type RecursiveVisitors<Types extends NodeType, TState> = {
      [Type in Types]: RecursiveWalkerFn<Type, TState>
  };

  type FindPredicate = (type: NodeType, node: acorn.Node) => boolean;

  interface Found<Type extends NodeType, TState> {
      node: NarrowNode<Type>,
      state: TState
  }

  export function simple<TState, K extends NodeType>(
      node: acorn.Node,
      visitors: SimpleVisitors<K, TState>,
      base?: RecursiveVisitors<NodeType, TState>,
      state?: TState
  ): void;

  export function ancestor<TState, K extends NodeType>(
      node: acorn.Node,
      visitors: AncestorVisitors<K, TState>,
      base?: RecursiveVisitors<NodeType, TState>,
      state?: TState
  ): void;

  export function recursive<TState, K extends NodeType>(
      node: acorn.Node,
      state: TState,
      functions: RecursiveVisitors<K, TState>,
      base?: RecursiveVisitors<NodeType, TState>
  ): void;

  export function full<TState>(
      node: acorn.Node,
      callback: FullWalkerCallback<TState>,
      base?: RecursiveVisitors<NodeType, TState>,
      state?: TState
  ): void;

  export function fullAncestor<TState>(
      node: acorn.Node,
      callback: FullAncestorWalkerCallback<TState>,
      base?: RecursiveVisitors<NodeType, TState>,
      state?: TState
  ): void;

  export function make<TState, K extends NodeType>(
      functions: RecursiveVisitors<K, TState>,
      base?: RecursiveVisitors<NodeType, TState>
  ): RecursiveVisitors<NodeType, TState>;

  export function findNodeAt<TState, K extends NodeType>(
      node: acorn.Node,
      start: number | undefined,
      end: number | undefined,
      type: K,
      base?: RecursiveVisitors<NodeType, TState>,
      state?: TState
  ): Found<K, TState> | undefined;

  export function findNodeAt<TState>(
      node: acorn.Node,
      start: number | undefined,
      end: number | undefined,
      type?: FindPredicate,
      base?: RecursiveVisitors<NodeType, TState>,
      state?: TState
  ): Found<NodeType, TState> | undefined;

  export const findNodeAround: typeof findNodeAt;

  export const findNodeAfter: typeof findNodeAt;
}
