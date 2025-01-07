import { type Maybe, NonEmptyList } from "purify-ts";
import type { OntologyLike } from "./OntologyLike.js";
import { Shape } from "./Shape.js";
import type { ShapesGraph } from "./ShapesGraph.js";
import type * as generated from "./generated.js";

export class NodeShape<
  GeneratedShapeT extends generated.ShaclCoreNodeShape,
  NodeShapeT extends ShapeT,
  OntologyT extends OntologyLike,
  PropertyGroupT,
  PropertyShapeT extends ShapeT,
  ShapeT,
> extends Shape<
  GeneratedShapeT,
  NodeShapeT,
  OntologyT,
  PropertyGroupT,
  PropertyShapeT,
  ShapeT
> {
  readonly constraints: NodeShape.Constraints<
    GeneratedShapeT,
    NodeShapeT,
    OntologyT,
    PropertyGroupT,
    PropertyShapeT,
    ShapeT
  >;

  constructor(
    generatedShape: GeneratedShapeT,
    shapesGraph: ShapesGraph<
      NodeShapeT,
      OntologyT,
      PropertyGroupT,
      PropertyShapeT,
      ShapeT
    >,
  ) {
    super(generatedShape, shapesGraph);
    this.constraints = new NodeShape.Constraints(generatedShape, shapesGraph);
  }

  override toString(): string {
    return `NodeShape(node=${this.identifier.value})`;
  }
}

export namespace NodeShape {
  export class Constraints<
    GeneratedShapeT extends generated.ShaclCoreShape,
    NodeShapeT extends ShapeT,
    OntologyT extends OntologyLike,
    PropertyGroupT,
    PropertyShapeT extends ShapeT,
    ShapeT,
  > extends Shape.Constraints<
    GeneratedShapeT,
    NodeShapeT,
    OntologyT,
    PropertyGroupT,
    PropertyShapeT,
    ShapeT
  > {
    get closed(): Maybe<boolean> {
      return (this.generatedShape as generated.ShaclCoreNodeShape).closed;
    }

    get properties(): Maybe<NonEmptyList<PropertyShapeT>> {
      return NonEmptyList.fromArray(
        (
          this.generatedShape as generated.ShaclCoreNodeShape
        ).properties.flatMap((identifier) =>
          this.shapesGraph.propertyShapeByIdentifier(identifier).toList(),
        ),
      );
    }
  }
}
