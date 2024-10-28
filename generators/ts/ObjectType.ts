import type { NamedNode } from "@rdfjs/types";
import type { Maybe } from "purify-ts";
import type { IdentifierType } from "./IdentifierType.js";
import type { Property } from "./Property.js";
import { Type } from "./Type.js";
import { interfaceDeclaration, moduleDeclaration } from "./_ObjectType";
import { shorthandProperty } from "./shorthandProperty.js";

export class ObjectType extends Type {
  readonly ancestorObjectTypes: readonly ObjectType[];
  readonly astName: string;
  readonly classQualifiedName: string;
  readonly descendantObjectTypes: readonly ObjectType[];
  readonly identifierType: IdentifierType;
  interfaceDeclaration = interfaceDeclaration;
  readonly interfaceQualifiedName: string;
  readonly kind = "Object";
  moduleDeclaration = moduleDeclaration;
  readonly moduleQualifiedName: string;
  readonly parentObjectTypes: readonly ObjectType[];
  readonly properties: readonly Property[];
  readonly rdfType: Maybe<NamedNode>;
  readonly sparqlGraphPatternsClassQualifiedName: string;
  protected readonly classUnqualifiedName: string = "Class";
  protected readonly interfaceUnqualifiedName: string;
  protected readonly sparqlGraphPatternsClassUnqualifiedName: string =
    "SparqlGraphPatterns";

  constructor({
    ancestorObjectTypes,
    astName,
    descendantObjectTypes,
    identifierType,
    properties,
    rdfType,
    parentObjectTypes,
    ...superParameters
  }: {
    ancestorObjectTypes: readonly ObjectType[];
    astName: string;
    descendantObjectTypes: readonly ObjectType[];
    identifierType: IdentifierType;
    properties: readonly Property[];
    rdfType: Maybe<NamedNode>;
    parentObjectTypes: readonly ObjectType[];
  } & Type.ConstructorParameters) {
    super(superParameters);
    this.ancestorObjectTypes = ancestorObjectTypes;
    this.descendantObjectTypes = descendantObjectTypes;
    this.identifierType = identifierType;
    this.properties = properties
      .concat()
      .sort((left, right) => left.name.localeCompare(right.name));
    const propertyNames = new Set<string>();
    for (const property of this.properties) {
      if (propertyNames.has(property.name)) {
        throw new Error(`duplicate property '${property.name}'`);
      }
    }
    this.rdfType = rdfType;
    this.parentObjectTypes = parentObjectTypes;

    this.astName = astName;
    this.interfaceUnqualifiedName = astName;
    this.moduleQualifiedName = astName;
    this.classQualifiedName = `${this.moduleQualifiedName}.${this.classUnqualifiedName}`;
    this.interfaceQualifiedName = this.interfaceUnqualifiedName;
    this.sparqlGraphPatternsClassQualifiedName = `${astName}.${this.sparqlGraphPatternsClassUnqualifiedName}`;
  }

  get name(): string {
    return this.interfaceQualifiedName;
  }

  equalsFunction(): string {
    return `${this.moduleQualifiedName}.equals`;
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

  sparqlGraphPatterns({
    dataFactoryVariable,
    subjectVariable,
  }: Type.SparqlGraphPatternParameters): readonly string[] {
    return [
      `...new ${this.moduleQualifiedName}.SparqlGraphPatterns({ ${shorthandProperty("dataFactory", dataFactoryVariable)}, ${shorthandProperty("subject", subjectVariable)} })`,
    ];
  }

  valueFromRdf({
    dataFactoryVariable,
    resourceValueVariable,
  }: Type.ValueFromRdfParameters): string {
    return `${resourceValueVariable}.to${this.rdfjsResourceType().named ? "Named" : ""}Resource().chain(resource => ${this.moduleQualifiedName}.fromRdf({ ${shorthandProperty("dataFactory", dataFactoryVariable)}, resource }))`;
  }

  valueToRdf({
    mutateGraphVariable,
    resourceSetVariable,
    propertyValueVariable,
  }: Type.ValueToRdfParameters): string {
    return `${this.moduleQualifiedName}.toRdf(${propertyValueVariable}, { mutateGraph: ${mutateGraphVariable}, resourceSet: ${resourceSetVariable} }).identifier`;
  }

  protected ensureAtMostOneSuperObjectType() {
    if (this.parentObjectTypes.length > 1) {
      throw new RangeError(
        `object type '${this.astName}' has multiple super object types`,
      );
    }
  }
}
