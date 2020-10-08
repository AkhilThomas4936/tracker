import { setAlert } from "./alert";
import axios from "axios";

export const ADD_BUG = "ADD_BUG";

export const addBug = (
  payload,
  history,
  projectId,

  bugId
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(payload);

  try {
    await axios.post("http://localhost:5000/projects/bugs/add", body, config);
    history.push(`/${projectId}`);
    dispatch(setAlert("Bug added", "success"));
  } catch (err) {
    console.log(err.response);
  }
};
