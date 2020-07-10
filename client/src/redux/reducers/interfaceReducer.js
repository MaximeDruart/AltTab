const initialState = {
  activeLeftPanel: "LOBBY", // will switch between "PROFILE" and "LOBBY"
  lobby: null, // will contain all the data for the lobby that the player is in
  leftPanelMode: "SETTINGS", // switch between "USERS" and "SETTINGS"
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_LEFT_PANEL":
      return { ...state, activeLeftPanel: payload }
    case "SET_LEFT_PANEL_MODE":
      return { ...state, leftPanelMode: payload }

    default:
      return state
  }
}
