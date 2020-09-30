export const SET_ALERT = "SET_ALERT";
export const REMOVE_ALERT = "REMOVE_ALERT";

import uuid from "uuid";

export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuid.v4();
};
