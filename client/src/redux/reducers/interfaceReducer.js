const initialState = {
  activeLeftPanel: "LOBBY", // will switch between "PROFILE" and "LOBBY"
  leftPanelMode: "USERS", // switch between "USERS" and "SETTINGS"
  showAuth: false,
  authMode: "REGISTER", // switches between "REGISTER" and "LOGIN",
  successMessage: "",
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_LEFT_PANEL":
      return { ...state, activeLeftPanel: payload }
    case "SET_LEFT_PANEL_MODE":
      return { ...state, leftPanelMode: payload }
    case "TOGGLE_AUTH":
      return { ...state, showAuth: !state.showAuth }
    case "SET_AUTH_MODE":
      return { ...state, authMode: payload }

    case "UPDATE_SETTINGS":
      const lobby = state.lobby
      // users send {private : true} and we edit the settings object of lobby
      // Object.keys(payload)[0] get the first key of the sent object (private in this example)
      lobby.settings[Object.keys(payload)[0]] = payload[Object.keys(payload)[0]]
      return { ...state, lobby }

    case "SET_SUCCESS_MESSAGE":
      return {
        ...state,
        successMessage: payload,
      }
    default:
      return state
  }
}
