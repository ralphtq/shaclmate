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
  readonly fromRdf: (parameters: {
    [_index: string]: any;
    resource: Resource<IdentifierT>;
  }) => Either<Resource.ValueError, T>;
  readonly instance: T;
  readonly sparqlGraphPatternsClass: new (
    subject: sparqlBuilder.ResourceGraphPatterns.Subject,
  ) => sparqlBuilder.ResourceGraphPatterns;

  constructor({
    fromRdf,
    instance,
    sparqlGraphPatternsClass,
  }: {
    fromRdf: Harness<T, IdentifierT>["fromRdf"];
    instance: T;
    sparqlGraphPatternsClass: Harness<
      T,
      IdentifierT
    >["sparqlGraphPatternsClass"];
  }) {
    this.fromRdf = fromRdf;
    this.instance = instance;
    this.sparqlGraphPatternsClass = sparqlGraphPatternsClass;
  }

  abstract equals(other: T): Equatable.EqualsResult;

  abstract toRdf(kwds: {
    mutateGraph: MutableResource.MutateGraph;
    resourceSet: MutableResourceSet;
  }): Resource<IdentifierT>;
}
