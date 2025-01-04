import type { BlankNode, Literal, NamedNode } from "@rdfjs/types";
import type { Maybe, NonEmptyList } from "purify-ts";
import type { NodeKind } from "./NodeKind.js";
import type { NodeShapeLike } from "./NodeShapeLike.js";
import type { OntologyLike } from "./OntologyLike.js";
import type { PropertyGroupLike } from "./PropertyGroupLike.js";
import type { PropertyShapeLike } from "./PropertyShapeLike.js";

export interface ShapeLike<
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
  readonly comment: Maybe<Literal>;
  readonly constraints: ShapeLike.Constraints<
    NodeShapeT,
    OntologyT,
    PropertyGroupT,
    PropertyShapeT,
    ShapeT
  >;
  readonly identifier: BlankNode | NamedNode;
  readonly isDefinedBy: Maybe<OntologyT>;
  readonly label: Maybe<Literal>;
  readonly mutable: Maybe<boolean>;
  readonly targets: ShapeLike.Targets;
}

export namespace ShapeLike {
  export interface Constraints<
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
    readonly and: Maybe<NonEmptyList<ShapeT>>;
    readonly classes: Maybe<NonEmptyList<NamedNode>>;
    readonly datatype: Maybe<NamedNode>;
    readonly hasValue: Maybe<BlankNode | Literal | NamedNode>;
    readonly in_: Maybe<NonEmptyList<BlankNode | Literal | NamedNode>>;
    readonly languageIn: Maybe<NonEmptyList<string>>;
    readonly maxCount: Maybe<number>;
    readonly maxExclusive: Maybe<Literal>;
    readonly maxInclusive: Maybe<Literal>;
    readonly minCount: Maybe<number>;
    readonly minExclusive: Maybe<Literal>;
    readonly minInclusive: Maybe<Literal>;
    readonly nodeKinds: Maybe<Set<NodeKind>>;
    readonly nodes: Maybe<NonEmptyList<NodeShapeT>>;
    readonly not: Maybe<NonEmptyList<ShapeT>>;
    readonly or: Maybe<NonEmptyList<ShapeT>>;
    readonly xone: Maybe<NonEmptyList<ShapeT>>;
  }

  export interface Targets {
    readonly targetClasses: Maybe<NonEmptyList<NamedNode>>;
    readonly targetNodes: Maybe<NonEmptyList<Literal | NamedNode>>;
    readonly targetObjectsOf: Maybe<NonEmptyList<NamedNode>>;
    readonly targetSubjectsOf: Maybe<NonEmptyList<NamedNode>>;
  }
}
