import type { BlankNode, Literal, NamedNode } from "@rdfjs/types";
import { shaclmate } from "@shaclmate/compiler/vocabularies/index";
import { rdfs, sh } from "@tpluscode/rdf-ns-builders";
import { Maybe, NonEmptyList } from "purify-ts";
import type { Resource } from "rdfjs-resource";
import { NodeKind } from "./NodeKind.js";
import type { OntologyLike } from "./OntologyLike.js";
import type { ShapesGraph } from "./ShapesGraph.js";

export abstract class RdfjsShape<
  NodeShapeT extends ShapeT,
  OntologyT extends OntologyLike,
  PropertyGroupT,
  PropertyShapeT extends ShapeT,
  ShapeT,
> {
  abstract readonly constraints: RdfjsShape.Constraints<
    NodeShapeT,
    OntologyT,
    PropertyGroupT,
    PropertyShapeT,
    ShapeT
  >;
  readonly targets: RdfjsShape.Targets;

  protected constructor(
    readonly resource: Resource,
    protected readonly shapesGraph: ShapesGraph<
      NodeShapeT,
      OntologyT,
      PropertyGroupT,
      PropertyShapeT,
      ShapeT
    >,
  ) {
    this.targets = new RdfjsShape.Targets(resource);
  }

  get comment(): Maybe<Literal> {
    return this.resource
      .value(rdfs.comment)
      .chain((value) => value.toLiteral())
      .toMaybe();
  }

  get identifier(): Resource.Identifier {
    return this.resource.identifier;
  }

  get isDefinedBy(): Maybe<OntologyT> {
    const isDefinedByValue = this.resource.value(rdfs.isDefinedBy);
    if (isDefinedByValue.isRight()) {
      // If there's an rdfs:isDefinedBy statement on the shape then don't fall back to anything else
      return isDefinedByValue
        .chain((value) => value.toIdentifier())
        .toMaybe()
        .chain((identifier) =>
          this.shapesGraph.ontologyByIdentifier(identifier),
        );
    }

    // No rdfs:isDefinedBy statement on the shape

    const ontologies = this.shapesGraph.ontologies;
    if (ontologies.length === 1) {
      // If there's a single ontology in the shapes graph, consider the shape a part of the ontology
      return Maybe.of(ontologies[0]);
    }

    if (this.identifier.termType === "NamedNode") {
      const prefixOntologies = ontologies.filter(
        (ontology) =>
          ontology.identifier.termType === "NamedNode" &&
          this.identifier.value.startsWith(ontology.identifier.value),
      );
      if (prefixOntologies.length === 1) {
        // If there's a single ontology whose IRI is a prefix of this shape's IRI, consider the shape a part of the ontology
        return Maybe.of(prefixOntologies[0]);
      }
    }

    return Maybe.empty();
  }

  get label(): Maybe<Literal> {
    return this.resource
      .value(rdfs.label)
      .chain((value) => value.toLiteral())
      .toMaybe();
  }

  get mutable(): Maybe<boolean> {
    return this.resource
      .value(shaclmate.mutable)
      .chain((value) => value.toBoolean())
      .toMaybe();
  }
}

export namespace RdfjsShape {
  export class Constraints<
    NodeShapeT extends ShapeT,
    OntologyT extends OntologyLike,
    PropertyGroupT,
    PropertyShapeT extends ShapeT,
    ShapeT,
  > {
    constructor(
      protected readonly resource: Resource,
      protected readonly shapesGraph: ShapesGraph<
        NodeShapeT,
        OntologyT,
        PropertyGroupT,
        PropertyShapeT,
        ShapeT
      >,
    ) {}

    get and(): Maybe<NonEmptyList<ShapeT>> {
      return this.listTakingLogicalConstraint(sh.and);
    }

    get classes(): Maybe<NonEmptyList<NamedNode>> {
      return NonEmptyList.fromArray(
        [...this.resource.values(sh.class)].flatMap((value) =>
          value.toIri().toMaybe().toList(),
        ),
      );
    }

    get datatype(): Maybe<NamedNode> {
      return this.resource
        .value(sh.datatype)
        .chain((value) => value.toIri())
        .toMaybe();
    }

    get hasValue(): Maybe<BlankNode | Literal | NamedNode> {
      return this.resource
        .value(sh.hasValue)
        .map((value) => value.toTerm())
        .toMaybe();
    }

    get in_(): Maybe<NonEmptyList<BlankNode | Literal | NamedNode>> {
      return this.resource
        .value(sh.in)
        .chain((value) => value.toList())
        .map((values) => values.map((value) => value.toTerm()))
        .toMaybe()
        .chain(NonEmptyList.fromArray);
    }

    get languageIn(): Maybe<NonEmptyList<string>> {
      return this.resource
        .value(sh.languageIn)
        .chain((value) => value.toList())
        .map((values) =>
          values.flatMap((value) => value.toString().toMaybe().toList()),
        )
        .toMaybe()
        .chain(NonEmptyList.fromArray);
    }

    get maxCount(): Maybe<number> {
      return this.resource
        .value(sh.maxCount)
        .chain((value) => value.toNumber())
        .toMaybe();
    }

    get maxExclusive(): Maybe<Literal> {
      return this.resource
        .value(sh.maxExclusive)
        .chain((value) => value.toLiteral())
        .toMaybe();
    }

    get maxInclusive(): Maybe<Literal> {
      return this.resource
        .value(sh.maxInclusive)
        .chain((value) => value.toLiteral())
        .toMaybe();
    }

    get minCount(): Maybe<number> {
      return this.resource
        .value(sh.minCount)
        .chain((value) => value.toNumber())
        .toMaybe();
    }

    get minExclusive(): Maybe<Literal> {
      return this.resource
        .value(sh.minExclusive)
        .chain((value) => value.toLiteral())
        .toMaybe();
    }

    get minInclusive(): Maybe<Literal> {
      return this.resource
        .value(sh.minInclusive)
        .chain((value) => value.toLiteral())
        .toMaybe();
    }

    get nodeKinds(): Maybe<Set<NodeKind>> {
      const nodeKinds = new Set<NodeKind>();
      for (const nodeKindValue of this.resource.values(sh.nodeKind)) {
        nodeKindValue.toIri().ifRight((nodeKindIri) => {
          if (nodeKindIri.equals(sh.BlankNode)) {
            nodeKinds.add(NodeKind.BLANK_NODE);
          } else if (nodeKindIri.equals(sh.BlankNodeOrIRI)) {
            nodeKinds.add(NodeKind.BLANK_NODE);
            nodeKinds.add(NodeKind.IRI);
          } else if (nodeKindIri.equals(sh.BlankNodeOrLiteral)) {
            nodeKinds.add(NodeKind.BLANK_NODE);
            nodeKinds.add(NodeKind.LITERAL);
          } else if (nodeKindIri.equals(sh.IRI)) {
            nodeKinds.add(NodeKind.IRI);
          } else if (nodeKindIri.equals(sh.IRIOrLiteral)) {
            nodeKinds.add(NodeKind.IRI);
            nodeKinds.add(NodeKind.LITERAL);
          } else if (nodeKindIri.equals(sh.Literal)) {
            nodeKinds.add(NodeKind.LITERAL);
          }
        });
      }
      return nodeKinds.size > 0 ? Maybe.of(nodeKinds) : Maybe.empty();
    }

    get nodes(): Maybe<NonEmptyList<NodeShapeT>> {
      return NonEmptyList.fromArray(
        [...this.resource.values(sh.node)].flatMap((value) =>
          value
            .toIdentifier()
            .toMaybe()
            .chain((identifier) =>
              this.shapesGraph.nodeShapeByIdentifier(identifier),
            )
            .toList(),
        ),
      );
    }

    get not(): Maybe<NonEmptyList<ShapeT>> {
      return NonEmptyList.fromArray(
        [...this.resource.values(sh.not)].flatMap((value) =>
          value
            .toIdentifier()
            .toMaybe()
            .chain((identifier) =>
              this.shapesGraph.shapeByIdentifier(identifier),
            )
            .toList(),
        ),
      );
    }

    get or(): Maybe<NonEmptyList<ShapeT>> {
      return this.listTakingLogicalConstraint(sh.or);
    }

    get xone(): Maybe<NonEmptyList<ShapeT>> {
      return this.listTakingLogicalConstraint(sh.xone);
    }

    private listTakingLogicalConstraint(
      predicate: NamedNode,
    ): Maybe<NonEmptyList<ShapeT>> {
      return this.resource
        .value(predicate)
        .chain((value) => value.toList())
        .map((values) =>
          values.flatMap((value) =>
            value
              .toIdentifier()
              .toMaybe()
              .chain((identifier) =>
                this.shapesGraph.shapeByIdentifier(identifier),
              )
              .toList(),
          ),
        )
        .toMaybe()
        .chain(NonEmptyList.fromArray);
    }
  }

  export class Targets {
    constructor(protected readonly resource: Resource) {}

    get targetClasses(): Maybe<NonEmptyList<NamedNode>> {
      return NonEmptyList.fromArray(
        [...this.resource.values(sh.targetClass)].flatMap((value) =>
          value.toIri().toMaybe().toList(),
        ),
      );
    }

    get targetNodes(): Maybe<NonEmptyList<Literal | NamedNode>> {
      return NonEmptyList.fromArray(
        [...this.resource.values(sh.targetNode)].flatMap((value) =>
          (value.toLiteral().toMaybe() as Maybe<Literal | NamedNode>)
            .altLazy(() => value.toIri().toMaybe())
            .toList(),
        ),
      );
    }

    get targetObjectsOf(): Maybe<NonEmptyList<NamedNode>> {
      return NonEmptyList.fromArray(
        [...this.resource.values(sh.targetObjectsOf)].flatMap((value) =>
          value.toIri().toMaybe().toList(),
        ),
      );
    }

    get targetSubjectsOf(): Maybe<NonEmptyList<NamedNode>> {
      return NonEmptyList.fromArray(
        [...this.resource.values(sh.targetSubjectsOf)].flatMap((value) =>
          value.toIri().toMaybe().toList(),
        ),
      );
    }
  }
}