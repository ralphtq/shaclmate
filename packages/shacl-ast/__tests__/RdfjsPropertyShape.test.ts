import { fail } from "node:assert";
import { dash, rdf, schema } from "@tpluscode/rdf-ns-builders";
import { describe, it } from "vitest";
import type { PredicatePath } from "../PropertyPath.js";
import { RdfjsShapesGraph } from "../RdfjsShapesGraph.js";
import {
  type DefaultRdfjsShapesGraph,
  defaultRdfjsFactory,
} from "../defaultRdfjsFactory.js";
import { findPropertyShape as findPropertyShape_ } from "./findPropertyShape.js";
import { testData } from "./testData.js";

describe("RdfjsPropertyShape", () => {
  const shapesGraph: DefaultRdfjsShapesGraph = new RdfjsShapesGraph({
    dataset: testData.shapesGraph,
    factory: defaultRdfjsFactory,
  });

  // it("should convert to a string", ({ expect }) => {
  //   expect(
  //     findPropertyShape(schema.Person, schema.givenName).toString(),
  //   ).not.toHaveLength(0);
  // });

  const findPropertyShape = findPropertyShape_(shapesGraph);

  // No sh:defaultValue in the test data

  it("should have a group", ({ expect }) => {
    expect(
      findPropertyShape(dash.ScriptAPIShape, dash.generateClass)
        .group.unsafeCoerce()
        .identifier.equals(dash.ScriptAPIGenerationRules),
    ).toStrictEqual(true);
  });

  it("should have an order", ({ expect }) => {
    expect(
      findPropertyShape(
        dash.ScriptAPIShape,
        dash.generatePrefixClasses,
      ).order.unsafeCoerce(),
    ).toStrictEqual(15);
  });

  it("should parse a property path", ({ expect }) => {
    const path = findPropertyShape(
      dash.ScriptAPIShape,
      dash.generatePrefixClasses,
    ).path;
    expect(path.kind).toStrictEqual("PredicatePath");
    expect(
      (path as PredicatePath).iri.equals(dash.generatePrefixClasses),
    ).toStrictEqual(true);
  });

  it("should parse an inverse property path", ({ expect }) => {
    const nodeShape = shapesGraph
      .nodeShapeByIdentifier(schema.Person)
      .unsafeCoerce();
    for (const propertyShape of nodeShape.constraints.properties) {
      if (propertyShape.path.kind !== "InversePath") {
        continue;
      }
      expect(propertyShape.path.path.kind).toStrictEqual("PredicatePath");
      expect(
        (propertyShape.path.path as PredicatePath).iri.equals(schema.parent),
      ).toStrictEqual(true);
      return;
    }
    fail();
  });

  it("should parse a zero or more property path", ({ expect }) => {
    const nodeShape = shapesGraph
      .nodeShapeByIdentifier(dash.ListShape)
      .unsafeCoerce();
    for (const propertyShape of nodeShape.constraints.properties) {
      if (propertyShape.path.kind !== "ZeroOrMorePath") {
        continue;
      }
      expect(propertyShape.path.path.kind).toStrictEqual("PredicatePath");
      expect(
        (propertyShape.path.path as PredicatePath).iri.equals(rdf.rest),
      ).toStrictEqual(true);
      return;
    }
    fail();
  });
});
