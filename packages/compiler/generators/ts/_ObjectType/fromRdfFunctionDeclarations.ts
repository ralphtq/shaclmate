import { type FunctionDeclarationStructure, StructureKind } from "ts-morph";
import type { ObjectType } from "../ObjectType.js";

const variables = {
  context: "_context",
  ignoreRdfType: "_ignoreRdfType",
  languageIn: "_languageIn",
  resource: "_resource",
};

export function fromRdfFunctionDeclarations(
  this: ObjectType,
): readonly FunctionDeclarationStructure[] {
  if (!this.features.has("fromRdf")) {
    return [];
  }

  if (this.extern) {
    return [];
  }

  const initializers: string[] = [];
  const propertySignatures: string[] = [];
  const interfaceFromRdfFunctionReturnType: string[] = [];
  const interfaceFromRdfFunctionStatements: string[] = [];

  this.parentObjectTypes.forEach((parentObjectType, parentObjectTypeI) => {
    interfaceFromRdfFunctionStatements.push(
      `const _super${parentObjectTypeI}Either = ${parentObjectType.name}.interfaceFromRdf({ ...${variables.context}, ignoreRdfType: true, languageIn: ${variables.languageIn}, resource: ${variables.resource} });`,
      `if (_super${parentObjectTypeI}Either.isLeft()) { return _super${parentObjectTypeI}Either; }`,
      `const _super${parentObjectTypeI} = _super${parentObjectTypeI}Either.unsafeCoerce()`,
    );
    initializers.push(`..._super${parentObjectTypeI}`);
    interfaceFromRdfFunctionReturnType.push(
      `purifyHelpers.Eithers.UnwrapR<ReturnType<typeof ${parentObjectType.name}.interfaceFromRdf>>`,
    );
  });

  this.fromRdfType.ifJust((rdfType) => {
    interfaceFromRdfFunctionStatements.push(
      `if (!${variables.ignoreRdfType} && !${variables.resource}.isInstanceOf(${this.rdfjsTermExpression(rdfType)})) { return purify.Left(new rdfjsResource.Resource.ValueError({ focusResource: ${variables.resource}, message: \`\${rdfjsResource.Resource.Identifier.toString(${variables.resource}.identifier)} has unexpected RDF type\`, predicate: ${this.rdfjsTermExpression(rdfType)} })); }`,
    );
  });

  const propertyFromRdfVariables = {
    context: variables.context,
    languageIn: variables.languageIn,
    resource: variables.resource,
  };
  for (const property of this.properties) {
    const propertyFromRdfStatements = property.fromRdfStatements({
      variables: propertyFromRdfVariables,
    });
    if (propertyFromRdfStatements.length > 0) {
      interfaceFromRdfFunctionStatements.push(...propertyFromRdfStatements);
      initializers.push(property.name);
      propertySignatures.push(`${property.name}: ${property.type.name};`);
    }
  }
  interfaceFromRdfFunctionStatements.push(
    `return purify.Either.of({ ${initializers.join(", ")} })`,
  );
  if (propertySignatures.length > 0) {
    interfaceFromRdfFunctionReturnType.splice(
      0,
      0,
      `{ ${propertySignatures.join(" ")} }`,
    );
  }

  const fromRdfFunctionDeclarations: FunctionDeclarationStructure[] = [];

  fromRdfFunctionDeclarations.push({
    isExported: true,
    kind: StructureKind.Function,
    name: "interfaceFromRdf",
    parameters: [
      {
        name: `{ ignoreRdfType: ${variables.ignoreRdfType}, languageIn: ${variables.languageIn}, resource: ${variables.resource},\n// @ts-ignore\n...${variables.context} }`,
        type: `{ [_index: string]: any; ignoreRdfType?: boolean; languageIn?: readonly string[]; resource: ${this.rdfjsResourceType().name}; }`,
      },
    ],
    returnType: `purify.Either<rdfjsResource.Resource.ValueError, ${interfaceFromRdfFunctionReturnType.join(" & ")}>`,
    statements: interfaceFromRdfFunctionStatements,
  });

  if (this.declarationType === "class" && !this.abstract) {
    fromRdfFunctionDeclarations.push(
      {
        isExported: true,
        kind: StructureKind.Function,
        name: "classFromRdf",
        parameters: [
          {
            name: "parameters",
            type: `Parameters<typeof ${this.name}.interfaceFromRdf>[0]`,
          },
        ],
        returnType: `purify.Either<rdfjsResource.Resource.ValueError, ${this.name}>`,
        statements: [
          `return ${this.name}.interfaceFromRdf(parameters).map(_ => new ${this.name}(_));`,
        ],
      },
      {
        isExported: true,
        kind: StructureKind.Function,
        name: "fromRdf",
        parameters: [
          {
            name: "parameters",
            type: `Parameters<typeof ${this.name}.interfaceFromRdf>[0]`,
          },
        ],
        returnType: `ReturnType<typeof ${this.name}.classFromRdf>`,
        statements: [`return ${this.name}.classFromRdf(parameters);`],
      },
    );
  } else {
    fromRdfFunctionDeclarations.push({
      isExported: true,
      kind: StructureKind.Function,
      name: "fromRdf",
      parameters: [
        {
          name: "parameters",
          type: `Parameters<typeof ${this.name}.interfaceFromRdf>[0]`,
        },
      ],
      returnType: `ReturnType<typeof ${this.name}.interfaceFromRdf>`,
      statements: [`return ${this.name}.interfaceFromRdf(parameters);`],
    });
  }

  return fromRdfFunctionDeclarations;
}
