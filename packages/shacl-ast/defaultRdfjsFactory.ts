import type { Resource } from "rdfjs-resource";
import type { Factory } from "./Factory.js";
import { NodeShape } from "./NodeShape.js";
import { Ontology } from "./Ontology.js";
import { PropertyGroup } from "./PropertyGroup.js";
import { PropertyShape } from "./PropertyShape.js";
import type { RdfjsShapesGraph } from "./RdfjsShapesGraph.js";
import type { Shape } from "./Shape.js";

export type DefaultRdfjsOntology = Ontology;
export type DefaultRdfjsPropertyGroup = PropertyGroup;

export type DefaultRdfjsNodeShape = NodeShape<
  any,
  DefaultRdfjsOntology,
  DefaultRdfjsPropertyGroup,
  DefaultRdfjsPropertyShape,
  DefaultRdfjsShape
>;
export type DefaultRdfjsPropertyShape = PropertyShape<
  DefaultRdfjsNodeShape,
  DefaultRdfjsOntology,
  DefaultRdfjsPropertyGroup,
  any,
  DefaultRdfjsShape
>;
export type DefaultRdfjsShape = Shape<
  DefaultRdfjsNodeShape,
  DefaultRdfjsOntology,
  DefaultRdfjsPropertyGroup,
  DefaultRdfjsPropertyShape,
  any
>;
export type DefaultRdfjsShapesGraph = RdfjsShapesGraph<
  DefaultRdfjsNodeShape,
  DefaultRdfjsOntology,
  DefaultRdfjsPropertyGroup,
  DefaultRdfjsPropertyShape,
  DefaultRdfjsShape
>;

export const defaultRdfjsFactory: Factory<
  DefaultRdfjsNodeShape,
  DefaultRdfjsOntology,
  DefaultRdfjsPropertyGroup,
  DefaultRdfjsPropertyShape,
  DefaultRdfjsShape
> = {
  createNodeShape(resource: Resource, shapesGraph: DefaultRdfjsShapesGraph) {
    return new NodeShape(resource, shapesGraph);
  },

  createOntology(
    resource: Resource,
    _shapesGraph: DefaultRdfjsShapesGraph,
  ): DefaultRdfjsOntology {
    return new Ontology(resource);
  },

  createPropertyGroup(
    resource: Resource,
    _shapesGraph: DefaultRdfjsShapesGraph,
  ): DefaultRdfjsPropertyGroup {
    return new PropertyGroup(resource);
  },

  createPropertyShape(
    resource: Resource,
    shapesGraph: DefaultRdfjsShapesGraph,
  ) {
    return new PropertyShape(resource, shapesGraph);
  },
};
