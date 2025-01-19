import { type FunctionDeclarationStructure, StructureKind } from "ts-morph";
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

  const variables = { subject: "subject", variablePrefix: "variablePrefix" };
  return [
    {
      kind: StructureKind.Function,
      name: "sparqlWherePatterns",
      parameters: [
        {
          name: "{ subject, variablePrefix: variablePrefixParameter }",
          type: "{ subject: rdfjs.Variable, variablePrefix?: string }",
        },
      ],
      statements: [
        "const variablePrefix = variablePrefixParameter ?? subject.value;",
        `return [${[
          ...this.parentObjectTypes.map(
            (parentObjectType) =>
              `${parentObjectType.name}.sparqlWherePatterns({ subject, variablePrefix })`,
          ),
          this.ownProperties.flatMap((property) =>
            property.sparqlWherePatterns({ variables }),
          ),
        ].join(", ")}];`,
      ],
    },
  ];
}
