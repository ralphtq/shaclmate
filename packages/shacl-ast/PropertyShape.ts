import type { BlankNode, Literal, NamedNode } from "@rdfjs/types";
import { sh } from "@tpluscode/rdf-ns-builders";
import type { Maybe } from "purify-ts";
import type { Resource } from "rdfjs-resource";
import type { OntologyLike } from "./OntologyLike.js";
import { PropertyPath } from "./PropertyPath.js";
import { Shape } from "./Shape.js";
import type { ShapesGraph } from "./ShapesGraph.js";

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
    this.constraints = new Shape.Constraints(resource, shapesGraph);
  }

  get defaultValue(): Maybe<BlankNode | Literal | NamedNode> {
    return this.resource
      .value(sh.defaultValue)
      .map((value) => value.toTerm())
      .toMaybe();
  }

  get description(): Maybe<Literal> {
    return this.resource
      .value(sh.description)
      .chain((value) => value.toLiteral())
      .toMaybe();
  }

  get group(): Maybe<PropertyGroupT> {
    return this.resource
      .value(sh.group)
      .chain((value) => value.toIri())
      .toMaybe()
      .chain((node) => this.shapesGraph.propertyGroupByIdentifier(node));
  }

  get name(): Maybe<Literal> {
    return this.resource
      .value(sh.name)
      .chain((value) => value.toLiteral())
      .toMaybe();
  }

  get order(): Maybe<number> {
    return this.resource
      .value(sh.order)
      .chain((value) => value.toNumber())
      .toMaybe();
  }

  get path(): PropertyPath {
    return this.resource
      .value(sh.path)
      .chain((value) => value.toResource())
      .chain((resource) => PropertyPath.fromRdf({ resource }))
      .unsafeCoerce();
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
