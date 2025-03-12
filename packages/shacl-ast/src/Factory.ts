import type { Either } from "purify-ts";
import type { Resource } from "rdfjs-resource";
import type { OntologyLike } from "./OntologyLike.js";
import type { ShapesGraph } from "./ShapesGraph.js";

export interface Factory<
  NodeShapeT extends ShapeT,
  OntologyT extends OntologyLike,
  PropertyGroupT,
  PropertyShapeT extends ShapeT,
  ShapeT,
> {
  nodeShapeFromRdf(parameters: {
    resource: Resource;
    shapesGraph: ShapesGraph<
      NodeShapeT,
      OntologyT,
      PropertyGroupT,
      PropertyShapeT,
      ShapeT
    >;
  }): Either<Error, NodeShapeT>;

  ontologyFromRdf(parameters: {
    resource: Resource;
    shapesGraph: ShapesGraph<
      NodeShapeT,
      OntologyT,
      PropertyGroupT,
      PropertyShapeT,
      ShapeT
    >;
  }): Either<Error, OntologyT>;

  propertyGroupFromRdf(parameters: {
    resource: Resource;
    shapesGraph: ShapesGraph<
      NodeShapeT,
      OntologyT,
      PropertyGroupT,
      PropertyShapeT,
      ShapeT
    >;
  }): Either<Error, PropertyGroupT>;

  propertyShapeFromRdf(parameters: {
    resource: Resource;
    shapesGraph: ShapesGraph<
      NodeShapeT,
      OntologyT,
      PropertyGroupT,
      PropertyShapeT,
      ShapeT
    >;
  }): Either<Error, PropertyShapeT>;
}
