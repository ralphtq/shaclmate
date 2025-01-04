import { dash } from "@tpluscode/rdf-ns-builders";
import { describe, it } from "vitest";
import { RdfjsShapesGraph } from "../RdfjsShapesGraph.js";
import {
  type DefaultRdfjsShapesGraph,
  defaultRdfjsFactory,
} from "../defaultRdfjsFactory.js";
import { testData } from "./testData.js";

describe("RdfjsPropertyGroup", () => {
  const shapesGraph: DefaultRdfjsShapesGraph = new RdfjsShapesGraph({
    dataset: testData.shapesGraph,
    factory: defaultRdfjsFactory,
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
