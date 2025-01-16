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

  return Maybe.of({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        initializer: `{ ${this.properties
          .map((property) =>
            property.jsonZodSchema({ variables: { zod: "zod" } }),
          )
          .map(({ key, schema }) => `"${key}": ${schema}`)
          .join(",")} }`,
        name: "jsonZodSchema",
      },
    ],
    kind: StructureKind.VariableStatement,
  });
}
