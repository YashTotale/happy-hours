// React Imports
import React, { FC } from "react";
import { Controller, Control, ControllerRenderProps } from "react-hook-form";
import { HappyHourInputs } from "../../Utils/types";

// Material UI Imports
import { DateTimePicker, DateTimePickerProps } from "@material-ui/pickers";
import { capitalize, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(1, 0),
    width: "100%",
  },
  picker: {
    margin: theme.spacing(0, 2),
  },
}));

interface DatePickersProps {
  control: Control<HappyHourInputs>;
}

const DatePickers: FC<DatePickersProps> = ({ control }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Controller
        name="start"
        control={control}
        render={({ field }) => <Picker name="start" field={field} />}
      />
      <Typography variant="h4">-</Typography>
      <Controller
        name="end"
        control={control}
        render={({ field }) => <Picker name="end" field={field} />}
      />
    </div>
  );
};

type Name = "start" | "end";

interface PickerProps {
  name: Name;
  field: ControllerRenderProps<HappyHourInputs, Name>;
  props?: Partial<DateTimePickerProps>;
}

const Picker: FC<PickerProps> = ({ name, field, props }) => {
  const classes = useStyles();

  return (
    <DateTimePicker
      label={capitalize(name)}
      inputVariant="outlined"
      disablePast
      value={field.value}
      onChange={(d) => field.onChange(d?.toDate())}
      showTodayButton
      className={classes.picker}
      {...props}
    />
  );
};

export default DatePickers;
