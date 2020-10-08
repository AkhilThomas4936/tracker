import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getProjects } from "../actions/projects";
import { changeStatus, changeAssignedTo } from "../actions/bug";
// import PropTypes from "prop-types";
import bugImage from "../imgs/bug.png";

import {
  Typography,
  LinearProgress,
  Container,
  Paper,
  Grid,
  CssBaseline,
  makeStyles,
  NativeSelect,
  FormControl,
  withStyles,
  InputBase,
  Chip,
} from "@material-ui/core";

const BootstrapInput = withStyles((theme) => ({
  input: {
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
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    padding: "3rem",
    paddingBottom: "8rem",
  },
  root: {
    flexGrow: 1,
  },
  img: {
    height: "2rem",
    width: "2.5rem",
  },
  heading: {
    color: "#1976d2",
    textTransform: "capitalize",
  },
  item: {
    marginRight: "1rem",
  },
  container1: {
    display: "inlineGrid",
    gridGap: "3px",
  },
  item1: {
    display: " flex",
    justifyContent: " center",
    alignItems: "center",
    fontSize: "1em",
  },
}));

const Bug = ({
  projectId,
  project,
  bugId,
  getProjects,
  email,
  bug,
  status,
  changeStatus,
  changeAssignedTo,
}) => {
  useEffect(() => {
    getProjects();
  }, []);

  const classes = useStyles();
  const history = useHistory();
  const Status = ["Open", "In progress", "closed"];

  const [statusValue, setStatus] = useState("");
  const [assignedToValue, setAssignedTo] = useState("");
  const handleChange = (e) => {
    setStatus(e.target.value);
    const payload = {
      status: e.target.value,
      projectName: project.projectName,
      bugId: bug._id,
    };
    changeStatus(payload, history, projectId, bugId);
  };

  const handleChangeAssignedTo = (e) => {
    setAssignedTo(e.target.value);
    const payload = {
      assignedTo: e.target.value,
      projectName: project.projectName,
      bugId: bug._id,
    };
    changeAssignedTo(payload, history, projectId, bugId);
  };

  let chip;
  if (status === "Open") {
    chip = (
      <Chip
        label={status}
        style={{
          backgroundColor: "MediumSeaGreen",
          color: "white",
          width: "100px",
        }}
      />
    );
  } else if (status === "In progress") {
    chip = (
      <Chip
        label={status}
        style={{
          backgroundColor: "Tomato",
          color: "white",
          width: "100px",
        }}
      />
    );
  } else {
    chip = (
      <Chip
        label={status}
        style={{
          backgroundColor: "SlateBlue",
          color: "white",
          width: "100px",
        }}
      />
    );
  }

  if (!status) {
    return (
      <div>
        <h1>Loading ...</h1>
        <LinearProgress color="secondary" />
      </div>
    );
  }

  return (
    <Container component="main" maxWidth="xl" style={{ padding: 0 }}>
      <CssBaseline />
      <div
        style={{ backgroundColor: " rgb(217, 226, 226)", padding: "2rem 3rem" }}
      >
        <Grid container>
          <Grid item className={classes.item}>
            <img className={classes.img} src={bugImage} alt="bug" />
          </Grid>
          <Grid item className={classes.item}>
            <Paper style={{ padding: "0.2rem 2rem" }}>
              <Typography
                component="h1"
                variant="h5"
                className={classes.heading}
              >
                <strong>{project.bugs[bugId].title}</strong>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <p>{`by ${project.bugs[bugId].createdBy} on ${
          project.bugs[bugId].date.split("T")[0]
        }`}</p>
      </div>
      <Paper elevation={3} className={classes.paper}>
        <h4>Expected result :</h4>
        <p style={{ margin: 0 }}>{project.bugs[bugId].expectedResult}</p>

        <h4>Actual result :</h4>
        <p style={{ margin: 0 }}>{project.bugs[bugId].actualResult}</p>

        <Grid container className={classes.container1}>
          <Grid item className={classes.item1}>
            <h4>Status :</h4>
          </Grid>
          <Grid item className={classes.item1}>
            {chip}
          </Grid>

          {project.bugs[bugId].assignedTo === email ||
          email === project.bugs[bugId].createdBy ? (
            <Grid item className={classes.item1}>
              <FormControl>
                <NativeSelect
                  input={<BootstrapInput />}
                  onChange={(e) => handleChange(e)}
                  placeholder="Status"
                >
                  <option value="">Change status</option>
                  {Status.map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            </Grid>
          ) : null}
        </Grid>
        <h4>Assigned to :</h4>

        <Grid container className={classes.container1}>
          <Grid item className={classes.item1}>
            <p style={{ margin: 0 }}>
              {project.bugs[bugId].assignedTo.split("@")[0]}
            </p>
          </Grid>
          {email === project.bugs[bugId].createdBy && (
            <Grid item className={classes.item1}>
              <FormControl>
                <NativeSelect
                  input={<BootstrapInput />}
                  onChange={(e) => handleChangeAssignedTo(e)}
                  placeholder="Status"
                >
                  <option value="">Change </option>
                  {project.teamMembers.map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

Bug.propTypes = {};

function mapStateToProps(state, { match }) {
  const { projectId, bugId } = match.params;
  const { yourProjects } = state.projects;
  const project = yourProjects[projectId];
  let bug;
  let status;

  if (project) {
    bug = project.bugs[bugId];
    if (project.bugs[bugId]) {
      status = project.bugs[bugId].status;
    }
  }

  const email = state.auth.email;

  return {
    projectId,
    bugId,
    project,
    email,
    bug,
    status,
  };
}

export default connect(mapStateToProps, {
  getProjects,
  changeStatus,
  changeAssignedTo,
})(Bug);
