import { PropertyShape as CorePropertyShape } from "@shaclmate/shacl-ast";
import * as generated from "@shaclmate/shacl-ast/generated.js";
import { Either, Left, type Maybe } from "purify-ts";
import type { Resource } from "rdfjs-resource";
import type { PropertyVisibility } from "../enums/index.js";
import { shaclmate } from "../vocabularies/index.js";
import type { Shape } from "./Shape.js";
import { extern } from "./extern.js";
import type {
  NodeShape,
  Ontology,
  PropertyGroup,
  ShapesGraph,
} from "./index.js";
import { shaclmateName } from "./shaclmateName.js";

export class PropertyShape extends CorePropertyShape<
  generated.ShaclCorePropertyShape,
  NodeShape,
  Ontology,
  PropertyGroup,
  any,
  Shape
> {
  constructor(
    readonly resource: Resource,
    shapesGraph: ShapesGraph,
  ) {
    super(
      generated.ShaclCorePropertyShape.fromRdf({
        ignoreRdfType: true,
        resource,
      }).unsafeCoerce(),
      shapesGraph,
    );
  }

  get extern(): Maybe<boolean> {
    return extern.bind(this)();
  }

  get mutable(): Maybe<boolean> {
    return this.resource
      .value(shaclmate.mutable)
      .chain((value) => value.toBoolean())
      .toMaybe();
  }

  get shaclmateName(): Maybe<string> {
    return shaclmateName.bind(this)();
  }

  get visibility(): PropertyVisibility {
    return this.resource
      .value(shaclmate.visibility)
      .chain((value) => value.toIri())
      .chain((iri) => {
        if (iri.equals(shaclmate._Visibility_Private)) {
          return Either.of("private" as const);
        }
        if (iri.equals(shaclmate._Visibility_Protected)) {
          return Either.of("protected" as const);
        }
        if (iri.equals(shaclmate._Visibility_Public)) {
          return Either.of("public" as const);
        }
        return Left(new Error(`unknown visibility: ${iri.value}`));
      })
      .orDefault("public" as const);
  }
}
