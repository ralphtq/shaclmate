import { Maybe } from "purify-ts";
import { type FunctionDeclarationStructure, StructureKind } from "ts-morph";
import type { ObjectType } from "../ObjectType.js";
import { toJsonReturnType } from "./toJsonReturnType.js";

// const variables = {
//   context: "_context",
//   ignoreRdfType: "_ignoreRdfType",
//   languageIn: "_languageIn",
//   resource: "_resource",
// };

export function fromJsonFunctionDeclaration(
  this: ObjectType,
): Maybe<FunctionDeclarationStructure> {
  if (!this.features.has("fromJson")) {
    return Maybe.empty();
  }

  if (this.extern) {
    return Maybe.empty();
  }

  const propertiesByName: Record<
    string,
    {
      initializer?: string;
      type: string;
    }
  > = {};
  const statements: string[] = [];

  // for (const ancestorObjectType of this.ancestorObjectTypes) {
  //   for (const property of ancestorObjectType.properties) {
  //     if (property.fromJsonStatements({ variables }).length > 0) {
  //       propertiesByName[property.name] = {
  //         initializer: `_super.${property.name}`,
  //         type: property.type.name,
  //       };
  //     }
  //   }
  // }
  //
  // const propertyFromRdfVariables = {
  //   context: variables.context,
  //   languageIn: variables.languageIn,
  //   resource: variables.resource,
  // };
  // for (const property of this.properties) {
  //   const propertyFromRdfStatements = property.fromRdfStatements({
  //     variables: propertyFromRdfVariables,
  //   });
  //   if (propertyFromRdfStatements.length > 0) {
  //     propertiesByName[property.name] = {
  //       type: property.type.name,
  //     };
  //     statements.push(...propertyFromRdfStatements);
  //   }
  // }
  //
  // let construction = `{ ${Object.entries(propertiesByName)
  //   .map(([name, { initializer }]) =>
  //     initializer ? `${name}: ${initializer}` : name,
  //   )
  //   .join(", ")} }`;
  // if (this.declarationType === "class" && !this.abstract) {
  //   construction = `new ${this.name}(${construction})`;
  // }
  //
  // statements.push(`return purify.Either.of(${construction})`);
  //
  // if (this.parentObjectTypes.length > 0) {
  //   statements = [
  //     `return ${this.parentObjectTypes[0].name}.${this.parentObjectTypes[0].fromRdfFunctionName}({ ...${variables.context}, ignoreRdfType: true, languageIn: ${variables.languageIn}, resource: ${variables.resource} }).chain(_super => { ${statements.join("\n")} })`,
  //   ];
  // }
  //
  return Maybe.of({
    isExported: true,
    kind: StructureKind.Function,
    name: this.fromRdfFunctionName,
    parameters: [
      {
        name: "_json",
        type: toJsonReturnType.bind(this)(),
      },
    ],
    returnType: `purify.Either<rdfjsResource.Resource.ValueError, ${
      this.abstract
        ? `{ ${Object.entries(propertiesByName)
            .map(([name, { type }]) => `${name}: ${type}`)
            .join(", ")} }`
        : this.name
    }>`,
    statements,
  });
}
