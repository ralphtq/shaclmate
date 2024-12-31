import * as sparqlBuilder from "@kos-kit/sparql-builder";
import { OxigraphSparqlClient } from "@kos-kit/sparql-client";
import type { BlankNode, NamedNode, Quad } from "@rdfjs/types";
import { rdf } from "@tpluscode/rdf-ns-builders";
import { sha256 } from "js-sha256";
import N3, { DataFactory as dataFactory } from "n3";
import * as oxigraph from "oxigraph";
import { type Either, Maybe } from "purify-ts";
import type { Equatable } from "purify-ts-helpers";
import { isomorphic } from "rdf-isomorphic";
import {
  type MutableResource,
  MutableResourceSet,
  type Resource,
} from "rdfjs-resource";
import { describe, it } from "vitest";
import { ExternObjectType } from "../../../../../examples/kitchen-sink/ExternObjectType.js";
import * as kitchenSink from "../../../../../examples/kitchen-sink/generated.js";

function quadsToTurtle(quads: readonly Quad[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new N3.Writer({ format: "text/turtle" });
    for (const quad of quads) {
      writer.addQuad(quad);
    }
    writer.end((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

abstract class Harness<
  T extends { readonly identifier: IdentifierT },
  IdentifierT extends BlankNode | NamedNode,
> {
  readonly fromRdf: (parameters: {
    [_index: string]: any;
    resource: Resource<IdentifierT>;
  }) => Either<Resource.ValueError, T>;
  readonly instance: T;
  readonly sparqlGraphPatternsClass: new (
    subject: sparqlBuilder.ResourceGraphPatterns.Subject,
  ) => sparqlBuilder.ResourceGraphPatterns;

  constructor({
    fromRdf,
    instance,
    sparqlGraphPatternsClass,
  }: {
    fromRdf: Harness<T, IdentifierT>["fromRdf"];
    instance: T;
    sparqlGraphPatternsClass: Harness<
      T,
      IdentifierT
    >["sparqlGraphPatternsClass"];
  }) {
    this.fromRdf = fromRdf;
    this.instance = instance;
    this.sparqlGraphPatternsClass = sparqlGraphPatternsClass;
  }

  abstract equals(other: T): Equatable.EqualsResult;

  abstract toRdf(kwds: {
    mutateGraph: MutableResource.MutateGraph;
    resourceSet: MutableResourceSet;
  }): Resource<IdentifierT>;
}

class ClassHarness<
  T extends {
    equals: (other: T) => Equatable.EqualsResult;
    identifier: IdentifierT;
    toRdf: (options: {
      mutateGraph: MutableResource.MutateGraph;
      resourceSet: MutableResourceSet;
    }) => Resource<IdentifierT>;
  },
  IdentifierT extends BlankNode | NamedNode,
> extends Harness<T, IdentifierT> {
  override equals(other: T): Equatable.EqualsResult {
    return this.instance.equals(other);
  }

  override toRdf(options: {
    mutateGraph: MutableResource.MutateGraph;
    resourceSet: MutableResourceSet;
  }): Resource<IdentifierT> {
    return this.instance.toRdf(options);
  }
}

class InterfaceHarness<
  T extends { readonly identifier: IdentifierT },
  IdentifierT extends BlankNode | NamedNode,
> extends Harness<T, IdentifierT> {
  readonly equals: (other: T) => Equatable.EqualsResult;
  readonly toRdf: (options: {
    mutateGraph: MutableResource.MutateGraph;
    resourceSet: MutableResourceSet;
  }) => Resource<IdentifierT>;

  constructor({
    equals,
    toRdf,
    ...superParameters
  }: {
    equals: (left: T, right: T) => Equatable.EqualsResult;
    toRdf: (
      instance: T,
      options: {
        mutateGraph: MutableResource.MutateGraph;
        resourceSet: MutableResourceSet;
      },
    ) => Resource<IdentifierT>;
  } & ConstructorParameters<typeof Harness<T, IdentifierT>>[0]) {
    super(superParameters);
    this.equals = (other) => equals(this.instance, other);
    this.toRdf = (kwds) => toRdf(this.instance, kwds);
  }
}

describe("TsGenerator", () => {
  const harnesses = {
    concreteChildClassNodeShape: new ClassHarness({
      fromRdf: kitchenSink.ConcreteChildClassNodeShape.fromRdf,
      instance: new kitchenSink.ConcreteChildClassNodeShape({
        identifier: dataFactory.blankNode(),
        abcStringProperty: "abc",
        childStringProperty: "child",
        parentStringProperty: "parent",
      }),
      sparqlGraphPatternsClass:
        kitchenSink.ConcreteChildClassNodeShape.SparqlGraphPatterns,
    }),
    concreteParentClassNodeShape: new ClassHarness({
      fromRdf: kitchenSink.ConcreteParentClassNodeShape.fromRdf,
      instance: new kitchenSink.ConcreteParentClassNodeShape({
        identifier: dataFactory.blankNode(),
        abcStringProperty: "abc",
        parentStringProperty: "parent",
      }),
      sparqlGraphPatternsClass:
        kitchenSink.ConcreteParentClassNodeShape.SparqlGraphPatterns,
    }),
    interfaceNodeShape: new InterfaceHarness<
      kitchenSink.InterfaceNodeShape,
      BlankNode | NamedNode
    >({
      equals: kitchenSink.InterfaceNodeShape.equals,
      fromRdf: kitchenSink.InterfaceNodeShape.fromRdf,
      instance: {
        identifier: dataFactory.blankNode(),
        stringProperty: "Test",
        type: "InterfaceNodeShape",
      },
      sparqlGraphPatternsClass:
        kitchenSink.InterfaceNodeShape.SparqlGraphPatterns,
      toRdf: kitchenSink.InterfaceNodeShape.toRdf,
    }),
    iriNodeShape: new ClassHarness({
      fromRdf: kitchenSink.IriNodeShape.fromRdf,
      instance: new kitchenSink.IriNodeShape({
        identifier: dataFactory.namedNode("http://example.com/test"),
        stringProperty: "test",
      }),
      sparqlGraphPatternsClass: kitchenSink.IriNodeShape.SparqlGraphPatterns,
    }),
    nodeShapeWithDefaultValueProperties: new ClassHarness({
      fromRdf: kitchenSink.NodeShapeWithDefaultValueProperties.fromRdf,
      instance: new kitchenSink.NodeShapeWithDefaultValueProperties({}),
      sparqlGraphPatternsClass:
        kitchenSink.NodeShapeWithDefaultValueProperties.SparqlGraphPatterns,
    }),
    nodeShapeWithDefaultValuePropertiesOverriddenDifferent: new ClassHarness({
      fromRdf: kitchenSink.NodeShapeWithDefaultValueProperties.fromRdf,
      instance: new kitchenSink.NodeShapeWithDefaultValueProperties({
        falseBooleanProperty: true,
        identifier: dataFactory.blankNode(),
        numberProperty: 1,
        stringProperty: "test",
        trueBooleanProperty: false,
      }),
      sparqlGraphPatternsClass:
        kitchenSink.NodeShapeWithDefaultValueProperties.SparqlGraphPatterns,
    }),
    nodeShapeWithDefaultValuePropertiesOverriddenSame: new ClassHarness({
      fromRdf: kitchenSink.NodeShapeWithDefaultValueProperties.fromRdf,
      instance: new kitchenSink.NodeShapeWithDefaultValueProperties({
        falseBooleanProperty: false,
        dateTimeProperty: new Date(1523268000000),
        identifier: dataFactory.blankNode(),
        numberProperty: 0,
        stringProperty: "",
        trueBooleanProperty: true,
      }),
      sparqlGraphPatternsClass:
        kitchenSink.NodeShapeWithDefaultValueProperties.SparqlGraphPatterns,
    }),
    nodeShapeWithExplicitRdfTypes: new ClassHarness({
      fromRdf: kitchenSink.NodeShapeWithExplicitRdfTypes.fromRdf,
      instance: new kitchenSink.NodeShapeWithExplicitRdfTypes({
        identifier: dataFactory.blankNode(),
        stringProperty: "test",
      }),
      sparqlGraphPatternsClass:
        kitchenSink.NodeShapeWithExplicitRdfTypes.SparqlGraphPatterns,
    }),
    nodeShapeWithExternProperties: new ClassHarness({
      fromRdf: kitchenSink.NodeShapeWithExternProperties.fromRdf,
      instance: new kitchenSink.NodeShapeWithExternProperties({
        identifier: dataFactory.blankNode(),
        externObjectTypeProperty: new ExternObjectType(dataFactory.blankNode()),
        externProperty: dataFactory.blankNode(),
        inlineProperty: new kitchenSink.InlineNodeShape({
          identifier: dataFactory.blankNode(),
          stringProperty: "Test",
        }),
      }),
      sparqlGraphPatternsClass:
        kitchenSink.NodeShapeWithExternProperties.SparqlGraphPatterns,
    }),
    nodeShapeWithHasValueProperties: new ClassHarness({
      fromRdf: kitchenSink.NodeShapeWithHasValueProperties.fromRdf,
      instance: new kitchenSink.NodeShapeWithHasValueProperties({
        identifier: dataFactory.blankNode(),
        hasIriProperty: dataFactory.namedNode(
          "http://example.com/NodeShapeWithHasValuePropertiesIri1",
        ),
      }),
      sparqlGraphPatternsClass:
        kitchenSink.NodeShapeWithHasValueProperties.SparqlGraphPatterns,
    }),
    nodeShapeWithInIrisProperty: new ClassHarness({
      fromRdf: kitchenSink.NodeShapeWithInProperties.fromRdf,
      instance: new kitchenSink.NodeShapeWithInProperties({
        identifier: dataFactory.blankNode(),
        inIrisProperty: dataFactory.namedNode(
          "http://example.com/NodeShapeWithInPropertiesIri1",
        ),
      }),
      sparqlGraphPatternsClass:
        kitchenSink.NodeShapeWithInProperties.SparqlGraphPatterns,
    }),
    nodeShapeWithInLiteralsProperty: new ClassHarness({
      fromRdf: kitchenSink.NodeShapeWithInProperties.fromRdf,
      instance: new kitchenSink.NodeShapeWithInProperties({
        identifier: dataFactory.blankNode(),
        inStringsProperty: "text",
      }),
      sparqlGraphPatternsClass:
        kitchenSink.NodeShapeWithInProperties.SparqlGraphPatterns,
    }),
    nodeShapeWithListProperty: new ClassHarness({
      fromRdf: kitchenSink.NodeShapeWithListProperty.fromRdf,
      instance: new kitchenSink.NodeShapeWithListProperty({
        identifier: dataFactory.blankNode(),
        listProperty: ["Test1", "Test2"],
      }),
      sparqlGraphPatternsClass:
        kitchenSink.NodeShapeWithListProperty.SparqlGraphPatterns,
    }),
    nodeShapeWithMutableProperties: new ClassHarness({
      fromRdf: kitchenSink.NodeShapeWithMutableProperties.fromRdf,
      instance: new kitchenSink.NodeShapeWithMutableProperties({
        mutableListProperty: ["test1", "test2"],
        mutableStringProperty: "test",
      }),
      sparqlGraphPatternsClass:
        kitchenSink.NodeShapeWithMutableProperties.SparqlGraphPatterns,
    }),
    nodeShapeWithOrProperties: new ClassHarness({
      fromRdf: kitchenSink.NodeShapeWithOrProperties.fromRdf,
      instance: new kitchenSink.NodeShapeWithOrProperties({
        identifier: dataFactory.namedNode("http://example.com/instance"),
        orLiteralsProperty: 1,
        orUnrelatedProperty: { type: "0-number", value: 1 },
        orTermsProperty: dataFactory.literal("test"),
      }),
      sparqlGraphPatternsClass:
        kitchenSink.NodeShapeWithOrProperties.SparqlGraphPatterns,
    }),
    nodeShapeWithPropertyCardinalities: new ClassHarness({
      fromRdf: kitchenSink.NodeShapeWithPropertyCardinalities.fromRdf,
      instance: new kitchenSink.NodeShapeWithPropertyCardinalities({
        identifier: dataFactory.blankNode(),
        optionalStringProperty: undefined,
        requiredStringProperty: "test",
        setStringProperty: undefined,
      }),
      sparqlGraphPatternsClass:
        kitchenSink.NodeShapeWithPropertyCardinalities.SparqlGraphPatterns,
    }),
    nodeShapeWithPropertyVisibilities: new ClassHarness({
      fromRdf: kitchenSink.NodeShapeWithPropertyVisibilities.fromRdf,
      instance: new kitchenSink.NodeShapeWithPropertyVisibilities({
        privateProperty: "private",
        protectedProperty: "protected",
        publicProperty: "public",
      }),
      sparqlGraphPatternsClass:
        kitchenSink.NodeShapeWithPropertyVisibilities.SparqlGraphPatterns,
    }),
    nonClassNodeShape: new ClassHarness({
      fromRdf: kitchenSink.NonClassNodeShape.fromRdf,
      instance: new kitchenSink.NonClassNodeShape({
        identifier: dataFactory.blankNode(),
        stringProperty: "Test",
      }),
      sparqlGraphPatternsClass:
        kitchenSink.NonClassNodeShape.SparqlGraphPatterns,
    }),
    orNodeShapeMember1: new ClassHarness({
      fromRdf: kitchenSink.OrNodeShapeMember1.fromRdf,
      instance: new kitchenSink.OrNodeShapeMember1({
        identifier: dataFactory.blankNode(),
        stringProperty1: "test",
      }),
      sparqlGraphPatternsClass:
        kitchenSink.OrNodeShapeMember1.SparqlGraphPatterns,
    }),
    orNodeShapeMember2: new ClassHarness({
      fromRdf: kitchenSink.OrNodeShapeMember2.fromRdf,
      instance: new kitchenSink.OrNodeShapeMember2({
        identifier: dataFactory.blankNode(),
        stringProperty2: "test",
      }),
      sparqlGraphPatternsClass:
        kitchenSink.OrNodeShapeMember2.SparqlGraphPatterns,
    }),
    sha256IriNodeShapeWithExplicitIdentifier: new ClassHarness({
      fromRdf: kitchenSink.Sha256IriNodeShape.fromRdf,
      instance: new kitchenSink.Sha256IriNodeShape({
        identifier: dataFactory.namedNode("http://example.com/instance"),
        stringProperty: "test",
      }),
      sparqlGraphPatternsClass:
        kitchenSink.Sha256IriNodeShape.SparqlGraphPatterns,
    }),
    sha256IriNodeShapeWithoutExplicitIdentifier: new ClassHarness({
      fromRdf: kitchenSink.Sha256IriNodeShape.fromRdf,
      instance: new kitchenSink.Sha256IriNodeShape({
        stringProperty: "test",
      }),
      sparqlGraphPatternsClass:
        kitchenSink.Sha256IriNodeShape.SparqlGraphPatterns,
    }),
    uuidv4IriNodeShapeWithExplicitIdentifier: new ClassHarness({
      fromRdf: kitchenSink.UuidV4IriNodeShape.fromRdf,
      instance: new kitchenSink.UuidV4IriNodeShape({
        identifier: dataFactory.namedNode("http://example.com/instance"),
        stringProperty: "test",
      }),
      sparqlGraphPatternsClass:
        kitchenSink.UuidV4IriNodeShape.SparqlGraphPatterns,
    }),
    uuidv4IriNodeShapeWithoutExplicitIdentifier: new ClassHarness({
      fromRdf: kitchenSink.UuidV4IriNodeShape.fromRdf,
      instance: new kitchenSink.UuidV4IriNodeShape({
        stringProperty: "test",
      }),
      sparqlGraphPatternsClass:
        kitchenSink.UuidV4IriNodeShape.SparqlGraphPatterns,
    }),
  };

  it("interfaces: should generate valid TypeScript interfaces", ({
    expect,
  }) => {
    expect(
      harnesses["interfaceNodeShape"].instance.stringProperty,
    ).toStrictEqual("Test");
  });

  it("class constructor: construct a class instance from convertible parameters", ({
    expect,
  }) => {
    const instance = harnesses.nodeShapeWithPropertyCardinalities.instance;
    expect(instance.optionalStringProperty.isNothing()).toStrictEqual(true);
    expect(instance.setStringProperty).toStrictEqual([]);
    expect(instance.requiredStringProperty).toStrictEqual("test");
  });

  it("class constructor: don't mint an IRI if one is supplied", ({
    expect,
  }) => {
    expect(
      harnesses.sha256IriNodeShapeWithExplicitIdentifier.instance.identifier.equals(
        dataFactory.namedNode("http://example.com/instance"),
      ),
    ).toStrictEqual(true);
  });

  it("class constructor: mint an IRI with SHA-256 if none is supplied", ({
    expect,
  }) => {
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

  it("class constructor: mint an IRI with UUIDv4 if none is supplied", ({
    expect,
  }) => {
    const instance =
      harnesses.uuidv4IriNodeShapeWithoutExplicitIdentifier.instance;
    expect(instance.identifier.value).toMatch(
      /urn:shaclmate:object:UuidV4IriNodeShape:[0-9A-Fa-f]{8}-/,
    );
  });

  it("class constructor: default values", ({ expect }) => {
    const model = harnesses.nodeShapeWithDefaultValueProperties.instance;
    expect(model.falseBooleanProperty).toStrictEqual(false);
    expect(model.dateTimeProperty.getTime()).toStrictEqual(1523268000000);
    expect(model.numberProperty).toStrictEqual(0);
    expect(model.stringProperty).toStrictEqual("");
    expect(model.trueBooleanProperty).toStrictEqual(true);
  });

  it("class constructor: union of literals property", ({ expect }) => {
    expect(
      new kitchenSink.NodeShapeWithOrProperties({
        identifier: dataFactory.blankNode(),
        orLiteralsProperty: dataFactory.literal("test"),
      }).orLiteralsProperty.unsafeCoerce().value,
    ).toStrictEqual("test");
  });

  it("should generate a type alias", ({ expect }) => {
    const instance1: kitchenSink.OrNodeShape =
      harnesses.orNodeShapeMember1.instance;
    const instance2: kitchenSink.OrNodeShape =
      harnesses.orNodeShapeMember2.instance;
    expect(
      kitchenSink.OrNodeShape.equals(instance1, instance2).extract(),
    ).not.toStrictEqual(true);
  });

  for (const [id, harness] of Object.entries(harnesses)) {
    it(`equals: should return true when the two ${id} objects are equal`, ({
      expect,
    }) => {
      expect(
        harness.equals((harness as Harness<any, any>).instance).extract(),
      ).toStrictEqual(true);
    });
  }

  it("equals: should return Unequals when the two objects are unequal", ({
    expect,
  }) => {
    expect(
      new kitchenSink.NonClassNodeShape({
        identifier: dataFactory.blankNode(),
        stringProperty: "Test",
      })
        .equals(
          new kitchenSink.NonClassNodeShape({
            identifier: dataFactory.blankNode(),
            stringProperty: "Test2",
          }),
        )
        .extract(),
    ).not.toStrictEqual(true);
  });

  it("equals: terms union type", ({ expect }) => {
    const identifier = dataFactory.blankNode();
    expect(
      new kitchenSink.NodeShapeWithOrProperties({
        identifier,
        orTermsProperty: dataFactory.namedNode("http://example.com/term"),
      })
        .equals(
          new kitchenSink.NodeShapeWithOrProperties({
            identifier,
            orTermsProperty: dataFactory.namedNode("http://example.com/term"),
          }),
        )
        .extract(),
    ).toStrictEqual(true);

    expect(
      new kitchenSink.NodeShapeWithOrProperties({
        identifier,
        orTermsProperty: dataFactory.namedNode("http://example.com/term"),
      })
        .equals(
          new kitchenSink.NodeShapeWithOrProperties({
            identifier,
            orTermsProperty: dataFactory.literal("test"),
          }),
        )
        .extract(),
    ).not.toStrictEqual(true);
  });

  it("equals: unrelated union type", ({ expect }) => {
    const identifier = dataFactory.blankNode();
    expect(
      new kitchenSink.NodeShapeWithOrProperties({
        identifier,
        orUnrelatedProperty: { type: "0-number", value: 1 },
      })
        .equals(
          new kitchenSink.NodeShapeWithOrProperties({
            identifier,
            orUnrelatedProperty: { type: "0-number", value: 1 },
          }),
        )
        .extract(),
    ).toStrictEqual(true);

    expect(
      new kitchenSink.NodeShapeWithOrProperties({
        identifier,
        orUnrelatedProperty: { type: "0-number", value: 1 },
      })
        .equals(
          new kitchenSink.NodeShapeWithOrProperties({
            identifier,
            orUnrelatedProperty: {
              type: "1-rdfjs.NamedNode",
              value: dataFactory.namedNode("http://example.com/term"),
            },
          }),
        )
        .extract(),
    ).not.toStrictEqual(true);
  });

  for (const [id, harness] of Object.entries(harnesses)) {
    it(`fromRdf: ${id} round trip`, ({ expect }) => {
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

  it("fromRdf: ensure hasValue (sh:hasValue)", ({ expect }) => {
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

  it("fromRdf: ignore invalid values (sh:hasValue)", ({ expect }) => {
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

  it("fromRdf: preserve valid IRI values (sh:in)", ({ expect }) => {
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

  it("fromRdf: ignore invalid IRI values (sh:in)", ({ expect }) => {
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

  it("fromRdf: preserve valid literal values (sh:in)", ({ expect }) => {
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

  it("fromRdf: ignore invalid literal values (sh:in)", ({ expect }) => {
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

  it("hash: known hash", ({ expect }) => {
    expect(
      harnesses.nonClassNodeShape.instance.hash(sha256.create()).hex(),
    ).toStrictEqual(
      "532eaabd9574880dbf76b9b8cc00832c20a6ec113d682299550d7a6e0f345e25",
    );
  });

  it("mutable list", ({ expect }) => {
    const instance = new kitchenSink.NodeShapeWithMutableProperties({
      mutableListProperty: ["test1", "test2"],
    });
    expect(instance.mutableListProperty.unsafeCoerce()).toStrictEqual([
      "test1",
      "test2",
    ]);
    expect(instance.identifier.value).toStrictEqual(
      "urn:shaclmate:object:NodeShapeWithMutableProperties:4f980b6f9baa6965f760d0bf2b2ccbee483032e5df01d77bbd9e25f7517a06b9",
    );
    instance.mutableListProperty.unsafeCoerce().push("test3");
    // Hash-based identifier should change when the property does
    expect(instance.identifier.value).toStrictEqual(
      "urn:shaclmate:object:NodeShapeWithMutableProperties:0708b4ca464c40390706888030555d860e4a0d2bc6c487392c1655b082131629",
    );
  });

  it("mutable property", ({ expect }) => {
    const instance = new kitchenSink.NodeShapeWithMutableProperties({
      mutableStringProperty: "test",
    });
    expect(instance.mutableStringProperty.unsafeCoerce()).toStrictEqual("test");
    expect(instance.identifier.value).toStrictEqual(
      "urn:shaclmate:object:NodeShapeWithMutableProperties:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
    );
    instance.mutableStringProperty = Maybe.of("test2");
    // Hash-based identifier should change when the property does
    expect(instance.identifier.value).toStrictEqual(
      "urn:shaclmate:object:NodeShapeWithMutableProperties:60303ae22b998861bce3b28f33eec1be758a213c86c93c076dbe9f558c11c752",
    );
  });

  for (const [id, harness] of Object.entries(harnesses)) {
    it(`SPARQL graph patterns: ${id}`, async ({ expect }) => {
      const toRdfDataset = new N3.Store();
      harness.toRdf({
        resourceSet: new MutableResourceSet({
          dataFactory,
          dataset: toRdfDataset,
        }),
        mutateGraph: dataFactory.defaultGraph(),
      });
      const toRdfQuads: Quad[] = [];

      const oxigraphStore = new oxigraph.Store();
      for (const quad of toRdfDataset) {
        oxigraphStore.add(quad);
        toRdfQuads.push(quad);
      }

      const constructQuery = new sparqlBuilder.ConstructQueryBuilder()
        .addGraphPatterns(
          new harness.sparqlGraphPatternsClass(
            sparqlBuilder.GraphPattern.variable("subject"),
          ),
        )
        .build();

      const sparqlQueryClient = new OxigraphSparqlClient({
        dataFactory: oxigraph,
        store: oxigraphStore,
      });
      // Add to a Dataset to deduplicate the quads
      const constructResultDataset = new N3.Store(
        (await sparqlQueryClient.queryQuads(constructQuery)).concat(),
      );
      const constructResultQuads = [...constructResultDataset];
      if (constructResultQuads.length !== toRdfQuads.length) {
        console.info("not equal");
        const toRdfTurtle = await quadsToTurtle(toRdfQuads);
        const constructResultTurtle = await quadsToTurtle(constructResultQuads);
        const combinedTurtle = `Expected:\n${toRdfTurtle}\n\nvs.\n\nActual:\n${constructResultTurtle}`;
        console.info(combinedTurtle);
      }
      expect(constructResultQuads.length).toStrictEqual(toRdfQuads.length);
      expect(isomorphic(constructResultQuads, toRdfQuads)).toStrictEqual(true);
    });
  }

  it("toJson: or properties", ({ expect }) => {
    const jsonObject = harnesses.nodeShapeWithOrProperties.instance.toJson();
    expect(jsonObject["@id"]).toStrictEqual("http://example.com/instance");
    expect(jsonObject.type).toStrictEqual("NodeShapeWithOrProperties");
    expect(jsonObject.orLiteralsProperty).toStrictEqual({
      "@type": "http://www.w3.org/2001/XMLSchema#integer",
      "@value": "1",
    });
    expect(jsonObject.orTermsProperty).toStrictEqual("test");
  });

  it("toJson: child-parent", ({ expect }) => {
    const jsonObject = harnesses.concreteChildClassNodeShape.instance.toJson();
    expect(jsonObject.abcStringProperty).toStrictEqual("abc");
    expect(jsonObject.childStringProperty).toStrictEqual("child");
    expect(jsonObject.parentStringProperty).toStrictEqual("parent");
    expect(jsonObject.type).toStrictEqual("ConcreteChildClassNodeShape");
  });

  it("toRdf: should populate a dataset", ({ expect }) => {
    const dataset = new N3.Store();
    const resourceSet = new MutableResourceSet({ dataFactory, dataset });
    const resource = harnesses.concreteChildClassNodeShape.instance.toRdf({
      resourceSet,
      mutateGraph: dataFactory.defaultGraph(),
    });
    expect(dataset.size).toStrictEqual(4);
    expect(
      resource.identifier.equals(
        harnesses.concreteChildClassNodeShape.instance.identifier,
      ),
    ).toStrictEqual(true);
    expect(
      resource
        .value(rdf.type)
        .chain((value) => value.toIri())
        .unsafeCoerce()
        .equals(
          dataFactory.namedNode(
            "http://example.com/ConcreteChildClassNodeShape",
          ),
        ),
    ).toStrictEqual(true);
    expect(
      resource
        .value(dataFactory.namedNode("http://example.com/childStringProperty"))
        .chain((value) => value.toString())
        .unsafeCoerce(),
    ).toStrictEqual("child");
  });

  it("toRdf: should produce serializable RDF", ({ expect }) => {
    const dataset = new N3.Store();
    harnesses.nonClassNodeShape.toRdf({
      mutateGraph: dataFactory.defaultGraph(),
      resourceSet: new MutableResourceSet({ dataFactory, dataset }),
    });
    const ttl = new N3.Writer({ format: "text/turtle" }).quadsToString([
      ...dataset,
    ]);
    expect(ttl).not.toHaveLength(0);
  });

  it("toRdf: explicit RDF types", ({ expect }) => {
    const dataset = new N3.Store();
    const resource = harnesses.nodeShapeWithExplicitRdfTypes.toRdf({
      mutateGraph: dataFactory.defaultGraph(),
      resourceSet: new MutableResourceSet({
        dataFactory,
        dataset,
      }),
    });
    expect(dataset.size).toStrictEqual(3); // Two RDF types and the property
    expect(
      resource.isInstanceOf(
        dataFactory.namedNode("http://example.com/FromRdfType"),
      ),
    );
    expect(
      resource.isInstanceOf(
        dataFactory.namedNode("http://example.com/ToRdfType"),
      ),
    );
    expect(
      resource
        .value(dataFactory.namedNode("http://example.com/stringProperty"))
        .chain((value) => value.toString())
        .unsafeCoerce(),
    ).toStrictEqual("test");
  });

  it("toRdf: should not serialize default values", ({ expect }) => {
    const dataset = new N3.Store();
    harnesses.nodeShapeWithDefaultValueProperties.toRdf({
      mutateGraph: dataFactory.defaultGraph(),
      resourceSet: new MutableResourceSet({ dataFactory, dataset }),
    });
    expect(dataset.size).toStrictEqual(0);
  });

  it("toRdf: should serialize non-default values", ({ expect }) => {
    const dataset = new N3.Store();
    const resource =
      harnesses.nodeShapeWithDefaultValuePropertiesOverriddenDifferent.toRdf({
        mutateGraph: dataFactory.defaultGraph(),
        resourceSet: new MutableResourceSet({ dataFactory, dataset }),
      });
    expect(dataset.size).toStrictEqual(4);
    expect(
      resource
        .value(dataFactory.namedNode("http://example.com/falseBooleanProperty"))
        .chain((value) => value.toBoolean())
        .unsafeCoerce(),
    ).toStrictEqual(true);
  });

  it("toString", ({ expect }) => {
    const instance = new kitchenSink.ConcreteChildClassNodeShape({
      abcStringProperty: "abc",
      childStringProperty: "child",
      identifier: dataFactory.namedNode("http://example.com/test"),
      parentStringProperty: "parent",
    });
    expect(instance.toString()).toStrictEqual(
      '{"abcStringProperty":"abc","@id":"http://example.com/test","type":"ConcreteChildClassNodeShape","parentStringProperty":"parent","childStringProperty":"child"}',
    );
  });
});
