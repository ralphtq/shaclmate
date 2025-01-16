import { Memoize } from "typescript-memoize";
import { PrimitiveType } from "./PrimitiveType.js";
import type { Type } from "./Type.js";

export class StringType extends PrimitiveType<string> {
  readonly kind = "StringType";

  override get conversions(): readonly Type.Conversion[] {
    const conversions: Type.Conversion[] = [
      {
        conversionExpression: (value) => value,
        sourceTypeCheckExpression: (value) => `typeof ${value} === "string"`,
        sourceTypeName: this.name,
      },
    ];
    this.primitiveDefaultValue.ifJust((defaultValue) => {
      conversions.push({
        conversionExpression: () => `"${defaultValue}"`,
        sourceTypeCheckExpression: (value) => `typeof ${value} === "undefined"`,
        sourceTypeName: "undefined",
      });
    });
    return conversions;
  }

  @Memoize()
  override get name(): string {
    if (this.primitiveIn.length > 0) {
      return this.primitiveIn.map((value) => `"${value}"`).join(" | ");
    }
    return "string";
  }

  override jsonZodSchema({
    variables,
  }: Parameters<Type["jsonZodSchema"]>[0]): ReturnType<Type["jsonZodSchema"]> {
    if (this.primitiveIn.length > 0) {
      return `${variables.zod}.enum(${JSON.stringify(this.primitiveIn)})`;
    }
    return `${variables.zod}.string()`;
  }

  override propertyFromRdfResourceValueExpression({
    variables,
  }: Parameters<
    PrimitiveType<string>["propertyFromRdfResourceValueExpression"]
  >[0]): string {
    let expression = `${variables.resourceValue}.toString()`;
    if (this.primitiveIn.length > 0) {
      expression = `${expression}.chain(value => { switch (value) { ${this.primitiveIn.map((value) => `case "${value}":`).join(" ")} return purify.Either.of(value); default: return purify.Left(new rdfjsResource.Resource.MistypedValueError({ actualValue: rdfLiteral.toRdf(value), expectedValueType: ${JSON.stringify(this.name)}, focusResource: ${variables.resource}, predicate: ${variables.predicate} })); } })`;
    }
    return expression;
  }

  override propertyHashStatements({
    variables,
  }: Parameters<Type["propertyHashStatements"]>[0]): readonly string[] {
    return [`${variables.hasher}.update(${variables.value});`];
  }

  override propertyToRdfExpression({
    variables,
  }: Parameters<PrimitiveType<string>["propertyToRdfExpression"]>[0]): string {
    return this.primitiveDefaultValue
      .map(
        (defaultValue) =>
          `${variables.value} !== "${defaultValue}" ? ${variables.value} : undefined`,
      )
      .orDefault(variables.value);
  }
}
