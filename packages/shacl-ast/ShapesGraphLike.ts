import type { BlankNode, NamedNode } from "@rdfjs/types";
import type { Maybe } from "purify-ts";
import type { NodeShapeLike } from "./NodeShapeLike.js";
import type { OntologyLike } from "./OntologyLike.js";
import type { PropertyGroupLike } from "./PropertyGroupLike.js";
import type { PropertyShapeLike } from "./PropertyShapeLike.js";
import type { ShapeLike } from "./ShapeLike.js";

export interface ShapesGraphLike<
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
> {
  readonly ontologies: readonly OntologyT[];

  nodeShapeByIdentifier(identifier: BlankNode | NamedNode): Maybe<NodeShapeT>;
  ontologyByIdentifier(identifier: BlankNode | NamedNode): Maybe<OntologyT>;
  propertyGroupByIdentifier(identifier: NamedNode): Maybe<PropertyGroupT>;
  propertyShapeByIdentifier(
    identifier: BlankNode | NamedNode,
  ): Maybe<PropertyShapeT>;
  shapeByIdentifier(identifier: BlankNode | NamedNode): Maybe<ShapeT>;
}
