import type { DatasetCore } from "@rdfjs/types";
import { RdfjsShapesGraph } from "@shaclmate/shacl-ast";
import { Either } from "purify-ts";
import type { Resource } from "rdfjs-resource";
import * as generated from "./generated.js";
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
        nodeShapeFromRdf({
          resource,
          shapesGraph,
        }: {
          resource: Resource;
          shapesGraph: ShapesGraph;
        }): Either<Error, NodeShape> {
          return Either.of(new NodeShape(resource, shapesGraph));
        },
        ontologyFromRdf({
          resource,
        }: {
          resource: Resource;
        }): Either<Error, Ontology> {
          return Either.of(new Ontology(resource));
        },
        propertyGroupFromRdf({
          resource,
        }: {
          resource: Resource;
        }): Either<Error, PropertyGroup> {
          return generated.ShaclCorePropertyGroup.fromRdf({
            resource,
          }).map((propertyGroup) => new PropertyGroup(propertyGroup));
        },
        propertyShapeFromRdf({
          resource,
          shapesGraph,
        }: {
          resource: Resource;
          shapesGraph: ShapesGraph;
        }): Either<Error, PropertyShape> {
          return Either.of(new PropertyShape(resource, shapesGraph));
        },
      },
    });
  }
}
