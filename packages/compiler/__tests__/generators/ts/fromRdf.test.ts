import N3, { DataFactory as dataFactory } from "n3";
import { MutableResourceSet } from "rdfjs-resource";
import { describe, it } from "vitest";
import "./harnesses.js"; // Must be imported before kitchenSink
import * as kitchenSink from "@shaclmate/kitchen-sink-example";
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

  it("abstract base class fromRdf", ({ expect }) => {
    const fromRdfInstance =
      kitchenSink.AbstractBaseClassWithPropertiesNodeShape.fromRdf({
        resource: harnesses.concreteChildClassNodeShape.toRdf({
          mutateGraph: dataFactory.defaultGraph(),
          resourceSet: new MutableResourceSet({
            dataFactory,
            dataset: new N3.Store(),
          }),
        }) as any,
      }).unsafeCoerce() as any;
    expect(
      harnesses.concreteChildClassNodeShape.equals(fromRdfInstance).extract(),
    ).toStrictEqual(true);
  });

  it("concrete base class fromRdf", ({ expect }) => {
    const fromRdfInstance = kitchenSink.ConcreteParentClassNodeShape.fromRdf({
      resource: harnesses.concreteChildClassNodeShape.toRdf({
        mutateGraph: dataFactory.defaultGraph(),
        resourceSet: new MutableResourceSet({
          dataFactory,
          dataset: new N3.Store(),
        }),
      }) as any,
    }).unsafeCoerce() as any;
    expect(
      harnesses.concreteChildClassNodeShape.equals(fromRdfInstance).extract(),
    ).toStrictEqual(true);
  });

  it("ensure hasValue (sh:hasValue)", ({ expect }) => {
    const dataset = new N3.Store();
    const identifier = dataFactory.blankNode();
    const predicate = dataFactory.namedNode(
      "http://example.com/hasIriProperty",
    );
    const object = dataFactory.namedNode(
      "http://example.com/HasValuePropertiesNodeShapeIri1",
    );
    dataset.add(dataFactory.quad(identifier, predicate, object));
    // Add an extra object of the same predicate, which should be ignored
    dataset.add(
      dataFactory.quad(
        identifier,
        predicate,
        dataFactory.namedNode(
          "http://example.com/HasValuePropertiesNodeShapeIri2",
        ),
      ),
    );
    const instance = kitchenSink.HasValuePropertiesNodeShape.fromRdf({
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
    const instance = kitchenSink.HasValuePropertiesNodeShape.fromRdf({
      resource: new MutableResourceSet({
        dataFactory,
        dataset: dataset,
      }).resource(identifier),
    }).unsafeCoerce();
    expect(instance.hasLiteralProperty.isNothing()).toStrictEqual(true);
  });

  it("ignore invalid identifier values (sh:in)", ({ expect }) => {
    const dataset = new N3.Store();
    const identifier = dataFactory.namedNode(
      "http://example.com/InvalidIdentifier",
    );
    dataset.add(
      dataFactory.quad(
        identifier,
        dataFactory.namedNode("http://example.com/stringProperty"),
        dataFactory.literal("whatever"),
      ),
    );
    const instance = kitchenSink.InIdentifierNodeShape.fromRdf({
      resource: new MutableResourceSet({
        dataFactory,
        dataset: dataset,
      }).namedResource(identifier),
    }).extract();
    expect(instance).toBeInstanceOf(Error);
  });

  it("ignore invalid IRI property values (sh:in)", ({ expect }) => {
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
    const instance = kitchenSink.InPropertiesNodeShape.fromRdf({
      resource: new MutableResourceSet({
        dataFactory,
        dataset: dataset,
      }).resource(identifier),
    }).unsafeCoerce();
    expect(instance.inIrisProperty.isNothing()).toStrictEqual(true);
  });

  it("ignore invalid literal property values (sh:in)", ({ expect }) => {
    const dataset = new N3.Store();
    const identifier = dataFactory.blankNode();
    const predicate = dataFactory.namedNode(
      "http://example.com/inStringsProperty",
    );
    const object = dataFactory.literal("somethingelse");
    dataset.add(dataFactory.quad(identifier, predicate, object));
    const instance = kitchenSink.InPropertiesNodeShape.fromRdf({
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
      const instance = kitchenSink.LanguageInPropertiesNodeShape.fromRdf({
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
      const instance = kitchenSink.LanguageInPropertiesNodeShape.fromRdf({
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
    const instance = kitchenSink.LanguageInPropertiesNodeShape.fromRdf({
      resource,
    }).unsafeCoerce();
    expect(instance.languageInProperty.unsafeCoerce().value).toStrictEqual(
      "envalue",
    );
  });
});
