import type { BlankNode, Literal, NamedNode } from "@rdfjs/types";
import { Maybe, NonEmptyList } from "purify-ts";
import type { NodeKind } from "./NodeKind.js";
import type { OntologyLike } from "./OntologyLike.js";
import type { ShapesGraph } from "./ShapesGraph.js";
import type * as generated from "./generated.js";

export abstract class Shape<
  NodeShapeT extends ShapeT,
  OntologyT extends OntologyLike,
  PropertyGroupT,
  PropertyShapeT extends ShapeT,
  ShapeT,
> {
  abstract readonly constraints: Shape.Constraints<
    NodeShapeT,
    OntologyT,
    PropertyGroupT,
    PropertyShapeT,
    ShapeT
  >;
  readonly targets: Shape.Targets;

  constructor(
    private readonly generatedShaclCoreShape: generated.ShaclCoreShape,
    protected readonly shapesGraph: ShapesGraph<
      NodeShapeT,
      OntologyT,
      PropertyGroupT,
      PropertyShapeT,
      ShapeT
    >,
  ) {
    this.targets = new Shape.Targets(this.generatedShaclCoreShape);
  }

  get comments(): Maybe<NonEmptyList<Literal>> {
    return NonEmptyList.fromArray(this.generatedShaclCoreShape.comments);
  }

  get identifier(): BlankNode | NamedNode {
    return this.generatedShaclCoreShape.identifier;
  }

  get isDefinedBy(): Maybe<OntologyT> {
    if (this.generatedShaclCoreShape.isDefinedBy.isJust()) {
      // If there's an rdfs:isDefinedBy statement on the shape then don't fall back to anything else
      return this.shapesGraph.ontologyByIdentifier(
        this.generatedShaclCoreShape.isDefinedBy.unsafeCoerce(),
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

  get labels(): Maybe<NonEmptyList<Literal>> {
    return NonEmptyList.fromArray(this.generatedShaclCoreShape.labels);
  }
}

export namespace Shape {
  export class Constraints<
    NodeShapeT extends ShapeT,
    OntologyT extends OntologyLike,
    PropertyGroupT,
    PropertyShapeT extends ShapeT,
    ShapeT,
  > {
    constructor(
      private readonly generatedShaclCoreShape: generated.ShaclCoreShape,
      protected readonly shapesGraph: ShapesGraph<
        NodeShapeT,
        OntologyT,
        PropertyGroupT,
        PropertyShapeT,
        ShapeT
      >,
    ) {}

    get and(): Maybe<NonEmptyList<ShapeT>> {
      return NonEmptyList.fromArray(
        this.generatedShaclCoreShape.and.flatMap((identifiers) =>
          identifiers.flatMap((identifier) =>
            this.shapesGraph.shapeByIdentifier(identifier).toList(),
          ),
        ),
      );
    }

    get classes(): Maybe<NonEmptyList<NamedNode>> {
      return NonEmptyList.fromArray(this.generatedShaclCoreShape.classes);
    }

    get datatype(): Maybe<NamedNode> {
      return this.generatedShaclCoreShape.datatype;
    }

    get hasValues(): Maybe<NonEmptyList<BlankNode | Literal | NamedNode>> {
      return NonEmptyList.fromArray(this.generatedShaclCoreShape.hasValues);
    }

    get in_(): Maybe<NonEmptyList<BlankNode | Literal | NamedNode>> {
      return this.generatedShaclCoreShape.in_.chain(NonEmptyList.fromArray);
    }

    get languageIn(): Maybe<NonEmptyList<string>> {
      return this.generatedShaclCoreShape.languageIn.chain(
        NonEmptyList.fromArray,
      );
    }

    get maxCount(): Maybe<number> {
      return this.generatedShaclCoreShape.maxCount;
    }

    get maxExclusive(): Maybe<Literal> {
      return this.generatedShaclCoreShape.maxExclusive;
    }

    get maxInclusive(): Maybe<Literal> {
      return this.generatedShaclCoreShape.maxInclusive;
    }

    get minCount(): Maybe<number> {
      return this.generatedShaclCoreShape.minCount;
    }

    get minExclusive(): Maybe<Literal> {
      return this.generatedShaclCoreShape.minExclusive;
    }

    get minInclusive(): Maybe<Literal> {
      return this.generatedShaclCoreShape.minInclusive;
    }

    get nodeKinds(): Maybe<Set<NodeKind>> {
      return this.generatedShaclCoreShape.nodeKind.chain((iri) => {
        const nodeKinds = new Set<NodeKind>();
        switch (iri.value) {
          case "http://www.w3.org/ns/shacl#BlankNode":
            nodeKinds.add("BlankNode");
            break;
          case "http://www.w3.org/ns/shacl#BlankNodeOrIRI":
            nodeKinds.add("BlankNode");
            nodeKinds.add("NamedNode");
            break;
          case "http://www.w3.org/ns/shacl#BlankNodeOrLiteral":
            nodeKinds.add("BlankNode");
            nodeKinds.add("Literal");
            break;
          case "http://www.w3.org/ns/shacl#IRI":
            nodeKinds.add("NamedNode");
            break;
          case "http://www.w3.org/ns/shacl#IRIOrLiteral":
            nodeKinds.add("Literal");
            nodeKinds.add("NamedNode");
            break;
          case "http://www.w3.org/ns/shacl#Literal":
            nodeKinds.add("Literal");
            break;
        }
        return nodeKinds.size > 0 ? Maybe.of(nodeKinds) : Maybe.empty();
      });
    }

    get nodes(): Maybe<NonEmptyList<NodeShapeT>> {
      return NonEmptyList.fromArray(
        this.generatedShaclCoreShape.nodes.flatMap((identifier) =>
          this.shapesGraph.nodeShapeByIdentifier(identifier).toList(),
        ),
      );
    }

    get not(): Maybe<NonEmptyList<ShapeT>> {
      return NonEmptyList.fromArray(
        this.generatedShaclCoreShape.not.flatMap((identifier) =>
          this.shapesGraph.shapeByIdentifier(identifier).toList(),
        ),
      );
    }

    get or(): Maybe<NonEmptyList<ShapeT>> {
      return NonEmptyList.fromArray(
        this.generatedShaclCoreShape.or.flatMap((identifiers) =>
          identifiers.flatMap((identifier) =>
            this.shapesGraph.shapeByIdentifier(identifier).toList(),
          ),
        ),
      );
    }

    get xone(): Maybe<NonEmptyList<ShapeT>> {
      return NonEmptyList.fromArray(
        this.generatedShaclCoreShape.xone.flatMap((identifiers) =>
          identifiers.flatMap((identifier) =>
            this.shapesGraph.shapeByIdentifier(identifier).toList(),
          ),
        ),
      );
    }
  }

  export class Targets {
    constructor(
      private readonly generatedShape: generated.BaseShaclCoreShape,
    ) {}

    get targetClasses(): Maybe<NonEmptyList<NamedNode>> {
      return NonEmptyList.fromArray(this.generatedShape.classes);
    }

    get targetNodes(): Maybe<NonEmptyList<Literal | NamedNode>> {
      return NonEmptyList.fromArray(this.generatedShape.targetNodes);
    }

    get targetObjectsOf(): Maybe<NonEmptyList<NamedNode>> {
      return NonEmptyList.fromArray(this.generatedShape.targetObjectsOf);
    }

    get targetSubjectsOf(): Maybe<NonEmptyList<NamedNode>> {
      return NonEmptyList.fromArray(this.generatedShape.targetSubjectsOf);
    }
  }
}
