import axios from "axios"
import { tokenConfig } from "./authActions"

export const editUsername = (username) => (dispatch, getState) => {
  dispatch({ type: "SET_LOADING" })
  axios
    .post("/users/edit/username", { username }, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: "EDIT_SUCCESS",
        payload: res.data,
      })
    })
    .catch((error) => {
      dispatch(returnErrors(error.response.data, error.response.status, "EDIT_FAIL"))
      dispatch({ type: "EDIT_FAIL" })
    })
}
