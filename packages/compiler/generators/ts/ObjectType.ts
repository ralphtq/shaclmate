import type { NamedNode } from "@rdfjs/types";
import { camelCase } from "change-case";
import { Maybe } from "purify-ts";
import { invariant } from "ts-invariant";
import {
  type ClassDeclarationStructure,
  type InterfaceDeclarationStructure,
  type ModuleDeclarationStructure,
  type StatementStructures,
  StructureKind,
} from "ts-morph";
import { Memoize } from "typescript-memoize";
import type {
  MintingStrategy,
  TsObjectDeclarationType,
} from "../../enums/index.js";
import { DeclaredType } from "./DeclaredType.js";
import type { IdentifierType } from "./IdentifierType.js";
import { Import } from "./Import.js";
import { Type } from "./Type.js";
import * as _ObjectType from "./_ObjectType/index.js";
import {
  IdentifierProperty,
  TypeDiscriminatorProperty,
} from "./_ObjectType/index.js";

export class ObjectType extends DeclaredType {
  readonly abstract: boolean;
  readonly declarationType: TsObjectDeclarationType;
  readonly kind = "ObjectType";
  protected readonly comment: Maybe<string>;
  protected readonly extern: boolean;
  protected readonly fromRdfType: Maybe<NamedNode>;
  protected readonly label: Maybe<string>;
  protected readonly mintingStrategy: Maybe<MintingStrategy>;
  protected readonly toRdfTypes: readonly NamedNode[];
  private readonly imports: readonly string[];
  private readonly lazyAncestorObjectTypes: () => readonly ObjectType[];
  private readonly lazyDescendantObjectTypes: () => readonly ObjectType[];
  private readonly lazyParentObjectTypes: () => readonly ObjectType[];
  private readonly lazyProperties: () => readonly ObjectType.Property[];

  constructor({
    abstract,
    comment,
    declarationType,
    extern,
    fromRdfType,
    label,
    lazyAncestorObjectTypes,
    lazyDescendantObjectTypes,
    lazyParentObjectTypes,
    lazyProperties,
    imports,
    mintingStrategy,
    toRdfTypes,
    ...superParameters
  }: {
    abstract: boolean;
    comment: Maybe<string>;
    declarationType: TsObjectDeclarationType;
    extern: boolean;
    fromRdfType: Maybe<NamedNode>;
    imports: readonly string[];
    label: Maybe<string>;
    lazyAncestorObjectTypes: () => readonly ObjectType[];
    lazyDescendantObjectTypes: () => readonly ObjectType[];
    lazyParentObjectTypes: () => readonly ObjectType[];
    lazyProperties: () => readonly ObjectType.Property[];
    mintingStrategy: Maybe<MintingStrategy>;
    toRdfTypes: readonly NamedNode[];
  } & ConstructorParameters<typeof DeclaredType>[0]) {
    super(superParameters);
    this.abstract = abstract;
    this.comment = comment;
    this.declarationType = declarationType;
    this.extern = extern;
    this.fromRdfType = fromRdfType;
    this.imports = imports;
    this.label = label;
    // Lazily initialize some members in getters to avoid recursive construction
    this.lazyAncestorObjectTypes = lazyAncestorObjectTypes;
    this.lazyDescendantObjectTypes = lazyDescendantObjectTypes;
    this.lazyParentObjectTypes = lazyParentObjectTypes;
    this.lazyProperties = lazyProperties;
    this.mintingStrategy = mintingStrategy;
    this.toRdfTypes = toRdfTypes;
  }

  get _discriminatorProperty(): Type.DiscriminatorProperty {
    const discriminatorProperty = this.properties.find(
      (property) => property instanceof ObjectType.TypeDiscriminatorProperty,
    );
    invariant(discriminatorProperty);
    return {
      name: discriminatorProperty.name,
      values: [this.discriminatorValue],
    };
  }

  @Memoize()
  get ancestorObjectTypes(): readonly ObjectType[] {
    return this.lazyAncestorObjectTypes();
  }

  override get conversions(): readonly Type.Conversion[] {
    return [
      {
        conversionExpression: (value) => value,
        sourceTypeCheckExpression: (value) =>
          `typeof ${value} === "object" && ${value} instanceof ${this.name}`,
        sourceTypeName: this.name,
      },
    ];
  }

  get declarationImports(): readonly Import[] {
    if (this.extern) {
      return [];
    }
    const imports: Import[] = this.properties.flatMap(
      (property) => property.declarationImports,
    );
    if (this.features.has("equals")) {
      imports.push(Import.PURIFY_HELPERS);
    }
    if (this.features.has("fromRdf") || this.features.has("toRdf")) {
      imports.push(Import.PURIFY);
      imports.push(Import.RDFJS_RESOURCE);
    }
    if (this.features.has("sparql-graph-patterns")) {
      imports.push(Import.SPARQL_BUILDER);
    }
    return imports;
  }

  get declarations() {
    const declarations: (
      | ClassDeclarationStructure
      | InterfaceDeclarationStructure
      | ModuleDeclarationStructure
    )[] = [
      ..._ObjectType.classDeclaration.bind(this)().toList(),
      ..._ObjectType.interfaceDeclaration.bind(this)().toList(),
    ];

    const moduleStatements: StatementStructures[] = [
      ..._ObjectType.createFunctionDeclaration.bind(this)().toList(),
      ..._ObjectType.equalsFunctionDeclaration.bind(this)().toList(),
      ..._ObjectType.fromRdfFunctionDeclarations.bind(this)(),
      ..._ObjectType.hashFunctionDeclaration.bind(this)().toList(),
      ..._ObjectType.sparqlGraphPatternsClassDeclaration.bind(this)().toList(),
      ..._ObjectType.toJsonFunctionDeclaration.bind(this)().toList(),
      ..._ObjectType.toRdfFunctionDeclaration.bind(this)().toList(),
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

  @Memoize()
  get descendantObjectTypes(): readonly ObjectType[] {
    return this.lazyDescendantObjectTypes();
  }

  override get discriminatorProperty(): Maybe<Type.DiscriminatorProperty> {
    return Maybe.of(this._discriminatorProperty);
  }

  get discriminatorValue(): string {
    return this.name;
  }

  override get equalsFunction(): string {
    switch (this.declarationType) {
      case "class":
        return "purifyHelpers.Equatable.equals";
      case "interface":
        return `${this.name}.equals`;
      default:
        throw new RangeError(this.declarationType);
    }
  }

  @Memoize()
  get hashFunctionName(): string {
    if (
      this.lazyDescendantObjectTypes().length > 0 ||
      this.ancestorObjectTypes.length > 0
    ) {
      return `hash${this.name}`;
    }
    return "hash";
  }

  @Memoize()
  get identifierProperty(): ObjectType.IdentifierProperty {
    const identifierProperty = this.properties.find(
      (property) => property instanceof ObjectType.IdentifierProperty,
    );
    invariant(identifierProperty);
    return identifierProperty;
  }

  @Memoize()
  get identifierType(): IdentifierType {
    return this.identifierProperty.type;
  }

  get jsonName(): string {
    if (this.features.has("toJson")) {
      switch (this.declarationType) {
        case "class":
          return `ReturnType<${this.name}["toJson"]>`;
        case "interface":
          return `ReturnType<typeof ${this.name}.toJson>`;
        default:
          throw new RangeError(this.declarationType);
      }
    }
    if (this.features.has("fromJson")) {
      return `Parameters<typeof ${this.name}.fromJson>[0]`;
    }
    throw new RangeError(
      "jsonName called when neither fromJson nor toJson features are enabled",
    );
  }

  get mutable(): boolean {
    return this.properties.some((property) => property.mutable);
  }

  @Memoize()
  get ownProperties(): readonly ObjectType.Property[] {
    if (this.parentObjectTypes.length === 0) {
      // Consider that a root of the object type hierarchy "owns" the identifier and type discriminator properties
      // for all of its subtypes in the hierarchy.
      invariant(this.properties.length >= 2, this.name);
      return this.properties;
    }
    return this.properties.filter(
      (property) =>
        !(property instanceof IdentifierProperty) &&
        !(property instanceof TypeDiscriminatorProperty),
    );
  }

  @Memoize()
  get parentObjectTypes(): readonly ObjectType[] {
    return this.lazyParentObjectTypes();
  }

  @Memoize()
  get properties(): readonly ObjectType.Property[] {
    const properties = this.lazyProperties()
      .concat()
      .sort((left, right) => left.name.localeCompare(right.name));
    const propertyNames = new Set<string>();
    for (const property of properties) {
      if (propertyNames.has(property.name)) {
        throw new Error(`duplicate property '${property.name}'`);
      }
    }
    return properties;
  }

  override get useImports(): readonly Import[] {
    return this.imports;
  }

  protected get thisVariable(): string {
    switch (this.declarationType) {
      case "class":
        return "this";
      case "interface":
        return `_${camelCase(this.name)}`;
      default:
        throw new RangeError(this.declarationType);
    }
  }

  override propertyChainSparqlGraphPatternExpression({
    variables,
  }: Parameters<
    Type["propertyChainSparqlGraphPatternExpression"]
  >[0]): Maybe<Type.SparqlGraphPatternsExpression> {
    return Maybe.of(
      new Type.SparqlGraphPatternsExpression(
        // Ignore the rdf:type if the instance of this type is the object of another property.
        // Instead, assume the property has the correct range.
        // This also accommodates the case where the object of a property is a dangling identifier that's not the
        // subject of any statements.
        `new ${this.name}.SparqlGraphPatterns(${variables.subject}, { ignoreRdfType: true })`,
      ),
    );
  }

  override propertyFromJsonExpression({
                                      variables,
                                    }: Parameters<Type["propertyFromJsonExpression"]>[0]): string {
    return `${this.name}.fromJson(${variables.value})`;
  }

  override propertyFromRdfExpression({
    variables,
  }: Parameters<Type["propertyFromRdfExpression"]>[0]): string {
    // Ignore the rdf:type if the instance of this type is the object of another property.
    // Instead, assume the property has the correct range.
    // This also accommodates the case where the object of a property is a dangling identifier that's not the
    // subject of any statements.
    return `${variables.resourceValues}.head().chain(value => value.to${this.rdfjsResourceType().named ? "Named" : ""}Resource()).chain(_resource => ${this.name}.fromRdf({ ...${variables.context}, ignoreRdfType: true, languageIn: ${variables.languageIn}, resource: _resource }))`;
  }

  override propertyHashStatements({
    variables,
  }: Parameters<Type["propertyHashStatements"]>[0]): readonly string[] {
    switch (this.declarationType) {
      case "class":
        return [`${variables.value}.hash(${variables.hasher});`];
      case "interface":
        return [
          `${this.name}.${this.hashFunctionName}(${variables.value}, ${variables.hasher});`,
        ];
    }
  }

  override propertyToJsonExpression({
    variables,
  }: Parameters<Type["propertyToJsonExpression"]>[0]): string {
    switch (this.declarationType) {
      case "class":
        return `${variables.value}.toJson()`;
      case "interface":
        return `${this.name}.toJson(${variables.value})`;
    }
  }

  override propertyToRdfExpression({
    variables,
  }: Parameters<Type["propertyToRdfExpression"]>[0]): string {
    switch (this.declarationType) {
      case "class":
        return `${variables.value}.toRdf({ mutateGraph: ${variables.mutateGraph}, resourceSet: ${variables.resourceSet} })`;
      case "interface":
        return `${this.name}.toRdf(${variables.value}, { mutateGraph: ${variables.mutateGraph}, resourceSet: ${variables.resourceSet} })`;
    }
  }

  rdfjsResourceType(options?: { mutable?: boolean }): {
    readonly mutable: boolean;
    readonly name: string;
    readonly named: boolean;
  } {
    if (this.parentObjectTypes.length > 0) {
      return this.parentObjectTypes[0].rdfjsResourceType(options);
    }

    return {
      mutable: !!options?.mutable,
      name: `rdfjsResource.${options?.mutable ? "Mutable" : ""}Resource${this.identifierType.isNamedNodeKind ? "<rdfjs.NamedNode>" : ""}`,
      named: this.identifierType.isNamedNodeKind,
    };
  }

  protected ensureAtMostOneSuperObjectType() {
    if (this.parentObjectTypes.length > 1) {
      throw new RangeError(
        `object type '${this.name}' has multiple super object types`,
      );
    }
  }
}

export namespace ObjectType {
  export const IdentifierProperty = _ObjectType.IdentifierProperty;
  export type IdentifierProperty = _ObjectType.IdentifierProperty;
  export const Property = _ObjectType.Property;
  export type Property = _ObjectType.Property<any>;
  export const ShaclProperty = _ObjectType.ShaclProperty;
  export type ShaclProperty = _ObjectType.ShaclProperty;
  export const TypeDiscriminatorProperty =
    _ObjectType.TypeDiscriminatorProperty;
  export type TypeDiscriminatorProperty = _ObjectType.TypeDiscriminatorProperty;
}