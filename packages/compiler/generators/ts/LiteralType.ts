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

  override propertyFromRdfResourceValueExpression({
    variables,
  }: Parameters<
    TermType<Literal>["propertyFromRdfResourceValueExpression"]
  >[0]): string {
    return `${variables.resourceValue}.toLiteral()`;
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
