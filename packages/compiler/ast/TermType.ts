import type { BlankNode, Literal, NamedNode } from "@rdfjs/types";
import type { Maybe } from "purify-ts";

export interface TermType<
  _TermT extends BlankNode | Literal | NamedNode,
  ValueTermT extends Literal | NamedNode,
> {
  readonly defaultValue: Maybe<ValueTermT>;
  readonly hasValue: Maybe<ValueTermT>;
  readonly in_: Maybe<readonly ValueTermT[]>;
  readonly kind: "IdentifierType" | "LiteralType";
}
