import React, { useEffect } from "react";
import { getProjects } from "../actions/projects";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import noProjects from "../imgs/noProjects.svg";
import { makeStyles, Button } from "@material-ui/core";

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
        <Button variant="contained" className={classes.btn}>
          <strong>Create Project</strong>
        </Button>
      </div>
    );
  }
  return <div>{JSON.stringify(yourProjects)}</div>;
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
