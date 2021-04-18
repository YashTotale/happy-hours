// React Imports
import React, { FC } from "react";
import { useHistory } from "react-router";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import ChipInput from "material-ui-chip-input";
import { useClosableSnackbar } from "../../../Hooks";
import { HappyHourInputs } from "../../../Utils/types";
import InputField from "./InputField";
import DatePickers from "./DatePickers";

// Redux Imports
import { useSelector } from "react-redux";
import { getUser, setSort } from "../../../Redux";
import { useAppDispatch } from "../../../Store";

// Firebase Imports
import { useFirestore } from "react-redux-firebase";

// Material UI Imports
import { Button, Divider, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
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
  divider: {
    height: 2,
    margin: theme.spacing(3, 0),
  },
  submit: {
    marginTop: theme.spacing(2),
  },
}));

const Create: FC = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const firestore = useFirestore();
  const history = useHistory();
  const { enqueueSnackbar } = useClosableSnackbar();
  const user = useSelector(getUser);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<HappyHourInputs>({
    defaultValues: {
      start: new Date(),
      end: new Date(),
      tags: [],
    },
  });

  const onSubmit: SubmitHandler<HappyHourInputs> = (data) => {
    firestore
      .collection("happyHours")
      .add({
        ...data,
        attendees: [user.uid],
        created: new Date(),
        createdBy: user.uid,
      })
      .then(() => {
        dispatch(setSort("Most Recently Created"));
        enqueueSnackbar("Successfully created Happy Hour!", {
          variant: "success",
        });
        history.push("/");
      })
      .catch((e) => {
        enqueueSnackbar("An error occurred. Please try again", {
          variant: "error",
        });
      });
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4" align="center">
        Create a Happy Hour
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <InputField errors={errors} name="title" register={register} />
        <DatePickers control={control} />
        <InputField errors={errors} name="link" register={register} />
        <Divider flexItem className={classes.divider} />
        <InputField
          errors={errors}
          name="description"
          register={register}
          textarea
        />
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
    </div>
  );
};

export default Create;
