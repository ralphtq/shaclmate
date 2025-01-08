import type * as rdfjs from "@rdfjs/types";
import { Maybe, type NonEmptyList } from "purify-ts";
import { TsFeature } from "../enums/index.js";

function iriToTsFeature(
  iri: rdfjs.NamedNode<
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_SparqlGraphPatterns"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
    | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
  >,
): TsFeature {
  switch (iri.value) {
    case "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals":
      return "equals";
    case "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf":
      return "fromRdf";
    case "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash":
      return "hash";
    case "http://minorg.github.io/shaclmate/ns#_TsFeature_SparqlGraphPatterns":
      return "sparql-graph-patterns";
    case "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson":
      return "toJson";
    case "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf":
      return "toRdf";
  }
}

export function tsFeatures(generated: {
  readonly tsFeatureExcludes: Maybe<
    NonEmptyList<
      rdfjs.NamedNode<
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_SparqlGraphPatterns"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
      >
    >
  >;
  readonly tsFeatureIncludes: Maybe<
    NonEmptyList<
      rdfjs.NamedNode<
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Equals"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_FromRdf"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_Hash"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_SparqlGraphPatterns"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToJson"
        | "http://minorg.github.io/shaclmate/ns#_TsFeature_ToRdf"
      >
    >
  >;
}): Maybe<Set<TsFeature>> {
  const tsFeatureIncludes = generated.tsFeatureIncludes
    .map((iris) => iris.map(iriToTsFeature))
    .extract();
  const tsFeatureExcludes = generated.tsFeatureExcludes
    .map((iris) => iris.map(iriToTsFeature))
    .extract();

  if (tsFeatureIncludes) {
    return Maybe.of(new Set<TsFeature>(tsFeatureIncludes));
  }
  if (tsFeatureExcludes) {
    const tsFeatures = new Set<TsFeature>(TsFeature.MEMBERS);
    for (const tsFeatureExclude of tsFeatureExcludes) {
      tsFeatures.delete(tsFeatureExclude);
    }
    return Maybe.of(tsFeatures);
  }
  return Maybe.empty();
}
