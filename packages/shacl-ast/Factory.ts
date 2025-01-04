import type { Resource } from "rdfjs-resource";
import type { NodeShapeLike } from "./NodeShapeLike.js";
import type { OntologyLike } from "./OntologyLike.js";
import type { PropertyGroupLike } from "./PropertyGroupLike.js";
import type { PropertyShapeLike } from "./PropertyShapeLike.js";
import type { ShapeLike } from "./ShapeLike.js";
import type { ShapesGraphLike } from "./ShapesGraphLike.js";

export type Factory<
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
> = {
  createNodeShape(
    resource: Resource,
    shapesGraph: ShapesGraphLike<
      NodeShapeT,
      OntologyT,
      PropertyGroupT,
      PropertyShapeT,
      ShapeT
    >,
  ): NodeShapeT;

  createOntology(
    resource: Resource,
    shapesGraph: ShapesGraphLike<
      NodeShapeT,
      OntologyT,
      PropertyGroupT,
      PropertyShapeT,
      ShapeT
    >,
  ): OntologyT;

  createPropertyGroup(
    resource: Resource,
    shapesGraph: ShapesGraphLike<
      NodeShapeT,
      OntologyT,
      PropertyGroupT,
      PropertyShapeT,
      ShapeT
    >,
  ): PropertyGroupT;

  createPropertyShape(
    resource: Resource,
    shapesGraph: ShapesGraphLike<
      NodeShapeT,
      OntologyT,
      PropertyGroupT,
      PropertyShapeT,
      ShapeT
    >,
  ): PropertyShapeT;
};
