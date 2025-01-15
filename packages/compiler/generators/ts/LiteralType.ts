import type { Literal } from "@rdfjs/types";
import { xsd } from "@tpluscode/rdf-ns-builders";
import { TermType } from "./TermType.js";

export class LiteralType extends TermType<Literal> {
  private readonly languageIn: readonly string[];

  constructor({
    languageIn,
    ...superParameters
  }: { languageIn: readonly string[] } & Omit<
    ConstructorParameters<typeof TermType<Literal>>[0],
    "nodeKinds"
  >) {
    super({
      ...superParameters,
      nodeKinds: new Set<"Literal">(["Literal"]),
    });
    this.languageIn = languageIn;
  }

  override get jsonName(): string {
    return '{ readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string }';
  }

  override propertyFromJsonExpression({
    variables,
  }: Parameters<TermType<Literal>["propertyFromJsonExpression"]>[0]): string {
    return `${this.dataFactoryVariable}.literal(${variables.value}["@value"], typeof ${variables.value}["@language"] !== "undefined" ? ${variables.value}["@language"] : (typeof ${variables.value}["@type"] !== "undefined" ? dataFactory.namedNode(${variables.value}["@type"]) : ""))`;
  }

  override propertyFromRdfResourceValueExpression({
    variables,
  }: Parameters<
    TermType<Literal>["propertyFromRdfResourceValueExpression"]
  >[0]): string {
    return `${variables.resourceValue}.toLiteral()`;
  }

  override propertyHashStatements({
    depth,
    variables,
  }: Parameters<
    TermType<Literal>["propertyHashStatements"]
  >[0]): readonly string[] {
    return [
      `${variables.hasher}.update(${variables.value}.datatype.value);`,
      `${variables.hasher}.update(${variables.value}.language);`,
    ].concat(super.propertyHashStatements({ depth, variables }));
  }

  override propertyToJsonExpression({
    variables,
  }: Parameters<TermType<Literal>["propertyToJsonExpression"]>[0]): string {
    return `{ "@language": ${variables.value}.language.length > 0 ? ${variables.value}.language : undefined, "@type": ${variables.value}.datatype.value !== "${xsd.string.value}" ? ${variables.value}.datatype.value : undefined, "@value": ${variables.value}.value }`;
  }

  protected override propertyFilterRdfResourceValuesExpression({
    variables,
  }: Parameters<
    TermType<Literal>["propertyFilterRdfResourceValuesExpression"]
  >[0]): string {
    return `${variables.resourceValues}.filter(_value => {
  const _languageInOrDefault = ${variables.languageIn} ?? ${JSON.stringify(this.languageIn)};
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
