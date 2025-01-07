import TermSet from "@rdfjs/term-set";
import type * as rdfjs from "@rdfjs/types";
import type { NamedNode } from "@rdfjs/types";
import { NodeShape as ShaclCoreNodeShape } from "@shaclmate/shacl-ast";
import * as generated from "@shaclmate/shacl-ast/generated.js";
import { owl, rdfs } from "@tpluscode/rdf-ns-builders";
import { Either, Left, Maybe } from "purify-ts";
import type { Resource } from "rdfjs-resource";
import type {
  MintingStrategy,
  TsFeature,
  TsObjectDeclarationType,
} from "../enums/index.js";
import { shaclmate } from "../vocabularies/index.js";
import type { Shape } from "./Shape.js";
import { extern } from "./extern.js";
import type {
  Ontology,
  PropertyGroup,
  PropertyShape,
  ShapesGraph,
} from "./index.js";
import { shaclmateName } from "./shaclmateName.js";
import { tsFeatures } from "./tsFeatures.js";
import { tsObjectDeclarationType } from "./tsObjectDeclarationType.js";

function ancestorClassIris(
  classResource: Resource,
  maxDepth: number,
): readonly rdfjs.NamedNode[] {
  const ancestorClassIris = new TermSet<rdfjs.NamedNode>();

  function ancestorClassIrisRecursive(
    classResource: Resource,
    depth: number,
  ): void {
    for (const parentClassValue of classResource.values(rdfs.subClassOf)) {
      parentClassValue.toNamedResource().ifRight((parentClassResource) => {
        if (ancestorClassIris.has(parentClassResource.identifier)) {
          return;
        }
        ancestorClassIris.add(parentClassResource.identifier);
        if (depth < maxDepth) {
          ancestorClassIrisRecursive(parentClassResource, depth + 1);
        }
      });
    }
  }

  ancestorClassIrisRecursive(classResource, 1);

  return [...ancestorClassIris];
}

function descendantClassIris(
  classResource: Resource,
  maxDepth: number,
): readonly rdfjs.NamedNode[] {
  const descendantClassIris = new TermSet<rdfjs.NamedNode>();

  function descendantClassIrisRecursive(
    classResource: Resource,
    depth: number,
  ): void {
    for (const childClassValue of classResource.valuesOf(rdfs.subClassOf)) {
      childClassValue.toNamedResource().ifRight((childClassResource) => {
        if (descendantClassIris.has(childClassResource.identifier)) {
          return;
        }
        descendantClassIris.add(childClassResource.identifier);
        if (depth < maxDepth) {
          descendantClassIrisRecursive(childClassResource, depth + 1);
        }
      });
    }
  }

  descendantClassIrisRecursive(classResource, 1);

  return [...descendantClassIris];
}

export class NodeShape extends ShaclCoreNodeShape<
  generated.ShaclCoreNodeShape,
  any,
  Ontology,
  PropertyGroup,
  PropertyShape,
  Shape
> {
  constructor(
    readonly resource: Resource,
    shapesGraph: ShapesGraph,
  ) {
    super(
      generated.ShaclCoreNodeShape.fromRdf({
        ignoreRdfType: true,
        resource,
      }).unsafeCoerce(),
      shapesGraph,
    );
  }

  get abstract(): Maybe<boolean> {
    return this.resource
      .value(shaclmate.abstract)
      .chain((value) => value.toBoolean())
      .toMaybe();
  }

  get ancestorNodeShapes(): readonly NodeShape[] {
    return this.isClass
      ? this.ancestorClassIris.flatMap((classIri) =>
          this.shapesGraph.nodeShapeByIdentifier(classIri).toList(),
        )
      : [];
  }

  get childNodeShapes(): readonly NodeShape[] {
    return this.isClass
      ? this.childClassIris.flatMap((classIri) =>
          this.shapesGraph.nodeShapeByIdentifier(classIri).toList(),
        )
      : [];
  }

  get descendantNodeShapes(): readonly NodeShape[] {
    return this.isClass
      ? this.descendantClassIris.flatMap((classIri) =>
          this.shapesGraph.nodeShapeByIdentifier(classIri).toList(),
        )
      : [];
  }

  get export(): Maybe<boolean> {
    return this.resource
      .value(shaclmate.export)
      .chain((value) => value.toBoolean())
      .toMaybe();
  }

  get extern(): Maybe<boolean> {
    return extern.bind(this)();
  }

  get fromRdfType(): Maybe<NamedNode> {
    // Check for an explicit shaclmate:fromRdfType
    const fromRdfType = this.resource
      .value(shaclmate.fromRdfType)
      .chain((value) => value.toIri())
      .toMaybe();
    if (fromRdfType.isJust()) {
      return fromRdfType;
    }

    // No explicit shaclmate:fromRdfType
    // If the shape is a class, not abstract, and identified by an IRI then use the shape IRI as the fromRdfType.
    if (
      !this.abstract.orDefault(false) &&
      this.isClass &&
      this.resource.identifier.termType === "NamedNode"
    ) {
      return Maybe.of(this.resource.identifier);
    }

    return Maybe.empty();
  }

  get isClass(): boolean {
    return (
      this.resource.isInstanceOf(owl.Class) ||
      this.resource.isInstanceOf(rdfs.Class)
    );
  }

  get mintingStrategy(): Either<Error, MintingStrategy> {
    const thisMintingStrategy = this._mintingStrategy;
    if (thisMintingStrategy.isLeft()) {
      for (const ancestorNodeShape of this.ancestorNodeShapes) {
        const ancestorMintingStrategy = ancestorNodeShape._mintingStrategy;
        if (ancestorMintingStrategy.isRight()) {
          return ancestorMintingStrategy;
        }
      }
    }
    return thisMintingStrategy;
  }

  get mutable(): Maybe<boolean> {
    return this.resource
      .value(shaclmate.mutable)
      .chain((value) => value.toBoolean())
      .toMaybe();
  }

  get nodeKinds(): Set<"BlankNode" | "NamedNode"> {
    const thisNodeKinds = new Set<"BlankNode" | "NamedNode">(
      [...this.constraints.nodeKinds.orDefault(new Set())].filter(
        (nodeKind) => nodeKind !== "Literal",
      ) as ("BlankNode" | "NamedNode")[],
    );

    const parentNodeKinds = new Set<"BlankNode" | "NamedNode">();
    for (const parentNodeShape of this.parentNodeShapes) {
      for (const parentNodeKind of parentNodeShape.nodeKinds) {
        parentNodeKinds.add(parentNodeKind);
      }
    }

    if (thisNodeKinds.size === 0 && parentNodeKinds.size > 0) {
      // No node kinds on this shape, use the parent's
      return parentNodeKinds;
    }

    if (thisNodeKinds.size > 0 && parentNodeKinds.size > 0) {
      // Node kinds on this shape and the parent's shape
      // This node kinds must be a subset of parent node kinds.
      for (const thisNodeKind of thisNodeKinds) {
        if (!parentNodeKinds.has(thisNodeKind)) {
          throw new Error(
            `${this} has a nodeKind ${thisNodeKind} that is not in its parent's node kinds`,
          );
        }
      }
    }

    if (thisNodeKinds.size === 0) {
      // Default: both node kinds
      thisNodeKinds.add("BlankNode");
      thisNodeKinds.add("NamedNode");
    }

    return thisNodeKinds;
  }

  get parentNodeShapes(): readonly NodeShape[] {
    return this.isClass
      ? this.parentClassIris.flatMap((classIri) =>
          this.shapesGraph.nodeShapeByIdentifier(classIri).toList(),
        )
      : [];
  }

  get shaclmateName(): Maybe<string> {
    return shaclmateName.bind(this)();
  }

  get toRdfTypes(): readonly NamedNode[] {
    // Look for one or more explicit shaclmate:toRdfType's
    const toRdfTypes = this.resource
      .values(shaclmate.toRdfType)
      .flatMap((value) => value.toIri().toMaybe().toList())
      .concat();

    // Ensure the toRdfTypes includes the fromRdfType if there is one
    this.fromRdfType.ifJust((fromRdfType) => {
      if (!toRdfTypes.some((toRdfType) => toRdfType.equals(fromRdfType))) {
        toRdfTypes.push(fromRdfType);
      }
    });

    if (toRdfTypes.length === 0) {
      // No explicit shaclmate:toRdfType's
      // If the shape is a class, not abstract, and identified by an IRI then use the shape IRI as the fromRdfType.
      if (
        !this.abstract.orDefault(false) &&
        this.isClass &&
        this.resource.identifier.termType === "NamedNode"
      ) {
        toRdfTypes.push(this.resource.identifier);
      }
    }

    return toRdfTypes;
  }

  get tsFeatures(): Maybe<Set<TsFeature>> {
    return tsFeatures(this.resource).altLazy(() =>
      this.isDefinedBy.chain((ontology) => ontology.tsFeatures),
    );
  }

  get tsImport(): Maybe<string> {
    return this.resource
      .value(shaclmate.tsImport)
      .chain((value) => value.toString())
      .toMaybe();
  }

  get tsObjectDeclarationType(): Either<Error, TsObjectDeclarationType> {
    return tsObjectDeclarationType(this.resource).altLazy(() =>
      this.isDefinedBy
        .toEither(new Error("node shape is not associated with an ontology"))
        .chain((ontology) => ontology.tsObjectDeclarationType),
    );
  }

  get tsObjectIdentifierPropertyName(): Maybe<string> {
    return this.resource
      .value(shaclmate.tsObjectIdentifierPropertyName)
      .chain((value) => value.toString())
      .toMaybe();
  }

  get tsObjectTypeDiscriminatorPropertyName(): Maybe<string> {
    return this.resource
      .value(shaclmate.tsObjectTypeDiscriminatorPropertyName)
      .chain((value) => value.toString())
      .toMaybe();
  }

  private get _mintingStrategy(): Either<Error, MintingStrategy> {
    return this.resource
      .value(shaclmate.mintingStrategy)
      .chain((value) => value.toIri())
      .chain((iri) => {
        if (iri.equals(shaclmate._MintingStrategy_SHA256)) {
          return Either.of("sha256");
        }
        if (iri.equals(shaclmate._MintingStrategy_UUIDv4)) {
          return Either.of("uuidv4");
        }
        return Left(new Error(`unrecognizsed minting strategy: ${iri.value}`));
      });
  }

  private get ancestorClassIris(): readonly NamedNode[] {
    return ancestorClassIris(this.resource, Number.MAX_SAFE_INTEGER);
  }

  private get childClassIris(): readonly NamedNode[] {
    return descendantClassIris(this.resource, 1);
  }

  private get descendantClassIris(): readonly NamedNode[] {
    return descendantClassIris(this.resource, Number.MAX_SAFE_INTEGER);
  }

  private get parentClassIris(): readonly NamedNode[] {
    return ancestorClassIris(this.resource, 1);
  }
}
