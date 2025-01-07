import type { BlankNode, Literal, NamedNode } from "@rdfjs/types";
import { Either, Left, Maybe, NonEmptyList } from "purify-ts";
import type { ShapesGraphToAstTransformer } from "../ShapesGraphToAstTransformer.js";
import type * as ast from "../ast/index.js";
import * as input from "../input/index.js";
import { propertyShapeNodeKinds } from "./propertyShapeNodeKinds.js";

/**
 * Try to convert a property shape to an AST IdentifierType using some heuristics.
 */
export function transformPropertyShapeToAstIdentifierType(
  this: ShapesGraphToAstTransformer,
  shape: input.Shape,
  inherited: {
    defaultValue: Maybe<BlankNode | Literal | NamedNode>;
  } | null,
): Either<Error, ast.IdentifierType> {
  // defaultValue / hasValue / in only makes sense with IRIs
  const identifierDefaultValue = (
    shape instanceof input.PropertyShape ? shape.defaultValue : Maybe.empty()
  )
    .alt(inherited !== null ? inherited.defaultValue : Maybe.empty())
    .filter((value) => value.termType === "NamedNode");
  const identifierHasValues: Maybe<NonEmptyList<NamedNode>> =
    shape.constraints.hasValues.chain((hasValues) =>
      NonEmptyList.fromArray(
        hasValues.filter((term) => term.termType === "NamedNode"),
      ),
    );
  const identifierIn = shape.constraints.in_.chain((in_) =>
    NonEmptyList.fromArray(in_.filter((term) => term.termType === "NamedNode")),
  );
  const nodeKinds = propertyShapeNodeKinds(shape);

  if (
    identifierHasValues.isJust() ||
    identifierDefaultValue.isJust() ||
    identifierIn.isJust() ||
    (nodeKinds.size > 0 && nodeKinds.size <= 2 && !nodeKinds.has("Literal"))
  ) {
    return Either.of({
      defaultValue: identifierDefaultValue,
      hasValues: identifierHasValues,
      in_: identifierIn,
      kind: "IdentifierType",
      nodeKinds: nodeKinds as Set<"BlankNode" | "NamedNode">,
    });
  }

  return Left(new Error(`unable to transform ${shape} into an AST type`));
}
