import type { BlankNode, Literal, NamedNode } from "@rdfjs/types";
import type { Maybe } from "purify-ts";
import type { NodeShapeLike } from "./NodeShapeLike.js";
import type { OntologyLike } from "./OntologyLike.js";
import type { PropertyGroupLike } from "./PropertyGroupLike.js";
import type { PropertyPath } from "./PropertyPath.js";
import type { ShapeLike } from "./ShapeLike.js";

/**
 * Minimal interface for objects satisfying PropertyShapeLike.
 */
export interface PropertyShapeLike<
  NodeShapeT extends NodeShapeLike<
    any,
    OntologyT,
    PropertyGroupT,
    PropertyShapeT,
    ShapeT
  > &
    ShapeT,
  OntologyT extends OntologyLike,
  PropertyGroupT extends PropertyGroupLike,
  PropertyShapeT extends PropertyShapeLike<
    NodeShapeT,
    OntologyT,
    PropertyGroupT,
    any,
    ShapeT
  > &
    ShapeT,
  ShapeT extends ShapeLike<
    NodeShapeT,
    OntologyT,
    PropertyGroupT,
    PropertyShapeT,
    any
  >,
> extends ShapeLike<
    NodeShapeT,
    OntologyT,
    PropertyGroupT,
    PropertyShapeT,
    ShapeT
  > {
  readonly defaultValue: Maybe<BlankNode | Literal | NamedNode>;
  readonly description: Maybe<Literal>;
  readonly group: Maybe<PropertyGroupT>;
  readonly name: Maybe<Literal>;
  readonly order: Maybe<number>;
  readonly path: PropertyPath;
}
