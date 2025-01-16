import { Maybe } from "purify-ts";
import {
  StructureKind,
  VariableDeclarationKind,
  type VariableStatementStructure,
} from "ts-morph";
import type { ObjectType } from "../ObjectType.js";

export function jsonZodSchemaVariableStatement(
  this: ObjectType,
): Maybe<VariableStatementStructure> {
  if (!this.features.has("fromJson")) {
    return Maybe.empty();
  }

  if (this.extern) {
    return Maybe.empty();
  }

  const variables = { zod: "zod" };
  const mergeZodObjectSchemas: string[] = [];
  for (const parentObjectType of this.parentObjectTypes) {
    mergeZodObjectSchemas.push(`${parentObjectType.jsonZodSchema()}`);
  }
  if (this.properties.length > 0) {
    mergeZodObjectSchemas.push(
      `${variables.zod}.object({ ${this.properties
        .map((property) => property.jsonZodSchema({ variables }))
        .map(({ key, schema }) => `"${key}": ${schema}`)
        .join(",")} })`,
    );
  }

  return Maybe.of({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        initializer:
          mergeZodObjectSchemas.length > 0
            ? mergeZodObjectSchemas.reduce((merged, zodObjectSchema) => {
                if (merged.length === 0) {
                  return zodObjectSchema;
                }
                return `${merged}.merge(${zodObjectSchema})`;
              }, "")
            : `${variables.zod}.object()`,
        name: this.jsonZodSchemaVariableName,
      },
    ],
    isExported: true,
    kind: StructureKind.VariableStatement,
  });
}
