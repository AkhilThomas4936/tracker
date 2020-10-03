import axios from "axios";
// import { setAlert } from "./alert";

//actions
export const GET_PROJECTS = "GET_PROJECTS";
export const CLEAR_PROJECTS = "CLEAR_PROJECTS";

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
