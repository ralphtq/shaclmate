import { invariant } from "ts-invariant";
import { Memoize } from "typescript-memoize";
import type { Import } from "./Import.js";
import { Type } from "./Type.js";

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

  override propertyFromJsonExpression({
    variables,
  }: Parameters<Type["propertyFromJsonExpression"]>[0]): string {
    let expression = variables.value;
    if (this.minCount > 0) {
      expression = `purify.NonEmptyList.fromArray(${expression}).unsafeCoerce()`;
    }
    const itemFromJsonExpression = this.itemType.propertyFromJsonExpression({
      variables: { value: "_item" },
    });
    return itemFromJsonExpression === "_item"
      ? expression
      : `${expression}.map(_item => (${itemFromJsonExpression}))`;
  }

  override propertyFromRdfExpression({
    variables,
  }: Parameters<Type["propertyFromRdfExpression"]>[0]): string {
    const itemFromRdfExpression = this.itemType.propertyFromRdfExpression({
      variables: { ...variables, resourceValues: "_item.toValues()" },
    });
    if (this.minCount === 0) {
      return `purify.Either.of([...${variables.resourceValues}.flatMap(_item => ${itemFromRdfExpression}.toMaybe().toList())])`;
    }
    return `purify.NonEmptyList.fromArray([...${variables.resourceValues}.flatMap(_item => ${itemFromRdfExpression}.toMaybe().toList())]).toEither(new rdfjsResource.Resource.ValueError({ focusResource: ${variables.resource}, message: \`\${rdfjsResource.Resource.Identifier.toString(${variables.resource}.identifier)} is empty\`, predicate: ${variables.predicate} }))`;
  }

  override propertyHashStatements({
    depth,
    variables,
  }: Parameters<Type["propertyHashStatements"]>[0]): readonly string[] {
    return [
      `for (const _item${depth} of ${variables.value}) { ${this.itemType
        .propertyHashStatements({
          depth: depth + 1,
          variables: {
            hasher: variables.hasher,
            value: `_item${depth}`,
          },
        })
        .join("\n")} }`,
    ];
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

  override propertyToJsonExpression({
    variables,
  }: Parameters<Type["propertyToJsonExpression"]>[0]): string {
    return `${variables.value}.map(_item => (${this.itemType.propertyToJsonExpression({ variables: { value: "_item" } })}))`;
  }

  override propertyToRdfExpression({
    variables,
  }: Parameters<Type["propertyToRdfExpression"]>[0]): string {
    return `${variables.value}.map((_item) => ${this.itemType.propertyToRdfExpression(
      {
        variables: { ...variables, value: "_item" },
      },
    )})`;
  }
}
