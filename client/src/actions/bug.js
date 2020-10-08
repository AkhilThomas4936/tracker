import { setAlert } from "./alert";
import axios from "axios";

export const ADD_BUG = "ADD_BUG";
export const CHANGE_STATUS = "CHANGE_STATUS";

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

export const changeStatus = (payload, history, projectId, bugId) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(payload);

  try {
    await axios.put("http://localhost:5000/projects/bugs/status", body, config);
    history.push(`/${projectId}/${bugId}`);
    window.location.reload(false);
    dispatch(setAlert("Status changed", "success"));
  } catch (err) {
    console.log(err.response);
  }
};

export const changeAssignedTo = (payload, history, projectId, bugId) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(payload);

  try {
    await axios.put(
      "http://localhost:5000/projects/bugs/assignedTo",
      body,
      config
    );
    history.push(`/${projectId}/${bugId}`);
    window.location.reload(false);
    dispatch(setAlert(" Done ", "success"));
  } catch (err) {
    console.log(err.response);
  }
};
