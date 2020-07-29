const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  user: null,
  buyConfirmed: false,
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

    case "BUY_SUCCESS":
      return {
        ...state,
        user: payload,
        isLoading: false,
        buyConfirmed: true,
      }

    case "SET_BUY_CONFIRMED":
      return {
        ...state,
        buyConfirmed: payload,
      }

    default:
      return state
  }
}
