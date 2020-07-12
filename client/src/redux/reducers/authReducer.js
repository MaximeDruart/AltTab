const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  user: null,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_LOADING":
      return { ...state, isLoading: true }

    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: payload,
      }

    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      localStorage.setItem("token", payload.token)
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isLoading: false,
      }

    case "AUTH_ERROR":
    case "LOGIN_FAIL":
    case "LOGOUT_SUCCESS":
    case "REGISTER_FAIL":
      localStorage.removeItem("token")
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      }

    case "EDIT_SUCCESS":
      return {
        ...state,
        user: payload,
        isLoading: false,
      }

    default:
      return state
  }
}
