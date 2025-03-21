import { dash } from "@tpluscode/rdf-ns-builders";
import { describe, it } from "vitest";
import { RdfjsShapesGraph, defaultFactory } from "../src/index.js";
import { testData } from "./testData.js";

describe("PropertyGroup", () => {
  const shapesGraph = new RdfjsShapesGraph({
    dataset: testData.shapesGraph,
    factory: defaultFactory,
  });

  it("should have a label", ({ expect }) => {
    const propertyGroup = shapesGraph
      .propertyGroupByIdentifier(dash.ScriptAPIGenerationRules)
      .unsafeCoerce();
    const labels = propertyGroup.labels;
    expect(labels).toHaveLength(1);
    expect(labels[0].value).toStrictEqual("Script API Generation Rules");
  });
});
