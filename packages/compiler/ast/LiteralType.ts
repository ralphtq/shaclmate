import type { Literal, NamedNode } from "@rdfjs/types";
import type { Maybe, NonEmptyList } from "purify-ts";
import type { RdfjsTermType } from "./RdfjsTermType.js";

export interface LiteralType extends RdfjsTermType<Literal, Literal> {
  readonly datatype: Maybe<NamedNode>;
  readonly kind: "LiteralType";
  readonly languageIn: Maybe<NonEmptyList<string>>;
  readonly maxExclusive: Maybe<Literal>;
  readonly maxInclusive: Maybe<Literal>;
  readonly minExclusive: Maybe<Literal>;
  readonly minInclusive: Maybe<Literal>;
}
