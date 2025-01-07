import * as sparqlBuilder from "@kos-kit/sparql-builder";
import type * as rdfjs from "@rdfjs/types";
import { sha256 } from "js-sha256";
import { DataFactory as dataFactory } from "n3";
import * as purify from "purify-ts";
import * as purifyHelpers from "purify-ts-helpers";
import * as rdfLiteral from "rdf-literal";
import * as rdfjsResource from "rdfjs-resource";
import * as uuid from "uuid";
import { ExternObjectType } from "./ExternObjectType.js";
/**
 * A node shape that mints its identifier by generating a v4 UUID, if no identifier is supplied.
 */
export class UuidV4IriNodeShape {
  private _identifier: rdfjs.NamedNode | undefined;
  readonly stringProperty: string;
  readonly type = "UuidV4IriNodeShape";

  constructor(parameters: {
    readonly identifier?: rdfjs.NamedNode;
    readonly stringProperty: string;
  }) {
    this._identifier = parameters.identifier;
    this.stringProperty = parameters.stringProperty;
  }

  get identifier(): rdfjs.NamedNode {
    if (typeof this._identifier === "undefined") {
      this._identifier = dataFactory.namedNode(
        `urn:shaclmate:object:${this.type}:${uuid.v4()}`,
      );
    }
    return this._identifier;
  }

  equals(other: UuidV4IriNodeShape): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.booleanEquals(
      this.identifier,
      other.identifier,
    )
      .mapLeft((propertyValuesUnequal) => ({
        left: this,
        right: other,
        propertyName: "identifier",
        propertyValuesUnequal,
        type: "Property" as const,
      }))
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(
          this.stringProperty,
          other.stringProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "stringProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(this.type, other.type).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "type",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      );
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_hasher: HasherT): HasherT {
    _hasher.update(this.stringProperty);
    return _hasher;
  }

  toJson(): {
    readonly "@id": string;
    readonly stringProperty: string;
    readonly type: string;
  } {
    return JSON.parse(
      JSON.stringify({
        "@id": this.identifier.value,
        stringProperty: this.stringProperty,
        type: this.type,
      } satisfies ReturnType<UuidV4IriNodeShape["toJson"]>),
    );
  }

  toRdf({
    mutateGraph,
    resourceSet,
  }: {
    ignoreRdfType?: boolean;
    mutateGraph: rdfjsResource.MutableResource.MutateGraph;
    resourceSet: rdfjsResource.MutableResourceSet;
  }): rdfjsResource.MutableResource<rdfjs.NamedNode> {
    const _resource = resourceSet.mutableNamedResource({
      identifier: this.identifier,
      mutateGraph,
    });
    _resource.add(
      dataFactory.namedNode("http://example.com/stringProperty"),
      this.stringProperty,
    );
    return _resource;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace UuidV4IriNodeShape {
  export function fromRdf({
    ignoreRdfType: _ignoreRdfType,
    languageIn: _languageIn,
    resource: _resource,
    // @ts-ignore
    ..._context
  }: {
    [_index: string]: any;
    ignoreRdfType?: boolean;
    languageIn?: readonly string[];
    resource: rdfjsResource.Resource<rdfjs.NamedNode>;
  }): purify.Either<rdfjsResource.Resource.ValueError, UuidV4IriNodeShape> {
    const identifier = _resource.identifier;
    const _stringPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      string
    > = _resource
      .values(dataFactory.namedNode("http://example.com/stringProperty"), {
        unique: true,
      })
      .head()
      .chain((_value) => _value.toString());
    if (_stringPropertyEither.isLeft()) {
      return _stringPropertyEither;
    }

    const stringProperty = _stringPropertyEither.unsafeCoerce();
    return purify.Either.of(
      new UuidV4IriNodeShape({ identifier, stringProperty }),
    );
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
          dataFactory.namedNode("http://example.com/stringProperty"),
          this.variable("StringProperty"),
        ),
      );
    }
  }
}
export class UnionNodeShapeMember2 {
  private _identifier: (rdfjs.BlankNode | rdfjs.NamedNode) | undefined;
  readonly stringProperty2: string;
  readonly type = "UnionNodeShapeMember2";

  constructor(parameters: {
    readonly identifier?: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly stringProperty2: string;
  }) {
    this._identifier = parameters.identifier;
    this.stringProperty2 = parameters.stringProperty2;
  }

  get identifier(): rdfjs.BlankNode | rdfjs.NamedNode {
    if (typeof this._identifier === "undefined") {
      this._identifier = dataFactory.blankNode();
    }
    return this._identifier;
  }

  equals(other: UnionNodeShapeMember2): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.booleanEquals(
      this.identifier,
      other.identifier,
    )
      .mapLeft((propertyValuesUnequal) => ({
        left: this,
        right: other,
        propertyName: "identifier",
        propertyValuesUnequal,
        type: "Property" as const,
      }))
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(
          this.stringProperty2,
          other.stringProperty2,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "stringProperty2",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(this.type, other.type).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "type",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      );
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_hasher: HasherT): HasherT {
    _hasher.update(this.stringProperty2);
    return _hasher;
  }

  toJson(): {
    readonly "@id": string;
    readonly stringProperty2: string;
    readonly type: string;
  } {
    return JSON.parse(
      JSON.stringify({
        "@id": this.identifier.value,
        stringProperty2: this.stringProperty2,
        type: this.type,
      } satisfies ReturnType<UnionNodeShapeMember2["toJson"]>),
    );
  }

  toRdf({
    mutateGraph,
    resourceSet,
  }: {
    ignoreRdfType?: boolean;
    mutateGraph: rdfjsResource.MutableResource.MutateGraph;
    resourceSet: rdfjsResource.MutableResourceSet;
  }): rdfjsResource.MutableResource {
    const _resource = resourceSet.mutableResource({
      identifier: this.identifier,
      mutateGraph,
    });
    _resource.add(
      dataFactory.namedNode("http://example.com/stringProperty2"),
      this.stringProperty2,
    );
    return _resource;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace UnionNodeShapeMember2 {
  export function fromRdf({
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
  }): purify.Either<rdfjsResource.Resource.ValueError, UnionNodeShapeMember2> {
    const identifier = _resource.identifier;
    const _stringProperty2Either: purify.Either<
      rdfjsResource.Resource.ValueError,
      string
    > = _resource
      .values(dataFactory.namedNode("http://example.com/stringProperty2"), {
        unique: true,
      })
      .head()
      .chain((_value) => _value.toString());
    if (_stringProperty2Either.isLeft()) {
      return _stringProperty2Either;
    }

    const stringProperty2 = _stringProperty2Either.unsafeCoerce();
    return purify.Either.of(
      new UnionNodeShapeMember2({ identifier, stringProperty2 }),
    );
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
          dataFactory.namedNode("http://example.com/stringProperty2"),
          this.variable("StringProperty2"),
        ),
      );
    }
  }
}
export class UnionNodeShapeMember1 {
  private _identifier: (rdfjs.BlankNode | rdfjs.NamedNode) | undefined;
  readonly stringProperty1: string;
  readonly type = "UnionNodeShapeMember1";

  constructor(parameters: {
    readonly identifier?: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly stringProperty1: string;
  }) {
    this._identifier = parameters.identifier;
    this.stringProperty1 = parameters.stringProperty1;
  }

  get identifier(): rdfjs.BlankNode | rdfjs.NamedNode {
    if (typeof this._identifier === "undefined") {
      this._identifier = dataFactory.blankNode();
    }
    return this._identifier;
  }

  equals(other: UnionNodeShapeMember1): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.booleanEquals(
      this.identifier,
      other.identifier,
    )
      .mapLeft((propertyValuesUnequal) => ({
        left: this,
        right: other,
        propertyName: "identifier",
        propertyValuesUnequal,
        type: "Property" as const,
      }))
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(
          this.stringProperty1,
          other.stringProperty1,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "stringProperty1",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(this.type, other.type).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "type",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      );
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_hasher: HasherT): HasherT {
    _hasher.update(this.stringProperty1);
    return _hasher;
  }

  toJson(): {
    readonly "@id": string;
    readonly stringProperty1: string;
    readonly type: string;
  } {
    return JSON.parse(
      JSON.stringify({
        "@id": this.identifier.value,
        stringProperty1: this.stringProperty1,
        type: this.type,
      } satisfies ReturnType<UnionNodeShapeMember1["toJson"]>),
    );
  }

  toRdf({
    mutateGraph,
    resourceSet,
  }: {
    ignoreRdfType?: boolean;
    mutateGraph: rdfjsResource.MutableResource.MutateGraph;
    resourceSet: rdfjsResource.MutableResourceSet;
  }): rdfjsResource.MutableResource {
    const _resource = resourceSet.mutableResource({
      identifier: this.identifier,
      mutateGraph,
    });
    _resource.add(
      dataFactory.namedNode("http://example.com/stringProperty1"),
      this.stringProperty1,
    );
    return _resource;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace UnionNodeShapeMember1 {
  export function fromRdf({
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
  }): purify.Either<rdfjsResource.Resource.ValueError, UnionNodeShapeMember1> {
    const identifier = _resource.identifier;
    const _stringProperty1Either: purify.Either<
      rdfjsResource.Resource.ValueError,
      string
    > = _resource
      .values(dataFactory.namedNode("http://example.com/stringProperty1"), {
        unique: true,
      })
      .head()
      .chain((_value) => _value.toString());
    if (_stringProperty1Either.isLeft()) {
      return _stringProperty1Either;
    }

    const stringProperty1 = _stringProperty1Either.unsafeCoerce();
    return purify.Either.of(
      new UnionNodeShapeMember1({ identifier, stringProperty1 }),
    );
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
          dataFactory.namedNode("http://example.com/stringProperty1"),
          this.variable("StringProperty1"),
        ),
      );
    }
  }
}
/**
 * A node shape that mints its identifier by hashing (other) contents, if no identifier is supplied.
 */
export class Sha256IriNodeShape {
  private _identifier: rdfjs.NamedNode | undefined;
  readonly stringProperty: string;
  readonly type = "Sha256IriNodeShape";

  constructor(parameters: {
    readonly identifier?: rdfjs.NamedNode;
    readonly stringProperty: string;
  }) {
    this._identifier = parameters.identifier;
    this.stringProperty = parameters.stringProperty;
  }

  get identifier(): rdfjs.NamedNode {
    if (typeof this._identifier === "undefined") {
      this._identifier = dataFactory.namedNode(
        `urn:shaclmate:object:${this.type}:${this.hash(sha256.create())}`,
      );
    }
    return this._identifier;
  }

  equals(other: Sha256IriNodeShape): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.booleanEquals(
      this.identifier,
      other.identifier,
    )
      .mapLeft((propertyValuesUnequal) => ({
        left: this,
        right: other,
        propertyName: "identifier",
        propertyValuesUnequal,
        type: "Property" as const,
      }))
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(
          this.stringProperty,
          other.stringProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "stringProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(this.type, other.type).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "type",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      );
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_hasher: HasherT): HasherT {
    _hasher.update(this.stringProperty);
    return _hasher;
  }

  toJson(): {
    readonly "@id": string;
    readonly stringProperty: string;
    readonly type: string;
  } {
    return JSON.parse(
      JSON.stringify({
        "@id": this.identifier.value,
        stringProperty: this.stringProperty,
        type: this.type,
      } satisfies ReturnType<Sha256IriNodeShape["toJson"]>),
    );
  }

  toRdf({
    mutateGraph,
    resourceSet,
  }: {
    ignoreRdfType?: boolean;
    mutateGraph: rdfjsResource.MutableResource.MutateGraph;
    resourceSet: rdfjsResource.MutableResourceSet;
  }): rdfjsResource.MutableResource<rdfjs.NamedNode> {
    const _resource = resourceSet.mutableNamedResource({
      identifier: this.identifier,
      mutateGraph,
    });
    _resource.add(
      dataFactory.namedNode("http://example.com/stringProperty"),
      this.stringProperty,
    );
    return _resource;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace Sha256IriNodeShape {
  export function fromRdf({
    ignoreRdfType: _ignoreRdfType,
    languageIn: _languageIn,
    resource: _resource,
    // @ts-ignore
    ..._context
  }: {
    [_index: string]: any;
    ignoreRdfType?: boolean;
    languageIn?: readonly string[];
    resource: rdfjsResource.Resource<rdfjs.NamedNode>;
  }): purify.Either<rdfjsResource.Resource.ValueError, Sha256IriNodeShape> {
    const identifier = _resource.identifier;
    const _stringPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      string
    > = _resource
      .values(dataFactory.namedNode("http://example.com/stringProperty"), {
        unique: true,
      })
      .head()
      .chain((_value) => _value.toString());
    if (_stringPropertyEither.isLeft()) {
      return _stringPropertyEither;
    }

    const stringProperty = _stringPropertyEither.unsafeCoerce();
    return purify.Either.of(
      new Sha256IriNodeShape({ identifier, stringProperty }),
    );
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
          dataFactory.namedNode("http://example.com/stringProperty"),
          this.variable("StringProperty"),
        ),
      );
    }
  }
}
/**
 * Node shape that isn't an rdfs:Class.
 */
export class NonClassNodeShape {
  private _identifier: (rdfjs.BlankNode | rdfjs.NamedNode) | undefined;
  readonly stringProperty: string;
  readonly type = "NonClassNodeShape";

  constructor(parameters: {
    readonly identifier?: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly stringProperty: string;
  }) {
    this._identifier = parameters.identifier;
    this.stringProperty = parameters.stringProperty;
  }

  get identifier(): rdfjs.BlankNode | rdfjs.NamedNode {
    if (typeof this._identifier === "undefined") {
      this._identifier = dataFactory.blankNode();
    }
    return this._identifier;
  }

  equals(other: NonClassNodeShape): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.booleanEquals(
      this.identifier,
      other.identifier,
    )
      .mapLeft((propertyValuesUnequal) => ({
        left: this,
        right: other,
        propertyName: "identifier",
        propertyValuesUnequal,
        type: "Property" as const,
      }))
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(
          this.stringProperty,
          other.stringProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "stringProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(this.type, other.type).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "type",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      );
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_hasher: HasherT): HasherT {
    _hasher.update(this.stringProperty);
    return _hasher;
  }

  toJson(): {
    readonly "@id": string;
    readonly stringProperty: string;
    readonly type: string;
  } {
    return JSON.parse(
      JSON.stringify({
        "@id": this.identifier.value,
        stringProperty: this.stringProperty,
        type: this.type,
      } satisfies ReturnType<NonClassNodeShape["toJson"]>),
    );
  }

  toRdf({
    mutateGraph,
    resourceSet,
  }: {
    ignoreRdfType?: boolean;
    mutateGraph: rdfjsResource.MutableResource.MutateGraph;
    resourceSet: rdfjsResource.MutableResourceSet;
  }): rdfjsResource.MutableResource {
    const _resource = resourceSet.mutableResource({
      identifier: this.identifier,
      mutateGraph,
    });
    _resource.add(
      dataFactory.namedNode("http://example.com/stringProperty"),
      this.stringProperty,
    );
    return _resource;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace NonClassNodeShape {
  export function fromRdf({
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
  }): purify.Either<rdfjsResource.Resource.ValueError, NonClassNodeShape> {
    const identifier = _resource.identifier;
    const _stringPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      string
    > = _resource
      .values(dataFactory.namedNode("http://example.com/stringProperty"), {
        unique: true,
      })
      .head()
      .chain((_value) => _value.toString());
    if (_stringPropertyEither.isLeft()) {
      return _stringPropertyEither;
    }

    const stringProperty = _stringPropertyEither.unsafeCoerce();
    return purify.Either.of(
      new NonClassNodeShape({ identifier, stringProperty }),
    );
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
          dataFactory.namedNode("http://example.com/stringProperty"),
          this.variable("StringProperty"),
        ),
      );
    }
  }
}
/**
 * Shape with sh:xone properties.
 */
export class NodeShapeWithUnionProperties {
  private _identifier: (rdfjs.BlankNode | rdfjs.NamedNode) | undefined;
  readonly orLiteralsProperty: purify.Maybe<rdfjs.Literal>;
  readonly orTermsProperty: purify.Maybe<rdfjs.Literal | rdfjs.NamedNode>;
  readonly orUnrelatedProperty: purify.Maybe<
    | { type: "0-number"; value: number }
    | { type: "1-(rdfjs.NamedNode)"; value: rdfjs.NamedNode }
  >;
  readonly type = "NodeShapeWithUnionProperties";

  constructor(parameters: {
    readonly identifier?: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly orLiteralsProperty?:
      | rdfjs.Literal
      | Date
      | boolean
      | number
      | purify.Maybe<rdfjs.Literal>
      | string;
    readonly orTermsProperty?:
      | (rdfjs.Literal | rdfjs.NamedNode)
      | purify.Maybe<rdfjs.Literal | rdfjs.NamedNode>;
    readonly orUnrelatedProperty?:
      | (
          | { type: "0-number"; value: number }
          | { type: "1-(rdfjs.NamedNode)"; value: rdfjs.NamedNode }
        )
      | purify.Maybe<
          | { type: "0-number"; value: number }
          | { type: "1-(rdfjs.NamedNode)"; value: rdfjs.NamedNode }
        >;
  }) {
    this._identifier = parameters.identifier;
    if (purify.Maybe.isMaybe(parameters.orLiteralsProperty)) {
      this.orLiteralsProperty = parameters.orLiteralsProperty;
    } else if (typeof parameters.orLiteralsProperty === "boolean") {
      this.orLiteralsProperty = purify.Maybe.of(
        rdfLiteral.toRdf(parameters.orLiteralsProperty),
      );
    } else if (
      typeof parameters.orLiteralsProperty === "object" &&
      parameters.orLiteralsProperty instanceof Date
    ) {
      this.orLiteralsProperty = purify.Maybe.of(
        rdfLiteral.toRdf(parameters.orLiteralsProperty),
      );
    } else if (typeof parameters.orLiteralsProperty === "number") {
      this.orLiteralsProperty = purify.Maybe.of(
        rdfLiteral.toRdf(parameters.orLiteralsProperty),
      );
    } else if (typeof parameters.orLiteralsProperty === "string") {
      this.orLiteralsProperty = purify.Maybe.of(
        dataFactory.literal(parameters.orLiteralsProperty),
      );
    } else if (typeof parameters.orLiteralsProperty === "object") {
      this.orLiteralsProperty = purify.Maybe.of(parameters.orLiteralsProperty);
    } else if (typeof parameters.orLiteralsProperty === "undefined") {
      this.orLiteralsProperty = purify.Maybe.empty();
    } else {
      this.orLiteralsProperty = parameters.orLiteralsProperty as never;
    }

    if (purify.Maybe.isMaybe(parameters.orTermsProperty)) {
      this.orTermsProperty = parameters.orTermsProperty;
    } else if (typeof parameters.orTermsProperty === "object") {
      this.orTermsProperty = purify.Maybe.of(parameters.orTermsProperty);
    } else if (typeof parameters.orTermsProperty === "undefined") {
      this.orTermsProperty = purify.Maybe.empty();
    } else {
      this.orTermsProperty = parameters.orTermsProperty as never;
    }

    if (purify.Maybe.isMaybe(parameters.orUnrelatedProperty)) {
      this.orUnrelatedProperty = parameters.orUnrelatedProperty;
    } else if (typeof parameters.orUnrelatedProperty === "object") {
      this.orUnrelatedProperty = purify.Maybe.of(
        parameters.orUnrelatedProperty,
      );
    } else if (typeof parameters.orUnrelatedProperty === "undefined") {
      this.orUnrelatedProperty = purify.Maybe.empty();
    } else {
      this.orUnrelatedProperty = parameters.orUnrelatedProperty as never;
    }
  }

  get identifier(): rdfjs.BlankNode | rdfjs.NamedNode {
    if (typeof this._identifier === "undefined") {
      this._identifier = dataFactory.blankNode();
    }
    return this._identifier;
  }

  equals(
    other: NodeShapeWithUnionProperties,
  ): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.booleanEquals(
      this.identifier,
      other.identifier,
    )
      .mapLeft((propertyValuesUnequal) => ({
        left: this,
        right: other,
        propertyName: "identifier",
        propertyValuesUnequal,
        type: "Property" as const,
      }))
      .chain(() =>
        ((left, right) =>
          purifyHelpers.Maybes.equals(
            left,
            right,
            purifyHelpers.Equatable.booleanEquals,
          ))(this.orLiteralsProperty, other.orLiteralsProperty).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "orLiteralsProperty",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      )
      .chain(() =>
        ((left, right) =>
          purifyHelpers.Maybes.equals(
            left,
            right,
            (
              left: rdfjs.Literal | rdfjs.NamedNode,
              right: rdfjs.Literal | rdfjs.NamedNode,
            ) => {
              if (left.termType === "Literal" && right.termType === "Literal") {
                return purifyHelpers.Equatable.booleanEquals(left, right);
              }
              if (
                left.termType === "NamedNode" &&
                right.termType === "NamedNode"
              ) {
                return purifyHelpers.Equatable.booleanEquals(left, right);
              }

              return purify.Left({
                left,
                right,
                propertyName: "type",
                propertyValuesUnequal: {
                  left: typeof left,
                  right: typeof right,
                  type: "BooleanEquals" as const,
                },
                type: "Property" as const,
              });
            },
          ))(this.orTermsProperty, other.orTermsProperty).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "orTermsProperty",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      )
      .chain(() =>
        ((left, right) =>
          purifyHelpers.Maybes.equals(
            left,
            right,
            (
              left:
                | { type: "0-number"; value: number }
                | { type: "1-(rdfjs.NamedNode)"; value: rdfjs.NamedNode },
              right:
                | { type: "0-number"; value: number }
                | { type: "1-(rdfjs.NamedNode)"; value: rdfjs.NamedNode },
            ) => {
              if (left.type === "0-number" && right.type === "0-number") {
                return purifyHelpers.Equatable.strictEquals(
                  left.value,
                  right.value,
                );
              }
              if (
                left.type === "1-(rdfjs.NamedNode)" &&
                right.type === "1-(rdfjs.NamedNode)"
              ) {
                return purifyHelpers.Equatable.booleanEquals(
                  left.value,
                  right.value,
                );
              }

              return purify.Left({
                left,
                right,
                propertyName: "type",
                propertyValuesUnequal: {
                  left: typeof left,
                  right: typeof right,
                  type: "BooleanEquals" as const,
                },
                type: "Property" as const,
              });
            },
          ))(this.orUnrelatedProperty, other.orUnrelatedProperty).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "orUnrelatedProperty",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(this.type, other.type).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "type",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      );
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_hasher: HasherT): HasherT {
    this.orLiteralsProperty.ifJust((_value0) => {
      _hasher.update(_value0.termType);
      _hasher.update(_value0.value);
    });
    this.orTermsProperty.ifJust((_value0) => {
      switch (_value0.termType) {
        case "Literal": {
          _hasher.update(_value0.termType);
          _hasher.update(_value0.value);
          break;
        }
        case "NamedNode": {
          _hasher.update(_value0.termType);
          _hasher.update(_value0.value);
          break;
        }
      }
    });
    this.orUnrelatedProperty.ifJust((_value0) => {
      switch (_value0.type) {
        case "0-number": {
          _hasher.update(_value0.value.toString());
          break;
        }
        case "1-(rdfjs.NamedNode)": {
          _hasher.update(_value0.value.termType);
          _hasher.update(_value0.value.value);
          break;
        }
      }
    });
    return _hasher;
  }

  toJson(): {
    readonly "@id": string;
    readonly orLiteralsProperty:
      | {
          "@language": string | undefined;
          "@type": string | undefined;
          "@value": string;
        }
      | undefined;
    readonly orTermsProperty:
      | (
          | {
              "@language": string | undefined;
              "@type": string | undefined;
              "@value": string;
            }
          | { "@id": string }
        )
      | undefined;
    readonly orUnrelatedProperty:
      | (
          | { type: "0-number"; value: number }
          | { type: "1-(rdfjs.NamedNode)"; value: { "@id": string } }
        )
      | undefined;
    readonly type: string;
  } {
    return JSON.parse(
      JSON.stringify({
        "@id": this.identifier.value,
        orLiteralsProperty: this.orLiteralsProperty
          .map((_item) => ({
            "@language": _item.language.length > 0 ? _item.language : undefined,
            "@type":
              _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string"
                ? _item.datatype.value
                : undefined,
            "@value": _item.value,
          }))
          .extract(),
        orTermsProperty: this.orTermsProperty
          .map((_item) =>
            _item.termType === "NamedNode"
              ? { "@id": _item.value }
              : {
                  "@language":
                    _item.language.length > 0 ? _item.language : undefined,
                  "@type":
                    _item.datatype.value !==
                    "http://www.w3.org/2001/XMLSchema#string"
                      ? _item.datatype.value
                      : undefined,
                  "@value": _item.value,
                },
          )
          .extract(),
        orUnrelatedProperty: this.orUnrelatedProperty
          .map((_item) =>
            _item.type === "1-(rdfjs.NamedNode)"
              ? {
                  type: "1-(rdfjs.NamedNode)" as const,
                  value: { "@id": _item.value.value },
                }
              : { type: "0-number" as const, value: _item.value },
          )
          .extract(),
        type: this.type,
      } satisfies ReturnType<NodeShapeWithUnionProperties["toJson"]>),
    );
  }

  toRdf({
    mutateGraph,
    resourceSet,
  }: {
    ignoreRdfType?: boolean;
    mutateGraph: rdfjsResource.MutableResource.MutateGraph;
    resourceSet: rdfjsResource.MutableResourceSet;
  }): rdfjsResource.MutableResource {
    const _resource = resourceSet.mutableResource({
      identifier: this.identifier,
      mutateGraph,
    });
    _resource.add(
      dataFactory.namedNode("http://example.com/orLiteralsProperty"),
      this.orLiteralsProperty,
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/orTermsProperty"),
      this.orTermsProperty.map((_value) =>
        _value.termType === "NamedNode" ? _value : _value,
      ),
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/orUnrelatedProperty"),
      this.orUnrelatedProperty.map((_value) =>
        _value.type === "1-(rdfjs.NamedNode)" ? _value.value : _value.value,
      ),
    );
    return _resource;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace NodeShapeWithUnionProperties {
  export function fromRdf({
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
    NodeShapeWithUnionProperties
  > {
    const identifier = _resource.identifier;
    const _orLiteralsPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<rdfjs.Literal>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode("http://example.com/orLiteralsProperty"),
          { unique: true },
        )
        .filter((_value) => {
          const _languageInOrDefault = _languageIn ?? [];
          if (_languageInOrDefault.length === 0) {
            return true;
          }
          const _valueLiteral = _value.toLiteral().toMaybe().extract();
          if (typeof _valueLiteral === "undefined") {
            return false;
          }
          return _languageInOrDefault.some(
            (_languageIn) => _languageIn === _valueLiteral.language,
          );
        })
        .head()
        .chain((_value) => _value.toLiteral())
        .toMaybe(),
    );
    if (_orLiteralsPropertyEither.isLeft()) {
      return _orLiteralsPropertyEither;
    }

    const orLiteralsProperty = _orLiteralsPropertyEither.unsafeCoerce();
    const _orTermsPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<rdfjs.Literal | rdfjs.NamedNode>
    > = purify.Either.of(
      (
        _resource
          .values(dataFactory.namedNode("http://example.com/orTermsProperty"), {
            unique: true,
          })
          .filter((_value) => {
            const _languageInOrDefault = _languageIn ?? [];
            if (_languageInOrDefault.length === 0) {
              return true;
            }
            const _valueLiteral = _value.toLiteral().toMaybe().extract();
            if (typeof _valueLiteral === "undefined") {
              return false;
            }
            return _languageInOrDefault.some(
              (_languageIn) => _languageIn === _valueLiteral.language,
            );
          })
          .head()
          .chain((_value) => _value.toLiteral()) as purify.Either<
          rdfjsResource.Resource.ValueError,
          rdfjs.Literal | rdfjs.NamedNode
        >
      )
        .altLazy(
          () =>
            _resource
              .values(
                dataFactory.namedNode("http://example.com/orTermsProperty"),
                { unique: true },
              )
              .head()
              .chain((_value) => _value.toIri()) as purify.Either<
              rdfjsResource.Resource.ValueError,
              rdfjs.Literal | rdfjs.NamedNode
            >,
        )
        .toMaybe(),
    );
    if (_orTermsPropertyEither.isLeft()) {
      return _orTermsPropertyEither;
    }

    const orTermsProperty = _orTermsPropertyEither.unsafeCoerce();
    const _orUnrelatedPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<
        | { type: "0-number"; value: number }
        | { type: "1-(rdfjs.NamedNode)"; value: rdfjs.NamedNode }
      >
    > = purify.Either.of(
      (
        _resource
          .values(
            dataFactory.namedNode("http://example.com/orUnrelatedProperty"),
            { unique: true },
          )
          .head()
          .chain((_value) => _value.toNumber())
          .map(
            (value) =>
              ({ type: "0-number" as const, value }) as
                | { type: "0-number"; value: number }
                | { type: "1-(rdfjs.NamedNode)"; value: rdfjs.NamedNode },
          ) as purify.Either<
          rdfjsResource.Resource.ValueError,
          | { type: "0-number"; value: number }
          | { type: "1-(rdfjs.NamedNode)"; value: rdfjs.NamedNode }
        >
      )
        .altLazy(
          () =>
            _resource
              .values(
                dataFactory.namedNode("http://example.com/orUnrelatedProperty"),
                { unique: true },
              )
              .head()
              .chain((_value) => _value.toIri())
              .map(
                (value) =>
                  ({ type: "1-(rdfjs.NamedNode)" as const, value }) as
                    | { type: "0-number"; value: number }
                    | { type: "1-(rdfjs.NamedNode)"; value: rdfjs.NamedNode },
              ) as purify.Either<
              rdfjsResource.Resource.ValueError,
              | { type: "0-number"; value: number }
              | { type: "1-(rdfjs.NamedNode)"; value: rdfjs.NamedNode }
            >,
        )
        .toMaybe(),
    );
    if (_orUnrelatedPropertyEither.isLeft()) {
      return _orUnrelatedPropertyEither;
    }

    const orUnrelatedProperty = _orUnrelatedPropertyEither.unsafeCoerce();
    return purify.Either.of(
      new NodeShapeWithUnionProperties({
        identifier,
        orLiteralsProperty,
        orTermsProperty,
        orUnrelatedProperty,
      }),
    );
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
            dataFactory.namedNode("http://example.com/orLiteralsProperty"),
            this.variable("OrLiteralsProperty"),
          ),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.union(
            sparqlBuilder.GraphPattern.basic(
              this.subject,
              dataFactory.namedNode("http://example.com/orTermsProperty"),
              this.variable("OrTermsProperty"),
            ),
            sparqlBuilder.GraphPattern.basic(
              this.subject,
              dataFactory.namedNode("http://example.com/orTermsProperty"),
              this.variable("OrTermsProperty"),
            ),
          ),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.union(
            sparqlBuilder.GraphPattern.basic(
              this.subject,
              dataFactory.namedNode("http://example.com/orUnrelatedProperty"),
              this.variable("OrUnrelatedProperty"),
            ),
            sparqlBuilder.GraphPattern.basic(
              this.subject,
              dataFactory.namedNode("http://example.com/orUnrelatedProperty"),
              this.variable("OrUnrelatedProperty"),
            ),
          ),
        ),
      );
    }
  }
}
/**
 * Shape with properties that are not nested objects
 */
export class NodeShapeWithTermProperties {
  readonly booleanProperty: purify.Maybe<boolean>;
  readonly dateTimeProperty: purify.Maybe<Date>;
  private _identifier: (rdfjs.BlankNode | rdfjs.NamedNode) | undefined;
  readonly iriProperty: purify.Maybe<rdfjs.NamedNode>;
  readonly literalProperty: purify.Maybe<rdfjs.Literal>;
  readonly numberProperty: purify.Maybe<number>;
  readonly stringProperty: purify.Maybe<string>;
  readonly termProperty: purify.Maybe<
    rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal
  >;
  readonly type = "NodeShapeWithTermProperties";

  constructor(parameters: {
    readonly booleanProperty?: boolean | purify.Maybe<boolean>;
    readonly dateTimeProperty?: Date | purify.Maybe<Date>;
    readonly identifier?: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly iriProperty?: rdfjs.NamedNode | purify.Maybe<rdfjs.NamedNode>;
    readonly literalProperty?:
      | rdfjs.Literal
      | Date
      | boolean
      | number
      | purify.Maybe<rdfjs.Literal>
      | string;
    readonly numberProperty?: number | purify.Maybe<number>;
    readonly stringProperty?: purify.Maybe<string> | string;
    readonly termProperty?:
      | (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)
      | Date
      | boolean
      | number
      | purify.Maybe<rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal>
      | string;
  }) {
    if (purify.Maybe.isMaybe(parameters.booleanProperty)) {
      this.booleanProperty = parameters.booleanProperty;
    } else if (typeof parameters.booleanProperty === "boolean") {
      this.booleanProperty = purify.Maybe.of(parameters.booleanProperty);
    } else if (typeof parameters.booleanProperty === "undefined") {
      this.booleanProperty = purify.Maybe.empty();
    } else {
      this.booleanProperty = parameters.booleanProperty as never;
    }

    if (purify.Maybe.isMaybe(parameters.dateTimeProperty)) {
      this.dateTimeProperty = parameters.dateTimeProperty;
    } else if (
      typeof parameters.dateTimeProperty === "object" &&
      parameters.dateTimeProperty instanceof Date
    ) {
      this.dateTimeProperty = purify.Maybe.of(parameters.dateTimeProperty);
    } else if (typeof parameters.dateTimeProperty === "undefined") {
      this.dateTimeProperty = purify.Maybe.empty();
    } else {
      this.dateTimeProperty = parameters.dateTimeProperty as never;
    }

    this._identifier = parameters.identifier;
    if (purify.Maybe.isMaybe(parameters.iriProperty)) {
      this.iriProperty = parameters.iriProperty;
    } else if (typeof parameters.iriProperty === "object") {
      this.iriProperty = purify.Maybe.of(parameters.iriProperty);
    } else if (typeof parameters.iriProperty === "undefined") {
      this.iriProperty = purify.Maybe.empty();
    } else {
      this.iriProperty = parameters.iriProperty as never;
    }

    if (purify.Maybe.isMaybe(parameters.literalProperty)) {
      this.literalProperty = parameters.literalProperty;
    } else if (typeof parameters.literalProperty === "boolean") {
      this.literalProperty = purify.Maybe.of(
        rdfLiteral.toRdf(parameters.literalProperty),
      );
    } else if (
      typeof parameters.literalProperty === "object" &&
      parameters.literalProperty instanceof Date
    ) {
      this.literalProperty = purify.Maybe.of(
        rdfLiteral.toRdf(parameters.literalProperty),
      );
    } else if (typeof parameters.literalProperty === "number") {
      this.literalProperty = purify.Maybe.of(
        rdfLiteral.toRdf(parameters.literalProperty),
      );
    } else if (typeof parameters.literalProperty === "string") {
      this.literalProperty = purify.Maybe.of(
        dataFactory.literal(parameters.literalProperty),
      );
    } else if (typeof parameters.literalProperty === "object") {
      this.literalProperty = purify.Maybe.of(parameters.literalProperty);
    } else if (typeof parameters.literalProperty === "undefined") {
      this.literalProperty = purify.Maybe.empty();
    } else {
      this.literalProperty = parameters.literalProperty as never;
    }

    if (purify.Maybe.isMaybe(parameters.numberProperty)) {
      this.numberProperty = parameters.numberProperty;
    } else if (typeof parameters.numberProperty === "number") {
      this.numberProperty = purify.Maybe.of(parameters.numberProperty);
    } else if (typeof parameters.numberProperty === "undefined") {
      this.numberProperty = purify.Maybe.empty();
    } else {
      this.numberProperty = parameters.numberProperty as never;
    }

    if (purify.Maybe.isMaybe(parameters.stringProperty)) {
      this.stringProperty = parameters.stringProperty;
    } else if (typeof parameters.stringProperty === "string") {
      this.stringProperty = purify.Maybe.of(parameters.stringProperty);
    } else if (typeof parameters.stringProperty === "undefined") {
      this.stringProperty = purify.Maybe.empty();
    } else {
      this.stringProperty = parameters.stringProperty as never;
    }

    if (purify.Maybe.isMaybe(parameters.termProperty)) {
      this.termProperty = parameters.termProperty;
    } else if (typeof parameters.termProperty === "boolean") {
      this.termProperty = purify.Maybe.of(
        rdfLiteral.toRdf(parameters.termProperty),
      );
    } else if (
      typeof parameters.termProperty === "object" &&
      parameters.termProperty instanceof Date
    ) {
      this.termProperty = purify.Maybe.of(
        rdfLiteral.toRdf(parameters.termProperty),
      );
    } else if (typeof parameters.termProperty === "number") {
      this.termProperty = purify.Maybe.of(
        rdfLiteral.toRdf(parameters.termProperty),
      );
    } else if (typeof parameters.termProperty === "string") {
      this.termProperty = purify.Maybe.of(
        dataFactory.literal(parameters.termProperty),
      );
    } else if (typeof parameters.termProperty === "object") {
      this.termProperty = purify.Maybe.of(parameters.termProperty);
    } else if (typeof parameters.termProperty === "undefined") {
      this.termProperty = purify.Maybe.empty();
    } else {
      this.termProperty = parameters.termProperty as never;
    }
  }

  get identifier(): rdfjs.BlankNode | rdfjs.NamedNode {
    return typeof this._identifier !== "undefined"
      ? this._identifier
      : dataFactory.blankNode();
  }

  equals(
    other: NodeShapeWithTermProperties,
  ): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.booleanEquals(
      this.booleanProperty,
      other.booleanProperty,
    )
      .mapLeft((propertyValuesUnequal) => ({
        left: this,
        right: other,
        propertyName: "booleanProperty",
        propertyValuesUnequal,
        type: "Property" as const,
      }))
      .chain(() =>
        ((left, right) =>
          purifyHelpers.Maybes.equals(left, right, (left, right) =>
            purifyHelpers.Equatable.EqualsResult.fromBooleanEqualsResult(
              left,
              right,
              left.getTime() === right.getTime(),
            ),
          ))(this.dateTimeProperty, other.dateTimeProperty).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "dateTimeProperty",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      )
      .chain(() =>
        purifyHelpers.Equatable.booleanEquals(
          this.identifier,
          other.identifier,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "identifier",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        ((left, right) =>
          purifyHelpers.Maybes.equals(
            left,
            right,
            purifyHelpers.Equatable.booleanEquals,
          ))(this.iriProperty, other.iriProperty).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "iriProperty",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      )
      .chain(() =>
        ((left, right) =>
          purifyHelpers.Maybes.equals(
            left,
            right,
            purifyHelpers.Equatable.booleanEquals,
          ))(this.literalProperty, other.literalProperty).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "literalProperty",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      )
      .chain(() =>
        purifyHelpers.Equatable.booleanEquals(
          this.numberProperty,
          other.numberProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "numberProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.booleanEquals(
          this.stringProperty,
          other.stringProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "stringProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        ((left, right) =>
          purifyHelpers.Maybes.equals(
            left,
            right,
            purifyHelpers.Equatable.booleanEquals,
          ))(this.termProperty, other.termProperty).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "termProperty",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(this.type, other.type).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "type",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      );
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_hasher: HasherT): HasherT {
    this.booleanProperty.ifJust((_value0) => {
      _hasher.update(_value0.toString());
    });
    this.dateTimeProperty.ifJust((_value0) => {
      _hasher.update(_value0.toISOString());
    });
    this.iriProperty.ifJust((_value0) => {
      _hasher.update(_value0.termType);
      _hasher.update(_value0.value);
    });
    this.literalProperty.ifJust((_value0) => {
      _hasher.update(_value0.termType);
      _hasher.update(_value0.value);
    });
    this.numberProperty.ifJust((_value0) => {
      _hasher.update(_value0.toString());
    });
    this.stringProperty.ifJust((_value0) => {
      _hasher.update(_value0);
    });
    this.termProperty.ifJust((_value0) => {
      _hasher.update(_value0.termType);
      _hasher.update(_value0.value);
    });
    return _hasher;
  }

  toJson(): {
    readonly booleanProperty: boolean | undefined;
    readonly dateTimeProperty: string | undefined;
    readonly "@id": string;
    readonly iriProperty: { "@id": string } | undefined;
    readonly literalProperty:
      | {
          "@language": string | undefined;
          "@type": string | undefined;
          "@value": string;
        }
      | undefined;
    readonly numberProperty: number | undefined;
    readonly stringProperty: string | undefined;
    readonly termProperty:
      | (
          | {
              "@language": string | undefined;
              "@type": string | undefined;
              "@value": string;
            }
          | { "@id": string }
        )
      | undefined;
    readonly type: string;
  } {
    return JSON.parse(
      JSON.stringify({
        booleanProperty: this.booleanProperty.map((_item) => _item).extract(),
        dateTimeProperty: this.dateTimeProperty
          .map((_item) => _item.toISOString())
          .extract(),
        "@id": this.identifier.value,
        iriProperty: this.iriProperty
          .map((_item) => ({ "@id": _item.value }))
          .extract(),
        literalProperty: this.literalProperty
          .map((_item) => ({
            "@language": _item.language.length > 0 ? _item.language : undefined,
            "@type":
              _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string"
                ? _item.datatype.value
                : undefined,
            "@value": _item.value,
          }))
          .extract(),
        numberProperty: this.numberProperty.map((_item) => _item).extract(),
        stringProperty: this.stringProperty.map((_item) => _item).extract(),
        termProperty: this.termProperty
          .map((_item) =>
            _item.termType === "Literal"
              ? {
                  "@language":
                    _item.language.length > 0 ? _item.language : undefined,
                  "@type":
                    _item.datatype.value !==
                    "http://www.w3.org/2001/XMLSchema#string"
                      ? _item.datatype.value
                      : undefined,
                  "@value": _item.value,
                }
              : { "@id": _item.value },
          )
          .extract(),
        type: this.type,
      } satisfies ReturnType<NodeShapeWithTermProperties["toJson"]>),
    );
  }

  toRdf({
    mutateGraph,
    resourceSet,
  }: {
    ignoreRdfType?: boolean;
    mutateGraph: rdfjsResource.MutableResource.MutateGraph;
    resourceSet: rdfjsResource.MutableResourceSet;
  }): rdfjsResource.MutableResource {
    const _resource = resourceSet.mutableResource({
      identifier: this.identifier,
      mutateGraph,
    });
    _resource.add(
      dataFactory.namedNode("http://example.com/booleanProperty"),
      this.booleanProperty,
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/dateTimeProperty"),
      this.dateTimeProperty,
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/iriProperty"),
      this.iriProperty,
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/literalProperty"),
      this.literalProperty,
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/numberProperty"),
      this.numberProperty,
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/stringProperty"),
      this.stringProperty,
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/termProperty"),
      this.termProperty,
    );
    return _resource;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace NodeShapeWithTermProperties {
  export function fromRdf({
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
    NodeShapeWithTermProperties
  > {
    const _booleanPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<boolean>
    > = purify.Either.of(
      _resource
        .values(dataFactory.namedNode("http://example.com/booleanProperty"), {
          unique: true,
        })
        .head()
        .chain((_value) => _value.toBoolean())
        .toMaybe(),
    );
    if (_booleanPropertyEither.isLeft()) {
      return _booleanPropertyEither;
    }

    const booleanProperty = _booleanPropertyEither.unsafeCoerce();
    const _dateTimePropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<Date>
    > = purify.Either.of(
      _resource
        .values(dataFactory.namedNode("http://example.com/dateTimeProperty"), {
          unique: true,
        })
        .head()
        .chain((_value) => _value.toDate())
        .toMaybe(),
    );
    if (_dateTimePropertyEither.isLeft()) {
      return _dateTimePropertyEither;
    }

    const dateTimeProperty = _dateTimePropertyEither.unsafeCoerce();
    const identifier = _resource.identifier;
    const _iriPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<rdfjs.NamedNode>
    > = purify.Either.of(
      _resource
        .values(dataFactory.namedNode("http://example.com/iriProperty"), {
          unique: true,
        })
        .head()
        .chain((_value) => _value.toIri())
        .toMaybe(),
    );
    if (_iriPropertyEither.isLeft()) {
      return _iriPropertyEither;
    }

    const iriProperty = _iriPropertyEither.unsafeCoerce();
    const _literalPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<rdfjs.Literal>
    > = purify.Either.of(
      _resource
        .values(dataFactory.namedNode("http://example.com/literalProperty"), {
          unique: true,
        })
        .filter((_value) => {
          const _languageInOrDefault = _languageIn ?? [];
          if (_languageInOrDefault.length === 0) {
            return true;
          }
          const _valueLiteral = _value.toLiteral().toMaybe().extract();
          if (typeof _valueLiteral === "undefined") {
            return false;
          }
          return _languageInOrDefault.some(
            (_languageIn) => _languageIn === _valueLiteral.language,
          );
        })
        .head()
        .chain((_value) => _value.toLiteral())
        .toMaybe(),
    );
    if (_literalPropertyEither.isLeft()) {
      return _literalPropertyEither;
    }

    const literalProperty = _literalPropertyEither.unsafeCoerce();
    const _numberPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<number>
    > = purify.Either.of(
      _resource
        .values(dataFactory.namedNode("http://example.com/numberProperty"), {
          unique: true,
        })
        .head()
        .chain((_value) => _value.toNumber())
        .toMaybe(),
    );
    if (_numberPropertyEither.isLeft()) {
      return _numberPropertyEither;
    }

    const numberProperty = _numberPropertyEither.unsafeCoerce();
    const _stringPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<string>
    > = purify.Either.of(
      _resource
        .values(dataFactory.namedNode("http://example.com/stringProperty"), {
          unique: true,
        })
        .head()
        .chain((_value) => _value.toString())
        .toMaybe(),
    );
    if (_stringPropertyEither.isLeft()) {
      return _stringPropertyEither;
    }

    const stringProperty = _stringPropertyEither.unsafeCoerce();
    const _termPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal>
    > = purify.Either.of(
      _resource
        .values(dataFactory.namedNode("http://example.com/termProperty"), {
          unique: true,
        })
        .head()
        .chain((_value) => purify.Either.of(_value.toTerm()))
        .toMaybe(),
    );
    if (_termPropertyEither.isLeft()) {
      return _termPropertyEither;
    }

    const termProperty = _termPropertyEither.unsafeCoerce();
    return purify.Either.of(
      new NodeShapeWithTermProperties({
        booleanProperty,
        dateTimeProperty,
        identifier,
        iriProperty,
        literalProperty,
        numberProperty,
        stringProperty,
        termProperty,
      }),
    );
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
            dataFactory.namedNode("http://example.com/booleanProperty"),
            this.variable("BooleanProperty"),
          ),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.basic(
            this.subject,
            dataFactory.namedNode("http://example.com/dateTimeProperty"),
            this.variable("DateTimeProperty"),
          ),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.basic(
            this.subject,
            dataFactory.namedNode("http://example.com/iriProperty"),
            this.variable("IriProperty"),
          ),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.basic(
            this.subject,
            dataFactory.namedNode("http://example.com/literalProperty"),
            this.variable("LiteralProperty"),
          ),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.basic(
            this.subject,
            dataFactory.namedNode("http://example.com/numberProperty"),
            this.variable("NumberProperty"),
          ),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.basic(
            this.subject,
            dataFactory.namedNode("http://example.com/stringProperty"),
            this.variable("StringProperty"),
          ),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.basic(
            this.subject,
            dataFactory.namedNode("http://example.com/termProperty"),
            this.variable("TermProperty"),
          ),
        ),
      );
    }
  }
}
/**
 * Shape with properties that have visibility modifiers (private, protected, public)
 */
export class NodeShapeWithPropertyVisibilities {
  private _identifier: (rdfjs.BlankNode | rdfjs.NamedNode) | undefined;
  private readonly privateProperty: string;
  protected readonly protectedProperty: string;
  readonly publicProperty: string;
  readonly type = "NodeShapeWithPropertyVisibilities";

  constructor(parameters: {
    readonly identifier?: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly privateProperty: string;
    readonly protectedProperty: string;
    readonly publicProperty: string;
  }) {
    this._identifier = parameters.identifier;
    this.privateProperty = parameters.privateProperty;
    this.protectedProperty = parameters.protectedProperty;
    this.publicProperty = parameters.publicProperty;
  }

  get identifier(): rdfjs.BlankNode | rdfjs.NamedNode {
    if (typeof this._identifier === "undefined") {
      this._identifier = dataFactory.blankNode();
    }
    return this._identifier;
  }

  equals(
    other: NodeShapeWithPropertyVisibilities,
  ): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.booleanEquals(
      this.identifier,
      other.identifier,
    )
      .mapLeft((propertyValuesUnequal) => ({
        left: this,
        right: other,
        propertyName: "identifier",
        propertyValuesUnequal,
        type: "Property" as const,
      }))
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(
          this.privateProperty,
          other.privateProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "privateProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(
          this.protectedProperty,
          other.protectedProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "protectedProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(
          this.publicProperty,
          other.publicProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "publicProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(this.type, other.type).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "type",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      );
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_hasher: HasherT): HasherT {
    _hasher.update(this.privateProperty);
    _hasher.update(this.protectedProperty);
    _hasher.update(this.publicProperty);
    return _hasher;
  }

  toJson(): {
    readonly "@id": string;
    readonly privateProperty: string;
    readonly protectedProperty: string;
    readonly publicProperty: string;
    readonly type: string;
  } {
    return JSON.parse(
      JSON.stringify({
        "@id": this.identifier.value,
        privateProperty: this.privateProperty,
        protectedProperty: this.protectedProperty,
        publicProperty: this.publicProperty,
        type: this.type,
      } satisfies ReturnType<NodeShapeWithPropertyVisibilities["toJson"]>),
    );
  }

  toRdf({
    mutateGraph,
    resourceSet,
  }: {
    ignoreRdfType?: boolean;
    mutateGraph: rdfjsResource.MutableResource.MutateGraph;
    resourceSet: rdfjsResource.MutableResourceSet;
  }): rdfjsResource.MutableResource {
    const _resource = resourceSet.mutableResource({
      identifier: this.identifier,
      mutateGraph,
    });
    _resource.add(
      dataFactory.namedNode("http://example.com/privateProperty"),
      this.privateProperty,
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/protectedProperty"),
      this.protectedProperty,
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/publicProperty"),
      this.publicProperty,
    );
    return _resource;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace NodeShapeWithPropertyVisibilities {
  export function fromRdf({
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
    NodeShapeWithPropertyVisibilities
  > {
    const identifier = _resource.identifier;
    const _privatePropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      string
    > = _resource
      .values(dataFactory.namedNode("http://example.com/privateProperty"), {
        unique: true,
      })
      .head()
      .chain((_value) => _value.toString());
    if (_privatePropertyEither.isLeft()) {
      return _privatePropertyEither;
    }

    const privateProperty = _privatePropertyEither.unsafeCoerce();
    const _protectedPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      string
    > = _resource
      .values(dataFactory.namedNode("http://example.com/protectedProperty"), {
        unique: true,
      })
      .head()
      .chain((_value) => _value.toString());
    if (_protectedPropertyEither.isLeft()) {
      return _protectedPropertyEither;
    }

    const protectedProperty = _protectedPropertyEither.unsafeCoerce();
    const _publicPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      string
    > = _resource
      .values(dataFactory.namedNode("http://example.com/publicProperty"), {
        unique: true,
      })
      .head()
      .chain((_value) => _value.toString());
    if (_publicPropertyEither.isLeft()) {
      return _publicPropertyEither;
    }

    const publicProperty = _publicPropertyEither.unsafeCoerce();
    return purify.Either.of(
      new NodeShapeWithPropertyVisibilities({
        identifier,
        privateProperty,
        protectedProperty,
        publicProperty,
      }),
    );
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
          dataFactory.namedNode("http://example.com/privateProperty"),
          this.variable("PrivateProperty"),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.basic(
          this.subject,
          dataFactory.namedNode("http://example.com/protectedProperty"),
          this.variable("ProtectedProperty"),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.basic(
          this.subject,
          dataFactory.namedNode("http://example.com/publicProperty"),
          this.variable("PublicProperty"),
        ),
      );
    }
  }
}
/**
 * Shape that has properties with different cardinalities
 */
export class NodeShapeWithPropertyCardinalities {
  /**
   * Set: minCount implicitly=0, no maxCount or maxCount > 1
   */
  readonly emptyStringSetProperty: purify.Maybe<purify.NonEmptyList<string>>;
  private _identifier: (rdfjs.BlankNode | rdfjs.NamedNode) | undefined;
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
  readonly type = "NodeShapeWithPropertyCardinalities";

  constructor(parameters: {
    readonly emptyStringSetProperty?:
      | purify.Maybe<purify.NonEmptyList<string>>
      | purify.NonEmptyList<string>
      | readonly string[];
    readonly identifier?: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly nonEmptyStringSetProperty: purify.NonEmptyList<string>;
    readonly optionalStringProperty?: purify.Maybe<string> | string;
    readonly requiredStringProperty: string;
  }) {
    if (typeof parameters.emptyStringSetProperty === "undefined") {
      this.emptyStringSetProperty = purify.Maybe.empty();
    } else if (purify.Maybe.isMaybe(parameters.emptyStringSetProperty)) {
      this.emptyStringSetProperty = parameters.emptyStringSetProperty;
    } else if (
      purify.NonEmptyList.isNonEmpty(parameters.emptyStringSetProperty)
    ) {
      this.emptyStringSetProperty = purify.Maybe.of(
        parameters.emptyStringSetProperty,
      );
    } else if (Array.isArray(parameters.emptyStringSetProperty)) {
      this.emptyStringSetProperty = purify.NonEmptyList.fromArray(
        parameters.emptyStringSetProperty,
      );
    } else {
      this.emptyStringSetProperty = parameters.emptyStringSetProperty as never;
    }

    this._identifier = parameters.identifier;
    this.nonEmptyStringSetProperty = parameters.nonEmptyStringSetProperty;
    if (purify.Maybe.isMaybe(parameters.optionalStringProperty)) {
      this.optionalStringProperty = parameters.optionalStringProperty;
    } else if (typeof parameters.optionalStringProperty === "string") {
      this.optionalStringProperty = purify.Maybe.of(
        parameters.optionalStringProperty,
      );
    } else if (typeof parameters.optionalStringProperty === "undefined") {
      this.optionalStringProperty = purify.Maybe.empty();
    } else {
      this.optionalStringProperty = parameters.optionalStringProperty as never;
    }

    this.requiredStringProperty = parameters.requiredStringProperty;
  }

  get identifier(): rdfjs.BlankNode | rdfjs.NamedNode {
    if (typeof this._identifier === "undefined") {
      this._identifier = dataFactory.blankNode();
    }
    return this._identifier;
  }

  equals(
    other: NodeShapeWithPropertyCardinalities,
  ): purifyHelpers.Equatable.EqualsResult {
    return ((left, right) =>
      purifyHelpers.Arrays.equals(
        (left.extract() as readonly string[] | undefined) ?? [],
        (right.extract() as readonly string[] | undefined) ?? [],
        purifyHelpers.Equatable.strictEquals,
      ))(this.emptyStringSetProperty, other.emptyStringSetProperty)
      .mapLeft((propertyValuesUnequal) => ({
        left: this,
        right: other,
        propertyName: "emptyStringSetProperty",
        propertyValuesUnequal,
        type: "Property" as const,
      }))
      .chain(() =>
        purifyHelpers.Equatable.booleanEquals(
          this.identifier,
          other.identifier,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
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
          this.nonEmptyStringSetProperty,
          other.nonEmptyStringSetProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "nonEmptyStringSetProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.booleanEquals(
          this.optionalStringProperty,
          other.optionalStringProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "optionalStringProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(
          this.requiredStringProperty,
          other.requiredStringProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "requiredStringProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(this.type, other.type).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "type",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      );
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_hasher: HasherT): HasherT {
    for (const _item0 of (this.emptyStringSetProperty.extract() as
      | readonly string[]
      | undefined) ?? []) {
      _hasher.update(_item0);
    }

    for (const _item0 of this.nonEmptyStringSetProperty) {
      _hasher.update(_item0);
    }

    this.optionalStringProperty.ifJust((_value0) => {
      _hasher.update(_value0);
    });
    _hasher.update(this.requiredStringProperty);
    return _hasher;
  }

  toJson(): {
    readonly emptyStringSetProperty: readonly string[];
    readonly "@id": string;
    readonly nonEmptyStringSetProperty: readonly string[];
    readonly optionalStringProperty: string | undefined;
    readonly requiredStringProperty: string;
    readonly type: string;
  } {
    return JSON.parse(
      JSON.stringify({
        emptyStringSetProperty: (
          (this.emptyStringSetProperty.extract() as
            | readonly string[]
            | undefined) ?? []
        ).map((_item) => _item),
        "@id": this.identifier.value,
        nonEmptyStringSetProperty: this.nonEmptyStringSetProperty.map(
          (_item) => _item,
        ),
        optionalStringProperty: this.optionalStringProperty
          .map((_item) => _item)
          .extract(),
        requiredStringProperty: this.requiredStringProperty,
        type: this.type,
      } satisfies ReturnType<NodeShapeWithPropertyCardinalities["toJson"]>),
    );
  }

  toRdf({
    mutateGraph,
    resourceSet,
  }: {
    ignoreRdfType?: boolean;
    mutateGraph: rdfjsResource.MutableResource.MutateGraph;
    resourceSet: rdfjsResource.MutableResourceSet;
  }): rdfjsResource.MutableResource {
    const _resource = resourceSet.mutableResource({
      identifier: this.identifier,
      mutateGraph,
    });
    _resource.add(
      dataFactory.namedNode("http://example.com/emptyStringSetProperty"),
      (
        (this.emptyStringSetProperty.extract() as
          | readonly string[]
          | undefined) ?? []
      ).map((_item) => _item),
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/nonEmptyStringSetProperty"),
      this.nonEmptyStringSetProperty.map((_item) => _item),
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/optionalStringProperty"),
      this.optionalStringProperty,
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/requiredStringProperty"),
      this.requiredStringProperty,
    );
    return _resource;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace NodeShapeWithPropertyCardinalities {
  export function fromRdf({
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
    NodeShapeWithPropertyCardinalities
  > {
    const _emptyStringSetPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<purify.NonEmptyList<string>>
    > = purify.Either.of(
      purify.NonEmptyList.fromArray([
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
      ]),
    );
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
    return purify.Either.of(
      new NodeShapeWithPropertyCardinalities({
        emptyStringSetProperty,
        identifier,
        nonEmptyStringSetProperty,
        optionalStringProperty,
        requiredStringProperty,
      }),
    );
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
}
/**
 * Shape with shaclmate:mutable properties.
 */
export class NodeShapeWithMutableProperties {
  private _identifier: (rdfjs.BlankNode | rdfjs.NamedNode) | undefined;
  /**
   * List-valued property that can't be reassigned but whose value can be mutated
   */
  readonly mutableListProperty: purify.Maybe<string[]>;
  /**
   * String-valued property that can be re-assigned
   */
  mutableStringProperty: purify.Maybe<string>;
  readonly type = "NodeShapeWithMutableProperties";

  constructor(parameters: {
    readonly identifier?: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly mutableListProperty?: purify.Maybe<string[]> | string[];
    readonly mutableStringProperty?: purify.Maybe<string> | string;
  }) {
    this._identifier = parameters.identifier;
    if (purify.Maybe.isMaybe(parameters.mutableListProperty)) {
      this.mutableListProperty = parameters.mutableListProperty;
    } else if (Array.isArray(parameters.mutableListProperty)) {
      this.mutableListProperty = purify.Maybe.of(
        parameters.mutableListProperty,
      );
    } else if (typeof parameters.mutableListProperty === "undefined") {
      this.mutableListProperty = purify.Maybe.empty();
    } else {
      this.mutableListProperty = parameters.mutableListProperty as never;
    }

    if (purify.Maybe.isMaybe(parameters.mutableStringProperty)) {
      this.mutableStringProperty = parameters.mutableStringProperty;
    } else if (typeof parameters.mutableStringProperty === "string") {
      this.mutableStringProperty = purify.Maybe.of(
        parameters.mutableStringProperty,
      );
    } else if (typeof parameters.mutableStringProperty === "undefined") {
      this.mutableStringProperty = purify.Maybe.empty();
    } else {
      this.mutableStringProperty = parameters.mutableStringProperty as never;
    }
  }

  get identifier(): rdfjs.BlankNode | rdfjs.NamedNode {
    return typeof this._identifier !== "undefined"
      ? this._identifier
      : dataFactory.namedNode(
          `urn:shaclmate:object:${this.type}:${this.hash(sha256.create())}`,
        );
  }

  equals(
    other: NodeShapeWithMutableProperties,
  ): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.booleanEquals(
      this.identifier,
      other.identifier,
    )
      .mapLeft((propertyValuesUnequal) => ({
        left: this,
        right: other,
        propertyName: "identifier",
        propertyValuesUnequal,
        type: "Property" as const,
      }))
      .chain(() =>
        ((left, right) =>
          purifyHelpers.Maybes.equals(left, right, (left, right) =>
            purifyHelpers.Arrays.equals(
              left,
              right,
              purifyHelpers.Equatable.strictEquals,
            ),
          ))(this.mutableListProperty, other.mutableListProperty).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "mutableListProperty",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      )
      .chain(() =>
        purifyHelpers.Equatable.booleanEquals(
          this.mutableStringProperty,
          other.mutableStringProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "mutableStringProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(this.type, other.type).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "type",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      );
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_hasher: HasherT): HasherT {
    this.mutableListProperty.ifJust((_value0) => {
      for (const _element1 of _value0) {
        _hasher.update(_element1);
      }
    });
    this.mutableStringProperty.ifJust((_value0) => {
      _hasher.update(_value0);
    });
    return _hasher;
  }

  toJson(): {
    readonly "@id": string;
    readonly mutableListProperty: readonly string[] | undefined;
    readonly mutableStringProperty: string | undefined;
    readonly type: string;
  } {
    return JSON.parse(
      JSON.stringify({
        "@id": this.identifier.value,
        mutableListProperty: this.mutableListProperty
          .map((_item) => _item.map((_item) => _item))
          .extract(),
        mutableStringProperty: this.mutableStringProperty
          .map((_item) => _item)
          .extract(),
        type: this.type,
      } satisfies ReturnType<NodeShapeWithMutableProperties["toJson"]>),
    );
  }

  toRdf({
    mutateGraph,
    resourceSet,
  }: {
    ignoreRdfType?: boolean;
    mutateGraph: rdfjsResource.MutableResource.MutateGraph;
    resourceSet: rdfjsResource.MutableResourceSet;
  }): rdfjsResource.MutableResource {
    const _resource = resourceSet.mutableResource({
      identifier: this.identifier,
      mutateGraph,
    });
    _resource.add(
      dataFactory.namedNode("http://example.com/mutableListProperty"),
      this.mutableListProperty.map(
        (_value) =>
          _value.reduce(
            (
              { currentSubListResource, listResource },
              item,
              itemIndex,
              list,
            ) => {
              if (itemIndex === 0) {
                currentSubListResource = listResource;
              } else {
                const newSubListResource = resourceSet.mutableResource({
                  identifier: dataFactory.blankNode(),
                  mutateGraph: mutateGraph,
                });
                currentSubListResource!.add(
                  dataFactory.namedNode(
                    "http://www.w3.org/1999/02/22-rdf-syntax-ns#rest",
                  ),
                  newSubListResource.identifier,
                );
                currentSubListResource = newSubListResource;
              }

              currentSubListResource.add(
                dataFactory.namedNode(
                  "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
                ),
                dataFactory.namedNode("http://example.com/MutableListShape"),
              );

              currentSubListResource.add(
                dataFactory.namedNode(
                  "http://www.w3.org/1999/02/22-rdf-syntax-ns#first",
                ),
                item,
              );

              if (itemIndex + 1 === list.length) {
                currentSubListResource.add(
                  dataFactory.namedNode(
                    "http://www.w3.org/1999/02/22-rdf-syntax-ns#rest",
                  ),
                  dataFactory.namedNode(
                    "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil",
                  ),
                );
              }

              return { currentSubListResource, listResource };
            },
            {
              currentSubListResource: null,
              listResource: resourceSet.mutableResource({
                identifier: dataFactory.blankNode(),
                mutateGraph: mutateGraph,
              }),
            } as {
              currentSubListResource: rdfjsResource.MutableResource | null;
              listResource: rdfjsResource.MutableResource;
            },
          ).listResource.identifier,
      ),
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/mutableStringProperty"),
      this.mutableStringProperty,
    );
    return _resource;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace NodeShapeWithMutableProperties {
  export function fromRdf({
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
    NodeShapeWithMutableProperties
  > {
    const identifier = _resource.identifier;
    const _mutableListPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<string[]>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode("http://example.com/mutableListProperty"),
          { unique: true },
        )
        .head()
        .chain((value) => value.toList())
        .map((values) =>
          values.flatMap((_value) =>
            _value
              .toValues()
              .head()
              .chain((_value) => _value.toString())
              .toMaybe()
              .toList(),
          ),
        )
        .toMaybe(),
    );
    if (_mutableListPropertyEither.isLeft()) {
      return _mutableListPropertyEither;
    }

    const mutableListProperty = _mutableListPropertyEither.unsafeCoerce();
    const _mutableStringPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<string>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode("http://example.com/mutableStringProperty"),
          { unique: true },
        )
        .head()
        .chain((_value) => _value.toString())
        .toMaybe(),
    );
    if (_mutableStringPropertyEither.isLeft()) {
      return _mutableStringPropertyEither;
    }

    const mutableStringProperty = _mutableStringPropertyEither.unsafeCoerce();
    return purify.Either.of(
      new NodeShapeWithMutableProperties({
        identifier,
        mutableListProperty,
        mutableStringProperty,
      }),
    );
  }

  export class SparqlGraphPatterns extends sparqlBuilder.ResourceGraphPatterns {
    constructor(
      subject: sparqlBuilder.ResourceGraphPatterns.SubjectParameter,
      _options?: { ignoreRdfType?: boolean },
    ) {
      super(subject);
      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.group(
            sparqlBuilder.GraphPattern.basic(
              this.subject,
              dataFactory.namedNode("http://example.com/mutableListProperty"),
              this.variable("MutableListProperty"),
            ).chainObject(
              (_object) =>
                new sparqlBuilder.RdfListGraphPatterns({ rdfList: _object }),
            ),
          ),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.basic(
            this.subject,
            dataFactory.namedNode("http://example.com/mutableStringProperty"),
            this.variable("MutableStringProperty"),
          ),
        ),
      );
    }
  }
}
/**
 * Shape that uses the ListShape in a property.
 */
export class NodeShapeWithListProperty {
  private _identifier: (rdfjs.BlankNode | rdfjs.NamedNode) | undefined;
  readonly listProperty: readonly string[];
  readonly type = "NodeShapeWithListProperty";

  constructor(parameters: {
    readonly identifier?: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly listProperty: readonly string[];
  }) {
    this._identifier = parameters.identifier;
    this.listProperty = parameters.listProperty;
  }

  get identifier(): rdfjs.BlankNode | rdfjs.NamedNode {
    if (typeof this._identifier === "undefined") {
      this._identifier = dataFactory.blankNode();
    }
    return this._identifier;
  }

  equals(
    other: NodeShapeWithListProperty,
  ): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.booleanEquals(
      this.identifier,
      other.identifier,
    )
      .mapLeft((propertyValuesUnequal) => ({
        left: this,
        right: other,
        propertyName: "identifier",
        propertyValuesUnequal,
        type: "Property" as const,
      }))
      .chain(() =>
        ((left, right) =>
          purifyHelpers.Arrays.equals(
            left,
            right,
            purifyHelpers.Equatable.strictEquals,
          ))(this.listProperty, other.listProperty).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "listProperty",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(this.type, other.type).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "type",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      );
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_hasher: HasherT): HasherT {
    for (const _element0 of this.listProperty) {
      _hasher.update(_element0);
    }

    return _hasher;
  }

  toJson(): {
    readonly "@id": string;
    readonly listProperty: readonly string[];
    readonly type: string;
  } {
    return JSON.parse(
      JSON.stringify({
        "@id": this.identifier.value,
        listProperty: this.listProperty.map((_item) => _item),
        type: this.type,
      } satisfies ReturnType<NodeShapeWithListProperty["toJson"]>),
    );
  }

  toRdf({
    mutateGraph,
    resourceSet,
  }: {
    ignoreRdfType?: boolean;
    mutateGraph: rdfjsResource.MutableResource.MutateGraph;
    resourceSet: rdfjsResource.MutableResourceSet;
  }): rdfjsResource.MutableResource {
    const _resource = resourceSet.mutableResource({
      identifier: this.identifier,
      mutateGraph,
    });
    _resource.add(
      dataFactory.namedNode("http://example.com/listProperty"),
      this.listProperty.reduce(
        ({ currentSubListResource, listResource }, item, itemIndex, list) => {
          if (itemIndex === 0) {
            currentSubListResource = listResource;
          } else {
            const newSubListResource = resourceSet.mutableResource({
              identifier: dataFactory.blankNode(),
              mutateGraph: mutateGraph,
            });
            currentSubListResource!.add(
              dataFactory.namedNode(
                "http://www.w3.org/1999/02/22-rdf-syntax-ns#rest",
              ),
              newSubListResource.identifier,
            );
            currentSubListResource = newSubListResource;
          }

          currentSubListResource.add(
            dataFactory.namedNode(
              "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
            ),
            dataFactory.namedNode("http://example.com/ListShape"),
          );

          currentSubListResource.add(
            dataFactory.namedNode(
              "http://www.w3.org/1999/02/22-rdf-syntax-ns#first",
            ),
            item,
          );

          if (itemIndex + 1 === list.length) {
            currentSubListResource.add(
              dataFactory.namedNode(
                "http://www.w3.org/1999/02/22-rdf-syntax-ns#rest",
              ),
              dataFactory.namedNode(
                "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil",
              ),
            );
          }

          return { currentSubListResource, listResource };
        },
        {
          currentSubListResource: null,
          listResource: resourceSet.mutableResource({
            identifier: dataFactory.blankNode(),
            mutateGraph: mutateGraph,
          }),
        } as {
          currentSubListResource: rdfjsResource.MutableResource | null;
          listResource: rdfjsResource.MutableResource;
        },
      ).listResource.identifier,
    );
    return _resource;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace NodeShapeWithListProperty {
  export function fromRdf({
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
    NodeShapeWithListProperty
  > {
    const identifier = _resource.identifier;
    const _listPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly string[]
    > = _resource
      .values(dataFactory.namedNode("http://example.com/listProperty"), {
        unique: true,
      })
      .head()
      .chain((value) => value.toList())
      .map((values) =>
        values.flatMap((_value) =>
          _value
            .toValues()
            .head()
            .chain((_value) => _value.toString())
            .toMaybe()
            .toList(),
        ),
      );
    if (_listPropertyEither.isLeft()) {
      return _listPropertyEither;
    }

    const listProperty = _listPropertyEither.unsafeCoerce();
    return purify.Either.of(
      new NodeShapeWithListProperty({ identifier, listProperty }),
    );
  }

  export class SparqlGraphPatterns extends sparqlBuilder.ResourceGraphPatterns {
    constructor(
      subject: sparqlBuilder.ResourceGraphPatterns.SubjectParameter,
      _options?: { ignoreRdfType?: boolean },
    ) {
      super(subject);
      this.add(
        sparqlBuilder.GraphPattern.group(
          sparqlBuilder.GraphPattern.basic(
            this.subject,
            dataFactory.namedNode("http://example.com/listProperty"),
            this.variable("ListProperty"),
          ).chainObject(
            (_object) =>
              new sparqlBuilder.RdfListGraphPatterns({ rdfList: _object }),
          ),
        ),
      );
    }
  }
}
/**
 * Shape that uses the ListShape in a property.
 */
export class NodeShapeWithLanguageInProperties {
  private _identifier: (rdfjs.BlankNode | rdfjs.NamedNode) | undefined;
  readonly languageInProperty: purify.Maybe<rdfjs.Literal>;
  /**
   * literal property for testing runtime languageIn
   */
  readonly literalProperty: purify.Maybe<rdfjs.Literal>;
  readonly type = "NodeShapeWithLanguageInProperties";

  constructor(parameters: {
    readonly identifier?: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly languageInProperty?:
      | rdfjs.Literal
      | Date
      | boolean
      | number
      | purify.Maybe<rdfjs.Literal>
      | string;
    readonly literalProperty?:
      | rdfjs.Literal
      | Date
      | boolean
      | number
      | purify.Maybe<rdfjs.Literal>
      | string;
  }) {
    this._identifier = parameters.identifier;
    if (purify.Maybe.isMaybe(parameters.languageInProperty)) {
      this.languageInProperty = parameters.languageInProperty;
    } else if (typeof parameters.languageInProperty === "boolean") {
      this.languageInProperty = purify.Maybe.of(
        rdfLiteral.toRdf(parameters.languageInProperty),
      );
    } else if (
      typeof parameters.languageInProperty === "object" &&
      parameters.languageInProperty instanceof Date
    ) {
      this.languageInProperty = purify.Maybe.of(
        rdfLiteral.toRdf(parameters.languageInProperty),
      );
    } else if (typeof parameters.languageInProperty === "number") {
      this.languageInProperty = purify.Maybe.of(
        rdfLiteral.toRdf(parameters.languageInProperty),
      );
    } else if (typeof parameters.languageInProperty === "string") {
      this.languageInProperty = purify.Maybe.of(
        dataFactory.literal(parameters.languageInProperty),
      );
    } else if (typeof parameters.languageInProperty === "object") {
      this.languageInProperty = purify.Maybe.of(parameters.languageInProperty);
    } else if (typeof parameters.languageInProperty === "undefined") {
      this.languageInProperty = purify.Maybe.empty();
    } else {
      this.languageInProperty = parameters.languageInProperty as never;
    }

    if (purify.Maybe.isMaybe(parameters.literalProperty)) {
      this.literalProperty = parameters.literalProperty;
    } else if (typeof parameters.literalProperty === "boolean") {
      this.literalProperty = purify.Maybe.of(
        rdfLiteral.toRdf(parameters.literalProperty),
      );
    } else if (
      typeof parameters.literalProperty === "object" &&
      parameters.literalProperty instanceof Date
    ) {
      this.literalProperty = purify.Maybe.of(
        rdfLiteral.toRdf(parameters.literalProperty),
      );
    } else if (typeof parameters.literalProperty === "number") {
      this.literalProperty = purify.Maybe.of(
        rdfLiteral.toRdf(parameters.literalProperty),
      );
    } else if (typeof parameters.literalProperty === "string") {
      this.literalProperty = purify.Maybe.of(
        dataFactory.literal(parameters.literalProperty),
      );
    } else if (typeof parameters.literalProperty === "object") {
      this.literalProperty = purify.Maybe.of(parameters.literalProperty);
    } else if (typeof parameters.literalProperty === "undefined") {
      this.literalProperty = purify.Maybe.empty();
    } else {
      this.literalProperty = parameters.literalProperty as never;
    }
  }

  get identifier(): rdfjs.BlankNode | rdfjs.NamedNode {
    if (typeof this._identifier === "undefined") {
      this._identifier = dataFactory.blankNode();
    }
    return this._identifier;
  }

  equals(
    other: NodeShapeWithLanguageInProperties,
  ): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.booleanEquals(
      this.identifier,
      other.identifier,
    )
      .mapLeft((propertyValuesUnequal) => ({
        left: this,
        right: other,
        propertyName: "identifier",
        propertyValuesUnequal,
        type: "Property" as const,
      }))
      .chain(() =>
        ((left, right) =>
          purifyHelpers.Maybes.equals(
            left,
            right,
            purifyHelpers.Equatable.booleanEquals,
          ))(this.languageInProperty, other.languageInProperty).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "languageInProperty",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      )
      .chain(() =>
        ((left, right) =>
          purifyHelpers.Maybes.equals(
            left,
            right,
            purifyHelpers.Equatable.booleanEquals,
          ))(this.literalProperty, other.literalProperty).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "literalProperty",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(this.type, other.type).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "type",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      );
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_hasher: HasherT): HasherT {
    this.languageInProperty.ifJust((_value0) => {
      _hasher.update(_value0.termType);
      _hasher.update(_value0.value);
    });
    this.literalProperty.ifJust((_value0) => {
      _hasher.update(_value0.termType);
      _hasher.update(_value0.value);
    });
    return _hasher;
  }

  toJson(): {
    readonly "@id": string;
    readonly languageInProperty:
      | {
          "@language": string | undefined;
          "@type": string | undefined;
          "@value": string;
        }
      | undefined;
    readonly literalProperty:
      | {
          "@language": string | undefined;
          "@type": string | undefined;
          "@value": string;
        }
      | undefined;
    readonly type: string;
  } {
    return JSON.parse(
      JSON.stringify({
        "@id": this.identifier.value,
        languageInProperty: this.languageInProperty
          .map((_item) => ({
            "@language": _item.language.length > 0 ? _item.language : undefined,
            "@type":
              _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string"
                ? _item.datatype.value
                : undefined,
            "@value": _item.value,
          }))
          .extract(),
        literalProperty: this.literalProperty
          .map((_item) => ({
            "@language": _item.language.length > 0 ? _item.language : undefined,
            "@type":
              _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string"
                ? _item.datatype.value
                : undefined,
            "@value": _item.value,
          }))
          .extract(),
        type: this.type,
      } satisfies ReturnType<NodeShapeWithLanguageInProperties["toJson"]>),
    );
  }

  toRdf({
    mutateGraph,
    resourceSet,
  }: {
    ignoreRdfType?: boolean;
    mutateGraph: rdfjsResource.MutableResource.MutateGraph;
    resourceSet: rdfjsResource.MutableResourceSet;
  }): rdfjsResource.MutableResource {
    const _resource = resourceSet.mutableResource({
      identifier: this.identifier,
      mutateGraph,
    });
    _resource.add(
      dataFactory.namedNode("http://example.com/languageInProperty"),
      this.languageInProperty,
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/literalProperty"),
      this.literalProperty,
    );
    return _resource;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace NodeShapeWithLanguageInProperties {
  export function fromRdf({
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
    NodeShapeWithLanguageInProperties
  > {
    const identifier = _resource.identifier;
    const _languageInPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<rdfjs.Literal>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode("http://example.com/languageInProperty"),
          { unique: true },
        )
        .filter((_value) => {
          const _languageInOrDefault = _languageIn ?? ["en", "fr"];
          if (_languageInOrDefault.length === 0) {
            return true;
          }
          const _valueLiteral = _value.toLiteral().toMaybe().extract();
          if (typeof _valueLiteral === "undefined") {
            return false;
          }
          return _languageInOrDefault.some(
            (_languageIn) => _languageIn === _valueLiteral.language,
          );
        })
        .head()
        .chain((_value) => _value.toLiteral())
        .toMaybe(),
    );
    if (_languageInPropertyEither.isLeft()) {
      return _languageInPropertyEither;
    }

    const languageInProperty = _languageInPropertyEither.unsafeCoerce();
    const _literalPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<rdfjs.Literal>
    > = purify.Either.of(
      _resource
        .values(dataFactory.namedNode("http://example.com/literalProperty"), {
          unique: true,
        })
        .filter((_value) => {
          const _languageInOrDefault = _languageIn ?? [];
          if (_languageInOrDefault.length === 0) {
            return true;
          }
          const _valueLiteral = _value.toLiteral().toMaybe().extract();
          if (typeof _valueLiteral === "undefined") {
            return false;
          }
          return _languageInOrDefault.some(
            (_languageIn) => _languageIn === _valueLiteral.language,
          );
        })
        .head()
        .chain((_value) => _value.toLiteral())
        .toMaybe(),
    );
    if (_literalPropertyEither.isLeft()) {
      return _literalPropertyEither;
    }

    const literalProperty = _literalPropertyEither.unsafeCoerce();
    return purify.Either.of(
      new NodeShapeWithLanguageInProperties({
        identifier,
        languageInProperty,
        literalProperty,
      }),
    );
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
            dataFactory.namedNode("http://example.com/languageInProperty"),
            this.variable("LanguageInProperty"),
          ),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.basic(
            this.subject,
            dataFactory.namedNode("http://example.com/literalProperty"),
            this.variable("LiteralProperty"),
          ),
        ),
      );
    }
  }
}
/**
 * Shape with sh:in properties.
 */
export class NodeShapeWithInProperties {
  private _identifier: (rdfjs.BlankNode | rdfjs.NamedNode) | undefined;
  readonly inBooleansProperty: purify.Maybe<true>;
  readonly inDateTimesProperty: purify.Maybe<Date>;
  readonly inIrisProperty: purify.Maybe<
    rdfjs.NamedNode<
      | "http://example.com/NodeShapeWithInPropertiesIri1"
      | "http://example.com/NodeShapeWithInPropertiesIri2"
    >
  >;
  readonly inNumbersProperty: purify.Maybe<1 | 2>;
  readonly inStringsProperty: purify.Maybe<"text" | "html">;
  readonly type = "NodeShapeWithInProperties";

  constructor(parameters: {
    readonly identifier?: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly inBooleansProperty?: purify.Maybe<true> | true;
    readonly inDateTimesProperty?: Date | purify.Maybe<Date>;
    readonly inIrisProperty?:
      | purify.Maybe<
          rdfjs.NamedNode<
            | "http://example.com/NodeShapeWithInPropertiesIri1"
            | "http://example.com/NodeShapeWithInPropertiesIri2"
          >
        >
      | rdfjs.NamedNode<
          | "http://example.com/NodeShapeWithInPropertiesIri1"
          | "http://example.com/NodeShapeWithInPropertiesIri2"
        >;
    readonly inNumbersProperty?: 1 | 2 | purify.Maybe<1 | 2>;
    readonly inStringsProperty?:
      | "text"
      | "html"
      | purify.Maybe<"text" | "html">;
  }) {
    this._identifier = parameters.identifier;
    if (purify.Maybe.isMaybe(parameters.inBooleansProperty)) {
      this.inBooleansProperty = parameters.inBooleansProperty;
    } else if (typeof parameters.inBooleansProperty === "boolean") {
      this.inBooleansProperty = purify.Maybe.of(parameters.inBooleansProperty);
    } else if (typeof parameters.inBooleansProperty === "undefined") {
      this.inBooleansProperty = purify.Maybe.empty();
    } else {
      this.inBooleansProperty = parameters.inBooleansProperty as never;
    }

    if (purify.Maybe.isMaybe(parameters.inDateTimesProperty)) {
      this.inDateTimesProperty = parameters.inDateTimesProperty;
    } else if (
      typeof parameters.inDateTimesProperty === "object" &&
      parameters.inDateTimesProperty instanceof Date
    ) {
      this.inDateTimesProperty = purify.Maybe.of(
        parameters.inDateTimesProperty,
      );
    } else if (typeof parameters.inDateTimesProperty === "undefined") {
      this.inDateTimesProperty = purify.Maybe.empty();
    } else {
      this.inDateTimesProperty = parameters.inDateTimesProperty as never;
    }

    if (purify.Maybe.isMaybe(parameters.inIrisProperty)) {
      this.inIrisProperty = parameters.inIrisProperty;
    } else if (typeof parameters.inIrisProperty === "object") {
      this.inIrisProperty = purify.Maybe.of(parameters.inIrisProperty);
    } else if (typeof parameters.inIrisProperty === "undefined") {
      this.inIrisProperty = purify.Maybe.empty();
    } else {
      this.inIrisProperty = parameters.inIrisProperty as never;
    }

    if (purify.Maybe.isMaybe(parameters.inNumbersProperty)) {
      this.inNumbersProperty = parameters.inNumbersProperty;
    } else if (typeof parameters.inNumbersProperty === "number") {
      this.inNumbersProperty = purify.Maybe.of(parameters.inNumbersProperty);
    } else if (typeof parameters.inNumbersProperty === "undefined") {
      this.inNumbersProperty = purify.Maybe.empty();
    } else {
      this.inNumbersProperty = parameters.inNumbersProperty as never;
    }

    if (purify.Maybe.isMaybe(parameters.inStringsProperty)) {
      this.inStringsProperty = parameters.inStringsProperty;
    } else if (typeof parameters.inStringsProperty === "string") {
      this.inStringsProperty = purify.Maybe.of(parameters.inStringsProperty);
    } else if (typeof parameters.inStringsProperty === "undefined") {
      this.inStringsProperty = purify.Maybe.empty();
    } else {
      this.inStringsProperty = parameters.inStringsProperty as never;
    }
  }

  get identifier(): rdfjs.BlankNode | rdfjs.NamedNode {
    return typeof this._identifier !== "undefined"
      ? this._identifier
      : dataFactory.blankNode();
  }

  equals(
    other: NodeShapeWithInProperties,
  ): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.booleanEquals(
      this.identifier,
      other.identifier,
    )
      .mapLeft((propertyValuesUnequal) => ({
        left: this,
        right: other,
        propertyName: "identifier",
        propertyValuesUnequal,
        type: "Property" as const,
      }))
      .chain(() =>
        purifyHelpers.Equatable.booleanEquals(
          this.inBooleansProperty,
          other.inBooleansProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "inBooleansProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        ((left, right) =>
          purifyHelpers.Maybes.equals(left, right, (left, right) =>
            purifyHelpers.Equatable.EqualsResult.fromBooleanEqualsResult(
              left,
              right,
              left.getTime() === right.getTime(),
            ),
          ))(this.inDateTimesProperty, other.inDateTimesProperty).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "inDateTimesProperty",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      )
      .chain(() =>
        ((left, right) =>
          purifyHelpers.Maybes.equals(
            left,
            right,
            purifyHelpers.Equatable.booleanEquals,
          ))(this.inIrisProperty, other.inIrisProperty).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "inIrisProperty",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      )
      .chain(() =>
        purifyHelpers.Equatable.booleanEquals(
          this.inNumbersProperty,
          other.inNumbersProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "inNumbersProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.booleanEquals(
          this.inStringsProperty,
          other.inStringsProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "inStringsProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(this.type, other.type).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "type",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      );
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_hasher: HasherT): HasherT {
    this.inBooleansProperty.ifJust((_value0) => {
      _hasher.update(_value0.toString());
    });
    this.inDateTimesProperty.ifJust((_value0) => {
      _hasher.update(_value0.toISOString());
    });
    this.inIrisProperty.ifJust((_value0) => {
      _hasher.update(_value0.termType);
      _hasher.update(_value0.value);
    });
    this.inNumbersProperty.ifJust((_value0) => {
      _hasher.update(_value0.toString());
    });
    this.inStringsProperty.ifJust((_value0) => {
      _hasher.update(_value0);
    });
    return _hasher;
  }

  toJson(): {
    readonly "@id": string;
    readonly inBooleansProperty: boolean | undefined;
    readonly inDateTimesProperty: string | undefined;
    readonly inIrisProperty: { "@id": string } | undefined;
    readonly inNumbersProperty: number | undefined;
    readonly inStringsProperty: string | undefined;
    readonly type: string;
  } {
    return JSON.parse(
      JSON.stringify({
        "@id": this.identifier.value,
        inBooleansProperty: this.inBooleansProperty
          .map((_item) => _item)
          .extract(),
        inDateTimesProperty: this.inDateTimesProperty
          .map((_item) => _item.toISOString())
          .extract(),
        inIrisProperty: this.inIrisProperty
          .map((_item) => ({ "@id": _item.value }))
          .extract(),
        inNumbersProperty: this.inNumbersProperty
          .map((_item) => _item)
          .extract(),
        inStringsProperty: this.inStringsProperty
          .map((_item) => _item)
          .extract(),
        type: this.type,
      } satisfies ReturnType<NodeShapeWithInProperties["toJson"]>),
    );
  }

  toRdf({
    mutateGraph,
    resourceSet,
  }: {
    ignoreRdfType?: boolean;
    mutateGraph: rdfjsResource.MutableResource.MutateGraph;
    resourceSet: rdfjsResource.MutableResourceSet;
  }): rdfjsResource.MutableResource {
    const _resource = resourceSet.mutableResource({
      identifier: this.identifier,
      mutateGraph,
    });
    _resource.add(
      dataFactory.namedNode("http://example.com/inBooleansProperty"),
      this.inBooleansProperty,
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/inDateTimesProperty"),
      this.inDateTimesProperty,
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/inIrisProperty"),
      this.inIrisProperty,
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/inNumbersProperty"),
      this.inNumbersProperty,
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/inStringsProperty"),
      this.inStringsProperty,
    );
    return _resource;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace NodeShapeWithInProperties {
  export function fromRdf({
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
    NodeShapeWithInProperties
  > {
    const identifier = _resource.identifier;
    const _inBooleansPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<true>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode("http://example.com/inBooleansProperty"),
          { unique: true },
        )
        .head()
        .chain((_value) =>
          _value
            .toBoolean()
            .chain((value) =>
              value === true
                ? purify.Either.of(value)
                : purify.Left(
                    new rdfjsResource.Resource.MistypedValueError({
                      actualValue: rdfLiteral.toRdf(value),
                      expectedValueType: "true",
                      focusResource: _resource,
                      predicate: dataFactory.namedNode(
                        "http://example.com/inBooleansProperty",
                      ),
                    }),
                  ),
            ),
        )
        .toMaybe(),
    );
    if (_inBooleansPropertyEither.isLeft()) {
      return _inBooleansPropertyEither;
    }

    const inBooleansProperty = _inBooleansPropertyEither.unsafeCoerce();
    const _inDateTimesPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<Date>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode("http://example.com/inDateTimesProperty"),
          { unique: true },
        )
        .head()
        .chain((_value) =>
          _value.toDate().chain((value) => {
            if (value.getTime() === 1523268000000) {
              return purify.Either.of(value);
            }
            return purify.Left(
              new rdfjsResource.Resource.MistypedValueError({
                actualValue: rdfLiteral.toRdf(value),
                expectedValueType: "Date",
                focusResource: _resource,
                predicate: dataFactory.namedNode(
                  "http://example.com/inDateTimesProperty",
                ),
              }),
            );
          }),
        )
        .toMaybe(),
    );
    if (_inDateTimesPropertyEither.isLeft()) {
      return _inDateTimesPropertyEither;
    }

    const inDateTimesProperty = _inDateTimesPropertyEither.unsafeCoerce();
    const _inIrisPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<
        rdfjs.NamedNode<
          | "http://example.com/NodeShapeWithInPropertiesIri1"
          | "http://example.com/NodeShapeWithInPropertiesIri2"
        >
      >
    > = purify.Either.of(
      _resource
        .values(dataFactory.namedNode("http://example.com/inIrisProperty"), {
          unique: true,
        })
        .head()
        .chain((_value) =>
          _value.toIri().chain((iri) => {
            switch (iri.value) {
              case "http://example.com/NodeShapeWithInPropertiesIri1":
                return purify.Either.of<
                  rdfjsResource.Resource.ValueError,
                  rdfjs.NamedNode<
                    | "http://example.com/NodeShapeWithInPropertiesIri1"
                    | "http://example.com/NodeShapeWithInPropertiesIri2"
                  >
                >(
                  iri as rdfjs.NamedNode<"http://example.com/NodeShapeWithInPropertiesIri1">,
                );
              case "http://example.com/NodeShapeWithInPropertiesIri2":
                return purify.Either.of<
                  rdfjsResource.Resource.ValueError,
                  rdfjs.NamedNode<
                    | "http://example.com/NodeShapeWithInPropertiesIri1"
                    | "http://example.com/NodeShapeWithInPropertiesIri2"
                  >
                >(
                  iri as rdfjs.NamedNode<"http://example.com/NodeShapeWithInPropertiesIri2">,
                );
              default:
                return purify.Left(
                  new rdfjsResource.Resource.MistypedValueError({
                    actualValue: iri,
                    expectedValueType:
                      'rdfjs.NamedNode<"http://example.com/NodeShapeWithInPropertiesIri1" | "http://example.com/NodeShapeWithInPropertiesIri2">',
                    focusResource: _resource,
                    predicate: dataFactory.namedNode(
                      "http://example.com/inIrisProperty",
                    ),
                  }),
                );
            }
          }),
        )
        .toMaybe(),
    );
    if (_inIrisPropertyEither.isLeft()) {
      return _inIrisPropertyEither;
    }

    const inIrisProperty = _inIrisPropertyEither.unsafeCoerce();
    const _inNumbersPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<1 | 2>
    > = purify.Either.of(
      _resource
        .values(dataFactory.namedNode("http://example.com/inNumbersProperty"), {
          unique: true,
        })
        .head()
        .chain((_value) =>
          _value.toNumber().chain((value) => {
            switch (value) {
              case 1:
              case 2:
                return purify.Either.of(value);
              default:
                return purify.Left(
                  new rdfjsResource.Resource.MistypedValueError({
                    actualValue: rdfLiteral.toRdf(value),
                    expectedValueType: "1 | 2",
                    focusResource: _resource,
                    predicate: dataFactory.namedNode(
                      "http://example.com/inNumbersProperty",
                    ),
                  }),
                );
            }
          }),
        )
        .toMaybe(),
    );
    if (_inNumbersPropertyEither.isLeft()) {
      return _inNumbersPropertyEither;
    }

    const inNumbersProperty = _inNumbersPropertyEither.unsafeCoerce();
    const _inStringsPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<"text" | "html">
    > = purify.Either.of(
      _resource
        .values(dataFactory.namedNode("http://example.com/inStringsProperty"), {
          unique: true,
        })
        .head()
        .chain((_value) =>
          _value.toString().chain((value) => {
            switch (value) {
              case "text":
              case "html":
                return purify.Either.of(value);
              default:
                return purify.Left(
                  new rdfjsResource.Resource.MistypedValueError({
                    actualValue: rdfLiteral.toRdf(value),
                    expectedValueType: '"text" | "html"',
                    focusResource: _resource,
                    predicate: dataFactory.namedNode(
                      "http://example.com/inStringsProperty",
                    ),
                  }),
                );
            }
          }),
        )
        .toMaybe(),
    );
    if (_inStringsPropertyEither.isLeft()) {
      return _inStringsPropertyEither;
    }

    const inStringsProperty = _inStringsPropertyEither.unsafeCoerce();
    return purify.Either.of(
      new NodeShapeWithInProperties({
        identifier,
        inBooleansProperty,
        inDateTimesProperty,
        inIrisProperty,
        inNumbersProperty,
        inStringsProperty,
      }),
    );
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
            dataFactory.namedNode("http://example.com/inBooleansProperty"),
            this.variable("InBooleansProperty"),
          ),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.basic(
            this.subject,
            dataFactory.namedNode("http://example.com/inDateTimesProperty"),
            this.variable("InDateTimesProperty"),
          ),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.basic(
            this.subject,
            dataFactory.namedNode("http://example.com/inIrisProperty"),
            this.variable("InIrisProperty"),
          ),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.basic(
            this.subject,
            dataFactory.namedNode("http://example.com/inNumbersProperty"),
            this.variable("InNumbersProperty"),
          ),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.basic(
            this.subject,
            dataFactory.namedNode("http://example.com/inStringsProperty"),
            this.variable("InStringsProperty"),
          ),
        ),
      );
    }
  }
}
/**
 * Shape with sh:hasValue properties.
 */
export class NodeShapeWithHasValueProperties {
  readonly hasIriProperty: purify.Maybe<rdfjs.NamedNode>;
  readonly hasLiteralProperty: purify.Maybe<string>;
  private _identifier: (rdfjs.BlankNode | rdfjs.NamedNode) | undefined;
  readonly type = "NodeShapeWithHasValueProperties";

  constructor(parameters: {
    readonly hasIriProperty?: rdfjs.NamedNode | purify.Maybe<rdfjs.NamedNode>;
    readonly hasLiteralProperty?: purify.Maybe<string> | string;
    readonly identifier?: rdfjs.BlankNode | rdfjs.NamedNode;
  }) {
    if (purify.Maybe.isMaybe(parameters.hasIriProperty)) {
      this.hasIriProperty = parameters.hasIriProperty;
    } else if (typeof parameters.hasIriProperty === "object") {
      this.hasIriProperty = purify.Maybe.of(parameters.hasIriProperty);
    } else if (typeof parameters.hasIriProperty === "undefined") {
      this.hasIriProperty = purify.Maybe.empty();
    } else {
      this.hasIriProperty = parameters.hasIriProperty as never;
    }

    if (purify.Maybe.isMaybe(parameters.hasLiteralProperty)) {
      this.hasLiteralProperty = parameters.hasLiteralProperty;
    } else if (typeof parameters.hasLiteralProperty === "string") {
      this.hasLiteralProperty = purify.Maybe.of(parameters.hasLiteralProperty);
    } else if (typeof parameters.hasLiteralProperty === "undefined") {
      this.hasLiteralProperty = purify.Maybe.empty();
    } else {
      this.hasLiteralProperty = parameters.hasLiteralProperty as never;
    }

    this._identifier = parameters.identifier;
  }

  get identifier(): rdfjs.BlankNode | rdfjs.NamedNode {
    if (typeof this._identifier === "undefined") {
      this._identifier = dataFactory.blankNode();
    }
    return this._identifier;
  }

  equals(
    other: NodeShapeWithHasValueProperties,
  ): purifyHelpers.Equatable.EqualsResult {
    return ((left, right) =>
      purifyHelpers.Maybes.equals(
        left,
        right,
        purifyHelpers.Equatable.booleanEquals,
      ))(this.hasIriProperty, other.hasIriProperty)
      .mapLeft((propertyValuesUnequal) => ({
        left: this,
        right: other,
        propertyName: "hasIriProperty",
        propertyValuesUnequal,
        type: "Property" as const,
      }))
      .chain(() =>
        purifyHelpers.Equatable.booleanEquals(
          this.hasLiteralProperty,
          other.hasLiteralProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "hasLiteralProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.booleanEquals(
          this.identifier,
          other.identifier,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "identifier",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(this.type, other.type).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "type",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      );
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_hasher: HasherT): HasherT {
    this.hasIriProperty.ifJust((_value0) => {
      _hasher.update(_value0.termType);
      _hasher.update(_value0.value);
    });
    this.hasLiteralProperty.ifJust((_value0) => {
      _hasher.update(_value0);
    });
    return _hasher;
  }

  toJson(): {
    readonly hasIriProperty: { "@id": string } | undefined;
    readonly hasLiteralProperty: string | undefined;
    readonly "@id": string;
    readonly type: string;
  } {
    return JSON.parse(
      JSON.stringify({
        hasIriProperty: this.hasIriProperty
          .map((_item) => ({ "@id": _item.value }))
          .extract(),
        hasLiteralProperty: this.hasLiteralProperty
          .map((_item) => _item)
          .extract(),
        "@id": this.identifier.value,
        type: this.type,
      } satisfies ReturnType<NodeShapeWithHasValueProperties["toJson"]>),
    );
  }

  toRdf({
    mutateGraph,
    resourceSet,
  }: {
    ignoreRdfType?: boolean;
    mutateGraph: rdfjsResource.MutableResource.MutateGraph;
    resourceSet: rdfjsResource.MutableResourceSet;
  }): rdfjsResource.MutableResource {
    const _resource = resourceSet.mutableResource({
      identifier: this.identifier,
      mutateGraph,
    });
    _resource.add(
      dataFactory.namedNode("http://example.com/hasIriProperty"),
      this.hasIriProperty,
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/hasLiteralProperty"),
      this.hasLiteralProperty,
    );
    return _resource;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace NodeShapeWithHasValueProperties {
  export function fromRdf({
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
    NodeShapeWithHasValueProperties
  > {
    const _hasIriPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<rdfjs.NamedNode>
    > = purify.Either.of(
      _resource
        .values(dataFactory.namedNode("http://example.com/hasIriProperty"), {
          unique: true,
        })
        .find((_value) =>
          _value
            .toTerm()
            .equals(
              dataFactory.namedNode(
                "http://example.com/NodeShapeWithHasValuePropertiesIri1",
              ),
            ),
        )
        .chain((_value) => _value.toIri())
        .toMaybe(),
    );
    if (_hasIriPropertyEither.isLeft()) {
      return _hasIriPropertyEither;
    }

    const hasIriProperty = _hasIriPropertyEither.unsafeCoerce();
    const _hasLiteralPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<string>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode("http://example.com/hasLiteralProperty"),
          { unique: true },
        )
        .find((_value) =>
          _value.toTerm().equals(dataFactory.literal("test", "")),
        )
        .chain((_value) => _value.toString())
        .toMaybe(),
    );
    if (_hasLiteralPropertyEither.isLeft()) {
      return _hasLiteralPropertyEither;
    }

    const hasLiteralProperty = _hasLiteralPropertyEither.unsafeCoerce();
    const identifier = _resource.identifier;
    return purify.Either.of(
      new NodeShapeWithHasValueProperties({
        hasIriProperty,
        hasLiteralProperty,
        identifier,
      }),
    );
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
            dataFactory.namedNode("http://example.com/hasIriProperty"),
            this.variable("HasIriProperty"),
          ),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.basic(
            this.subject,
            dataFactory.namedNode("http://example.com/hasLiteralProperty"),
            this.variable("HasLiteralProperty"),
          ),
        ),
      );
    }
  }
}
export class InlineNodeShape {
  private _identifier: (rdfjs.BlankNode | rdfjs.NamedNode) | undefined;
  readonly stringProperty: string;
  readonly type = "InlineNodeShape";

  constructor(parameters: {
    readonly identifier?: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly stringProperty: string;
  }) {
    this._identifier = parameters.identifier;
    this.stringProperty = parameters.stringProperty;
  }

  get identifier(): rdfjs.BlankNode | rdfjs.NamedNode {
    if (typeof this._identifier === "undefined") {
      this._identifier = dataFactory.blankNode();
    }
    return this._identifier;
  }

  equals(other: InlineNodeShape): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.booleanEquals(
      this.identifier,
      other.identifier,
    )
      .mapLeft((propertyValuesUnequal) => ({
        left: this,
        right: other,
        propertyName: "identifier",
        propertyValuesUnequal,
        type: "Property" as const,
      }))
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(
          this.stringProperty,
          other.stringProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "stringProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(this.type, other.type).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "type",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      );
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_hasher: HasherT): HasherT {
    _hasher.update(this.stringProperty);
    return _hasher;
  }

  toJson(): {
    readonly "@id": string;
    readonly stringProperty: string;
    readonly type: string;
  } {
    return JSON.parse(
      JSON.stringify({
        "@id": this.identifier.value,
        stringProperty: this.stringProperty,
        type: this.type,
      } satisfies ReturnType<InlineNodeShape["toJson"]>),
    );
  }

  toRdf({
    mutateGraph,
    resourceSet,
  }: {
    ignoreRdfType?: boolean;
    mutateGraph: rdfjsResource.MutableResource.MutateGraph;
    resourceSet: rdfjsResource.MutableResourceSet;
  }): rdfjsResource.MutableResource {
    const _resource = resourceSet.mutableResource({
      identifier: this.identifier,
      mutateGraph,
    });
    _resource.add(
      dataFactory.namedNode("http://example.com/stringProperty"),
      this.stringProperty,
    );
    return _resource;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace InlineNodeShape {
  export function fromRdf({
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
  }): purify.Either<rdfjsResource.Resource.ValueError, InlineNodeShape> {
    const identifier = _resource.identifier;
    const _stringPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      string
    > = _resource
      .values(dataFactory.namedNode("http://example.com/stringProperty"), {
        unique: true,
      })
      .head()
      .chain((_value) => _value.toString());
    if (_stringPropertyEither.isLeft()) {
      return _stringPropertyEither;
    }

    const stringProperty = _stringPropertyEither.unsafeCoerce();
    return purify.Either.of(
      new InlineNodeShape({ identifier, stringProperty }),
    );
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
          dataFactory.namedNode("http://example.com/stringProperty"),
          this.variable("StringProperty"),
        ),
      );
    }
  }
}
export class ExternNodeShape {
  private _identifier: (rdfjs.BlankNode | rdfjs.NamedNode) | undefined;
  readonly stringProperty: string;
  readonly type = "ExternNodeShape";

  constructor(parameters: {
    readonly identifier?: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly stringProperty: string;
  }) {
    this._identifier = parameters.identifier;
    this.stringProperty = parameters.stringProperty;
  }

  get identifier(): rdfjs.BlankNode | rdfjs.NamedNode {
    if (typeof this._identifier === "undefined") {
      this._identifier = dataFactory.blankNode();
    }
    return this._identifier;
  }

  equals(other: ExternNodeShape): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.booleanEquals(
      this.identifier,
      other.identifier,
    )
      .mapLeft((propertyValuesUnequal) => ({
        left: this,
        right: other,
        propertyName: "identifier",
        propertyValuesUnequal,
        type: "Property" as const,
      }))
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(
          this.stringProperty,
          other.stringProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "stringProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(this.type, other.type).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "type",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      );
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_hasher: HasherT): HasherT {
    _hasher.update(this.stringProperty);
    return _hasher;
  }

  toJson(): {
    readonly "@id": string;
    readonly stringProperty: string;
    readonly type: string;
  } {
    return JSON.parse(
      JSON.stringify({
        "@id": this.identifier.value,
        stringProperty: this.stringProperty,
        type: this.type,
      } satisfies ReturnType<ExternNodeShape["toJson"]>),
    );
  }

  toRdf({
    mutateGraph,
    resourceSet,
  }: {
    ignoreRdfType?: boolean;
    mutateGraph: rdfjsResource.MutableResource.MutateGraph;
    resourceSet: rdfjsResource.MutableResourceSet;
  }): rdfjsResource.MutableResource {
    const _resource = resourceSet.mutableResource({
      identifier: this.identifier,
      mutateGraph,
    });
    _resource.add(
      dataFactory.namedNode("http://example.com/stringProperty"),
      this.stringProperty,
    );
    return _resource;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace ExternNodeShape {
  export function fromRdf({
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
  }): purify.Either<rdfjsResource.Resource.ValueError, ExternNodeShape> {
    const identifier = _resource.identifier;
    const _stringPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      string
    > = _resource
      .values(dataFactory.namedNode("http://example.com/stringProperty"), {
        unique: true,
      })
      .head()
      .chain((_value) => _value.toString());
    if (_stringPropertyEither.isLeft()) {
      return _stringPropertyEither;
    }

    const stringProperty = _stringPropertyEither.unsafeCoerce();
    return purify.Either.of(
      new ExternNodeShape({ identifier, stringProperty }),
    );
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
          dataFactory.namedNode("http://example.com/stringProperty"),
          this.variable("StringProperty"),
        ),
      );
    }
  }
}
/**
 * Node shape that inlines/nests another node shape and externs/references another.
 */
export class NodeShapeWithExternProperties {
  readonly externObjectTypeProperty: purify.Maybe<ExternObjectType>;
  readonly externProperty: purify.Maybe<rdfjs.BlankNode | rdfjs.NamedNode>;
  private _identifier: (rdfjs.BlankNode | rdfjs.NamedNode) | undefined;
  readonly inlineProperty: purify.Maybe<InlineNodeShape>;
  readonly type = "NodeShapeWithExternProperties";

  constructor(parameters: {
    readonly externObjectTypeProperty?:
      | ExternObjectType
      | purify.Maybe<ExternObjectType>;
    readonly externProperty?:
      | (rdfjs.BlankNode | rdfjs.NamedNode)
      | purify.Maybe<rdfjs.BlankNode | rdfjs.NamedNode>;
    readonly identifier?: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly inlineProperty?: InlineNodeShape | purify.Maybe<InlineNodeShape>;
  }) {
    if (purify.Maybe.isMaybe(parameters.externObjectTypeProperty)) {
      this.externObjectTypeProperty = parameters.externObjectTypeProperty;
    } else if (
      typeof parameters.externObjectTypeProperty === "object" &&
      parameters.externObjectTypeProperty instanceof ExternObjectType
    ) {
      this.externObjectTypeProperty = purify.Maybe.of(
        parameters.externObjectTypeProperty,
      );
    } else if (typeof parameters.externObjectTypeProperty === "undefined") {
      this.externObjectTypeProperty = purify.Maybe.empty();
    } else {
      this.externObjectTypeProperty =
        parameters.externObjectTypeProperty as never;
    }

    if (purify.Maybe.isMaybe(parameters.externProperty)) {
      this.externProperty = parameters.externProperty;
    } else if (typeof parameters.externProperty === "object") {
      this.externProperty = purify.Maybe.of(parameters.externProperty);
    } else if (typeof parameters.externProperty === "undefined") {
      this.externProperty = purify.Maybe.empty();
    } else {
      this.externProperty = parameters.externProperty as never;
    }

    this._identifier = parameters.identifier;
    if (purify.Maybe.isMaybe(parameters.inlineProperty)) {
      this.inlineProperty = parameters.inlineProperty;
    } else if (
      typeof parameters.inlineProperty === "object" &&
      parameters.inlineProperty instanceof InlineNodeShape
    ) {
      this.inlineProperty = purify.Maybe.of(parameters.inlineProperty);
    } else if (typeof parameters.inlineProperty === "undefined") {
      this.inlineProperty = purify.Maybe.empty();
    } else {
      this.inlineProperty = parameters.inlineProperty as never;
    }
  }

  get identifier(): rdfjs.BlankNode | rdfjs.NamedNode {
    if (typeof this._identifier === "undefined") {
      this._identifier = dataFactory.blankNode();
    }
    return this._identifier;
  }

  equals(
    other: NodeShapeWithExternProperties,
  ): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.maybeEquals(
      this.externObjectTypeProperty,
      other.externObjectTypeProperty,
    )
      .mapLeft((propertyValuesUnequal) => ({
        left: this,
        right: other,
        propertyName: "externObjectTypeProperty",
        propertyValuesUnequal,
        type: "Property" as const,
      }))
      .chain(() =>
        ((left, right) =>
          purifyHelpers.Maybes.equals(
            left,
            right,
            purifyHelpers.Equatable.booleanEquals,
          ))(this.externProperty, other.externProperty).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "externProperty",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      )
      .chain(() =>
        purifyHelpers.Equatable.booleanEquals(
          this.identifier,
          other.identifier,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "identifier",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.maybeEquals(
          this.inlineProperty,
          other.inlineProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "inlineProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(this.type, other.type).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "type",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      );
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_hasher: HasherT): HasherT {
    this.externObjectTypeProperty.ifJust((_value0) => {
      _value0.hash(_hasher);
    });
    this.externProperty.ifJust((_value0) => {
      _hasher.update(_value0.termType);
      _hasher.update(_value0.value);
    });
    this.inlineProperty.ifJust((_value0) => {
      _value0.hash(_hasher);
    });
    return _hasher;
  }

  toJson(): {
    readonly externObjectTypeProperty:
      | ReturnType<ExternObjectType["toJson"]>
      | undefined;
    readonly externProperty: { "@id": string } | undefined;
    readonly "@id": string;
    readonly inlineProperty: ReturnType<InlineNodeShape["toJson"]> | undefined;
    readonly type: string;
  } {
    return JSON.parse(
      JSON.stringify({
        externObjectTypeProperty: this.externObjectTypeProperty
          .map((_item) => _item.toJson())
          .extract(),
        externProperty: this.externProperty
          .map((_item) => ({ "@id": _item.value }))
          .extract(),
        "@id": this.identifier.value,
        inlineProperty: this.inlineProperty
          .map((_item) => _item.toJson())
          .extract(),
        type: this.type,
      } satisfies ReturnType<NodeShapeWithExternProperties["toJson"]>),
    );
  }

  toRdf({
    mutateGraph,
    resourceSet,
  }: {
    ignoreRdfType?: boolean;
    mutateGraph: rdfjsResource.MutableResource.MutateGraph;
    resourceSet: rdfjsResource.MutableResourceSet;
  }): rdfjsResource.MutableResource {
    const _resource = resourceSet.mutableResource({
      identifier: this.identifier,
      mutateGraph,
    });
    _resource.add(
      dataFactory.namedNode("http://example.com/externObjectTypeProperty"),
      this.externObjectTypeProperty.map((_value) =>
        _value.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet }),
      ),
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/externProperty"),
      this.externProperty,
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/inlineProperty"),
      this.inlineProperty.map((_value) =>
        _value.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet }),
      ),
    );
    return _resource;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace NodeShapeWithExternProperties {
  export function fromRdf({
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
    NodeShapeWithExternProperties
  > {
    const _externObjectTypePropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<ExternObjectType>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode("http://example.com/externObjectTypeProperty"),
          { unique: true },
        )
        .head()
        .chain((value) => value.toResource())
        .chain((_resource) =>
          ExternObjectType.fromRdf({
            ..._context,
            ignoreRdfType: true,
            languageIn: _languageIn,
            resource: _resource,
          }),
        )
        .toMaybe(),
    );
    if (_externObjectTypePropertyEither.isLeft()) {
      return _externObjectTypePropertyEither;
    }

    const externObjectTypeProperty =
      _externObjectTypePropertyEither.unsafeCoerce();
    const _externPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<rdfjs.BlankNode | rdfjs.NamedNode>
    > = purify.Either.of(
      _resource
        .values(dataFactory.namedNode("http://example.com/externProperty"), {
          unique: true,
        })
        .head()
        .chain((_value) => _value.toIdentifier())
        .toMaybe(),
    );
    if (_externPropertyEither.isLeft()) {
      return _externPropertyEither;
    }

    const externProperty = _externPropertyEither.unsafeCoerce();
    const identifier = _resource.identifier;
    const _inlinePropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<InlineNodeShape>
    > = purify.Either.of(
      _resource
        .values(dataFactory.namedNode("http://example.com/inlineProperty"), {
          unique: true,
        })
        .head()
        .chain((value) => value.toResource())
        .chain((_resource) =>
          InlineNodeShape.fromRdf({
            ..._context,
            ignoreRdfType: true,
            languageIn: _languageIn,
            resource: _resource,
          }),
        )
        .toMaybe(),
    );
    if (_inlinePropertyEither.isLeft()) {
      return _inlinePropertyEither;
    }

    const inlineProperty = _inlinePropertyEither.unsafeCoerce();
    return purify.Either.of(
      new NodeShapeWithExternProperties({
        externObjectTypeProperty,
        externProperty,
        identifier,
        inlineProperty,
      }),
    );
  }

  export class SparqlGraphPatterns extends sparqlBuilder.ResourceGraphPatterns {
    constructor(
      subject: sparqlBuilder.ResourceGraphPatterns.SubjectParameter,
      _options?: { ignoreRdfType?: boolean },
    ) {
      super(subject);
      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.group(
            sparqlBuilder.GraphPattern.basic(
              this.subject,
              dataFactory.namedNode(
                "http://example.com/externObjectTypeProperty",
              ),
              this.variable("ExternObjectTypeProperty"),
            ).chainObject(
              (_object) =>
                new ExternObjectType.SparqlGraphPatterns(_object, {
                  ignoreRdfType: true,
                }),
            ),
          ),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.basic(
            this.subject,
            dataFactory.namedNode("http://example.com/externProperty"),
            this.variable("ExternProperty"),
          ),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.group(
            sparqlBuilder.GraphPattern.basic(
              this.subject,
              dataFactory.namedNode("http://example.com/inlineProperty"),
              this.variable("InlineProperty"),
            ).chainObject(
              (_object) =>
                new InlineNodeShape.SparqlGraphPatterns(_object, {
                  ignoreRdfType: true,
                }),
            ),
          ),
        ),
      );
    }
  }
}
/**
 * Shape with custom rdf:type's.
 *
 * The shaclmate:fromRdfType is expected on deserialization.
 * shaclmate:toRdfType's are added an serialization.
 */
export class NodeShapeWithExplicitRdfTypes {
  private _identifier: (rdfjs.BlankNode | rdfjs.NamedNode) | undefined;
  readonly stringProperty: string;
  readonly type = "NodeShapeWithExplicitRdfTypes";

  constructor(parameters: {
    readonly identifier?: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly stringProperty: string;
  }) {
    this._identifier = parameters.identifier;
    this.stringProperty = parameters.stringProperty;
  }

  get identifier(): rdfjs.BlankNode | rdfjs.NamedNode {
    if (typeof this._identifier === "undefined") {
      this._identifier = dataFactory.blankNode();
    }
    return this._identifier;
  }

  equals(
    other: NodeShapeWithExplicitRdfTypes,
  ): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.booleanEquals(
      this.identifier,
      other.identifier,
    )
      .mapLeft((propertyValuesUnequal) => ({
        left: this,
        right: other,
        propertyName: "identifier",
        propertyValuesUnequal,
        type: "Property" as const,
      }))
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(
          this.stringProperty,
          other.stringProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "stringProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(this.type, other.type).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "type",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      );
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_hasher: HasherT): HasherT {
    _hasher.update(this.stringProperty);
    return _hasher;
  }

  toJson(): {
    readonly "@id": string;
    readonly stringProperty: string;
    readonly type: string;
  } {
    return JSON.parse(
      JSON.stringify({
        "@id": this.identifier.value,
        stringProperty: this.stringProperty,
        type: this.type,
      } satisfies ReturnType<NodeShapeWithExplicitRdfTypes["toJson"]>),
    );
  }

  toRdf({
    ignoreRdfType,
    mutateGraph,
    resourceSet,
  }: {
    ignoreRdfType?: boolean;
    mutateGraph: rdfjsResource.MutableResource.MutateGraph;
    resourceSet: rdfjsResource.MutableResourceSet;
  }): rdfjsResource.MutableResource {
    const _resource = resourceSet.mutableResource({
      identifier: this.identifier,
      mutateGraph,
    });
    if (!ignoreRdfType) {
      _resource.add(
        _resource.dataFactory.namedNode(
          "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
        ),
        _resource.dataFactory.namedNode("http://example.com/ToRdfType"),
      );
      _resource.add(
        _resource.dataFactory.namedNode(
          "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
        ),
        _resource.dataFactory.namedNode("http://example.com/FromRdfType"),
      );
    }

    _resource.add(
      dataFactory.namedNode("http://example.com/stringProperty"),
      this.stringProperty,
    );
    return _resource;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace NodeShapeWithExplicitRdfTypes {
  export function fromRdf({
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
    NodeShapeWithExplicitRdfTypes
  > {
    if (
      !_ignoreRdfType &&
      !_resource.isInstanceOf(
        dataFactory.namedNode("http://example.com/FromRdfType"),
      )
    ) {
      return purify.Left(
        new rdfjsResource.Resource.ValueError({
          focusResource: _resource,
          message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type`,
          predicate: dataFactory.namedNode("http://example.com/FromRdfType"),
        }),
      );
    }

    const identifier = _resource.identifier;
    const _stringPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      string
    > = _resource
      .values(dataFactory.namedNode("http://example.com/stringProperty"), {
        unique: true,
      })
      .head()
      .chain((_value) => _value.toString());
    if (_stringPropertyEither.isLeft()) {
      return _stringPropertyEither;
    }

    const stringProperty = _stringPropertyEither.unsafeCoerce();
    return purify.Either.of(
      new NodeShapeWithExplicitRdfTypes({ identifier, stringProperty }),
    );
  }

  export class SparqlGraphPatterns extends sparqlBuilder.ResourceGraphPatterns {
    constructor(
      subject: sparqlBuilder.ResourceGraphPatterns.SubjectParameter,
      _options?: { ignoreRdfType?: boolean },
    ) {
      super(subject);
      if (!_options?.ignoreRdfType) {
        this.add(
          ...new sparqlBuilder.RdfTypeGraphPatterns(
            this.subject,
            dataFactory.namedNode("http://example.com/FromRdfType"),
          ),
        );
        this.add(
          sparqlBuilder.GraphPattern.basic(
            this.subject,
            dataFactory.namedNode(
              "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
            ),
            dataFactory.namedNode("http://example.com/ToRdfType"),
          ),
        );
      }

      this.add(
        sparqlBuilder.GraphPattern.basic(
          this.subject,
          dataFactory.namedNode("http://example.com/stringProperty"),
          this.variable("StringProperty"),
        ),
      );
    }
  }
}
/**
 * Shape with sh:defaultValue properties.
 */
export class NodeShapeWithDefaultValueProperties {
  readonly dateTimeProperty: Date;
  readonly falseBooleanProperty: boolean;
  private _identifier: (rdfjs.BlankNode | rdfjs.NamedNode) | undefined;
  readonly numberProperty: number;
  readonly stringProperty: string;
  readonly trueBooleanProperty: boolean;
  readonly type = "NodeShapeWithDefaultValueProperties";

  constructor(parameters: {
    readonly dateTimeProperty?: Date;
    readonly falseBooleanProperty?: boolean;
    readonly identifier?: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly numberProperty?: number;
    readonly stringProperty?: string;
    readonly trueBooleanProperty?: boolean;
  }) {
    if (
      typeof parameters.dateTimeProperty === "object" &&
      parameters.dateTimeProperty instanceof Date
    ) {
      this.dateTimeProperty = parameters.dateTimeProperty;
    } else if (typeof parameters.dateTimeProperty === "undefined") {
      this.dateTimeProperty = new Date("2018-04-09T10:00:00.000Z");
    } else {
      this.dateTimeProperty = parameters.dateTimeProperty as never;
    }

    if (typeof parameters.falseBooleanProperty === "boolean") {
      this.falseBooleanProperty = parameters.falseBooleanProperty;
    } else if (typeof parameters.falseBooleanProperty === "undefined") {
      this.falseBooleanProperty = false;
    } else {
      this.falseBooleanProperty = parameters.falseBooleanProperty as never;
    }

    this._identifier = parameters.identifier;
    if (typeof parameters.numberProperty === "number") {
      this.numberProperty = parameters.numberProperty;
    } else if (typeof parameters.numberProperty === "undefined") {
      this.numberProperty = 0;
    } else {
      this.numberProperty = parameters.numberProperty as never;
    }

    if (typeof parameters.stringProperty === "string") {
      this.stringProperty = parameters.stringProperty;
    } else if (typeof parameters.stringProperty === "undefined") {
      this.stringProperty = "";
    } else {
      this.stringProperty = parameters.stringProperty as never;
    }

    if (typeof parameters.trueBooleanProperty === "boolean") {
      this.trueBooleanProperty = parameters.trueBooleanProperty;
    } else if (typeof parameters.trueBooleanProperty === "undefined") {
      this.trueBooleanProperty = true;
    } else {
      this.trueBooleanProperty = parameters.trueBooleanProperty as never;
    }
  }

  get identifier(): rdfjs.BlankNode | rdfjs.NamedNode {
    return typeof this._identifier !== "undefined"
      ? this._identifier
      : dataFactory.namedNode(
          `urn:shaclmate:object:${this.type}:${this.hash(sha256.create())}`,
        );
  }

  equals(
    other: NodeShapeWithDefaultValueProperties,
  ): purifyHelpers.Equatable.EqualsResult {
    return ((left, right) =>
      purifyHelpers.Equatable.EqualsResult.fromBooleanEqualsResult(
        left,
        right,
        left.getTime() === right.getTime(),
      ))(this.dateTimeProperty, other.dateTimeProperty)
      .mapLeft((propertyValuesUnequal) => ({
        left: this,
        right: other,
        propertyName: "dateTimeProperty",
        propertyValuesUnequal,
        type: "Property" as const,
      }))
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(
          this.falseBooleanProperty,
          other.falseBooleanProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "falseBooleanProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.booleanEquals(
          this.identifier,
          other.identifier,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "identifier",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(
          this.numberProperty,
          other.numberProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "numberProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(
          this.stringProperty,
          other.stringProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "stringProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(
          this.trueBooleanProperty,
          other.trueBooleanProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "trueBooleanProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(this.type, other.type).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "type",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      );
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_hasher: HasherT): HasherT {
    _hasher.update(this.dateTimeProperty.toISOString());
    _hasher.update(this.falseBooleanProperty.toString());
    _hasher.update(this.numberProperty.toString());
    _hasher.update(this.stringProperty);
    _hasher.update(this.trueBooleanProperty.toString());
    return _hasher;
  }

  toJson(): {
    readonly dateTimeProperty: string;
    readonly falseBooleanProperty: boolean;
    readonly "@id": string;
    readonly numberProperty: number;
    readonly stringProperty: string;
    readonly trueBooleanProperty: boolean;
    readonly type: string;
  } {
    return JSON.parse(
      JSON.stringify({
        dateTimeProperty: this.dateTimeProperty.toISOString(),
        falseBooleanProperty: this.falseBooleanProperty,
        "@id": this.identifier.value,
        numberProperty: this.numberProperty,
        stringProperty: this.stringProperty,
        trueBooleanProperty: this.trueBooleanProperty,
        type: this.type,
      } satisfies ReturnType<NodeShapeWithDefaultValueProperties["toJson"]>),
    );
  }

  toRdf({
    mutateGraph,
    resourceSet,
  }: {
    ignoreRdfType?: boolean;
    mutateGraph: rdfjsResource.MutableResource.MutateGraph;
    resourceSet: rdfjsResource.MutableResourceSet;
  }): rdfjsResource.MutableResource {
    const _resource = resourceSet.mutableResource({
      identifier: this.identifier,
      mutateGraph,
    });
    _resource.add(
      dataFactory.namedNode("http://example.com/dateTimeProperty"),
      this.dateTimeProperty.getTime() !== 1523268000000
        ? this.dateTimeProperty
        : undefined,
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/falseBooleanProperty"),
      this.falseBooleanProperty ? true : undefined,
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/numberProperty"),
      this.numberProperty !== 0 ? this.numberProperty : undefined,
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/stringProperty"),
      this.stringProperty !== "" ? this.stringProperty : undefined,
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/trueBooleanProperty"),
      !this.trueBooleanProperty ? false : undefined,
    );
    return _resource;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace NodeShapeWithDefaultValueProperties {
  export function fromRdf({
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
    NodeShapeWithDefaultValueProperties
  > {
    const _dateTimePropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      Date
    > = _resource
      .values(dataFactory.namedNode("http://example.com/dateTimeProperty"), {
        unique: true,
      })
      .head()
      .alt(
        purify.Either.of(
          new rdfjsResource.Resource.Value({
            subject: _resource,
            predicate: dataFactory.namedNode(
              "http://example.com/dateTimeProperty",
            ),
            object: dataFactory.literal(
              "2018-04-09T10:00:00Z",
              dataFactory.namedNode(
                "http://www.w3.org/2001/XMLSchema#dateTime",
              ),
            ),
          }),
        ),
      )
      .chain((_value) => _value.toDate());
    if (_dateTimePropertyEither.isLeft()) {
      return _dateTimePropertyEither;
    }

    const dateTimeProperty = _dateTimePropertyEither.unsafeCoerce();
    const _falseBooleanPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      boolean
    > = _resource
      .values(
        dataFactory.namedNode("http://example.com/falseBooleanProperty"),
        { unique: true },
      )
      .head()
      .alt(
        purify.Either.of(
          new rdfjsResource.Resource.Value({
            subject: _resource,
            predicate: dataFactory.namedNode(
              "http://example.com/falseBooleanProperty",
            ),
            object: dataFactory.literal(
              "false",
              dataFactory.namedNode("http://www.w3.org/2001/XMLSchema#boolean"),
            ),
          }),
        ),
      )
      .chain((_value) => _value.toBoolean());
    if (_falseBooleanPropertyEither.isLeft()) {
      return _falseBooleanPropertyEither;
    }

    const falseBooleanProperty = _falseBooleanPropertyEither.unsafeCoerce();
    const identifier = _resource.identifier;
    const _numberPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      number
    > = _resource
      .values(dataFactory.namedNode("http://example.com/numberProperty"), {
        unique: true,
      })
      .head()
      .alt(
        purify.Either.of(
          new rdfjsResource.Resource.Value({
            subject: _resource,
            predicate: dataFactory.namedNode(
              "http://example.com/numberProperty",
            ),
            object: dataFactory.literal(
              "0",
              dataFactory.namedNode("http://www.w3.org/2001/XMLSchema#integer"),
            ),
          }),
        ),
      )
      .chain((_value) => _value.toNumber());
    if (_numberPropertyEither.isLeft()) {
      return _numberPropertyEither;
    }

    const numberProperty = _numberPropertyEither.unsafeCoerce();
    const _stringPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      string
    > = _resource
      .values(dataFactory.namedNode("http://example.com/stringProperty"), {
        unique: true,
      })
      .head()
      .alt(
        purify.Either.of(
          new rdfjsResource.Resource.Value({
            subject: _resource,
            predicate: dataFactory.namedNode(
              "http://example.com/stringProperty",
            ),
            object: dataFactory.literal("", ""),
          }),
        ),
      )
      .chain((_value) => _value.toString());
    if (_stringPropertyEither.isLeft()) {
      return _stringPropertyEither;
    }

    const stringProperty = _stringPropertyEither.unsafeCoerce();
    const _trueBooleanPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      boolean
    > = _resource
      .values(dataFactory.namedNode("http://example.com/trueBooleanProperty"), {
        unique: true,
      })
      .head()
      .alt(
        purify.Either.of(
          new rdfjsResource.Resource.Value({
            subject: _resource,
            predicate: dataFactory.namedNode(
              "http://example.com/trueBooleanProperty",
            ),
            object: dataFactory.literal(
              "true",
              dataFactory.namedNode("http://www.w3.org/2001/XMLSchema#boolean"),
            ),
          }),
        ),
      )
      .chain((_value) => _value.toBoolean());
    if (_trueBooleanPropertyEither.isLeft()) {
      return _trueBooleanPropertyEither;
    }

    const trueBooleanProperty = _trueBooleanPropertyEither.unsafeCoerce();
    return purify.Either.of(
      new NodeShapeWithDefaultValueProperties({
        dateTimeProperty,
        falseBooleanProperty,
        identifier,
        numberProperty,
        stringProperty,
        trueBooleanProperty,
      }),
    );
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
            dataFactory.namedNode("http://example.com/dateTimeProperty"),
            this.variable("DateTimeProperty"),
          ),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.basic(
            this.subject,
            dataFactory.namedNode("http://example.com/falseBooleanProperty"),
            this.variable("FalseBooleanProperty"),
          ),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.basic(
            this.subject,
            dataFactory.namedNode("http://example.com/numberProperty"),
            this.variable("NumberProperty"),
          ),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.basic(
            this.subject,
            dataFactory.namedNode("http://example.com/stringProperty"),
            this.variable("StringProperty"),
          ),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.basic(
            this.subject,
            dataFactory.namedNode("http://example.com/trueBooleanProperty"),
            this.variable("TrueBooleanProperty"),
          ),
        ),
      );
    }
  }
}
/**
 * A node shape that only allows IRI identifiers.
 */
export class IriNodeShape {
  identifier: rdfjs.NamedNode;
  readonly stringProperty: string;
  readonly type = "IriNodeShape";

  constructor(parameters: {
    readonly identifier: rdfjs.NamedNode;
    readonly stringProperty: string;
  }) {
    this.identifier = parameters.identifier;
    this.stringProperty = parameters.stringProperty;
  }

  equals(other: IriNodeShape): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.booleanEquals(
      this.identifier,
      other.identifier,
    )
      .mapLeft((propertyValuesUnequal) => ({
        left: this,
        right: other,
        propertyName: "identifier",
        propertyValuesUnequal,
        type: "Property" as const,
      }))
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(
          this.stringProperty,
          other.stringProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "stringProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(this.type, other.type).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "type",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      );
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_hasher: HasherT): HasherT {
    _hasher.update(this.stringProperty);
    return _hasher;
  }

  toJson(): {
    readonly "@id": string;
    readonly stringProperty: string;
    readonly type: string;
  } {
    return JSON.parse(
      JSON.stringify({
        "@id": this.identifier.value,
        stringProperty: this.stringProperty,
        type: this.type,
      } satisfies ReturnType<IriNodeShape["toJson"]>),
    );
  }

  toRdf({
    mutateGraph,
    resourceSet,
  }: {
    ignoreRdfType?: boolean;
    mutateGraph: rdfjsResource.MutableResource.MutateGraph;
    resourceSet: rdfjsResource.MutableResourceSet;
  }): rdfjsResource.MutableResource<rdfjs.NamedNode> {
    const _resource = resourceSet.mutableNamedResource({
      identifier: this.identifier,
      mutateGraph,
    });
    _resource.add(
      dataFactory.namedNode("http://example.com/stringProperty"),
      this.stringProperty,
    );
    return _resource;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace IriNodeShape {
  export function fromRdf({
    ignoreRdfType: _ignoreRdfType,
    languageIn: _languageIn,
    resource: _resource,
    // @ts-ignore
    ..._context
  }: {
    [_index: string]: any;
    ignoreRdfType?: boolean;
    languageIn?: readonly string[];
    resource: rdfjsResource.Resource<rdfjs.NamedNode>;
  }): purify.Either<rdfjsResource.Resource.ValueError, IriNodeShape> {
    const identifier = _resource.identifier;
    const _stringPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      string
    > = _resource
      .values(dataFactory.namedNode("http://example.com/stringProperty"), {
        unique: true,
      })
      .head()
      .chain((_value) => _value.toString());
    if (_stringPropertyEither.isLeft()) {
      return _stringPropertyEither;
    }

    const stringProperty = _stringPropertyEither.unsafeCoerce();
    return purify.Either.of(new IriNodeShape({ identifier, stringProperty }));
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
          dataFactory.namedNode("http://example.com/stringProperty"),
          this.variable("StringProperty"),
        ),
      );
    }
  }
}
/**
 * A node shape that's generated as a TypeScript interface instead of a class.
 */
export interface InterfaceNodeShape {
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  readonly stringProperty: string;
  readonly type: "InterfaceNodeShape";
}

export namespace InterfaceNodeShape {
  export function equals(
    left: InterfaceNodeShape,
    right: InterfaceNodeShape,
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
          left.stringProperty,
          right.stringProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: left,
          right: right,
          propertyName: "stringProperty",
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

  export function fromRdf({
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
  }): purify.Either<rdfjsResource.Resource.ValueError, InterfaceNodeShape> {
    const identifier = _resource.identifier;
    const _stringPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      string
    > = _resource
      .values(dataFactory.namedNode("http://example.com/stringProperty"), {
        unique: true,
      })
      .head()
      .chain((_value) => _value.toString());
    if (_stringPropertyEither.isLeft()) {
      return _stringPropertyEither;
    }

    const stringProperty = _stringPropertyEither.unsafeCoerce();
    const type = "InterfaceNodeShape" as const;
    return purify.Either.of({ identifier, stringProperty, type });
  }

  export function hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_interfaceNodeShape: InterfaceNodeShape, _hasher: HasherT): HasherT {
    _hasher.update(_interfaceNodeShape.stringProperty);
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
          dataFactory.namedNode("http://example.com/stringProperty"),
          this.variable("StringProperty"),
        ),
      );
    }
  }

  export function toJson(_interfaceNodeShape: InterfaceNodeShape): {
    readonly "@id": string;
    readonly stringProperty: string;
    readonly type: string;
  } {
    return JSON.parse(
      JSON.stringify({
        "@id": _interfaceNodeShape.identifier.value,
        stringProperty: _interfaceNodeShape.stringProperty,
        type: _interfaceNodeShape.type,
      } satisfies ReturnType<typeof InterfaceNodeShape.toJson>),
    );
  }

  export function toRdf(
    _interfaceNodeShape: InterfaceNodeShape,
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
      identifier: _interfaceNodeShape.identifier,
      mutateGraph,
    });
    _resource.add(
      dataFactory.namedNode("http://example.com/stringProperty"),
      _interfaceNodeShape.stringProperty,
    );
    return _resource;
  }
}
/**
 * Node shape that serves as an abstract base class for child node shapes.
 *
 * It's marked abstract in TypeScript and not exported from the module.
 *
 * Common pattern: put the minting strategy and nodeKind on an ABC.
 */
abstract class AbstractBaseClassWithPropertiesNodeShape {
  readonly abcStringProperty: string;
  abstract readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  abstract readonly type:
    | "ConcreteChildClassNodeShape"
    | "ConcreteParentClassNodeShape";

  constructor(parameters: { readonly abcStringProperty: string }) {
    this.abcStringProperty = parameters.abcStringProperty;
  }

  equals(
    other: AbstractBaseClassWithPropertiesNodeShape,
  ): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.strictEquals(
      this.abcStringProperty,
      other.abcStringProperty,
    )
      .mapLeft((propertyValuesUnequal) => ({
        left: this,
        right: other,
        propertyName: "abcStringProperty",
        propertyValuesUnequal,
        type: "Property" as const,
      }))
      .chain(() =>
        purifyHelpers.Equatable.booleanEquals(
          this.identifier,
          other.identifier,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "identifier",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(this.type, other.type).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "type",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      );
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_hasher: HasherT): HasherT {
    _hasher.update(this.abcStringProperty);
    return _hasher;
  }

  toJson(): {
    readonly abcStringProperty: string;
    readonly "@id": string;
    readonly type: string;
  } {
    return JSON.parse(
      JSON.stringify({
        abcStringProperty: this.abcStringProperty,
        "@id": this.identifier.value,
        type: this.type,
      } satisfies ReturnType<
        AbstractBaseClassWithPropertiesNodeShape["toJson"]
      >),
    );
  }

  toRdf({
    mutateGraph,
    resourceSet,
  }: {
    ignoreRdfType?: boolean;
    mutateGraph: rdfjsResource.MutableResource.MutateGraph;
    resourceSet: rdfjsResource.MutableResourceSet;
  }): rdfjsResource.MutableResource {
    const _resource = resourceSet.mutableResource({
      identifier: this.identifier,
      mutateGraph,
    });
    _resource.add(
      dataFactory.namedNode("http://example.com/abcStringProperty"),
      this.abcStringProperty,
    );
    return _resource;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

namespace AbstractBaseClassWithPropertiesNodeShape {
  export function interfaceFromRdf({
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
    { abcStringProperty: string; identifier: rdfjs.BlankNode | rdfjs.NamedNode }
  > {
    const _abcStringPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      string
    > = _resource
      .values(dataFactory.namedNode("http://example.com/abcStringProperty"), {
        unique: true,
      })
      .head()
      .chain((_value) => _value.toString());
    if (_abcStringPropertyEither.isLeft()) {
      return _abcStringPropertyEither;
    }

    const abcStringProperty = _abcStringPropertyEither.unsafeCoerce();
    const identifier = _resource.identifier;
    return purify.Either.of({ abcStringProperty, identifier });
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
          dataFactory.namedNode("http://example.com/abcStringProperty"),
          this.variable("AbcStringProperty"),
        ),
      );
    }
  }
}
/**
 * Abstract base for other node shapes. Put the ABC with properties above the ABC without.
 */
abstract class AbstractBaseClassWithoutPropertiesNodeShape extends AbstractBaseClassWithPropertiesNodeShape {
  abstract override readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  abstract override readonly type:
    | "ConcreteChildClassNodeShape"
    | "ConcreteParentClassNodeShape";

  // biome-ignore lint/complexity/noUselessConstructor: Always have a constructor
  constructor(
    parameters: ConstructorParameters<
      typeof AbstractBaseClassWithPropertiesNodeShape
    >[0],
  ) {
    super(parameters);
  }

  override toRdf({
    mutateGraph,
    resourceSet,
  }: {
    ignoreRdfType?: boolean;
    mutateGraph: rdfjsResource.MutableResource.MutateGraph;
    resourceSet: rdfjsResource.MutableResourceSet;
  }): rdfjsResource.MutableResource {
    const _resource = super.toRdf({
      ignoreRdfType: true,
      mutateGraph,
      resourceSet,
    });
    return _resource;
  }

  override toString(): string {
    return JSON.stringify(this.toJson());
  }
}

namespace AbstractBaseClassWithoutPropertiesNodeShape {
  export function interfaceFromRdf({
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
    { abcStringProperty: string; identifier: rdfjs.BlankNode | rdfjs.NamedNode }
  > {
    return AbstractBaseClassWithPropertiesNodeShape.interfaceFromRdf({
      ..._context,
      ignoreRdfType: true,
      languageIn: _languageIn,
      resource: _resource,
    }).chain((_super) => {
      const identifier = _resource.identifier;
      return purify.Either.of({
        abcStringProperty: _super.abcStringProperty,
        identifier,
      });
    });
  }

  export class SparqlGraphPatterns extends AbstractBaseClassWithPropertiesNodeShape.SparqlGraphPatterns {
    constructor(
      subject: sparqlBuilder.ResourceGraphPatterns.SubjectParameter,
      _options?: { ignoreRdfType?: boolean },
    ) {
      super(subject, { ignoreRdfType: true });
    }
  }
}
/**
 * Class node shape that inherits the abstract base class and is the parent of the ChildClassNodeShape.
 */
export class ConcreteParentClassNodeShape extends AbstractBaseClassWithoutPropertiesNodeShape {
  protected _identifier: (rdfjs.BlankNode | rdfjs.NamedNode) | undefined;
  readonly parentStringProperty: string;
  override readonly type:
    | "ConcreteChildClassNodeShape"
    | "ConcreteParentClassNodeShape" = "ConcreteParentClassNodeShape";

  constructor(
    parameters: {
      readonly identifier?: rdfjs.BlankNode | rdfjs.NamedNode;
      readonly parentStringProperty: string;
    } & ConstructorParameters<
      typeof AbstractBaseClassWithoutPropertiesNodeShape
    >[0],
  ) {
    super(parameters);
    this._identifier = parameters.identifier;
    this.parentStringProperty = parameters.parentStringProperty;
  }

  override get identifier(): rdfjs.BlankNode | rdfjs.NamedNode {
    if (typeof this._identifier === "undefined") {
      this._identifier = dataFactory.namedNode(
        `urn:shaclmate:object:${this.type}:${this.hash(sha256.create())}`,
      );
    }
    return this._identifier;
  }

  override equals(
    other: ConcreteParentClassNodeShape,
  ): purifyHelpers.Equatable.EqualsResult {
    return super
      .equals(other)
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(
          this.parentStringProperty,
          other.parentStringProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "parentStringProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      );
  }

  override hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_hasher: HasherT): HasherT {
    super.hash(_hasher);
    _hasher.update(this.parentStringProperty);
    return _hasher;
  }

  override toJson(): { readonly parentStringProperty: string } & ReturnType<
    AbstractBaseClassWithoutPropertiesNodeShape["toJson"]
  > {
    return JSON.parse(
      JSON.stringify({
        ...super.toJson(),
        parentStringProperty: this.parentStringProperty,
      } satisfies ReturnType<ConcreteParentClassNodeShape["toJson"]>),
    );
  }

  override toRdf({
    ignoreRdfType,
    mutateGraph,
    resourceSet,
  }: {
    ignoreRdfType?: boolean;
    mutateGraph: rdfjsResource.MutableResource.MutateGraph;
    resourceSet: rdfjsResource.MutableResourceSet;
  }): rdfjsResource.MutableResource {
    const _resource = super.toRdf({
      ignoreRdfType: true,
      mutateGraph,
      resourceSet,
    });
    if (!ignoreRdfType) {
      _resource.add(
        _resource.dataFactory.namedNode(
          "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
        ),
        _resource.dataFactory.namedNode(
          "http://example.com/ConcreteParentClassNodeShape",
        ),
      );
    }

    _resource.add(
      dataFactory.namedNode("http://example.com/parentStringProperty"),
      this.parentStringProperty,
    );
    return _resource;
  }

  override toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace ConcreteParentClassNodeShape {
  export function fromRdf({
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
    ConcreteParentClassNodeShape
  > {
    return AbstractBaseClassWithoutPropertiesNodeShape.interfaceFromRdf({
      ..._context,
      ignoreRdfType: true,
      languageIn: _languageIn,
      resource: _resource,
    }).chain((_super) => {
      if (
        !_ignoreRdfType &&
        !_resource.isInstanceOf(
          dataFactory.namedNode(
            "http://example.com/ConcreteParentClassNodeShape",
          ),
        )
      ) {
        return purify.Left(
          new rdfjsResource.Resource.ValueError({
            focusResource: _resource,
            message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type`,
            predicate: dataFactory.namedNode(
              "http://example.com/ConcreteParentClassNodeShape",
            ),
          }),
        );
      }
      const identifier = _resource.identifier;
      const _parentStringPropertyEither: purify.Either<
        rdfjsResource.Resource.ValueError,
        string
      > = _resource
        .values(
          dataFactory.namedNode("http://example.com/parentStringProperty"),
          { unique: true },
        )
        .head()
        .chain((_value) => _value.toString());
      if (_parentStringPropertyEither.isLeft()) {
        return _parentStringPropertyEither;
      }
      const parentStringProperty = _parentStringPropertyEither.unsafeCoerce();
      return purify.Either.of(
        new ConcreteParentClassNodeShape({
          identifier,
          abcStringProperty: _super.abcStringProperty,
          parentStringProperty,
        }),
      );
    });
  }

  export class SparqlGraphPatterns extends AbstractBaseClassWithoutPropertiesNodeShape.SparqlGraphPatterns {
    constructor(
      subject: sparqlBuilder.ResourceGraphPatterns.SubjectParameter,
      _options?: { ignoreRdfType?: boolean },
    ) {
      super(subject, { ignoreRdfType: true });
      if (!_options?.ignoreRdfType) {
        this.add(
          ...new sparqlBuilder.RdfTypeGraphPatterns(
            this.subject,
            dataFactory.namedNode(
              "http://example.com/ConcreteParentClassNodeShape",
            ),
          ),
        );
      }

      this.add(
        sparqlBuilder.GraphPattern.basic(
          this.subject,
          dataFactory.namedNode("http://example.com/parentStringProperty"),
          this.variable("ParentStringProperty"),
        ),
      );
    }
  }
}
/**
 * Child (class) of ParentClassNodeShape. Should inherit properties, node kinds, and minting strategy.
 */
export class ConcreteChildClassNodeShape extends ConcreteParentClassNodeShape {
  readonly childStringProperty: string;
  override readonly type = "ConcreteChildClassNodeShape";

  constructor(
    parameters: {
      readonly childStringProperty: string;
      readonly identifier?: rdfjs.BlankNode | rdfjs.NamedNode;
    } & ConstructorParameters<typeof ConcreteParentClassNodeShape>[0],
  ) {
    super(parameters);
    this.childStringProperty = parameters.childStringProperty;
  }

  override get identifier(): rdfjs.BlankNode | rdfjs.NamedNode {
    if (typeof this._identifier === "undefined") {
      this._identifier = dataFactory.namedNode(
        `urn:shaclmate:object:${this.type}:${this.hash(sha256.create())}`,
      );
    }
    return this._identifier;
  }

  override equals(
    other: ConcreteChildClassNodeShape,
  ): purifyHelpers.Equatable.EqualsResult {
    return super
      .equals(other)
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(
          this.childStringProperty,
          other.childStringProperty,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "childStringProperty",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      );
  }

  override hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_hasher: HasherT): HasherT {
    super.hash(_hasher);
    _hasher.update(this.childStringProperty);
    return _hasher;
  }

  override toJson(): { readonly childStringProperty: string } & ReturnType<
    ConcreteParentClassNodeShape["toJson"]
  > {
    return JSON.parse(
      JSON.stringify({
        ...super.toJson(),
        childStringProperty: this.childStringProperty,
      } satisfies ReturnType<ConcreteChildClassNodeShape["toJson"]>),
    );
  }

  override toRdf({
    ignoreRdfType,
    mutateGraph,
    resourceSet,
  }: {
    ignoreRdfType?: boolean;
    mutateGraph: rdfjsResource.MutableResource.MutateGraph;
    resourceSet: rdfjsResource.MutableResourceSet;
  }): rdfjsResource.MutableResource {
    const _resource = super.toRdf({
      ignoreRdfType: true,
      mutateGraph,
      resourceSet,
    });
    if (!ignoreRdfType) {
      _resource.add(
        _resource.dataFactory.namedNode(
          "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
        ),
        _resource.dataFactory.namedNode(
          "http://example.com/ConcreteChildClassNodeShape",
        ),
      );
    }

    _resource.add(
      dataFactory.namedNode("http://example.com/childStringProperty"),
      this.childStringProperty,
    );
    return _resource;
  }

  override toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace ConcreteChildClassNodeShape {
  export function fromRdf({
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
    ConcreteChildClassNodeShape
  > {
    return ConcreteParentClassNodeShape.fromRdf({
      ..._context,
      ignoreRdfType: true,
      languageIn: _languageIn,
      resource: _resource,
    }).chain((_super) => {
      if (
        !_ignoreRdfType &&
        !_resource.isInstanceOf(
          dataFactory.namedNode(
            "http://example.com/ConcreteChildClassNodeShape",
          ),
        )
      ) {
        return purify.Left(
          new rdfjsResource.Resource.ValueError({
            focusResource: _resource,
            message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type`,
            predicate: dataFactory.namedNode(
              "http://example.com/ConcreteChildClassNodeShape",
            ),
          }),
        );
      }
      const _childStringPropertyEither: purify.Either<
        rdfjsResource.Resource.ValueError,
        string
      > = _resource
        .values(
          dataFactory.namedNode("http://example.com/childStringProperty"),
          { unique: true },
        )
        .head()
        .chain((_value) => _value.toString());
      if (_childStringPropertyEither.isLeft()) {
        return _childStringPropertyEither;
      }
      const childStringProperty = _childStringPropertyEither.unsafeCoerce();
      const identifier = _resource.identifier;
      return purify.Either.of(
        new ConcreteChildClassNodeShape({
          identifier,
          parentStringProperty: _super.parentStringProperty,
          abcStringProperty: _super.abcStringProperty,
          childStringProperty,
        }),
      );
    });
  }

  export class SparqlGraphPatterns extends ConcreteParentClassNodeShape.SparqlGraphPatterns {
    constructor(
      subject: sparqlBuilder.ResourceGraphPatterns.SubjectParameter,
      _options?: { ignoreRdfType?: boolean },
    ) {
      super(subject, { ignoreRdfType: true });
      if (!_options?.ignoreRdfType) {
        this.add(
          ...new sparqlBuilder.RdfTypeGraphPatterns(
            this.subject,
            dataFactory.namedNode(
              "http://example.com/ConcreteChildClassNodeShape",
            ),
          ),
        );
      }

      this.add(
        sparqlBuilder.GraphPattern.basic(
          this.subject,
          dataFactory.namedNode("http://example.com/childStringProperty"),
          this.variable("ChildStringProperty"),
        ),
      );
    }
  }
}
/**
 * An abstract base class that will be inherited by the extern object type, showing how to mix generated and hand-written code.
 */
export abstract class AbstractBaseClassForExternObjectType {
  readonly abcStringProperty: string;
  abstract readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  abstract readonly type: "ExternObjectType";

  constructor(parameters: { readonly abcStringProperty: string }) {
    this.abcStringProperty = parameters.abcStringProperty;
  }

  equals(
    other: AbstractBaseClassForExternObjectType,
  ): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.strictEquals(
      this.abcStringProperty,
      other.abcStringProperty,
    )
      .mapLeft((propertyValuesUnequal) => ({
        left: this,
        right: other,
        propertyName: "abcStringProperty",
        propertyValuesUnequal,
        type: "Property" as const,
      }))
      .chain(() =>
        purifyHelpers.Equatable.booleanEquals(
          this.identifier,
          other.identifier,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "identifier",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.strictEquals(this.type, other.type).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "type",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      );
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_hasher: HasherT): HasherT {
    _hasher.update(this.abcStringProperty);
    return _hasher;
  }

  toJson(): {
    readonly abcStringProperty: string;
    readonly "@id": string;
    readonly type: string;
  } {
    return JSON.parse(
      JSON.stringify({
        abcStringProperty: this.abcStringProperty,
        "@id": this.identifier.value,
        type: this.type,
      } satisfies ReturnType<AbstractBaseClassForExternObjectType["toJson"]>),
    );
  }

  toRdf({
    mutateGraph,
    resourceSet,
  }: {
    ignoreRdfType?: boolean;
    mutateGraph: rdfjsResource.MutableResource.MutateGraph;
    resourceSet: rdfjsResource.MutableResourceSet;
  }): rdfjsResource.MutableResource {
    const _resource = resourceSet.mutableResource({
      identifier: this.identifier,
      mutateGraph,
    });
    _resource.add(
      dataFactory.namedNode("http://example.com/abcStringProperty"),
      this.abcStringProperty,
    );
    return _resource;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace AbstractBaseClassForExternObjectType {
  export function interfaceFromRdf({
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
    { abcStringProperty: string; identifier: rdfjs.BlankNode | rdfjs.NamedNode }
  > {
    const _abcStringPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      string
    > = _resource
      .values(dataFactory.namedNode("http://example.com/abcStringProperty"), {
        unique: true,
      })
      .head()
      .chain((_value) => _value.toString());
    if (_abcStringPropertyEither.isLeft()) {
      return _abcStringPropertyEither;
    }

    const abcStringProperty = _abcStringPropertyEither.unsafeCoerce();
    const identifier = _resource.identifier;
    return purify.Either.of({ abcStringProperty, identifier });
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
          dataFactory.namedNode("http://example.com/abcStringProperty"),
          this.variable("AbcStringProperty"),
        ),
      );
    }
  }
}
/**
 * Node that that sh:xone's other node shapes. This will usually be generated as a discriminated union.
 */
export type UnionNodeShape =
  | UnionNodeShapeMember1
  | UnionNodeShapeMember2
  | ExternObjectType;

export namespace UnionNodeShape {
  export function equals(
    left: UnionNodeShape,
    right: UnionNodeShape,
  ): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.strictEquals(left.type, right.type).chain(
      () => {
        switch (left.type) {
          case "UnionNodeShapeMember1":
            return left.equals(right as unknown as UnionNodeShapeMember1);
          case "UnionNodeShapeMember2":
            return left.equals(right as unknown as UnionNodeShapeMember2);
          case "ExternObjectType":
            return left.equals(right as unknown as ExternObjectType);
        }
      },
    );
  }

  export function fromRdf(parameters: {
    [_index: string]: any;
    ignoreRdfType?: boolean;
    resource: rdfjsResource.Resource;
  }): purify.Either<rdfjsResource.Resource.ValueError, UnionNodeShape> {
    return (
      UnionNodeShapeMember1.fromRdf(parameters) as purify.Either<
        rdfjsResource.Resource.ValueError,
        UnionNodeShape
      >
    )
      .altLazy(
        () =>
          UnionNodeShapeMember2.fromRdf(parameters) as purify.Either<
            rdfjsResource.Resource.ValueError,
            UnionNodeShape
          >,
      )
      .altLazy(
        () =>
          ExternObjectType.fromRdf(parameters) as purify.Either<
            rdfjsResource.Resource.ValueError,
            UnionNodeShape
          >,
      );
  }

  export function hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(unionNodeShape: UnionNodeShape, _hasher: HasherT): HasherT {
    switch (unionNodeShape.type) {
      case "UnionNodeShapeMember1":
        return unionNodeShape.hash(_hasher);
      case "UnionNodeShapeMember2":
        return unionNodeShape.hash(_hasher);
      case "ExternObjectType":
        return unionNodeShape.hash(_hasher);
    }
  }

  export class SparqlGraphPatterns extends sparqlBuilder.ResourceGraphPatterns {
    constructor(subject: sparqlBuilder.ResourceGraphPatterns.SubjectParameter) {
      super(subject);
      this.add(
        sparqlBuilder.GraphPattern.union(
          new UnionNodeShapeMember1.SparqlGraphPatterns(
            this.subject,
          ).toGroupGraphPattern(),
          new UnionNodeShapeMember2.SparqlGraphPatterns(
            this.subject,
          ).toGroupGraphPattern(),
          new ExternObjectType.SparqlGraphPatterns(
            this.subject,
          ).toGroupGraphPattern(),
        ),
      );
    }
  }

  export function toRdf(
    unionNodeShape: UnionNodeShape,
    _parameters: {
      mutateGraph: rdfjsResource.MutableResource.MutateGraph;
      resourceSet: rdfjsResource.MutableResourceSet;
    },
  ): rdfjsResource.MutableResource {
    switch (unionNodeShape.type) {
      case "UnionNodeShapeMember1":
        return unionNodeShape.toRdf(_parameters);
      case "UnionNodeShapeMember2":
        return unionNodeShape.toRdf(_parameters);
      case "ExternObjectType":
        return unionNodeShape.toRdf(_parameters);
    }
  }
}
