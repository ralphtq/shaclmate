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
  private readonly generatedPropertyShape: generated.ShaclCorePropertyShape;

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
    this.generatedPropertyShape = generated.ShaclCorePropertyShape.fromRdf({
      resource,
    }).unsafeCoerce();
    this.constraints = new Shape.Constraints(
      this.generatedPropertyShape,
      resource,
      shapesGraph,
    );
  }

  get defaultValue(): Maybe<BlankNode | Literal | NamedNode> {
    return this.generatedPropertyShape.defaultValue;
  }

  get descriptions(): Maybe<NonEmptyList<Literal>> {
    return NonEmptyList.fromArray(this.generatedPropertyShape.descriptions);
  }

  get groups(): Maybe<NonEmptyList<PropertyGroupT>> {
    return NonEmptyList.fromArray(
      this.generatedPropertyShape.groups.flatMap((identifier) =>
        this.shapesGraph.propertyGroupByIdentifier(identifier).toList(),
      ),
    );
  }

  get names(): Maybe<NonEmptyList<Literal>> {
    return NonEmptyList.fromArray(this.generatedPropertyShape.names);
  }

  get order(): Maybe<number> {
    return this.generatedPropertyShape.order;
  }

  get path(): PropertyPath {
    return this.generatedPropertyShape.path;
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
