import type { Literal } from "@rdfjs/types";
import { Maybe } from "purify-ts";

export function pickLiteral(literals: readonly Literal[]): Maybe<Literal> {
  if (literals.length === 0) {
    return Maybe.empty();
  }
  for (const literal of literals) {
    if (literal.language === "en") {
      return Maybe.of(literal);
    }
  }
  for (const literal of literals) {
    if (literal.language.length === 0) {
      return Maybe.of(literal);
    }
  }
  return Maybe.of(literals[0]);
}
