import type * as rdfjs from "@rdfjs/types";
import { PropertyPath } from "@shaclmate/shacl-ast/PropertyPath.js";
import { DataFactory as dataFactory } from "n3";
import * as purify from "purify-ts";
import * as rdfjsResource from "rdfjs-resource";
export interface BaseShaclCoreShape {
  readonly and: purify.Maybe<
    purify.NonEmptyList<readonly (rdfjs.BlankNode | rdfjs.NamedNode)[]>
  >;
  readonly classes: purify.Maybe<purify.NonEmptyList<rdfjs.NamedNode>>;
  readonly comments: purify.Maybe<purify.NonEmptyList<rdfjs.Literal>>;
  readonly datatype: purify.Maybe<rdfjs.NamedNode>;
  readonly deactivated: purify.Maybe<boolean>;
  readonly flags: purify.Maybe<purify.NonEmptyList<string>>;
  readonly hasValues: purify.Maybe<
    purify.NonEmptyList<rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal>
  >;
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  readonly in_: purify.Maybe<
    readonly (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)[]
  >;
  readonly isDefinedBy: purify.Maybe<rdfjs.BlankNode | rdfjs.NamedNode>;
  readonly labels: purify.Maybe<purify.NonEmptyList<rdfjs.Literal>>;
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
  readonly nodes: purify.Maybe<
    purify.NonEmptyList<rdfjs.BlankNode | rdfjs.NamedNode>
  >;
  readonly not: purify.Maybe<
    purify.NonEmptyList<rdfjs.BlankNode | rdfjs.NamedNode>
  >;
  readonly or: purify.Maybe<
    purify.NonEmptyList<readonly (rdfjs.BlankNode | rdfjs.NamedNode)[]>
  >;
  readonly patterns: purify.Maybe<purify.NonEmptyList<string>>;
  readonly type: "ShaclCoreNodeShape" | "ShaclCorePropertyShape";
  readonly xone: purify.Maybe<
    purify.NonEmptyList<readonly (rdfjs.BlankNode | rdfjs.NamedNode)[]>
  >;
}

export namespace BaseShaclCoreShape {
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
    {
      and: purify.Maybe<
        purify.NonEmptyList<readonly (rdfjs.BlankNode | rdfjs.NamedNode)[]>
      >;
      classes: purify.Maybe<purify.NonEmptyList<rdfjs.NamedNode>>;
      comments: purify.Maybe<purify.NonEmptyList<rdfjs.Literal>>;
      datatype: purify.Maybe<rdfjs.NamedNode>;
      deactivated: purify.Maybe<boolean>;
      flags: purify.Maybe<purify.NonEmptyList<string>>;
      hasValues: purify.Maybe<
        purify.NonEmptyList<rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal>
      >;
      identifier: rdfjs.BlankNode | rdfjs.NamedNode;
      in_: purify.Maybe<
        readonly (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)[]
      >;
      isDefinedBy: purify.Maybe<rdfjs.BlankNode | rdfjs.NamedNode>;
      labels: purify.Maybe<purify.NonEmptyList<rdfjs.Literal>>;
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
      nodes: purify.Maybe<
        purify.NonEmptyList<rdfjs.BlankNode | rdfjs.NamedNode>
      >;
      not: purify.Maybe<purify.NonEmptyList<rdfjs.BlankNode | rdfjs.NamedNode>>;
      or: purify.Maybe<
        purify.NonEmptyList<readonly (rdfjs.BlankNode | rdfjs.NamedNode)[]>
      >;
      patterns: purify.Maybe<purify.NonEmptyList<string>>;
      xone: purify.Maybe<
        purify.NonEmptyList<readonly (rdfjs.BlankNode | rdfjs.NamedNode)[]>
      >;
    }
  > {
    const _andEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<
        purify.NonEmptyList<readonly (rdfjs.BlankNode | rdfjs.NamedNode)[]>
      >
    > = purify.Either.of(
      purify.NonEmptyList.fromArray([
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
      ]),
    );
    if (_andEither.isLeft()) {
      return _andEither;
    }

    const and = _andEither.unsafeCoerce();
    const _classesEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<purify.NonEmptyList<rdfjs.NamedNode>>
    > = purify.Either.of(
      purify.NonEmptyList.fromArray([
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
      ]),
    );
    if (_classesEither.isLeft()) {
      return _classesEither;
    }

    const classes = _classesEither.unsafeCoerce();
    const _commentsEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<purify.NonEmptyList<rdfjs.Literal>>
    > = purify.Either.of(
      purify.NonEmptyList.fromArray([
        ..._resource
          .values(
            dataFactory.namedNode(
              "http://www.w3.org/2000/01/rdf-schema#comment",
            ),
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
      ]),
    );
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
      purify.Maybe<purify.NonEmptyList<string>>
    > = purify.Either.of(
      purify.NonEmptyList.fromArray([
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
      ]),
    );
    if (_flagsEither.isLeft()) {
      return _flagsEither;
    }

    const flags = _flagsEither.unsafeCoerce();
    const _hasValuesEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<
        purify.NonEmptyList<rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal>
      >
    > = purify.Either.of(
      purify.NonEmptyList.fromArray([
        ..._resource
          .values(
            dataFactory.namedNode("http://www.w3.org/ns/shacl#hasValue"),
            { unique: true },
          )
          .flatMap((_item) =>
            _item
              .toValues()
              .head()
              .chain((_value) => purify.Either.of(_value.toTerm()))
              .toMaybe()
              .toList(),
          ),
      ]),
    );
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
      purify.Maybe<purify.NonEmptyList<rdfjs.Literal>>
    > = purify.Either.of(
      purify.NonEmptyList.fromArray([
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
      ]),
    );
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
      purify.Maybe<purify.NonEmptyList<rdfjs.BlankNode | rdfjs.NamedNode>>
    > = purify.Either.of(
      purify.NonEmptyList.fromArray([
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
      ]),
    );
    if (_nodesEither.isLeft()) {
      return _nodesEither;
    }

    const nodes = _nodesEither.unsafeCoerce();
    const _notEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<purify.NonEmptyList<rdfjs.BlankNode | rdfjs.NamedNode>>
    > = purify.Either.of(
      purify.NonEmptyList.fromArray([
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
      ]),
    );
    if (_notEither.isLeft()) {
      return _notEither;
    }

    const not = _notEither.unsafeCoerce();
    const _orEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<
        purify.NonEmptyList<readonly (rdfjs.BlankNode | rdfjs.NamedNode)[]>
      >
    > = purify.Either.of(
      purify.NonEmptyList.fromArray([
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
      ]),
    );
    if (_orEither.isLeft()) {
      return _orEither;
    }

    const or = _orEither.unsafeCoerce();
    const _patternsEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<purify.NonEmptyList<string>>
    > = purify.Either.of(
      purify.NonEmptyList.fromArray([
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
      ]),
    );
    if (_patternsEither.isLeft()) {
      return _patternsEither;
    }

    const patterns = _patternsEither.unsafeCoerce();
    const _xoneEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<
        purify.NonEmptyList<readonly (rdfjs.BlankNode | rdfjs.NamedNode)[]>
      >
    > = purify.Either.of(
      purify.NonEmptyList.fromArray([
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
      ]),
    );
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
  readonly descriptions: purify.Maybe<purify.NonEmptyList<rdfjs.Literal>>;
  readonly groups: purify.Maybe<
    purify.NonEmptyList<rdfjs.BlankNode | rdfjs.NamedNode>
  >;
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  readonly names: purify.Maybe<purify.NonEmptyList<rdfjs.Literal>>;
  readonly order: purify.Maybe<number>;
  readonly path: PropertyPath;
  readonly type: "ShaclCorePropertyShape";
  readonly uniqueLang: purify.Maybe<boolean>;
}

export namespace ShaclCorePropertyShape {
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
  }): purify.Either<rdfjsResource.Resource.ValueError, ShaclCorePropertyShape> {
    return BaseShaclCoreShape.fromRdf({
      ..._context,
      ignoreRdfType: true,
      languageIn: _languageIn,
      resource: _resource,
    }).chain((_super) => {
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
        purify.Maybe<purify.NonEmptyList<rdfjs.Literal>>
      > = purify.Either.of(
        purify.NonEmptyList.fromArray([
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
        ]),
      );
      if (_descriptionsEither.isLeft()) {
        return _descriptionsEither;
      }
      const descriptions = _descriptionsEither.unsafeCoerce();
      const _groupsEither: purify.Either<
        rdfjsResource.Resource.ValueError,
        purify.Maybe<purify.NonEmptyList<rdfjs.BlankNode | rdfjs.NamedNode>>
      > = purify.Either.of(
        purify.NonEmptyList.fromArray([
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
        ]),
      );
      if (_groupsEither.isLeft()) {
        return _groupsEither;
      }
      const groups = _groupsEither.unsafeCoerce();
      const identifier = _resource.identifier;
      const _namesEither: purify.Either<
        rdfjsResource.Resource.ValueError,
        purify.Maybe<purify.NonEmptyList<rdfjs.Literal>>
      > = purify.Either.of(
        purify.NonEmptyList.fromArray([
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
        ]),
      );
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
        and: _super.and,
        classes: _super.classes,
        comments: _super.comments,
        datatype: _super.datatype,
        deactivated: _super.deactivated,
        flags: _super.flags,
        hasValues: _super.hasValues,
        identifier,
        in_: _super.in_,
        isDefinedBy: _super.isDefinedBy,
        labels: _super.labels,
        languageIn: _super.languageIn,
        maxCount: _super.maxCount,
        maxExclusive: _super.maxExclusive,
        maxInclusive: _super.maxInclusive,
        maxLength: _super.maxLength,
        minCount: _super.minCount,
        minExclusive: _super.minExclusive,
        minInclusive: _super.minInclusive,
        minLength: _super.minLength,
        nodeKind: _super.nodeKind,
        nodes: _super.nodes,
        not: _super.not,
        or: _super.or,
        patterns: _super.patterns,
        xone: _super.xone,
        defaultValue,
        descriptions,
        groups,
        names,
        order,
        path,
        type,
        uniqueLang,
      });
    });
  }
}
export interface ShaclCorePropertyGroup {
  readonly comments: purify.Maybe<purify.NonEmptyList<rdfjs.Literal>>;
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  readonly labels: purify.Maybe<purify.NonEmptyList<rdfjs.Literal>>;
  readonly type: "ShaclCorePropertyGroup";
}

export namespace ShaclCorePropertyGroup {
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
  }): purify.Either<rdfjsResource.Resource.ValueError, ShaclCorePropertyGroup> {
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
      purify.Maybe<purify.NonEmptyList<rdfjs.Literal>>
    > = purify.Either.of(
      purify.NonEmptyList.fromArray([
        ..._resource
          .values(
            dataFactory.namedNode(
              "http://www.w3.org/2000/01/rdf-schema#comment",
            ),
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
      ]),
    );
    if (_commentsEither.isLeft()) {
      return _commentsEither;
    }

    const comments = _commentsEither.unsafeCoerce();
    const identifier = _resource.identifier;
    const _labelsEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.Maybe<purify.NonEmptyList<rdfjs.Literal>>
    > = purify.Either.of(
      purify.NonEmptyList.fromArray([
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
      ]),
    );
    if (_labelsEither.isLeft()) {
      return _labelsEither;
    }

    const labels = _labelsEither.unsafeCoerce();
    const type = "ShaclCorePropertyGroup" as const;
    return purify.Either.of({ comments, identifier, labels, type });
  }
}
export interface ShaclCoreNodeShape extends BaseShaclCoreShape {
  readonly closed: purify.Maybe<boolean>;
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  readonly ignoredProperties: purify.Maybe<readonly rdfjs.NamedNode[]>;
  readonly properties: purify.Maybe<
    purify.NonEmptyList<rdfjs.BlankNode | rdfjs.NamedNode>
  >;
  readonly type: "ShaclCoreNodeShape";
}

export namespace ShaclCoreNodeShape {
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
  }): purify.Either<rdfjsResource.Resource.ValueError, ShaclCoreNodeShape> {
    return BaseShaclCoreShape.fromRdf({
      ..._context,
      ignoreRdfType: true,
      languageIn: _languageIn,
      resource: _resource,
    }).chain((_super) => {
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
            dataFactory.namedNode(
              "http://www.w3.org/ns/shacl#ignoredProperties",
            ),
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
        purify.Maybe<purify.NonEmptyList<rdfjs.BlankNode | rdfjs.NamedNode>>
      > = purify.Either.of(
        purify.NonEmptyList.fromArray([
          ..._resource
            .values(
              dataFactory.namedNode("http://www.w3.org/ns/shacl#property"),
              { unique: true },
            )
            .flatMap((_item) =>
              _item
                .toValues()
                .head()
                .chain((_value) => _value.toIdentifier())
                .toMaybe()
                .toList(),
            ),
        ]),
      );
      if (_propertiesEither.isLeft()) {
        return _propertiesEither;
      }
      const properties = _propertiesEither.unsafeCoerce();
      const type = "ShaclCoreNodeShape" as const;
      return purify.Either.of({
        and: _super.and,
        classes: _super.classes,
        comments: _super.comments,
        datatype: _super.datatype,
        deactivated: _super.deactivated,
        flags: _super.flags,
        hasValues: _super.hasValues,
        identifier,
        in_: _super.in_,
        isDefinedBy: _super.isDefinedBy,
        labels: _super.labels,
        languageIn: _super.languageIn,
        maxCount: _super.maxCount,
        maxExclusive: _super.maxExclusive,
        maxInclusive: _super.maxInclusive,
        maxLength: _super.maxLength,
        minCount: _super.minCount,
        minExclusive: _super.minExclusive,
        minInclusive: _super.minInclusive,
        minLength: _super.minLength,
        nodeKind: _super.nodeKind,
        nodes: _super.nodes,
        not: _super.not,
        or: _super.or,
        patterns: _super.patterns,
        xone: _super.xone,
        closed,
        ignoredProperties,
        properties,
        type,
      });
    });
  }
}
export interface OwlOntology {
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  readonly labels: purify.Maybe<purify.NonEmptyList<rdfjs.Literal>>;
  readonly type: "OwlOntology";
}

export namespace OwlOntology {
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
  }): purify.Either<rdfjsResource.Resource.ValueError, OwlOntology> {
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
      purify.Maybe<purify.NonEmptyList<rdfjs.Literal>>
    > = purify.Either.of(
      purify.NonEmptyList.fromArray([
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
      ]),
    );
    if (_labelsEither.isLeft()) {
      return _labelsEither;
    }

    const labels = _labelsEither.unsafeCoerce();
    const type = "OwlOntology" as const;
    return purify.Either.of({ identifier, labels, type });
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
