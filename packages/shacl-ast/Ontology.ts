import type { BlankNode, NamedNode } from "@rdfjs/types";
import type { Resource } from "rdfjs-resource";
import type { OntologyLike } from "./OntologyLike.js";
import * as generated from "./generated.js";

export class Ontology implements OntologyLike {
  private readonly delegate: generated.OwlOntology;

  constructor(protected readonly resource: Resource) {
    this.delegate = generated.OwlOntology.fromRdf({ resource }).unsafeCoerce();
  }

  get identifier(): BlankNode | NamedNode {
    return this.delegate.identifier;
  }

  toString(): string {
    return `Ontology(node=${this.identifier.value})`;
  }
}
