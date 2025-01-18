import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { DataFactory as dataFactory } from "n3";
import { NonEmptyList } from "purify-ts";
import { type FC, useState } from "react";
import { zodToJsonSchema } from "zod-to-json-schema";
import * as generated from "./generated.js";

const classes = {
  container: {
    padding: "1em",
    width: "100%",
  },
  title: {
    textAlign: "center",
    padding: "0.25em",
  },
  dataContent: {
    display: "flex",
    justifyContent: "center",
    borderRadius: "0.25em",
    backgroundColor: "#cecece",
    marginBottom: "1rem",
  },
  resetButton: {
    margin: "auto !important",
    display: "block !important",
  },
  demoform: {
    margin: "auto",
    padding: "1rem",
  },
};

const initialData = generated.FormNodeShape.toJson(
  generated.FormNodeShape.create({
    identifier: dataFactory.namedNode("http://example.com/form"),
    nestedObjectProperty: generated.NestedNodeShape.create({
      identifier: dataFactory.namedNode("http://example.com/nested"),
      requiredStringProperty: "required/nested",
    }),
    nonEmptyStringSetProperty: NonEmptyList.fromArray(["test"]).unsafeCoerce(),
    requiredStringProperty: "required/form",
  }),
);

const jsonSchema = zodToJsonSchema(
  generated.FormNodeShape.jsonZodSchema(),
) as any;
const jsonUiSchema = generated.FormNodeShape.jsonUiSchema();

const renderers = materialRenderers;

const App: FC = () => {
  const [data, setData] = useState<object>(initialData);

  return (
    <Grid
      container
      justifyContent={"center"}
      spacing={4}
      style={classes.container}
    >
      <Grid item sm={6}>
        <Typography variant={"h4"}>Data (JSON)</Typography>
        <div style={classes.dataContent}>
          <pre id="data">{JSON.stringify(data, null, 2)}</pre>
        </div>
        <Typography variant={"h4"}>JSON schema</Typography>
        <div style={classes.dataContent}>
          <pre id="jsonSchema">{JSON.stringify(jsonSchema, null, 2)}</pre>
        </div>
        <Typography variant={"h4"}>JSON Forms schema</Typography>
        <div style={classes.dataContent}>
          <pre id="jsonUiSchema">{JSON.stringify(jsonUiSchema, null, 2)}</pre>
        </div>
      </Grid>
      <Grid item sm={6}>
        <Typography variant={"h4"}>Rendered form</Typography>
        <div style={classes.demoform}>
          <JsonForms
            schema={jsonSchema}
            uischema={jsonUiSchema}
            data={data}
            renderers={renderers}
            cells={materialCells}
            onChange={({ data }) => setData(data)}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default App;
