import type { NodeKind } from "@shaclmate/shacl-ast";
import * as input from "../input/index.js";

export function propertyShapeNodeKinds(shape: input.Shape): Set<NodeKind> {
  const nodeKinds = new Set<NodeKind>([
    ...shape.constraints.nodeKinds.orDefault(new Set()),
  ]);
  if (nodeKinds.size > 0) {
    return nodeKinds;
  }

  if (shape instanceof input.PropertyShape) {
    shape.defaultValue.ifJust((defaultValue) =>
      nodeKinds.add(defaultValue.termType),
    );
    if (nodeKinds.size > 0) {
      return nodeKinds;
    }
  }

  shape.constraints.hasValues.ifJust((hasValues) => {
    for (const hasValue of hasValues) {
      nodeKinds.add(hasValue.termType);
    }
  });
  if (nodeKinds.size > 0) {
    return nodeKinds;
  }

  shape.constraints.in_.ifJust((in_) => {
    for (const term of in_) {
      nodeKinds.add(term.termType);
    }
  });

  return nodeKinds;
}
