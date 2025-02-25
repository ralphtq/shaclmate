import { camelCase, pascalCase } from "change-case";
import { Maybe } from "purify-ts";
import { invariant } from "ts-invariant";
import {
  type FunctionDeclarationStructure,
  type ModuleDeclarationStructure,
  type StatementStructures,
  StructureKind,
  type TypeAliasDeclarationStructure,
} from "ts-morph";
import { Memoize } from "typescript-memoize";
import { DeclaredType } from "./DeclaredType.js";
import type { Import } from "./Import.js";
import type { ObjectType } from "./ObjectType.js";
import type { Type } from "./Type.js";
import { hasherTypeConstraint } from "./_ObjectType/hashFunctionOrMethodDeclaration.js";
import { sparqlConstructQueryFunctionDeclaration } from "./_ObjectType/sparqlConstructQueryFunctionDeclaration.js";
import { sparqlConstructQueryStringFunctionDeclaration } from "./_ObjectType/sparqlConstructQueryStringFunctionDeclaration.js";
import { objectInitializer } from "./objectInitializer.js";
import { tsComment } from "./tsComment.js";

/**
 * A union of object types, generated as a type alias
 *
 *   type SomeUnion = Member1 | Member2 | ...
 *
 * with associated functions that switch on the type discriminator property and delegate to the appropriate
 * member type code.
 *
 * It also generates SPARQL graph patterns that UNION the member object types.
 */
export class ObjectUnionType extends DeclaredType {
  readonly kind = "ObjectUnionType";
  private readonly _discriminatorProperty: Type.DiscriminatorProperty;
  private readonly comment: Maybe<string>;
  private readonly label: Maybe<string>;
  private readonly memberTypes: readonly ObjectType[];

  constructor({
    comment,
    label,
    memberTypes,
    ...superParameters
  }: ConstructorParameters<typeof DeclaredType>[0] & {
    comment: Maybe<string>;
    export_: boolean;
    label: Maybe<string>;
    memberTypes: readonly ObjectType[];
    name: string;
  }) {
    super(superParameters);
    this.comment = comment;
    this.label = label;
    invariant(memberTypes.length > 0);
    this.memberTypes = memberTypes;
    const discriminatorPropertyName =
      memberTypes[0].discriminatorProperty.unsafeCoerce().name;
    const discriminatorPropertyValues: string[] = [];
    for (const memberType of this.memberTypes) {
      invariant(memberType.declarationType === memberTypes[0].declarationType);
      invariant(
        memberType._discriminatorProperty.name === discriminatorPropertyName,
      );
      discriminatorPropertyValues.push(
        ...memberType._discriminatorProperty.values,
      );
    }
    this._discriminatorProperty = {
      name: discriminatorPropertyName,
      values: discriminatorPropertyValues,
    };
  }

  override get conversions(): readonly Type.Conversion[] {
    return [
      {
        conversionExpression: (value) => value,
        sourceTypeCheckExpression: (value) => `typeof ${value} === "object"`,
        sourceTypeName: this.name,
      },
    ];
  }

  override get declarationImports(): readonly Import[] {
    return this.memberTypes.flatMap((memberType) =>
      memberType.useImports(this.features),
    );
  }

  get declarations() {
    const declarations: (
      | ModuleDeclarationStructure
      | TypeAliasDeclarationStructure
    )[] = [this.typeAliasDeclaration];

    const moduleStatements: StatementStructures[] = [
      ...this.equalsFunctionDeclaration.toList(),
      ...this.fromJsonFunctionDeclaration.toList(),
      ...this.fromRdfFunctionDeclaration.toList(),
      ...this.hashFunctionDeclaration.toList(),
      ...this.jsonZodSchemaFunctionDeclaration.toList(),
      ...this.sparqlFunctionDeclarations,
      ...this.toJsonFunctionDeclaration.toList(),
      ...this.toRdfFunctionDeclaration.toList(),
    ];

    if (moduleStatements.length > 0) {
      declarations.push({
        isExported: this.export,
        kind: StructureKind.Module,
        name: this.name,
        statements: moduleStatements,
      });
    }

    return declarations;
  }

  override get discriminatorProperty(): Maybe<Type.DiscriminatorProperty> {
    return Maybe.of(this._discriminatorProperty);
  }

  override get equalsFunction(): string {
    return `${this.name}.equals`;
  }

  override get jsonName(): string {
    return this.memberTypes
      .map((memberType) => memberType.jsonName)
      .join(" | ");
  }

  override get mutable(): boolean {
    return this.memberTypes.some((memberType) => memberType.mutable);
  }

  @Memoize()
  protected get thisVariable(): string {
    return `_${camelCase(this.name)}`;
  }

  private get equalsFunctionDeclaration(): Maybe<FunctionDeclarationStructure> {
    if (!this.features.has("equals")) {
      return Maybe.empty();
    }

    const caseBlocks = this.memberTypes.map((memberType) => {
      let returnExpression: string;
      switch (memberType.declarationType) {
        case "class":
          returnExpression = `left.equals(right as unknown as ${memberType.name})`;
          break;
        case "interface":
          returnExpression = `${memberType.name}.equals(left, right as unknown as ${memberType.name})`;
          break;
      }
      return `case "${memberType.name}": return ${returnExpression};`;
    });

    return Maybe.of({
      isExported: true,
      kind: StructureKind.Function,
      name: "equals",
      parameters: [
        {
          name: "left",
          type: this.name,
        },
        {
          name: "right",
          type: this.name,
        },
      ],
      returnType: "EqualsResult",
      statements: `\
return strictEquals(left.type, right.type).chain(() => {
  switch (left.${this._discriminatorProperty.name}) {
   ${caseBlocks.join(" ")}
  }
})`,
    });
  }

  private get fromJsonFunctionDeclaration(): Maybe<FunctionDeclarationStructure> {
    if (!this.features.has("fromJson")) {
      return Maybe.empty();
    }

    return Maybe.of({
      isExported: true,
      kind: StructureKind.Function,
      name: "fromJson",
      parameters: [
        {
          name: "json",
          type: "unknown",
        },
      ],
      returnType: `purify.Either<zod.ZodError, ${this.name}>`,
      statements: [
        `return ${this.memberTypes.reduce((expression, memberType) => {
          const memberTypeExpression = `(${memberType.name}.fromJson(json) as purify.Either<zod.ZodError, ${this.name}>)`;
          return expression.length > 0
            ? `${expression}.altLazy(() => ${memberTypeExpression})`
            : memberTypeExpression;
        }, "")};`,
      ],
    });
  }

  private get fromRdfFunctionDeclaration(): Maybe<FunctionDeclarationStructure> {
    if (!this.features.has("fromRdf")) {
      return Maybe.empty();
    }

    return Maybe.of({
      isExported: true,
      kind: StructureKind.Function,
      name: "fromRdf",
      parameters: [
        {
          name: "parameters",
          type: `{ [_index: string]: any; ignoreRdfType?: boolean; resource: ${this.rdfjsResourceType().name}; }`,
        },
      ],
      returnType: `purify.Either<rdfjsResource.Resource.ValueError, ${this.name}>`,
      statements: [
        `return ${this.memberTypes.reduce((expression, memberType) => {
          const memberTypeExpression = `(${memberType.name}.fromRdf(parameters) as purify.Either<rdfjsResource.Resource.ValueError, ${this.name}>)`;
          return expression.length > 0
            ? `${expression}.altLazy(() => ${memberTypeExpression})`
            : memberTypeExpression;
        }, "")};`,
      ],
    });
  }

  private get hashFunctionDeclaration(): Maybe<FunctionDeclarationStructure> {
    if (!this.features.has("hash")) {
      return Maybe.empty();
    }

    const hasherVariable = "_hasher";

    const caseBlocks = this.memberTypes.map((memberType) => {
      let returnExpression: string;
      switch (memberType.declarationType) {
        case "class":
          returnExpression = `${this.thisVariable}.hash(${hasherVariable})`;
          break;
        case "interface":
          returnExpression = `${memberType.name}.${memberType.hashFunctionName}(${this.thisVariable}, ${hasherVariable})`;
          break;
      }
      return `case "${memberType.name}": return ${returnExpression};`;
    });

    return Maybe.of({
      isExported: true,
      kind: StructureKind.Function,
      name: "hash",
      parameters: [
        {
          name: this.thisVariable,
          type: this.name,
        },
        {
          name: hasherVariable,
          type: "HasherT",
        },
      ],
      returnType: "HasherT",
      statements: `switch (${this.thisVariable}.${this._discriminatorProperty.name}) { ${caseBlocks.join(" ")} }`,
      typeParameters: [
        {
          name: "HasherT",
          constraint: hasherTypeConstraint,
        },
      ],
    });
  }

  private get jsonZodSchemaFunctionDeclaration(): Maybe<FunctionDeclarationStructure> {
    if (!this.features.has("fromJson")) {
      return Maybe.empty();
    }

    const variables = { zod: "zod" };
    return Maybe.of({
      isExported: true,
      kind: StructureKind.Function,
      name: "jsonZodSchema",
      statements: `return ${variables.zod}.discriminatedUnion("${this._discriminatorProperty.name}", [${this.memberTypes.map((memberType) => memberType.jsonZodSchema({ variables })).join(", ")}]);`,
    });
  }

  private get sparqlFunctionDeclarations(): readonly FunctionDeclarationStructure[] {
    if (!this.features.has("sparql")) {
      return [];
    }

    return [
      sparqlConstructQueryFunctionDeclaration.bind(this)(),
      sparqlConstructQueryStringFunctionDeclaration.bind(this)(),
      {
        isExported: true,
        kind: StructureKind.Function,
        name: "sparqlConstructTemplateTriples",
        parameters: [
          {
            name: "parameters",
            type: '{ ignoreRdfType?: boolean, subject?: sparqljs.Triple["subject"], variablePrefix?: string }',
          },
        ],
        returnType: "readonly sparqljs.Triple[]",
        statements: [
          `return [${this.memberTypes
            .map(
              (memberType) =>
                `...${memberType.name}.sparqlConstructTemplateTriples({ ignoreRdfType: parameters?.ignoreRdfType, subject: parameters.subject ?? ${this.dataFactoryVariable}.variable!("${camelCase(this.name)}${pascalCase(memberType.name)}"), variablePrefix: parameters?.variablePrefix ? \`\${parameters.variablePrefix}${pascalCase(memberType.name)}\` : "${camelCase(this.name)}${pascalCase(memberType.name)}" }).concat()`,
            )
            .join(", ")}];`,
        ],
      },
      {
        isExported: true,
        kind: StructureKind.Function,
        name: "sparqlWherePatterns",
        parameters: [
          {
            name: "parameters",
            type: '{ ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"], variablePrefix?: string }',
          },
        ],
        returnType: "readonly sparqljs.Pattern[]",
        statements: [
          `return [{ patterns: [${this.memberTypes
            .map((memberType) =>
              objectInitializer({
                patterns: `${memberType.name}.sparqlWherePatterns({ ignoreRdfType: parameters?.ignoreRdfType, subject: parameters.subject ?? ${this.dataFactoryVariable}.variable!("${camelCase(this.name)}${pascalCase(memberType.name)}"), variablePrefix: parameters?.variablePrefix ? \`\${parameters.variablePrefix}${pascalCase(memberType.name)}\` : "${camelCase(this.name)}${pascalCase(memberType.name)}" }).concat()`,
                type: '"group"',
              }),
            )
            .join(", ")}], type: "union" }];`,
        ],
      },
    ];
  }

  private get toJsonFunctionDeclaration(): Maybe<FunctionDeclarationStructure> {
    if (!this.features.has("toJson")) {
      return Maybe.empty();
    }

    const caseBlocks = this.memberTypes.map((memberType) => {
      let returnExpression: string;
      switch (memberType.declarationType) {
        case "class":
          returnExpression = `${this.thisVariable}.toJson()`;
          break;
        case "interface":
          returnExpression = `${memberType.name}.toJson(${this.thisVariable})`;
          break;
      }
      return `case "${memberType.name}": return ${returnExpression};`;
    });

    return Maybe.of({
      isExported: true,
      kind: StructureKind.Function,
      name: "toJson",
      parameters: [
        {
          name: this.thisVariable,
          type: this.name,
        },
      ],
      returnType: this.jsonName,
      statements: `switch (${this.thisVariable}.${this._discriminatorProperty.name}) { ${caseBlocks.join(" ")} }`,
    });
  }

  private get toRdfFunctionDeclaration(): Maybe<FunctionDeclarationStructure> {
    if (!this.features.has("toRdf")) {
      return Maybe.empty();
    }

    const parametersVariable = "_parameters";

    const caseBlocks = this.memberTypes.map((memberType) => {
      let returnExpression: string;
      switch (memberType.declarationType) {
        case "class":
          returnExpression = `${this.thisVariable}.toRdf(${parametersVariable})`;
          break;
        case "interface":
          returnExpression = `${memberType.name}.toRdf(${this.thisVariable}, ${parametersVariable})`;
          break;
      }
      return `case "${memberType.name}": return ${returnExpression};`;
    });

    return Maybe.of({
      isExported: true,
      kind: StructureKind.Function,
      name: "toRdf",
      parameters: [
        {
          name: this.thisVariable,
          type: this.name,
        },
        {
          name: parametersVariable,
          type: "{ mutateGraph: rdfjsResource.MutableResource.MutateGraph, resourceSet: rdfjsResource.MutableResourceSet }",
        },
      ],
      returnType: this.rdfjsResourceType({ mutable: true }).name,
      statements: `switch (${this.thisVariable}.${this._discriminatorProperty.name}) { ${caseBlocks.join(" ")} }`,
    });
  }

  private get typeAliasDeclaration(): TypeAliasDeclarationStructure {
    return {
      isExported: true,
      leadingTrivia: this.comment.alt(this.label).map(tsComment).extract(),
      kind: StructureKind.TypeAlias,
      name: this.name,
      type: this.memberTypes.map((memberType) => memberType.name).join(" | "),
    };
  }

  override fromJsonExpression({
    variables,
  }: Parameters<Type["fromJsonExpression"]>[0]): string {
    // Assumes the JSON object has been recursively validated already.
    return `${this.name}.fromJson(${variables.value}).unsafeCoerce()`;
  }

  override fromRdfExpression({
    variables,
  }: Parameters<Type["fromRdfExpression"]>[0]): string {
    return `${variables.resourceValues}.head().chain(value => value.to${this.rdfjsResourceType().named ? "Named" : ""}Resource()).chain(_resource => ${this.name}.fromRdf({ ...${variables.context}, ignoreRdfType: true, languageIn: ${variables.languageIn}, resource: _resource }))`;
  }

  override hashStatements({
    variables,
  }: Parameters<Type["hashStatements"]>[0]): readonly string[] {
    switch (this.memberTypes[0].declarationType) {
      case "class":
        return [`${variables.value}.hash(${variables.hasher});`];
      case "interface":
        return [`${this.name}.hash(${variables.value}, ${variables.hasher});`];
    }
  }

  override jsonZodSchema(): ReturnType<Type["jsonZodSchema"]> {
    return `${this.name}.jsonZodSchema()`;
  }

  override sparqlConstructTemplateTriples({
    context,
    variables,
  }: Parameters<Type["sparqlConstructTemplateTriples"]>[0]): readonly string[] {
    switch (context) {
      case "property":
        return super.sparqlConstructTemplateTriples({ context, variables });
      case "type":
        return [
          `...${this.name}.sparqlConstructTemplateTriples(${objectInitializer({
            ignoreRdfType: true,
            subject: variables.subject,
            variablePrefix: variables.variablePrefix,
          })})`,
        ];
    }
  }

  override sparqlWherePatterns({
    context,
    variables,
  }: Parameters<Type["sparqlWherePatterns"]>[0]): readonly string[] {
    switch (context) {
      case "property":
        return super.sparqlWherePatterns({ context, variables });
      case "type":
        return [
          `...${this.name}.sparqlWherePatterns(${objectInitializer({
            ignoreRdfType: true,
            subject: variables.subject,
            variablePrefix: variables.variablePrefix,
          })})`,
        ];
    }
  }

  override toJsonExpression({
    variables,
  }: Parameters<Type["toJsonExpression"]>[0]): string {
    switch (this.memberTypes[0].declarationType) {
      case "class":
        return `${variables.value}.toJson()`;
      case "interface":
        throw new Error(
          "not implemented: need a freestanding toJson function like the toRdf function",
        );
      // return `${this.name}.toJson(${variables.value})`;
    }
  }

  override toRdfExpression({
    variables,
  }: Parameters<Type["toRdfExpression"]>[0]): string {
    const options = `{ mutateGraph: ${variables.mutateGraph}, resourceSet: ${variables.resourceSet} }`;
    switch (this.memberTypes[0].declarationType) {
      case "class":
        return `${variables.value}.toRdf(${options})`;
      case "interface":
        return `${this.name}.toRdf(${variables.value}, ${options})`;
    }
  }

  override useImports(): readonly Import[] {
    return [];
  }

  private rdfjsResourceType(options?: { mutable?: boolean }): ReturnType<
    ObjectType["rdfjsResourceType"]
  > {
    const memberRdfjsResourceTypes: ReturnType<
      ObjectType["rdfjsResourceType"]
    >[] = [];
    for (const memberType of this.memberTypes) {
      const memberRdfjsResourceType = memberType.rdfjsResourceType(options);

      if (
        memberRdfjsResourceTypes.some(
          (existingMemberRdfjsResourceType) =>
            existingMemberRdfjsResourceType.name !==
            memberRdfjsResourceType.name,
        )
      ) {
        // The types don't agree, return a generic type
        return {
          mutable: !!options?.mutable,
          name: "rdfjsResource.Resource",
          named: false,
        };
      }

      memberRdfjsResourceTypes.push(memberRdfjsResourceType);
    }

    // The types agree
    return memberRdfjsResourceTypes[0];
  }
}
