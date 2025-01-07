import type { BlankNode, Literal, NamedNode } from "@rdfjs/types";
import { type Maybe, NonEmptyList } from "purify-ts";
import type { OntologyLike } from "./OntologyLike.js";
import type { PropertyPath } from "./PropertyPath.js";
import { Shape } from "./Shape.js";
import type { ShapesGraph } from "./ShapesGraph.js";
import type * as generated from "./generated.js";

export class PropertyShape<
  GeneratedShapeT extends generated.ShaclCorePropertyShape,
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
  readonly constraints: Shape.Constraints<
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
    this.constraints = new Shape.Constraints(generatedShape, shapesGraph);
  }

  get defaultValue(): Maybe<BlankNode | Literal | NamedNode> {
    return this.generatedShape.defaultValue;
  }

  get descriptions(): Maybe<NonEmptyList<Literal>> {
    return NonEmptyList.fromArray(this.generatedShape.descriptions);
  }

  get groups(): Maybe<NonEmptyList<PropertyGroupT>> {
    return NonEmptyList.fromArray(
      this.generatedShape.groups.flatMap((identifier) =>
        this.shapesGraph.propertyGroupByIdentifier(identifier).toList(),
      ),
    );
  }

  get names(): Maybe<NonEmptyList<Literal>> {
    return NonEmptyList.fromArray(this.generatedShape.names);
  }

  get order(): Maybe<number> {
    return this.generatedShape.order;
  }

  get path(): PropertyPath {
    return this.generatedShape.path;
  }

  override toString(): string {
    const keyValues: string[] = [`node=${this.identifier.value}`];
    const path = this.path;
    if (path.kind === "PredicatePath") {
      keyValues.push(`path=${path.iri.value}`);
    }
    return `PropertyShape(${keyValues.join(", ")})`;
  }
}
