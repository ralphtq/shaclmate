export function objectInitializer(
  properties: Record<string, boolean | number | string | undefined>,
): string {
  return `{ ${Object.entries(properties)
    .flatMap(([propertyName, propertyValue]) => {
      if (typeof propertyValue === "undefined") {
        return [];
      }
      if (typeof propertyValue === "string" && propertyName === propertyValue) {
        return [propertyName];
      }
      return [`${propertyName}: ${propertyValue}`];
    })
    .join(", ")} }`;
}
