import type * as rdfjs from "@rdfjs/types";
import { Maybe } from "purify-ts";
import { TsFeature } from "../enums/index.js";

type TsFeatureIri = rdfjs.NamedNode<
  | "http://purl.org/shaclmate/ontology#_TsFeature_All"
  | "http://purl.org/shaclmate/ontology#_TsFeature_Create"
  | "http://purl.org/shaclmate/ontology#_TsFeature_Equals"
  | "http://purl.org/shaclmate/ontology#_TsFeature_FromJson"
  | "http://purl.org/shaclmate/ontology#_TsFeature_FromRdf"
  | "http://purl.org/shaclmate/ontology#_TsFeature_Json"
  | "http://purl.org/shaclmate/ontology#_TsFeature_JsonSchema"
  | "http://purl.org/shaclmate/ontology#_TsFeature_JsonUiSchema"
  | "http://purl.org/shaclmate/ontology#_TsFeature_Hash"
  | "http://purl.org/shaclmate/ontology#_TsFeature_None"
  | "http://purl.org/shaclmate/ontology#_TsFeature_Rdf"
  | "http://purl.org/shaclmate/ontology#_TsFeature_Sparql"
  | "http://purl.org/shaclmate/ontology#_TsFeature_ToJson"
  | "http://purl.org/shaclmate/ontology#_TsFeature_ToRdf"
>;

function iriToTsFeatures(iri: TsFeatureIri): readonly TsFeature[] {
  switch (iri.value) {
    case "http://purl.org/shaclmate/ontology#_TsFeature_All":
      return TsFeature.MEMBERS;
    case "http://purl.org/shaclmate/ontology#_TsFeature_Create":
      return ["create"];
    case "http://purl.org/shaclmate/ontology#_TsFeature_Equals":
      return ["equals"];
    case "http://purl.org/shaclmate/ontology#_TsFeature_FromJson":
      return ["fromJson"];
    case "http://purl.org/shaclmate/ontology#_TsFeature_FromRdf":
      return ["fromRdf"];
    case "http://purl.org/shaclmate/ontology#_TsFeature_Hash":
      return ["hash"];
    case "http://purl.org/shaclmate/ontology#_TsFeature_Json":
      return ["fromJson", "jsonSchema", "jsonUiSchema", "toJson"];
    case "http://purl.org/shaclmate/ontology#_TsFeature_JsonSchema":
      return ["jsonSchema"];
    case "http://purl.org/shaclmate/ontology#_TsFeature_JsonUiSchema":
      return ["jsonUiSchema"];
    case "http://purl.org/shaclmate/ontology#_TsFeature_None":
      return [];
    case "http://purl.org/shaclmate/ontology#_TsFeature_Sparql":
      return ["sparql"];
    case "http://purl.org/shaclmate/ontology#_TsFeature_Rdf":
      return ["fromRdf", "toRdf"];
    case "http://purl.org/shaclmate/ontology#_TsFeature_ToJson":
      return ["toJson"];
    case "http://purl.org/shaclmate/ontology#_TsFeature_ToRdf":
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
