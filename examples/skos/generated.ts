import type * as rdfjs from "@rdfjs/types";
import { DataFactory as dataFactory } from "n3";
import * as purify from "purify-ts";
import * as purifyHelpers from "purify-ts-helpers";
import * as rdfjsResource from "rdfjs-resource";
import * as sparqljs from "sparqljs";
import { z as zod } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
abstract class Resource {
  readonly altLabel: readonly rdfjs.Literal[];
  readonly altLabelXl: readonly Label[];
  readonly changeNote: readonly rdfjs.Literal[];
  readonly definition: readonly rdfjs.Literal[];
  readonly editorialNote: readonly rdfjs.Literal[];
  readonly example: readonly rdfjs.Literal[];
  readonly hiddenLabel: readonly rdfjs.Literal[];
  readonly hiddenLabelXl: readonly Label[];
  readonly historyNote: readonly rdfjs.Literal[];
  abstract readonly identifier: rdfjs.NamedNode;
  readonly notation: readonly rdfjs.Literal[];
  readonly note: readonly rdfjs.Literal[];
  readonly prefLabel: readonly rdfjs.Literal[];
  readonly prefLabelXl: readonly Label[];
  readonly scopeNote: readonly rdfjs.Literal[];
  abstract readonly type:
    | "Collection"
    | "Concept"
    | "ConceptScheme"
    | "OrderedCollection";

  constructor(parameters: {
    readonly altLabel?: readonly rdfjs.Literal[];
    readonly altLabelXl?: readonly Label[];
    readonly changeNote?: readonly rdfjs.Literal[];
    readonly definition?: readonly rdfjs.Literal[];
    readonly editorialNote?: readonly rdfjs.Literal[];
    readonly example?: readonly rdfjs.Literal[];
    readonly hiddenLabel?: readonly rdfjs.Literal[];
    readonly hiddenLabelXl?: readonly Label[];
    readonly historyNote?: readonly rdfjs.Literal[];
    readonly notation?: readonly rdfjs.Literal[];
    readonly note?: readonly rdfjs.Literal[];
    readonly prefLabel?: readonly rdfjs.Literal[];
    readonly prefLabelXl?: readonly Label[];
    readonly scopeNote?: readonly rdfjs.Literal[];
  }) {
    if (typeof parameters.altLabel === "undefined") {
      this.altLabel = [];
    } else if (Array.isArray(parameters.altLabel)) {
      this.altLabel = parameters.altLabel;
    } else {
      this.altLabel = parameters.altLabel as never;
    }

    if (typeof parameters.altLabelXl === "undefined") {
      this.altLabelXl = [];
    } else if (Array.isArray(parameters.altLabelXl)) {
      this.altLabelXl = parameters.altLabelXl;
    } else {
      this.altLabelXl = parameters.altLabelXl as never;
    }

    if (typeof parameters.changeNote === "undefined") {
      this.changeNote = [];
    } else if (Array.isArray(parameters.changeNote)) {
      this.changeNote = parameters.changeNote;
    } else {
      this.changeNote = parameters.changeNote as never;
    }

    if (typeof parameters.definition === "undefined") {
      this.definition = [];
    } else if (Array.isArray(parameters.definition)) {
      this.definition = parameters.definition;
    } else {
      this.definition = parameters.definition as never;
    }

    if (typeof parameters.editorialNote === "undefined") {
      this.editorialNote = [];
    } else if (Array.isArray(parameters.editorialNote)) {
      this.editorialNote = parameters.editorialNote;
    } else {
      this.editorialNote = parameters.editorialNote as never;
    }

    if (typeof parameters.example === "undefined") {
      this.example = [];
    } else if (Array.isArray(parameters.example)) {
      this.example = parameters.example;
    } else {
      this.example = parameters.example as never;
    }

    if (typeof parameters.hiddenLabel === "undefined") {
      this.hiddenLabel = [];
    } else if (Array.isArray(parameters.hiddenLabel)) {
      this.hiddenLabel = parameters.hiddenLabel;
    } else {
      this.hiddenLabel = parameters.hiddenLabel as never;
    }

    if (typeof parameters.hiddenLabelXl === "undefined") {
      this.hiddenLabelXl = [];
    } else if (Array.isArray(parameters.hiddenLabelXl)) {
      this.hiddenLabelXl = parameters.hiddenLabelXl;
    } else {
      this.hiddenLabelXl = parameters.hiddenLabelXl as never;
    }

    if (typeof parameters.historyNote === "undefined") {
      this.historyNote = [];
    } else if (Array.isArray(parameters.historyNote)) {
      this.historyNote = parameters.historyNote;
    } else {
      this.historyNote = parameters.historyNote as never;
    }

    if (typeof parameters.notation === "undefined") {
      this.notation = [];
    } else if (Array.isArray(parameters.notation)) {
      this.notation = parameters.notation;
    } else {
      this.notation = parameters.notation as never;
    }

    if (typeof parameters.note === "undefined") {
      this.note = [];
    } else if (Array.isArray(parameters.note)) {
      this.note = parameters.note;
    } else {
      this.note = parameters.note as never;
    }

    if (typeof parameters.prefLabel === "undefined") {
      this.prefLabel = [];
    } else if (Array.isArray(parameters.prefLabel)) {
      this.prefLabel = parameters.prefLabel;
    } else {
      this.prefLabel = parameters.prefLabel as never;
    }

    if (typeof parameters.prefLabelXl === "undefined") {
      this.prefLabelXl = [];
    } else if (Array.isArray(parameters.prefLabelXl)) {
      this.prefLabelXl = parameters.prefLabelXl;
    } else {
      this.prefLabelXl = parameters.prefLabelXl as never;
    }

    if (typeof parameters.scopeNote === "undefined") {
      this.scopeNote = [];
    } else if (Array.isArray(parameters.scopeNote)) {
      this.scopeNote = parameters.scopeNote;
    } else {
      this.scopeNote = parameters.scopeNote as never;
    }
  }

  equals(other: Resource): purifyHelpers.Equatable.EqualsResult {
    return ((left, right) =>
      purifyHelpers.Arrays.equals(
        left,
        right,
        purifyHelpers.Equatable.booleanEquals,
      ))(this.altLabel, other.altLabel)
      .mapLeft((propertyValuesUnequal) => ({
        left: this,
        right: other,
        propertyName: "altLabel",
        propertyValuesUnequal,
        type: "Property" as const,
      }))
      .chain(() =>
        purifyHelpers.Equatable.arrayEquals(
          this.altLabelXl,
          other.altLabelXl,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "altLabelXl",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        ((left, right) =>
          purifyHelpers.Arrays.equals(
            left,
            right,
            purifyHelpers.Equatable.booleanEquals,
          ))(this.changeNote, other.changeNote).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "changeNote",
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
          ))(this.definition, other.definition).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "definition",
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
          ))(this.editorialNote, other.editorialNote).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "editorialNote",
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
          ))(this.example, other.example).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "example",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        ((left, right) =>
          purifyHelpers.Arrays.equals(
            left,
            right,
            purifyHelpers.Equatable.booleanEquals,
          ))(this.hiddenLabel, other.hiddenLabel).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "hiddenLabel",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      )
      .chain(() =>
        purifyHelpers.Equatable.arrayEquals(
          this.hiddenLabelXl,
          other.hiddenLabelXl,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "hiddenLabelXl",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        ((left, right) =>
          purifyHelpers.Arrays.equals(
            left,
            right,
            purifyHelpers.Equatable.booleanEquals,
          ))(this.historyNote, other.historyNote).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "historyNote",
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
          purifyHelpers.Arrays.equals(
            left,
            right,
            purifyHelpers.Equatable.booleanEquals,
          ))(this.notation, other.notation).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "notation",
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
          ))(this.note, other.note).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "note",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        ((left, right) =>
          purifyHelpers.Arrays.equals(
            left,
            right,
            purifyHelpers.Equatable.booleanEquals,
          ))(this.prefLabel, other.prefLabel).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "prefLabel",
            propertyValuesUnequal,
            type: "Property" as const,
          }),
        ),
      )
      .chain(() =>
        purifyHelpers.Equatable.arrayEquals(
          this.prefLabelXl,
          other.prefLabelXl,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "prefLabelXl",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        ((left, right) =>
          purifyHelpers.Arrays.equals(
            left,
            right,
            purifyHelpers.Equatable.booleanEquals,
          ))(this.scopeNote, other.scopeNote).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "scopeNote",
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
    for (const _item0 of this.altLabel) {
      _hasher.update(_item0.datatype.value);
      _hasher.update(_item0.language);
      _hasher.update(_item0.termType);
      _hasher.update(_item0.value);
    }

    for (const _item0 of this.altLabelXl) {
      _item0.hash(_hasher);
    }

    for (const _item0 of this.changeNote) {
      _hasher.update(_item0.datatype.value);
      _hasher.update(_item0.language);
      _hasher.update(_item0.termType);
      _hasher.update(_item0.value);
    }

    for (const _item0 of this.definition) {
      _hasher.update(_item0.datatype.value);
      _hasher.update(_item0.language);
      _hasher.update(_item0.termType);
      _hasher.update(_item0.value);
    }

    for (const _item0 of this.editorialNote) {
      _hasher.update(_item0.datatype.value);
      _hasher.update(_item0.language);
      _hasher.update(_item0.termType);
      _hasher.update(_item0.value);
    }

    for (const _item0 of this.example) {
      _hasher.update(_item0.datatype.value);
      _hasher.update(_item0.language);
      _hasher.update(_item0.termType);
      _hasher.update(_item0.value);
    }

    for (const _item0 of this.hiddenLabel) {
      _hasher.update(_item0.datatype.value);
      _hasher.update(_item0.language);
      _hasher.update(_item0.termType);
      _hasher.update(_item0.value);
    }

    for (const _item0 of this.hiddenLabelXl) {
      _item0.hash(_hasher);
    }

    for (const _item0 of this.historyNote) {
      _hasher.update(_item0.datatype.value);
      _hasher.update(_item0.language);
      _hasher.update(_item0.termType);
      _hasher.update(_item0.value);
    }

    for (const _item0 of this.notation) {
      _hasher.update(_item0.datatype.value);
      _hasher.update(_item0.language);
      _hasher.update(_item0.termType);
      _hasher.update(_item0.value);
    }

    for (const _item0 of this.note) {
      _hasher.update(_item0.datatype.value);
      _hasher.update(_item0.language);
      _hasher.update(_item0.termType);
      _hasher.update(_item0.value);
    }

    for (const _item0 of this.prefLabel) {
      _hasher.update(_item0.datatype.value);
      _hasher.update(_item0.language);
      _hasher.update(_item0.termType);
      _hasher.update(_item0.value);
    }

    for (const _item0 of this.prefLabelXl) {
      _item0.hash(_hasher);
    }

    for (const _item0 of this.scopeNote) {
      _hasher.update(_item0.datatype.value);
      _hasher.update(_item0.language);
      _hasher.update(_item0.termType);
      _hasher.update(_item0.value);
    }

    return _hasher;
  }

  toJson(): {
    readonly altLabel: readonly {
      readonly "@language": string | undefined;
      readonly "@type": string | undefined;
      readonly "@value": string;
    }[];
    readonly altLabelXl: readonly ReturnType<Label["toJson"]>[];
    readonly changeNote: readonly {
      readonly "@language": string | undefined;
      readonly "@type": string | undefined;
      readonly "@value": string;
    }[];
    readonly definition: readonly {
      readonly "@language": string | undefined;
      readonly "@type": string | undefined;
      readonly "@value": string;
    }[];
    readonly editorialNote: readonly {
      readonly "@language": string | undefined;
      readonly "@type": string | undefined;
      readonly "@value": string;
    }[];
    readonly example: readonly {
      readonly "@language": string | undefined;
      readonly "@type": string | undefined;
      readonly "@value": string;
    }[];
    readonly hiddenLabel: readonly {
      readonly "@language": string | undefined;
      readonly "@type": string | undefined;
      readonly "@value": string;
    }[];
    readonly hiddenLabelXl: readonly ReturnType<Label["toJson"]>[];
    readonly historyNote: readonly {
      readonly "@language": string | undefined;
      readonly "@type": string | undefined;
      readonly "@value": string;
    }[];
    readonly "@id": string;
    readonly notation: readonly {
      readonly "@language": string | undefined;
      readonly "@type": string | undefined;
      readonly "@value": string;
    }[];
    readonly note: readonly {
      readonly "@language": string | undefined;
      readonly "@type": string | undefined;
      readonly "@value": string;
    }[];
    readonly prefLabel: readonly {
      readonly "@language": string | undefined;
      readonly "@type": string | undefined;
      readonly "@value": string;
    }[];
    readonly prefLabelXl: readonly ReturnType<Label["toJson"]>[];
    readonly scopeNote: readonly {
      readonly "@language": string | undefined;
      readonly "@type": string | undefined;
      readonly "@value": string;
    }[];
    readonly type:
      | "Collection"
      | "Concept"
      | "ConceptScheme"
      | "OrderedCollection";
  } {
    return JSON.parse(
      JSON.stringify({
        altLabel: this.altLabel.map((_item) => ({
          "@language": _item.language.length > 0 ? _item.language : undefined,
          "@type":
            _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string"
              ? _item.datatype.value
              : undefined,
          "@value": _item.value,
        })),
        altLabelXl: this.altLabelXl.map((_item) => _item.toJson()),
        changeNote: this.changeNote.map((_item) => ({
          "@language": _item.language.length > 0 ? _item.language : undefined,
          "@type":
            _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string"
              ? _item.datatype.value
              : undefined,
          "@value": _item.value,
        })),
        definition: this.definition.map((_item) => ({
          "@language": _item.language.length > 0 ? _item.language : undefined,
          "@type":
            _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string"
              ? _item.datatype.value
              : undefined,
          "@value": _item.value,
        })),
        editorialNote: this.editorialNote.map((_item) => ({
          "@language": _item.language.length > 0 ? _item.language : undefined,
          "@type":
            _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string"
              ? _item.datatype.value
              : undefined,
          "@value": _item.value,
        })),
        example: this.example.map((_item) => ({
          "@language": _item.language.length > 0 ? _item.language : undefined,
          "@type":
            _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string"
              ? _item.datatype.value
              : undefined,
          "@value": _item.value,
        })),
        hiddenLabel: this.hiddenLabel.map((_item) => ({
          "@language": _item.language.length > 0 ? _item.language : undefined,
          "@type":
            _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string"
              ? _item.datatype.value
              : undefined,
          "@value": _item.value,
        })),
        hiddenLabelXl: this.hiddenLabelXl.map((_item) => _item.toJson()),
        historyNote: this.historyNote.map((_item) => ({
          "@language": _item.language.length > 0 ? _item.language : undefined,
          "@type":
            _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string"
              ? _item.datatype.value
              : undefined,
          "@value": _item.value,
        })),
        "@id": this.identifier.value,
        notation: this.notation.map((_item) => ({
          "@language": _item.language.length > 0 ? _item.language : undefined,
          "@type":
            _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string"
              ? _item.datatype.value
              : undefined,
          "@value": _item.value,
        })),
        note: this.note.map((_item) => ({
          "@language": _item.language.length > 0 ? _item.language : undefined,
          "@type":
            _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string"
              ? _item.datatype.value
              : undefined,
          "@value": _item.value,
        })),
        prefLabel: this.prefLabel.map((_item) => ({
          "@language": _item.language.length > 0 ? _item.language : undefined,
          "@type":
            _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string"
              ? _item.datatype.value
              : undefined,
          "@value": _item.value,
        })),
        prefLabelXl: this.prefLabelXl.map((_item) => _item.toJson()),
        scopeNote: this.scopeNote.map((_item) => ({
          "@language": _item.language.length > 0 ? _item.language : undefined,
          "@type":
            _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string"
              ? _item.datatype.value
              : undefined,
          "@value": _item.value,
        })),
        type: this.type,
      } satisfies ReturnType<Resource["toJson"]>),
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
      dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#altLabel"),
      this.altLabel.map((_item) => _item),
    );
    _resource.add(
      dataFactory.namedNode("http://www.w3.org/2008/05/skos-xl#altLabel"),
      this.altLabelXl.map((_item) =>
        _item.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet }),
      ),
    );
    _resource.add(
      dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#changeNote"),
      this.changeNote.map((_item) => _item),
    );
    _resource.add(
      dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#definition"),
      this.definition.map((_item) => _item),
    );
    _resource.add(
      dataFactory.namedNode(
        "http://www.w3.org/2004/02/skos/core#editorialNote",
      ),
      this.editorialNote.map((_item) => _item),
    );
    _resource.add(
      dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#example"),
      this.example.map((_item) => _item),
    );
    _resource.add(
      dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#hiddenLabel"),
      this.hiddenLabel.map((_item) => _item),
    );
    _resource.add(
      dataFactory.namedNode("http://www.w3.org/2008/05/skos-xl#hiddenLabel"),
      this.hiddenLabelXl.map((_item) =>
        _item.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet }),
      ),
    );
    _resource.add(
      dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#historyNote"),
      this.historyNote.map((_item) => _item),
    );
    _resource.add(
      dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#notation"),
      this.notation.map((_item) => _item),
    );
    _resource.add(
      dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#notation"),
      this.note.map((_item) => _item),
    );
    _resource.add(
      dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#prefLabel"),
      this.prefLabel.map((_item) => _item),
    );
    _resource.add(
      dataFactory.namedNode("http://www.w3.org/2008/05/skos-xl#prefLabel"),
      this.prefLabelXl.map((_item) =>
        _item.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet }),
      ),
    );
    _resource.add(
      dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#scopeNote"),
      this.scopeNote.map((_item) => _item),
    );
    return _resource;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

namespace Resource {
  export function propertiesFromJson(_json: unknown): purify.Either<
    zod.ZodError,
    {
      altLabel: readonly rdfjs.Literal[];
      altLabelXl: readonly Label[];
      changeNote: readonly rdfjs.Literal[];
      definition: readonly rdfjs.Literal[];
      editorialNote: readonly rdfjs.Literal[];
      example: readonly rdfjs.Literal[];
      hiddenLabel: readonly rdfjs.Literal[];
      hiddenLabelXl: readonly Label[];
      historyNote: readonly rdfjs.Literal[];
      identifier: rdfjs.NamedNode;
      notation: readonly rdfjs.Literal[];
      note: readonly rdfjs.Literal[];
      prefLabel: readonly rdfjs.Literal[];
      prefLabelXl: readonly Label[];
      scopeNote: readonly rdfjs.Literal[];
    }
  > {
    const _jsonSafeParseResult = resourceJsonZodSchema().safeParse(_json);
    if (!_jsonSafeParseResult.success) {
      return purify.Left(_jsonSafeParseResult.error);
    }

    const _jsonObject = _jsonSafeParseResult.data;
    const altLabel = _jsonObject["altLabel"].map((_item) =>
      dataFactory.literal(
        _item["@value"],
        typeof _item["@language"] !== "undefined"
          ? _item["@language"]
          : typeof _item["@type"] !== "undefined"
            ? dataFactory.namedNode(_item["@type"])
            : undefined,
      ),
    );
    const altLabelXl = _jsonObject["altLabelXl"].map((_item) =>
      Label.fromJson(_item).unsafeCoerce(),
    );
    const changeNote = _jsonObject["changeNote"].map((_item) =>
      dataFactory.literal(
        _item["@value"],
        typeof _item["@language"] !== "undefined"
          ? _item["@language"]
          : typeof _item["@type"] !== "undefined"
            ? dataFactory.namedNode(_item["@type"])
            : undefined,
      ),
    );
    const definition = _jsonObject["definition"].map((_item) =>
      dataFactory.literal(
        _item["@value"],
        typeof _item["@language"] !== "undefined"
          ? _item["@language"]
          : typeof _item["@type"] !== "undefined"
            ? dataFactory.namedNode(_item["@type"])
            : undefined,
      ),
    );
    const editorialNote = _jsonObject["editorialNote"].map((_item) =>
      dataFactory.literal(
        _item["@value"],
        typeof _item["@language"] !== "undefined"
          ? _item["@language"]
          : typeof _item["@type"] !== "undefined"
            ? dataFactory.namedNode(_item["@type"])
            : undefined,
      ),
    );
    const example = _jsonObject["example"].map((_item) =>
      dataFactory.literal(
        _item["@value"],
        typeof _item["@language"] !== "undefined"
          ? _item["@language"]
          : typeof _item["@type"] !== "undefined"
            ? dataFactory.namedNode(_item["@type"])
            : undefined,
      ),
    );
    const hiddenLabel = _jsonObject["hiddenLabel"].map((_item) =>
      dataFactory.literal(
        _item["@value"],
        typeof _item["@language"] !== "undefined"
          ? _item["@language"]
          : typeof _item["@type"] !== "undefined"
            ? dataFactory.namedNode(_item["@type"])
            : undefined,
      ),
    );
    const hiddenLabelXl = _jsonObject["hiddenLabelXl"].map((_item) =>
      Label.fromJson(_item).unsafeCoerce(),
    );
    const historyNote = _jsonObject["historyNote"].map((_item) =>
      dataFactory.literal(
        _item["@value"],
        typeof _item["@language"] !== "undefined"
          ? _item["@language"]
          : typeof _item["@type"] !== "undefined"
            ? dataFactory.namedNode(_item["@type"])
            : undefined,
      ),
    );
    const identifier = dataFactory.namedNode(_jsonObject["@id"]);
    const notation = _jsonObject["notation"].map((_item) =>
      dataFactory.literal(
        _item["@value"],
        typeof _item["@language"] !== "undefined"
          ? _item["@language"]
          : typeof _item["@type"] !== "undefined"
            ? dataFactory.namedNode(_item["@type"])
            : undefined,
      ),
    );
    const note = _jsonObject["note"].map((_item) =>
      dataFactory.literal(
        _item["@value"],
        typeof _item["@language"] !== "undefined"
          ? _item["@language"]
          : typeof _item["@type"] !== "undefined"
            ? dataFactory.namedNode(_item["@type"])
            : undefined,
      ),
    );
    const prefLabel = _jsonObject["prefLabel"].map((_item) =>
      dataFactory.literal(
        _item["@value"],
        typeof _item["@language"] !== "undefined"
          ? _item["@language"]
          : typeof _item["@type"] !== "undefined"
            ? dataFactory.namedNode(_item["@type"])
            : undefined,
      ),
    );
    const prefLabelXl = _jsonObject["prefLabelXl"].map((_item) =>
      Label.fromJson(_item).unsafeCoerce(),
    );
    const scopeNote = _jsonObject["scopeNote"].map((_item) =>
      dataFactory.literal(
        _item["@value"],
        typeof _item["@language"] !== "undefined"
          ? _item["@language"]
          : typeof _item["@type"] !== "undefined"
            ? dataFactory.namedNode(_item["@type"])
            : undefined,
      ),
    );
    return purify.Either.of({
      altLabel,
      altLabelXl,
      changeNote,
      definition,
      editorialNote,
      example,
      hiddenLabel,
      hiddenLabelXl,
      historyNote,
      identifier,
      notation,
      note,
      prefLabel,
      prefLabelXl,
      scopeNote,
    });
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
    resource: rdfjsResource.Resource<rdfjs.NamedNode>;
  }): purify.Either<
    rdfjsResource.Resource.ValueError,
    {
      altLabel: readonly rdfjs.Literal[];
      altLabelXl: readonly Label[];
      changeNote: readonly rdfjs.Literal[];
      definition: readonly rdfjs.Literal[];
      editorialNote: readonly rdfjs.Literal[];
      example: readonly rdfjs.Literal[];
      hiddenLabel: readonly rdfjs.Literal[];
      hiddenLabelXl: readonly Label[];
      historyNote: readonly rdfjs.Literal[];
      identifier: rdfjs.NamedNode;
      notation: readonly rdfjs.Literal[];
      note: readonly rdfjs.Literal[];
      prefLabel: readonly rdfjs.Literal[];
      prefLabelXl: readonly Label[];
      scopeNote: readonly rdfjs.Literal[];
    }
  > {
    const _altLabelEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly rdfjs.Literal[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#altLabel"),
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
    if (_altLabelEither.isLeft()) {
      return _altLabelEither;
    }

    const altLabel = _altLabelEither.unsafeCoerce();
    const _altLabelXlEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly Label[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode("http://www.w3.org/2008/05/skos-xl#altLabel"),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((value) => value.toResource())
            .chain((_resource) =>
              Label.fromRdf({
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
    if (_altLabelXlEither.isLeft()) {
      return _altLabelXlEither;
    }

    const altLabelXl = _altLabelXlEither.unsafeCoerce();
    const _changeNoteEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly rdfjs.Literal[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode(
            "http://www.w3.org/2004/02/skos/core#changeNote",
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
    ]);
    if (_changeNoteEither.isLeft()) {
      return _changeNoteEither;
    }

    const changeNote = _changeNoteEither.unsafeCoerce();
    const _definitionEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly rdfjs.Literal[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode(
            "http://www.w3.org/2004/02/skos/core#definition",
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
    ]);
    if (_definitionEither.isLeft()) {
      return _definitionEither;
    }

    const definition = _definitionEither.unsafeCoerce();
    const _editorialNoteEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly rdfjs.Literal[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode(
            "http://www.w3.org/2004/02/skos/core#editorialNote",
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
    ]);
    if (_editorialNoteEither.isLeft()) {
      return _editorialNoteEither;
    }

    const editorialNote = _editorialNoteEither.unsafeCoerce();
    const _exampleEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly rdfjs.Literal[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#example"),
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
    if (_exampleEither.isLeft()) {
      return _exampleEither;
    }

    const example = _exampleEither.unsafeCoerce();
    const _hiddenLabelEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly rdfjs.Literal[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode(
            "http://www.w3.org/2004/02/skos/core#hiddenLabel",
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
    ]);
    if (_hiddenLabelEither.isLeft()) {
      return _hiddenLabelEither;
    }

    const hiddenLabel = _hiddenLabelEither.unsafeCoerce();
    const _hiddenLabelXlEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly Label[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode(
            "http://www.w3.org/2008/05/skos-xl#hiddenLabel",
          ),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((value) => value.toResource())
            .chain((_resource) =>
              Label.fromRdf({
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
    if (_hiddenLabelXlEither.isLeft()) {
      return _hiddenLabelXlEither;
    }

    const hiddenLabelXl = _hiddenLabelXlEither.unsafeCoerce();
    const _historyNoteEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly rdfjs.Literal[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode(
            "http://www.w3.org/2004/02/skos/core#historyNote",
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
    ]);
    if (_historyNoteEither.isLeft()) {
      return _historyNoteEither;
    }

    const historyNote = _historyNoteEither.unsafeCoerce();
    const identifier = _resource.identifier;
    const _notationEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly rdfjs.Literal[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#notation"),
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
    if (_notationEither.isLeft()) {
      return _notationEither;
    }

    const notation = _notationEither.unsafeCoerce();
    const _noteEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly rdfjs.Literal[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#notation"),
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
    if (_noteEither.isLeft()) {
      return _noteEither;
    }

    const note = _noteEither.unsafeCoerce();
    const _prefLabelEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly rdfjs.Literal[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode(
            "http://www.w3.org/2004/02/skos/core#prefLabel",
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
    ]);
    if (_prefLabelEither.isLeft()) {
      return _prefLabelEither;
    }

    const prefLabel = _prefLabelEither.unsafeCoerce();
    const _prefLabelXlEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly Label[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode("http://www.w3.org/2008/05/skos-xl#prefLabel"),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((value) => value.toResource())
            .chain((_resource) =>
              Label.fromRdf({
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
    if (_prefLabelXlEither.isLeft()) {
      return _prefLabelXlEither;
    }

    const prefLabelXl = _prefLabelXlEither.unsafeCoerce();
    const _scopeNoteEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly rdfjs.Literal[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode(
            "http://www.w3.org/2004/02/skos/core#scopeNote",
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
    ]);
    if (_scopeNoteEither.isLeft()) {
      return _scopeNoteEither;
    }

    const scopeNote = _scopeNoteEither.unsafeCoerce();
    return purify.Either.of({
      altLabel,
      altLabelXl,
      changeNote,
      definition,
      editorialNote,
      example,
      hiddenLabel,
      hiddenLabelXl,
      historyNote,
      identifier,
      notation,
      note,
      prefLabel,
      prefLabelXl,
      scopeNote,
    });
  }

  export function jsonSchema() {
    return zodToJsonSchema(resourceJsonZodSchema());
  }

  export function resourceJsonUiSchema(parameters?: { scopePrefix?: string }) {
    const scopePrefix = parameters?.scopePrefix ?? "#";
    return {
      elements: [
        { scope: `${scopePrefix}/properties/altLabel`, type: "Control" },
        Label.jsonUiSchema({
          scopePrefix: `${scopePrefix}/properties/altLabelXl`,
        }),
        { scope: `${scopePrefix}/properties/changeNote`, type: "Control" },
        { scope: `${scopePrefix}/properties/definition`, type: "Control" },
        { scope: `${scopePrefix}/properties/editorialNote`, type: "Control" },
        { scope: `${scopePrefix}/properties/example`, type: "Control" },
        { scope: `${scopePrefix}/properties/hiddenLabel`, type: "Control" },
        Label.jsonUiSchema({
          scopePrefix: `${scopePrefix}/properties/hiddenLabelXl`,
        }),
        { scope: `${scopePrefix}/properties/historyNote`, type: "Control" },
        {
          label: "Identifier",
          scope: `${scopePrefix}/properties/@id`,
          type: "Control",
        },
        { scope: `${scopePrefix}/properties/notation`, type: "Control" },
        { scope: `${scopePrefix}/properties/note`, type: "Control" },
        { scope: `${scopePrefix}/properties/prefLabel`, type: "Control" },
        Label.jsonUiSchema({
          scopePrefix: `${scopePrefix}/properties/prefLabelXl`,
        }),
        { scope: `${scopePrefix}/properties/scopeNote`, type: "Control" },
        {
          rule: {
            condition: {
              schema: { const: "Resource" },
              scope: `${scopePrefix}/properties/type`,
            },
            effect: "HIDE",
          },
          scope: `${scopePrefix}/properties/type`,
          type: "Control",
        },
      ],
      label: "Resource",
      type: "Group",
    };
  }

  export function resourceJsonZodSchema() {
    return zod.object({
      altLabel: zod
        .object({
          "@language": zod.string().optional(),
          "@type": zod.string().optional(),
          "@value": zod.string(),
        })
        .array(),
      altLabelXl: Label.jsonZodSchema().array(),
      changeNote: zod
        .object({
          "@language": zod.string().optional(),
          "@type": zod.string().optional(),
          "@value": zod.string(),
        })
        .array(),
      definition: zod
        .object({
          "@language": zod.string().optional(),
          "@type": zod.string().optional(),
          "@value": zod.string(),
        })
        .array(),
      editorialNote: zod
        .object({
          "@language": zod.string().optional(),
          "@type": zod.string().optional(),
          "@value": zod.string(),
        })
        .array(),
      example: zod
        .object({
          "@language": zod.string().optional(),
          "@type": zod.string().optional(),
          "@value": zod.string(),
        })
        .array(),
      hiddenLabel: zod
        .object({
          "@language": zod.string().optional(),
          "@type": zod.string().optional(),
          "@value": zod.string(),
        })
        .array(),
      hiddenLabelXl: Label.jsonZodSchema().array(),
      historyNote: zod
        .object({
          "@language": zod.string().optional(),
          "@type": zod.string().optional(),
          "@value": zod.string(),
        })
        .array(),
      "@id": zod.string().min(1),
      notation: zod
        .object({
          "@language": zod.string().optional(),
          "@type": zod.string().optional(),
          "@value": zod.string(),
        })
        .array(),
      note: zod
        .object({
          "@language": zod.string().optional(),
          "@type": zod.string().optional(),
          "@value": zod.string(),
        })
        .array(),
      prefLabel: zod
        .object({
          "@language": zod.string().optional(),
          "@type": zod.string().optional(),
          "@value": zod.string(),
        })
        .array(),
      prefLabelXl: Label.jsonZodSchema().array(),
      scopeNote: zod
        .object({
          "@language": zod.string().optional(),
          "@type": zod.string().optional(),
          "@value": zod.string(),
        })
        .array(),
      type: zod.enum([
        "Collection",
        "Concept",
        "ConceptScheme",
        "OrderedCollection",
      ]),
    });
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
        Resource.sparqlConstructTemplateTriples({ ignoreRdfType, subject }),
      ),
      type: "query",
      where: (queryParameters.where ?? []).concat(
        Resource.sparqlWherePatterns({ ignoreRdfType, subject }),
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
      Resource.sparqlConstructQuery(parameters),
    );
  }

  export function sparqlConstructTemplateTriples(parameters?: {
    ignoreRdfType?: boolean;
    subject?: sparqljs.Triple["subject"];
    variablePrefix?: string;
  }): readonly sparqljs.Triple[] {
    const subject = parameters?.subject ?? dataFactory.variable!("resource");
    const variablePrefix =
      parameters?.variablePrefix ??
      (subject.termType === "Variable" ? subject.value : "resource");
    return [
      {
        object: dataFactory.variable!(`${variablePrefix}AltLabel`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#altLabel",
        ),
        subject,
      },
      {
        object: dataFactory.variable!(`${variablePrefix}AltLabelXl`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2008/05/skos-xl#altLabel",
        ),
        subject,
      },
      ...Label.sparqlConstructTemplateTriples({
        ignoreRdfType: true,
        subject: dataFactory.variable!(`${variablePrefix}AltLabelXl`),
        variablePrefix: `${variablePrefix}AltLabelXl`,
      }),
      {
        object: dataFactory.variable!(`${variablePrefix}ChangeNote`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#changeNote",
        ),
        subject,
      },
      {
        object: dataFactory.variable!(`${variablePrefix}Definition`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#definition",
        ),
        subject,
      },
      {
        object: dataFactory.variable!(`${variablePrefix}EditorialNote`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#editorialNote",
        ),
        subject,
      },
      {
        object: dataFactory.variable!(`${variablePrefix}Example`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#example",
        ),
        subject,
      },
      {
        object: dataFactory.variable!(`${variablePrefix}HiddenLabel`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#hiddenLabel",
        ),
        subject,
      },
      {
        object: dataFactory.variable!(`${variablePrefix}HiddenLabelXl`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2008/05/skos-xl#hiddenLabel",
        ),
        subject,
      },
      ...Label.sparqlConstructTemplateTriples({
        ignoreRdfType: true,
        subject: dataFactory.variable!(`${variablePrefix}HiddenLabelXl`),
        variablePrefix: `${variablePrefix}HiddenLabelXl`,
      }),
      {
        object: dataFactory.variable!(`${variablePrefix}HistoryNote`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#historyNote",
        ),
        subject,
      },
      {
        object: dataFactory.variable!(`${variablePrefix}Notation`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#notation",
        ),
        subject,
      },
      {
        object: dataFactory.variable!(`${variablePrefix}Note`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#notation",
        ),
        subject,
      },
      {
        object: dataFactory.variable!(`${variablePrefix}PrefLabel`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#prefLabel",
        ),
        subject,
      },
      {
        object: dataFactory.variable!(`${variablePrefix}PrefLabelXl`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2008/05/skos-xl#prefLabel",
        ),
        subject,
      },
      ...Label.sparqlConstructTemplateTriples({
        ignoreRdfType: true,
        subject: dataFactory.variable!(`${variablePrefix}PrefLabelXl`),
        variablePrefix: `${variablePrefix}PrefLabelXl`,
      }),
      {
        object: dataFactory.variable!(`${variablePrefix}ScopeNote`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#scopeNote",
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
    const subject = parameters?.subject ?? dataFactory.variable!("resource");
    const variablePrefix =
      parameters?.variablePrefix ??
      (subject.termType === "Variable" ? subject.value : "resource");
    return [
      {
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(`${variablePrefix}AltLabel`),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2004/02/skos/core#altLabel",
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
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(`${variablePrefix}AltLabelXl`),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2008/05/skos-xl#altLabel",
                ),
                subject,
              },
            ],
            type: "bgp",
          },
          ...Label.sparqlWherePatterns({
            ignoreRdfType: true,
            subject: dataFactory.variable!(`${variablePrefix}AltLabelXl`),
            variablePrefix: `${variablePrefix}AltLabelXl`,
          }),
        ],
        type: "optional",
      },
      {
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(`${variablePrefix}ChangeNote`),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2004/02/skos/core#changeNote",
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
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(`${variablePrefix}Definition`),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2004/02/skos/core#definition",
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
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(`${variablePrefix}EditorialNote`),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2004/02/skos/core#editorialNote",
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
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(`${variablePrefix}Example`),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2004/02/skos/core#example",
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
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(`${variablePrefix}HiddenLabel`),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2004/02/skos/core#hiddenLabel",
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
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(`${variablePrefix}HiddenLabelXl`),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2008/05/skos-xl#hiddenLabel",
                ),
                subject,
              },
            ],
            type: "bgp",
          },
          ...Label.sparqlWherePatterns({
            ignoreRdfType: true,
            subject: dataFactory.variable!(`${variablePrefix}HiddenLabelXl`),
            variablePrefix: `${variablePrefix}HiddenLabelXl`,
          }),
        ],
        type: "optional",
      },
      {
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(`${variablePrefix}HistoryNote`),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2004/02/skos/core#historyNote",
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
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(`${variablePrefix}Notation`),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2004/02/skos/core#notation",
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
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(`${variablePrefix}Note`),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2004/02/skos/core#notation",
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
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(`${variablePrefix}PrefLabel`),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2004/02/skos/core#prefLabel",
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
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(`${variablePrefix}PrefLabelXl`),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2008/05/skos-xl#prefLabel",
                ),
                subject,
              },
            ],
            type: "bgp",
          },
          ...Label.sparqlWherePatterns({
            ignoreRdfType: true,
            subject: dataFactory.variable!(`${variablePrefix}PrefLabelXl`),
            variablePrefix: `${variablePrefix}PrefLabelXl`,
          }),
        ],
        type: "optional",
      },
      {
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(`${variablePrefix}ScopeNote`),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2004/02/skos/core#scopeNote",
                ),
                subject,
              },
            ],
            type: "bgp",
          },
        ],
        type: "optional",
      },
    ];
  }
}
export class Collection extends Resource {
  identifier: rdfjs.NamedNode;
  readonly member: readonly (Collection | Concept)[];
  override readonly type: "Collection" | "OrderedCollection" = "Collection";

  constructor(
    parameters: {
      readonly identifier: rdfjs.NamedNode;
      readonly member?: readonly (Collection | Concept)[];
    } & ConstructorParameters<typeof Resource>[0],
  ) {
    super(parameters);
    this.identifier = parameters.identifier;
    if (typeof parameters.member === "undefined") {
      this.member = [];
    } else if (Array.isArray(parameters.member)) {
      this.member = parameters.member;
    } else {
      this.member = parameters.member as never;
    }
  }

  override equals(other: Collection): purifyHelpers.Equatable.EqualsResult {
    return super.equals(other).chain(() =>
      ((left, right) =>
        purifyHelpers.Arrays.equals(
          left,
          right,
          (left: Collection | Concept, right: Collection | Concept) => {
            if (left.type === "Collection" && right.type === "Collection") {
              return purifyHelpers.Equatable.equals(left, right);
            }
            if (left.type === "Concept" && right.type === "Concept") {
              return purifyHelpers.Equatable.equals(left, right);
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
        ))(this.member, other.member).mapLeft((propertyValuesUnequal) => ({
        left: this,
        right: other,
        propertyName: "member",
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
    for (const _item0 of this.member) {
      switch (_item0.type) {
        case "Collection": {
          _item0.hash(_hasher);
          break;
        }
        case "Concept": {
          _item0.hash(_hasher);
          break;
        }
      }
    }

    return _hasher;
  }

  override toJson(): {
    readonly member: readonly (
      | ReturnType<Collection["toJson"]>
      | ReturnType<Concept["toJson"]>
    )[];
  } & ReturnType<Resource["toJson"]> {
    return JSON.parse(
      JSON.stringify({
        ...super.toJson(),
        member: this.member.map((_item) =>
          _item.type === "Concept" ? _item.toJson() : _item.toJson(),
        ),
      } satisfies ReturnType<Collection["toJson"]>),
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
  }): rdfjsResource.MutableResource<rdfjs.NamedNode> {
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
          "http://www.w3.org/2004/02/skos/core#Collection",
        ),
      );
    }

    _resource.add(
      dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#member"),
      this.member.map((_item) =>
        _item.type === "Concept"
          ? _item.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet })
          : _item.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet }),
      ),
    );
    return _resource;
  }

  override toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace Collection {
  export function propertiesFromJson(_json: unknown): purify.Either<
    zod.ZodError,
    {
      identifier: rdfjs.NamedNode;
      member: readonly (Collection | Concept)[];
    } & purifyHelpers.Eithers.UnwrapR<
      ReturnType<typeof Resource.propertiesFromJson>
    >
  > {
    const _jsonSafeParseResult = collectionJsonZodSchema().safeParse(_json);
    if (!_jsonSafeParseResult.success) {
      return purify.Left(_jsonSafeParseResult.error);
    }

    const _jsonObject = _jsonSafeParseResult.data;
    const _super0Either = Resource.propertiesFromJson(_jsonObject);
    if (_super0Either.isLeft()) {
      return _super0Either;
    }

    const _super0 = _super0Either.unsafeCoerce();
    const identifier = dataFactory.namedNode(_jsonObject["@id"]);
    const member = _jsonObject["member"].map((_item) =>
      _item.type === "Concept"
        ? Concept.fromJson(_item).unsafeCoerce()
        : Collection.fromJson(_item).unsafeCoerce(),
    );
    return purify.Either.of({ ..._super0, identifier, member });
  }

  export function fromJson(
    json: unknown,
  ): purify.Either<zod.ZodError, Collection> {
    return Collection.propertiesFromJson(json).map(
      (properties) => new Collection(properties),
    );
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
    resource: rdfjsResource.Resource<rdfjs.NamedNode>;
  }): purify.Either<
    rdfjsResource.Resource.ValueError,
    {
      identifier: rdfjs.NamedNode;
      member: readonly (Collection | Concept)[];
    } & purifyHelpers.Eithers.UnwrapR<
      ReturnType<typeof Resource.propertiesFromRdf>
    >
  > {
    const _super0Either = Resource.propertiesFromRdf({
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
        dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#Collection"),
      )
    ) {
      return purify.Left(
        new rdfjsResource.Resource.ValueError({
          focusResource: _resource,
          message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type`,
          predicate: dataFactory.namedNode(
            "http://www.w3.org/2004/02/skos/core#Collection",
          ),
        }),
      );
    }

    const identifier = _resource.identifier;
    const _memberEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly (Collection | Concept)[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#member"),
          { unique: true },
        )
        .flatMap((_item) =>
          (
            _item
              .toValues()
              .head()
              .chain((value) => value.toNamedResource())
              .chain((_resource) =>
                Collection.fromRdf({
                  ..._context,
                  ignoreRdfType: true,
                  languageIn: _languageIn,
                  resource: _resource,
                }),
              ) as purify.Either<
              rdfjsResource.Resource.ValueError,
              Collection | Concept
            >
          )
            .altLazy(
              () =>
                _item
                  .toValues()
                  .head()
                  .chain((value) => value.toNamedResource())
                  .chain((_resource) =>
                    Concept.fromRdf({
                      ..._context,
                      ignoreRdfType: true,
                      languageIn: _languageIn,
                      resource: _resource,
                    }),
                  ) as purify.Either<
                  rdfjsResource.Resource.ValueError,
                  Collection | Concept
                >,
            )
            .toMaybe()
            .toList(),
        ),
    ]);
    if (_memberEither.isLeft()) {
      return _memberEither;
    }

    const member = _memberEither.unsafeCoerce();
    return purify.Either.of({ ..._super0, identifier, member });
  }

  export function fromRdf(
    parameters: Parameters<typeof Collection.propertiesFromRdf>[0],
  ): purify.Either<rdfjsResource.Resource.ValueError, Collection> {
    return Collection.propertiesFromRdf(parameters).map(
      (properties) => new Collection(properties),
    );
  }

  export function jsonSchema() {
    return zodToJsonSchema(collectionJsonZodSchema());
  }

  export function collectionJsonUiSchema(parameters?: {
    scopePrefix?: string;
  }) {
    const scopePrefix = parameters?.scopePrefix ?? "#";
    return {
      elements: [
        Resource.resourceJsonUiSchema({ scopePrefix }),
        { scope: `${scopePrefix}/properties/member`, type: "Control" },
      ],
      label: "Collection",
      type: "Group",
    };
  }

  export function collectionJsonZodSchema() {
    return Resource.resourceJsonZodSchema().merge(
      zod.object({
        "@id": zod.string().min(1),
        member: zod
          .discriminatedUnion("type", [
            Collection.collectionJsonZodSchema(),
            Concept.conceptJsonZodSchema(),
          ])
          .array(),
        type: zod.enum(["Collection", "OrderedCollection"]),
      }),
    );
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
        Collection.sparqlConstructTemplateTriples({ ignoreRdfType, subject }),
      ),
      type: "query",
      where: (queryParameters.where ?? []).concat(
        Collection.sparqlWherePatterns({ ignoreRdfType, subject }),
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
      Collection.sparqlConstructQuery(parameters),
    );
  }

  export function sparqlConstructTemplateTriples(parameters?: {
    ignoreRdfType?: boolean;
    subject?: sparqljs.Triple["subject"];
    variablePrefix?: string;
  }): readonly sparqljs.Triple[] {
    const subject = parameters?.subject ?? dataFactory.variable!("collection");
    const variablePrefix =
      parameters?.variablePrefix ??
      (subject.termType === "Variable" ? subject.value : "collection");
    return [
      ...Resource.sparqlConstructTemplateTriples({
        ignoreRdfType: true,
        subject,
        variablePrefix,
      }),
      ...(parameters?.ignoreRdfType
        ? []
        : [
            {
              subject,
              predicate: dataFactory.namedNode(
                "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              ),
              object: dataFactory.variable!(`${variablePrefix}RdfType`),
            },
          ]),
      {
        object: dataFactory.variable!(`${variablePrefix}Member`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#member",
        ),
        subject,
      },
      ...Collection.sparqlConstructTemplateTriples({
        ignoreRdfType: true,
        subject: dataFactory.variable!(`${variablePrefix}Member`),
        variablePrefix: `${variablePrefix}Member`,
      }),
      ...Concept.sparqlConstructTemplateTriples({
        ignoreRdfType: true,
        subject: dataFactory.variable!(`${variablePrefix}Member`),
        variablePrefix: `${variablePrefix}Member`,
      }),
    ];
  }

  export function sparqlWherePatterns(parameters: {
    ignoreRdfType?: boolean;
    subject?: sparqljs.Triple["subject"];
    variablePrefix?: string;
  }): readonly sparqljs.Pattern[] {
    const subject = parameters?.subject ?? dataFactory.variable!("collection");
    const variablePrefix =
      parameters?.variablePrefix ??
      (subject.termType === "Variable" ? subject.value : "collection");
    return [
      ...Resource.sparqlWherePatterns({
        ignoreRdfType: true,
        subject,
        variablePrefix,
      }),
      ...(parameters?.ignoreRdfType
        ? []
        : [
            {
              triples: [
                {
                  subject,
                  predicate: dataFactory.namedNode(
                    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
                  ),
                  object: dataFactory.namedNode(
                    "http://www.w3.org/2004/02/skos/core#Collection",
                  ),
                },
              ],
              type: "bgp" as const,
            },
            {
              triples: [
                {
                  subject,
                  predicate: dataFactory.namedNode(
                    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
                  ),
                  object: dataFactory.variable!(`${variablePrefix}RdfType`),
                },
              ],
              type: "bgp" as const,
            },
          ]),
      {
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(`${variablePrefix}Member`),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2004/02/skos/core#member",
                ),
                subject,
              },
            ],
            type: "bgp",
          },
          {
            patterns: [
              {
                patterns: [
                  ...Collection.sparqlWherePatterns({
                    ignoreRdfType: true,
                    subject: dataFactory.variable!(`${variablePrefix}Member`),
                    variablePrefix: `${variablePrefix}Member`,
                  }),
                ],
                type: "group",
              },
              {
                patterns: [
                  ...Concept.sparqlWherePatterns({
                    ignoreRdfType: true,
                    subject: dataFactory.variable!(`${variablePrefix}Member`),
                    variablePrefix: `${variablePrefix}Member`,
                  }),
                ],
                type: "group",
              },
            ],
            type: "union",
          },
        ],
        type: "optional",
      },
    ];
  }
}
export class OrderedCollection extends Collection {
  readonly memberList: readonly (Collection | Concept)[];
  override readonly type = "OrderedCollection";

  constructor(
    parameters: {
      readonly identifier: rdfjs.NamedNode;
      readonly memberList: readonly (Collection | Concept)[];
    } & ConstructorParameters<typeof Collection>[0],
  ) {
    super(parameters);
    this.memberList = parameters.memberList;
  }

  override equals(
    other: OrderedCollection,
  ): purifyHelpers.Equatable.EqualsResult {
    return super.equals(other).chain(() =>
      ((left, right) =>
        purifyHelpers.Arrays.equals(
          left,
          right,
          (left: Collection | Concept, right: Collection | Concept) => {
            if (left.type === "Collection" && right.type === "Collection") {
              return purifyHelpers.Equatable.equals(left, right);
            }
            if (left.type === "Concept" && right.type === "Concept") {
              return purifyHelpers.Equatable.equals(left, right);
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
        ))(this.memberList, other.memberList).mapLeft(
        (propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "memberList",
          propertyValuesUnequal,
          type: "Property" as const,
        }),
      ),
    );
  }

  override hash<
    HasherT extends {
      update: (message: string | number[] | ArrayBuffer | Uint8Array) => void;
    },
  >(_hasher: HasherT): HasherT {
    super.hash(_hasher);
    for (const _element0 of this.memberList) {
      switch (_element0.type) {
        case "Collection": {
          _element0.hash(_hasher);
          break;
        }
        case "Concept": {
          _element0.hash(_hasher);
          break;
        }
      }
    }

    return _hasher;
  }

  override toJson(): {
    readonly memberList: readonly (
      | ReturnType<Collection["toJson"]>
      | ReturnType<Concept["toJson"]>
    )[];
  } & ReturnType<Collection["toJson"]> {
    return JSON.parse(
      JSON.stringify({
        ...super.toJson(),
        memberList: this.memberList.map((_item) =>
          _item.type === "Concept" ? _item.toJson() : _item.toJson(),
        ),
      } satisfies ReturnType<OrderedCollection["toJson"]>),
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
  }): rdfjsResource.MutableResource<rdfjs.NamedNode> {
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
          "http://www.w3.org/2004/02/skos/core#OrderedCollection",
        ),
      );
    }

    _resource.add(
      dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#memberList"),
      this.memberList.reduce(
        ({ currentSubListResource, listResource }, item, itemIndex, list) => {
          if (itemIndex === 0) {
            currentSubListResource = listResource;
          } else {
            const newSubListResource = resourceSet.mutableResource({
              identifier: dataFactory.blankNode(),
              mutateGraph,
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
            dataFactory.namedNode(
              "http://kos-kit.github.io/skos-shacl/ns#OrderedCollectionMemberList",
            ),
          );

          currentSubListResource.add(
            dataFactory.namedNode(
              "http://www.w3.org/1999/02/22-rdf-syntax-ns#first",
            ),
            item.type === "Concept"
              ? item.toRdf({
                  mutateGraph: mutateGraph,
                  resourceSet: resourceSet,
                })
              : item.toRdf({
                  mutateGraph: mutateGraph,
                  resourceSet: resourceSet,
                }),
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
            mutateGraph,
          }),
        } as {
          currentSubListResource: rdfjsResource.MutableResource | null;
          listResource: rdfjsResource.MutableResource;
        },
      ).listResource.identifier,
    );
    return _resource;
  }

  override toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace OrderedCollection {
  export function propertiesFromJson(_json: unknown): purify.Either<
    zod.ZodError,
    {
      identifier: rdfjs.NamedNode;
      memberList: readonly (Collection | Concept)[];
    } & purifyHelpers.Eithers.UnwrapR<
      ReturnType<typeof Collection.propertiesFromJson>
    >
  > {
    const _jsonSafeParseResult =
      orderedCollectionJsonZodSchema().safeParse(_json);
    if (!_jsonSafeParseResult.success) {
      return purify.Left(_jsonSafeParseResult.error);
    }

    const _jsonObject = _jsonSafeParseResult.data;
    const _super0Either = Collection.propertiesFromJson(_jsonObject);
    if (_super0Either.isLeft()) {
      return _super0Either;
    }

    const _super0 = _super0Either.unsafeCoerce();
    const identifier = dataFactory.namedNode(_jsonObject["@id"]);
    const memberList = _jsonObject["memberList"].map((_item) =>
      _item.type === "Concept"
        ? Concept.fromJson(_item).unsafeCoerce()
        : Collection.fromJson(_item).unsafeCoerce(),
    );
    return purify.Either.of({ ..._super0, identifier, memberList });
  }

  export function fromJson(
    json: unknown,
  ): purify.Either<zod.ZodError, OrderedCollection> {
    return OrderedCollection.propertiesFromJson(json).map(
      (properties) => new OrderedCollection(properties),
    );
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
    resource: rdfjsResource.Resource<rdfjs.NamedNode>;
  }): purify.Either<
    rdfjsResource.Resource.ValueError,
    {
      identifier: rdfjs.NamedNode;
      memberList: readonly (Collection | Concept)[];
    } & purifyHelpers.Eithers.UnwrapR<
      ReturnType<typeof Collection.propertiesFromRdf>
    >
  > {
    const _super0Either = Collection.propertiesFromRdf({
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
        dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#OrderedCollection",
        ),
      )
    ) {
      return purify.Left(
        new rdfjsResource.Resource.ValueError({
          focusResource: _resource,
          message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type`,
          predicate: dataFactory.namedNode(
            "http://www.w3.org/2004/02/skos/core#OrderedCollection",
          ),
        }),
      );
    }

    const identifier = _resource.identifier;
    const _memberListEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly (Collection | Concept)[]
    > = _resource
      .values(
        dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#memberList"),
        { unique: true },
      )
      .head()
      .chain((value) => value.toList())
      .map((values) =>
        values.flatMap((_value) =>
          (
            _value
              .toValues()
              .head()
              .chain((value) => value.toNamedResource())
              .chain((_resource) =>
                Collection.fromRdf({
                  ..._context,
                  ignoreRdfType: true,
                  languageIn: _languageIn,
                  resource: _resource,
                }),
              ) as purify.Either<
              rdfjsResource.Resource.ValueError,
              Collection | Concept
            >
          )
            .altLazy(
              () =>
                _value
                  .toValues()
                  .head()
                  .chain((value) => value.toNamedResource())
                  .chain((_resource) =>
                    Concept.fromRdf({
                      ..._context,
                      ignoreRdfType: true,
                      languageIn: _languageIn,
                      resource: _resource,
                    }),
                  ) as purify.Either<
                  rdfjsResource.Resource.ValueError,
                  Collection | Concept
                >,
            )
            .toMaybe()
            .toList(),
        ),
      );
    if (_memberListEither.isLeft()) {
      return _memberListEither;
    }

    const memberList = _memberListEither.unsafeCoerce();
    return purify.Either.of({ ..._super0, identifier, memberList });
  }

  export function fromRdf(
    parameters: Parameters<typeof OrderedCollection.propertiesFromRdf>[0],
  ): purify.Either<rdfjsResource.Resource.ValueError, OrderedCollection> {
    return OrderedCollection.propertiesFromRdf(parameters).map(
      (properties) => new OrderedCollection(properties),
    );
  }

  export function jsonSchema() {
    return zodToJsonSchema(orderedCollectionJsonZodSchema());
  }

  export function orderedCollectionJsonUiSchema(parameters?: {
    scopePrefix?: string;
  }) {
    const scopePrefix = parameters?.scopePrefix ?? "#";
    return {
      elements: [
        Collection.collectionJsonUiSchema({ scopePrefix }),
        { scope: `${scopePrefix}/properties/memberList`, type: "Control" },
      ],
      label: "OrderedCollection",
      type: "Group",
    };
  }

  export function orderedCollectionJsonZodSchema() {
    return Collection.collectionJsonZodSchema().merge(
      zod.object({
        "@id": zod.string().min(1),
        memberList: zod
          .discriminatedUnion("type", [
            Collection.collectionJsonZodSchema(),
            Concept.conceptJsonZodSchema(),
          ])
          .array(),
        type: zod.literal("OrderedCollection"),
      }),
    );
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
        OrderedCollection.sparqlConstructTemplateTriples({
          ignoreRdfType,
          subject,
        }),
      ),
      type: "query",
      where: (queryParameters.where ?? []).concat(
        OrderedCollection.sparqlWherePatterns({ ignoreRdfType, subject }),
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
      OrderedCollection.sparqlConstructQuery(parameters),
    );
  }

  export function sparqlConstructTemplateTriples(parameters?: {
    ignoreRdfType?: boolean;
    subject?: sparqljs.Triple["subject"];
    variablePrefix?: string;
  }): readonly sparqljs.Triple[] {
    const subject =
      parameters?.subject ?? dataFactory.variable!("orderedCollection");
    const variablePrefix =
      parameters?.variablePrefix ??
      (subject.termType === "Variable" ? subject.value : "orderedCollection");
    return [
      ...Collection.sparqlConstructTemplateTriples({
        ignoreRdfType: true,
        subject,
        variablePrefix,
      }),
      ...(parameters?.ignoreRdfType
        ? []
        : [
            {
              subject,
              predicate: dataFactory.namedNode(
                "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              ),
              object: dataFactory.variable!(`${variablePrefix}RdfType`),
            },
          ]),
      {
        object: dataFactory.variable!(`${variablePrefix}MemberList`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#memberList",
        ),
        subject,
      },
      {
        subject: dataFactory.variable!(`${variablePrefix}MemberList`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/1999/02/22-rdf-syntax-ns#first",
        ),
        object: dataFactory.variable!(`${`${variablePrefix}MemberList`}Item0`),
      },
      ...Collection.sparqlConstructTemplateTriples({
        ignoreRdfType: true,
        subject: dataFactory.variable!(`${`${variablePrefix}MemberList`}Item0`),
        variablePrefix: `${`${variablePrefix}MemberList`}Item0`,
      }),
      ...Concept.sparqlConstructTemplateTriples({
        ignoreRdfType: true,
        subject: dataFactory.variable!(`${`${variablePrefix}MemberList`}Item0`),
        variablePrefix: `${`${variablePrefix}MemberList`}Item0`,
      }),
      {
        subject: dataFactory.variable!(`${variablePrefix}MemberList`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/1999/02/22-rdf-syntax-ns#rest",
        ),
        object: dataFactory.variable!(`${`${variablePrefix}MemberList`}Rest0`),
      },
      {
        subject: dataFactory.variable!(`${`${variablePrefix}MemberList`}RestN`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/1999/02/22-rdf-syntax-ns#first",
        ),
        object: dataFactory.variable!(`${`${variablePrefix}MemberList`}ItemN`),
      },
      ...Collection.sparqlConstructTemplateTriples({
        ignoreRdfType: true,
        subject: dataFactory.variable!(`${`${variablePrefix}MemberList`}ItemN`),
        variablePrefix: `${`${variablePrefix}MemberList`}ItemN`,
      }),
      ...Concept.sparqlConstructTemplateTriples({
        ignoreRdfType: true,
        subject: dataFactory.variable!(`${`${variablePrefix}MemberList`}ItemN`),
        variablePrefix: `${`${variablePrefix}MemberList`}ItemN`,
      }),
      {
        subject: dataFactory.variable!(`${`${variablePrefix}MemberList`}RestN`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/1999/02/22-rdf-syntax-ns#rest",
        ),
        object: dataFactory.variable!(
          `${`${variablePrefix}MemberList`}RestNBasic`,
        ),
      },
    ];
  }

  export function sparqlWherePatterns(parameters: {
    ignoreRdfType?: boolean;
    subject?: sparqljs.Triple["subject"];
    variablePrefix?: string;
  }): readonly sparqljs.Pattern[] {
    const subject =
      parameters?.subject ?? dataFactory.variable!("orderedCollection");
    const variablePrefix =
      parameters?.variablePrefix ??
      (subject.termType === "Variable" ? subject.value : "orderedCollection");
    return [
      ...Collection.sparqlWherePatterns({
        ignoreRdfType: true,
        subject,
        variablePrefix,
      }),
      ...(parameters?.ignoreRdfType
        ? []
        : [
            {
              triples: [
                {
                  subject,
                  predicate: dataFactory.namedNode(
                    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
                  ),
                  object: dataFactory.namedNode(
                    "http://www.w3.org/2004/02/skos/core#OrderedCollection",
                  ),
                },
              ],
              type: "bgp" as const,
            },
            {
              triples: [
                {
                  subject,
                  predicate: dataFactory.namedNode(
                    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
                  ),
                  object: dataFactory.variable!(`${variablePrefix}RdfType`),
                },
              ],
              type: "bgp" as const,
            },
          ]),
      {
        triples: [
          {
            object: dataFactory.variable!(`${variablePrefix}MemberList`),
            predicate: dataFactory.namedNode(
              "http://www.w3.org/2004/02/skos/core#memberList",
            ),
            subject,
          },
        ],
        type: "bgp",
      },
      {
        type: "bgp",
        triples: [
          {
            subject: dataFactory.variable!(`${variablePrefix}MemberList`),
            predicate: dataFactory.namedNode(
              "http://www.w3.org/1999/02/22-rdf-syntax-ns#first",
            ),
            object: dataFactory.variable!(
              `${`${variablePrefix}MemberList`}Item0`,
            ),
          },
        ],
      },
      {
        patterns: [
          {
            patterns: [
              ...Collection.sparqlWherePatterns({
                ignoreRdfType: true,
                subject: dataFactory.variable!(
                  `${`${variablePrefix}MemberList`}Item0`,
                ),
                variablePrefix: `${`${variablePrefix}MemberList`}Item0`,
              }),
            ],
            type: "group",
          },
          {
            patterns: [
              ...Concept.sparqlWherePatterns({
                ignoreRdfType: true,
                subject: dataFactory.variable!(
                  `${`${variablePrefix}MemberList`}Item0`,
                ),
                variablePrefix: `${`${variablePrefix}MemberList`}Item0`,
              }),
            ],
            type: "group",
          },
        ],
        type: "union",
      },
      {
        type: "bgp",
        triples: [
          {
            subject: dataFactory.variable!(`${variablePrefix}MemberList`),
            predicate: dataFactory.namedNode(
              "http://www.w3.org/1999/02/22-rdf-syntax-ns#rest",
            ),
            object: dataFactory.variable!(
              `${`${variablePrefix}MemberList`}Rest0`,
            ),
          },
        ],
      },
      {
        type: "optional",
        patterns: [
          {
            type: "bgp",
            triples: [
              {
                subject: dataFactory.variable!(`${variablePrefix}MemberList`),
                predicate: {
                  type: "path",
                  pathType: "*",
                  items: [
                    dataFactory.namedNode(
                      "http://www.w3.org/1999/02/22-rdf-syntax-ns#rest",
                    ),
                  ],
                },
                object: dataFactory.variable!(
                  `${`${variablePrefix}MemberList`}RestN`,
                ),
              },
            ],
          },
          {
            type: "bgp",
            triples: [
              {
                subject: dataFactory.variable!(
                  `${`${variablePrefix}MemberList`}RestN`,
                ),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/1999/02/22-rdf-syntax-ns#first",
                ),
                object: dataFactory.variable!(
                  `${`${variablePrefix}MemberList`}ItemN`,
                ),
              },
            ],
          },
          ...Collection.sparqlConstructTemplateTriples({
            ignoreRdfType: true,
            subject: dataFactory.variable!(
              `${`${variablePrefix}MemberList`}ItemN`,
            ),
            variablePrefix: `${`${variablePrefix}MemberList`}ItemN`,
          }),
          ...Concept.sparqlConstructTemplateTriples({
            ignoreRdfType: true,
            subject: dataFactory.variable!(
              `${`${variablePrefix}MemberList`}ItemN`,
            ),
            variablePrefix: `${`${variablePrefix}MemberList`}ItemN`,
          }),
          {
            type: "bgp",
            triples: [
              {
                subject: dataFactory.variable!(
                  `${`${variablePrefix}MemberList`}RestN`,
                ),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/1999/02/22-rdf-syntax-ns#rest",
                ),
                object: dataFactory.variable!(
                  `${`${variablePrefix}MemberList`}RestNBasic`,
                ),
              },
            ],
          },
        ],
      },
    ];
  }
}
export class ConceptScheme extends Resource {
  readonly hasTopConcept: readonly Concept[];
  identifier: rdfjs.NamedNode;
  override readonly type = "ConceptScheme";

  constructor(
    parameters: {
      readonly hasTopConcept?: readonly Concept[];
      readonly identifier: rdfjs.NamedNode;
    } & ConstructorParameters<typeof Resource>[0],
  ) {
    super(parameters);
    if (typeof parameters.hasTopConcept === "undefined") {
      this.hasTopConcept = [];
    } else if (Array.isArray(parameters.hasTopConcept)) {
      this.hasTopConcept = parameters.hasTopConcept;
    } else {
      this.hasTopConcept = parameters.hasTopConcept as never;
    }

    this.identifier = parameters.identifier;
  }

  override equals(other: ConceptScheme): purifyHelpers.Equatable.EqualsResult {
    return super.equals(other).chain(() =>
      purifyHelpers.Equatable.arrayEquals(
        this.hasTopConcept,
        other.hasTopConcept,
      ).mapLeft((propertyValuesUnequal) => ({
        left: this,
        right: other,
        propertyName: "hasTopConcept",
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
    for (const _item0 of this.hasTopConcept) {
      _item0.hash(_hasher);
    }

    return _hasher;
  }

  override toJson(): {
    readonly hasTopConcept: readonly ReturnType<Concept["toJson"]>[];
  } & ReturnType<Resource["toJson"]> {
    return JSON.parse(
      JSON.stringify({
        ...super.toJson(),
        hasTopConcept: this.hasTopConcept.map((_item) => _item.toJson()),
      } satisfies ReturnType<ConceptScheme["toJson"]>),
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
  }): rdfjsResource.MutableResource<rdfjs.NamedNode> {
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
          "http://www.w3.org/2004/02/skos/core#ConceptScheme",
        ),
      );
    }

    _resource.add(
      dataFactory.namedNode(
        "http://www.w3.org/2004/02/skos/core#hasTopConcept",
      ),
      this.hasTopConcept.map((_item) =>
        _item.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet }),
      ),
    );
    return _resource;
  }

  override toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace ConceptScheme {
  export function propertiesFromJson(_json: unknown): purify.Either<
    zod.ZodError,
    {
      hasTopConcept: readonly Concept[];
      identifier: rdfjs.NamedNode;
    } & purifyHelpers.Eithers.UnwrapR<
      ReturnType<typeof Resource.propertiesFromJson>
    >
  > {
    const _jsonSafeParseResult = conceptSchemeJsonZodSchema().safeParse(_json);
    if (!_jsonSafeParseResult.success) {
      return purify.Left(_jsonSafeParseResult.error);
    }

    const _jsonObject = _jsonSafeParseResult.data;
    const _super0Either = Resource.propertiesFromJson(_jsonObject);
    if (_super0Either.isLeft()) {
      return _super0Either;
    }

    const _super0 = _super0Either.unsafeCoerce();
    const hasTopConcept = _jsonObject["hasTopConcept"].map((_item) =>
      Concept.fromJson(_item).unsafeCoerce(),
    );
    const identifier = dataFactory.namedNode(_jsonObject["@id"]);
    return purify.Either.of({ ..._super0, hasTopConcept, identifier });
  }

  export function fromJson(
    json: unknown,
  ): purify.Either<zod.ZodError, ConceptScheme> {
    return ConceptScheme.propertiesFromJson(json).map(
      (properties) => new ConceptScheme(properties),
    );
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
    resource: rdfjsResource.Resource<rdfjs.NamedNode>;
  }): purify.Either<
    rdfjsResource.Resource.ValueError,
    {
      hasTopConcept: readonly Concept[];
      identifier: rdfjs.NamedNode;
    } & purifyHelpers.Eithers.UnwrapR<
      ReturnType<typeof Resource.propertiesFromRdf>
    >
  > {
    const _super0Either = Resource.propertiesFromRdf({
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
        dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#ConceptScheme",
        ),
      )
    ) {
      return purify.Left(
        new rdfjsResource.Resource.ValueError({
          focusResource: _resource,
          message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type`,
          predicate: dataFactory.namedNode(
            "http://www.w3.org/2004/02/skos/core#ConceptScheme",
          ),
        }),
      );
    }

    const _hasTopConceptEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly Concept[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode(
            "http://www.w3.org/2004/02/skos/core#hasTopConcept",
          ),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((value) => value.toNamedResource())
            .chain((_resource) =>
              Concept.fromRdf({
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
    if (_hasTopConceptEither.isLeft()) {
      return _hasTopConceptEither;
    }

    const hasTopConcept = _hasTopConceptEither.unsafeCoerce();
    const identifier = _resource.identifier;
    return purify.Either.of({ ..._super0, hasTopConcept, identifier });
  }

  export function fromRdf(
    parameters: Parameters<typeof ConceptScheme.propertiesFromRdf>[0],
  ): purify.Either<rdfjsResource.Resource.ValueError, ConceptScheme> {
    return ConceptScheme.propertiesFromRdf(parameters).map(
      (properties) => new ConceptScheme(properties),
    );
  }

  export function jsonSchema() {
    return zodToJsonSchema(conceptSchemeJsonZodSchema());
  }

  export function conceptSchemeJsonUiSchema(parameters?: {
    scopePrefix?: string;
  }) {
    const scopePrefix = parameters?.scopePrefix ?? "#";
    return {
      elements: [
        Resource.resourceJsonUiSchema({ scopePrefix }),
        Concept.conceptJsonUiSchema({
          scopePrefix: `${scopePrefix}/properties/hasTopConcept`,
        }),
      ],
      label: "ConceptScheme",
      type: "Group",
    };
  }

  export function conceptSchemeJsonZodSchema() {
    return Resource.resourceJsonZodSchema().merge(
      zod.object({
        hasTopConcept: Concept.conceptJsonZodSchema().array(),
        "@id": zod.string().min(1),
        type: zod.literal("ConceptScheme"),
      }),
    );
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
        ConceptScheme.sparqlConstructTemplateTriples({
          ignoreRdfType,
          subject,
        }),
      ),
      type: "query",
      where: (queryParameters.where ?? []).concat(
        ConceptScheme.sparqlWherePatterns({ ignoreRdfType, subject }),
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
      ConceptScheme.sparqlConstructQuery(parameters),
    );
  }

  export function sparqlConstructTemplateTriples(parameters?: {
    ignoreRdfType?: boolean;
    subject?: sparqljs.Triple["subject"];
    variablePrefix?: string;
  }): readonly sparqljs.Triple[] {
    const subject =
      parameters?.subject ?? dataFactory.variable!("conceptScheme");
    const variablePrefix =
      parameters?.variablePrefix ??
      (subject.termType === "Variable" ? subject.value : "conceptScheme");
    return [
      ...Resource.sparqlConstructTemplateTriples({
        ignoreRdfType: true,
        subject,
        variablePrefix,
      }),
      ...(parameters?.ignoreRdfType
        ? []
        : [
            {
              subject,
              predicate: dataFactory.namedNode(
                "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              ),
              object: dataFactory.variable!(`${variablePrefix}RdfType`),
            },
          ]),
      {
        object: dataFactory.variable!(`${variablePrefix}HasTopConcept`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#hasTopConcept",
        ),
        subject,
      },
      ...Concept.sparqlConstructTemplateTriples({
        ignoreRdfType: true,
        subject: dataFactory.variable!(`${variablePrefix}HasTopConcept`),
        variablePrefix: `${variablePrefix}HasTopConcept`,
      }),
    ];
  }

  export function sparqlWherePatterns(parameters: {
    ignoreRdfType?: boolean;
    subject?: sparqljs.Triple["subject"];
    variablePrefix?: string;
  }): readonly sparqljs.Pattern[] {
    const subject =
      parameters?.subject ?? dataFactory.variable!("conceptScheme");
    const variablePrefix =
      parameters?.variablePrefix ??
      (subject.termType === "Variable" ? subject.value : "conceptScheme");
    return [
      ...Resource.sparqlWherePatterns({
        ignoreRdfType: true,
        subject,
        variablePrefix,
      }),
      ...(parameters?.ignoreRdfType
        ? []
        : [
            {
              triples: [
                {
                  subject,
                  predicate: dataFactory.namedNode(
                    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
                  ),
                  object: dataFactory.namedNode(
                    "http://www.w3.org/2004/02/skos/core#ConceptScheme",
                  ),
                },
              ],
              type: "bgp" as const,
            },
            {
              triples: [
                {
                  subject,
                  predicate: dataFactory.namedNode(
                    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
                  ),
                  object: dataFactory.variable!(`${variablePrefix}RdfType`),
                },
              ],
              type: "bgp" as const,
            },
          ]),
      {
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(`${variablePrefix}HasTopConcept`),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2004/02/skos/core#hasTopConcept",
                ),
                subject,
              },
            ],
            type: "bgp",
          },
          ...Concept.sparqlWherePatterns({
            ignoreRdfType: true,
            subject: dataFactory.variable!(`${variablePrefix}HasTopConcept`),
            variablePrefix: `${variablePrefix}HasTopConcept`,
          }),
        ],
        type: "optional",
      },
    ];
  }
}
export class Label {
  private _identifier: (rdfjs.BlankNode | rdfjs.NamedNode) | undefined;
  readonly literalForm: purify.NonEmptyList<rdfjs.Literal>;
  readonly type = "Label";

  constructor(parameters: {
    readonly identifier?: rdfjs.BlankNode | rdfjs.NamedNode;
    readonly literalForm: purify.NonEmptyList<rdfjs.Literal>;
  }) {
    this._identifier = parameters.identifier;
    this.literalForm = parameters.literalForm;
  }

  get identifier(): rdfjs.BlankNode | rdfjs.NamedNode {
    if (typeof this._identifier === "undefined") {
      this._identifier = dataFactory.blankNode();
    }
    return this._identifier;
  }

  equals(other: Label): purifyHelpers.Equatable.EqualsResult {
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
          ))(this.literalForm, other.literalForm).mapLeft(
          (propertyValuesUnequal) => ({
            left: this,
            right: other,
            propertyName: "literalForm",
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
    for (const _item0 of this.literalForm) {
      _hasher.update(_item0.datatype.value);
      _hasher.update(_item0.language);
      _hasher.update(_item0.termType);
      _hasher.update(_item0.value);
    }

    return _hasher;
  }

  toJson(): {
    readonly "@id": string;
    readonly literalForm: purify.NonEmptyList<{
      readonly "@language": string | undefined;
      readonly "@type": string | undefined;
      readonly "@value": string;
    }>;
    readonly type: "Label";
  } {
    return JSON.parse(
      JSON.stringify({
        "@id":
          this.identifier.termType === "BlankNode"
            ? `_:${this.identifier.value}`
            : this.identifier.value,
        literalForm: this.literalForm.map((_item) => ({
          "@language": _item.language.length > 0 ? _item.language : undefined,
          "@type":
            _item.datatype.value !== "http://www.w3.org/2001/XMLSchema#string"
              ? _item.datatype.value
              : undefined,
          "@value": _item.value,
        })),
        type: this.type,
      } satisfies ReturnType<Label["toJson"]>),
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
          "http://www.w3.org/2008/05/skos-xl#Label",
        ),
      );
    }

    _resource.add(
      dataFactory.namedNode("http://www.w3.org/2008/05/skos-xl#literalForm"),
      this.literalForm.map((_item) => _item),
    );
    return _resource;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace Label {
  export function propertiesFromJson(_json: unknown): purify.Either<
    zod.ZodError,
    {
      identifier: rdfjs.BlankNode | rdfjs.NamedNode;
      literalForm: purify.NonEmptyList<rdfjs.Literal>;
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
    const literalForm = purify.NonEmptyList.fromArray(
      _jsonObject["literalForm"],
    )
      .unsafeCoerce()
      .map((_item) =>
        dataFactory.literal(
          _item["@value"],
          typeof _item["@language"] !== "undefined"
            ? _item["@language"]
            : typeof _item["@type"] !== "undefined"
              ? dataFactory.namedNode(_item["@type"])
              : undefined,
        ),
      );
    return purify.Either.of({ identifier, literalForm });
  }

  export function fromJson(json: unknown): purify.Either<zod.ZodError, Label> {
    return Label.propertiesFromJson(json).map(
      (properties) => new Label(properties),
    );
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
      literalForm: purify.NonEmptyList<rdfjs.Literal>;
    }
  > {
    if (
      !_ignoreRdfType &&
      !_resource.isInstanceOf(
        dataFactory.namedNode("http://www.w3.org/2008/05/skos-xl#Label"),
      )
    ) {
      return purify.Left(
        new rdfjsResource.Resource.ValueError({
          focusResource: _resource,
          message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type`,
          predicate: dataFactory.namedNode(
            "http://www.w3.org/2008/05/skos-xl#Label",
          ),
        }),
      );
    }

    const identifier = _resource.identifier;
    const _literalFormEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      purify.NonEmptyList<rdfjs.Literal>
    > = purify.NonEmptyList.fromArray([
      ..._resource
        .values(
          dataFactory.namedNode(
            "http://www.w3.org/2008/05/skos-xl#literalForm",
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
    ]).toEither(
      new rdfjsResource.Resource.ValueError({
        focusResource: _resource,
        message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} is empty`,
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2008/05/skos-xl#literalForm",
        ),
      }),
    );
    if (_literalFormEither.isLeft()) {
      return _literalFormEither;
    }

    const literalForm = _literalFormEither.unsafeCoerce();
    return purify.Either.of({ identifier, literalForm });
  }

  export function fromRdf(
    parameters: Parameters<typeof Label.propertiesFromRdf>[0],
  ): purify.Either<rdfjsResource.Resource.ValueError, Label> {
    return Label.propertiesFromRdf(parameters).map(
      (properties) => new Label(properties),
    );
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
        { scope: `${scopePrefix}/properties/literalForm`, type: "Control" },
        {
          rule: {
            condition: {
              schema: { const: "Label" },
              scope: `${scopePrefix}/properties/type`,
            },
            effect: "HIDE",
          },
          scope: `${scopePrefix}/properties/type`,
          type: "Control",
        },
      ],
      label: "Label",
      type: "Group",
    };
  }

  export function jsonZodSchema() {
    return zod.object({
      "@id": zod.string().min(1),
      literalForm: zod
        .object({
          "@language": zod.string().optional(),
          "@type": zod.string().optional(),
          "@value": zod.string(),
        })
        .array()
        .nonempty()
        .min(1),
      type: zod.literal("Label"),
    });
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
        Label.sparqlConstructTemplateTriples({ ignoreRdfType, subject }),
      ),
      type: "query",
      where: (queryParameters.where ?? []).concat(
        Label.sparqlWherePatterns({ ignoreRdfType, subject }),
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
      Label.sparqlConstructQuery(parameters),
    );
  }

  export function sparqlConstructTemplateTriples(parameters?: {
    ignoreRdfType?: boolean;
    subject?: sparqljs.Triple["subject"];
    variablePrefix?: string;
  }): readonly sparqljs.Triple[] {
    const subject = parameters?.subject ?? dataFactory.variable!("label");
    const variablePrefix =
      parameters?.variablePrefix ??
      (subject.termType === "Variable" ? subject.value : "label");
    return [
      ...(parameters?.ignoreRdfType
        ? []
        : [
            {
              subject,
              predicate: dataFactory.namedNode(
                "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              ),
              object: dataFactory.variable!(`${variablePrefix}RdfType`),
            },
          ]),
      {
        object: dataFactory.variable!(`${variablePrefix}LiteralForm`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2008/05/skos-xl#literalForm",
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
    const subject = parameters?.subject ?? dataFactory.variable!("label");
    const variablePrefix =
      parameters?.variablePrefix ??
      (subject.termType === "Variable" ? subject.value : "label");
    return [
      ...(parameters?.ignoreRdfType
        ? []
        : [
            {
              triples: [
                {
                  subject,
                  predicate: dataFactory.namedNode(
                    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
                  ),
                  object: dataFactory.namedNode(
                    "http://www.w3.org/2008/05/skos-xl#Label",
                  ),
                },
              ],
              type: "bgp" as const,
            },
            {
              triples: [
                {
                  subject,
                  predicate: dataFactory.namedNode(
                    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
                  ),
                  object: dataFactory.variable!(`${variablePrefix}RdfType`),
                },
              ],
              type: "bgp" as const,
            },
          ]),
      {
        triples: [
          {
            object: dataFactory.variable!(`${variablePrefix}LiteralForm`),
            predicate: dataFactory.namedNode(
              "http://www.w3.org/2008/05/skos-xl#literalForm",
            ),
            subject,
          },
        ],
        type: "bgp",
      },
    ];
  }
}
export class Concept extends Resource {
  readonly broader: readonly Concept[];
  readonly broaderTransitive: readonly Concept[];
  readonly broadMatch: readonly Concept[];
  readonly closeMatch: readonly Concept[];
  readonly exactMatch: readonly Concept[];
  identifier: rdfjs.NamedNode;
  readonly inScheme: readonly ConceptScheme[];
  readonly mappingRelation: readonly Concept[];
  readonly narrower: readonly Concept[];
  readonly narrowerTransitive: readonly Concept[];
  readonly narrowMatch: readonly Concept[];
  readonly related: readonly Concept[];
  readonly relatedMatch: readonly Concept[];
  readonly semanticRelation: readonly Concept[];
  readonly topConceptOf: readonly ConceptScheme[];
  override readonly type = "Concept";

  constructor(
    parameters: {
      readonly broader?: readonly Concept[];
      readonly broaderTransitive?: readonly Concept[];
      readonly broadMatch?: readonly Concept[];
      readonly closeMatch?: readonly Concept[];
      readonly exactMatch?: readonly Concept[];
      readonly identifier: rdfjs.NamedNode;
      readonly inScheme?: readonly ConceptScheme[];
      readonly mappingRelation?: readonly Concept[];
      readonly narrower?: readonly Concept[];
      readonly narrowerTransitive?: readonly Concept[];
      readonly narrowMatch?: readonly Concept[];
      readonly related?: readonly Concept[];
      readonly relatedMatch?: readonly Concept[];
      readonly semanticRelation?: readonly Concept[];
      readonly topConceptOf?: readonly ConceptScheme[];
    } & ConstructorParameters<typeof Resource>[0],
  ) {
    super(parameters);
    if (typeof parameters.broader === "undefined") {
      this.broader = [];
    } else if (Array.isArray(parameters.broader)) {
      this.broader = parameters.broader;
    } else {
      this.broader = parameters.broader as never;
    }

    if (typeof parameters.broaderTransitive === "undefined") {
      this.broaderTransitive = [];
    } else if (Array.isArray(parameters.broaderTransitive)) {
      this.broaderTransitive = parameters.broaderTransitive;
    } else {
      this.broaderTransitive = parameters.broaderTransitive as never;
    }

    if (typeof parameters.broadMatch === "undefined") {
      this.broadMatch = [];
    } else if (Array.isArray(parameters.broadMatch)) {
      this.broadMatch = parameters.broadMatch;
    } else {
      this.broadMatch = parameters.broadMatch as never;
    }

    if (typeof parameters.closeMatch === "undefined") {
      this.closeMatch = [];
    } else if (Array.isArray(parameters.closeMatch)) {
      this.closeMatch = parameters.closeMatch;
    } else {
      this.closeMatch = parameters.closeMatch as never;
    }

    if (typeof parameters.exactMatch === "undefined") {
      this.exactMatch = [];
    } else if (Array.isArray(parameters.exactMatch)) {
      this.exactMatch = parameters.exactMatch;
    } else {
      this.exactMatch = parameters.exactMatch as never;
    }

    this.identifier = parameters.identifier;
    if (typeof parameters.inScheme === "undefined") {
      this.inScheme = [];
    } else if (Array.isArray(parameters.inScheme)) {
      this.inScheme = parameters.inScheme;
    } else {
      this.inScheme = parameters.inScheme as never;
    }

    if (typeof parameters.mappingRelation === "undefined") {
      this.mappingRelation = [];
    } else if (Array.isArray(parameters.mappingRelation)) {
      this.mappingRelation = parameters.mappingRelation;
    } else {
      this.mappingRelation = parameters.mappingRelation as never;
    }

    if (typeof parameters.narrower === "undefined") {
      this.narrower = [];
    } else if (Array.isArray(parameters.narrower)) {
      this.narrower = parameters.narrower;
    } else {
      this.narrower = parameters.narrower as never;
    }

    if (typeof parameters.narrowerTransitive === "undefined") {
      this.narrowerTransitive = [];
    } else if (Array.isArray(parameters.narrowerTransitive)) {
      this.narrowerTransitive = parameters.narrowerTransitive;
    } else {
      this.narrowerTransitive = parameters.narrowerTransitive as never;
    }

    if (typeof parameters.narrowMatch === "undefined") {
      this.narrowMatch = [];
    } else if (Array.isArray(parameters.narrowMatch)) {
      this.narrowMatch = parameters.narrowMatch;
    } else {
      this.narrowMatch = parameters.narrowMatch as never;
    }

    if (typeof parameters.related === "undefined") {
      this.related = [];
    } else if (Array.isArray(parameters.related)) {
      this.related = parameters.related;
    } else {
      this.related = parameters.related as never;
    }

    if (typeof parameters.relatedMatch === "undefined") {
      this.relatedMatch = [];
    } else if (Array.isArray(parameters.relatedMatch)) {
      this.relatedMatch = parameters.relatedMatch;
    } else {
      this.relatedMatch = parameters.relatedMatch as never;
    }

    if (typeof parameters.semanticRelation === "undefined") {
      this.semanticRelation = [];
    } else if (Array.isArray(parameters.semanticRelation)) {
      this.semanticRelation = parameters.semanticRelation;
    } else {
      this.semanticRelation = parameters.semanticRelation as never;
    }

    if (typeof parameters.topConceptOf === "undefined") {
      this.topConceptOf = [];
    } else if (Array.isArray(parameters.topConceptOf)) {
      this.topConceptOf = parameters.topConceptOf;
    } else {
      this.topConceptOf = parameters.topConceptOf as never;
    }
  }

  override equals(other: Concept): purifyHelpers.Equatable.EqualsResult {
    return super
      .equals(other)
      .chain(() =>
        purifyHelpers.Equatable.arrayEquals(
          this.broader,
          other.broader,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "broader",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.arrayEquals(
          this.broaderTransitive,
          other.broaderTransitive,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "broaderTransitive",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.arrayEquals(
          this.broadMatch,
          other.broadMatch,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "broadMatch",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.arrayEquals(
          this.closeMatch,
          other.closeMatch,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "closeMatch",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.arrayEquals(
          this.exactMatch,
          other.exactMatch,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "exactMatch",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.arrayEquals(
          this.inScheme,
          other.inScheme,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "inScheme",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.arrayEquals(
          this.mappingRelation,
          other.mappingRelation,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "mappingRelation",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.arrayEquals(
          this.narrower,
          other.narrower,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "narrower",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.arrayEquals(
          this.narrowerTransitive,
          other.narrowerTransitive,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "narrowerTransitive",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.arrayEquals(
          this.narrowMatch,
          other.narrowMatch,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "narrowMatch",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.arrayEquals(
          this.related,
          other.related,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "related",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.arrayEquals(
          this.relatedMatch,
          other.relatedMatch,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "relatedMatch",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.arrayEquals(
          this.semanticRelation,
          other.semanticRelation,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "semanticRelation",
          propertyValuesUnequal,
          type: "Property" as const,
        })),
      )
      .chain(() =>
        purifyHelpers.Equatable.arrayEquals(
          this.topConceptOf,
          other.topConceptOf,
        ).mapLeft((propertyValuesUnequal) => ({
          left: this,
          right: other,
          propertyName: "topConceptOf",
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
    for (const _item0 of this.broader) {
      _item0.hash(_hasher);
    }

    for (const _item0 of this.broaderTransitive) {
      _item0.hash(_hasher);
    }

    for (const _item0 of this.broadMatch) {
      _item0.hash(_hasher);
    }

    for (const _item0 of this.closeMatch) {
      _item0.hash(_hasher);
    }

    for (const _item0 of this.exactMatch) {
      _item0.hash(_hasher);
    }

    for (const _item0 of this.inScheme) {
      _item0.hash(_hasher);
    }

    for (const _item0 of this.mappingRelation) {
      _item0.hash(_hasher);
    }

    for (const _item0 of this.narrower) {
      _item0.hash(_hasher);
    }

    for (const _item0 of this.narrowerTransitive) {
      _item0.hash(_hasher);
    }

    for (const _item0 of this.narrowMatch) {
      _item0.hash(_hasher);
    }

    for (const _item0 of this.related) {
      _item0.hash(_hasher);
    }

    for (const _item0 of this.relatedMatch) {
      _item0.hash(_hasher);
    }

    for (const _item0 of this.semanticRelation) {
      _item0.hash(_hasher);
    }

    for (const _item0 of this.topConceptOf) {
      _item0.hash(_hasher);
    }

    return _hasher;
  }

  override toJson(): {
    readonly broader: readonly ReturnType<Concept["toJson"]>[];
    readonly broaderTransitive: readonly ReturnType<Concept["toJson"]>[];
    readonly broadMatch: readonly ReturnType<Concept["toJson"]>[];
    readonly closeMatch: readonly ReturnType<Concept["toJson"]>[];
    readonly exactMatch: readonly ReturnType<Concept["toJson"]>[];
    readonly inScheme: readonly ReturnType<ConceptScheme["toJson"]>[];
    readonly mappingRelation: readonly ReturnType<Concept["toJson"]>[];
    readonly narrower: readonly ReturnType<Concept["toJson"]>[];
    readonly narrowerTransitive: readonly ReturnType<Concept["toJson"]>[];
    readonly narrowMatch: readonly ReturnType<Concept["toJson"]>[];
    readonly related: readonly ReturnType<Concept["toJson"]>[];
    readonly relatedMatch: readonly ReturnType<Concept["toJson"]>[];
    readonly semanticRelation: readonly ReturnType<Concept["toJson"]>[];
    readonly topConceptOf: readonly ReturnType<ConceptScheme["toJson"]>[];
  } & ReturnType<Resource["toJson"]> {
    return JSON.parse(
      JSON.stringify({
        ...super.toJson(),
        broader: this.broader.map((_item) => _item.toJson()),
        broaderTransitive: this.broaderTransitive.map((_item) =>
          _item.toJson(),
        ),
        broadMatch: this.broadMatch.map((_item) => _item.toJson()),
        closeMatch: this.closeMatch.map((_item) => _item.toJson()),
        exactMatch: this.exactMatch.map((_item) => _item.toJson()),
        inScheme: this.inScheme.map((_item) => _item.toJson()),
        mappingRelation: this.mappingRelation.map((_item) => _item.toJson()),
        narrower: this.narrower.map((_item) => _item.toJson()),
        narrowerTransitive: this.narrowerTransitive.map((_item) =>
          _item.toJson(),
        ),
        narrowMatch: this.narrowMatch.map((_item) => _item.toJson()),
        related: this.related.map((_item) => _item.toJson()),
        relatedMatch: this.relatedMatch.map((_item) => _item.toJson()),
        semanticRelation: this.semanticRelation.map((_item) => _item.toJson()),
        topConceptOf: this.topConceptOf.map((_item) => _item.toJson()),
      } satisfies ReturnType<Concept["toJson"]>),
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
  }): rdfjsResource.MutableResource<rdfjs.NamedNode> {
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
          "http://www.w3.org/2004/02/skos/core#Concept",
        ),
      );
    }

    _resource.add(
      dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#broader"),
      this.broader.map((_item) =>
        _item.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet }),
      ),
    );
    _resource.add(
      dataFactory.namedNode(
        "http://www.w3.org/2004/02/skos/core#broaderTransitive",
      ),
      this.broaderTransitive.map((_item) =>
        _item.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet }),
      ),
    );
    _resource.add(
      dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#broadMatch"),
      this.broadMatch.map((_item) =>
        _item.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet }),
      ),
    );
    _resource.add(
      dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#closeMatch"),
      this.closeMatch.map((_item) =>
        _item.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet }),
      ),
    );
    _resource.add(
      dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#exactMatch"),
      this.exactMatch.map((_item) =>
        _item.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet }),
      ),
    );
    _resource.add(
      dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#inScheme"),
      this.inScheme.map((_item) =>
        _item.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet }),
      ),
    );
    _resource.add(
      dataFactory.namedNode(
        "http://www.w3.org/2004/02/skos/core#mappingRelation",
      ),
      this.mappingRelation.map((_item) =>
        _item.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet }),
      ),
    );
    _resource.add(
      dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#narrower"),
      this.narrower.map((_item) =>
        _item.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet }),
      ),
    );
    _resource.add(
      dataFactory.namedNode(
        "http://www.w3.org/2004/02/skos/core#narrowerTransitive",
      ),
      this.narrowerTransitive.map((_item) =>
        _item.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet }),
      ),
    );
    _resource.add(
      dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#narrowMatch"),
      this.narrowMatch.map((_item) =>
        _item.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet }),
      ),
    );
    _resource.add(
      dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#related"),
      this.related.map((_item) =>
        _item.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet }),
      ),
    );
    _resource.add(
      dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#relatedMatch"),
      this.relatedMatch.map((_item) =>
        _item.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet }),
      ),
    );
    _resource.add(
      dataFactory.namedNode(
        "http://www.w3.org/2004/02/skos/core#semanticRelation",
      ),
      this.semanticRelation.map((_item) =>
        _item.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet }),
      ),
    );
    _resource.add(
      dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#topConceptOf"),
      this.topConceptOf.map((_item) =>
        _item.toRdf({ mutateGraph: mutateGraph, resourceSet: resourceSet }),
      ),
    );
    return _resource;
  }

  override toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export namespace Concept {
  export function propertiesFromJson(_json: unknown): purify.Either<
    zod.ZodError,
    {
      broader: readonly Concept[];
      broaderTransitive: readonly Concept[];
      broadMatch: readonly Concept[];
      closeMatch: readonly Concept[];
      exactMatch: readonly Concept[];
      identifier: rdfjs.NamedNode;
      inScheme: readonly ConceptScheme[];
      mappingRelation: readonly Concept[];
      narrower: readonly Concept[];
      narrowerTransitive: readonly Concept[];
      narrowMatch: readonly Concept[];
      related: readonly Concept[];
      relatedMatch: readonly Concept[];
      semanticRelation: readonly Concept[];
      topConceptOf: readonly ConceptScheme[];
    } & purifyHelpers.Eithers.UnwrapR<
      ReturnType<typeof Resource.propertiesFromJson>
    >
  > {
    const _jsonSafeParseResult = conceptJsonZodSchema().safeParse(_json);
    if (!_jsonSafeParseResult.success) {
      return purify.Left(_jsonSafeParseResult.error);
    }

    const _jsonObject = _jsonSafeParseResult.data;
    const _super0Either = Resource.propertiesFromJson(_jsonObject);
    if (_super0Either.isLeft()) {
      return _super0Either;
    }

    const _super0 = _super0Either.unsafeCoerce();
    const broader = _jsonObject["broader"].map((_item) =>
      Concept.fromJson(_item).unsafeCoerce(),
    );
    const broaderTransitive = _jsonObject["broaderTransitive"].map((_item) =>
      Concept.fromJson(_item).unsafeCoerce(),
    );
    const broadMatch = _jsonObject["broadMatch"].map((_item) =>
      Concept.fromJson(_item).unsafeCoerce(),
    );
    const closeMatch = _jsonObject["closeMatch"].map((_item) =>
      Concept.fromJson(_item).unsafeCoerce(),
    );
    const exactMatch = _jsonObject["exactMatch"].map((_item) =>
      Concept.fromJson(_item).unsafeCoerce(),
    );
    const identifier = dataFactory.namedNode(_jsonObject["@id"]);
    const inScheme = _jsonObject["inScheme"].map((_item) =>
      ConceptScheme.fromJson(_item).unsafeCoerce(),
    );
    const mappingRelation = _jsonObject["mappingRelation"].map((_item) =>
      Concept.fromJson(_item).unsafeCoerce(),
    );
    const narrower = _jsonObject["narrower"].map((_item) =>
      Concept.fromJson(_item).unsafeCoerce(),
    );
    const narrowerTransitive = _jsonObject["narrowerTransitive"].map((_item) =>
      Concept.fromJson(_item).unsafeCoerce(),
    );
    const narrowMatch = _jsonObject["narrowMatch"].map((_item) =>
      Concept.fromJson(_item).unsafeCoerce(),
    );
    const related = _jsonObject["related"].map((_item) =>
      Concept.fromJson(_item).unsafeCoerce(),
    );
    const relatedMatch = _jsonObject["relatedMatch"].map((_item) =>
      Concept.fromJson(_item).unsafeCoerce(),
    );
    const semanticRelation = _jsonObject["semanticRelation"].map((_item) =>
      Concept.fromJson(_item).unsafeCoerce(),
    );
    const topConceptOf = _jsonObject["topConceptOf"].map((_item) =>
      ConceptScheme.fromJson(_item).unsafeCoerce(),
    );
    return purify.Either.of({
      ..._super0,
      broader,
      broaderTransitive,
      broadMatch,
      closeMatch,
      exactMatch,
      identifier,
      inScheme,
      mappingRelation,
      narrower,
      narrowerTransitive,
      narrowMatch,
      related,
      relatedMatch,
      semanticRelation,
      topConceptOf,
    });
  }

  export function fromJson(
    json: unknown,
  ): purify.Either<zod.ZodError, Concept> {
    return Concept.propertiesFromJson(json).map(
      (properties) => new Concept(properties),
    );
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
    resource: rdfjsResource.Resource<rdfjs.NamedNode>;
  }): purify.Either<
    rdfjsResource.Resource.ValueError,
    {
      broader: readonly Concept[];
      broaderTransitive: readonly Concept[];
      broadMatch: readonly Concept[];
      closeMatch: readonly Concept[];
      exactMatch: readonly Concept[];
      identifier: rdfjs.NamedNode;
      inScheme: readonly ConceptScheme[];
      mappingRelation: readonly Concept[];
      narrower: readonly Concept[];
      narrowerTransitive: readonly Concept[];
      narrowMatch: readonly Concept[];
      related: readonly Concept[];
      relatedMatch: readonly Concept[];
      semanticRelation: readonly Concept[];
      topConceptOf: readonly ConceptScheme[];
    } & purifyHelpers.Eithers.UnwrapR<
      ReturnType<typeof Resource.propertiesFromRdf>
    >
  > {
    const _super0Either = Resource.propertiesFromRdf({
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
        dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#Concept"),
      )
    ) {
      return purify.Left(
        new rdfjsResource.Resource.ValueError({
          focusResource: _resource,
          message: `${rdfjsResource.Resource.Identifier.toString(_resource.identifier)} has unexpected RDF type`,
          predicate: dataFactory.namedNode(
            "http://www.w3.org/2004/02/skos/core#Concept",
          ),
        }),
      );
    }

    const _broaderEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly Concept[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#broader"),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((value) => value.toNamedResource())
            .chain((_resource) =>
              Concept.fromRdf({
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
    if (_broaderEither.isLeft()) {
      return _broaderEither;
    }

    const broader = _broaderEither.unsafeCoerce();
    const _broaderTransitiveEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly Concept[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode(
            "http://www.w3.org/2004/02/skos/core#broaderTransitive",
          ),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((value) => value.toNamedResource())
            .chain((_resource) =>
              Concept.fromRdf({
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
    if (_broaderTransitiveEither.isLeft()) {
      return _broaderTransitiveEither;
    }

    const broaderTransitive = _broaderTransitiveEither.unsafeCoerce();
    const _broadMatchEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly Concept[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode(
            "http://www.w3.org/2004/02/skos/core#broadMatch",
          ),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((value) => value.toNamedResource())
            .chain((_resource) =>
              Concept.fromRdf({
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
    if (_broadMatchEither.isLeft()) {
      return _broadMatchEither;
    }

    const broadMatch = _broadMatchEither.unsafeCoerce();
    const _closeMatchEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly Concept[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode(
            "http://www.w3.org/2004/02/skos/core#closeMatch",
          ),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((value) => value.toNamedResource())
            .chain((_resource) =>
              Concept.fromRdf({
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
    if (_closeMatchEither.isLeft()) {
      return _closeMatchEither;
    }

    const closeMatch = _closeMatchEither.unsafeCoerce();
    const _exactMatchEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly Concept[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode(
            "http://www.w3.org/2004/02/skos/core#exactMatch",
          ),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((value) => value.toNamedResource())
            .chain((_resource) =>
              Concept.fromRdf({
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
    if (_exactMatchEither.isLeft()) {
      return _exactMatchEither;
    }

    const exactMatch = _exactMatchEither.unsafeCoerce();
    const identifier = _resource.identifier;
    const _inSchemeEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly ConceptScheme[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#inScheme"),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((value) => value.toNamedResource())
            .chain((_resource) =>
              ConceptScheme.fromRdf({
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
    if (_inSchemeEither.isLeft()) {
      return _inSchemeEither;
    }

    const inScheme = _inSchemeEither.unsafeCoerce();
    const _mappingRelationEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly Concept[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode(
            "http://www.w3.org/2004/02/skos/core#mappingRelation",
          ),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((value) => value.toNamedResource())
            .chain((_resource) =>
              Concept.fromRdf({
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
    if (_mappingRelationEither.isLeft()) {
      return _mappingRelationEither;
    }

    const mappingRelation = _mappingRelationEither.unsafeCoerce();
    const _narrowerEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly Concept[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#narrower"),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((value) => value.toNamedResource())
            .chain((_resource) =>
              Concept.fromRdf({
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
    if (_narrowerEither.isLeft()) {
      return _narrowerEither;
    }

    const narrower = _narrowerEither.unsafeCoerce();
    const _narrowerTransitiveEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly Concept[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode(
            "http://www.w3.org/2004/02/skos/core#narrowerTransitive",
          ),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((value) => value.toNamedResource())
            .chain((_resource) =>
              Concept.fromRdf({
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
    if (_narrowerTransitiveEither.isLeft()) {
      return _narrowerTransitiveEither;
    }

    const narrowerTransitive = _narrowerTransitiveEither.unsafeCoerce();
    const _narrowMatchEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly Concept[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode(
            "http://www.w3.org/2004/02/skos/core#narrowMatch",
          ),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((value) => value.toNamedResource())
            .chain((_resource) =>
              Concept.fromRdf({
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
    if (_narrowMatchEither.isLeft()) {
      return _narrowMatchEither;
    }

    const narrowMatch = _narrowMatchEither.unsafeCoerce();
    const _relatedEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly Concept[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode("http://www.w3.org/2004/02/skos/core#related"),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((value) => value.toNamedResource())
            .chain((_resource) =>
              Concept.fromRdf({
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
    if (_relatedEither.isLeft()) {
      return _relatedEither;
    }

    const related = _relatedEither.unsafeCoerce();
    const _relatedMatchEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly Concept[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode(
            "http://www.w3.org/2004/02/skos/core#relatedMatch",
          ),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((value) => value.toNamedResource())
            .chain((_resource) =>
              Concept.fromRdf({
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
    if (_relatedMatchEither.isLeft()) {
      return _relatedMatchEither;
    }

    const relatedMatch = _relatedMatchEither.unsafeCoerce();
    const _semanticRelationEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly Concept[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode(
            "http://www.w3.org/2004/02/skos/core#semanticRelation",
          ),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((value) => value.toNamedResource())
            .chain((_resource) =>
              Concept.fromRdf({
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
    if (_semanticRelationEither.isLeft()) {
      return _semanticRelationEither;
    }

    const semanticRelation = _semanticRelationEither.unsafeCoerce();
    const _topConceptOfEither: purify.Either<
      rdfjsResource.Resource.ValueError,
      readonly ConceptScheme[]
    > = purify.Either.of([
      ..._resource
        .values(
          dataFactory.namedNode(
            "http://www.w3.org/2004/02/skos/core#topConceptOf",
          ),
          { unique: true },
        )
        .flatMap((_item) =>
          _item
            .toValues()
            .head()
            .chain((value) => value.toNamedResource())
            .chain((_resource) =>
              ConceptScheme.fromRdf({
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
    if (_topConceptOfEither.isLeft()) {
      return _topConceptOfEither;
    }

    const topConceptOf = _topConceptOfEither.unsafeCoerce();
    return purify.Either.of({
      ..._super0,
      broader,
      broaderTransitive,
      broadMatch,
      closeMatch,
      exactMatch,
      identifier,
      inScheme,
      mappingRelation,
      narrower,
      narrowerTransitive,
      narrowMatch,
      related,
      relatedMatch,
      semanticRelation,
      topConceptOf,
    });
  }

  export function fromRdf(
    parameters: Parameters<typeof Concept.propertiesFromRdf>[0],
  ): purify.Either<rdfjsResource.Resource.ValueError, Concept> {
    return Concept.propertiesFromRdf(parameters).map(
      (properties) => new Concept(properties),
    );
  }

  export function jsonSchema() {
    return zodToJsonSchema(conceptJsonZodSchema());
  }

  export function conceptJsonUiSchema(parameters?: { scopePrefix?: string }) {
    const scopePrefix = parameters?.scopePrefix ?? "#";
    return {
      elements: [
        Resource.resourceJsonUiSchema({ scopePrefix }),
        Concept.conceptJsonUiSchema({
          scopePrefix: `${scopePrefix}/properties/broader`,
        }),
        Concept.conceptJsonUiSchema({
          scopePrefix: `${scopePrefix}/properties/broaderTransitive`,
        }),
        Concept.conceptJsonUiSchema({
          scopePrefix: `${scopePrefix}/properties/broadMatch`,
        }),
        Concept.conceptJsonUiSchema({
          scopePrefix: `${scopePrefix}/properties/closeMatch`,
        }),
        Concept.conceptJsonUiSchema({
          scopePrefix: `${scopePrefix}/properties/exactMatch`,
        }),
        ConceptScheme.conceptSchemeJsonUiSchema({
          scopePrefix: `${scopePrefix}/properties/inScheme`,
        }),
        Concept.conceptJsonUiSchema({
          scopePrefix: `${scopePrefix}/properties/mappingRelation`,
        }),
        Concept.conceptJsonUiSchema({
          scopePrefix: `${scopePrefix}/properties/narrower`,
        }),
        Concept.conceptJsonUiSchema({
          scopePrefix: `${scopePrefix}/properties/narrowerTransitive`,
        }),
        Concept.conceptJsonUiSchema({
          scopePrefix: `${scopePrefix}/properties/narrowMatch`,
        }),
        Concept.conceptJsonUiSchema({
          scopePrefix: `${scopePrefix}/properties/related`,
        }),
        Concept.conceptJsonUiSchema({
          scopePrefix: `${scopePrefix}/properties/relatedMatch`,
        }),
        Concept.conceptJsonUiSchema({
          scopePrefix: `${scopePrefix}/properties/semanticRelation`,
        }),
        ConceptScheme.conceptSchemeJsonUiSchema({
          scopePrefix: `${scopePrefix}/properties/topConceptOf`,
        }),
      ],
      label: "Concept",
      type: "Group",
    };
  }

  export function conceptJsonZodSchema() {
    return Resource.resourceJsonZodSchema().merge(
      zod.object({
        broader: Concept.conceptJsonZodSchema().array(),
        broaderTransitive: Concept.conceptJsonZodSchema().array(),
        broadMatch: Concept.conceptJsonZodSchema().array(),
        closeMatch: Concept.conceptJsonZodSchema().array(),
        exactMatch: Concept.conceptJsonZodSchema().array(),
        "@id": zod.string().min(1),
        inScheme: ConceptScheme.conceptSchemeJsonZodSchema().array(),
        mappingRelation: Concept.conceptJsonZodSchema().array(),
        narrower: Concept.conceptJsonZodSchema().array(),
        narrowerTransitive: Concept.conceptJsonZodSchema().array(),
        narrowMatch: Concept.conceptJsonZodSchema().array(),
        related: Concept.conceptJsonZodSchema().array(),
        relatedMatch: Concept.conceptJsonZodSchema().array(),
        semanticRelation: Concept.conceptJsonZodSchema().array(),
        topConceptOf: ConceptScheme.conceptSchemeJsonZodSchema().array(),
        type: zod.literal("Concept"),
      }),
    );
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
        Concept.sparqlConstructTemplateTriples({ ignoreRdfType, subject }),
      ),
      type: "query",
      where: (queryParameters.where ?? []).concat(
        Concept.sparqlWherePatterns({ ignoreRdfType, subject }),
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
      Concept.sparqlConstructQuery(parameters),
    );
  }

  export function sparqlConstructTemplateTriples(parameters?: {
    ignoreRdfType?: boolean;
    subject?: sparqljs.Triple["subject"];
    variablePrefix?: string;
  }): readonly sparqljs.Triple[] {
    const subject = parameters?.subject ?? dataFactory.variable!("concept");
    const variablePrefix =
      parameters?.variablePrefix ??
      (subject.termType === "Variable" ? subject.value : "concept");
    return [
      ...Resource.sparqlConstructTemplateTriples({
        ignoreRdfType: true,
        subject,
        variablePrefix,
      }),
      ...(parameters?.ignoreRdfType
        ? []
        : [
            {
              subject,
              predicate: dataFactory.namedNode(
                "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              ),
              object: dataFactory.variable!(`${variablePrefix}RdfType`),
            },
          ]),
      {
        object: dataFactory.variable!(`${variablePrefix}Broader`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#broader",
        ),
        subject,
      },
      ...Concept.sparqlConstructTemplateTriples({
        ignoreRdfType: true,
        subject: dataFactory.variable!(`${variablePrefix}Broader`),
        variablePrefix: `${variablePrefix}Broader`,
      }),
      {
        object: dataFactory.variable!(`${variablePrefix}BroaderTransitive`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#broaderTransitive",
        ),
        subject,
      },
      ...Concept.sparqlConstructTemplateTriples({
        ignoreRdfType: true,
        subject: dataFactory.variable!(`${variablePrefix}BroaderTransitive`),
        variablePrefix: `${variablePrefix}BroaderTransitive`,
      }),
      {
        object: dataFactory.variable!(`${variablePrefix}BroadMatch`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#broadMatch",
        ),
        subject,
      },
      ...Concept.sparqlConstructTemplateTriples({
        ignoreRdfType: true,
        subject: dataFactory.variable!(`${variablePrefix}BroadMatch`),
        variablePrefix: `${variablePrefix}BroadMatch`,
      }),
      {
        object: dataFactory.variable!(`${variablePrefix}CloseMatch`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#closeMatch",
        ),
        subject,
      },
      ...Concept.sparqlConstructTemplateTriples({
        ignoreRdfType: true,
        subject: dataFactory.variable!(`${variablePrefix}CloseMatch`),
        variablePrefix: `${variablePrefix}CloseMatch`,
      }),
      {
        object: dataFactory.variable!(`${variablePrefix}ExactMatch`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#exactMatch",
        ),
        subject,
      },
      ...Concept.sparqlConstructTemplateTriples({
        ignoreRdfType: true,
        subject: dataFactory.variable!(`${variablePrefix}ExactMatch`),
        variablePrefix: `${variablePrefix}ExactMatch`,
      }),
      {
        object: dataFactory.variable!(`${variablePrefix}InScheme`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#inScheme",
        ),
        subject,
      },
      ...ConceptScheme.sparqlConstructTemplateTriples({
        ignoreRdfType: true,
        subject: dataFactory.variable!(`${variablePrefix}InScheme`),
        variablePrefix: `${variablePrefix}InScheme`,
      }),
      {
        object: dataFactory.variable!(`${variablePrefix}MappingRelation`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#mappingRelation",
        ),
        subject,
      },
      ...Concept.sparqlConstructTemplateTriples({
        ignoreRdfType: true,
        subject: dataFactory.variable!(`${variablePrefix}MappingRelation`),
        variablePrefix: `${variablePrefix}MappingRelation`,
      }),
      {
        object: dataFactory.variable!(`${variablePrefix}Narrower`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#narrower",
        ),
        subject,
      },
      ...Concept.sparqlConstructTemplateTriples({
        ignoreRdfType: true,
        subject: dataFactory.variable!(`${variablePrefix}Narrower`),
        variablePrefix: `${variablePrefix}Narrower`,
      }),
      {
        object: dataFactory.variable!(`${variablePrefix}NarrowerTransitive`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#narrowerTransitive",
        ),
        subject,
      },
      ...Concept.sparqlConstructTemplateTriples({
        ignoreRdfType: true,
        subject: dataFactory.variable!(`${variablePrefix}NarrowerTransitive`),
        variablePrefix: `${variablePrefix}NarrowerTransitive`,
      }),
      {
        object: dataFactory.variable!(`${variablePrefix}NarrowMatch`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#narrowMatch",
        ),
        subject,
      },
      ...Concept.sparqlConstructTemplateTriples({
        ignoreRdfType: true,
        subject: dataFactory.variable!(`${variablePrefix}NarrowMatch`),
        variablePrefix: `${variablePrefix}NarrowMatch`,
      }),
      {
        object: dataFactory.variable!(`${variablePrefix}Related`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#related",
        ),
        subject,
      },
      ...Concept.sparqlConstructTemplateTriples({
        ignoreRdfType: true,
        subject: dataFactory.variable!(`${variablePrefix}Related`),
        variablePrefix: `${variablePrefix}Related`,
      }),
      {
        object: dataFactory.variable!(`${variablePrefix}RelatedMatch`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#relatedMatch",
        ),
        subject,
      },
      ...Concept.sparqlConstructTemplateTriples({
        ignoreRdfType: true,
        subject: dataFactory.variable!(`${variablePrefix}RelatedMatch`),
        variablePrefix: `${variablePrefix}RelatedMatch`,
      }),
      {
        object: dataFactory.variable!(`${variablePrefix}SemanticRelation`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#semanticRelation",
        ),
        subject,
      },
      ...Concept.sparqlConstructTemplateTriples({
        ignoreRdfType: true,
        subject: dataFactory.variable!(`${variablePrefix}SemanticRelation`),
        variablePrefix: `${variablePrefix}SemanticRelation`,
      }),
      {
        object: dataFactory.variable!(`${variablePrefix}TopConceptOf`),
        predicate: dataFactory.namedNode(
          "http://www.w3.org/2004/02/skos/core#topConceptOf",
        ),
        subject,
      },
      ...ConceptScheme.sparqlConstructTemplateTriples({
        ignoreRdfType: true,
        subject: dataFactory.variable!(`${variablePrefix}TopConceptOf`),
        variablePrefix: `${variablePrefix}TopConceptOf`,
      }),
    ];
  }

  export function sparqlWherePatterns(parameters: {
    ignoreRdfType?: boolean;
    subject?: sparqljs.Triple["subject"];
    variablePrefix?: string;
  }): readonly sparqljs.Pattern[] {
    const subject = parameters?.subject ?? dataFactory.variable!("concept");
    const variablePrefix =
      parameters?.variablePrefix ??
      (subject.termType === "Variable" ? subject.value : "concept");
    return [
      ...Resource.sparqlWherePatterns({
        ignoreRdfType: true,
        subject,
        variablePrefix,
      }),
      ...(parameters?.ignoreRdfType
        ? []
        : [
            {
              triples: [
                {
                  subject,
                  predicate: dataFactory.namedNode(
                    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
                  ),
                  object: dataFactory.namedNode(
                    "http://www.w3.org/2004/02/skos/core#Concept",
                  ),
                },
              ],
              type: "bgp" as const,
            },
            {
              triples: [
                {
                  subject,
                  predicate: dataFactory.namedNode(
                    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
                  ),
                  object: dataFactory.variable!(`${variablePrefix}RdfType`),
                },
              ],
              type: "bgp" as const,
            },
          ]),
      {
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(`${variablePrefix}Broader`),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2004/02/skos/core#broader",
                ),
                subject,
              },
            ],
            type: "bgp",
          },
          ...Concept.sparqlWherePatterns({
            ignoreRdfType: true,
            subject: dataFactory.variable!(`${variablePrefix}Broader`),
            variablePrefix: `${variablePrefix}Broader`,
          }),
        ],
        type: "optional",
      },
      {
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(
                  `${variablePrefix}BroaderTransitive`,
                ),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2004/02/skos/core#broaderTransitive",
                ),
                subject,
              },
            ],
            type: "bgp",
          },
          ...Concept.sparqlWherePatterns({
            ignoreRdfType: true,
            subject: dataFactory.variable!(
              `${variablePrefix}BroaderTransitive`,
            ),
            variablePrefix: `${variablePrefix}BroaderTransitive`,
          }),
        ],
        type: "optional",
      },
      {
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(`${variablePrefix}BroadMatch`),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2004/02/skos/core#broadMatch",
                ),
                subject,
              },
            ],
            type: "bgp",
          },
          ...Concept.sparqlWherePatterns({
            ignoreRdfType: true,
            subject: dataFactory.variable!(`${variablePrefix}BroadMatch`),
            variablePrefix: `${variablePrefix}BroadMatch`,
          }),
        ],
        type: "optional",
      },
      {
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(`${variablePrefix}CloseMatch`),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2004/02/skos/core#closeMatch",
                ),
                subject,
              },
            ],
            type: "bgp",
          },
          ...Concept.sparqlWherePatterns({
            ignoreRdfType: true,
            subject: dataFactory.variable!(`${variablePrefix}CloseMatch`),
            variablePrefix: `${variablePrefix}CloseMatch`,
          }),
        ],
        type: "optional",
      },
      {
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(`${variablePrefix}ExactMatch`),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2004/02/skos/core#exactMatch",
                ),
                subject,
              },
            ],
            type: "bgp",
          },
          ...Concept.sparqlWherePatterns({
            ignoreRdfType: true,
            subject: dataFactory.variable!(`${variablePrefix}ExactMatch`),
            variablePrefix: `${variablePrefix}ExactMatch`,
          }),
        ],
        type: "optional",
      },
      {
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(`${variablePrefix}InScheme`),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2004/02/skos/core#inScheme",
                ),
                subject,
              },
            ],
            type: "bgp",
          },
          ...ConceptScheme.sparqlWherePatterns({
            ignoreRdfType: true,
            subject: dataFactory.variable!(`${variablePrefix}InScheme`),
            variablePrefix: `${variablePrefix}InScheme`,
          }),
        ],
        type: "optional",
      },
      {
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(
                  `${variablePrefix}MappingRelation`,
                ),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2004/02/skos/core#mappingRelation",
                ),
                subject,
              },
            ],
            type: "bgp",
          },
          ...Concept.sparqlWherePatterns({
            ignoreRdfType: true,
            subject: dataFactory.variable!(`${variablePrefix}MappingRelation`),
            variablePrefix: `${variablePrefix}MappingRelation`,
          }),
        ],
        type: "optional",
      },
      {
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(`${variablePrefix}Narrower`),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2004/02/skos/core#narrower",
                ),
                subject,
              },
            ],
            type: "bgp",
          },
          ...Concept.sparqlWherePatterns({
            ignoreRdfType: true,
            subject: dataFactory.variable!(`${variablePrefix}Narrower`),
            variablePrefix: `${variablePrefix}Narrower`,
          }),
        ],
        type: "optional",
      },
      {
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(
                  `${variablePrefix}NarrowerTransitive`,
                ),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2004/02/skos/core#narrowerTransitive",
                ),
                subject,
              },
            ],
            type: "bgp",
          },
          ...Concept.sparqlWherePatterns({
            ignoreRdfType: true,
            subject: dataFactory.variable!(
              `${variablePrefix}NarrowerTransitive`,
            ),
            variablePrefix: `${variablePrefix}NarrowerTransitive`,
          }),
        ],
        type: "optional",
      },
      {
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(`${variablePrefix}NarrowMatch`),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2004/02/skos/core#narrowMatch",
                ),
                subject,
              },
            ],
            type: "bgp",
          },
          ...Concept.sparqlWherePatterns({
            ignoreRdfType: true,
            subject: dataFactory.variable!(`${variablePrefix}NarrowMatch`),
            variablePrefix: `${variablePrefix}NarrowMatch`,
          }),
        ],
        type: "optional",
      },
      {
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(`${variablePrefix}Related`),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2004/02/skos/core#related",
                ),
                subject,
              },
            ],
            type: "bgp",
          },
          ...Concept.sparqlWherePatterns({
            ignoreRdfType: true,
            subject: dataFactory.variable!(`${variablePrefix}Related`),
            variablePrefix: `${variablePrefix}Related`,
          }),
        ],
        type: "optional",
      },
      {
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(`${variablePrefix}RelatedMatch`),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2004/02/skos/core#relatedMatch",
                ),
                subject,
              },
            ],
            type: "bgp",
          },
          ...Concept.sparqlWherePatterns({
            ignoreRdfType: true,
            subject: dataFactory.variable!(`${variablePrefix}RelatedMatch`),
            variablePrefix: `${variablePrefix}RelatedMatch`,
          }),
        ],
        type: "optional",
      },
      {
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(
                  `${variablePrefix}SemanticRelation`,
                ),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2004/02/skos/core#semanticRelation",
                ),
                subject,
              },
            ],
            type: "bgp",
          },
          ...Concept.sparqlWherePatterns({
            ignoreRdfType: true,
            subject: dataFactory.variable!(`${variablePrefix}SemanticRelation`),
            variablePrefix: `${variablePrefix}SemanticRelation`,
          }),
        ],
        type: "optional",
      },
      {
        patterns: [
          {
            triples: [
              {
                object: dataFactory.variable!(`${variablePrefix}TopConceptOf`),
                predicate: dataFactory.namedNode(
                  "http://www.w3.org/2004/02/skos/core#topConceptOf",
                ),
                subject,
              },
            ],
            type: "bgp",
          },
          ...ConceptScheme.sparqlWherePatterns({
            ignoreRdfType: true,
            subject: dataFactory.variable!(`${variablePrefix}TopConceptOf`),
            variablePrefix: `${variablePrefix}TopConceptOf`,
          }),
        ],
        type: "optional",
      },
    ];
  }
}
