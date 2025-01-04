import type { BlankNode, NamedNode } from "@rdfjs/types";
import type { NodeKind } from "@shaclmate/shacl-ast";
import type { TermType } from "./TermType.js";

/**
 * A type corresponding to sh:nodeKind of a blank node or IRI, and not corresponding to a node shape.
 */
export interface IdentifierType extends TermType<BlankNode | NamedNode> {
  readonly kind: "IdentifierType";
  readonly nodeKinds: Set<NodeKind.BLANK_NODE | NodeKind.IRI>;
}
