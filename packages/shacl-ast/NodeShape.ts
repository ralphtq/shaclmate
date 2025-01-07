import { type Maybe, NonEmptyList } from "purify-ts";
import type { Resource } from "rdfjs-resource";
import type { OntologyLike } from "./OntologyLike.js";
import { Shape } from "./Shape.js";
import type { ShapesGraph } from "./ShapesGraph.js";
import * as generated from "./generated.js";

export class NodeShape<
  NodeShapeT extends ShapeT,
  OntologyT extends OntologyLike,
  PropertyGroupT,
  PropertyShapeT extends ShapeT,
  ShapeT,
> extends Shape<NodeShapeT, OntologyT, PropertyGroupT, PropertyShapeT, ShapeT> {
  readonly constraints: NodeShape.Constraints<
    NodeShapeT,
    OntologyT,
    PropertyGroupT,
    PropertyShapeT,
    ShapeT
  >;
  private readonly generatedNodeShape: generated.ShaclCoreNodeShape;

  constructor(
    resource: Resource,
    shapesGraph: ShapesGraph<
      NodeShapeT,
      OntologyT,
      PropertyGroupT,
      PropertyShapeT,
      ShapeT
    >,
  ) {
    super(resource, shapesGraph);
    this.generatedNodeShape = generated.ShaclCoreNodeShape.fromRdf({
      ignoreRdfType: true,
      resource,
    }).unsafeCoerce();
    this.constraints = new NodeShape.Constraints(
      this.generatedNodeShape,
      resource,
      shapesGraph,
    );
  }

  override toString(): string {
    return `NodeShape(node=${this.resource.identifier.value})`;
  }
}

export namespace NodeShape {
  export class Constraints<
    NodeShapeT extends ShapeT,
    OntologyT extends OntologyLike,
    PropertyGroupT,
    PropertyShapeT extends ShapeT,
    ShapeT,
  > extends Shape.Constraints<
    NodeShapeT,
    OntologyT,
    PropertyGroupT,
    PropertyShapeT,
    ShapeT
  > {
    constructor(
      private readonly generatedShaclCoreNodeShape: generated.ShaclCoreNodeShape,
      resource: Resource,
      shapesGraph: ShapesGraph<
        NodeShapeT,
        OntologyT,
        PropertyGroupT,
        PropertyShapeT,
        ShapeT
      >,
    ) {
      super(generatedShaclCoreNodeShape, resource, shapesGraph);
    }

    get closed(): Maybe<boolean> {
      return this.generatedShaclCoreNodeShape.closed;
    }

    get properties(): Maybe<NonEmptyList<PropertyShapeT>> {
      return NonEmptyList.fromArray(
        this.generatedShaclCoreNodeShape.properties.flatMap((identifier) =>
          this.shapesGraph.propertyShapeByIdentifier(identifier).toList(),
        ),
      );
    }
  }
}
