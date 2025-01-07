import { dash } from "@tpluscode/rdf-ns-builders";
import { describe, it } from "vitest";
import { RdfjsShapesGraph } from "../RdfjsShapesGraph.js";
import { defaultFactory } from "../defaultFactory.js";
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
    expect(propertyGroup.labels).toHaveLength(1);
    expect(propertyGroup.labels[0].value).toStrictEqual(
      "Script API Generation Rules",
    );
  });
});
