import type { Resource } from "rdfjs-resource";
import type { Factory } from "./Factory.js";
import { NodeShape } from "./NodeShape.js";
import { Ontology } from "./Ontology.js";
import { PropertyGroup } from "./PropertyGroup.js";
import { PropertyShape } from "./PropertyShape.js";
import type { Shape } from "./Shape.js";
import type { ShapesGraph } from "./ShapesGraph.js";

type DefaultNodeShape = NodeShape<
  any,
  Ontology,
  PropertyGroup,
  DefaultPropertyShape,
  DefaultShape
>;
type DefaultPropertyShape = PropertyShape<
  DefaultNodeShape,
  Ontology,
  PropertyGroup,
  any,
  DefaultShape
>;
type DefaultShape = Shape<
  DefaultNodeShape,
  Ontology,
  PropertyGroup,
  DefaultPropertyShape,
  any
>;
type DefaultShapesGraph = ShapesGraph<
  DefaultNodeShape,
  Ontology,
  PropertyGroup,
  DefaultPropertyShape,
  DefaultShape
>;

export const defaultFactory: Factory<
  DefaultNodeShape,
  Ontology,
  PropertyGroup,
  DefaultPropertyShape,
  DefaultShape
> = {
  createNodeShape(resource: Resource, shapesGraph: DefaultShapesGraph) {
    return new NodeShape(resource, shapesGraph);
  },

  createOntology(
    resource: Resource,
    _shapesGraph: DefaultShapesGraph,
  ): Ontology {
    return new Ontology(resource);
  },

  createPropertyGroup(
    resource: Resource,
    _shapesGraph: DefaultShapesGraph,
  ): PropertyGroup {
    return new PropertyGroup(resource);
  },

  createPropertyShape(resource: Resource, shapesGraph: DefaultShapesGraph) {
    return new PropertyShape(resource, shapesGraph);
  },
};
