import { Maybe } from "purify-ts";
import { type FunctionDeclarationStructure, StructureKind } from "ts-morph";
import type { ObjectType } from "../ObjectType.js";

export function jsonUiSchemaFunctionDeclaration(
  this: ObjectType,
): Maybe<FunctionDeclarationStructure> {
  if (!this.features.has("jsonUiSchema")) {
    return Maybe.empty();
  }

  if (this.extern) {
    return Maybe.empty();
  }

  const variables = { scopePrefix: "scopePrefix" };
  const elements: string[] = this.parentObjectTypes
    .map(
      (parentObjectType) =>
        `${parentObjectType.name}.${parentObjectType.jsonUiSchemaFunctionName}({ scopePrefix })`,
    )
    .concat(
      this.ownProperties.flatMap((property) =>
        property.jsonUiSchemaElement({ variables }).toList(),
      ),
    );

  return Maybe.of({
    isExported: true,
    kind: StructureKind.Function,
    name: this.jsonUiSchemaFunctionName,
    parameters: [
      {
        hasQuestionToken: true,
        name: "parameters",
        type: "{ scopePrefix?: string }",
      },
    ],
    statements: [
      'const scopePrefix = parameters?.scopePrefix ?? "#";',
      `return { "type": "HorizontalLayout", "elements": [ ${elements.join(", ")} ] }`,
    ],
  });
}
