import { PrimitiveType } from "./PrimitiveType.js";
import type { Type } from "./Type.js";

export class DateTimeType extends PrimitiveType<Date> {
  override readonly equalsFunction =
    "(left, right) => purifyHelpers.Equatable.EqualsResult.fromBooleanEqualsResult(left, right, left.getTime() === right.getTime())";
  readonly kind = "DateTimeType";
  override readonly mutable = true;

  override get conversions(): readonly Type.Conversion[] {
    const conversions: Type.Conversion[] = [
      {
        conversionExpression: (value) => value,
        sourceTypeCheckExpression: (value) =>
          `typeof ${value} === "object" && ${value} instanceof Date`,
        sourceTypeName: this.name,
      },
    ];

    this.primitiveDefaultValue.ifJust((defaultValue) => {
      conversions.push({
        conversionExpression: () => `new Date("${defaultValue.toISOString()}")`,
        sourceTypeCheckExpression: (value) => `typeof ${value} === "undefined"`,
        sourceTypeName: "undefined",
      });
    });

    return conversions;
  }

  override get jsonName(): string {
    return "string";
  }

  override get name(): string {
    return "Date";
  }

  override propertyFromJsonExpression({
    variables,
  }: Parameters<Type["propertyFromJsonExpression"]>[0]): string {
    return `new Date(${variables.value})`;
  }

  override propertyFromRdfResourceValueExpression({
    variables,
  }: Parameters<
    PrimitiveType<number>["propertyFromRdfResourceValueExpression"]
  >[0]): string {
    let expression = `${variables.resourceValue}.toDate()`;
    if (this.primitiveIn.length > 0) {
      expression = `${expression}.chain(value => { ${this.primitiveIn.map((value) => `if (value.getTime() === ${value.getTime()}) { return purify.Either.of(value); }`).join(" ")} return purify.Left(new rdfjsResource.Resource.MistypedValueError({ actualValue: rdfLiteral.toRdf(value), expectedValueType: ${JSON.stringify(this.name)}, focusResource: ${variables.resource}, predicate: ${variables.predicate} })); })`;
    }
    return expression;
  }

  override propertyHashStatements({
    variables,
  }: Parameters<Type["propertyHashStatements"]>[0]): readonly string[] {
    return [`${variables.hasher}.update(${variables.value}.toISOString());`];
  }

  override propertyToJsonExpression({
    variables,
  }: Parameters<PrimitiveType<Date>["propertyToJsonExpression"]>[0]): string {
    return `${variables.value}.toISOString()`;
  }

  override propertyToRdfExpression({
    variables,
  }: Parameters<PrimitiveType<Date>["propertyToRdfExpression"]>[0]): string {
    return this.primitiveDefaultValue
      .map(
        (defaultValue) =>
          `${variables.value}.getTime() !== ${defaultValue.getTime()} ? ${variables.value} : undefined`,
      )
      .orDefault(variables.value);
  }
}
