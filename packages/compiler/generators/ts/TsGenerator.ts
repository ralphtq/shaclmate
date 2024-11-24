import {
  Project,
  type SourceFile,
  type StatementStructures,
  StructureKind,
} from "ts-morph";
import type * as ast from "../../ast";
import { Configuration as GlobalConfiguration } from "./Configuration.js";
import { ObjectType } from "./ObjectType.js";
import { ObjectUnionType } from "./ObjectUnionType.js";
import { TypeFactory } from "./TypeFactory.js";
import { tsName } from "./tsName.js";

export class TsGenerator {
  protected readonly configuration: TsGenerator.Configuration;

  constructor(
    private ast: ast.Ast,
    configuration?: TsGenerator.Configuration,
  ) {
    this.configuration = configuration ?? new TsGenerator.Configuration();
  }

  generate(): string {
    const astObjectTypes = this.ast.objectTypes.concat().sort((left, right) => {
      if (
        left.ancestorObjectTypes.some((ancestorObjectType) =>
          ancestorObjectType.name.identifier.equals(right.name.identifier),
        )
      ) {
        // Right is an ancestor of left, right must come first
        return 1;
      }
      if (
        right.ancestorObjectTypes.some((ancestorObjectType) =>
          ancestorObjectType.name.identifier.equals(left.name.identifier),
        )
      ) {
        // Left is an ancestor of right, left must come first
        return -1;
      }
      // Neither is an ancestor of the other
      return tsName(left.name).localeCompare(tsName(right.name));
    });

    const project = new Project({
      useInMemoryFileSystem: true,
    });
    const sourceFile = project.createSourceFile("generated.ts");

    const typeFactory = new TypeFactory({ configuration: this.configuration });

    this.addDeclarations({
      objectTypes: astObjectTypes.flatMap((astObjectType) => {
        const type = typeFactory.createTypeFromAstType(astObjectType);
        return type instanceof ObjectType ? [type] : [];
      }),
      objectUnionTypes: this.ast.objectUnionTypes.flatMap(
        (astObjectUnionType) => {
          const type = typeFactory.createTypeFromAstType(astObjectUnionType);
          return type instanceof ObjectUnionType ? [type] : [];
        },
      ),
      sourceFile,
    });

    sourceFile.saveSync();

    return project.getFileSystem().readFileSync(sourceFile.getFilePath());
  }

  private addDeclarations({
    objectTypes,
    objectUnionTypes,
    sourceFile,
  }: {
    objectTypes: readonly ObjectType[];
    objectUnionTypes: readonly ObjectUnionType[];
    sourceFile: SourceFile;
  }): void {
    this.addImportDeclarations({ objectTypes, sourceFile });

    for (const objectType of objectTypes) {
      this.addObjectTypeDeclarations({ objectType, sourceFile });
    }

    for (const objectUnionType of objectUnionTypes) {
      this.addObjectUnionTypeDeclarations({ objectUnionType, sourceFile });
    }
  }

  private addImportDeclarations({
    objectTypes,
    sourceFile,
  }: {
    objectTypes: readonly ObjectType[];
    sourceFile: SourceFile;
  }) {
    sourceFile.addImportDeclaration({
      moduleSpecifier: "purify-ts",
      namespaceImport: "purify",
    });

    sourceFile.addImportDeclaration({
      isTypeOnly: true,
      moduleSpecifier: "@rdfjs/types",
      namespaceImport: "rdfjs",
    });

    sourceFile.addStatements(this.configuration.dataFactoryImport);

    if (this.configuration.features.has("equals")) {
      sourceFile.addImportDeclaration({
        moduleSpecifier: "purify-ts-helpers",
        namespaceImport: "purifyHelpers",
      });
    }

    if (
      this.configuration.features.has("fromRdf") ||
      this.configuration.features.has("toRdf")
    ) {
      sourceFile.addImportDeclaration({
        moduleSpecifier: "rdfjs-resource",
        namespaceImport: "rdfjsResource",
      });
    }

    if (this.configuration.features.has("sparql-graph-patterns")) {
      sourceFile.addImportDeclaration({
        moduleSpecifier: "@kos-kit/sparql-builder",
        namespaceImport: "sparqlBuilder",
      });
    }

    const typeImportStatements = new Set<string>();
    for (const objectType of objectTypes) {
      for (const importStatement of objectType.importStatements) {
        typeImportStatements.add(importStatement);
      }
    }
    sourceFile.addStatements([...typeImportStatements]);
  }

  private addObjectTypeDeclarations({
    objectType,
    sourceFile,
  }: { objectType: ObjectType; sourceFile: SourceFile }): void {
    switch (this.configuration.objectTypeDeclarationType) {
      case "class":
        sourceFile.addClass(objectType.classDeclaration());
        break;
      case "interface":
        sourceFile.addInterface(objectType.interfaceDeclaration());
        break;
    }

    const moduleStatements: StatementStructures[] = [];

    if (
      this.configuration.features.has("equals") &&
      this.configuration.objectTypeDeclarationType === "interface"
    ) {
      moduleStatements.push(objectType.equalsFunctionDeclaration());
    }

    if (this.configuration.features.has("fromRdf")) {
      moduleStatements.push(objectType.fromRdfFunctionDeclaration());
    }

    if (this.configuration.features.has("hash")) {
      moduleStatements.push(objectType.hashFunctionDeclaration());
    }

    if (this.configuration.features.has("sparql-graph-patterns")) {
      if (objectType.parentObjectTypes.length > 1) {
        throw new RangeError(
          `object type '${objectType.name}' has multiple super object types, can't use with SPARQL graph patterns`,
        );
      }

      moduleStatements.push(objectType.sparqlGraphPatternsClassDeclaration());
    }

    if (
      this.configuration.features.has("toRdf") &&
      this.configuration.objectTypeDeclarationType === "interface"
    ) {
      moduleStatements.push(objectType.toRdfFunctionDeclaration());
    }

    sourceFile.addModule({
      isExported: objectType.export_,
      kind: StructureKind.Module,
      name: objectType.name,
      statements: moduleStatements,
    });
  }

  private addObjectUnionTypeDeclarations({
    objectUnionType,
    sourceFile,
  }: { objectUnionType: ObjectUnionType; sourceFile: SourceFile }): void {
    sourceFile.addTypeAlias(objectUnionType.typeAliasDeclaration);

    const moduleStatements: StatementStructures[] = [];

    if (this.configuration.features.has("equals")) {
      moduleStatements.push(objectUnionType.equalsFunctionDeclaration);
    }

    if (this.configuration.features.has("fromRdf")) {
      moduleStatements.push(objectUnionType.fromRdfFunctionDeclaration);
    }

    if (this.configuration.features.has("toRdf")) {
      moduleStatements.push(objectUnionType.toRdfFunctionDeclaration);
    }

    sourceFile.addModule({
      isExported: objectUnionType.export,
      kind: StructureKind.Module,
      name: objectUnionType.name,
      statements: moduleStatements,
    });
  }
}

export namespace TsGenerator {
  export const Configuration = GlobalConfiguration;
  export type Configuration = GlobalConfiguration;
}
