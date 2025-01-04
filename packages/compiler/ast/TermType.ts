import type { BlankNode, Literal, NamedNode } from "@rdfjs/types";
import type { NodeKind } from "@shaclmate/shacl-ast";
import type { Maybe } from "purify-ts";

export interface TermType<TermT extends BlankNode | Literal | NamedNode> {
  readonly defaultValue: Maybe<TermT>;
  readonly hasValue: Maybe<TermT>;
  readonly in_: Maybe<readonly TermT[]>;
  readonly kind: "IdentifierType" | "LiteralType" | "TermType";
  readonly nodeKinds: Set<NodeKind>;
}
