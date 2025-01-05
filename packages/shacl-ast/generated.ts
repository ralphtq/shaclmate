import * as sparqlBuilder from "@kos-kit/sparql-builder";
import type * as rdfjs from "@rdfjs/types";
import { DataFactory as dataFactory } from "n3";
import * as purify from "purify-ts";
import * as purifyHelpers from "purify-ts-helpers";
import * as rdfjsResource from "rdfjs-resource";
/**
 * Doesn't include sh:path since shaclmate can't handle the requisite SHACL yet
 */
export class PropertyShape {
  private _identifier: rdfjs.BlankNode | rdfjs.NamedNode | undefined;
  readonly sh_description: readonly rdfjs.Literal[];
  readonly sh_group: readonly (rdfjs.BlankNode | rdfjs.NamedNode)[];
  readonly sh_name: readonly rdfjs.Literal[];
  readonly sh_order: purify.Maybe<number>;
  readonly type = "PropertyShape";

  constructor(parameters: {
    readonly identifier?: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly sh_description?: readonly rdfjs.Literal[];
    readonly sh_group?: readonly (rdfjs.BlankNode | rdfjs.NamedNode)[];
    readonly sh_name?: readonly rdfjs.Literal[];
    readonly sh_order?: number | purify.Maybe<number>;
  }) {
    this._identifier = parameters.identifier;
    if (Array.isArray(parameters.sh_description)) {
      this.sh_description = parameters.sh_description;
    } else if (typeof parameters.sh_description === "undefined") {
      this.sh_description = [];
    } else {
      this.sh_description = parameters.sh_description; // never
    }

    if (Array.isArray(parameters.sh_group)) {
      this.sh_group = parameters.sh_group;
    } else if (typeof parameters.sh_group === "undefined") {
      this.sh_group = [];
    } else {
      this.sh_group = parameters.sh_group; // never
    }

    if (Array.isArray(parameters.sh_name)) {
      this.sh_name = parameters.sh_name;
    } else if (typeof parameters.sh_name === "undefined") {
      this.sh_name = [];
    } else {
      this.sh_name = parameters.sh_name; // never
    }

    if (purify.Maybe.isMaybe(parameters.sh_order)) {
      this.sh_order = parameters.sh_order;
    } else if (typeof parameters.sh_order === "number") {
      this.sh_order = purify.Maybe.of(parameters.sh_order);
    } else if (typeof parameters.sh_order === "undefined") {
      this.sh_order = purify.Maybe.empty();
    } else {
      this.sh_order = parameters.sh_order; // never
    }
  }

  get identifier(): rdfjs.BlankNode | rdfjs.NamedNode {
    if (typeof this._identifier === "undefined") {
      this._identifier = dataFactory.blankNode();
    }
    return this._identifier;
  }

  equals(other: PropertyShape): purifyHelpers.Equatable.EqualsResult {
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
            purifyHelpers.Equatable.booleanEquals,
          ))(this.sh_description, other.sh_description).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "sh_description",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      )
      .chain(() =>
        ((left, right) =>
          purifyHelpers.Arrays.equals(
            left,
            right,
            purifyHelpers.Equatable.booleanEquals,
          ))(this.sh_group, other.sh_group).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "sh_group",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      )
      .chain(() =>
        ((left, right) =>
          purifyHelpers.Arrays.equals(
            left,
            right,
            purifyHelpers.Equatable.booleanEquals,
          ))(this.sh_name, other.sh_name).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "sh_name",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.booleanEquals(
          this.sh_order,
          other.sh_order,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "sh_order",
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
    for (const _element0 of this.sh_description) {
      _hasher.update(_element0.value);
    }

    for (const _element0 of this.sh_group) {
      _hasher.update(rdfjsResource.Resource.Identifier.toString(_element0));
    }

    for (const _element0 of this.sh_name) {
      _hasher.update(_element0.value);
    }

    this.sh_order.ifJust((_value0) => {
      _hasher.update(_value0.toString());
    });
    return _hasher;
  }

  toJson(): {
    readonly "@id": string;
    readonly sh_description: readonly (
      | string
      | {
          "@language": string | undefined;
          "@type": string | undefined;
          "@value": string;
        }
    )[];
    readonly sh_group: readonly { "@id": string }[];
    readonly sh_name: readonly (
      | string
      | {
          "@language": string | undefined;
          "@type": string | undefined;
          "@value": string;
        }
    )[];
    readonly sh_order: number | undefined;
    readonly type: string;
  } {
    return JSON.parse(
      JSON.stringify({
        "@id": this.identifier.value,
        sh_description: this.sh_description.map((_item) =>
          _item.datatype.value === "http://www.w3.org/2001/XMLSchema#string" &&
          _item.language.length === 0
            ? _item.value
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
        ),
        sh_group: this.sh_group.map((_item) => ({ "@id": _item.value })),
        sh_name: this.sh_name.map((_item) =>
          _item.datatype.value === "http://www.w3.org/2001/XMLSchema#string" &&
          _item.language.length === 0
            ? _item.value
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
        ),
        sh_order: this.sh_order.map((_item) => _item).extract(),
        type: this.type,
      } satisfies ReturnType<PropertyShape["toJson"]>),
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
        _resource.dataFactory.namedNode(
          "http://minorg.github.io/shaclmate/shacl-ast/ns#PropertyShape",
        ),
      );
    }

    _resource.add(
      dataFactory.namedNode("http://www.w3.org/ns/shacl#description"),
      this.sh_description,
    );
    _resource.add(
      dataFactory.namedNode("http://www.w3.org/ns/shacl#group"),
      this.sh_group,
    );
    _resource.add(
      dataFactory.namedNode("http://www.w3.org/ns/shacl#name"),
      this.sh_name,
    );
    _resource.add(
      dataFactory.namedNode("http://www.w3.org/ns/shacl#order"),
      this.sh_order,
    );
    return _resource;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace PropertyShape {
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
  }): purify.Either<rdfjsResource.Resource.ValueError, PropertyShape> {
    if (
      !_ignoreRdfType &&
      !_resource.isInstanceOf(
        dataFactory.namedNode(
          "http://minorg.github.io/shaclmate/shacl-ast/ns#PropertyShape",
        ),
      )
    ) {
      return purify.Left(
        new rdfjsResource.Resource.ValueError({
          focusResource: _resource,
          message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type`,
          predicate: dataFactory.namedNode(
            "http://minorg.github.io/shaclmate/shacl-ast/ns#PropertyShape",
          ),
        }),
      );
    }

    const identifier = _resource.identifier;
    const _sh_descriptionEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly rdfjs.Literal[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode("http://www.w3.org/ns/shacl#description"),
          { unique: true },
        )
        .flatMap((_value) =>
          _value
            .toValues()
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
            .toMaybe()
            .toList(),
        ),
    ]);
    if (_sh_descriptionEither.isLeft()) {
      return _sh_descriptionEither;
    }

    const sh_description = _sh_descriptionEither.unsafeCoerce();
    const _sh_groupEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly (rdfjs.BlankNode | rdfjs.NamedNode)[]
    > = purify.Either.of([
      ..._resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#group"), {
          unique: true,
        })
        .flatMap((_value) =>
          _value
            .toValues()
            .head()
            .chain((_value) => _value.toIdentifier())
            .toMaybe()
            .toList(),
        ),
    ]);
    if (_sh_groupEither.isLeft()) {
      return _sh_groupEither;
    }

    const sh_group = _sh_groupEither.unsafeCoerce();
    const _sh_nameEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly rdfjs.Literal[]
    > = purify.Either.of([
      ..._resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#name"), {
          unique: true,
        })
        .flatMap((_value) =>
          _value
            .toValues()
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
            .toMaybe()
            .toList(),
        ),
    ]);
    if (_sh_nameEither.isLeft()) {
      return _sh_nameEither;
    }

    const sh_name = _sh_nameEither.unsafeCoerce();
    const _sh_orderEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<number>
    > = purify.Either.of(
      _resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#order"), {
          unique: true,
        })
        .head()
        .chain((_value) => _value.toNumber())
        .toMaybe(),
    );
    if (_sh_orderEither.isLeft()) {
      return _sh_orderEither;
    }

    const sh_order = _sh_orderEither.unsafeCoerce();
    return purify.Either.of(
      new PropertyShape({
        identifier,
        sh_description,
        sh_group,
        sh_name,
        sh_order,
      }),
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
            dataFactory.namedNode(
              "http://minorg.github.io/shaclmate/shacl-ast/ns#PropertyShape",
            ),
          ),
        );
      }

      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.basic(
            this.subject,
            dataFactory.namedNode("http://www.w3.org/ns/shacl#description"),
            this.variable("ShDescription"),
          ),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.basic(
            this.subject,
            dataFactory.namedNode("http://www.w3.org/ns/shacl#group"),
            this.variable("ShGroup"),
          ),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.basic(
            this.subject,
            dataFactory.namedNode("http://www.w3.org/ns/shacl#name"),
            this.variable("ShName"),
          ),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.basic(
            this.subject,
            dataFactory.namedNode("http://www.w3.org/ns/shacl#order"),
            this.variable("ShOrder"),
          ),
        ),
      );
    }
  }
}
export class PropertyGroup {
  private _identifier: rdfjs.BlankNode | rdfjs.NamedNode | undefined;
  readonly type = "PropertyGroup";

  constructor(parameters: {
    readonly identifier?: rdfjs.BlankNode | rdfjs.NamedNode;
  }) {
    this._identifier = parameters.identifier;
  }

  get identifier(): rdfjs.BlankNode | rdfjs.NamedNode {
    if (typeof this._identifier === "undefined") {
      this._identifier = dataFactory.blankNode();
    }
    return this._identifier;
  }

  equals(other: PropertyGroup): purifyHelpers.Equatable.EqualsResult {
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
    return _hasher;
  }

  toJson(): { readonly "@id": string; readonly type: string } {
    return JSON.parse(
      JSON.stringify({
        "@id": this.identifier.value,
        type: this.type,
      } satisfies ReturnType<PropertyGroup["toJson"]>),
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
    return _resource;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace PropertyGroup {
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
  }): purify.Either<rdfjsResource.Resource.ValueError, PropertyGroup> {
    const identifier = _resource.identifier;
    return purify.Either.of(new PropertyGroup({ identifier }));
  }

  export class SparqlGraphPatterns extends sparqlBuilder.ResourceGraphPatterns {
    constructor(
      subject: sparqlBuilder.ResourceGraphPatterns.SubjectParameter,
      _options?: { ignoreRdfType?: boolean },
    ) {
      super(subject);
    }
  }
}
export abstract class Shape {
  abstract readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  abstract readonly type: "NodeShape";

  // biome-ignore lint/complexity/noUselessConstructor: Always have a constructor
  constructor(_parameters: object) {}

  equals(other: Shape): purifyHelpers.Equatable.EqualsResult {
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
    return _hasher;
  }

  toJson(): { readonly "@id": string; readonly type: string } {
    return JSON.parse(
      JSON.stringify({
        "@id": this.identifier.value,
        type: this.type,
      } satisfies ReturnType<Shape["toJson"]>),
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
    return _resource;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace Shape {
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
    { identifier: rdfjs.BlankNode | rdfjs.NamedNode }
  > {
    const identifier = _resource.identifier;
    return purify.Either.of({ identifier });
  }

  export class SparqlGraphPatterns extends sparqlBuilder.ResourceGraphPatterns {
    constructor(
      subject: sparqlBuilder.ResourceGraphPatterns.SubjectParameter,
      _options?: { ignoreRdfType?: boolean },
    ) {
      super(subject);
    }
  }
}
export class NodeShape extends Shape {
  private _identifier: rdfjs.BlankNode | rdfjs.NamedNode | undefined;
  override readonly type = "NodeShape";

  constructor(
    parameters: {
      readonly identifier?: rdfjs.BlankNode | rdfjs.NamedNode;
    } & ConstructorParameters<typeof Shape>[0],
  ) {
    super(parameters);
    this._identifier = parameters.identifier;
  }

  override get identifier(): rdfjs.BlankNode | rdfjs.NamedNode {
    if (typeof this._identifier === "undefined") {
      this._identifier = dataFactory.blankNode();
    }
    return this._identifier;
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
          "http://minorg.github.io/shaclmate/shacl-ast/ns#NodeShape",
        ),
      );
    }

    return _resource;
  }

  override toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace NodeShape {
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
  }): purify.Either<rdfjsResource.Resource.ValueError, NodeShape> {
    return Shape.interfaceFromRdf({
      ..._context,
      ignoreRdfType: true,
      languageIn: _languageIn,
      resource: _resource,
    }).chain((_super) => {
      if (
        !_ignoreRdfType &&
        !_resource.isInstanceOf(
          dataFactory.namedNode(
            "http://minorg.github.io/shaclmate/shacl-ast/ns#NodeShape",
          ),
        )
      ) {
        return purify.Left(
          new rdfjsResource.Resource.ValueError({
            focusResource: _resource,
            message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type`,
            predicate: dataFactory.namedNode(
              "http://minorg.github.io/shaclmate/shacl-ast/ns#NodeShape",
            ),
          }),
        );
      }
      const identifier = _resource.identifier;
      return purify.Either.of(new NodeShape({ identifier }));
    });
  }

  export class SparqlGraphPatterns extends Shape.SparqlGraphPatterns {
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
              "http://minorg.github.io/shaclmate/shacl-ast/ns#NodeShape",
            ),
          ),
        );
      }
    }
  }
}
