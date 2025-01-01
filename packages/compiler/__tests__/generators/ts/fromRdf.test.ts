import N3, { DataFactory as dataFactory } from "n3";
import { MutableResourceSet } from "rdfjs-resource";
import { describe, it } from "vitest";
import "./harnesses.js"; // Must be imported before kitchenSink
import * as kitchenSink from "../../../../../examples/kitchen-sink/generated.js";
import { harnesses } from "./harnesses.js";

describe("fromRdf", () => {
  for (const [id, harness] of Object.entries(harnesses)) {
    it(`${id} round trip`, ({ expect }) => {
      const fromRdfInstance = harness
        .fromRdf({
          extra: 1,
          resource: harness.toRdf({
            mutateGraph: dataFactory.defaultGraph(),
            resourceSet: new MutableResourceSet({
              dataFactory,
              dataset: new N3.Store(),
            }),
          }) as any,
        })
        .unsafeCoerce() as any;
      expect(harness.equals(fromRdfInstance).extract()).toStrictEqual(true);
    });
  }

  it("ensure hasValue (sh:hasValue)", ({ expect }) => {
    const dataset = new N3.Store();
    const identifier = dataFactory.blankNode();
    const predicate = dataFactory.namedNode(
      "http://example.com/hasIriProperty",
    );
    const object = dataFactory.namedNode(
      "http://example.com/NodeShapeWithHasValuePropertiesIri1",
    );
    dataset.add(dataFactory.quad(identifier, predicate, object));
    // Add an extra object of the same predicate, which should be ignored
    dataset.add(
      dataFactory.quad(
        identifier,
        predicate,
        dataFactory.namedNode(
          "http://example.com/NodeShapeWithHasValuePropertiesIri2",
        ),
      ),
    );
    const instance = kitchenSink.NodeShapeWithHasValueProperties.fromRdf({
      resource: new MutableResourceSet({
        dataFactory,
        dataset: dataset,
      }).resource(identifier),
    }).unsafeCoerce();
    expect(instance.hasIriProperty.unsafeCoerce().equals(object));
  });

  it("ignore invalid values (sh:hasValue)", ({ expect }) => {
    const dataset = new N3.Store();
    const identifier = dataFactory.blankNode();
    dataset.add(
      dataFactory.quad(
        identifier,
        dataFactory.namedNode("http://example.com/hasLiteralProperty"),
        dataFactory.literal("nottest"),
      ),
    );
    const instance = kitchenSink.NodeShapeWithHasValueProperties.fromRdf({
      resource: new MutableResourceSet({
        dataFactory,
        dataset: dataset,
      }).resource(identifier),
    }).unsafeCoerce();
    expect(instance.hasLiteralProperty.isNothing()).toStrictEqual(true);
  });

  it("preserve valid IRI values (sh:in)", ({ expect }) => {
    const dataset = new N3.Store();
    const identifier = dataFactory.blankNode();
    const object = dataFactory.namedNode(
      "http://example.com/NodeShapeWithInPropertiesIri1",
    );
    dataset.add(
      dataFactory.quad(
        identifier,
        dataFactory.namedNode("http://example.com/inIrisProperty"),
        object,
      ),
    );
    const instance = kitchenSink.NodeShapeWithInProperties.fromRdf({
      resource: new MutableResourceSet({
        dataFactory,
        dataset: dataset,
      }).resource(identifier),
    }).unsafeCoerce();
    expect(instance.inIrisProperty.unsafeCoerce().equals(object));
  });

  it("ignore invalid IRI values (sh:in)", ({ expect }) => {
    const dataset = new N3.Store();
    const identifier = dataFactory.blankNode();
    dataset.add(
      dataFactory.quad(
        identifier,
        dataFactory.namedNode("http://example.com/inIrisProperty"),
        dataFactory.namedNode(
          "http://example.com/NodeShapeWithInPropertiesIriInvalid",
        ),
      ),
    );
    const instance = kitchenSink.NodeShapeWithInProperties.fromRdf({
      resource: new MutableResourceSet({
        dataFactory,
        dataset: dataset,
      }).resource(identifier),
    }).unsafeCoerce();
    expect(instance.inIrisProperty.isNothing()).toStrictEqual(true);
  });

  it("preserve valid literal values (sh:in)", ({ expect }) => {
    const dataset = new N3.Store();
    const identifier = dataFactory.blankNode();
    dataset.add(
      dataFactory.quad(
        identifier,
        dataFactory.namedNode("http://example.com/inStringsProperty"),
        dataFactory.literal("text"),
      ),
    );
    const instance = kitchenSink.NodeShapeWithInProperties.fromRdf({
      resource: new MutableResourceSet({
        dataFactory,
        dataset: dataset,
      }).resource(identifier),
    }).unsafeCoerce();
    expect(instance.inStringsProperty.unsafeCoerce()).toStrictEqual("text");
  });

  it("ignore invalid literal values (sh:in)", ({ expect }) => {
    const dataset = new N3.Store();
    const identifier = dataFactory.blankNode();
    const predicate = dataFactory.namedNode(
      "http://example.com/inStringsProperty",
    );
    const object = dataFactory.literal("somethingelse");
    dataset.add(dataFactory.quad(identifier, predicate, object));
    const instance = kitchenSink.NodeShapeWithInProperties.fromRdf({
      resource: new MutableResourceSet({
        dataFactory,
        dataset: dataset,
      }).resource(identifier),
    }).unsafeCoerce();
    expect(instance.inStringsProperty.isNothing()).toStrictEqual(true);
  });

  it("runtime languageIn", ({ expect }) => {
    const dataset = new N3.Store();
    const identifier = dataFactory.blankNode();
    const resource = new MutableResourceSet({
      dataFactory,
      dataset: dataset,
    }).resource(identifier);
    const predicate = dataFactory.namedNode(
      "http://example.com/literalProperty",
    );
    dataset.add(
      dataFactory.quad(
        identifier,
        predicate,
        dataFactory.literal("arvalue", "ar"),
      ),
    );

    {
      const instance = kitchenSink.NodeShapeWithLanguageInProperties.fromRdf({
        languageIn: ["en"],
        resource,
      }).unsafeCoerce();
      expect(instance.literalProperty.isNothing()).toStrictEqual(true);
    }

    dataset.add(
      dataFactory.quad(
        identifier,
        predicate,
        dataFactory.literal("envalue", "en"),
      ),
    );

    {
      const instance = kitchenSink.NodeShapeWithLanguageInProperties.fromRdf({
        languageIn: ["en"],
        resource,
      }).unsafeCoerce();
      expect(instance.literalProperty.unsafeCoerce().value).toStrictEqual(
        "envalue",
      );
    }
  });

  it("sh:languageIn", ({ expect }) => {
    const dataset = new N3.Store();
    const identifier = dataFactory.blankNode();
    const resource = new MutableResourceSet({
      dataFactory,
      dataset: dataset,
    }).resource(identifier);
    const predicate = dataFactory.namedNode(
      "http://example.com/languageInProperty",
    );
    dataset.add(
      dataFactory.quad(
        identifier,
        predicate,
        dataFactory.literal("arvalue", "ar"),
      ),
    );
    dataset.add(
      dataFactory.quad(
        identifier,
        predicate,
        dataFactory.literal("envalue", "en"),
      ),
    );
    const instance = kitchenSink.NodeShapeWithLanguageInProperties.fromRdf({
      resource,
    }).unsafeCoerce();
    expect(instance.languageInProperty.unsafeCoerce().value).toStrictEqual(
      "envalue",
    );
  });
});
