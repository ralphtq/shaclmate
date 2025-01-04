import type { DatasetCore } from "@rdfjs/types";
import { RdfjsShapesGraph } from "@shaclmate/shacl-ast";
import type { Resource } from "rdfjs-resource";
import {
  NodeShape,
  Ontology,
  PropertyGroup,
  PropertyShape,
  type Shape,
} from "./index.js";

export class ShapesGraph extends RdfjsShapesGraph<
  NodeShape,
  Ontology,
  PropertyGroup,
  PropertyShape,
  Shape
> {
  constructor({ dataset }: { dataset: DatasetCore }) {
    super({
      dataset,
      factory: {
        createNodeShape(
          resource: Resource,
          shapesGraph: ShapesGraph,
        ): NodeShape {
          return new NodeShape(resource, shapesGraph);
        },
        createOntology(resource: Resource): Ontology {
          return new Ontology(resource);
        },
        createPropertyGroup(resource: Resource): PropertyGroup {
          return new PropertyGroup(resource);
        },
        createPropertyShape(
          resource: Resource,
          shapesGraph: ShapesGraph,
        ): PropertyShape {
          return new PropertyShape(resource, shapesGraph);
        },
      },
    });
  }
}
