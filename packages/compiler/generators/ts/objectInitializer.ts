export function objectInitializer(
  properties: Record<string, string | undefined>,
): string {
  return `{ ${Object.entries(properties)
    .flatMap(([propertyName, propertyValue]) => {
      if (typeof propertyValue === "undefined") {
        return [];
      }
      if (propertyName === propertyValue) {
        return [propertyName];
      }
      return [`${propertyName}: ${propertyValue}`];
    })
    .join(", ")} }`;
}
