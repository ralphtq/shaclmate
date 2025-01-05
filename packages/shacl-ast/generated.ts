import type * as rdfjs from "@rdfjs/types";
import { DataFactory as dataFactory } from "n3";
import * as purify from "purify-ts";
import * as rdfjsResource from "rdfjs-resource";
import { PropertyPath } from "./PropertyPath.js";
export interface CorePropertyGroup {
  readonly comments: readonly rdfjs.Literal[];
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  readonly labels: readonly rdfjs.Literal[];
  readonly type: "CorePropertyGroup";
}

export namespace CorePropertyGroup {
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
  }): purify.Either<rdfjsResource.Resource.ValueError, CorePropertyGroup> {
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
    if (_labelsEither.isLeft()) {
      return _labelsEither;
    }

    const labels = _labelsEither.unsafeCoerce();
    const type = "CorePropertyGroup" as const;
    return purify.Either.of({ comments, identifier, labels, type });
  }
}
export interface CorePropertyShape {
  readonly and: readonly (readonly (rdfjs.BlankNode | rdfjs.NamedNode)[])[];
  readonly classes: readonly (readonly rdfjs.NamedNode[])[];
  readonly comments: readonly rdfjs.Literal[];
  readonly datatype: purify.Maybe<rdfjs.NamedNode>;
  readonly defaultValue: purify.Maybe<
    rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal
  >;
  readonly descriptions: readonly rdfjs.Literal[];
  readonly groups: readonly (rdfjs.BlankNode | rdfjs.NamedNode)[];
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
  readonly minCount: purify.Maybe<number>;
  readonly minExclusive: purify.Maybe<rdfjs.Literal>;
  readonly minInclusive: purify.Maybe<rdfjs.Literal>;
  readonly names: readonly rdfjs.Literal[];
  readonly order: purify.Maybe<number>;
  readonly path: PropertyPath;
  readonly type: "CorePropertyShape";
}

export namespace CorePropertyShape {
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
  }): purify.Either<rdfjsResource.Resource.ValueError, CorePropertyShape> {
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

    const _andEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly (readonly (rdfjs.BlankNode | rdfjs.NamedNode)[])[]
    > = purify.Either.of([
      ..._resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#and"), {
          unique: true,
        })
        .flatMap((_value) =>
          _value
            .toValues()
            .head()
            .chain((value) =>
              value
                .toResource()
                .map((resource) =>
                  resource.isInstanceOf(
                    dataFactory.namedNode(
                      "http://minorg.github.io/shaclmate/ns#IdentifierList",
                    ),
                  ),
                )
                .orDefault(false)
                ? purify.Right<
                    rdfjsResource.Resource.Value,
                    rdfjsResource.Resource.ValueError
                  >(value)
                : purify.Left<
                    rdfjsResource.Resource.ValueError,
                    rdfjsResource.Resource.Value
                  >(
                    new rdfjsResource.Resource.ValueError({
                      focusResource: _resource,
                      message: "unexpected RDF type",
                      predicate: dataFactory.namedNode(
                        "http://minorg.github.io/shaclmate/ns#IdentifierList",
                      ),
                    }),
                  ),
            )
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
      readonly (readonly rdfjs.NamedNode[])[]
    > = purify.Either.of([
      ..._resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#class"), {
          unique: true,
        })
        .flatMap((_value) =>
          _value
            .toValues()
            .head()
            .chain((value) =>
              value
                .toResource()
                .map((resource) =>
                  resource.isInstanceOf(
                    dataFactory.namedNode(
                      "http://minorg.github.io/shaclmate/ns#IriList",
                    ),
                  ),
                )
                .orDefault(false)
                ? purify.Right<
                    rdfjsResource.Resource.Value,
                    rdfjsResource.Resource.ValueError
                  >(value)
                : purify.Left<
                    rdfjsResource.Resource.ValueError,
                    rdfjsResource.Resource.Value
                  >(
                    new rdfjsResource.Resource.ValueError({
                      focusResource: _resource,
                      message: "unexpected RDF type",
                      predicate: dataFactory.namedNode(
                        "http://minorg.github.io/shaclmate/ns#IriList",
                      ),
                    }),
                  ),
            )
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
        .flatMap((_value) =>
          _value
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
    const _hasValuesEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)[]
    > = purify.Either.of([
      ..._resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#hasValues"), {
          unique: true,
        })
        .flatMap((_value) =>
          _value
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
        .chain((value) =>
          value
            .toResource()
            .map((resource) =>
              resource.isInstanceOf(
                dataFactory.namedNode(
                  "http://minorg.github.io/shaclmate/ns#TermList",
                ),
              ),
            )
            .orDefault(false)
            ? purify.Right<
                rdfjsResource.Resource.Value,
                rdfjsResource.Resource.ValueError
              >(value)
            : purify.Left<
                rdfjsResource.Resource.ValueError,
                rdfjsResource.Resource.Value
              >(
                new rdfjsResource.Resource.ValueError({
                  focusResource: _resource,
                  message: "unexpected RDF type",
                  predicate: dataFactory.namedNode(
                    "http://minorg.github.io/shaclmate/ns#TermList",
                  ),
                }),
              ),
        )
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
        .chain((value) =>
          value
            .toResource()
            .map((resource) =>
              resource.isInstanceOf(
                dataFactory.namedNode(
                  "http://minorg.github.io/shaclmate/ns#StringList",
                ),
              ),
            )
            .orDefault(false)
            ? purify.Right<
                rdfjsResource.Resource.Value,
                rdfjsResource.Resource.ValueError
              >(value)
            : purify.Left<
                rdfjsResource.Resource.ValueError,
                rdfjsResource.Resource.Value
              >(
                new rdfjsResource.Resource.ValueError({
                  focusResource: _resource,
                  message: "unexpected RDF type",
                  predicate: dataFactory.namedNode(
                    "http://minorg.github.io/shaclmate/ns#StringList",
                  ),
                }),
              ),
        )
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
    const _namesEither: purify.Either<
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
    const type = "CorePropertyShape" as const;
    return purify.Either.of({
      and,
      classes,
      comments,
      datatype,
      defaultValue,
      descriptions,
      groups,
      hasValues,
      identifier,
      in_,
      isDefinedBy,
      labels,
      languageIn,
      maxCount,
      maxExclusive,
      maxInclusive,
      minCount,
      minExclusive,
      minInclusive,
      names,
      order,
      path,
      type,
    });
  }
}
export interface CoreNodeShape {
  readonly and: readonly (readonly (rdfjs.BlankNode | rdfjs.NamedNode)[])[];
  readonly classes: readonly (readonly rdfjs.NamedNode[])[];
  readonly closed: purify.Maybe<boolean>;
  readonly comments: readonly rdfjs.Literal[];
  readonly datatype: purify.Maybe<rdfjs.NamedNode>;
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
  readonly minCount: purify.Maybe<number>;
  readonly minExclusive: purify.Maybe<rdfjs.Literal>;
  readonly minInclusive: purify.Maybe<rdfjs.Literal>;
  readonly properties: readonly CorePropertyShape[];
  readonly type: "CoreNodeShape";
}

export namespace CoreNodeShape {
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
  }): purify.Either<rdfjsResource.Resource.ValueError, CoreNodeShape> {
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

    const _andEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly (readonly (rdfjs.BlankNode | rdfjs.NamedNode)[])[]
    > = purify.Either.of([
      ..._resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#and"), {
          unique: true,
        })
        .flatMap((_value) =>
          _value
            .toValues()
            .head()
            .chain((value) =>
              value
                .toResource()
                .map((resource) =>
                  resource.isInstanceOf(
                    dataFactory.namedNode(
                      "http://minorg.github.io/shaclmate/ns#IdentifierList",
                    ),
                  ),
                )
                .orDefault(false)
                ? purify.Right<
                    rdfjsResource.Resource.Value,
                    rdfjsResource.Resource.ValueError
                  >(value)
                : purify.Left<
                    rdfjsResource.Resource.ValueError,
                    rdfjsResource.Resource.Value
                  >(
                    new rdfjsResource.Resource.ValueError({
                      focusResource: _resource,
                      message: "unexpected RDF type",
                      predicate: dataFactory.namedNode(
                        "http://minorg.github.io/shaclmate/ns#IdentifierList",
                      ),
                    }),
                  ),
            )
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
      readonly (readonly rdfjs.NamedNode[])[]
    > = purify.Either.of([
      ..._resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#class"), {
          unique: true,
        })
        .flatMap((_value) =>
          _value
            .toValues()
            .head()
            .chain((value) =>
              value
                .toResource()
                .map((resource) =>
                  resource.isInstanceOf(
                    dataFactory.namedNode(
                      "http://minorg.github.io/shaclmate/ns#IriList",
                    ),
                  ),
                )
                .orDefault(false)
                ? purify.Right<
                    rdfjsResource.Resource.Value,
                    rdfjsResource.Resource.ValueError
                  >(value)
                : purify.Left<
                    rdfjsResource.Resource.ValueError,
                    rdfjsResource.Resource.Value
                  >(
                    new rdfjsResource.Resource.ValueError({
                      focusResource: _resource,
                      message: "unexpected RDF type",
                      predicate: dataFactory.namedNode(
                        "http://minorg.github.io/shaclmate/ns#IriList",
                      ),
                    }),
                  ),
            )
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
            .toMaybe()
            .toList(),
        ),
    ]);
    if (_classesEither.isLeft()) {
      return _classesEither;
    }

    const classes = _classesEither.unsafeCoerce();
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
    const _commentsEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly rdfjs.Literal[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#comment"),
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
    const _hasValuesEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly (rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal)[]
    > = purify.Either.of([
      ..._resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#hasValues"), {
          unique: true,
        })
        .flatMap((_value) =>
          _value
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
        .chain((value) =>
          value
            .toResource()
            .map((resource) =>
              resource.isInstanceOf(
                dataFactory.namedNode(
                  "http://minorg.github.io/shaclmate/ns#TermList",
                ),
              ),
            )
            .orDefault(false)
            ? purify.Right<
                rdfjsResource.Resource.Value,
                rdfjsResource.Resource.ValueError
              >(value)
            : purify.Left<
                rdfjsResource.Resource.ValueError,
                rdfjsResource.Resource.Value
              >(
                new rdfjsResource.Resource.ValueError({
                  focusResource: _resource,
                  message: "unexpected RDF type",
                  predicate: dataFactory.namedNode(
                    "http://minorg.github.io/shaclmate/ns#TermList",
                  ),
                }),
              ),
        )
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
        .chain((value) =>
          value
            .toResource()
            .map((resource) =>
              resource.isInstanceOf(
                dataFactory.namedNode(
                  "http://minorg.github.io/shaclmate/ns#StringList",
                ),
              ),
            )
            .orDefault(false)
            ? purify.Right<
                rdfjsResource.Resource.Value,
                rdfjsResource.Resource.ValueError
              >(value)
            : purify.Left<
                rdfjsResource.Resource.ValueError,
                rdfjsResource.Resource.Value
              >(
                new rdfjsResource.Resource.ValueError({
                  focusResource: _resource,
                  message: "unexpected RDF type",
                  predicate: dataFactory.namedNode(
                    "http://minorg.github.io/shaclmate/ns#StringList",
                  ),
                }),
              ),
        )
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
    const _propertiesEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly CorePropertyShape[]
    > = purify.Either.of([
      ..._resource
        .values(dataFactory.namedNode("http://www.w3.org/ns/shacl#property"), {
          unique: true,
        })
        .flatMap((_value) =>
          _value
            .toValues()
            .head()
            .chain((value) => value.toResource())
            .chain((_resource) =>
              CorePropertyShape.fromRdf({
                ..._context,
                ignoreRdfType: true,
                languageIn: _languageIn,
                resource: _resource,
              }),
            )
            .toMaybe()
            .toList(),
        ),
    ]);
    if (_propertiesEither.isLeft()) {
      return _propertiesEither;
    }

    const properties = _propertiesEither.unsafeCoerce();
    const type = "CoreNodeShape" as const;
    return purify.Either.of({
      and,
      classes,
      closed,
      comments,
      datatype,
      hasValues,
      identifier,
      in_,
      isDefinedBy,
      labels,
      languageIn,
      maxCount,
      maxExclusive,
      maxInclusive,
      minCount,
      minExclusive,
      minInclusive,
      properties,
      type,
    });
  }
}
export type CoreShape = CoreNodeShape | CorePropertyShape;

export namespace CoreShape {
  export function fromRdf(parameters: {
    [_index: string]: any;
    ignoreRdfType?: boolean;
    resource: rdfjsResource.Resource;
  }): purify.Either<rdfjsResource.Resource.ValueError, CoreShape> {
    return (
      CoreNodeShape.fromRdf(parameters) as purify.Either<
        rdfjsResource.Resource.ValueError,
        CoreShape
      >
    ).altLazy(
      () =>
        CorePropertyShape.fromRdf(parameters) as purify.Either<
          rdfjsResource.Resource.ValueError,
          CoreShape
        >,
    );
  }
}
