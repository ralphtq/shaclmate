import { NodeKind } from "@shaclmate/shacl-ast";
import { Maybe } from "purify-ts";
import { invariant } from "ts-invariant";
import type {
  GetAccessorDeclarationStructure,
  OptionalKind,
  PropertyDeclarationStructure,
  PropertySignatureStructure,
} from "ts-morph";
import { MintingStrategy } from "../../../MintingStrategy.js";
import { PropertyVisibility } from "../../../PropertyVisibility.js";
import type { IdentifierType } from "../IdentifierType.js";
import { Property } from "./Property.js";

export class IdentifierProperty extends Property<IdentifierType> {
  readonly abstract: boolean;
  readonly equalsFunction = "purifyHelpers.Equatable.booleanEquals";
  private readonly classDeclarationVisibility: Maybe<PropertyVisibility>;
  private readonly mintingStrategy: Maybe<MintingStrategy>;
  private readonly override: boolean;

  constructor({
    abstract,
    classDeclarationVisibility,
    mintingStrategy,
    override,
    ...superParameters
  }: {
    abstract: boolean;
    classDeclarationVisibility: Maybe<PropertyVisibility>;
    mintingStrategy: Maybe<MintingStrategy>;
    override: boolean;
    type: IdentifierType;
  } & ConstructorParameters<typeof Property>[0]) {
    super(superParameters);
    invariant(this.visibility === PropertyVisibility.PUBLIC);
    this.abstract = abstract;
    this.classDeclarationVisibility = classDeclarationVisibility;
    this.mintingStrategy = mintingStrategy;
    this.override = override;
  }

  override get classConstructorParametersPropertySignature(): Maybe<
    OptionalKind<PropertySignatureStructure>
  > {
    if (this.abstract) {
      return Maybe.empty();
    }

    // Identifier is always optional
    return Maybe.of({
      hasQuestionToken: true,
      isReadonly: true,
      name: this.name,
      type: this.type.name,
    });
  }

  override get classGetAccessorDeclaration(): Maybe<
    OptionalKind<GetAccessorDeclarationStructure>
  > {
    if (this.abstract) {
      return Maybe.empty();
    }

    let mintIdentifier: string;
    if (this.type.nodeKinds.has(NodeKind.IRI)) {
      switch (this.mintingStrategy.orDefault(MintingStrategy.SHA256)) {
        case MintingStrategy.SHA256:
          mintIdentifier =
            "dataFactory.namedNode(`urn:shaclmate:object:${this.type}:${this.hash(sha256.create())}`)";
          break;
        case MintingStrategy.UUIDv4:
          mintIdentifier =
            "dataFactory.namedNode(`urn:shaclmate:object:${this.type}:${uuid.v4()}`)";
          break;
      }
    } else {
      invariant(this.type.nodeKinds.has(NodeKind.BLANK_NODE));
      mintIdentifier = "dataFactory.blankNode()";
    }

    return Maybe.of({
      leadingTrivia: this.override ? "override " : undefined,
      name: this.name,
      returnType: this.type.name,
      statements: [
        `if (typeof this._${this.name} === "undefined") { this._${this.name} = ${mintIdentifier}; } return this._${this.name};`,
      ],
    } satisfies OptionalKind<GetAccessorDeclarationStructure>);
  }

  override get classPropertyDeclaration(): Maybe<
    OptionalKind<PropertyDeclarationStructure>
  > {
    if (this.abstract) {
      // Abstract version of the accessor
      // Work around a ts-morph bug that puts the override keyword before the abstract keyword
      return Maybe.of({
        hasOverrideKeyword:
          this.abstract && this.override ? undefined : this.override,
        isAbstract: this.abstract && this.override ? undefined : this.abstract,
        isReadonly: true,
        leadingTrivia:
          this.abstract && this.override ? "abstract override " : undefined,
        name: this.name,
        type: this.type.name,
      });
    }

    if (this.classDeclarationVisibility.isJust()) {
      // Mutable _identifier that will be lazily initialized by the getter
      return Maybe.of({
        name: `_${this.name}`,
        scope: this.classDeclarationVisibility
          .map(Property.visibilityToScope)
          .unsafeCoerce(),
        type: `${this.type.name} | undefined`,
      });
    }

    return Maybe.empty();
  }

  override get importStatements(): readonly string[] {
    if (this.configuration.objectTypeDeclarationType !== "class") {
      return [];
    }
    if (!this.type.nodeKinds.has(NodeKind.IRI)) {
      return [];
    }

    switch (this.mintingStrategy.orDefault(MintingStrategy.SHA256)) {
      case MintingStrategy.SHA256:
        return ['import { sha256 } from "js-sha256";'];
      case MintingStrategy.UUIDv4:
        return ['import * as uuid from "uuid";'];
      default:
        throw new Error("not implemented");
    }
  }

  override get interfacePropertySignature(): OptionalKind<PropertySignatureStructure> {
    return {
      isReadonly: true,
      name: this.name,
      type: this.type.name,
    };
  }

  override classConstructorStatements({
    variables,
  }: Parameters<
    Property<IdentifierType>["classConstructorStatements"]
  >[0]): readonly string[] {
    if (this.classDeclarationVisibility.isJust()) {
      return [`this._${this.name} = ${variables.parameter};`];
    }
    return [];
  }

  override fromRdfStatements({
    variables,
  }: Parameters<
    Property<IdentifierType>["fromRdfStatements"]
  >[0]): readonly string[] {
    return [`const ${this.name} = ${variables.resource}.identifier`];
  }

  override hashStatements(): readonly string[] {
    return [];
  }

  override sparqlGraphPatternExpression(): Maybe<string> {
    return Maybe.empty();
  }

  override toRdfStatements(): readonly string[] {
    return [];
  }
}
