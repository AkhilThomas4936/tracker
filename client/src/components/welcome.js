import React, { Fragment } from "react";
import homeView from "../imgs/homeView.svg";
import { Link } from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid, Button, useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      backgroundColor: "#1976d2",
      color: "white",
    },
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
  },
  btn: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    // [theme.breakpoints.down("md")]: {
    //   width: "7rem",
    //   height: "2.5rem",
    // },
    // [theme.breakpoints.down("sm")]: {
    //   width: "5rem",
    //   height: "2rem",
    // },
  },
  fontFamily: {
    fontFamily: "Helvetica Neue",
  },
  gridItem: {
    placeSelf: "center",
  },
  img: {
    width: "35rem",
    height: "45rem",
    [theme.breakpoints.down("sm")]: {
      width: "25rem",
      height: "35rem",
    },
    [theme.breakpoints.down("xs")]: {
      width: "15rem",
      height: "18rem",
    },
  },
}));

function Welcome() {
  const theme = useTheme();
  const classes = useStyles();

  const matches = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));

  const gridSm = (
    <Fragment>
      <Grid container spacing={0} justify="center" direction="column">
        <Grid item className={classes.gridItem}>
          <img src={homeView} alt="home" className={classes.img} />
        </Grid>
        <Grid item className={classes.gridItem}>
          <div>
            {matches ? (
              <h3 className={classes.fontFamily}>
                Create issues <br />
                and distribute tasks <br />
                across your software team.
              </h3>
            ) : (
              <h2 className={classes.fontFamily}>
                Create issues <br />
                and distribute tasks <br />
                across your software team.
              </h2>
            )}

            <div className={classes.root}>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Button variant="contained" className={classes.btn}>
                  <strong>Sign Up</strong>
                </Button>
              </Link>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button variant="contained" className={classes.btn}>
                  <strong> Sign In</strong>
                </Button>
              </Link>
            </div>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );

  const gridNormal = (
    <Fragment>
      <Grid container spacing={0} justify="center" direction="row">
        <Grid item className={classes.gridItem}>
          <div>
            <h1 className={classes.fontFamily} margin="auto">
              Create issues <br />
              and distribute tasks <br />
              across your software team.
            </h1>

            <div className={classes.root}>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Button variant="contained" className={classes.btn}>
                  <strong>Sign Up</strong>
                </Button>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/login">
                <Button variant="contained" className={classes.btn}>
                  <strong> Sign In</strong>
                </Button>
              </Link>
            </div>
          </div>
        </Grid>
        <Grid item className={classes.gridItem}>
          <img src={homeView} alt="home" className={classes.img} />
        </Grid>
      </Grid>
    </Fragment>
  );
  return <div>{matchesSm ? gridSm : gridNormal}</div>;
}
export default Welcome;
