import * as sparqlBuilder from "@kos-kit/sparql-builder";
import type * as rdfjs from "@rdfjs/types";
import { DataFactory as dataFactory } from "n3";
import * as purify from "purify-ts";
import * as purifyHelpers from "purify-ts-helpers";
import * as rdfjsResource from "rdfjs-resource";
import { z as zod } from "zod";
export interface NestedNodeShape {
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  /**
   * Required string
   */
  readonly requiredStringProperty: string;
  readonly type: "NestedNodeShape";
}

export namespace NestedNodeShape {
  export function create(parameters: {
    readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly requiredStringProperty: string;
  }): NestedNodeShape {
    const identifier = parameters.identifier;
    const requiredStringProperty = parameters.requiredStringProperty;
    const type = "NestedNodeShape" as const;
    return { identifier, requiredStringProperty, type };
  }

  export function equals(
    left: NestedNodeShape,
    right: NestedNodeShape,
  ): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.booleanEquals(
      left.identifier,
      right.identifier,
    )
      .mapLeft((propertyValuesUnequal) => ({
        left: left,
        right: right,
        propertyName: "identifier",
        propertyValuesUnequal,
        type: "Property" as const,
      }))
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(
          left.requiredStringProperty,
          right.requiredStringProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: left,
          right: right,
          propertyName: "requiredStringProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(left.type, right.type).mapLeft(
          (propertyValuesUnequal) => ({
            left: left,
            right: right,
            propertyName: "type",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      );
  }

  export function propertiesFromJson(_json: unknown): purify.Either<
    zod.ZodError,
    {
      identifier: rdfjs.BlankNode | rdfjs.NamedNode;
      requiredStringProperty: string;
      type: "NestedNodeShape";
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
    const requiredStringProperty = _jsonObject["requiredStringProperty"];
    const type = "NestedNodeShape" as const;
    return purify.Either.of({ identifier, requiredStringProperty, type });
  }

  export function fromJson(
    json: unknown,
  ): purify.Either<zod.ZodError, NestedNodeShape> {
    return NestedNodeShape.propertiesFromJson(json);
  }

  export function propertiesFromRdf({
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
      requiredStringProperty: string;
      type: "NestedNodeShape";
    }
  > {
    const identifier = _resource.identifier;
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
    const type = "NestedNodeShape" as const;
    return purify.Either.of({ identifier, requiredStringProperty, type });
  }

  export function fromRdf(
    parameters: Parameters<typeof NestedNodeShape.propertiesFromRdf>[0],
  ): purify.Either<rdfjsResource.Resource.ValueError, NestedNodeShape> {
    return NestedNodeShape.propertiesFromRdf(parameters);
  }

  export function jsonUiSchema(parameters?: { scopePrefix?: string }) {
    const scopePrefix = parameters?.scopePrefix ?? "#";
    return {
      elements: [
        { scope: `${scopePrefix}/properties/@id`, type: "Control" },
        {
          label: "Required string",
          scope: `${scopePrefix}/properties/requiredStringProperty`,
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
      ],
      label: "NestedNodeShape",
      type: "Group",
    };
  }

  export function jsonZodSchema() {
    return zod.object({
      "@id": zod.string().min(1).describe("Identifier"),
      requiredStringProperty: zod.string(),
      type: zod.literal("NestedNodeShape"),
    });
  }

  export function hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_nestedNodeShape: NestedNodeShape, _hasher: HasherT): HasherT {
    _hasher.update(_nestedNodeShape.requiredStringProperty);
    return _hasher;
  }

  export class SparqlGraphPatterns extends sparqlBuilder.ResourceGraphPatterns {
    constructor(
      subject: sparqlBuilder.ResourceGraphPatterns.SubjectParameter,
      _options?: { ignoreRdfType?: boolean },
    ) {
      super(subject);
      this.add(
        sparqlBuilder.GraphPattern.basic(
          this.subject,
          dataFactory.namedNode("http://example.com/requiredStringProperty"),
          this.variable("RequiredStringProperty"),
        ),
      );
    }
  }

  export function toJson(_nestedNodeShape: NestedNodeShape): {
    readonly "@id": string;
    readonly requiredStringProperty: string;
    readonly type: "NestedNodeShape";
  } {
    return JSON.parse(
      JSON.stringify({
        "@id":
          _nestedNodeShape.identifier.termType === "BlankNode"
            ? `_:${_nestedNodeShape.identifier.value}`
            : _nestedNodeShape.identifier.value,
        requiredStringProperty: _nestedNodeShape.requiredStringProperty,
        type: _nestedNodeShape.type,
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
      mutateGraph: rdfjsResource.MutableResource.MutateGraph;
      resourceSet: rdfjsResource.MutableResourceSet;
    },
  ): rdfjsResource.MutableResource {
    const _resource = resourceSet.mutableResource({
      identifier: _nestedNodeShape.identifier,
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
  /**
   * Empty string set
   */
  readonly emptyStringSetProperty: readonly string[];
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
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
  readonly type: "FormNodeShape";
}

export namespace FormNodeShape {
  export function create(parameters: {
    readonly emptyStringSetProperty?: readonly string[];
    readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly nestedObjectProperty: NestedNodeShape;
    readonly nonEmptyStringSetProperty: purify.NonEmptyList<string>;
    readonly optionalStringProperty?: purify.Maybe<string> | string;
    readonly requiredIntegerProperty: number;
    readonly requiredStringProperty: string;
  }): FormNodeShape {
    let emptyStringSetProperty: readonly string[];
    if (typeof parameters.emptyStringSetProperty === "undefined") {
      emptyStringSetProperty = [];
    } else if (Array.isArray(parameters.emptyStringSetProperty)) {
      emptyStringSetProperty = parameters.emptyStringSetProperty;
    } else {
      emptyStringSetProperty = parameters.emptyStringSetProperty as never;
    }

    const identifier = parameters.identifier;
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
    const type = "FormNodeShape" as const;
    return {
      emptyStringSetProperty,
      identifier,
      nestedObjectProperty,
      nonEmptyStringSetProperty,
      optionalStringProperty,
      requiredIntegerProperty,
      requiredStringProperty,
      type,
    };
  }

  export function equals(
    left: FormNodeShape,
    right: FormNodeShape,
  ): purifyHelpers.Equatable.EqualsResult {
    return ((left, right) =>
      purifyHelpers.Arrays.equals(
        left,
        right,
        purifyHelpers.Equatable.strictEquals,
      ))(left.emptyStringSetProperty, right.emptyStringSetProperty)
      .mapLeft((propertyValuesUnequal) => ({
        left: left,
        right: right,
        propertyName: "emptyStringSetProperty",
        propertyValuesUnequal,
        type: "Property" as const,
      }))
      .chain(() =>
        purifyHelpers.Equatable.booleanEquals(
          left.identifier,
          right.identifier,
        ).mapLeft((propertyValuesUnequal) => ({
          left: left,
          right: right,
          propertyName: "identifier",
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
        ((left, right) =>
          purifyHelpers.Arrays.equals(
            left,
            right,
            purifyHelpers.Equatable.strictEquals,
          ))(
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
        purifyHelpers.Equatable.booleanEquals(
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
        purifyHelpers.Equatable.strictEquals(
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
        purifyHelpers.Equatable.strictEquals(
          left.requiredStringProperty,
          right.requiredStringProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: left,
          right: right,
          propertyName: "requiredStringProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(left.type, right.type).mapLeft(
          (propertyValuesUnequal) => ({
            left: left,
            right: right,
            propertyName: "type",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      );
  }

  export function propertiesFromJson(_json: unknown): purify.Either<
    zod.ZodError,
    {
      emptyStringSetProperty: readonly string[];
      identifier: rdfjs.BlankNode | rdfjs.NamedNode;
      nestedObjectProperty: NestedNodeShape;
      nonEmptyStringSetProperty: purify.NonEmptyList<string>;
      optionalStringProperty: purify.Maybe<string>;
      requiredIntegerProperty: number;
      requiredStringProperty: string;
      type: "FormNodeShape";
    }
  > {
    const _jsonSafeParseResult = jsonZodSchema().safeParse(_json);
    if (!_jsonSafeParseResult.success) {
      return purify.Left(_jsonSafeParseResult.error);
    }

    const _jsonObject = _jsonSafeParseResult.data;
    const emptyStringSetProperty = _jsonObject["emptyStringSetProperty"];
    const identifier = _jsonObject["@id"].startsWith("_:")
      ? dataFactory.blankNode(_jsonObject["@id"].substring(2))
      : dataFactory.namedNode(_jsonObject["@id"]);
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
    const type = "FormNodeShape" as const;
    return purify.Either.of({
      emptyStringSetProperty,
      identifier,
      nestedObjectProperty,
      nonEmptyStringSetProperty,
      optionalStringProperty,
      requiredIntegerProperty,
      requiredStringProperty,
      type,
    });
  }

  export function fromJson(
    json: unknown,
  ): purify.Either<zod.ZodError, FormNodeShape> {
    return FormNodeShape.propertiesFromJson(json);
  }

  export function propertiesFromRdf({
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
      emptyStringSetProperty: readonly string[];
      identifier: rdfjs.BlankNode | rdfjs.NamedNode;
      nestedObjectProperty: NestedNodeShape;
      nonEmptyStringSetProperty: purify.NonEmptyList<string>;
      optionalStringProperty: purify.Maybe<string>;
      requiredIntegerProperty: number;
      requiredStringProperty: string;
      type: "FormNodeShape";
    }
  > {
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
    const identifier = _resource.identifier;
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
    const type = "FormNodeShape" as const;
    return purify.Either.of({
      emptyStringSetProperty,
      identifier,
      nestedObjectProperty,
      nonEmptyStringSetProperty,
      optionalStringProperty,
      requiredIntegerProperty,
      requiredStringProperty,
      type,
    });
  }

  export function fromRdf(
    parameters: Parameters<typeof FormNodeShape.propertiesFromRdf>[0],
  ): purify.Either<rdfjsResource.Resource.ValueError, FormNodeShape> {
    return FormNodeShape.propertiesFromRdf(parameters);
  }

  export function jsonUiSchema(parameters?: { scopePrefix?: string }) {
    const scopePrefix = parameters?.scopePrefix ?? "#";
    return {
      elements: [
        {
          label: "Empty string set",
          scope: `${scopePrefix}/properties/emptyStringSetProperty`,
          type: "Control",
        },
        { scope: `${scopePrefix}/properties/@id`, type: "Control" },
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
      ],
      label: "Form",
      type: "Group",
    };
  }

  export function jsonZodSchema() {
    return zod.object({
      emptyStringSetProperty: zod.string().array(),
      "@id": zod.string().min(1).describe("Identifier"),
      nestedObjectProperty: NestedNodeShape.jsonZodSchema(),
      nonEmptyStringSetProperty: zod.string().array().nonempty().min(1),
      optionalStringProperty: zod.string().optional(),
      requiredIntegerProperty: zod.number(),
      requiredStringProperty: zod.string(),
      type: zod.literal("FormNodeShape"),
    });
  }

  export function hash<
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

  export class SparqlGraphPatterns extends sparqlBuilder.ResourceGraphPatterns {
    constructor(
      subject: sparqlBuilder.ResourceGraphPatterns.SubjectParameter,
      _options?: { ignoreRdfType?: boolean },
    ) {
      super(subject);
      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.basic(
            this.subject,
            dataFactory.namedNode("http://example.com/emptyStringSetProperty"),
            this.variable("EmptyStringSetProperty"),
          ),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.group(
          sparqlBuilder.GraphPattern.basic(
            this.subject,
            dataFactory.namedNode("http://example.com/nestedObjectProperty"),
            this.variable("NestedObjectProperty"),
          ).chainObject(
            (_object) =>
              new NestedNodeShape.SparqlGraphPatterns(_object, {
                ignoreRdfType: true,
              }),
          ),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.basic(
          this.subject,
          dataFactory.namedNode("http://example.com/nonEmptyStringSetProperty"),
          this.variable("NonEmptyStringSetProperty"),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.basic(
            this.subject,
            dataFactory.namedNode("http://example.com/optionalStringProperty"),
            this.variable("OptionalStringProperty"),
          ),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.basic(
          this.subject,
          dataFactory.namedNode("http://example.com/requiredIntegerProperty"),
          this.variable("RequiredIntegerProperty"),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.basic(
          this.subject,
          dataFactory.namedNode("http://example.com/requiredStringProperty"),
          this.variable("RequiredStringProperty"),
        ),
      );
    }
  }

  export function toJson(_formNodeShape: FormNodeShape): {
    readonly emptyStringSetProperty: readonly string[];
    readonly "@id": string;
    readonly nestedObjectProperty: ReturnType<typeof NestedNodeShape.toJson>;
    readonly nonEmptyStringSetProperty: purify.NonEmptyList<string>;
    readonly optionalStringProperty: string | undefined;
    readonly requiredIntegerProperty: number;
    readonly requiredStringProperty: string;
    readonly type: "FormNodeShape";
  } {
    return JSON.parse(
      JSON.stringify({
        emptyStringSetProperty: _formNodeShape.emptyStringSetProperty.map(
          (_item) => _item,
        ),
        "@id":
          _formNodeShape.identifier.termType === "BlankNode"
            ? `_:${_formNodeShape.identifier.value}`
            : _formNodeShape.identifier.value,
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
        type: _formNodeShape.type,
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
      mutateGraph: rdfjsResource.MutableResource.MutateGraph;
      resourceSet: rdfjsResource.MutableResourceSet;
    },
  ): rdfjsResource.MutableResource {
    const _resource = resourceSet.mutableResource({
      identifier: _formNodeShape.identifier,
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
