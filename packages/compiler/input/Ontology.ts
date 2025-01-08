import { Ontology as OwlOntology } from "@shaclmate/shacl-ast";
import type { Maybe, NonEmptyList } from "purify-ts";
import type { TsFeature, TsObjectDeclarationType } from "../enums/index.js";
import type * as generated from "./generated.js";
import { tsFeatures } from "./tsFeatures.js";

export class Ontology extends OwlOntology {
  constructor(
    private readonly generatedShaclmateOntology: generated.ShaclmateOntology,
  ) {
    super(generatedShaclmateOntology);
  }

  get tsDataFactoryVariable(): Maybe<string> {
    return this.generatedShaclmateOntology.tsDataFactoryVariable;
  }

  get tsFeatures(): Maybe<Set<TsFeature>> {
    return tsFeatures(this.generatedShaclmateOntology);
  }

  get tsImports(): Maybe<NonEmptyList<string>> {
    return this.generatedShaclmateOntology.tsImports;
  }

  get tsObjectDeclarationType(): Maybe<TsObjectDeclarationType> {
    return this.generatedShaclmateOntology.tsObjectDeclarationType.map(
      (iri) => {
        switch (iri.value) {
          case "http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Class":
            return "class";
          case "http://minorg.github.io/shaclmate/ns#_TsObjectDeclarationType_Interface":
            return "interface";
          default:
            throw new RangeError(iri.value);
        }
      },
    );
  }
}
