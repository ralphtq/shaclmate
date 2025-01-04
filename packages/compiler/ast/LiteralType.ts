import type { Literal, NamedNode } from "@rdfjs/types";
import type { NodeKind } from "@shaclmate/shacl-ast";
import type { Maybe, NonEmptyList } from "purify-ts";
import type { TermType } from "./TermType.js";

export interface LiteralType extends TermType<Literal> {
  readonly datatype: Maybe<NamedNode>;
  readonly kind: "LiteralType";
  readonly languageIn: Maybe<NonEmptyList<string>>;
  readonly maxExclusive: Maybe<Literal>;
  readonly maxInclusive: Maybe<Literal>;
  readonly minExclusive: Maybe<Literal>;
  readonly minInclusive: Maybe<Literal>;
  readonly nodeKinds: Set<NodeKind.LITERAL>;
}
