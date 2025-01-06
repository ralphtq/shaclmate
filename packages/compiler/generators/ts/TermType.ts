import type { BlankNode, Literal, NamedNode } from "@rdfjs/types";
import { xsd } from "@tpluscode/rdf-ns-builders";
import { Maybe } from "purify-ts";
import { invariant } from "ts-invariant";
import { Memoize } from "typescript-memoize";
import { Import } from "./Import.js";
import { Type } from "./Type.js";

/**
 * Abstract base class for IdentifierType and LiteralType.
 */
export class TermType<
  TermT extends BlankNode | Literal | NamedNode,
> extends Type {
  readonly defaultValue: Maybe<TermT>;
  readonly equalsFunction: string = "purifyHelpers.Equatable.booleanEquals";
  readonly hasValue: Maybe<TermT>;
  readonly in_: Maybe<readonly TermT[]>;
  readonly mutable: boolean = false;
  readonly nodeKinds: Set<TermT["termType"]>;

  constructor({
    defaultValue,
    hasValue,
    in_,
    nodeKinds,
    ...superParameters
  }: {
    defaultValue: Maybe<TermT>;
    hasValue: Maybe<TermT>;
    in_: Maybe<readonly TermT[]>;
    nodeKinds: Set<TermT["termType"]>;
  } & ConstructorParameters<typeof Type>[0]) {
    super(superParameters);
    this.defaultValue = defaultValue;
    this.hasValue = hasValue;
    this.in_ = in_;
    this.nodeKinds = new Set([...nodeKinds]);
    invariant(this.nodeKinds.size > 0);
  }

  get conversions(): readonly Type.Conversion[] {
    const conversions: Type.Conversion[] = [];

    if (this.nodeKinds.has("Literal")) {
      conversions.push(
        {
          conversionExpression: (value) => `rdfLiteral.toRdf(${value})`,
          sourceTypeCheckExpression: (value) => `typeof ${value} === "boolean"`,
          sourceTypeName: "boolean",
        },
        {
          conversionExpression: (value) => `rdfLiteral.toRdf(${value})`,
          sourceTypeCheckExpression: (value) =>
            `typeof ${value} === "object" && ${value} instanceof Date`,
          sourceTypeName: "Date",
        },
        {
          conversionExpression: (value) => `rdfLiteral.toRdf(${value})`,
          sourceTypeCheckExpression: (value) => `typeof ${value} === "number"`,
          sourceTypeName: "number",
        },
        {
          conversionExpression: (value) =>
            `${this.dataFactoryVariable}.literal(${value})`,
          sourceTypeCheckExpression: (value) => `typeof ${value} === "string"`,
          sourceTypeName: "string",
        },
      );
    }

    this.defaultValue.ifJust((defaultValue) => {
      conversions.push({
        conversionExpression: () => this.rdfjsTermExpression(defaultValue),
        sourceTypeCheckExpression: (value) => `typeof ${value} === "undefined"`,
        sourceTypeName: "undefined",
      });
    });

    conversions.push({
      conversionExpression: (value) => value,
      sourceTypeCheckExpression: (value) => `typeof ${value} === "object"`,
      sourceTypeName: this.name,
    });

    return conversions;
  }

  override get discriminatorProperty(): Maybe<Type.DiscriminatorProperty> {
    return Maybe.of({
      name: "termType",
      type: "string" as const,
      values: [...this.nodeKinds],
    });
  }

  get jsonName(): string {
    const jsonName: string[] = [];
    if (this.nodeKinds.has("Literal")) {
      jsonName.push(
        '{ "@language": string | undefined, "@type": string | undefined, "@value": string }',
      );
    }
    if (this.nodeKinds.has("BlankNode") || this.nodeKinds.has("NamedNode")) {
      jsonName.push(`{ "@id": string }`);
    }
    return jsonName.join(" | ");
  }

  @Memoize()
  override get name(): string {
    return `(${[...this.nodeKinds]
      .map((nodeKind) => `rdfjs.${nodeKind}`)
      .join(" | ")})`;
  }

  override get useImports(): readonly Import[] {
    const imports = [Import.RDFJS_TYPES];
    if (this.nodeKinds.has("Literal")) {
      imports.push(Import.RDF_LITERAL);
    }
    return imports;
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

  override propertyHashStatements({
    variables,
  }: Parameters<Type["propertyHashStatements"]>[0]): readonly string[] {
    return [
      `${variables.hasher}.update(${variables.value}.termType);`,
      `${variables.hasher}.update(${variables.value}.value);`,
    ];
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

  override propertyToJsonExpression({
    variables,
  }: Parameters<Type["propertyToJsonExpression"]>[0]): string {
    invariant(this.nodeKinds.size === 3);
    return `${variables.value}.termType === "Literal" ? { "@language": ${variables.value}.language.length > 0 ? ${variables.value}.language : undefined, "@type": ${variables.value}.datatype.value !== "${xsd.string.value}" ? ${variables.value}.datatype.value : undefined, "@value": ${variables.value}.value } : { "@id": ${variables.value}.value }`;
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
  protected propertyFromRdfResourceValueExpression({
    variables,
  }: {
    variables: { predicate: string; resource: string; resourceValue: string };
  }): string {
    let expression = `purify.Either.of(${variables.resourceValue}.toTerm())`;
    if (this.nodeKinds.size < 3) {
      expression = `${expression}.chain(term => {
  switch (term.termType) {
  ${[...this.nodeKinds].map((nodeKind) => `case "${nodeKind}":`).join("\n")} return purify.Either.of(term);
  default: return purify.Left(new rdfjsResource.Resource.MistypedValueError({ actualValue: term, expectedValueType: ${JSON.stringify(this.name)}, focusResource: ${variables.resource}, predicate: ${variables.predicate} }));         
}})`;
    }
    return expression;
  }
}
