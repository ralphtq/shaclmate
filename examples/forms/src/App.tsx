import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { DataFactory as dataFactory } from "n3";
import { NonEmptyList } from "purify-ts";
import { type FC, useMemo, useState } from "react";
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

const initialData = generated.NodeShapeWithPropertyCardinalities.toJson(
  generated.NodeShapeWithPropertyCardinalities.create({
    identifier: dataFactory.namedNode("http://example.com/test"),
    nonEmptyStringSetProperty: NonEmptyList.fromArray(["test"]).unsafeCoerce(),
    requiredStringProperty: "test",
  }),
);

const renderers = materialRenderers;

const App: FC = () => {
  const [data, setData] = useState<object>(initialData);
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const clearData = () => {
    setData({});
  };
  return (
    <Grid
      container
      justifyContent={"center"}
      spacing={1}
      style={classes.container}
    >
      <Grid item sm={6}>
        <Typography variant={"h4"}>Bound data</Typography>
        <div style={classes.dataContent}>
          <pre id="boundData">{stringifiedData}</pre>
        </div>
        <Button
          style={classes.resetButton}
          onClick={clearData}
          color="primary"
          variant="contained"
          data-testid="clear-data"
        >
          Clear data
        </Button>
      </Grid>
      <Grid item sm={6}>
        <Typography variant={"h4"}>Rendered form</Typography>
        <div style={classes.demoform}>
          <JsonForms
            schema={
              zodToJsonSchema(
                generated.NodeShapeWithPropertyCardinalities.jsonZodSchema(),
              ) as any
            }
            // uischema={uischema}
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
