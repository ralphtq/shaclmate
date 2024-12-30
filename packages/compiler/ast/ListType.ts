import type { NamedNode } from "@rdfjs/types";
import type { NodeKind } from "@shaclmate/shacl-ast";
import type { Maybe } from "purify-ts";
import type { MintingStrategy } from "../enums/MintingStrategy.js";
import type { Name } from "./Name.js";
import type { Type } from "./Type.js";

/**
 * An ordered sequence of items with zero or one values of an item type.
 *
 * ListType is transformed from a SHACL node shape that models an RDF list (https://www.w3.org/TR/rdf11-schema/#ch_collectionvocab).
 *
 * Contrast SetType, which is transformed from any SHACL property shape with no maxCount or maxCount greater than 1.
 */
export interface ListType {
  /**
   * Documentation comment.
   */
  readonly comment: Maybe<string>;

  /**
   * The expected rdf:type of instances of this ListType and its sub-lists.
   *
   * This is usually the identifier of an sh:NodeShape that is also an rdfs:Class (i.e., a node shape with implicit
   * class targets).
   */
  readonly fromRdfType: Maybe<NamedNode>;

  /**
   * Type of identifier (blank or named node) to use for lists and sub-lists.
   */
  readonly identifierNodeKind: NodeKind.BLANK_NODE | NodeKind.IRI;

  /**
   * List item type.
   *
   * Mutable to support cycle-handling logic in the compiler.
   */
  itemType: Type;

  readonly kind: "ListType";

  /**
   * Name of this type, usually derived from sh:name or shaclmate:name.
   */
  readonly name: Name;

  /**
   * Strategy for minting new list and sub-list identifiers.
   */
  readonly mintingStrategy: Maybe<MintingStrategy>;

  /**
   * rdf:type's that will be added to this object when it's serialized toRdf.
   *
   * This is usually the identifier of an sh:NodeShape that is also an rdfs:Class (i.e., a node shape with implicit
   * class targets).
   */
  readonly toRdfTypes: readonly NamedNode[];
}
