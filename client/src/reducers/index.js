import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import projects from "./projects";

export default combineReducers({
  auth,
  alert,
  projects,
});
