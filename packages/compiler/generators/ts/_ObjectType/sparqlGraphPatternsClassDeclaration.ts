import { rdf } from "@tpluscode/rdf-ns-builders";
import { Maybe } from "purify-ts";
import { type ClassDeclarationStructure, StructureKind } from "ts-morph";
import { logger } from "../../../logger.js";
import type { ObjectType } from "../ObjectType.js";

const ignoreRdfTypeVariable = "ignoreRdfType";
const optionsVariable = "_options";
const subjectVariable = "subject";

export function sparqlGraphPatternsClassDeclaration(
  this: ObjectType,
): Maybe<ClassDeclarationStructure> {
  if (!this.features.has("sparql-graph-patterns")) {
    return Maybe.empty();
  }

  if (this.extern) {
    return Maybe.empty();
  }

  if (this.parentObjectTypes.length > 1) {
    logger.warn(
      "object type %s has multiple super object types, can't use with SPARQL graph patterns",
      this.name,
    );
    return Maybe.empty();
  }

  const constructorStatements: string[] = [];
  let extends_ = "sparqlBuilder.ResourceGraphPatterns";
  if (this.parentObjectTypes.length > 0) {
    constructorStatements.push(
      `super(${subjectVariable}, { ignoreRdfType: true });`,
    );
    extends_ = `${this.parentObjectTypes[0].name}.SparqlGraphPatterns`;
  } else {
    constructorStatements.push(`super(${subjectVariable});`);
  }

  const addRdfTypeGraphPatternStatements: string[] = [];
  this.fromRdfType.ifJust((fromRdfType) => {
    addRdfTypeGraphPatternStatements.push(
      `this.add(...new sparqlBuilder.RdfTypeGraphPatterns(this.subject, ${this.rdfjsTermExpression(fromRdfType)}));`,
    );
  });
  for (const toRdfType of this.toRdfTypes) {
    if (
      !this.fromRdfType.isJust() ||
      !this.fromRdfType.unsafeCoerce().equals(toRdfType)
    ) {
      addRdfTypeGraphPatternStatements.push(
        `this.add(sparqlBuilder.GraphPattern.basic(this.subject, ${this.rdfjsTermExpression(rdf.type)}, ${this.rdfjsTermExpression(toRdfType)}));`,
      );
    }
  }
  if (addRdfTypeGraphPatternStatements.length > 0) {
    constructorStatements.push(
      `if (!${optionsVariable}?.${ignoreRdfTypeVariable}) { ${addRdfTypeGraphPatternStatements.join(" ")} }`,
    );
  }

  for (const property of this.properties) {
    property
      .sparqlGraphPatternExpression()
      .ifJust((sparqlGraphPattern) =>
        constructorStatements.push(`this.add(${sparqlGraphPattern});`),
      );
  }

  return Maybe.of({
    ctors: [
      {
        parameters: [
          {
            name: subjectVariable,
            type: "sparqlBuilder.ResourceGraphPatterns.SubjectParameter",
          },
          {
            hasQuestionToken: true,
            name: optionsVariable,
            type: `{ ${ignoreRdfTypeVariable}?: boolean }`,
          },
        ],
        statements: constructorStatements,
      },
    ],
    extends: extends_,
    isExported: true,
    kind: StructureKind.Class,
    name: "SparqlGraphPatterns",
  });
}
