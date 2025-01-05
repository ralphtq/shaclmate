import type { NamedNode } from "@rdfjs/types";
import { Maybe } from "purify-ts";
import type { Resource } from "rdfjs-resource";
import { TsFeature } from "../enums/index.js";
import { logger } from "../logger.js";
import { shaclmate } from "../vocabularies/index.js";

function iriToTsFeature(iri: NamedNode): Maybe<TsFeature> {
  if (iri.equals(shaclmate._TsFeature_Equals)) {
    return Maybe.of("equals");
  }
  if (iri.equals(shaclmate._TsFeature_FromRdf)) {
    return Maybe.of("fromRdf");
  }
  if (iri.equals(shaclmate._TsFeature_Hash)) {
    return Maybe.of("hash");
  }
  if (iri.equals(shaclmate._TsFeature_SparqlGraphPatterns)) {
    return Maybe.of("sparql-graph-patterns");
  }
  if (iri.equals(shaclmate._TsFeature_ToJson)) {
    return Maybe.of("toJson");
  }
  if (iri.equals(shaclmate._TsFeature_ToRdf)) {
    return Maybe.of("toRdf");
  }
  logger.warn("unrecognized shaclmate feature value: %s", iri.value);
  return Maybe.empty();
}

export function tsFeatures(resource: Resource): Maybe<Set<TsFeature>> {
  const excludeTsFeatures = resource
    .values(shaclmate.tsFeatureExclude)
    .flatMap((value) => value.toIri().toMaybe().toList())
    .flatMap((iri) => iriToTsFeature(iri).toList());

  const includeTsFeatures = resource
    .values(shaclmate.tsFeatureInclude)
    .flatMap((value) => value.toIri().toMaybe().toList())
    .flatMap((iri) => iriToTsFeature(iri).toList());

  if (includeTsFeatures.length > 0) {
    return Maybe.of(new Set<TsFeature>(includeTsFeatures));
  }
  if (excludeTsFeatures.length > 0) {
    const tsFeatures = new Set<TsFeature>(TsFeature.MEMBERS);
    for (const excludeTsFeature of excludeTsFeatures) {
      tsFeatures.delete(excludeTsFeature);
    }
    return Maybe.of(tsFeatures);
  }
  return Maybe.empty();
}
