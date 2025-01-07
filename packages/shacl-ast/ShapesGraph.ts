import type { BlankNode, NamedNode } from "@rdfjs/types";
import type { Maybe } from "purify-ts";
import type { OntologyLike } from "./OntologyLike.js";

export interface ShapesGraph<
  NodeShapeT extends ShapeT,
  OntologyT extends OntologyLike,
  PropertyGroupT,
  PropertyShapeT extends ShapeT,
  ShapeT,
> {
  readonly ontologies: readonly OntologyT[];

  nodeShapeByIdentifier(identifier: BlankNode | NamedNode): Maybe<NodeShapeT>;
  ontologyByIdentifier(identifier: BlankNode | NamedNode): Maybe<OntologyT>;
  propertyGroupByIdentifier(
    identifier: BlankNode | NamedNode,
  ): Maybe<PropertyGroupT>;
  propertyShapeByIdentifier(
    identifier: BlankNode | NamedNode,
  ): Maybe<PropertyShapeT>;
  shapeByIdentifier(identifier: BlankNode | NamedNode): Maybe<ShapeT>;
}
