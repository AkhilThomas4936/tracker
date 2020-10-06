import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProjects } from "../actions/projects";
import project1 from "../imgs/project.png";
import noBug from "../imgs/noBug.svg";
import team from "../imgs/team.svg";
import AddIcon from "@material-ui/icons/Add";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import {
  Box,
  Fab,
  Avatar,
  Grid,
  Container,
  makeStyles,
  CssBaseline,
  Paper,
  Typography,
  LinearProgress,
  ButtonBase,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Tooltip,
  Button,
  Tab,
  AppBar,
  Toolbar,
  Tabs,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    padding: "3rem",
    paddingBottom: "8rem",
  },
  root: {
    flexGrow: 1,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#2e73bf",
  },
  heading: {
    color: "#1976d2",
  },
  team: {
    float: "left",
  },
  img: {
    height: "2rem",
    width: "2.5rem",
    marginRight: "3px",
  },
  container: {
    display: "inline-grid",
    gridTemplateRows: "1fr",
    gridTemplateColumns: "4fr 1fr",
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
  p: {
    margin: 0,
    marginLeft: "2rem",
  },
  noBug: {
    height: "15rem",
    width: "15rem",
  },
}));

const Project = ({ project, projectId, getProjects }) => {
  useEffect(() => {
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
    <Container component="main" maxWidth="xl" style={{ padding: 0 }}>
      <CssBaseline />

      <div
        style={{
          padding: "3rem 1rem",
          backgroundColor: "rgb(217, 226, 226)",
          marginBottom: "2rem",
        }}
      >
        <Grid container>
          <grid item>
            <img className={classes.img} src={project1} alt="project" />
          </grid>
          <Grid item>
            <Typography component="h1" variant="h5" className={classes.heading}>
              <strong>{project.projectName}</strong>
            </Typography>
          </Grid>
          <Grid item>
            <Link style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                style={{
                  marginLeft: "1rem",
                  marginTop: "0.3rem",
                  padding: "0.1em 1em",
                  color: "white",
                  backgroundColor: "#2e73bf",
                  textTransform: "none",
                }}
              >
                Report a bug
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Link
              to={`/${project.projectName}/${projectId}/invite`}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                style={{
                  marginLeft: "1rem",
                  marginTop: "0.3rem",
                  padding: "0.1em 1em",
                  color: "white",
                  backgroundColor: "#2e73bf",
                  textTransform: "none",
                }}
              >
                Add members
              </Button>
            </Link>
          </Grid>
        </Grid>

        <p className={classes.p}>{`Created by: ${
          project.createdBy.split("@")[0]
        }`}</p>
      </div>
      <Grid container className={classes.container}>
        <Grid item style={{ textAlign: "center", marginLeft: " 1rem" }}>
          {project.bugs.length === 0 ? (
            <div style={{ marginTop: "4rem" }}>
              <img src={noBug} className={classes.noBug} />
              <p>No bugs reported yet</p>
            </div>
          ) : (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHead}>
                      {" "}
                      <Box letterSpacing={2}>BUG</Box>
                    </TableCell>
                    <TableCell className={classes.tableHead} align="center">
                      <Box letterSpacing={2}>REPORTED BY</Box>
                    </TableCell>
                    <TableCell className={classes.tableHead} align="center">
                      <Box letterSpacing={2}>STATUS</Box>
                    </TableCell>
                    <TableCell className={classes.tableHead} align="center">
                      <Box letterSpacing={2}>ASSIGNED TO</Box>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {project.bugs.map((bug, index) => (
                    <TableRow key={project.projectName}>
                      <TableCell component="th" scope="row">
                        <Link
                          to={`/${projectId}/${index}`}
                          style={{
                            textDecoration: "none",
                            color: "#1976d2",
                          }}
                        >
                          {bug.title}
                        </Link>
                      </TableCell>
                      <TableCell align="center">{bug.createdBy}</TableCell>
                      <TableCell align="center">{bug.status}</TableCell>
                      <TableCell align="center">{bug.assignedTo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
        <Grid item style={{ marginRight: " 1rem" }}>
          <Paper style={{ padding: "1rem 0" }} elevation={2}>
            <Box style={{ textAlign: "center" }} letterSpacing={2}>
              <strong> TEAM MEMBERS</strong>
            </Box>
            <ul>
              {project.teamMembers.map((member, index) => (
                <li className={classes.li} key={index}>
                  <Grid container>
                    <Grid item>
                      <Avatar className={classes.avatar}></Avatar>
                    </Grid>
                    <Grid item>
                      <p style={{ color: "black" }}>{member.split("@")[0]}</p>
                    </Grid>
                  </Grid>
                </li>
              ))}
            </ul>
          </Paper>
        </Grid>
      </Grid>
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
    projectId,
    project,
  };
}

export default connect(mapStateToProps, { getProjects })(Project);
