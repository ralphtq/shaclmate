import { Ontology as OwlOntology } from "@shaclmate/shacl-ast";
import type { Maybe } from "purify-ts";
import type { Resource } from "rdfjs-resource";
import type { TsFeature, TsObjectDeclarationType } from "../enums/index.js";
import * as generated from "./generated.js";
import { tsFeatures } from "./tsFeatures.js";

export class Ontology extends OwlOntology {
  private generatedShaclmateOntology: generated.ShaclmateOntology;

  constructor(resource: Resource) {
    super(
      generated.OwlOntology.fromRdf({
        ignoreRdfType: true,
        resource,
      }).unsafeCoerce(),
    );
    this.generatedShaclmateOntology = generated.ShaclmateOntology.fromRdf({
      ignoreRdfType: true,
      resource,
    }).unsafeCoerce();
  }

  get tsDataFactoryVariable(): Maybe<string> {
    return this.generatedShaclmateOntology.tsDataFactoryVariable;
  }

  get tsFeatures(): Maybe<Set<TsFeature>> {
    return tsFeatures(this.generatedShaclmateOntology);
  }

  get tsImports(): readonly string[] {
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
