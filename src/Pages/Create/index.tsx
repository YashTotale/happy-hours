// React Imports
import React, { FC } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import ChipInput from "material-ui-chip-input";
import { useClosableSnackbar } from "../../Hooks";
import { HappyHour } from "../../Utils/types";
import InputField from "./InputField";
import DatePickers from "./DatePickers";

// Firebase Imports
import { useFirestore } from "react-redux-firebase";

// Material UI Imports
import { Button, makeStyles, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(2),
    padding: theme.spacing(0, 2),
  },
  submit: {
    marginTop: theme.spacing(2),
  },
}));

const Create: FC = () => {
  const classes = useStyles();
  const firestore = useFirestore();
  const { enqueueSnackbar } = useClosableSnackbar();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<HappyHour>({
    defaultValues: {
      start: new Date(),
      end: new Date(),
      tags: [],
    },
  });

  const onSubmit: SubmitHandler<HappyHour> = (data) => {
    firestore
      .collection("happyHours")
      .add(data)
      .then(() => {
        enqueueSnackbar("Successfully created Happy Hour!", {
          variant: "success",
        });
      })
      .catch((e) => {
        enqueueSnackbar("An error occurred. Please try again", {
          variant: "error",
        });
      });
  };

  return (
    <Paper elevation={10} className={classes.container}>
      <Typography variant="h4" align="center">
        Create a Happy Hour
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <InputField errors={errors} name="name" register={register} />
        <InputField
          errors={errors}
          name="description"
          register={register}
          textarea
        />
        <DatePickers control={control} />
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <ChipInput
              value={field.value}
              onAdd={(c) => {
                field.onChange(field.value.concat(c));
              }}
              onDelete={(c, i) => {
                const newVal = [...field.value];
                newVal.splice(i, 1);
                field.onChange(newVal);
              }}
              label="Tags"
              variant="outlined"
              fullWidth
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Create!
        </Button>
      </form>
    </Paper>
  );
};

export default Create;
