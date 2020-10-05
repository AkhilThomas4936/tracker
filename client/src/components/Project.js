import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProjects } from "../actions/projects";
import project1 from "../imgs/project.png";
import team from "../imgs/team.svg";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import {
  Box,
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
    backgroundColor: theme.palette.secondary.main,
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
}));

const Project = ({ project, projectId, getProjects }) => {
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
    <Container component="main" maxWidth="xl">
      <CssBaseline />

      <Paper elevation={3} className={classes.paper}>
        <Grid container style={{ marginLeft: "2rem" }}>
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
                  padding: "0.1rem 1em",
                  color: "white",
                  backgroundColor: "#2196f3",
                  textTransform: "none",
                }}
              >
                Report a bug
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/invite" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                style={{
                  marginLeft: "1rem",
                  marginTop: "0.3rem",
                  padding: "0.1em 1em",
                  color: "white",
                  backgroundColor: "#f50057",
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
        <Grid container className={classes.container}>
          <Grid item>
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
                      <TableCell align="right">
                        {
                          <Link
                            to={`/${projectId}/${index}`}
                            style={{ textDecoration: "none" }}
                          >
                            <Button
                              variant="contained"
                              style={{
                                padding: "0.1em 3em",
                                color: "white",
                                backgroundColor: "#3cb371",
                                textTransform: "none",
                              }}
                            >
                              View
                            </Button>
                          </Link>
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item>
            <Paper style={{ paddingTop: "1rem" }} elevation={2}>
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
    projectId,
    project,
  };
}

export default connect(mapStateToProps, { getProjects })(Project);
