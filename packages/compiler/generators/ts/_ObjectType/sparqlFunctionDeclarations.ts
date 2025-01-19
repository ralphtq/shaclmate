import { rdf } from "@tpluscode/rdf-ns-builders";
import { camelCase } from "change-case";
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
  const rdfTypeVariable = `${this.dataFactoryVariable}.variable(\`\${${variables.variablePrefix}}RdfType\`)`;
  return [
    {
      isExported: true,
      kind: StructureKind.Function,
      name: "sparqlConstructQuery",
      parameters: [
        {
          hasQuestionToken: true,
          name: "parameters",
          type: '{ prefixes?: { [prefix: string]: string }; subject: rdfjs.Variable } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "template" | "where">',
        },
      ],
      returnType: "sparqljs.ConstructQuery",
      statements: [
        `const subject = parameters?.subject ?? ${this.dataFactoryVariable}.variable("${camelCase(this.name)}");`,
        `return { ...parameters, prefixes: parameters?.prefixes ?? {}, queryType: "CONSTRUCT", template: ${this.name}.sparqlConstructTemplateTriples({ subject }).concat(), type: "query", where: ${this.name}.sparqlWherePatterns({ subject }).concat() };`,
      ],
    },
    {
      isExported: true,
      kind: StructureKind.Function,
      name: "sparqlConstructQueryString",
      parameters: [
        {
          hasQuestionToken: true,
          name: "parameters",
          type: '{ subject: rdfjs.Variable } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "template" | "where"> & sparqljs.GeneratorOptions',
        },
      ],
      returnType: "string",
      statements: [
        `return new sparqljs.Generator(parameters).stringify(${this.name}.sparqlConstructQuery(parameters));`,
      ],
    },
    {
      isExported: true,
      kind: StructureKind.Function,
      name: "sparqlConstructTemplateTriples",
      parameters: [
        {
          name: `{ ${this.fromRdfType.isJust() ? "ignoreRdfType, " : ""}subject, variablePrefix: variablePrefixParameter }`,
          type: "{ ignoreRdfType?: boolean; subject: rdfjs.Variable, variablePrefix?: string }",
        },
      ],
      returnType: "readonly sparqljs.Triple[]",
      statements: [
        "const variablePrefix = variablePrefixParameter ?? subject.value;",
        `return [${[
          ...this.parentObjectTypes.map(
            (parentObjectType) =>
              `...${parentObjectType.name}.sparqlConstructTemplateTriples({ ignoreRdfType: true, subject, variablePrefix })`,
          ),
          ...(this.fromRdfType.isJust()
            ? [
                `...(ignoreRdfType ? [] : [{ subject, predicate: ${this.rdfjsTermExpression(rdf.type)}, object: ${rdfTypeVariable} }])`,
              ]
            : []),
          this.ownProperties.flatMap((property) =>
            property.sparqlConstructTemplateTriples({ variables }),
          ),
        ].join(", ")}];`,
      ],
    },
    {
      isExported: true,
      kind: StructureKind.Function,
      name: "sparqlWherePatterns",
      parameters: [
        {
          name: `{ ${this.fromRdfType.isJust() ? "ignoreRdfType, " : ""}subject, variablePrefix: variablePrefixParameter }`,
          type: "{ ignoreRdfType?: boolean; subject: rdfjs.Variable, variablePrefix?: string }",
        },
      ],
      returnType: "readonly sparqljs.Pattern[]",
      statements: [
        "const variablePrefix = variablePrefixParameter ?? subject.value;",
        `return [${[
          ...this.parentObjectTypes.map(
            (parentObjectType) =>
              `...${parentObjectType.name}.sparqlWherePatterns({ ignoreRdfType: true, subject, variablePrefix })`,
          ),
          ...(this.fromRdfType.isJust()
            ? [
                `...(ignoreRdfType ? [] : [{ triples: [{ subject, predicate: ${this.rdfjsTermExpression(rdf.type)}, object: ${this.rdfjsTermExpression(this.fromRdfType.unsafeCoerce())} }, { subject, predicate: ${this.rdfjsTermExpression(rdf.type)}, object: ${rdfTypeVariable} }], type: "bgp" as const }])`,
              ]
            : []),
          this.ownProperties.flatMap((property) =>
            property.sparqlWherePatterns({ variables }),
          ),
        ].join(", ")}];`,
      ],
    },
  ];
}
