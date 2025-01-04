import type { BlankNode, Literal, NamedNode } from "@rdfjs/types";
import type { Maybe } from "purify-ts";

/**
 * Minimal interface for objects satisfying PropertyGroupT.
 */
export interface PropertyGroupLike {
  readonly identifier: BlankNode | NamedNode;
  readonly label: Maybe<Literal>;
}
