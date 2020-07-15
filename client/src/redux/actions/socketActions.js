export const setRoom = (payload) => ({ type: "SET_ROOM", payload })

export const updateRoomSettings = (payload) => ({
  type: "UPDATE_ROOM_SETTINGS",
  payload,
})

export const setSocketError = (payload) => ({
  type: "SET_SOCKET_ERROR",
  payload,
})

export const newUserJoined = (payload) => ({
  type: "NEW_USER_JOINED",
  payload,
})

export const userLeftRoom = (payload) => ({
  type: "USER_LEFT_ROOM",
  payload,
})

export const leftRoom = () => ({ type: "LEFT_ROOM" })

export const setPublicRooms = (payload) => ({ type: "SET_PUBLIC_ROOMS", payload })

/* MESSAGES */

export const updateMessages = (payload) => ({
  type: "UPDATE_MESSAGES",
  payload,
})