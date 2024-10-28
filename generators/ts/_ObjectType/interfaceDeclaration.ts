import {
  type InterfaceDeclarationStructure,
  type OptionalKind,
  type PropertySignatureStructure,
  StructureKind,
} from "ts-morph";
import type { ObjectType } from "../ObjectType";

export function interfaceDeclaration(
  this: ObjectType,
): InterfaceDeclarationStructure {
  const properties: OptionalKind<PropertySignatureStructure>[] =
    this.properties.map((property) => property.interfacePropertySignature);
  this.typeDiscriminatorProperty.ifJust((typeDiscriminatorProperty) => {
    properties.push({
      isReadonly: true,
      name: typeDiscriminatorProperty.name,
      type: typeDiscriminatorProperty.type.name,
    });
  });

  return {
    extends: this.parentObjectTypes.map(
      (parentObjectType) => parentObjectType.interfaceQualifiedName,
    ),
    isExported: true,
    kind: StructureKind.Interface,
    name: this.interfaceUnqualifiedName,
    properties,
  };
}
