import type { BlankNode, Literal, NamedNode } from "@rdfjs/types";
import { sh } from "@tpluscode/rdf-ns-builders";
import type { Maybe } from "purify-ts";
import type { Resource } from "rdfjs-resource";
import type { OntologyLike } from "./OntologyLike.js";
import { PropertyPath } from "./PropertyPath.js";
import { RdfjsShape } from "./RdfjsShape.js";
import type { ShapesGraphLike } from "./ShapesGraphLike.js";

export class RdfjsPropertyShape<
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
  readonly constraints: RdfjsShape.Constraints<
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
    this.constraints = new RdfjsShape.Constraints(resource, shapesGraph);
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
      .chain(PropertyPath.fromResource)
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
