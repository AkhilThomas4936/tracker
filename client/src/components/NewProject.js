import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";

// import { registerUser } from "../actions/auth";
// import PropTypes from "prop-types";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { addProject } from "../actions/projects";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  makeStyles,
  Container,
  Grid,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "4rem",
    paddingBottom: "8rem",
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

const NewProject = ({ auth, addProject, toId }) => {
  const [selectedDateFrom, setSelectedDateFrom] = React.useState(new Date());
  const [selectedDateTo, setSelectedDateTo] = React.useState(new Date());
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const handleDateChangeFrom = (date) => {
    setSelectedDateFrom(date);
  };
  const handleDateChangeTo = (date) => {
    setSelectedDateTo(date);
  };
  const classes = useStyles();
  const handleOnSubmit = (data) => {
    const { projectName } = data;
    const teamMembers = [auth.user.email];
    const payload = {
      projectName,
      teamMembers,
      from: selectedDateFrom,
      to: selectedDateTo,
    };
    addProject(payload, history, toId);
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Paper elevation={3} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddCircleOutlineIcon className={classes.icon} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Project
        </Typography>
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
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

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <h3>From</h3>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                inputRef={register}
                margin="normal"
                id="date-picker-dialog"
                label="Start date of the project"
                format="MM/dd/yyyy"
                value={selectedDateFrom}
                onChange={handleDateChangeFrom}
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
                inputRef={register}
                margin="normal"
                id="date-picker-dialog"
                label="End date of the project"
                format="MM/dd/yyyy"
                value={selectedDateTo}
                onChange={handleDateChangeTo}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "#3cb371", color: "white" }}
            className={classes.submit}
          >
            Create
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

NewProject.propTypes = {};

function mapStateToProps(state) {
  const { auth } = state;
  const { yourProjects } = state.projects;
  let toId;
  if (yourProjects === false) {
    toId = 0;
  } else {
    toId = yourProjects.length;
  }

  return {
    auth,
    toId,
  };
}

export default connect(mapStateToProps, { addProject })(NewProject);
