import { type FunctionDeclarationStructure, StructureKind } from "ts-morph";
import type { ObjectType } from "../ObjectType.js";
import { hashFunctionOrMethodDeclarations } from "./hashFunctionOrMethodDeclarations.js";

export function hashFunctionDeclarations(
  this: ObjectType,
): readonly FunctionDeclarationStructure[] {
  if (this.declarationType !== "interface") {
    return [];
  }

  if (this.extern) {
    return [];
  }

  return hashFunctionOrMethodDeclarations
    .bind(this)()
    .map((hashFunctionOrMethodDeclaration) => ({
      ...hashFunctionOrMethodDeclaration,
      isExported: true,
      kind: StructureKind.Function,
      name: this.hashFunctionName,
    }));
}
