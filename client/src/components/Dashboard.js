import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../actions/projects";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import noProjects from "../imgs/noProjects.svg";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import {
  Avatar,
  Icon,
  Grid,
  makeStyles,
  Button,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Tooltip,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "auto",
    paddingBottom: "5rem",
    textAlign: "center",
  },
  img: {
    marginRight: "2rem",
    height: "30rem",
    width: "30rem",
    [theme.breakpoints.down("sm")]: {
      height: "20rem",
      width: "20rem",
    },
  },

  alert: {
    fontFamily: "helvetica",
    fontSize: "1.8rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  btn: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  avatar: {
    float: "right",
    margin: theme.spacing(1),
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
  tableHead: {
    fontSize: "1.3rem",
  },
}));

function Dashboard({ getProjects, yourProjects, loading }) {
  const classes = useStyles();

  useEffect(() => {
    getProjects();
  }, []);

  if (yourProjects === false) {
    return (
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
          <Button variant="contained" className={classes.btn}>
            <strong>Create Project</strong>
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <div>
      <Link to="/add">
        <Avatar className={classes.avatar}>
          <Tooltip title="Create Project">
            <AddCircleOutlineIcon className={classes.icon} />
          </Tooltip>
        </Avatar>
      </Link>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead}>Project</TableCell>
              <TableCell className={classes.tableHead} align="right">
                Owner
              </TableCell>
              <TableCell className={classes.tableHead} align="right">
                Duration
              </TableCell>
              <TableCell align="right"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {yourProjects.map((project) => (
              <TableRow key={project.projectName}>
                <TableCell component="th" scope="row">
                  <a href="#!" className={classes.a}>
                    {project.projectName}
                  </a>
                </TableCell>
                <TableCell align="right">{project.createdBy}</TableCell>
                <TableCell align="right">{project.duration}</TableCell>
                <TableCell align="right">
                  {
                    <Button
                      variant="contained"
                      style={{
                        padding: "0.5em 3em",
                        color: "white",
                        backgroundColor: "#4caf50",
                        textTransform: "none",
                      }}
                    >
                      View details
                    </Button>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
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
