import { RdfjsShapesGraph, defaultFactory } from "@shaclmate/shacl-ast";
import { describe, it } from "vitest";
import { testData } from "./testData.js";

describe("RdfjsShapesGraph", () => {
  const shapesGraph = new RdfjsShapesGraph({
    dataset: testData.shapesGraph,
    factory: defaultFactory,
  });

  it("should parse the shapes correctly", ({ expect }) => {
    expect(shapesGraph.nodeShapes).toHaveLength(84);
    expect(shapesGraph.propertyShapes).toHaveLength(70);
  });

  it("should parse ontologies correctly", ({ expect }) => {
    expect(shapesGraph.ontologies).toHaveLength(2);
  });

  it("should parse property shapes correctly", ({ expect }) => {
    expect(shapesGraph.propertyGroups).toHaveLength(1);
  });
});
