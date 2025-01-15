export type TsFeature =
  | "create"
  | "equals"
  | "fromJson"
  | "fromRdf"
  | "hash"
  | "toJson"
  | "toRdf"
  | "sparql-graph-patterns";

export namespace TsFeature {
  export const MEMBERS: readonly TsFeature[] = [
    "create",
    "equals",
    "fromJson",
    "fromRdf",
    "hash",
    "toJson",
    "toRdf",
    "sparql-graph-patterns",
  ];
}
