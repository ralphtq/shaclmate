import type { BlankNode, NamedNode } from "@rdfjs/types";
import * as kitchenSink from "@shaclmate/kitchen-sink-example";
import { DataFactory as dataFactory } from "n3";
import { NonEmptyList } from "purify-ts";
import { ExternObjectType } from "../../../../../examples/kitchen-sink/ExternObjectType.js";
import { ClassHarness } from "./ClassHarness.js";
import { ClassUnionHarness } from "./ClassUnionHarness.js";
import { InterfaceHarness } from "./InterfaceHarness.js";

const identifier = dataFactory.namedNode("http://example.com/instance");

export const harnesses = {
  concreteChildClassNodeShape: new ClassHarness({
    fromJson: kitchenSink.ConcreteChildClassNodeShape.fromJson,
    fromRdf: kitchenSink.ConcreteChildClassNodeShape.fromRdf,
    instance: new kitchenSink.ConcreteChildClassNodeShape({
      abcStringProperty: "abc",
      childStringProperty: "child",
      identifier,
      parentStringProperty: "parent",
    }),
    sparqlConstructQueryString:
      kitchenSink.ConcreteChildClassNodeShape.sparqlConstructQueryString,
  }),
  concreteParentClassNodeShape: new ClassHarness({
    fromJson: kitchenSink.ConcreteParentClassNodeShape.fromJson,
    fromRdf: kitchenSink.ConcreteParentClassNodeShape.fromRdf,
    instance: new kitchenSink.ConcreteParentClassNodeShape({
      abcStringProperty: "abc",
      identifier,
      parentStringProperty: "parent",
    }),
    sparqlConstructQueryString:
      kitchenSink.ConcreteParentClassNodeShape.sparqlConstructQueryString,
  }),
  interfaceNodeShape: new InterfaceHarness<
    kitchenSink.InterfaceNodeShape,
    BlankNode | NamedNode
  >({
    fromJson: kitchenSink.InterfaceNodeShape.fromJson,
    equals: kitchenSink.InterfaceNodeShape.equals,
    fromRdf: kitchenSink.InterfaceNodeShape.fromRdf,
    instance: {
      identifier,
      stringProperty: "Test",
      type: "InterfaceNodeShape",
    },
    sparqlConstructQueryString:
      kitchenSink.InterfaceNodeShape.sparqlConstructQueryString,
    toJson: kitchenSink.InterfaceNodeShape.toJson,
    toRdf: kitchenSink.InterfaceNodeShape.toRdf,
  }),
  interfaceUnionNodeShapeMember1: new InterfaceHarness<
    kitchenSink.InterfaceUnionNodeShape,
    BlankNode | NamedNode
  >({
    fromJson: kitchenSink.InterfaceUnionNodeShape.fromJson,
    equals: kitchenSink.InterfaceUnionNodeShape.equals,
    fromRdf: kitchenSink.InterfaceUnionNodeShape.fromRdf,
    instance: {
      identifier,
      stringProperty1: "Test1",
      type: "InterfaceUnionNodeShapeMember1",
    },
    sparqlConstructQueryString:
      kitchenSink.InterfaceUnionNodeShape.sparqlConstructQueryString,
    toJson: kitchenSink.InterfaceUnionNodeShape.toJson,
    toRdf: kitchenSink.InterfaceUnionNodeShape.toRdf,
  }),
  interfaceUnionNodeShapeMember2: new InterfaceHarness<
    kitchenSink.InterfaceUnionNodeShape,
    BlankNode | NamedNode
  >({
    fromJson: kitchenSink.InterfaceUnionNodeShape.fromJson,
    equals: kitchenSink.InterfaceUnionNodeShape.equals,
    fromRdf: kitchenSink.InterfaceUnionNodeShape.fromRdf,
    instance: {
      identifier,
      stringProperty2a: "Test2",
      type: "InterfaceUnionNodeShapeMember2a",
    },
    sparqlConstructQueryString:
      kitchenSink.InterfaceUnionNodeShape.sparqlConstructQueryString,
    toJson: kitchenSink.InterfaceUnionNodeShape.toJson,
    toRdf: kitchenSink.InterfaceUnionNodeShape.toRdf,
  }),
  iriNodeShape: new ClassHarness({
    fromJson: kitchenSink.IriNodeShape.fromJson,
    fromRdf: kitchenSink.IriNodeShape.fromRdf,
    instance: new kitchenSink.IriNodeShape({
      identifier,
      stringProperty: "test",
    }),
    sparqlConstructQueryString:
      kitchenSink.IriNodeShape.sparqlConstructQueryString,
  }),
  nodeShapeWithDefaultValueProperties: new ClassHarness({
    fromJson: kitchenSink.NodeShapeWithDefaultValueProperties.fromJson,
    fromRdf: kitchenSink.NodeShapeWithDefaultValueProperties.fromRdf,
    instance: new kitchenSink.NodeShapeWithDefaultValueProperties({
      identifier,
    }),
    sparqlConstructQueryString:
      kitchenSink.NodeShapeWithDefaultValueProperties
        .sparqlConstructQueryString,
  }),
  nodeShapeWithDefaultValuePropertiesOverriddenDifferent: new ClassHarness({
    fromJson: kitchenSink.NodeShapeWithDefaultValueProperties.fromJson,
    fromRdf: kitchenSink.NodeShapeWithDefaultValueProperties.fromRdf,
    instance: new kitchenSink.NodeShapeWithDefaultValueProperties({
      falseBooleanProperty: true,
      identifier,
      numberProperty: 1,
      stringProperty: "test",
      trueBooleanProperty: false,
    }),
    sparqlConstructQueryString:
      kitchenSink.NodeShapeWithDefaultValueProperties
        .sparqlConstructQueryString,
  }),
  nodeShapeWithDefaultValuePropertiesOverriddenSame: new ClassHarness({
    fromJson: kitchenSink.NodeShapeWithDefaultValueProperties.fromJson,
    fromRdf: kitchenSink.NodeShapeWithDefaultValueProperties.fromRdf,
    instance: new kitchenSink.NodeShapeWithDefaultValueProperties({
      falseBooleanProperty: false,
      dateProperty: new Date("2025-03-06"),
      dateTimeProperty: new Date(1523268000000),
      identifier,
      numberProperty: 0,
      stringProperty: "",
      trueBooleanProperty: true,
    }),
    sparqlConstructQueryString:
      kitchenSink.NodeShapeWithDefaultValueProperties
        .sparqlConstructQueryString,
  }),
  nodeShapeWithEmptyListProperty: new ClassHarness({
    fromJson: kitchenSink.NodeShapeWithListProperties.fromJson,
    fromRdf: kitchenSink.NodeShapeWithListProperties.fromRdf,
    instance: new kitchenSink.NodeShapeWithListProperties({
      identifier,
      stringListProperty: [],
    }),
    sparqlConstructQueryString:
      kitchenSink.NodeShapeWithListProperties.sparqlConstructQueryString,
  }),
  nodeShapeWithExplicitRdfTypes: new ClassHarness({
    fromJson: kitchenSink.NodeShapeWithExplicitRdfTypes.fromJson,
    fromRdf: kitchenSink.NodeShapeWithExplicitRdfTypes.fromRdf,
    instance: new kitchenSink.NodeShapeWithExplicitRdfTypes({
      identifier,
      stringProperty: "test",
    }),
    sparqlConstructQueryString:
      kitchenSink.NodeShapeWithExplicitRdfTypes.sparqlConstructQueryString,
  }),
  nodeShapeWithExternProperties: new ClassHarness({
    fromJson: kitchenSink.NodeShapeWithExternProperties.fromJson,
    fromRdf: kitchenSink.NodeShapeWithExternProperties.fromRdf,
    instance: new kitchenSink.NodeShapeWithExternProperties({
      externObjectTypeProperty: new ExternObjectType(
        dataFactory.namedNode("http://example.com/externObjectType"),
      ),
      externProperty: dataFactory.namedNode(
        "http://example.com/externProperty",
      ),
      identifier,
      inlineProperty: new kitchenSink.InlineNodeShape({
        stringProperty: "Test",
      }),
    }),
    sparqlConstructQueryString:
      kitchenSink.NodeShapeWithExternProperties.sparqlConstructQueryString,
  }),
  nodeShapeWithHasValueProperties: new ClassHarness({
    fromJson: kitchenSink.NodeShapeWithHasValueProperties.fromJson,
    fromRdf: kitchenSink.NodeShapeWithHasValueProperties.fromRdf,
    instance: new kitchenSink.NodeShapeWithHasValueProperties({
      hasIriProperty: dataFactory.namedNode(
        "http://example.com/NodeShapeWithHasValuePropertiesIri1",
      ),
      identifier,
    }),
    sparqlConstructQueryString:
      kitchenSink.NodeShapeWithHasValueProperties.sparqlConstructQueryString,
  }),
  nodeShapeWithInIdentifier: new ClassHarness({
    fromJson: kitchenSink.NodeShapeWithInIdentifier.fromJson,
    fromRdf: kitchenSink.NodeShapeWithInIdentifier.fromRdf,
    instance: new kitchenSink.NodeShapeWithInIdentifier({
      identifier: dataFactory.namedNode(
        "http://example.com/NodeShapeWithInIdentifierInstance1",
      ),
      stringProperty: "doesn't matter",
    }),
    sparqlConstructQueryString:
      kitchenSink.NodeShapeWithInIdentifier.sparqlConstructQueryString,
  }),
  nodeShapeWithInIrisProperty: new ClassHarness({
    fromJson: kitchenSink.NodeShapeWithInProperties.fromJson,
    fromRdf: kitchenSink.NodeShapeWithInProperties.fromRdf,
    instance: new kitchenSink.NodeShapeWithInProperties({
      identifier,
      inIrisProperty: dataFactory.namedNode(
        "http://example.com/NodeShapeWithInPropertiesIri1",
      ),
    }),
    sparqlConstructQueryString:
      kitchenSink.NodeShapeWithInProperties.sparqlConstructQueryString,
  }),
  nodeShapeWithInLiteralsProperty: new ClassHarness({
    fromJson: kitchenSink.NodeShapeWithInProperties.fromJson,
    fromRdf: kitchenSink.NodeShapeWithInProperties.fromRdf,
    instance: new kitchenSink.NodeShapeWithInProperties({
      identifier,
      inStringsProperty: "text",
    }),
    sparqlConstructQueryString:
      kitchenSink.NodeShapeWithInProperties.sparqlConstructQueryString,
  }),
  nodeShapeWithLanguageInProperties: new ClassHarness({
    fromJson: kitchenSink.NodeShapeWithLanguageInProperties.fromJson,
    fromRdf: kitchenSink.NodeShapeWithLanguageInProperties.fromRdf,
    instance: new kitchenSink.NodeShapeWithLanguageInProperties({
      identifier,
      literalProperty: dataFactory.literal("envalue", "en"),
      languageInProperty: dataFactory.literal("frvalue", "fr"),
    }),
    sparqlConstructQueryString:
      kitchenSink.NodeShapeWithLanguageInProperties.sparqlConstructQueryString,
  }),
  nodeShapeWithObjectListProperty: new ClassHarness({
    fromJson: kitchenSink.NodeShapeWithListProperties.fromJson,
    fromRdf: kitchenSink.NodeShapeWithListProperties.fromRdf,
    instance: new kitchenSink.NodeShapeWithListProperties({
      identifier,
      objectListProperty: [
        new kitchenSink.NonClassNodeShape({ stringProperty: "Test1" }),
        new kitchenSink.NonClassNodeShape({ stringProperty: "Test2" }),
      ],
    }),
    sparqlConstructQueryString:
      kitchenSink.NodeShapeWithListProperties.sparqlConstructQueryString,
  }),
  nodeShapeWithStringListProperty: new ClassHarness({
    fromJson: kitchenSink.NodeShapeWithListProperties.fromJson,
    fromRdf: kitchenSink.NodeShapeWithListProperties.fromRdf,
    instance: new kitchenSink.NodeShapeWithListProperties({
      identifier,
      stringListProperty: ["Test1", "Test2"],
    }),
    sparqlConstructQueryString:
      kitchenSink.NodeShapeWithListProperties.sparqlConstructQueryString,
  }),
  nodeShapeWithMutableProperties: new ClassHarness({
    fromJson: kitchenSink.NodeShapeWithMutableProperties.fromJson,
    fromRdf: kitchenSink.NodeShapeWithMutableProperties.fromRdf,
    instance: new kitchenSink.NodeShapeWithMutableProperties({
      identifier,
      mutableListProperty: ["test1", "test2"],
      mutableStringProperty: "test",
      mutableSetProperty: ["test1", "test2"],
    }),
    sparqlConstructQueryString:
      kitchenSink.NodeShapeWithMutableProperties.sparqlConstructQueryString,
  }),
  nodeShapeWithOrderedProperties: new ClassHarness({
    fromJson: kitchenSink.NodeShapeWithOrderedProperties.fromJson,
    fromRdf: kitchenSink.NodeShapeWithOrderedProperties.fromRdf,
    instance: new kitchenSink.NodeShapeWithOrderedProperties({
      identifier,
      propertyA: "testA",
      propertyB: "testB",
      propertyC: "testC",
    }),
    sparqlConstructQueryString:
      kitchenSink.NodeShapeWithOrderedProperties.sparqlConstructQueryString,
  }),
  nodeShapeWithPropertyCardinalities: new ClassHarness({
    fromJson: kitchenSink.NodeShapeWithPropertyCardinalities.fromJson,
    fromRdf: kitchenSink.NodeShapeWithPropertyCardinalities.fromRdf,
    instance: new kitchenSink.NodeShapeWithPropertyCardinalities({
      identifier,
      emptyStringSetProperty: undefined,
      nonEmptyStringSetProperty: NonEmptyList(["test1"]),
      optionalStringProperty: undefined,
      requiredStringProperty: "test",
    }),
    sparqlConstructQueryString:
      kitchenSink.NodeShapeWithPropertyCardinalities.sparqlConstructQueryString,
  }),
  nodeShapeWithPropertyVisibilities: new ClassHarness({
    fromJson: kitchenSink.NodeShapeWithPropertyVisibilities.fromJson,
    fromRdf: kitchenSink.NodeShapeWithPropertyVisibilities.fromRdf,
    instance: new kitchenSink.NodeShapeWithPropertyVisibilities({
      identifier,
      privateProperty: "private",
      protectedProperty: "protected",
      publicProperty: "public",
    }),
    sparqlConstructQueryString:
      kitchenSink.NodeShapeWithPropertyVisibilities.sparqlConstructQueryString,
  }),
  nodeShapeWithTermProperties: new ClassHarness({
    fromJson: kitchenSink.NodeShapeWithTermProperties.fromJson,
    fromRdf: kitchenSink.NodeShapeWithTermProperties.fromRdf,
    instance: new kitchenSink.NodeShapeWithTermProperties({
      booleanProperty: true,
      dateProperty: new Date("2025-03-06"),
      dateTimeProperty: new Date(),
      identifier,
      iriProperty: dataFactory.namedNode("http://example.com"),
      literalProperty: dataFactory.literal("test"),
      numberProperty: 1,
      stringProperty: "test",
      termProperty: 1,
    }),
    sparqlConstructQueryString:
      kitchenSink.NodeShapeWithTermProperties.sparqlConstructQueryString,
  }),
  nodeShapeWithUnionProperties: new ClassHarness({
    fromJson: kitchenSink.NodeShapeWithUnionProperties.fromJson,
    fromRdf: kitchenSink.NodeShapeWithUnionProperties.fromRdf,
    instance: new kitchenSink.NodeShapeWithUnionProperties({
      identifier,
      orLiteralsProperty: 1,
      orUnrelatedProperty: { type: "0-number", value: 1 },
      orTermsProperty: dataFactory.literal("test"),
    }),
    sparqlConstructQueryString:
      kitchenSink.NodeShapeWithUnionProperties.sparqlConstructQueryString,
  }),
  nonClassNodeShape: new ClassHarness({
    fromJson: kitchenSink.NonClassNodeShape.fromJson,
    fromRdf: kitchenSink.NonClassNodeShape.fromRdf,
    instance: new kitchenSink.NonClassNodeShape({
      identifier,
      stringProperty: "Test",
    }),
    sparqlConstructQueryString:
      kitchenSink.NonClassNodeShape.sparqlConstructQueryString,
  }),
  sha256IriNodeShapeWithExplicitIdentifier: new ClassHarness({
    fromJson: kitchenSink.Sha256IriNodeShape.fromJson,
    fromRdf: kitchenSink.Sha256IriNodeShape.fromRdf,
    instance: new kitchenSink.Sha256IriNodeShape({
      identifier,
      stringProperty: "test",
    }),
    sparqlConstructQueryString:
      kitchenSink.Sha256IriNodeShape.sparqlConstructQueryString,
  }),
  sha256IriNodeShapeWithoutExplicitIdentifier: new ClassHarness({
    fromJson: kitchenSink.Sha256IriNodeShape.fromJson,
    fromRdf: kitchenSink.Sha256IriNodeShape.fromRdf,
    instance: new kitchenSink.Sha256IriNodeShape({
      stringProperty: "test",
    }),
    sparqlConstructQueryString:
      kitchenSink.Sha256IriNodeShape.sparqlConstructQueryString,
  }),
  unionNodeShapeMember1: new ClassUnionHarness({
    equals: kitchenSink.UnionNodeShape.equals,
    fromJson: kitchenSink.UnionNodeShape.fromJson,
    fromRdf: kitchenSink.UnionNodeShape.fromRdf,
    instance: new kitchenSink.UnionNodeShapeMember1({
      identifier,
      stringProperty1: "test",
    }),
    sparqlConstructQueryString:
      kitchenSink.UnionNodeShape.sparqlConstructQueryString,
  }),
  unionNodeShapeMember2: new ClassUnionHarness({
    equals: kitchenSink.UnionNodeShape.equals,
    fromJson: kitchenSink.UnionNodeShape.fromJson,
    fromRdf: kitchenSink.UnionNodeShape.fromRdf,
    instance: new kitchenSink.UnionNodeShapeMember2({
      identifier,
      stringProperty2: "test",
    }),
    sparqlConstructQueryString:
      kitchenSink.UnionNodeShape.sparqlConstructQueryString,
  }),
  uuidv4IriNodeShapeWithExplicitIdentifier: new ClassHarness({
    fromJson: kitchenSink.UuidV4IriNodeShape.fromJson,
    fromRdf: kitchenSink.UuidV4IriNodeShape.fromRdf,
    instance: new kitchenSink.UuidV4IriNodeShape({
      identifier,
      stringProperty: "test",
    }),
    sparqlConstructQueryString:
      kitchenSink.UuidV4IriNodeShape.sparqlConstructQueryString,
  }),
  uuidv4IriNodeShapeWithoutExplicitIdentifier: new ClassHarness({
    fromJson: kitchenSink.UuidV4IriNodeShape.fromJson,
    fromRdf: kitchenSink.UuidV4IriNodeShape.fromRdf,
    instance: new kitchenSink.UuidV4IriNodeShape({
      stringProperty: "test",
    }),
    sparqlConstructQueryString:
      kitchenSink.UuidV4IriNodeShape.sparqlConstructQueryString,
  }),
};
