import { Maybe } from "purify-ts";
import type {
  OptionalKind,
  PropertyDeclarationStructure,
  PropertySignatureStructure,
} from "ts-morph";
import type { IdentifierType } from "../IdentifierType.js";
import { Property } from "./Property.js";

export class IdentifierProperty extends Property {
  readonly equalsFunction = "purifyHelpers.Equatable.booleanEquals";
  readonly type: IdentifierType;

  constructor({
    type,
    ...superParameters
  }: {
    type: IdentifierType;
  } & Property.ConstructorParameters) {
    super(superParameters);
    this.type = type;
  }

  get classConstructorParametersPropertySignature(): Maybe<
    OptionalKind<PropertySignatureStructure>
  > {
    return Maybe.of({
      isReadonly: true,
      name: this.name,
      type: this.type.name,
    });
  }

  get classPropertyDeclaration(): OptionalKind<PropertyDeclarationStructure> {
    return {
      isReadonly: true,
      name: this.name,
      type: this.type.name,
    };
  }

  get interfacePropertySignature(): OptionalKind<PropertySignatureStructure> {
    return {
      isReadonly: true,
      name: this.name,
      type: this.type.name,
    };
  }

  classConstructorInitializer({
    parameter,
  }: Property.ClassConstructorInitializerParameters): Maybe<string> {
    return Maybe.of(parameter);
  }

  fromRdfStatement({
    resourceVariable,
  }: Property.FromRdfStatementParameters): Maybe<string> {
    return Maybe.of(`const ${this.name} = ${resourceVariable}.identifier`);
  }

  sparqlGraphPatternExpression(): Maybe<string> {
    return Maybe.empty();
  }

  toRdfStatement(
    _parameters: Property.ToRdfStatementParameters,
  ): Maybe<string> {
    return Maybe.empty();
  }
}
