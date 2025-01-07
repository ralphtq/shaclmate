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
        conversionExpression: () => "purify.Maybe.empty()",
        sourceTypeCheckExpression: (value) => `typeof ${value} === "undefined"`,
        sourceTypeName: "undefined",
      });
      conversions.push({
        conversionExpression: (value) => value,
        sourceTypeCheckExpression: (value) => `purify.Maybe.isMaybe(${value})`,
        sourceTypeName: this.name,
      });
      conversions.push({
        conversionExpression: (value) => `purify.Maybe.of(${value})`,
        sourceTypeCheckExpression: (value) =>
          `purify.NonEmptyList.isNonEmpty(${value})`,
        sourceTypeName: `purify.NonEmptyList<${this.itemType.name}>`,
      });
      conversions.push({
        conversionExpression: (value) =>
          `purify.NonEmptyList.fromArray(${value})`,
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
    return `(left, right) => purifyHelpers.Arrays.equals(${this.toArray("left")}, ${this.toArray("right")}, ${itemTypeEqualsFunction})`;
  }

  override get jsonName(): string {
    return `readonly (${this.itemType.jsonName})[]`;
  }

  override get mutable(): boolean {
    return this.itemType.mutable;
  }

  @Memoize()
  override get name(): string {
    let name = `purify.NonEmptyList<${this.itemType.name}>`;
    if (this.minCount === 0) {
      name = `purify.Maybe<${name}>`;
    }
    return name;
  }

  override get useImports(): readonly Import[] {
    return this.itemType.useImports;
  }

  override propertyChainSparqlGraphPatternExpression(
    parameters: Parameters<
      Type["propertyChainSparqlGraphPatternExpression"]
    >[0],
  ): ReturnType<Type["propertyChainSparqlGraphPatternExpression"]> {
    return this.itemType.propertyChainSparqlGraphPatternExpression(parameters);
  }

  override propertyFromRdfExpression({
    variables,
  }: Parameters<Type["propertyFromRdfExpression"]>[0]): string {
    const itemFromRdfExpression = this.itemType.propertyFromRdfExpression({
      variables: { ...variables, resourceValues: "_item.toValues()" },
    });
    if (this.minCount === 0) {
      return `purify.Either.of(purify.NonEmptyList.fromArray([...${variables.resourceValues}.flatMap(_item => ${itemFromRdfExpression}.toMaybe().toList())]))`;
    }
    return `purify.NonEmptyList.fromArray([...${variables.resourceValues}.flatMap(_item => ${itemFromRdfExpression}.toMaybe().toList())]).toEither(new rdfjsResource.Resource.ValueError({ focusResource: ${variables.resource}, message: \`\${rdfjsResource.Resource.Identifier.toString(${variables.resource}.identifier)} is empty\`, predicate: ${variables.predicate} }))`;
  }

  override propertyHashStatements({
    depth,
    variables,
  }: Parameters<Type["propertyHashStatements"]>[0]): readonly string[] {
    return [
      `for (const _item${depth} of ${this.toArray(variables.value)}) { ${this.itemType
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
    return `(${this.toArray(variables.value)}).map(_item => (${this.itemType.propertyToJsonExpression({ variables: { value: "_item" } })}))`;
  }

  override propertyToRdfExpression({
    variables,
  }: Parameters<Type["propertyToRdfExpression"]>[0]): string {
    return `(${this.toArray(variables.value)}).map((_item) => ${this.itemType.propertyToRdfExpression(
      {
        variables: { ...variables, value: "_item" },
      },
    )})`;
  }

  private toArray(value: string) {
    if (this.minCount === 0) {
      return `((${value}.extract() as readonly (${this.itemType.name})[] | undefined) ?? [])`;
    }
    return value;
  }
}
