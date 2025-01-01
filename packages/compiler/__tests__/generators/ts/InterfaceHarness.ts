import type { BlankNode, NamedNode } from "@rdfjs/types";
import type { Equatable } from "purify-ts-helpers";
import type {
  MutableResource,
  MutableResourceSet,
  Resource,
} from "rdfjs-resource";
import { Harness } from "./Harness.js";

export class InterfaceHarness<
  T extends { readonly identifier: IdentifierT },
  IdentifierT extends BlankNode | NamedNode,
> extends Harness<T, IdentifierT> {
  readonly equals: (other: T) => Equatable.EqualsResult;
  readonly toRdf: (options: {
    mutateGraph: MutableResource.MutateGraph;
    resourceSet: MutableResourceSet;
  }) => Resource<IdentifierT>;

  constructor({
    equals,
    toRdf,
    ...superParameters
  }: {
    equals: (left: T, right: T) => Equatable.EqualsResult;
    toRdf: (
      instance: T,
      options: {
        mutateGraph: MutableResource.MutateGraph;
        resourceSet: MutableResourceSet;
      },
    ) => Resource<IdentifierT>;
  } & ConstructorParameters<typeof Harness<T, IdentifierT>>[0]) {
    super(superParameters);
    this.equals = (other) => equals(this.instance, other);
    this.toRdf = (kwds) => toRdf(this.instance, kwds);
  }
}
