import type { FunctionDeclarationStructure } from "ts-morph";
import type { ObjectType } from "../ObjectType.js";

export function sparqlFunctionDeclarations(
  this: ObjectType,
): readonly FunctionDeclarationStructure[] {
  if (!this.features.has("sparql")) {
    return [];
  }

  if (this.extern) {
    return [];
  }

  const functionDeclarations: FunctionDeclarationStructure[] = [];

  return functionDeclarations;
}
