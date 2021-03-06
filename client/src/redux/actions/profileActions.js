import axios from "axios"
import { tokenConfig } from "./authActions"
import { returnErrors } from "./errorActions"

export const editAvatar = (avatar) => (dispatch, getState) => {
  dispatch({ type: "SET_LOADING" })
  axios
    .post("/users/edit/avatar", { avatar }, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: "EDIT_SUCCESS",
        payload: res.data,
      })
    })
    .catch((error) => {
      dispatch(returnErrors(error.response.data, error.response.status))
      dispatch({ type: "EDIT_FAIL" })
    })
}

export const buyItem = (item) => (dispatch, getState) => {
  dispatch({ type: "SET_LOADING" })
  axios
    .post("/users/buy", { item }, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: "BUY_SUCCESS",
        payload: res.data,
      })
    })
    .catch((error) => {
      dispatch(returnErrors(error.response.data, error.response.status))
      dispatch({ type: "BUY_FAIL" })
    })
}

export const setBuyConfirmed = (payload) => ({
  type: "SET_BUY_CONFIRMED",
  payload,
})
