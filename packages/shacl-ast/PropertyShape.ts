import type { BlankNode, Literal, NamedNode } from "@rdfjs/types";
import { type Maybe, NonEmptyList } from "purify-ts";
import type { Resource } from "rdfjs-resource";
import type { OntologyLike } from "./OntologyLike.js";
import type { PropertyPath } from "./PropertyPath.js";
import { Shape } from "./Shape.js";
import type { ShapesGraph } from "./ShapesGraph.js";
import * as generated from "./generated.js";

export class PropertyShape<
  NodeShapeT extends ShapeT,
  OntologyT extends OntologyLike,
  PropertyGroupT,
  PropertyShapeT extends ShapeT,
  ShapeT,
> extends Shape<NodeShapeT, OntologyT, PropertyGroupT, PropertyShapeT, ShapeT> {
  readonly constraints: Shape.Constraints<
    NodeShapeT,
    OntologyT,
    PropertyGroupT,
    PropertyShapeT,
    ShapeT
  >;
  private readonly generatedShaclCorePropertyShape: generated.ShaclCorePropertyShape;

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
    this.generatedShaclCorePropertyShape =
      generated.ShaclCorePropertyShape.fromRdf({
        ignoreRdfType: true,
        resource,
      }).unsafeCoerce();
    this.constraints = new Shape.Constraints(
      this.generatedShaclCorePropertyShape,
      resource,
      shapesGraph,
    );
  }

  get defaultValue(): Maybe<BlankNode | Literal | NamedNode> {
    return this.generatedShaclCorePropertyShape.defaultValue;
  }

  get descriptions(): Maybe<NonEmptyList<Literal>> {
    return NonEmptyList.fromArray(
      this.generatedShaclCorePropertyShape.descriptions,
    );
  }

  get groups(): Maybe<NonEmptyList<PropertyGroupT>> {
    return NonEmptyList.fromArray(
      this.generatedShaclCorePropertyShape.groups.flatMap((identifier) =>
        this.shapesGraph.propertyGroupByIdentifier(identifier).toList(),
      ),
    );
  }

  get names(): Maybe<NonEmptyList<Literal>> {
    return NonEmptyList.fromArray(this.generatedShaclCorePropertyShape.names);
  }

  get order(): Maybe<number> {
    return this.generatedShaclCorePropertyShape.order;
  }

  get path(): PropertyPath {
    return this.generatedShaclCorePropertyShape.path;
  }

  override toString(): string {
    const keyValues: string[] = [`node=${this.resource.identifier.value}`];
    const path = this.path;
    if (path.kind === "PredicatePath") {
      keyValues.push(`path=${path.iri.value}`);
    }
    return `PropertyShape(${keyValues.join(", ")})`;
  }
}
