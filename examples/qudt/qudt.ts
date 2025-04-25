
> dev
> node --stack-size=4000 --stack-trace-limit=100 packages/cli/dist/cli.js generate examples/qudt/SCHEMA_QUDT_NoOWL_subset2.ttl

import { DataFactory as dataFactory } from "n3"
import type * as rdfjs from "@rdfjs/types";
import * as rdfLiteral from "rdf-literal";
import * as purify from "purify-ts";
import { z as zod } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import * as rdfjsResource from "rdfjs-resource";
import * as sparqljs from "sparqljs";
export type EqualsResult = purify.Either<EqualsResult.Unequal, true>;

export namespace EqualsResult {
    export const Equal: EqualsResult = purify.Either.of<Unequal, true>(true);

    export function fromBooleanEqualsResult(
      left: any,
      right: any,
      equalsResult: boolean | EqualsResult,
    ): EqualsResult {
      if (typeof equalsResult !== "boolean") {
        return equalsResult;
      }

      if (equalsResult) {
        return Equal;
      }
      return purify.Left({
        left,
        right,
        type: "BooleanEquals",
      });
    }

    export type Unequal =
      | {
          readonly left: {
            readonly array: readonly any[];
            readonly element: any;
            readonly elementIndex: number;
          };
          readonly right: {
            readonly array: readonly any[];
            readonly unequals: readonly Unequal[];
          };
          readonly type: "ArrayElement";
        }
      | {
          readonly left: readonly any[];
          readonly right: readonly any[];
          readonly type: "ArrayLength";
        }
      | {
          readonly left: any;
          readonly right: any;
          readonly type: "BooleanEquals";
        }
      | {
          readonly left: any;
          readonly right: any;
          readonly type: "LeftError";
        }
      | {
          readonly right: any;
          readonly type: "LeftNull";
        }
      | {
          readonly left: bigint | boolean | number | string;
          readonly right: bigint | boolean | number | string;
          readonly type: "Primitive";
        }
      | {
          readonly left: object;
          readonly right: object;
          readonly propertyName: string;
          readonly propertyValuesUnequal: Unequal;
          readonly type: "Property";
        }
      | {
          readonly left: any;
          readonly right: any;
          readonly type: "RightError";
        }
      | {
          readonly left: any;
          readonly type: "RightNull";
        };
}
/**
 * Compare two objects with equals(other: T): boolean methods and return an EqualsResult.
 */
export function booleanEquals<T extends { equals: (other: T) => boolean }>(
  left: T,
  right: T,
): EqualsResult {
  return EqualsResult.fromBooleanEqualsResult(
    left,
    right,
    left.equals(right),
  );
}
/**
 * Compare two values for strict equality (===), returning an EqualsResult rather than a boolean.
 */
export function strictEquals<T extends bigint | boolean | number | string>(
  left: T,
  right: T,
): EqualsResult {
  return EqualsResult.fromBooleanEqualsResult(left, right, left === right);
}
export function maybeEquals<T>(
  leftMaybe: purify.Maybe<T>,
  rightMaybe: purify.Maybe<T>,
  valueEquals: (left: T, right: T) => boolean | EqualsResult,
): EqualsResult {
  if (leftMaybe.isJust()) {
    if (rightMaybe.isJust()) {
      return EqualsResult.fromBooleanEqualsResult(
        leftMaybe,
        rightMaybe,
        valueEquals(leftMaybe.unsafeCoerce(), rightMaybe.unsafeCoerce()),
      );
    }
    return purify.Left({
      left: leftMaybe.unsafeCoerce(),
      type: "RightNull",
    });
  }

  if (rightMaybe.isJust()) {
    return purify.Left({
      right: rightMaybe.unsafeCoerce(),
      type: "LeftNull",
    });
  }

  return EqualsResult.Equal;
}
type UnwrapR<T> = T extends purify.Either<any, infer R> ? R : never
export function arrayEquals<T>(
  leftArray: readonly T[],
  rightArray: readonly T[],
  elementEquals: (left: T, right: T) => boolean | EqualsResult,
): EqualsResult {
  if (leftArray.length !== rightArray.length) {
    return purify.Left({
      left: leftArray,
      right: rightArray,
      type: "ArrayLength",
    });
  }

  for (
    let leftElementIndex = 0;
    leftElementIndex < leftArray.length;
    leftElementIndex++
  ) {
    const leftElement = leftArray[leftElementIndex];

    const rightUnequals: EqualsResult.Unequal[] = [];
    for (
      let rightElementIndex = 0;
      rightElementIndex < rightArray.length;
      rightElementIndex++
    ) {
      const rightElement = rightArray[rightElementIndex];

      const leftElementEqualsRightElement =
        EqualsResult.fromBooleanEqualsResult(
          leftElement,
          rightElement,
          elementEquals(leftElement, rightElement),
        );
      if (leftElementEqualsRightElement.isRight()) {
        break; // left element === right element, break out of the right iteration
      }
      rightUnequals.push(
        leftElementEqualsRightElement.extract() as EqualsResult.Unequal,
      );
    }

    if (rightUnequals.length === rightArray.length) {
      // All right elements were unequal to the left element
      return purify.Left({
        left: {
          array: leftArray,
          element: leftElement,
          elementIndex: leftElementIndex,
        },
        right: {
          array: rightArray,
          unequals: rightUnequals,
        },
        type: "ArrayElement",
      });
    }
    // Else there was a right element equal to the left element, continue to the next left element
  }

  return EqualsResult.Equal;
}
/**
 * Scalar Data Item
 */
export class Scalar_Data$W$Item {
    private _identifier: (rdfjs.BlankNode | rdfjs.NamedNode) | undefined;
    readonly type = "Scalar_Data$W$Item";
    readonly qudt_ScalarDataItem$j$datatype: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>;
    readonly qudt_ScalarDataItem$j$value: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>;

    constructor(parameters: { readonly identifier?: (rdfjs.BlankNode | rdfjs.NamedNode) | string, readonly qudt_ScalarDataItem$j$datatype?: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal) | Date | boolean | number | purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)> | string, readonly qudt_ScalarDataItem$j$value?: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal) | Date | boolean | number | purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)> | string }) {
        if (typeof parameters.identifier === "object") { this._identifier = parameters.identifier; } else if (typeof parameters.identifier === "string") { this._identifier = dataFactory.namedNode(parameters.identifier); } else if (typeof parameters.identifier === "undefined") { } else { this._identifier =( parameters.identifier) as never;
         }

        if (purify.Maybe.isMaybe(parameters.qudt_ScalarDataItem$j$datatype)) { this.qudt_ScalarDataItem$j$datatype = parameters.qudt_ScalarDataItem$j$datatype; } else if (typeof parameters.qudt_ScalarDataItem$j$datatype === "boolean") { this.qudt_ScalarDataItem$j$datatype = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_ScalarDataItem$j$datatype, { dataFactory })); } else if (typeof parameters.qudt_ScalarDataItem$j$datatype === "object" && parameters.qudt_ScalarDataItem$j$datatype instanceof Date) { this.qudt_ScalarDataItem$j$datatype = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_ScalarDataItem$j$datatype, { dataFactory })); } else if (typeof parameters.qudt_ScalarDataItem$j$datatype === "number") { this.qudt_ScalarDataItem$j$datatype = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_ScalarDataItem$j$datatype, { dataFactory })); } else if (typeof parameters.qudt_ScalarDataItem$j$datatype === "string") { this.qudt_ScalarDataItem$j$datatype = purify.Maybe.of(dataFactory.literal(parameters.qudt_ScalarDataItem$j$datatype)); } else if (typeof parameters.qudt_ScalarDataItem$j$datatype === "object") { this.qudt_ScalarDataItem$j$datatype = purify.Maybe.of(parameters.qudt_ScalarDataItem$j$datatype); } else if (typeof parameters.qudt_ScalarDataItem$j$datatype === "undefined") { this.qudt_ScalarDataItem$j$datatype = purify.Maybe.empty(); } else { this.qudt_ScalarDataItem$j$datatype =( parameters.qudt_ScalarDataItem$j$datatype) as never;
         }

        if (purify.Maybe.isMaybe(parameters.qudt_ScalarDataItem$j$value)) { this.qudt_ScalarDataItem$j$value = parameters.qudt_ScalarDataItem$j$value; } else if (typeof parameters.qudt_ScalarDataItem$j$value === "boolean") { this.qudt_ScalarDataItem$j$value = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_ScalarDataItem$j$value, { dataFactory })); } else if (typeof parameters.qudt_ScalarDataItem$j$value === "object" && parameters.qudt_ScalarDataItem$j$value instanceof Date) { this.qudt_ScalarDataItem$j$value = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_ScalarDataItem$j$value, { dataFactory })); } else if (typeof parameters.qudt_ScalarDataItem$j$value === "number") { this.qudt_ScalarDataItem$j$value = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_ScalarDataItem$j$value, { dataFactory })); } else if (typeof parameters.qudt_ScalarDataItem$j$value === "string") { this.qudt_ScalarDataItem$j$value = purify.Maybe.of(dataFactory.literal(parameters.qudt_ScalarDataItem$j$value)); } else if (typeof parameters.qudt_ScalarDataItem$j$value === "object") { this.qudt_ScalarDataItem$j$value = purify.Maybe.of(parameters.qudt_ScalarDataItem$j$value); } else if (typeof parameters.qudt_ScalarDataItem$j$value === "undefined") { this.qudt_ScalarDataItem$j$value = purify.Maybe.empty(); } else { this.qudt_ScalarDataItem$j$value =( parameters.qudt_ScalarDataItem$j$value) as never;
         }
    }

    get identifier(): (rdfjs.BlankNode | rdfjs.NamedNode) {
        if (typeof this._identifier === "undefined") { this._identifier = dataFactory.blankNode(); } return this._identifier;
    }

    equals(other: Scalar_Data$W$Item): EqualsResult {
        return (booleanEquals)(this.identifier, other.identifier).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "identifier", propertyValuesUnequal, type: "Property" as const })).chain(() => (strictEquals)(this.type, other.type).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "type", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => maybeEquals(left, right, booleanEquals)))(this.qudt_ScalarDataItem$j$datatype, other.qudt_ScalarDataItem$j$datatype).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_ScalarDataItem$j$datatype", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => maybeEquals(left, right, booleanEquals)))(this.qudt_ScalarDataItem$j$value, other.qudt_ScalarDataItem$j$value).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_ScalarDataItem$j$value", propertyValuesUnequal, type: "Property" as const })));
    }

    hash<HasherT extends { update: (message: string | number[] | ArrayBuffer | Uint8Array) => void; }>(_hasher: HasherT): HasherT {
        _hasher.update(this.identifier.value);
        _hasher.update(this.type);
        this.hashShaclProperties(_hasher);
        return _hasher;
    }

    protected hashShaclProperties<HasherT extends { update: (message: string | number[] | ArrayBuffer | Uint8Array) => void; }>(_hasher: HasherT): HasherT {
        this.qudt_ScalarDataItem$j$datatype.ifJust((_value0) => { _hasher.update(_value0.termType);
        _hasher.update(_value0.value); })
        this.qudt_ScalarDataItem$j$value.ifJust((_value0) => { _hasher.update(_value0.termType);
        _hasher.update(_value0.value); })
        return _hasher;
    }

    toJson(): { readonly "@id": string; readonly "type": "Scalar_Data$W$Item"; readonly "qudt_ScalarDataItem$j$datatype": ({ readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" }) | undefined; readonly "qudt_ScalarDataItem$j$value": ({ readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" }) | undefined } {
        return JSON.parse(JSON.stringify({ "@id": this.identifier.termType === "BlankNode" ? `_:${this.identifier.value}` : this.identifier.value,type: this.type,qudt_ScalarDataItem$j$datatype: this.qudt_ScalarDataItem$j$datatype.map(_item => ((_item.termType === "Literal") ? { "@language": _item.language.length > 0 ? _item.language : undefined, "@type": _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? _item.datatype.value : undefined, "@value": _item.value, termType: "Literal" as const } : (_item.termType === "NamedNode") ? { "@id": _item.value, termType: "NamedNode" as const } : { "@id": `_:${_item.value}`, termType: "BlankNode" as const })).extract(),qudt_ScalarDataItem$j$value: this.qudt_ScalarDataItem$j$value.map(_item => ((_item.termType === "Literal") ? { "@language": _item.language.length > 0 ? _item.language : undefined, "@type": _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? _item.datatype.value : undefined, "@value": _item.value, termType: "Literal" as const } : (_item.termType === "NamedNode") ? { "@id": _item.value, termType: "NamedNode" as const } : { "@id": `_:${_item.value}`, termType: "BlankNode" as const })).extract() } satisfies ReturnType<Scalar_Data$W$Item["toJson"]>));
    }

    toRdf({ ignoreRdfType, mutateGraph, resourceSet }: { ignoreRdfType?: boolean; mutateGraph?: rdfjsResource.MutableResource.MutateGraph, resourceSet: rdfjsResource.MutableResourceSet }): rdfjsResource.MutableResource {
        const _resource = resourceSet.mutableResource(this.identifier, { mutateGraph });
        if (!ignoreRdfType) { _resource.add(_resource.dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), _resource.dataFactory.namedNode("http://qudt.org/schema/qudt/ScalarDataItem")); }

        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/datatype"), this.qudt_ScalarDataItem$j$datatype);
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/value"), this.qudt_ScalarDataItem$j$value);
        return _resource;
    }

    toString(): string {
        return JSON.stringify(this.toJson());
    }
}

export namespace Scalar_Data$W$Item {
    export function _propertiesFromJson(_json: unknown): purify.Either<zod.ZodError, { identifier: (rdfjs.BlankNode | rdfjs.NamedNode); qudt_ScalarDataItem$j$datatype: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>; qudt_ScalarDataItem$j$value: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>; }> {
        const _jsonSafeParseResult = jsonZodSchema().safeParse(_json);
        if (!_jsonSafeParseResult.success) { return purify.Left(_jsonSafeParseResult.error); }

        const _jsonObject = _jsonSafeParseResult.data;
        const identifier = (_jsonObject["@id"].startsWith("_:") ? dataFactory.blankNode(_jsonObject["@id"].substring(2)) : dataFactory.namedNode(_jsonObject["@id"]));
        const qudt_ScalarDataItem$j$datatype = purify.Maybe.fromNullable(_jsonObject["qudt_ScalarDataItem$j$datatype"]).map(_item => (((_item.termType === "Literal") ? (dataFactory.literal(_item["@value"], typeof _item["@language"] !== "undefined" ? _item["@language"] : (typeof _item["@type"] !== "undefined" ? dataFactory.namedNode(_item["@type"]) : undefined))) : (((_item.termType === "NamedNode") ? (dataFactory.namedNode(_item["@id"])) : (dataFactory.blankNode(_item["@id"].substring(2))))))));
        const qudt_ScalarDataItem$j$value = purify.Maybe.fromNullable(_jsonObject["qudt_ScalarDataItem$j$value"]).map(_item => (((_item.termType === "Literal") ? (dataFactory.literal(_item["@value"], typeof _item["@language"] !== "undefined" ? _item["@language"] : (typeof _item["@type"] !== "undefined" ? dataFactory.namedNode(_item["@type"]) : undefined))) : (((_item.termType === "NamedNode") ? (dataFactory.namedNode(_item["@id"])) : (dataFactory.blankNode(_item["@id"].substring(2))))))));
        return purify.Either.of({ identifier, qudt_ScalarDataItem$j$datatype, qudt_ScalarDataItem$j$value })
    }

    export function fromJson(json: unknown): purify.Either<zod.ZodError, Scalar_Data$W$Item> {
        return Scalar_Data$W$Item._propertiesFromJson(json).map(properties => new Scalar_Data$W$Item(properties));
    }

    export function _propertiesFromRdf({ ignoreRdfType: _ignoreRdfType, languageIn: _languageIn, resource: _resource,
        // @ts-ignore
        ..._context }: { [_index: string]: any; ignoreRdfType?: boolean; languageIn?: readonly string[]; resource: rdfjsResource.Resource; }): purify.Either<rdfjsResource.Resource.ValueError, { identifier: (rdfjs.BlankNode | rdfjs.NamedNode); qudt_ScalarDataItem$j$datatype: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>; qudt_ScalarDataItem$j$value: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>; }> {
        if (!_ignoreRdfType && !_resource.isInstanceOf(dataFactory.namedNode("http://qudt.org/schema/qudt/ScalarDataItem"))) { return purify.Left(new rdfjsResource.Resource.ValueError({ focusResource: _resource, message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type (expected http://qudt.org/schema/qudt/ScalarDataItem)`, predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/ScalarDataItem") })); }

        const identifier = _resource.identifier
        const _qudt_ScalarDataItem$j$datatypeEither: purify.Either<rdfjsResource.Resource.ValueError, purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>> = purify.Either.of(_resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/datatype"), { unique: true }).head().chain(_value => purify.Either.of(_value.toTerm())).toMaybe());
        if (_qudt_ScalarDataItem$j$datatypeEither.isLeft()) { return _qudt_ScalarDataItem$j$datatypeEither; }

        const qudt_ScalarDataItem$j$datatype = _qudt_ScalarDataItem$j$datatypeEither.unsafeCoerce();
        const _qudt_ScalarDataItem$j$valueEither: purify.Either<rdfjsResource.Resource.ValueError, purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>> = purify.Either.of(_resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/value"), { unique: true }).head().chain(_value => purify.Either.of(_value.toTerm())).toMaybe());
        if (_qudt_ScalarDataItem$j$valueEither.isLeft()) { return _qudt_ScalarDataItem$j$valueEither; }

        const qudt_ScalarDataItem$j$value = _qudt_ScalarDataItem$j$valueEither.unsafeCoerce();
        return purify.Either.of({ identifier, qudt_ScalarDataItem$j$datatype, qudt_ScalarDataItem$j$value })
    }

    export function fromRdf(parameters: Parameters<typeof Scalar_Data$W$Item._propertiesFromRdf>[0]): purify.Either<rdfjsResource.Resource.ValueError, Scalar_Data$W$Item> {
        return Scalar_Data$W$Item._propertiesFromRdf(parameters).map(properties => new Scalar_Data$W$Item(properties));
    }

    export let fromRdfType: rdfjs.NamedNode<string> = dataFactory.namedNode("http://qudt.org/schema/qudt/ScalarDataItem");

    export function jsonSchema() {
        return zodToJsonSchema(jsonZodSchema());
    }

    export function jsonUiSchema(parameters?: { scopePrefix?: string }) {
        const scopePrefix = parameters?.scopePrefix ?? "#";
        return { "elements": [ { label: "Identifier", scope: `${scopePrefix}/properties/@id`, type: "Control" }, { rule: { condition: { schema: { const: "Scalar_Data$W$Item" }, scope: `${scopePrefix}/properties/type` }, effect: "HIDE" }, scope: `${scopePrefix}/properties/type`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_ScalarDataItem$j$datatype`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_ScalarDataItem$j$value`, type: "Control" } ], label: "Scalar Data Item", type: "Group" }
    }

    export function jsonZodSchema() {
        return zod.object({ "@id": zod.string().min(1),"type": zod.literal("Scalar_Data$W$Item"),"qudt_ScalarDataItem$j$datatype": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]).optional(),"qudt_ScalarDataItem$j$value": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]).optional() });
    }

    export function sparqlConstructQuery(parameters?: { ignoreRdfType?: boolean; prefixes?: { [prefix: string]: string }; subject?: sparqljs.Triple["subject"]; } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "type">): sparqljs.ConstructQuery {
        const { ignoreRdfType, subject, ...queryParameters } = parameters ?? {}

        return { ...queryParameters, prefixes: parameters?.prefixes ?? {}, queryType: "CONSTRUCT", template: (queryParameters.template ?? []).concat(Scalar_Data$W$Item.sparqlConstructTemplateTriples({ ignoreRdfType, subject })), type: "query", where: (queryParameters.where ?? []).concat(Scalar_Data$W$Item.sparqlWherePatterns({ ignoreRdfType, subject })) };
    }

    export function sparqlConstructQueryString(parameters?: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"]; variablePrefix?: string; } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "type"> & sparqljs.GeneratorOptions): string {
        return new sparqljs.Generator(parameters).stringify(Scalar_Data$W$Item.sparqlConstructQuery(parameters));
    }

    export function sparqlConstructTemplateTriples(parameters?: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"], variablePrefix?: string }): readonly sparqljs.Triple[] {
        const subject = parameters?.subject ?? dataFactory.variable!("scalarDataWItem");
        const variablePrefix = parameters?.variablePrefix ?? (subject.termType === "Variable" ? subject.value : "scalarDataWItem");
        return [...(parameters?.ignoreRdfType ? [] : [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.variable!(`${variablePrefix}RdfType`) }]), { object: dataFactory.variable!(`${variablePrefix}QudtScalarDataItemJDatatype`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/datatype"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtScalarDataItemJValue`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/value"), subject }];
    }

    export function sparqlWherePatterns(parameters: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"], variablePrefix?: string }): readonly sparqljs.Pattern[] {
        const subject = parameters?.subject ?? dataFactory.variable!("scalarDataWItem");
        const variablePrefix = parameters?.variablePrefix ?? (subject.termType === "Variable" ? subject.value : "scalarDataWItem");
        return [...(parameters?.ignoreRdfType ? [] : [{ triples: [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.namedNode("http://qudt.org/schema/qudt/ScalarDataItem") }], type: "bgp" as const }, { triples: [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.variable!(`${variablePrefix}RdfType`) }], type: "bgp" as const }]), { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtScalarDataItemJDatatype`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/datatype"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtScalarDataItemJValue`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/value"), subject }], type: "bgp" }], type: "optional" }];
    }
}
/**
 * Quantity Kind Dimension Vector
 */
export class Quantity_Kind$W$Dimension$W$Vector {
    private _identifier: (rdfjs.BlankNode | rdfjs.NamedNode) | undefined;
    readonly type = "Quantity_Kind$W$Dimension$W$Vector";
    readonly qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal);
    readonly qudt_QuantityKindDimensionVector$j$dimensionExponentForElectricCurrent: number;
    readonly qudt_QuantityKindDimensionVector$j$dimensionExponentForLength: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal);
    readonly qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal);
    readonly qudt_QuantityKindDimensionVector$j$dimensionExponentForMass: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal);
    readonly qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal);
    readonly qudt_QuantityKindDimensionVector$j$dimensionExponentForTime: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal);
    readonly qudt_QuantityKindDimensionVector$j$dimensionlessExponent: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal);
    readonly qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKind: readonly (Quantity_Kind$W$$e$abstract$f$)[];
    readonly qudt_QuantityKindDimensionVector$j$latexDefinition: purify.Maybe<string>;
    readonly qudt_QuantityKindDimensionVector$j$latexSymbol: readonly (string)[];

    constructor(parameters: { readonly identifier?: (rdfjs.BlankNode | rdfjs.NamedNode) | string, readonly qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal) | Date | boolean | number | string, readonly qudt_QuantityKindDimensionVector$j$dimensionExponentForElectricCurrent: number, readonly qudt_QuantityKindDimensionVector$j$dimensionExponentForLength: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal) | Date | boolean | number | string, readonly qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal) | Date | boolean | number | string, readonly qudt_QuantityKindDimensionVector$j$dimensionExponentForMass: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal) | Date | boolean | number | string, readonly qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal) | Date | boolean | number | string, readonly qudt_QuantityKindDimensionVector$j$dimensionExponentForTime: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal) | Date | boolean | number | string, readonly qudt_QuantityKindDimensionVector$j$dimensionlessExponent: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal) | Date | boolean | number | string, readonly qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKind?: readonly (Quantity_Kind$W$$e$abstract$f$)[], readonly qudt_QuantityKindDimensionVector$j$latexDefinition?: purify.Maybe<string> | string, readonly qudt_QuantityKindDimensionVector$j$latexSymbol?: readonly (string)[] }) {
        if (typeof parameters.identifier === "object") { this._identifier = parameters.identifier; } else if (typeof parameters.identifier === "string") { this._identifier = dataFactory.namedNode(parameters.identifier); } else if (typeof parameters.identifier === "undefined") { } else { this._identifier =( parameters.identifier) as never;
         }

        if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance === "boolean") { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance = rdfLiteral.toRdf(parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance, { dataFactory }); } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance === "object" && parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance instanceof Date) { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance = rdfLiteral.toRdf(parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance, { dataFactory }); } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance === "number") { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance = rdfLiteral.toRdf(parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance, { dataFactory }); } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance === "string") { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance = dataFactory.literal(parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance); } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance === "object") { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance = parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance; } else { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance =( parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance) as never;
         }

        this.qudt_QuantityKindDimensionVector$j$dimensionExponentForElectricCurrent = parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForElectricCurrent;
        if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength === "boolean") { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength = rdfLiteral.toRdf(parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength, { dataFactory }); } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength === "object" && parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength instanceof Date) { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength = rdfLiteral.toRdf(parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength, { dataFactory }); } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength === "number") { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength = rdfLiteral.toRdf(parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength, { dataFactory }); } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength === "string") { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength = dataFactory.literal(parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength); } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength === "object") { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength = parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength; } else { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength =( parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength) as never;
         }

        if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity === "boolean") { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity = rdfLiteral.toRdf(parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity, { dataFactory }); } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity === "object" && parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity instanceof Date) { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity = rdfLiteral.toRdf(parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity, { dataFactory }); } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity === "number") { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity = rdfLiteral.toRdf(parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity, { dataFactory }); } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity === "string") { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity = dataFactory.literal(parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity); } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity === "object") { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity = parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity; } else { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity =( parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity) as never;
         }

        if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass === "boolean") { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass = rdfLiteral.toRdf(parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass, { dataFactory }); } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass === "object" && parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass instanceof Date) { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass = rdfLiteral.toRdf(parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass, { dataFactory }); } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass === "number") { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass = rdfLiteral.toRdf(parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass, { dataFactory }); } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass === "string") { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass = dataFactory.literal(parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass); } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass === "object") { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass = parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass; } else { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass =( parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass) as never;
         }

        if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature === "boolean") { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature = rdfLiteral.toRdf(parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature, { dataFactory }); } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature === "object" && parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature instanceof Date) { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature = rdfLiteral.toRdf(parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature, { dataFactory }); } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature === "number") { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature = rdfLiteral.toRdf(parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature, { dataFactory }); } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature === "string") { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature = dataFactory.literal(parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature); } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature === "object") { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature = parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature; } else { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature =( parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature) as never;
         }

        if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime === "boolean") { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime = rdfLiteral.toRdf(parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime, { dataFactory }); } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime === "object" && parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime instanceof Date) { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime = rdfLiteral.toRdf(parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime, { dataFactory }); } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime === "number") { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime = rdfLiteral.toRdf(parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime, { dataFactory }); } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime === "string") { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime = dataFactory.literal(parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime); } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime === "object") { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime = parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime; } else { this.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime =( parameters.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime) as never;
         }

        if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionlessExponent === "boolean") { this.qudt_QuantityKindDimensionVector$j$dimensionlessExponent = rdfLiteral.toRdf(parameters.qudt_QuantityKindDimensionVector$j$dimensionlessExponent, { dataFactory }); } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionlessExponent === "object" && parameters.qudt_QuantityKindDimensionVector$j$dimensionlessExponent instanceof Date) { this.qudt_QuantityKindDimensionVector$j$dimensionlessExponent = rdfLiteral.toRdf(parameters.qudt_QuantityKindDimensionVector$j$dimensionlessExponent, { dataFactory }); } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionlessExponent === "number") { this.qudt_QuantityKindDimensionVector$j$dimensionlessExponent = rdfLiteral.toRdf(parameters.qudt_QuantityKindDimensionVector$j$dimensionlessExponent, { dataFactory }); } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionlessExponent === "string") { this.qudt_QuantityKindDimensionVector$j$dimensionlessExponent = dataFactory.literal(parameters.qudt_QuantityKindDimensionVector$j$dimensionlessExponent); } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$dimensionlessExponent === "object") { this.qudt_QuantityKindDimensionVector$j$dimensionlessExponent = parameters.qudt_QuantityKindDimensionVector$j$dimensionlessExponent; } else { this.qudt_QuantityKindDimensionVector$j$dimensionlessExponent =( parameters.qudt_QuantityKindDimensionVector$j$dimensionlessExponent) as never;
         }

        if (typeof parameters.qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKind === "undefined") { this.qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKind = []; } else if (Array.isArray(parameters.qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKind)) { this.qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKind = parameters.qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKind; } else { this.qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKind =( parameters.qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKind) as never;
         }

        if (purify.Maybe.isMaybe(parameters.qudt_QuantityKindDimensionVector$j$latexDefinition)) { this.qudt_QuantityKindDimensionVector$j$latexDefinition = parameters.qudt_QuantityKindDimensionVector$j$latexDefinition; } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$latexDefinition === "string") { this.qudt_QuantityKindDimensionVector$j$latexDefinition = purify.Maybe.of(parameters.qudt_QuantityKindDimensionVector$j$latexDefinition); } else if (typeof parameters.qudt_QuantityKindDimensionVector$j$latexDefinition === "undefined") { this.qudt_QuantityKindDimensionVector$j$latexDefinition = purify.Maybe.empty(); } else { this.qudt_QuantityKindDimensionVector$j$latexDefinition =( parameters.qudt_QuantityKindDimensionVector$j$latexDefinition) as never;
         }

        if (typeof parameters.qudt_QuantityKindDimensionVector$j$latexSymbol === "undefined") { this.qudt_QuantityKindDimensionVector$j$latexSymbol = []; } else if (Array.isArray(parameters.qudt_QuantityKindDimensionVector$j$latexSymbol)) { this.qudt_QuantityKindDimensionVector$j$latexSymbol = parameters.qudt_QuantityKindDimensionVector$j$latexSymbol; } else { this.qudt_QuantityKindDimensionVector$j$latexSymbol =( parameters.qudt_QuantityKindDimensionVector$j$latexSymbol) as never;
         }
    }

    get identifier(): (rdfjs.BlankNode | rdfjs.NamedNode) {
        if (typeof this._identifier === "undefined") { this._identifier = dataFactory.blankNode(); } return this._identifier;
    }

    equals(other: Quantity_Kind$W$Dimension$W$Vector): EqualsResult {
        return (booleanEquals)(this.identifier, other.identifier).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "identifier", propertyValuesUnequal, type: "Property" as const })).chain(() => (strictEquals)(this.type, other.type).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "type", propertyValuesUnequal, type: "Property" as const }))).chain(() => (booleanEquals)(this.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance, other.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance", propertyValuesUnequal, type: "Property" as const }))).chain(() => (strictEquals)(this.qudt_QuantityKindDimensionVector$j$dimensionExponentForElectricCurrent, other.qudt_QuantityKindDimensionVector$j$dimensionExponentForElectricCurrent).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKindDimensionVector$j$dimensionExponentForElectricCurrent", propertyValuesUnequal, type: "Property" as const }))).chain(() => (booleanEquals)(this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength, other.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKindDimensionVector$j$dimensionExponentForLength", propertyValuesUnequal, type: "Property" as const }))).chain(() => (booleanEquals)(this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity, other.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity", propertyValuesUnequal, type: "Property" as const }))).chain(() => (booleanEquals)(this.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass, other.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKindDimensionVector$j$dimensionExponentForMass", propertyValuesUnequal, type: "Property" as const }))).chain(() => (booleanEquals)(this.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature, other.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature", propertyValuesUnequal, type: "Property" as const }))).chain(() => (booleanEquals)(this.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime, other.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKindDimensionVector$j$dimensionExponentForTime", propertyValuesUnequal, type: "Property" as const }))).chain(() => (booleanEquals)(this.qudt_QuantityKindDimensionVector$j$dimensionlessExponent, other.qudt_QuantityKindDimensionVector$j$dimensionlessExponent).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKindDimensionVector$j$dimensionlessExponent", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, ((left, right) => left.equals(right)))))(this.qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKind, other.qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKind).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKind", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => maybeEquals(left, right, strictEquals)))(this.qudt_QuantityKindDimensionVector$j$latexDefinition, other.qudt_QuantityKindDimensionVector$j$latexDefinition).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKindDimensionVector$j$latexDefinition", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, strictEquals)))(this.qudt_QuantityKindDimensionVector$j$latexSymbol, other.qudt_QuantityKindDimensionVector$j$latexSymbol).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKindDimensionVector$j$latexSymbol", propertyValuesUnequal, type: "Property" as const })));
    }

    hash<HasherT extends { update: (message: string | number[] | ArrayBuffer | Uint8Array) => void; }>(_hasher: HasherT): HasherT {
        _hasher.update(this.identifier.value);
        _hasher.update(this.type);
        this.hashShaclProperties(_hasher);
        return _hasher;
    }

    protected hashShaclProperties<HasherT extends { update: (message: string | number[] | ArrayBuffer | Uint8Array) => void; }>(_hasher: HasherT): HasherT {
        _hasher.update(this.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance.termType);
        _hasher.update(this.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance.value);
        _hasher.update(this.qudt_QuantityKindDimensionVector$j$dimensionExponentForElectricCurrent.toString());
        _hasher.update(this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength.termType);
        _hasher.update(this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength.value);
        _hasher.update(this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity.termType);
        _hasher.update(this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity.value);
        _hasher.update(this.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass.termType);
        _hasher.update(this.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass.value);
        _hasher.update(this.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature.termType);
        _hasher.update(this.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature.value);
        _hasher.update(this.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime.termType);
        _hasher.update(this.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime.value);
        _hasher.update(this.qudt_QuantityKindDimensionVector$j$dimensionlessExponent.termType);
        _hasher.update(this.qudt_QuantityKindDimensionVector$j$dimensionlessExponent.value);
        for (const _item0 of this.qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKind) { _item0.hash(_hasher); }

        this.qudt_QuantityKindDimensionVector$j$latexDefinition.ifJust((_value0) => { _hasher.update(_value0); })
        for (const _item0 of this.qudt_QuantityKindDimensionVector$j$latexSymbol) { _hasher.update(_item0); }

        return _hasher;
    }

    toJson(): { readonly "@id": string; readonly "type": "Quantity_Kind$W$Dimension$W$Vector"; readonly "qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance": { readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" }; readonly "qudt_QuantityKindDimensionVector$j$dimensionExponentForElectricCurrent": number; readonly "qudt_QuantityKindDimensionVector$j$dimensionExponentForLength": { readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" }; readonly "qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity": { readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" }; readonly "qudt_QuantityKindDimensionVector$j$dimensionExponentForMass": { readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" }; readonly "qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature": { readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" }; readonly "qudt_QuantityKindDimensionVector$j$dimensionExponentForTime": { readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" }; readonly "qudt_QuantityKindDimensionVector$j$dimensionlessExponent": { readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" }; readonly "qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKind": readonly (ReturnType<Quantity_Kind$W$$e$abstract$f$["toJson"]>)[]; readonly "qudt_QuantityKindDimensionVector$j$latexDefinition": (string) | undefined; readonly "qudt_QuantityKindDimensionVector$j$latexSymbol": readonly (string)[] } {
        return JSON.parse(JSON.stringify({ "@id": this.identifier.termType === "BlankNode" ? `_:${this.identifier.value}` : this.identifier.value,type: this.type,qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance: (this.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance.termType === "Literal") ? { "@language": this.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance.language.length > 0 ? this.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance.language : undefined, "@type": this.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? this.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance.datatype.value : undefined, "@value": this.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance.value, termType: "Literal" as const } : (this.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance.termType === "NamedNode") ? { "@id": this.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance.value, termType: "NamedNode" as const } : { "@id": `_:${this.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance.value}`, termType: "BlankNode" as const },qudt_QuantityKindDimensionVector$j$dimensionExponentForElectricCurrent: this.qudt_QuantityKindDimensionVector$j$dimensionExponentForElectricCurrent,qudt_QuantityKindDimensionVector$j$dimensionExponentForLength: (this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength.termType === "Literal") ? { "@language": this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength.language.length > 0 ? this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength.language : undefined, "@type": this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength.datatype.value : undefined, "@value": this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength.value, termType: "Literal" as const } : (this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength.termType === "NamedNode") ? { "@id": this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength.value, termType: "NamedNode" as const } : { "@id": `_:${this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength.value}`, termType: "BlankNode" as const },qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity: (this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity.termType === "Literal") ? { "@language": this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity.language.length > 0 ? this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity.language : undefined, "@type": this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity.datatype.value : undefined, "@value": this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity.value, termType: "Literal" as const } : (this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity.termType === "NamedNode") ? { "@id": this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity.value, termType: "NamedNode" as const } : { "@id": `_:${this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity.value}`, termType: "BlankNode" as const },qudt_QuantityKindDimensionVector$j$dimensionExponentForMass: (this.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass.termType === "Literal") ? { "@language": this.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass.language.length > 0 ? this.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass.language : undefined, "@type": this.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? this.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass.datatype.value : undefined, "@value": this.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass.value, termType: "Literal" as const } : (this.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass.termType === "NamedNode") ? { "@id": this.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass.value, termType: "NamedNode" as const } : { "@id": `_:${this.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass.value}`, termType: "BlankNode" as const },qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature: (this.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature.termType === "Literal") ? { "@language": this.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature.language.length > 0 ? this.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature.language : undefined, "@type": this.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? this.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature.datatype.value : undefined, "@value": this.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature.value, termType: "Literal" as const } : (this.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature.termType === "NamedNode") ? { "@id": this.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature.value, termType: "NamedNode" as const } : { "@id": `_:${this.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature.value}`, termType: "BlankNode" as const },qudt_QuantityKindDimensionVector$j$dimensionExponentForTime: (this.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime.termType === "Literal") ? { "@language": this.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime.language.length > 0 ? this.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime.language : undefined, "@type": this.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? this.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime.datatype.value : undefined, "@value": this.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime.value, termType: "Literal" as const } : (this.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime.termType === "NamedNode") ? { "@id": this.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime.value, termType: "NamedNode" as const } : { "@id": `_:${this.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime.value}`, termType: "BlankNode" as const },qudt_QuantityKindDimensionVector$j$dimensionlessExponent: (this.qudt_QuantityKindDimensionVector$j$dimensionlessExponent.termType === "Literal") ? { "@language": this.qudt_QuantityKindDimensionVector$j$dimensionlessExponent.language.length > 0 ? this.qudt_QuantityKindDimensionVector$j$dimensionlessExponent.language : undefined, "@type": this.qudt_QuantityKindDimensionVector$j$dimensionlessExponent.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? this.qudt_QuantityKindDimensionVector$j$dimensionlessExponent.datatype.value : undefined, "@value": this.qudt_QuantityKindDimensionVector$j$dimensionlessExponent.value, termType: "Literal" as const } : (this.qudt_QuantityKindDimensionVector$j$dimensionlessExponent.termType === "NamedNode") ? { "@id": this.qudt_QuantityKindDimensionVector$j$dimensionlessExponent.value, termType: "NamedNode" as const } : { "@id": `_:${this.qudt_QuantityKindDimensionVector$j$dimensionlessExponent.value}`, termType: "BlankNode" as const },qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKind: this.qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKind.map(_item => (_item.toJson())),qudt_QuantityKindDimensionVector$j$latexDefinition: this.qudt_QuantityKindDimensionVector$j$latexDefinition.map(_item => (_item)).extract(),qudt_QuantityKindDimensionVector$j$latexSymbol: this.qudt_QuantityKindDimensionVector$j$latexSymbol.map(_item => (_item)) } satisfies ReturnType<Quantity_Kind$W$Dimension$W$Vector["toJson"]>));
    }

    toRdf({ ignoreRdfType, mutateGraph, resourceSet }: { ignoreRdfType?: boolean; mutateGraph?: rdfjsResource.MutableResource.MutateGraph, resourceSet: rdfjsResource.MutableResourceSet }): rdfjsResource.MutableResource {
        const _resource = resourceSet.mutableResource(this.identifier, { mutateGraph });
        if (!ignoreRdfType) { _resource.add(_resource.dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), _resource.dataFactory.namedNode("http://qudt.org/schema/qudt/QuantityKindDimensionVector")); }

        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionExponentForAmountOfSubstance"), this.qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance);
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionExponentForElectricCurrent"), this.qudt_QuantityKindDimensionVector$j$dimensionExponentForElectricCurrent);
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionExponentForLength"), this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLength);
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionExponentForLuminousIntensity"), this.qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity);
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionExponentForMass"), this.qudt_QuantityKindDimensionVector$j$dimensionExponentForMass);
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionExponentForThermodynamicTemperature"), this.qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature);
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionExponentForTime"), this.qudt_QuantityKindDimensionVector$j$dimensionExponentForTime);
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionlessExponent"), this.qudt_QuantityKindDimensionVector$j$dimensionlessExponent);
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/hasReferenceQuantityKind"), this.qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKind.map((_item) => _item.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet })));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/latexDefinition"), this.qudt_QuantityKindDimensionVector$j$latexDefinition);
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/latexSymbol"), this.qudt_QuantityKindDimensionVector$j$latexSymbol.map((_item) => _item));
        return _resource;
    }

    toString(): string {
        return JSON.stringify(this.toJson());
    }
}

export namespace Quantity_Kind$W$Dimension$W$Vector {
    export function _propertiesFromJson(_json: unknown): purify.Either<zod.ZodError, { identifier: (rdfjs.BlankNode | rdfjs.NamedNode); qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal); qudt_QuantityKindDimensionVector$j$dimensionExponentForElectricCurrent: number; qudt_QuantityKindDimensionVector$j$dimensionExponentForLength: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal); qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal); qudt_QuantityKindDimensionVector$j$dimensionExponentForMass: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal); qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal); qudt_QuantityKindDimensionVector$j$dimensionExponentForTime: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal); qudt_QuantityKindDimensionVector$j$dimensionlessExponent: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal); qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKind: readonly (Quantity_Kind$W$$e$abstract$f$)[]; qudt_QuantityKindDimensionVector$j$latexDefinition: purify.Maybe<string>; qudt_QuantityKindDimensionVector$j$latexSymbol: readonly (string)[]; }> {
        const _jsonSafeParseResult = jsonZodSchema().safeParse(_json);
        if (!_jsonSafeParseResult.success) { return purify.Left(_jsonSafeParseResult.error); }

        const _jsonObject = _jsonSafeParseResult.data;
        const identifier = (_jsonObject["@id"].startsWith("_:") ? dataFactory.blankNode(_jsonObject["@id"].substring(2)) : dataFactory.namedNode(_jsonObject["@id"]));
        const qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance = ((_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance"].termType === "Literal") ? (dataFactory.literal(_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance"]["@value"], typeof _jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance"]["@language"] !== "undefined" ? _jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance"]["@language"] : (typeof _jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance"]["@type"] !== "undefined" ? dataFactory.namedNode(_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance"]["@type"]) : undefined))) : (((_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance"].termType === "NamedNode") ? (dataFactory.namedNode(_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance"]["@id"])) : (dataFactory.blankNode(_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance"]["@id"].substring(2))))));
        const qudt_QuantityKindDimensionVector$j$dimensionExponentForElectricCurrent = _jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForElectricCurrent"];
        const qudt_QuantityKindDimensionVector$j$dimensionExponentForLength = ((_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForLength"].termType === "Literal") ? (dataFactory.literal(_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForLength"]["@value"], typeof _jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForLength"]["@language"] !== "undefined" ? _jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForLength"]["@language"] : (typeof _jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForLength"]["@type"] !== "undefined" ? dataFactory.namedNode(_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForLength"]["@type"]) : undefined))) : (((_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForLength"].termType === "NamedNode") ? (dataFactory.namedNode(_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForLength"]["@id"])) : (dataFactory.blankNode(_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForLength"]["@id"].substring(2))))));
        const qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity = ((_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity"].termType === "Literal") ? (dataFactory.literal(_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity"]["@value"], typeof _jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity"]["@language"] !== "undefined" ? _jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity"]["@language"] : (typeof _jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity"]["@type"] !== "undefined" ? dataFactory.namedNode(_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity"]["@type"]) : undefined))) : (((_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity"].termType === "NamedNode") ? (dataFactory.namedNode(_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity"]["@id"])) : (dataFactory.blankNode(_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity"]["@id"].substring(2))))));
        const qudt_QuantityKindDimensionVector$j$dimensionExponentForMass = ((_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForMass"].termType === "Literal") ? (dataFactory.literal(_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForMass"]["@value"], typeof _jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForMass"]["@language"] !== "undefined" ? _jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForMass"]["@language"] : (typeof _jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForMass"]["@type"] !== "undefined" ? dataFactory.namedNode(_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForMass"]["@type"]) : undefined))) : (((_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForMass"].termType === "NamedNode") ? (dataFactory.namedNode(_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForMass"]["@id"])) : (dataFactory.blankNode(_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForMass"]["@id"].substring(2))))));
        const qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature = ((_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature"].termType === "Literal") ? (dataFactory.literal(_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature"]["@value"], typeof _jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature"]["@language"] !== "undefined" ? _jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature"]["@language"] : (typeof _jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature"]["@type"] !== "undefined" ? dataFactory.namedNode(_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature"]["@type"]) : undefined))) : (((_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature"].termType === "NamedNode") ? (dataFactory.namedNode(_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature"]["@id"])) : (dataFactory.blankNode(_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature"]["@id"].substring(2))))));
        const qudt_QuantityKindDimensionVector$j$dimensionExponentForTime = ((_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForTime"].termType === "Literal") ? (dataFactory.literal(_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForTime"]["@value"], typeof _jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForTime"]["@language"] !== "undefined" ? _jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForTime"]["@language"] : (typeof _jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForTime"]["@type"] !== "undefined" ? dataFactory.namedNode(_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForTime"]["@type"]) : undefined))) : (((_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForTime"].termType === "NamedNode") ? (dataFactory.namedNode(_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForTime"]["@id"])) : (dataFactory.blankNode(_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionExponentForTime"]["@id"].substring(2))))));
        const qudt_QuantityKindDimensionVector$j$dimensionlessExponent = ((_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionlessExponent"].termType === "Literal") ? (dataFactory.literal(_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionlessExponent"]["@value"], typeof _jsonObject["qudt_QuantityKindDimensionVector$j$dimensionlessExponent"]["@language"] !== "undefined" ? _jsonObject["qudt_QuantityKindDimensionVector$j$dimensionlessExponent"]["@language"] : (typeof _jsonObject["qudt_QuantityKindDimensionVector$j$dimensionlessExponent"]["@type"] !== "undefined" ? dataFactory.namedNode(_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionlessExponent"]["@type"]) : undefined))) : (((_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionlessExponent"].termType === "NamedNode") ? (dataFactory.namedNode(_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionlessExponent"]["@id"])) : (dataFactory.blankNode(_jsonObject["qudt_QuantityKindDimensionVector$j$dimensionlessExponent"]["@id"].substring(2))))));
        const qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKind = _jsonObject["qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKind"].map(_item => (Quantity_Kind$W$$e$abstract$f$.fromJson(_item).unsafeCoerce()));
        const qudt_QuantityKindDimensionVector$j$latexDefinition = purify.Maybe.fromNullable(_jsonObject["qudt_QuantityKindDimensionVector$j$latexDefinition"]);
        const qudt_QuantityKindDimensionVector$j$latexSymbol = _jsonObject["qudt_QuantityKindDimensionVector$j$latexSymbol"];
        return purify.Either.of({ identifier, qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance, qudt_QuantityKindDimensionVector$j$dimensionExponentForElectricCurrent, qudt_QuantityKindDimensionVector$j$dimensionExponentForLength, qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity, qudt_QuantityKindDimensionVector$j$dimensionExponentForMass, qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature, qudt_QuantityKindDimensionVector$j$dimensionExponentForTime, qudt_QuantityKindDimensionVector$j$dimensionlessExponent, qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKind, qudt_QuantityKindDimensionVector$j$latexDefinition, qudt_QuantityKindDimensionVector$j$latexSymbol })
    }

    export function fromJson(json: unknown): purify.Either<zod.ZodError, Quantity_Kind$W$Dimension$W$Vector> {
        return Quantity_Kind$W$Dimension$W$Vector._propertiesFromJson(json).map(properties => new Quantity_Kind$W$Dimension$W$Vector(properties));
    }

    export function _propertiesFromRdf({ ignoreRdfType: _ignoreRdfType, languageIn: _languageIn, resource: _resource,
        // @ts-ignore
        ..._context }: { [_index: string]: any; ignoreRdfType?: boolean; languageIn?: readonly string[]; resource: rdfjsResource.Resource; }): purify.Either<rdfjsResource.Resource.ValueError, { identifier: (rdfjs.BlankNode | rdfjs.NamedNode); qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal); qudt_QuantityKindDimensionVector$j$dimensionExponentForElectricCurrent: number; qudt_QuantityKindDimensionVector$j$dimensionExponentForLength: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal); qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal); qudt_QuantityKindDimensionVector$j$dimensionExponentForMass: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal); qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal); qudt_QuantityKindDimensionVector$j$dimensionExponentForTime: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal); qudt_QuantityKindDimensionVector$j$dimensionlessExponent: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal); qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKind: readonly (Quantity_Kind$W$$e$abstract$f$)[]; qudt_QuantityKindDimensionVector$j$latexDefinition: purify.Maybe<string>; qudt_QuantityKindDimensionVector$j$latexSymbol: readonly (string)[]; }> {
        if (!_ignoreRdfType && !_resource.isInstanceOf(dataFactory.namedNode("http://qudt.org/schema/qudt/QuantityKindDimensionVector"))) { return purify.Left(new rdfjsResource.Resource.ValueError({ focusResource: _resource, message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type (expected http://qudt.org/schema/qudt/QuantityKindDimensionVector)`, predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/QuantityKindDimensionVector") })); }

        const identifier = _resource.identifier
        const _qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstanceEither: purify.Either<rdfjsResource.Resource.ValueError, (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)> = _resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionExponentForAmountOfSubstance"), { unique: true }).head().chain(_value => purify.Either.of(_value.toTerm()));
        if (_qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstanceEither.isLeft()) { return _qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstanceEither; }

        const qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance = _qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstanceEither.unsafeCoerce();
        const _qudt_QuantityKindDimensionVector$j$dimensionExponentForElectricCurrentEither: purify.Either<rdfjsResource.Resource.ValueError, number> = _resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionExponentForElectricCurrent"), { unique: true }).head().chain(_value => _value.toNumber());
        if (_qudt_QuantityKindDimensionVector$j$dimensionExponentForElectricCurrentEither.isLeft()) { return _qudt_QuantityKindDimensionVector$j$dimensionExponentForElectricCurrentEither; }

        const qudt_QuantityKindDimensionVector$j$dimensionExponentForElectricCurrent = _qudt_QuantityKindDimensionVector$j$dimensionExponentForElectricCurrentEither.unsafeCoerce();
        const _qudt_QuantityKindDimensionVector$j$dimensionExponentForLengthEither: purify.Either<rdfjsResource.Resource.ValueError, (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)> = _resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionExponentForLength"), { unique: true }).head().chain(_value => purify.Either.of(_value.toTerm()));
        if (_qudt_QuantityKindDimensionVector$j$dimensionExponentForLengthEither.isLeft()) { return _qudt_QuantityKindDimensionVector$j$dimensionExponentForLengthEither; }

        const qudt_QuantityKindDimensionVector$j$dimensionExponentForLength = _qudt_QuantityKindDimensionVector$j$dimensionExponentForLengthEither.unsafeCoerce();
        const _qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensityEither: purify.Either<rdfjsResource.Resource.ValueError, (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)> = _resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionExponentForLuminousIntensity"), { unique: true }).head().chain(_value => purify.Either.of(_value.toTerm()));
        if (_qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensityEither.isLeft()) { return _qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensityEither; }

        const qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity = _qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensityEither.unsafeCoerce();
        const _qudt_QuantityKindDimensionVector$j$dimensionExponentForMassEither: purify.Either<rdfjsResource.Resource.ValueError, (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)> = _resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionExponentForMass"), { unique: true }).head().chain(_value => purify.Either.of(_value.toTerm()));
        if (_qudt_QuantityKindDimensionVector$j$dimensionExponentForMassEither.isLeft()) { return _qudt_QuantityKindDimensionVector$j$dimensionExponentForMassEither; }

        const qudt_QuantityKindDimensionVector$j$dimensionExponentForMass = _qudt_QuantityKindDimensionVector$j$dimensionExponentForMassEither.unsafeCoerce();
        const _qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperatureEither: purify.Either<rdfjsResource.Resource.ValueError, (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)> = _resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionExponentForThermodynamicTemperature"), { unique: true }).head().chain(_value => purify.Either.of(_value.toTerm()));
        if (_qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperatureEither.isLeft()) { return _qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperatureEither; }

        const qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature = _qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperatureEither.unsafeCoerce();
        const _qudt_QuantityKindDimensionVector$j$dimensionExponentForTimeEither: purify.Either<rdfjsResource.Resource.ValueError, (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)> = _resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionExponentForTime"), { unique: true }).head().chain(_value => purify.Either.of(_value.toTerm()));
        if (_qudt_QuantityKindDimensionVector$j$dimensionExponentForTimeEither.isLeft()) { return _qudt_QuantityKindDimensionVector$j$dimensionExponentForTimeEither; }

        const qudt_QuantityKindDimensionVector$j$dimensionExponentForTime = _qudt_QuantityKindDimensionVector$j$dimensionExponentForTimeEither.unsafeCoerce();
        const _qudt_QuantityKindDimensionVector$j$dimensionlessExponentEither: purify.Either<rdfjsResource.Resource.ValueError, (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)> = _resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionlessExponent"), { unique: true }).head().chain(_value => purify.Either.of(_value.toTerm()));
        if (_qudt_QuantityKindDimensionVector$j$dimensionlessExponentEither.isLeft()) { return _qudt_QuantityKindDimensionVector$j$dimensionlessExponentEither; }

        const qudt_QuantityKindDimensionVector$j$dimensionlessExponent = _qudt_QuantityKindDimensionVector$j$dimensionlessExponentEither.unsafeCoerce();
        const _qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKindEither: purify.Either<rdfjsResource.Resource.ValueError, readonly (Quantity_Kind$W$$e$abstract$f$)[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/hasReferenceQuantityKind"), { unique: true }).flatMap(_item => _item.toValues().head().chain(value => value.toResource()).chain(_resource => Quantity_Kind$W$$e$abstract$f$.fromRdf({ ..._context, ignoreRdfType: true, languageIn: _languageIn, resource: _resource })).toMaybe().toList())]);
        if (_qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKindEither.isLeft()) { return _qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKindEither; }

        const qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKind = _qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKindEither.unsafeCoerce();
        const _qudt_QuantityKindDimensionVector$j$latexDefinitionEither: purify.Either<rdfjsResource.Resource.ValueError, purify.Maybe<string>> = purify.Either.of(_resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/latexDefinition"), { unique: true }).head().chain(_value => _value.toString()).toMaybe());
        if (_qudt_QuantityKindDimensionVector$j$latexDefinitionEither.isLeft()) { return _qudt_QuantityKindDimensionVector$j$latexDefinitionEither; }

        const qudt_QuantityKindDimensionVector$j$latexDefinition = _qudt_QuantityKindDimensionVector$j$latexDefinitionEither.unsafeCoerce();
        const _qudt_QuantityKindDimensionVector$j$latexSymbolEither: purify.Either<rdfjsResource.Resource.ValueError, readonly (string)[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/latexSymbol"), { unique: true }).flatMap(_item => _item.toValues().head().chain(_value => _value.toString()).toMaybe().toList())]);
        if (_qudt_QuantityKindDimensionVector$j$latexSymbolEither.isLeft()) { return _qudt_QuantityKindDimensionVector$j$latexSymbolEither; }

        const qudt_QuantityKindDimensionVector$j$latexSymbol = _qudt_QuantityKindDimensionVector$j$latexSymbolEither.unsafeCoerce();
        return purify.Either.of({ identifier, qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance, qudt_QuantityKindDimensionVector$j$dimensionExponentForElectricCurrent, qudt_QuantityKindDimensionVector$j$dimensionExponentForLength, qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity, qudt_QuantityKindDimensionVector$j$dimensionExponentForMass, qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature, qudt_QuantityKindDimensionVector$j$dimensionExponentForTime, qudt_QuantityKindDimensionVector$j$dimensionlessExponent, qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKind, qudt_QuantityKindDimensionVector$j$latexDefinition, qudt_QuantityKindDimensionVector$j$latexSymbol })
    }

    export function fromRdf(parameters: Parameters<typeof Quantity_Kind$W$Dimension$W$Vector._propertiesFromRdf>[0]): purify.Either<rdfjsResource.Resource.ValueError, Quantity_Kind$W$Dimension$W$Vector> {
        return Quantity_Kind$W$Dimension$W$Vector._propertiesFromRdf(parameters).map(properties => new Quantity_Kind$W$Dimension$W$Vector(properties));
    }

    export let fromRdfType: rdfjs.NamedNode<string> = dataFactory.namedNode("http://qudt.org/schema/qudt/QuantityKindDimensionVector");

    export function jsonSchema() {
        return zodToJsonSchema(jsonZodSchema());
    }

    export function jsonUiSchema(parameters?: { scopePrefix?: string }) {
        const scopePrefix = parameters?.scopePrefix ?? "#";
        return { "elements": [ { label: "Identifier", scope: `${scopePrefix}/properties/@id`, type: "Control" }, { rule: { condition: { schema: { const: "Quantity_Kind$W$Dimension$W$Vector" }, scope: `${scopePrefix}/properties/type` }, effect: "HIDE" }, scope: `${scopePrefix}/properties/type`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_QuantityKindDimensionVector$j$dimensionExponentForElectricCurrent`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_QuantityKindDimensionVector$j$dimensionExponentForLength`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_QuantityKindDimensionVector$j$dimensionExponentForMass`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_QuantityKindDimensionVector$j$dimensionExponentForTime`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_QuantityKindDimensionVector$j$dimensionlessExponent`, type: "Control" }, Quantity_Kind$W$$e$abstract$f$.quantityKindWEAbstractFJsonUiSchema({ scopePrefix: `${scopePrefix}/properties/qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKind` }), { scope: `${scopePrefix}/properties/qudt_QuantityKindDimensionVector$j$latexDefinition`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_QuantityKindDimensionVector$j$latexSymbol`, type: "Control" } ], label: "Quantity Kind Dimension Vector", type: "Group" }
    }

    export function jsonZodSchema() {
        return zod.object({ "@id": zod.string().min(1),"type": zod.literal("Quantity_Kind$W$Dimension$W$Vector"),"qudt_QuantityKindDimensionVector$j$dimensionExponentForAmountOfSubstance": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]),"qudt_QuantityKindDimensionVector$j$dimensionExponentForElectricCurrent": zod.number(),"qudt_QuantityKindDimensionVector$j$dimensionExponentForLength": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]),"qudt_QuantityKindDimensionVector$j$dimensionExponentForLuminousIntensity": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]),"qudt_QuantityKindDimensionVector$j$dimensionExponentForMass": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]),"qudt_QuantityKindDimensionVector$j$dimensionExponentForThermodynamicTemperature": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]),"qudt_QuantityKindDimensionVector$j$dimensionExponentForTime": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]),"qudt_QuantityKindDimensionVector$j$dimensionlessExponent": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]),"qudt_QuantityKindDimensionVector$j$hasReferenceQuantityKind": Quantity_Kind$W$$e$abstract$f$.quantityKindWEAbstractFJsonZodSchema().array(),"qudt_QuantityKindDimensionVector$j$latexDefinition": zod.string().optional(),"qudt_QuantityKindDimensionVector$j$latexSymbol": zod.string().array() });
    }

    export function sparqlConstructQuery(parameters?: { ignoreRdfType?: boolean; prefixes?: { [prefix: string]: string }; subject?: sparqljs.Triple["subject"]; } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "type">): sparqljs.ConstructQuery {
        const { ignoreRdfType, subject, ...queryParameters } = parameters ?? {}

        return { ...queryParameters, prefixes: parameters?.prefixes ?? {}, queryType: "CONSTRUCT", template: (queryParameters.template ?? []).concat(Quantity_Kind$W$Dimension$W$Vector.sparqlConstructTemplateTriples({ ignoreRdfType, subject })), type: "query", where: (queryParameters.where ?? []).concat(Quantity_Kind$W$Dimension$W$Vector.sparqlWherePatterns({ ignoreRdfType, subject })) };
    }

    export function sparqlConstructQueryString(parameters?: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"]; variablePrefix?: string; } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "type"> & sparqljs.GeneratorOptions): string {
        return new sparqljs.Generator(parameters).stringify(Quantity_Kind$W$Dimension$W$Vector.sparqlConstructQuery(parameters));
    }

    export function sparqlConstructTemplateTriples(parameters?: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"], variablePrefix?: string }): readonly sparqljs.Triple[] {
        const subject = parameters?.subject ?? dataFactory.variable!("quantityKindWDimensionWVector");
        const variablePrefix = parameters?.variablePrefix ?? (subject.termType === "Variable" ? subject.value : "quantityKindWDimensionWVector");
        return [...(parameters?.ignoreRdfType ? [] : [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.variable!(`${variablePrefix}RdfType`) }]), { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindDimensionVectorJDimensionExponentForAmountOfSubstance`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionExponentForAmountOfSubstance"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindDimensionVectorJDimensionExponentForElectricCurrent`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionExponentForElectricCurrent"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindDimensionVectorJDimensionExponentForLength`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionExponentForLength"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindDimensionVectorJDimensionExponentForLuminousIntensity`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionExponentForLuminousIntensity"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindDimensionVectorJDimensionExponentForMass`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionExponentForMass"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindDimensionVectorJDimensionExponentForThermodynamicTemperature`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionExponentForThermodynamicTemperature"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindDimensionVectorJDimensionExponentForTime`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionExponentForTime"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindDimensionVectorJDimensionlessExponent`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionlessExponent"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindDimensionVectorJHasReferenceQuantityKind`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/hasReferenceQuantityKind"), subject }, ...Quantity_Kind$W$$e$abstract$f$.sparqlConstructTemplateTriples({ ignoreRdfType: true, subject: dataFactory.variable!(`${variablePrefix}QudtQuantityKindDimensionVectorJHasReferenceQuantityKind`), variablePrefix: `${variablePrefix}QudtQuantityKindDimensionVectorJHasReferenceQuantityKind` }), { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindDimensionVectorJLatexDefinition`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/latexDefinition"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindDimensionVectorJLatexSymbol`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/latexSymbol"), subject }];
    }

    export function sparqlWherePatterns(parameters: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"], variablePrefix?: string }): readonly sparqljs.Pattern[] {
        const subject = parameters?.subject ?? dataFactory.variable!("quantityKindWDimensionWVector");
        const variablePrefix = parameters?.variablePrefix ?? (subject.termType === "Variable" ? subject.value : "quantityKindWDimensionWVector");
        return [...(parameters?.ignoreRdfType ? [] : [{ triples: [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.namedNode("http://qudt.org/schema/qudt/QuantityKindDimensionVector") }], type: "bgp" as const }, { triples: [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.variable!(`${variablePrefix}RdfType`) }], type: "bgp" as const }]), { triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindDimensionVectorJDimensionExponentForAmountOfSubstance`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionExponentForAmountOfSubstance"), subject }], type: "bgp" }, { triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindDimensionVectorJDimensionExponentForElectricCurrent`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionExponentForElectricCurrent"), subject }], type: "bgp" }, { triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindDimensionVectorJDimensionExponentForLength`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionExponentForLength"), subject }], type: "bgp" }, { triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindDimensionVectorJDimensionExponentForLuminousIntensity`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionExponentForLuminousIntensity"), subject }], type: "bgp" }, { triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindDimensionVectorJDimensionExponentForMass`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionExponentForMass"), subject }], type: "bgp" }, { triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindDimensionVectorJDimensionExponentForThermodynamicTemperature`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionExponentForThermodynamicTemperature"), subject }], type: "bgp" }, { triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindDimensionVectorJDimensionExponentForTime`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionExponentForTime"), subject }], type: "bgp" }, { triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindDimensionVectorJDimensionlessExponent`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionlessExponent"), subject }], type: "bgp" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindDimensionVectorJHasReferenceQuantityKind`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/hasReferenceQuantityKind"), subject }], type: "bgp" }, ...Quantity_Kind$W$$e$abstract$f$.sparqlWherePatterns({ ignoreRdfType: true, subject: dataFactory.variable!(`${variablePrefix}QudtQuantityKindDimensionVectorJHasReferenceQuantityKind`), variablePrefix: `${variablePrefix}QudtQuantityKindDimensionVectorJHasReferenceQuantityKind` })], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindDimensionVectorJLatexDefinition`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/latexDefinition"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindDimensionVectorJLatexSymbol`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/latexSymbol"), subject }], type: "bgp" }], type: "optional" }];
    }
}
/**
 * QUDT Aspect
 */
export class QUDT_Aspect {
    protected _identifier: (rdfjs.BlankNode | rdfjs.NamedNode) | undefined;
    readonly type: "Abstract_Unit" | "Angle_unit" | "Contextual_Unit" | "Dimensionless_Unit" | "QUDT_Aspect" | "Quantity_Kind" | "Quantity_Kind$W$$e$abstract$f$" | "Unit" | "Verifiable" = "QUDT_Aspect";

    constructor(parameters: { readonly identifier?: (rdfjs.BlankNode | rdfjs.NamedNode) | string }) {
        if (typeof parameters.identifier === "object") { this._identifier = parameters.identifier; } else if (typeof parameters.identifier === "string") { this._identifier = dataFactory.namedNode(parameters.identifier); } else if (typeof parameters.identifier === "undefined") { } else { this._identifier =( parameters.identifier) as never;
         }
    }

    get identifier(): (rdfjs.BlankNode | rdfjs.NamedNode) {
        if (typeof this._identifier === "undefined") { this._identifier = dataFactory.blankNode(); } return this._identifier;
    }

    equals(other: QUDT_Aspect): EqualsResult {
        return (booleanEquals)(this.identifier, other.identifier).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "identifier", propertyValuesUnequal, type: "Property" as const })).chain(() => (strictEquals)(this.type, other.type).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "type", propertyValuesUnequal, type: "Property" as const })));
    }

    hash<HasherT extends { update: (message: string | number[] | ArrayBuffer | Uint8Array) => void; }>(_hasher: HasherT): HasherT {
        _hasher.update(this.identifier.value);
        _hasher.update(this.type);
        this.hashShaclProperties(_hasher);
        return _hasher;
    }

    protected hashShaclProperties<HasherT extends { update: (message: string | number[] | ArrayBuffer | Uint8Array) => void; }>(_hasher: HasherT): HasherT {
        return _hasher;
    }

    toJson(): { readonly "@id": string; readonly "type": "Abstract_Unit" | "Angle_unit" | "Contextual_Unit" | "Dimensionless_Unit" | "QUDT_Aspect" | "Quantity_Kind" | "Quantity_Kind$W$$e$abstract$f$" | "Unit" | "Verifiable" } {
        return JSON.parse(JSON.stringify({ "@id": this.identifier.termType === "BlankNode" ? `_:${this.identifier.value}` : this.identifier.value,type: this.type } satisfies ReturnType<QUDT_Aspect["toJson"]>));
    }

    toRdf({ ignoreRdfType, mutateGraph, resourceSet }: { ignoreRdfType?: boolean; mutateGraph?: rdfjsResource.MutableResource.MutateGraph, resourceSet: rdfjsResource.MutableResourceSet }): rdfjsResource.MutableResource {
        const _resource = resourceSet.mutableResource(this.identifier, { mutateGraph });
        if (!ignoreRdfType) { _resource.add(_resource.dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), _resource.dataFactory.namedNode("http://qudt.org/schema/qudt/Aspect")); }

        return _resource;
    }

    toString(): string {
        return JSON.stringify(this.toJson());
    }
}

export namespace QUDT_Aspect {
    export function _propertiesFromJson(_json: unknown): purify.Either<zod.ZodError, { identifier: (rdfjs.BlankNode | rdfjs.NamedNode); }> {
        const _jsonSafeParseResult = qudtAspectJsonZodSchema().safeParse(_json);
        if (!_jsonSafeParseResult.success) { return purify.Left(_jsonSafeParseResult.error); }

        const _jsonObject = _jsonSafeParseResult.data;
        const identifier = (_jsonObject["@id"].startsWith("_:") ? dataFactory.blankNode(_jsonObject["@id"].substring(2)) : dataFactory.namedNode(_jsonObject["@id"]));
        return purify.Either.of({ identifier })
    }

    export function fromJson(json: unknown): purify.Either<zod.ZodError, QUDT_Aspect> {
        return (Verifiable.fromJson(json) as purify.Either<zod.ZodError, QUDT_Aspect>).altLazy(() => QUDT_Aspect._propertiesFromJson(json).map(properties => new QUDT_Aspect(properties)));
    }

    export function _propertiesFromRdf({ ignoreRdfType: _ignoreRdfType, languageIn: _languageIn, resource: _resource,
        // @ts-ignore
        ..._context }: { [_index: string]: any; ignoreRdfType?: boolean; languageIn?: readonly string[]; resource: rdfjsResource.Resource; }): purify.Either<rdfjsResource.Resource.ValueError, { identifier: (rdfjs.BlankNode | rdfjs.NamedNode); }> {
        if (!_ignoreRdfType && !_resource.isInstanceOf(dataFactory.namedNode("http://qudt.org/schema/qudt/Aspect"))) { return purify.Left(new rdfjsResource.Resource.ValueError({ focusResource: _resource, message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type (expected http://qudt.org/schema/qudt/Aspect)`, predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/Aspect") })); }

        const identifier = _resource.identifier
        return purify.Either.of({ identifier })
    }

    export function fromRdf(parameters: Parameters<typeof QUDT_Aspect._propertiesFromRdf>[0]): purify.Either<rdfjsResource.Resource.ValueError, QUDT_Aspect> {
        const { ignoreRdfType: _ignoreRdfType, ...otherParameters } = parameters
        return (Verifiable.fromRdf(otherParameters) as purify.Either<rdfjsResource.Resource.ValueError, QUDT_Aspect>).altLazy(() => QUDT_Aspect._propertiesFromRdf(parameters).map(properties => new QUDT_Aspect(properties)));
    }

    export let fromRdfType: rdfjs.NamedNode<string> = dataFactory.namedNode("http://qudt.org/schema/qudt/Aspect");

    export function jsonSchema() {
        return zodToJsonSchema(qudtAspectJsonZodSchema());
    }

    export function qudtAspectJsonUiSchema(parameters?: { scopePrefix?: string }) {
        const scopePrefix = parameters?.scopePrefix ?? "#";
        return { "elements": [ { label: "Identifier", scope: `${scopePrefix}/properties/@id`, type: "Control" }, { rule: { condition: { schema: { const: "QUDT_Aspect" }, scope: `${scopePrefix}/properties/type` }, effect: "HIDE" }, scope: `${scopePrefix}/properties/type`, type: "Control" } ], label: "QUDT Aspect", type: "Group" }
    }

    export function qudtAspectJsonZodSchema() {
        return zod.object({ "@id": zod.string().min(1),"type": zod.enum(["Abstract_Unit","Angle_unit","Contextual_Unit","Dimensionless_Unit","QUDT_Aspect","Quantity_Kind","Quantity_Kind$W$$e$abstract$f$","Unit","Verifiable"]) });
    }

    export function sparqlConstructQuery(parameters?: { ignoreRdfType?: boolean; prefixes?: { [prefix: string]: string }; subject?: sparqljs.Triple["subject"]; } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "type">): sparqljs.ConstructQuery {
        const { ignoreRdfType, subject, ...queryParameters } = parameters ?? {}

        return { ...queryParameters, prefixes: parameters?.prefixes ?? {}, queryType: "CONSTRUCT", template: (queryParameters.template ?? []).concat(QUDT_Aspect.sparqlConstructTemplateTriples({ ignoreRdfType, subject })), type: "query", where: (queryParameters.where ?? []).concat(QUDT_Aspect.sparqlWherePatterns({ ignoreRdfType, subject })) };
    }

    export function sparqlConstructQueryString(parameters?: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"]; variablePrefix?: string; } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "type"> & sparqljs.GeneratorOptions): string {
        return new sparqljs.Generator(parameters).stringify(QUDT_Aspect.sparqlConstructQuery(parameters));
    }

    export function sparqlConstructTemplateTriples(parameters?: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"], variablePrefix?: string }): readonly sparqljs.Triple[] {
        const subject = parameters?.subject ?? dataFactory.variable!("qudtAspect");
        const variablePrefix = parameters?.variablePrefix ?? (subject.termType === "Variable" ? subject.value : "qudtAspect");
        return [...(parameters?.ignoreRdfType ? [] : [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.variable!(`${variablePrefix}RdfType`) }])];
    }

    export function sparqlWherePatterns(parameters: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"], variablePrefix?: string }): readonly sparqljs.Pattern[] {
        const subject = parameters?.subject ?? dataFactory.variable!("qudtAspect");
        const variablePrefix = parameters?.variablePrefix ?? (subject.termType === "Variable" ? subject.value : "qudtAspect");
        return [...(parameters?.ignoreRdfType ? [] : [{ triples: [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.namedNode("http://qudt.org/schema/qudt/Aspect") }], type: "bgp" as const }, { triples: [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.variable!(`${variablePrefix}RdfType`) }], type: "bgp" as const }])];
    }
}
/**
 * Verifiable
 */
export class Verifiable extends QUDT_Aspect {
    override readonly type: "Abstract_Unit" | "Angle_unit" | "Contextual_Unit" | "Dimensionless_Unit" | "Quantity_Kind" | "Quantity_Kind$W$$e$abstract$f$" | "Unit" | "Verifiable" = "Verifiable";
    readonly qudt_InformativeReferencePropertyShape: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[];
    readonly qudt_Verifiable$j$dbpediaMatch: readonly (string)[];
    readonly qudt_Verifiable$j$isoNormativeReference: readonly (string)[];
    readonly qudt_Verifiable$j$normativeReference: readonly (string)[];

    constructor(parameters: { readonly identifier?: (rdfjs.BlankNode | rdfjs.NamedNode) | string, readonly qudt_InformativeReferencePropertyShape?: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[], readonly qudt_Verifiable$j$dbpediaMatch?: readonly (string)[], readonly qudt_Verifiable$j$isoNormativeReference?: readonly (string)[], readonly qudt_Verifiable$j$normativeReference?: readonly (string)[] } & ConstructorParameters<typeof QUDT_Aspect>[0]) {
        super(parameters);
        if (typeof parameters.qudt_InformativeReferencePropertyShape === "undefined") { this.qudt_InformativeReferencePropertyShape = []; } else if (Array.isArray(parameters.qudt_InformativeReferencePropertyShape)) { this.qudt_InformativeReferencePropertyShape = parameters.qudt_InformativeReferencePropertyShape; } else { this.qudt_InformativeReferencePropertyShape =( parameters.qudt_InformativeReferencePropertyShape) as never;
         }

        if (typeof parameters.qudt_Verifiable$j$dbpediaMatch === "undefined") { this.qudt_Verifiable$j$dbpediaMatch = []; } else if (Array.isArray(parameters.qudt_Verifiable$j$dbpediaMatch)) { this.qudt_Verifiable$j$dbpediaMatch = parameters.qudt_Verifiable$j$dbpediaMatch; } else { this.qudt_Verifiable$j$dbpediaMatch =( parameters.qudt_Verifiable$j$dbpediaMatch) as never;
         }

        if (typeof parameters.qudt_Verifiable$j$isoNormativeReference === "undefined") { this.qudt_Verifiable$j$isoNormativeReference = []; } else if (Array.isArray(parameters.qudt_Verifiable$j$isoNormativeReference)) { this.qudt_Verifiable$j$isoNormativeReference = parameters.qudt_Verifiable$j$isoNormativeReference; } else { this.qudt_Verifiable$j$isoNormativeReference =( parameters.qudt_Verifiable$j$isoNormativeReference) as never;
         }

        if (typeof parameters.qudt_Verifiable$j$normativeReference === "undefined") { this.qudt_Verifiable$j$normativeReference = []; } else if (Array.isArray(parameters.qudt_Verifiable$j$normativeReference)) { this.qudt_Verifiable$j$normativeReference = parameters.qudt_Verifiable$j$normativeReference; } else { this.qudt_Verifiable$j$normativeReference =( parameters.qudt_Verifiable$j$normativeReference) as never;
         }
    }

    override get identifier(): (rdfjs.BlankNode | rdfjs.NamedNode) {
        if (typeof this._identifier === "undefined") { this._identifier = dataFactory.blankNode(); } return this._identifier;
    }

    override equals(other: Verifiable): EqualsResult {
        return super.equals(other).chain(() => (((left, right) => arrayEquals(left, right, booleanEquals)))(this.qudt_InformativeReferencePropertyShape, other.qudt_InformativeReferencePropertyShape).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_InformativeReferencePropertyShape", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, strictEquals)))(this.qudt_Verifiable$j$dbpediaMatch, other.qudt_Verifiable$j$dbpediaMatch).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Verifiable$j$dbpediaMatch", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, strictEquals)))(this.qudt_Verifiable$j$isoNormativeReference, other.qudt_Verifiable$j$isoNormativeReference).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Verifiable$j$isoNormativeReference", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, strictEquals)))(this.qudt_Verifiable$j$normativeReference, other.qudt_Verifiable$j$normativeReference).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Verifiable$j$normativeReference", propertyValuesUnequal, type: "Property" as const })));
    }

    override hash<HasherT extends { update: (message: string | number[] | ArrayBuffer | Uint8Array) => void; }>(_hasher: HasherT): HasherT {
        this.hashShaclProperties(_hasher);
        return _hasher;
    }

    protected override hashShaclProperties<HasherT extends { update: (message: string | number[] | ArrayBuffer | Uint8Array) => void; }>(_hasher: HasherT): HasherT {
        super.hashShaclProperties(_hasher);
        for (const _item0 of this.qudt_InformativeReferencePropertyShape) { _hasher.update(_item0.termType);
        _hasher.update(_item0.value); }

        for (const _item0 of this.qudt_Verifiable$j$dbpediaMatch) { _hasher.update(_item0); }

        for (const _item0 of this.qudt_Verifiable$j$isoNormativeReference) { _hasher.update(_item0); }

        for (const _item0 of this.qudt_Verifiable$j$normativeReference) { _hasher.update(_item0); }

        return _hasher;
    }

    override toJson(): { readonly "qudt_InformativeReferencePropertyShape": readonly ({ readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" })[]; readonly "qudt_Verifiable$j$dbpediaMatch": readonly (string)[]; readonly "qudt_Verifiable$j$isoNormativeReference": readonly (string)[]; readonly "qudt_Verifiable$j$normativeReference": readonly (string)[] } & ReturnType<QUDT_Aspect["toJson"]> {
        return JSON.parse(JSON.stringify({ ...super.toJson(),qudt_InformativeReferencePropertyShape: this.qudt_InformativeReferencePropertyShape.map(_item => ((_item.termType === "Literal") ? { "@language": _item.language.length > 0 ? _item.language : undefined, "@type": _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? _item.datatype.value : undefined, "@value": _item.value, termType: "Literal" as const } : (_item.termType === "NamedNode") ? { "@id": _item.value, termType: "NamedNode" as const } : { "@id": `_:${_item.value}`, termType: "BlankNode" as const })),qudt_Verifiable$j$dbpediaMatch: this.qudt_Verifiable$j$dbpediaMatch.map(_item => (_item)),qudt_Verifiable$j$isoNormativeReference: this.qudt_Verifiable$j$isoNormativeReference.map(_item => (_item)),qudt_Verifiable$j$normativeReference: this.qudt_Verifiable$j$normativeReference.map(_item => (_item)) } satisfies ReturnType<Verifiable["toJson"]>));
    }

    override toRdf({ ignoreRdfType, mutateGraph, resourceSet }: { ignoreRdfType?: boolean; mutateGraph?: rdfjsResource.MutableResource.MutateGraph, resourceSet: rdfjsResource.MutableResourceSet }): rdfjsResource.MutableResource {
        const _resource = super.toRdf({ ignoreRdfType: true, mutateGraph, resourceSet });
        if (!ignoreRdfType) { _resource.add(_resource.dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), _resource.dataFactory.namedNode("http://qudt.org/schema/qudt/Verifiable")); }

        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/informativeReference"), this.qudt_InformativeReferencePropertyShape.map((_item) => _item));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/dbpediaMatch"), this.qudt_Verifiable$j$dbpediaMatch.map((_item) => _item));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/isoNormativeReference"), this.qudt_Verifiable$j$isoNormativeReference.map((_item) => _item));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/normativeReference"), this.qudt_Verifiable$j$normativeReference.map((_item) => _item));
        return _resource;
    }

    override toString(): string {
        return JSON.stringify(this.toJson());
    }
}

export namespace Verifiable {
    export function _propertiesFromJson(_json: unknown): purify.Either<zod.ZodError, { identifier: (rdfjs.BlankNode | rdfjs.NamedNode); qudt_InformativeReferencePropertyShape: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; qudt_Verifiable$j$dbpediaMatch: readonly (string)[]; qudt_Verifiable$j$isoNormativeReference: readonly (string)[]; qudt_Verifiable$j$normativeReference: readonly (string)[]; } & UnwrapR<ReturnType<typeof QUDT_Aspect._propertiesFromJson>>> {
        const _jsonSafeParseResult = verifiableJsonZodSchema().safeParse(_json);
        if (!_jsonSafeParseResult.success) { return purify.Left(_jsonSafeParseResult.error); }

        const _jsonObject = _jsonSafeParseResult.data;
        const _super0Either = QUDT_Aspect._propertiesFromJson(_jsonObject);
        if (_super0Either.isLeft()) { return _super0Either; }

        const _super0 = _super0Either.unsafeCoerce()
        const identifier = (_jsonObject["@id"].startsWith("_:") ? dataFactory.blankNode(_jsonObject["@id"].substring(2)) : dataFactory.namedNode(_jsonObject["@id"]));
        const qudt_InformativeReferencePropertyShape = _jsonObject["qudt_InformativeReferencePropertyShape"].map(_item => (((_item.termType === "Literal") ? (dataFactory.literal(_item["@value"], typeof _item["@language"] !== "undefined" ? _item["@language"] : (typeof _item["@type"] !== "undefined" ? dataFactory.namedNode(_item["@type"]) : undefined))) : (((_item.termType === "NamedNode") ? (dataFactory.namedNode(_item["@id"])) : (dataFactory.blankNode(_item["@id"].substring(2))))))));
        const qudt_Verifiable$j$dbpediaMatch = _jsonObject["qudt_Verifiable$j$dbpediaMatch"];
        const qudt_Verifiable$j$isoNormativeReference = _jsonObject["qudt_Verifiable$j$isoNormativeReference"];
        const qudt_Verifiable$j$normativeReference = _jsonObject["qudt_Verifiable$j$normativeReference"];
        return purify.Either.of({ ..._super0, identifier, qudt_InformativeReferencePropertyShape, qudt_Verifiable$j$dbpediaMatch, qudt_Verifiable$j$isoNormativeReference, qudt_Verifiable$j$normativeReference })
    }

    export function fromJson(json: unknown): purify.Either<zod.ZodError, Verifiable> {
        return (Quantity_Kind$W$$e$abstract$f$.fromJson(json) as purify.Either<zod.ZodError, Verifiable>).altLazy(() => (Abstract_Unit.fromJson(json) as purify.Either<zod.ZodError, Verifiable>)).altLazy(() => Verifiable._propertiesFromJson(json).map(properties => new Verifiable(properties)));
    }

    export function _propertiesFromRdf({ ignoreRdfType: _ignoreRdfType, languageIn: _languageIn, resource: _resource,
        // @ts-ignore
        ..._context }: { [_index: string]: any; ignoreRdfType?: boolean; languageIn?: readonly string[]; resource: rdfjsResource.Resource; }): purify.Either<rdfjsResource.Resource.ValueError, { identifier: (rdfjs.BlankNode | rdfjs.NamedNode); qudt_InformativeReferencePropertyShape: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; qudt_Verifiable$j$dbpediaMatch: readonly (string)[]; qudt_Verifiable$j$isoNormativeReference: readonly (string)[]; qudt_Verifiable$j$normativeReference: readonly (string)[]; } & UnwrapR<ReturnType<typeof QUDT_Aspect._propertiesFromRdf>>> {
        const _super0Either = QUDT_Aspect._propertiesFromRdf({ ..._context, ignoreRdfType: true, languageIn: _languageIn, resource: _resource });
        if (_super0Either.isLeft()) { return _super0Either; }

        const _super0 = _super0Either.unsafeCoerce()
        if (!_ignoreRdfType && !_resource.isInstanceOf(dataFactory.namedNode("http://qudt.org/schema/qudt/Verifiable"))) { return purify.Left(new rdfjsResource.Resource.ValueError({ focusResource: _resource, message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type (expected http://qudt.org/schema/qudt/Verifiable)`, predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/Verifiable") })); }

        const identifier = _resource.identifier
        const _qudt_InformativeReferencePropertyShapeEither: purify.Either<rdfjsResource.Resource.ValueError, readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/informativeReference"), { unique: true }).flatMap(_item => _item.toValues().head().chain(_value => purify.Either.of(_value.toTerm())).toMaybe().toList())]);
        if (_qudt_InformativeReferencePropertyShapeEither.isLeft()) { return _qudt_InformativeReferencePropertyShapeEither; }

        const qudt_InformativeReferencePropertyShape = _qudt_InformativeReferencePropertyShapeEither.unsafeCoerce();
        const _qudt_Verifiable$j$dbpediaMatchEither: purify.Either<rdfjsResource.Resource.ValueError, readonly (string)[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/dbpediaMatch"), { unique: true }).flatMap(_item => _item.toValues().head().chain(_value => _value.toString()).toMaybe().toList())]);
        if (_qudt_Verifiable$j$dbpediaMatchEither.isLeft()) { return _qudt_Verifiable$j$dbpediaMatchEither; }

        const qudt_Verifiable$j$dbpediaMatch = _qudt_Verifiable$j$dbpediaMatchEither.unsafeCoerce();
        const _qudt_Verifiable$j$isoNormativeReferenceEither: purify.Either<rdfjsResource.Resource.ValueError, readonly (string)[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/isoNormativeReference"), { unique: true }).flatMap(_item => _item.toValues().head().chain(_value => _value.toString()).toMaybe().toList())]);
        if (_qudt_Verifiable$j$isoNormativeReferenceEither.isLeft()) { return _qudt_Verifiable$j$isoNormativeReferenceEither; }

        const qudt_Verifiable$j$isoNormativeReference = _qudt_Verifiable$j$isoNormativeReferenceEither.unsafeCoerce();
        const _qudt_Verifiable$j$normativeReferenceEither: purify.Either<rdfjsResource.Resource.ValueError, readonly (string)[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/normativeReference"), { unique: true }).flatMap(_item => _item.toValues().head().chain(_value => _value.toString()).toMaybe().toList())]);
        if (_qudt_Verifiable$j$normativeReferenceEither.isLeft()) { return _qudt_Verifiable$j$normativeReferenceEither; }

        const qudt_Verifiable$j$normativeReference = _qudt_Verifiable$j$normativeReferenceEither.unsafeCoerce();
        return purify.Either.of({ ..._super0, identifier, qudt_InformativeReferencePropertyShape, qudt_Verifiable$j$dbpediaMatch, qudt_Verifiable$j$isoNormativeReference, qudt_Verifiable$j$normativeReference })
    }

    export function fromRdf(parameters: Parameters<typeof Verifiable._propertiesFromRdf>[0]): purify.Either<rdfjsResource.Resource.ValueError, Verifiable> {
        const { ignoreRdfType: _ignoreRdfType, ...otherParameters } = parameters
        return (Quantity_Kind$W$$e$abstract$f$.fromRdf(otherParameters) as purify.Either<rdfjsResource.Resource.ValueError, Verifiable>).altLazy(() => (Abstract_Unit.fromRdf(otherParameters) as purify.Either<rdfjsResource.Resource.ValueError, Verifiable>)).altLazy(() => Verifiable._propertiesFromRdf(parameters).map(properties => new Verifiable(properties)));
    }

    export let fromRdfType: rdfjs.NamedNode<string> = dataFactory.namedNode("http://qudt.org/schema/qudt/Verifiable");

    export function jsonSchema() {
        return zodToJsonSchema(verifiableJsonZodSchema());
    }

    export function verifiableJsonUiSchema(parameters?: { scopePrefix?: string }) {
        const scopePrefix = parameters?.scopePrefix ?? "#";
        return { "elements": [ QUDT_Aspect.qudtAspectJsonUiSchema({ scopePrefix }), { scope: `${scopePrefix}/properties/qudt_InformativeReferencePropertyShape`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_Verifiable$j$dbpediaMatch`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_Verifiable$j$isoNormativeReference`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_Verifiable$j$normativeReference`, type: "Control" } ], label: "Verifiable", type: "Group" }
    }

    export function verifiableJsonZodSchema() {
        return QUDT_Aspect.qudtAspectJsonZodSchema().merge(zod.object({ "@id": zod.string().min(1),"type": zod.enum(["Abstract_Unit","Angle_unit","Contextual_Unit","Dimensionless_Unit","Quantity_Kind","Quantity_Kind$W$$e$abstract$f$","Unit","Verifiable"]),"qudt_InformativeReferencePropertyShape": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]).array(),"qudt_Verifiable$j$dbpediaMatch": zod.string().array(),"qudt_Verifiable$j$isoNormativeReference": zod.string().array(),"qudt_Verifiable$j$normativeReference": zod.string().array() }));
    }

    export function sparqlConstructQuery(parameters?: { ignoreRdfType?: boolean; prefixes?: { [prefix: string]: string }; subject?: sparqljs.Triple["subject"]; } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "type">): sparqljs.ConstructQuery {
        const { ignoreRdfType, subject, ...queryParameters } = parameters ?? {}

        return { ...queryParameters, prefixes: parameters?.prefixes ?? {}, queryType: "CONSTRUCT", template: (queryParameters.template ?? []).concat(Verifiable.sparqlConstructTemplateTriples({ ignoreRdfType, subject })), type: "query", where: (queryParameters.where ?? []).concat(Verifiable.sparqlWherePatterns({ ignoreRdfType, subject })) };
    }

    export function sparqlConstructQueryString(parameters?: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"]; variablePrefix?: string; } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "type"> & sparqljs.GeneratorOptions): string {
        return new sparqljs.Generator(parameters).stringify(Verifiable.sparqlConstructQuery(parameters));
    }

    export function sparqlConstructTemplateTriples(parameters?: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"], variablePrefix?: string }): readonly sparqljs.Triple[] {
        const subject = parameters?.subject ?? dataFactory.variable!("verifiable");
        const variablePrefix = parameters?.variablePrefix ?? (subject.termType === "Variable" ? subject.value : "verifiable");
        return [...QUDT_Aspect.sparqlConstructTemplateTriples({ ignoreRdfType: true, subject, variablePrefix }), ...(parameters?.ignoreRdfType ? [] : [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.variable!(`${variablePrefix}RdfType`) }]), { object: dataFactory.variable!(`${variablePrefix}QudtInformativeReferencePropertyShape`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/informativeReference"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtVerifiableJDbpediaMatch`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/dbpediaMatch"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtVerifiableJIsoNormativeReference`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/isoNormativeReference"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtVerifiableJNormativeReference`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/normativeReference"), subject }];
    }

    export function sparqlWherePatterns(parameters: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"], variablePrefix?: string }): readonly sparqljs.Pattern[] {
        const subject = parameters?.subject ?? dataFactory.variable!("verifiable");
        const variablePrefix = parameters?.variablePrefix ?? (subject.termType === "Variable" ? subject.value : "verifiable");
        return [...QUDT_Aspect.sparqlWherePatterns({ ignoreRdfType: true, subject, variablePrefix }), ...(parameters?.ignoreRdfType ? [] : [{ triples: [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.namedNode("http://qudt.org/schema/qudt/Verifiable") }], type: "bgp" as const }, { triples: [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.variable!(`${variablePrefix}RdfType`) }], type: "bgp" as const }]), { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtInformativeReferencePropertyShape`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/informativeReference"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtVerifiableJDbpediaMatch`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/dbpediaMatch"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtVerifiableJIsoNormativeReference`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/isoNormativeReference"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtVerifiableJNormativeReference`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/normativeReference"), subject }], type: "bgp" }], type: "optional" }];
    }
}
/**
 * Quantity Kind (abstract)
 */
export class Quantity_Kind$W$$e$abstract$f$ extends Verifiable {
    override readonly type: "Quantity_Kind" | "Quantity_Kind$W$$e$abstract$f$" = "Quantity_Kind$W$$e$abstract$f$";
    readonly qudt_AbstractQuantityKind$j$altSymbol: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[];
    readonly qudt_AbstractQuantityKind$j$broader: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[];
    readonly qudt_AbstractQuantityKind$j$latexSymbol: readonly (string)[];
    readonly qudt_AbstractQuantityKind$j$symbol: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>;

    constructor(parameters: { readonly identifier?: (rdfjs.BlankNode | rdfjs.NamedNode) | string, readonly qudt_AbstractQuantityKind$j$altSymbol?: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[], readonly qudt_AbstractQuantityKind$j$broader?: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[], readonly qudt_AbstractQuantityKind$j$latexSymbol?: readonly (string)[], readonly qudt_AbstractQuantityKind$j$symbol?: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal) | Date | boolean | number | purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)> | string } & ConstructorParameters<typeof Verifiable>[0]) {
        super(parameters);
        if (typeof parameters.qudt_AbstractQuantityKind$j$altSymbol === "undefined") { this.qudt_AbstractQuantityKind$j$altSymbol = []; } else if (Array.isArray(parameters.qudt_AbstractQuantityKind$j$altSymbol)) { this.qudt_AbstractQuantityKind$j$altSymbol = parameters.qudt_AbstractQuantityKind$j$altSymbol; } else { this.qudt_AbstractQuantityKind$j$altSymbol =( parameters.qudt_AbstractQuantityKind$j$altSymbol) as never;
         }

        if (typeof parameters.qudt_AbstractQuantityKind$j$broader === "undefined") { this.qudt_AbstractQuantityKind$j$broader = []; } else if (Array.isArray(parameters.qudt_AbstractQuantityKind$j$broader)) { this.qudt_AbstractQuantityKind$j$broader = parameters.qudt_AbstractQuantityKind$j$broader; } else { this.qudt_AbstractQuantityKind$j$broader =( parameters.qudt_AbstractQuantityKind$j$broader) as never;
         }

        if (typeof parameters.qudt_AbstractQuantityKind$j$latexSymbol === "undefined") { this.qudt_AbstractQuantityKind$j$latexSymbol = []; } else if (Array.isArray(parameters.qudt_AbstractQuantityKind$j$latexSymbol)) { this.qudt_AbstractQuantityKind$j$latexSymbol = parameters.qudt_AbstractQuantityKind$j$latexSymbol; } else { this.qudt_AbstractQuantityKind$j$latexSymbol =( parameters.qudt_AbstractQuantityKind$j$latexSymbol) as never;
         }

        if (purify.Maybe.isMaybe(parameters.qudt_AbstractQuantityKind$j$symbol)) { this.qudt_AbstractQuantityKind$j$symbol = parameters.qudt_AbstractQuantityKind$j$symbol; } else if (typeof parameters.qudt_AbstractQuantityKind$j$symbol === "boolean") { this.qudt_AbstractQuantityKind$j$symbol = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_AbstractQuantityKind$j$symbol, { dataFactory })); } else if (typeof parameters.qudt_AbstractQuantityKind$j$symbol === "object" && parameters.qudt_AbstractQuantityKind$j$symbol instanceof Date) { this.qudt_AbstractQuantityKind$j$symbol = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_AbstractQuantityKind$j$symbol, { dataFactory })); } else if (typeof parameters.qudt_AbstractQuantityKind$j$symbol === "number") { this.qudt_AbstractQuantityKind$j$symbol = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_AbstractQuantityKind$j$symbol, { dataFactory })); } else if (typeof parameters.qudt_AbstractQuantityKind$j$symbol === "string") { this.qudt_AbstractQuantityKind$j$symbol = purify.Maybe.of(dataFactory.literal(parameters.qudt_AbstractQuantityKind$j$symbol)); } else if (typeof parameters.qudt_AbstractQuantityKind$j$symbol === "object") { this.qudt_AbstractQuantityKind$j$symbol = purify.Maybe.of(parameters.qudt_AbstractQuantityKind$j$symbol); } else if (typeof parameters.qudt_AbstractQuantityKind$j$symbol === "undefined") { this.qudt_AbstractQuantityKind$j$symbol = purify.Maybe.empty(); } else { this.qudt_AbstractQuantityKind$j$symbol =( parameters.qudt_AbstractQuantityKind$j$symbol) as never;
         }
    }

    override get identifier(): (rdfjs.BlankNode | rdfjs.NamedNode) {
        if (typeof this._identifier === "undefined") { this._identifier = dataFactory.blankNode(); } return this._identifier;
    }

    override equals(other: Quantity_Kind$W$$e$abstract$f$): EqualsResult {
        return super.equals(other).chain(() => (((left, right) => arrayEquals(left, right, booleanEquals)))(this.qudt_AbstractQuantityKind$j$altSymbol, other.qudt_AbstractQuantityKind$j$altSymbol).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_AbstractQuantityKind$j$altSymbol", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, booleanEquals)))(this.qudt_AbstractQuantityKind$j$broader, other.qudt_AbstractQuantityKind$j$broader).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_AbstractQuantityKind$j$broader", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, strictEquals)))(this.qudt_AbstractQuantityKind$j$latexSymbol, other.qudt_AbstractQuantityKind$j$latexSymbol).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_AbstractQuantityKind$j$latexSymbol", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => maybeEquals(left, right, booleanEquals)))(this.qudt_AbstractQuantityKind$j$symbol, other.qudt_AbstractQuantityKind$j$symbol).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_AbstractQuantityKind$j$symbol", propertyValuesUnequal, type: "Property" as const })));
    }

    override hash<HasherT extends { update: (message: string | number[] | ArrayBuffer | Uint8Array) => void; }>(_hasher: HasherT): HasherT {
        this.hashShaclProperties(_hasher);
        return _hasher;
    }

    protected override hashShaclProperties<HasherT extends { update: (message: string | number[] | ArrayBuffer | Uint8Array) => void; }>(_hasher: HasherT): HasherT {
        super.hashShaclProperties(_hasher);
        for (const _item0 of this.qudt_AbstractQuantityKind$j$altSymbol) { _hasher.update(_item0.termType);
        _hasher.update(_item0.value); }

        for (const _item0 of this.qudt_AbstractQuantityKind$j$broader) { _hasher.update(_item0.termType);
        _hasher.update(_item0.value); }

        for (const _item0 of this.qudt_AbstractQuantityKind$j$latexSymbol) { _hasher.update(_item0); }

        this.qudt_AbstractQuantityKind$j$symbol.ifJust((_value0) => { _hasher.update(_value0.termType);
        _hasher.update(_value0.value); })
        return _hasher;
    }

    override toJson(): { readonly "qudt_AbstractQuantityKind$j$altSymbol": readonly ({ readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" })[]; readonly "qudt_AbstractQuantityKind$j$broader": readonly ({ readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" })[]; readonly "qudt_AbstractQuantityKind$j$latexSymbol": readonly (string)[]; readonly "qudt_AbstractQuantityKind$j$symbol": ({ readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" }) | undefined } & ReturnType<Verifiable["toJson"]> {
        return JSON.parse(JSON.stringify({ ...super.toJson(),qudt_AbstractQuantityKind$j$altSymbol: this.qudt_AbstractQuantityKind$j$altSymbol.map(_item => ((_item.termType === "Literal") ? { "@language": _item.language.length > 0 ? _item.language : undefined, "@type": _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? _item.datatype.value : undefined, "@value": _item.value, termType: "Literal" as const } : (_item.termType === "NamedNode") ? { "@id": _item.value, termType: "NamedNode" as const } : { "@id": `_:${_item.value}`, termType: "BlankNode" as const })),qudt_AbstractQuantityKind$j$broader: this.qudt_AbstractQuantityKind$j$broader.map(_item => ((_item.termType === "Literal") ? { "@language": _item.language.length > 0 ? _item.language : undefined, "@type": _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? _item.datatype.value : undefined, "@value": _item.value, termType: "Literal" as const } : (_item.termType === "NamedNode") ? { "@id": _item.value, termType: "NamedNode" as const } : { "@id": `_:${_item.value}`, termType: "BlankNode" as const })),qudt_AbstractQuantityKind$j$latexSymbol: this.qudt_AbstractQuantityKind$j$latexSymbol.map(_item => (_item)),qudt_AbstractQuantityKind$j$symbol: this.qudt_AbstractQuantityKind$j$symbol.map(_item => ((_item.termType === "Literal") ? { "@language": _item.language.length > 0 ? _item.language : undefined, "@type": _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? _item.datatype.value : undefined, "@value": _item.value, termType: "Literal" as const } : (_item.termType === "NamedNode") ? { "@id": _item.value, termType: "NamedNode" as const } : { "@id": `_:${_item.value}`, termType: "BlankNode" as const })).extract() } satisfies ReturnType<Quantity_Kind$W$$e$abstract$f$["toJson"]>));
    }

    override toRdf({ ignoreRdfType, mutateGraph, resourceSet }: { ignoreRdfType?: boolean; mutateGraph?: rdfjsResource.MutableResource.MutateGraph, resourceSet: rdfjsResource.MutableResourceSet }): rdfjsResource.MutableResource {
        const _resource = super.toRdf({ ignoreRdfType: true, mutateGraph, resourceSet });
        if (!ignoreRdfType) { _resource.add(_resource.dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), _resource.dataFactory.namedNode("http://qudt.org/schema/qudt/AbstractQuantityKind")); }

        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/altSymbol"), this.qudt_AbstractQuantityKind$j$altSymbol.map((_item) => _item));
        _resource.add(dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#broader"), this.qudt_AbstractQuantityKind$j$broader.map((_item) => _item));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/latexSymbol"), this.qudt_AbstractQuantityKind$j$latexSymbol.map((_item) => _item));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/symbol"), this.qudt_AbstractQuantityKind$j$symbol);
        return _resource;
    }

    override toString(): string {
        return JSON.stringify(this.toJson());
    }
}

export namespace Quantity_Kind$W$$e$abstract$f$ {
    export function _propertiesFromJson(_json: unknown): purify.Either<zod.ZodError, { identifier: (rdfjs.BlankNode | rdfjs.NamedNode); qudt_AbstractQuantityKind$j$altSymbol: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; qudt_AbstractQuantityKind$j$broader: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; qudt_AbstractQuantityKind$j$latexSymbol: readonly (string)[]; qudt_AbstractQuantityKind$j$symbol: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>; } & UnwrapR<ReturnType<typeof Verifiable._propertiesFromJson>>> {
        const _jsonSafeParseResult = quantityKindWEAbstractFJsonZodSchema().safeParse(_json);
        if (!_jsonSafeParseResult.success) { return purify.Left(_jsonSafeParseResult.error); }

        const _jsonObject = _jsonSafeParseResult.data;
        const _super0Either = Verifiable._propertiesFromJson(_jsonObject);
        if (_super0Either.isLeft()) { return _super0Either; }

        const _super0 = _super0Either.unsafeCoerce()
        const identifier = (_jsonObject["@id"].startsWith("_:") ? dataFactory.blankNode(_jsonObject["@id"].substring(2)) : dataFactory.namedNode(_jsonObject["@id"]));
        const qudt_AbstractQuantityKind$j$altSymbol = _jsonObject["qudt_AbstractQuantityKind$j$altSymbol"].map(_item => (((_item.termType === "Literal") ? (dataFactory.literal(_item["@value"], typeof _item["@language"] !== "undefined" ? _item["@language"] : (typeof _item["@type"] !== "undefined" ? dataFactory.namedNode(_item["@type"]) : undefined))) : (((_item.termType === "NamedNode") ? (dataFactory.namedNode(_item["@id"])) : (dataFactory.blankNode(_item["@id"].substring(2))))))));
        const qudt_AbstractQuantityKind$j$broader = _jsonObject["qudt_AbstractQuantityKind$j$broader"].map(_item => (((_item.termType === "Literal") ? (dataFactory.literal(_item["@value"], typeof _item["@language"] !== "undefined" ? _item["@language"] : (typeof _item["@type"] !== "undefined" ? dataFactory.namedNode(_item["@type"]) : undefined))) : (((_item.termType === "NamedNode") ? (dataFactory.namedNode(_item["@id"])) : (dataFactory.blankNode(_item["@id"].substring(2))))))));
        const qudt_AbstractQuantityKind$j$latexSymbol = _jsonObject["qudt_AbstractQuantityKind$j$latexSymbol"];
        const qudt_AbstractQuantityKind$j$symbol = purify.Maybe.fromNullable(_jsonObject["qudt_AbstractQuantityKind$j$symbol"]).map(_item => (((_item.termType === "Literal") ? (dataFactory.literal(_item["@value"], typeof _item["@language"] !== "undefined" ? _item["@language"] : (typeof _item["@type"] !== "undefined" ? dataFactory.namedNode(_item["@type"]) : undefined))) : (((_item.termType === "NamedNode") ? (dataFactory.namedNode(_item["@id"])) : (dataFactory.blankNode(_item["@id"].substring(2))))))));
        return purify.Either.of({ ..._super0, identifier, qudt_AbstractQuantityKind$j$altSymbol, qudt_AbstractQuantityKind$j$broader, qudt_AbstractQuantityKind$j$latexSymbol, qudt_AbstractQuantityKind$j$symbol })
    }

    export function fromJson(json: unknown): purify.Either<zod.ZodError, Quantity_Kind$W$$e$abstract$f$> {
        return (Quantity_Kind.fromJson(json) as purify.Either<zod.ZodError, Quantity_Kind$W$$e$abstract$f$>).altLazy(() => Quantity_Kind$W$$e$abstract$f$._propertiesFromJson(json).map(properties => new Quantity_Kind$W$$e$abstract$f$(properties)));
    }

    export function _propertiesFromRdf({ ignoreRdfType: _ignoreRdfType, languageIn: _languageIn, resource: _resource,
        // @ts-ignore
        ..._context }: { [_index: string]: any; ignoreRdfType?: boolean; languageIn?: readonly string[]; resource: rdfjsResource.Resource; }): purify.Either<rdfjsResource.Resource.ValueError, { identifier: (rdfjs.BlankNode | rdfjs.NamedNode); qudt_AbstractQuantityKind$j$altSymbol: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; qudt_AbstractQuantityKind$j$broader: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; qudt_AbstractQuantityKind$j$latexSymbol: readonly (string)[]; qudt_AbstractQuantityKind$j$symbol: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>; } & UnwrapR<ReturnType<typeof Verifiable._propertiesFromRdf>>> {
        const _super0Either = Verifiable._propertiesFromRdf({ ..._context, ignoreRdfType: true, languageIn: _languageIn, resource: _resource });
        if (_super0Either.isLeft()) { return _super0Either; }

        const _super0 = _super0Either.unsafeCoerce()
        if (!_ignoreRdfType && !_resource.isInstanceOf(dataFactory.namedNode("http://qudt.org/schema/qudt/AbstractQuantityKind"))) { return purify.Left(new rdfjsResource.Resource.ValueError({ focusResource: _resource, message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type (expected http://qudt.org/schema/qudt/AbstractQuantityKind)`, predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/AbstractQuantityKind") })); }

        const identifier = _resource.identifier
        const _qudt_AbstractQuantityKind$j$altSymbolEither: purify.Either<rdfjsResource.Resource.ValueError, readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/altSymbol"), { unique: true }).flatMap(_item => _item.toValues().head().chain(_value => purify.Either.of(_value.toTerm())).toMaybe().toList())]);
        if (_qudt_AbstractQuantityKind$j$altSymbolEither.isLeft()) { return _qudt_AbstractQuantityKind$j$altSymbolEither; }

        const qudt_AbstractQuantityKind$j$altSymbol = _qudt_AbstractQuantityKind$j$altSymbolEither.unsafeCoerce();
        const _qudt_AbstractQuantityKind$j$broaderEither: purify.Either<rdfjsResource.Resource.ValueError, readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#broader"), { unique: true }).flatMap(_item => _item.toValues().head().chain(_value => purify.Either.of(_value.toTerm())).toMaybe().toList())]);
        if (_qudt_AbstractQuantityKind$j$broaderEither.isLeft()) { return _qudt_AbstractQuantityKind$j$broaderEither; }

        const qudt_AbstractQuantityKind$j$broader = _qudt_AbstractQuantityKind$j$broaderEither.unsafeCoerce();
        const _qudt_AbstractQuantityKind$j$latexSymbolEither: purify.Either<rdfjsResource.Resource.ValueError, readonly (string)[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/latexSymbol"), { unique: true }).flatMap(_item => _item.toValues().head().chain(_value => _value.toString()).toMaybe().toList())]);
        if (_qudt_AbstractQuantityKind$j$latexSymbolEither.isLeft()) { return _qudt_AbstractQuantityKind$j$latexSymbolEither; }

        const qudt_AbstractQuantityKind$j$latexSymbol = _qudt_AbstractQuantityKind$j$latexSymbolEither.unsafeCoerce();
        const _qudt_AbstractQuantityKind$j$symbolEither: purify.Either<rdfjsResource.Resource.ValueError, purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>> = purify.Either.of(_resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/symbol"), { unique: true }).head().chain(_value => purify.Either.of(_value.toTerm())).toMaybe());
        if (_qudt_AbstractQuantityKind$j$symbolEither.isLeft()) { return _qudt_AbstractQuantityKind$j$symbolEither; }

        const qudt_AbstractQuantityKind$j$symbol = _qudt_AbstractQuantityKind$j$symbolEither.unsafeCoerce();
        return purify.Either.of({ ..._super0, identifier, qudt_AbstractQuantityKind$j$altSymbol, qudt_AbstractQuantityKind$j$broader, qudt_AbstractQuantityKind$j$latexSymbol, qudt_AbstractQuantityKind$j$symbol })
    }

    export function fromRdf(parameters: Parameters<typeof Quantity_Kind$W$$e$abstract$f$._propertiesFromRdf>[0]): purify.Either<rdfjsResource.Resource.ValueError, Quantity_Kind$W$$e$abstract$f$> {
        const { ignoreRdfType: _ignoreRdfType, ...otherParameters } = parameters
        return (Quantity_Kind.fromRdf(otherParameters) as purify.Either<rdfjsResource.Resource.ValueError, Quantity_Kind$W$$e$abstract$f$>).altLazy(() => Quantity_Kind$W$$e$abstract$f$._propertiesFromRdf(parameters).map(properties => new Quantity_Kind$W$$e$abstract$f$(properties)));
    }

    export let fromRdfType: rdfjs.NamedNode<string> = dataFactory.namedNode("http://qudt.org/schema/qudt/AbstractQuantityKind");

    export function jsonSchema() {
        return zodToJsonSchema(quantityKindWEAbstractFJsonZodSchema());
    }

    export function quantityKindWEAbstractFJsonUiSchema(parameters?: { scopePrefix?: string }) {
        const scopePrefix = parameters?.scopePrefix ?? "#";
        return { "elements": [ Verifiable.verifiableJsonUiSchema({ scopePrefix }), { scope: `${scopePrefix}/properties/qudt_AbstractQuantityKind$j$altSymbol`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_AbstractQuantityKind$j$broader`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_AbstractQuantityKind$j$latexSymbol`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_AbstractQuantityKind$j$symbol`, type: "Control" } ], label: "Quantity Kind (abstract)", type: "Group" }
    }

    export function quantityKindWEAbstractFJsonZodSchema() {
        return Verifiable.verifiableJsonZodSchema().merge(zod.object({ "@id": zod.string().min(1),"type": zod.enum(["Quantity_Kind","Quantity_Kind$W$$e$abstract$f$"]),"qudt_AbstractQuantityKind$j$altSymbol": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]).array(),"qudt_AbstractQuantityKind$j$broader": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]).array(),"qudt_AbstractQuantityKind$j$latexSymbol": zod.string().array(),"qudt_AbstractQuantityKind$j$symbol": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]).optional() }));
    }

    export function sparqlConstructQuery(parameters?: { ignoreRdfType?: boolean; prefixes?: { [prefix: string]: string }; subject?: sparqljs.Triple["subject"]; } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "type">): sparqljs.ConstructQuery {
        const { ignoreRdfType, subject, ...queryParameters } = parameters ?? {}

        return { ...queryParameters, prefixes: parameters?.prefixes ?? {}, queryType: "CONSTRUCT", template: (queryParameters.template ?? []).concat(Quantity_Kind$W$$e$abstract$f$.sparqlConstructTemplateTriples({ ignoreRdfType, subject })), type: "query", where: (queryParameters.where ?? []).concat(Quantity_Kind$W$$e$abstract$f$.sparqlWherePatterns({ ignoreRdfType, subject })) };
    }

    export function sparqlConstructQueryString(parameters?: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"]; variablePrefix?: string; } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "type"> & sparqljs.GeneratorOptions): string {
        return new sparqljs.Generator(parameters).stringify(Quantity_Kind$W$$e$abstract$f$.sparqlConstructQuery(parameters));
    }

    export function sparqlConstructTemplateTriples(parameters?: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"], variablePrefix?: string }): readonly sparqljs.Triple[] {
        const subject = parameters?.subject ?? dataFactory.variable!("quantityKindWEAbstractF");
        const variablePrefix = parameters?.variablePrefix ?? (subject.termType === "Variable" ? subject.value : "quantityKindWEAbstractF");
        return [...Verifiable.sparqlConstructTemplateTriples({ ignoreRdfType: true, subject, variablePrefix }), ...(parameters?.ignoreRdfType ? [] : [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.variable!(`${variablePrefix}RdfType`) }]), { object: dataFactory.variable!(`${variablePrefix}QudtAbstractQuantityKindJAltSymbol`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/altSymbol"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtAbstractQuantityKindJBroader`), predicate: dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#broader"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtAbstractQuantityKindJLatexSymbol`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/latexSymbol"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtAbstractQuantityKindJSymbol`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/symbol"), subject }];
    }

    export function sparqlWherePatterns(parameters: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"], variablePrefix?: string }): readonly sparqljs.Pattern[] {
        const subject = parameters?.subject ?? dataFactory.variable!("quantityKindWEAbstractF");
        const variablePrefix = parameters?.variablePrefix ?? (subject.termType === "Variable" ? subject.value : "quantityKindWEAbstractF");
        return [...Verifiable.sparqlWherePatterns({ ignoreRdfType: true, subject, variablePrefix }), ...(parameters?.ignoreRdfType ? [] : [{ triples: [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.namedNode("http://qudt.org/schema/qudt/AbstractQuantityKind") }], type: "bgp" as const }, { triples: [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.variable!(`${variablePrefix}RdfType`) }], type: "bgp" as const }]), { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtAbstractQuantityKindJAltSymbol`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/altSymbol"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtAbstractQuantityKindJBroader`), predicate: dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#broader"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtAbstractQuantityKindJLatexSymbol`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/latexSymbol"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtAbstractQuantityKindJSymbol`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/symbol"), subject }], type: "bgp" }], type: "optional" }];
    }
}
/**
 * Quantity Kind
 */
export class Quantity_Kind extends Quantity_Kind$W$$e$abstract$f$ {
    override readonly type = "Quantity_Kind";
    readonly qudt_QuantityKind$j$applicableCGSUnit: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[];
    readonly qudt_QuantityKind$j$applicableImperialUnit: readonly (Abstract_Unit)[];
    readonly qudt_QuantityKind$j$applicableISOUnit: readonly (Abstract_Unit)[];
    readonly qudt_QuantityKind$j$applicableSIUnit: readonly (Abstract_Unit)[];
    readonly qudt_QuantityKind$j$applicableUnit: readonly (Abstract_Unit)[];
    readonly qudt_QuantityKind$j$applicableUSCustomaryUnit: readonly (Abstract_Unit)[];
    readonly qudt_QuantityKind$j$baseCGSUnitDimensions: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>;
    readonly qudt_QuantityKind$j$baseImperialUnitDimensions: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>;
    readonly qudt_QuantityKind$j$baseISOUnitDimensions: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>;
    readonly qudt_QuantityKind$j$baseSIUnitDimensions: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>;
    readonly qudt_QuantityKind$j$baseUSCustomaryUnitDimensions: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>;
    readonly qudt_QuantityKind$j$belongsToSystemOfQuantities: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[];
    readonly qudt_QuantityKind$j$dimensionVectorForSI: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>;
    readonly qudt_QuantityKind$j$expression: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[];
    readonly qudt_QuantityKind$j$hasDimensionVector: Quantity_Kind$W$Dimension$W$Vector;
    readonly qudt_QuantityKind$j$iec61360Code: readonly (string)[];
    readonly qudt_QuantityKind$j$latexDefinition: purify.Maybe<string>;
    readonly qudt_QuantityKind$j$mathMLdefinition: purify.Maybe<string>;
    readonly qudt_QuantityKind$j$qkdvDenominator: purify.Maybe<Quantity_Kind$W$Dimension$W$Vector>;
    readonly qudt_QuantityKind$j$qkdvNumerator: purify.Maybe<Quantity_Kind$W$Dimension$W$Vector>;
    readonly qudt_QuantityKind$j$siExactMatch: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>;

    constructor(parameters: { readonly identifier?: (rdfjs.BlankNode | rdfjs.NamedNode) | string, readonly qudt_QuantityKind$j$applicableCGSUnit?: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[], readonly qudt_QuantityKind$j$applicableImperialUnit?: readonly (Abstract_Unit)[], readonly qudt_QuantityKind$j$applicableISOUnit?: readonly (Abstract_Unit)[], readonly qudt_QuantityKind$j$applicableSIUnit?: readonly (Abstract_Unit)[], readonly qudt_QuantityKind$j$applicableUnit?: readonly (Abstract_Unit)[], readonly qudt_QuantityKind$j$applicableUSCustomaryUnit?: readonly (Abstract_Unit)[], readonly qudt_QuantityKind$j$baseCGSUnitDimensions?: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal) | Date | boolean | number | purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)> | string, readonly qudt_QuantityKind$j$baseImperialUnitDimensions?: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal) | Date | boolean | number | purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)> | string, readonly qudt_QuantityKind$j$baseISOUnitDimensions?: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal) | Date | boolean | number | purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)> | string, readonly qudt_QuantityKind$j$baseSIUnitDimensions?: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal) | Date | boolean | number | purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)> | string, readonly qudt_QuantityKind$j$baseUSCustomaryUnitDimensions?: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal) | Date | boolean | number | purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)> | string, readonly qudt_QuantityKind$j$belongsToSystemOfQuantities?: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[], readonly qudt_QuantityKind$j$dimensionVectorForSI?: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal) | Date | boolean | number | purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)> | string, readonly qudt_QuantityKind$j$expression?: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[], readonly qudt_QuantityKind$j$hasDimensionVector: Quantity_Kind$W$Dimension$W$Vector, readonly qudt_QuantityKind$j$iec61360Code?: readonly (string)[], readonly qudt_QuantityKind$j$latexDefinition?: purify.Maybe<string> | string, readonly qudt_QuantityKind$j$mathMLdefinition?: purify.Maybe<string> | string, readonly qudt_QuantityKind$j$qkdvDenominator?: Quantity_Kind$W$Dimension$W$Vector | purify.Maybe<Quantity_Kind$W$Dimension$W$Vector>, readonly qudt_QuantityKind$j$qkdvNumerator?: Quantity_Kind$W$Dimension$W$Vector | purify.Maybe<Quantity_Kind$W$Dimension$W$Vector>, readonly qudt_QuantityKind$j$siExactMatch?: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal) | Date | boolean | number | purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)> | string } & ConstructorParameters<typeof Quantity_Kind$W$$e$abstract$f$>[0]) {
        super(parameters);
        if (typeof parameters.qudt_QuantityKind$j$applicableCGSUnit === "undefined") { this.qudt_QuantityKind$j$applicableCGSUnit = []; } else if (Array.isArray(parameters.qudt_QuantityKind$j$applicableCGSUnit)) { this.qudt_QuantityKind$j$applicableCGSUnit = parameters.qudt_QuantityKind$j$applicableCGSUnit; } else { this.qudt_QuantityKind$j$applicableCGSUnit =( parameters.qudt_QuantityKind$j$applicableCGSUnit) as never;
         }

        if (typeof parameters.qudt_QuantityKind$j$applicableImperialUnit === "undefined") { this.qudt_QuantityKind$j$applicableImperialUnit = []; } else if (Array.isArray(parameters.qudt_QuantityKind$j$applicableImperialUnit)) { this.qudt_QuantityKind$j$applicableImperialUnit = parameters.qudt_QuantityKind$j$applicableImperialUnit; } else { this.qudt_QuantityKind$j$applicableImperialUnit =( parameters.qudt_QuantityKind$j$applicableImperialUnit) as never;
         }

        if (typeof parameters.qudt_QuantityKind$j$applicableISOUnit === "undefined") { this.qudt_QuantityKind$j$applicableISOUnit = []; } else if (Array.isArray(parameters.qudt_QuantityKind$j$applicableISOUnit)) { this.qudt_QuantityKind$j$applicableISOUnit = parameters.qudt_QuantityKind$j$applicableISOUnit; } else { this.qudt_QuantityKind$j$applicableISOUnit =( parameters.qudt_QuantityKind$j$applicableISOUnit) as never;
         }

        if (typeof parameters.qudt_QuantityKind$j$applicableSIUnit === "undefined") { this.qudt_QuantityKind$j$applicableSIUnit = []; } else if (Array.isArray(parameters.qudt_QuantityKind$j$applicableSIUnit)) { this.qudt_QuantityKind$j$applicableSIUnit = parameters.qudt_QuantityKind$j$applicableSIUnit; } else { this.qudt_QuantityKind$j$applicableSIUnit =( parameters.qudt_QuantityKind$j$applicableSIUnit) as never;
         }

        if (typeof parameters.qudt_QuantityKind$j$applicableUnit === "undefined") { this.qudt_QuantityKind$j$applicableUnit = []; } else if (Array.isArray(parameters.qudt_QuantityKind$j$applicableUnit)) { this.qudt_QuantityKind$j$applicableUnit = parameters.qudt_QuantityKind$j$applicableUnit; } else { this.qudt_QuantityKind$j$applicableUnit =( parameters.qudt_QuantityKind$j$applicableUnit) as never;
         }

        if (typeof parameters.qudt_QuantityKind$j$applicableUSCustomaryUnit === "undefined") { this.qudt_QuantityKind$j$applicableUSCustomaryUnit = []; } else if (Array.isArray(parameters.qudt_QuantityKind$j$applicableUSCustomaryUnit)) { this.qudt_QuantityKind$j$applicableUSCustomaryUnit = parameters.qudt_QuantityKind$j$applicableUSCustomaryUnit; } else { this.qudt_QuantityKind$j$applicableUSCustomaryUnit =( parameters.qudt_QuantityKind$j$applicableUSCustomaryUnit) as never;
         }

        if (purify.Maybe.isMaybe(parameters.qudt_QuantityKind$j$baseCGSUnitDimensions)) { this.qudt_QuantityKind$j$baseCGSUnitDimensions = parameters.qudt_QuantityKind$j$baseCGSUnitDimensions; } else if (typeof parameters.qudt_QuantityKind$j$baseCGSUnitDimensions === "boolean") { this.qudt_QuantityKind$j$baseCGSUnitDimensions = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_QuantityKind$j$baseCGSUnitDimensions, { dataFactory })); } else if (typeof parameters.qudt_QuantityKind$j$baseCGSUnitDimensions === "object" && parameters.qudt_QuantityKind$j$baseCGSUnitDimensions instanceof Date) { this.qudt_QuantityKind$j$baseCGSUnitDimensions = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_QuantityKind$j$baseCGSUnitDimensions, { dataFactory })); } else if (typeof parameters.qudt_QuantityKind$j$baseCGSUnitDimensions === "number") { this.qudt_QuantityKind$j$baseCGSUnitDimensions = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_QuantityKind$j$baseCGSUnitDimensions, { dataFactory })); } else if (typeof parameters.qudt_QuantityKind$j$baseCGSUnitDimensions === "string") { this.qudt_QuantityKind$j$baseCGSUnitDimensions = purify.Maybe.of(dataFactory.literal(parameters.qudt_QuantityKind$j$baseCGSUnitDimensions)); } else if (typeof parameters.qudt_QuantityKind$j$baseCGSUnitDimensions === "object") { this.qudt_QuantityKind$j$baseCGSUnitDimensions = purify.Maybe.of(parameters.qudt_QuantityKind$j$baseCGSUnitDimensions); } else if (typeof parameters.qudt_QuantityKind$j$baseCGSUnitDimensions === "undefined") { this.qudt_QuantityKind$j$baseCGSUnitDimensions = purify.Maybe.empty(); } else { this.qudt_QuantityKind$j$baseCGSUnitDimensions =( parameters.qudt_QuantityKind$j$baseCGSUnitDimensions) as never;
         }

        if (purify.Maybe.isMaybe(parameters.qudt_QuantityKind$j$baseImperialUnitDimensions)) { this.qudt_QuantityKind$j$baseImperialUnitDimensions = parameters.qudt_QuantityKind$j$baseImperialUnitDimensions; } else if (typeof parameters.qudt_QuantityKind$j$baseImperialUnitDimensions === "boolean") { this.qudt_QuantityKind$j$baseImperialUnitDimensions = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_QuantityKind$j$baseImperialUnitDimensions, { dataFactory })); } else if (typeof parameters.qudt_QuantityKind$j$baseImperialUnitDimensions === "object" && parameters.qudt_QuantityKind$j$baseImperialUnitDimensions instanceof Date) { this.qudt_QuantityKind$j$baseImperialUnitDimensions = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_QuantityKind$j$baseImperialUnitDimensions, { dataFactory })); } else if (typeof parameters.qudt_QuantityKind$j$baseImperialUnitDimensions === "number") { this.qudt_QuantityKind$j$baseImperialUnitDimensions = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_QuantityKind$j$baseImperialUnitDimensions, { dataFactory })); } else if (typeof parameters.qudt_QuantityKind$j$baseImperialUnitDimensions === "string") { this.qudt_QuantityKind$j$baseImperialUnitDimensions = purify.Maybe.of(dataFactory.literal(parameters.qudt_QuantityKind$j$baseImperialUnitDimensions)); } else if (typeof parameters.qudt_QuantityKind$j$baseImperialUnitDimensions === "object") { this.qudt_QuantityKind$j$baseImperialUnitDimensions = purify.Maybe.of(parameters.qudt_QuantityKind$j$baseImperialUnitDimensions); } else if (typeof parameters.qudt_QuantityKind$j$baseImperialUnitDimensions === "undefined") { this.qudt_QuantityKind$j$baseImperialUnitDimensions = purify.Maybe.empty(); } else { this.qudt_QuantityKind$j$baseImperialUnitDimensions =( parameters.qudt_QuantityKind$j$baseImperialUnitDimensions) as never;
         }

        if (purify.Maybe.isMaybe(parameters.qudt_QuantityKind$j$baseISOUnitDimensions)) { this.qudt_QuantityKind$j$baseISOUnitDimensions = parameters.qudt_QuantityKind$j$baseISOUnitDimensions; } else if (typeof parameters.qudt_QuantityKind$j$baseISOUnitDimensions === "boolean") { this.qudt_QuantityKind$j$baseISOUnitDimensions = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_QuantityKind$j$baseISOUnitDimensions, { dataFactory })); } else if (typeof parameters.qudt_QuantityKind$j$baseISOUnitDimensions === "object" && parameters.qudt_QuantityKind$j$baseISOUnitDimensions instanceof Date) { this.qudt_QuantityKind$j$baseISOUnitDimensions = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_QuantityKind$j$baseISOUnitDimensions, { dataFactory })); } else if (typeof parameters.qudt_QuantityKind$j$baseISOUnitDimensions === "number") { this.qudt_QuantityKind$j$baseISOUnitDimensions = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_QuantityKind$j$baseISOUnitDimensions, { dataFactory })); } else if (typeof parameters.qudt_QuantityKind$j$baseISOUnitDimensions === "string") { this.qudt_QuantityKind$j$baseISOUnitDimensions = purify.Maybe.of(dataFactory.literal(parameters.qudt_QuantityKind$j$baseISOUnitDimensions)); } else if (typeof parameters.qudt_QuantityKind$j$baseISOUnitDimensions === "object") { this.qudt_QuantityKind$j$baseISOUnitDimensions = purify.Maybe.of(parameters.qudt_QuantityKind$j$baseISOUnitDimensions); } else if (typeof parameters.qudt_QuantityKind$j$baseISOUnitDimensions === "undefined") { this.qudt_QuantityKind$j$baseISOUnitDimensions = purify.Maybe.empty(); } else { this.qudt_QuantityKind$j$baseISOUnitDimensions =( parameters.qudt_QuantityKind$j$baseISOUnitDimensions) as never;
         }

        if (purify.Maybe.isMaybe(parameters.qudt_QuantityKind$j$baseSIUnitDimensions)) { this.qudt_QuantityKind$j$baseSIUnitDimensions = parameters.qudt_QuantityKind$j$baseSIUnitDimensions; } else if (typeof parameters.qudt_QuantityKind$j$baseSIUnitDimensions === "boolean") { this.qudt_QuantityKind$j$baseSIUnitDimensions = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_QuantityKind$j$baseSIUnitDimensions, { dataFactory })); } else if (typeof parameters.qudt_QuantityKind$j$baseSIUnitDimensions === "object" && parameters.qudt_QuantityKind$j$baseSIUnitDimensions instanceof Date) { this.qudt_QuantityKind$j$baseSIUnitDimensions = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_QuantityKind$j$baseSIUnitDimensions, { dataFactory })); } else if (typeof parameters.qudt_QuantityKind$j$baseSIUnitDimensions === "number") { this.qudt_QuantityKind$j$baseSIUnitDimensions = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_QuantityKind$j$baseSIUnitDimensions, { dataFactory })); } else if (typeof parameters.qudt_QuantityKind$j$baseSIUnitDimensions === "string") { this.qudt_QuantityKind$j$baseSIUnitDimensions = purify.Maybe.of(dataFactory.literal(parameters.qudt_QuantityKind$j$baseSIUnitDimensions)); } else if (typeof parameters.qudt_QuantityKind$j$baseSIUnitDimensions === "object") { this.qudt_QuantityKind$j$baseSIUnitDimensions = purify.Maybe.of(parameters.qudt_QuantityKind$j$baseSIUnitDimensions); } else if (typeof parameters.qudt_QuantityKind$j$baseSIUnitDimensions === "undefined") { this.qudt_QuantityKind$j$baseSIUnitDimensions = purify.Maybe.empty(); } else { this.qudt_QuantityKind$j$baseSIUnitDimensions =( parameters.qudt_QuantityKind$j$baseSIUnitDimensions) as never;
         }

        if (purify.Maybe.isMaybe(parameters.qudt_QuantityKind$j$baseUSCustomaryUnitDimensions)) { this.qudt_QuantityKind$j$baseUSCustomaryUnitDimensions = parameters.qudt_QuantityKind$j$baseUSCustomaryUnitDimensions; } else if (typeof parameters.qudt_QuantityKind$j$baseUSCustomaryUnitDimensions === "boolean") { this.qudt_QuantityKind$j$baseUSCustomaryUnitDimensions = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_QuantityKind$j$baseUSCustomaryUnitDimensions, { dataFactory })); } else if (typeof parameters.qudt_QuantityKind$j$baseUSCustomaryUnitDimensions === "object" && parameters.qudt_QuantityKind$j$baseUSCustomaryUnitDimensions instanceof Date) { this.qudt_QuantityKind$j$baseUSCustomaryUnitDimensions = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_QuantityKind$j$baseUSCustomaryUnitDimensions, { dataFactory })); } else if (typeof parameters.qudt_QuantityKind$j$baseUSCustomaryUnitDimensions === "number") { this.qudt_QuantityKind$j$baseUSCustomaryUnitDimensions = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_QuantityKind$j$baseUSCustomaryUnitDimensions, { dataFactory })); } else if (typeof parameters.qudt_QuantityKind$j$baseUSCustomaryUnitDimensions === "string") { this.qudt_QuantityKind$j$baseUSCustomaryUnitDimensions = purify.Maybe.of(dataFactory.literal(parameters.qudt_QuantityKind$j$baseUSCustomaryUnitDimensions)); } else if (typeof parameters.qudt_QuantityKind$j$baseUSCustomaryUnitDimensions === "object") { this.qudt_QuantityKind$j$baseUSCustomaryUnitDimensions = purify.Maybe.of(parameters.qudt_QuantityKind$j$baseUSCustomaryUnitDimensions); } else if (typeof parameters.qudt_QuantityKind$j$baseUSCustomaryUnitDimensions === "undefined") { this.qudt_QuantityKind$j$baseUSCustomaryUnitDimensions = purify.Maybe.empty(); } else { this.qudt_QuantityKind$j$baseUSCustomaryUnitDimensions =( parameters.qudt_QuantityKind$j$baseUSCustomaryUnitDimensions) as never;
         }

        if (typeof parameters.qudt_QuantityKind$j$belongsToSystemOfQuantities === "undefined") { this.qudt_QuantityKind$j$belongsToSystemOfQuantities = []; } else if (Array.isArray(parameters.qudt_QuantityKind$j$belongsToSystemOfQuantities)) { this.qudt_QuantityKind$j$belongsToSystemOfQuantities = parameters.qudt_QuantityKind$j$belongsToSystemOfQuantities; } else { this.qudt_QuantityKind$j$belongsToSystemOfQuantities =( parameters.qudt_QuantityKind$j$belongsToSystemOfQuantities) as never;
         }

        if (purify.Maybe.isMaybe(parameters.qudt_QuantityKind$j$dimensionVectorForSI)) { this.qudt_QuantityKind$j$dimensionVectorForSI = parameters.qudt_QuantityKind$j$dimensionVectorForSI; } else if (typeof parameters.qudt_QuantityKind$j$dimensionVectorForSI === "boolean") { this.qudt_QuantityKind$j$dimensionVectorForSI = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_QuantityKind$j$dimensionVectorForSI, { dataFactory })); } else if (typeof parameters.qudt_QuantityKind$j$dimensionVectorForSI === "object" && parameters.qudt_QuantityKind$j$dimensionVectorForSI instanceof Date) { this.qudt_QuantityKind$j$dimensionVectorForSI = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_QuantityKind$j$dimensionVectorForSI, { dataFactory })); } else if (typeof parameters.qudt_QuantityKind$j$dimensionVectorForSI === "number") { this.qudt_QuantityKind$j$dimensionVectorForSI = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_QuantityKind$j$dimensionVectorForSI, { dataFactory })); } else if (typeof parameters.qudt_QuantityKind$j$dimensionVectorForSI === "string") { this.qudt_QuantityKind$j$dimensionVectorForSI = purify.Maybe.of(dataFactory.literal(parameters.qudt_QuantityKind$j$dimensionVectorForSI)); } else if (typeof parameters.qudt_QuantityKind$j$dimensionVectorForSI === "object") { this.qudt_QuantityKind$j$dimensionVectorForSI = purify.Maybe.of(parameters.qudt_QuantityKind$j$dimensionVectorForSI); } else if (typeof parameters.qudt_QuantityKind$j$dimensionVectorForSI === "undefined") { this.qudt_QuantityKind$j$dimensionVectorForSI = purify.Maybe.empty(); } else { this.qudt_QuantityKind$j$dimensionVectorForSI =( parameters.qudt_QuantityKind$j$dimensionVectorForSI) as never;
         }

        if (typeof parameters.qudt_QuantityKind$j$expression === "undefined") { this.qudt_QuantityKind$j$expression = []; } else if (Array.isArray(parameters.qudt_QuantityKind$j$expression)) { this.qudt_QuantityKind$j$expression = parameters.qudt_QuantityKind$j$expression; } else { this.qudt_QuantityKind$j$expression =( parameters.qudt_QuantityKind$j$expression) as never;
         }

        this.qudt_QuantityKind$j$hasDimensionVector = parameters.qudt_QuantityKind$j$hasDimensionVector;
        if (typeof parameters.qudt_QuantityKind$j$iec61360Code === "undefined") { this.qudt_QuantityKind$j$iec61360Code = []; } else if (Array.isArray(parameters.qudt_QuantityKind$j$iec61360Code)) { this.qudt_QuantityKind$j$iec61360Code = parameters.qudt_QuantityKind$j$iec61360Code; } else { this.qudt_QuantityKind$j$iec61360Code =( parameters.qudt_QuantityKind$j$iec61360Code) as never;
         }

        if (purify.Maybe.isMaybe(parameters.qudt_QuantityKind$j$latexDefinition)) { this.qudt_QuantityKind$j$latexDefinition = parameters.qudt_QuantityKind$j$latexDefinition; } else if (typeof parameters.qudt_QuantityKind$j$latexDefinition === "string") { this.qudt_QuantityKind$j$latexDefinition = purify.Maybe.of(parameters.qudt_QuantityKind$j$latexDefinition); } else if (typeof parameters.qudt_QuantityKind$j$latexDefinition === "undefined") { this.qudt_QuantityKind$j$latexDefinition = purify.Maybe.empty(); } else { this.qudt_QuantityKind$j$latexDefinition =( parameters.qudt_QuantityKind$j$latexDefinition) as never;
         }

        if (purify.Maybe.isMaybe(parameters.qudt_QuantityKind$j$mathMLdefinition)) { this.qudt_QuantityKind$j$mathMLdefinition = parameters.qudt_QuantityKind$j$mathMLdefinition; } else if (typeof parameters.qudt_QuantityKind$j$mathMLdefinition === "string") { this.qudt_QuantityKind$j$mathMLdefinition = purify.Maybe.of(parameters.qudt_QuantityKind$j$mathMLdefinition); } else if (typeof parameters.qudt_QuantityKind$j$mathMLdefinition === "undefined") { this.qudt_QuantityKind$j$mathMLdefinition = purify.Maybe.empty(); } else { this.qudt_QuantityKind$j$mathMLdefinition =( parameters.qudt_QuantityKind$j$mathMLdefinition) as never;
         }

        if (purify.Maybe.isMaybe(parameters.qudt_QuantityKind$j$qkdvDenominator)) { this.qudt_QuantityKind$j$qkdvDenominator = parameters.qudt_QuantityKind$j$qkdvDenominator; } else if (typeof parameters.qudt_QuantityKind$j$qkdvDenominator === "object" && parameters.qudt_QuantityKind$j$qkdvDenominator instanceof Quantity_Kind$W$Dimension$W$Vector) { this.qudt_QuantityKind$j$qkdvDenominator = purify.Maybe.of(parameters.qudt_QuantityKind$j$qkdvDenominator); } else if (typeof parameters.qudt_QuantityKind$j$qkdvDenominator === "undefined") { this.qudt_QuantityKind$j$qkdvDenominator = purify.Maybe.empty(); } else { this.qudt_QuantityKind$j$qkdvDenominator =( parameters.qudt_QuantityKind$j$qkdvDenominator) as never;
         }

        if (purify.Maybe.isMaybe(parameters.qudt_QuantityKind$j$qkdvNumerator)) { this.qudt_QuantityKind$j$qkdvNumerator = parameters.qudt_QuantityKind$j$qkdvNumerator; } else if (typeof parameters.qudt_QuantityKind$j$qkdvNumerator === "object" && parameters.qudt_QuantityKind$j$qkdvNumerator instanceof Quantity_Kind$W$Dimension$W$Vector) { this.qudt_QuantityKind$j$qkdvNumerator = purify.Maybe.of(parameters.qudt_QuantityKind$j$qkdvNumerator); } else if (typeof parameters.qudt_QuantityKind$j$qkdvNumerator === "undefined") { this.qudt_QuantityKind$j$qkdvNumerator = purify.Maybe.empty(); } else { this.qudt_QuantityKind$j$qkdvNumerator =( parameters.qudt_QuantityKind$j$qkdvNumerator) as never;
         }

        if (purify.Maybe.isMaybe(parameters.qudt_QuantityKind$j$siExactMatch)) { this.qudt_QuantityKind$j$siExactMatch = parameters.qudt_QuantityKind$j$siExactMatch; } else if (typeof parameters.qudt_QuantityKind$j$siExactMatch === "boolean") { this.qudt_QuantityKind$j$siExactMatch = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_QuantityKind$j$siExactMatch, { dataFactory })); } else if (typeof parameters.qudt_QuantityKind$j$siExactMatch === "object" && parameters.qudt_QuantityKind$j$siExactMatch instanceof Date) { this.qudt_QuantityKind$j$siExactMatch = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_QuantityKind$j$siExactMatch, { dataFactory })); } else if (typeof parameters.qudt_QuantityKind$j$siExactMatch === "number") { this.qudt_QuantityKind$j$siExactMatch = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_QuantityKind$j$siExactMatch, { dataFactory })); } else if (typeof parameters.qudt_QuantityKind$j$siExactMatch === "string") { this.qudt_QuantityKind$j$siExactMatch = purify.Maybe.of(dataFactory.literal(parameters.qudt_QuantityKind$j$siExactMatch)); } else if (typeof parameters.qudt_QuantityKind$j$siExactMatch === "object") { this.qudt_QuantityKind$j$siExactMatch = purify.Maybe.of(parameters.qudt_QuantityKind$j$siExactMatch); } else if (typeof parameters.qudt_QuantityKind$j$siExactMatch === "undefined") { this.qudt_QuantityKind$j$siExactMatch = purify.Maybe.empty(); } else { this.qudt_QuantityKind$j$siExactMatch =( parameters.qudt_QuantityKind$j$siExactMatch) as never;
         }
    }

    override get identifier(): (rdfjs.BlankNode | rdfjs.NamedNode) {
        if (typeof this._identifier === "undefined") { this._identifier = dataFactory.blankNode(); } return this._identifier;
    }

    override equals(other: Quantity_Kind): EqualsResult {
        return super.equals(other).chain(() => (((left, right) => arrayEquals(left, right, booleanEquals)))(this.qudt_QuantityKind$j$applicableCGSUnit, other.qudt_QuantityKind$j$applicableCGSUnit).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKind$j$applicableCGSUnit", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, ((left, right) => left.equals(right)))))(this.qudt_QuantityKind$j$applicableImperialUnit, other.qudt_QuantityKind$j$applicableImperialUnit).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKind$j$applicableImperialUnit", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, ((left, right) => left.equals(right)))))(this.qudt_QuantityKind$j$applicableISOUnit, other.qudt_QuantityKind$j$applicableISOUnit).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKind$j$applicableISOUnit", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, ((left, right) => left.equals(right)))))(this.qudt_QuantityKind$j$applicableSIUnit, other.qudt_QuantityKind$j$applicableSIUnit).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKind$j$applicableSIUnit", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, ((left, right) => left.equals(right)))))(this.qudt_QuantityKind$j$applicableUnit, other.qudt_QuantityKind$j$applicableUnit).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKind$j$applicableUnit", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, ((left, right) => left.equals(right)))))(this.qudt_QuantityKind$j$applicableUSCustomaryUnit, other.qudt_QuantityKind$j$applicableUSCustomaryUnit).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKind$j$applicableUSCustomaryUnit", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => maybeEquals(left, right, booleanEquals)))(this.qudt_QuantityKind$j$baseCGSUnitDimensions, other.qudt_QuantityKind$j$baseCGSUnitDimensions).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKind$j$baseCGSUnitDimensions", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => maybeEquals(left, right, booleanEquals)))(this.qudt_QuantityKind$j$baseImperialUnitDimensions, other.qudt_QuantityKind$j$baseImperialUnitDimensions).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKind$j$baseImperialUnitDimensions", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => maybeEquals(left, right, booleanEquals)))(this.qudt_QuantityKind$j$baseISOUnitDimensions, other.qudt_QuantityKind$j$baseISOUnitDimensions).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKind$j$baseISOUnitDimensions", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => maybeEquals(left, right, booleanEquals)))(this.qudt_QuantityKind$j$baseSIUnitDimensions, other.qudt_QuantityKind$j$baseSIUnitDimensions).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKind$j$baseSIUnitDimensions", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => maybeEquals(left, right, booleanEquals)))(this.qudt_QuantityKind$j$baseUSCustomaryUnitDimensions, other.qudt_QuantityKind$j$baseUSCustomaryUnitDimensions).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKind$j$baseUSCustomaryUnitDimensions", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, booleanEquals)))(this.qudt_QuantityKind$j$belongsToSystemOfQuantities, other.qudt_QuantityKind$j$belongsToSystemOfQuantities).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKind$j$belongsToSystemOfQuantities", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => maybeEquals(left, right, booleanEquals)))(this.qudt_QuantityKind$j$dimensionVectorForSI, other.qudt_QuantityKind$j$dimensionVectorForSI).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKind$j$dimensionVectorForSI", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, booleanEquals)))(this.qudt_QuantityKind$j$expression, other.qudt_QuantityKind$j$expression).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKind$j$expression", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => left.equals(right)))(this.qudt_QuantityKind$j$hasDimensionVector, other.qudt_QuantityKind$j$hasDimensionVector).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKind$j$hasDimensionVector", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, strictEquals)))(this.qudt_QuantityKind$j$iec61360Code, other.qudt_QuantityKind$j$iec61360Code).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKind$j$iec61360Code", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => maybeEquals(left, right, strictEquals)))(this.qudt_QuantityKind$j$latexDefinition, other.qudt_QuantityKind$j$latexDefinition).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKind$j$latexDefinition", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => maybeEquals(left, right, strictEquals)))(this.qudt_QuantityKind$j$mathMLdefinition, other.qudt_QuantityKind$j$mathMLdefinition).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKind$j$mathMLdefinition", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => maybeEquals(left, right, ((left, right) => left.equals(right)))))(this.qudt_QuantityKind$j$qkdvDenominator, other.qudt_QuantityKind$j$qkdvDenominator).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKind$j$qkdvDenominator", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => maybeEquals(left, right, ((left, right) => left.equals(right)))))(this.qudt_QuantityKind$j$qkdvNumerator, other.qudt_QuantityKind$j$qkdvNumerator).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKind$j$qkdvNumerator", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => maybeEquals(left, right, booleanEquals)))(this.qudt_QuantityKind$j$siExactMatch, other.qudt_QuantityKind$j$siExactMatch).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_QuantityKind$j$siExactMatch", propertyValuesUnequal, type: "Property" as const })));
    }

    override hash<HasherT extends { update: (message: string | number[] | ArrayBuffer | Uint8Array) => void; }>(_hasher: HasherT): HasherT {
        this.hashShaclProperties(_hasher);
        return _hasher;
    }

    protected override hashShaclProperties<HasherT extends { update: (message: string | number[] | ArrayBuffer | Uint8Array) => void; }>(_hasher: HasherT): HasherT {
        super.hashShaclProperties(_hasher);
        for (const _item0 of this.qudt_QuantityKind$j$applicableCGSUnit) { _hasher.update(_item0.termType);
        _hasher.update(_item0.value); }

        for (const _item0 of this.qudt_QuantityKind$j$applicableImperialUnit) { _item0.hash(_hasher); }

        for (const _item0 of this.qudt_QuantityKind$j$applicableISOUnit) { _item0.hash(_hasher); }

        for (const _item0 of this.qudt_QuantityKind$j$applicableSIUnit) { _item0.hash(_hasher); }

        for (const _item0 of this.qudt_QuantityKind$j$applicableUnit) { _item0.hash(_hasher); }

        for (const _item0 of this.qudt_QuantityKind$j$applicableUSCustomaryUnit) { _item0.hash(_hasher); }

        this.qudt_QuantityKind$j$baseCGSUnitDimensions.ifJust((_value0) => { _hasher.update(_value0.termType);
        _hasher.update(_value0.value); })
        this.qudt_QuantityKind$j$baseImperialUnitDimensions.ifJust((_value0) => { _hasher.update(_value0.termType);
        _hasher.update(_value0.value); })
        this.qudt_QuantityKind$j$baseISOUnitDimensions.ifJust((_value0) => { _hasher.update(_value0.termType);
        _hasher.update(_value0.value); })
        this.qudt_QuantityKind$j$baseSIUnitDimensions.ifJust((_value0) => { _hasher.update(_value0.termType);
        _hasher.update(_value0.value); })
        this.qudt_QuantityKind$j$baseUSCustomaryUnitDimensions.ifJust((_value0) => { _hasher.update(_value0.termType);
        _hasher.update(_value0.value); })
        for (const _item0 of this.qudt_QuantityKind$j$belongsToSystemOfQuantities) { _hasher.update(_item0.termType);
        _hasher.update(_item0.value); }

        this.qudt_QuantityKind$j$dimensionVectorForSI.ifJust((_value0) => { _hasher.update(_value0.termType);
        _hasher.update(_value0.value); })
        for (const _item0 of this.qudt_QuantityKind$j$expression) { _hasher.update(_item0.termType);
        _hasher.update(_item0.value); }

        this.qudt_QuantityKind$j$hasDimensionVector.hash(_hasher);
        for (const _item0 of this.qudt_QuantityKind$j$iec61360Code) { _hasher.update(_item0); }

        this.qudt_QuantityKind$j$latexDefinition.ifJust((_value0) => { _hasher.update(_value0); })
        this.qudt_QuantityKind$j$mathMLdefinition.ifJust((_value0) => { _hasher.update(_value0); })
        this.qudt_QuantityKind$j$qkdvDenominator.ifJust((_value0) => { _value0.hash(_hasher); })
        this.qudt_QuantityKind$j$qkdvNumerator.ifJust((_value0) => { _value0.hash(_hasher); })
        this.qudt_QuantityKind$j$siExactMatch.ifJust((_value0) => { _hasher.update(_value0.termType);
        _hasher.update(_value0.value); })
        return _hasher;
    }

    override toJson(): { readonly "qudt_QuantityKind$j$applicableCGSUnit": readonly ({ readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" })[]; readonly "qudt_QuantityKind$j$applicableImperialUnit": readonly (ReturnType<Abstract_Unit["toJson"]>)[]; readonly "qudt_QuantityKind$j$applicableISOUnit": readonly (ReturnType<Abstract_Unit["toJson"]>)[]; readonly "qudt_QuantityKind$j$applicableSIUnit": readonly (ReturnType<Abstract_Unit["toJson"]>)[]; readonly "qudt_QuantityKind$j$applicableUnit": readonly (ReturnType<Abstract_Unit["toJson"]>)[]; readonly "qudt_QuantityKind$j$applicableUSCustomaryUnit": readonly (ReturnType<Abstract_Unit["toJson"]>)[]; readonly "qudt_QuantityKind$j$baseCGSUnitDimensions": ({ readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" }) | undefined; readonly "qudt_QuantityKind$j$baseImperialUnitDimensions": ({ readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" }) | undefined; readonly "qudt_QuantityKind$j$baseISOUnitDimensions": ({ readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" }) | undefined; readonly "qudt_QuantityKind$j$baseSIUnitDimensions": ({ readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" }) | undefined; readonly "qudt_QuantityKind$j$baseUSCustomaryUnitDimensions": ({ readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" }) | undefined; readonly "qudt_QuantityKind$j$belongsToSystemOfQuantities": readonly ({ readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" })[]; readonly "qudt_QuantityKind$j$dimensionVectorForSI": ({ readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" }) | undefined; readonly "qudt_QuantityKind$j$expression": readonly ({ readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" })[]; readonly "qudt_QuantityKind$j$hasDimensionVector": ReturnType<Quantity_Kind$W$Dimension$W$Vector["toJson"]>; readonly "qudt_QuantityKind$j$iec61360Code": readonly (string)[]; readonly "qudt_QuantityKind$j$latexDefinition": (string) | undefined; readonly "qudt_QuantityKind$j$mathMLdefinition": (string) | undefined; readonly "qudt_QuantityKind$j$qkdvDenominator": (ReturnType<Quantity_Kind$W$Dimension$W$Vector["toJson"]>) | undefined; readonly "qudt_QuantityKind$j$qkdvNumerator": (ReturnType<Quantity_Kind$W$Dimension$W$Vector["toJson"]>) | undefined; readonly "qudt_QuantityKind$j$siExactMatch": ({ readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" }) | undefined } & ReturnType<Quantity_Kind$W$$e$abstract$f$["toJson"]> {
        return JSON.parse(JSON.stringify({ ...super.toJson(),qudt_QuantityKind$j$applicableCGSUnit: this.qudt_QuantityKind$j$applicableCGSUnit.map(_item => ((_item.termType === "Literal") ? { "@language": _item.language.length > 0 ? _item.language : undefined, "@type": _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? _item.datatype.value : undefined, "@value": _item.value, termType: "Literal" as const } : (_item.termType === "NamedNode") ? { "@id": _item.value, termType: "NamedNode" as const } : { "@id": `_:${_item.value}`, termType: "BlankNode" as const })),qudt_QuantityKind$j$applicableImperialUnit: this.qudt_QuantityKind$j$applicableImperialUnit.map(_item => (_item.toJson())),qudt_QuantityKind$j$applicableISOUnit: this.qudt_QuantityKind$j$applicableISOUnit.map(_item => (_item.toJson())),qudt_QuantityKind$j$applicableSIUnit: this.qudt_QuantityKind$j$applicableSIUnit.map(_item => (_item.toJson())),qudt_QuantityKind$j$applicableUnit: this.qudt_QuantityKind$j$applicableUnit.map(_item => (_item.toJson())),qudt_QuantityKind$j$applicableUSCustomaryUnit: this.qudt_QuantityKind$j$applicableUSCustomaryUnit.map(_item => (_item.toJson())),qudt_QuantityKind$j$baseCGSUnitDimensions: this.qudt_QuantityKind$j$baseCGSUnitDimensions.map(_item => ((_item.termType === "Literal") ? { "@language": _item.language.length > 0 ? _item.language : undefined, "@type": _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? _item.datatype.value : undefined, "@value": _item.value, termType: "Literal" as const } : (_item.termType === "NamedNode") ? { "@id": _item.value, termType: "NamedNode" as const } : { "@id": `_:${_item.value}`, termType: "BlankNode" as const })).extract(),qudt_QuantityKind$j$baseImperialUnitDimensions: this.qudt_QuantityKind$j$baseImperialUnitDimensions.map(_item => ((_item.termType === "Literal") ? { "@language": _item.language.length > 0 ? _item.language : undefined, "@type": _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? _item.datatype.value : undefined, "@value": _item.value, termType: "Literal" as const } : (_item.termType === "NamedNode") ? { "@id": _item.value, termType: "NamedNode" as const } : { "@id": `_:${_item.value}`, termType: "BlankNode" as const })).extract(),qudt_QuantityKind$j$baseISOUnitDimensions: this.qudt_QuantityKind$j$baseISOUnitDimensions.map(_item => ((_item.termType === "Literal") ? { "@language": _item.language.length > 0 ? _item.language : undefined, "@type": _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? _item.datatype.value : undefined, "@value": _item.value, termType: "Literal" as const } : (_item.termType === "NamedNode") ? { "@id": _item.value, termType: "NamedNode" as const } : { "@id": `_:${_item.value}`, termType: "BlankNode" as const })).extract(),qudt_QuantityKind$j$baseSIUnitDimensions: this.qudt_QuantityKind$j$baseSIUnitDimensions.map(_item => ((_item.termType === "Literal") ? { "@language": _item.language.length > 0 ? _item.language : undefined, "@type": _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? _item.datatype.value : undefined, "@value": _item.value, termType: "Literal" as const } : (_item.termType === "NamedNode") ? { "@id": _item.value, termType: "NamedNode" as const } : { "@id": `_:${_item.value}`, termType: "BlankNode" as const })).extract(),qudt_QuantityKind$j$baseUSCustomaryUnitDimensions: this.qudt_QuantityKind$j$baseUSCustomaryUnitDimensions.map(_item => ((_item.termType === "Literal") ? { "@language": _item.language.length > 0 ? _item.language : undefined, "@type": _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? _item.datatype.value : undefined, "@value": _item.value, termType: "Literal" as const } : (_item.termType === "NamedNode") ? { "@id": _item.value, termType: "NamedNode" as const } : { "@id": `_:${_item.value}`, termType: "BlankNode" as const })).extract(),qudt_QuantityKind$j$belongsToSystemOfQuantities: this.qudt_QuantityKind$j$belongsToSystemOfQuantities.map(_item => ((_item.termType === "Literal") ? { "@language": _item.language.length > 0 ? _item.language : undefined, "@type": _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? _item.datatype.value : undefined, "@value": _item.value, termType: "Literal" as const } : (_item.termType === "NamedNode") ? { "@id": _item.value, termType: "NamedNode" as const } : { "@id": `_:${_item.value}`, termType: "BlankNode" as const })),qudt_QuantityKind$j$dimensionVectorForSI: this.qudt_QuantityKind$j$dimensionVectorForSI.map(_item => ((_item.termType === "Literal") ? { "@language": _item.language.length > 0 ? _item.language : undefined, "@type": _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? _item.datatype.value : undefined, "@value": _item.value, termType: "Literal" as const } : (_item.termType === "NamedNode") ? { "@id": _item.value, termType: "NamedNode" as const } : { "@id": `_:${_item.value}`, termType: "BlankNode" as const })).extract(),qudt_QuantityKind$j$expression: this.qudt_QuantityKind$j$expression.map(_item => ((_item.termType === "Literal") ? { "@language": _item.language.length > 0 ? _item.language : undefined, "@type": _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? _item.datatype.value : undefined, "@value": _item.value, termType: "Literal" as const } : (_item.termType === "NamedNode") ? { "@id": _item.value, termType: "NamedNode" as const } : { "@id": `_:${_item.value}`, termType: "BlankNode" as const })),qudt_QuantityKind$j$hasDimensionVector: this.qudt_QuantityKind$j$hasDimensionVector.toJson(),qudt_QuantityKind$j$iec61360Code: this.qudt_QuantityKind$j$iec61360Code.map(_item => (_item)),qudt_QuantityKind$j$latexDefinition: this.qudt_QuantityKind$j$latexDefinition.map(_item => (_item)).extract(),qudt_QuantityKind$j$mathMLdefinition: this.qudt_QuantityKind$j$mathMLdefinition.map(_item => (_item)).extract(),qudt_QuantityKind$j$qkdvDenominator: this.qudt_QuantityKind$j$qkdvDenominator.map(_item => (_item.toJson())).extract(),qudt_QuantityKind$j$qkdvNumerator: this.qudt_QuantityKind$j$qkdvNumerator.map(_item => (_item.toJson())).extract(),qudt_QuantityKind$j$siExactMatch: this.qudt_QuantityKind$j$siExactMatch.map(_item => ((_item.termType === "Literal") ? { "@language": _item.language.length > 0 ? _item.language : undefined, "@type": _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? _item.datatype.value : undefined, "@value": _item.value, termType: "Literal" as const } : (_item.termType === "NamedNode") ? { "@id": _item.value, termType: "NamedNode" as const } : { "@id": `_:${_item.value}`, termType: "BlankNode" as const })).extract() } satisfies ReturnType<Quantity_Kind["toJson"]>));
    }

    override toRdf({ ignoreRdfType, mutateGraph, resourceSet }: { ignoreRdfType?: boolean; mutateGraph?: rdfjsResource.MutableResource.MutateGraph, resourceSet: rdfjsResource.MutableResourceSet }): rdfjsResource.MutableResource {
        const _resource = super.toRdf({ ignoreRdfType: true, mutateGraph, resourceSet });
        if (!ignoreRdfType) { _resource.add(_resource.dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), _resource.dataFactory.namedNode("http://qudt.org/schema/qudt/QuantityKind")); }

        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/applicableCGSUnit"), this.qudt_QuantityKind$j$applicableCGSUnit.map((_item) => _item));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/applicableImperialUnit"), this.qudt_QuantityKind$j$applicableImperialUnit.map((_item) => _item.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet })));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/applicableISOUnit"), this.qudt_QuantityKind$j$applicableISOUnit.map((_item) => _item.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet })));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/applicableSIUnit"), this.qudt_QuantityKind$j$applicableSIUnit.map((_item) => _item.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet })));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/applicableUnit"), this.qudt_QuantityKind$j$applicableUnit.map((_item) => _item.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet })));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/applicableUSCustomaryUnit"), this.qudt_QuantityKind$j$applicableUSCustomaryUnit.map((_item) => _item.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet })));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/baseCGSUnitDimensions"), this.qudt_QuantityKind$j$baseCGSUnitDimensions);
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/baseImperialUnitDimensions"), this.qudt_QuantityKind$j$baseImperialUnitDimensions);
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/baseISOUnitDimensions"), this.qudt_QuantityKind$j$baseISOUnitDimensions);
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/baseSIUnitDimensions"), this.qudt_QuantityKind$j$baseSIUnitDimensions);
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/baseUSCustomaryUnitDimensions"), this.qudt_QuantityKind$j$baseUSCustomaryUnitDimensions);
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/belongsToSystemOfQuantities"), this.qudt_QuantityKind$j$belongsToSystemOfQuantities.map((_item) => _item));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionVectorForSI"), this.qudt_QuantityKind$j$dimensionVectorForSI);
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/expression"), this.qudt_QuantityKind$j$expression.map((_item) => _item));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/hasDimensionVector"), this.qudt_QuantityKind$j$hasDimensionVector.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet }));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/iec61360Code"), this.qudt_QuantityKind$j$iec61360Code.map((_item) => _item));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/latexDefinition"), this.qudt_QuantityKind$j$latexDefinition);
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/mathMLdefinition"), this.qudt_QuantityKind$j$mathMLdefinition);
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/qkdvDenominator"), this.qudt_QuantityKind$j$qkdvDenominator.map((_value) => _value.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet })));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/qkdvNumerator"), this.qudt_QuantityKind$j$qkdvNumerator.map((_value) => _value.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet })));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/siExactMatch"), this.qudt_QuantityKind$j$siExactMatch);
        return _resource;
    }

    override toString(): string {
        return JSON.stringify(this.toJson());
    }
}

export namespace Quantity_Kind {
    export function _propertiesFromJson(_json: unknown): purify.Either<zod.ZodError, { identifier: (rdfjs.BlankNode | rdfjs.NamedNode); qudt_QuantityKind$j$applicableCGSUnit: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; qudt_QuantityKind$j$applicableImperialUnit: readonly (Abstract_Unit)[]; qudt_QuantityKind$j$applicableISOUnit: readonly (Abstract_Unit)[]; qudt_QuantityKind$j$applicableSIUnit: readonly (Abstract_Unit)[]; qudt_QuantityKind$j$applicableUnit: readonly (Abstract_Unit)[]; qudt_QuantityKind$j$applicableUSCustomaryUnit: readonly (Abstract_Unit)[]; qudt_QuantityKind$j$baseCGSUnitDimensions: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>; qudt_QuantityKind$j$baseImperialUnitDimensions: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>; qudt_QuantityKind$j$baseISOUnitDimensions: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>; qudt_QuantityKind$j$baseSIUnitDimensions: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>; qudt_QuantityKind$j$baseUSCustomaryUnitDimensions: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>; qudt_QuantityKind$j$belongsToSystemOfQuantities: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; qudt_QuantityKind$j$dimensionVectorForSI: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>; qudt_QuantityKind$j$expression: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; qudt_QuantityKind$j$hasDimensionVector: Quantity_Kind$W$Dimension$W$Vector; qudt_QuantityKind$j$iec61360Code: readonly (string)[]; qudt_QuantityKind$j$latexDefinition: purify.Maybe<string>; qudt_QuantityKind$j$mathMLdefinition: purify.Maybe<string>; qudt_QuantityKind$j$qkdvDenominator: purify.Maybe<Quantity_Kind$W$Dimension$W$Vector>; qudt_QuantityKind$j$qkdvNumerator: purify.Maybe<Quantity_Kind$W$Dimension$W$Vector>; qudt_QuantityKind$j$siExactMatch: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>; } & UnwrapR<ReturnType<typeof Quantity_Kind$W$$e$abstract$f$._propertiesFromJson>>> {
        const _jsonSafeParseResult = quantityKindJsonZodSchema().safeParse(_json);
        if (!_jsonSafeParseResult.success) { return purify.Left(_jsonSafeParseResult.error); }

        const _jsonObject = _jsonSafeParseResult.data;
        const _super0Either = Quantity_Kind$W$$e$abstract$f$._propertiesFromJson(_jsonObject);
        if (_super0Either.isLeft()) { return _super0Either; }

        const _super0 = _super0Either.unsafeCoerce()
        const identifier = (_jsonObject["@id"].startsWith("_:") ? dataFactory.blankNode(_jsonObject["@id"].substring(2)) : dataFactory.namedNode(_jsonObject["@id"]));
        const qudt_QuantityKind$j$applicableCGSUnit = _jsonObject["qudt_QuantityKind$j$applicableCGSUnit"].map(_item => (((_item.termType === "Literal") ? (dataFactory.literal(_item["@value"], typeof _item["@language"] !== "undefined" ? _item["@language"] : (typeof _item["@type"] !== "undefined" ? dataFactory.namedNode(_item["@type"]) : undefined))) : (((_item.termType === "NamedNode") ? (dataFactory.namedNode(_item["@id"])) : (dataFactory.blankNode(_item["@id"].substring(2))))))));
        const qudt_QuantityKind$j$applicableImperialUnit = _jsonObject["qudt_QuantityKind$j$applicableImperialUnit"].map(_item => (Abstract_Unit.fromJson(_item).unsafeCoerce()));
        const qudt_QuantityKind$j$applicableISOUnit = _jsonObject["qudt_QuantityKind$j$applicableISOUnit"].map(_item => (Abstract_Unit.fromJson(_item).unsafeCoerce()));
        const qudt_QuantityKind$j$applicableSIUnit = _jsonObject["qudt_QuantityKind$j$applicableSIUnit"].map(_item => (Abstract_Unit.fromJson(_item).unsafeCoerce()));
        const qudt_QuantityKind$j$applicableUnit = _jsonObject["qudt_QuantityKind$j$applicableUnit"].map(_item => (Abstract_Unit.fromJson(_item).unsafeCoerce()));
        const qudt_QuantityKind$j$applicableUSCustomaryUnit = _jsonObject["qudt_QuantityKind$j$applicableUSCustomaryUnit"].map(_item => (Abstract_Unit.fromJson(_item).unsafeCoerce()));
        const qudt_QuantityKind$j$baseCGSUnitDimensions = purify.Maybe.fromNullable(_jsonObject["qudt_QuantityKind$j$baseCGSUnitDimensions"]).map(_item => (((_item.termType === "Literal") ? (dataFactory.literal(_item["@value"], typeof _item["@language"] !== "undefined" ? _item["@language"] : (typeof _item["@type"] !== "undefined" ? dataFactory.namedNode(_item["@type"]) : undefined))) : (((_item.termType === "NamedNode") ? (dataFactory.namedNode(_item["@id"])) : (dataFactory.blankNode(_item["@id"].substring(2))))))));
        const qudt_QuantityKind$j$baseImperialUnitDimensions = purify.Maybe.fromNullable(_jsonObject["qudt_QuantityKind$j$baseImperialUnitDimensions"]).map(_item => (((_item.termType === "Literal") ? (dataFactory.literal(_item["@value"], typeof _item["@language"] !== "undefined" ? _item["@language"] : (typeof _item["@type"] !== "undefined" ? dataFactory.namedNode(_item["@type"]) : undefined))) : (((_item.termType === "NamedNode") ? (dataFactory.namedNode(_item["@id"])) : (dataFactory.blankNode(_item["@id"].substring(2))))))));
        const qudt_QuantityKind$j$baseISOUnitDimensions = purify.Maybe.fromNullable(_jsonObject["qudt_QuantityKind$j$baseISOUnitDimensions"]).map(_item => (((_item.termType === "Literal") ? (dataFactory.literal(_item["@value"], typeof _item["@language"] !== "undefined" ? _item["@language"] : (typeof _item["@type"] !== "undefined" ? dataFactory.namedNode(_item["@type"]) : undefined))) : (((_item.termType === "NamedNode") ? (dataFactory.namedNode(_item["@id"])) : (dataFactory.blankNode(_item["@id"].substring(2))))))));
        const qudt_QuantityKind$j$baseSIUnitDimensions = purify.Maybe.fromNullable(_jsonObject["qudt_QuantityKind$j$baseSIUnitDimensions"]).map(_item => (((_item.termType === "Literal") ? (dataFactory.literal(_item["@value"], typeof _item["@language"] !== "undefined" ? _item["@language"] : (typeof _item["@type"] !== "undefined" ? dataFactory.namedNode(_item["@type"]) : undefined))) : (((_item.termType === "NamedNode") ? (dataFactory.namedNode(_item["@id"])) : (dataFactory.blankNode(_item["@id"].substring(2))))))));
        const qudt_QuantityKind$j$baseUSCustomaryUnitDimensions = purify.Maybe.fromNullable(_jsonObject["qudt_QuantityKind$j$baseUSCustomaryUnitDimensions"]).map(_item => (((_item.termType === "Literal") ? (dataFactory.literal(_item["@value"], typeof _item["@language"] !== "undefined" ? _item["@language"] : (typeof _item["@type"] !== "undefined" ? dataFactory.namedNode(_item["@type"]) : undefined))) : (((_item.termType === "NamedNode") ? (dataFactory.namedNode(_item["@id"])) : (dataFactory.blankNode(_item["@id"].substring(2))))))));
        const qudt_QuantityKind$j$belongsToSystemOfQuantities = _jsonObject["qudt_QuantityKind$j$belongsToSystemOfQuantities"].map(_item => (((_item.termType === "Literal") ? (dataFactory.literal(_item["@value"], typeof _item["@language"] !== "undefined" ? _item["@language"] : (typeof _item["@type"] !== "undefined" ? dataFactory.namedNode(_item["@type"]) : undefined))) : (((_item.termType === "NamedNode") ? (dataFactory.namedNode(_item["@id"])) : (dataFactory.blankNode(_item["@id"].substring(2))))))));
        const qudt_QuantityKind$j$dimensionVectorForSI = purify.Maybe.fromNullable(_jsonObject["qudt_QuantityKind$j$dimensionVectorForSI"]).map(_item => (((_item.termType === "Literal") ? (dataFactory.literal(_item["@value"], typeof _item["@language"] !== "undefined" ? _item["@language"] : (typeof _item["@type"] !== "undefined" ? dataFactory.namedNode(_item["@type"]) : undefined))) : (((_item.termType === "NamedNode") ? (dataFactory.namedNode(_item["@id"])) : (dataFactory.blankNode(_item["@id"].substring(2))))))));
        const qudt_QuantityKind$j$expression = _jsonObject["qudt_QuantityKind$j$expression"].map(_item => (((_item.termType === "Literal") ? (dataFactory.literal(_item["@value"], typeof _item["@language"] !== "undefined" ? _item["@language"] : (typeof _item["@type"] !== "undefined" ? dataFactory.namedNode(_item["@type"]) : undefined))) : (((_item.termType === "NamedNode") ? (dataFactory.namedNode(_item["@id"])) : (dataFactory.blankNode(_item["@id"].substring(2))))))));
        const qudt_QuantityKind$j$hasDimensionVector = Quantity_Kind$W$Dimension$W$Vector.fromJson(_jsonObject["qudt_QuantityKind$j$hasDimensionVector"]).unsafeCoerce();
        const qudt_QuantityKind$j$iec61360Code = _jsonObject["qudt_QuantityKind$j$iec61360Code"];
        const qudt_QuantityKind$j$latexDefinition = purify.Maybe.fromNullable(_jsonObject["qudt_QuantityKind$j$latexDefinition"]);
        const qudt_QuantityKind$j$mathMLdefinition = purify.Maybe.fromNullable(_jsonObject["qudt_QuantityKind$j$mathMLdefinition"]);
        const qudt_QuantityKind$j$qkdvDenominator = purify.Maybe.fromNullable(_jsonObject["qudt_QuantityKind$j$qkdvDenominator"]).map(_item => (Quantity_Kind$W$Dimension$W$Vector.fromJson(_item).unsafeCoerce()));
        const qudt_QuantityKind$j$qkdvNumerator = purify.Maybe.fromNullable(_jsonObject["qudt_QuantityKind$j$qkdvNumerator"]).map(_item => (Quantity_Kind$W$Dimension$W$Vector.fromJson(_item).unsafeCoerce()));
        const qudt_QuantityKind$j$siExactMatch = purify.Maybe.fromNullable(_jsonObject["qudt_QuantityKind$j$siExactMatch"]).map(_item => (((_item.termType === "Literal") ? (dataFactory.literal(_item["@value"], typeof _item["@language"] !== "undefined" ? _item["@language"] : (typeof _item["@type"] !== "undefined" ? dataFactory.namedNode(_item["@type"]) : undefined))) : (((_item.termType === "NamedNode") ? (dataFactory.namedNode(_item["@id"])) : (dataFactory.blankNode(_item["@id"].substring(2))))))));
        return purify.Either.of({ ..._super0, identifier, qudt_QuantityKind$j$applicableCGSUnit, qudt_QuantityKind$j$applicableImperialUnit, qudt_QuantityKind$j$applicableISOUnit, qudt_QuantityKind$j$applicableSIUnit, qudt_QuantityKind$j$applicableUnit, qudt_QuantityKind$j$applicableUSCustomaryUnit, qudt_QuantityKind$j$baseCGSUnitDimensions, qudt_QuantityKind$j$baseImperialUnitDimensions, qudt_QuantityKind$j$baseISOUnitDimensions, qudt_QuantityKind$j$baseSIUnitDimensions, qudt_QuantityKind$j$baseUSCustomaryUnitDimensions, qudt_QuantityKind$j$belongsToSystemOfQuantities, qudt_QuantityKind$j$dimensionVectorForSI, qudt_QuantityKind$j$expression, qudt_QuantityKind$j$hasDimensionVector, qudt_QuantityKind$j$iec61360Code, qudt_QuantityKind$j$latexDefinition, qudt_QuantityKind$j$mathMLdefinition, qudt_QuantityKind$j$qkdvDenominator, qudt_QuantityKind$j$qkdvNumerator, qudt_QuantityKind$j$siExactMatch })
    }

    export function fromJson(json: unknown): purify.Either<zod.ZodError, Quantity_Kind> {
        return Quantity_Kind._propertiesFromJson(json).map(properties => new Quantity_Kind(properties));
    }

    export function _propertiesFromRdf({ ignoreRdfType: _ignoreRdfType, languageIn: _languageIn, resource: _resource,
        // @ts-ignore
        ..._context }: { [_index: string]: any; ignoreRdfType?: boolean; languageIn?: readonly string[]; resource: rdfjsResource.Resource; }): purify.Either<rdfjsResource.Resource.ValueError, { identifier: (rdfjs.BlankNode | rdfjs.NamedNode); qudt_QuantityKind$j$applicableCGSUnit: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; qudt_QuantityKind$j$applicableImperialUnit: readonly (Abstract_Unit)[]; qudt_QuantityKind$j$applicableISOUnit: readonly (Abstract_Unit)[]; qudt_QuantityKind$j$applicableSIUnit: readonly (Abstract_Unit)[]; qudt_QuantityKind$j$applicableUnit: readonly (Abstract_Unit)[]; qudt_QuantityKind$j$applicableUSCustomaryUnit: readonly (Abstract_Unit)[]; qudt_QuantityKind$j$baseCGSUnitDimensions: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>; qudt_QuantityKind$j$baseImperialUnitDimensions: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>; qudt_QuantityKind$j$baseISOUnitDimensions: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>; qudt_QuantityKind$j$baseSIUnitDimensions: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>; qudt_QuantityKind$j$baseUSCustomaryUnitDimensions: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>; qudt_QuantityKind$j$belongsToSystemOfQuantities: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; qudt_QuantityKind$j$dimensionVectorForSI: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>; qudt_QuantityKind$j$expression: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; qudt_QuantityKind$j$hasDimensionVector: Quantity_Kind$W$Dimension$W$Vector; qudt_QuantityKind$j$iec61360Code: readonly (string)[]; qudt_QuantityKind$j$latexDefinition: purify.Maybe<string>; qudt_QuantityKind$j$mathMLdefinition: purify.Maybe<string>; qudt_QuantityKind$j$qkdvDenominator: purify.Maybe<Quantity_Kind$W$Dimension$W$Vector>; qudt_QuantityKind$j$qkdvNumerator: purify.Maybe<Quantity_Kind$W$Dimension$W$Vector>; qudt_QuantityKind$j$siExactMatch: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>; } & UnwrapR<ReturnType<typeof Quantity_Kind$W$$e$abstract$f$._propertiesFromRdf>>> {
        const _super0Either = Quantity_Kind$W$$e$abstract$f$._propertiesFromRdf({ ..._context, ignoreRdfType: true, languageIn: _languageIn, resource: _resource });
        if (_super0Either.isLeft()) { return _super0Either; }

        const _super0 = _super0Either.unsafeCoerce()
        if (!_ignoreRdfType && !_resource.isInstanceOf(dataFactory.namedNode("http://qudt.org/schema/qudt/QuantityKind"))) { return purify.Left(new rdfjsResource.Resource.ValueError({ focusResource: _resource, message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type (expected http://qudt.org/schema/qudt/QuantityKind)`, predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/QuantityKind") })); }

        const identifier = _resource.identifier
        const _qudt_QuantityKind$j$applicableCGSUnitEither: purify.Either<rdfjsResource.Resource.ValueError, readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/applicableCGSUnit"), { unique: true }).flatMap(_item => _item.toValues().head().chain(_value => purify.Either.of(_value.toTerm())).toMaybe().toList())]);
        if (_qudt_QuantityKind$j$applicableCGSUnitEither.isLeft()) { return _qudt_QuantityKind$j$applicableCGSUnitEither; }

        const qudt_QuantityKind$j$applicableCGSUnit = _qudt_QuantityKind$j$applicableCGSUnitEither.unsafeCoerce();
        const _qudt_QuantityKind$j$applicableImperialUnitEither: purify.Either<rdfjsResource.Resource.ValueError, readonly (Abstract_Unit)[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/applicableImperialUnit"), { unique: true }).flatMap(_item => _item.toValues().head().chain(value => value.toResource()).chain(_resource => Abstract_Unit.fromRdf({ ..._context, ignoreRdfType: true, languageIn: _languageIn, resource: _resource })).toMaybe().toList())]);
        if (_qudt_QuantityKind$j$applicableImperialUnitEither.isLeft()) { return _qudt_QuantityKind$j$applicableImperialUnitEither; }

        const qudt_QuantityKind$j$applicableImperialUnit = _qudt_QuantityKind$j$applicableImperialUnitEither.unsafeCoerce();
        const _qudt_QuantityKind$j$applicableISOUnitEither: purify.Either<rdfjsResource.Resource.ValueError, readonly (Abstract_Unit)[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/applicableISOUnit"), { unique: true }).flatMap(_item => _item.toValues().head().chain(value => value.toResource()).chain(_resource => Abstract_Unit.fromRdf({ ..._context, ignoreRdfType: true, languageIn: _languageIn, resource: _resource })).toMaybe().toList())]);
        if (_qudt_QuantityKind$j$applicableISOUnitEither.isLeft()) { return _qudt_QuantityKind$j$applicableISOUnitEither; }

        const qudt_QuantityKind$j$applicableISOUnit = _qudt_QuantityKind$j$applicableISOUnitEither.unsafeCoerce();
        const _qudt_QuantityKind$j$applicableSIUnitEither: purify.Either<rdfjsResource.Resource.ValueError, readonly (Abstract_Unit)[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/applicableSIUnit"), { unique: true }).flatMap(_item => _item.toValues().head().chain(value => value.toResource()).chain(_resource => Abstract_Unit.fromRdf({ ..._context, ignoreRdfType: true, languageIn: _languageIn, resource: _resource })).toMaybe().toList())]);
        if (_qudt_QuantityKind$j$applicableSIUnitEither.isLeft()) { return _qudt_QuantityKind$j$applicableSIUnitEither; }

        const qudt_QuantityKind$j$applicableSIUnit = _qudt_QuantityKind$j$applicableSIUnitEither.unsafeCoerce();
        const _qudt_QuantityKind$j$applicableUnitEither: purify.Either<rdfjsResource.Resource.ValueError, readonly (Abstract_Unit)[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/applicableUnit"), { unique: true }).flatMap(_item => _item.toValues().head().chain(value => value.toResource()).chain(_resource => Abstract_Unit.fromRdf({ ..._context, ignoreRdfType: true, languageIn: _languageIn, resource: _resource })).toMaybe().toList())]);
        if (_qudt_QuantityKind$j$applicableUnitEither.isLeft()) { return _qudt_QuantityKind$j$applicableUnitEither; }

        const qudt_QuantityKind$j$applicableUnit = _qudt_QuantityKind$j$applicableUnitEither.unsafeCoerce();
        const _qudt_QuantityKind$j$applicableUSCustomaryUnitEither: purify.Either<rdfjsResource.Resource.ValueError, readonly (Abstract_Unit)[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/applicableUSCustomaryUnit"), { unique: true }).flatMap(_item => _item.toValues().head().chain(value => value.toResource()).chain(_resource => Abstract_Unit.fromRdf({ ..._context, ignoreRdfType: true, languageIn: _languageIn, resource: _resource })).toMaybe().toList())]);
        if (_qudt_QuantityKind$j$applicableUSCustomaryUnitEither.isLeft()) { return _qudt_QuantityKind$j$applicableUSCustomaryUnitEither; }

        const qudt_QuantityKind$j$applicableUSCustomaryUnit = _qudt_QuantityKind$j$applicableUSCustomaryUnitEither.unsafeCoerce();
        const _qudt_QuantityKind$j$baseCGSUnitDimensionsEither: purify.Either<rdfjsResource.Resource.ValueError, purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>> = purify.Either.of(_resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/baseCGSUnitDimensions"), { unique: true }).head().chain(_value => purify.Either.of(_value.toTerm())).toMaybe());
        if (_qudt_QuantityKind$j$baseCGSUnitDimensionsEither.isLeft()) { return _qudt_QuantityKind$j$baseCGSUnitDimensionsEither; }

        const qudt_QuantityKind$j$baseCGSUnitDimensions = _qudt_QuantityKind$j$baseCGSUnitDimensionsEither.unsafeCoerce();
        const _qudt_QuantityKind$j$baseImperialUnitDimensionsEither: purify.Either<rdfjsResource.Resource.ValueError, purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>> = purify.Either.of(_resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/baseImperialUnitDimensions"), { unique: true }).head().chain(_value => purify.Either.of(_value.toTerm())).toMaybe());
        if (_qudt_QuantityKind$j$baseImperialUnitDimensionsEither.isLeft()) { return _qudt_QuantityKind$j$baseImperialUnitDimensionsEither; }

        const qudt_QuantityKind$j$baseImperialUnitDimensions = _qudt_QuantityKind$j$baseImperialUnitDimensionsEither.unsafeCoerce();
        const _qudt_QuantityKind$j$baseISOUnitDimensionsEither: purify.Either<rdfjsResource.Resource.ValueError, purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>> = purify.Either.of(_resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/baseISOUnitDimensions"), { unique: true }).head().chain(_value => purify.Either.of(_value.toTerm())).toMaybe());
        if (_qudt_QuantityKind$j$baseISOUnitDimensionsEither.isLeft()) { return _qudt_QuantityKind$j$baseISOUnitDimensionsEither; }

        const qudt_QuantityKind$j$baseISOUnitDimensions = _qudt_QuantityKind$j$baseISOUnitDimensionsEither.unsafeCoerce();
        const _qudt_QuantityKind$j$baseSIUnitDimensionsEither: purify.Either<rdfjsResource.Resource.ValueError, purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>> = purify.Either.of(_resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/baseSIUnitDimensions"), { unique: true }).head().chain(_value => purify.Either.of(_value.toTerm())).toMaybe());
        if (_qudt_QuantityKind$j$baseSIUnitDimensionsEither.isLeft()) { return _qudt_QuantityKind$j$baseSIUnitDimensionsEither; }

        const qudt_QuantityKind$j$baseSIUnitDimensions = _qudt_QuantityKind$j$baseSIUnitDimensionsEither.unsafeCoerce();
        const _qudt_QuantityKind$j$baseUSCustomaryUnitDimensionsEither: purify.Either<rdfjsResource.Resource.ValueError, purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>> = purify.Either.of(_resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/baseUSCustomaryUnitDimensions"), { unique: true }).head().chain(_value => purify.Either.of(_value.toTerm())).toMaybe());
        if (_qudt_QuantityKind$j$baseUSCustomaryUnitDimensionsEither.isLeft()) { return _qudt_QuantityKind$j$baseUSCustomaryUnitDimensionsEither; }

        const qudt_QuantityKind$j$baseUSCustomaryUnitDimensions = _qudt_QuantityKind$j$baseUSCustomaryUnitDimensionsEither.unsafeCoerce();
        const _qudt_QuantityKind$j$belongsToSystemOfQuantitiesEither: purify.Either<rdfjsResource.Resource.ValueError, readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/belongsToSystemOfQuantities"), { unique: true }).flatMap(_item => _item.toValues().head().chain(_value => purify.Either.of(_value.toTerm())).toMaybe().toList())]);
        if (_qudt_QuantityKind$j$belongsToSystemOfQuantitiesEither.isLeft()) { return _qudt_QuantityKind$j$belongsToSystemOfQuantitiesEither; }

        const qudt_QuantityKind$j$belongsToSystemOfQuantities = _qudt_QuantityKind$j$belongsToSystemOfQuantitiesEither.unsafeCoerce();
        const _qudt_QuantityKind$j$dimensionVectorForSIEither: purify.Either<rdfjsResource.Resource.ValueError, purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>> = purify.Either.of(_resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionVectorForSI"), { unique: true }).head().chain(_value => purify.Either.of(_value.toTerm())).toMaybe());
        if (_qudt_QuantityKind$j$dimensionVectorForSIEither.isLeft()) { return _qudt_QuantityKind$j$dimensionVectorForSIEither; }

        const qudt_QuantityKind$j$dimensionVectorForSI = _qudt_QuantityKind$j$dimensionVectorForSIEither.unsafeCoerce();
        const _qudt_QuantityKind$j$expressionEither: purify.Either<rdfjsResource.Resource.ValueError, readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/expression"), { unique: true }).flatMap(_item => _item.toValues().head().chain(_value => purify.Either.of(_value.toTerm())).toMaybe().toList())]);
        if (_qudt_QuantityKind$j$expressionEither.isLeft()) { return _qudt_QuantityKind$j$expressionEither; }

        const qudt_QuantityKind$j$expression = _qudt_QuantityKind$j$expressionEither.unsafeCoerce();
        const _qudt_QuantityKind$j$hasDimensionVectorEither: purify.Either<rdfjsResource.Resource.ValueError, Quantity_Kind$W$Dimension$W$Vector> = _resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/hasDimensionVector"), { unique: true }).head().chain(value => value.toResource()).chain(_resource => Quantity_Kind$W$Dimension$W$Vector.fromRdf({ ..._context, ignoreRdfType: true, languageIn: _languageIn, resource: _resource }));
        if (_qudt_QuantityKind$j$hasDimensionVectorEither.isLeft()) { return _qudt_QuantityKind$j$hasDimensionVectorEither; }

        const qudt_QuantityKind$j$hasDimensionVector = _qudt_QuantityKind$j$hasDimensionVectorEither.unsafeCoerce();
        const _qudt_QuantityKind$j$iec61360CodeEither: purify.Either<rdfjsResource.Resource.ValueError, readonly (string)[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/iec61360Code"), { unique: true }).flatMap(_item => _item.toValues().head().chain(_value => _value.toString()).toMaybe().toList())]);
        if (_qudt_QuantityKind$j$iec61360CodeEither.isLeft()) { return _qudt_QuantityKind$j$iec61360CodeEither; }

        const qudt_QuantityKind$j$iec61360Code = _qudt_QuantityKind$j$iec61360CodeEither.unsafeCoerce();
        const _qudt_QuantityKind$j$latexDefinitionEither: purify.Either<rdfjsResource.Resource.ValueError, purify.Maybe<string>> = purify.Either.of(_resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/latexDefinition"), { unique: true }).head().chain(_value => _value.toString()).toMaybe());
        if (_qudt_QuantityKind$j$latexDefinitionEither.isLeft()) { return _qudt_QuantityKind$j$latexDefinitionEither; }

        const qudt_QuantityKind$j$latexDefinition = _qudt_QuantityKind$j$latexDefinitionEither.unsafeCoerce();
        const _qudt_QuantityKind$j$mathMLdefinitionEither: purify.Either<rdfjsResource.Resource.ValueError, purify.Maybe<string>> = purify.Either.of(_resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/mathMLdefinition"), { unique: true }).head().chain(_value => _value.toString()).toMaybe());
        if (_qudt_QuantityKind$j$mathMLdefinitionEither.isLeft()) { return _qudt_QuantityKind$j$mathMLdefinitionEither; }

        const qudt_QuantityKind$j$mathMLdefinition = _qudt_QuantityKind$j$mathMLdefinitionEither.unsafeCoerce();
        const _qudt_QuantityKind$j$qkdvDenominatorEither: purify.Either<rdfjsResource.Resource.ValueError, purify.Maybe<Quantity_Kind$W$Dimension$W$Vector>> = purify.Either.of(_resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/qkdvDenominator"), { unique: true }).head().chain(value => value.toResource()).chain(_resource => Quantity_Kind$W$Dimension$W$Vector.fromRdf({ ..._context, ignoreRdfType: true, languageIn: _languageIn, resource: _resource })).toMaybe());
        if (_qudt_QuantityKind$j$qkdvDenominatorEither.isLeft()) { return _qudt_QuantityKind$j$qkdvDenominatorEither; }

        const qudt_QuantityKind$j$qkdvDenominator = _qudt_QuantityKind$j$qkdvDenominatorEither.unsafeCoerce();
        const _qudt_QuantityKind$j$qkdvNumeratorEither: purify.Either<rdfjsResource.Resource.ValueError, purify.Maybe<Quantity_Kind$W$Dimension$W$Vector>> = purify.Either.of(_resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/qkdvNumerator"), { unique: true }).head().chain(value => value.toResource()).chain(_resource => Quantity_Kind$W$Dimension$W$Vector.fromRdf({ ..._context, ignoreRdfType: true, languageIn: _languageIn, resource: _resource })).toMaybe());
        if (_qudt_QuantityKind$j$qkdvNumeratorEither.isLeft()) { return _qudt_QuantityKind$j$qkdvNumeratorEither; }

        const qudt_QuantityKind$j$qkdvNumerator = _qudt_QuantityKind$j$qkdvNumeratorEither.unsafeCoerce();
        const _qudt_QuantityKind$j$siExactMatchEither: purify.Either<rdfjsResource.Resource.ValueError, purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>> = purify.Either.of(_resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/siExactMatch"), { unique: true }).head().chain(_value => purify.Either.of(_value.toTerm())).toMaybe());
        if (_qudt_QuantityKind$j$siExactMatchEither.isLeft()) { return _qudt_QuantityKind$j$siExactMatchEither; }

        const qudt_QuantityKind$j$siExactMatch = _qudt_QuantityKind$j$siExactMatchEither.unsafeCoerce();
        return purify.Either.of({ ..._super0, identifier, qudt_QuantityKind$j$applicableCGSUnit, qudt_QuantityKind$j$applicableImperialUnit, qudt_QuantityKind$j$applicableISOUnit, qudt_QuantityKind$j$applicableSIUnit, qudt_QuantityKind$j$applicableUnit, qudt_QuantityKind$j$applicableUSCustomaryUnit, qudt_QuantityKind$j$baseCGSUnitDimensions, qudt_QuantityKind$j$baseImperialUnitDimensions, qudt_QuantityKind$j$baseISOUnitDimensions, qudt_QuantityKind$j$baseSIUnitDimensions, qudt_QuantityKind$j$baseUSCustomaryUnitDimensions, qudt_QuantityKind$j$belongsToSystemOfQuantities, qudt_QuantityKind$j$dimensionVectorForSI, qudt_QuantityKind$j$expression, qudt_QuantityKind$j$hasDimensionVector, qudt_QuantityKind$j$iec61360Code, qudt_QuantityKind$j$latexDefinition, qudt_QuantityKind$j$mathMLdefinition, qudt_QuantityKind$j$qkdvDenominator, qudt_QuantityKind$j$qkdvNumerator, qudt_QuantityKind$j$siExactMatch })
    }

    export function fromRdf(parameters: Parameters<typeof Quantity_Kind._propertiesFromRdf>[0]): purify.Either<rdfjsResource.Resource.ValueError, Quantity_Kind> {
        return Quantity_Kind._propertiesFromRdf(parameters).map(properties => new Quantity_Kind(properties));
    }

    export let fromRdfType: rdfjs.NamedNode<string> = dataFactory.namedNode("http://qudt.org/schema/qudt/QuantityKind");

    export function jsonSchema() {
        return zodToJsonSchema(quantityKindJsonZodSchema());
    }

    export function quantityKindJsonUiSchema(parameters?: { scopePrefix?: string }) {
        const scopePrefix = parameters?.scopePrefix ?? "#";
        return { "elements": [ Quantity_Kind$W$$e$abstract$f$.quantityKindWEAbstractFJsonUiSchema({ scopePrefix }), { scope: `${scopePrefix}/properties/qudt_QuantityKind$j$applicableCGSUnit`, type: "Control" }, Abstract_Unit.abstractUnitJsonUiSchema({ scopePrefix: `${scopePrefix}/properties/qudt_QuantityKind$j$applicableImperialUnit` }), Abstract_Unit.abstractUnitJsonUiSchema({ scopePrefix: `${scopePrefix}/properties/qudt_QuantityKind$j$applicableISOUnit` }), Abstract_Unit.abstractUnitJsonUiSchema({ scopePrefix: `${scopePrefix}/properties/qudt_QuantityKind$j$applicableSIUnit` }), Abstract_Unit.abstractUnitJsonUiSchema({ scopePrefix: `${scopePrefix}/properties/qudt_QuantityKind$j$applicableUnit` }), Abstract_Unit.abstractUnitJsonUiSchema({ scopePrefix: `${scopePrefix}/properties/qudt_QuantityKind$j$applicableUSCustomaryUnit` }), { scope: `${scopePrefix}/properties/qudt_QuantityKind$j$baseCGSUnitDimensions`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_QuantityKind$j$baseImperialUnitDimensions`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_QuantityKind$j$baseISOUnitDimensions`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_QuantityKind$j$baseSIUnitDimensions`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_QuantityKind$j$baseUSCustomaryUnitDimensions`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_QuantityKind$j$belongsToSystemOfQuantities`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_QuantityKind$j$dimensionVectorForSI`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_QuantityKind$j$expression`, type: "Control" }, Quantity_Kind$W$Dimension$W$Vector.jsonUiSchema({ scopePrefix: `${scopePrefix}/properties/qudt_QuantityKind$j$hasDimensionVector` }), { scope: `${scopePrefix}/properties/qudt_QuantityKind$j$iec61360Code`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_QuantityKind$j$latexDefinition`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_QuantityKind$j$mathMLdefinition`, type: "Control" }, Quantity_Kind$W$Dimension$W$Vector.jsonUiSchema({ scopePrefix: `${scopePrefix}/properties/qudt_QuantityKind$j$qkdvDenominator` }), Quantity_Kind$W$Dimension$W$Vector.jsonUiSchema({ scopePrefix: `${scopePrefix}/properties/qudt_QuantityKind$j$qkdvNumerator` }), { scope: `${scopePrefix}/properties/qudt_QuantityKind$j$siExactMatch`, type: "Control" } ], label: "Quantity Kind", type: "Group" }
    }

    export function quantityKindJsonZodSchema() {
        return Quantity_Kind$W$$e$abstract$f$.quantityKindWEAbstractFJsonZodSchema().merge(zod.object({ "@id": zod.string().min(1),"type": zod.literal("Quantity_Kind"),"qudt_QuantityKind$j$applicableCGSUnit": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]).array(),"qudt_QuantityKind$j$applicableImperialUnit": Abstract_Unit.abstractUnitJsonZodSchema().array(),"qudt_QuantityKind$j$applicableISOUnit": Abstract_Unit.abstractUnitJsonZodSchema().array(),"qudt_QuantityKind$j$applicableSIUnit": Abstract_Unit.abstractUnitJsonZodSchema().array(),"qudt_QuantityKind$j$applicableUnit": Abstract_Unit.abstractUnitJsonZodSchema().array(),"qudt_QuantityKind$j$applicableUSCustomaryUnit": Abstract_Unit.abstractUnitJsonZodSchema().array(),"qudt_QuantityKind$j$baseCGSUnitDimensions": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]).optional(),"qudt_QuantityKind$j$baseImperialUnitDimensions": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]).optional(),"qudt_QuantityKind$j$baseISOUnitDimensions": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]).optional(),"qudt_QuantityKind$j$baseSIUnitDimensions": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]).optional(),"qudt_QuantityKind$j$baseUSCustomaryUnitDimensions": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]).optional(),"qudt_QuantityKind$j$belongsToSystemOfQuantities": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]).array(),"qudt_QuantityKind$j$dimensionVectorForSI": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]).optional(),"qudt_QuantityKind$j$expression": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]).array(),"qudt_QuantityKind$j$hasDimensionVector": Quantity_Kind$W$Dimension$W$Vector.jsonZodSchema(),"qudt_QuantityKind$j$iec61360Code": zod.string().array(),"qudt_QuantityKind$j$latexDefinition": zod.string().optional(),"qudt_QuantityKind$j$mathMLdefinition": zod.string().optional(),"qudt_QuantityKind$j$qkdvDenominator": Quantity_Kind$W$Dimension$W$Vector.jsonZodSchema().optional(),"qudt_QuantityKind$j$qkdvNumerator": Quantity_Kind$W$Dimension$W$Vector.jsonZodSchema().optional(),"qudt_QuantityKind$j$siExactMatch": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]).optional() }));
    }

    export function sparqlConstructQuery(parameters?: { ignoreRdfType?: boolean; prefixes?: { [prefix: string]: string }; subject?: sparqljs.Triple["subject"]; } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "type">): sparqljs.ConstructQuery {
        const { ignoreRdfType, subject, ...queryParameters } = parameters ?? {}

        return { ...queryParameters, prefixes: parameters?.prefixes ?? {}, queryType: "CONSTRUCT", template: (queryParameters.template ?? []).concat(Quantity_Kind.sparqlConstructTemplateTriples({ ignoreRdfType, subject })), type: "query", where: (queryParameters.where ?? []).concat(Quantity_Kind.sparqlWherePatterns({ ignoreRdfType, subject })) };
    }

    export function sparqlConstructQueryString(parameters?: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"]; variablePrefix?: string; } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "type"> & sparqljs.GeneratorOptions): string {
        return new sparqljs.Generator(parameters).stringify(Quantity_Kind.sparqlConstructQuery(parameters));
    }

    export function sparqlConstructTemplateTriples(parameters?: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"], variablePrefix?: string }): readonly sparqljs.Triple[] {
        const subject = parameters?.subject ?? dataFactory.variable!("quantityKind");
        const variablePrefix = parameters?.variablePrefix ?? (subject.termType === "Variable" ? subject.value : "quantityKind");
        return [...Quantity_Kind$W$$e$abstract$f$.sparqlConstructTemplateTriples({ ignoreRdfType: true, subject, variablePrefix }), ...(parameters?.ignoreRdfType ? [] : [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.variable!(`${variablePrefix}RdfType`) }]), { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJApplicableCgsUnit`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/applicableCGSUnit"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJApplicableImperialUnit`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/applicableImperialUnit"), subject }, ...Abstract_Unit.sparqlConstructTemplateTriples({ ignoreRdfType: true, subject: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJApplicableImperialUnit`), variablePrefix: `${variablePrefix}QudtQuantityKindJApplicableImperialUnit` }), { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJApplicableIsoUnit`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/applicableISOUnit"), subject }, ...Abstract_Unit.sparqlConstructTemplateTriples({ ignoreRdfType: true, subject: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJApplicableIsoUnit`), variablePrefix: `${variablePrefix}QudtQuantityKindJApplicableIsoUnit` }), { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJApplicableSiUnit`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/applicableSIUnit"), subject }, ...Abstract_Unit.sparqlConstructTemplateTriples({ ignoreRdfType: true, subject: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJApplicableSiUnit`), variablePrefix: `${variablePrefix}QudtQuantityKindJApplicableSiUnit` }), { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJApplicableUnit`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/applicableUnit"), subject }, ...Abstract_Unit.sparqlConstructTemplateTriples({ ignoreRdfType: true, subject: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJApplicableUnit`), variablePrefix: `${variablePrefix}QudtQuantityKindJApplicableUnit` }), { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJApplicableUsCustomaryUnit`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/applicableUSCustomaryUnit"), subject }, ...Abstract_Unit.sparqlConstructTemplateTriples({ ignoreRdfType: true, subject: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJApplicableUsCustomaryUnit`), variablePrefix: `${variablePrefix}QudtQuantityKindJApplicableUsCustomaryUnit` }), { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJBaseCgsUnitDimensions`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/baseCGSUnitDimensions"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJBaseImperialUnitDimensions`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/baseImperialUnitDimensions"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJBaseIsoUnitDimensions`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/baseISOUnitDimensions"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJBaseSiUnitDimensions`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/baseSIUnitDimensions"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJBaseUsCustomaryUnitDimensions`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/baseUSCustomaryUnitDimensions"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJBelongsToSystemOfQuantities`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/belongsToSystemOfQuantities"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJDimensionVectorForSi`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionVectorForSI"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJExpression`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/expression"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJHasDimensionVector`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/hasDimensionVector"), subject }, ...Quantity_Kind$W$Dimension$W$Vector.sparqlConstructTemplateTriples({ ignoreRdfType: true, subject: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJHasDimensionVector`), variablePrefix: `${variablePrefix}QudtQuantityKindJHasDimensionVector` }), { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJIec61360Code`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/iec61360Code"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJLatexDefinition`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/latexDefinition"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJMathMLdefinition`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/mathMLdefinition"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJQkdvDenominator`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/qkdvDenominator"), subject }, ...Quantity_Kind$W$Dimension$W$Vector.sparqlConstructTemplateTriples({ ignoreRdfType: true, subject: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJQkdvDenominator`), variablePrefix: `${variablePrefix}QudtQuantityKindJQkdvDenominator` }), { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJQkdvNumerator`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/qkdvNumerator"), subject }, ...Quantity_Kind$W$Dimension$W$Vector.sparqlConstructTemplateTriples({ ignoreRdfType: true, subject: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJQkdvNumerator`), variablePrefix: `${variablePrefix}QudtQuantityKindJQkdvNumerator` }), { object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJSiExactMatch`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/siExactMatch"), subject }];
    }

    export function sparqlWherePatterns(parameters: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"], variablePrefix?: string }): readonly sparqljs.Pattern[] {
        const subject = parameters?.subject ?? dataFactory.variable!("quantityKind");
        const variablePrefix = parameters?.variablePrefix ?? (subject.termType === "Variable" ? subject.value : "quantityKind");
        return [...Quantity_Kind$W$$e$abstract$f$.sparqlWherePatterns({ ignoreRdfType: true, subject, variablePrefix }), ...(parameters?.ignoreRdfType ? [] : [{ triples: [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.namedNode("http://qudt.org/schema/qudt/QuantityKind") }], type: "bgp" as const }, { triples: [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.variable!(`${variablePrefix}RdfType`) }], type: "bgp" as const }]), { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJApplicableCgsUnit`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/applicableCGSUnit"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJApplicableImperialUnit`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/applicableImperialUnit"), subject }], type: "bgp" }, ...Abstract_Unit.sparqlWherePatterns({ ignoreRdfType: true, subject: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJApplicableImperialUnit`), variablePrefix: `${variablePrefix}QudtQuantityKindJApplicableImperialUnit` })], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJApplicableIsoUnit`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/applicableISOUnit"), subject }], type: "bgp" }, ...Abstract_Unit.sparqlWherePatterns({ ignoreRdfType: true, subject: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJApplicableIsoUnit`), variablePrefix: `${variablePrefix}QudtQuantityKindJApplicableIsoUnit` })], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJApplicableSiUnit`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/applicableSIUnit"), subject }], type: "bgp" }, ...Abstract_Unit.sparqlWherePatterns({ ignoreRdfType: true, subject: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJApplicableSiUnit`), variablePrefix: `${variablePrefix}QudtQuantityKindJApplicableSiUnit` })], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJApplicableUnit`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/applicableUnit"), subject }], type: "bgp" }, ...Abstract_Unit.sparqlWherePatterns({ ignoreRdfType: true, subject: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJApplicableUnit`), variablePrefix: `${variablePrefix}QudtQuantityKindJApplicableUnit` })], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJApplicableUsCustomaryUnit`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/applicableUSCustomaryUnit"), subject }], type: "bgp" }, ...Abstract_Unit.sparqlWherePatterns({ ignoreRdfType: true, subject: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJApplicableUsCustomaryUnit`), variablePrefix: `${variablePrefix}QudtQuantityKindJApplicableUsCustomaryUnit` })], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJBaseCgsUnitDimensions`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/baseCGSUnitDimensions"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJBaseImperialUnitDimensions`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/baseImperialUnitDimensions"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJBaseIsoUnitDimensions`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/baseISOUnitDimensions"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJBaseSiUnitDimensions`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/baseSIUnitDimensions"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJBaseUsCustomaryUnitDimensions`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/baseUSCustomaryUnitDimensions"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJBelongsToSystemOfQuantities`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/belongsToSystemOfQuantities"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJDimensionVectorForSi`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/dimensionVectorForSI"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJExpression`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/expression"), subject }], type: "bgp" }], type: "optional" }, { triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJHasDimensionVector`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/hasDimensionVector"), subject }], type: "bgp" }, ...Quantity_Kind$W$Dimension$W$Vector.sparqlWherePatterns({ ignoreRdfType: true, subject: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJHasDimensionVector`), variablePrefix: `${variablePrefix}QudtQuantityKindJHasDimensionVector` }), { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJIec61360Code`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/iec61360Code"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJLatexDefinition`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/latexDefinition"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJMathMLdefinition`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/mathMLdefinition"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJQkdvDenominator`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/qkdvDenominator"), subject }], type: "bgp" }, ...Quantity_Kind$W$Dimension$W$Vector.sparqlWherePatterns({ ignoreRdfType: true, subject: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJQkdvDenominator`), variablePrefix: `${variablePrefix}QudtQuantityKindJQkdvDenominator` })], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJQkdvNumerator`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/qkdvNumerator"), subject }], type: "bgp" }, ...Quantity_Kind$W$Dimension$W$Vector.sparqlWherePatterns({ ignoreRdfType: true, subject: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJQkdvNumerator`), variablePrefix: `${variablePrefix}QudtQuantityKindJQkdvNumerator` })], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtQuantityKindJSiExactMatch`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/siExactMatch"), subject }], type: "bgp" }], type: "optional" }];
    }
}
/**
 * Abstract Unit
 */
export class Abstract_Unit extends Verifiable {
    override readonly type: "Abstract_Unit" | "Angle_unit" | "Contextual_Unit" | "Dimensionless_Unit" | "Unit" = "Abstract_Unit";

    // biome-ignore lint/complexity/noUselessConstructor: Always have a constructor
    constructor(parameters: { readonly identifier?: (rdfjs.BlankNode | rdfjs.NamedNode) | string } & ConstructorParameters<typeof Verifiable>[0]) {
        super(parameters);
    }

    override get identifier(): (rdfjs.BlankNode | rdfjs.NamedNode) {
        if (typeof this._identifier === "undefined") { this._identifier = dataFactory.blankNode(); } return this._identifier;
    }

    override toRdf({ ignoreRdfType, mutateGraph, resourceSet }: { ignoreRdfType?: boolean; mutateGraph?: rdfjsResource.MutableResource.MutateGraph, resourceSet: rdfjsResource.MutableResourceSet }): rdfjsResource.MutableResource {
        const _resource = super.toRdf({ ignoreRdfType: true, mutateGraph, resourceSet });
        if (!ignoreRdfType) { _resource.add(_resource.dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), _resource.dataFactory.namedNode("http://qudt.org/schema/qudt/AbstractUnit")); }

        return _resource;
    }

    override toString(): string {
        return JSON.stringify(this.toJson());
    }
}

export namespace Abstract_Unit {
    export function _propertiesFromJson(_json: unknown): purify.Either<zod.ZodError, { identifier: (rdfjs.BlankNode | rdfjs.NamedNode); } & UnwrapR<ReturnType<typeof Verifiable._propertiesFromJson>>> {
        const _jsonSafeParseResult = abstractUnitJsonZodSchema().safeParse(_json);
        if (!_jsonSafeParseResult.success) { return purify.Left(_jsonSafeParseResult.error); }

        const _jsonObject = _jsonSafeParseResult.data;
        const _super0Either = Verifiable._propertiesFromJson(_jsonObject);
        if (_super0Either.isLeft()) { return _super0Either; }

        const _super0 = _super0Either.unsafeCoerce()
        const identifier = (_jsonObject["@id"].startsWith("_:") ? dataFactory.blankNode(_jsonObject["@id"].substring(2)) : dataFactory.namedNode(_jsonObject["@id"]));
        return purify.Either.of({ ..._super0, identifier })
    }

    export function fromJson(json: unknown): purify.Either<zod.ZodError, Abstract_Unit> {
        return (Unit.fromJson(json) as purify.Either<zod.ZodError, Abstract_Unit>).altLazy(() => Abstract_Unit._propertiesFromJson(json).map(properties => new Abstract_Unit(properties)));
    }

    export function _propertiesFromRdf({ ignoreRdfType: _ignoreRdfType, languageIn: _languageIn, resource: _resource,
        // @ts-ignore
        ..._context }: { [_index: string]: any; ignoreRdfType?: boolean; languageIn?: readonly string[]; resource: rdfjsResource.Resource; }): purify.Either<rdfjsResource.Resource.ValueError, { identifier: (rdfjs.BlankNode | rdfjs.NamedNode); } & UnwrapR<ReturnType<typeof Verifiable._propertiesFromRdf>>> {
        const _super0Either = Verifiable._propertiesFromRdf({ ..._context, ignoreRdfType: true, languageIn: _languageIn, resource: _resource });
        if (_super0Either.isLeft()) { return _super0Either; }

        const _super0 = _super0Either.unsafeCoerce()
        if (!_ignoreRdfType && !_resource.isInstanceOf(dataFactory.namedNode("http://qudt.org/schema/qudt/AbstractUnit"))) { return purify.Left(new rdfjsResource.Resource.ValueError({ focusResource: _resource, message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type (expected http://qudt.org/schema/qudt/AbstractUnit)`, predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/AbstractUnit") })); }

        const identifier = _resource.identifier
        return purify.Either.of({ ..._super0, identifier })
    }

    export function fromRdf(parameters: Parameters<typeof Abstract_Unit._propertiesFromRdf>[0]): purify.Either<rdfjsResource.Resource.ValueError, Abstract_Unit> {
        const { ignoreRdfType: _ignoreRdfType, ...otherParameters } = parameters
        return (Unit.fromRdf(otherParameters) as purify.Either<rdfjsResource.Resource.ValueError, Abstract_Unit>).altLazy(() => Abstract_Unit._propertiesFromRdf(parameters).map(properties => new Abstract_Unit(properties)));
    }

    export let fromRdfType: rdfjs.NamedNode<string> = dataFactory.namedNode("http://qudt.org/schema/qudt/AbstractUnit");

    export function jsonSchema() {
        return zodToJsonSchema(abstractUnitJsonZodSchema());
    }

    export function abstractUnitJsonUiSchema(parameters?: { scopePrefix?: string }) {
        const scopePrefix = parameters?.scopePrefix ?? "#";
        return { "elements": [ Verifiable.verifiableJsonUiSchema({ scopePrefix }) ], label: "Abstract Unit", type: "Group" }
    }

    export function abstractUnitJsonZodSchema() {
        return Verifiable.verifiableJsonZodSchema().merge(zod.object({ "@id": zod.string().min(1),"type": zod.enum(["Abstract_Unit","Angle_unit","Contextual_Unit","Dimensionless_Unit","Unit"]) }));
    }

    export function sparqlConstructQuery(parameters?: { ignoreRdfType?: boolean; prefixes?: { [prefix: string]: string }; subject?: sparqljs.Triple["subject"]; } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "type">): sparqljs.ConstructQuery {
        const { ignoreRdfType, subject, ...queryParameters } = parameters ?? {}

        return { ...queryParameters, prefixes: parameters?.prefixes ?? {}, queryType: "CONSTRUCT", template: (queryParameters.template ?? []).concat(Abstract_Unit.sparqlConstructTemplateTriples({ ignoreRdfType, subject })), type: "query", where: (queryParameters.where ?? []).concat(Abstract_Unit.sparqlWherePatterns({ ignoreRdfType, subject })) };
    }

    export function sparqlConstructQueryString(parameters?: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"]; variablePrefix?: string; } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "type"> & sparqljs.GeneratorOptions): string {
        return new sparqljs.Generator(parameters).stringify(Abstract_Unit.sparqlConstructQuery(parameters));
    }

    export function sparqlConstructTemplateTriples(parameters?: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"], variablePrefix?: string }): readonly sparqljs.Triple[] {
        const subject = parameters?.subject ?? dataFactory.variable!("abstractUnit");
        const variablePrefix = parameters?.variablePrefix ?? (subject.termType === "Variable" ? subject.value : "abstractUnit");
        return [...Verifiable.sparqlConstructTemplateTriples({ ignoreRdfType: true, subject, variablePrefix }), ...(parameters?.ignoreRdfType ? [] : [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.variable!(`${variablePrefix}RdfType`) }])];
    }

    export function sparqlWherePatterns(parameters: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"], variablePrefix?: string }): readonly sparqljs.Pattern[] {
        const subject = parameters?.subject ?? dataFactory.variable!("abstractUnit");
        const variablePrefix = parameters?.variablePrefix ?? (subject.termType === "Variable" ? subject.value : "abstractUnit");
        return [...Verifiable.sparqlWherePatterns({ ignoreRdfType: true, subject, variablePrefix }), ...(parameters?.ignoreRdfType ? [] : [{ triples: [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.namedNode("http://qudt.org/schema/qudt/AbstractUnit") }], type: "bgp" as const }, { triples: [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.variable!(`${variablePrefix}RdfType`) }], type: "bgp" as const }])];
    }
}
/**
 * Unit
 */
export class Unit extends Abstract_Unit {
    override readonly type: "Angle_unit" | "Contextual_Unit" | "Dimensionless_Unit" | "Unit" = "Unit";
    readonly qudt_Unit$j$altSymbol: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[];
    readonly qudt_Unit$j$applicableSystem: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[];
    readonly qudt_Unit$j$conversionMultiplier: purify.Maybe<number>;
    readonly qudt_Unit$j$conversionMultiplierSN: purify.Maybe<number>;
    readonly qudt_Unit$j$conversionOffset: purify.Maybe<number>;
    readonly qudt_Unit$j$conversionOffsetSN: purify.Maybe<number>;
    readonly qudt_Unit$j$definedUnitOfSystem: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[];
    readonly qudt_Unit$j$derivedCoherentUnitOfSystem: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[];
    readonly qudt_Unit$j$derivedUnitOfSystem: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[];
    readonly qudt_Unit$j$expression: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[];
    readonly qudt_Unit$j$factorUnitScalar: purify.Maybe<number>;
    readonly qudt_Unit$j$hasDimensionVector: Quantity_Kind$W$Dimension$W$Vector;
    readonly qudt_Unit$j$hasFactorUnit: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[];
    readonly qudt_Unit$j$hasQuantityKind: purify.NonEmptyList<Quantity_Kind>;
    readonly qudt_Unit$j$iec61360Code: readonly (string)[];
    readonly qudt_Unit$j$latexDefinition: readonly (string)[];
    readonly qudt_Unit$j$latexSymbol: readonly (string)[];
    readonly qudt_Unit$j$mathMLdefinition: purify.Maybe<string>;
    readonly qudt_Unit$j$omUnit: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[];
    readonly qudt_Unit$j$prefix: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>;
    readonly qudt_Unit$j$qkdvDenominator: purify.Maybe<Quantity_Kind$W$Dimension$W$Vector>;
    readonly qudt_Unit$j$qkdvNumerator: purify.Maybe<Quantity_Kind$W$Dimension$W$Vector>;
    readonly qudt_Unit$j$scalingOf: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode)>;
    readonly qudt_Unit$j$siExactMatch: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>;
    readonly qudt_Unit$j$siUnitsExpression: readonly (string)[];
    readonly qudt_Unit$j$symbol: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>;
    readonly qudt_Unit$j$ucumCode: readonly (string)[];
    readonly qudt_Unit$j$udunitsCode: readonly (string)[];
    readonly qudt_Unit$j$uneceCommonCode: readonly (string)[];
    readonly qudt_Unit$j$unitOfSystem: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[];

    constructor(parameters: { readonly identifier?: (rdfjs.BlankNode | rdfjs.NamedNode) | string, readonly qudt_Unit$j$altSymbol?: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[], readonly qudt_Unit$j$applicableSystem?: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[], readonly qudt_Unit$j$conversionMultiplier?: number | purify.Maybe<number>, readonly qudt_Unit$j$conversionMultiplierSN?: number | purify.Maybe<number>, readonly qudt_Unit$j$conversionOffset?: number | purify.Maybe<number>, readonly qudt_Unit$j$conversionOffsetSN?: number | purify.Maybe<number>, readonly qudt_Unit$j$definedUnitOfSystem?: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[], readonly qudt_Unit$j$derivedCoherentUnitOfSystem?: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[], readonly qudt_Unit$j$derivedUnitOfSystem?: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[], readonly qudt_Unit$j$expression?: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[], readonly qudt_Unit$j$factorUnitScalar?: number | purify.Maybe<number>, readonly qudt_Unit$j$hasDimensionVector: Quantity_Kind$W$Dimension$W$Vector, readonly qudt_Unit$j$hasFactorUnit?: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[], readonly qudt_Unit$j$hasQuantityKind: purify.NonEmptyList<Quantity_Kind>, readonly qudt_Unit$j$iec61360Code?: readonly (string)[], readonly qudt_Unit$j$latexDefinition?: readonly (string)[], readonly qudt_Unit$j$latexSymbol?: readonly (string)[], readonly qudt_Unit$j$mathMLdefinition?: purify.Maybe<string> | string, readonly qudt_Unit$j$omUnit?: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[], readonly qudt_Unit$j$prefix?: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal) | Date | boolean | number | purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)> | string, readonly qudt_Unit$j$qkdvDenominator?: Quantity_Kind$W$Dimension$W$Vector | purify.Maybe<Quantity_Kind$W$Dimension$W$Vector>, readonly qudt_Unit$j$qkdvNumerator?: Quantity_Kind$W$Dimension$W$Vector | purify.Maybe<Quantity_Kind$W$Dimension$W$Vector>, readonly qudt_Unit$j$scalingOf?: (rdfjs.BlankNode | rdfjs.NamedNode) | purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode)> | string, readonly qudt_Unit$j$siExactMatch?: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal) | Date | boolean | number | purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)> | string, readonly qudt_Unit$j$siUnitsExpression?: readonly (string)[], readonly qudt_Unit$j$symbol?: (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal) | Date | boolean | number | purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)> | string, readonly qudt_Unit$j$ucumCode?: readonly (string)[], readonly qudt_Unit$j$udunitsCode?: readonly (string)[], readonly qudt_Unit$j$uneceCommonCode?: readonly (string)[], readonly qudt_Unit$j$unitOfSystem?: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[] } & ConstructorParameters<typeof Abstract_Unit>[0]) {
        super(parameters);
        if (typeof parameters.qudt_Unit$j$altSymbol === "undefined") { this.qudt_Unit$j$altSymbol = []; } else if (Array.isArray(parameters.qudt_Unit$j$altSymbol)) { this.qudt_Unit$j$altSymbol = parameters.qudt_Unit$j$altSymbol; } else { this.qudt_Unit$j$altSymbol =( parameters.qudt_Unit$j$altSymbol) as never;
         }

        if (typeof parameters.qudt_Unit$j$applicableSystem === "undefined") { this.qudt_Unit$j$applicableSystem = []; } else if (Array.isArray(parameters.qudt_Unit$j$applicableSystem)) { this.qudt_Unit$j$applicableSystem = parameters.qudt_Unit$j$applicableSystem; } else { this.qudt_Unit$j$applicableSystem =( parameters.qudt_Unit$j$applicableSystem) as never;
         }

        if (purify.Maybe.isMaybe(parameters.qudt_Unit$j$conversionMultiplier)) { this.qudt_Unit$j$conversionMultiplier = parameters.qudt_Unit$j$conversionMultiplier; } else if (typeof parameters.qudt_Unit$j$conversionMultiplier === "number") { this.qudt_Unit$j$conversionMultiplier = purify.Maybe.of(parameters.qudt_Unit$j$conversionMultiplier); } else if (typeof parameters.qudt_Unit$j$conversionMultiplier === "undefined") { this.qudt_Unit$j$conversionMultiplier = purify.Maybe.empty(); } else { this.qudt_Unit$j$conversionMultiplier =( parameters.qudt_Unit$j$conversionMultiplier) as never;
         }

        if (purify.Maybe.isMaybe(parameters.qudt_Unit$j$conversionMultiplierSN)) { this.qudt_Unit$j$conversionMultiplierSN = parameters.qudt_Unit$j$conversionMultiplierSN; } else if (typeof parameters.qudt_Unit$j$conversionMultiplierSN === "number") { this.qudt_Unit$j$conversionMultiplierSN = purify.Maybe.of(parameters.qudt_Unit$j$conversionMultiplierSN); } else if (typeof parameters.qudt_Unit$j$conversionMultiplierSN === "undefined") { this.qudt_Unit$j$conversionMultiplierSN = purify.Maybe.empty(); } else { this.qudt_Unit$j$conversionMultiplierSN =( parameters.qudt_Unit$j$conversionMultiplierSN) as never;
         }

        if (purify.Maybe.isMaybe(parameters.qudt_Unit$j$conversionOffset)) { this.qudt_Unit$j$conversionOffset = parameters.qudt_Unit$j$conversionOffset; } else if (typeof parameters.qudt_Unit$j$conversionOffset === "number") { this.qudt_Unit$j$conversionOffset = purify.Maybe.of(parameters.qudt_Unit$j$conversionOffset); } else if (typeof parameters.qudt_Unit$j$conversionOffset === "undefined") { this.qudt_Unit$j$conversionOffset = purify.Maybe.empty(); } else { this.qudt_Unit$j$conversionOffset =( parameters.qudt_Unit$j$conversionOffset) as never;
         }

        if (purify.Maybe.isMaybe(parameters.qudt_Unit$j$conversionOffsetSN)) { this.qudt_Unit$j$conversionOffsetSN = parameters.qudt_Unit$j$conversionOffsetSN; } else if (typeof parameters.qudt_Unit$j$conversionOffsetSN === "number") { this.qudt_Unit$j$conversionOffsetSN = purify.Maybe.of(parameters.qudt_Unit$j$conversionOffsetSN); } else if (typeof parameters.qudt_Unit$j$conversionOffsetSN === "undefined") { this.qudt_Unit$j$conversionOffsetSN = purify.Maybe.empty(); } else { this.qudt_Unit$j$conversionOffsetSN =( parameters.qudt_Unit$j$conversionOffsetSN) as never;
         }

        if (typeof parameters.qudt_Unit$j$definedUnitOfSystem === "undefined") { this.qudt_Unit$j$definedUnitOfSystem = []; } else if (Array.isArray(parameters.qudt_Unit$j$definedUnitOfSystem)) { this.qudt_Unit$j$definedUnitOfSystem = parameters.qudt_Unit$j$definedUnitOfSystem; } else { this.qudt_Unit$j$definedUnitOfSystem =( parameters.qudt_Unit$j$definedUnitOfSystem) as never;
         }

        if (typeof parameters.qudt_Unit$j$derivedCoherentUnitOfSystem === "undefined") { this.qudt_Unit$j$derivedCoherentUnitOfSystem = []; } else if (Array.isArray(parameters.qudt_Unit$j$derivedCoherentUnitOfSystem)) { this.qudt_Unit$j$derivedCoherentUnitOfSystem = parameters.qudt_Unit$j$derivedCoherentUnitOfSystem; } else { this.qudt_Unit$j$derivedCoherentUnitOfSystem =( parameters.qudt_Unit$j$derivedCoherentUnitOfSystem) as never;
         }

        if (typeof parameters.qudt_Unit$j$derivedUnitOfSystem === "undefined") { this.qudt_Unit$j$derivedUnitOfSystem = []; } else if (Array.isArray(parameters.qudt_Unit$j$derivedUnitOfSystem)) { this.qudt_Unit$j$derivedUnitOfSystem = parameters.qudt_Unit$j$derivedUnitOfSystem; } else { this.qudt_Unit$j$derivedUnitOfSystem =( parameters.qudt_Unit$j$derivedUnitOfSystem) as never;
         }

        if (typeof parameters.qudt_Unit$j$expression === "undefined") { this.qudt_Unit$j$expression = []; } else if (Array.isArray(parameters.qudt_Unit$j$expression)) { this.qudt_Unit$j$expression = parameters.qudt_Unit$j$expression; } else { this.qudt_Unit$j$expression =( parameters.qudt_Unit$j$expression) as never;
         }

        if (purify.Maybe.isMaybe(parameters.qudt_Unit$j$factorUnitScalar)) { this.qudt_Unit$j$factorUnitScalar = parameters.qudt_Unit$j$factorUnitScalar; } else if (typeof parameters.qudt_Unit$j$factorUnitScalar === "number") { this.qudt_Unit$j$factorUnitScalar = purify.Maybe.of(parameters.qudt_Unit$j$factorUnitScalar); } else if (typeof parameters.qudt_Unit$j$factorUnitScalar === "undefined") { this.qudt_Unit$j$factorUnitScalar = purify.Maybe.empty(); } else { this.qudt_Unit$j$factorUnitScalar =( parameters.qudt_Unit$j$factorUnitScalar) as never;
         }

        this.qudt_Unit$j$hasDimensionVector = parameters.qudt_Unit$j$hasDimensionVector;
        if (typeof parameters.qudt_Unit$j$hasFactorUnit === "undefined") { this.qudt_Unit$j$hasFactorUnit = []; } else if (Array.isArray(parameters.qudt_Unit$j$hasFactorUnit)) { this.qudt_Unit$j$hasFactorUnit = parameters.qudt_Unit$j$hasFactorUnit; } else { this.qudt_Unit$j$hasFactorUnit =( parameters.qudt_Unit$j$hasFactorUnit) as never;
         }

        this.qudt_Unit$j$hasQuantityKind = parameters.qudt_Unit$j$hasQuantityKind;
        if (typeof parameters.qudt_Unit$j$iec61360Code === "undefined") { this.qudt_Unit$j$iec61360Code = []; } else if (Array.isArray(parameters.qudt_Unit$j$iec61360Code)) { this.qudt_Unit$j$iec61360Code = parameters.qudt_Unit$j$iec61360Code; } else { this.qudt_Unit$j$iec61360Code =( parameters.qudt_Unit$j$iec61360Code) as never;
         }

        if (typeof parameters.qudt_Unit$j$latexDefinition === "undefined") { this.qudt_Unit$j$latexDefinition = []; } else if (Array.isArray(parameters.qudt_Unit$j$latexDefinition)) { this.qudt_Unit$j$latexDefinition = parameters.qudt_Unit$j$latexDefinition; } else { this.qudt_Unit$j$latexDefinition =( parameters.qudt_Unit$j$latexDefinition) as never;
         }

        if (typeof parameters.qudt_Unit$j$latexSymbol === "undefined") { this.qudt_Unit$j$latexSymbol = []; } else if (Array.isArray(parameters.qudt_Unit$j$latexSymbol)) { this.qudt_Unit$j$latexSymbol = parameters.qudt_Unit$j$latexSymbol; } else { this.qudt_Unit$j$latexSymbol =( parameters.qudt_Unit$j$latexSymbol) as never;
         }

        if (purify.Maybe.isMaybe(parameters.qudt_Unit$j$mathMLdefinition)) { this.qudt_Unit$j$mathMLdefinition = parameters.qudt_Unit$j$mathMLdefinition; } else if (typeof parameters.qudt_Unit$j$mathMLdefinition === "string") { this.qudt_Unit$j$mathMLdefinition = purify.Maybe.of(parameters.qudt_Unit$j$mathMLdefinition); } else if (typeof parameters.qudt_Unit$j$mathMLdefinition === "undefined") { this.qudt_Unit$j$mathMLdefinition = purify.Maybe.empty(); } else { this.qudt_Unit$j$mathMLdefinition =( parameters.qudt_Unit$j$mathMLdefinition) as never;
         }

        if (typeof parameters.qudt_Unit$j$omUnit === "undefined") { this.qudt_Unit$j$omUnit = []; } else if (Array.isArray(parameters.qudt_Unit$j$omUnit)) { this.qudt_Unit$j$omUnit = parameters.qudt_Unit$j$omUnit; } else { this.qudt_Unit$j$omUnit =( parameters.qudt_Unit$j$omUnit) as never;
         }

        if (purify.Maybe.isMaybe(parameters.qudt_Unit$j$prefix)) { this.qudt_Unit$j$prefix = parameters.qudt_Unit$j$prefix; } else if (typeof parameters.qudt_Unit$j$prefix === "boolean") { this.qudt_Unit$j$prefix = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_Unit$j$prefix, { dataFactory })); } else if (typeof parameters.qudt_Unit$j$prefix === "object" && parameters.qudt_Unit$j$prefix instanceof Date) { this.qudt_Unit$j$prefix = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_Unit$j$prefix, { dataFactory })); } else if (typeof parameters.qudt_Unit$j$prefix === "number") { this.qudt_Unit$j$prefix = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_Unit$j$prefix, { dataFactory })); } else if (typeof parameters.qudt_Unit$j$prefix === "string") { this.qudt_Unit$j$prefix = purify.Maybe.of(dataFactory.literal(parameters.qudt_Unit$j$prefix)); } else if (typeof parameters.qudt_Unit$j$prefix === "object") { this.qudt_Unit$j$prefix = purify.Maybe.of(parameters.qudt_Unit$j$prefix); } else if (typeof parameters.qudt_Unit$j$prefix === "undefined") { this.qudt_Unit$j$prefix = purify.Maybe.empty(); } else { this.qudt_Unit$j$prefix =( parameters.qudt_Unit$j$prefix) as never;
         }

        if (purify.Maybe.isMaybe(parameters.qudt_Unit$j$qkdvDenominator)) { this.qudt_Unit$j$qkdvDenominator = parameters.qudt_Unit$j$qkdvDenominator; } else if (typeof parameters.qudt_Unit$j$qkdvDenominator === "object" && parameters.qudt_Unit$j$qkdvDenominator instanceof Quantity_Kind$W$Dimension$W$Vector) { this.qudt_Unit$j$qkdvDenominator = purify.Maybe.of(parameters.qudt_Unit$j$qkdvDenominator); } else if (typeof parameters.qudt_Unit$j$qkdvDenominator === "undefined") { this.qudt_Unit$j$qkdvDenominator = purify.Maybe.empty(); } else { this.qudt_Unit$j$qkdvDenominator =( parameters.qudt_Unit$j$qkdvDenominator) as never;
         }

        if (purify.Maybe.isMaybe(parameters.qudt_Unit$j$qkdvNumerator)) { this.qudt_Unit$j$qkdvNumerator = parameters.qudt_Unit$j$qkdvNumerator; } else if (typeof parameters.qudt_Unit$j$qkdvNumerator === "object" && parameters.qudt_Unit$j$qkdvNumerator instanceof Quantity_Kind$W$Dimension$W$Vector) { this.qudt_Unit$j$qkdvNumerator = purify.Maybe.of(parameters.qudt_Unit$j$qkdvNumerator); } else if (typeof parameters.qudt_Unit$j$qkdvNumerator === "undefined") { this.qudt_Unit$j$qkdvNumerator = purify.Maybe.empty(); } else { this.qudt_Unit$j$qkdvNumerator =( parameters.qudt_Unit$j$qkdvNumerator) as never;
         }

        if (purify.Maybe.isMaybe(parameters.qudt_Unit$j$scalingOf)) { this.qudt_Unit$j$scalingOf = parameters.qudt_Unit$j$scalingOf; } else if (typeof parameters.qudt_Unit$j$scalingOf === "object") { this.qudt_Unit$j$scalingOf = purify.Maybe.of(parameters.qudt_Unit$j$scalingOf); } else if (typeof parameters.qudt_Unit$j$scalingOf === "string") { this.qudt_Unit$j$scalingOf = purify.Maybe.of(dataFactory.namedNode(parameters.qudt_Unit$j$scalingOf)); } else if (typeof parameters.qudt_Unit$j$scalingOf === "undefined") { this.qudt_Unit$j$scalingOf = purify.Maybe.empty(); } else { this.qudt_Unit$j$scalingOf =( parameters.qudt_Unit$j$scalingOf) as never;
         }

        if (purify.Maybe.isMaybe(parameters.qudt_Unit$j$siExactMatch)) { this.qudt_Unit$j$siExactMatch = parameters.qudt_Unit$j$siExactMatch; } else if (typeof parameters.qudt_Unit$j$siExactMatch === "boolean") { this.qudt_Unit$j$siExactMatch = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_Unit$j$siExactMatch, { dataFactory })); } else if (typeof parameters.qudt_Unit$j$siExactMatch === "object" && parameters.qudt_Unit$j$siExactMatch instanceof Date) { this.qudt_Unit$j$siExactMatch = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_Unit$j$siExactMatch, { dataFactory })); } else if (typeof parameters.qudt_Unit$j$siExactMatch === "number") { this.qudt_Unit$j$siExactMatch = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_Unit$j$siExactMatch, { dataFactory })); } else if (typeof parameters.qudt_Unit$j$siExactMatch === "string") { this.qudt_Unit$j$siExactMatch = purify.Maybe.of(dataFactory.literal(parameters.qudt_Unit$j$siExactMatch)); } else if (typeof parameters.qudt_Unit$j$siExactMatch === "object") { this.qudt_Unit$j$siExactMatch = purify.Maybe.of(parameters.qudt_Unit$j$siExactMatch); } else if (typeof parameters.qudt_Unit$j$siExactMatch === "undefined") { this.qudt_Unit$j$siExactMatch = purify.Maybe.empty(); } else { this.qudt_Unit$j$siExactMatch =( parameters.qudt_Unit$j$siExactMatch) as never;
         }

        if (typeof parameters.qudt_Unit$j$siUnitsExpression === "undefined") { this.qudt_Unit$j$siUnitsExpression = []; } else if (Array.isArray(parameters.qudt_Unit$j$siUnitsExpression)) { this.qudt_Unit$j$siUnitsExpression = parameters.qudt_Unit$j$siUnitsExpression; } else { this.qudt_Unit$j$siUnitsExpression =( parameters.qudt_Unit$j$siUnitsExpression) as never;
         }

        if (purify.Maybe.isMaybe(parameters.qudt_Unit$j$symbol)) { this.qudt_Unit$j$symbol = parameters.qudt_Unit$j$symbol; } else if (typeof parameters.qudt_Unit$j$symbol === "boolean") { this.qudt_Unit$j$symbol = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_Unit$j$symbol, { dataFactory })); } else if (typeof parameters.qudt_Unit$j$symbol === "object" && parameters.qudt_Unit$j$symbol instanceof Date) { this.qudt_Unit$j$symbol = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_Unit$j$symbol, { dataFactory })); } else if (typeof parameters.qudt_Unit$j$symbol === "number") { this.qudt_Unit$j$symbol = purify.Maybe.of(rdfLiteral.toRdf(parameters.qudt_Unit$j$symbol, { dataFactory })); } else if (typeof parameters.qudt_Unit$j$symbol === "string") { this.qudt_Unit$j$symbol = purify.Maybe.of(dataFactory.literal(parameters.qudt_Unit$j$symbol)); } else if (typeof parameters.qudt_Unit$j$symbol === "object") { this.qudt_Unit$j$symbol = purify.Maybe.of(parameters.qudt_Unit$j$symbol); } else if (typeof parameters.qudt_Unit$j$symbol === "undefined") { this.qudt_Unit$j$symbol = purify.Maybe.empty(); } else { this.qudt_Unit$j$symbol =( parameters.qudt_Unit$j$symbol) as never;
         }

        if (typeof parameters.qudt_Unit$j$ucumCode === "undefined") { this.qudt_Unit$j$ucumCode = []; } else if (Array.isArray(parameters.qudt_Unit$j$ucumCode)) { this.qudt_Unit$j$ucumCode = parameters.qudt_Unit$j$ucumCode; } else { this.qudt_Unit$j$ucumCode =( parameters.qudt_Unit$j$ucumCode) as never;
         }

        if (typeof parameters.qudt_Unit$j$udunitsCode === "undefined") { this.qudt_Unit$j$udunitsCode = []; } else if (Array.isArray(parameters.qudt_Unit$j$udunitsCode)) { this.qudt_Unit$j$udunitsCode = parameters.qudt_Unit$j$udunitsCode; } else { this.qudt_Unit$j$udunitsCode =( parameters.qudt_Unit$j$udunitsCode) as never;
         }

        if (typeof parameters.qudt_Unit$j$uneceCommonCode === "undefined") { this.qudt_Unit$j$uneceCommonCode = []; } else if (Array.isArray(parameters.qudt_Unit$j$uneceCommonCode)) { this.qudt_Unit$j$uneceCommonCode = parameters.qudt_Unit$j$uneceCommonCode; } else { this.qudt_Unit$j$uneceCommonCode =( parameters.qudt_Unit$j$uneceCommonCode) as never;
         }

        if (typeof parameters.qudt_Unit$j$unitOfSystem === "undefined") { this.qudt_Unit$j$unitOfSystem = []; } else if (Array.isArray(parameters.qudt_Unit$j$unitOfSystem)) { this.qudt_Unit$j$unitOfSystem = parameters.qudt_Unit$j$unitOfSystem; } else { this.qudt_Unit$j$unitOfSystem =( parameters.qudt_Unit$j$unitOfSystem) as never;
         }
    }

    override get identifier(): (rdfjs.BlankNode | rdfjs.NamedNode) {
        if (typeof this._identifier === "undefined") { this._identifier = dataFactory.blankNode(); } return this._identifier;
    }

    override equals(other: Unit): EqualsResult {
        return super.equals(other).chain(() => (((left, right) => arrayEquals(left, right, booleanEquals)))(this.qudt_Unit$j$altSymbol, other.qudt_Unit$j$altSymbol).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$altSymbol", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, booleanEquals)))(this.qudt_Unit$j$applicableSystem, other.qudt_Unit$j$applicableSystem).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$applicableSystem", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => maybeEquals(left, right, strictEquals)))(this.qudt_Unit$j$conversionMultiplier, other.qudt_Unit$j$conversionMultiplier).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$conversionMultiplier", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => maybeEquals(left, right, strictEquals)))(this.qudt_Unit$j$conversionMultiplierSN, other.qudt_Unit$j$conversionMultiplierSN).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$conversionMultiplierSN", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => maybeEquals(left, right, strictEquals)))(this.qudt_Unit$j$conversionOffset, other.qudt_Unit$j$conversionOffset).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$conversionOffset", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => maybeEquals(left, right, strictEquals)))(this.qudt_Unit$j$conversionOffsetSN, other.qudt_Unit$j$conversionOffsetSN).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$conversionOffsetSN", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, booleanEquals)))(this.qudt_Unit$j$definedUnitOfSystem, other.qudt_Unit$j$definedUnitOfSystem).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$definedUnitOfSystem", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, booleanEquals)))(this.qudt_Unit$j$derivedCoherentUnitOfSystem, other.qudt_Unit$j$derivedCoherentUnitOfSystem).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$derivedCoherentUnitOfSystem", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, booleanEquals)))(this.qudt_Unit$j$derivedUnitOfSystem, other.qudt_Unit$j$derivedUnitOfSystem).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$derivedUnitOfSystem", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, booleanEquals)))(this.qudt_Unit$j$expression, other.qudt_Unit$j$expression).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$expression", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => maybeEquals(left, right, strictEquals)))(this.qudt_Unit$j$factorUnitScalar, other.qudt_Unit$j$factorUnitScalar).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$factorUnitScalar", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => left.equals(right)))(this.qudt_Unit$j$hasDimensionVector, other.qudt_Unit$j$hasDimensionVector).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$hasDimensionVector", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, booleanEquals)))(this.qudt_Unit$j$hasFactorUnit, other.qudt_Unit$j$hasFactorUnit).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$hasFactorUnit", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, ((left, right) => left.equals(right)))))(this.qudt_Unit$j$hasQuantityKind, other.qudt_Unit$j$hasQuantityKind).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$hasQuantityKind", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, strictEquals)))(this.qudt_Unit$j$iec61360Code, other.qudt_Unit$j$iec61360Code).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$iec61360Code", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, strictEquals)))(this.qudt_Unit$j$latexDefinition, other.qudt_Unit$j$latexDefinition).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$latexDefinition", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, strictEquals)))(this.qudt_Unit$j$latexSymbol, other.qudt_Unit$j$latexSymbol).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$latexSymbol", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => maybeEquals(left, right, strictEquals)))(this.qudt_Unit$j$mathMLdefinition, other.qudt_Unit$j$mathMLdefinition).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$mathMLdefinition", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, booleanEquals)))(this.qudt_Unit$j$omUnit, other.qudt_Unit$j$omUnit).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$omUnit", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => maybeEquals(left, right, booleanEquals)))(this.qudt_Unit$j$prefix, other.qudt_Unit$j$prefix).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$prefix", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => maybeEquals(left, right, ((left, right) => left.equals(right)))))(this.qudt_Unit$j$qkdvDenominator, other.qudt_Unit$j$qkdvDenominator).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$qkdvDenominator", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => maybeEquals(left, right, ((left, right) => left.equals(right)))))(this.qudt_Unit$j$qkdvNumerator, other.qudt_Unit$j$qkdvNumerator).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$qkdvNumerator", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => maybeEquals(left, right, booleanEquals)))(this.qudt_Unit$j$scalingOf, other.qudt_Unit$j$scalingOf).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$scalingOf", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => maybeEquals(left, right, booleanEquals)))(this.qudt_Unit$j$siExactMatch, other.qudt_Unit$j$siExactMatch).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$siExactMatch", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, strictEquals)))(this.qudt_Unit$j$siUnitsExpression, other.qudt_Unit$j$siUnitsExpression).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$siUnitsExpression", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => maybeEquals(left, right, booleanEquals)))(this.qudt_Unit$j$symbol, other.qudt_Unit$j$symbol).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$symbol", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, strictEquals)))(this.qudt_Unit$j$ucumCode, other.qudt_Unit$j$ucumCode).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$ucumCode", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, strictEquals)))(this.qudt_Unit$j$udunitsCode, other.qudt_Unit$j$udunitsCode).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$udunitsCode", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, strictEquals)))(this.qudt_Unit$j$uneceCommonCode, other.qudt_Unit$j$uneceCommonCode).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$uneceCommonCode", propertyValuesUnequal, type: "Property" as const }))).chain(() => (((left, right) => arrayEquals(left, right, booleanEquals)))(this.qudt_Unit$j$unitOfSystem, other.qudt_Unit$j$unitOfSystem).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_Unit$j$unitOfSystem", propertyValuesUnequal, type: "Property" as const })));
    }

    override hash<HasherT extends { update: (message: string | number[] | ArrayBuffer | Uint8Array) => void; }>(_hasher: HasherT): HasherT {
        this.hashShaclProperties(_hasher);
        return _hasher;
    }

    protected override hashShaclProperties<HasherT extends { update: (message: string | number[] | ArrayBuffer | Uint8Array) => void; }>(_hasher: HasherT): HasherT {
        super.hashShaclProperties(_hasher);
        for (const _item0 of this.qudt_Unit$j$altSymbol) { _hasher.update(_item0.termType);
        _hasher.update(_item0.value); }

        for (const _item0 of this.qudt_Unit$j$applicableSystem) { _hasher.update(_item0.termType);
        _hasher.update(_item0.value); }

        this.qudt_Unit$j$conversionMultiplier.ifJust((_value0) => { _hasher.update(_value0.toString()); })
        this.qudt_Unit$j$conversionMultiplierSN.ifJust((_value0) => { _hasher.update(_value0.toString()); })
        this.qudt_Unit$j$conversionOffset.ifJust((_value0) => { _hasher.update(_value0.toString()); })
        this.qudt_Unit$j$conversionOffsetSN.ifJust((_value0) => { _hasher.update(_value0.toString()); })
        for (const _item0 of this.qudt_Unit$j$definedUnitOfSystem) { _hasher.update(_item0.termType);
        _hasher.update(_item0.value); }

        for (const _item0 of this.qudt_Unit$j$derivedCoherentUnitOfSystem) { _hasher.update(_item0.termType);
        _hasher.update(_item0.value); }

        for (const _item0 of this.qudt_Unit$j$derivedUnitOfSystem) { _hasher.update(_item0.termType);
        _hasher.update(_item0.value); }

        for (const _item0 of this.qudt_Unit$j$expression) { _hasher.update(_item0.termType);
        _hasher.update(_item0.value); }

        this.qudt_Unit$j$factorUnitScalar.ifJust((_value0) => { _hasher.update(_value0.toString()); })
        this.qudt_Unit$j$hasDimensionVector.hash(_hasher);
        for (const _item0 of this.qudt_Unit$j$hasFactorUnit) { _hasher.update(_item0.termType);
        _hasher.update(_item0.value); }

        for (const _item0 of this.qudt_Unit$j$hasQuantityKind) { _item0.hash(_hasher); }

        for (const _item0 of this.qudt_Unit$j$iec61360Code) { _hasher.update(_item0); }

        for (const _item0 of this.qudt_Unit$j$latexDefinition) { _hasher.update(_item0); }

        for (const _item0 of this.qudt_Unit$j$latexSymbol) { _hasher.update(_item0); }

        this.qudt_Unit$j$mathMLdefinition.ifJust((_value0) => { _hasher.update(_value0); })
        for (const _item0 of this.qudt_Unit$j$omUnit) { _hasher.update(_item0.termType);
        _hasher.update(_item0.value); }

        this.qudt_Unit$j$prefix.ifJust((_value0) => { _hasher.update(_value0.termType);
        _hasher.update(_value0.value); })
        this.qudt_Unit$j$qkdvDenominator.ifJust((_value0) => { _value0.hash(_hasher); })
        this.qudt_Unit$j$qkdvNumerator.ifJust((_value0) => { _value0.hash(_hasher); })
        this.qudt_Unit$j$scalingOf.ifJust((_value0) => { _hasher.update(_value0.termType);
        _hasher.update(_value0.value); })
        this.qudt_Unit$j$siExactMatch.ifJust((_value0) => { _hasher.update(_value0.termType);
        _hasher.update(_value0.value); })
        for (const _item0 of this.qudt_Unit$j$siUnitsExpression) { _hasher.update(_item0); }

        this.qudt_Unit$j$symbol.ifJust((_value0) => { _hasher.update(_value0.termType);
        _hasher.update(_value0.value); })
        for (const _item0 of this.qudt_Unit$j$ucumCode) { _hasher.update(_item0); }

        for (const _item0 of this.qudt_Unit$j$udunitsCode) { _hasher.update(_item0); }

        for (const _item0 of this.qudt_Unit$j$uneceCommonCode) { _hasher.update(_item0); }

        for (const _item0 of this.qudt_Unit$j$unitOfSystem) { _hasher.update(_item0.termType);
        _hasher.update(_item0.value); }

        return _hasher;
    }

    override toJson(): { readonly "qudt_Unit$j$altSymbol": readonly ({ readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" })[]; readonly "qudt_Unit$j$applicableSystem": readonly ({ readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" })[]; readonly "qudt_Unit$j$conversionMultiplier": (number) | undefined; readonly "qudt_Unit$j$conversionMultiplierSN": (number) | undefined; readonly "qudt_Unit$j$conversionOffset": (number) | undefined; readonly "qudt_Unit$j$conversionOffsetSN": (number) | undefined; readonly "qudt_Unit$j$definedUnitOfSystem": readonly ({ readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" })[]; readonly "qudt_Unit$j$derivedCoherentUnitOfSystem": readonly ({ readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" })[]; readonly "qudt_Unit$j$derivedUnitOfSystem": readonly ({ readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" })[]; readonly "qudt_Unit$j$expression": readonly ({ readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" })[]; readonly "qudt_Unit$j$factorUnitScalar": (number) | undefined; readonly "qudt_Unit$j$hasDimensionVector": ReturnType<Quantity_Kind$W$Dimension$W$Vector["toJson"]>; readonly "qudt_Unit$j$hasFactorUnit": readonly ({ readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" })[]; readonly "qudt_Unit$j$hasQuantityKind": readonly (ReturnType<Quantity_Kind["toJson"]>)[]; readonly "qudt_Unit$j$iec61360Code": readonly (string)[]; readonly "qudt_Unit$j$latexDefinition": readonly (string)[]; readonly "qudt_Unit$j$latexSymbol": readonly (string)[]; readonly "qudt_Unit$j$mathMLdefinition": (string) | undefined; readonly "qudt_Unit$j$omUnit": readonly ({ readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" })[]; readonly "qudt_Unit$j$prefix": ({ readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" }) | undefined; readonly "qudt_Unit$j$qkdvDenominator": (ReturnType<Quantity_Kind$W$Dimension$W$Vector["toJson"]>) | undefined; readonly "qudt_Unit$j$qkdvNumerator": (ReturnType<Quantity_Kind$W$Dimension$W$Vector["toJson"]>) | undefined; readonly "qudt_Unit$j$scalingOf": ({ readonly "@id": string }) | undefined; readonly "qudt_Unit$j$siExactMatch": ({ readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" }) | undefined; readonly "qudt_Unit$j$siUnitsExpression": readonly (string)[]; readonly "qudt_Unit$j$symbol": ({ readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" }) | undefined; readonly "qudt_Unit$j$ucumCode": readonly (string)[]; readonly "qudt_Unit$j$udunitsCode": readonly (string)[]; readonly "qudt_Unit$j$uneceCommonCode": readonly (string)[]; readonly "qudt_Unit$j$unitOfSystem": readonly ({ readonly "@id": string, readonly termType: "BlankNode" | "NamedNode" } | { readonly "@language": string | undefined, readonly "@type": string | undefined, readonly "@value": string, readonly termType: "Literal" })[] } & ReturnType<Abstract_Unit["toJson"]> {
        return JSON.parse(JSON.stringify({ ...super.toJson(),qudt_Unit$j$altSymbol: this.qudt_Unit$j$altSymbol.map(_item => ((_item.termType === "Literal") ? { "@language": _item.language.length > 0 ? _item.language : undefined, "@type": _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? _item.datatype.value : undefined, "@value": _item.value, termType: "Literal" as const } : (_item.termType === "NamedNode") ? { "@id": _item.value, termType: "NamedNode" as const } : { "@id": `_:${_item.value}`, termType: "BlankNode" as const })),qudt_Unit$j$applicableSystem: this.qudt_Unit$j$applicableSystem.map(_item => ((_item.termType === "Literal") ? { "@language": _item.language.length > 0 ? _item.language : undefined, "@type": _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? _item.datatype.value : undefined, "@value": _item.value, termType: "Literal" as const } : (_item.termType === "NamedNode") ? { "@id": _item.value, termType: "NamedNode" as const } : { "@id": `_:${_item.value}`, termType: "BlankNode" as const })),qudt_Unit$j$conversionMultiplier: this.qudt_Unit$j$conversionMultiplier.map(_item => (_item)).extract(),qudt_Unit$j$conversionMultiplierSN: this.qudt_Unit$j$conversionMultiplierSN.map(_item => (_item)).extract(),qudt_Unit$j$conversionOffset: this.qudt_Unit$j$conversionOffset.map(_item => (_item)).extract(),qudt_Unit$j$conversionOffsetSN: this.qudt_Unit$j$conversionOffsetSN.map(_item => (_item)).extract(),qudt_Unit$j$definedUnitOfSystem: this.qudt_Unit$j$definedUnitOfSystem.map(_item => ((_item.termType === "Literal") ? { "@language": _item.language.length > 0 ? _item.language : undefined, "@type": _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? _item.datatype.value : undefined, "@value": _item.value, termType: "Literal" as const } : (_item.termType === "NamedNode") ? { "@id": _item.value, termType: "NamedNode" as const } : { "@id": `_:${_item.value}`, termType: "BlankNode" as const })),qudt_Unit$j$derivedCoherentUnitOfSystem: this.qudt_Unit$j$derivedCoherentUnitOfSystem.map(_item => ((_item.termType === "Literal") ? { "@language": _item.language.length > 0 ? _item.language : undefined, "@type": _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? _item.datatype.value : undefined, "@value": _item.value, termType: "Literal" as const } : (_item.termType === "NamedNode") ? { "@id": _item.value, termType: "NamedNode" as const } : { "@id": `_:${_item.value}`, termType: "BlankNode" as const })),qudt_Unit$j$derivedUnitOfSystem: this.qudt_Unit$j$derivedUnitOfSystem.map(_item => ((_item.termType === "Literal") ? { "@language": _item.language.length > 0 ? _item.language : undefined, "@type": _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? _item.datatype.value : undefined, "@value": _item.value, termType: "Literal" as const } : (_item.termType === "NamedNode") ? { "@id": _item.value, termType: "NamedNode" as const } : { "@id": `_:${_item.value}`, termType: "BlankNode" as const })),qudt_Unit$j$expression: this.qudt_Unit$j$expression.map(_item => ((_item.termType === "Literal") ? { "@language": _item.language.length > 0 ? _item.language : undefined, "@type": _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? _item.datatype.value : undefined, "@value": _item.value, termType: "Literal" as const } : (_item.termType === "NamedNode") ? { "@id": _item.value, termType: "NamedNode" as const } : { "@id": `_:${_item.value}`, termType: "BlankNode" as const })),qudt_Unit$j$factorUnitScalar: this.qudt_Unit$j$factorUnitScalar.map(_item => (_item)).extract(),qudt_Unit$j$hasDimensionVector: this.qudt_Unit$j$hasDimensionVector.toJson(),qudt_Unit$j$hasFactorUnit: this.qudt_Unit$j$hasFactorUnit.map(_item => ((_item.termType === "Literal") ? { "@language": _item.language.length > 0 ? _item.language : undefined, "@type": _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? _item.datatype.value : undefined, "@value": _item.value, termType: "Literal" as const } : (_item.termType === "NamedNode") ? { "@id": _item.value, termType: "NamedNode" as const } : { "@id": `_:${_item.value}`, termType: "BlankNode" as const })),qudt_Unit$j$hasQuantityKind: this.qudt_Unit$j$hasQuantityKind.map(_item => (_item.toJson())),qudt_Unit$j$iec61360Code: this.qudt_Unit$j$iec61360Code.map(_item => (_item)),qudt_Unit$j$latexDefinition: this.qudt_Unit$j$latexDefinition.map(_item => (_item)),qudt_Unit$j$latexSymbol: this.qudt_Unit$j$latexSymbol.map(_item => (_item)),qudt_Unit$j$mathMLdefinition: this.qudt_Unit$j$mathMLdefinition.map(_item => (_item)).extract(),qudt_Unit$j$omUnit: this.qudt_Unit$j$omUnit.map(_item => ((_item.termType === "Literal") ? { "@language": _item.language.length > 0 ? _item.language : undefined, "@type": _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? _item.datatype.value : undefined, "@value": _item.value, termType: "Literal" as const } : (_item.termType === "NamedNode") ? { "@id": _item.value, termType: "NamedNode" as const } : { "@id": `_:${_item.value}`, termType: "BlankNode" as const })),qudt_Unit$j$prefix: this.qudt_Unit$j$prefix.map(_item => ((_item.termType === "Literal") ? { "@language": _item.language.length > 0 ? _item.language : undefined, "@type": _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? _item.datatype.value : undefined, "@value": _item.value, termType: "Literal" as const } : (_item.termType === "NamedNode") ? { "@id": _item.value, termType: "NamedNode" as const } : { "@id": `_:${_item.value}`, termType: "BlankNode" as const })).extract(),qudt_Unit$j$qkdvDenominator: this.qudt_Unit$j$qkdvDenominator.map(_item => (_item.toJson())).extract(),qudt_Unit$j$qkdvNumerator: this.qudt_Unit$j$qkdvNumerator.map(_item => (_item.toJson())).extract(),qudt_Unit$j$scalingOf: this.qudt_Unit$j$scalingOf.map(_item => ((_item.termType === "BlankNode" ? { "@id": `_:${_item.value}` } : { "@id": _item.value }))).extract(),qudt_Unit$j$siExactMatch: this.qudt_Unit$j$siExactMatch.map(_item => ((_item.termType === "Literal") ? { "@language": _item.language.length > 0 ? _item.language : undefined, "@type": _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? _item.datatype.value : undefined, "@value": _item.value, termType: "Literal" as const } : (_item.termType === "NamedNode") ? { "@id": _item.value, termType: "NamedNode" as const } : { "@id": `_:${_item.value}`, termType: "BlankNode" as const })).extract(),qudt_Unit$j$siUnitsExpression: this.qudt_Unit$j$siUnitsExpression.map(_item => (_item)),qudt_Unit$j$symbol: this.qudt_Unit$j$symbol.map(_item => ((_item.termType === "Literal") ? { "@language": _item.language.length > 0 ? _item.language : undefined, "@type": _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? _item.datatype.value : undefined, "@value": _item.value, termType: "Literal" as const } : (_item.termType === "NamedNode") ? { "@id": _item.value, termType: "NamedNode" as const } : { "@id": `_:${_item.value}`, termType: "BlankNode" as const })).extract(),qudt_Unit$j$ucumCode: this.qudt_Unit$j$ucumCode.map(_item => (_item)),qudt_Unit$j$udunitsCode: this.qudt_Unit$j$udunitsCode.map(_item => (_item)),qudt_Unit$j$uneceCommonCode: this.qudt_Unit$j$uneceCommonCode.map(_item => (_item)),qudt_Unit$j$unitOfSystem: this.qudt_Unit$j$unitOfSystem.map(_item => ((_item.termType === "Literal") ? { "@language": _item.language.length > 0 ? _item.language : undefined, "@type": _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" ? _item.datatype.value : undefined, "@value": _item.value, termType: "Literal" as const } : (_item.termType === "NamedNode") ? { "@id": _item.value, termType: "NamedNode" as const } : { "@id": `_:${_item.value}`, termType: "BlankNode" as const })) } satisfies ReturnType<Unit["toJson"]>));
    }

    override toRdf({ ignoreRdfType, mutateGraph, resourceSet }: { ignoreRdfType?: boolean; mutateGraph?: rdfjsResource.MutableResource.MutateGraph, resourceSet: rdfjsResource.MutableResourceSet }): rdfjsResource.MutableResource {
        const _resource = super.toRdf({ ignoreRdfType: true, mutateGraph, resourceSet });
        if (!ignoreRdfType) { _resource.add(_resource.dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), _resource.dataFactory.namedNode("http://qudt.org/schema/qudt/Unit")); }

        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/altSymbol"), this.qudt_Unit$j$altSymbol.map((_item) => _item));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/applicableSystem"), this.qudt_Unit$j$applicableSystem.map((_item) => _item));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/conversionMultiplier"), this.qudt_Unit$j$conversionMultiplier);
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/conversionMultiplierSN"), this.qudt_Unit$j$conversionMultiplierSN);
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/conversionOffset"), this.qudt_Unit$j$conversionOffset);
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/conversionOffsetSN"), this.qudt_Unit$j$conversionOffsetSN);
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/definedUnitOfSystem"), this.qudt_Unit$j$definedUnitOfSystem.map((_item) => _item));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/derivedCoherentUnitOfSystem"), this.qudt_Unit$j$derivedCoherentUnitOfSystem.map((_item) => _item));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/derivedUnitOfSystem"), this.qudt_Unit$j$derivedUnitOfSystem.map((_item) => _item));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/expression"), this.qudt_Unit$j$expression.map((_item) => _item));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/factorUnitScalar"), this.qudt_Unit$j$factorUnitScalar);
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/hasDimensionVector"), this.qudt_Unit$j$hasDimensionVector.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet }));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/hasFactorUnit"), this.qudt_Unit$j$hasFactorUnit.map((_item) => _item));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/hasQuantityKind"), this.qudt_Unit$j$hasQuantityKind.map((_item) => _item.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet })));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/iec61360Code"), this.qudt_Unit$j$iec61360Code.map((_item) => _item));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/latexDefinition"), this.qudt_Unit$j$latexDefinition.map((_item) => _item));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/latexSymbol"), this.qudt_Unit$j$latexSymbol.map((_item) => _item));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/mathMLdefinition"), this.qudt_Unit$j$mathMLdefinition);
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/omUnit"), this.qudt_Unit$j$omUnit.map((_item) => _item));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/prefix"), this.qudt_Unit$j$prefix);
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/qkdvDenominator"), this.qudt_Unit$j$qkdvDenominator.map((_value) => _value.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet })));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/qkdvNumerator"), this.qudt_Unit$j$qkdvNumerator.map((_value) => _value.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet })));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/scalingOf"), this.qudt_Unit$j$scalingOf);
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/siExactMatch"), this.qudt_Unit$j$siExactMatch);
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/siUnitsExpression"), this.qudt_Unit$j$siUnitsExpression.map((_item) => _item));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/symbol"), this.qudt_Unit$j$symbol);
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/ucumCode"), this.qudt_Unit$j$ucumCode.map((_item) => _item));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/udunitsCode"), this.qudt_Unit$j$udunitsCode.map((_item) => _item));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/uneceCommonCode"), this.qudt_Unit$j$uneceCommonCode.map((_item) => _item));
        _resource.add(dataFactory.namedNode("http://qudt.org/schema/qudt/isUnitOfSystem"), this.qudt_Unit$j$unitOfSystem.map((_item) => _item));
        return _resource;
    }

    override toString(): string {
        return JSON.stringify(this.toJson());
    }
}

export namespace Unit {
    export function _propertiesFromJson(_json: unknown): purify.Either<zod.ZodError, { identifier: (rdfjs.BlankNode | rdfjs.NamedNode); qudt_Unit$j$altSymbol: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; qudt_Unit$j$applicableSystem: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; qudt_Unit$j$conversionMultiplier: purify.Maybe<number>; qudt_Unit$j$conversionMultiplierSN: purify.Maybe<number>; qudt_Unit$j$conversionOffset: purify.Maybe<number>; qudt_Unit$j$conversionOffsetSN: purify.Maybe<number>; qudt_Unit$j$definedUnitOfSystem: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; qudt_Unit$j$derivedCoherentUnitOfSystem: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; qudt_Unit$j$derivedUnitOfSystem: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; qudt_Unit$j$expression: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; qudt_Unit$j$factorUnitScalar: purify.Maybe<number>; qudt_Unit$j$hasDimensionVector: Quantity_Kind$W$Dimension$W$Vector; qudt_Unit$j$hasFactorUnit: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; qudt_Unit$j$hasQuantityKind: purify.NonEmptyList<Quantity_Kind>; qudt_Unit$j$iec61360Code: readonly (string)[]; qudt_Unit$j$latexDefinition: readonly (string)[]; qudt_Unit$j$latexSymbol: readonly (string)[]; qudt_Unit$j$mathMLdefinition: purify.Maybe<string>; qudt_Unit$j$omUnit: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; qudt_Unit$j$prefix: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>; qudt_Unit$j$qkdvDenominator: purify.Maybe<Quantity_Kind$W$Dimension$W$Vector>; qudt_Unit$j$qkdvNumerator: purify.Maybe<Quantity_Kind$W$Dimension$W$Vector>; qudt_Unit$j$scalingOf: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode)>; qudt_Unit$j$siExactMatch: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>; qudt_Unit$j$siUnitsExpression: readonly (string)[]; qudt_Unit$j$symbol: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>; qudt_Unit$j$ucumCode: readonly (string)[]; qudt_Unit$j$udunitsCode: readonly (string)[]; qudt_Unit$j$uneceCommonCode: readonly (string)[]; qudt_Unit$j$unitOfSystem: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; } & UnwrapR<ReturnType<typeof Abstract_Unit._propertiesFromJson>>> {
        const _jsonSafeParseResult = unitJsonZodSchema().safeParse(_json);
        if (!_jsonSafeParseResult.success) { return purify.Left(_jsonSafeParseResult.error); }

        const _jsonObject = _jsonSafeParseResult.data;
        const _super0Either = Abstract_Unit._propertiesFromJson(_jsonObject);
        if (_super0Either.isLeft()) { return _super0Either; }

        const _super0 = _super0Either.unsafeCoerce()
        const identifier = (_jsonObject["@id"].startsWith("_:") ? dataFactory.blankNode(_jsonObject["@id"].substring(2)) : dataFactory.namedNode(_jsonObject["@id"]));
        const qudt_Unit$j$altSymbol = _jsonObject["qudt_Unit$j$altSymbol"].map(_item => (((_item.termType === "Literal") ? (dataFactory.literal(_item["@value"], typeof _item["@language"] !== "undefined" ? _item["@language"] : (typeof _item["@type"] !== "undefined" ? dataFactory.namedNode(_item["@type"]) : undefined))) : (((_item.termType === "NamedNode") ? (dataFactory.namedNode(_item["@id"])) : (dataFactory.blankNode(_item["@id"].substring(2))))))));
        const qudt_Unit$j$applicableSystem = _jsonObject["qudt_Unit$j$applicableSystem"].map(_item => (((_item.termType === "Literal") ? (dataFactory.literal(_item["@value"], typeof _item["@language"] !== "undefined" ? _item["@language"] : (typeof _item["@type"] !== "undefined" ? dataFactory.namedNode(_item["@type"]) : undefined))) : (((_item.termType === "NamedNode") ? (dataFactory.namedNode(_item["@id"])) : (dataFactory.blankNode(_item["@id"].substring(2))))))));
        const qudt_Unit$j$conversionMultiplier = purify.Maybe.fromNullable(_jsonObject["qudt_Unit$j$conversionMultiplier"]);
        const qudt_Unit$j$conversionMultiplierSN = purify.Maybe.fromNullable(_jsonObject["qudt_Unit$j$conversionMultiplierSN"]);
        const qudt_Unit$j$conversionOffset = purify.Maybe.fromNullable(_jsonObject["qudt_Unit$j$conversionOffset"]);
        const qudt_Unit$j$conversionOffsetSN = purify.Maybe.fromNullable(_jsonObject["qudt_Unit$j$conversionOffsetSN"]);
        const qudt_Unit$j$definedUnitOfSystem = _jsonObject["qudt_Unit$j$definedUnitOfSystem"].map(_item => (((_item.termType === "Literal") ? (dataFactory.literal(_item["@value"], typeof _item["@language"] !== "undefined" ? _item["@language"] : (typeof _item["@type"] !== "undefined" ? dataFactory.namedNode(_item["@type"]) : undefined))) : (((_item.termType === "NamedNode") ? (dataFactory.namedNode(_item["@id"])) : (dataFactory.blankNode(_item["@id"].substring(2))))))));
        const qudt_Unit$j$derivedCoherentUnitOfSystem = _jsonObject["qudt_Unit$j$derivedCoherentUnitOfSystem"].map(_item => (((_item.termType === "Literal") ? (dataFactory.literal(_item["@value"], typeof _item["@language"] !== "undefined" ? _item["@language"] : (typeof _item["@type"] !== "undefined" ? dataFactory.namedNode(_item["@type"]) : undefined))) : (((_item.termType === "NamedNode") ? (dataFactory.namedNode(_item["@id"])) : (dataFactory.blankNode(_item["@id"].substring(2))))))));
        const qudt_Unit$j$derivedUnitOfSystem = _jsonObject["qudt_Unit$j$derivedUnitOfSystem"].map(_item => (((_item.termType === "Literal") ? (dataFactory.literal(_item["@value"], typeof _item["@language"] !== "undefined" ? _item["@language"] : (typeof _item["@type"] !== "undefined" ? dataFactory.namedNode(_item["@type"]) : undefined))) : (((_item.termType === "NamedNode") ? (dataFactory.namedNode(_item["@id"])) : (dataFactory.blankNode(_item["@id"].substring(2))))))));
        const qudt_Unit$j$expression = _jsonObject["qudt_Unit$j$expression"].map(_item => (((_item.termType === "Literal") ? (dataFactory.literal(_item["@value"], typeof _item["@language"] !== "undefined" ? _item["@language"] : (typeof _item["@type"] !== "undefined" ? dataFactory.namedNode(_item["@type"]) : undefined))) : (((_item.termType === "NamedNode") ? (dataFactory.namedNode(_item["@id"])) : (dataFactory.blankNode(_item["@id"].substring(2))))))));
        const qudt_Unit$j$factorUnitScalar = purify.Maybe.fromNullable(_jsonObject["qudt_Unit$j$factorUnitScalar"]);
        const qudt_Unit$j$hasDimensionVector = Quantity_Kind$W$Dimension$W$Vector.fromJson(_jsonObject["qudt_Unit$j$hasDimensionVector"]).unsafeCoerce();
        const qudt_Unit$j$hasFactorUnit = _jsonObject["qudt_Unit$j$hasFactorUnit"].map(_item => (((_item.termType === "Literal") ? (dataFactory.literal(_item["@value"], typeof _item["@language"] !== "undefined" ? _item["@language"] : (typeof _item["@type"] !== "undefined" ? dataFactory.namedNode(_item["@type"]) : undefined))) : (((_item.termType === "NamedNode") ? (dataFactory.namedNode(_item["@id"])) : (dataFactory.blankNode(_item["@id"].substring(2))))))));
        const qudt_Unit$j$hasQuantityKind = purify.NonEmptyList.fromArray(_jsonObject["qudt_Unit$j$hasQuantityKind"]).unsafeCoerce().map(_item => (Quantity_Kind.fromJson(_item).unsafeCoerce()));
        const qudt_Unit$j$iec61360Code = _jsonObject["qudt_Unit$j$iec61360Code"];
        const qudt_Unit$j$latexDefinition = _jsonObject["qudt_Unit$j$latexDefinition"];
        const qudt_Unit$j$latexSymbol = _jsonObject["qudt_Unit$j$latexSymbol"];
        const qudt_Unit$j$mathMLdefinition = purify.Maybe.fromNullable(_jsonObject["qudt_Unit$j$mathMLdefinition"]);
        const qudt_Unit$j$omUnit = _jsonObject["qudt_Unit$j$omUnit"].map(_item => (((_item.termType === "Literal") ? (dataFactory.literal(_item["@value"], typeof _item["@language"] !== "undefined" ? _item["@language"] : (typeof _item["@type"] !== "undefined" ? dataFactory.namedNode(_item["@type"]) : undefined))) : (((_item.termType === "NamedNode") ? (dataFactory.namedNode(_item["@id"])) : (dataFactory.blankNode(_item["@id"].substring(2))))))));
        const qudt_Unit$j$prefix = purify.Maybe.fromNullable(_jsonObject["qudt_Unit$j$prefix"]).map(_item => (((_item.termType === "Literal") ? (dataFactory.literal(_item["@value"], typeof _item["@language"] !== "undefined" ? _item["@language"] : (typeof _item["@type"] !== "undefined" ? dataFactory.namedNode(_item["@type"]) : undefined))) : (((_item.termType === "NamedNode") ? (dataFactory.namedNode(_item["@id"])) : (dataFactory.blankNode(_item["@id"].substring(2))))))));
        const qudt_Unit$j$qkdvDenominator = purify.Maybe.fromNullable(_jsonObject["qudt_Unit$j$qkdvDenominator"]).map(_item => (Quantity_Kind$W$Dimension$W$Vector.fromJson(_item).unsafeCoerce()));
        const qudt_Unit$j$qkdvNumerator = purify.Maybe.fromNullable(_jsonObject["qudt_Unit$j$qkdvNumerator"]).map(_item => (Quantity_Kind$W$Dimension$W$Vector.fromJson(_item).unsafeCoerce()));
        const qudt_Unit$j$scalingOf = purify.Maybe.fromNullable(_jsonObject["qudt_Unit$j$scalingOf"]).map(_item => ((_item["@id"].startsWith("_:") ? dataFactory.blankNode(_item["@id"].substring(2)) : dataFactory.namedNode(_item["@id"]))));
        const qudt_Unit$j$siExactMatch = purify.Maybe.fromNullable(_jsonObject["qudt_Unit$j$siExactMatch"]).map(_item => (((_item.termType === "Literal") ? (dataFactory.literal(_item["@value"], typeof _item["@language"] !== "undefined" ? _item["@language"] : (typeof _item["@type"] !== "undefined" ? dataFactory.namedNode(_item["@type"]) : undefined))) : (((_item.termType === "NamedNode") ? (dataFactory.namedNode(_item["@id"])) : (dataFactory.blankNode(_item["@id"].substring(2))))))));
        const qudt_Unit$j$siUnitsExpression = _jsonObject["qudt_Unit$j$siUnitsExpression"];
        const qudt_Unit$j$symbol = purify.Maybe.fromNullable(_jsonObject["qudt_Unit$j$symbol"]).map(_item => (((_item.termType === "Literal") ? (dataFactory.literal(_item["@value"], typeof _item["@language"] !== "undefined" ? _item["@language"] : (typeof _item["@type"] !== "undefined" ? dataFactory.namedNode(_item["@type"]) : undefined))) : (((_item.termType === "NamedNode") ? (dataFactory.namedNode(_item["@id"])) : (dataFactory.blankNode(_item["@id"].substring(2))))))));
        const qudt_Unit$j$ucumCode = _jsonObject["qudt_Unit$j$ucumCode"];
        const qudt_Unit$j$udunitsCode = _jsonObject["qudt_Unit$j$udunitsCode"];
        const qudt_Unit$j$uneceCommonCode = _jsonObject["qudt_Unit$j$uneceCommonCode"];
        const qudt_Unit$j$unitOfSystem = _jsonObject["qudt_Unit$j$unitOfSystem"].map(_item => (((_item.termType === "Literal") ? (dataFactory.literal(_item["@value"], typeof _item["@language"] !== "undefined" ? _item["@language"] : (typeof _item["@type"] !== "undefined" ? dataFactory.namedNode(_item["@type"]) : undefined))) : (((_item.termType === "NamedNode") ? (dataFactory.namedNode(_item["@id"])) : (dataFactory.blankNode(_item["@id"].substring(2))))))));
        return purify.Either.of({ ..._super0, identifier, qudt_Unit$j$altSymbol, qudt_Unit$j$applicableSystem, qudt_Unit$j$conversionMultiplier, qudt_Unit$j$conversionMultiplierSN, qudt_Unit$j$conversionOffset, qudt_Unit$j$conversionOffsetSN, qudt_Unit$j$definedUnitOfSystem, qudt_Unit$j$derivedCoherentUnitOfSystem, qudt_Unit$j$derivedUnitOfSystem, qudt_Unit$j$expression, qudt_Unit$j$factorUnitScalar, qudt_Unit$j$hasDimensionVector, qudt_Unit$j$hasFactorUnit, qudt_Unit$j$hasQuantityKind, qudt_Unit$j$iec61360Code, qudt_Unit$j$latexDefinition, qudt_Unit$j$latexSymbol, qudt_Unit$j$mathMLdefinition, qudt_Unit$j$omUnit, qudt_Unit$j$prefix, qudt_Unit$j$qkdvDenominator, qudt_Unit$j$qkdvNumerator, qudt_Unit$j$scalingOf, qudt_Unit$j$siExactMatch, qudt_Unit$j$siUnitsExpression, qudt_Unit$j$symbol, qudt_Unit$j$ucumCode, qudt_Unit$j$udunitsCode, qudt_Unit$j$uneceCommonCode, qudt_Unit$j$unitOfSystem })
    }

    export function fromJson(json: unknown): purify.Either<zod.ZodError, Unit> {
        return (Dimensionless_Unit.fromJson(json) as purify.Either<zod.ZodError, Unit>).altLazy(() => (Contextual_Unit.fromJson(json) as purify.Either<zod.ZodError, Unit>)).altLazy(() => Unit._propertiesFromJson(json).map(properties => new Unit(properties)));
    }

    export function _propertiesFromRdf({ ignoreRdfType: _ignoreRdfType, languageIn: _languageIn, resource: _resource,
        // @ts-ignore
        ..._context }: { [_index: string]: any; ignoreRdfType?: boolean; languageIn?: readonly string[]; resource: rdfjsResource.Resource; }): purify.Either<rdfjsResource.Resource.ValueError, { identifier: (rdfjs.BlankNode | rdfjs.NamedNode); qudt_Unit$j$altSymbol: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; qudt_Unit$j$applicableSystem: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; qudt_Unit$j$conversionMultiplier: purify.Maybe<number>; qudt_Unit$j$conversionMultiplierSN: purify.Maybe<number>; qudt_Unit$j$conversionOffset: purify.Maybe<number>; qudt_Unit$j$conversionOffsetSN: purify.Maybe<number>; qudt_Unit$j$definedUnitOfSystem: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; qudt_Unit$j$derivedCoherentUnitOfSystem: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; qudt_Unit$j$derivedUnitOfSystem: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; qudt_Unit$j$expression: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; qudt_Unit$j$factorUnitScalar: purify.Maybe<number>; qudt_Unit$j$hasDimensionVector: Quantity_Kind$W$Dimension$W$Vector; qudt_Unit$j$hasFactorUnit: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; qudt_Unit$j$hasQuantityKind: purify.NonEmptyList<Quantity_Kind>; qudt_Unit$j$iec61360Code: readonly (string)[]; qudt_Unit$j$latexDefinition: readonly (string)[]; qudt_Unit$j$latexSymbol: readonly (string)[]; qudt_Unit$j$mathMLdefinition: purify.Maybe<string>; qudt_Unit$j$omUnit: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; qudt_Unit$j$prefix: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>; qudt_Unit$j$qkdvDenominator: purify.Maybe<Quantity_Kind$W$Dimension$W$Vector>; qudt_Unit$j$qkdvNumerator: purify.Maybe<Quantity_Kind$W$Dimension$W$Vector>; qudt_Unit$j$scalingOf: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode)>; qudt_Unit$j$siExactMatch: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>; qudt_Unit$j$siUnitsExpression: readonly (string)[]; qudt_Unit$j$symbol: purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>; qudt_Unit$j$ucumCode: readonly (string)[]; qudt_Unit$j$udunitsCode: readonly (string)[]; qudt_Unit$j$uneceCommonCode: readonly (string)[]; qudt_Unit$j$unitOfSystem: readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]; } & UnwrapR<ReturnType<typeof Abstract_Unit._propertiesFromRdf>>> {
        const _super0Either = Abstract_Unit._propertiesFromRdf({ ..._context, ignoreRdfType: true, languageIn: _languageIn, resource: _resource });
        if (_super0Either.isLeft()) { return _super0Either; }

        const _super0 = _super0Either.unsafeCoerce()
        if (!_ignoreRdfType && !_resource.isInstanceOf(dataFactory.namedNode("http://qudt.org/schema/qudt/Unit"))) { return purify.Left(new rdfjsResource.Resource.ValueError({ focusResource: _resource, message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type (expected http://qudt.org/schema/qudt/Unit)`, predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/Unit") })); }

        const identifier = _resource.identifier
        const _qudt_Unit$j$altSymbolEither: purify.Either<rdfjsResource.Resource.ValueError, readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/altSymbol"), { unique: true }).flatMap(_item => _item.toValues().head().chain(_value => purify.Either.of(_value.toTerm())).toMaybe().toList())]);
        if (_qudt_Unit$j$altSymbolEither.isLeft()) { return _qudt_Unit$j$altSymbolEither; }

        const qudt_Unit$j$altSymbol = _qudt_Unit$j$altSymbolEither.unsafeCoerce();
        const _qudt_Unit$j$applicableSystemEither: purify.Either<rdfjsResource.Resource.ValueError, readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/applicableSystem"), { unique: true }).flatMap(_item => _item.toValues().head().chain(_value => purify.Either.of(_value.toTerm())).toMaybe().toList())]);
        if (_qudt_Unit$j$applicableSystemEither.isLeft()) { return _qudt_Unit$j$applicableSystemEither; }

        const qudt_Unit$j$applicableSystem = _qudt_Unit$j$applicableSystemEither.unsafeCoerce();
        const _qudt_Unit$j$conversionMultiplierEither: purify.Either<rdfjsResource.Resource.ValueError, purify.Maybe<number>> = purify.Either.of(_resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/conversionMultiplier"), { unique: true }).head().chain(_value => _value.toNumber()).toMaybe());
        if (_qudt_Unit$j$conversionMultiplierEither.isLeft()) { return _qudt_Unit$j$conversionMultiplierEither; }

        const qudt_Unit$j$conversionMultiplier = _qudt_Unit$j$conversionMultiplierEither.unsafeCoerce();
        const _qudt_Unit$j$conversionMultiplierSNEither: purify.Either<rdfjsResource.Resource.ValueError, purify.Maybe<number>> = purify.Either.of(_resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/conversionMultiplierSN"), { unique: true }).head().chain(_value => _value.toNumber()).toMaybe());
        if (_qudt_Unit$j$conversionMultiplierSNEither.isLeft()) { return _qudt_Unit$j$conversionMultiplierSNEither; }

        const qudt_Unit$j$conversionMultiplierSN = _qudt_Unit$j$conversionMultiplierSNEither.unsafeCoerce();
        const _qudt_Unit$j$conversionOffsetEither: purify.Either<rdfjsResource.Resource.ValueError, purify.Maybe<number>> = purify.Either.of(_resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/conversionOffset"), { unique: true }).head().chain(_value => _value.toNumber()).toMaybe());
        if (_qudt_Unit$j$conversionOffsetEither.isLeft()) { return _qudt_Unit$j$conversionOffsetEither; }

        const qudt_Unit$j$conversionOffset = _qudt_Unit$j$conversionOffsetEither.unsafeCoerce();
        const _qudt_Unit$j$conversionOffsetSNEither: purify.Either<rdfjsResource.Resource.ValueError, purify.Maybe<number>> = purify.Either.of(_resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/conversionOffsetSN"), { unique: true }).head().chain(_value => _value.toNumber()).toMaybe());
        if (_qudt_Unit$j$conversionOffsetSNEither.isLeft()) { return _qudt_Unit$j$conversionOffsetSNEither; }

        const qudt_Unit$j$conversionOffsetSN = _qudt_Unit$j$conversionOffsetSNEither.unsafeCoerce();
        const _qudt_Unit$j$definedUnitOfSystemEither: purify.Either<rdfjsResource.Resource.ValueError, readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/definedUnitOfSystem"), { unique: true }).flatMap(_item => _item.toValues().head().chain(_value => purify.Either.of(_value.toTerm())).toMaybe().toList())]);
        if (_qudt_Unit$j$definedUnitOfSystemEither.isLeft()) { return _qudt_Unit$j$definedUnitOfSystemEither; }

        const qudt_Unit$j$definedUnitOfSystem = _qudt_Unit$j$definedUnitOfSystemEither.unsafeCoerce();
        const _qudt_Unit$j$derivedCoherentUnitOfSystemEither: purify.Either<rdfjsResource.Resource.ValueError, readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/derivedCoherentUnitOfSystem"), { unique: true }).flatMap(_item => _item.toValues().head().chain(_value => purify.Either.of(_value.toTerm())).toMaybe().toList())]);
        if (_qudt_Unit$j$derivedCoherentUnitOfSystemEither.isLeft()) { return _qudt_Unit$j$derivedCoherentUnitOfSystemEither; }

        const qudt_Unit$j$derivedCoherentUnitOfSystem = _qudt_Unit$j$derivedCoherentUnitOfSystemEither.unsafeCoerce();
        const _qudt_Unit$j$derivedUnitOfSystemEither: purify.Either<rdfjsResource.Resource.ValueError, readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/derivedUnitOfSystem"), { unique: true }).flatMap(_item => _item.toValues().head().chain(_value => purify.Either.of(_value.toTerm())).toMaybe().toList())]);
        if (_qudt_Unit$j$derivedUnitOfSystemEither.isLeft()) { return _qudt_Unit$j$derivedUnitOfSystemEither; }

        const qudt_Unit$j$derivedUnitOfSystem = _qudt_Unit$j$derivedUnitOfSystemEither.unsafeCoerce();
        const _qudt_Unit$j$expressionEither: purify.Either<rdfjsResource.Resource.ValueError, readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/expression"), { unique: true }).flatMap(_item => _item.toValues().head().chain(_value => purify.Either.of(_value.toTerm())).toMaybe().toList())]);
        if (_qudt_Unit$j$expressionEither.isLeft()) { return _qudt_Unit$j$expressionEither; }

        const qudt_Unit$j$expression = _qudt_Unit$j$expressionEither.unsafeCoerce();
        const _qudt_Unit$j$factorUnitScalarEither: purify.Either<rdfjsResource.Resource.ValueError, purify.Maybe<number>> = purify.Either.of(_resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/factorUnitScalar"), { unique: true }).head().chain(_value => _value.toNumber()).toMaybe());
        if (_qudt_Unit$j$factorUnitScalarEither.isLeft()) { return _qudt_Unit$j$factorUnitScalarEither; }

        const qudt_Unit$j$factorUnitScalar = _qudt_Unit$j$factorUnitScalarEither.unsafeCoerce();
        const _qudt_Unit$j$hasDimensionVectorEither: purify.Either<rdfjsResource.Resource.ValueError, Quantity_Kind$W$Dimension$W$Vector> = _resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/hasDimensionVector"), { unique: true }).head().chain(value => value.toResource()).chain(_resource => Quantity_Kind$W$Dimension$W$Vector.fromRdf({ ..._context, ignoreRdfType: true, languageIn: _languageIn, resource: _resource }));
        if (_qudt_Unit$j$hasDimensionVectorEither.isLeft()) { return _qudt_Unit$j$hasDimensionVectorEither; }

        const qudt_Unit$j$hasDimensionVector = _qudt_Unit$j$hasDimensionVectorEither.unsafeCoerce();
        const _qudt_Unit$j$hasFactorUnitEither: purify.Either<rdfjsResource.Resource.ValueError, readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/hasFactorUnit"), { unique: true }).flatMap(_item => _item.toValues().head().chain(_value => purify.Either.of(_value.toTerm())).toMaybe().toList())]);
        if (_qudt_Unit$j$hasFactorUnitEither.isLeft()) { return _qudt_Unit$j$hasFactorUnitEither; }

        const qudt_Unit$j$hasFactorUnit = _qudt_Unit$j$hasFactorUnitEither.unsafeCoerce();
        const _qudt_Unit$j$hasQuantityKindEither: purify.Either<rdfjsResource.Resource.ValueError, purify.NonEmptyList<Quantity_Kind>> = purify.NonEmptyList.fromArray([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/hasQuantityKind"), { unique: true }).flatMap(_item => _item.toValues().head().chain(value => value.toResource()).chain(_resource => Quantity_Kind.fromRdf({ ..._context, ignoreRdfType: true, languageIn: _languageIn, resource: _resource })).toMaybe().toList())]).toEither(new rdfjsResource.Resource.ValueError({ focusResource: _resource, message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} is empty`, predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/hasQuantityKind") }));
        if (_qudt_Unit$j$hasQuantityKindEither.isLeft()) { return _qudt_Unit$j$hasQuantityKindEither; }

        const qudt_Unit$j$hasQuantityKind = _qudt_Unit$j$hasQuantityKindEither.unsafeCoerce();
        const _qudt_Unit$j$iec61360CodeEither: purify.Either<rdfjsResource.Resource.ValueError, readonly (string)[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/iec61360Code"), { unique: true }).flatMap(_item => _item.toValues().head().chain(_value => _value.toString()).toMaybe().toList())]);
        if (_qudt_Unit$j$iec61360CodeEither.isLeft()) { return _qudt_Unit$j$iec61360CodeEither; }

        const qudt_Unit$j$iec61360Code = _qudt_Unit$j$iec61360CodeEither.unsafeCoerce();
        const _qudt_Unit$j$latexDefinitionEither: purify.Either<rdfjsResource.Resource.ValueError, readonly (string)[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/latexDefinition"), { unique: true }).flatMap(_item => _item.toValues().head().chain(_value => _value.toString()).toMaybe().toList())]);
        if (_qudt_Unit$j$latexDefinitionEither.isLeft()) { return _qudt_Unit$j$latexDefinitionEither; }

        const qudt_Unit$j$latexDefinition = _qudt_Unit$j$latexDefinitionEither.unsafeCoerce();
        const _qudt_Unit$j$latexSymbolEither: purify.Either<rdfjsResource.Resource.ValueError, readonly (string)[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/latexSymbol"), { unique: true }).flatMap(_item => _item.toValues().head().chain(_value => _value.toString()).toMaybe().toList())]);
        if (_qudt_Unit$j$latexSymbolEither.isLeft()) { return _qudt_Unit$j$latexSymbolEither; }

        const qudt_Unit$j$latexSymbol = _qudt_Unit$j$latexSymbolEither.unsafeCoerce();
        const _qudt_Unit$j$mathMLdefinitionEither: purify.Either<rdfjsResource.Resource.ValueError, purify.Maybe<string>> = purify.Either.of(_resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/mathMLdefinition"), { unique: true }).head().chain(_value => _value.toString()).toMaybe());
        if (_qudt_Unit$j$mathMLdefinitionEither.isLeft()) { return _qudt_Unit$j$mathMLdefinitionEither; }

        const qudt_Unit$j$mathMLdefinition = _qudt_Unit$j$mathMLdefinitionEither.unsafeCoerce();
        const _qudt_Unit$j$omUnitEither: purify.Either<rdfjsResource.Resource.ValueError, readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/omUnit"), { unique: true }).flatMap(_item => _item.toValues().head().chain(_value => purify.Either.of(_value.toTerm())).toMaybe().toList())]);
        if (_qudt_Unit$j$omUnitEither.isLeft()) { return _qudt_Unit$j$omUnitEither; }

        const qudt_Unit$j$omUnit = _qudt_Unit$j$omUnitEither.unsafeCoerce();
        const _qudt_Unit$j$prefixEither: purify.Either<rdfjsResource.Resource.ValueError, purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>> = purify.Either.of(_resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/prefix"), { unique: true }).head().chain(_value => purify.Either.of(_value.toTerm())).toMaybe());
        if (_qudt_Unit$j$prefixEither.isLeft()) { return _qudt_Unit$j$prefixEither; }

        const qudt_Unit$j$prefix = _qudt_Unit$j$prefixEither.unsafeCoerce();
        const _qudt_Unit$j$qkdvDenominatorEither: purify.Either<rdfjsResource.Resource.ValueError, purify.Maybe<Quantity_Kind$W$Dimension$W$Vector>> = purify.Either.of(_resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/qkdvDenominator"), { unique: true }).head().chain(value => value.toResource()).chain(_resource => Quantity_Kind$W$Dimension$W$Vector.fromRdf({ ..._context, ignoreRdfType: true, languageIn: _languageIn, resource: _resource })).toMaybe());
        if (_qudt_Unit$j$qkdvDenominatorEither.isLeft()) { return _qudt_Unit$j$qkdvDenominatorEither; }

        const qudt_Unit$j$qkdvDenominator = _qudt_Unit$j$qkdvDenominatorEither.unsafeCoerce();
        const _qudt_Unit$j$qkdvNumeratorEither: purify.Either<rdfjsResource.Resource.ValueError, purify.Maybe<Quantity_Kind$W$Dimension$W$Vector>> = purify.Either.of(_resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/qkdvNumerator"), { unique: true }).head().chain(value => value.toResource()).chain(_resource => Quantity_Kind$W$Dimension$W$Vector.fromRdf({ ..._context, ignoreRdfType: true, languageIn: _languageIn, resource: _resource })).toMaybe());
        if (_qudt_Unit$j$qkdvNumeratorEither.isLeft()) { return _qudt_Unit$j$qkdvNumeratorEither; }

        const qudt_Unit$j$qkdvNumerator = _qudt_Unit$j$qkdvNumeratorEither.unsafeCoerce();
        const _qudt_Unit$j$scalingOfEither: purify.Either<rdfjsResource.Resource.ValueError, purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode)>> = purify.Either.of(_resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/scalingOf"), { unique: true }).head().chain(_value => _value.toIdentifier()).toMaybe());
        if (_qudt_Unit$j$scalingOfEither.isLeft()) { return _qudt_Unit$j$scalingOfEither; }

        const qudt_Unit$j$scalingOf = _qudt_Unit$j$scalingOfEither.unsafeCoerce();
        const _qudt_Unit$j$siExactMatchEither: purify.Either<rdfjsResource.Resource.ValueError, purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>> = purify.Either.of(_resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/siExactMatch"), { unique: true }).head().chain(_value => purify.Either.of(_value.toTerm())).toMaybe());
        if (_qudt_Unit$j$siExactMatchEither.isLeft()) { return _qudt_Unit$j$siExactMatchEither; }

        const qudt_Unit$j$siExactMatch = _qudt_Unit$j$siExactMatchEither.unsafeCoerce();
        const _qudt_Unit$j$siUnitsExpressionEither: purify.Either<rdfjsResource.Resource.ValueError, readonly (string)[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/siUnitsExpression"), { unique: true }).flatMap(_item => _item.toValues().head().chain(_value => _value.toString()).toMaybe().toList())]);
        if (_qudt_Unit$j$siUnitsExpressionEither.isLeft()) { return _qudt_Unit$j$siUnitsExpressionEither; }

        const qudt_Unit$j$siUnitsExpression = _qudt_Unit$j$siUnitsExpressionEither.unsafeCoerce();
        const _qudt_Unit$j$symbolEither: purify.Either<rdfjsResource.Resource.ValueError, purify.Maybe<(rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)>> = purify.Either.of(_resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/symbol"), { unique: true }).head().chain(_value => purify.Either.of(_value.toTerm())).toMaybe());
        if (_qudt_Unit$j$symbolEither.isLeft()) { return _qudt_Unit$j$symbolEither; }

        const qudt_Unit$j$symbol = _qudt_Unit$j$symbolEither.unsafeCoerce();
        const _qudt_Unit$j$ucumCodeEither: purify.Either<rdfjsResource.Resource.ValueError, readonly (string)[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/ucumCode"), { unique: true }).flatMap(_item => _item.toValues().head().chain(_value => _value.toString()).toMaybe().toList())]);
        if (_qudt_Unit$j$ucumCodeEither.isLeft()) { return _qudt_Unit$j$ucumCodeEither; }

        const qudt_Unit$j$ucumCode = _qudt_Unit$j$ucumCodeEither.unsafeCoerce();
        const _qudt_Unit$j$udunitsCodeEither: purify.Either<rdfjsResource.Resource.ValueError, readonly (string)[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/udunitsCode"), { unique: true }).flatMap(_item => _item.toValues().head().chain(_value => _value.toString()).toMaybe().toList())]);
        if (_qudt_Unit$j$udunitsCodeEither.isLeft()) { return _qudt_Unit$j$udunitsCodeEither; }

        const qudt_Unit$j$udunitsCode = _qudt_Unit$j$udunitsCodeEither.unsafeCoerce();
        const _qudt_Unit$j$uneceCommonCodeEither: purify.Either<rdfjsResource.Resource.ValueError, readonly (string)[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/uneceCommonCode"), { unique: true }).flatMap(_item => _item.toValues().head().chain(_value => _value.toString()).toMaybe().toList())]);
        if (_qudt_Unit$j$uneceCommonCodeEither.isLeft()) { return _qudt_Unit$j$uneceCommonCodeEither; }

        const qudt_Unit$j$uneceCommonCode = _qudt_Unit$j$uneceCommonCodeEither.unsafeCoerce();
        const _qudt_Unit$j$unitOfSystemEither: purify.Either<rdfjsResource.Resource.ValueError, readonly ((rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal))[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://qudt.org/schema/qudt/isUnitOfSystem"), { unique: true }).flatMap(_item => _item.toValues().head().chain(_value => purify.Either.of(_value.toTerm())).toMaybe().toList())]);
        if (_qudt_Unit$j$unitOfSystemEither.isLeft()) { return _qudt_Unit$j$unitOfSystemEither; }

        const qudt_Unit$j$unitOfSystem = _qudt_Unit$j$unitOfSystemEither.unsafeCoerce();
        return purify.Either.of({ ..._super0, identifier, qudt_Unit$j$altSymbol, qudt_Unit$j$applicableSystem, qudt_Unit$j$conversionMultiplier, qudt_Unit$j$conversionMultiplierSN, qudt_Unit$j$conversionOffset, qudt_Unit$j$conversionOffsetSN, qudt_Unit$j$definedUnitOfSystem, qudt_Unit$j$derivedCoherentUnitOfSystem, qudt_Unit$j$derivedUnitOfSystem, qudt_Unit$j$expression, qudt_Unit$j$factorUnitScalar, qudt_Unit$j$hasDimensionVector, qudt_Unit$j$hasFactorUnit, qudt_Unit$j$hasQuantityKind, qudt_Unit$j$iec61360Code, qudt_Unit$j$latexDefinition, qudt_Unit$j$latexSymbol, qudt_Unit$j$mathMLdefinition, qudt_Unit$j$omUnit, qudt_Unit$j$prefix, qudt_Unit$j$qkdvDenominator, qudt_Unit$j$qkdvNumerator, qudt_Unit$j$scalingOf, qudt_Unit$j$siExactMatch, qudt_Unit$j$siUnitsExpression, qudt_Unit$j$symbol, qudt_Unit$j$ucumCode, qudt_Unit$j$udunitsCode, qudt_Unit$j$uneceCommonCode, qudt_Unit$j$unitOfSystem })
    }

    export function fromRdf(parameters: Parameters<typeof Unit._propertiesFromRdf>[0]): purify.Either<rdfjsResource.Resource.ValueError, Unit> {
        const { ignoreRdfType: _ignoreRdfType, ...otherParameters } = parameters
        return (Dimensionless_Unit.fromRdf(otherParameters) as purify.Either<rdfjsResource.Resource.ValueError, Unit>).altLazy(() => (Contextual_Unit.fromRdf(otherParameters) as purify.Either<rdfjsResource.Resource.ValueError, Unit>)).altLazy(() => Unit._propertiesFromRdf(parameters).map(properties => new Unit(properties)));
    }

    export let fromRdfType: rdfjs.NamedNode<string> = dataFactory.namedNode("http://qudt.org/schema/qudt/Unit");

    export function jsonSchema() {
        return zodToJsonSchema(unitJsonZodSchema());
    }

    export function unitJsonUiSchema(parameters?: { scopePrefix?: string }) {
        const scopePrefix = parameters?.scopePrefix ?? "#";
        return { "elements": [ Abstract_Unit.abstractUnitJsonUiSchema({ scopePrefix }), { scope: `${scopePrefix}/properties/qudt_Unit$j$altSymbol`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_Unit$j$applicableSystem`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_Unit$j$conversionMultiplier`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_Unit$j$conversionMultiplierSN`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_Unit$j$conversionOffset`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_Unit$j$conversionOffsetSN`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_Unit$j$definedUnitOfSystem`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_Unit$j$derivedCoherentUnitOfSystem`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_Unit$j$derivedUnitOfSystem`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_Unit$j$expression`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_Unit$j$factorUnitScalar`, type: "Control" }, Quantity_Kind$W$Dimension$W$Vector.jsonUiSchema({ scopePrefix: `${scopePrefix}/properties/qudt_Unit$j$hasDimensionVector` }), { scope: `${scopePrefix}/properties/qudt_Unit$j$hasFactorUnit`, type: "Control" }, Quantity_Kind.quantityKindJsonUiSchema({ scopePrefix: `${scopePrefix}/properties/qudt_Unit$j$hasQuantityKind` }), { scope: `${scopePrefix}/properties/qudt_Unit$j$iec61360Code`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_Unit$j$latexDefinition`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_Unit$j$latexSymbol`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_Unit$j$mathMLdefinition`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_Unit$j$omUnit`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_Unit$j$prefix`, type: "Control" }, Quantity_Kind$W$Dimension$W$Vector.jsonUiSchema({ scopePrefix: `${scopePrefix}/properties/qudt_Unit$j$qkdvDenominator` }), Quantity_Kind$W$Dimension$W$Vector.jsonUiSchema({ scopePrefix: `${scopePrefix}/properties/qudt_Unit$j$qkdvNumerator` }), { scope: `${scopePrefix}/properties/qudt_Unit$j$scalingOf`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_Unit$j$siExactMatch`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_Unit$j$siUnitsExpression`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_Unit$j$symbol`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_Unit$j$ucumCode`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_Unit$j$udunitsCode`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_Unit$j$uneceCommonCode`, type: "Control" }, { scope: `${scopePrefix}/properties/qudt_Unit$j$unitOfSystem`, type: "Control" } ], label: "Unit", type: "Group" }
    }

    export function unitJsonZodSchema() {
        return Abstract_Unit.abstractUnitJsonZodSchema().merge(zod.object({ "@id": zod.string().min(1),"type": zod.enum(["Angle_unit","Contextual_Unit","Dimensionless_Unit","Unit"]),"qudt_Unit$j$altSymbol": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]).array(),"qudt_Unit$j$applicableSystem": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]).array(),"qudt_Unit$j$conversionMultiplier": zod.number().optional(),"qudt_Unit$j$conversionMultiplierSN": zod.number().optional(),"qudt_Unit$j$conversionOffset": zod.number().optional(),"qudt_Unit$j$conversionOffsetSN": zod.number().optional(),"qudt_Unit$j$definedUnitOfSystem": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]).array(),"qudt_Unit$j$derivedCoherentUnitOfSystem": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]).array(),"qudt_Unit$j$derivedUnitOfSystem": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]).array(),"qudt_Unit$j$expression": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]).array(),"qudt_Unit$j$factorUnitScalar": zod.number().optional(),"qudt_Unit$j$hasDimensionVector": Quantity_Kind$W$Dimension$W$Vector.jsonZodSchema(),"qudt_Unit$j$hasFactorUnit": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]).array(),"qudt_Unit$j$hasQuantityKind": Quantity_Kind.quantityKindJsonZodSchema().array().nonempty().min(1),"qudt_Unit$j$iec61360Code": zod.string().array(),"qudt_Unit$j$latexDefinition": zod.string().array(),"qudt_Unit$j$latexSymbol": zod.string().array(),"qudt_Unit$j$mathMLdefinition": zod.string().optional(),"qudt_Unit$j$omUnit": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]).array(),"qudt_Unit$j$prefix": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]).optional(),"qudt_Unit$j$qkdvDenominator": Quantity_Kind$W$Dimension$W$Vector.jsonZodSchema().optional(),"qudt_Unit$j$qkdvNumerator": Quantity_Kind$W$Dimension$W$Vector.jsonZodSchema().optional(),"qudt_Unit$j$scalingOf": zod.object({ "@id": zod.string().min(1) }).optional(),"qudt_Unit$j$siExactMatch": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]).optional(),"qudt_Unit$j$siUnitsExpression": zod.string().array(),"qudt_Unit$j$symbol": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]).optional(),"qudt_Unit$j$ucumCode": zod.string().array(),"qudt_Unit$j$udunitsCode": zod.string().array(),"qudt_Unit$j$uneceCommonCode": zod.string().array(),"qudt_Unit$j$unitOfSystem": zod.discriminatedUnion("termType", [zod.object({ "@id": zod.string().min(1), termType: zod.literal("BlankNode") }), zod.object({ "@id": zod.string().min(1), termType: zod.literal("NamedNode") }), zod.object({ "@language": zod.string().optional(), "@type": zod.string().optional(), "@value": zod.string(), termType: zod.literal("Literal") })]).array() }));
    }

    export function sparqlConstructQuery(parameters?: { ignoreRdfType?: boolean; prefixes?: { [prefix: string]: string }; subject?: sparqljs.Triple["subject"]; } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "type">): sparqljs.ConstructQuery {
        const { ignoreRdfType, subject, ...queryParameters } = parameters ?? {}

        return { ...queryParameters, prefixes: parameters?.prefixes ?? {}, queryType: "CONSTRUCT", template: (queryParameters.template ?? []).concat(Unit.sparqlConstructTemplateTriples({ ignoreRdfType, subject })), type: "query", where: (queryParameters.where ?? []).concat(Unit.sparqlWherePatterns({ ignoreRdfType, subject })) };
    }

    export function sparqlConstructQueryString(parameters?: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"]; variablePrefix?: string; } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "type"> & sparqljs.GeneratorOptions): string {
        return new sparqljs.Generator(parameters).stringify(Unit.sparqlConstructQuery(parameters));
    }

    export function sparqlConstructTemplateTriples(parameters?: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"], variablePrefix?: string }): readonly sparqljs.Triple[] {
        const subject = parameters?.subject ?? dataFactory.variable!("unit");
        const variablePrefix = parameters?.variablePrefix ?? (subject.termType === "Variable" ? subject.value : "unit");
        return [...Abstract_Unit.sparqlConstructTemplateTriples({ ignoreRdfType: true, subject, variablePrefix }), ...(parameters?.ignoreRdfType ? [] : [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.variable!(`${variablePrefix}RdfType`) }]), { object: dataFactory.variable!(`${variablePrefix}QudtUnitJAltSymbol`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/altSymbol"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtUnitJApplicableSystem`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/applicableSystem"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtUnitJConversionMultiplier`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/conversionMultiplier"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtUnitJConversionMultiplierSn`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/conversionMultiplierSN"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtUnitJConversionOffset`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/conversionOffset"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtUnitJConversionOffsetSn`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/conversionOffsetSN"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtUnitJDefinedUnitOfSystem`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/definedUnitOfSystem"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtUnitJDerivedCoherentUnitOfSystem`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/derivedCoherentUnitOfSystem"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtUnitJDerivedUnitOfSystem`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/derivedUnitOfSystem"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtUnitJExpression`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/expression"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtUnitJFactorUnitScalar`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/factorUnitScalar"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtUnitJHasDimensionVector`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/hasDimensionVector"), subject }, ...Quantity_Kind$W$Dimension$W$Vector.sparqlConstructTemplateTriples({ ignoreRdfType: true, subject: dataFactory.variable!(`${variablePrefix}QudtUnitJHasDimensionVector`), variablePrefix: `${variablePrefix}QudtUnitJHasDimensionVector` }), { object: dataFactory.variable!(`${variablePrefix}QudtUnitJHasFactorUnit`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/hasFactorUnit"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtUnitJHasQuantityKind`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/hasQuantityKind"), subject }, ...Quantity_Kind.sparqlConstructTemplateTriples({ ignoreRdfType: true, subject: dataFactory.variable!(`${variablePrefix}QudtUnitJHasQuantityKind`), variablePrefix: `${variablePrefix}QudtUnitJHasQuantityKind` }), { object: dataFactory.variable!(`${variablePrefix}QudtUnitJIec61360Code`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/iec61360Code"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtUnitJLatexDefinition`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/latexDefinition"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtUnitJLatexSymbol`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/latexSymbol"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtUnitJMathMLdefinition`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/mathMLdefinition"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtUnitJOmUnit`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/omUnit"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtUnitJPrefix`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/prefix"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtUnitJQkdvDenominator`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/qkdvDenominator"), subject }, ...Quantity_Kind$W$Dimension$W$Vector.sparqlConstructTemplateTriples({ ignoreRdfType: true, subject: dataFactory.variable!(`${variablePrefix}QudtUnitJQkdvDenominator`), variablePrefix: `${variablePrefix}QudtUnitJQkdvDenominator` }), { object: dataFactory.variable!(`${variablePrefix}QudtUnitJQkdvNumerator`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/qkdvNumerator"), subject }, ...Quantity_Kind$W$Dimension$W$Vector.sparqlConstructTemplateTriples({ ignoreRdfType: true, subject: dataFactory.variable!(`${variablePrefix}QudtUnitJQkdvNumerator`), variablePrefix: `${variablePrefix}QudtUnitJQkdvNumerator` }), { object: dataFactory.variable!(`${variablePrefix}QudtUnitJScalingOf`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/scalingOf"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtUnitJSiExactMatch`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/siExactMatch"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtUnitJSiUnitsExpression`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/siUnitsExpression"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtUnitJSymbol`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/symbol"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtUnitJUcumCode`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/ucumCode"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtUnitJUdunitsCode`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/udunitsCode"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtUnitJUneceCommonCode`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/uneceCommonCode"), subject }, { object: dataFactory.variable!(`${variablePrefix}QudtUnitJUnitOfSystem`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/isUnitOfSystem"), subject }];
    }

    export function sparqlWherePatterns(parameters: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"], variablePrefix?: string }): readonly sparqljs.Pattern[] {
        const subject = parameters?.subject ?? dataFactory.variable!("unit");
        const variablePrefix = parameters?.variablePrefix ?? (subject.termType === "Variable" ? subject.value : "unit");
        return [...Abstract_Unit.sparqlWherePatterns({ ignoreRdfType: true, subject, variablePrefix }), ...(parameters?.ignoreRdfType ? [] : [{ triples: [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.namedNode("http://qudt.org/schema/qudt/Unit") }], type: "bgp" as const }, { triples: [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.variable!(`${variablePrefix}RdfType`) }], type: "bgp" as const }]), { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJAltSymbol`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/altSymbol"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJApplicableSystem`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/applicableSystem"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJConversionMultiplier`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/conversionMultiplier"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJConversionMultiplierSn`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/conversionMultiplierSN"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJConversionOffset`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/conversionOffset"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJConversionOffsetSn`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/conversionOffsetSN"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJDefinedUnitOfSystem`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/definedUnitOfSystem"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJDerivedCoherentUnitOfSystem`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/derivedCoherentUnitOfSystem"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJDerivedUnitOfSystem`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/derivedUnitOfSystem"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJExpression`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/expression"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJFactorUnitScalar`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/factorUnitScalar"), subject }], type: "bgp" }], type: "optional" }, { triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJHasDimensionVector`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/hasDimensionVector"), subject }], type: "bgp" }, ...Quantity_Kind$W$Dimension$W$Vector.sparqlWherePatterns({ ignoreRdfType: true, subject: dataFactory.variable!(`${variablePrefix}QudtUnitJHasDimensionVector`), variablePrefix: `${variablePrefix}QudtUnitJHasDimensionVector` }), { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJHasFactorUnit`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/hasFactorUnit"), subject }], type: "bgp" }], type: "optional" }, { triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJHasQuantityKind`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/hasQuantityKind"), subject }], type: "bgp" }, ...Quantity_Kind.sparqlWherePatterns({ ignoreRdfType: true, subject: dataFactory.variable!(`${variablePrefix}QudtUnitJHasQuantityKind`), variablePrefix: `${variablePrefix}QudtUnitJHasQuantityKind` }), { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJIec61360Code`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/iec61360Code"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJLatexDefinition`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/latexDefinition"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJLatexSymbol`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/latexSymbol"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJMathMLdefinition`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/mathMLdefinition"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJOmUnit`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/omUnit"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJPrefix`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/prefix"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJQkdvDenominator`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/qkdvDenominator"), subject }], type: "bgp" }, ...Quantity_Kind$W$Dimension$W$Vector.sparqlWherePatterns({ ignoreRdfType: true, subject: dataFactory.variable!(`${variablePrefix}QudtUnitJQkdvDenominator`), variablePrefix: `${variablePrefix}QudtUnitJQkdvDenominator` })], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJQkdvNumerator`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/qkdvNumerator"), subject }], type: "bgp" }, ...Quantity_Kind$W$Dimension$W$Vector.sparqlWherePatterns({ ignoreRdfType: true, subject: dataFactory.variable!(`${variablePrefix}QudtUnitJQkdvNumerator`), variablePrefix: `${variablePrefix}QudtUnitJQkdvNumerator` })], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJScalingOf`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/scalingOf"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJSiExactMatch`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/siExactMatch"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJSiUnitsExpression`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/siUnitsExpression"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJSymbol`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/symbol"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJUcumCode`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/ucumCode"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJUdunitsCode`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/udunitsCode"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJUneceCommonCode`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/uneceCommonCode"), subject }], type: "bgp" }], type: "optional" }, { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtUnitJUnitOfSystem`), predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/isUnitOfSystem"), subject }], type: "bgp" }], type: "optional" }];
    }
}
/**
 * Contextual Unit
 */
export class Contextual_Unit extends Unit {
    override readonly type = "Contextual_Unit";
    readonly qudt_ContextualUnit$j$broader: readonly (Unit)[];

    constructor(parameters: { readonly identifier?: (rdfjs.BlankNode | rdfjs.NamedNode) | string, readonly qudt_ContextualUnit$j$broader?: readonly (Unit)[] } & ConstructorParameters<typeof Unit>[0]) {
        super(parameters);
        if (typeof parameters.qudt_ContextualUnit$j$broader === "undefined") { this.qudt_ContextualUnit$j$broader = []; } else if (Array.isArray(parameters.qudt_ContextualUnit$j$broader)) { this.qudt_ContextualUnit$j$broader = parameters.qudt_ContextualUnit$j$broader; } else { this.qudt_ContextualUnit$j$broader =( parameters.qudt_ContextualUnit$j$broader) as never;
         }
    }

    override get identifier(): (rdfjs.BlankNode | rdfjs.NamedNode) {
        if (typeof this._identifier === "undefined") { this._identifier = dataFactory.blankNode(); } return this._identifier;
    }

    override equals(other: Contextual_Unit): EqualsResult {
        return super.equals(other).chain(() => (((left, right) => arrayEquals(left, right, ((left, right) => left.equals(right)))))(this.qudt_ContextualUnit$j$broader, other.qudt_ContextualUnit$j$broader).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "qudt_ContextualUnit$j$broader", propertyValuesUnequal, type: "Property" as const })));
    }

    override hash<HasherT extends { update: (message: string | number[] | ArrayBuffer | Uint8Array) => void; }>(_hasher: HasherT): HasherT {
        this.hashShaclProperties(_hasher);
        return _hasher;
    }

    protected override hashShaclProperties<HasherT extends { update: (message: string | number[] | ArrayBuffer | Uint8Array) => void; }>(_hasher: HasherT): HasherT {
        super.hashShaclProperties(_hasher);
        for (const _item0 of this.qudt_ContextualUnit$j$broader) { _item0.hash(_hasher); }

        return _hasher;
    }

    override toJson(): { readonly "qudt_ContextualUnit$j$broader": readonly (ReturnType<Unit["toJson"]>)[] } & ReturnType<Unit["toJson"]> {
        return JSON.parse(JSON.stringify({ ...super.toJson(),qudt_ContextualUnit$j$broader: this.qudt_ContextualUnit$j$broader.map(_item => (_item.toJson())) } satisfies ReturnType<Contextual_Unit["toJson"]>));
    }

    override toRdf({ ignoreRdfType, mutateGraph, resourceSet }: { ignoreRdfType?: boolean; mutateGraph?: rdfjsResource.MutableResource.MutateGraph, resourceSet: rdfjsResource.MutableResourceSet }): rdfjsResource.MutableResource {
        const _resource = super.toRdf({ ignoreRdfType: true, mutateGraph, resourceSet });
        if (!ignoreRdfType) { _resource.add(_resource.dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), _resource.dataFactory.namedNode("http://qudt.org/schema/qudt/ContextualUnit")); }

        _resource.add(dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#broader"), this.qudt_ContextualUnit$j$broader.map((_item) => _item.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet })));
        return _resource;
    }

    override toString(): string {
        return JSON.stringify(this.toJson());
    }
}

export namespace Contextual_Unit {
    export function _propertiesFromJson(_json: unknown): purify.Either<zod.ZodError, { identifier: (rdfjs.BlankNode | rdfjs.NamedNode); qudt_ContextualUnit$j$broader: readonly (Unit)[]; } & UnwrapR<ReturnType<typeof Unit._propertiesFromJson>>> {
        const _jsonSafeParseResult = contextualUnitJsonZodSchema().safeParse(_json);
        if (!_jsonSafeParseResult.success) { return purify.Left(_jsonSafeParseResult.error); }

        const _jsonObject = _jsonSafeParseResult.data;
        const _super0Either = Unit._propertiesFromJson(_jsonObject);
        if (_super0Either.isLeft()) { return _super0Either; }

        const _super0 = _super0Either.unsafeCoerce()
        const identifier = (_jsonObject["@id"].startsWith("_:") ? dataFactory.blankNode(_jsonObject["@id"].substring(2)) : dataFactory.namedNode(_jsonObject["@id"]));
        const qudt_ContextualUnit$j$broader = _jsonObject["qudt_ContextualUnit$j$broader"].map(_item => (Unit.fromJson(_item).unsafeCoerce()));
        return purify.Either.of({ ..._super0, identifier, qudt_ContextualUnit$j$broader })
    }

    export function fromJson(json: unknown): purify.Either<zod.ZodError, Contextual_Unit> {
        return Contextual_Unit._propertiesFromJson(json).map(properties => new Contextual_Unit(properties));
    }

    export function _propertiesFromRdf({ ignoreRdfType: _ignoreRdfType, languageIn: _languageIn, resource: _resource,
        // @ts-ignore
        ..._context }: { [_index: string]: any; ignoreRdfType?: boolean; languageIn?: readonly string[]; resource: rdfjsResource.Resource; }): purify.Either<rdfjsResource.Resource.ValueError, { identifier: (rdfjs.BlankNode | rdfjs.NamedNode); qudt_ContextualUnit$j$broader: readonly (Unit)[]; } & UnwrapR<ReturnType<typeof Unit._propertiesFromRdf>>> {
        const _super0Either = Unit._propertiesFromRdf({ ..._context, ignoreRdfType: true, languageIn: _languageIn, resource: _resource });
        if (_super0Either.isLeft()) { return _super0Either; }

        const _super0 = _super0Either.unsafeCoerce()
        if (!_ignoreRdfType && !_resource.isInstanceOf(dataFactory.namedNode("http://qudt.org/schema/qudt/ContextualUnit"))) { return purify.Left(new rdfjsResource.Resource.ValueError({ focusResource: _resource, message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type (expected http://qudt.org/schema/qudt/ContextualUnit)`, predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/ContextualUnit") })); }

        const identifier = _resource.identifier
        const _qudt_ContextualUnit$j$broaderEither: purify.Either<rdfjsResource.Resource.ValueError, readonly (Unit)[]> = purify.Either.of([..._resource.values(dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#broader"), { unique: true }).flatMap(_item => _item.toValues().head().chain(value => value.toResource()).chain(_resource => Unit.fromRdf({ ..._context, ignoreRdfType: true, languageIn: _languageIn, resource: _resource })).toMaybe().toList())]);
        if (_qudt_ContextualUnit$j$broaderEither.isLeft()) { return _qudt_ContextualUnit$j$broaderEither; }

        const qudt_ContextualUnit$j$broader = _qudt_ContextualUnit$j$broaderEither.unsafeCoerce();
        return purify.Either.of({ ..._super0, identifier, qudt_ContextualUnit$j$broader })
    }

    export function fromRdf(parameters: Parameters<typeof Contextual_Unit._propertiesFromRdf>[0]): purify.Either<rdfjsResource.Resource.ValueError, Contextual_Unit> {
        return Contextual_Unit._propertiesFromRdf(parameters).map(properties => new Contextual_Unit(properties));
    }

    export let fromRdfType: rdfjs.NamedNode<string> = dataFactory.namedNode("http://qudt.org/schema/qudt/ContextualUnit");

    export function jsonSchema() {
        return zodToJsonSchema(contextualUnitJsonZodSchema());
    }

    export function contextualUnitJsonUiSchema(parameters?: { scopePrefix?: string }) {
        const scopePrefix = parameters?.scopePrefix ?? "#";
        return { "elements": [ Unit.unitJsonUiSchema({ scopePrefix }), Unit.unitJsonUiSchema({ scopePrefix: `${scopePrefix}/properties/qudt_ContextualUnit$j$broader` }) ], label: "Contextual Unit", type: "Group" }
    }

    export function contextualUnitJsonZodSchema() {
        return Unit.unitJsonZodSchema().merge(zod.object({ "@id": zod.string().min(1),"type": zod.literal("Contextual_Unit"),"qudt_ContextualUnit$j$broader": Unit.unitJsonZodSchema().array() }));
    }

    export function sparqlConstructQuery(parameters?: { ignoreRdfType?: boolean; prefixes?: { [prefix: string]: string }; subject?: sparqljs.Triple["subject"]; } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "type">): sparqljs.ConstructQuery {
        const { ignoreRdfType, subject, ...queryParameters } = parameters ?? {}

        return { ...queryParameters, prefixes: parameters?.prefixes ?? {}, queryType: "CONSTRUCT", template: (queryParameters.template ?? []).concat(Contextual_Unit.sparqlConstructTemplateTriples({ ignoreRdfType, subject })), type: "query", where: (queryParameters.where ?? []).concat(Contextual_Unit.sparqlWherePatterns({ ignoreRdfType, subject })) };
    }

    export function sparqlConstructQueryString(parameters?: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"]; variablePrefix?: string; } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "type"> & sparqljs.GeneratorOptions): string {
        return new sparqljs.Generator(parameters).stringify(Contextual_Unit.sparqlConstructQuery(parameters));
    }

    export function sparqlConstructTemplateTriples(parameters?: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"], variablePrefix?: string }): readonly sparqljs.Triple[] {
        const subject = parameters?.subject ?? dataFactory.variable!("contextualUnit");
        const variablePrefix = parameters?.variablePrefix ?? (subject.termType === "Variable" ? subject.value : "contextualUnit");
        return [...Unit.sparqlConstructTemplateTriples({ ignoreRdfType: true, subject, variablePrefix }), ...(parameters?.ignoreRdfType ? [] : [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.variable!(`${variablePrefix}RdfType`) }]), { object: dataFactory.variable!(`${variablePrefix}QudtContextualUnitJBroader`), predicate: dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#broader"), subject }, ...Unit.sparqlConstructTemplateTriples({ ignoreRdfType: true, subject: dataFactory.variable!(`${variablePrefix}QudtContextualUnitJBroader`), variablePrefix: `${variablePrefix}QudtContextualUnitJBroader` })];
    }

    export function sparqlWherePatterns(parameters: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"], variablePrefix?: string }): readonly sparqljs.Pattern[] {
        const subject = parameters?.subject ?? dataFactory.variable!("contextualUnit");
        const variablePrefix = parameters?.variablePrefix ?? (subject.termType === "Variable" ? subject.value : "contextualUnit");
        return [...Unit.sparqlWherePatterns({ ignoreRdfType: true, subject, variablePrefix }), ...(parameters?.ignoreRdfType ? [] : [{ triples: [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.namedNode("http://qudt.org/schema/qudt/ContextualUnit") }], type: "bgp" as const }, { triples: [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.variable!(`${variablePrefix}RdfType`) }], type: "bgp" as const }]), { patterns: [{ triples: [{ object: dataFactory.variable!(`${variablePrefix}QudtContextualUnitJBroader`), predicate: dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#broader"), subject }], type: "bgp" }, ...Unit.sparqlWherePatterns({ ignoreRdfType: true, subject: dataFactory.variable!(`${variablePrefix}QudtContextualUnitJBroader`), variablePrefix: `${variablePrefix}QudtContextualUnitJBroader` })], type: "optional" }];
    }
}
/**
 * Aspect Class
 */
export class Aspect_Class {
    private _identifier: (rdfjs.BlankNode | rdfjs.NamedNode) | undefined;
    readonly type = "Aspect_Class";

    constructor(parameters: { readonly identifier?: (rdfjs.BlankNode | rdfjs.NamedNode) | string }) {
        if (typeof parameters.identifier === "object") { this._identifier = parameters.identifier; } else if (typeof parameters.identifier === "string") { this._identifier = dataFactory.namedNode(parameters.identifier); } else if (typeof parameters.identifier === "undefined") { } else { this._identifier =( parameters.identifier) as never;
         }
    }

    get identifier(): (rdfjs.BlankNode | rdfjs.NamedNode) {
        if (typeof this._identifier === "undefined") { this._identifier = dataFactory.blankNode(); } return this._identifier;
    }

    equals(other: Aspect_Class): EqualsResult {
        return (booleanEquals)(this.identifier, other.identifier).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "identifier", propertyValuesUnequal, type: "Property" as const })).chain(() => (strictEquals)(this.type, other.type).mapLeft(propertyValuesUnequal => ({ left: this, right: other, propertyName: "type", propertyValuesUnequal, type: "Property" as const })));
    }

    hash<HasherT extends { update: (message: string | number[] | ArrayBuffer | Uint8Array) => void; }>(_hasher: HasherT): HasherT {
        _hasher.update(this.identifier.value);
        _hasher.update(this.type);
        this.hashShaclProperties(_hasher);
        return _hasher;
    }

    protected hashShaclProperties<HasherT extends { update: (message: string | number[] | ArrayBuffer | Uint8Array) => void; }>(_hasher: HasherT): HasherT {
        return _hasher;
    }

    toJson(): { readonly "@id": string; readonly "type": "Aspect_Class" } {
        return JSON.parse(JSON.stringify({ "@id": this.identifier.termType === "BlankNode" ? `_:${this.identifier.value}` : this.identifier.value,type: this.type } satisfies ReturnType<Aspect_Class["toJson"]>));
    }

    toRdf({ ignoreRdfType, mutateGraph, resourceSet }: { ignoreRdfType?: boolean; mutateGraph?: rdfjsResource.MutableResource.MutateGraph, resourceSet: rdfjsResource.MutableResourceSet }): rdfjsResource.MutableResource {
        const _resource = resourceSet.mutableResource(this.identifier, { mutateGraph });
        if (!ignoreRdfType) { _resource.add(_resource.dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), _resource.dataFactory.namedNode("http://qudt.org/schema/qudt/AspectClass")); }

        return _resource;
    }

    toString(): string {
        return JSON.stringify(this.toJson());
    }
}

export namespace Aspect_Class {
    export function _propertiesFromJson(_json: unknown): purify.Either<zod.ZodError, { identifier: (rdfjs.BlankNode | rdfjs.NamedNode); }> {
        const _jsonSafeParseResult = jsonZodSchema().safeParse(_json);
        if (!_jsonSafeParseResult.success) { return purify.Left(_jsonSafeParseResult.error); }

        const _jsonObject = _jsonSafeParseResult.data;
        const identifier = (_jsonObject["@id"].startsWith("_:") ? dataFactory.blankNode(_jsonObject["@id"].substring(2)) : dataFactory.namedNode(_jsonObject["@id"]));
        return purify.Either.of({ identifier })
    }

    export function fromJson(json: unknown): purify.Either<zod.ZodError, Aspect_Class> {
        return Aspect_Class._propertiesFromJson(json).map(properties => new Aspect_Class(properties));
    }

    export function _propertiesFromRdf({ ignoreRdfType: _ignoreRdfType, languageIn: _languageIn, resource: _resource,
        // @ts-ignore
        ..._context }: { [_index: string]: any; ignoreRdfType?: boolean; languageIn?: readonly string[]; resource: rdfjsResource.Resource; }): purify.Either<rdfjsResource.Resource.ValueError, { identifier: (rdfjs.BlankNode | rdfjs.NamedNode); }> {
        if (!_ignoreRdfType && !_resource.isInstanceOf(dataFactory.namedNode("http://qudt.org/schema/qudt/AspectClass"))) { return purify.Left(new rdfjsResource.Resource.ValueError({ focusResource: _resource, message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type (expected http://qudt.org/schema/qudt/AspectClass)`, predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/AspectClass") })); }

        const identifier = _resource.identifier
        return purify.Either.of({ identifier })
    }

    export function fromRdf(parameters: Parameters<typeof Aspect_Class._propertiesFromRdf>[0]): purify.Either<rdfjsResource.Resource.ValueError, Aspect_Class> {
        return Aspect_Class._propertiesFromRdf(parameters).map(properties => new Aspect_Class(properties));
    }

    export let fromRdfType: rdfjs.NamedNode<string> = dataFactory.namedNode("http://qudt.org/schema/qudt/AspectClass");

    export function jsonSchema() {
        return zodToJsonSchema(jsonZodSchema());
    }

    export function jsonUiSchema(parameters?: { scopePrefix?: string }) {
        const scopePrefix = parameters?.scopePrefix ?? "#";
        return { "elements": [ { label: "Identifier", scope: `${scopePrefix}/properties/@id`, type: "Control" }, { rule: { condition: { schema: { const: "Aspect_Class" }, scope: `${scopePrefix}/properties/type` }, effect: "HIDE" }, scope: `${scopePrefix}/properties/type`, type: "Control" } ], label: "Aspect Class", type: "Group" }
    }

    export function jsonZodSchema() {
        return zod.object({ "@id": zod.string().min(1),"type": zod.literal("Aspect_Class") });
    }

    export function sparqlConstructQuery(parameters?: { ignoreRdfType?: boolean; prefixes?: { [prefix: string]: string }; subject?: sparqljs.Triple["subject"]; } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "type">): sparqljs.ConstructQuery {
        const { ignoreRdfType, subject, ...queryParameters } = parameters ?? {}

        return { ...queryParameters, prefixes: parameters?.prefixes ?? {}, queryType: "CONSTRUCT", template: (queryParameters.template ?? []).concat(Aspect_Class.sparqlConstructTemplateTriples({ ignoreRdfType, subject })), type: "query", where: (queryParameters.where ?? []).concat(Aspect_Class.sparqlWherePatterns({ ignoreRdfType, subject })) };
    }

    export function sparqlConstructQueryString(parameters?: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"]; variablePrefix?: string; } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "type"> & sparqljs.GeneratorOptions): string {
        return new sparqljs.Generator(parameters).stringify(Aspect_Class.sparqlConstructQuery(parameters));
    }

    export function sparqlConstructTemplateTriples(parameters?: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"], variablePrefix?: string }): readonly sparqljs.Triple[] {
        const subject = parameters?.subject ?? dataFactory.variable!("aspectClass");
        const variablePrefix = parameters?.variablePrefix ?? (subject.termType === "Variable" ? subject.value : "aspectClass");
        return [...(parameters?.ignoreRdfType ? [] : [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.variable!(`${variablePrefix}RdfType`) }])];
    }

    export function sparqlWherePatterns(parameters: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"], variablePrefix?: string }): readonly sparqljs.Pattern[] {
        const subject = parameters?.subject ?? dataFactory.variable!("aspectClass");
        const variablePrefix = parameters?.variablePrefix ?? (subject.termType === "Variable" ? subject.value : "aspectClass");
        return [...(parameters?.ignoreRdfType ? [] : [{ triples: [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.namedNode("http://qudt.org/schema/qudt/AspectClass") }], type: "bgp" as const }, { triples: [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.variable!(`${variablePrefix}RdfType`) }], type: "bgp" as const }])];
    }
}
/**
 * Dimensionless Unit
 */
export class Dimensionless_Unit extends Unit {
    override readonly type: "Angle_unit" | "Dimensionless_Unit" = "Dimensionless_Unit";

    // biome-ignore lint/complexity/noUselessConstructor: Always have a constructor
    constructor(parameters: { readonly identifier?: (rdfjs.BlankNode | rdfjs.NamedNode) | string } & ConstructorParameters<typeof Unit>[0]) {
        super(parameters);
    }

    override get identifier(): (rdfjs.BlankNode | rdfjs.NamedNode) {
        if (typeof this._identifier === "undefined") { this._identifier = dataFactory.blankNode(); } return this._identifier;
    }

    override toRdf({ ignoreRdfType, mutateGraph, resourceSet }: { ignoreRdfType?: boolean; mutateGraph?: rdfjsResource.MutableResource.MutateGraph, resourceSet: rdfjsResource.MutableResourceSet }): rdfjsResource.MutableResource {
        const _resource = super.toRdf({ ignoreRdfType: true, mutateGraph, resourceSet });
        if (!ignoreRdfType) { _resource.add(_resource.dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), _resource.dataFactory.namedNode("http://qudt.org/schema/qudt/DimensionlessUnit")); }

        return _resource;
    }

    override toString(): string {
        return JSON.stringify(this.toJson());
    }
}

export namespace Dimensionless_Unit {
    export function _propertiesFromJson(_json: unknown): purify.Either<zod.ZodError, { identifier: (rdfjs.BlankNode | rdfjs.NamedNode); } & UnwrapR<ReturnType<typeof Unit._propertiesFromJson>>> {
        const _jsonSafeParseResult = dimensionlessUnitJsonZodSchema().safeParse(_json);
        if (!_jsonSafeParseResult.success) { return purify.Left(_jsonSafeParseResult.error); }

        const _jsonObject = _jsonSafeParseResult.data;
        const _super0Either = Unit._propertiesFromJson(_jsonObject);
        if (_super0Either.isLeft()) { return _super0Either; }

        const _super0 = _super0Either.unsafeCoerce()
        const identifier = (_jsonObject["@id"].startsWith("_:") ? dataFactory.blankNode(_jsonObject["@id"].substring(2)) : dataFactory.namedNode(_jsonObject["@id"]));
        return purify.Either.of({ ..._super0, identifier })
    }

    export function fromJson(json: unknown): purify.Either<zod.ZodError, Dimensionless_Unit> {
        return (Angle_unit.fromJson(json) as purify.Either<zod.ZodError, Dimensionless_Unit>).altLazy(() => Dimensionless_Unit._propertiesFromJson(json).map(properties => new Dimensionless_Unit(properties)));
    }

    export function _propertiesFromRdf({ ignoreRdfType: _ignoreRdfType, languageIn: _languageIn, resource: _resource,
        // @ts-ignore
        ..._context }: { [_index: string]: any; ignoreRdfType?: boolean; languageIn?: readonly string[]; resource: rdfjsResource.Resource; }): purify.Either<rdfjsResource.Resource.ValueError, { identifier: (rdfjs.BlankNode | rdfjs.NamedNode); } & UnwrapR<ReturnType<typeof Unit._propertiesFromRdf>>> {
        const _super0Either = Unit._propertiesFromRdf({ ..._context, ignoreRdfType: true, languageIn: _languageIn, resource: _resource });
        if (_super0Either.isLeft()) { return _super0Either; }

        const _super0 = _super0Either.unsafeCoerce()
        if (!_ignoreRdfType && !_resource.isInstanceOf(dataFactory.namedNode("http://qudt.org/schema/qudt/DimensionlessUnit"))) { return purify.Left(new rdfjsResource.Resource.ValueError({ focusResource: _resource, message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type (expected http://qudt.org/schema/qudt/DimensionlessUnit)`, predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/DimensionlessUnit") })); }

        const identifier = _resource.identifier
        return purify.Either.of({ ..._super0, identifier })
    }

    export function fromRdf(parameters: Parameters<typeof Dimensionless_Unit._propertiesFromRdf>[0]): purify.Either<rdfjsResource.Resource.ValueError, Dimensionless_Unit> {
        const { ignoreRdfType: _ignoreRdfType, ...otherParameters } = parameters
        return (Angle_unit.fromRdf(otherParameters) as purify.Either<rdfjsResource.Resource.ValueError, Dimensionless_Unit>).altLazy(() => Dimensionless_Unit._propertiesFromRdf(parameters).map(properties => new Dimensionless_Unit(properties)));
    }

    export let fromRdfType: rdfjs.NamedNode<string> = dataFactory.namedNode("http://qudt.org/schema/qudt/DimensionlessUnit");

    export function jsonSchema() {
        return zodToJsonSchema(dimensionlessUnitJsonZodSchema());
    }

    export function dimensionlessUnitJsonUiSchema(parameters?: { scopePrefix?: string }) {
        const scopePrefix = parameters?.scopePrefix ?? "#";
        return { "elements": [ Unit.unitJsonUiSchema({ scopePrefix }) ], label: "Dimensionless Unit", type: "Group" }
    }

    export function dimensionlessUnitJsonZodSchema() {
        return Unit.unitJsonZodSchema().merge(zod.object({ "@id": zod.string().min(1),"type": zod.enum(["Angle_unit","Dimensionless_Unit"]) }));
    }

    export function sparqlConstructQuery(parameters?: { ignoreRdfType?: boolean; prefixes?: { [prefix: string]: string }; subject?: sparqljs.Triple["subject"]; } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "type">): sparqljs.ConstructQuery {
        const { ignoreRdfType, subject, ...queryParameters } = parameters ?? {}

        return { ...queryParameters, prefixes: parameters?.prefixes ?? {}, queryType: "CONSTRUCT", template: (queryParameters.template ?? []).concat(Dimensionless_Unit.sparqlConstructTemplateTriples({ ignoreRdfType, subject })), type: "query", where: (queryParameters.where ?? []).concat(Dimensionless_Unit.sparqlWherePatterns({ ignoreRdfType, subject })) };
    }

    export function sparqlConstructQueryString(parameters?: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"]; variablePrefix?: string; } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "type"> & sparqljs.GeneratorOptions): string {
        return new sparqljs.Generator(parameters).stringify(Dimensionless_Unit.sparqlConstructQuery(parameters));
    }

    export function sparqlConstructTemplateTriples(parameters?: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"], variablePrefix?: string }): readonly sparqljs.Triple[] {
        const subject = parameters?.subject ?? dataFactory.variable!("dimensionlessUnit");
        const variablePrefix = parameters?.variablePrefix ?? (subject.termType === "Variable" ? subject.value : "dimensionlessUnit");
        return [...Unit.sparqlConstructTemplateTriples({ ignoreRdfType: true, subject, variablePrefix }), ...(parameters?.ignoreRdfType ? [] : [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.variable!(`${variablePrefix}RdfType`) }])];
    }

    export function sparqlWherePatterns(parameters: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"], variablePrefix?: string }): readonly sparqljs.Pattern[] {
        const subject = parameters?.subject ?? dataFactory.variable!("dimensionlessUnit");
        const variablePrefix = parameters?.variablePrefix ?? (subject.termType === "Variable" ? subject.value : "dimensionlessUnit");
        return [...Unit.sparqlWherePatterns({ ignoreRdfType: true, subject, variablePrefix }), ...(parameters?.ignoreRdfType ? [] : [{ triples: [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.namedNode("http://qudt.org/schema/qudt/DimensionlessUnit") }], type: "bgp" as const }, { triples: [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.variable!(`${variablePrefix}RdfType`) }], type: "bgp" as const }])];
    }
}
/**
 * Angle unit
 */
export class Angle_unit extends Dimensionless_Unit {
    override readonly type = "Angle_unit";

    // biome-ignore lint/complexity/noUselessConstructor: Always have a constructor
    constructor(parameters: { readonly identifier?: (rdfjs.BlankNode | rdfjs.NamedNode) | string } & ConstructorParameters<typeof Dimensionless_Unit>[0]) {
        super(parameters);
    }

    override get identifier(): (rdfjs.BlankNode | rdfjs.NamedNode) {
        if (typeof this._identifier === "undefined") { this._identifier = dataFactory.blankNode(); } return this._identifier;
    }

    override toRdf({ ignoreRdfType, mutateGraph, resourceSet }: { ignoreRdfType?: boolean; mutateGraph?: rdfjsResource.MutableResource.MutateGraph, resourceSet: rdfjsResource.MutableResourceSet }): rdfjsResource.MutableResource {
        const _resource = super.toRdf({ ignoreRdfType: true, mutateGraph, resourceSet });
        if (!ignoreRdfType) { _resource.add(_resource.dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), _resource.dataFactory.namedNode("http://qudt.org/schema/qudt/AngleUnit")); }

        return _resource;
    }

    override toString(): string {
        return JSON.stringify(this.toJson());
    }
}

export namespace Angle_unit {
    export function _propertiesFromJson(_json: unknown): purify.Either<zod.ZodError, { identifier: (rdfjs.BlankNode | rdfjs.NamedNode); } & UnwrapR<ReturnType<typeof Dimensionless_Unit._propertiesFromJson>>> {
        const _jsonSafeParseResult = angleUnitJsonZodSchema().safeParse(_json);
        if (!_jsonSafeParseResult.success) { return purify.Left(_jsonSafeParseResult.error); }

        const _jsonObject = _jsonSafeParseResult.data;
        const _super0Either = Dimensionless_Unit._propertiesFromJson(_jsonObject);
        if (_super0Either.isLeft()) { return _super0Either; }

        const _super0 = _super0Either.unsafeCoerce()
        const identifier = (_jsonObject["@id"].startsWith("_:") ? dataFactory.blankNode(_jsonObject["@id"].substring(2)) : dataFactory.namedNode(_jsonObject["@id"]));
        return purify.Either.of({ ..._super0, identifier })
    }

    export function fromJson(json: unknown): purify.Either<zod.ZodError, Angle_unit> {
        return Angle_unit._propertiesFromJson(json).map(properties => new Angle_unit(properties));
    }

    export function _propertiesFromRdf({ ignoreRdfType: _ignoreRdfType, languageIn: _languageIn, resource: _resource,
        // @ts-ignore
        ..._context }: { [_index: string]: any; ignoreRdfType?: boolean; languageIn?: readonly string[]; resource: rdfjsResource.Resource; }): purify.Either<rdfjsResource.Resource.ValueError, { identifier: (rdfjs.BlankNode | rdfjs.NamedNode); } & UnwrapR<ReturnType<typeof Dimensionless_Unit._propertiesFromRdf>>> {
        const _super0Either = Dimensionless_Unit._propertiesFromRdf({ ..._context, ignoreRdfType: true, languageIn: _languageIn, resource: _resource });
        if (_super0Either.isLeft()) { return _super0Either; }

        const _super0 = _super0Either.unsafeCoerce()
        if (!_ignoreRdfType && !_resource.isInstanceOf(dataFactory.namedNode("http://qudt.org/schema/qudt/AngleUnit"))) { return purify.Left(new rdfjsResource.Resource.ValueError({ focusResource: _resource, message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type (expected http://qudt.org/schema/qudt/AngleUnit)`, predicate: dataFactory.namedNode("http://qudt.org/schema/qudt/AngleUnit") })); }

        const identifier = _resource.identifier
        return purify.Either.of({ ..._super0, identifier })
    }

    export function fromRdf(parameters: Parameters<typeof Angle_unit._propertiesFromRdf>[0]): purify.Either<rdfjsResource.Resource.ValueError, Angle_unit> {
        return Angle_unit._propertiesFromRdf(parameters).map(properties => new Angle_unit(properties));
    }

    export let fromRdfType: rdfjs.NamedNode<string> = dataFactory.namedNode("http://qudt.org/schema/qudt/AngleUnit");

    export function jsonSchema() {
        return zodToJsonSchema(angleUnitJsonZodSchema());
    }

    export function angleUnitJsonUiSchema(parameters?: { scopePrefix?: string }) {
        const scopePrefix = parameters?.scopePrefix ?? "#";
        return { "elements": [ Dimensionless_Unit.dimensionlessUnitJsonUiSchema({ scopePrefix }) ], label: "Angle unit", type: "Group" }
    }

    export function angleUnitJsonZodSchema() {
        return Dimensionless_Unit.dimensionlessUnitJsonZodSchema().merge(zod.object({ "@id": zod.string().min(1),"type": zod.literal("Angle_unit") }));
    }

    export function sparqlConstructQuery(parameters?: { ignoreRdfType?: boolean; prefixes?: { [prefix: string]: string }; subject?: sparqljs.Triple["subject"]; } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "type">): sparqljs.ConstructQuery {
        const { ignoreRdfType, subject, ...queryParameters } = parameters ?? {}

        return { ...queryParameters, prefixes: parameters?.prefixes ?? {}, queryType: "CONSTRUCT", template: (queryParameters.template ?? []).concat(Angle_unit.sparqlConstructTemplateTriples({ ignoreRdfType, subject })), type: "query", where: (queryParameters.where ?? []).concat(Angle_unit.sparqlWherePatterns({ ignoreRdfType, subject })) };
    }

    export function sparqlConstructQueryString(parameters?: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"]; variablePrefix?: string; } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "type"> & sparqljs.GeneratorOptions): string {
        return new sparqljs.Generator(parameters).stringify(Angle_unit.sparqlConstructQuery(parameters));
    }

    export function sparqlConstructTemplateTriples(parameters?: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"], variablePrefix?: string }): readonly sparqljs.Triple[] {
        const subject = parameters?.subject ?? dataFactory.variable!("angleUnit");
        const variablePrefix = parameters?.variablePrefix ?? (subject.termType === "Variable" ? subject.value : "angleUnit");
        return [...Dimensionless_Unit.sparqlConstructTemplateTriples({ ignoreRdfType: true, subject, variablePrefix }), ...(parameters?.ignoreRdfType ? [] : [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.variable!(`${variablePrefix}RdfType`) }])];
    }

    export function sparqlWherePatterns(parameters: { ignoreRdfType?: boolean; subject?: sparqljs.Triple["subject"], variablePrefix?: string }): readonly sparqljs.Pattern[] {
        const subject = parameters?.subject ?? dataFactory.variable!("angleUnit");
        const variablePrefix = parameters?.variablePrefix ?? (subject.termType === "Variable" ? subject.value : "angleUnit");
        return [...Dimensionless_Unit.sparqlWherePatterns({ ignoreRdfType: true, subject, variablePrefix }), ...(parameters?.ignoreRdfType ? [] : [{ triples: [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.namedNode("http://qudt.org/schema/qudt/AngleUnit") }], type: "bgp" as const }, { triples: [{ subject, predicate: dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), object: dataFactory.variable!(`${variablePrefix}RdfType`) }], type: "bgp" as const }])];
    }
}

    

