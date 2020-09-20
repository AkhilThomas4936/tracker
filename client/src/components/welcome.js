import React from "react";
import homeView from "../imgs/homeView.svg";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

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
}));

export default function Welcome() {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={3} style={classes.caption}>
        <Grid item xs={6}>
          <div
            style={{
              width: "30em",
              margin: "12em",
            }}
          >
            <h1 style={{ fontFamily: "Helvetica Neue" }}>
              Create issues <br />
              and distribute tasks <br />
              across your software team.
            </h1>
            <div className={classes.root}>
              <Button variant="contained" color="secondary">
                Register
              </Button>
              <Button variant="contained" color="secondary">
                Signin
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <img
            src={homeView}
            style={{
              width: "35em",
              height: "45em",
            }}
            alt="Home page image"
          />
        </Grid>
      </Grid>
    </div>
  );
}
