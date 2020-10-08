import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProjects } from "../actions/projects";
import { loadUser } from "../actions/auth";
import PropTypes from "prop-types";
import bugImage from "../imgs/bug.png";
import _ from "lodash";
import {
  Typography,
  LinearProgress,
  Container,
  Paper,
  Grid,
  CssBaseline,
  makeStyles,
  Button,
} from "@material-ui/core";

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
}));

const Bug = ({
  projectId,
  project,
  bugId,
  getProjects,
  loadUser,
  email,
  bug,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getProjects();
  }, []);

  const Status = ["Open", "In progress", "closed"];
  if (!bug) {
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
        <h4>Status :</h4>
        <p style={{ margin: 0, textTransform: "capitalize" }}>
          {project.bugs[bugId].status}
        </p>
        {project.bugs[bugId].assignedTo === email ||
        project.bugs[bugId].assignedTo === project.bugs[bugId].createdBy ? (
          <form className="form">
            <select placeholder="Select User">
              <option value="null">Change status</option>
              {Status.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </select>
          </form>
        ) : null}

        <h4>Assigned to :</h4>
        <p style={{ margin: 0 }}>
          {project.bugs[bugId].assignedTo.split("@")[0]}
        </p>
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
  if (project) {
    bug = project.bugs[bugId];
  }
  const email = state.auth.email;

  return {
    projectId,
    bugId,
    project,
    email,
    bug,
  };
}

export default connect(mapStateToProps, { getProjects })(Bug);
