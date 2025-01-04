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
    expect(propertyGroup.label.unsafeCoerce().value).toStrictEqual(
      "Script API Generation Rules",
    );
  });
});
