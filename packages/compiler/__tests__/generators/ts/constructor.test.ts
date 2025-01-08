import { DataFactory as dataFactory } from "n3";
import { describe, it } from "vitest";
import "./harnesses.js"; // Must be imported before kitchenSink
import * as kitchenSink from "../../../../../examples/kitchen-sink/generated.js";
import { harnesses } from "./harnesses.js";

describe("constructor", () => {
  it("construct a class instance from convertible parameters", ({ expect }) => {
    const instance = harnesses.nodeShapeWithPropertyCardinalities.instance;
    expect(instance.emptyStringSetProperty).toHaveLength(0);
    expect(instance.optionalStringProperty.isNothing()).toStrictEqual(true);
    expect(instance.nonEmptyStringSetProperty).toStrictEqual(["test1"]);
    expect(instance.requiredStringProperty).toStrictEqual("test");
  });

  it("don't mint an IRI if one is supplied", ({ expect }) => {
    expect(
      harnesses.sha256IriNodeShapeWithExplicitIdentifier.instance.identifier.equals(
        dataFactory.namedNode("http://example.com/instance"),
      ),
    ).toStrictEqual(true);
  });

  it("mint an IRI with SHA-256 if none is supplied", ({ expect }) => {
    const instance = new kitchenSink.Sha256IriNodeShape({
      stringProperty: "test",
    });
    expect(
      instance.identifier.equals(
        dataFactory.namedNode(
          "urn:shaclmate:object:Sha256IriNodeShape:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
        ),
      ),
    ).toStrictEqual(true);
  });

  it("mint an IRI with UUIDv4 if none is supplied", ({ expect }) => {
    const instance =
      harnesses.uuidv4IriNodeShapeWithoutExplicitIdentifier.instance;
    expect(instance.identifier.value).toMatch(
      /urn:shaclmate:object:UuidV4IriNodeShape:[0-9A-Fa-f]{8}-/,
    );
  });

  it("default values", ({ expect }) => {
    const model = harnesses.nodeShapeWithDefaultValueProperties.instance;
    expect(model.falseBooleanProperty).toStrictEqual(false);
    expect(model.dateTimeProperty.getTime()).toStrictEqual(1523268000000);
    expect(model.numberProperty).toStrictEqual(0);
    expect(model.stringProperty).toStrictEqual("");
    expect(model.trueBooleanProperty).toStrictEqual(true);
  });

  it("union of literals property", ({ expect }) => {
    expect(
      new kitchenSink.NodeShapeWithUnionProperties({
        identifier: dataFactory.blankNode(),
        orLiteralsProperty: dataFactory.literal("test"),
      }).orLiteralsProperty.unsafeCoerce().value,
    ).toStrictEqual("test");
  });
});
