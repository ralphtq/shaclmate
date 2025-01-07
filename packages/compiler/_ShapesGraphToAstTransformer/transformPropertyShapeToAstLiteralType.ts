import type { BlankNode, Literal, NamedNode } from "@rdfjs/types";
import { Either, Left, Maybe, NonEmptyList } from "purify-ts";
import type { ShapesGraphToAstTransformer } from "../ShapesGraphToAstTransformer.js";
import type * as ast from "../ast/index.js";
import * as input from "../input/index.js";
import { propertyShapeNodeKinds } from "./propertyShapeNodeKinds.js";

/**
 * Try to convert a property shape to an AST LiteralType using some heuristics.
 */
export function transformPropertyShapeToAstLiteralType(
  this: ShapesGraphToAstTransformer,
  shape: input.Shape,
  inherited: {
    defaultValue: Maybe<BlankNode | Literal | NamedNode>;
  } | null,
): Either<Error, ast.LiteralType> {
  const literalDefaultValue: Maybe<Literal> = (
    shape instanceof input.PropertyShape ? shape.defaultValue : Maybe.empty()
  )
    .alt(inherited !== null ? inherited.defaultValue : Maybe.empty())
    .filter((term) => term.termType === "Literal") as Maybe<Literal>;
  const literalHasValues = shape.constraints.hasValues.chain((hasValues) =>
    NonEmptyList.fromArray(
      hasValues.filter((term) => term.termType === "Literal"),
    ),
  );
  const literalIn = shape.constraints.in_.chain((in_) =>
    NonEmptyList.fromArray(in_.filter((term) => term.termType === "Literal")),
  );
  const nodeKinds = propertyShapeNodeKinds(shape);

  if (
    [
      // Treat any shape with the constraints in the list as a literal type
      shape.constraints.datatype,
      shape.constraints.languageIn,
      shape.constraints.maxExclusive,
      shape.constraints.maxInclusive,
      shape.constraints.minExclusive,
      shape.constraints.minInclusive,
    ].some((constraint) => constraint.isJust()) ||
    literalDefaultValue.isJust() ||
    literalHasValues.isJust() ||
    literalIn.isJust() ||
    // Treat any shape with a single sh:nodeKind of sh:Literal as a literal type
    (nodeKinds.size === 1 && nodeKinds.has("Literal"))
  ) {
    return Either.of({
      datatype: shape.constraints.datatype,
      defaultValue: literalDefaultValue,
      hasValues: literalHasValues,
      in_: literalIn,
      kind: "LiteralType",
      languageIn: shape.constraints.languageIn,
      maxExclusive: shape.constraints.maxExclusive,
      maxInclusive: shape.constraints.maxInclusive,
      minExclusive: shape.constraints.minExclusive,
      minInclusive: shape.constraints.minInclusive,
      nodeKinds: new Set<"Literal">(["Literal"]),
    });
  }

  return Left(new Error(`unable to transform ${shape} into an AST type`));
}
