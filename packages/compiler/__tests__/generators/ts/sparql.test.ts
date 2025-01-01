import * as sparqlBuilder from "@kos-kit/sparql-builder";
import { OxigraphSparqlClient } from "@kos-kit/sparql-client";
import type { Quad } from "@rdfjs/types";
import N3, { DataFactory as dataFactory } from "n3";
import * as oxigraph from "oxigraph";
import { isomorphic } from "rdf-isomorphic";
import { MutableResourceSet } from "rdfjs-resource";
import { describe, it } from "vitest";
import { harnesses } from "./harnesses.js";
import { quadsToTurtle } from "./quadsToTurtle.js";

describe("sparql", () => {
  for (const [id, harness] of Object.entries(harnesses)) {
    it(`SPARQL graph patterns: ${id}`, async ({ expect }) => {
      const toRdfDataset = new N3.Store();
      harness.toRdf({
        resourceSet: new MutableResourceSet({
          dataFactory,
          dataset: toRdfDataset,
        }),
        mutateGraph: dataFactory.defaultGraph(),
      });
      const toRdfQuads: Quad[] = [];

      const oxigraphStore = new oxigraph.Store();
      for (const quad of toRdfDataset) {
        oxigraphStore.add(quad);
        toRdfQuads.push(quad);
      }

      const constructQuery = new sparqlBuilder.ConstructQueryBuilder()
        .addGraphPatterns(
          new harness.sparqlGraphPatternsClass(
            sparqlBuilder.GraphPattern.variable("subject"),
          ),
        )
        .build();

      const sparqlQueryClient = new OxigraphSparqlClient({
        dataFactory: oxigraph,
        store: oxigraphStore,
      });
      // Add to a Dataset to deduplicate the quads
      const constructResultDataset = new N3.Store(
        (await sparqlQueryClient.queryQuads(constructQuery)).concat(),
      );
      const constructResultQuads = [...constructResultDataset];
      if (constructResultQuads.length !== toRdfQuads.length) {
        console.info("not equal");
        const toRdfTurtle = await quadsToTurtle(toRdfQuads);
        const constructResultTurtle = await quadsToTurtle(constructResultQuads);
        const combinedTurtle = `Expected:\n${toRdfTurtle}\n\nvs.\n\nActual:\n${constructResultTurtle}`;
        console.info(combinedTurtle);
      }
      expect(constructResultQuads.length).toStrictEqual(toRdfQuads.length);
      expect(isomorphic(constructResultQuads, toRdfQuads)).toStrictEqual(true);
    });
  }
});
