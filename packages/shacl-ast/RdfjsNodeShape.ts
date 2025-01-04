import { sh } from "@tpluscode/rdf-ns-builders";
import type { Maybe } from "purify-ts";
import type { Resource } from "rdfjs-resource";
import type { NodeShapeLike } from "./NodeShapeLike.js";
import type { OntologyLike } from "./OntologyLike.js";
import type { PropertyGroupLike } from "./PropertyGroupLike.js";
import type { PropertyShapeLike } from "./PropertyShapeLike.js";
import { RdfjsShape } from "./RdfjsShape.js";
import type { ShapeLike } from "./ShapeLike.js";
import type { ShapesGraphLike } from "./ShapesGraphLike.js";

export class RdfjsNodeShape<
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
  >
  extends RdfjsShape<
    NodeShapeT,
    OntologyT,
    PropertyGroupT,
    PropertyShapeT,
    ShapeT
  >
  implements
    NodeShapeLike<NodeShapeT, OntologyT, PropertyGroupT, PropertyShapeT, ShapeT>
{
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
