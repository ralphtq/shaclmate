import { Maybe } from "purify-ts";
import type { ShapesGraphToAstTransformer } from "../ShapesGraphToAstTransformer.js";
import type * as ast from "../ast/index.js";
import * as input from "../input/index.js";
import { pickLiteral } from "./pickLiteral.js";

export function shapeAstName(
  this: ShapesGraphToAstTransformer,
  shape: input.Shape,
): ast.Name {
  let propertyPath: ast.Name["propertyPath"] = Maybe.empty();
  let shName: Maybe<string> = Maybe.empty();

  if (shape instanceof input.PropertyShape) {
    if (shape.path.kind === "PredicatePath") {
      const pathIri = shape.path.iri;
      propertyPath = Maybe.of({
        curie: Maybe.fromNullable(this.iriPrefixMap.shrink(pathIri)?.value),
        identifier: pathIri,
      });
    }

    shName = pickLiteral(shape.names).map((literal) => literal.value);
  }

  return {
    curie:
      shape.identifier.termType === "NamedNode"
        ? Maybe.fromNullable(this.iriPrefixMap.shrink(shape.identifier)?.value)
        : Maybe.empty(),
    identifier: shape.identifier,
    label: pickLiteral(shape.labels).map((literal) => literal.value),
    propertyPath,
    shName: shName,
    shaclmateName: shape.shaclmateName,
  };
}
