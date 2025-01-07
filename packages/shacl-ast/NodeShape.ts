import { sh } from "@tpluscode/rdf-ns-builders";
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
      private readonly generatedNodeShape: generated.ShaclCoreNodeShape,
      resource: Resource,
      shapesGraph: ShapesGraph<
        NodeShapeT,
        OntologyT,
        PropertyGroupT,
        PropertyShapeT,
        ShapeT
      >,
    ) {
      super(generatedNodeShape, resource, shapesGraph);
    }

    get closed(): Maybe<boolean> {
      return this.generatedNodeShape.closed;
    }

    get properties(): Maybe<NonEmptyList<PropertyShapeT>> {
      return NonEmptyList.fromArray(
        [...this.resource.values(sh.property)].flatMap((value) =>
          value
            .toIdentifier()
            .toMaybe()
            .chain((shapeNode) =>
              this.shapesGraph.propertyShapeByIdentifier(shapeNode),
            )
            .toList(),
        ),
      );
      // return NonEmptyList.fromArray(
      //   this.generatedNodeShape.properties.flatMap((identifiers) =>
      //     identifiers.flatMap((identifier) =>
      //       this.shapesGraph.propertyShapeByIdentifier(identifier).toList(),
      //     ),
      //   ),
      // );
    }
  }
}
