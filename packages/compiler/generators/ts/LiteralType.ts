import type { Literal } from "@rdfjs/types";
import type { Maybe, NonEmptyList } from "purify-ts";
import { TermType } from "./TermType.js";

export class LiteralType extends TermType<Literal> {
  private readonly languageIn: Maybe<NonEmptyList<string>>;

  constructor({
    languageIn,
    ...superParameters
  }: { languageIn: Maybe<NonEmptyList<string>> } & Omit<
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
