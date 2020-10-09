import React from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../actions/auth";
import PropTypes from "prop-types";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  makeStyles,
  Container,
  Grid,
  Paper,
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Register({ registerUser, isAuthenticated }) {
  const { register, handleSubmit, errors, getValues } = useForm();
  const classes = useStyles();

  const handleOnSubmit = (data) => {
    const { username, email, password } = data;
    registerUser({ username, email, password });
  };

  // const onClick = () => {
  //   setAlert("Successfully registered", "success");
  // };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Paper elevation={3} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className={classes.form}
          noValidate
        >
          <TextField
            inputRef={register({
              required: true,
              minLength: 3,
              validate: (value) => {
                return !!value.trim();
              },
            })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
          />
          {errors.username && (
            <p style={{ color: "crimson" }}>Please enter a Username</p>
          )}
          <TextField
            inputRef={register({
              required: true,
              minLength: 3,
              validate: (value) => {
                return !!value.trim();
              },
            })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          {errors.email && (
            <p style={{ color: "crimson" }}>Please enter a valid email</p>
          )}
          <TextField
            inputRef={register({
              required: true,
              minLength: 6,
              validate: (value) => {
                return !!value.trim();
              },
            })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          {errors.password && (
            <p style={{ color: "crimson" }}>
              Password should be at least 6 characters
            </p>
          )}
          <TextField
            inputRef={register({
              validate: (value) => {
                if (value === getValues()["password"]) {
                  return true;
                } else {
                  return "passwords do not match";
                }
              },
            })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="password1"
          />
          {errors.confirmPassword && (
            <p style={{ color: "crimson" }}>The passwords do not match</p>
          )}

          <Button
            // onClick={onClick}
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "#1976d2", color: "white" }}
            className={classes.submit}
          >
            Sign Up
          </Button>

          <Grid container>
            <Grid item xs>
              <p style={{ color: "#1976d2", margin: 0 }} variant="body2">
                {"Already have an account? "}
              </p>
            </Grid>
            <Grid item>
              <Link
                style={{ textDecoration: "none", color: "#1976d2" }}
                to="/login"
                variant="body2"
              >
                {"Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

Register.propTypes = {
  setAlert: PropTypes.func,
  registerUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

function mapStateToProps(state) {
  const { isAuthenticated } = state.auth;
  return {
    isAuthenticated,
  };
}

export default connect(mapStateToProps, { registerUser })(Register);
