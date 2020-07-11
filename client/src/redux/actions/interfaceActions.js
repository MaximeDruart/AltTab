export const setLeftPanel = (payload) => ({
  type: "SET_LEFT_PANEL",
  payload,
})

export const setLeftPanelMode = (payload) => ({
  type: "SET_LEFT_PANEL_MODE",
  payload,
})

export const updateSettings = (payload) => ({
  type: "UPDATE_SETTINGS",
  payload,
})

export const toggleAuth = () => ({
  type: "TOGGLE_AUTH",
})

export const setAuthMode = (payload) => ({
  type: "SET_AUTH_MODE",
  payload,
})
