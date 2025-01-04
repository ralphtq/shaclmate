import type { Literal } from "@rdfjs/types";
import { rdfs } from "@tpluscode/rdf-ns-builders";
import type { Maybe } from "purify-ts";
import type { Resource } from "rdfjs-resource";

export class PropertyGroup {
  constructor(private readonly resource: Resource) {}

  get comment(): Maybe<Literal> {
    return this.resource
      .value(rdfs.comment)
      .chain((value) => value.toLiteral())
      .toMaybe();
  }

  get identifier(): Resource.Identifier {
    return this.resource.identifier;
  }

  get label(): Maybe<Literal> {
    return this.resource
      .value(rdfs.label)
      .chain((value) => value.toLiteral())
      .toMaybe();
  }
}
