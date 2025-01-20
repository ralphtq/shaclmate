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

  const subjectDefault = camelCase(this.name);
  const variables = { subject: "subject", variablePrefix: "variablePrefix" };
  const rdfTypeVariable = `${this.dataFactoryVariable}.variable!(\`\${${variables.variablePrefix}}RdfType\`)`;
  return [
    {
      isExported: true,
      kind: StructureKind.Function,
      name: "sparqlConstructQuery",
      parameters: [
        {
          hasQuestionToken: true,
          name: "parameters",
          type: '{ ignoreRdfType?: boolean; prefixes?: { [prefix: string]: string }; subject?: sparqljs.Triple["subject"]; variablePrefix?: string; } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "template" | "type" | "where">',
        },
      ],
      returnType: "sparqljs.ConstructQuery",
      statements: [
        "const { ignoreRdfType, subject, variablePrefix, ...queryParameters } = parameters ?? {}",
        `return { ...queryParameters, prefixes: parameters?.prefixes ?? {}, queryType: "CONSTRUCT", template: ${this.name}.sparqlConstructTemplateTriples({ ignoreRdfType, subject }).concat(), type: "query", where: ${this.name}.sparqlWherePatterns({ ignoreRdfType, subject, variablePrefix }).concat() };`,
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
          type: '{ ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"]; variablePrefix?: string; } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "template" | "type" | "where"> & sparqljs.GeneratorOptions',
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
          hasQuestionToken: true,
          name: "parameters",
          type: '{ ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"], variablePrefix?: string }',
        },
      ],
      returnType: "readonly sparqljs.Triple[]",
      statements: [
        `const subject = parameters?.subject ?? ${this.dataFactoryVariable}.variable!("${subjectDefault}");`,
        `const variablePrefix = parameters?.variablePrefix ?? (subject.termType === "Variable" ? subject.value : "${subjectDefault}");`,
        `return [${[
          ...this.parentObjectTypes.map(
            (parentObjectType) =>
              `...${parentObjectType.name}.sparqlConstructTemplateTriples({ ignoreRdfType: true, subject, variablePrefix })`,
          ),
          ...(this.fromRdfType.isJust()
            ? [
                `...(parameters?.ignoreRdfType ? [] : [{ subject, predicate: ${this.rdfjsTermExpression(rdf.type)}, object: ${rdfTypeVariable} }])`,
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
          name: "parameters",
          type: '{ ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"], variablePrefix?: string }',
        },
      ],
      returnType: "readonly sparqljs.Pattern[]",
      statements: [
        `const subject = parameters?.subject ?? ${this.dataFactoryVariable}.variable!("${subjectDefault}");`,
        `const variablePrefix = parameters?.variablePrefix ?? (subject.termType === "Variable" ? subject.value : "${subjectDefault}");`,
        `return [${[
          ...this.parentObjectTypes.map(
            (parentObjectType) =>
              `...${parentObjectType.name}.sparqlWherePatterns({ ignoreRdfType: true, subject, variablePrefix })`,
          ),
          ...(this.fromRdfType.isJust()
            ? [
                `...(parameters?.ignoreRdfType ? [] : [{ triples: [{ subject, predicate: ${this.rdfjsTermExpression(rdf.type)}, object: ${this.rdfjsTermExpression(this.fromRdfType.unsafeCoerce())} }, { subject, predicate: ${this.rdfjsTermExpression(rdf.type)}, object: ${rdfTypeVariable} }], type: "bgp" as const }])`,
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
