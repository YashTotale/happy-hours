// React Imports
import React, { FC } from "react";
import {
  DeepMap,
  FieldError,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { Inputs } from "./index";

// Material UI Imports
import {
  capitalize,
  InputProps,
  makeStyles,
  TextField,
  TextFieldProps,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  input: {
    margin: theme.spacing(1, 0),
  },
}));

interface InputFieldProps {
  name: keyof Inputs;
  register: UseFormRegister<Inputs>;
  errors: DeepMap<Inputs, FieldError>;
  props?: TextFieldProps;
  inputProps?: InputProps;
  rules?: Partial<RegisterOptions>;
  textarea?: boolean;
  notRequired?: boolean;
}

const InputField: FC<InputFieldProps> = ({
  name,
  errors,
  register,
  props,
  rules,
  inputProps,
  textarea,
  notRequired,
}) => {
  const classes = useStyles();

  return (
    <TextField
      error={Boolean(errors[name])}
      helperText={(errors[name] as FieldError | undefined)?.message}
      className={classes.input}
      variant="outlined"
      label={`${capitalize(name)}${notRequired ? "" : "*"}`}
      fullWidth
      name={name}
      {...(textarea
        ? {
            multiline: true,
            rows: 2,
            rowsMax: 20,
          }
        : null)}
      InputProps={{
        ...inputProps,
        ...register(name, {
          required: notRequired ? false : "This field is required",
          ...rules,
        }),
      }}
      {...props}
    />
  );
};

export default InputField;
