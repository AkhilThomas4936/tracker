import {
  GET_PROJECTS,
  CLEAR_PROJECTS,
  ADD_PROJECT,
  ADD_PROJECT_FAIL,
} from "../actions/projects";

const initialState = {
  yourProjects: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROJECTS:
      return {
        ...state,
        yourProjects: payload,
        loading: false,
      };

    case CLEAR_PROJECTS:
      return {
        ...state,
        yourProjects: [],
        loading: true,
      };

    case ADD_PROJECT:
      return {
        ...state,
      };
    case ADD_PROJECT_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
