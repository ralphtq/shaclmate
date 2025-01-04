import type { Literal } from "@rdfjs/types";
import { xsd } from "@tpluscode/rdf-ns-builders";
import { Maybe, type NonEmptyList } from "purify-ts";
import { Import } from "./Import.js";
import { TermType } from "./TermType.js";
import type { Type } from "./Type.js";

export class LiteralType extends TermType<Literal> {
  readonly jsonName: string =
    'string | { "@language": string | undefined, "@type": string | undefined, "@value": string }';

  private readonly languageIn: Maybe<NonEmptyList<string>>;

  constructor({
    languageIn,
    ...superParameters
  }: { languageIn: Maybe<NonEmptyList<string>> } & ConstructorParameters<
    typeof TermType<Literal>
  >[0]) {
    super(superParameters);
    this.languageIn = languageIn;
  }

  override get conversions(): readonly Type.Conversion[] {
    const conversions: Type.Conversion[] = [];

    conversions.push({
      conversionExpression: (value) => `rdfLiteral.toRdf(${value})`,
      sourceTypeCheckExpression: (value) => `typeof ${value} === "boolean"`,
      sourceTypeName: "boolean",
    });

    conversions.push({
      conversionExpression: (value) => `rdfLiteral.toRdf(${value})`,
      sourceTypeCheckExpression: (value) =>
        `typeof ${value} === "object" && ${value} instanceof Date`,
      sourceTypeName: "Date",
    });

    conversions.push({
      conversionExpression: (value) => `rdfLiteral.toRdf(${value})`,
      sourceTypeCheckExpression: (value) => `typeof ${value} === "number"`,
      sourceTypeName: "number",
    });

    conversions.push({
      conversionExpression: (value) =>
        `${this.dataFactoryVariable}.literal(${value})`,
      sourceTypeCheckExpression: (value) => `typeof ${value} === "string"`,
      sourceTypeName: "string",
    });

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
      type: "string",
      values: ["Literal" satisfies Literal["termType"]],
    });
  }

  get name(): string {
    return "rdfjs.Literal";
  }

  override get useImports(): readonly Import[] {
    return [Import.RDF_LITERAL, Import.RDFJS_TYPES];
  }

  override propertyFromRdfResourceValueExpression({
    variables,
  }: Parameters<
    TermType<Literal>["propertyFromRdfResourceValueExpression"]
  >[0]): string {
    return `${variables.resourceValue}.toLiteral()`;
  }

  override propertyHashStatements({
    variables,
  }: Parameters<
    TermType<Literal>["propertyHashStatements"]
  >[0]): readonly string[] {
    return [`${variables.hasher}.update(${variables.value}.value);`];
  }

  override propertyToJsonExpression({
    variables,
  }: Parameters<Type["propertyToJsonExpression"]>[0]): string {
    return `(${variables.value}.datatype.value === "${xsd.string.value}" && ${variables.value}.language.length === 0 ? ${variables.value}.value : { "@language": ${variables.value}.language.length > 0 ? ${variables.value}.language : undefined, "@type": ${variables.value}.datatype.value !== "${xsd.string.value}" ? ${variables.value}.datatype.value : undefined, "@value": ${variables.value}.value })`;
  }

  protected override propertyFilterRdfResourceValuesExpression({
    variables,
  }: Parameters<
    TermType<Literal>["propertyFilterRdfResourceValuesExpression"]
  >[0]): string {
    return `${variables.resourceValues}.filter(_value => {
  const _languageInOrDefault = ${variables.languageIn} ?? ${this.languageIn.isJust() ? JSON.stringify(this.languageIn.unsafeCoerce()) : "[]"};
  if (_languageInOrDefault.length === 0) {
    return true;
  }
  const _valueLiteral = _value.toLiteral().toMaybe().extract();
  if (typeof _valueLiteral === "undefined") {
    return false;
  }
  return _languageInOrDefault.some(_languageIn => _languageIn === _valueLiteral.language);
})`;
  }
}
