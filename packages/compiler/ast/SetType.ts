import type { Maybe } from "purify-ts";
import type { Type } from "./Type.js";

/**
 * An unordered set of items of a specific type.
 *
 * This is a property with sh:maxCount != 1.
 */
export interface SetType {
  /**
   * Set item type.
   */
  readonly itemType: Type;

  readonly kind: "SetType";

  /**
   * Minimum number of items in the set.
   */
  readonly minCount: number;

  /**
   * The set should be mutable in generated code.
   */
  readonly mutable: Maybe<boolean>;
}
