import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProjects } from "../actions/projects";
import project1 from "../imgs/project.png";
import team from "../imgs/team.svg";
import bugImage from "../imgs/bug.png";
import {
  Grid,
  Container,
  makeStyles,
  CssBaseline,
  Paper,
  Typography,
  LinearProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "3rem",
    paddingBottom: "8rem",
  },
  heading: {
    color: "#1976d2",
  },
  team: {
    float: "left",
  },
  img: {
    height: "8rem",
    width: "8.5rem",
  },
  container: {
    display: "inline-grid",
    // gridTemplateRows: "1fr",
    // gridTemplateColumns: "1fr 1fr",
    gridAutoFlow: "column",
    gridGap: "15px",
  },
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(217, 226, 226)",
    padding: "8rem",
  },

  team: {
    height: "6rem",
    width: "6rem",
  },
  li: {
    listStyle: "none",
    color: "blue",
  },
}));

const Project = ({ project, getProjects }) => {
  useEffect(() => {
    console.log("runs");
    getProjects();
  }, []);
  const classes = useStyles();

  if (!project) {
    return (
      <div>
        <h1>Loading ...</h1>
        <LinearProgress color="secondary" />
      </div>
    );
  }

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Paper elevation={3} className={classes.paper}>
        <img className={classes.img} src={project1} alt="project" />
        <Typography component="h1" variant="h5" className={classes.heading}>
          <strong>{project.projectName}</strong>
        </Typography>
        <p>{`Created by: ${project.createdBy.split("@")[0]}`}</p>
        <Grid container className={classes.container}>
          <Grid item className={classes.item}>
            <Grid container direction="column">
              <Grid item>
                <img className={classes.team} src={team} alt="team" />
              </Grid>
              <Grid item>
                <ul>
                  {project.teamMembers.map((member, index) => (
                    <li className={classes.li}>{member.split("@")[0]}</li>
                  ))}
                </ul>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.item}>
            <Grid container direction="column">
              <Grid item>
                <img className={classes.team} src={bugImage} alt="bug" />
              </Grid>
              <Grid item>
                <ul>
                  {project.bugs.map((bug) => (
                    <Typography variant="caption" display="block" gutterBottom>
                      <li className={classes.li} key={bug.id}>
                        {bug.title}
                      </li>
                    </Typography>
                  ))}
                </ul>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

Project.propTypes = {
  project: PropTypes.object.isRequired,
};

function mapStateToProps(state, { match }) {
  const { projectId } = match.params;
  const { yourProjects } = state.projects;
  const project = yourProjects[projectId];

  return {
    project,
  };
}

export default connect(mapStateToProps, { getProjects })(Project);
