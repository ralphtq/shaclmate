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
export interface CoreShape {
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
  readonly type: "CoreNodeShape" | "CorePropertyShape";
}

export namespace CoreShape {
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
    { identifier: rdfjs.BlankNode | rdfjs.NamedNode }
  > {
    const identifier = _resource.identifier;
    return purify.Either.of({ identifier });
  }
}
export interface CorePropertyShape extends CoreShape {
  readonly defaultValue: purify.Maybe<
    rdfjs.BlankNode | rdfjs.NamedNode | rdfjs.Literal
  >;
  readonly descriptions: readonly rdfjs.Literal[];
  readonly groups: readonly (rdfjs.BlankNode | rdfjs.NamedNode)[];
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
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
    return CoreShape.fromRdf({
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
      const identifier = _resource.identifier;
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
        identifier,
        defaultValue,
        descriptions,
        groups,
        names,
        order,
        path,
        type,
      });
    });
  }
}
export interface CoreNodeShape extends CoreShape {
  readonly closed: purify.Maybe<boolean>;
  readonly identifier: rdfjs.BlankNode | rdfjs.NamedNode;
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
    return CoreShape.fromRdf({
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
      const _propertiesEither: purify.Either<
        rdfjsResource.Resource.ValueError,
        readonly CorePropertyShape[]
      > = purify.Either.of([
        ..._resource
          .values(
            dataFactory.namedNode("http://www.w3.org/ns/shacl#property"),
            { unique: true },
          )
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
      return purify.Either.of({ identifier, closed, properties, type });
    });
  }
}
