import type { IdentifierType } from "generators/ts/IdentifierType.js";
import type { Import } from "generators/ts/Import.js";
import { Maybe } from "purify-ts";
import { invariant } from "ts-invariant";
import {
  type GetAccessorDeclarationStructure,
  type OptionalKind,
  type PropertyDeclarationStructure,
  type PropertySignatureStructure,
  Scope,
} from "ts-morph";
import { SnippetDeclarations } from "../SnippetDeclarations.js";
import type { StringType } from "../StringType.js";
import { Property } from "./Property.js";

export class IdentifierPrefixProperty extends Property<StringType> {
  readonly equalsFunction = "strictEquals";
  readonly mutable = false;
  private readonly declare: boolean;
  private readonly override: boolean;

  constructor({
    declare,
    override,
    ...superParameters
  }: {
    declare: boolean;
    override: boolean;
    type: StringType;
  } & ConstructorParameters<typeof Property>[0]) {
    super(superParameters);
    invariant(this.visibility === "protected");
    this.declare = declare;
    this.override = override;
  }

  override get classGetAccessorDeclaration(): Maybe<
    OptionalKind<GetAccessorDeclarationStructure>
  > {
    return Maybe.of({
      leadingTrivia: this.override ? "override " : undefined,
      name: this.name,
      returnType: this.type.name,
      scope: Scope.Protected,
      statements: [
        `return (typeof this._${this.name} !== "undefined") ? this._${this.name} : \`urn:shaclmate:object:\${this.type}:\``,
      ],
    } satisfies OptionalKind<GetAccessorDeclarationStructure>);
  }

  override get classPropertyDeclaration(): Maybe<
    OptionalKind<PropertyDeclarationStructure>
  > {
    // See note in TypeFactory re: the logic of whether to declare the property in the class or not.
    if (this.declare) {
      return Maybe.of({
        isReadonly: true,
        name: `_${this.name}`,
        scope: Scope.Protected,
        type: this.type.name,
      });
    }
    return Maybe.empty();
  }

  override get constructorParametersPropertySignature(): Maybe<
    OptionalKind<PropertySignatureStructure>
  > {
    return Maybe.of({
      hasQuestionToken: true,
      isReadonly: true,
      name: this.name,
      type: this.type.name,
    });
  }

  override get declarationImports(): readonly Import[] {
    return [];
  }

  override get interfacePropertySignature(): Maybe<
    OptionalKind<PropertySignatureStructure>
  > {
    return Maybe.empty();
  }

  override get jsonPropertySignature(): Maybe<
    OptionalKind<PropertySignatureStructure>
  > {
    return Maybe.empty();
  }

  override get snippetDeclarations(): readonly string[] {
    const snippetDeclarations: string[] = [];
    if (this.objectType.features.has("equals")) {
      snippetDeclarations.push(SnippetDeclarations.booleanEquals);
    }
    return snippetDeclarations;
  }

  override classConstructorStatements({
    variables,
  }: Parameters<
    Property<IdentifierType>["classConstructorStatements"]
  >[0]): readonly string[] {
    if (this.classPropertyDeclaration.isNothing()) {
      return [];
    }
    const classPropertyDeclaration =
      this.classPropertyDeclaration.unsafeCoerce();

    const typeConversions = this.type.conversions;
    if (typeConversions.length === 1) {
      return [
        `this.${classPropertyDeclaration.name} = ${variables.parameter};`,
      ];
    }
    const statements: string[] = [];
    for (const conversion of this.type.conversions) {
      invariant(conversion.sourceTypeName !== "undefined");
      statements.push(
        `if (${conversion.sourceTypeCheckExpression(variables.parameter)}) { this.${classPropertyDeclaration.name} = ${conversion.conversionExpression(variables.parameter)}; }`,
      );
    }

    if (classPropertyDeclaration.name.startsWith("_")) {
      statements.push(`if (typeof ${variables.parameter} === "undefined") { }`);
    }

    // We shouldn't need this else, since the parameter now has the never type, but have to add it to appease the TypeScript compiler
    statements.push(
      `{ this.${classPropertyDeclaration.name} =( ${variables.parameter}) as never;\n }`,
    );

    return [statements.join(" else ")];
  }

  override fromJsonStatements(): readonly string[] {
    return [];
  }

  override fromRdfStatements(): readonly string[] {
    return [];
  }

  override hashStatements(): readonly string[] {
    return [];
  }

  override interfaceConstructorStatements({
    variables,
  }: Parameters<
    Property<IdentifierType>["interfaceConstructorStatements"]
  >[0]): readonly string[] {
    const typeConversions = this.type.conversions;
    if (typeConversions.length === 1) {
      return [`const ${this.name} = ${variables.parameter};`];
    }
    const statements: string[] = [`let ${this.name}: ${this.type.name};`];
    const conversionBranches: string[] = [];
    for (const conversion of this.type.conversions) {
      conversionBranches.push(
        `if (${conversion.sourceTypeCheckExpression(variables.parameter)}) { ${this.name} = ${conversion.conversionExpression(variables.parameter)}; }`,
      );
    }
    // We shouldn't need this else, since the parameter now has the never type, but have to add it to appease the TypeScript compiler
    conversionBranches.push(
      `{ ${this.name} =( ${variables.parameter}) as never;\n }`,
    );
    statements.push(conversionBranches.join(" else "));
    return statements;
  }

  override jsonUiSchemaElement(): Maybe<string> {
    return Maybe.empty();
  }

  override jsonZodSchema(): ReturnType<
    Property<IdentifierType>["jsonZodSchema"]
  > {
    return Maybe.empty();
  }

  override sparqlConstructTemplateTriples(): readonly string[] {
    return [];
  }

  override sparqlWherePatterns(): readonly string[] {
    return [];
  }

  override toJsonObjectMember(): Maybe<string> {
    return Maybe.empty();
  }

  override toRdfStatements(): readonly string[] {
    return [];
  }
}
