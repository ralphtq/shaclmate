import type { Type } from "./Type.js";

/**
 * A conjunction ("and") of types, corresponding to an sh:and.
 */
export interface IntersectionType<MemberTypeT extends Type = Type> {
  readonly kind: "IntersectionType";
  readonly memberTypes: readonly MemberTypeT[];
}
