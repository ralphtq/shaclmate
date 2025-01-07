import type { BlankNode, Literal, NamedNode } from "@rdfjs/types";
import { Maybe, NonEmptyList } from "purify-ts";
import type { NodeKind } from "./NodeKind.js";
import type { OntologyLike } from "./OntologyLike.js";
import type { ShapesGraph } from "./ShapesGraph.js";
import type * as generated from "./generated.js";

export abstract class Shape<
  GeneratedShapeT extends generated.ShaclCoreShape,
  NodeShapeT extends ShapeT,
  OntologyT extends OntologyLike,
  PropertyGroupT,
  PropertyShapeT extends ShapeT,
  ShapeT,
> {
  abstract readonly constraints: Shape.Constraints<
    GeneratedShapeT,
    NodeShapeT,
    OntologyT,
    PropertyGroupT,
    PropertyShapeT,
    ShapeT
  >;
  readonly targets: Shape.Targets;

  constructor(
    protected readonly generatedShape: GeneratedShapeT,
    protected readonly shapesGraph: ShapesGraph<
      NodeShapeT,
      OntologyT,
      PropertyGroupT,
      PropertyShapeT,
      ShapeT
    >,
  ) {
    this.targets = new Shape.Targets(this.generatedShape);
  }

  get comments(): Maybe<NonEmptyList<Literal>> {
    return NonEmptyList.fromArray(this.generatedShape.comments);
  }

  get identifier(): BlankNode | NamedNode {
    return this.generatedShape.identifier;
  }

  get isDefinedBy(): Maybe<OntologyT> {
    if (this.generatedShape.isDefinedBy.isJust()) {
      // If there's an rdfs:isDefinedBy statement on the shape then don't fall back to anything else
      return this.shapesGraph.ontologyByIdentifier(
        this.generatedShape.isDefinedBy.unsafeCoerce(),
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
    return NonEmptyList.fromArray(this.generatedShape.labels);
  }
}

export namespace Shape {
  export class Constraints<
    GeneratedShapeT extends generated.ShaclCoreShape,
    NodeShapeT extends ShapeT,
    OntologyT extends OntologyLike,
    PropertyGroupT,
    PropertyShapeT extends ShapeT,
    ShapeT,
  > {
    constructor(
      protected readonly generatedShape: GeneratedShapeT,
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
        this.generatedShape.and.flatMap((identifiers) =>
          identifiers.flatMap((identifier) =>
            this.shapesGraph.shapeByIdentifier(identifier).toList(),
          ),
        ),
      );
    }

    get classes(): Maybe<NonEmptyList<NamedNode>> {
      return NonEmptyList.fromArray(this.generatedShape.classes);
    }

    get datatype(): Maybe<NamedNode> {
      return this.generatedShape.datatype;
    }

    get hasValues(): Maybe<NonEmptyList<BlankNode | Literal | NamedNode>> {
      return NonEmptyList.fromArray(this.generatedShape.hasValues);
    }

    get in_(): Maybe<NonEmptyList<BlankNode | Literal | NamedNode>> {
      return this.generatedShape.in_.chain(NonEmptyList.fromArray);
    }

    get languageIn(): Maybe<NonEmptyList<string>> {
      return this.generatedShape.languageIn.chain(NonEmptyList.fromArray);
    }

    get maxCount(): Maybe<number> {
      return this.generatedShape.maxCount;
    }

    get maxExclusive(): Maybe<Literal> {
      return this.generatedShape.maxExclusive;
    }

    get maxInclusive(): Maybe<Literal> {
      return this.generatedShape.maxInclusive;
    }

    get minCount(): Maybe<number> {
      return this.generatedShape.minCount;
    }

    get minExclusive(): Maybe<Literal> {
      return this.generatedShape.minExclusive;
    }

    get minInclusive(): Maybe<Literal> {
      return this.generatedShape.minInclusive;
    }

    get nodeKinds(): Maybe<Set<NodeKind>> {
      return this.generatedShape.nodeKind.chain((iri) => {
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
        this.generatedShape.nodes.flatMap((identifier) =>
          this.shapesGraph.nodeShapeByIdentifier(identifier).toList(),
        ),
      );
    }

    get not(): Maybe<NonEmptyList<ShapeT>> {
      return NonEmptyList.fromArray(
        this.generatedShape.not.flatMap((identifier) =>
          this.shapesGraph.shapeByIdentifier(identifier).toList(),
        ),
      );
    }

    get or(): Maybe<NonEmptyList<ShapeT>> {
      return NonEmptyList.fromArray(
        this.generatedShape.or.flatMap((identifiers) =>
          identifiers.flatMap((identifier) =>
            this.shapesGraph.shapeByIdentifier(identifier).toList(),
          ),
        ),
      );
    }

    get xone(): Maybe<NonEmptyList<ShapeT>> {
      return NonEmptyList.fromArray(
        this.generatedShape.xone.flatMap((identifiers) =>
          identifiers.flatMap((identifier) =>
            this.shapesGraph.shapeByIdentifier(identifier).toList(),
          ),
        ),
      );
    }
  }

  export class Targets {
    constructor(private readonly generatedShape: generated.ShaclCoreShape) {}

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
