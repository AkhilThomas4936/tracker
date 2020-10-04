import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
// import team from "../imgs/team.svg";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  makeStyles,
  Container,
  Paper,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "2rem",
    paddingBottom: "4rem",
    marginTop: theme.spacing(1),
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
    margin: theme.spacing(0, 0, 1),
    padding: " 0.4rem 0rem",
  },
  gridContainer: {
    display: "inline-grid",
    gridTemplateRows: "1fr",
    gridTemplateColumns: "10000fr 1fr  ",
  },
  gridC: {
    display: "inline-grid",
    gridTemplateRows: "1fr",
    gridTemplateColumns: "1fr 1fr  ",
    gridGap: "4px",
  },
  gridItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function NewTest() {
  const classes = useStyles();

  const [indexes, setIndexes] = React.useState([0]);
  const [counter, setCounter] = React.useState(1000);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    const team = [];
    const { friends } = data;
    // console.log(friends);
    friends.map((friend) => team.push(friend.email));
    console.log(team);
  };

  const addFriend = () => {
    setIndexes((prevIndexes) => [...prevIndexes, counter]);
    setCounter((prevCounter) => prevCounter - 1);
  };

  const removeFriend = (index) => () => {
    setIndexes((prevIndexes) => [
      ...prevIndexes.filter((item) => item !== index),
    ]);
    setCounter((prevCounter) => prevCounter - 1);
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Paper elevation={3} className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        {/* <img src={team} /> */}

        <Typography component="h1" variant="h5">
          Invite your teammates
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes.form}
          noValidate
        >
          {indexes.map((index) => {
            const fieldName = `friends[${index}]`;
            return (
              <Fragment key={index}>
                <Grid container className={classes.gridContainer}>
                  <Grid item className={classes.gridItem}>
                    <TextField
                      inputRef={register({
                        required: true,
                        minLength: 3,
                        validate: (value) => {
                          return !!value.trim();
                        },
                      })}
                      type="text"
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name={`${fieldName}.email`}
                    />
                  </Grid>

                  {indexes.length !== 1 && (
                    <Grid item className={classes.gridItem}>
                      <HighlightOffIcon
                        cursor="pointer"
                        fontSize="large"
                        style={{ color: "crimson" }}
                        className={classes.submit}
                        onClick={removeFriend(index)}
                      />
                    </Grid>
                  )}
                </Grid>
                {errors.friends && errors.friends[index] && (
                  <p style={{ color: "crimson" }}>Please enter a valid email</p>
                )}
              </Fragment>
            );
          })}

          <div>
            <Grid container className={classes.gridC}>
              <Grid item className={classes.gridItem}>
                <Button
                  fullWidth
                  style={{ backgroundColor: "#6a5acd", color: "white" }}
                  className={classes.submit}
                  type="button"
                  onClick={addFriend}
                >
                  Add more
                </Button>
              </Grid>
              <Grid item className={classes.gridItem}>
                <Button
                  fullWidth
                  style={{
                    backgroundColor: "rgb(60, 179, 113)",
                    float: "right",
                    color: "white",
                  }}
                  className={classes.submit}
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </div>
        </form>
      </Paper>
    </Container>
  );
}

export default NewTest;
