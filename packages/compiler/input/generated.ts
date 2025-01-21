import type * as rdfjs from "@rdfjs/types";
import { PropertyPath } from "@shaclmate/shacl-ast/PropertyPath.js";
import { DataFactory as dataFactory } from "n3";
import * as purify from "purify-ts";
import type * as purifyHelpers from "purify-ts-helpers";
import * as rdfjsResource from "rdfjs-resource";
export interface BaseShaclCoreShape {
  readonly and: readonly (readonly (rdfjs.BlankNode | rdfjs.NamedNode)[])[];
  readonly classes: readonly rdfjs.NamedNode[];
  readonly comments: readonly rdfjs.Literal[];
  readonly datatype: purify.Maybe<rdfjs.NamedNode>;
  readonly deactivated: purify.Maybe<boolean>;
  readonly flags: readonly string[];
  readonly hasValues: readonly (
    | rdfjs.BlankNode
    | rdfjs.NamedNode
    | rdfjs.Literal
  )[];
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  readonly in_: purify.Maybe<
    readonly (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)[]
  >;
  readonly isDefinedBy: purify.Maybe<rdfjs.BlankNode | rdfjs.NamedNode>;
  readonly labels: readonly rdfjs.Literal[];
  readonly languageIn: purify.Maybe<readonly string[]>;
  readonly maxCount: purify.Maybe<number>;
  readonly maxExclusive: purify.Maybe<rdfjs.Literal>;
  readonly maxInclusive: purify.Maybe<rdfjs.Literal>;
  readonly maxLength: purify.Maybe<number>;
  readonly minCount: purify.Maybe<number>;
  readonly minExclusive: purify.Maybe<rdfjs.Literal>;
  readonly minInclusive: purify.Maybe<rdfjs.Literal>;
  readonly minLength: purify.Maybe<number>;
  readonly nodeKind: purify.Maybe<
    rdfjs.NamedNode<
      | "http://www.w3.org/ns/shacl#BlankNode"
      | "http://www.w3.org/ns/shacl#BlankNodeOrIRI"
      | "http://www.w3.org/ns/shacl#BlankNodeOrLiteral"
      | "http://www.w3.org/ns/shacl#IRI"
      | "http://www.w3.org/ns/shacl#IRIOrLiteral"
      | "http://www.w3.org/ns/shacl#Literal"
    >
  >;
  readonly nodes: readonly (rdfjs.BlankNode | rdfjs.NamedNode)[];
  readonly not: readonly (rdfjs.BlankNode | rdfjs.NamedNode)[];
  readonly or: readonly (readonly (rdfjs.BlankNode | rdfjs.NamedNode)[])[];
  readonly patterns: readonly string[];
  readonly type:
    | "ShaclCoreNodeShape"
    | "ShaclCorePropertyShape"
    | "ShaclmateNodeShape"
    | "ShaclmatePropertyShape";
  readonly xone: readonly (readonly (rdfjs.BlankNode | rdfjs.NamedNode)[])[];
}

export namespace BaseShaclCoreShape {
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
      and: readonly (readonly (rdfjs.BlankNode | rdfjs.NamedNode)[])[];
      classes: readonly rdfjs.NamedNode[];
      comments: readonly rdfjs.Literal[];
      datatype: purify.Maybe<rdfjs.NamedNode>;
      deactivated: purify.Maybe<boolean>;
      flags: readonly string[];
      hasValues: readonly (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)[];
      identifier: rdfjs.BlankNode | rdfjs.NamedNode;
      in_: purify.Maybe<
        readonly (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)[]
      >;
      isDefinedBy: purify.Maybe<rdfjs.BlankNode | rdfjs.NamedNode>;
      labels: readonly rdfjs.Literal[];
      languageIn: purify.Maybe<readonly string[]>;
      maxCount: purify.Maybe<number>;
      maxExclusive: purify.Maybe<rdfjs.Literal>;
      maxInclusive: purify.Maybe<rdfjs.Literal>;
      maxLength: purify.Maybe<number>;
      minCount: purify.Maybe<number>;
      minExclusive: purify.Maybe<rdfjs.Literal>;
      minInclusive: purify.Maybe<rdfjs.Literal>;
      minLength: purify.Maybe<number>;
      nodeKind: purify.Maybe<
        rdfjs.NamedNode<
          | "http://www.w3.org/ns/shacl#BlankNode"
          | "http://www.w3.org/ns/shacl#BlankNodeOrIRI"
          | "http://www.w3.org/ns/shacl#BlankNodeOrLiteral"
          | "http://www.w3.org/ns/shacl#IRI"
          | "http://www.w3.org/ns/shacl#IRIOrLiteral"
          | "http://www.w3.org/ns/shacl#Literal"
        >
      >;
      nodes: readonly (rdfjs.BlankNode | rdfjs.NamedNode)[];
      not: readonly (rdfjs.BlankNode | rdfjs.NamedNode)[];
      or: readonly (readonly (rdfjs.BlankNode | rdfjs.NamedNode)[])[];
      patterns: readonly string[];
      xone: readonly (readonly (rdfjs.BlankNode | rdfjs.NamedNode)[])[];
    }
  > {
    const _andEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly (readonly (rdfjs.BlankNode | rdfjs.NamedNode)[])[]
    > = purify.Either.of([
      ..._resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#and"), {
          unique: true,
        })
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((value) => value.toList())
            .map((values) =>
              values.flatMap((_value) =>
                _value
                  .toValues()
                  .head()
                  .chain((_value) => _value.toIdentifier())
                  .toMaybe()
                  .toList(),
              ),
            )
            .toMaybe()
            .toList(),
        ),
    ]);
    if (_andEither.isLeft()) {
      return _andEither;
    }

    const and = _andEither.unsafeCoerce();
    const _classesEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly rdfjs.NamedNode[]
    > = purify.Either.of([
      ..._resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#class"), {
          unique: true,
        })
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((_value) => _value.toIri())
            .toMaybe()
            .toList(),
        ),
    ]);
    if (_classesEither.isLeft()) {
      return _classesEither;
    }

    const classes = _classesEither.unsafeCoerce();
    const _commentsEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly rdfjs.Literal[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#comment"),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
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
    if (_commentsEither.isLeft()) {
      return _commentsEither;
    }

    const comments = _commentsEither.unsafeCoerce();
    const _datatypeEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<rdfjs.NamedNode>
    > = purify.Either.of(
      _resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#datatype"), {
          unique: true,
        })
        .head()
        .chain((_value) => _value.toIri())
        .toMaybe(),
    );
    if (_datatypeEither.isLeft()) {
      return _datatypeEither;
    }

    const datatype = _datatypeEither.unsafeCoerce();
    const _deactivatedEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<boolean>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode("http://www.w3.org/ns/shacl#deactivated"),
          { unique: true },
        )
        .head()
        .chain((_value) => _value.toBoolean())
        .toMaybe(),
    );
    if (_deactivatedEither.isLeft()) {
      return _deactivatedEither;
    }

    const deactivated = _deactivatedEither.unsafeCoerce();
    const _flagsEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly string[]
    > = purify.Either.of([
      ..._resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#flags"), {
          unique: true,
        })
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((_value) => _value.toString())
            .toMaybe()
            .toList(),
        ),
    ]);
    if (_flagsEither.isLeft()) {
      return _flagsEither;
    }

    const flags = _flagsEither.unsafeCoerce();
    const _hasValuesEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)[]
    > = purify.Either.of([
      ..._resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#hasValue"), {
          unique: true,
        })
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((_value) => purify.Either.of(_value.toTerm()))
            .toMaybe()
            .toList(),
        ),
    ]);
    if (_hasValuesEither.isLeft()) {
      return _hasValuesEither;
    }

    const hasValues = _hasValuesEither.unsafeCoerce();
    const identifier = _resource.identifier;
    const _in_Either: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<
        readonly (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)[]
      >
    > = purify.Either.of(
      _resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#in"), {
          unique: true,
        })
        .head()
        .chain((value) => value.toList())
        .map((values) =>
          values.flatMap((_value) =>
            _value
              .toValues()
              .head()
              .chain((_value) => purify.Either.of(_value.toTerm()))
              .toMaybe()
              .toList(),
          ),
        )
        .toMaybe(),
    );
    if (_in_Either.isLeft()) {
      return _in_Either;
    }

    const in_ = _in_Either.unsafeCoerce();
    const _isDefinedByEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<rdfjs.BlankNode | rdfjs.NamedNode>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode(
            "http://www.w3.org/2000/01/rdf-schema#isDefinedBy",
          ),
          { unique: true },
        )
        .head()
        .chain((_value) => _value.toIdentifier())
        .toMaybe(),
    );
    if (_isDefinedByEither.isLeft()) {
      return _isDefinedByEither;
    }

    const isDefinedBy = _isDefinedByEither.unsafeCoerce();
    const _labelsEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly rdfjs.Literal[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#label"),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
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
    if (_labelsEither.isLeft()) {
      return _labelsEither;
    }

    const labels = _labelsEither.unsafeCoerce();
    const _languageInEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<readonly string[]>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode("http://www.w3.org/ns/shacl#languageIn"),
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
    if (_languageInEither.isLeft()) {
      return _languageInEither;
    }

    const languageIn = _languageInEither.unsafeCoerce();
    const _maxCountEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<number>
    > = purify.Either.of(
      _resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#maxCount"), {
          unique: true,
        })
        .head()
        .chain((_value) => _value.toNumber())
        .toMaybe(),
    );
    if (_maxCountEither.isLeft()) {
      return _maxCountEither;
    }

    const maxCount = _maxCountEither.unsafeCoerce();
    const _maxExclusiveEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<rdfjs.Literal>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode("http://www.w3.org/ns/shacl#maxExclusive"),
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
    if (_maxExclusiveEither.isLeft()) {
      return _maxExclusiveEither;
    }

    const maxExclusive = _maxExclusiveEither.unsafeCoerce();
    const _maxInclusiveEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<rdfjs.Literal>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode("http://www.w3.org/ns/shacl#maxInclusive"),
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
    if (_maxInclusiveEither.isLeft()) {
      return _maxInclusiveEither;
    }

    const maxInclusive = _maxInclusiveEither.unsafeCoerce();
    const _maxLengthEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<number>
    > = purify.Either.of(
      _resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#maxLength"), {
          unique: true,
        })
        .head()
        .chain((_value) => _value.toNumber())
        .toMaybe(),
    );
    if (_maxLengthEither.isLeft()) {
      return _maxLengthEither;
    }

    const maxLength = _maxLengthEither.unsafeCoerce();
    const _minCountEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<number>
    > = purify.Either.of(
      _resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#minCount"), {
          unique: true,
        })
        .head()
        .chain((_value) => _value.toNumber())
        .toMaybe(),
    );
    if (_minCountEither.isLeft()) {
      return _minCountEither;
    }

    const minCount = _minCountEither.unsafeCoerce();
    const _minExclusiveEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<rdfjs.Literal>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode("http://www.w3.org/ns/shacl#minExclusive"),
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
    if (_minExclusiveEither.isLeft()) {
      return _minExclusiveEither;
    }

    const minExclusive = _minExclusiveEither.unsafeCoerce();
    const _minInclusiveEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<rdfjs.Literal>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode("http://www.w3.org/ns/shacl#minInclusive"),
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
    if (_minInclusiveEither.isLeft()) {
      return _minInclusiveEither;
    }

    const minInclusive = _minInclusiveEither.unsafeCoerce();
    const _minLengthEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<number>
    > = purify.Either.of(
      _resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#minLength"), {
          unique: true,
        })
        .head()
        .chain((_value) => _value.toNumber())
        .toMaybe(),
    );
    if (_minLengthEither.isLeft()) {
      return _minLengthEither;
    }

    const minLength = _minLengthEither.unsafeCoerce();
    const _nodeKindEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<
        rdfjs.NamedNode<
          | "http://www.w3.org/ns/shacl#BlankNode"
          | "http://www.w3.org/ns/shacl#BlankNodeOrIRI"
          | "http://www.w3.org/ns/shacl#BlankNodeOrLiteral"
          | "http://www.w3.org/ns/shacl#IRI"
          | "http://www.w3.org/ns/shacl#IRIOrLiteral"
          | "http://www.w3.org/ns/shacl#Literal"
        >
      >
    > = purify.Either.of(
      _resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#nodeKind"), {
          unique: true,
        })
        .head()
        .chain((_value) =>
          _value.toIri().chain((iri) => {
            switch (iri.value) {
              case "http://www.w3.org/ns/shacl#BlankNode":
                return purify.Either.of<
                  rdfjsResource.Resource.ValueError,
                  rdfjs.NamedNode<
                    | "http://www.w3.org/ns/shacl#BlankNode"
                    | "http://www.w3.org/ns/shacl#BlankNodeOrIRI"
                    | "http://www.w3.org/ns/shacl#BlankNodeOrLiteral"
                    | "http://www.w3.org/ns/shacl#IRI"
                    | "http://www.w3.org/ns/shacl#IRIOrLiteral"
                    | "http://www.w3.org/ns/shacl#Literal"
                  >
                >(
                  iri as rdfjs.NamedNode<"http://www.w3.org/ns/shacl#BlankNode">,
                );
              case "http://www.w3.org/ns/shacl#BlankNodeOrIRI":
                return purify.Either.of<
                  rdfjsResource.Resource.ValueError,
                  rdfjs.NamedNode<
                    | "http://www.w3.org/ns/shacl#BlankNode"
                    | "http://www.w3.org/ns/shacl#BlankNodeOrIRI"
                    | "http://www.w3.org/ns/shacl#BlankNodeOrLiteral"
                    | "http://www.w3.org/ns/shacl#IRI"
                    | "http://www.w3.org/ns/shacl#IRIOrLiteral"
                    | "http://www.w3.org/ns/shacl#Literal"
                  >
                >(
                  iri as rdfjs.NamedNode<"http://www.w3.org/ns/shacl#BlankNodeOrIRI">,
                );
              case "http://www.w3.org/ns/shacl#BlankNodeOrLiteral":
                return purify.Either.of<
                  rdfjsResource.Resource.ValueError,
                  rdfjs.NamedNode<
                    | "http://www.w3.org/ns/shacl#BlankNode"
                    | "http://www.w3.org/ns/shacl#BlankNodeOrIRI"
                    | "http://www.w3.org/ns/shacl#BlankNodeOrLiteral"
                    | "http://www.w3.org/ns/shacl#IRI"
                    | "http://www.w3.org/ns/shacl#IRIOrLiteral"
                    | "http://www.w3.org/ns/shacl#Literal"
                  >
                >(
                  iri as rdfjs.NamedNode<"http://www.w3.org/ns/shacl#BlankNodeOrLiteral">,
                );
              case "http://www.w3.org/ns/shacl#IRI":
                return purify.Either.of<
                  rdfjsResource.Resource.ValueError,
                  rdfjs.NamedNode<
                    | "http://www.w3.org/ns/shacl#BlankNode"
                    | "http://www.w3.org/ns/shacl#BlankNodeOrIRI"
                    | "http://www.w3.org/ns/shacl#BlankNodeOrLiteral"
                    | "http://www.w3.org/ns/shacl#IRI"
                    | "http://www.w3.org/ns/shacl#IRIOrLiteral"
                    | "http://www.w3.org/ns/shacl#Literal"
                  >
                >(iri as rdfjs.NamedNode<"http://www.w3.org/ns/shacl#IRI">);
              case "http://www.w3.org/ns/shacl#IRIOrLiteral":
                return purify.Either.of<
                  rdfjsResource.Resource.ValueError,
                  rdfjs.NamedNode<
                    | "http://www.w3.org/ns/shacl#BlankNode"
                    | "http://www.w3.org/ns/shacl#BlankNodeOrIRI"
                    | "http://www.w3.org/ns/shacl#BlankNodeOrLiteral"
                    | "http://www.w3.org/ns/shacl#IRI"
                    | "http://www.w3.org/ns/shacl#IRIOrLiteral"
                    | "http://www.w3.org/ns/shacl#Literal"
                  >
                >(
                  iri as rdfjs.NamedNode<"http://www.w3.org/ns/shacl#IRIOrLiteral">,
                );
              case "http://www.w3.org/ns/shacl#Literal":
                return purify.Either.of<
                  rdfjsResource.Resource.ValueError,
                  rdfjs.NamedNode<
                    | "http://www.w3.org/ns/shacl#BlankNode"
                    | "http://www.w3.org/ns/shacl#BlankNodeOrIRI"
                    | "http://www.w3.org/ns/shacl#BlankNodeOrLiteral"
                    | "http://www.w3.org/ns/shacl#IRI"
                    | "http://www.w3.org/ns/shacl#IRIOrLiteral"
                    | "http://www.w3.org/ns/shacl#Literal"
                  >
                >(iri as rdfjs.NamedNode<"http://www.w3.org/ns/shacl#Literal">);
              default:
                return purify.Left(
                  new rdfjsResource.Resource.MistypedValueError({
                    actualValue: iri,
                    expectedValueType:
                      'rdfjs.NamedNode<"http://www.w3.org/ns/shacl#BlankNode" | "http://www.w3.org/ns/shacl#BlankNodeOrIRI" | "http://www.w3.org/ns/shacl#BlankNodeOrLiteral" | "http://www.w3.org/ns/shacl#IRI" | "http://www.w3.org/ns/shacl#IRIOrLiteral" | "http://www.w3.org/ns/shacl#Literal">',
                    focusResource: _resource,
                    predicate: dataFactory.namedNode(
                      "http://www.w3.org/ns/shacl#nodeKind",
                    ),
                  }),
                );
            }
          }),
        )
        .toMaybe(),
    );
    if (_nodeKindEither.isLeft()) {
      return _nodeKindEither;
    }

    const nodeKind = _nodeKindEither.unsafeCoerce();
    const _nodesEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly (rdfjs.BlankNode | rdfjs.NamedNode)[]
    > = purify.Either.of([
      ..._resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#node"), {
          unique: true,
        })
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((_value) => _value.toIdentifier())
            .toMaybe()
            .toList(),
        ),
    ]);
    if (_nodesEither.isLeft()) {
      return _nodesEither;
    }

    const nodes = _nodesEither.unsafeCoerce();
    const _notEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly (rdfjs.BlankNode | rdfjs.NamedNode)[]
    > = purify.Either.of([
      ..._resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#not"), {
          unique: true,
        })
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((_value) => _value.toIdentifier())
            .toMaybe()
            .toList(),
        ),
    ]);
    if (_notEither.isLeft()) {
      return _notEither;
    }

    const not = _notEither.unsafeCoerce();
    const _orEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly (readonly (rdfjs.BlankNode | rdfjs.NamedNode)[])[]
    > = purify.Either.of([
      ..._resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#or"), {
          unique: true,
        })
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((value) => value.toList())
            .map((values) =>
              values.flatMap((_value) =>
                _value
                  .toValues()
                  .head()
                  .chain((_value) => _value.toIdentifier())
                  .toMaybe()
                  .toList(),
              ),
            )
            .toMaybe()
            .toList(),
        ),
    ]);
    if (_orEither.isLeft()) {
      return _orEither;
    }

    const or = _orEither.unsafeCoerce();
    const _patternsEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly string[]
    > = purify.Either.of([
      ..._resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#pattern"), {
          unique: true,
        })
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((_value) => _value.toString())
            .toMaybe()
            .toList(),
        ),
    ]);
    if (_patternsEither.isLeft()) {
      return _patternsEither;
    }

    const patterns = _patternsEither.unsafeCoerce();
    const _xoneEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly (readonly (rdfjs.BlankNode | rdfjs.NamedNode)[])[]
    > = purify.Either.of([
      ..._resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#xone"), {
          unique: true,
        })
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((value) => value.toList())
            .map((values) =>
              values.flatMap((_value) =>
                _value
                  .toValues()
                  .head()
                  .chain((_value) => _value.toIdentifier())
                  .toMaybe()
                  .toList(),
              ),
            )
            .toMaybe()
            .toList(),
        ),
    ]);
    if (_xoneEither.isLeft()) {
      return _xoneEither;
    }

    const xone = _xoneEither.unsafeCoerce();
    return purify.Either.of({
      and,
      classes,
      comments,
      datatype,
      deactivated,
      flags,
      hasValues,
      identifier,
      in_,
      isDefinedBy,
      labels,
      languageIn,
      maxCount,
      maxExclusive,
      maxInclusive,
      maxLength,
      minCount,
      minExclusive,
      minInclusive,
      minLength,
      nodeKind,
      nodes,
      not,
      or,
      patterns,
      xone,
    });
  }
}
export interface ShaclCorePropertyShape extends BaseShaclCoreShape {
  readonly defaultValue: purify.Maybe<
    rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal
  >;
  readonly descriptions: readonly rdfjs.Literal[];
  readonly groups: readonly (rdfjs.BlankNode | rdfjs.NamedNode)[];
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  readonly names: readonly rdfjs.Literal[];
  readonly order: purify.Maybe<number>;
  readonly path: PropertyPath;
  readonly type: "ShaclCorePropertyShape" | "ShaclmatePropertyShape";
  readonly uniqueLang: purify.Maybe<boolean>;
}

export namespace ShaclCorePropertyShape {
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
      defaultValue: purify.Maybe<
        rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal
      >;
      descriptions: readonly rdfjs.Literal[];
      groups: readonly (rdfjs.BlankNode | rdfjs.NamedNode)[];
      identifier: rdfjs.BlankNode | rdfjs.NamedNode;
      names: readonly rdfjs.Literal[];
      order: purify.Maybe<number>;
      path: PropertyPath;
      type: "ShaclCorePropertyShape" | "ShaclmatePropertyShape";
      uniqueLang: purify.Maybe<boolean>;
    } & purifyHelpers.Eithers.UnwrapR<
      ReturnType<typeof BaseShaclCoreShape.propertiesFromRdf>
    >
  > {
    const _super0Either = BaseShaclCoreShape.propertiesFromRdf({
      ..._context,
      ignoreRdfType: true,
      languageIn: _languageIn,
      resource: _resource,
    });
    if (_super0Either.isLeft()) {
      return _super0Either;
    }

    const _super0 = _super0Either.unsafeCoerce();
    if (
      !_ignoreRdfType &&
      !_resource.isInstanceOf(
        dataFactory.namedNode("http://www.w3.org/ns/shacl#PropertyShape"),
      )
    ) {
      return purify.Left(
        new rdfjsResource.Resource.ValueError({
          focusResource: _resource,
          message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type`,
          predicate: dataFactory.namedNode(
            "http://www.w3.org/ns/shacl#PropertyShape",
          ),
        }),
      );
    }

    const _defaultValueEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode("http://www.w3.org/ns/shacl#defaultValue"),
          { unique: true },
        )
        .head()
        .chain((_value) => purify.Either.of(_value.toTerm()))
        .toMaybe(),
    );
    if (_defaultValueEither.isLeft()) {
      return _defaultValueEither;
    }

    const defaultValue = _defaultValueEither.unsafeCoerce();
    const _descriptionsEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly rdfjs.Literal[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode("http://www.w3.org/ns/shacl#description"),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
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
    if (_descriptionsEither.isLeft()) {
      return _descriptionsEither;
    }

    const descriptions = _descriptionsEither.unsafeCoerce();
    const _groupsEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly (rdfjs.BlankNode | rdfjs.NamedNode)[]
    > = purify.Either.of([
      ..._resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#group"), {
          unique: true,
        })
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((_value) => _value.toIdentifier())
            .toMaybe()
            .toList(),
        ),
    ]);
    if (_groupsEither.isLeft()) {
      return _groupsEither;
    }

    const groups = _groupsEither.unsafeCoerce();
    const identifier = _resource.identifier;
    const _namesEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly rdfjs.Literal[]
    > = purify.Either.of([
      ..._resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#name"), {
          unique: true,
        })
        .flatMap((_item) =>
          _item
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
    if (_namesEither.isLeft()) {
      return _namesEither;
    }

    const names = _namesEither.unsafeCoerce();
    const _orderEither: purify.Either<
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
    if (_orderEither.isLeft()) {
      return _orderEither;
    }

    const order = _orderEither.unsafeCoerce();
    const _pathEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      PropertyPath
    > = _resource
      .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#path"), {
        unique: true,
      })
      .head()
      .chain((value) => value.toResource())
      .chain((_resource) =>
        PropertyPath.fromRdf({
          ..._context,
          ignoreRdfType: true,
          languageIn: _languageIn,
          resource: _resource,
        }),
      );
    if (_pathEither.isLeft()) {
      return _pathEither;
    }

    const path = _pathEither.unsafeCoerce();
    const type = "ShaclCorePropertyShape" as const;
    const _uniqueLangEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<boolean>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode("http://www.w3.org/ns/shacl#uniqueLang"),
          { unique: true },
        )
        .head()
        .chain((_value) => _value.toBoolean())
        .toMaybe(),
    );
    if (_uniqueLangEither.isLeft()) {
      return _uniqueLangEither;
    }

    const uniqueLang = _uniqueLangEither.unsafeCoerce();
    return purify.Either.of({
      ..._super0,
      defaultValue,
      descriptions,
      groups,
      identifier,
      names,
      order,
      path,
      type,
      uniqueLang,
    });
  }

  export function fromRdf(
    parameters: Parameters<typeof ShaclCorePropertyShape.propertiesFromRdf>[0],
  ): purify.Either<rdfjsResource.Resource.ValueError, ShaclCorePropertyShape> {
    return ShaclCorePropertyShape.propertiesFromRdf(parameters);
  }
}
export interface ShaclmatePropertyShape extends ShaclCorePropertyShape {
  readonly extern: purify.Maybe<boolean>;
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  readonly mutable: purify.Maybe<boolean>;
  readonly name: purify.Maybe<string>;
  readonly type: "ShaclmatePropertyShape";
  readonly visibility: purify.Maybe<
    rdfjs.NamedNode<
      | "http://minorg.github.io/shaclmate/ns#_Visibility_Private"
      | "http://minorg.github.io/shaclmate/ns#_Visibility_Protected"
      | "http://minorg.github.io/shaclmate/ns#_Visibility_Public"
    >
  >;
}

export namespace ShaclmatePropertyShape {
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
      extern: purify.Maybe<boolean>;
      identifier: rdfjs.BlankNode | rdfjs.NamedNode;
      mutable: purify.Maybe<boolean>;
      name: purify.Maybe<string>;
      type: "ShaclmatePropertyShape";
      visibility: purify.Maybe<
        rdfjs.NamedNode<
          | "http://minorg.github.io/shaclmate/ns#_Visibility_Private"
          | "http://minorg.github.io/shaclmate/ns#_Visibility_Protected"
          | "http://minorg.github.io/shaclmate/ns#_Visibility_Public"
        >
      >;
    } & purifyHelpers.Eithers.UnwrapR<
      ReturnType<typeof ShaclCorePropertyShape.propertiesFromRdf>
    >
  > {
    const _super0Either = ShaclCorePropertyShape.propertiesFromRdf({
      ..._context,
      ignoreRdfType: true,
      languageIn: _languageIn,
      resource: _resource,
    });
    if (_super0Either.isLeft()) {
      return _super0Either;
    }

    const _super0 = _super0Either.unsafeCoerce();
    if (
      !_ignoreRdfType &&
      !_resource.isInstanceOf(
        dataFactory.namedNode("http://www.w3.org/ns/shacl#PropertyShape"),
      )
    ) {
      return purify.Left(
        new rdfjsResource.Resource.ValueError({
          focusResource: _resource,
          message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type`,
          predicate: dataFactory.namedNode(
            "http://www.w3.org/ns/shacl#PropertyShape",
          ),
        }),
      );
    }

    const _externEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<boolean>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode("http://minorg.github.io/shaclmate/ns#extern"),
          { unique: true },
        )
        .head()
        .chain((_value) => _value.toBoolean())
        .toMaybe(),
    );
    if (_externEither.isLeft()) {
      return _externEither;
    }

    const extern = _externEither.unsafeCoerce();
    const identifier = _resource.identifier;
    const _mutableEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<boolean>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode("http://minorg.github.io/shaclmate/ns#mutable"),
          { unique: true },
        )
        .head()
        .chain((_value) => _value.toBoolean())
        .toMaybe(),
    );
    if (_mutableEither.isLeft()) {
      return _mutableEither;
    }

    const mutable = _mutableEither.unsafeCoerce();
    const _nameEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<string>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode("http://minorg.github.io/shaclmate/ns#name"),
          { unique: true },
        )
        .head()
        .chain((_value) => _value.toString())
        .toMaybe(),
    );
    if (_nameEither.isLeft()) {
      return _nameEither;
    }

    const name = _nameEither.unsafeCoerce();
    const type = "ShaclmatePropertyShape" as const;
    const _visibilityEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<
        rdfjs.NamedNode<
          | "http://minorg.github.io/shaclmate/ns#_Visibility_Private"
          | "http://minorg.github.io/shaclmate/ns#_Visibility_Protected"
          | "http://minorg.github.io/shaclmate/ns#_Visibility_Public"
        >
      >
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode(
            "http://minorg.github.io/shaclmate/ns#visibility",
          ),
          { unique: true },
        )
        .head()
        .chain((_value) =>
          _value.toIri().chain((iri) => {
            switch (iri.value) {
              case "http://minorg.github.io/shaclmate/ns#_Visibility_Private":
                return purify.Either.of<
                  rdfjsResource.Resource.ValueError,
                  rdfjs.NamedNode<
                    | "http://minorg.github.io/shaclmate/ns#_Visibility_Private"
                    | "http://minorg.github.io/shaclmate/ns#_Visibility_Protected"
                    | "http://minorg.github.io/shaclmate/ns#_Visibility_Public"
                  >
                >(
                  iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_Visibility_Private">,
                );
              case "http://minorg.github.io/shaclmate/ns#_Visibility_Protected":
                return purify.Either.of<
                  rdfjsResource.Resource.ValueError,
                  rdfjs.NamedNode<
                    | "http://minorg.github.io/shaclmate/ns#_Visibility_Private"
                    | "http://minorg.github.io/shaclmate/ns#_Visibility_Protected"
                    | "http://minorg.github.io/shaclmate/ns#_Visibility_Public"
                  >
                >(
                  iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_Visibility_Protected">,
                );
              case "http://minorg.github.io/shaclmate/ns#_Visibility_Public":
                return purify.Either.of<
                  rdfjsResource.Resource.ValueError,
                  rdfjs.NamedNode<
                    | "http://minorg.github.io/shaclmate/ns#_Visibility_Private"
                    | "http://minorg.github.io/shaclmate/ns#_Visibility_Protected"
                    | "http://minorg.github.io/shaclmate/ns#_Visibility_Public"
                  >
                >(
                  iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_Visibility_Public">,
                );
              default:
                return purify.Left(
                  new rdfjsResource.Resource.MistypedValueError({
                    actualValue: iri,
                    expectedValueType:
                      'rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_Visibility_Private" | "http://minorg.github.io/shaclmate/ns#_Visibility_Protected" | "http://minorg.github.io/shaclmate/ns#_Visibility_Public">',
                    focusResource: _resource,
                    predicate: dataFactory.namedNode(
                      "http://minorg.github.io/shaclmate/ns#visibility",
                    ),
                  }),
                );
            }
          }),
        )
        .toMaybe(),
    );
    if (_visibilityEither.isLeft()) {
      return _visibilityEither;
    }

    const visibility = _visibilityEither.unsafeCoerce();
    return purify.Either.of({
      ..._super0,
      extern,
      identifier,
      mutable,
      name,
      type,
      visibility,
    });
  }

  export function fromRdf(
    parameters: Parameters<typeof ShaclmatePropertyShape.propertiesFromRdf>[0],
  ): purify.Either<rdfjsResource.Resource.ValueError, ShaclmatePropertyShape> {
    return ShaclmatePropertyShape.propertiesFromRdf(parameters);
  }
}
export interface OwlOntology {
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  readonly labels: readonly rdfjs.Literal[];
  readonly type: "OwlOntology" | "ShaclmateOntology";
}

export namespace OwlOntology {
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
      labels: readonly rdfjs.Literal[];
      type: "OwlOntology" | "ShaclmateOntology";
    }
  > {
    if (
      !_ignoreRdfType &&
      !_resource.isInstanceOf(
        dataFactory.namedNode("http://www.w3.org/2002/07/owl#Ontology"),
      )
    ) {
      return purify.Left(
        new rdfjsResource.Resource.ValueError({
          focusResource: _resource,
          message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type`,
          predicate: dataFactory.namedNode(
            "http://www.w3.org/2002/07/owl#Ontology",
          ),
        }),
      );
    }

    const identifier = _resource.identifier;
    const _labelsEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly rdfjs.Literal[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#label"),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
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
    if (_labelsEither.isLeft()) {
      return _labelsEither;
    }

    const labels = _labelsEither.unsafeCoerce();
    const type = "OwlOntology" as const;
    return purify.Either.of({ identifier, labels, type });
  }

  export function fromRdf(
    parameters: Parameters<typeof OwlOntology.propertiesFromRdf>[0],
  ): purify.Either<rdfjsResource.Resource.ValueError, OwlOntology> {
    return OwlOntology.propertiesFromRdf(parameters);
  }
}
export interface ShaclmateOntology extends OwlOntology {
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  readonly tsDataFactoryVariable: purify.Maybe<string>;
  readonly tsFeatureExcludes: readonly rdfjs.NamedNode<
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
  >[];
  readonly tsFeatureIncludes: readonly rdfjs.NamedNode<
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
  >[];
  readonly tsImports: readonly string[];
  readonly tsObjectDeclarationType: purify.Maybe<
    rdfjs.NamedNode<
      | "http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Class"
      | "http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Interface"
    >
  >;
  readonly tsObjectIdentifierPropertyName: purify.Maybe<string>;
  readonly tsObjectTypeDiscriminatorPropertyName: purify.Maybe<string>;
  readonly type: "ShaclmateOntology";
}

export namespace ShaclmateOntology {
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
      tsDataFactoryVariable: purify.Maybe<string>;
      tsFeatureExcludes: readonly rdfjs.NamedNode<
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
      >[];
      tsFeatureIncludes: readonly rdfjs.NamedNode<
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
      >[];
      tsImports: readonly string[];
      tsObjectDeclarationType: purify.Maybe<
        rdfjs.NamedNode<
          | "http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Class"
          | "http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Interface"
        >
      >;
      tsObjectIdentifierPropertyName: purify.Maybe<string>;
      tsObjectTypeDiscriminatorPropertyName: purify.Maybe<string>;
      type: "ShaclmateOntology";
    } & purifyHelpers.Eithers.UnwrapR<
      ReturnType<typeof OwlOntology.propertiesFromRdf>
    >
  > {
    const _super0Either = OwlOntology.propertiesFromRdf({
      ..._context,
      ignoreRdfType: true,
      languageIn: _languageIn,
      resource: _resource,
    });
    if (_super0Either.isLeft()) {
      return _super0Either;
    }

    const _super0 = _super0Either.unsafeCoerce();
    if (
      !_ignoreRdfType &&
      !_resource.isInstanceOf(
        dataFactory.namedNode("http://www.w3.org/2002/07/owl#Ontology"),
      )
    ) {
      return purify.Left(
        new rdfjsResource.Resource.ValueError({
          focusResource: _resource,
          message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type`,
          predicate: dataFactory.namedNode(
            "http://www.w3.org/2002/07/owl#Ontology",
          ),
        }),
      );
    }

    const identifier = _resource.identifier;
    const _tsDataFactoryVariableEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<string>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode(
            "http://minorg.github.io/shaclmate/ns#tsDataFactoryVariable",
          ),
          { unique: true },
        )
        .head()
        .chain((_value) => _value.toString())
        .toMaybe(),
    );
    if (_tsDataFactoryVariableEither.isLeft()) {
      return _tsDataFactoryVariableEither;
    }

    const tsDataFactoryVariable = _tsDataFactoryVariableEither.unsafeCoerce();
    const _tsFeatureExcludesEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly rdfjs.NamedNode<
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
      >[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode(
            "http://minorg.github.io/shaclmate/ns#tsFeatureExclude",
          ),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((_value) =>
              _value.toIri().chain((iri) => {
                switch (iri.value) {
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_Create":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_Create">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_Equals">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_Hash">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_Json":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_Json">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf">,
                    );
                  default:
                    return purify.Left(
                      new rdfjsResource.Resource.MistypedValueError({
                        actualValue: iri,
                        expectedValueType:
                          'rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_Create" | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals" | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson" | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf" | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash" | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json" | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema" | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema" | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf" | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql" | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson" | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf">',
                        focusResource: _resource,
                        predicate: dataFactory.namedNode(
                          "http://minorg.github.io/shaclmate/ns#tsFeatureExclude",
                        ),
                      }),
                    );
                }
              }),
            )
            .toMaybe()
            .toList(),
        ),
    ]);
    if (_tsFeatureExcludesEither.isLeft()) {
      return _tsFeatureExcludesEither;
    }

    const tsFeatureExcludes = _tsFeatureExcludesEither.unsafeCoerce();
    const _tsFeatureIncludesEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly rdfjs.NamedNode<
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
      >[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode(
            "http://minorg.github.io/shaclmate/ns#tsFeatureInclude",
          ),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((_value) =>
              _value.toIri().chain((iri) => {
                switch (iri.value) {
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_Create":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_Create">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_Equals">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_Json":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_Json">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_Hash">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf">,
                    );
                  default:
                    return purify.Left(
                      new rdfjsResource.Resource.MistypedValueError({
                        actualValue: iri,
                        expectedValueType:
                          'rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_Create" | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals" | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson" | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf" | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json" | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash" | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema" | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema" | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf" | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql" | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson" | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf">',
                        focusResource: _resource,
                        predicate: dataFactory.namedNode(
                          "http://minorg.github.io/shaclmate/ns#tsFeatureInclude",
                        ),
                      }),
                    );
                }
              }),
            )
            .toMaybe()
            .toList(),
        ),
    ]);
    if (_tsFeatureIncludesEither.isLeft()) {
      return _tsFeatureIncludesEither;
    }

    const tsFeatureIncludes = _tsFeatureIncludesEither.unsafeCoerce();
    const _tsImportsEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly string[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode(
            "http://minorg.github.io/shaclmate/ns#tsImport",
          ),
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
    if (_tsImportsEither.isLeft()) {
      return _tsImportsEither;
    }

    const tsImports = _tsImportsEither.unsafeCoerce();
    const _tsObjectDeclarationTypeEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<
        rdfjs.NamedNode<
          | "http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Class"
          | "http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Interface"
        >
      >
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode(
            "http://minorg.github.io/shaclmate/ns#tsObjectDeclarationType",
          ),
          { unique: true },
        )
        .head()
        .chain((_value) =>
          _value.toIri().chain((iri) => {
            switch (iri.value) {
              case "http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Class":
                return purify.Either.of<
                  rdfjsResource.Resource.ValueError,
                  rdfjs.NamedNode<
                    | "http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Class"
                    | "http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Interface"
                  >
                >(
                  iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Class">,
                );
              case "http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Interface":
                return purify.Either.of<
                  rdfjsResource.Resource.ValueError,
                  rdfjs.NamedNode<
                    | "http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Class"
                    | "http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Interface"
                  >
                >(
                  iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Interface">,
                );
              default:
                return purify.Left(
                  new rdfjsResource.Resource.MistypedValueError({
                    actualValue: iri,
                    expectedValueType:
                      'rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Class" | "http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Interface">',
                    focusResource: _resource,
                    predicate: dataFactory.namedNode(
                      "http://minorg.github.io/shaclmate/ns#tsObjectDeclarationType",
                    ),
                  }),
                );
            }
          }),
        )
        .toMaybe(),
    );
    if (_tsObjectDeclarationTypeEither.isLeft()) {
      return _tsObjectDeclarationTypeEither;
    }

    const tsObjectDeclarationType =
      _tsObjectDeclarationTypeEither.unsafeCoerce();
    const _tsObjectIdentifierPropertyNameEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<string>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode(
            "http://minorg.github.io/shaclmate/ns#tsObjectIdentifierPropertyName",
          ),
          { unique: true },
        )
        .head()
        .chain((_value) => _value.toString())
        .toMaybe(),
    );
    if (_tsObjectIdentifierPropertyNameEither.isLeft()) {
      return _tsObjectIdentifierPropertyNameEither;
    }

    const tsObjectIdentifierPropertyName =
      _tsObjectIdentifierPropertyNameEither.unsafeCoerce();
    const _tsObjectTypeDiscriminatorPropertyNameEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<string>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode(
            "http://minorg.github.io/shaclmate/ns#tsObjectTypeDiscriminatorPropertyName",
          ),
          { unique: true },
        )
        .head()
        .chain((_value) => _value.toString())
        .toMaybe(),
    );
    if (_tsObjectTypeDiscriminatorPropertyNameEither.isLeft()) {
      return _tsObjectTypeDiscriminatorPropertyNameEither;
    }

    const tsObjectTypeDiscriminatorPropertyName =
      _tsObjectTypeDiscriminatorPropertyNameEither.unsafeCoerce();
    const type = "ShaclmateOntology" as const;
    return purify.Either.of({
      ..._super0,
      identifier,
      tsDataFactoryVariable,
      tsFeatureExcludes,
      tsFeatureIncludes,
      tsImports,
      tsObjectDeclarationType,
      tsObjectIdentifierPropertyName,
      tsObjectTypeDiscriminatorPropertyName,
      type,
    });
  }

  export function fromRdf(
    parameters: Parameters<typeof ShaclmateOntology.propertiesFromRdf>[0],
  ): purify.Either<rdfjsResource.Resource.ValueError, ShaclmateOntology> {
    return ShaclmateOntology.propertiesFromRdf(parameters);
  }
}
export interface ShaclCoreNodeShape extends BaseShaclCoreShape {
  readonly closed: purify.Maybe<boolean>;
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  readonly ignoredProperties: purify.Maybe<readonly rdfjs.NamedNode[]>;
  readonly properties: readonly (rdfjs.BlankNode | rdfjs.NamedNode)[];
  readonly type: "ShaclCoreNodeShape" | "ShaclmateNodeShape";
}

export namespace ShaclCoreNodeShape {
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
      closed: purify.Maybe<boolean>;
      identifier: rdfjs.BlankNode | rdfjs.NamedNode;
      ignoredProperties: purify.Maybe<readonly rdfjs.NamedNode[]>;
      properties: readonly (rdfjs.BlankNode | rdfjs.NamedNode)[];
      type: "ShaclCoreNodeShape" | "ShaclmateNodeShape";
    } & purifyHelpers.Eithers.UnwrapR<
      ReturnType<typeof BaseShaclCoreShape.propertiesFromRdf>
    >
  > {
    const _super0Either = BaseShaclCoreShape.propertiesFromRdf({
      ..._context,
      ignoreRdfType: true,
      languageIn: _languageIn,
      resource: _resource,
    });
    if (_super0Either.isLeft()) {
      return _super0Either;
    }

    const _super0 = _super0Either.unsafeCoerce();
    if (
      !_ignoreRdfType &&
      !_resource.isInstanceOf(
        dataFactory.namedNode("http://www.w3.org/ns/shacl#NodeShape"),
      )
    ) {
      return purify.Left(
        new rdfjsResource.Resource.ValueError({
          focusResource: _resource,
          message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type`,
          predicate: dataFactory.namedNode(
            "http://www.w3.org/ns/shacl#NodeShape",
          ),
        }),
      );
    }

    const _closedEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<boolean>
    > = purify.Either.of(
      _resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#closed"), {
          unique: true,
        })
        .head()
        .chain((_value) => _value.toBoolean())
        .toMaybe(),
    );
    if (_closedEither.isLeft()) {
      return _closedEither;
    }

    const closed = _closedEither.unsafeCoerce();
    const identifier = _resource.identifier;
    const _ignoredPropertiesEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<readonly rdfjs.NamedNode[]>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode("http://www.w3.org/ns/shacl#ignoredProperties"),
          { unique: true },
        )
        .head()
        .chain((value) => value.toList())
        .map((values) =>
          values.flatMap((_value) =>
            _value
              .toValues()
              .head()
              .chain((_value) => _value.toIri())
              .toMaybe()
              .toList(),
          ),
        )
        .toMaybe(),
    );
    if (_ignoredPropertiesEither.isLeft()) {
      return _ignoredPropertiesEither;
    }

    const ignoredProperties = _ignoredPropertiesEither.unsafeCoerce();
    const _propertiesEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly (rdfjs.BlankNode | rdfjs.NamedNode)[]
    > = purify.Either.of([
      ..._resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#property"), {
          unique: true,
        })
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((_value) => _value.toIdentifier())
            .toMaybe()
            .toList(),
        ),
    ]);
    if (_propertiesEither.isLeft()) {
      return _propertiesEither;
    }

    const properties = _propertiesEither.unsafeCoerce();
    const type = "ShaclCoreNodeShape" as const;
    return purify.Either.of({
      ..._super0,
      closed,
      identifier,
      ignoredProperties,
      properties,
      type,
    });
  }

  export function fromRdf(
    parameters: Parameters<typeof ShaclCoreNodeShape.propertiesFromRdf>[0],
  ): purify.Either<rdfjsResource.Resource.ValueError, ShaclCoreNodeShape> {
    return ShaclCoreNodeShape.propertiesFromRdf(parameters);
  }
}
export interface ShaclmateNodeShape extends ShaclCoreNodeShape {
  readonly abstract: purify.Maybe<boolean>;
  readonly export_: purify.Maybe<boolean>;
  readonly extern: purify.Maybe<boolean>;
  readonly fromRdfType: purify.Maybe<rdfjs.NamedNode>;
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  readonly mintingStrategy: purify.Maybe<
    rdfjs.NamedNode<
      | "http://minorg.github.io/shaclmate/ns#_MintingStrategy_SHA256"
      | "http://minorg.github.io/shaclmate/ns#_MintingStrategy_UUIDv4"
    >
  >;
  readonly mutable: purify.Maybe<boolean>;
  readonly name: purify.Maybe<string>;
  readonly toRdfTypes: readonly rdfjs.NamedNode[];
  readonly tsFeatureExcludes: readonly rdfjs.NamedNode<
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
  >[];
  readonly tsFeatureIncludes: readonly rdfjs.NamedNode<
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
  >[];
  readonly tsImports: readonly string[];
  readonly tsObjectDeclarationType: purify.Maybe<
    rdfjs.NamedNode<
      | "http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Class"
      | "http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Interface"
    >
  >;
  readonly tsObjectIdentifierPropertyName: purify.Maybe<string>;
  readonly tsObjectTypeDiscriminatorPropertyName: purify.Maybe<string>;
  readonly type: "ShaclmateNodeShape";
}

export namespace ShaclmateNodeShape {
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
      abstract: purify.Maybe<boolean>;
      export_: purify.Maybe<boolean>;
      extern: purify.Maybe<boolean>;
      fromRdfType: purify.Maybe<rdfjs.NamedNode>;
      identifier: rdfjs.BlankNode | rdfjs.NamedNode;
      mintingStrategy: purify.Maybe<
        rdfjs.NamedNode<
          | "http://minorg.github.io/shaclmate/ns#_MintingStrategy_SHA256"
          | "http://minorg.github.io/shaclmate/ns#_MintingStrategy_UUIDv4"
        >
      >;
      mutable: purify.Maybe<boolean>;
      name: purify.Maybe<string>;
      toRdfTypes: readonly rdfjs.NamedNode[];
      tsFeatureExcludes: readonly rdfjs.NamedNode<
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
      >[];
      tsFeatureIncludes: readonly rdfjs.NamedNode<
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
      >[];
      tsImports: readonly string[];
      tsObjectDeclarationType: purify.Maybe<
        rdfjs.NamedNode<
          | "http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Class"
          | "http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Interface"
        >
      >;
      tsObjectIdentifierPropertyName: purify.Maybe<string>;
      tsObjectTypeDiscriminatorPropertyName: purify.Maybe<string>;
      type: "ShaclmateNodeShape";
    } & purifyHelpers.Eithers.UnwrapR<
      ReturnType<typeof ShaclCoreNodeShape.propertiesFromRdf>
    >
  > {
    const _super0Either = ShaclCoreNodeShape.propertiesFromRdf({
      ..._context,
      ignoreRdfType: true,
      languageIn: _languageIn,
      resource: _resource,
    });
    if (_super0Either.isLeft()) {
      return _super0Either;
    }

    const _super0 = _super0Either.unsafeCoerce();
    if (
      !_ignoreRdfType &&
      !_resource.isInstanceOf(
        dataFactory.namedNode("http://www.w3.org/ns/shacl#NodeShape"),
      )
    ) {
      return purify.Left(
        new rdfjsResource.Resource.ValueError({
          focusResource: _resource,
          message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type`,
          predicate: dataFactory.namedNode(
            "http://www.w3.org/ns/shacl#NodeShape",
          ),
        }),
      );
    }

    const _abstractEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<boolean>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode(
            "http://minorg.github.io/shaclmate/ns#abstract",
          ),
          { unique: true },
        )
        .head()
        .chain((_value) => _value.toBoolean())
        .toMaybe(),
    );
    if (_abstractEither.isLeft()) {
      return _abstractEither;
    }

    const abstract = _abstractEither.unsafeCoerce();
    const _export_Either: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<boolean>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode("http://minorg.github.io/shaclmate/ns#export"),
          { unique: true },
        )
        .head()
        .chain((_value) => _value.toBoolean())
        .toMaybe(),
    );
    if (_export_Either.isLeft()) {
      return _export_Either;
    }

    const export_ = _export_Either.unsafeCoerce();
    const _externEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<boolean>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode("http://minorg.github.io/shaclmate/ns#extern"),
          { unique: true },
        )
        .head()
        .chain((_value) => _value.toBoolean())
        .toMaybe(),
    );
    if (_externEither.isLeft()) {
      return _externEither;
    }

    const extern = _externEither.unsafeCoerce();
    const _fromRdfTypeEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<rdfjs.NamedNode>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode(
            "http://minorg.github.io/shaclmate/ns#fromRdfType",
          ),
          { unique: true },
        )
        .head()
        .chain((_value) => _value.toIri())
        .toMaybe(),
    );
    if (_fromRdfTypeEither.isLeft()) {
      return _fromRdfTypeEither;
    }

    const fromRdfType = _fromRdfTypeEither.unsafeCoerce();
    const identifier = _resource.identifier;
    const _mintingStrategyEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<
        rdfjs.NamedNode<
          | "http://minorg.github.io/shaclmate/ns#_MintingStrategy_SHA256"
          | "http://minorg.github.io/shaclmate/ns#_MintingStrategy_UUIDv4"
        >
      >
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode(
            "http://minorg.github.io/shaclmate/ns#mintingStrategy",
          ),
          { unique: true },
        )
        .head()
        .chain((_value) =>
          _value.toIri().chain((iri) => {
            switch (iri.value) {
              case "http://minorg.github.io/shaclmate/ns#_MintingStrategy_SHA256":
                return purify.Either.of<
                  rdfjsResource.Resource.ValueError,
                  rdfjs.NamedNode<
                    | "http://minorg.github.io/shaclmate/ns#_MintingStrategy_SHA256"
                    | "http://minorg.github.io/shaclmate/ns#_MintingStrategy_UUIDv4"
                  >
                >(
                  iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_MintingStrategy_SHA256">,
                );
              case "http://minorg.github.io/shaclmate/ns#_MintingStrategy_UUIDv4":
                return purify.Either.of<
                  rdfjsResource.Resource.ValueError,
                  rdfjs.NamedNode<
                    | "http://minorg.github.io/shaclmate/ns#_MintingStrategy_SHA256"
                    | "http://minorg.github.io/shaclmate/ns#_MintingStrategy_UUIDv4"
                  >
                >(
                  iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_MintingStrategy_UUIDv4">,
                );
              default:
                return purify.Left(
                  new rdfjsResource.Resource.MistypedValueError({
                    actualValue: iri,
                    expectedValueType:
                      'rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_MintingStrategy_SHA256" | "http://minorg.github.io/shaclmate/ns#_MintingStrategy_UUIDv4">',
                    focusResource: _resource,
                    predicate: dataFactory.namedNode(
                      "http://minorg.github.io/shaclmate/ns#mintingStrategy",
                    ),
                  }),
                );
            }
          }),
        )
        .toMaybe(),
    );
    if (_mintingStrategyEither.isLeft()) {
      return _mintingStrategyEither;
    }

    const mintingStrategy = _mintingStrategyEither.unsafeCoerce();
    const _mutableEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<boolean>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode("http://minorg.github.io/shaclmate/ns#mutable"),
          { unique: true },
        )
        .head()
        .chain((_value) => _value.toBoolean())
        .toMaybe(),
    );
    if (_mutableEither.isLeft()) {
      return _mutableEither;
    }

    const mutable = _mutableEither.unsafeCoerce();
    const _nameEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<string>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode("http://minorg.github.io/shaclmate/ns#name"),
          { unique: true },
        )
        .head()
        .chain((_value) => _value.toString())
        .toMaybe(),
    );
    if (_nameEither.isLeft()) {
      return _nameEither;
    }

    const name = _nameEither.unsafeCoerce();
    const _toRdfTypesEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly rdfjs.NamedNode[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode(
            "http://minorg.github.io/shaclmate/ns#toRdfType",
          ),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((_value) => _value.toIri())
            .toMaybe()
            .toList(),
        ),
    ]);
    if (_toRdfTypesEither.isLeft()) {
      return _toRdfTypesEither;
    }

    const toRdfTypes = _toRdfTypesEither.unsafeCoerce();
    const _tsFeatureExcludesEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly rdfjs.NamedNode<
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
      >[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode(
            "http://minorg.github.io/shaclmate/ns#tsFeatureExclude",
          ),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((_value) =>
              _value.toIri().chain((iri) => {
                switch (iri.value) {
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_Create":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_Create">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_Equals">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_Hash">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_Json":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_Json">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf">,
                    );
                  default:
                    return purify.Left(
                      new rdfjsResource.Resource.MistypedValueError({
                        actualValue: iri,
                        expectedValueType:
                          'rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_Create" | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals" | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson" | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf" | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash" | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json" | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema" | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema" | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf" | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql" | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson" | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf">',
                        focusResource: _resource,
                        predicate: dataFactory.namedNode(
                          "http://minorg.github.io/shaclmate/ns#tsFeatureExclude",
                        ),
                      }),
                    );
                }
              }),
            )
            .toMaybe()
            .toList(),
        ),
    ]);
    if (_tsFeatureExcludesEither.isLeft()) {
      return _tsFeatureExcludesEither;
    }

    const tsFeatureExcludes = _tsFeatureExcludesEither.unsafeCoerce();
    const _tsFeatureIncludesEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly rdfjs.NamedNode<
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
      >[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode(
            "http://minorg.github.io/shaclmate/ns#tsFeatureInclude",
          ),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((_value) =>
              _value.toIri().chain((iri) => {
                switch (iri.value) {
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_Create":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_Create">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_Equals">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_Json":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_Json">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_Hash">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson">,
                    );
                  case "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf":
                    return purify.Either.of<
                      rdfjsResource.Resource.ValueError,
                      rdfjs.NamedNode<
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
                        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
                      >
                    >(
                      iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf">,
                    );
                  default:
                    return purify.Left(
                      new rdfjsResource.Resource.MistypedValueError({
                        actualValue: iri,
                        expectedValueType:
                          'rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsFeature_Create" | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals" | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson" | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf" | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json" | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash" | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema" | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema" | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf" | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql" | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson" | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf">',
                        focusResource: _resource,
                        predicate: dataFactory.namedNode(
                          "http://minorg.github.io/shaclmate/ns#tsFeatureInclude",
                        ),
                      }),
                    );
                }
              }),
            )
            .toMaybe()
            .toList(),
        ),
    ]);
    if (_tsFeatureIncludesEither.isLeft()) {
      return _tsFeatureIncludesEither;
    }

    const tsFeatureIncludes = _tsFeatureIncludesEither.unsafeCoerce();
    const _tsImportsEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly string[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode(
            "http://minorg.github.io/shaclmate/ns#tsImport",
          ),
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
    if (_tsImportsEither.isLeft()) {
      return _tsImportsEither;
    }

    const tsImports = _tsImportsEither.unsafeCoerce();
    const _tsObjectDeclarationTypeEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<
        rdfjs.NamedNode<
          | "http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Class"
          | "http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Interface"
        >
      >
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode(
            "http://minorg.github.io/shaclmate/ns#tsObjectDeclarationType",
          ),
          { unique: true },
        )
        .head()
        .chain((_value) =>
          _value.toIri().chain((iri) => {
            switch (iri.value) {
              case "http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Class":
                return purify.Either.of<
                  rdfjsResource.Resource.ValueError,
                  rdfjs.NamedNode<
                    | "http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Class"
                    | "http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Interface"
                  >
                >(
                  iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Class">,
                );
              case "http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Interface":
                return purify.Either.of<
                  rdfjsResource.Resource.ValueError,
                  rdfjs.NamedNode<
                    | "http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Class"
                    | "http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Interface"
                  >
                >(
                  iri as rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Interface">,
                );
              default:
                return purify.Left(
                  new rdfjsResource.Resource.MistypedValueError({
                    actualValue: iri,
                    expectedValueType:
                      'rdfjs.NamedNode<"http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Class" | "http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Interface">',
                    focusResource: _resource,
                    predicate: dataFactory.namedNode(
                      "http://minorg.github.io/shaclmate/ns#tsObjectDeclarationType",
                    ),
                  }),
                );
            }
          }),
        )
        .toMaybe(),
    );
    if (_tsObjectDeclarationTypeEither.isLeft()) {
      return _tsObjectDeclarationTypeEither;
    }

    const tsObjectDeclarationType =
      _tsObjectDeclarationTypeEither.unsafeCoerce();
    const _tsObjectIdentifierPropertyNameEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<string>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode(
            "http://minorg.github.io/shaclmate/ns#tsObjectIdentifierPropertyName",
          ),
          { unique: true },
        )
        .head()
        .chain((_value) => _value.toString())
        .toMaybe(),
    );
    if (_tsObjectIdentifierPropertyNameEither.isLeft()) {
      return _tsObjectIdentifierPropertyNameEither;
    }

    const tsObjectIdentifierPropertyName =
      _tsObjectIdentifierPropertyNameEither.unsafeCoerce();
    const _tsObjectTypeDiscriminatorPropertyNameEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<string>
    > = purify.Either.of(
      _resource
        .values(
          dataFactory.namedNode(
            "http://minorg.github.io/shaclmate/ns#tsObjectTypeDiscriminatorPropertyName",
          ),
          { unique: true },
        )
        .head()
        .chain((_value) => _value.toString())
        .toMaybe(),
    );
    if (_tsObjectTypeDiscriminatorPropertyNameEither.isLeft()) {
      return _tsObjectTypeDiscriminatorPropertyNameEither;
    }

    const tsObjectTypeDiscriminatorPropertyName =
      _tsObjectTypeDiscriminatorPropertyNameEither.unsafeCoerce();
    const type = "ShaclmateNodeShape" as const;
    return purify.Either.of({
      ..._super0,
      abstract,
      export_,
      extern,
      fromRdfType,
      identifier,
      mintingStrategy,
      mutable,
      name,
      toRdfTypes,
      tsFeatureExcludes,
      tsFeatureIncludes,
      tsImports,
      tsObjectDeclarationType,
      tsObjectIdentifierPropertyName,
      tsObjectTypeDiscriminatorPropertyName,
      type,
    });
  }

  export function fromRdf(
    parameters: Parameters<typeof ShaclmateNodeShape.propertiesFromRdf>[0],
  ): purify.Either<rdfjsResource.Resource.ValueError, ShaclmateNodeShape> {
    return ShaclmateNodeShape.propertiesFromRdf(parameters);
  }
}
export interface ShaclCorePropertyGroup {
  readonly comments: readonly rdfjs.Literal[];
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  readonly labels: readonly rdfjs.Literal[];
  readonly type: "ShaclCorePropertyGroup";
}

export namespace ShaclCorePropertyGroup {
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
      comments: readonly rdfjs.Literal[];
      identifier: rdfjs.BlankNode | rdfjs.NamedNode;
      labels: readonly rdfjs.Literal[];
      type: "ShaclCorePropertyGroup";
    }
  > {
    if (
      !_ignoreRdfType &&
      !_resource.isInstanceOf(
        dataFactory.namedNode("http://www.w3.org/ns/shacl#PropertyGroup"),
      )
    ) {
      return purify.Left(
        new rdfjsResource.Resource.ValueError({
          focusResource: _resource,
          message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type`,
          predicate: dataFactory.namedNode(
            "http://www.w3.org/ns/shacl#PropertyGroup",
          ),
        }),
      );
    }

    const _commentsEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly rdfjs.Literal[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#comment"),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
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
    if (_commentsEither.isLeft()) {
      return _commentsEither;
    }

    const comments = _commentsEither.unsafeCoerce();
    const identifier = _resource.identifier;
    const _labelsEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly rdfjs.Literal[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#label"),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
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
    if (_labelsEither.isLeft()) {
      return _labelsEither;
    }

    const labels = _labelsEither.unsafeCoerce();
    const type = "ShaclCorePropertyGroup" as const;
    return purify.Either.of({ comments, identifier, labels, type });
  }

  export function fromRdf(
    parameters: Parameters<typeof ShaclCorePropertyGroup.propertiesFromRdf>[0],
  ): purify.Either<rdfjsResource.Resource.ValueError, ShaclCorePropertyGroup> {
    return ShaclCorePropertyGroup.propertiesFromRdf(parameters);
  }
}
export type ShaclCoreShape = ShaclCoreNodeShape | ShaclCorePropertyShape;

export namespace ShaclCoreShape {
  export function fromRdf(parameters: {
    [_index: string]: any;
    ignoreRdfType?: boolean;
    resource: rdfjsResource.Resource;
  }): purify.Either<rdfjsResource.Resource.ValueError, ShaclCoreShape> {
    return (
      ShaclCoreNodeShape.fromRdf(parameters) as purify.Either<
        rdfjsResource.Resource.ValueError,
        ShaclCoreShape
      >
    ).altLazy(
      () =>
        ShaclCorePropertyShape.fromRdf(parameters) as purify.Either<
          rdfjsResource.Resource.ValueError,
          ShaclCoreShape
        >,
    );
  }
}
export type ShaclmateShape = ShaclmateNodeShape | ShaclCorePropertyShape;

export namespace ShaclmateShape {
  export function fromRdf(parameters: {
    [_index: string]: any;
    ignoreRdfType?: boolean;
    resource: rdfjsResource.Resource;
  }): purify.Either<rdfjsResource.Resource.ValueError, ShaclmateShape> {
    return (
      ShaclmateNodeShape.fromRdf(parameters) as purify.Either<
        rdfjsResource.Resource.ValueError,
        ShaclmateShape
      >
    ).altLazy(
      () =>
        ShaclCorePropertyShape.fromRdf(parameters) as purify.Either<
          rdfjsResource.Resource.ValueError,
          ShaclmateShape
        >,
    );
  }
}
