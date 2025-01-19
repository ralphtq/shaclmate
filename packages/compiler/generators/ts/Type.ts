import type { BlankNode, Literal, NamedNode, Variable } from "@rdfjs/types";
import { Maybe } from "purify-ts";
import type { Import } from "./Import.js";
import { rdfjsTermExpression } from "./_ObjectType/rdfjsTermExpression.js";
import { objectInitializer } from "./objectInitializer.js";

/**
 * Abstract base class for generating TypeScript expressions and statemenst in the TypeScript generator.
 *
 * Subclasses are used for both property types (c.f., property* methods) and node/object types.
 */
export abstract class Type {
  /**
   * Expressions that convert a source type or types to this type. It should include the type itself.
   */
  abstract readonly conversions: readonly Type.Conversion[];

  /**
   * A function (reference or declaration) that compares two property values of this type, returning a
   * purifyHelpers.Equatable.EqualsResult.
   */
  abstract readonly equalsFunction: string;

  /**
   * JSON-compatible returned by propertyToJsonExpression.
   */
  abstract readonly jsonName: string;
  /**
   * Is a value of this type mutable?
   */
  abstract readonly mutable: boolean;
  /**
   * Name of the type.
   */
  abstract readonly name: string;
  /**
   * Imports necessary to use this type.
   */
  abstract readonly useImports: readonly Import[];
  protected readonly dataFactoryVariable: string;

  constructor({
    dataFactoryVariable,
  }: {
    dataFactoryVariable: string;
  }) {
    this.dataFactoryVariable = dataFactoryVariable;
  }

  /**
   * A property that discriminates sub-types of this type e.g., termType on RDF/JS terms.
   */
  get discriminatorProperty(): Maybe<Type.DiscriminatorProperty> {
    return Maybe.empty();
  }

  /**
   * An expression that converts a JSON object in the same format as the propertyToJsonExpression to a value of this type.
   */
  abstract fromJsonExpression(parameters: {
    variables: {
      value: string;
    };
  }): string;

  /**
   * An expression that converts a rdfjsResource.Resource.Values to an Either of value/values
   * of this type for a property.
   */
  abstract fromRdfExpression(parameters: {
    variables: {
      context: string;
      languageIn: string;
      predicate: string;
      resource: string;
      resourceValues: string;
    };
  }): string;

  /**
   * Statements that use hasher.update to hash a property value of this type.
   */
  abstract hashStatements(parameters: {
    depth: number;
    variables: {
      hasher: string;
      value: string;
    };
  }): readonly string[];

  /**
   * Element object for a JSON Forms UI schema.
   */
  jsonUiSchemaElement(_parameters: {
    variables: { scopePrefix: string };
  }): Maybe<string> {
    return Maybe.empty();
  }

  /**
   * Zod schema for the JSON version of the type (the result of propertyToJson).
   */
  abstract jsonZodSchema(parameters: { variables: { zod: string } }): string;

  /**
   * An optional sparqlBuilder.GraphPattern expression that's chained to the object of another pattern, such as a list item.
   *
   * If the type is e.g., an RDF/JS term it won't have additional graph patterns beyond the basic (s, p, o), and this
   * method will return nothing.
   */
  propertyChainSparqlGraphPatternExpression(_: {
    variables: {
      subject: string;
    };
  }): Maybe<
    Type.SparqlGraphPatternExpression | Type.SparqlGraphPatternsExpression
  > {
    return Maybe.empty();
  }

  /**
   * An sparqlBuilder.GraphPattern expression for a property, typically building a basic graph pattern.
   */
  propertySparqlGraphPatternExpression({
    variables,
  }: {
    variables: {
      object: string;
      predicate: string;
      subject: string;
    };
  }): Type.SparqlGraphPatternExpression | Type.SparqlGraphPatternsExpression {
    let expression = `sparqlBuilder.GraphPattern.basic(${variables.subject}, ${variables.predicate}, ${variables.object})`;
    this.propertyChainSparqlGraphPatternExpression({
      variables: { subject: "_object" },
    }).ifJust((chainSparqlGraphPatternExpression) => {
      expression = `sparqlBuilder.GraphPattern.group(${expression}.chainObject(_object => ${chainSparqlGraphPatternExpression.toSparqlGraphPatternsExpression()}))`;
    });
    return new Type.SparqlGraphPatternExpression(expression);
  }

  /**
   * An array of SPARQL.js CONSTRUCT template triples for a value of this type, as strings (so they can incorporate runtime calls).
   *
   * This method is called in two contexts:
   * (1) By an ObjectType.Property. The property expects a basic graph pattern (subject, property path, property object). The property calls this method to get additional triples in which the propertyObject is the subject. For example, if the type is a nested object, it would include (propertyObject, nestedPredicate, nestedObject) triples.
   * (2) By another Type. For example, ListType calls this method to with the item variable as a subject in order to chain additional patterns on items.
   *
   * Term types with no additional properties should return an empty array.
   */
  sparqlConstructTemplateTriples({
    context,
    variables,
  }:
    | {
        context: "property";
        variables: {
          object: string;
          predicate: string;
          subject: string;
          variablePrefix: string;
        };
      }
    | {
        context: "type";
        variables: {
          subject: string;
          variablePrefix: string;
        };
      }): readonly string[] {
    switch (context) {
      case "property":
        return [
          objectInitializer({
            object: variables.object,
            predicate: variables.predicate,
            subject: variables.subject,
          }),
        ];
      case "type":
        return [];
    }
  }

  /**
   * An array of SPARQL.js where patterns for a value of this type, as strings (so they can incorporate runtime calls).
   *
   * See note in sparqlConstructTemplateTriples re: how this method is used.
   */
  sparqlWherePatterns({
    context,
    variables,
  }:
    | {
        context: "property";
        variables: {
          object: string;
          predicate: string;
          subject: string;
          variablePrefix: string;
        };
      }
    | {
        context: "type";
        variables: {
          subject: string;
          variablePrefix: string;
        };
      }): readonly string[] {
    switch (context) {
      case "property":
        return [
          objectInitializer({
            triples: `[${objectInitializer({
              object: variables.object,
              predicate: variables.predicate,
              subject: variables.subject,
            })}]`,
            type: '"bgp"',
          }),
        ];
      case "type":
        return [];
    }
  }

  /**
   * An expression that converts a value of this type to a JSON-LD compatible value. It can assume the presence
   * of the correct JSON-LD context.
   */
  abstract toJsonExpression(parameters: {
    variables: {
      value: string;
    };
  }): string;

  /**
   * An expression that converts a property value of this type to one that that can be .add'd to
   * an rdfjsResource.Resource.
   */
  abstract toRdfExpression(parameters: {
    variables: {
      predicate: string;
      mutateGraph: string;
      resource: string;
      resourceSet: string;
      value: string;
    };
  }): string;

  protected rdfjsTermExpression(
    rdfjsTerm:
      | Omit<BlankNode, "equals">
      | Omit<Literal, "equals">
      | Omit<NamedNode, "equals">
      | Omit<Variable, "equals">,
  ): string {
    return rdfjsTermExpression({
      dataFactoryVariable: this.dataFactoryVariable,
      rdfjsTerm,
    });
  }
}

export namespace Type {
  export interface Conversion {
    readonly conversionExpression: (value: string) => string;
    readonly sourceTypeCheckExpression: (value: string) => string;
    readonly sourceTypeName: string;
  }

  export interface DiscriminatorProperty {
    readonly name: string;
    readonly values: readonly string[];
  }

  export class SparqlGraphPatternExpression {
    constructor(private readonly value: string) {}

    toSparqlGraphPatternExpression() {
      return this;
    }

    toSparqlGraphPatternsExpression() {
      return new SparqlGraphPatternExpression(`[${this.value}]`);
    }

    toString() {
      return this.value;
    }
  }

  export class SparqlGraphPatternsExpression {
    constructor(private readonly value: string) {}

    toSparqlGraphPatternExpression() {
      return new SparqlGraphPatternExpression(
        `sparqlBuilder.GraphPattern.group(${this.value})`,
      );
    }

    toSparqlGraphPatternsExpression() {
      return this;
    }

    toString() {
      return this.value;
    }
  }
}
