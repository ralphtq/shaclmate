import type { Resource } from "rdfjs-resource";
import type { OntologyLike } from "./OntologyLike.js";

export class Ontology implements OntologyLike {
  readonly resource: Resource;

  constructor(resource: Resource) {
    this.resource = resource;
  }

  get identifier(): Resource.Identifier {
    return this.resource.identifier;
  }

  toString(): string {
    return `Ontology(node=${this.resource.identifier.value})`;
  }
}
