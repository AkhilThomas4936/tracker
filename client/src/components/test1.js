import React from "react";
import { useForm } from "react-hook-form";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  makeStyles,
  Container,
  Grid,
} from "@material-ui/core";

import "./Styles.css";

function Test1() {
  const [indexes, setIndexes] = React.useState([]);
  const [counter, setCounter] = React.useState(0);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const team = [];
    const { friends } = data;
    console.log(friends);
    friends.map((friend) => team.push(friend.email));
    console.log(team);
  };

  const addFriend = () => {
    setIndexes((prevIndexes) => [...prevIndexes, counter]);
    setCounter((prevCounter) => prevCounter + 1);
  };

  const removeFriend = (index) => () => {
    setIndexes((prevIndexes) => [
      ...prevIndexes.filter((item) => item !== index),
    ]);
    setCounter((prevCounter) => prevCounter - 1);
  };

  const clearFriends = () => {
    setIndexes([]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {indexes.map((index) => {
        const fieldName = `friends[${index}]`;
        return (
          <fieldset name={fieldName} key={fieldName}>
            <label>
              Person {index + 1}:
              <input type="text" name={`${fieldName}.email`} ref={register} />
            </label>

            <button type="button" onClick={removeFriend(index)}>
              Remove
            </button>
          </fieldset>
        );
      })}

      <button type="button" onClick={addFriend}>
        Add Friend
      </button>
      <button type="button" onClick={clearFriends}>
        Clear Team
      </button>
      <input type="submit" />
    </form>
  );
}

export default Test1;
