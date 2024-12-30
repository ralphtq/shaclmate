import type { NamedNode } from "@rdfjs/types";
import type { NodeKind } from "@shaclmate/shacl-ast";
import type { PredicatePath } from "@shaclmate/shacl-ast";
import type { Maybe } from "purify-ts";
import { Resource } from "rdfjs-resource";
import genericToposort from "toposort";
import type {
  MintingStrategy,
  PropertyVisibility,
  TsFeature,
  TsObjectDeclarationType,
} from "../enums/index.js";
import type { Name } from "./Name.js";
import type { Type } from "./Type.js";

export interface ObjectType {
  /**
   * Classes generated from this type are abstract / cannot be instantiated themselves.
   *
   * Defaults to false.
   */
  readonly abstract: boolean;

  /**
   * Ancestor (parents, their parents, ad nauseum) ObjectTypes of this ObjectType.
   *
   * Mutable to support cycle-handling logic in the compiler.
   */
  readonly ancestorObjectTypes: ObjectType[];

  /**
   * Immediate child ObjectTypes of this ObjectType.
   *
   * Mutable to support cycle-handling logic in the compiler.
   */
  readonly childObjectTypes: ObjectType[];

  /**
   * Documentation comment from rdfs:comment.
   */
  readonly comment: Maybe<string>;

  /**
   * Descendant (children, their children, ad nauseum) ObjectTypes of this ObjectType.
   *
   * Mutable to support cycle-handling logic in the compiler.
   */
  readonly descendantObjectTypes: ObjectType[];

  /**
   * Should generated code derived from this ObjectType be visible outside its module?
   *
   * Defaults to true.
   */
  readonly export: boolean;

  /**
   * If true, the code for this ObjectType is defined externally and should not be generated.
   *
   * Defaults to false.
   */
  readonly extern: boolean;

  /**
   * The expected rdf:type of instances of this ObjectType.
   *
   * This is usually the identifier of an sh:NodeShape that is also an rdfs:Class (i.e., a node shape with implicit
   * class targets).
   */
  readonly fromRdfType: Maybe<NamedNode>;

  /**
   * Type discriminator.
   */
  readonly kind: "ObjectType";

  /**
   * Human-readable label from rdfs:label.
   */
  readonly label: Maybe<string>;

  /**
   * Strategy for minting new object identifiers.
   */
  readonly mintingStrategy: Maybe<MintingStrategy>;

  /**
   * Name of this type, usually derived from sh:name or shaclmate:name.
   */
  readonly name: Name;

  /**
   * The RDF node kinds this ObjectType may be identified by.
   *
   * Used to associate instances with an RDF identifier.
   */
  readonly nodeKinds: Set<NodeKind.BLANK_NODE | NodeKind.IRI>;

  /**
   * Immediate parent ObjectTypes of this Object types.
   *
   * Mutable to support cycle-handling logic in the compiler.
   */
  readonly parentObjectTypes: ObjectType[];

  /**
   * Properties of this ObjectType.
   *
   * Mutable to support cycle-handling logic in the compiler.
   */
  readonly properties: ObjectType.Property[];

  /**
   * rdf:type's that will be added to this object when it's serialized toRdf.
   *
   * This is usually the identifier of an sh:NodeShape that is also an rdfs:Class (i.e., a node shape with implicit
   * class targets).
   */
  readonly toRdfTypes: readonly NamedNode[];

  /**
   * TypeScript features to generate.
   */
  readonly tsFeatures: Set<TsFeature>;

  /**
   * Name of the identifier property in TypeScript-generated classes/interfaces.
   */
  readonly tsIdentifierPropertyName: string;

  /**
   * A TypeScript import to add to generated code.
   *
   * This is often used in conjunction with extern=true to import the extern'd ObjectType code in order for generated
   * code to reference it.
   *
   * import { MyType } from "./MyType.js"
   */
  readonly tsImport: Maybe<string>;

  /**
   * Whether to generate a TypeScript class or interface for this type.
   */
  readonly tsObjectDeclarationType: TsObjectDeclarationType;

  /**
   * Name of the type discriminator property in TypeScript-generated classes/interfaces.
   */
  readonly tsTypeDiscriminatorPropertyName: string;
}

export namespace ObjectType {
  export interface Property {
    /**
     * Documentation comment from rdfs:comment.
     */
    readonly comment: Maybe<string>;

    /**
     * Description from sh:description.
     */
    readonly description: Maybe<string>;

    /**
     * Human-readable label from rdfs:label.
     */
    readonly label: Maybe<string>;

    /**
     * Name of this property.
     */
    readonly name: Name;

    /**
     * SHACL property path (https://www.w3.org/TR/shacl/#property-paths)
     */
    readonly path: PredicatePath;

    /**
     * Type of this property.
     */
    readonly type: Type;

    /**
     * Visibility: private, protected, public.
     */
    readonly visibility: PropertyVisibility;
  }

  export function toposort(
    objectTypes: readonly ObjectType[],
  ): readonly ObjectType[] {
    const objectTypesByIdentifier: Record<string, ObjectType> = {};
    const objectTypeGraphNodes: string[] = [];
    const objectTypeGraphEdges: [string, string | undefined][] = [];
    for (const objectType of objectTypes) {
      const objectTypeIdentifier = Resource.Identifier.toString(
        objectType.name.identifier,
      );
      objectTypesByIdentifier[objectTypeIdentifier] = objectType;
      objectTypeGraphNodes.push(objectTypeIdentifier);
      for (const parentAstObjectType of objectType.parentObjectTypes) {
        objectTypeGraphEdges.push([
          objectTypeIdentifier,
          Resource.Identifier.toString(parentAstObjectType.name.identifier),
        ]);
      }
    }
    return genericToposort
      .array(objectTypeGraphNodes, objectTypeGraphEdges)
      .map(
        (objectTypeIdentifier) => objectTypesByIdentifier[objectTypeIdentifier],
      )
      .reverse();
  }
}
