import * as sparqlBuilder from "@kos-kit/sparql-builder";
import type * as rdfjs from "@rdfjs/types";
import { DataFactory as dataFactory } from "n3";
import * as purify from "purify-ts";
import * as purifyHelpers from "purify-ts-helpers";
import * as rdfjsResource from "rdfjs-resource";
import { z as zod } from "zod";
/**
 * Shape that has properties with different cardinalities
 */
export interface NodeShapeWithPropertyCardinalities {
  /**
   * Set: minCount implicitly=0, no maxCount or maxCount > 1
   */
  readonly emptyStringSetProperty: readonly string[];
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  /**
   * Set: minCount implicitly=1, no maxCount or maxCount > 1
   */
  readonly nonEmptyStringSetProperty: purify.NonEmptyList<string>;
  /**
   * Option: maxCount=1 minCount=0
   */
  readonly optionalStringProperty: purify.Maybe<string>;
  /**
   * Required: maxCount=minCount=1
   */
  readonly requiredStringProperty: string;
  readonly type: "NodeShapeWithPropertyCardinalities";
}

export namespace NodeShapeWithPropertyCardinalities {
  export function create(parameters: {
    readonly emptyStringSetProperty?: readonly string[];
    readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly nonEmptyStringSetProperty: purify.NonEmptyList<string>;
    readonly optionalStringProperty?: purify.Maybe<string> | string;
    readonly requiredStringProperty: string;
  }): NodeShapeWithPropertyCardinalities {
    let emptyStringSetProperty: readonly string[];
    if (typeof parameters.emptyStringSetProperty === "undefined") {
      emptyStringSetProperty = [];
    } else if (Array.isArray(parameters.emptyStringSetProperty)) {
      emptyStringSetProperty = parameters.emptyStringSetProperty;
    } else {
      emptyStringSetProperty = parameters.emptyStringSetProperty as never;
    }

    const identifier = parameters.identifier;
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

    const requiredStringProperty = parameters.requiredStringProperty;
    const type = "NodeShapeWithPropertyCardinalities" as const;
    return {
      emptyStringSetProperty,
      identifier,
      nonEmptyStringSetProperty,
      optionalStringProperty,
      requiredStringProperty,
      type,
    };
  }

  export function equals(
    left: NodeShapeWithPropertyCardinalities,
    right: NodeShapeWithPropertyCardinalities,
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
      nonEmptyStringSetProperty: purify.NonEmptyList<string>;
      optionalStringProperty: purify.Maybe<string>;
      requiredStringProperty: string;
      type: "NodeShapeWithPropertyCardinalities";
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
    const nonEmptyStringSetProperty = purify.NonEmptyList.fromArray(
      _jsonObject["nonEmptyStringSetProperty"],
    ).unsafeCoerce();
    const optionalStringProperty = purify.Maybe.fromNullable(
      _jsonObject["optionalStringProperty"],
    );
    const requiredStringProperty = _jsonObject["requiredStringProperty"];
    const type = "NodeShapeWithPropertyCardinalities" as const;
    return purify.Either.of({
      emptyStringSetProperty,
      identifier,
      nonEmptyStringSetProperty,
      optionalStringProperty,
      requiredStringProperty,
      type,
    });
  }

  export function fromJson(
    json: unknown,
  ): purify.Either<zod.ZodError, NodeShapeWithPropertyCardinalities> {
    return NodeShapeWithPropertyCardinalities.propertiesFromJson(json);
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
      nonEmptyStringSetProperty: purify.NonEmptyList<string>;
      optionalStringProperty: purify.Maybe<string>;
      requiredStringProperty: string;
      type: "NodeShapeWithPropertyCardinalities";
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
    const type = "NodeShapeWithPropertyCardinalities" as const;
    return purify.Either.of({
      emptyStringSetProperty,
      identifier,
      nonEmptyStringSetProperty,
      optionalStringProperty,
      requiredStringProperty,
      type,
    });
  }

  export function fromRdf(
    parameters: Parameters<
      typeof NodeShapeWithPropertyCardinalities.propertiesFromRdf
    >[0],
  ): purify.Either<
    rdfjsResource.Resource.ValueError,
    NodeShapeWithPropertyCardinalities
  > {
    return NodeShapeWithPropertyCardinalities.propertiesFromRdf(parameters);
  }

  export function jsonZodSchema() {
    return zod.object({
      emptyStringSetProperty: zod
        .string()
        .array()
        .describe("Set: minCount implicitly=0, no maxCount or maxCount > 1"),
      "@id": zod.string().min(1),
      nonEmptyStringSetProperty: zod
        .string()
        .array()
        .nonempty()
        .min(1)
        .describe("Set: minCount implicitly=1, no maxCount or maxCount > 1"),
      optionalStringProperty: zod
        .string()
        .optional()
        .describe("Option: maxCount=1 minCount=0"),
      requiredStringProperty: zod
        .string()
        .describe("Required: maxCount=minCount=1"),
      type: zod.literal("NodeShapeWithPropertyCardinalities"),
    });
  }

  export function hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(
    _nodeShapeWithPropertyCardinalities: NodeShapeWithPropertyCardinalities,
    _hasher: HasherT,
  ): HasherT {
    for (const _item0 of _nodeShapeWithPropertyCardinalities.emptyStringSetProperty) {
      _hasher.update(_item0);
    }

    for (const _item0 of _nodeShapeWithPropertyCardinalities.nonEmptyStringSetProperty) {
      _hasher.update(_item0);
    }

    _nodeShapeWithPropertyCardinalities.optionalStringProperty.ifJust(
      (_value0) => {
        _hasher.update(_value0);
      },
    );
    _hasher.update(_nodeShapeWithPropertyCardinalities.requiredStringProperty);
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
          dataFactory.namedNode("http://example.com/requiredStringProperty"),
          this.variable("RequiredStringProperty"),
        ),
      );
    }
  }

  export function toJson(
    _nodeShapeWithPropertyCardinalities: NodeShapeWithPropertyCardinalities,
  ): {
    readonly emptyStringSetProperty: readonly string[];
    readonly "@id": string;
    readonly nonEmptyStringSetProperty: purify.NonEmptyList<string>;
    readonly optionalStringProperty: string | undefined;
    readonly requiredStringProperty: string;
    readonly type: "NodeShapeWithPropertyCardinalities";
  } {
    return JSON.parse(
      JSON.stringify({
        emptyStringSetProperty:
          _nodeShapeWithPropertyCardinalities.emptyStringSetProperty.map(
            (_item) => _item,
          ),
        "@id":
          _nodeShapeWithPropertyCardinalities.identifier.termType ===
          "BlankNode"
            ? `_:${_nodeShapeWithPropertyCardinalities.identifier.value}`
            : _nodeShapeWithPropertyCardinalities.identifier.value,
        nonEmptyStringSetProperty:
          _nodeShapeWithPropertyCardinalities.nonEmptyStringSetProperty.map(
            (_item) => _item,
          ),
        optionalStringProperty:
          _nodeShapeWithPropertyCardinalities.optionalStringProperty
            .map((_item) => _item)
            .extract(),
        requiredStringProperty:
          _nodeShapeWithPropertyCardinalities.requiredStringProperty,
        type: _nodeShapeWithPropertyCardinalities.type,
      } satisfies ReturnType<typeof NodeShapeWithPropertyCardinalities.toJson>),
    );
  }

  export function toRdf(
    _nodeShapeWithPropertyCardinalities: NodeShapeWithPropertyCardinalities,
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
      identifier: _nodeShapeWithPropertyCardinalities.identifier,
      mutateGraph,
    });
    _resource.add(
      dataFactory.namedNode("http://example.com/emptyStringSetProperty"),
      _nodeShapeWithPropertyCardinalities.emptyStringSetProperty.map(
        (_item) => _item,
      ),
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/nonEmptyStringSetProperty"),
      _nodeShapeWithPropertyCardinalities.nonEmptyStringSetProperty.map(
        (_item) => _item,
      ),
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/optionalStringProperty"),
      _nodeShapeWithPropertyCardinalities.optionalStringProperty,
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/requiredStringProperty"),
      _nodeShapeWithPropertyCardinalities.requiredStringProperty,
    );
    return _resource;
  }
}
