import type { BlankNode, NamedNode } from "@rdfjs/types";

/**
 * Minimal interface for objects satisfying OntologyT.
 */
export interface OntologyLike {
  readonly identifier: BlankNode | NamedNode;
}
