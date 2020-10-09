import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../actions/projects";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import noProjects from "../imgs/noProjects.svg";

import {
  Paper,
  Grid,
  Typography,
  Box,
  makeStyles,
  Button,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Container,
  LinearProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "auto",
    paddingBottom: "5rem",
    textAlign: "center",
  },
  img: {
    height: "20rem",
    width: "20rem",
    [theme.breakpoints.down("sm")]: {
      height: "20rem",
      width: "20rem",
    },
  },

  alert: {
    fontFamily: "helvetica",
    fontSize: "1.1rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },

  avatar: {
    float: "right",
    margin: theme.spacing(5),
    backgroundColor: theme.palette.secondary.main,
  },
  icon: {
    height: "2.8rem",
    width: "2.8rem",
  },
  table: {
    minWidth: 650,
  },
  a: {
    textDecoration: "none",
    color: "#1976d2",
  },
  // tableHead: {
  //   fontSize: "1.2rem",
  //   padding: 0,
  // },
  heading: {
    color: "#1976d2",
  },
}));

function Dashboard({ getProjects, yourProjects, loading }) {
  const classes = useStyles();

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
        <LinearProgress color="secondary"></LinearProgress>
      </div>
    );
  }

  if (yourProjects === false) {
    return (
      <Container component="main" maxWidth="sm">
        <div className={classes.container}>
          <img
            className={classes.img}
            src={noProjects}
            alt="no active projects"
          />
          <p className={classes.alert}>
            <strong>
              You are currently not a member of any projects...!
              <br />
              Create a new one.
            </strong>
          </p>
          <Link to="/add" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              style={{
                padding: "0.4em 2em",
                color: "white",
                backgroundColor: "#2e73bf",
                textTransform: "none",
              }}
            >
              Create project
            </Button>
          </Link>
        </div>
      </Container>
    );
  }
  return (
    <Container component="main" maxWidth="xl" style={{ padding: 0 }}>
      <div
        style={{ backgroundColor: " rgb(217, 226, 226)", padding: "2rem 1rem" }}
      >
        <Grid container>
          <Grid item>
            <Typography component="h1" variant="h4" className={classes.heading}>
              <strong>Current projects you are in...</strong>
            </Typography>
          </Grid>
          <Grid item style={{ float: "right" }}>
            <Link
              to="/add"
              style={{
                textDecoration: "none",
              }}
            >
              <Button
                variant="contained"
                style={{
                  marginLeft: "1rem",
                  // marginTop: "0.3rem",
                  padding: "0.4em 1em",
                  color: "white",
                  backgroundColor: "#2e73bf",
                  textTransform: "none",
                }}
              >
                Create new project
              </Button>
            </Link>
          </Grid>
        </Grid>
      </div>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead}>
                {" "}
                <Box letterSpacing={2}>PROJECT</Box>
              </TableCell>
              <TableCell className={classes.tableHead} align="right">
                <Box letterSpacing={2}>OWNER</Box>
              </TableCell>
              <TableCell className={classes.tableHead} align="right">
                <Box letterSpacing={2}>FROM</Box>
              </TableCell>
              <TableCell className={classes.tableHead} align="right">
                <Box letterSpacing={2}>TO</Box>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {yourProjects.map((project, index) => (
              <TableRow key={project.projectName}>
                <TableCell component="th" scope="row">
                  <Link
                    to={`/${index}`}
                    style={{
                      textDecoration: "none",
                      color: "#1976d2",
                    }}
                  >
                    {project.projectName}
                  </Link>
                </TableCell>
                <TableCell align="right">
                  {project.createdBy.split("@")[0]}
                </TableCell>
                <TableCell align="right">
                  {project.from.split("T")[0]}
                </TableCell>
                <TableCell align="right">{project.to.split("T")[0]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

Dashboard.propTypes = {
  getProjects: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { yourProjects, loading } = state.projects;

  return {
    yourProjects,
    loading,
  };
}

export default connect(mapStateToProps, { getProjects })(Dashboard);
