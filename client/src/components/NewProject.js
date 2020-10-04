import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../actions/auth";
import PropTypes from "prop-types";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  makeStyles,
  Container,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  icon: {
    height: "2.5rem",
    width: "2.5rem",
  },
}));

const NewProject = (props) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const { register, handleSubmit, errors, getValues, control } = useForm();
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddCircleOutlineIcon className={classes.icon} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Project
        </Typography>
        <form
          //   onSubmit={handleSubmit(handleOnSubmit)}
          className={classes.form}
          noValidate
        >
          <TextField
            inputRef={register({
              required: true,
              minLength: 3,
              validate: (value) => {
                return !!value.trim();
              },
            })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Project Name"
            name="projectName"
            autoFocus
          />
          {errors.projectName && (
            <p style={{ color: "crimson" }}>
              Please enter a name for the project
            </p>
          )}
          <TextField
            inputRef={register({
              required: true,
              minLength: 3,
              validate: (value) => {
                return !!value.trim();
              },
            })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email address of team members"
            name="email"
          />
          {errors.email && (
            <p style={{ color: "crimson" }}>Please enter a valid email</p>
          )}

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <h3>From</h3>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <h3>To</h3>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <TextField
            inputRef={register({
              required: true,
              minLength: 3,
              validate: (value) => {
                return !!value.trim();
              },
            })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email address of team members"
            name="email"
          />

          <Button
            // onClick={onClick}
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "#bf1650", color: "white" }}
            className={classes.submit}
          >
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
};

NewProject.propTypes = {};

export default NewProject;
