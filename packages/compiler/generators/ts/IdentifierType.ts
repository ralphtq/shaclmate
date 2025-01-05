import type { BlankNode, NamedNode } from "@rdfjs/types";
import { Memoize } from "typescript-memoize";
import { TermType } from "./TermType.js";

export class IdentifierType extends TermType<BlankNode | NamedNode> {
  readonly kind = "IdentifierType";

  get isNamedNodeKind(): boolean {
    return this.nodeKinds.size === 1 && this.nodeKinds.has("NamedNode");
  }

  @Memoize()
  override get name(): string {
    if (this.in_.isJust() && this.isNamedNodeKind) {
      // Treat sh:in as a union of the IRIs
      // rdfjs.NamedNode<"http://example.com/1" | "http://example.com/2">
      return `rdfjs.NamedNode<${this.in_
        .unsafeCoerce()
        .map((iri) => `"${iri.value}"`)
        .join(" | ")}>`;
    }

    return [...this.nodeKinds]
      .map((nodeKind) => `rdfjs.${nodeKind}`)
      .join(" | ");
  }

  protected override propertyFromRdfResourceValueExpression({
    variables,
  }: Parameters<
    TermType<BlankNode | NamedNode>["propertyFromRdfResourceValueExpression"]
  >[0]): string {
    if (this.nodeKinds.size === 2) {
      return `${variables.resourceValue}.toIdentifier()`;
    }

    if (this.isNamedNodeKind) {
      let expression = `${variables.resourceValue}.toIri()`;
      this.in_.ifJust((in_) => {
        expression = `${expression}.chain(iri => { switch (iri.value) { ${in_.map((iri) => `case "${iri.value}": return purify.Either.of<rdfjsResource.Resource.ValueError, ${this.name}>(iri as rdfjs.NamedNode<"${iri.value}">);`).join(" ")} default: return purify.Left(new rdfjsResource.Resource.MistypedValueError({ actualValue: iri, expectedValueType: ${JSON.stringify(this.name)}, focusResource: ${variables.resource}, predicate: ${variables.predicate} })); } } )`;
      });
      return expression;
    }

    throw new Error(`not implemented: ${this.name}`);
  }
}
