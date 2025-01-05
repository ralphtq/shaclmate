import { describe, it } from "vitest";
import { harnesses } from "./harnesses.js";

describe("toJson", () => {
  it("or properties", ({ expect }) => {
    const jsonObject = harnesses.nodeShapeWithOrProperties.instance.toJson();
    expect(jsonObject["@id"]).toStrictEqual("http://example.com/instance");
    expect(jsonObject.type).toStrictEqual("NodeShapeWithOrProperties");
    expect(jsonObject.orLiteralsProperty).toStrictEqual({
      "@type": "http://www.w3.org/2001/XMLSchema#integer",
      "@value": "1",
    });
    expect(jsonObject.orTermsProperty).toStrictEqual({
      "@value": "test",
    });
  });

  it("child-parent", ({ expect }) => {
    const jsonObject = harnesses.concreteChildClassNodeShape.instance.toJson();
    expect(jsonObject.abcStringProperty).toStrictEqual("abc");
    expect(jsonObject.childStringProperty).toStrictEqual("child");
    expect(jsonObject.parentStringProperty).toStrictEqual("parent");
    expect(jsonObject.type).toStrictEqual("ConcreteChildClassNodeShape");
  });
});
