import type { BlankNode, NamedNode } from "@rdfjs/types";
import type { Maybe } from "purify-ts";
import { NodeKind } from "shacl-ast";
import { invariant } from "ts-invariant";
import { Memoize } from "typescript-memoize";
import { RdfjsTermType } from "./RdfjsTermType.js";
import type { Type } from "./Type";

export class IdentifierType extends RdfjsTermType {
  readonly kind = "Identifier";
  private readonly hasValue: Maybe<BlankNode | NamedNode>;
  private readonly nodeKinds: Set<NodeKind.BLANK_NODE | NodeKind.IRI>;

  constructor({
    hasValue,
    nodeKinds,
    ...superParameters
  }: {
    hasValue: Maybe<BlankNode | NamedNode>;
    nodeKinds: Set<NodeKind.BLANK_NODE | NodeKind.IRI>;
  } & Type.ConstructorParameters) {
    super(superParameters);
    this.hasValue = hasValue;
    this.nodeKinds = new Set([...nodeKinds]);
    invariant(this.nodeKinds.size > 0);
  }

  get isNamedNodeKind(): boolean {
    return this.nodeKinds.size === 1 && this.nodeKinds.has(NodeKind.IRI);
  }

  @Memoize()
  get name(): string {
    const names: string[] = [];
    if (this.nodeKinds.has(NodeKind.BLANK_NODE)) {
      names.push("rdfjs.BlankNode");
    }
    if (this.nodeKinds.has(NodeKind.IRI)) {
      names.push("rdfjs.NamedNode");
    }
    return names.join(" | ");
  }

  valueFromRdf({
    dataFactoryVariable,
    resourceValueVariable,
  }: Type.ValueFromRdfParameters): string {
    let expression: string;
    switch (this.name) {
      case "rdfjs.BlankNode":
        throw new Error("not implemented");
      case "rdfjs.NamedNode":
        expression = `${resourceValueVariable}.toIri()`;
        break;
      case "rdfjs.BlankNode | rdfjs.NamedNode":
        expression = `${resourceValueVariable}.toIdentifier()`;
        break;
      default:
        throw new Error(`not implemented: ${this.name}`);
    }
    this.hasValue.ifJust((hasValue) => {
      expression = `${expression}.filter(_identifier => _identifier.equals(${dataFactoryVariable}.${hasValue.termType === "BlankNode" ? "blankNode" : "namedNode"}(${hasValue.value}))`;
    });
    return expression;
  }

  override valueInstanceOf({
    propertyValueVariable,
  }: Type.ValueInstanceOfParameters): string {
    const termTypeChecks: string[] = [];
    for (const nodeKind of this.nodeKinds) {
      switch (nodeKind) {
        case NodeKind.BLANK_NODE:
          termTypeChecks.push(
            `${propertyValueVariable}["termType"] === "BlankNode"`,
          );
          break;
        case NodeKind.IRI:
          termTypeChecks.push(
            `${propertyValueVariable}["termType"] === "NamedNode"`,
          );
          break;
      }
    }
    return `(typeof ${propertyValueVariable} === "object" && ${propertyValueVariable}.hasOwnProperty("termType") && (${termTypeChecks.join(" || ")}))`;
  }
}
