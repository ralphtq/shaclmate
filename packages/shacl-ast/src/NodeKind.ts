import type { BlankNode, Literal, NamedNode } from "@rdfjs/types";

/**
 * TypeScript enum corresponding to sh:NodeKind, for simpler manipulation.
 */
export type NodeKind = (BlankNode | NamedNode | Literal)["termType"];
