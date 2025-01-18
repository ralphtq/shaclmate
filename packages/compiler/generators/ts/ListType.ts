import type { NamedNode } from "@rdfjs/types";
import { rdf } from "@tpluscode/rdf-ns-builders";
import { Maybe } from "purify-ts";
import type { MintingStrategy } from "../../enums/index.js";
import { Import } from "./Import.js";
import { Type } from "./Type.js";

export class ListType extends Type {
  readonly itemType: Type;
  readonly kind = "ListType";
  override readonly mutable: boolean;
  private readonly identifierNodeKind: "BlankNode" | "NamedNode";
  private readonly mintingStrategy: MintingStrategy;
  private readonly toRdfTypes: readonly NamedNode[];

  constructor({
    identifierNodeKind,
    itemType,
    mintingStrategy,
    mutable,
    toRdfTypes,
    ...superParameters
  }: {
    identifierNodeKind: ListType["identifierNodeKind"];
    itemType: Type;
    mintingStrategy: Maybe<MintingStrategy>;
    mutable: boolean;
    toRdfTypes: readonly NamedNode[];
  } & ConstructorParameters<typeof Type>[0]) {
    super(superParameters);
    this.identifierNodeKind = identifierNodeKind;
    this.itemType = itemType;
    this.mintingStrategy = mintingStrategy.orDefault("sha256");
    this.mutable = mutable;
    this.toRdfTypes = toRdfTypes;
  }

  override get conversions(): readonly Type.Conversion[] {
    return [
      {
        conversionExpression: (value) => value,
        sourceTypeCheckExpression: (value) => `Array.isArray(${value})`,
        sourceTypeName: this.name,
      },
    ];
  }

  override get discriminatorProperty(): Maybe<Type.DiscriminatorProperty> {
    return Maybe.empty();
  }

  override get equalsFunction(): string {
    return `((left, right) => purifyHelpers.Arrays.equals(left, right, ${this.itemType.equalsFunction}))`;
  }

  override get jsonName(): string {
    return `readonly (${this.itemType.jsonName})[]`;
  }

  override get name(): string {
    return `${this.mutable ? "" : "readonly "}${this.itemType.name}[]`;
  }

  override get useImports(): readonly Import[] {
    const imports: Import[] = this.itemType.useImports.concat();
    if (this.identifierNodeKind === "NamedNode") {
      imports.push(Import.SHA256);
    }
    return imports;
  }

  override fromJsonExpression({
    variables,
  }: Parameters<Type["fromJsonExpression"]>[0]): string {
    return `${variables.value}.map(_item => (${this.itemType.fromJsonExpression({ variables: { value: "_item" } })}))`;
  }

  override fromRdfExpression({
    variables,
  }: Parameters<Type["fromRdfExpression"]>[0]): string {
    const chain: string[] = [variables.resourceValues];
    chain.push("head()");
    chain.push("chain(value => value.toList())");
    chain.push(
      `map(values => values.flatMap(_value => ${this.itemType.fromRdfExpression({ variables: { ...variables, resourceValues: "_value.toValues()" } })}.toMaybe().toList()))`,
    );
    return chain.join(".");
  }

  override hashStatements({
    depth,
    variables,
  }: Parameters<Type["hashStatements"]>[0]): readonly string[] {
    return [
      `for (const _element${depth} of ${variables.value}) { ${this.itemType.hashStatements({ depth: depth + 1, variables: { ...variables, value: `_element${depth}` } }).join("\n")} }`,
    ];
  }

  override jsonUiSchemaElement(
    parameters: Parameters<Type["jsonUiSchemaElement"]>[0],
  ): ReturnType<Type["jsonUiSchemaElement"]> {
    return this.itemType.jsonUiSchemaElement(parameters);
  }

  override jsonZodSchema(
    parameters: Parameters<Type["jsonZodSchema"]>[0],
  ): ReturnType<Type["jsonZodSchema"]> {
    return `${this.itemType.jsonZodSchema(parameters)}.array()`;
  }

  override propertyChainSparqlGraphPatternExpression({
    variables,
  }: Parameters<
    Type["propertyChainSparqlGraphPatternExpression"]
  >[0]): Maybe<Type.SparqlGraphPatternsExpression> {
    return Maybe.of(
      new Type.SparqlGraphPatternsExpression(
        `new sparqlBuilder.RdfListGraphPatterns({ ${this.itemType
          .propertyChainSparqlGraphPatternExpression({
            variables: {
              subject: "_itemVariable",
            },
          })
          .map(
            (itemSparqlGraphPatternsExpression) =>
              `itemGraphPatterns: (_itemVariable) => ${itemSparqlGraphPatternsExpression.toSparqlGraphPatternsExpression()}, `,
          )
          .orDefault("")} rdfList: ${variables.subject} })`,
      ),
    );
  }

  override sparqlConstructTemplateTriples(
    _parameters: Parameters<Type["sparqlConstructTemplateTriples"]>[0],
  ): readonly string[] {
    return [];
  }

  override sparqlWherePatterns(
    _parameters: Parameters<Type["sparqlWherePatterns"]>[0],
  ): readonly string[] {
    return [];
  }

  override toJsonExpression({
    variables,
  }: Parameters<Type["toJsonExpression"]>[0]): string {
    let expression = variables.value;
    const itemFromJsonExpression = this.itemType.fromJsonExpression({
      variables: { value: "_item" },
    });
    if (itemFromJsonExpression !== "_item") {
      expression = `${expression}.map(_item => (${itemFromJsonExpression}))`;
    }

    return `${variables.value}.map(_item => (${this.itemType.toJsonExpression({ variables: { value: "_item" } })}))`;
  }

  override toRdfExpression({
    variables,
  }: Parameters<Type["toRdfExpression"]>[0]): string {
    let listIdentifier: string;
    let mutableResourceTypeName: string;
    let resourceSetMethodName: string;
    let subListIdentifier: string;
    switch (this.identifierNodeKind) {
      case "BlankNode": {
        listIdentifier = subListIdentifier = "dataFactory.blankNode()";
        mutableResourceTypeName = "rdfjsResource.MutableResource";
        resourceSetMethodName = "mutableResource";
        break;
      }
      case "NamedNode": {
        switch (this.mintingStrategy) {
          case "sha256":
            listIdentifier = `dataFactory.namedNode(\`urn:shaclmate:list:\${${variables.value}.reduce(
        (_hasher, _item) => {
          ${this.itemType.hashStatements({ depth: 0, variables: { hasher: "_hasher", value: "_item" } }).join("\n")}
          return _hasher;
        },
        sha256.create(),
      )}\`)`;
            break;
          case "uuidv4":
            listIdentifier =
              "dataFactory.namedNode(`urn:shaclmate:list:${uuid.v4()}`)";
            break;
        }
        mutableResourceTypeName =
          "rdfjsResource.MutableResource<rdfjs.NamedNode>";
        resourceSetMethodName = "mutableNamedResource";
        subListIdentifier =
          "dataFactory.namedNode(`${listResource.identifier.value}:${itemIndex}`)";
        break;
      }
    }

    return `${variables.value}.reduce(({ currentSubListResource, listResource }, item, itemIndex, list) => {
    if (itemIndex === 0) {
      currentSubListResource = listResource;
    } else {
      const newSubListResource = ${variables.resourceSet}.${resourceSetMethodName}({
        identifier: ${subListIdentifier},
        mutateGraph: ${variables.mutateGraph},
      });
      currentSubListResource!.add(dataFactory.namedNode("${rdf.rest.value}"), newSubListResource.identifier);
      currentSubListResource = newSubListResource;
    }
    
    ${this.toRdfTypes.map((rdfType) => `currentSubListResource.add(dataFactory.namedNode("${rdf.type.value}"), dataFactory.namedNode("${rdfType.value}"))`).join("\n")}
        
    currentSubListResource.add(dataFactory.namedNode("${rdf.first.value}"), ${this.itemType.toRdfExpression({ variables: { mutateGraph: variables.mutateGraph, predicate: `dataFactory.namedNode("${rdf.first.value}")`, resource: "currentSubListResource", resourceSet: variables.resourceSet, value: "item" } })});

    if (itemIndex + 1 === list.length) {
      currentSubListResource.add(dataFactory.namedNode("${rdf.rest.value}"), dataFactory.namedNode("${rdf.nil.value}"));
    }
    
    return { currentSubListResource, listResource };
  },
  {
    currentSubListResource: null,
    listResource: resourceSet.${resourceSetMethodName}({
      identifier: ${listIdentifier},
      mutateGraph: ${variables.mutateGraph}
    }),
  } as {
    currentSubListResource: ${mutableResourceTypeName} | null;
    listResource: ${mutableResourceTypeName};
  },
).listResource.identifier`;
  }
}
