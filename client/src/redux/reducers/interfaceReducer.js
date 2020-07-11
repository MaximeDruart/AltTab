const initialState = {
  activeLeftPanel: "PROFILE", // will switch between "PROFILE" and "LOBBY"
  // lobby: null, // will contain all the data for the lobby that the player is in
  // mockup lobby for the time being
  lobby: {
    lobbyName: "Maxime's game",
    settings: {
      private: true,
      maxPlayers: 6,
      rounds: 3,
      link: "XyZa",
    },
    nbOfPlayers: 8,
    players: [
      {
        name: "Maxime",
        role: "owner",
      },
      {
        name: "Visiteur 2624",
        role: "user",
      },
      {
        name: "test 3",
        role: "user",
      },
      {
        name: "test 4",
        role: "user",
      },
      {
        name: "test 4",
        role: "user",
      },
      {
        name: "test 4",
        role: "user",
      },
    ],
  },
  leftPanelMode: "SETTINGS", // switch between "USERS" and "SETTINGS"
  showAuth: false,
  authMode: "REGISTER", // switches between "REGISTER" and "LOGIN"
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

    default:
      return state
  }
}
