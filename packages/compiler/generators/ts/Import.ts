import { type ImportDeclarationStructure, StructureKind } from "ts-morph";

export type Import = ImportDeclarationStructure | string;

/**
 * Singleton values for common imports.
 */
export namespace Import {
  export const PURIFY: Import = {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: "purify-ts",
    namespaceImport: "purify",
  };

  export const PURIFY_HELPERS: Import = {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: "purify-ts-helpers",
    namespaceImport: "purifyHelpers",
  };

  export const RDF_LITERAL: Import = {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: "rdf-literal",
    namespaceImport: "rdfLiteral",
  };

  export const RDFJS_RESOURCE: Import = {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: "rdfjs-resource",
    namespaceImport: "rdfjsResource",
  };

  export const RDFJS_TYPES: Import = {
    isTypeOnly: true,
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: "@rdfjs/types",
    namespaceImport: "rdfjs",
  };

  export const SHA256: Import = {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: "js-sha256",
    namedImports: ["sha256"],
  };

  export const SPARQLJS: Import = {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: "sparqljs",
    namespaceImport: "sparqljs",
  };

  export const SPARQL_BUILDER: Import = {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: "@kos-kit/sparql-builder",
    namespaceImport: "sparqlBuilder",
  };

  export const UUID: Import = {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: "uuid",
    namespaceImport: "uuid",
  };

  export const ZOD: Import = {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: "zod",
    namedImports: [{ alias: "zod", name: "z" }],
  };

  export const ZOD_TO_JSON_SCHEMA: Import = {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: "zod-to-json-schema",
    namedImports: [{ name: "zodToJsonSchema" }],
  };
}
