import axios from "axios";
import { setAlert } from "./alert";

//actions
export const GET_PROJECTS = "GET_PROJECTS";
export const CLEAR_PROJECTS = "CLEAR_PROJECTS";
export const ADD_PROJECT = "ADD_PROJECT";
export const ADD_PROJECT_FAIL = "ADD_PROJECT_FAIL";

export const getProjects = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/projects/");
    // console.log(typeof res.data);
    // console.log(res.data);
    dispatch({
      type: GET_PROJECTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.respone);
  }
};

export const clearProjects = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROJECTS,
  });
};

export const addProject = (payload) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(payload);

  try {
    await axios.post("http://localhost:5000/projects/add", body, config);

    dispatch({
      type: ADD_PROJECT,
    });
    dispatch(setAlert("Project added successfully", "success"));
  } catch (err) {
    const error = err.response.data.msg;
    // console.log(err.response.data);

    if (error) {
      dispatch(setAlert(error, "error"));
    }
    dispatch({
      type: ADD_PROJECT_FAIL,
    });
  }
};
