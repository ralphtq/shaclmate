import type { BlankNode, Literal, NamedNode } from "@rdfjs/types";
import type { Maybe } from "purify-ts";
import { Type } from "./Type.js";

/**
 * Abstract base class for IdentifierType and LiteralType.
 */
export abstract class TermType<
  _TermT extends BlankNode | Literal | NamedNode,
  ValueTermT extends Literal | NamedNode,
> extends Type {
  readonly defaultValue: Maybe<ValueTermT>;
  readonly equalsFunction: string = "purifyHelpers.Equatable.booleanEquals";
  readonly hasValue: Maybe<ValueTermT>;
  readonly in_: Maybe<readonly ValueTermT[]>;
  abstract override readonly kind:
    | "BooleanType"
    | "DateTimeType"
    | "IdentifierType"
    | "LiteralType"
    | "NumberType"
    | "StringType";
  readonly mutable: boolean = false;

  constructor({
    defaultValue,
    hasValue,
    in_,
    ...superParameters
  }: {
    defaultValue: Maybe<ValueTermT>;
    hasValue: Maybe<ValueTermT>;
    in_: Maybe<readonly ValueTermT[]>;
  } & ConstructorParameters<typeof Type>[0]) {
    super(superParameters);
    this.defaultValue = defaultValue;
    this.hasValue = hasValue;
    this.in_ = in_;
  }

  override propertyFromRdfExpression({
    variables,
  }: Parameters<Type["propertyFromRdfExpression"]>[0]): string {
    const chain: string[] = [
      this.propertyFilterRdfResourceValuesExpression({ variables }),
    ];
    // Have an rdfjsResource.Resource.Values here
    this.hasValue
      .ifJust((hasValue) => {
        chain.push(
          `find(_value => _value.toTerm().equals(${this.rdfjsTermExpression(hasValue)}))`,
        );
      })
      .ifNothing(() => chain.push("head()"));
    // Have an rdfjsResource.Resource.Value here
    this.defaultValue.ifJust((defaultValue) => {
      // alt the default value before trying to convert the rdfjsResource.Resource.Value to the type
      chain.push(
        `alt(purify.Either.of(new rdfjsResource.Resource.Value({ subject: ${variables.resource}, predicate: ${variables.predicate}, object: ${this.rdfjsTermExpression(defaultValue)} })))`,
      );
    });
    // Last step: convert the rdfjsResource.Resource.Value to the type
    chain.push(
      `chain(_value => ${this.propertyFromRdfResourceValueExpression({
        variables: {
          predicate: variables.predicate,
          resource: variables.resource,
          resourceValue: "_value",
        },
      })})`,
    );
    return chain.join(".");
  }

  override propertySparqlGraphPatternExpression({
    variables,
  }: Parameters<
    Type["propertySparqlGraphPatternExpression"]
  >[0]): Type.SparqlGraphPatternExpression {
    let expression = super
      .propertySparqlGraphPatternExpression({
        variables,
      })
      .toSparqlGraphPatternExpression()
      .toString();
    if (this.defaultValue.isJust()) {
      expression = `sparqlBuilder.GraphPattern.optional(${expression})`;
    }
    return new Type.SparqlGraphPatternExpression(expression);
  }

  override propertyToRdfExpression({
    variables,
  }: Parameters<Type["propertyToRdfExpression"]>[0]): string {
    return this.defaultValue
      .map(
        (defaultValue) =>
          `!${variables.value}.equals(${this.rdfjsTermExpression(defaultValue)}) ? ${variables.value} : undefined`,
      )
      .orDefault(variables.value);
  }

  /**
   * Filter the rdfjsResource.Resource.Values to those that are relevant to the type.
   *
   * This is done before
   */
  protected propertyFilterRdfResourceValuesExpression({
    variables,
  }: Parameters<Type["propertyFromRdfExpression"]>[0]): string {
    return variables.resourceValues;
  }

  /**
   * Convert an rdfjsResource.Resource.Value to a value of this type.
   * @param variables
   * @protected
   */
  protected abstract propertyFromRdfResourceValueExpression({
    variables,
  }: {
    variables: { predicate: string; resource: string; resourceValue: string };
  }): string;
}
