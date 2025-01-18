export type TsFeature =
  | "create"
  | "equals"
  | "fromJson"
  | "fromRdf"
  | "hash"
  | "jsonSchema"
  | "jsonUiSchema"
  | "sparql"
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
    "jsonSchema",
    "jsonUiSchema",
    "sparql",
    "toJson",
    "toRdf",
    "sparql-graph-patterns",
  ];
}
