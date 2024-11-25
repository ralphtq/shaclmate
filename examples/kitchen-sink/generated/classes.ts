import * as sparqlBuilder from "@kos-kit/sparql-builder";
import type * as rdfjs from "@rdfjs/types";
import { sha256 } from "js-sha256";
import { DataFactory as dataFactory } from "n3";
import * as purify from "purify-ts";
import * as purifyHelpers from "purify-ts-helpers";
import * as rdfjsResource from "rdfjs-resource";
import * as uuid from "uuid";

abstract class AbstractBaseClassNodeShape {
  readonly abcStringProperty: string;
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  abstract readonly type: "ChildClassNodeShape" | "ParentClassNodeShape";

  constructor(parameters: {
    readonly abcStringProperty: string;
    readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  }) {
    this.abcStringProperty = parameters.abcStringProperty;
    this.identifier = parameters.identifier;
  }

  equals(
    other: AbstractBaseClassNodeShape,
  ): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.objectEquals(this, other, {
      abcStringProperty: purifyHelpers.Equatable.strictEquals,
      identifier: purifyHelpers.Equatable.booleanEquals,
      type: purifyHelpers.Equatable.strictEquals,
    });
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(hasher: HasherT): HasherT {
    return AbstractBaseClassNodeShape.hashAbstractBaseClassNodeShape(
      this,
      hasher,
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
          "http://example.com/AbstractBaseClassNodeShape",
        ),
      );
    }

    _resource.add(
      dataFactory.namedNode("http://example.com/abcStringProperty"),
      this.abcStringProperty,
    );
    return _resource;
  }
}

namespace AbstractBaseClassNodeShape {
  export function fromRdf(
    _resource: rdfjsResource.Resource,
    _options?: { ignoreRdfType?: boolean },
  ): purify.Either<
    rdfjsResource.Resource.ValueError,
    { abcStringProperty: string; identifier: rdfjs.BlankNode | rdfjs.NamedNode }
  > {
    if (
      !_options?.ignoreRdfType &&
      !_resource.isInstanceOf(
        dataFactory.namedNode("http://example.com/AbstractBaseClassNodeShape"),
      )
    ) {
      return purify.Left(
        new rdfjsResource.Resource.ValueError({
          focusResource: _resource,
          message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type`,
          predicate: dataFactory.namedNode(
            "http://example.com/AbstractBaseClassNodeShape",
          ),
        }),
      );
    }

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

  export function hashAbstractBaseClassNodeShape<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(
    abstractBaseClassNodeShape: Omit<
      AbstractBaseClassNodeShape,
      "equals" | "hash" | "identifier" | "toRdf" | "type"
    >,
    _hasher: HasherT,
  ): HasherT {
    _hasher.update(abstractBaseClassNodeShape.abcStringProperty);
    return _hasher;
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
            subject,
            dataFactory.namedNode(
              "http://example.com/AbstractBaseClassNodeShape",
            ),
          ),
        );
      }

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

export class ExterningAndInliningNodeShape {
  readonly externProperty: rdfjs.BlankNode | rdfjs.NamedNode;
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  readonly inlineProperty: InlineNodeShape;
  readonly type = "ExterningAndInliningNodeShape" as const;

  constructor(parameters: {
    readonly externProperty: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly inlineProperty: InlineNodeShape;
  }) {
    this.externProperty = parameters.externProperty;
    this.identifier = parameters.identifier;
    this.inlineProperty = parameters.inlineProperty;
  }

  equals(
    other: ExterningAndInliningNodeShape,
  ): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.objectEquals(this, other, {
      externProperty: purifyHelpers.Equatable.booleanEquals,
      identifier: purifyHelpers.Equatable.booleanEquals,
      inlineProperty: purifyHelpers.Equatable.equals,
      type: purifyHelpers.Equatable.strictEquals,
    });
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(hasher: HasherT): HasherT {
    return ExterningAndInliningNodeShape.hash(this, hasher);
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
      dataFactory.namedNode("http://example.com/externProperty"),
      this.externProperty,
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/inlineProperty"),
      this.inlineProperty.toRdf({
        mutateGraph: mutateGraph,
        resourceSet: resourceSet,
      }).identifier,
    );
    return _resource;
  }
}

export namespace ExterningAndInliningNodeShape {
  export function fromRdf(
    _resource: rdfjsResource.Resource,
    _options?: { ignoreRdfType?: boolean },
  ): purify.Either<
    rdfjsResource.Resource.ValueError,
    ExterningAndInliningNodeShape
  > {
    const _externPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      rdfjs.BlankNode | rdfjs.NamedNode
    > = _resource
      .values(dataFactory.namedNode("http://example.com/externProperty"), {
        unique: true,
      })
      .head()
      .chain((_value) => _value.toIdentifier());
    if (_externPropertyEither.isLeft()) {
      return _externPropertyEither;
    }

    const externProperty = _externPropertyEither.unsafeCoerce();
    const identifier = _resource.identifier;
    const _inlinePropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      InlineNodeShape
    > = _resource
      .values(dataFactory.namedNode("http://example.com/inlineProperty"), {
        unique: true,
      })
      .head()
      .chain((value) => value.toResource())
      .chain((_resource) => InlineNodeShape.fromRdf(_resource));
    if (_inlinePropertyEither.isLeft()) {
      return _inlinePropertyEither;
    }

    const inlineProperty = _inlinePropertyEither.unsafeCoerce();
    return purify.Either.of(
      new ExterningAndInliningNodeShape({
        externProperty,
        identifier,
        inlineProperty,
      }),
    );
  }

  export function hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(
    externingAndInliningNodeShape: Omit<
      ExterningAndInliningNodeShape,
      "equals" | "hash" | "identifier" | "toRdf" | "type"
    >,
    _hasher: HasherT,
  ): HasherT {
    _hasher.update(
      rdfjsResource.Resource.Identifier.toString(
        externingAndInliningNodeShape.externProperty,
      ),
    );
    InlineNodeShape.hash(externingAndInliningNodeShape.inlineProperty, _hasher);
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
          dataFactory.namedNode("http://example.com/externProperty"),
          this.variable("ExternProperty"),
        ),
      );
      this.add(
        sparqlBuilder.GraphPattern.group(
          sparqlBuilder.GraphPattern.basic(
            this.subject,
            dataFactory.namedNode("http://example.com/inlineProperty"),
            this.variable("InlineProperty"),
          ).chainObject(
            (_object) => new InlineNodeShape.SparqlGraphPatterns(_object),
          ),
        ),
      );
    }
  }
}

export class ExternNodeShape {
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  readonly stringProperty: string;
  readonly type = "ExternNodeShape" as const;

  constructor(parameters: {
    readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly stringProperty: string;
  }) {
    this.identifier = parameters.identifier;
    this.stringProperty = parameters.stringProperty;
  }

  equals(other: ExternNodeShape): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.objectEquals(this, other, {
      identifier: purifyHelpers.Equatable.booleanEquals,
      stringProperty: purifyHelpers.Equatable.strictEquals,
      type: purifyHelpers.Equatable.strictEquals,
    });
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(hasher: HasherT): HasherT {
    return ExternNodeShape.hash(this, hasher);
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
}

export namespace ExternNodeShape {
  export function fromRdf(
    _resource: rdfjsResource.Resource,
    _options?: { ignoreRdfType?: boolean },
  ): purify.Either<rdfjsResource.Resource.ValueError, ExternNodeShape> {
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

  export function hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(
    externNodeShape: Omit<
      ExternNodeShape,
      "equals" | "hash" | "identifier" | "toRdf" | "type"
    >,
    _hasher: HasherT,
  ): HasherT {
    _hasher.update(externNodeShape.stringProperty);
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
}

export class IriNodeShape {
  readonly identifier: rdfjs.NamedNode;
  readonly stringProperty: string;
  readonly type = "IriNodeShape" as const;

  constructor(parameters: {
    readonly identifier: rdfjs.NamedNode;
    readonly stringProperty: string;
  }) {
    this.identifier = parameters.identifier;
    this.stringProperty = parameters.stringProperty;
  }

  equals(other: IriNodeShape): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.objectEquals(this, other, {
      identifier: purifyHelpers.Equatable.booleanEquals,
      stringProperty: purifyHelpers.Equatable.strictEquals,
      type: purifyHelpers.Equatable.strictEquals,
    });
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(hasher: HasherT): HasherT {
    return IriNodeShape.hash(this, hasher);
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
}

export namespace IriNodeShape {
  export function fromRdf(
    _resource: rdfjsResource.Resource<rdfjs.NamedNode>,
    _options?: { ignoreRdfType?: boolean },
  ): purify.Either<rdfjsResource.Resource.ValueError, IriNodeShape> {
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

  export function hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(
    iriNodeShape: Omit<
      IriNodeShape,
      "equals" | "hash" | "identifier" | "toRdf" | "type"
    >,
    _hasher: HasherT,
  ): HasherT {
    _hasher.update(iriNodeShape.stringProperty);
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
}

export class NodeShapeWithListProperty {
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  readonly listProperty: rdfjs.BlankNode | rdfjs.NamedNode;
  readonly type = "NodeShapeWithListProperty" as const;

  constructor(parameters: {
    readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly listProperty: rdfjs.BlankNode | rdfjs.NamedNode;
  }) {
    this.identifier = parameters.identifier;
    this.listProperty = parameters.listProperty;
  }

  equals(
    other: NodeShapeWithListProperty,
  ): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.objectEquals(this, other, {
      identifier: purifyHelpers.Equatable.booleanEquals,
      listProperty: purifyHelpers.Equatable.booleanEquals,
      type: purifyHelpers.Equatable.strictEquals,
    });
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(hasher: HasherT): HasherT {
    return NodeShapeWithListProperty.hash(this, hasher);
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
      this.listProperty,
    );
    return _resource;
  }
}

export namespace NodeShapeWithListProperty {
  export function fromRdf(
    _resource: rdfjsResource.Resource,
    _options?: { ignoreRdfType?: boolean },
  ): purify.Either<
    rdfjsResource.Resource.ValueError,
    NodeShapeWithListProperty
  > {
    const identifier = _resource.identifier;
    const _listPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      rdfjs.BlankNode | rdfjs.NamedNode
    > = _resource
      .values(dataFactory.namedNode("http://example.com/listProperty"), {
        unique: true,
      })
      .head()
      .chain((_value) => _value.toIdentifier());
    if (_listPropertyEither.isLeft()) {
      return _listPropertyEither;
    }

    const listProperty = _listPropertyEither.unsafeCoerce();
    return purify.Either.of(
      new NodeShapeWithListProperty({ identifier, listProperty }),
    );
  }

  export function hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(
    nodeShapeWithListProperty: Omit<
      NodeShapeWithListProperty,
      "equals" | "hash" | "identifier" | "toRdf" | "type"
    >,
    _hasher: HasherT,
  ): HasherT {
    _hasher.update(
      rdfjsResource.Resource.Identifier.toString(
        nodeShapeWithListProperty.listProperty,
      ),
    );
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
          dataFactory.namedNode("http://example.com/listProperty"),
          this.variable("ListProperty"),
        ),
      );
    }
  }
}

export class NodeShapeWithPropertyCardinalities {
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  readonly optionalStringProperty: purify.Maybe<string>;
  readonly requiredStringProperty: string;
  readonly setStringProperty: readonly string[];
  readonly type = "NodeShapeWithPropertyCardinalities" as const;

  constructor(parameters: {
    readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly optionalStringProperty?: purify.Maybe<string> | string;
    readonly requiredStringProperty: string;
    readonly setStringProperty?: readonly string[];
  }) {
    this.identifier = parameters.identifier;
    if (purify.Maybe.isMaybe(parameters.optionalStringProperty)) {
      this.optionalStringProperty = parameters.optionalStringProperty;
    } else if (typeof parameters.optionalStringProperty === "string") {
      this.optionalStringProperty = purify.Maybe.of(
        parameters.optionalStringProperty,
      );
    } else if (typeof parameters.optionalStringProperty === "undefined") {
      this.optionalStringProperty = purify.Maybe.empty();
    } else {
      this.optionalStringProperty = parameters.optionalStringProperty; // never
    }

    this.requiredStringProperty = parameters.requiredStringProperty;
    if (typeof parameters.setStringProperty === "undefined") {
      this.setStringProperty = [];
    } else if (Array.isArray(parameters.setStringProperty)) {
      this.setStringProperty = parameters.setStringProperty;
    } else {
      this.setStringProperty = parameters.setStringProperty; // never
    }
  }

  equals(
    other: NodeShapeWithPropertyCardinalities,
  ): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.objectEquals(this, other, {
      identifier: purifyHelpers.Equatable.booleanEquals,
      optionalStringProperty: purifyHelpers.Equatable.booleanEquals,
      requiredStringProperty: purifyHelpers.Equatable.strictEquals,
      setStringProperty: (left, right) =>
        purifyHelpers.Arrays.equals(
          left,
          right,
          purifyHelpers.Equatable.strictEquals,
        ),
      type: purifyHelpers.Equatable.strictEquals,
    });
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(hasher: HasherT): HasherT {
    return NodeShapeWithPropertyCardinalities.hash(this, hasher);
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
      dataFactory.namedNode("http://example.com/optionalStringProperty"),
      this.optionalStringProperty,
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/requiredStringProperty"),
      this.requiredStringProperty,
    );
    _resource.add(
      dataFactory.namedNode("http://example.com/setStringProperty"),
      this.setStringProperty,
    );
    return _resource;
  }
}

export namespace NodeShapeWithPropertyCardinalities {
  export function fromRdf(
    _resource: rdfjsResource.Resource,
    _options?: { ignoreRdfType?: boolean },
  ): purify.Either<
    rdfjsResource.Resource.ValueError,
    NodeShapeWithPropertyCardinalities
  > {
    const identifier = _resource.identifier;
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
    const _setStringPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly string[]
    > = purify.Either.of([
      ..._resource
        .values(dataFactory.namedNode("http://example.com/setStringProperty"), {
          unique: true,
        })
        .flatMap((_value) =>
          _value
            .toValues()
            .head()
            .chain((_value) => _value.toString())
            .toMaybe()
            .toList(),
        ),
    ]);
    if (_setStringPropertyEither.isLeft()) {
      return _setStringPropertyEither;
    }

    const setStringProperty = _setStringPropertyEither.unsafeCoerce();
    return purify.Either.of(
      new NodeShapeWithPropertyCardinalities({
        identifier,
        optionalStringProperty,
        requiredStringProperty,
        setStringProperty,
      }),
    );
  }

  export function hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(
    nodeShapeWithPropertyCardinalities: Omit<
      NodeShapeWithPropertyCardinalities,
      "equals" | "hash" | "identifier" | "toRdf" | "type"
    >,
    _hasher: HasherT,
  ): HasherT {
    nodeShapeWithPropertyCardinalities.optionalStringProperty.ifJust(
      (_value) => {
        _hasher.update(_value);
      },
    );
    _hasher.update(nodeShapeWithPropertyCardinalities.requiredStringProperty);
    for (const _element of nodeShapeWithPropertyCardinalities.setStringProperty) {
      _hasher.update(_element);
    }

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
      this.add(
        sparqlBuilder.GraphPattern.basic(
          this.subject,
          dataFactory.namedNode("http://example.com/setStringProperty"),
          this.variable("SetStringProperty"),
        ),
      );
    }
  }
}

export class NonClassNodeShape {
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  readonly stringProperty: string;
  readonly type = "NonClassNodeShape" as const;

  constructor(parameters: {
    readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly stringProperty: string;
  }) {
    this.identifier = parameters.identifier;
    this.stringProperty = parameters.stringProperty;
  }

  equals(other: NonClassNodeShape): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.objectEquals(this, other, {
      identifier: purifyHelpers.Equatable.booleanEquals,
      stringProperty: purifyHelpers.Equatable.strictEquals,
      type: purifyHelpers.Equatable.strictEquals,
    });
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(hasher: HasherT): HasherT {
    return NonClassNodeShape.hash(this, hasher);
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
}

export namespace NonClassNodeShape {
  export function fromRdf(
    _resource: rdfjsResource.Resource,
    _options?: { ignoreRdfType?: boolean },
  ): purify.Either<rdfjsResource.Resource.ValueError, NonClassNodeShape> {
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

  export function hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(
    nonClassNodeShape: Omit<
      NonClassNodeShape,
      "equals" | "hash" | "identifier" | "toRdf" | "type"
    >,
    _hasher: HasherT,
  ): HasherT {
    _hasher.update(nonClassNodeShape.stringProperty);
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
}

export class ParentClassNodeShape extends AbstractBaseClassNodeShape {
  readonly parentStringProperty: readonly string[];
  readonly type: "ChildClassNodeShape" | "ParentClassNodeShape" =
    "ParentClassNodeShape";

  constructor(
    parameters: {
      readonly parentStringProperty?: readonly string[];
    } & ConstructorParameters<typeof AbstractBaseClassNodeShape>[0],
  ) {
    super(parameters);
    if (typeof parameters.parentStringProperty === "undefined") {
      this.parentStringProperty = [];
    } else if (Array.isArray(parameters.parentStringProperty)) {
      this.parentStringProperty = parameters.parentStringProperty;
    } else {
      this.parentStringProperty = parameters.parentStringProperty; // never
    }
  }

  override equals(
    other: ParentClassNodeShape,
  ): purifyHelpers.Equatable.EqualsResult {
    return super
      .equals(other)
      .chain(() =>
        purifyHelpers.Equatable.objectEquals(this, other, {
          parentStringProperty: (left, right) =>
            purifyHelpers.Arrays.equals(
              left,
              right,
              purifyHelpers.Equatable.strictEquals,
            ),
          type: purifyHelpers.Equatable.strictEquals,
        }),
      );
  }

  override hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(hasher: HasherT): HasherT {
    return ParentClassNodeShape.hashParentClassNodeShape(this, hasher);
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
      mutateGraph,
      ignoreRdfType: true,
      resourceSet,
    });
    if (!ignoreRdfType) {
      _resource.add(
        _resource.dataFactory.namedNode(
          "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
        ),
        _resource.dataFactory.namedNode(
          "http://example.com/ParentClassNodeShape",
        ),
      );
    }

    _resource.add(
      dataFactory.namedNode("http://example.com/parentStringProperty"),
      this.parentStringProperty,
    );
    return _resource;
  }
}

export namespace ParentClassNodeShape {
  export function fromRdf(
    _resource: rdfjsResource.Resource,
    _options?: { ignoreRdfType?: boolean },
  ): purify.Either<rdfjsResource.Resource.ValueError, ParentClassNodeShape> {
    return AbstractBaseClassNodeShape.fromRdf(_resource, {
      ignoreRdfType: true,
    }).chain((_super) => {
      if (
        !_options?.ignoreRdfType &&
        !_resource.isInstanceOf(
          dataFactory.namedNode("http://example.com/ParentClassNodeShape"),
        )
      ) {
        return purify.Left(
          new rdfjsResource.Resource.ValueError({
            focusResource: _resource,
            message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type`,
            predicate: dataFactory.namedNode(
              "http://example.com/ParentClassNodeShape",
            ),
          }),
        );
      }
      const _parentStringPropertyEither: purify.Either<
        rdfjsResource.Resource.ValueError,
        readonly string[]
      > = purify.Either.of([
        ..._resource
          .values(
            dataFactory.namedNode("http://example.com/parentStringProperty"),
            { unique: true },
          )
          .flatMap((_value) =>
            _value
              .toValues()
              .head()
              .chain((_value) => _value.toString())
              .toMaybe()
              .toList(),
          ),
      ]);
      if (_parentStringPropertyEither.isLeft()) {
        return _parentStringPropertyEither;
      }
      const parentStringProperty = _parentStringPropertyEither.unsafeCoerce();
      return purify.Either.of(
        new ParentClassNodeShape({
          abcStringProperty: _super.abcStringProperty,
          identifier: _super.identifier,
          parentStringProperty,
        }),
      );
    });
  }

  export function hashParentClassNodeShape<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(
    parentClassNodeShape: Omit<
      ParentClassNodeShape,
      "equals" | "hash" | "identifier" | "toRdf" | "type"
    >,
    _hasher: HasherT,
  ): HasherT {
    AbstractBaseClassNodeShape.hashAbstractBaseClassNodeShape(
      parentClassNodeShape,
      _hasher,
    );
    for (const _element of parentClassNodeShape.parentStringProperty) {
      _hasher.update(_element);
    }

    return _hasher;
  }

  export class SparqlGraphPatterns extends AbstractBaseClassNodeShape.SparqlGraphPatterns {
    constructor(
      subject: sparqlBuilder.ResourceGraphPatterns.SubjectParameter,
      _options?: { ignoreRdfType?: boolean },
    ) {
      super(subject, { ignoreRdfType: true });
      if (!_options?.ignoreRdfType) {
        this.add(
          ...new sparqlBuilder.RdfTypeGraphPatterns(
            subject,
            dataFactory.namedNode("http://example.com/ParentClassNodeShape"),
          ),
        );
      }

      this.add(
        sparqlBuilder.GraphPattern.optional(
          sparqlBuilder.GraphPattern.basic(
            this.subject,
            dataFactory.namedNode("http://example.com/parentStringProperty"),
            this.variable("ParentStringProperty"),
          ),
        ),
      );
    }
  }
}

export class ChildClassNodeShape extends ParentClassNodeShape {
  readonly childStringProperty: string;
  override readonly type = "ChildClassNodeShape" as const;

  constructor(
    parameters: {
      readonly childStringProperty: string;
    } & ConstructorParameters<typeof ParentClassNodeShape>[0],
  ) {
    super(parameters);
    this.childStringProperty = parameters.childStringProperty;
  }

  override equals(
    other: ChildClassNodeShape,
  ): purifyHelpers.Equatable.EqualsResult {
    return super
      .equals(other)
      .chain(() =>
        purifyHelpers.Equatable.objectEquals(this, other, {
          childStringProperty: purifyHelpers.Equatable.strictEquals,
          type: purifyHelpers.Equatable.strictEquals,
        }),
      );
  }

  override hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(hasher: HasherT): HasherT {
    return ChildClassNodeShape.hashChildClassNodeShape(this, hasher);
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
      mutateGraph,
      ignoreRdfType: true,
      resourceSet,
    });
    if (!ignoreRdfType) {
      _resource.add(
        _resource.dataFactory.namedNode(
          "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
        ),
        _resource.dataFactory.namedNode(
          "http://example.com/ChildClassNodeShape",
        ),
      );
    }

    _resource.add(
      dataFactory.namedNode("http://example.com/childStringProperty"),
      this.childStringProperty,
    );
    return _resource;
  }
}

export namespace ChildClassNodeShape {
  export function fromRdf(
    _resource: rdfjsResource.Resource,
    _options?: { ignoreRdfType?: boolean },
  ): purify.Either<rdfjsResource.Resource.ValueError, ChildClassNodeShape> {
    return ParentClassNodeShape.fromRdf(_resource, {
      ignoreRdfType: true,
    }).chain((_super) => {
      if (
        !_options?.ignoreRdfType &&
        !_resource.isInstanceOf(
          dataFactory.namedNode("http://example.com/ChildClassNodeShape"),
        )
      ) {
        return purify.Left(
          new rdfjsResource.Resource.ValueError({
            focusResource: _resource,
            message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type`,
            predicate: dataFactory.namedNode(
              "http://example.com/ChildClassNodeShape",
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
      return purify.Either.of(
        new ChildClassNodeShape({
          parentStringProperty: _super.parentStringProperty,
          abcStringProperty: _super.abcStringProperty,
          identifier: _super.identifier,
          childStringProperty,
        }),
      );
    });
  }

  export function hashChildClassNodeShape<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(
    childClassNodeShape: Omit<
      ChildClassNodeShape,
      "equals" | "hash" | "identifier" | "toRdf" | "type"
    >,
    _hasher: HasherT,
  ): HasherT {
    ParentClassNodeShape.hashParentClassNodeShape(childClassNodeShape, _hasher);
    _hasher.update(childClassNodeShape.childStringProperty);
    return _hasher;
  }

  export class SparqlGraphPatterns extends ParentClassNodeShape.SparqlGraphPatterns {
    constructor(
      subject: sparqlBuilder.ResourceGraphPatterns.SubjectParameter,
      _options?: { ignoreRdfType?: boolean },
    ) {
      super(subject, { ignoreRdfType: true });
      if (!_options?.ignoreRdfType) {
        this.add(
          ...new sparqlBuilder.RdfTypeGraphPatterns(
            subject,
            dataFactory.namedNode("http://example.com/ChildClassNodeShape"),
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

export class InlineNodeShape {
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  readonly stringProperty: string;
  readonly type = "InlineNodeShape" as const;

  constructor(parameters: {
    readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly stringProperty: string;
  }) {
    this.identifier = parameters.identifier;
    this.stringProperty = parameters.stringProperty;
  }

  equals(other: InlineNodeShape): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.objectEquals(this, other, {
      identifier: purifyHelpers.Equatable.booleanEquals,
      stringProperty: purifyHelpers.Equatable.strictEquals,
      type: purifyHelpers.Equatable.strictEquals,
    });
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(hasher: HasherT): HasherT {
    return InlineNodeShape.hash(this, hasher);
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
}

export namespace InlineNodeShape {
  export function fromRdf(
    _resource: rdfjsResource.Resource,
    _options?: { ignoreRdfType?: boolean },
  ): purify.Either<rdfjsResource.Resource.ValueError, InlineNodeShape> {
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

  export function hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(
    inlineNodeShape: Omit<
      InlineNodeShape,
      "equals" | "hash" | "identifier" | "toRdf" | "type"
    >,
    _hasher: HasherT,
  ): HasherT {
    _hasher.update(inlineNodeShape.stringProperty);
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
}

export class OrNodeShapeMember1 {
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  readonly stringProperty: string;
  readonly type = "OrNodeShapeMember1" as const;

  constructor(parameters: {
    readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly stringProperty: string;
  }) {
    this.identifier = parameters.identifier;
    this.stringProperty = parameters.stringProperty;
  }

  equals(other: OrNodeShapeMember1): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.objectEquals(this, other, {
      identifier: purifyHelpers.Equatable.booleanEquals,
      stringProperty: purifyHelpers.Equatable.strictEquals,
      type: purifyHelpers.Equatable.strictEquals,
    });
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(hasher: HasherT): HasherT {
    return OrNodeShapeMember1.hash(this, hasher);
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
}

export namespace OrNodeShapeMember1 {
  export function fromRdf(
    _resource: rdfjsResource.Resource,
    _options?: { ignoreRdfType?: boolean },
  ): purify.Either<rdfjsResource.Resource.ValueError, OrNodeShapeMember1> {
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
      new OrNodeShapeMember1({ identifier, stringProperty }),
    );
  }

  export function hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(
    orNodeShapeMember1: Omit<
      OrNodeShapeMember1,
      "equals" | "hash" | "identifier" | "toRdf" | "type"
    >,
    _hasher: HasherT,
  ): HasherT {
    _hasher.update(orNodeShapeMember1.stringProperty);
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
}

export class OrNodeShapeMember2 {
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  readonly stringProperty: string;
  readonly type = "OrNodeShapeMember2" as const;

  constructor(parameters: {
    readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly stringProperty: string;
  }) {
    this.identifier = parameters.identifier;
    this.stringProperty = parameters.stringProperty;
  }

  equals(other: OrNodeShapeMember2): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.objectEquals(this, other, {
      identifier: purifyHelpers.Equatable.booleanEquals,
      stringProperty: purifyHelpers.Equatable.strictEquals,
      type: purifyHelpers.Equatable.strictEquals,
    });
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(hasher: HasherT): HasherT {
    return OrNodeShapeMember2.hash(this, hasher);
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
}

export namespace OrNodeShapeMember2 {
  export function fromRdf(
    _resource: rdfjsResource.Resource,
    _options?: { ignoreRdfType?: boolean },
  ): purify.Either<rdfjsResource.Resource.ValueError, OrNodeShapeMember2> {
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
      new OrNodeShapeMember2({ identifier, stringProperty }),
    );
  }

  export function hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(
    orNodeShapeMember2: Omit<
      OrNodeShapeMember2,
      "equals" | "hash" | "identifier" | "toRdf" | "type"
    >,
    _hasher: HasherT,
  ): HasherT {
    _hasher.update(orNodeShapeMember2.stringProperty);
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
}

export class Sha256IriNodeShape {
  private _identifier: rdfjs.NamedNode | undefined;
  readonly stringProperty: readonly string[];
  readonly type = "Sha256IriNodeShape" as const;

  constructor(parameters: {
    readonly identifier?: rdfjs.NamedNode;
    readonly stringProperty?: readonly string[];
  }) {
    this._identifier = parameters.identifier;
    if (typeof parameters.stringProperty === "undefined") {
      this.stringProperty = [];
    } else if (Array.isArray(parameters.stringProperty)) {
      this.stringProperty = parameters.stringProperty;
    } else {
      this.stringProperty = parameters.stringProperty; // never
    }
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
    return purifyHelpers.Equatable.objectEquals(this, other, {
      identifier: purifyHelpers.Equatable.booleanEquals,
      stringProperty: (left, right) =>
        purifyHelpers.Arrays.equals(
          left,
          right,
          purifyHelpers.Equatable.strictEquals,
        ),
      type: purifyHelpers.Equatable.strictEquals,
    });
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(hasher: HasherT): HasherT {
    return Sha256IriNodeShape.hash(this, hasher);
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
}

export namespace Sha256IriNodeShape {
  export function fromRdf(
    _resource: rdfjsResource.Resource<rdfjs.NamedNode>,
    _options?: { ignoreRdfType?: boolean },
  ): purify.Either<rdfjsResource.Resource.ValueError, Sha256IriNodeShape> {
    const identifier = _resource.identifier;
    const _stringPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly string[]
    > = purify.Either.of([
      ..._resource
        .values(dataFactory.namedNode("http://example.com/stringProperty"), {
          unique: true,
        })
        .flatMap((_value) =>
          _value
            .toValues()
            .head()
            .chain((_value) => _value.toString())
            .toMaybe()
            .toList(),
        ),
    ]);
    if (_stringPropertyEither.isLeft()) {
      return _stringPropertyEither;
    }

    const stringProperty = _stringPropertyEither.unsafeCoerce();
    return purify.Either.of(
      new Sha256IriNodeShape({ identifier, stringProperty }),
    );
  }

  export function hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(
    sha256IriNodeShape: Omit<
      Sha256IriNodeShape,
      "equals" | "hash" | "identifier" | "toRdf" | "type"
    >,
    _hasher: HasherT,
  ): HasherT {
    for (const _element of sha256IriNodeShape.stringProperty) {
      _hasher.update(_element);
    }

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
            dataFactory.namedNode("http://example.com/stringProperty"),
            this.variable("StringProperty"),
          ),
        ),
      );
    }
  }
}

export class UuidV4IriNodeShape {
  private _identifier: rdfjs.NamedNode | undefined;
  readonly stringProperty: readonly string[];
  readonly type = "UuidV4IriNodeShape" as const;

  constructor(parameters: {
    readonly identifier?: rdfjs.NamedNode;
    readonly stringProperty?: readonly string[];
  }) {
    this._identifier = parameters.identifier;
    if (typeof parameters.stringProperty === "undefined") {
      this.stringProperty = [];
    } else if (Array.isArray(parameters.stringProperty)) {
      this.stringProperty = parameters.stringProperty;
    } else {
      this.stringProperty = parameters.stringProperty; // never
    }
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
    return purifyHelpers.Equatable.objectEquals(this, other, {
      identifier: purifyHelpers.Equatable.booleanEquals,
      stringProperty: (left, right) =>
        purifyHelpers.Arrays.equals(
          left,
          right,
          purifyHelpers.Equatable.strictEquals,
        ),
      type: purifyHelpers.Equatable.strictEquals,
    });
  }

  hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(hasher: HasherT): HasherT {
    return UuidV4IriNodeShape.hash(this, hasher);
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
}

export namespace UuidV4IriNodeShape {
  export function fromRdf(
    _resource: rdfjsResource.Resource<rdfjs.NamedNode>,
    _options?: { ignoreRdfType?: boolean },
  ): purify.Either<rdfjsResource.Resource.ValueError, UuidV4IriNodeShape> {
    const identifier = _resource.identifier;
    const _stringPropertyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly string[]
    > = purify.Either.of([
      ..._resource
        .values(dataFactory.namedNode("http://example.com/stringProperty"), {
          unique: true,
        })
        .flatMap((_value) =>
          _value
            .toValues()
            .head()
            .chain((_value) => _value.toString())
            .toMaybe()
            .toList(),
        ),
    ]);
    if (_stringPropertyEither.isLeft()) {
      return _stringPropertyEither;
    }

    const stringProperty = _stringPropertyEither.unsafeCoerce();
    return purify.Either.of(
      new UuidV4IriNodeShape({ identifier, stringProperty }),
    );
  }

  export function hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(
    uuidV4IriNodeShape: Omit<
      UuidV4IriNodeShape,
      "equals" | "hash" | "identifier" | "toRdf" | "type"
    >,
    _hasher: HasherT,
  ): HasherT {
    for (const _element of uuidV4IriNodeShape.stringProperty) {
      _hasher.update(_element);
    }

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
            dataFactory.namedNode("http://example.com/stringProperty"),
            this.variable("StringProperty"),
          ),
        ),
      );
    }
  }
}

export type OrNodeShape = OrNodeShapeMember1 | OrNodeShapeMember2;

export namespace OrNodeShape {
  export function equals(
    left: OrNodeShape,
    right: OrNodeShape,
  ): purifyHelpers.Equatable.EqualsResult {
    return purifyHelpers.Equatable.objectEquals(left, right, {
      type: purifyHelpers.Equatable.strictEquals,
    }).chain(() => {
      switch (left.type) {
        case "OrNodeShapeMember1":
          return left.equals(right as unknown as OrNodeShapeMember1);
        case "OrNodeShapeMember2":
          return left.equals(right as unknown as OrNodeShapeMember2);
      }
    });
  }

  export function fromRdf(
    _resource: rdfjsResource.Resource,
    _options?: { ignoreRdfType?: boolean },
  ): purify.Either<rdfjsResource.Resource.ValueError, OrNodeShape> {
    return (
      OrNodeShapeMember1.fromRdf(_resource, _options) as purify.Either<
        rdfjsResource.Resource.ValueError,
        OrNodeShape
      >
    ).altLazy(
      () =>
        OrNodeShapeMember2.fromRdf(_resource, _options) as purify.Either<
          rdfjsResource.Resource.ValueError,
          OrNodeShape
        >,
    );
  }

  export function hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(orNodeShape: OrNodeShape, _hasher: HasherT): HasherT {
    switch (orNodeShape.type) {
      case "OrNodeShapeMember1":
        return orNodeShape.hash(_hasher);
      case "OrNodeShapeMember2":
        return orNodeShape.hash(_hasher);
    }
  }

  export class SparqlGraphPatterns extends sparqlBuilder.ResourceGraphPatterns {
    constructor(subject: sparqlBuilder.ResourceGraphPatterns.SubjectParameter) {
      super(subject);
      this.add(
        sparqlBuilder.GraphPattern.union(
          new OrNodeShapeMember1.SparqlGraphPatterns(
            this.subject,
          ).toGroupGraphPattern(),
          new OrNodeShapeMember2.SparqlGraphPatterns(
            this.subject,
          ).toGroupGraphPattern(),
        ),
      );
    }
  }

  export function toRdf(
    orNodeShape: OrNodeShape,
    _parameters: {
      mutateGraph: rdfjsResource.MutableResource.MutateGraph;
      resourceSet: rdfjsResource.MutableResourceSet;
    },
  ): rdfjsResource.MutableResource {
    switch (orNodeShape.type) {
      case "OrNodeShapeMember1":
        return orNodeShape.toRdf(_parameters);
      case "OrNodeShapeMember2":
        return orNodeShape.toRdf(_parameters);
    }
  }
}
