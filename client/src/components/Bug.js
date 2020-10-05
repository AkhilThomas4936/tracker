import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProjects } from "../actions/projects";
import PropTypes from "prop-types";
import bugImage from "../imgs/bug.png";
import {
  Typography,
  LinearProgress,
  Container,
  Paper,
  Grid,
  CssBaseline,
  makeStyles,
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
  },
  item: {
    marginRight: "1rem",
  },
}));

const Bug = ({ projectId, project, bugId, getProjects }) => {
  const classes = useStyles();

  useEffect(() => {
    getProjects();
  }, []);

  if (!project) {
    return (
      <div>
        <h1>Loading ...</h1>
        <LinearProgress color="secondary" />
      </div>
    );
  }

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />

      <Paper elevation={3} className={classes.paper}>
        <Grid container>
          <Grid item className={classes.item}>
            <img className={classes.img} src={bugImage} alt="bug" />
          </Grid>
          <Grid item className={classes.item}>
            <Paper
              style={{ backgroundColor: "#ff6347", padding: "0.2rem 2rem" }}
            >
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
      </Paper>
    </Container>
  );
};

Bug.propTypes = {};

function mapStateToProps(state, { match }) {
  const { projectId, bugId } = match.params;
  const { yourProjects } = state.projects;
  const project = yourProjects[projectId];

  return {
    projectId,
    bugId,
    project,
  };
}

export default connect(mapStateToProps, { getProjects })(Bug);
