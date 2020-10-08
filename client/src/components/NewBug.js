import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
// import PropTypes from "prop-types";
import bugImage from "../imgs/bug.png";
import { connect } from "react-redux";
import { getProjects } from "../actions/projects";
import { addBug } from "../actions/bug";

import {
  FormControl,
  Button,
  CssBaseline,
  TextField,
  Typography,
  makeStyles,
  Container,
  Paper,
  NativeSelect,
  InputBase,
  withStyles,
} from "@material-ui/core";

const statusList = ["Open", "In progress"];

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    marginTop: "15px",
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),

    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "3rem",
    paddingBottom: "8rem",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  img: {
    height: "4rem",
    width: "4rem",
  },
  margin: {
    margin: theme.spacing(3),
  },
}));

const NewBug = ({
  projectId,
  email,
  getProjects,
  teamMembers,
  projectName,
  addBug,
}) => {
  useEffect(() => {
    getProjects();
  }, []);
  const history = useHistory();
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("Open");
  const classes = useStyles();
  const { register, handleSubmit, errors, getValues, control } = useForm();

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleChangeTo = (e) => {
    setAssignedTo(e.target.value);
  };

  const handleOnSubmit = (data) => {
    const { title, expectedResult, actualResult } = data;
    const payload = {
      title,
      expectedResult,
      actualResult,
      status,
      assignedTo,
      projectName,
    };
    console.log(payload);
    addBug(payload, history, projectId);
  };
  if (!teamMembers) {
    return <h1>Loading...</h1>;
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Paper elevation={3} className={classes.paper}>
        <img className={classes.img} src={bugImage} />
        <Typography component="h1" variant="h5">
          New bug
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
            id="title"
            label="Title"
            name="title"
            autoFocus
          />
          {errors.title && (
            <p style={{ color: "crimson" }}>
              Title should be at least 3 characters
            </p>
          )}
          <TextField
            inputRef={register({
              validate: (value) => {
                return !!value.trim();
              },
            })}
            variant="outlined"
            margin="normal"
            required
            multiline
            fullWidth
            rows={3}
            id="expectedResult"
            label="Expected result"
            name="expectedResult"
          />
          {errors.expectedResult && (
            <p style={{ color: "crimson" }}>Please enter expected result</p>
          )}
          <TextField
            inputRef={register({
              validate: (value) => {
                return !!value.trim();
              },
            })}
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            rows={3}
            name="actualResult"
            label="Actual result"
            type="text"
            id="actualResult"
          />
          {errors.actualResult && (
            <p style={{ color: "crimson" }}>Please enter actual result</p>
          )}
          <br />
          <FormControl fullWidth>
            <NativeSelect
              input={<BootstrapInput />}
              fullWidth
              onChange={(e) => handleChangeStatus(e)}
              placeholder="Status"
            >
              <option value="Open">Select status</option>
              {statusList.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <FormControl fullWidth>
            <NativeSelect
              input={<BootstrapInput />}
              fullWidth
              value={email}
              onChange={(e) => handleChangeTo(e)}
              placeholder="Assigned to"
            >
              <option value={email}>Assigned to</option>
              {teamMembers.map((user, index) => (
                <option key={index} value={user}>
                  {user}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "#1976d2", color: "white" }}
            className={classes.submit}
          >
            Add
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

NewBug.propTypes = {};
function mapStateToProps(state, { match }) {
  const { projectId } = match.params;
  const { auth, projects } = state;
  const { yourProjects } = projects;
  let teamMembers;
  let projectName;
  if (yourProjects[projectId]) {
    teamMembers = yourProjects[projectId].teamMembers;
    projectName = yourProjects[projectId].projectName;
  }
  let email;
  if (auth.email) {
    email = auth.email;
  }
  return {
    email,
    projectId,
    teamMembers,
    projectName,
  };
}

export default connect(mapStateToProps, { getProjects, addBug })(NewBug);
