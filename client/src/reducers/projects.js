import { GET_PROJECTS, CLEAR_PROJECTS } from "../actions/projects";

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
    default:
      return state;
  }
}
