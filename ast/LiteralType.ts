import type { Literal, NamedNode } from "@rdfjs/types";
import type { Maybe } from "purify-ts";
import type { Name } from ".";

export interface LiteralType {
  readonly datatype: Maybe<NamedNode>;
  readonly hasValue: Maybe<Literal>;
  readonly maxExclusive: Maybe<Literal>;
  readonly maxInclusive: Maybe<Literal>;
  readonly minExclusive: Maybe<Literal>;
  readonly minInclusive: Maybe<Literal>;
  readonly kind: "Literal";
  readonly name: Name;
}
