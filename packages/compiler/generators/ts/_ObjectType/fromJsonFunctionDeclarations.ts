import { type FunctionDeclarationStructure, StructureKind } from "ts-morph";
import type { ObjectType } from "../ObjectType.js";

const variables = {
  jsonObject: "_jsonObject",
};

export function fromJsonFunctionDeclarations(
  this: ObjectType,
): readonly FunctionDeclarationStructure[] {
  if (!this.features.has("fromJson")) {
    return [];
  }

  if (this.extern) {
    return [];
  }

  const initializers: string[] = [];
  const propertyReturnTypeSignatures: string[] = [];
  const propertiesFromJsonFunctionParameter: string[] = [];
  const propertiesFromJsonFunctionReturnType: string[] = [];
  const propertiesFromJsonFunctionStatements: string[] = [];

  if (this.ownProperties.length > 0) {
    propertiesFromJsonFunctionParameter.push(
      `{ ${this.ownProperties
        .map((property) => {
          const propertySignature = property.jsonPropertySignature;
          return `readonly "${propertySignature.name}": ${propertySignature.type}`;
        })
        .join("; ")} }`,
    );
  }

  this.parentObjectTypes.forEach((parentObjectType, parentObjectTypeI) => {
    propertiesFromJsonFunctionParameter.push(
      `Parameters<typeof ${parentObjectType.name}.propertiesFromJson>[0]`,
    );
    propertiesFromJsonFunctionStatements.push(
      `const _super${parentObjectTypeI} = ${parentObjectType.name}.propertiesFromJson(${variables.jsonObject});`,
    );
    initializers.push(`..._super${parentObjectTypeI}`);
    propertiesFromJsonFunctionReturnType.push(
      `ReturnType<typeof ${parentObjectType.name}.propertiesFromJson>`,
    );
  });

  for (const property of this.properties) {
    const propertyFromJsonStatements = property.fromJsonStatements({
      variables,
    });
    if (propertyFromJsonStatements.length > 0) {
      propertiesFromJsonFunctionStatements.push(...propertyFromJsonStatements);
      initializers.push(property.name);
      propertyReturnTypeSignatures.push(
        `${property.name}: ${property.type.name};`,
      );
    }
  }
  propertiesFromJsonFunctionStatements.push(
    `return { ${initializers.join(", ")} }`,
  );
  if (propertyReturnTypeSignatures.length > 0) {
    propertiesFromJsonFunctionReturnType.splice(
      0,
      0,
      `{ ${propertyReturnTypeSignatures.join(" ")} }`,
    );
  }

  const fromJsonFunctionDeclarations: FunctionDeclarationStructure[] = [];

  fromJsonFunctionDeclarations.push({
    isExported: true,
    kind: StructureKind.Function,
    name: "propertiesFromJson",
    parameters: [
      {
        name: variables.jsonObject,
        type:
          propertiesFromJsonFunctionParameter.length > 0
            ? propertiesFromJsonFunctionParameter.join(" & ")
            : "object",
      },
    ],
    returnType: propertiesFromJsonFunctionReturnType.join(" & "),
    statements: propertiesFromJsonFunctionStatements,
  });

  if (!this.abstract) {
    let fromJsonStatements: string[];
    switch (this.declarationType) {
      case "class":
        fromJsonStatements = [
          `return new ${this.name}(${this.name}.propertiesFromJson(${variables.jsonObject}));`,
        ];
        break;
      case "interface":
        fromJsonStatements = [
          `return ${this.name}.propertiesFromJson(${variables.jsonObject});`,
        ];
        break;
    }

    fromJsonFunctionDeclarations.push({
      isExported: true,
      kind: StructureKind.Function,
      name: "fromJson",
      parameters: [
        {
          name: variables.jsonObject,
          type: `Parameters<typeof ${this.name}.propertiesFromJson>[0]`,
        },
      ],
      returnType: this.name,
      statements: fromJsonStatements,
    });
  }

  return fromJsonFunctionDeclarations;
}
