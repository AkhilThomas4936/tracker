import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(0),
    },
  },
}));
function Alerts({ alerts }) {
  const classes = useStyles();
  const [open] = useState(true);

  return (
    <div className={classes.root}>
      {alerts.map((alert) => (
        <Snackbar key={alert.id} open={open}>
          <Alert
            classes={classes.alert}
            variant="filled"
            severity={alert.alertType}
          >
            {alert.msg}
          </Alert>
        </Snackbar>
      ))}
    </div>
  );
}

Alert.propTypes = {
  alerts: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    alerts: state.alert,
  };
}
export default connect(mapStateToProps)(Alerts);
