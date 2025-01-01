import { DataFactory as dataFactory } from "n3";
import { describe, it } from "vitest";
import "./harnesses.js"; // Must be imported before kitchenSink
import * as kitchenSink from "../../../../../examples/kitchen-sink/generated.js";

describe("toString", () => {
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
