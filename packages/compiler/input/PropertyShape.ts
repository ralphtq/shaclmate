import { PropertyShape as ShaclCorePropertyShape } from "@shaclmate/shacl-ast";
import type { Maybe } from "purify-ts";
import type { Resource } from "rdfjs-resource";
import type { PropertyVisibility } from "../enums/index.js";
import type { Shape } from "./Shape.js";
import * as generated from "./generated.js";
import type {
  NodeShape,
  Ontology,
  PropertyGroup,
  ShapesGraph,
} from "./index.js";

export class PropertyShape extends ShaclCorePropertyShape<
  NodeShape,
  Ontology,
  PropertyGroup,
  any,
  Shape
> {
  private readonly generatedShaclmatePropertyShape: generated.ShaclmatePropertyShape;

  constructor(resource: Resource, shapesGraph: ShapesGraph) {
    super(
      generated.ShaclCorePropertyShape.fromRdf({
        ignoreRdfType: true,
        resource,
      }).unsafeCoerce(),
      shapesGraph,
    );
    this.generatedShaclmatePropertyShape =
      generated.ShaclmatePropertyShape.fromRdf({
        ignoreRdfType: true,
        resource,
      }).unsafeCoerce();
  }

  get extern(): Maybe<boolean> {
    return this.generatedShaclmatePropertyShape.extern;
  }

  get mutable(): Maybe<boolean> {
    return this.generatedShaclmatePropertyShape.mutable;
  }

  get shaclmateName(): Maybe<string> {
    return this.generatedShaclmatePropertyShape.name;
  }

  get visibility(): PropertyVisibility {
    return this.generatedShaclmatePropertyShape.visibility
      .map((iri) => {
        switch (iri.value) {
          case "http://minorg.github.io/shaclmate/ns#_Visibility_Private":
            return "private";
          case "http://minorg.github.io/shaclmate/ns#_Visibility_Protected":
            return "protected";
          case "http://minorg.github.io/shaclmate/ns#_Visibility_Public":
            return "public";
          default:
            throw new RangeError(iri.value);
        }
      })
      .orDefault("public" as const);
  }
}
