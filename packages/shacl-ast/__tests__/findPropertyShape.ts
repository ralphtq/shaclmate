import type { NamedNode } from "@rdfjs/types";
import { expect } from "vitest";
import type { DefaultRdfjsShapesGraph } from "../defaultRdfjsFactory.js";

export function findPropertyShape(shapesGraph: DefaultRdfjsShapesGraph) {
  return (nodeShapeIdentifier: NamedNode, path: NamedNode) => {
    const nodeShape = shapesGraph
      .nodeShapeByIdentifier(nodeShapeIdentifier)
      .unsafeCoerce();
    const propertyShape = nodeShape.constraints.properties.find(
      (propertyShape) => {
        const propertyShapePath = propertyShape.path;
        return (
          propertyShapePath.kind === "PredicatePath" &&
          propertyShapePath.iri.equals(path)
        );
      },
    );
    expect(propertyShape).toBeDefined();
    return propertyShape!;
  };
}
