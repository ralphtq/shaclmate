import { invariant } from "ts-invariant";
import { Memoize } from "typescript-memoize";
import type { Import } from "./Import.js";
import { Type } from "./Type.js";
import { objectInitializer } from "./objectInitializer.js";

export class SetType extends Type {
  readonly itemType: Type;
  readonly kind = "SetType";
  private readonly minCount: number;

  constructor({
    itemType,
    minCount,
    ...superParameters
  }: ConstructorParameters<typeof Type>[0] & {
    itemType: Type;
    minCount: number;
  }) {
    super(superParameters);
    this.itemType = itemType;
    this.minCount = minCount;
    invariant(this.minCount >= 0);
  }

  override get conversions(): readonly Type.Conversion[] {
    const conversions: Type.Conversion[] = [];

    if (this.minCount === 0) {
      conversions.push({
        conversionExpression: () => "[]",
        sourceTypeCheckExpression: (value) => `typeof ${value} === "undefined"`,
        sourceTypeName: "undefined",
      });
      conversions.push({
        conversionExpression: (value) => value,
        sourceTypeCheckExpression: (value) => `Array.isArray(${value})`,
        sourceTypeName: `readonly (${this.itemType.name})[]`,
      });
    } else {
      conversions.push({
        conversionExpression: (value) => value,
        sourceTypeCheckExpression: (value) =>
          `purify.NonEmptyList.isNonEmpty(${value})`,
        sourceTypeName: this.name,
      });
    }

    return conversions;
  }

  override get equalsFunction(): string {
    const itemTypeEqualsFunction = this.itemType.equalsFunction;
    if (itemTypeEqualsFunction === "purifyHelpers.Equatable.equals") {
      return "purifyHelpers.Equatable.arrayEquals";
    }
    return `(left, right) => purifyHelpers.Arrays.equals(left, right, ${itemTypeEqualsFunction})`;
  }

  override get jsonName(): string {
    if (this.minCount === 0) {
      return `readonly (${this.itemType.jsonName})[]`;
    }
    return `purify.NonEmptyList<${this.itemType.jsonName}>`;
  }

  override get mutable(): boolean {
    return this.itemType.mutable;
  }

  @Memoize()
  override get name(): string {
    if (this.minCount === 0) {
      return `readonly (${this.itemType.name})[]`;
    }
    return `purify.NonEmptyList<${this.itemType.name}>`;
  }

  override get useImports(): readonly Import[] {
    return this.itemType.useImports;
  }

  override fromJsonExpression({
    variables,
  }: Parameters<Type["fromJsonExpression"]>[0]): string {
    let expression = variables.value;
    if (this.minCount > 0) {
      expression = `purify.NonEmptyList.fromArray(${expression}).unsafeCoerce()`;
    }
    const itemFromJsonExpression = this.itemType.fromJsonExpression({
      variables: { value: "_item" },
    });
    return itemFromJsonExpression === "_item"
      ? expression
      : `${expression}.map(_item => (${itemFromJsonExpression}))`;
  }

  override fromRdfExpression({
    variables,
  }: Parameters<Type["fromRdfExpression"]>[0]): string {
    const itemFromRdfExpression = this.itemType.fromRdfExpression({
      variables: { ...variables, resourceValues: "_item.toValues()" },
    });
    if (this.minCount === 0) {
      return `purify.Either.of([...${variables.resourceValues}.flatMap(_item => ${itemFromRdfExpression}.toMaybe().toList())])`;
    }
    return `purify.NonEmptyList.fromArray([...${variables.resourceValues}.flatMap(_item => ${itemFromRdfExpression}.toMaybe().toList())]).toEither(new rdfjsResource.Resource.ValueError(${objectInitializer({ focusResource: variables.resource, message: `\`\${rdfjsResource.Resource.Identifier.toString(${variables.resource}.identifier)} is empty\``, predicate: variables.predicate })}))`;
  }

  override hashStatements({
    depth,
    variables,
  }: Parameters<Type["hashStatements"]>[0]): readonly string[] {
    return [
      `for (const _item${depth} of ${variables.value}) { ${this.itemType
        .hashStatements({
          depth: depth + 1,
          variables: {
            hasher: variables.hasher,
            value: `_item${depth}`,
          },
        })
        .join("\n")} }`,
    ];
  }

  override jsonUiSchemaElement(
    parameters: Parameters<Type["jsonUiSchemaElement"]>[0],
  ): ReturnType<Type["jsonUiSchemaElement"]> {
    return this.itemType.jsonUiSchemaElement(parameters);
  }

  override jsonZodSchema(
    parameters: Parameters<Type["jsonZodSchema"]>[0],
  ): ReturnType<Type["jsonZodSchema"]> {
    let schema = `${this.itemType.jsonZodSchema(parameters)}.array()`;
    if (this.minCount > 0) {
      schema = `${schema}.nonempty().min(${this.minCount})`;
    }
    return schema;
  }

  override propertyChainSparqlGraphPatternExpression(
    parameters: Parameters<
      Type["propertyChainSparqlGraphPatternExpression"]
    >[0],
  ): ReturnType<Type["propertyChainSparqlGraphPatternExpression"]> {
    return this.itemType.propertyChainSparqlGraphPatternExpression(parameters);
  }

  override propertySparqlGraphPatternExpression(
    parameters: Parameters<Type["propertySparqlGraphPatternExpression"]>[0],
  ): Type.SparqlGraphPatternExpression | Type.SparqlGraphPatternsExpression {
    if (this.minCount === 0) {
      return new Type.SparqlGraphPatternExpression(
        `sparqlBuilder.GraphPattern.optional(${this.itemType.propertySparqlGraphPatternExpression(parameters).toSparqlGraphPatternExpression()})`,
      );
    }
    return this.itemType.propertySparqlGraphPatternExpression(parameters);
  }

  override sparqlConstructTemplateTriples({
    context,
    variables,
  }: Parameters<Type["sparqlConstructTemplateTriples"]>[0]): readonly string[] {
    switch (context) {
      case "property":
        return super
          .sparqlConstructTemplateTriples({ context, variables })
          .concat(
            this.itemType.sparqlConstructTemplateTriples({
              context: "type",
              variables: {
                subject: variables.object,
                variablePrefix: variables.variablePrefix,
              },
            }),
          );
      case "type":
        return this.itemType.sparqlConstructTemplateTriples({
          context,
          variables,
        });
    }
  }

  override sparqlWherePatterns({
    context,
    variables,
  }: Parameters<Type["sparqlWherePatterns"]>[0]): readonly string[] {
    let patterns: readonly string[];
    switch (context) {
      case "property": {
        patterns = super.sparqlWherePatterns({ context, variables }).concat(
          this.itemType.sparqlWherePatterns({
            context: "type",
            variables: {
              subject: variables.object,
              variablePrefix: variables.variablePrefix,
            },
          }),
        );
        break;
      }
      case "type": {
        patterns = this.itemType.sparqlWherePatterns({ context, variables });
        break;
      }
    }
    if (patterns.length === 0) {
      return [];
    }
    return this.minCount > 0
      ? patterns
      : [`{ patterns: [${patterns.join(", ")}], type: "optional" }`];
  }

  override toJsonExpression({
    variables,
  }: Parameters<Type["toJsonExpression"]>[0]): string {
    return `${variables.value}.map(_item => (${this.itemType.toJsonExpression({ variables: { value: "_item" } })}))`;
  }

  override toRdfExpression({
    variables,
  }: Parameters<Type["toRdfExpression"]>[0]): string {
    return `${variables.value}.map((_item) => ${this.itemType.toRdfExpression({
      variables: { ...variables, value: "_item" },
    })})`;
  }
}
