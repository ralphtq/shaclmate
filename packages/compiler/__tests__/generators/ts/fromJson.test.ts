import { describe, it } from "vitest";
import "./harnesses.js"; // Must be imported before kitchenSink
import { harnesses } from "./harnesses.js";

describe("fromJson", () => {
  for (const [id, harness] of Object.entries(harnesses)) {
    it(`${id} round trip`, ({ expect }) => {
      const fromJsonInstance: any = harness.fromJson(harness.toJson());
      expect(harness.equals(fromJsonInstance).extract()).toStrictEqual(true);
    });
  }
});
