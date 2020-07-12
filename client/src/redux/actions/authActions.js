import axios from "axios"
import { returnErrors } from "./errorActions"

// check token and load user

// this action will check for and validate the token in storage and returns the associated user (if there's one)
export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: "SET_LOADING" })
  // send the request
  axios
    .get("/users/info", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: "USER_LOADED",
        payload: res.data,
      })
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status))
      dispatch({ type: "AUTH_ERROR" })
    })
}

export const registerUser = (newUser) => (dispatch) => {
  // Headers
  dispatch({ type: "SET_LOADING" })
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  }
  axios
    .post("/users/register", newUser, config)
    .then((res) => {
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: res.data,
      })
    })
    .catch((error) => {
      dispatch(returnErrors(error.response.data, error.response.status, "REGISTER_FAIL"))
      dispatch({ type: "REGISTER_FAIL" })
    })
}

export const loginUser = (userLogs) => (dispatch) => {
  // Headers
  dispatch({ type: "SET_LOADING" })
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  }
  axios
    .post("/users/login", userLogs, config)
    .then((res) => {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data,
      })
    })
    .catch((error) => {
      dispatch(returnErrors(error.response.data, error.response.status, "LOGIN_FAIL"))
      dispatch({ type: "LOGIN_FAIL" })
    })
}

export const logoutUser = () => ({ type: "LOGOUT_SUCCESS" })

export const tokenConfig = (getState) => {
  const token = getState().auth.token
  // create a headers object for axios
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  }
  // if there's a token add it to axios headers
  if (token) config.headers["x-auth-token"] = token
  return config
}
