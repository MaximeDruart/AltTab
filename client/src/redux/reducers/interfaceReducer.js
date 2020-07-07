const initialState = {
  leftPanel: "PROFILE",
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SWITCH_LEFT_PANEL":
      return { ...state, leftPanel: payload }

    default:
      return state
  }
}
