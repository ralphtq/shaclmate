import type * as rdfjs from "@rdfjs/types";
import { DataFactory as dataFactory } from "n3";
import * as purify from "purify-ts";
import * as rdfjsResource from "rdfjs-resource";
import * as sparqljs from "sparqljs";
import { z as zod } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
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
  return EqualsResult.fromBooleanEqualsResult(left, right, left.equals(right));
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
export interface NestedNodeShape {
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  readonly type: "NestedNodeShape";
  /**
   * Required string
   */
  readonly requiredStringProperty: string;
}

export namespace NestedNodeShape {
  export function create(parameters: {
    readonly identifier: (rdfjs.BlankNode | rdfjs.NamedNode) | string;
    readonly requiredStringProperty: string;
  }): NestedNodeShape {
    let identifier: rdfjs.BlankNode | rdfjs.NamedNode;
    if (typeof parameters.identifier === "object") {
      identifier = parameters.identifier;
    } else if (typeof parameters.identifier === "string") {
      identifier = dataFactory.namedNode(parameters.identifier);
    } else {
      identifier = parameters.identifier as never;
    }

    const type = "NestedNodeShape" as const;
    const requiredStringProperty = parameters.requiredStringProperty;
    return { identifier, type, requiredStringProperty };
  }

  export function equals(
    left: NestedNodeShape,
    right: NestedNodeShape,
  ): EqualsResult {
    return booleanEquals(left.identifier, right.identifier)
      .mapLeft((propertyValuesUnequal) => ({
        left: left,
        right: right,
        propertyName: "identifier",
        propertyValuesUnequal,
        type: "Property" as const,
      }))
      .chain(() =>
        strictEquals(left.type, right.type).mapLeft(
          (propertyValuesUnequal) => ({
            left: left,
            right: right,
            propertyName: "type",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      )
      .chain(() =>
        strictEquals(
          left.requiredStringProperty,
          right.requiredStringProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: left,
          right: right,
          propertyName: "requiredStringProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      );
  }

  export function _propertiesFromJson(_json: unknown): purify.Either<
    zod.ZodError,
    {
      identifier: rdfjs.BlankNode | rdfjs.NamedNode;
      type: "NestedNodeShape";
      requiredStringProperty: string;
    }
  > {
    const _jsonSafeParseResult = jsonZodSchema().safeParse(_json);
    if (!_jsonSafeParseResult.success) {
      return purify.Left(_jsonSafeParseResult.error);
    }

    const _jsonObject = _jsonSafeParseResult.data;
    const identifier = _jsonObject["@id"].startsWith("_:")
      ? dataFactory.blankNode(_jsonObject["@id"].substring(2))
      : dataFactory.namedNode(_jsonObject["@id"]);
    const type = "NestedNodeShape" as const;
    const requiredStringProperty = _jsonObject["requiredStringProperty"];
    return purify.Either.of({ identifier, type, requiredStringProperty });
  }

  export function fromJson(
    json: unknown,
  ): purify.Either<zod.ZodError, NestedNodeShape> {
    return NestedNodeShape._propertiesFromJson(json);
  }

  export function _propertiesFromRdf({
    ignoreRdfType: _ignoreRdfType,
    languageIn: _languageIn,
    resource: _resource,
    // @ts-ignore
    ..._context
  }: {
    [_index: string]: any;
    ignoreRdfType?: boolean;
    languageIn?: readonly string[];
    resource: rdfjsResource.Resource;
  }): purify.Either<
    rdfjsResource.Resource.ValueError,
    {
      identifier: rdfjs.BlankNode | rdfjs.NamedNode;
      type: "NestedNodeShape";
      requiredStringProperty: string;
    }
  > {
    const identifier = _resource.identifier;
    const type = "NestedNodeShape" as const;
    const _requiredStringPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      string
    > = _resource
      .values(
        dataFactory.namedNode("http://example.com/requiredStringProperty"),
        { unique: true },
      )
      .head()
      .chain((_value) => _value.toString());
    if (_requiredStringPropertyEither.isLeft()) {
      return _requiredStringPropertyEither;
    }

    const requiredStringProperty = _requiredStringPropertyEither.unsafeCoerce();
    return purify.Either.of({ identifier, type, requiredStringProperty });
  }

  export function fromRdf(
    parameters: Parameters<typeof NestedNodeShape._propertiesFromRdf>[0],
  ): purify.Either<rdfjsResource.Resource.ValueError, NestedNodeShape> {
    return NestedNodeShape._propertiesFromRdf(parameters);
  }

  export function jsonSchema() {
    return zodToJsonSchema(jsonZodSchema());
  }

  export function jsonUiSchema(parameters?: { scopePrefix?: string }) {
    const scopePrefix = parameters?.scopePrefix ?? "#";
    return {
      elements: [
        {
          label: "Identifier",
          scope: `${scopePrefix}/properties/@id`,
          type: "Control",
        },
        {
          rule: {
            condition: {
              schema: { const: "NestedNodeShape" },
              scope: `${scopePrefix}/properties/type`,
            },
            effect: "HIDE",
          },
          scope: `${scopePrefix}/properties/type`,
          type: "Control",
        },
        {
          label: "Required string",
          scope: `${scopePrefix}/properties/requiredStringProperty`,
          type: "Control",
        },
      ],
      label: "NestedNodeShape",
      type: "Group",
    };
  }

  export function jsonZodSchema() {
    return zod.object({
      "@id": zod.string().min(1),
      type: zod.literal("NestedNodeShape"),
      requiredStringProperty: zod.string(),
    });
  }

  export function hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_nestedNodeShape: NestedNodeShape, _hasher: HasherT): HasherT {
    _hasher.update(_nestedNodeShape.identifier.value);
    _hasher.update(_nestedNodeShape.type);
    NestedNodeShape._hashShaclProperties(_nestedNodeShape, _hasher);
    return _hasher;
  }

  export function _hashShaclProperties<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_nestedNodeShape: NestedNodeShape, _hasher: HasherT): HasherT {
    _hasher.update(_nestedNodeShape.requiredStringProperty);
    return _hasher;
  }

  export function sparqlConstructQuery(
    parameters?: {
      ignoreRdfType?: boolean;
      prefixes?: { [prefix: string]: string };
      subject?: sparqljs.Triple["subject"];
    } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "type">,
  ): sparqljs.ConstructQuery {
    const { ignoreRdfType, subject, ...queryParameters } = parameters ?? {};

    return {
      ...queryParameters,
      prefixes: parameters?.prefixes ?? {},
      queryType: "CONSTRUCT",
      template: (queryParameters.template ?? []).concat(
        NestedNodeShape.sparqlConstructTemplateTriples({
          ignoreRdfType,
          subject,
        }),
      ),
      type: "query",
      where: (queryParameters.where ?? []).concat(
        NestedNodeShape.sparqlWherePatterns({ ignoreRdfType, subject }),
      ),
    };
  }

  export function sparqlConstructQueryString(
    parameters?: {
      ignoreRdfType?: boolean;
      subject?: sparqljs.Triple["subject"];
      variablePrefix?: string;
    } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "type"> &
      sparqljs.GeneratorOptions,
  ): string {
    return new sparqljs.Generator(parameters).stringify(
      NestedNodeShape.sparqlConstructQuery(parameters),
    );
  }

  export function sparqlConstructTemplateTriples(parameters?: {
    ignoreRdfType?: boolean;
    subject?: sparqljs.Triple["subject"];
    variablePrefix?: string;
  }): readonly sparqljs.Triple[] {
    const subject =
      parameters?.subject ?? dataFactory.variable!("nestedNodeShape");
    const variablePrefix =
      parameters?.variablePrefix ??
      (subject.termType === "Variable" ? subject.value : "nestedNodeShape");
    return [
      {
        object: dataFactory.variable!(
          `${variablePrefix}RequiredStringProperty`,
        ),
        predicate: dataFactory.namedNode(
          "http://example.com/requiredStringProperty",
        ),
        subject,
      },
    ];
  }

  export function sparqlWherePatterns(parameters: {
    ignoreRdfType?: boolean;
    subject?: sparqljs.Triple["subject"];
    variablePrefix?: string;
  }): readonly sparqljs.Pattern[] {
    const subject =
      parameters?.subject ?? dataFactory.variable!("nestedNodeShape");
    const variablePrefix =
      parameters?.variablePrefix ??
      (subject.termType === "Variable" ? subject.value : "nestedNodeShape");
    return [
      {
        triples: [
          {
            object: dataFactory.variable!(
              `${variablePrefix}RequiredStringProperty`,
            ),
            predicate: dataFactory.namedNode(
              "http://example.com/requiredStringProperty",
            ),
            subject,
          },
        ],
        type: "bgp",
      },
    ];
  }

  export function toJson(_nestedNodeShape: NestedNodeShape): {
    readonly "@id": string;
    readonly type: "NestedNodeShape";
    readonly requiredStringProperty: string;
  } {
    return JSON.parse(
      JSON.stringify({
        "@id":
          _nestedNodeShape.identifier.termType === "BlankNode"
            ? `_:${_nestedNodeShape.identifier.value}`
            : _nestedNodeShape.identifier.value,
        type: _nestedNodeShape.type,
        requiredStringProperty: _nestedNodeShape.requiredStringProperty,
      } satisfies ReturnType<typeof NestedNodeShape.toJson>),
    );
  }

  export function toRdf(
    _nestedNodeShape: NestedNodeShape,
    {
      mutateGraph,
      resourceSet,
    }: {
      ignoreRdfType?: boolean;
      mutateGraph?: rdfjsResource.MutableResource.MutateGraph;
      resourceSet: rdfjsResource.MutableResourceSet;
    },
  ): rdfjsResource.MutableResource {
    const _resource = resourceSet.mutableResource(_nestedNodeShape.identifier, {
      mutateGraph,
    });
    _resource.add(
      dataFactory.namedNode("http://example.com/requiredStringProperty"),
      _nestedNodeShape.requiredStringProperty,
    );
    return _resource;
  }
}
/**
 * Form
 */
export interface FormNodeShape {
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  readonly type: "FormNodeShape";
  /**
   * Empty string set
   */
  readonly emptyStringSetProperty: readonly string[];
  /**
   * Nested object
   */
  readonly nestedObjectProperty: NestedNodeShape;
  /**
   * Non-empty string set
   */
  readonly nonEmptyStringSetProperty: purify.NonEmptyList<string>;
  /**
   * Optional string
   */
  readonly optionalStringProperty: purify.Maybe<string>;
  /**
   * Required integer
   */
  readonly requiredIntegerProperty: number;
  /**
   * Required string
   */
  readonly requiredStringProperty: string;
}

export namespace FormNodeShape {
  export function create(parameters: {
    readonly identifier: (rdfjs.BlankNode | rdfjs.NamedNode) | string;
    readonly emptyStringSetProperty?: readonly string[];
    readonly nestedObjectProperty: NestedNodeShape;
    readonly nonEmptyStringSetProperty: purify.NonEmptyList<string>;
    readonly optionalStringProperty?: purify.Maybe<string> | string;
    readonly requiredIntegerProperty: number;
    readonly requiredStringProperty: string;
  }): FormNodeShape {
    let identifier: rdfjs.BlankNode | rdfjs.NamedNode;
    if (typeof parameters.identifier === "object") {
      identifier = parameters.identifier;
    } else if (typeof parameters.identifier === "string") {
      identifier = dataFactory.namedNode(parameters.identifier);
    } else {
      identifier = parameters.identifier as never;
    }

    const type = "FormNodeShape" as const;
    let emptyStringSetProperty: readonly string[];
    if (typeof parameters.emptyStringSetProperty === "undefined") {
      emptyStringSetProperty = [];
    } else if (Array.isArray(parameters.emptyStringSetProperty)) {
      emptyStringSetProperty = parameters.emptyStringSetProperty;
    } else {
      emptyStringSetProperty = parameters.emptyStringSetProperty as never;
    }

    const nestedObjectProperty = parameters.nestedObjectProperty;
    const nonEmptyStringSetProperty = parameters.nonEmptyStringSetProperty;
    let optionalStringProperty: purify.Maybe<string>;
    if (purify.Maybe.isMaybe(parameters.optionalStringProperty)) {
      optionalStringProperty = parameters.optionalStringProperty;
    } else if (typeof parameters.optionalStringProperty === "string") {
      optionalStringProperty = purify.Maybe.of(
        parameters.optionalStringProperty,
      );
    } else if (typeof parameters.optionalStringProperty === "undefined") {
      optionalStringProperty = purify.Maybe.empty();
    } else {
      optionalStringProperty = parameters.optionalStringProperty as never;
    }

    const requiredIntegerProperty = parameters.requiredIntegerProperty;
    const requiredStringProperty = parameters.requiredStringProperty;
    return {
      identifier,
      type,
      emptyStringSetProperty,
      nestedObjectProperty,
      nonEmptyStringSetProperty,
      optionalStringProperty,
      requiredIntegerProperty,
      requiredStringProperty,
    };
  }

  export function equals(
    left: FormNodeShape,
    right: FormNodeShape,
  ): EqualsResult {
    return booleanEquals(left.identifier, right.identifier)
      .mapLeft((propertyValuesUnequal) => ({
        left: left,
        right: right,
        propertyName: "identifier",
        propertyValuesUnequal,
        type: "Property" as const,
      }))
      .chain(() =>
        strictEquals(left.type, right.type).mapLeft(
          (propertyValuesUnequal) => ({
            left: left,
            right: right,
            propertyName: "type",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      )
      .chain(() =>
        ((left, right) => arrayEquals(left, right, strictEquals))(
          left.emptyStringSetProperty,
          right.emptyStringSetProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: left,
          right: right,
          propertyName: "emptyStringSetProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        NestedNodeShape.equals(
          left.nestedObjectProperty,
          right.nestedObjectProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: left,
          right: right,
          propertyName: "nestedObjectProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        ((left, right) => arrayEquals(left, right, strictEquals))(
          left.nonEmptyStringSetProperty,
          right.nonEmptyStringSetProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: left,
          right: right,
          propertyName: "nonEmptyStringSetProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        ((left, right) => maybeEquals(left, right, strictEquals))(
          left.optionalStringProperty,
          right.optionalStringProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: left,
          right: right,
          propertyName: "optionalStringProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        strictEquals(
          left.requiredIntegerProperty,
          right.requiredIntegerProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: left,
          right: right,
          propertyName: "requiredIntegerProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        strictEquals(
          left.requiredStringProperty,
          right.requiredStringProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: left,
          right: right,
          propertyName: "requiredStringProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      );
  }

  export function _propertiesFromJson(_json: unknown): purify.Either<
    zod.ZodError,
    {
      identifier: rdfjs.BlankNode | rdfjs.NamedNode;
      type: "FormNodeShape";
      emptyStringSetProperty: readonly string[];
      nestedObjectProperty: NestedNodeShape;
      nonEmptyStringSetProperty: purify.NonEmptyList<string>;
      optionalStringProperty: purify.Maybe<string>;
      requiredIntegerProperty: number;
      requiredStringProperty: string;
    }
  > {
    const _jsonSafeParseResult = jsonZodSchema().safeParse(_json);
    if (!_jsonSafeParseResult.success) {
      return purify.Left(_jsonSafeParseResult.error);
    }

    const _jsonObject = _jsonSafeParseResult.data;
    const identifier = _jsonObject["@id"].startsWith("_:")
      ? dataFactory.blankNode(_jsonObject["@id"].substring(2))
      : dataFactory.namedNode(_jsonObject["@id"]);
    const type = "FormNodeShape" as const;
    const emptyStringSetProperty = _jsonObject["emptyStringSetProperty"];
    const nestedObjectProperty = NestedNodeShape.fromJson(
      _jsonObject["nestedObjectProperty"],
    ).unsafeCoerce();
    const nonEmptyStringSetProperty = purify.NonEmptyList.fromArray(
      _jsonObject["nonEmptyStringSetProperty"],
    ).unsafeCoerce();
    const optionalStringProperty = purify.Maybe.fromNullable(
      _jsonObject["optionalStringProperty"],
    );
    const requiredIntegerProperty = _jsonObject["requiredIntegerProperty"];
    const requiredStringProperty = _jsonObject["requiredStringProperty"];
    return purify.Either.of({
      identifier,
      type,
      emptyStringSetProperty,
      nestedObjectProperty,
      nonEmptyStringSetProperty,
      optionalStringProperty,
      requiredIntegerProperty,
      requiredStringProperty,
    });
  }

  export function fromJson(
    json: unknown,
  ): purify.Either<zod.ZodError, FormNodeShape> {
    return FormNodeShape._propertiesFromJson(json);
  }

  export function _propertiesFromRdf({
    ignoreRdfType: _ignoreRdfType,
    languageIn: _languageIn,
    resource: _resource,
    // @ts-ignore
    ..._context
  }: {
    [_index: string]: any;
    ignoreRdfType?: boolean;
    languageIn?: readonly string[];
    resource: rdfjsResource.Resource;
  }): purify.Either<
    rdfjsResource.Resource.ValueError,
    {
      identifier: rdfjs.BlankNode | rdfjs.NamedNode;
      type: "FormNodeShape";
      emptyStringSetProperty: readonly string[];
      nestedObjectProperty: NestedNodeShape;
      nonEmptyStringSetProperty: purify.NonEmptyList<string>;
      optionalStringProperty: purify.Maybe<string>;
      requiredIntegerProperty: number;
      requiredStringProperty: string;
    }
  > {
    const identifier = _resource.identifier;
    const type = "FormNodeShape" as const;
    const _emptyStringSetPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly string[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode("http://example.com/emptyStringSetProperty"),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((_value) => _value.toString())
            .toMaybe()
            .toList(),
        ),
    ]);
    if (_emptyStringSetPropertyEither.isLeft()) {
      return _emptyStringSetPropertyEither;
    }

    const emptyStringSetProperty = _emptyStringSetPropertyEither.unsafeCoerce();
    const _nestedObjectPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      NestedNodeShape
    > = _resource
      .values(
        dataFactory.namedNode("http://example.com/nestedObjectProperty"),
        { unique: true },
      )
      .head()
      .chain((value) => value.toResource())
      .chain((_resource) =>
        NestedNodeShape.fromRdf({
          ..._context,
          ignoreRdfType: true,
          languageIn: _languageIn,
          resource: _resource,
        }),
      );
    if (_nestedObjectPropertyEither.isLeft()) {
      return _nestedObjectPropertyEither;
    }

    const nestedObjectProperty = _nestedObjectPropertyEither.unsafeCoerce();
    const _nonEmptyStringSetPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.NonEmptyList<string>
    > = purify.NonEmptyList.fromArray([
      ..._resource
        .values(
          dataFactory.namedNode("http://example.com/nonEmptyStringSetProperty"),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((_value) => _value.toString())
            .toMaybe()
            .toList(),
        ),
    ]).toEither(
      new rdfjsResource.Resource.ValueError({
        focusResource: _resource,
        message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} is empty`,
        predicate: dataFactory.namedNode(
          "http://example.com/nonEmptyStringSetProperty",
        ),
      }),
    );
    if (_nonEmptyStringSetPropertyEither.isLeft()) {
      return _nonEmptyStringSetPropertyEither;
    }

    const nonEmptyStringSetProperty =
      _nonEmptyStringSetPropertyEither.unsafeCoerce();
    const _optionalStringPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<string>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode("http://example.com/optionalStringProperty"),
          { unique: true },
        )
        .head()
        .chain((_value) => _value.toString())
        .toMaybe(),
    );
    if (_optionalStringPropertyEither.isLeft()) {
      return _optionalStringPropertyEither;
    }

    const optionalStringProperty = _optionalStringPropertyEither.unsafeCoerce();
    const _requiredIntegerPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      number
    > = _resource
      .values(
        dataFactory.namedNode("http://example.com/requiredIntegerProperty"),
        { unique: true },
      )
      .head()
      .chain((_value) => _value.toNumber());
    if (_requiredIntegerPropertyEither.isLeft()) {
      return _requiredIntegerPropertyEither;
    }

    const requiredIntegerProperty =
      _requiredIntegerPropertyEither.unsafeCoerce();
    const _requiredStringPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      string
    > = _resource
      .values(
        dataFactory.namedNode("http://example.com/requiredStringProperty"),
        { unique: true },
      )
      .head()
      .chain((_value) => _value.toString());
    if (_requiredStringPropertyEither.isLeft()) {
      return _requiredStringPropertyEither;
    }

    const requiredStringProperty = _requiredStringPropertyEither.unsafeCoerce();
    return purify.Either.of({
      identifier,
      type,
      emptyStringSetProperty,
      nestedObjectProperty,
      nonEmptyStringSetProperty,
      optionalStringProperty,
      requiredIntegerProperty,
      requiredStringProperty,
    });
  }

  export function fromRdf(
    parameters: Parameters<typeof FormNodeShape._propertiesFromRdf>[0],
  ): purify.Either<rdfjsResource.Resource.ValueError, FormNodeShape> {
    return FormNodeShape._propertiesFromRdf(parameters);
  }

  export function jsonSchema() {
    return zodToJsonSchema(jsonZodSchema());
  }

  export function jsonUiSchema(parameters?: { scopePrefix?: string }) {
    const scopePrefix = parameters?.scopePrefix ?? "#";
    return {
      elements: [
        {
          label: "Identifier",
          scope: `${scopePrefix}/properties/@id`,
          type: "Control",
        },
        {
          rule: {
            condition: {
              schema: { const: "FormNodeShape" },
              scope: `${scopePrefix}/properties/type`,
            },
            effect: "HIDE",
          },
          scope: `${scopePrefix}/properties/type`,
          type: "Control",
        },
        {
          label: "Empty string set",
          scope: `${scopePrefix}/properties/emptyStringSetProperty`,
          type: "Control",
        },
        NestedNodeShape.jsonUiSchema({
          scopePrefix: `${scopePrefix}/properties/nestedObjectProperty`,
        }),
        {
          label: "Non-empty string set",
          scope: `${scopePrefix}/properties/nonEmptyStringSetProperty`,
          type: "Control",
        },
        {
          label: "Optional string",
          scope: `${scopePrefix}/properties/optionalStringProperty`,
          type: "Control",
        },
        {
          label: "Required integer",
          scope: `${scopePrefix}/properties/requiredIntegerProperty`,
          type: "Control",
        },
        {
          label: "Required string",
          scope: `${scopePrefix}/properties/requiredStringProperty`,
          type: "Control",
        },
      ],
      label: "Form",
      type: "Group",
    };
  }

  export function jsonZodSchema() {
    return zod.object({
      "@id": zod.string().min(1),
      type: zod.literal("FormNodeShape"),
      emptyStringSetProperty: zod.string().array(),
      nestedObjectProperty: NestedNodeShape.jsonZodSchema(),
      nonEmptyStringSetProperty: zod.string().array().nonempty().min(1),
      optionalStringProperty: zod.string().optional(),
      requiredIntegerProperty: zod.number(),
      requiredStringProperty: zod.string(),
    });
  }

  export function hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_formNodeShape: FormNodeShape, _hasher: HasherT): HasherT {
    _hasher.update(_formNodeShape.identifier.value);
    _hasher.update(_formNodeShape.type);
    FormNodeShape._hashShaclProperties(_formNodeShape, _hasher);
    return _hasher;
  }

  export function _hashShaclProperties<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_formNodeShape: FormNodeShape, _hasher: HasherT): HasherT {
    for (const _item0 of _formNodeShape.emptyStringSetProperty) {
      _hasher.update(_item0);
    }

    NestedNodeShape.hash(_formNodeShape.nestedObjectProperty, _hasher);
    for (const _item0 of _formNodeShape.nonEmptyStringSetProperty) {
      _hasher.update(_item0);
    }

    _formNodeShape.optionalStringProperty.ifJust((_value0) => {
      _hasher.update(_value0);
    });
    _hasher.update(_formNodeShape.requiredIntegerProperty.toString());
    _hasher.update(_formNodeShape.requiredStringProperty);
    return _hasher;
  }

  export function sparqlConstructQuery(
    parameters?: {
      ignoreRdfType?: boolean;
      prefixes?: { [prefix: string]: string };
      subject?: sparqljs.Triple["subject"];
    } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "type">,
  ): sparqljs.ConstructQuery {
    const { ignoreRdfType, subject, ...queryParameters } = parameters ?? {};

    return {
      ...queryParameters,
      prefixes: parameters?.prefixes ?? {},
      queryType: "CONSTRUCT",
      template: (queryParameters.template ?? []).concat(
        FormNodeShape.sparqlConstructTemplateTriples({
          ignoreRdfType,
          subject,
        }),
      ),
      type: "query",
      where: (queryParameters.where ?? []).concat(
        FormNodeShape.sparqlWherePatterns({ ignoreRdfType, subject }),
      ),
    };
  }

  export function sparqlConstructQueryString(
    parameters?: {
      ignoreRdfType?: boolean;
      subject?: sparqljs.Triple["subject"];
      variablePrefix?: string;
    } & Omit<sparqljs.ConstructQuery, "prefixes" | "queryType" | "type"> &
      sparqljs.GeneratorOptions,
  ): string {
    return new sparqljs.Generator(parameters).stringify(
      FormNodeShape.sparqlConstructQuery(parameters),
    );
  }

  export function sparqlConstructTemplateTriples(parameters?: {
    ignoreRdfType?: boolean;
    subject?: sparqljs.Triple["subject"];
    variablePrefix?: string;
  }): readonly sparqljs.Triple[] {
    const subject =
      parameters?.subject ?? dataFactory.variable!("formNodeShape");
    const variablePrefix =
      parameters?.variablePrefix ??
      (subject.termType === "Variable" ? subject.value : "formNodeShape");
    return [
      {
        object: dataFactory.variable!(
          `${variablePrefix}EmptyStringSetProperty`,
        ),
        predicate: dataFactory.namedNode(
          "http://example.com/emptyStringSetProperty",
        ),
        subject,
      },
      {
        object: dataFactory.variable!(`${variablePrefix}NestedObjectProperty`),
        predicate: dataFactory.namedNode(
          "http://example.com/nestedObjectProperty",
        ),
        subject,
      },
      ...NestedNodeShape.sparqlConstructTemplateTriples({
        ignoreRdfType: true,
        subject: dataFactory.variable!(`${variablePrefix}NestedObjectProperty`),
        variablePrefix: `${variablePrefix}NestedObjectProperty`,
      }),
      {
        object: dataFactory.variable!(
          `${variablePrefix}NonEmptyStringSetProperty`,
        ),
        predicate: dataFactory.namedNode(
          "http://example.com/nonEmptyStringSetProperty",
        ),
        subject,
      },
      {
        object: dataFactory.variable!(
          `${variablePrefix}OptionalStringProperty`,
        ),
        predicate: dataFactory.namedNode(
          "http://example.com/optionalStringProperty",
        ),
        subject,
      },
      {
        object: dataFactory.variable!(
          `${variablePrefix}RequiredIntegerProperty`,
        ),
        predicate: dataFactory.namedNode(
          "http://example.com/requiredIntegerProperty",
        ),
        subject,
      },
      {
        object: dataFactory.variable!(
          `${variablePrefix}RequiredStringProperty`,
        ),
        predicate: dataFactory.namedNode(
          "http://example.com/requiredStringProperty",
        ),
        subject,
      },
    ];
  }

  export function sparqlWherePatterns(parameters: {
    ignoreRdfType?: boolean;
    subject?: sparqljs.Triple["subject"];
    variablePrefix?: string;
  }): readonly sparqljs.Pattern[] {
    const subject =
      parameters?.subject ?? dataFactory.variable!("formNodeShape");
    const variablePrefix =
      parameters?.variablePrefix ??
      (subject.termType === "Variable" ? subject.value : "formNodeShape");
    return [
      {
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(
                  `${variablePrefix}EmptyStringSetProperty`,
                ),
                predicate: dataFactory.namedNode(
                  "http://example.com/emptyStringSetProperty",
                ),
                subject,
              },
            ],
            type: "bgp",
          },
        ],
        type: "optional",
      },
      {
        triples: [
          {
            object: dataFactory.variable!(
              `${variablePrefix}NestedObjectProperty`,
            ),
            predicate: dataFactory.namedNode(
              "http://example.com/nestedObjectProperty",
            ),
            subject,
          },
        ],
        type: "bgp",
      },
      ...NestedNodeShape.sparqlWherePatterns({
        ignoreRdfType: true,
        subject: dataFactory.variable!(`${variablePrefix}NestedObjectProperty`),
        variablePrefix: `${variablePrefix}NestedObjectProperty`,
      }),
      {
        triples: [
          {
            object: dataFactory.variable!(
              `${variablePrefix}NonEmptyStringSetProperty`,
            ),
            predicate: dataFactory.namedNode(
              "http://example.com/nonEmptyStringSetProperty",
            ),
            subject,
          },
        ],
        type: "bgp",
      },
      {
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(
                  `${variablePrefix}OptionalStringProperty`,
                ),
                predicate: dataFactory.namedNode(
                  "http://example.com/optionalStringProperty",
                ),
                subject,
              },
            ],
            type: "bgp",
          },
        ],
        type: "optional",
      },
      {
        triples: [
          {
            object: dataFactory.variable!(
              `${variablePrefix}RequiredIntegerProperty`,
            ),
            predicate: dataFactory.namedNode(
              "http://example.com/requiredIntegerProperty",
            ),
            subject,
          },
        ],
        type: "bgp",
      },
      {
        triples: [
          {
            object: dataFactory.variable!(
              `${variablePrefix}RequiredStringProperty`,
            ),
            predicate: dataFactory.namedNode(
              "http://example.com/requiredStringProperty",
            ),
            subject,
          },
        ],
        type: "bgp",
      },
    ];
  }

  export function toJson(_formNodeShape: FormNodeShape): {
    readonly "@id": string;
    readonly type: "FormNodeShape";
    readonly emptyStringSetProperty: readonly string[];
    readonly nestedObjectProperty: ReturnType<typeof NestedNodeShape.toJson>;
    readonly nonEmptyStringSetProperty: readonly string[];
    readonly optionalStringProperty: string | undefined;
    readonly requiredIntegerProperty: number;
    readonly requiredStringProperty: string;
  } {
    return JSON.parse(
      JSON.stringify({
        "@id":
          _formNodeShape.identifier.termType === "BlankNode"
            ? `_:${_formNodeShape.identifier.value}`
            : _formNodeShape.identifier.value,
        type: _formNodeShape.type,
        emptyStringSetProperty: _formNodeShape.emptyStringSetProperty.map(
          (_item) => _item,
        ),
        nestedObjectProperty: NestedNodeShape.toJson(
          _formNodeShape.nestedObjectProperty,
        ),
        nonEmptyStringSetProperty: _formNodeShape.nonEmptyStringSetProperty.map(
          (_item) => _item,
        ),
        optionalStringProperty: _formNodeShape.optionalStringProperty
          .map((_item) => _item)
          .extract(),
        requiredIntegerProperty: _formNodeShape.requiredIntegerProperty,
        requiredStringProperty: _formNodeShape.requiredStringProperty,
      } satisfies ReturnType<typeof FormNodeShape.toJson>),
    );
  }

  export function toRdf(
    _formNodeShape: FormNodeShape,
    {
      mutateGraph,
      resourceSet,
    }: {
      ignoreRdfType?: boolean;
      mutateGraph?: rdfjsResource.MutableResource.MutateGraph;
      resourceSet: rdfjsResource.MutableResourceSet;
    },
  ): rdfjsResource.MutableResource {
    const _resource = resourceSet.mutableResource(_formNodeShape.identifier, {
      mutateGraph,
    });
    _resource.add(
      dataFactory.namedNode("http://example.com/emptyStringSetProperty"),
      _formNodeShape.emptyStringSetProperty.map((_item) => _item),
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/nestedObjectProperty"),
      NestedNodeShape.toRdf(_formNodeShape.nestedObjectProperty, {
        mutateGraph: mutateGraph,
        resourceSet: resourceSet,
      }),
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/nonEmptyStringSetProperty"),
      _formNodeShape.nonEmptyStringSetProperty.map((_item) => _item),
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/optionalStringProperty"),
      _formNodeShape.optionalStringProperty,
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/requiredIntegerProperty"),
      _formNodeShape.requiredIntegerProperty,
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/requiredStringProperty"),
      _formNodeShape.requiredStringProperty,
    );
    return _resource;
  }
}
