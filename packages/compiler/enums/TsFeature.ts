export type TsFeature =
  | "equals"
  | "fromRdf"
  | "hash"
  | "toJson"
  | "toRdf"
  | "sparql-graph-patterns";

export namespace TsFeature {
  export const MEMBERS: readonly TsFeature[] = [
    "equals",
    "fromRdf",
    "hash",
    "toJson",
    "toRdf",
    "sparql-graph-patterns",
  ];
}
