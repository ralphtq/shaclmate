import TermMap from "@rdfjs/term-map";
import TermSet from "@rdfjs/term-set";
import type { BlankNode, NamedNode } from "@rdfjs/types";
import { NodeKind } from "@shaclmate/shacl-ast";
import { rdf, xsd } from "@tpluscode/rdf-ns-builders";
import { Maybe } from "purify-ts";
import { fromRdf } from "rdf-literal";
import { PropertyVisibility } from "../../PropertyVisibility.js";
import type * as ast from "../../ast/index.js";
import { logger } from "../../logger.js";
import { BooleanType } from "./BooleanType.js";
import type { Configuration } from "./Configuration.js";
import { DateTimeType } from "./DateTimeType.js";
import { IdentifierType } from "./IdentifierType.js";
import { ListType } from "./ListType.js";
import { LiteralType } from "./LiteralType.js";
import { NativeType } from "./NativeType.js";
import { NumberType } from "./NumberType.js";
import { ObjectType } from "./ObjectType.js";
import { ObjectUnionType } from "./ObjectUnionType.js";
import { OptionType } from "./OptionType.js";
import { SetType } from "./SetType.js";
import { StringType } from "./StringType.js";
import type { Type } from "./Type.js";
import { UnionType } from "./UnionType.js";
import { tsName } from "./tsName.js";

export class TypeFactory {
  private cachedObjectTypePropertiesByIdentifier: TermMap<
    BlankNode | NamedNode,
    ObjectType.Property
  > = new TermMap();
  private cachedObjectTypesByIdentifier: TermMap<
    BlankNode | NamedNode,
    ObjectType
  > = new TermMap();
  private readonly configuration: Configuration;

  constructor({ configuration }: { configuration: Configuration }) {
    this.configuration = configuration;
  }

  createTypeFromAstType(astType: ast.Type): Type {
    switch (astType.kind) {
      case "IdentifierType":
        return new IdentifierType({
          configuration: this.configuration,
          defaultValue: astType.defaultValue,
          hasValue: astType.hasValue,
          in_: astType.in_,
          nodeKinds: astType.nodeKinds,
        });
      case "IntersectionType":
        throw new Error("not implemented");
      case "LiteralType": {
        // Look at sh:datatype as well as sh:defaultValue/sh:hasValue/sh:in term datatypes
        // If there's one common datatype than we can refine the type
        // Otherwise default to rdfjs.Literal
        const datatypes = new TermSet<NamedNode>();
        astType.datatype.ifJust((datatype) => datatypes.add(datatype));
        astType.defaultValue.ifJust((defaultValue) =>
          datatypes.add(defaultValue.datatype),
        );
        astType.hasValue.ifJust((hasValue) => datatypes.add(hasValue.datatype));
        astType.in_.ifJust((in_) => {
          for (const value of in_) {
            datatypes.add(value.datatype);
          }
        });

        if (datatypes.size === 1) {
          const datatype = [...datatypes][0];

          if (datatype.equals(xsd.boolean)) {
            return new BooleanType({
              configuration: this.configuration,
              defaultValue: astType.defaultValue,
              hasValue: astType.hasValue,
              in_: astType.in_,
              primitiveDefaultValue: astType.defaultValue
                .map((value) => fromRdf(value, true))
                .filter((value) => typeof value === "boolean"),
              primitiveIn: astType.in_.map((values) =>
                values
                  .map((value) => fromRdf(value, true))
                  .filter((value) => typeof value === "boolean"),
              ),
            });
          }

          if (datatype.equals(xsd.dateTime)) {
            return new DateTimeType({
              configuration: this.configuration,
              defaultValue: astType.defaultValue,
              hasValue: astType.hasValue,
              in_: astType.in_,
              primitiveDefaultValue: astType.defaultValue
                .map((value) => fromRdf(value, true))
                .filter(
                  (value) => typeof value === "object" && value instanceof Date,
                ),
              primitiveIn: astType.in_.map((values) =>
                values
                  .map((value) => fromRdf(value, true))
                  .filter(
                    (value) =>
                      typeof value === "object" && value instanceof Date,
                  ),
              ),
            });
          }

          for (const numberDatatype of [
            // Integers
            xsd.byte,
            xsd.int,
            xsd.integer,
            xsd.long,
            xsd.negativeInteger,
            xsd.nonNegativeInteger,
            xsd.nonPositiveInteger,
            xsd.positiveInteger,
            xsd.short,
            xsd.unsignedByte,
            xsd.unsignedInt,
            xsd.unsignedLong,
            xsd.unsignedShort,
            // Floating point
            xsd.decimal,
            xsd.double,
            xsd.float,
          ]) {
            if (datatype.equals(numberDatatype)) {
              return new NumberType({
                configuration: this.configuration,
                defaultValue: astType.defaultValue,
                hasValue: astType.hasValue,
                in_: astType.in_,
                primitiveDefaultValue: astType.defaultValue
                  .map((value) => fromRdf(value, true))
                  .filter((value) => typeof value === "number"),
                primitiveIn: astType.in_.map((values) =>
                  values
                    .map((value) => fromRdf(value, true))
                    .filter((value) => typeof value === "number"),
                ),
              });
            }
          }

          if (datatype.equals(xsd.anyURI) || datatype.equals(xsd.string)) {
            return new StringType({
              configuration: this.configuration,
              defaultValue: astType.defaultValue,
              hasValue: astType.hasValue,
              in_: astType.in_,
              primitiveDefaultValue: astType.defaultValue.map(
                (value) => value.value,
              ),
              primitiveIn: astType.in_.map((values) =>
                values.map((value) => value.value),
              ),
            });
          }

          if (datatype.equals(rdf.langString)) {
            // Drop down
          } else {
            logger.warn("unrecognized literal datatype: %s", datatype.value);
          }
        } else if (datatypes.size > 0) {
          logger.warn(
            "literal type has multiple datatypes: %s",
            JSON.stringify([...datatypes].map((datatype) => datatype.value)),
          );
        } else {
          logger.debug("literal type has no datatypes");
        }

        return new LiteralType({
          configuration: this.configuration,
          defaultValue: astType.defaultValue,
          in_: astType.in_,
          hasValue: astType.hasValue,
        });
      }
      case "NativeType": {
        return new NativeType({
          configuration: this.configuration,
          equalsFunction: astType.tsEqualsFunction,
          fromRdfFunction: astType.tsFromRdfFunction,
          hashFunction: astType.tsHashFunction,
          import_: astType.tsImport,
          name: astType.tsName,
          toRdfFunction: astType.tsToRdfFunction,
        });
      }
      case "ObjectIntersectionType":
        throw new Error("not implemented");
      case "ObjectType": {
        if (astType.listItemType.isJust()) {
          return new ListType({
            configuration: this.configuration,
            identifierNodeKind: astType.nodeKinds.has(NodeKind.BLANK_NODE)
              ? NodeKind.BLANK_NODE
              : NodeKind.IRI,
            itemType: this.createTypeFromAstType(
              astType.listItemType.unsafeCoerce(),
            ),
            iriMintingStrategy: astType.iriMintingStrategy,
            rdfType: astType.rdfType,
          });
        }

        return this.createObjectTypeFromAstType(astType);
      }
      case "ObjectUnionType": {
        return new ObjectUnionType({
          configuration: this.configuration,
          export_: astType.export,
          name: tsName((astType as ast.ObjectUnionType).name),
          memberTypes: astType.memberTypes
            .map((astType) => this.createTypeFromAstType(astType))
            .filter((memberType) => memberType instanceof ObjectType),
        });
      }
      case "OptionType":
        return new OptionType({
          configuration: this.configuration,
          itemType: this.createTypeFromAstType(astType.itemType),
        });
      case "SetType":
        return new SetType({
          configuration: this.configuration,
          itemType: this.createTypeFromAstType(astType.itemType),
          minCount: astType.minCount,
        });
      case "UnionType": {
        return new UnionType({
          configuration: this.configuration,
          memberTypes: astType.memberTypes.map((astType) =>
            this.createTypeFromAstType(astType),
          ),
        });
      }
    }
  }

  private createObjectTypeFromAstType(astType: ast.ObjectType): ObjectType {
    {
      const cachedObjectType = this.cachedObjectTypesByIdentifier.get(
        astType.name.identifier,
      );
      if (cachedObjectType) {
        return cachedObjectType;
      }
    }

    const identifierType = new IdentifierType({
      configuration: this.configuration,
      defaultValue: Maybe.empty(),
      hasValue: Maybe.empty(),
      in_: Maybe.empty(),
      nodeKinds: astType.nodeKinds,
    });

    const objectType = new ObjectType({
      abstract: astType.abstract,
      configuration: this.configuration,
      export_: astType.export,
      lazyAncestorObjectTypes: () =>
        astType.ancestorObjectTypes.map((astType) =>
          this.createObjectTypeFromAstType(astType),
        ),
      lazyDescendantObjectTypes: () =>
        astType.descendantObjectTypes.map((astType) =>
          this.createObjectTypeFromAstType(astType),
        ),
      lazyParentObjectTypes: () =>
        astType.parentObjectTypes.map((astType) =>
          this.createObjectTypeFromAstType(astType),
        ),
      lazyProperties: () => {
        const properties: ObjectType.Property[] = astType.properties.map(
          (astProperty) =>
            this.createObjectTypePropertyFromAstProperty(astProperty),
        );

        let identifierPropertyClassDeclarationVisibility: Maybe<PropertyVisibility>;
        if (astType.abstract) {
          // If the type is abstract, don't declare a property.
          identifierPropertyClassDeclarationVisibility = Maybe.empty();
        } else if (
          astType.ancestorObjectTypes.some(
            (ancestorObjectType) => !ancestorObjectType.abstract,
          )
        ) {
          // If the type has a non-abstract ancestor, that ancestor will declare the identifier property
          identifierPropertyClassDeclarationVisibility = Maybe.empty();
        } else if (
          astType.descendantObjectTypes.some(
            (descendantObjectType) => !descendantObjectType.abstract,
          )
        ) {
          // If the type has a non-abstract descendant, declare the identifier property for it
          identifierPropertyClassDeclarationVisibility = Maybe.of(
            PropertyVisibility.PROTECTED,
          );
        } else {
          identifierPropertyClassDeclarationVisibility = Maybe.of(
            PropertyVisibility.PRIVATE,
          );
        }

        const identifierProperty: ObjectType.IdentifierProperty =
          new ObjectType.IdentifierProperty({
            abstract: astType.abstract,
            classDeclarationVisibility:
              identifierPropertyClassDeclarationVisibility,
            configuration: this.configuration,
            iriMintingStrategy: astType.iriMintingStrategy,
            name: this.configuration.objectTypeIdentifierPropertyName,
            override: astType.parentObjectTypes.length > 0,
            type: identifierType,
            visibility: PropertyVisibility.PUBLIC,
          });
        properties.push(identifierProperty);

        // Type discriminator property
        const typeDiscriminatorValues = new Set<string>();
        if (!astType.abstract) {
          typeDiscriminatorValues.add(objectType.discriminatorValue);
        }
        for (const descendantObjectType of objectType.descendantObjectTypes) {
          if (!descendantObjectType.abstract) {
            typeDiscriminatorValues.add(
              descendantObjectType.discriminatorValue,
            );
          }
        }
        if (typeDiscriminatorValues.size > 0) {
          properties.push(
            new ObjectType.TypeDiscriminatorProperty({
              abstract: astType.abstract,
              configuration: this.configuration,
              name: this.configuration.objectTypeDiscriminatorPropertyName,
              override: objectType.parentObjectTypes.length > 0,
              type: {
                name: [...typeDiscriminatorValues]
                  .sort()
                  .map((name) => `"${name}"`)
                  .join("|"),
              },
              visibility: PropertyVisibility.PUBLIC,
              value: objectType.discriminatorValue,
            }),
          );
        }

        return properties.sort((left, right) =>
          left.name.localeCompare(right.name),
        );
      },
      iriMintingStrategy: astType.iriMintingStrategy,
      name: tsName(astType.name),
      rdfType: astType.rdfType,
    });
    this.cachedObjectTypesByIdentifier.set(astType.name.identifier, objectType);
    return objectType;
  }

  private createObjectTypePropertyFromAstProperty(
    astObjectTypeProperty: ast.ObjectType.Property,
  ): ObjectType.Property {
    {
      const cachedProperty = this.cachedObjectTypePropertiesByIdentifier.get(
        astObjectTypeProperty.name.identifier,
      );
      if (cachedProperty) {
        return cachedProperty;
      }
    }

    let type: Type;
    if (
      astObjectTypeProperty.type.kind === "ObjectType" &&
      !astObjectTypeProperty.inline
    ) {
      // Non-inlined object type = its identifier
      type = new IdentifierType({
        configuration: this.configuration,
        defaultValue: Maybe.empty(),
        hasValue: Maybe.empty(),
        in_: Maybe.empty(),
        nodeKinds: astObjectTypeProperty.type.nodeKinds,
      });
    } else {
      type = this.createTypeFromAstType(astObjectTypeProperty.type);
    }

    const property = new ObjectType.ShaclProperty({
      configuration: this.configuration,
      name: tsName(astObjectTypeProperty.name),
      path: astObjectTypeProperty.path.iri,
      type,
      visibility: astObjectTypeProperty.visibility,
    });
    this.cachedObjectTypePropertiesByIdentifier.set(
      astObjectTypeProperty.name.identifier,
      property,
    );
    return property;
  }
}
