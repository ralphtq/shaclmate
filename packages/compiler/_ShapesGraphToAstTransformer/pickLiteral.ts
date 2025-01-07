import type { Literal } from "@rdfjs/types";
import { Maybe, type NonEmptyList } from "purify-ts";

export function pickLiteral(
  literals: Maybe<NonEmptyList<Literal>>,
): Maybe<Literal> {
  return literals.chain((literals) => {
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
  });
}
