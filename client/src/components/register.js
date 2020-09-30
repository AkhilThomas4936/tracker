import React from "react";
import { useForm } from "react-hook-form";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

export default function Register() {
  const { register, handleSubmit, errors, getValues } = useForm();
  const classes = useStyles();

  const handleOnSubmit = async (data) => {
    const { username, email, password, confirmPassword } = data;
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
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
              minLength: 1,
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
              minLength: 1,
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
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "#1976d2", color: "white" }}
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
}
