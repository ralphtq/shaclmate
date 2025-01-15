import type * as sparqlBuilder from "@kos-kit/sparql-builder";
import type { BlankNode, NamedNode } from "@rdfjs/types";
import type { Either } from "purify-ts";
import type { Equatable } from "purify-ts-helpers";
import type {
  MutableResource,
  MutableResourceSet,
  Resource,
} from "rdfjs-resource";

export abstract class Harness<
  T extends { readonly identifier: IdentifierT },
  IdentifierT extends BlankNode | NamedNode,
> {
  readonly fromJson: (jsonObject: any) => T;
  readonly fromRdf: (parameters: {
    [_index: string]: any;
    resource: Resource<IdentifierT>;
  }) => Either<Resource.ValueError, T>;
  readonly instance: T;
  readonly sparqlGraphPatternsClass: new (
    subject: sparqlBuilder.ResourceGraphPatterns.Subject,
  ) => sparqlBuilder.ResourceGraphPatterns;

  constructor({
    fromJson,
    fromRdf,
    instance,
    sparqlGraphPatternsClass,
  }: {
    fromJson: Harness<T, IdentifierT>["fromJson"];
    fromRdf: Harness<T, IdentifierT>["fromRdf"];
    instance: T;
    sparqlGraphPatternsClass: Harness<
      T,
      IdentifierT
    >["sparqlGraphPatternsClass"];
  }) {
    this.fromJson = fromJson;
    this.fromRdf = fromRdf;
    this.instance = instance;
    this.sparqlGraphPatternsClass = sparqlGraphPatternsClass;
  }

  abstract equals(other: T): Equatable.EqualsResult;

  abstract toJson(): any;

  abstract toRdf(kwds: {
    mutateGraph: MutableResource.MutateGraph;
    resourceSet: MutableResourceSet;
  }): Resource<IdentifierT>;
}
