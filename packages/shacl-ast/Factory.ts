import type { Resource } from "rdfjs-resource";
import type { OntologyLike } from "./OntologyLike.js";
import type { ShapesGraphLike } from "./ShapesGraphLike.js";

export type Factory<
  NodeShapeT extends ShapeT,
  OntologyT extends OntologyLike,
  PropertyGroupT,
  PropertyShapeT extends ShapeT,
  ShapeT,
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
