import type { ObjectType } from "../ObjectType.js";

export function toJsonReturnType(this: ObjectType): string {
  const typeMembers: string[] = [];

  if (this.ownProperties.length > 0) {
    typeMembers.push(
      `{ ${this.ownProperties
        .flatMap((property) => property.jsonPropertySignature.toList())
        .map(
          (propertySignature) =>
            `readonly "${propertySignature.name}": ${propertySignature.type}`,
        )
        .join("; ")} }`,
    );
  }

  for (const parentObjectType of this.parentObjectTypes) {
    typeMembers.push(parentObjectType.jsonName);
  }

  if (typeMembers.length === 0) {
    return "object";
  }

  return typeMembers.join(" & ");
}
