import { schema } from "@tpluscode/rdf-ns-builders";
import { describe, it } from "vitest";
import { RdfjsShapesGraph } from "../RdfjsShapesGraph.js";
import {
  type DefaultRdfjsShapesGraph,
  defaultRdfjsFactory,
} from "../defaultRdfjsFactory.js";
import { testData } from "./testData.js";

describe("RdfjsNodeShape", () => {
  const shapesGraph: DefaultRdfjsShapesGraph = new RdfjsShapesGraph({
    dataset: testData.shapesGraph,
    factory: defaultRdfjsFactory,
  });

  it("constraints: should get closed true", ({ expect }) => {
    expect(
      shapesGraph
        .nodeShapeByIdentifier(schema.DatedMoneySpecification)
        .unsafeCoerce()
        .constraints.closed.unsafeCoerce(),
    ).toStrictEqual(true);
  });

  it("constraints: should have properties", ({ expect }) => {
    expect(
      shapesGraph.nodeShapeByIdentifier(schema.Person).unsafeCoerce()
        .constraints.properties,
    ).toHaveLength(9);
  });

  it("should convert to a string", ({ expect }) => {
    expect(
      shapesGraph
        .nodeShapeByIdentifier(schema.Person)
        .unsafeCoerce()
        .toString(),
    ).not.toHaveLength(0);
  });
});
