import { Maybe } from "purify-ts";
import type { Import } from "./Import.js";
import { LiteralType } from "./LiteralType.js";
import type { Type } from "./Type.js";

export abstract class PrimitiveType<
  ValueT extends boolean | Date | string | number,
> extends LiteralType {
  override readonly equalsFunction: string =
    "purifyHelpers.Equatable.strictEquals";
  readonly primitiveDefaultValue: Maybe<ValueT>;
  readonly primitiveIn: readonly ValueT[];

  constructor({
    primitiveDefaultValue,
    primitiveIn,
    ...superParameters
  }: {
    primitiveDefaultValue: Maybe<ValueT>;
    primitiveIn: readonly ValueT[];
  } & ConstructorParameters<typeof LiteralType>[0]) {
    super(superParameters);
    this.primitiveDefaultValue = primitiveDefaultValue;
    this.primitiveIn = primitiveIn;
  }

  override get discriminatorProperty(): Maybe<Type.DiscriminatorProperty> {
    return Maybe.empty();
  }

  override get jsonName(): string {
    return this.name;
  }

  override get useImports(): readonly Import[] {
    return [];
  }

  override propertyFromJsonExpression({
    variables,
  }: Parameters<Type["propertyFromJsonExpression"]>[0]): string {
    return variables.value;
  }

  override propertyHashStatements({
    variables,
  }: Parameters<Type["propertyHashStatements"]>[0]): readonly string[] {
    return [`${variables.hasher}.update(${variables.value}.toString());`];
  }

  override propertyToJsonExpression({
    variables,
  }: Parameters<Type["propertyToJsonExpression"]>[0]): string {
    return variables.value;
  }

  protected override propertyFilterRdfResourceValuesExpression({
    variables,
  }: Parameters<
    LiteralType["propertyFilterRdfResourceValuesExpression"]
  >[0]): string {
    return variables.resourceValues;
  }
}
