import type { Maybe } from "purify-ts";
import type { OntologyLike } from "./OntologyLike.js";
import type { PropertyGroupLike } from "./PropertyGroupLike.js";
import type { PropertyShapeLike } from "./PropertyShapeLike.js";
import type { ShapeLike } from "./ShapeLike.js";

/**
 * Minimal interface for objects satisfying NodeShapeT.
 */
export interface NodeShapeLike<
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
  readonly constraints: NodeShape.Constraints<
    NodeShapeT,
    OntologyT,
    PropertyGroupT,
    PropertyShapeT,
    ShapeT
  >;
}

export namespace NodeShape {
  export interface Constraints<
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
  > extends ShapeLike.Constraints<
      NodeShapeT,
      OntologyT,
      PropertyGroupT,
      PropertyShapeT,
      ShapeT
    > {
    readonly closed: Maybe<boolean>;
    readonly properties: readonly PropertyShapeT[];
  }
}
