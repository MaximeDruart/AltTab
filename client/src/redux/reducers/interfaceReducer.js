const initialState = {
  activeLeftPanel: "LOBBY", // will switch between "PROFILE" and "LOBBY"
  lobby: null, // will contain all the data for the lobby that the player is in
  lobbyMode: "users", // switch between users and settings
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_LEFT_PANEL":
      return { ...state, activeLeftPanel: payload }

    default:
      return state
  }
}
