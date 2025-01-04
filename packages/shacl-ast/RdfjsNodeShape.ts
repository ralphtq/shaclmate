import { sh } from "@tpluscode/rdf-ns-builders";
import type { Maybe } from "purify-ts";
import type { Resource } from "rdfjs-resource";
import type { OntologyLike } from "./OntologyLike.js";
import { RdfjsShape } from "./RdfjsShape.js";
import type { ShapesGraphLike } from "./ShapesGraphLike.js";

export class RdfjsNodeShape<
  NodeShapeT extends ShapeT,
  OntologyT extends OntologyLike,
  PropertyGroupT,
  PropertyShapeT extends ShapeT,
  ShapeT,
> extends RdfjsShape<
  NodeShapeT,
  OntologyT,
  PropertyGroupT,
  PropertyShapeT,
  ShapeT
> {
  readonly constraints: RdfjsNodeShape.Constraints<
    NodeShapeT,
    OntologyT,
    PropertyGroupT,
    PropertyShapeT,
    ShapeT
  >;

  constructor(
    resource: Resource,
    shapesGraph: ShapesGraphLike<
      NodeShapeT,
      OntologyT,
      PropertyGroupT,
      PropertyShapeT,
      ShapeT
    >,
  ) {
    super(resource, shapesGraph);
    this.constraints = new RdfjsNodeShape.Constraints(resource, shapesGraph);
  }

  override toString(): string {
    return `NodeShape(node=${this.resource.identifier.value})`;
  }
}

export namespace RdfjsNodeShape {
  export class Constraints<
    NodeShapeT extends ShapeT,
    OntologyT extends OntologyLike,
    PropertyGroupT,
    PropertyShapeT extends ShapeT,
    ShapeT,
  > extends RdfjsShape.Constraints<
    NodeShapeT,
    OntologyT,
    PropertyGroupT,
    PropertyShapeT,
    ShapeT
  > {
    get closed(): Maybe<boolean> {
      return this.resource
        .value(sh.closed)
        .chain((value) => value.toBoolean())
        .toMaybe();
    }

    get properties(): readonly PropertyShapeT[] {
      return [...this.resource.values(sh.property)].flatMap((value) =>
        value
          .toIdentifier()
          .toMaybe()
          .chain((shapeNode) =>
            this.shapesGraph.propertyShapeByIdentifier(shapeNode),
          )
          .toList(),
      );
    }
  }
}
