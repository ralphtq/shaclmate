import type * as rdfjs from "@rdfjs/types";
import { Maybe } from "purify-ts";
import { TsFeature } from "../enums/index.js";

type TsFeatureIri = rdfjs.NamedNode<
  | "http://minorg.github.io/shaclmate/ns#_TsFeature_Create"
  | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
  | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson"
  | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
  | "http://minorg.github.io/shaclmate/ns#_TsFeature_Json"
  | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema"
  | "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema"
  | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
  | "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf"
  | "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql"
  | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
  | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
>;

function iriToTsFeatures(iri: TsFeatureIri): readonly TsFeature[] {
  switch (iri.value) {
    case "http://minorg.github.io/shaclmate/ns#_TsFeature_Create":
      return ["create"];
    case "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals":
      return ["equals"];
    case "http://minorg.github.io/shaclmate/ns#_TsFeature_FromJson":
      return ["fromJson"];
    case "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf":
      return ["fromRdf"];
    case "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash":
      return ["hash"];
    case "http://minorg.github.io/shaclmate/ns#_TsFeature_Json":
      return ["fromJson", "jsonSchema", "jsonUiSchema", "toJson"];
    case "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonSchema":
      return ["jsonSchema"];
    case "http://minorg.github.io/shaclmate/ns#_TsFeature_JsonUiSchema":
      return ["jsonUiSchema"];
    case "http://minorg.github.io/shaclmate/ns#_TsFeature_Sparql":
      return ["sparql"];
    case "http://minorg.github.io/shaclmate/ns#_TsFeature_Rdf":
      return ["fromRdf", "toRdf"];
    case "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson":
      return ["toJson"];
    case "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf":
      return ["toRdf"];
  }
}

export function tsFeatures(generated: {
  readonly tsFeatureExcludes: readonly TsFeatureIri[];
  readonly tsFeatureIncludes: readonly TsFeatureIri[];
}): Maybe<Set<TsFeature>> {
  const tsFeatureIncludes =
    generated.tsFeatureIncludes.flatMap(iriToTsFeatures);
  const tsFeatureExcludes =
    generated.tsFeatureExcludes.flatMap(iriToTsFeatures);

  if (tsFeatureIncludes.length > 0) {
    return Maybe.of(new Set<TsFeature>(tsFeatureIncludes));
  }
  if (tsFeatureExcludes.length > 0) {
    const tsFeatures = new Set<TsFeature>(TsFeature.MEMBERS);
    for (const tsFeatureExclude of tsFeatureExcludes) {
      tsFeatures.delete(tsFeatureExclude);
    }
    return Maybe.of(tsFeatures);
  }
  return Maybe.empty();
}
